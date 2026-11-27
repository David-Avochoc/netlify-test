import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as getSearchStats } from "./search-BxBg7Xq1_B-YOBHzf.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as requireSearchSupport } from "./search-SRLBXKJU_Dy2Y8xkK.mjs";
// node_modules/emdash/dist/astro/routes/api/search/stats.mjs
var stats_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Get search index statistics
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const unavailable = requireSearchSupport(emdash.db);
	if (unavailable) return unavailable;
	try {
		return apiSuccess(await getSearchStats(emdash.db));
	} catch (error) {
		return handleError(error, "Failed to get stats", "STATS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/stats@_@mjs
var page = () => stats_exports;
export { page };
