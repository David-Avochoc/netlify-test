import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { h as handleSchemaFieldReorder } from "./schema-D04_n_7j_avt2iKQU.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { X as fieldReorderBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs
var reorder_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const collectionSlug = params.slug;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const body = await parseBody(request, fieldReorderBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleSchemaFieldReorder(emdash.db, collectionSlug, body.fieldSlugs));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder@_@mjs
var page = () => reorder_exports;
export { page };
