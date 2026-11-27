import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { l as resolveConfiguredLocale, r as getI18nConfig } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { t as ContentRepository } from "./content-2gjSbGP3_DRBiG6uA.mjs";
import { t as chunks } from "./chunks-CvgCLYip_BPNjBngy.mjs";
import { t as TaxonomyRepository } from "./taxonomy-D4Fl2smf_D54uY0xV.mjs";
import { a as resolveLocalizedContentRoutePath, n as localizePath } from "./resolve-Z5YK_6ew_C3Nw14z1.mjs";
import { r as taxonomyTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { f as invalidateTermCache } from "./taxonomies-DApyZAJq_ChSZiGZH.mjs";
import { u as SchemaRegistry } from "./registry-CSLrHSx1_Ce4dsyNi.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { t as compileUrlPattern } from "./url-pattern-DViEwhDu_BvReWGfJ.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as bulkTagBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag.mjs
var bulk_tag_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var TRAILING_SLASHES = /\/+$/;
function titleFor(item, collection) {
	const preferred = collection.titleField && item.data[collection.titleField];
	const title = item.data.title;
	const name = item.data.name;
	return typeof preferred === "string" && preferred || typeof title === "string" && title || typeof name === "string" && name || item.slug || item.id;
}
function normalizedPath(path) {
	return path.replace(TRAILING_SLASHES, "") || "/";
}
async function urlCandidates(url, origin, collections) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		return null;
	}
	if (parsed.origin !== origin || !["https:", "http:"].includes(parsed.protocol)) return null;
	const locales = getI18nConfig()?.locales ?? ["en"];
	const candidates = [];
	for (const collection of collections) {
		const pattern = collection.urlPattern ?? `/${collection.slug}/{slug}`;
		for (const locale of locales) {
			const prefix = await localizePath("/", locale);
			if (!prefix) continue;
			const { regex, paramNames } = compileUrlPattern(`${prefix === "/" ? "" : prefix}${pattern}`);
			const segments = regex.exec(parsed.pathname);
			if (!segments) continue;
			const slugIndex = paramNames.indexOf("slug");
			const idIndex = paramNames.indexOf("id");
			if (slugIndex < 0 && idIndex < 0) continue;
			let identifier;
			try {
				identifier = decodeURIComponent(segments[1 + (slugIndex >= 0 ? slugIndex : idIndex)] ?? "");
			} catch {
				continue;
			}
			candidates.push({
				collection,
				locale,
				identifier,
				by: slugIndex >= 0 ? "slug" : "id"
			});
		}
	}
	return {
		path: parsed.pathname,
		candidates
	};
}
async function handleBulkTag(db, origin, input, invalidate) {
	try {
		const taxonomy = new TaxonomyRepository(db);
		const term = await taxonomy.findById(input.termId);
		if (!term) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Term not found"
			}
		};
		const definitions = await db.selectFrom("_emdash_taxonomy_defs").select("collections").where("name", "=", term.name).execute();
		const allowed = new Set(definitions.flatMap((def) => {
			const parsed = def.collections ? JSON.parse(def.collections) : [];
			return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
		}));
		const collections = (await new SchemaRegistry(db).listCollections()).filter((collection) => allowed.has(collection.slug));
		const byCollection = new Map(collections.map((collection) => [collection.slug, collection]));
		const content = new ContentRepository(db);
		const idNeeds = /* @__PURE__ */ new Map();
		const slugNeeds = /* @__PURE__ */ new Map();
		const parsedUrls = /* @__PURE__ */ new Map();
		for (const [index, source] of input.items.entries()) if ("url" in source) {
			const parsed = await urlCandidates(source.url, origin, collections);
			parsedUrls.set(index, parsed);
			for (const candidate of parsed?.candidates ?? []) if (candidate.by === "id") {
				const ids = idNeeds.get(candidate.collection.slug) ?? /* @__PURE__ */ new Set();
				ids.add(candidate.identifier);
				idNeeds.set(candidate.collection.slug, ids);
			} else {
				const key = `${candidate.collection.slug}:${candidate.locale}`;
				const group = slugNeeds.get(key) ?? {
					collection: candidate.collection.slug,
					locale: candidate.locale,
					slugs: /* @__PURE__ */ new Set()
				};
				group.slugs.add(candidate.identifier);
				slugNeeds.set(key, group);
			}
		} else if (byCollection.has(source.collection)) {
			const ids = idNeeds.get(source.collection) ?? /* @__PURE__ */ new Set();
			ids.add(source.id);
			idNeeds.set(source.collection, ids);
		}
		const byId = /* @__PURE__ */ new Map();
		for (const [collection, ids] of idNeeds) byId.set(collection, await content.findManyByIds(collection, [...ids]));
		const bySlug = /* @__PURE__ */ new Map();
		for (const [key, group] of slugNeeds) bySlug.set(key, await content.findManyBySlugsInLocale(group.collection, [...group.slugs], group.locale, { publishedOnly: true }));
		const prepared = [];
		const groups = /* @__PURE__ */ new Map();
		for (const [index, source] of input.items.entries()) {
			let resolved = "not_found";
			if ("url" in source) {
				const parsed = parsedUrls.get(index);
				const matches = /* @__PURE__ */ new Map();
				for (const candidate of parsed?.candidates ?? []) {
					const item = candidate.by === "id" ? byId.get(candidate.collection.slug)?.get(candidate.identifier) : bySlug.get(`${candidate.collection.slug}:${candidate.locale}`)?.get(candidate.identifier);
					if (!item || item.locale === null || resolveConfiguredLocale(item.locale) !== resolveConfiguredLocale(candidate.locale) || item.status !== "published") continue;
					const canonical = await resolveLocalizedContentRoutePath({
						pattern: candidate.collection.urlPattern ?? `/${candidate.collection.slug}/{slug}`,
						collection: candidate.collection.slug,
						slug: item.slug ?? "",
						id: item.id,
						date: item.publishedAt,
						locale: candidate.locale
					});
					if (canonical && parsed && normalizedPath(canonical) === normalizedPath(parsed.path)) matches.set(`${candidate.collection.slug}:${item.id}`, {
						item,
						collection: candidate.collection
					});
				}
				resolved = matches.size > 1 ? "ambiguous" : matches.values().next().value ?? "not_found";
			} else {
				const collection = byCollection.get(source.collection);
				const item = byId.get(source.collection)?.get(source.id);
				if (item && collection) resolved = {
					item,
					collection
				};
			}
			prepared.push({
				source,
				resolved
			});
			if (typeof resolved !== "string") {
				const collectionGroups = groups.get(resolved.collection.slug) ?? /* @__PURE__ */ new Set();
				collectionGroups.add(resolved.item.translationGroup ?? resolved.item.id);
				groups.set(resolved.collection.slug, collectionGroups);
			}
		}
		const termGroup = term.translationGroup ?? term.id;
		const assigned = /* @__PURE__ */ new Set();
		if (!input.apply) for (const [collection, entryGroups] of groups) for (const batch of chunks([...entryGroups], 50)) {
			const rows = await db.selectFrom("content_taxonomies").select("entry_id").where("collection", "=", collection).where("taxonomy_id", "=", termGroup).where("entry_id", "in", batch).execute();
			for (const row of rows) assigned.add(`${collection}:${row.entry_id}`);
		}
		const siblingIds = /* @__PURE__ */ new Map();
		if (input.apply && invalidate) for (const [collection, entryGroups] of groups) siblingIds.set(collection, await content.findTranslationIdsForGroups(collection, [...entryGroups]));
		const seen = /* @__PURE__ */ new Set();
		const purge = /* @__PURE__ */ new Set([taxonomyTag(term.name)]);
		const results = [];
		let changed = false;
		for (const { source, resolved } of prepared) {
			if (typeof resolved === "string") {
				if (input.apply && input.refreshOnly && invalidate && "id" in source && byCollection.has(source.collection)) {
					purge.add(source.collection);
					purge.add(source.id);
				}
				results.push({
					input: source,
					status: "unmatched",
					reason: resolved
				});
				continue;
			}
			const { item, collection } = resolved;
			const entry = {
				collection: collection.slug,
				id: item.id,
				title: titleFor(item, collection),
				locale: item.locale ?? "en"
			};
			const group = item.translationGroup ?? item.id;
			const key = `${collection.slug}:${group}`;
			if (seen.has(key)) {
				results.push({
					input: source,
					status: "skipped",
					entry
				});
				continue;
			}
			try {
				const inserted = input.apply && !input.refreshOnly ? await taxonomy.attachGroupsToEntry(collection.slug, item.id, [termGroup]) : 0;
				if (inserted) changed = true;
				seen.add(key);
				if (input.apply && invalidate) {
					purge.add(collection.slug);
					for (const id of siblingIds.get(collection.slug)?.get(group) ?? [item.id]) purge.add(id);
				}
				results.push({
					input: source,
					status: input.apply ? inserted ? "added" : "skipped" : assigned.has(key) ? "skipped" : "ready",
					entry
				});
			} catch (error) {
				console.error("[bulk-tag] Failed to tag entry:", error);
				results.push({
					input: source,
					status: "failed",
					reason: "save_failed",
					entry
				});
			}
		}
		if (changed) invalidateTermCache();
		let cacheRefreshFailed = false;
		if (input.apply && invalidate && (purge.size > 1 || input.refreshOnly)) try {
			for (const batch of chunks([...purge], 100)) await invalidate(batch);
		} catch (error) {
			console.error("[bulk-tag] Failed to invalidate cache:", error);
			cacheRefreshFailed = true;
		}
		return {
			success: true,
			data: {
				results,
				cacheRefreshFailed
			}
		};
	} catch (error) {
		console.error("[bulk-tag] Failed:", error);
		return {
			success: false,
			error: {
				code: "BULK_TAG_ERROR",
				message: "Failed to bulk tag posts"
			}
		};
	}
}
var POST = async ({ locals, request, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:edit_any");
	if (denied) return denied;
	const body = await parseBody(request, bulkTagBody);
	if (isParseError(body)) return body;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	return unwrapResult(await handleBulkTag(emdash.db, getPublicOrigin(new URL(request.url), emdash.config), body, cache?.enabled ? (tags) => cache.invalidate({ tags }) : void 0));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag@_@mjs
var page = () => bulk_tag_exports;
export { page };
