import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as taxonomyTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { d as handleTermReorder } from "./taxonomies-D5bavOHA_BsPI1epc.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { tt as reorderTermsBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder.mjs
var reorder_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { name } = params;
	if (!name) return apiError("VALIDATION_ERROR", "Taxonomy name required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "taxonomies:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, reorderTermsBody);
		if (isParseError(body)) return body;
		const result = await handleTermReorder(emdash.db, name, body);
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [taxonomyTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to reorder terms", "TERM_REORDER_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder@_@mjs
var page = () => reorder_exports;
export { page };
