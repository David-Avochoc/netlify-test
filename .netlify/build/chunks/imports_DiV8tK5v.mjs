import { r as isTransferError } from "./errors-u5rZhbVQ_Kim2d0N0.mjs";
import { n as TRANSFER_LIMITS } from "./canonical-CUkatNPc_DS609FVv.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope, t as requireAnyScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
import { i as readStreamBytes } from "./stage-Ctas_E7M_BvIWzg1C.mjs";
import { h as handleImportCreate, y as handleImportList } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
import { y as transferPaginationQuery } from "./transfer-CafpWTD6_BpBuw84v.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/index.mjs
var prerender = false;
var IDEMPOTENCY_KEY_PATTERN = /^[\x21-\x7e]{1,255}$/;
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "transfer:import");
	if (denied) return denied;
	const scopeDenied = requireAnyScope(locals, ["transfer:analyze", "transfer:execute"]);
	if (scopeDenied) return scopeDenied;
	const query = parseQuery(url, transferPaginationQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await handleImportList(emdash.db, query));
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	const denied = requirePerm(user, "transfer:import");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "transfer:analyze");
	if (scopeDenied) return scopeDenied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	const idempotencyKey = request.headers.get("Idempotency-Key") ?? void 0;
	if (idempotencyKey !== void 0 && !IDEMPOTENCY_KEY_PATTERN.test(idempotencyKey)) return apiError("VALIDATION_ERROR", "Invalid Idempotency-Key header", 400);
	if (Number(request.headers.get("Content-Length") ?? "0") > TRANSFER_LIMITS.manifestBytes) return apiError("TRANSFER_LIMIT_EXCEEDED", "Manifest is too large", 413);
	if (!request.body) return apiError("TRANSFER_MANIFEST_INVALID", "Request body must be the package manifest", 422);
	let manifest;
	try {
		manifest = await readStreamBytes(request.body, TRANSFER_LIMITS.manifestBytes);
	} catch (error) {
		if (isTransferError(error)) return apiError(error.code, error.message, error.status);
		return apiError("TRANSFER_MANIFEST_INVALID", "Failed to read the manifest", 400);
	}
	const result = await handleImportCreate(emdash.db, emdash.storage, {
		userId: user.id,
		manifest,
		idempotencyKey
	});
	return unwrapResult(result, result.success && result.data.created ? 201 : 200);
};
export { GET, POST, prerender };
