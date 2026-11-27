import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { d as notFoundPruneBody, l as notFoundListQuery } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { n as handleNotFoundList, r as handleNotFoundPrune, t as handleNotFoundClear } from "./redirects-DfvdrgF1_CYDQguSV.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs
var _404s_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const denied = requirePerm(user, "redirects:read");
	if (denied) return denied;
	try {
		const query = parseQuery(url, notFoundListQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleNotFoundList(db, query));
	} catch (error) {
		return handleError(error, "Failed to fetch 404 log", "NOT_FOUND_LIST_ERROR");
	}
};
var DELETE = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	try {
		return unwrapResult(await handleNotFoundClear(db));
	} catch (error) {
		return handleError(error, "Failed to clear 404 log", "NOT_FOUND_CLEAR_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, notFoundPruneBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleNotFoundPrune(db, body.olderThan));
	} catch (error) {
		return handleError(error, "Failed to prune 404 log", "NOT_FOUND_PRUNE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/index@_@mjs
var page = () => _404s_exports;
export { page };
