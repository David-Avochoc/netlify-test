import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as FTSManager } from "./fts-manager-m8GPxogO_D404Fnp6.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { it as searchEnableBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as requireSearchSupport } from "./search-SRLBXKJU_Dy2Y8xkK.mjs";
// node_modules/emdash/dist/astro/routes/api/search/enable.mjs
var enable_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Enable or disable search for a collection
*
* Body:
* - collection: Collection slug (required)
* - enabled: boolean (required)
* - weights: Optional field weights for ranking
* - tokenize: Optional FTS5 tokenizer configuration
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;
	const body = await parseBody(request, searchEnableBody);
	if (isParseError(body)) return body;
	const unavailable = requireSearchSupport(emdash.db);
	if (unavailable) return unavailable;
	const ftsManager = new FTSManager(emdash.db);
	try {
		if (body.enabled) {
			await ftsManager.enableSearch(body.collection, {
				weights: body.weights,
				tokenize: body.tokenize
			});
			const stats = await ftsManager.getIndexStats(body.collection);
			return apiSuccess({
				collection: body.collection,
				enabled: true,
				indexed: stats?.indexed ?? 0
			});
		} else {
			await ftsManager.disableSearch(body.collection);
			return apiSuccess({
				collection: body.collection,
				enabled: false
			});
		}
	} catch (error) {
		return handleError(error, "Failed to update search config", "SEARCH_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/enable@_@mjs
var page = () => enable_exports;
export { page };
