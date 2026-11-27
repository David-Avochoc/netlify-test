import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { f as handleSchemaFieldDelete, g as handleSchemaFieldUpdate, p as handleSchemaFieldGet } from "./schema-D04_n_7j_avt2iKQU.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { Tt as updateFieldBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs
var _fieldSlug__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const collectionSlug = params.slug;
	const fieldSlug = params.fieldSlug;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	return unwrapResult(await handleSchemaFieldGet(emdash.db, collectionSlug, fieldSlug));
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const collectionSlug = params.slug;
	const fieldSlug = params.fieldSlug;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const body = await parseBody(request, updateFieldBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleSchemaFieldUpdate(emdash.db, collectionSlug, fieldSlug, body));
};
var DELETE = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	const collectionSlug = params.slug;
	const fieldSlug = params.fieldSlug;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	return unwrapResult(await handleSchemaFieldDelete(emdash.db, collectionSlug, fieldSlug, { deleteRelation: url.searchParams.get("deleteRelation") === "true" }));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_@_@mjs
var page = () => _fieldSlug__exports;
export { page };
