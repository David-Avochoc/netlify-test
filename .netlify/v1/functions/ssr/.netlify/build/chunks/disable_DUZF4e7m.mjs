import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as checkSiteWriteFence } from "./fence-CkdbSoZX_DNtaDXEC.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as disableRuntimePlugin } from "./lifecycle-1Nl01SeB_BHPxK5pZ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs
var disable_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:manage");
	if (denied) return denied;
	const writeFence = await checkSiteWriteFence(emdash.db);
	if (writeFence) return writeFence;
	if (!id) return apiError("INVALID_REQUEST", "Plugin ID required", 400);
	return unwrapResult(await disableRuntimePlugin(emdash, id));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable@_@mjs
var page = () => disable_exports;
export { page };
