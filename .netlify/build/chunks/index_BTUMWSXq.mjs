import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { g as redirectsListQuery, n as createRedirectBody } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { a as handleRedirectCreate, c as handleRedirectList } from "./redirects-DfvdrgF1_CYDQguSV.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRedirectSourcePaths } from "./redirect-paths-DgkkN0qJ_CzGK-cXh.mjs";
// node_modules/emdash/dist/astro/routes/api/redirects/index.mjs
var redirects_exports = /* @__PURE__ */ __exportAll({
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
		const query = parseQuery(url, redirectsListQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleRedirectList(db, query));
	} catch (error) {
		return handleError(error, "Failed to fetch redirects", "REDIRECT_LIST_ERROR");
	}
};
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, createRedirectBody);
		if (isParseError(body)) return body;
		const result = await handleRedirectCreate(db, body);
		if (result.success) await invalidateRedirectSourcePaths(cache, result.data.source);
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create redirect", "REDIRECT_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/index@_@mjs
var page = () => redirects_exports;
export { page };
