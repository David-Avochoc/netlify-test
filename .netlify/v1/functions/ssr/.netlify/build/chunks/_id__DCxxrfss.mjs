import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as handleMediaUsageSummaries } from "./media-usage-D6LjfdGn_BMfzBBVJ.mjs";
import { i as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { C as mediaUpdateBody, p as mediaGetQuery } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { f as mediaCacheTag, u as isRouteCachedMedia } from "./image-endpoint_CAMLdpZa.mjs";
import { a as requireOwnerPerm, o as requirePerm, t as canReadMediaUsageCount } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/media/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
/**
* Get media item
*/
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const readDenied = requirePerm(user, "media:read");
	if (readDenied) return readDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), mediaGetQuery);
	if (isParseError(query)) return query;
	const result = await emdash.handleMediaGet(id);
	if (!result.success || query.includeUsage !== "1") return unwrapResult(result);
	const includeCount = canReadMediaUsageCount(user, locals.tokenScopes);
	const usageResult = await handleMediaUsageSummaries(emdash.db, [id], { includeCount });
	if (!usageResult.success) return unwrapResult(usageResult);
	const usage = usageResult.data[id];
	if (!usage) return apiError("MEDIA_USAGE_READ_ERROR", "Failed to read media usage", 500);
	return apiSuccess({ item: {
		...result.data.item,
		usage
	} });
};
/**
* Update media metadata
*
* Authors can edit their own media; editors+ can edit any.
*/
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const editDenied = requirePerm(user, "media:edit_own");
	if (editDenied) return editDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet || !emdash?.handleMediaUpdate) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const getResult = await emdash.handleMediaGet(id);
		if (!getResult.success || !getResult.data?.item) return apiError("NOT_FOUND", "Media item not found", 404);
		const media = getResult.data.item;
		const ownerDenied = requireOwnerPerm(user, media.authorId ?? "", "media:edit_own", "media:edit_any");
		if (ownerDenied) return ownerDenied;
		const body = await parseBody(request, mediaUpdateBody);
		if (isParseError(body)) return body;
		return unwrapResult(await emdash.handleMediaUpdate(id, {
			alt: body.alt,
			caption: body.caption,
			width: body.width,
			height: body.height,
			folderId: body.folderId,
			focalX: body.focalX,
			focalY: body.focalY
		}));
	} catch (error) {
		return handleError(error, "Failed to update media", "MEDIA_UPDATE_ERROR");
	}
};
/**
* Delete media item
*
* Authors can delete their own media; editors+ can delete any.
*/
var DELETE = async ({ params, locals, cache }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const deleteDenied = requirePerm(user, "media:delete_own");
	if (deleteDenied) return deleteDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet || !emdash?.handleMediaDelete) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const getResult = await emdash.handleMediaGet(id);
		if (!getResult.success || !getResult.data?.item) return apiError("NOT_FOUND", "Media item not found", 404);
		const media = getResult.data.item;
		const ownerDenied = requireOwnerPerm(user, media.authorId ?? "", "media:delete_own", "media:delete_any");
		if (ownerDenied) return ownerDenied;
		const result = await emdash.handleMediaDelete(id);
		if (!result.success) return unwrapResult(result);
		if (typeof result.data !== "object" || result.data === null || !("storageDeleted" in result.data) || typeof result.data.storageDeleted !== "boolean") return apiError("MEDIA_DELETE_ERROR", "Failed to delete media", 500);
		if (result.data.storageDeleted && isRouteCachedMedia(result.data.storageKey, result.data.mimeType)) await invalidateRouteCache(cache, [mediaCacheTag(result.data.storageKey)]);
		return apiSuccess({
			deleted: true,
			storageDeleted: result.data.storageDeleted
		});
	} catch (error) {
		return handleError(error, "Failed to delete media", "MEDIA_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_@_@mjs
var page = () => _id__exports;
export { page };
