import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as handleOrphanedTableRegister } from "./schema-D04_n_7j_avt2iKQU.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { Q as orphanRegisterBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs
var _slug__exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const slug = params.slug;
	if (!slug) return apiError("VALIDATION_ERROR", "Slug is required", 400);
	const options = await parseOptionalBody(request, orphanRegisterBody, {});
	if (isParseError(options)) return options;
	return unwrapResult(await handleOrphanedTableRegister(emdash.db, slug, options), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_@_@mjs
var page = () => _slug__exports;
export { page };
