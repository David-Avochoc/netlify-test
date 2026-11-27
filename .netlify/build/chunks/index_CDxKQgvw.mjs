import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as submitPublicComment } from "./public-submission-BEcSmcWi_CSmtr2Tq.mjs";
import { o as handleCommentList } from "./comments-D73Sy_2U_Ca-CN1Gs.mjs";
// node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs
var _contentId__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* List approved comments for a content item (public, no auth required)
*/
var GET = async ({ params, url, locals }) => {
	const { emdash } = locals;
	const { collection, contentId } = params;
	if (!collection || !contentId) return apiError("VALIDATION_ERROR", "Collection and content ID required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const limit = Math.min(Number(url.searchParams.get("limit") || 50), 100);
		const cursor = url.searchParams.get("cursor") ?? void 0;
		const threaded = url.searchParams.get("threaded") === "true";
		const collectionRow = await emdash.db.selectFrom("_emdash_collections").select(["comments_enabled"]).where("slug", "=", collection).executeTakeFirst();
		if (!collectionRow) return apiError("NOT_FOUND", `Collection '${collection}' not found`, 404);
		if (!collectionRow.comments_enabled) return apiError("COMMENTS_DISABLED", "Comments are not enabled for this collection", 403);
		return unwrapResult(await handleCommentList(emdash.db, collection, contentId, {
			limit,
			cursor,
			threaded
		}));
	} catch (error) {
		return handleError(error, "Failed to list comments", "COMMENT_LIST_ERROR");
	}
};
/**
* Submit a comment (public, gated by anti-spam checks)
*/
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { collection, contentId } = params;
	if (!collection || !contentId) return apiError("VALIDATION_ERROR", "Collection and content ID required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	return submitPublicComment(emdash, collection, contentId, request, user, cache);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index@_@mjs
var page = () => _contentId__exports;
export { page };
