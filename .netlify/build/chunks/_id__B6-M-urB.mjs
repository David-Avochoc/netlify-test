import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { i as handleCommentGet, r as handleCommentDelete } from "./comments-D73Sy_2U_Ca-CN1Gs.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { t as getCommentRouteCacheTags } from "./route-cache-CvTJlNVT_BFNuxryQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	prerender: () => false
});
/**
* Get single comment detail (includes moderation_metadata)
*/
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!id) return apiError("VALIDATION_ERROR", "Comment ID required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "comments:moderate");
	if (denied) return denied;
	try {
		return unwrapResult(await handleCommentGet(emdash.db, id));
	} catch (error) {
		return handleError(error, "Failed to get comment", "COMMENT_GET_ERROR");
	}
};
/**
* Hard delete a comment (ADMIN only)
*/
var DELETE = async ({ params, locals, cache }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!id) return apiError("VALIDATION_ERROR", "Comment ID required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "comments:delete");
	if (denied) return denied;
	try {
		const tags = cache?.enabled ? await getCommentRouteCacheTags(emdash.db, [id], "delete") : [];
		try {
			return unwrapResult(await handleCommentDelete(emdash.db, id));
		} finally {
			if (tags.length > 0) await invalidateRouteCache(cache, tags);
		}
	} catch (error) {
		return handleError(error, "Failed to delete comment", "COMMENT_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_@_@mjs
var page = () => _id__exports;
export { page };
