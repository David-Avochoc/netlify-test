import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getI18nConfig } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { a as resolveSecretsCached } from "./secrets-O25WpEe__B3AoQE_o.mjs";
import { n as localizePath, t as interpolateUrlPattern } from "./resolve-Z5YK_6ew_C3Nw14z1.mjs";
import { u as SchemaRegistry } from "./registry-CSLrHSx1_Ce4dsyNi.mjs";
import { i as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { w as contentPreviewUrlBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { t as generatePreviewToken } from "./tokens-DvEbszXd_DfSr40ny.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/query-Cv8bjIwl.mjs
/**
* Get collection metadata with an explicit db handle.
*
* @internal Use `getCollectionInfo()` in templates. This variant is for
* routes that already have a database handle.
*/
async function getCollectionInfoWithDb(db, slug) {
	return new SchemaRegistry(db).getCollection(slug);
}
// node_modules/emdash/dist/urls-BCnpTM3T.mjs
/**
* Preview URL generation
*
* Creates preview URLs that include a signed token for accessing draft content.
*/
var REPEATED_SLASHES = /\/{2,}/g;
/**
* Generate a preview URL for content
*
* The URL includes a `_preview` query parameter with a signed token.
*
* @example
* ```ts
* const url = await getPreviewUrl({
*   collection: "posts",
*   id: "hello-world",
*   secret: process.env.PREVIEW_SECRET!,
* });
* // Returns: /posts/hello-world?_preview=eyJj...
*
* // With base URL:
* const fullUrl = await getPreviewUrl({
*   collection: "posts",
*   id: "hello-world",
*   secret: process.env.PREVIEW_SECRET!,
*   baseUrl: "https://example.com",
* });
* // Returns: https://example.com/posts/hello-world?_preview=eyJj...
*
* // Custom path pattern:
* const customUrl = await getPreviewUrl({
*   collection: "posts",
*   id: "hello-world",
*   secret: process.env.PREVIEW_SECRET!,
*   pathPattern: "/blog/{id}",
* });
* // Returns: /blog/hello-world?_preview=eyJj...
* ```
*/
async function getPreviewUrl(options) {
	const { collection, id, secret, expiresIn = "1h", baseUrl, pathPattern = "/{collection}/{id}", locale = "" } = options;
	const token = await generatePreviewToken({
		contentId: `${collection}:${id}`,
		expiresIn,
		secret
	});
	let path = pathPattern.replace("{collection}", collection).replace("{id}", id).replace("{locale}", locale);
	path = path.replace(REPEATED_SLASHES, "/");
	if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
	const url = new URL(path, baseUrl || "http://placeholder");
	url.searchParams.set("_preview", token);
	if (!baseUrl) return `${url.pathname}${url.search}`;
	return url.toString();
}
/**
* Build a preview URL from a token (when you already have the token)
*
* @example
* ```ts
* const url = buildPreviewUrl({
*   path: "/posts/hello-world",
*   token: existingToken,
* });
* ```
*/
function buildPreviewUrl(options) {
	const { path, token, baseUrl } = options;
	const url = new URL(path, baseUrl || "http://placeholder");
	url.searchParams.set("_preview", token);
	if (!baseUrl) return `${url.pathname}${url.search}`;
	return url.toString();
}
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs
var preview_url_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var DURATION_PATTERN = /^(\d+)([smhdw])$/;
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	const collection = params.collection;
	const id = params.id;
	const { previewSecret } = await resolveSecretsCached(emdash.db);
	let entryLocale = null;
	let entrySlug = null;
	let entryId = id;
	if (emdash?.handleContentGet) {
		const result = await emdash.handleContentGet(collection, id, void 0, void 0, { includeStagedSlug: true });
		if (!result.success) return unwrapResult(result);
		entryLocale = result.data?.item?.locale ?? null;
		entrySlug = result.data?.item?.slug ?? null;
		entryId = result.data?.item?.id ?? id;
	}
	const body = await parseOptionalBody(request, contentPreviewUrlBody, {});
	if (isParseError(body)) return body;
	const expiresIn = body.expiresIn || "1h";
	const explicitPattern = body.pathPattern || null;
	const i18n = getI18nConfig();
	let localeSegment = "";
	if (entryLocale && i18n) localeSegment = entryLocale === i18n.defaultLocale && !i18n.prefixDefaultLocale ? "" : entryLocale;
	else if (entryLocale) localeSegment = entryLocale;
	const expiresInSeconds = typeof expiresIn === "number" ? expiresIn : parseExpiresIn(expiresIn);
	const expiresAt = Math.floor(Date.now() / 1e3) + expiresInSeconds;
	try {
		if (!explicitPattern) {
			let collectionInfo;
			try {
				collectionInfo = await getCollectionInfoWithDb(emdash.db, collection);
			} catch (error) {
				return handleError(error, "Failed to resolve the collection URL pattern", "PREVIEW_URL_ERROR");
			}
			if (collectionInfo?.urlPattern) {
				const path = interpolateUrlPattern({
					pattern: collectionInfo.urlPattern,
					collection,
					slug: entrySlug || id,
					id
				});
				const localized = await localizePath(path, entryLocale ?? "");
				const token = await generatePreviewToken({
					contentId: `${collection}:${entryId}`,
					expiresIn,
					secret: previewSecret
				});
				return apiSuccess({
					url: buildPreviewUrl({
						path: localized ?? path,
						token
					}),
					expiresAt
				});
			}
		}
		return apiSuccess({
			url: await getPreviewUrl({
				collection,
				id,
				secret: previewSecret,
				expiresIn,
				pathPattern: explicitPattern || "/{collection}/{id}",
				locale: localeSegment
			}),
			expiresAt
		});
	} catch (error) {
		return handleError(error, "Failed to generate preview URL", "TOKEN_ERROR");
	}
};
/**
* Parse duration string to seconds
*/
function parseExpiresIn(duration) {
	const match = duration.match(DURATION_PATTERN);
	if (!match) return 3600;
	const value = parseInt(match[1], 10);
	switch (match[2]) {
		case "s": return value;
		case "m": return value * 60;
		case "h": return value * 60 * 60;
		case "d": return value * 60 * 60 * 24;
		case "w": return value * 60 * 60 * 24 * 7;
		default: return 3600;
	}
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url@_@mjs
var page = () => preview_url_exports;
export { page };
