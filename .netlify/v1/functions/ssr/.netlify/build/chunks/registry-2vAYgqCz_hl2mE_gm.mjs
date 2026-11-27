import { a as ssrfSafeFetch, r as resolveAndValidateExternalUrl, s as validateExternalUrl } from "./ssrf-Em0CeaaN_C95clHBV.mjs";
import { a as FEATURED_IMAGE_FIELD, c as isPluginBookkeepingMeta, d as mapWpStatus, f as normalizeUrl$1, g as sanitizeFieldSlug, i as BASE_REQUIRED_FIELDS, l as isTypeCompatible, o as checkSchemaCompatibility, p as relativizeContentLinks, r as wxrSource, t as parseWxrDate, u as mapPostTypeToCollection } from "./wxr-CDtij4U5_Dv5Lq51Q.mjs";
import { gutenbergToPortableText } from "@emdash-cms/gutenberg-to-portable-text";
// node_modules/emdash/dist/registry-2vAYgqCz.mjs
/**
* WordPress Plugin (EmDash Exporter) import source
*
* Connects to self-hosted WordPress sites running the EmDash Exporter plugin.
* Provides full access to all content including drafts, custom post types, and ACF fields.
*/
/**
* Identifying User-Agent for outbound WordPress plugin importer requests.
*
* The importer sends this on both plugin API calls and direct media downloads.
* Cloudflare Workers' fetch() has no default User-Agent, and some hosts reject
* requests without one (returning 403). Using the same value everywhere keeps
* behavior predictable when the importer is retried against a bot-filtered host.
*/
var IMPORTER_USER_AGENT = "EmDash-Importer/1.0";
/**
* Build the REST API URL for a plugin endpoint.
*
* `restRoute: false` uses the pretty form (`/wp-json/emdash/v1/...`),
* `restRoute: true` uses the `?rest_route=` form that works on sites with
* plain permalinks (where `/wp-json/` doesn't exist).
*/
function pluginApiUrl(siteUrl, path, params = {}, restRoute = false) {
	if (restRoute) {
		const url = new URL(siteUrl + "/");
		url.searchParams.set("rest_route", `/emdash/v1/${path}`);
		for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
		return url.toString();
	}
	const url = new URL(`${siteUrl}/wp-json/emdash/v1/${path}`);
	for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
	return url.toString();
}
/**
* Fetch a plugin API endpoint, falling back to the `?rest_route=` form when
* the pretty `/wp-json/` route 404s or is unreachable. Sites with "Plain"
* permalinks have no `/wp-json/` rewrite, so without this fallback they
* always fail with a misleading 404.
*/
async function fetchPluginApi(siteUrl, path, params, headersInit, timeoutMs) {
	const headers = new Headers(headersInit);
	headers.set("User-Agent", IMPORTER_USER_AGENT);
	let pretty = null;
	try {
		pretty = await ssrfSafeFetch(pluginApiUrl(siteUrl, path, params), {
			headers,
			signal: AbortSignal.timeout(timeoutMs)
		});
	} catch {}
	const response = pretty && pretty.status !== 404 ? pretty : await ssrfSafeFetch(pluginApiUrl(siteUrl, path, params, true), {
		headers,
		signal: AbortSignal.timeout(timeoutMs)
	});
	if (response.headers.get("cf-mitigated") === "challenge") throw new SiteChallengeError();
	return response;
}
var wordpressPluginSource = {
	id: "wordpress-plugin",
	name: "WordPress (EmDash Exporter)",
	description: "Import from WordPress sites with the EmDash Exporter plugin installed",
	icon: "plug",
	requiresFile: false,
	canProbe: true,
	async probe(url) {
		try {
			const siteUrl = normalizeUrl$1(url);
			validateExternalUrl(siteUrl);
			const response = await fetchPluginApi(siteUrl, "probe", {}, { Accept: "application/json" }, 1e4);
			if (!response.ok) return null;
			const data = await response.json();
			if (!data.emdash_exporter) return null;
			return {
				sourceId: "wordpress-plugin",
				confidence: "definite",
				detected: {
					platform: "wordpress",
					version: data.wordpress_version,
					siteTitle: data.site.title,
					siteUrl: data.site.url
				},
				capabilities: {
					publicContent: true,
					privateContent: true,
					customPostTypes: true,
					allMeta: true,
					mediaStream: true
				},
				auth: data.capabilities.application_passwords ? {
					type: "password",
					instructions: data.auth_instructions.instructions
				} : void 0,
				preview: {
					posts: data.post_types.find((p) => p.name === "post")?.count,
					pages: data.post_types.find((p) => p.name === "page")?.count,
					media: data.media_count
				},
				suggestedAction: { type: "proceed" },
				i18n: pluginI18nToDetection(data.i18n)
			};
		} catch (error) {
			if (error instanceof SiteChallengeError) throw error;
			return null;
		}
	},
	async analyze(input, context) {
		const { siteUrl, headers } = getRequestConfig(input);
		const response = await fetchPluginApi(siteUrl, "analyze", {}, headers, 3e4);
		if (!response.ok) {
			const body = await response.json().catch(() => void 0);
			const message = typeof body === "object" && body !== null && "message" in body && typeof body.message === "string" ? body.message : "";
			throw new Error(message || `Failed to analyze site: ${response.statusText}`);
		}
		const data = await response.json();
		const existingCollections = context.getExistingCollections ? await context.getExistingCollections() : /* @__PURE__ */ new Map();
		const postTypes = data.post_types.filter((pt) => pt.total > 0).map((pt) => {
			const suggestedCollection = mapPostTypeToCollection(pt.name);
			const existingCollection = existingCollections.get(suggestedCollection);
			const requiredFields = pt.supports && "thumbnail" in pt.supports ? [...BASE_REQUIRED_FIELDS, FEATURED_IMAGE_FIELD] : [...BASE_REQUIRED_FIELDS];
			const knownSlugs = new Set(requiredFields.map((f) => f.slug));
			const metaTypes = new Map((pt.custom_fields ?? []).map((field) => [sanitizeFieldSlug(field.key), mapInferredFieldType(field.inferred_type)]));
			const jsonAcfFields = [];
			for (const acfField of acfFieldsForPostType(data.acf, pt.name)) {
				const slug = sanitizeFieldSlug(acfField.name);
				if (knownSlugs.has(slug)) continue;
				knownSlugs.add(slug);
				const type = acfImportFieldType(acfField, existingCollection?.fields.get(slug)?.type, metaTypes.get(slug));
				if (type === "json") jsonAcfFields.push(acfField);
				requiredFields.push({
					slug,
					label: acfField.label || fieldLabelFromKey(acfField.name),
					type,
					required: false
				});
			}
			for (const customField of pt.custom_fields ?? []) {
				if (isPluginBookkeepingMeta(customField.key)) continue;
				if (isAcfRowMeta(customField.key, jsonAcfFields)) continue;
				const slug = sanitizeFieldSlug(customField.key);
				if (knownSlugs.has(slug)) continue;
				knownSlugs.add(slug);
				requiredFields.push({
					slug,
					label: fieldLabelFromKey(customField.key),
					type: mapInferredFieldType(customField.inferred_type),
					required: false
				});
			}
			return {
				name: pt.name,
				count: pt.total,
				suggestedCollection,
				requiredFields,
				schemaStatus: checkSchemaCompatibility(requiredFields, existingCollection)
			};
		});
		const attachments = [];
		if (data.attachments.count > 0) try {
			let page = 1;
			let totalPages = 1;
			while (page <= totalPages) {
				const mediaResponse = await fetchPluginApi(siteUrl, "media", {
					per_page: "500",
					page: String(page)
				}, headers, 3e4);
				if (!mediaResponse.ok) break;
				const mediaData = await mediaResponse.json();
				totalPages = mediaData.pages;
				for (const item of mediaData.items) attachments.push({
					id: item.id,
					url: item.url,
					filename: item.filename,
					mimeType: item.mime_type,
					title: item.title,
					alt: item.alt,
					caption: item.caption,
					width: item.width,
					height: item.height
				});
				page++;
			}
		} catch (e) {
			if (e instanceof SiteChallengeError) throw e;
			console.warn("Failed to fetch media list:", e);
		}
		const categoryTaxonomy = data.taxonomies.find((t) => t.name === "category");
		const tagTaxonomy = data.taxonomies.find((t) => t.name === "post_tag");
		return {
			sourceId: "wordpress-plugin",
			site: {
				title: data.site.title,
				url: data.site.url
			},
			postTypes,
			attachments: {
				count: data.attachments.count,
				items: attachments
			},
			categories: categoryTaxonomy?.term_count ?? 0,
			tags: tagTaxonomy?.term_count ?? 0,
			authors: data.authors.map((a) => ({
				id: a.id,
				login: a.login,
				email: a.email,
				displayName: a.display_name,
				postCount: a.post_count
			})),
			i18n: pluginI18nToDetection(data.i18n)
		};
	},
	async *fetchContent(input, options) {
		const { siteUrl, headers } = getRequestConfig(input);
		for (const postType of options.postTypes) {
			let page = 1;
			let totalPages = 1;
			let yielded = 0;
			while (page <= totalPages) {
				const response = await fetchPluginApi(siteUrl, "content", {
					post_type: postType,
					status: options.includeDrafts ? "any" : "publish",
					per_page: "100",
					page: String(page)
				}, headers, 6e4);
				if (!response.ok) throw new Error(`Failed to fetch ${postType}: ${response.statusText}`);
				const data = await response.json();
				totalPages = data.pages;
				for (const post of data.items) {
					yield pluginPostToNormalizedItem(post, siteUrl);
					yielded++;
					if (options.limit && yielded >= options.limit) return;
				}
				page++;
			}
		}
	},
	async fetchMedia(url, _input) {
		validateExternalUrl(url);
		const response = await ssrfSafeFetch(url, { headers: { "User-Agent": IMPORTER_USER_AGENT } });
		if (!response.ok) throw new Error(`Failed to fetch media: ${response.statusText}`);
		return response.blob();
	}
};
/**
* Fetch a single page of content for one post type. This is the unit of
* work for the chunked import: one Worker invocation imports one page,
* keeping each request far below Cloudflare's CPU and subrequest limits
* (see issue #475).
*/
async function fetchPluginContentPage(options) {
	const { siteUrl, headers } = getRequestConfig({
		type: "url",
		url: options.siteUrl,
		token: options.token
	});
	const response = await fetchPluginApi(siteUrl, "content", {
		post_type: options.postType,
		status: options.includeDrafts ? "any" : "publish",
		per_page: String(options.perPage),
		page: String(options.page)
	}, headers, 6e4);
	if (!response.ok) throw new Error(`Failed to fetch ${options.postType}: ${response.statusText}`);
	const data = await response.json();
	return {
		items: data.items.map((post) => pluginPostToNormalizedItem(post, siteUrl)),
		totalPages: data.pages
	};
}
/** Plugin `inferred_type` values that are valid EmDash field types as-is */
var VALID_INFERRED_TYPES = /* @__PURE__ */ new Set([
	"string",
	"text",
	"number",
	"integer",
	"boolean",
	"datetime",
	"json",
	"reference"
]);
/**
* Map the plugin's inferred custom-field type to an EmDash field type.
* Unknown values fall back to string (always safe for TEXT storage).
*/
function mapInferredFieldType(inferredType) {
	return VALID_INFERRED_TYPES.has(inferredType) ? inferredType : "string";
}
/**
* EmDash field types for ACF field types that hold a single value and return
* a scalar by default. When a return format makes `get_fields()` give an
* array, the raw meta value fills the field instead. Every other ACF type
* (select, checkbox, relationship, repeater, gallery, ...) can return several
* values or an object and is stored as JSON.
*/
var ACF_FIELD_TYPES = {
	text: "string",
	email: "string",
	url: "string",
	password: "string",
	radio: "string",
	button_group: "string",
	color_picker: "string",
	oembed: "string",
	date_picker: "string",
	date_time_picker: "string",
	time_picker: "string",
	textarea: "text",
	wysiwyg: "text",
	number: "number",
	range: "number",
	true_false: "boolean"
};
/**
* The field type for an ACF field. A collection created by an earlier
* import holds the type the raw meta suggested for that key; that type is
* kept so the collection still imports, and the field's flattened row
* keys then keep filling their own fields.
*/
function acfImportFieldType(field, existingType, metaType) {
	const acfType = ACF_FIELD_TYPES[field.type] ?? "json";
	if (existingType && metaType && !isTypeCompatible(acfType, existingType) && isTypeCompatible(metaType, existingType)) return existingType;
	return acfType;
}
/** ACF layout-only field types that hold no value */
var ACF_LAYOUT_TYPES = /* @__PURE__ */ new Set([
	"tab",
	"message",
	"accordion"
]);
/** Fields of the ACF field groups whose location rules include `post_type == <postType>` */
function acfFieldsForPostType(groups, postType) {
	const fields = [];
	for (const group of groups ?? []) {
		if (!group.location?.some((rules) => rules.some((rule) => rule.param === "post_type" && rule.operator === "==" && rule.value === postType))) continue;
		for (const field of group.fields) if (field.name && !ACF_LAYOUT_TYPES.has(field.type)) fields.push(field);
	}
	return fields;
}
var ACF_ROW_SUFFIX = /^_\d+_/;
/**
* ACF stores repeater and flexible content rows as `<name>_<row>_<sub>`
* meta keys. Their values already arrive whole under the parent field in
* `get_fields()`.
*/
function isAcfRowMeta(key, acfFields) {
	return acfFields.some((field) => (field.type === "repeater" || field.type === "flexible_content") && key.startsWith(field.name) && ACF_ROW_SUFFIX.test(key.slice(field.name.length)));
}
var FIELD_KEY_SEPARATORS = /[_-]+/;
/** Derive a human label from a meta key: "event_start-date" -> "Event Start Date" */
function fieldLabelFromKey(key) {
	return key.split(FIELD_KEY_SEPARATORS).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
/**
* Convert plugin i18n info to the shared I18nDetection type.
* Returns undefined when no multilingual plugin is detected.
*/
function pluginI18nToDetection(i18n) {
	if (!i18n) return void 0;
	return {
		plugin: i18n.plugin,
		defaultLocale: i18n.default_locale,
		locales: i18n.locales
	};
}
/**
* Get request configuration from input
*/
function getRequestConfig(input) {
	if (input.type === "url") {
		const siteUrl = normalizeUrl$1(input.url);
		validateExternalUrl(siteUrl);
		const headers = { Accept: "application/json" };
		if (input.token) headers["Authorization"] = `Basic ${input.token}`;
		return {
			siteUrl,
			headers
		};
	}
	if (input.type === "oauth") {
		const oauthSiteUrl = normalizeUrl$1(input.url);
		validateExternalUrl(oauthSiteUrl);
		return {
			siteUrl: oauthSiteUrl,
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${input.accessToken}`
			}
		};
	}
	throw new Error("WordPress plugin source requires URL or OAuth input");
}
/**
* Convert plugin post to normalized item
*/
function pluginPostToNormalizedItem(post, siteUrl) {
	const content = post.content ? gutenbergToPortableText(post.content) : [];
	relativizeContentLinks(content, siteUrl);
	const categories = post.taxonomies?.category?.map((c) => c.slug) ?? post.taxonomies?.categories?.map((c) => c.slug) ?? [];
	const tags = post.taxonomies?.post_tag?.map((t) => t.slug) ?? post.taxonomies?.tags?.map((t) => t.slug) ?? [];
	const customTaxonomies = {};
	for (const [name, terms] of Object.entries(post.taxonomies ?? {})) {
		if ([
			"category",
			"categories",
			"post_tag",
			"tags"
		].includes(name)) continue;
		if (Array.isArray(terms) && terms.length > 0) customTaxonomies[name] = terms.map((t) => t.slug);
	}
	const meta = { ...post.meta };
	if (post.acf) meta._acf = post.acf;
	if (post.yoast) meta._yoast = post.yoast;
	if (post.rankmath) meta._rankmath = post.rankmath;
	return {
		sourceId: post.id,
		postType: post.post_type,
		status: mapWpStatus(post.status),
		slug: post.slug,
		title: post.title,
		content,
		excerpt: post.excerpt || void 0,
		date: parseWxrDate(post.date_gmt, void 0, post.date) ?? /* @__PURE__ */ new Date(NaN),
		modified: parseWxrDate(post.modified_gmt, void 0, post.modified),
		author: post.author?.login,
		categories,
		tags,
		customTaxonomies: Object.keys(customTaxonomies).length > 0 ? customTaxonomies : void 0,
		meta,
		featuredImage: post.featured_image?.url,
		locale: post.locale,
		translationGroup: post.translation_group
	};
}
/**
* Fetch taxonomies from plugin API
*/
async function fetchPluginTaxonomies(siteUrl, authToken) {
	const normalizedSiteUrl = normalizeUrl$1(siteUrl);
	validateExternalUrl(normalizedSiteUrl);
	const response = await fetchPluginApi(normalizedSiteUrl, "taxonomies", {}, {
		Accept: "application/json",
		Authorization: `Basic ${authToken}`
	}, 3e4);
	if (!response.ok) throw new Error(`Failed to fetch taxonomies: ${response.statusText}`);
	return response.json();
}
/**
* Fetch navigation menus from plugin API (added in emdash-exporter 1.1.0).
* Returns an empty array when the endpoint doesn't exist (older plugin).
*/
async function fetchPluginMenus(siteUrl, authToken) {
	const normalizedSiteUrl = normalizeUrl$1(siteUrl);
	validateExternalUrl(normalizedSiteUrl);
	const response = await fetchPluginApi(normalizedSiteUrl, "menus", {}, {
		Accept: "application/json",
		Authorization: `Basic ${authToken}`
	}, 3e4);
	if (response.status === 404) return [];
	if (!response.ok) throw new Error(`Failed to fetch menus: ${response.statusText}`);
	return response.json();
}
/**
* Fetch site options from plugin API (title, tagline, logo, favicon, ...)
*/
async function fetchPluginOptions(siteUrl, authToken) {
	const normalizedSiteUrl = normalizeUrl$1(siteUrl);
	validateExternalUrl(normalizedSiteUrl);
	const response = await fetchPluginApi(normalizedSiteUrl, "options", {}, {
		Accept: "application/json",
		Authorization: `Basic ${authToken}`
	}, 3e4);
	if (!response.ok) throw new Error(`Failed to fetch options: ${response.statusText}`);
	return response.json();
}
/**
* Fetch a single page of comments from the plugin API (added in
* emdash-exporter 1.2.0). The exporter orders by comment ID ascending, so
* parents always appear before their children across pages. Returns
* `totalPages: 0` when the endpoint doesn't exist (older plugin).
*/
async function fetchPluginCommentsPage(siteUrl, authToken, page) {
	const normalizedSiteUrl = normalizeUrl$1(siteUrl);
	validateExternalUrl(normalizedSiteUrl);
	const response = await fetchPluginApi(normalizedSiteUrl, "comments", {
		per_page: "500",
		page: String(page)
	}, {
		Accept: "application/json",
		Authorization: `Basic ${authToken}`
	}, 3e4);
	if (response.status === 404) return {
		items: [],
		totalPages: 0
	};
	if (!response.ok) throw new Error(`Failed to fetch comments: ${response.statusText}`);
	const data = await response.json();
	return {
		items: data.items,
		totalPages: data.pages
	};
}
/**
* Fetch all comments from plugin API, paginating through every page.
* Returns an empty array when the endpoint doesn't exist (older plugin).
*/
async function fetchPluginComments(siteUrl, authToken) {
	const comments = [];
	let page = 1;
	let totalPages = 1;
	while (page <= totalPages) {
		const result = await fetchPluginCommentsPage(siteUrl, authToken, page);
		totalPages = result.totalPages;
		comments.push(...result.items);
		page++;
	}
	return comments;
}
/**
* WordPress REST API probe
*
* Probes self-hosted WordPress sites to detect capabilities.
* This source is probe-only - it tells users what's available
* and suggests next steps (usually: upload WXR file).
*/
var TRAILING_SLASHES = /\/+$/;
var WP_JSON_SUFFIX = /\/wp-json\/?$/;
var wordpressRestSource = {
	id: "wordpress-rest",
	name: "WordPress Site",
	description: "Connect to a self-hosted WordPress site",
	icon: "globe",
	requiresFile: false,
	canProbe: true,
	async probe(url) {
		try {
			const siteUrl = normalizeUrl(url);
			validateExternalUrl(siteUrl);
			const response = await ssrfSafeFetch(`${siteUrl}/wp-json/`, {
				headers: { Accept: "application/json" },
				signal: AbortSignal.timeout(1e4)
			});
			if (!response.ok) {
				if (!(await ssrfSafeFetch(`${siteUrl}/?rest_route=/`, {
					headers: { Accept: "application/json" },
					signal: AbortSignal.timeout(1e4)
				})).ok) return null;
			}
			const data = await response.json();
			if (!data.namespaces?.includes("wp/v2")) return null;
			const preview = await getPublicContentCounts(siteUrl);
			const hasAppPasswords = !!data.authentication?.["application-passwords"];
			return {
				sourceId: "wordpress-rest",
				confidence: "definite",
				detected: {
					platform: "wordpress",
					siteTitle: data.name,
					siteUrl: data.url || data.home || siteUrl
				},
				capabilities: {
					publicContent: true,
					privateContent: false,
					customPostTypes: false,
					allMeta: false,
					mediaStream: true
				},
				auth: hasAppPasswords ? {
					type: "password",
					instructions: "To import drafts and private content, create an Application Password in WordPress → Users → Your Profile → Application Passwords"
				} : void 0,
				preview,
				suggestedAction: {
					type: "upload",
					instructions: "For a complete import including drafts, custom post types, and all metadata, export your content from WordPress (Tools → Export) and upload the file here."
				}
			};
		} catch {
			return null;
		}
	},
	async analyze(_input, _context) {
		throw new Error("Direct REST API import not implemented. Please upload a WXR export file.");
	},
	async *fetchContent(_input, _options) {
		throw new Error("Direct REST API import not implemented. Please upload a WXR export file.");
	}
};
/**
* Normalize a URL for API requests
*/
function normalizeUrl(url) {
	let normalized = url.trim();
	if (!normalized.startsWith("http")) normalized = `https://${normalized}`;
	normalized = normalized.replace(TRAILING_SLASHES, "");
	normalized = normalized.replace(WP_JSON_SUFFIX, "");
	return normalized;
}
/**
* Get public content counts from REST API
*/
async function getPublicContentCounts(siteUrl) {
	const result = {};
	try {
		const [postsRes, pagesRes, mediaRes] = await Promise.allSettled([
			ssrfSafeFetch(`${siteUrl}/wp-json/wp/v2/posts?per_page=1`, { signal: AbortSignal.timeout(5e3) }),
			ssrfSafeFetch(`${siteUrl}/wp-json/wp/v2/pages?per_page=1`, { signal: AbortSignal.timeout(5e3) }),
			ssrfSafeFetch(`${siteUrl}/wp-json/wp/v2/media?per_page=1`, { signal: AbortSignal.timeout(5e3) })
		]);
		if (postsRes.status === "fulfilled" && postsRes.value.ok) {
			const total = postsRes.value.headers.get("X-WP-Total");
			if (total) result.posts = parseInt(total, 10);
		}
		if (pagesRes.status === "fulfilled" && pagesRes.value.ok) {
			const total = pagesRes.value.headers.get("X-WP-Total");
			if (total) result.pages = parseInt(total, 10);
		}
		if (mediaRes.status === "fulfilled" && mediaRes.value.ok) {
			const total = mediaRes.value.headers.get("X-WP-Total");
			if (total) result.media = parseInt(total, 10);
		}
	} catch {}
	return result;
}
/**
* Import source registry
*
* Manages available import sources and provides URL probing.
*/
var TRAILING_SLASHES_PATTERN = /\/+$/;
/** Registered import sources */
var sources = /* @__PURE__ */ new Map();
/** Whether the built-in sources have been added (or cleared on purpose). */
var builtinsAdded = false;
/**
* Add the built-in sources on first use rather than when the module is
* imported, so the registry has no import-time side effect for a bundler to
* drop. Priority order, most specific first: the plugin source, if the site
* has our plugin, then the REST API, then a WXR file.
*/
function ensureBuiltinSources() {
	if (builtinsAdded) return;
	builtinsAdded = true;
	for (const source of [
		wordpressPluginSource,
		wordpressRestSource,
		wxrSource
	]) sources.set(source.id, source);
}
/**
* A bot-protection challenge page (for example Cloudflare's "Just a moment...")
* answered instead of the source's API. Server-side requests can't solve it,
* so the site owner has to let the importer's requests through.
*/
var SiteChallengeError = class extends Error {
	constructor() {
		super("Cloudflare's bot protection answered with a challenge page instead of the EmDash Exporter API. Let requests to /wp-json/emdash/v1/ and ?rest_route=/emdash/v1/ through (for example with a WAF custom rule that skips bot protection), or pause bot protection during the migration.");
		this.name = "SiteChallengeError";
	}
};
/**
* Get a source by ID
*/
function getSource(id) {
	ensureBuiltinSources();
	return sources.get(id);
}
/**
* Get all registered sources
*/
function getAllSources() {
	ensureBuiltinSources();
	return [...sources.values()];
}
/**
* Get sources that can probe URLs
*/
function getUrlSources() {
	ensureBuiltinSources();
	return getAllSources().filter((s) => s.canProbe);
}
/**
* Probe a URL against all registered sources
*
* Returns probe results sorted by confidence (definite > likely > possible)
*/
async function probeUrl(url) {
	let normalizedUrl = url.trim();
	if (!normalizedUrl.startsWith("http")) normalizedUrl = `https://${normalizedUrl}`;
	normalizedUrl = normalizedUrl.replace(TRAILING_SLASHES_PATTERN, "");
	await resolveAndValidateExternalUrl(normalizedUrl);
	ensureBuiltinSources();
	const results = [];
	const urlSources = getUrlSources();
	let challenged = false;
	const probePromises = urlSources.map(async (source) => {
		try {
			const result = await source.probe?.(normalizedUrl);
			if (result) return result;
		} catch (error) {
			if (error instanceof SiteChallengeError) challenged = true;
			console.debug(`Probe failed for ${source.id}:`, error);
		}
		return null;
	});
	const probeResults = await Promise.allSettled(probePromises);
	for (const result of probeResults) if (result.status === "fulfilled" && result.value) results.push(result.value);
	const confidenceOrder = {
		definite: 0,
		likely: 1,
		possible: 2
	};
	results.sort((a, b) => confidenceOrder[a.confidence] - confidenceOrder[b.confidence]);
	return {
		url: normalizedUrl,
		isWordPress: results.length > 0,
		bestMatch: results[0] ?? null,
		allMatches: results,
		...challenged && results.length === 0 ? { challenged: true } : {}
	};
}
export { fetchPluginMenus as a, getSource as c, fetchPluginContentPage as i, probeUrl as l, fetchPluginComments as n, fetchPluginOptions as o, fetchPluginCommentsPage as r, fetchPluginTaxonomies as s, SiteChallengeError as t };
