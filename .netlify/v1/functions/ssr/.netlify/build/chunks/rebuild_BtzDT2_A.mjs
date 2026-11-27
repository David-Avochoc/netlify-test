import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as FTSManager } from "./fts-manager-m8GPxogO_D404Fnp6.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { ot as searchRebuildBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as requireSearchSupport } from "./search-SRLBXKJU_Dy2Y8xkK.mjs";
// node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs
var rebuild_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Rebuild the search index for a collection
*
* Body:
* - collection: Collection slug to rebuild (required)
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;
	const body = await parseBody(request, searchRebuildBody);
	if (isParseError(body)) return body;
	const unavailable = requireSearchSupport(emdash.db);
	if (unavailable) return unavailable;
	const ftsManager = new FTSManager(emdash.db);
	try {
		const config = await ftsManager.getSearchConfig(body.collection);
		if (!config?.enabled) return apiError("SEARCH_NOT_ENABLED", `Search is not enabled for collection "${body.collection}"`, 400);
		const searchableFields = await ftsManager.getSearchableFields(body.collection);
		if (searchableFields.length === 0) return apiError("NO_SEARCHABLE_FIELDS", `No searchable fields defined for collection "${body.collection}"`, 400);
		await ftsManager.rebuildIndex(body.collection, searchableFields, config.weights, config.tokenize);
		const stats = await ftsManager.getIndexStats(body.collection);
		return apiSuccess({
			collection: body.collection,
			indexed: stats?.indexed ?? 0
		});
	} catch (error) {
		return handleError(error, "Failed to rebuild index", "REBUILD_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/rebuild@_@mjs
var page = () => rebuild_exports;
export { page };
