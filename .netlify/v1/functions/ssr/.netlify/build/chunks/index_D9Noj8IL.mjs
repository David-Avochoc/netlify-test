import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { l as handleRelationUpdate, o as handleRelationDelete, s as handleRelationGet } from "./relations-5fVj42fZ_Cw6otGYO.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { Et as updateRelationBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/relations/_id_/index.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PATCH: () => PATCH,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "Relation id required", 400);
	try {
		return unwrapResult(await handleRelationGet(emdash.db, id));
	} catch (error) {
		return handleError(error, "Failed to get relation", "RELATION_GET_ERROR");
	}
};
var PATCH = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "Relation id required", 400);
	try {
		const body = await parseBody(request, updateRelationBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleRelationUpdate(emdash.db, id, body));
	} catch (error) {
		return handleError(error, "Failed to update relation", "RELATION_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "Relation id required", 400);
	try {
		return unwrapResult(await handleRelationDelete(emdash.db, id));
	} catch (error) {
		return handleError(error, "Failed to delete relation", "RELATION_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/relations/_id_/index@_@mjs
var page = () => _id__exports;
export { page };
