import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as handleSectionUpdate, n as handleSectionDelete, r as handleSectionGet } from "./sections-BK7soA2U_CzKRMbyR.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { Dt as updateSectionBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs
var _slug__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const { slug } = params;
	const denied = requirePerm(user, "sections:read");
	if (denied) return denied;
	if (!slug) return apiError("VALIDATION_ERROR", "slug is required", 400);
	try {
		return unwrapResult(await handleSectionGet(db, slug));
	} catch (error) {
		return handleError(error, "Failed to fetch section", "SECTION_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const { slug } = params;
	const denied = requirePerm(user, "sections:manage");
	if (denied) return denied;
	if (!slug) return apiError("VALIDATION_ERROR", "slug is required", 400);
	try {
		const body = await parseBody(request, updateSectionBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleSectionUpdate(db, slug, body));
	} catch (error) {
		return handleError(error, "Failed to update section", "SECTION_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const { slug } = params;
	const denied = requirePerm(user, "sections:manage");
	if (denied) return denied;
	if (!slug) return apiError("VALIDATION_ERROR", "slug is required", 400);
	try {
		return unwrapResult(await handleSectionDelete(db, slug));
	} catch (error) {
		return handleError(error, "Failed to delete section", "SECTION_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/_slug_@_@mjs
var page = () => _slug__exports;
export { page };
