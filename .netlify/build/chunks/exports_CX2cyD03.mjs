import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
import { s as handleExportCreate, u as handleExportList } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
import { o as transferExportCreateBody, y as transferPaginationQuery } from "./transfer-CafpWTD6_BpBuw84v.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/index.mjs
var prerender = false;
var IDEMPOTENCY_KEY_PATTERN = /^[\x21-\x7e]{1,255}$/;
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "transfer:export");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "transfer:export");
	if (scopeDenied) return scopeDenied;
	const query = parseQuery(url, transferPaginationQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await handleExportList(emdash.db, query));
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	const denied = requirePerm(user, "transfer:export");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "transfer:export");
	if (scopeDenied) return scopeDenied;
	const idempotencyKey = request.headers.get("Idempotency-Key") ?? void 0;
	if (idempotencyKey !== void 0 && !IDEMPOTENCY_KEY_PATTERN.test(idempotencyKey)) return apiError("VALIDATION_ERROR", "Invalid Idempotency-Key header", 400);
	const body = await parseOptionalBody(request, transferExportCreateBody, {});
	if (isParseError(body)) return body;
	const result = await handleExportCreate(emdash.db, {
		userId: user.id,
		options: body.comments === void 0 ? {} : { comments: body.comments },
		idempotencyKey
	});
	return unwrapResult(result, result.success && result.data.created ? 201 : 200);
};
export { GET, POST, prerender };
