import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as handleMediaUsageCollectionDeletionList } from "./media-usage-work-CxqS_Ny9_A-c4xmSh.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { P as mediaUsageCollectionDeletionListQuery } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index.mjs
var collection_deletions_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ request, locals }) => {
	if (!locals.emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(locals.user, "schema:manage");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	const query = parseQuery(new URL(request.url), mediaUsageCollectionDeletionListQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await handleMediaUsageCollectionDeletionList(locals.emdash.db, query));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index@_@mjs
var page = () => collection_deletions_exports;
export { page };
