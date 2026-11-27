import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { at as searchQuery } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { r as searchWithDb } from "./search-BxBg7Xq1_B-YOBHzf.mjs";
import { t as requireSearchSupport } from "./search-SRLBXKJU_Dy2Y8xkK.mjs";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/search/index.mjs
var search_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Search content
*
* Query parameters:
* - q: Search query (required)
* - collections: Comma-separated list of collection slugs (optional, defaults to all)
* - status: Filter by status (optional, defaults to 'published')
* - limit: Maximum results (optional, defaults to 20)
*/
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const query = parseQuery(url, searchQuery);
	if (isParseError(query)) return query;
	const collections = query.collections ? query.collections.split(",").map((c) => c.trim()) : void 0;
	const status = query.status && query.status !== "published" && hasPermission(user, "content:read_drafts") ? query.status : "published";
	const unavailable = requireSearchSupport(emdash.db);
	if (unavailable) return unavailable;
	try {
		await emdash.ensureSearchHealthy?.();
		return apiSuccess(await searchWithDb(emdash.db, query.q, {
			collections,
			status,
			locale: query.locale,
			limit: query.limit,
			cursor: query.cursor,
			scope: query.scope
		}));
	} catch (error) {
		return handleError(error, "Search failed", "SEARCH_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/index@_@mjs
var page = () => search_exports;
export { page };
