import { t as INTERNAL_MEDIA_PREFIX } from "./normalize-qcU0SKGf_BkffD2dJ.mjs";
import mime from "mime/lite";
// node_modules/emdash/dist/media/image-endpoint.mjs
/** Weak prefix on an ETag, stripped for weak comparison per RFC 7232. */
var WEAK_ETAG_PREFIX = /^W\//;
/**
* Strip surrounding whitespace and the weak prefix from an ETag value for
* weak comparison. Defined at module scope so it is not recreated per request.
*/
function stripWeakEtagPrefix(value) {
	return value.trim().replace(WEAK_ETAG_PREFIX, "");
}
/** Long-lived cache for content-addressed image URLs. */
var IMMUTABLE_IMAGE_CACHE = "public, max-age=31536000, immutable";
/** Cache policy for media keys that Replace original may overwrite. */
var MUTABLE_MEDIA_CACHE_CONTROL = "public, max-age=0, must-revalidate";
/** Route cache lifetime for media responses; replace and delete purge them sooner. */
var MEDIA_ROUTE_CACHE_MAX_AGE = 31536e3;
/** Route cache tag for the original file and every variant of a storage key. */
function mediaCacheTag(storageKey) {
	return `emdash:media:${storageKey}`;
}
/** Cloudflare drops tags longer than 1024 characters but still caches the response. */
function isCacheableMediaKey(storageKey) {
	return isSafeTransformKey(storageKey) && mediaCacheTag(storageKey).length <= 1024;
}
/**
* Whether media of this type and key can be in the route cache, so deleting its file needs a purge.
* Storage backends that infer the served type from the key's extension can serve an image even
* when the stored MIME type is not one.
*/
function isRouteCachedMedia(storageKey, mimeType) {
	if (!isCacheableMediaKey(storageKey)) return false;
	return mimeType.startsWith("image/") || (mime.getType(storageKey) ?? "").startsWith("image/");
}
/** Cache only plain local source URLs; preview queries still reach the transformer unchanged. */
function isCacheableMediaSource(href, requestUrl) {
	const key = matchInternalMediaKey(href);
	if (!key) return false;
	const pathname = `${INTERNAL_MEDIA_PREFIX}${key}`;
	return href === pathname || href === `${requestUrl.origin}${pathname}`;
}
/** Store the current response in the route cache only when its tag can be purged. */
function cacheMediaResponse(cache, storageKey) {
	if (!cache?.enabled || !isCacheableMediaKey(storageKey)) return;
	cache.set({
		maxAge: MEDIA_ROUTE_CACHE_MAX_AGE,
		tags: [mediaCacheTag(storageKey)]
	});
}
/**
* Query parameters of an image endpoint URL, in the order Astro's `getURL`
* writes them. Stock-service endpoints redirect to this order without changing
* the source `href` value.
*/
var CANONICAL_TRANSFORM_PARAMS = [
	"href",
	"w",
	"h",
	"q",
	"f",
	"fit",
	"position",
	"background"
];
/**
* The canonical query for an image endpoint request, or `null` when the
* request already uses it. Known parameters keep their first value (the one
* the endpoint reads) in canonical order, followed by the parameters named in
* the adapter's `assetQueryParams` with the request's own values; everything
* else is dropped.
*/
function canonicalTransformSearch(url, assetQueryParams) {
	const params = url.searchParams;
	const names = [...CANONICAL_TRANSFORM_PARAMS];
	for (const name of assetQueryParams?.keys() ?? []) if (!names.includes(name)) names.push(name);
	const canonical = new URLSearchParams();
	for (const name of names) {
		const value = params.get(name);
		if (value !== null) canonical.append(name, value);
	}
	const search = canonical.toString();
	return search === url.search.slice(1) ? null : search;
}
/** `301` to the canonical form of an image endpoint URL. */
function canonicalTransformRedirect(url, search) {
	return new Response(null, {
		status: 301,
		headers: { Location: `${url.pathname}?${search}` }
	});
}
/**
* Format a Date as an HTTP-date (RFC 7231).
*/
function formatHttpDate(date) {
	return date.toUTCString();
}
/**
* Build a weak validator from representation metadata. Weak because it is based
* on size and modification time rather than a content hash. Keeps the same
* shape for stored files and derived transforms so replacements change the tag.
*/
function makeWeakEtag(size, lastModified, suffix) {
	let value = String(size);
	if (lastModified) value += `-${lastModified.getTime()}`;
	if (suffix) value += `-${suffix}`;
	return `W/"${value}"`;
}
/**
* Build a canonical fingerprint of the transform query params that affect the
* derived /_image bytes. Used as the suffix of a transform's weak ETag.
*/
function getTransformFingerprint(params) {
	const parts = [];
	const append = (name) => {
		const value = params.get(name);
		if (value !== null) parts.push(`${name}=${value}`);
	};
	append("w");
	append("h");
	append("f");
	append("q");
	append("fit");
	return parts.join("&");
}
/**
* Check whether a request's preconditions are satisfied for the given
* representation. Returns true when the client already has the current version.
*/
function isNotModified(request, size, lastModified, suffix) {
	const etag = makeWeakEtag(size, lastModified, suffix);
	const ifNoneMatch = request.headers.get("If-None-Match");
	if (ifNoneMatch !== null) {
		if (ifNoneMatch.trim() === "*") return true;
		return ifNoneMatch.split(",").map(stripWeakEtagPrefix).includes(stripWeakEtagPrefix(etag));
	}
	const ifModifiedSince = request.headers.get("If-Modified-Since");
	if (ifModifiedSince !== null && lastModified) {
		const since = Date.parse(ifModifiedSince);
		if (!Number.isNaN(since)) return Math.floor(lastModified.getTime() / 1e3) * 1e3 <= since;
	}
	return false;
}
/**
* Headers that make a mutable representation conditionally cacheable.
*/
function validatorHeaders(size, lastModified, suffix) {
	const headers = { ETag: makeWeakEtag(size, lastModified, suffix) };
	if (lastModified) headers["Last-Modified"] = formatHttpDate(lastModified);
	return headers;
}
/**
* Raster types safe to render inline. Anything else (SVG, PDF, ...) is served
* as an attachment so it can't execute as an active document. Mirrors the
* `/_emdash/api/media/file/{key}` route's allowlist.
*/
var SAFE_INLINE_IMAGE_TYPES = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp",
	"image/avif",
	"image/bmp",
	"image/x-icon"
]);
/**
* Headers for streaming **original** stored bytes (the no-transform fallback).
* Carries the same stored-XSS protections as the media file route: a sandbox
* CSP, `nosniff`, and `Content-Disposition: attachment` for anything not on the
* inline raster allowlist (so a stored SVG can't run scripts in the site
* origin). Transformed output is always generated raster and doesn't need this.
*/
function originalMediaHeaders(contentType, size, lastModified) {
	return {
		"Content-Type": contentType,
		"Cache-Control": MUTABLE_MEDIA_CACHE_CONTROL,
		"X-Content-Type-Options": "nosniff",
		"Content-Security-Policy": "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
		"Content-Disposition": SAFE_INLINE_IMAGE_TYPES.has(contentType) ? "inline" : "attachment",
		...size !== void 0 ? validatorHeaders(size, lastModified) : {}
	};
}
/** Storage keys safe to serve: the flat `{ulid}{ext}` shape, no slashes/traversal. */
var SAFE_STORAGE_KEY = /^[A-Za-z0-9._-]+$/;
/** Whether a storage key is safe to resolve against the storage backend. */
function isSafeTransformKey(key) {
	return SAFE_STORAGE_KEY.test(key);
}
/**
* If `href` points at the internal EmDash media route
* (`/_emdash/api/media/file/{key}`) with a safe key, return the key; otherwise
* `null` (the endpoint then delegates to the stock image endpoint for bundled
* assets, allowed remote, and `publicUrl` media).
*
* The component absolutizes same-origin media (Astro only optimizes absolute,
* remote-allowed URLs), so `href` is typically `https://site/_emdash/...` but
* may be relative. We match on the **pathname** only and never fetch `href` —
* the key is read from our own storage — so the host is irrelevant and can't be
* an SSRF vector. A dummy base resolves both absolute and relative forms and
* strips any query/fragment.
*/
function matchInternalMediaKey(href) {
	if (!href) return null;
	let pathname;
	try {
		pathname = new URL(href, "http://localhost").pathname;
	} catch {
		return null;
	}
	if (!pathname.startsWith("/_emdash/api/media/file/")) return null;
	const key = pathname.slice(INTERNAL_MEDIA_PREFIX.length);
	if (!key || !isSafeTransformKey(key)) return null;
	return key;
}
export { canonicalTransformSearch as a, isCacheableMediaSource as c, matchInternalMediaKey as d, mediaCacheTag as f, canonicalTransformRedirect as i, isNotModified as l, validatorHeaders as m, MUTABLE_MEDIA_CACHE_CONTROL as n, getTransformFingerprint as o, originalMediaHeaders as p, cacheMediaResponse as r, isCacheableMediaKey as s, IMMUTABLE_IMAGE_CACHE as t, isRouteCachedMedia as u };
