import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { d as handleSchemaFieldCreate, m as handleSchemaFieldList } from "./schema-D04_n_7j_avt2iKQU.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { R as createFieldBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs
var fields_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const collectionSlug = params.slug;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	return unwrapResult(await handleSchemaFieldList(emdash.db, collectionSlug));
};
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const collectionSlug = params.slug;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const body = await parseBody(request, createFieldBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleSchemaFieldCreate(emdash.db, collectionSlug, body), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index@_@mjs
var page = () => fields_exports;
export { page };
