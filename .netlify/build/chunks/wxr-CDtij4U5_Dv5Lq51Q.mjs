import { t as slugify } from "./slugify_PHKs_6uy.mjs";
import { o as RESERVED_COLLECTION_SLUGS, s as RESERVED_FIELD_SLUGS } from "./types-BmBK2cqf_DwQUyWfv.mjs";
import mime from "mime/lite";
import sax from "sax";
import { gutenbergToPortableText } from "@emdash-cms/gutenberg-to-portable-text";
// node_modules/emdash/dist/utils-DIfKXQ5o.mjs
/** Internal WordPress post types that should be excluded from import */
var INTERNAL_POST_TYPES = [
	"revision",
	"nav_menu_item",
	"custom_css",
	"customize_changeset",
	"oembed_cache",
	"wp_global_styles",
	"wp_navigation",
	"wp_template",
	"wp_template_part",
	"attachment",
	"wp_block",
	"acf-field-group",
	"acf-field",
	"acf-post-type",
	"acf-taxonomy",
	"acf-ui-options-page"
];
/** Internal meta key prefixes to filter out */
var INTERNAL_META_PREFIXES = ["_edit_", "_wp_"];
var NUMERIC_PATTERN = /^-?\d+(\.\d+)?$/;
var TRAILING_SLASHES = /\/+$/;
var WP_JSON_SUFFIX = /\/wp-json\/?.*$/;
/** Specific internal meta keys */
var INTERNAL_META_KEYS = [
	"_edit_last",
	"_edit_lock",
	"_pingme",
	"_encloseme"
];
/** Base fields required for any WordPress import */
var BASE_REQUIRED_FIELDS = [
	{
		slug: "title",
		label: "Title",
		type: "string",
		required: true,
		searchable: true
	},
	{
		slug: "content",
		label: "Content",
		type: "portableText",
		required: false,
		searchable: true
	},
	{
		slug: "excerpt",
		label: "Excerpt",
		type: "text",
		required: false
	}
];
/** Featured image field - only added to post types that have _thumbnail_id */
var FEATURED_IMAGE_FIELD = {
	slug: "featured_image",
	label: "Featured Image",
	type: "image",
	required: false
};
/**
* Check if a post type is internal/should be excluded
*/
function isInternalPostType(type) {
	return INTERNAL_POST_TYPES.includes(type);
}
/**
* Check if a meta key is internal/should be filtered out
*/
function isInternalMetaKey(key) {
	if (INTERNAL_META_KEYS.includes(key)) return true;
	for (const prefix of INTERNAL_META_PREFIXES) if (key.startsWith(prefix)) return true;
	if (key === "_thumbnail_id") return false;
	if (key.startsWith("_yoast_")) return false;
	if (key.startsWith("_rank_math_")) return false;
	if (key.startsWith("_")) return true;
	return false;
}
/**
* Map WordPress status to normalized status
*/
function mapWpStatus(status) {
	switch (status) {
		case "publish": return "publish";
		case "draft": return "draft";
		case "pending": return "pending";
		case "private": return "private";
		case "future": return "future";
		default: return "draft";
	}
}
/** Default mappings from WordPress post types to EmDash collections */
var POST_TYPE_TO_COLLECTION = {
	post: "posts",
	page: "pages",
	attachment: "media",
	product: "products",
	portfolio: "portfolio",
	testimonial: "testimonials",
	team: "team",
	event: "events",
	faq: "faqs"
};
var INVALID_COLLECTION_SLUG_CHARS = /[^a-z0-9_]/g;
/** Turn a WordPress post type name into a valid, non-reserved collection slug. */
function sanitizeCollectionSlug(slug) {
	const sanitized = slug.toLowerCase().replace(INVALID_COLLECTION_SLUG_CHARS, "_").replace(LEADING_NON_ALPHA_CHARS, "");
	if (!sanitized) return "imported";
	if (RESERVED_COLLECTION_SLUGS.includes(sanitized)) return `wp_${sanitized}`;
	return sanitized;
}
/**
* Map WordPress post type to EmDash collection name
*/
function mapPostTypeToCollection(postType) {
	return POST_TYPE_TO_COLLECTION[postType] || sanitizeCollectionSlug(postType);
}
/**
* Map WordPress meta key to EmDash field slug
*/
function mapMetaKeyToField(key) {
	if (key === "_yoast_wpseo_title") return "seo_title";
	if (key === "_yoast_wpseo_metadesc") return "seo_description";
	if (key === "_rank_math_title") return "seo_title";
	if (key === "_rank_math_description") return "seo_description";
	if (key === "_thumbnail_id") return "featured_image";
	if (key.startsWith("_")) return key.slice(1);
	return key;
}
/**
* Infer field type from meta key name and sample value
*/
function inferMetaType(key, value) {
	if (key.endsWith("_id") || key === "_thumbnail_id") return "string";
	if (key.endsWith("_date") || key.endsWith("_time")) return "date";
	if (key.endsWith("_count") || key.endsWith("_number")) return "number";
	if (!value) return "string";
	if (value.startsWith("a:") || value.startsWith("{") || value.startsWith("[")) return "json";
	if (NUMERIC_PATTERN.test(value)) return "number";
	if ([
		"0",
		"1",
		"true",
		"false"
	].includes(value)) return "boolean";
	return "string";
}
/**
* Meta prefixes written by well-known WordPress plugins as operational
* bookkeeping (sync state, counters, cache keys) — not content. Without
* this filter, a mature site's analysis suggests dozens of junk fields
* per post type and the real content fields drown in them.
*
* ponytail: curated list of the plugins we've seen in the wild, not a
* taxonomy of the WP ecosystem. Unknown plugins' meta still gets through;
* extend the list as real sites surface new offenders.
*/
var PLUGIN_META_PREFIXES = [
	"aawp_",
	"algolia_",
	"amazon_polly_",
	"ampforwp_",
	"classifai_",
	"essb_",
	"eg_",
	"gnpub_",
	"jetpack_",
	"mashsb_",
	"monsterinsights_",
	"onesignal_",
	"penci_",
	"perfmatters_",
	"pys_",
	"rank_math_",
	"rp4wp_",
	"saswp_",
	"sbg_",
	"snap_",
	"spay_",
	"tie_",
	"wl_",
	"wpil_",
	"wprm_",
	"wpswa_",
	"wpuf_",
	"yarpp_"
];
/** Exact meta keys that are plugin/core bookkeeping, not content. */
var PLUGIN_META_KEYS = /* @__PURE__ */ new Set([
	"entity_same_as",
	"exclude_from_search",
	"footnotes",
	"inline_featured_image",
	"os_meta",
	"thirstydata"
]);
/**
* Check whether a meta key is well-known plugin bookkeeping that should
* not become a content field. Hyphens are normalized to underscores
* before matching (e.g. `ampforwp-amp-on-off`).
*/
function isPluginBookkeepingMeta(key) {
	const normalized = key.replaceAll("-", "_");
	if (PLUGIN_META_KEYS.has(normalized)) return true;
	return PLUGIN_META_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}
var INVALID_FIELD_SLUG_CHARS = /[^a-z0-9_]+/g;
var LEADING_NON_ALPHA_CHARS = /^[^a-z]+/;
/**
* Sanitize a WordPress meta/ACF key into a valid EmDash field slug
* (`/^[a-z][a-z0-9_]*$/`, max 63 chars, not reserved).
*
* Must be applied consistently on both sides of an import: once when
* creating fields from the analysis, and again when matching incoming
* meta keys onto schema fields — otherwise keys like `my-field` create
* `my_field` but never receive values.
*/
function sanitizeFieldSlug(key) {
	const sanitized = key.toLowerCase().replace(INVALID_FIELD_SLUG_CHARS, "_").replace(LEADING_NON_ALPHA_CHARS, "").slice(0, 63);
	if (!sanitized) return "field";
	if (RESERVED_FIELD_SLUGS.includes(sanitized)) return `wp_${sanitized}`;
	return sanitized;
}
var REGEX_SPECIALS = /[.*+?^${}()|[\]\\]/g;
var LEADING_WWW = /^www\./;
/**
* Turn an absolute URL into a root-relative one when it points at the
* source site (www-insensitive). Returns null when the URL should be
* left alone: external links, non-http(s) schemes, and `/wp-content/`
* media files — those stay absolute so the later media pass can match
* them against its old-URL -> new-URL map.
*/
function relativizeUrl(url, sourceHost) {
	if (!url.startsWith("http://") && !url.startsWith("https://")) return null;
	try {
		const parsed = new URL(url);
		if (parsed.hostname.replace(LEADING_WWW, "") !== sourceHost) return null;
		if (parsed.pathname.startsWith("/wp-content/")) return null;
		return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/";
	} catch {
		return null;
	}
}
function relativizeMarkDefs(markDefs, sourceHost) {
	for (const def of markDefs ?? []) if (def._type === "link" && typeof def.href === "string") def.href = relativizeUrl(def.href, sourceHost) ?? def.href;
}
/**
* Rewrite internal links in imported content to root-relative URLs, in
* place. Without this, imported posts keep linking back to the old
* WordPress domain (e.g. `https://oldsite.com/companies/google/`)
* instead of staying on the new site.
*
* ponytail: path structures are kept as-is (WP permalink /2024/05/slug/
* stays /2024/05/slug/) — mapping old paths onto the new site's routes
* is the planned permalink->redirect-map feature.
*/
function relativizeContentLinks(blocks, siteUrl) {
	let sourceHost;
	try {
		sourceHost = new URL(siteUrl).hostname.replace(LEADING_WWW, "");
	} catch {
		return;
	}
	const hrefPattern = new RegExp(`href=(["']?)https?://(?:www\\.)?${sourceHost.replace(REGEX_SPECIALS, "\\$&")}(/[^"'\\s>]*)?\\1`, "gi");
	for (const block of blocks) switch (block._type) {
		case "block":
			relativizeMarkDefs(block.markDefs, sourceHost);
			break;
		case "image":
			if (typeof block.link === "string") block.link = relativizeUrl(block.link, sourceHost) ?? block.link;
			else if (block.link?.href) block.link = {
				...block.link,
				href: relativizeUrl(block.link.href, sourceHost) ?? block.link.href
			};
			break;
		case "table":
			for (const row of block.rows) for (const cell of row.cells) relativizeMarkDefs(cell.markDefs, sourceHost);
			break;
		case "columns":
			for (const column of block.columns) relativizeContentLinks(column.content, siteUrl);
			break;
		case "cover":
			relativizeContentLinks(block.content, siteUrl);
			break;
		case "button":
			if (block.url) block.url = relativizeUrl(block.url, sourceHost) ?? block.url;
			break;
		case "buttons":
			for (const button of block.buttons) if (button.url) button.url = relativizeUrl(button.url, sourceHost) ?? button.url;
			break;
		case "htmlBlock": block.html = block.html.replace(hrefPattern, (match, _quote, path) => path?.startsWith("/wp-content/") ? match : `href="${path || "/"}"`);
	}
}
/**
* Normalize URL for API requests
*/
function normalizeUrl(url) {
	let normalized = url.trim();
	if (!normalized.startsWith("http")) normalized = `https://${normalized}`;
	normalized = normalized.replace(TRAILING_SLASHES, "");
	normalized = normalized.replace(WP_JSON_SUFFIX, "");
	return normalized;
}
/**
* Extract filename from URL
*/
function getFilenameFromUrl(url) {
	try {
		return new URL(url).pathname.split("/").filter(Boolean).pop();
	} catch {
		return;
	}
}
/**
* Guess MIME type from filename
*/
function guessMimeType(filename) {
	return mime.getType(filename) ?? void 0;
}
/**
* Build a map of attachment IDs to URLs for resolving featured images
*/
function buildAttachmentMap(attachments) {
	const map = /* @__PURE__ */ new Map();
	for (const att of attachments) if (att.id && att.url) map.set(String(att.id), att.url);
	return map;
}
/**
* Check if two field types are compatible for import
*/
function isTypeCompatible(requiredType, existingType) {
	if (requiredType === existingType) return true;
	return {
		string: [
			"string",
			"text",
			"slug"
		],
		text: ["string", "text"],
		portableText: ["portableText", "json"],
		number: ["number", "integer"],
		integer: ["number", "integer"]
	}[requiredType]?.includes(existingType) ?? false;
}
var MAX_SLUG_COLLISION_ATTEMPTS = 1e3;
/**
* Find or create a unique byline slug, capped at MAX_SLUG_COLLISION_ATTEMPTS.
*/
async function ensureUniqueBylineSlug(bylineRepo, baseSlug) {
	let candidate = baseSlug;
	let suffix = 2;
	while (await bylineRepo.findBySlug(candidate)) {
		if (suffix > MAX_SLUG_COLLISION_ATTEMPTS) throw new Error(`Byline slug collision limit exceeded for base slug "${baseSlug}". Tried ${MAX_SLUG_COLLISION_ATTEMPTS} variants.`);
		candidate = `${baseSlug}-${suffix}`;
		suffix++;
	}
	return candidate;
}
/**
* Resolve (find-or-create) a byline for an imported WordPress author.
* Caches results in `cache` keyed by `authorLogin:mappedUserId`.
*/
async function resolveImportByline(authorLogin, displayName, mappedUserId, bylineRepo, cache) {
	if (!authorLogin) return void 0;
	const cacheKey = `${authorLogin}:${mappedUserId ?? ""}`;
	const cached = cache.get(cacheKey);
	if (cached) return cached;
	if (mappedUserId) {
		const existingForUser = await bylineRepo.findByUserId(mappedUserId);
		if (existingForUser) {
			cache.set(cacheKey, existingForUser.id);
			return existingForUser.id;
		}
	}
	const name = displayName || authorLogin;
	const slug = await ensureUniqueBylineSlug(bylineRepo, slugify(authorLogin) || "author");
	const created = await bylineRepo.create({
		slug,
		displayName: name,
		userId: mappedUserId ?? null,
		isGuest: !mappedUserId
	});
	cache.set(cacheKey, created.id);
	return created.id;
}
/**
* Check schema compatibility between required fields and existing collection
*/
function checkSchemaCompatibility(requiredFields, existingCollection) {
	if (!existingCollection) {
		const fieldStatus = {};
		for (const field of requiredFields) fieldStatus[field.slug] = {
			status: "missing",
			requiredType: field.type
		};
		return {
			exists: false,
			fieldStatus,
			canImport: true
		};
	}
	const fieldStatus = {};
	const incompatibleFields = [];
	for (const field of requiredFields) {
		const existingField = existingCollection.fields.get(field.slug);
		if (!existingField) fieldStatus[field.slug] = {
			status: "missing",
			requiredType: field.type
		};
		else if (isTypeCompatible(field.type, existingField.type)) fieldStatus[field.slug] = {
			status: "compatible",
			existingType: existingField.type,
			requiredType: field.type
		};
		else {
			fieldStatus[field.slug] = {
				status: "type_mismatch",
				existingType: existingField.type,
				requiredType: field.type
			};
			incompatibleFields.push(field.slug);
		}
	}
	const canImport = incompatibleFields.length === 0;
	return {
		exists: true,
		fieldStatus,
		canImport,
		reason: canImport ? void 0 : `Incompatible field types: ${incompatibleFields.join(", ")}`
	};
}
// node_modules/emdash/dist/wxr-CDtij4U5.mjs
var PHP_SERIALIZED_STRING_PATTERN = /s:\d+:"([^"]+)"/g;
var PHP_SERIALIZED_STRING_MATCH_PATTERN = /s:\d+:"([^"]+)"/;
/**
* WPML stores per-post language in postmeta as `_icl_lang_code`. The shared
* translation id is `trid` (this is the group ID -- every translation of the
* same content shares it). `_icl_translation_id` exists on some exports too
* but is a per-translation row id from `wp_icl_translations`, NOT the group
* id, so it must NOT be used as the group key. We accept it only when `trid`
* is absent and trust the export to be internally consistent (the only case
* where that's reasonable is single-post exports with no real grouping).
*
* See `wpml_element_trid` in the WPML hook docs: "the ID of the translation
* group".
*/
var WPML_LOCALE_META_KEYS = ["_icl_lang_code"];
var WPML_TRID_META_KEYS = ["trid", "_icl_translation_id"];
/**
* Polylang stores per-post language in postmeta as `_locale` on newer
* exports. The actual language taxonomy assignment lives on
* `customTaxonomies.language`, which we use as a fallback. Translation
* grouping is encoded in `_translations` as a serialized PHP map of
* `{ lang_code => post_id }`; we synthesize a stable group key from the
* sorted IDs so every member of the group resolves to the same string.
*/
var POLYLANG_LOCALE_META_KEY = "_locale";
var POLYLANG_TRANSLATIONS_META_KEY = "_translations";
var POLYLANG_LANG_TAXONOMY = "language";
/**
* Extract a list of post-IDs from Polylang's `_translations` PHP-serialized
* value. The format we care about is roughly:
*
*   a:2:{s:2:"en";i:1;s:2:"ar";i:7;}
*
* We don't need to round-trip the PHP value -- we just need a stable group
* key shared by every translation of the same content. Concatenating the
* sorted IDs gives us exactly that: every post in the group derives the
* same key from its own copy of `_translations`.
*
* Naïve `/i:(\d+);/g` would also match `i:N;` literals embedded INSIDE
* string values (e.g. `s:11:"i:42;hello";`), which would silently corrupt
* the group key. We walk the serialized blob token-by-token instead.
*
* PHP serializes `s:LEN:"..."` with LEN counted in BYTES, not characters
* (UTF-8 byte length). JS string positions are UTF-16 code units, so we
* encode to bytes via `TextEncoder` and walk byte offsets. Single-byte-only
* inputs (the common case for Polylang's `_translations` which only stores
* ASCII locale codes) take the same path; the encoder is cheap.
*/
function polylangTranslationGroupFromMeta(serialized) {
	const bytes = new TextEncoder().encode(serialized);
	const decoder = new TextDecoder("utf-8");
	const ids = [];
	let i = 0;
	const n = bytes.length;
	const CHAR_S = 115;
	const CHAR_I = 105;
	const CHAR_COLON = 58;
	const CHAR_SEMI = 59;
	const CHAR_QUOTE = 34;
	const indexOf = (byte, from) => {
		for (let k = from; k < n; k++) if (bytes[k] === byte) return k;
		return -1;
	};
	while (i < n) {
		const ch = bytes[i];
		if (ch === CHAR_S && bytes[i + 1] === CHAR_COLON) {
			const lenStart = i + 2;
			const lenEnd = indexOf(CHAR_COLON, lenStart);
			if (lenEnd === -1) break;
			const lenText = decoder.decode(bytes.slice(lenStart, lenEnd));
			const len = Number.parseInt(lenText, 10);
			if (!Number.isFinite(len) || len < 0) {
				i = lenEnd + 1;
				continue;
			}
			if (bytes[lenEnd + 1] !== CHAR_QUOTE) {
				i = lenEnd + 1;
				continue;
			}
			i = lenEnd + 2 + len + 2;
			continue;
		}
		if (ch === CHAR_I && bytes[i + 1] === CHAR_COLON) {
			const valStart = i + 2;
			const valEnd = indexOf(CHAR_SEMI, valStart);
			if (valEnd === -1) break;
			const idText = decoder.decode(bytes.slice(valStart, valEnd));
			const id = Number.parseInt(idText, 10);
			if (Number.isFinite(id)) ids.push(id);
			i = valEnd + 1;
			continue;
		}
		i++;
	}
	if (ids.length === 0) return void 0;
	return `pll:${[...new Set(ids)].toSorted((a, b) => a - b).join(",")}`;
}
/**
* Promote multilingual-plugin metadata from `post.meta` and
* `post.customTaxonomies` into `post.locale` / `post.translationGroup`.
*
* Called once per `<item>` after all of its `<wp:postmeta>` and per-item
* `<category>` entries have been parsed. Safe to call on posts that have no
* multilingual metadata -- it's a no-op in that case.
*
* WPML wins over Polylang when both are present (they shouldn't co-exist on
* the same site, but defensive precedence avoids ambiguity).
*/
function promoteI18nMetadata(post) {
	for (const key of WPML_LOCALE_META_KEYS) {
		const value = post.meta.get(key);
		if (value) {
			post.locale = value;
			break;
		}
	}
	for (const key of WPML_TRID_META_KEYS) {
		const value = post.meta.get(key);
		if (value) {
			post.translationGroup = `wpml:${value}`;
			break;
		}
	}
	if (!post.locale) {
		const pllLocale = post.meta.get(POLYLANG_LOCALE_META_KEY);
		if (pllLocale) post.locale = pllLocale;
		else {
			const firstLang = (post.customTaxonomies?.get(POLYLANG_LANG_TAXONOMY))?.[0];
			if (firstLang) post.locale = firstLang;
		}
	}
	if (!post.translationGroup) {
		const pllTranslations = post.meta.get(POLYLANG_TRANSLATIONS_META_KEY);
		if (pllTranslations) {
			const group = polylangTranslationGroupFromMeta(pllTranslations);
			if (group) post.translationGroup = group;
		}
	}
}
/** Extract string value from a SAX attribute (handles both Tag and QualifiedTag) */
function attrStr(attr) {
	if (typeof attr === "string") return attr;
	if (attr && typeof attr === "object" && "value" in attr) return attr.value;
	return "";
}
/**
* Normalise a `<category domain="...">` value to the matching EmDash
* taxonomy name so per-item label captures can be retrieved later using
* the same key.
*/
function normaliseDomain(domain) {
	if (domain === "post_tag") return "tag";
	return domain;
}
/**
* Persist the human label of a `<category>` text body keyed by the
* normalised `(taxonomy, slug)` pair. Skips trivial labels that equal the
* slug (no information vs. just storing the slug).
*/
function captureItemCategoryLabel(item, pair, label) {
	if (!label || label === pair.nicename) return;
	if (!item.taxonomyLabels) item.taxonomyLabels = /* @__PURE__ */ new Map();
	const key = `${normaliseDomain(pair.domain)}\u0000${pair.nicename}`;
	if (!item.taxonomyLabels.has(key)) item.taxonomyLabels.set(key, label);
}
/** Type guard for complete WxrTerm (all required fields present) */
function isCompleteWxrTerm(term) {
	return term.id !== void 0 && term.taxonomy !== void 0 && term.slug !== void 0 && term.name !== void 0;
}
/**
* Parse a WordPress WXR export from a string
*
* Uses the non-streaming SAX parser API for compatibility with
* environments that don't have Node.js streams (e.g., Cloudflare Workers).
*/
function parseWxrString(xml) {
	return new Promise((resolve, reject) => {
		const parser = sax.parser(true, {
			trim: false,
			normalize: false
		});
		const data = {
			site: {},
			posts: [],
			attachments: [],
			categories: [],
			tags: [],
			authors: [],
			terms: [],
			navMenus: []
		};
		let currentPath = [];
		let currentText = "";
		let currentItem = null;
		let currentAttachment = null;
		let currentCategory = null;
		let currentTag = null;
		let currentAuthor = null;
		let currentTerm = null;
		let currentMetaKey = "";
		let pendingItemCategory = null;
		const navMenuItemPosts = [];
		const menuTermsBySlug = /* @__PURE__ */ new Map();
		parser.onopentag = (node) => {
			const tag = node.name.toLowerCase();
			currentPath.push(tag);
			currentText = "";
			if (tag === "item") currentItem = {
				categories: [],
				tags: [],
				customTaxonomies: /* @__PURE__ */ new Map(),
				meta: /* @__PURE__ */ new Map()
			};
			else if (tag === "wp:category") currentCategory = {};
			else if (tag === "wp:tag") currentTag = {};
			else if (tag === "wp:author") currentAuthor = {};
			else if (tag === "wp:term") currentTerm = {};
			if (tag === "category" && currentItem && node.attributes) {
				const domain = attrStr(node.attributes.domain);
				const nicename = attrStr(node.attributes.nicename);
				if (domain === "category" && nicename) {
					currentItem.categories.push(nicename);
					pendingItemCategory = {
						domain,
						nicename
					};
				} else if (domain === "post_tag" && nicename) {
					currentItem.tags.push(nicename);
					pendingItemCategory = {
						domain,
						nicename
					};
				} else if (domain && nicename && domain !== "category" && domain !== "post_tag") {
					if (!currentItem.customTaxonomies) currentItem.customTaxonomies = /* @__PURE__ */ new Map();
					const existing = currentItem.customTaxonomies.get(domain) || [];
					existing.push(nicename);
					currentItem.customTaxonomies.set(domain, existing);
					pendingItemCategory = {
						domain,
						nicename
					};
				}
			}
		};
		parser.ontext = (text) => {
			currentText += text;
		};
		parser.oncdata = (cdata) => {
			currentText += cdata;
		};
		parser.onclosetag = (tagName) => {
			const tag = tagName.toLowerCase();
			const text = currentText.trim();
			if (currentPath.length === 3 && currentPath[1] === "channel") switch (tag) {
				case "title":
					data.site.title = text;
					break;
				case "link":
					data.site.link = text;
					break;
				case "description":
					data.site.description = text;
					break;
				case "language":
					data.site.language = text;
					break;
				case "wp:base_site_url":
					data.site.baseSiteUrl = text;
					break;
				case "wp:base_blog_url": data.site.baseBlogUrl = text;
			}
			if (currentItem) switch (tag) {
				case "title":
					currentItem.title = text;
					break;
				case "link":
					currentItem.link = text;
					break;
				case "pubdate":
					currentItem.pubDate = text;
					break;
				case "dc:creator":
					currentItem.creator = text;
					break;
				case "guid":
					currentItem.guid = text;
					break;
				case "description":
					currentItem.description = text;
					break;
				case "content:encoded":
					currentItem.content = text;
					break;
				case "excerpt:encoded":
					currentItem.excerpt = text;
					break;
				case "wp:post_id":
					currentItem.id = parseInt(text, 10);
					break;
				case "wp:post_date":
					currentItem.postDate = text;
					break;
				case "wp:post_date_gmt":
					currentItem.postDateGmt = text;
					break;
				case "wp:post_modified":
					currentItem.postModified = text;
					break;
				case "wp:post_modified_gmt":
					currentItem.postModifiedGmt = text;
					break;
				case "wp:comment_status":
					currentItem.commentStatus = text;
					break;
				case "wp:ping_status":
					currentItem.pingStatus = text;
					break;
				case "wp:post_name":
					currentItem.postName = text;
					break;
				case "wp:status":
					currentItem.status = text;
					break;
				case "wp:post_parent":
					currentItem.postParent = parseInt(text, 10);
					break;
				case "wp:menu_order":
					currentItem.menuOrder = parseInt(text, 10);
					break;
				case "wp:post_type":
					currentItem.postType = text;
					if (text === "attachment") currentAttachment = {
						id: currentItem.id,
						title: currentItem.title,
						url: currentItem.link,
						postDate: currentItem.postDate,
						meta: /* @__PURE__ */ new Map()
					};
					break;
				case "wp:post_password":
					currentItem.postPassword = text || void 0;
					break;
				case "wp:is_sticky":
					currentItem.isSticky = text === "1";
					break;
				case "wp:attachment_url":
					if (currentAttachment) currentAttachment.url = text;
					break;
				case "wp:meta_key":
					currentMetaKey = text;
					break;
				case "wp:meta_value":
					if (currentMetaKey && currentItem.meta) currentItem.meta.set(currentMetaKey, text);
					break;
				case "category":
					if (pendingItemCategory && text) captureItemCategoryLabel(currentItem, pendingItemCategory, text);
					pendingItemCategory = null;
					break;
				case "item":
					if (currentAttachment) {
						data.attachments.push(currentAttachment);
						currentAttachment = null;
					} else if (currentItem.postType === "nav_menu_item") {
						navMenuItemPosts.push(currentItem);
						data.posts.push(currentItem);
					} else if (currentItem.postType !== "attachment") {
						promoteI18nMetadata(currentItem);
						data.posts.push(currentItem);
					}
					currentItem = null;
			}
			if (currentCategory) switch (tag) {
				case "wp:term_id":
					currentCategory.id = parseInt(text, 10);
					break;
				case "wp:category_nicename":
					currentCategory.nicename = text;
					break;
				case "wp:cat_name":
					currentCategory.name = text;
					break;
				case "wp:category_parent":
					currentCategory.parent = text || void 0;
					break;
				case "wp:category_description":
					currentCategory.description = text || void 0;
					break;
				case "wp:category":
					if (currentCategory.name) data.categories.push(currentCategory);
					currentCategory = null;
			}
			if (currentTag) switch (tag) {
				case "wp:term_id":
					currentTag.id = parseInt(text, 10);
					break;
				case "wp:tag_slug":
					currentTag.slug = text;
					break;
				case "wp:tag_name":
					currentTag.name = text;
					break;
				case "wp:tag_description":
					currentTag.description = text || void 0;
					break;
				case "wp:tag":
					if (currentTag.name) data.tags.push(currentTag);
					currentTag = null;
			}
			if (currentAuthor) switch (tag) {
				case "wp:author_id":
					currentAuthor.id = parseInt(text, 10);
					break;
				case "wp:author_login":
					currentAuthor.login = text;
					break;
				case "wp:author_email":
					currentAuthor.email = text;
					break;
				case "wp:author_display_name":
					currentAuthor.displayName = text;
					break;
				case "wp:author_first_name":
					currentAuthor.firstName = text;
					break;
				case "wp:author_last_name":
					currentAuthor.lastName = text;
					break;
				case "wp:author":
					if (currentAuthor.login) data.authors.push(currentAuthor);
					currentAuthor = null;
			}
			if (currentTerm) switch (tag) {
				case "wp:term_id":
					currentTerm.id = parseInt(text, 10);
					break;
				case "wp:term_taxonomy":
					currentTerm.taxonomy = text;
					break;
				case "wp:term_slug":
					currentTerm.slug = text;
					break;
				case "wp:term_name":
					currentTerm.name = text;
					break;
				case "wp:term_parent":
					currentTerm.parent = text || void 0;
					break;
				case "wp:term_description":
					currentTerm.description = text || void 0;
					break;
				case "wp:term":
					if (isCompleteWxrTerm(currentTerm)) {
						data.terms.push(currentTerm);
						if (currentTerm.taxonomy === "nav_menu") menuTermsBySlug.set(currentTerm.slug, currentTerm);
					}
					currentTerm = null;
			}
			currentPath.pop();
			currentText = "";
		};
		parser.onerror = (err) => {
			reject(/* @__PURE__ */ new Error(`XML parsing error: ${err.message}`));
		};
		parser.onend = () => {
			data.navMenus = buildNavMenus(navMenuItemPosts, menuTermsBySlug);
			resolve(data);
		};
		parser.write(xml).close();
	});
}
/**
* Build structured navigation menus from nav_menu_item posts
*/
function buildNavMenus(navMenuItemPosts, menuTermsBySlug) {
	const menuItemsByMenu = /* @__PURE__ */ new Map();
	for (const post of navMenuItemPosts) {
		const navMenuSlugs = post.customTaxonomies?.get("nav_menu");
		if (!navMenuSlugs || navMenuSlugs.length === 0) continue;
		const menuSlug = navMenuSlugs[0];
		if (!menuSlug) continue;
		const items = menuItemsByMenu.get(menuSlug) || [];
		items.push(post);
		menuItemsByMenu.set(menuSlug, items);
	}
	const menus = [];
	for (const [menuSlug, posts] of menuItemsByMenu) {
		const menuTerm = menuTermsBySlug.get(menuSlug);
		const menuId = menuTerm?.id || 0;
		const items = posts.map((post) => {
			const meta = post.meta;
			const menuItemTypeRaw = meta.get("_menu_item_type") || "custom";
			const menuItemType = menuItemTypeRaw === "post_type" || menuItemTypeRaw === "post_type_archive" || menuItemTypeRaw === "taxonomy" ? menuItemTypeRaw : "custom";
			const objectType = meta.get("_menu_item_object");
			const objectIdStr = meta.get("_menu_item_object_id");
			const url = meta.get("_menu_item_url");
			const parentIdStr = meta.get("_menu_item_menu_item_parent");
			const target = meta.get("_menu_item_target");
			const classesStr = meta.get("_menu_item_classes");
			let classes;
			if (classesStr) {
				const matches = classesStr.match(PHP_SERIALIZED_STRING_PATTERN);
				if (matches) classes = matches.map((m) => m.match(PHP_SERIALIZED_STRING_MATCH_PATTERN)?.[1]).filter(Boolean).join(" ");
			}
			return {
				id: post.id || 0,
				menuId,
				parentId: parentIdStr ? parseInt(parentIdStr, 10) || void 0 : void 0,
				sortOrder: post.menuOrder || 0,
				type: menuItemType,
				objectType: objectType || void 0,
				objectId: objectIdStr ? parseInt(objectIdStr, 10) : void 0,
				url: url || void 0,
				title: post.title || "",
				target: target || void 0,
				classes: classes || void 0
			};
		});
		items.sort((a, b) => a.sortOrder - b.sortOrder);
		menus.push({
			id: menuId,
			name: menuSlug,
			label: menuTerm?.name || menuSlug,
			items
		});
	}
	return menus;
}
/**
* WXR (WordPress eXtended RSS) import source
*
* Handles WordPress export file uploads (.xml).
* This wraps the existing WXR parsing and analysis logic.
*/
var wxrSource = {
	id: "wxr",
	name: "WordPress Export File",
	description: "Upload a WordPress export file (.xml)",
	icon: "upload",
	requiresFile: true,
	canProbe: false,
	async analyze(input, context) {
		if (input.type !== "file") throw new Error("WXR source requires a file input");
		return analyzeWxrData(await parseWxrString(await input.file.text()), context.getExistingCollections ? await context.getExistingCollections() : /* @__PURE__ */ new Map());
	},
	async *fetchContent(input, options) {
		if (input.type !== "file") throw new Error("WXR source requires a file input");
		const wxr = await parseWxrString(await input.file.text());
		const attachmentMap = buildAttachmentMap(wxr.attachments);
		let count = 0;
		for (const post of wxr.posts) {
			const postType = post.postType || "post";
			if (!options.postTypes.includes(postType)) continue;
			if (isInternalPostType(postType)) continue;
			if (!options.includeDrafts && post.status !== "publish") continue;
			yield wxrPostToNormalizedItem(post, attachmentMap, wxr.site.link || "");
			count++;
			if (options.limit && count >= options.limit) break;
		}
	}
};
/**
* Analyze WXR data and return normalized ImportAnalysis
*/
function analyzeWxrData(wxr, existingCollections) {
	const postTypeCounts = /* @__PURE__ */ new Map();
	const postTypesWithThumbnails = /* @__PURE__ */ new Set();
	const metaKeys = /* @__PURE__ */ new Map();
	const authorPostCounts = /* @__PURE__ */ new Map();
	for (const post of wxr.posts) {
		const type = post.postType || "post";
		postTypeCounts.set(type, (postTypeCounts.get(type) || 0) + 1);
		if (post.creator) authorPostCounts.set(post.creator, (authorPostCounts.get(post.creator) || 0) + 1);
		if (post.meta.has("_thumbnail_id")) postTypesWithThumbnails.add(type);
		for (const [key, value] of post.meta) {
			const existing = metaKeys.get(key);
			if (existing) {
				existing.count++;
				if (existing.samples.length < 3 && value) existing.samples.push(value.slice(0, 100));
			} else metaKeys.set(key, {
				count: 1,
				samples: value ? [value.slice(0, 100)] : [],
				isInternal: isInternalMetaKey(key)
			});
		}
	}
	const customFields = [...metaKeys.entries()].filter(([_, info]) => !info.isInternal).map(([key, info]) => ({
		key,
		count: info.count,
		samples: info.samples,
		suggestedField: mapMetaKeyToField(key),
		suggestedType: inferMetaType(key, info.samples[0]),
		isInternal: info.isInternal
	})).toSorted((a, b) => b.count - a.count);
	const postTypes = [...postTypeCounts.entries()].filter(([type]) => !isInternalPostType(type)).map(([name, count]) => {
		const suggestedCollection = mapPostTypeToCollection(name);
		const existingCollection = existingCollections.get(suggestedCollection);
		const requiredFields = [...BASE_REQUIRED_FIELDS];
		if (postTypesWithThumbnails.has(name)) requiredFields.push(FEATURED_IMAGE_FIELD);
		return {
			name,
			count,
			suggestedCollection,
			requiredFields,
			schemaStatus: checkSchemaCompatibility(requiredFields, existingCollection)
		};
	}).toSorted((a, b) => b.count - a.count);
	const attachmentItems = wxr.attachments.map((att) => {
		const filename = att.url ? getFilenameFromUrl(att.url) : void 0;
		const mimeType = filename ? guessMimeType(filename) : void 0;
		return {
			id: att.id,
			title: att.title,
			url: att.url,
			filename,
			mimeType
		};
	});
	const navMenus = wxr.navMenus.map((menu) => ({
		name: menu.name,
		label: menu.label,
		itemCount: menu.items.length
	}));
	const taxonomyMap = /* @__PURE__ */ new Map();
	for (const term of wxr.terms) {
		if (term.taxonomy === "category" || term.taxonomy === "post_tag" || term.taxonomy === "nav_menu") continue;
		const existing = taxonomyMap.get(term.taxonomy);
		if (existing) {
			existing.count++;
			if (existing.samples.length < 3) existing.samples.push(term.name);
		} else taxonomyMap.set(term.taxonomy, {
			count: 1,
			samples: [term.name]
		});
	}
	const customTaxonomies = Array.from(taxonomyMap.entries(), ([slug, info]) => ({
		slug,
		termCount: info.count,
		sampleTerms: info.samples
	})).toSorted((a, b) => b.termCount - a.termCount);
	const reusableBlocks = wxr.posts.filter((post) => post.postType === "wp_block").map((post) => ({
		id: post.id || 0,
		title: post.title || "Untitled Block",
		slug: post.postName || slugify(post.title || `block-${post.id || Date.now()}`)
	}));
	return {
		sourceId: "wxr",
		site: {
			title: wxr.site.title || "WordPress Site",
			url: wxr.site.link || ""
		},
		postTypes,
		attachments: {
			count: wxr.attachments.length,
			items: attachmentItems
		},
		categories: wxr.categories.length,
		tags: wxr.tags.length,
		authors: wxr.authors.map((a) => ({
			id: a.id,
			login: a.login,
			email: a.email,
			displayName: a.displayName || a.login || "Unknown",
			postCount: a.login ? authorPostCounts.get(a.login) || 0 : 0
		})),
		navMenus: navMenus.length > 0 ? navMenus : void 0,
		customTaxonomies: customTaxonomies.length > 0 ? customTaxonomies : void 0,
		reusableBlocks: reusableBlocks.length > 0 ? reusableBlocks : void 0,
		customFields
	};
}
/**
* Convert a WXR post to a normalized item
*/
function wxrPostToNormalizedItem(post, attachmentMap, siteUrl) {
	const content = post.content ? gutenbergToPortableText(post.content) : [];
	if (siteUrl) relativizeContentLinks(content, siteUrl);
	const thumbnailId = post.meta.get("_thumbnail_id");
	const featuredImage = thumbnailId ? attachmentMap.get(String(thumbnailId)) : void 0;
	let customTaxonomies;
	if (post.customTaxonomies && post.customTaxonomies.size > 0) {
		const filtered = Object.fromEntries([...post.customTaxonomies].filter(([taxonomy]) => taxonomy !== "language"));
		if (Object.keys(filtered).length > 0) customTaxonomies = filtered;
	}
	return {
		sourceId: post.id || 0,
		postType: post.postType || "post",
		status: mapWpStatus(post.status),
		slug: post.postName || slugify(post.title || `post-${post.id || Date.now()}`),
		title: post.title || "Untitled",
		content,
		excerpt: post.excerpt,
		date: parseWxrDate(post.postDateGmt, post.pubDate, post.postDate) ?? /* @__PURE__ */ new Date(),
		modified: parseWxrDate(post.postModifiedGmt, void 0, post.postModified),
		author: post.creator,
		categories: post.categories,
		tags: post.tags,
		meta: Object.fromEntries(post.meta),
		featuredImage,
		parentId: post.postParent && post.postParent !== 0 ? post.postParent : void 0,
		menuOrder: post.menuOrder,
		customTaxonomies,
		locale: post.locale,
		translationGroup: post.translationGroup
	};
}
/**
* WordPress uses "0000-00-00 00:00:00" as a sentinel for missing GMT dates
* (e.g. unpublished drafts). This must be treated as absent.
*/
var WXR_ZERO_DATE = "0000-00-00 00:00:00";
/**
* Parse a WXR date with the correct fallback chain:
* 1. GMT date (always UTC, most reliable)
* 2. pubDate (RFC 2822, includes timezone offset)
* 3. Site-local date (MySQL datetime without timezone, imprecise but best available)
*
* Returns undefined when none of the inputs yield a valid date.
* Callers that need a guaranteed Date should use `?? new Date()`.
*/
function parseWxrDate(gmtDate, pubDate, localDate) {
	if (gmtDate && gmtDate !== WXR_ZERO_DATE) return /* @__PURE__ */ new Date(gmtDate.replace(" ", "T") + "Z");
	if (pubDate) {
		const d = new Date(pubDate);
		if (!isNaN(d.getTime())) return d;
	}
	if (localDate) {
		const d = new Date(localDate.replace(" ", "T"));
		if (!isNaN(d.getTime())) return d;
	}
}
export { FEATURED_IMAGE_FIELD as a, isPluginBookkeepingMeta as c, mapWpStatus as d, normalizeUrl as f, sanitizeFieldSlug as g, sanitizeCollectionSlug as h, BASE_REQUIRED_FIELDS as i, isTypeCompatible as l, resolveImportByline as m, parseWxrString as n, checkSchemaCompatibility as o, relativizeContentLinks as p, wxrSource as r, isInternalPostType as s, parseWxrDate as t, mapPostTypeToCollection as u };
