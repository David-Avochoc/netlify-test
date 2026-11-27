import { n as TRANSFER_LIMITS } from "./canonical-CUkatNPc_DS609FVv.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
import { _ as handleImportFileUpload } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/files/_...path_.mjs
var prerender = false;
var CONTENT_LENGTH_PATTERN = /^\d{1,16}$/;
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "transfer:import");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "transfer:analyze");
	if (scopeDenied) return scopeDenied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	const header = request.headers.get("Content-Length");
	if (header === null) return apiError("LENGTH_REQUIRED", "Content-Length is required", 411);
	if (!CONTENT_LENGTH_PATTERN.test(header)) return apiError("VALIDATION_ERROR", "Invalid Content-Length", 400);
	return unwrapResult(await handleImportFileUpload(emdash.db, emdash.storage, {
		operationId: params.id ?? "",
		path: params.path ?? "",
		contentLength: Number(header),
		body: request.body,
		maxBlobBytes: emdash.config.maxUploadSize ?? TRANSFER_LIMITS.defaultMaxBlobBytes
	}));
};
export { PUT, prerender };
