import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
import { b as handleImportMissing } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
import { y as transferPaginationQuery } from "./transfer-CafpWTD6_BpBuw84v.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/missing.mjs
var prerender = false;
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "transfer:import");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "transfer:analyze");
	if (scopeDenied) return scopeDenied;
	const query = parseQuery(url, transferPaginationQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await handleImportMissing(emdash.db, params.id ?? "", query));
};
export { GET, prerender };
