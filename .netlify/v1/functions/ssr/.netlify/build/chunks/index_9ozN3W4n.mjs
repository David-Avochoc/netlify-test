import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as handleSchemaCollectionCreate, c as handleSchemaCollectionList } from "./schema-D04_n_7j_avt2iKQU.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { L as createCollectionBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs
var collections_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	return unwrapResult(await handleSchemaCollectionList(emdash.db));
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const body = await parseBody(request, createCollectionBody);
	if (isParseError(body)) return body;
	const result = await handleSchemaCollectionCreate(emdash.db, body);
	emdash.invalidateUrlPatternCache();
	return unwrapResult(result, 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/index@_@mjs
var page = () => collections_exports;
export { page };
