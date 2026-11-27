import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { f as notFoundSummaryQuery } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { i as handleNotFoundSummary } from "./redirects-DfvdrgF1_CYDQguSV.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs
var summary_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const denied = requirePerm(user, "redirects:read");
	if (denied) return denied;
	try {
		const query = parseQuery(url, notFoundSummaryQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleNotFoundSummary(db, query.limit));
	} catch (error) {
		return handleError(error, "Failed to fetch 404 summary", "NOT_FOUND_SUMMARY_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/summary@_@mjs
var page = () => summary_exports;
export { page };
