import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
import { c as handleExportFile } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
import { n as exportFileResponse } from "./transfer-download-H8beYs2r_Ba25FYnC.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/manifest.mjs
var prerender = false;
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "transfer:export");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "transfer:export");
	if (scopeDenied) return scopeDenied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	const result = await handleExportFile(emdash.db, emdash.storage, params.id ?? "", "manifest.json");
	return result.success ? exportFileResponse(result.data) : unwrapResult(result);
};
export { GET, prerender };
