import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { ct as searchSuggestQuery } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { n as getSuggestions } from "./search-BxBg7Xq1_B-YOBHzf.mjs";
import { t as requireSearchSupport } from "./search-SRLBXKJU_Dy2Y8xkK.mjs";
// node_modules/emdash/dist/astro/routes/api/search/suggest.mjs
var suggest_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Get search suggestions for autocomplete
*
* Query parameters:
* - q: Partial search query (required)
* - collections: Comma-separated list of collection slugs (optional)
* - limit: Maximum suggestions (optional, defaults to 5)
*/
var GET = async ({ url, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const query = parseQuery(url, searchSuggestQuery);
	if (isParseError(query)) return query;
	const collections = query.collections ? query.collections.split(",").map((c) => c.trim()) : void 0;
	const unavailable = requireSearchSupport(emdash.db);
	if (unavailable) return unavailable;
	try {
		await emdash.ensureSearchHealthy?.();
		return apiSuccess({ items: await getSuggestions(emdash.db, query.q, {
			collections,
			locale: query.locale,
			limit: query.limit
		}) });
	} catch (error) {
		return handleError(error, "Failed to get suggestions", "SUGGESTION_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/suggest@_@mjs
var page = () => suggest_exports;
export { page };
