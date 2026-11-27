import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as chunks } from "./chunks-CvgCLYip_BPNjBngy.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { n as commentBulkBody } from "./comments-BFyw2y-m_rpr4pda_.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as handleCommentBulk } from "./comments-D73Sy_2U_Ca-CN1Gs.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { t as getCommentRouteCacheTags } from "./route-cache-CvTJlNVT_BFNuxryQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs
var bulk_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var MAX_CACHE_PURGE_TAGS = 100;
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, commentBulkBody);
		if (isParseError(body)) return body;
		if (body.action === "delete") {
			const denied = requirePerm(user, "comments:delete");
			if (denied) return denied;
		} else {
			const denied = requirePerm(user, "comments:moderate");
			if (denied) return denied;
		}
		const tags = cache?.enabled ? await getCommentRouteCacheTags(emdash.db, body.ids, body.action) : [];
		try {
			return unwrapResult(await handleCommentBulk(emdash.db, body.ids, body.action));
		} finally {
			for (const tagBatch of chunks(tags, MAX_CACHE_PURGE_TAGS)) await invalidateRouteCache(cache, tagBatch);
		}
	} catch (error) {
		return handleError(error, "Failed to perform bulk operation", "COMMENT_BULK_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/bulk@_@mjs
var page = () => bulk_exports;
export { page };
