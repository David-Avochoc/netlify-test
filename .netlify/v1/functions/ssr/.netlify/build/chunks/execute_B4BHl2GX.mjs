import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { u as resolveContentCreateLocale } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { t as slugify } from "./slugify_PHKs_6uy.mjs";
import { t as ContentRepository } from "./content-2gjSbGP3_DRBiG6uA.mjs";
import { t as BylineRepository } from "./byline-BufjxQyd_CopmbbPN.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { M as wxrChunkState, N as wxrImportConfig, j as wxrChunkCursor } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { h as sanitizeCollectionSlug, m as resolveImportByline, n as parseWxrString, p as relativizeContentLinks, t as parseWxrDate } from "./wxr-CDtij4U5_Dv5Lq51Q.mjs";
import { a as loadTaxonomyPlanFromDb, c as setPostTermAssignmentsReplacing, i as isWxrTaxonomyConflictError, o as mirrorTermsToLocales, r as importMenusFromWxr, s as preImportWxrTaxonomies, t as attachPostTaxonomies } from "./wxr-taxonomies-fliLjgKD_BD2bAcD7.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { gutenbergToPortableText } from "@emdash-cms/gutenberg-to-portable-text";
import { r as importReusableBlocksAsSections } from "./dist_D2Vaghlj.mjs";
// node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs
var execute_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	importContent: () => importContent,
	prerender: () => false
});
/** Posts processed per Worker invocation in chunked WXR imports. */
var WXR_CONTENT_CHUNK_SIZE = 30;
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	if (!emdash?.handleContentCreate) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	try {
		const emdashManifest = await emdash.getManifest();
		const formData = await request.formData();
		const fileEntry = formData.get("file");
		const file = fileEntry instanceof File ? fileEntry : null;
		const configEntry = formData.get("config");
		const configJson = typeof configEntry === "string" ? configEntry : null;
		if (!file) return apiError("VALIDATION_ERROR", "No file provided", 400);
		if (!configJson) return apiError("VALIDATION_ERROR", "No config provided", 400);
		const parsedConfig = parseJsonField(configJson, "config");
		if ("response" in parsedConfig) return parsedConfig.response;
		const configResult = wxrImportConfig.safeParse(parsedConfig.value);
		if (!configResult.success) return apiError("VALIDATION_ERROR", "Invalid import config", 400);
		const config = configResult.data;
		const phaseEntry = formData.get("phase");
		if (phaseEntry !== null && phaseEntry !== "taxonomy" && phaseEntry !== "content" && phaseEntry !== "finalize") return apiError("VALIDATION_ERROR", "Invalid import phase", 400);
		const phase = phaseEntry;
		const cursorEntry = formData.get("cursor");
		let cursor;
		if (typeof cursorEntry === "string" && cursorEntry.length > 0) {
			const parsedCursor = parseJsonField(cursorEntry, "cursor");
			if ("response" in parsedCursor) return parsedCursor.response;
			const cursorResult = wxrChunkCursor.safeParse(parsedCursor.value);
			if (!cursorResult.success) return apiError("VALIDATION_ERROR", "Invalid import cursor", 400);
			cursor = cursorResult.data;
		}
		const chunkEntry = formData.get("chunk");
		let incomingChunk;
		if (typeof chunkEntry === "string" && chunkEntry.length > 0) {
			const parsedChunk = parseJsonField(chunkEntry, "chunk");
			if ("response" in parsedChunk) return parsedChunk.response;
			const chunkResult = wxrChunkState.safeParse(parsedChunk.value);
			if (!chunkResult.success) return apiError("VALIDATION_ERROR", "Invalid import chunk state", 400);
			incomingChunk = chunkResult.data;
		}
		const text = await file.text();
		const wxr = await parseWxrString(text);
		const source = await importFingerprint(text, configJson);
		if (cursor && cursor.source !== source) return apiError("WXR_IMPORT_SOURCE_CHANGED", "The WXR file or import configuration changed after this import started", 409);
		const attachmentMap = /* @__PURE__ */ new Map();
		for (const att of wxr.attachments) if (att.id && att.url) attachmentMap.set(String(att.id), att.url);
		const authorDisplayNames = /* @__PURE__ */ new Map();
		for (const author of wxr.authors) {
			if (!author.login) continue;
			authorDisplayNames.set(author.login, author.displayName || author.login);
		}
		if (phase === "content") {
			if (!cursor?.taxonomiesReady) return apiError("VALIDATION_ERROR", "Taxonomy preparation is not complete", 400);
			const chunkResponse = await runContentChunk(wxr, config, emdash, emdashManifest, attachmentMap, authorDisplayNames, cursor, incomingChunk, source);
			if (chunkResponse instanceof Response) return chunkResponse;
			return apiSuccess(chunkResponse);
		}
		if (phase === "taxonomy") {
			if (cursor || incomingChunk) return apiError("VALIDATION_ERROR", "Taxonomy preparation cannot be resumed", 400);
			let taxonomyPlan;
			try {
				taxonomyPlan = await prepareTaxonomies(wxr, emdash, config.locale);
			} catch (error) {
				if (isWxrTaxonomyConflictError(error)) {
					console.error("[WXR_IMPORT_TAXONOMY_CONFLICT]", error);
					return apiError("WXR_IMPORT_TAXONOMY_CONFLICT", error.publicMessage, 409);
				}
				throw error;
			}
			const result = emptyImportResult();
			result.taxonomies = {
				termsCreated: taxonomyPlan.termsCreated,
				termsReused: taxonomyPlan.termsReused,
				assignments: 0,
				missingTaxonomies: taxonomyPlan.missingTaxonomies
			};
			return apiSuccess({
				success: true,
				result,
				done: true,
				cursor: {
					offset: 0,
					source,
					taxonomiesReady: true
				},
				chunk: { translationGroups: {} }
			});
		}
		if (phase === "finalize") {
			if (!cursor || cursor.offset !== wxr.posts.length) return apiError("VALIDATION_ERROR", "Content import is not complete", 400);
			const result = emptyImportResult();
			if (config.importSections !== false) {
				const sectionsResult = await importReusableBlocksAsSections(wxr.posts, emdash.db);
				result.sections = {
					created: sectionsResult.sectionsCreated,
					skipped: sectionsResult.sectionsSkipped
				};
				result.errors.push(...sectionsResult.errors);
				result.success = result.errors.length === 0;
			}
			await importWxrMenus(wxr, config, emdash.db, emdashManifest, result);
			return apiSuccess({
				success: result.success,
				result,
				done: true
			});
		}
		if (wxr.posts.length > WXR_CONTENT_CHUNK_SIZE) return apiError("WXR_IMPORT_TOO_LARGE", `This WXR contains ${wxr.posts.length} posts, which exceeds the ${WXR_CONTENT_CHUNK_SIZE}-post limit for a single import request. Run the import in chunked mode or split the file into smaller exports.`, 413);
		const taxonomyPlan = await preImportWxrTaxonomies(emdash.db, wxr.posts, wxr.categories, wxr.tags, wxr.terms, config.locale);
		const postLocales = /* @__PURE__ */ new Set();
		for (const post of wxr.posts) if (post.locale) postLocales.add(post.locale);
		if (postLocales.size > 0) try {
			await mirrorTermsToLocales(emdash.db, taxonomyPlan, postLocales, config.locale);
		} catch (mirrorError) {
			if (isWxrTaxonomyConflictError(mirrorError)) {
				console.error("[WXR_IMPORT_TAXONOMY_CONFLICT]", mirrorError);
				return apiError("WXR_IMPORT_TAXONOMY_CONFLICT", mirrorError.publicMessage, 409);
			}
			throw mirrorError;
		}
		const result = await importContent(wxr.posts, config, emdash, emdashManifest, attachmentMap, config.locale, authorDisplayNames, taxonomyPlan, /* @__PURE__ */ new Map(), wxr.site.link);
		if (config.importSections !== false) {
			const sectionsResult = await importReusableBlocksAsSections(wxr.posts, emdash.db);
			result.sections = {
				created: sectionsResult.sectionsCreated,
				skipped: sectionsResult.sectionsSkipped
			};
			result.errors.push(...sectionsResult.errors);
			if (sectionsResult.errors.length > 0) result.success = false;
		}
		await importWxrMenus(wxr, config, emdash.db, emdashManifest, result);
		return apiSuccess(result);
	} catch (error) {
		return handleError(error, "Failed to import content", "WXR_IMPORT_ERROR");
	}
};
function parseJsonField(value, fieldName) {
	try {
		return { value: JSON.parse(value) };
	} catch {
		return { response: apiError("VALIDATION_ERROR", `Invalid JSON in ${fieldName}`, 400) };
	}
}
async function importFingerprint(text, configJson) {
	const bytes = new TextEncoder().encode(`${configJson}\u0000${text}`);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function emptyImportResult() {
	return {
		success: true,
		imported: 0,
		skipped: 0,
		errors: [],
		byCollection: {}
	};
}
/** Import a bounded WXR post chunk using taxonomy rows prepared in the prior phase. */
async function runContentChunk(wxr, config, emdash, manifest, attachmentMap, authorDisplayNames, cursor, incomingChunk, source) {
	const offset = cursor?.offset ?? 0;
	if (offset > wxr.posts.length || offset > 0 && offset % WXR_CONTENT_CHUNK_SIZE !== 0) return apiError("VALIDATION_ERROR", "Invalid import cursor offset", 400);
	const posts = wxr.posts.slice(offset, offset + WXR_CONTENT_CHUNK_SIZE);
	const taxonomyPlan = await loadTaxonomyPlanFromDb(emdash.db);
	const translationGroupMap = new Map(Object.entries(incomingChunk?.translationGroups ?? {}));
	const bylineCache = new Map(Object.entries(incomingChunk?.bylines ?? {}));
	const result = await importContent(posts, config, emdash, manifest, attachmentMap, config.locale, authorDisplayNames, taxonomyPlan, translationGroupMap, wxr.site.link, bylineCache);
	const nextOffset = offset + posts.length;
	const done = nextOffset >= wxr.posts.length;
	return {
		success: result.errors.length === 0,
		result,
		done,
		cursor: {
			offset: nextOffset,
			source,
			taxonomiesReady: true
		},
		chunk: {
			translationGroups: Object.fromEntries(translationGroupMap),
			bylines: Object.fromEntries(bylineCache)
		}
	};
}
async function prepareTaxonomies(wxr, emdash, locale) {
	const taxonomyPlan = await preImportWxrTaxonomies(emdash.db, wxr.posts, wxr.categories, wxr.tags, wxr.terms, locale);
	const postLocales = /* @__PURE__ */ new Set();
	for (const post of wxr.posts) if (post.locale) postLocales.add(post.locale);
	if (postLocales.size > 0) await mirrorTermsToLocales(emdash.db, taxonomyPlan, postLocales, locale);
	return taxonomyPlan;
}
async function importContent(posts, config, emdash, manifest, attachmentMap, locale, authorDisplayNames, taxonomyPlan, translationGroupMap = /* @__PURE__ */ new Map(), siteUrl = "", bylineCache = /* @__PURE__ */ new Map()) {
	const result = {
		success: true,
		imported: 0,
		skipped: 0,
		errors: [],
		byCollection: {},
		taxonomies: {
			termsCreated: taxonomyPlan.termsCreated,
			termsReused: taxonomyPlan.termsReused,
			assignments: 0,
			missingTaxonomies: taxonomyPlan.missingTaxonomies
		}
	};
	const contentRepo = new ContentRepository(emdash.db);
	const bylineRepo = new BylineRepository(emdash.db);
	for (const post of posts) {
		const postType = post.postType || "post";
		const mapping = config.postTypeMappings[postType];
		if (!mapping || !mapping.enabled) continue;
		const collection = sanitizeCollectionSlug(mapping.collection);
		if (!manifest?.collections[collection]) {
			result.errors.push({
				title: post.title || "Untitled",
				error: `Collection "${collection}" does not exist`
			});
			continue;
		}
		try {
			const content = post.content ? gutenbergToPortableText(post.content) : [];
			if (siteUrl) relativizeContentLinks(content, siteUrl);
			const slug = wxrPostSlug(post);
			const postLocale = post.locale ?? locale;
			if (config.skipExisting) {
				const existing = await contentRepo.findBySlug(collection, slug, postLocale);
				if (existing) {
					if (post.translationGroup) translationGroupMap.set(post.translationGroup, existing.id);
					result.skipped++;
					continue;
				}
			}
			let translationOf;
			if (post.translationGroup) translationOf = translationGroupMap.get(post.translationGroup);
			const passwordProtected = Boolean(post.postPassword);
			const status = passwordProtected ? "draft" : mapStatus(post.status);
			const data = {
				title: post.title || "Untitled",
				content,
				excerpt: post.excerpt || void 0
			};
			const collectionSchema = manifest.collections[collection];
			if (collectionSchema?.fields ? "featured_image" in collectionSchema.fields : false) {
				const thumbnailId = post.meta.get("_thumbnail_id");
				const featuredImage = thumbnailId ? attachmentMap.get(String(thumbnailId)) : void 0;
				if (featuredImage) data.featured_image = featuredImage;
			}
			let authorId;
			if (config.authorMappings && post.creator) {
				const mappedUserId = config.authorMappings[post.creator];
				if (mappedUserId !== void 0 && mappedUserId !== null) authorId = mappedUserId;
			}
			const bylineId = await resolveImportByline(post.creator, authorDisplayNames?.get(post.creator ?? "") ?? post.creator, authorId, bylineRepo, bylineCache);
			const parsedDate = parseWxrDate(post.postDateGmt, post.pubDate, post.postDate);
			const createdAt = parsedDate ? parsedDate.toISOString() : void 0;
			const futureDated = post.status === "future" && createdAt !== void 0 && Date.parse(createdAt) > Date.now();
			const scheduledAt = futureDated && !passwordProtected ? createdAt : void 0;
			const createResult = await emdash.handleContentCreate(collection, {
				data,
				slug,
				status,
				authorId,
				bylines: bylineId ? [{ bylineId }] : void 0,
				locale: postLocale,
				translationOf,
				createdAt,
				publishedAt: futureDated ? void 0 : createdAt
			});
			if (createResult.success) {
				result.imported++;
				result.byCollection[collection] = (result.byCollection[collection] || 0) + 1;
				const createdItem = createResult.data?.item;
				if (createdItem && post.translationGroup && !translationGroupMap.has(post.translationGroup)) translationGroupMap.set(post.translationGroup, createdItem.id);
				if (createdItem && passwordProtected) (result.passwordProtected ??= []).push({
					id: createdItem.id,
					collection,
					title: post.title || "Untitled"
				});
				if (createdItem) try {
					const written = translationOf ? await setPostTermAssignmentsReplacing(emdash.db, collection, createdItem.id, post, taxonomyPlan) : await attachPostTaxonomies(emdash.db, collection, createdItem.id, post, taxonomyPlan);
					if (result.taxonomies) result.taxonomies.assignments += written;
				} catch (taxError) {
					console.error(`Failed to attach taxonomies for "${post.title || "Untitled"}":`, taxError);
					result.errors.push({
						title: post.title || "Untitled",
						error: taxError instanceof Error && taxError.message ? `Imported but failed to attach taxonomies: ${taxError.message}` : "Imported but failed to attach taxonomies"
					});
				}
				if (createdItem && scheduledAt) {
					const scheduled = await emdash.handleContentSchedule(collection, createdItem.id, scheduledAt);
					if (!scheduled.success) result.errors.push({
						title: post.title || "Untitled",
						error: `Imported as draft but failed to schedule: ${scheduled.error?.message ?? "Unknown error"}`
					});
				}
			} else result.errors.push({
				title: post.title || "Untitled",
				error: createResult.error.message || "Unknown error"
			});
		} catch (error) {
			console.error(`Import error for "${post.title || "Untitled"}":`, error);
			result.errors.push({
				title: post.title || "Untitled",
				error: error instanceof Error && error.message ? error.message : "Failed to import item"
			});
		}
	}
	result.success = result.errors.length === 0;
	return result;
}
/** The slug the content import gives a post: its post name, or one made from its title. */
function wxrPostSlug(post) {
	return post.postName || slugify(post.title || `post-${post.id || Date.now()}`);
}
/**
* Import the export's menus once its content is in, linking their items to the
* entries the content import created.
*/
async function importWxrMenus(wxr, config, db, manifest, result) {
	if (config.importMenus === false || wxr.navMenus.length === 0) return;
	let menuResult;
	try {
		menuResult = await importMenusFromWxr(wxr.navMenus, db, await findWxrMenuTargets(wxr, config, db, manifest), resolveContentCreateLocale(config.locale), wxrMenuArchives(config, manifest));
	} catch (error) {
		console.error("[WXR_IMPORT_MENUS]", error);
		result.errors.push({
			title: "Menus",
			error: "Failed to import menus"
		});
		result.success = false;
		return;
	}
	result.menus = {
		created: menuResult.menusCreated,
		items: menuResult.itemsCreated,
		skipped: menuResult.menusSkipped,
		itemsSkipped: menuResult.itemsSkipped
	};
	for (const menuError of menuResult.errors) {
		console.error("[WXR_IMPORT_MENUS]", menuError.menu, menuError.error);
		result.errors.push({
			title: `Menu: ${menuError.menu}`,
			error: "Failed to import menu"
		});
	}
	if (menuResult.errors.length > 0) result.success = false;
}
/**
* Find the entries that menu items link to: the ones the content import made
* from those posts, looked up by the collection, slug and locale it gave them.
* This also finds entries an earlier import created and this one skipped.
*
* Posts that share a slug in a collection and locale are left out: the content
* import creates the first and skips the others, so the one entry with that
* slug can't be matched to the right post.
*/
async function findWxrMenuTargets(wxr, config, db, manifest) {
	const linked = /* @__PURE__ */ new Set();
	for (const menu of wxr.navMenus) for (const item of menu.items) if (item.type === "post_type" && item.objectId) linked.add(item.objectId);
	const groups = /* @__PURE__ */ new Map();
	for (const post of wxr.posts) {
		const mapping = config.postTypeMappings[post.postType || "post"];
		if (!mapping?.enabled) continue;
		const collection = sanitizeCollectionSlug(mapping.collection);
		if (!manifest.collections[collection]) continue;
		let locale;
		try {
			locale = resolveContentCreateLocale(post.locale ?? config.locale);
		} catch {
			continue;
		}
		const key = `${collection}\u0000${locale}`;
		let group = groups.get(key);
		if (!group) {
			group = {
				collection,
				locale,
				postsBySlug: /* @__PURE__ */ new Map()
			};
			groups.set(key, group);
		}
		const slug = wxrPostSlug(post);
		const posts = group.postsBySlug.get(slug);
		if (posts) posts.push(post);
		else group.postsBySlug.set(slug, [post]);
	}
	const contentRepo = new ContentRepository(db);
	const targets = /* @__PURE__ */ new Map();
	for (const { collection, locale, postsBySlug } of groups.values()) {
		const linkedBySlug = /* @__PURE__ */ new Map();
		for (const [slug, [post, ...others]] of postsBySlug) if (post?.id && others.length === 0 && linked.has(post.id)) linkedBySlug.set(slug, {
			id: post.id,
			title: post.title ?? ""
		});
		if (linkedBySlug.size === 0) continue;
		const entries = await contentRepo.findManyBySlugsInLocale(collection, [...linkedBySlug.keys()], locale);
		for (const [slug, post] of linkedBySlug) {
			const entry = entries.get(slug);
			if (!entry) continue;
			targets.set(post.id, {
				collection,
				translationGroup: entry.translationGroup ?? entry.id,
				locale: entry.locale ?? locale,
				title: typeof entry.data.title === "string" ? entry.data.title : post.title
			});
		}
	}
	return targets;
}
/**
* The collections that menu items for post type archives link to: each imported
* post type's collection, by WordPress post type.
*/
function wxrMenuArchives(config, manifest) {
	const archives = /* @__PURE__ */ new Map();
	for (const [postType, mapping] of Object.entries(config.postTypeMappings)) {
		if (!mapping.enabled) continue;
		const collection = sanitizeCollectionSlug(mapping.collection);
		const definition = manifest.collections[collection];
		if (definition) archives.set(postType, {
			collection,
			label: definition.label
		});
	}
	return archives;
}
function mapStatus(wpStatus) {
	switch (wpStatus) {
		case "publish": return "published";
		case "draft": return "draft";
		case "pending": return "draft";
		case "private": return "draft";
		default: return "draft";
	}
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/execute@_@mjs
var page = () => execute_exports;
export { page };
