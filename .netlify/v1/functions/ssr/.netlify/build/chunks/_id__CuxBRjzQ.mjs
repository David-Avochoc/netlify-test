import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { b as updateRedirectBody } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { l as handleRedirectUpdate, o as handleRedirectDelete, s as handleRedirectGet } from "./redirects-DfvdrgF1_CYDQguSV.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRedirectSourcePaths } from "./redirect-paths-DgkkN0qJ_CzGK-cXh.mjs";
// node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const { id } = params;
	const denied = requirePerm(user, "redirects:read");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "id is required", 400);
	try {
		return unwrapResult(await handleRedirectGet(db, id));
	} catch (error) {
		return handleError(error, "Failed to fetch redirect", "REDIRECT_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const { id } = params;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "id is required", 400);
	try {
		const before = await handleRedirectGet(db, id);
		if (!before.success) return unwrapResult(before);
		const body = await parseBody(request, updateRedirectBody);
		if (isParseError(body)) return body;
		const result = await handleRedirectUpdate(db, id, body);
		if (result.success) await invalidateRedirectSourcePaths(cache, before.data.source, result.data.source);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update redirect", "REDIRECT_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const { id } = params;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "id is required", 400);
	try {
		const before = await handleRedirectGet(db, id);
		if (!before.success) return unwrapResult(before);
		const result = await handleRedirectDelete(db, id);
		if (result.success) await invalidateRedirectSourcePaths(cache, before.data.source);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to delete redirect", "REDIRECT_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/_id_@_@mjs
var page = () => _id__exports;
export { page };
