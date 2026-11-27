import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
import { f as handleImportAdvance } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/advance.mjs
var prerender = false;
var POST = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "transfer:import");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "transfer:execute");
	if (scopeDenied) return scopeDenied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	return unwrapResult(await handleImportAdvance(emdash.db, emdash.storage, {
		operationId: params.id ?? "",
		userId: user.id
	}));
};
export { POST, prerender };
