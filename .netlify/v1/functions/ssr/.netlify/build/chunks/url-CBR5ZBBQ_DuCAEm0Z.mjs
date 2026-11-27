import { t as INTERNAL_MEDIA_PREFIX } from "./normalize-qcU0SKGf_BkffD2dJ.mjs";
// node_modules/emdash/dist/url-CBR5ZBBQ.mjs
var SAFE_STORAGE_KEY = /^[A-Za-z0-9._-]+$/;
var QUERY_OR_FRAGMENT = /[?#]/;
var ABSOLUTE_HTTP_URL = /^https?:\/\//i;
/**
* Build the internal file route URL for a storage key, encoding each path
* segment so `?`, `#` and `%` stay inside the path. A key with an empty, `.` or
* `..` segment is encoded whole, because the URL parser would collapse those
* segments and move the request off the route. Mirrors the admin's
* `localMediaFileUrl`.
*/
function localMediaFileUrl(key) {
	const segments = key.split("/");
	if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) return `${INTERNAL_MEDIA_PREFIX}${encodeURIComponent(key)}`;
	return `${INTERNAL_MEDIA_PREFIX}${segments.map(encodeURIComponent).join("/")}`;
}
/**
* The storage key named by an internal file route URL, the inverse of
* {@link localMediaFileUrl}. Absolute URLs require a matching trusted site
* origin. Returns `null` for other URLs.
*/
function storageKeyFromLocalMediaFileUrl(url, siteOrigin) {
	if (!url.startsWith("/_emdash/api/media/file/")) {
		if (!siteOrigin || !ABSOLUTE_HTTP_URL.test(url)) return null;
		try {
			const parsed = new URL(url);
			const site = new URL(siteOrigin);
			if (parsed.origin !== site.origin || parsed.username || parsed.password) return null;
			url = parsed.pathname;
		} catch {
			return null;
		}
	}
	if (!url.startsWith("/_emdash/api/media/file/")) return null;
	const path = url.slice(24).split(QUERY_OR_FRAGMENT, 1)[0] ?? "";
	try {
		return decodeURIComponent(path) || null;
	} catch {
		return null;
	}
}
/**
* Resolve the public URL for a locally stored media key. Returns an empty
* string when no key is given. When a storage adapter is supplied, defers to
* `storage.getPublicUrl()`; otherwise returns the internal proxy route.
*/
function resolvePublicMediaUrl(storage, storageKey) {
	if (!storageKey) return "";
	if (storage) return storage.getPublicUrl(storageKey);
	return `/_emdash/api/media/file/${storageKey}`;
}
/**
* Build the `getPublicMediaUrl` closure attached to `Astro.locals.emdash`.
* Shared by the anonymous fast path and the full-runtime path in middleware.
*
* @internal
*/
function createPublicMediaUrlResolver(storage) {
	return (key) => resolvePublicMediaUrl(storage, key);
}
/**
* Build a render-time media URL. Prefers `storageKey`, then rewrites an
* internal `url` via `resolve`, then falls back to the internal proxy for a
* bare `id`. External URLs and non-matching internal-looking URLs pass
* through untouched. Returns `""` when nothing usable is present.
*
* @internal
*/
function buildRenderMediaUrl(resolve, ref) {
	const { storageKey, url, id } = ref;
	if (storageKey) return resolve ? resolve(storageKey) : `${INTERNAL_MEDIA_PREFIX}${storageKey}`;
	if (url) {
		if (resolve && url.startsWith("/_emdash/api/media/file/")) {
			const key = url.slice(INTERNAL_MEDIA_PREFIX.length);
			if (SAFE_STORAGE_KEY.test(key)) return resolve(key);
		}
		return url;
	}
	if (id) return `${INTERNAL_MEDIA_PREFIX}${id}`;
	return "";
}
export { storageKeyFromLocalMediaFileUrl as i, createPublicMediaUrlResolver as n, localMediaFileUrl as r, buildRenderMediaUrl as t };
