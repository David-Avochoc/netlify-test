import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as requireAnyScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
import { v as handleImportGet } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/index.mjs
var prerender = false;
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "transfer:import");
	if (denied) return denied;
	const scopeDenied = requireAnyScope(locals, ["transfer:analyze", "transfer:execute"]);
	if (scopeDenied) return scopeDenied;
	return unwrapResult(await handleImportGet(emdash.db, params.id ?? ""));
};
export { GET, prerender };
