import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { r as bylineFieldCreateBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { i as handleBylineFieldList, t as handleBylineFieldCreate } from "./byline-fields-Bw7z2opJ_9bNi0QbI.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs
var byline_fields_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	return unwrapResult(await handleBylineFieldList(emdash.db));
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const body = await parseBody(request, bylineFieldCreateBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleBylineFieldCreate(emdash.db, {
		slug: body.slug,
		label: body.label,
		type: body.type,
		required: body.required,
		translatable: body.translatable,
		validation: body.validation ?? null,
		sortOrder: body.sortOrder
	}), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index@_@mjs
var page = () => byline_fields_exports;
export { page };
