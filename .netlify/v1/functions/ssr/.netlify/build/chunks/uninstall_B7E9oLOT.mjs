import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as checkSiteWriteFence } from "./fence-CkdbSoZX_DNtaDXEC.mjs";
import { n as handleRegistryUninstall } from "./registry-COR9pjyi_B92xLeUt.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall.mjs
var uninstall_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var uninstallBodySchema = z.object({ deleteData: z.boolean().optional() });
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:manage");
	if (denied) return denied;
	const writeFence = await checkSiteWriteFence(emdash.db);
	if (writeFence) return writeFence;
	if (!id) return apiError("INVALID_REQUEST", "Plugin ID required", 400);
	const body = await parseOptionalBody(request, uninstallBodySchema, {});
	if (isParseError(body)) return body;
	const result = await handleRegistryUninstall(emdash.db, emdash.storage, id, {
		deleteData: body.deleteData ?? false,
		beforeDelete: () => emdash.runPluginUninstallLifecycle(id, body.deleteData ?? false)
	});
	if (!result.success) return unwrapResult(result);
	await emdash.syncRegistryPlugins();
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall@_@mjs
var page = () => uninstall_exports;
export { page };
