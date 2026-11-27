import { f as toSha256Digest } from "./digest-DSsUd9oL_C_lXhh0f.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
import { g as handleImportExecute } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
import { f as transferImportExecuteBody } from "./transfer-CafpWTD6_BpBuw84v.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/execute.mjs
var prerender = false;
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	const denied = requirePerm(user, "transfer:import");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "transfer:execute");
	if (scopeDenied) return scopeDenied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	const body = await parseBody(request, transferImportExecuteBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleImportExecute(emdash.db, emdash.storage, {
		operationId: params.id ?? "",
		userId: user.id,
		packageDigest: toSha256Digest(body.packageDigest.slice(7)),
		planDigest: toSha256Digest(body.planDigest.slice(7))
	}));
};
export { POST, prerender };
