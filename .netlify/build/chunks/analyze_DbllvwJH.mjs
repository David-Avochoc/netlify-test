import { r as getI18nConfig } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
import { p as handleImportAnalyze, t as analysisTargetContext } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
import { l as transferImportAnalyzeBody } from "./transfer-CafpWTD6_BpBuw84v.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/analyze.mjs
var prerender = false;
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "transfer:import");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "transfer:analyze");
	if (scopeDenied) return scopeDenied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	const body = await parseOptionalBody(request, transferImportAnalyzeBody, {});
	if (isParseError(body)) return body;
	return unwrapResult(await handleImportAnalyze(emdash.db, emdash.storage, {
		operationId: params.id ?? "",
		decisions: body.decisions,
		target: analysisTargetContext({
			i18n: getI18nConfig(),
			maxUploadSize: emdash.config.maxUploadSize
		})
	}));
};
export { POST, prerender };
