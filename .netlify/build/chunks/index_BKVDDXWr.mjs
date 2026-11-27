import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { a as commentListQuery } from "./comments-BFyw2y-m_rpr4pda_.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { a as handleCommentInbox } from "./comments-D73Sy_2U_Ca-CN1Gs.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs
var comments_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* List comments for moderation inbox
*/
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "comments:moderate");
	if (denied) return denied;
	try {
		const query = parseQuery(url, commentListQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleCommentInbox(emdash.db, {
			status: query.status,
			collection: query.collection,
			search: query.search,
			limit: query.limit,
			cursor: query.cursor
		}));
	} catch (error) {
		return handleError(error, "Failed to list comments", "COMMENT_INBOX_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/index@_@mjs
var page = () => comments_exports;
export { page };
