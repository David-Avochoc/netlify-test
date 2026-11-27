import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { s as commentStatusBody } from "./comments-BFyw2y-m_rpr4pda_.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { i as handleCommentGet } from "./comments-D73Sy_2U_Ca-CN1Gs.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { t as CommentStatusConflictError } from "./service-DbKGSUHC_U1mO66WU.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs
var status_exports = /* @__PURE__ */ __exportAll({
	PUT: () => PUT,
	prerender: () => false
});
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!id) return apiError("VALIDATION_ERROR", "Comment ID required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "comments:moderate");
	if (denied) return denied;
	try {
		const body = await parseBody(request, commentStatusBody);
		if (isParseError(body)) return body;
		const newStatus = body.status;
		const existing = await handleCommentGet(emdash.db, id);
		if (!existing.success) return unwrapResult(existing);
		const previousStatus = existing.data.status;
		if (!emdash.handleCommentModerate) return apiError("COMMENT_MODERATION_UNAVAILABLE", "Comment moderation is unavailable", 500);
		const updated = await emdash.handleCommentModerate(id, newStatus, {
			id: user.id,
			name: user.name ?? null
		}, previousStatus, request);
		if (!updated) return apiError("NOT_FOUND", "Comment not found", 404);
		if (previousStatus !== updated.status && (previousStatus === "approved" || updated.status === "approved")) await invalidateRouteCache(cache, [updated.collection, updated.contentId]);
		return apiSuccess(updated);
	} catch (error) {
		if (error instanceof CommentStatusConflictError) return apiError(error.code, error.message, 409, { currentStatus: error.currentStatus });
		if (typeof error === "object" && error !== null && "code" in error && error.code === "COMMENT_MODERATION_IN_PROGRESS") return apiError("COMMENT_MODERATION_IN_PROGRESS", "Comment moderation is already in progress", 409);
		return handleError(error, "Failed to update comment status", "COMMENT_STATUS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status@_@mjs
var page = () => status_exports;
export { page };
