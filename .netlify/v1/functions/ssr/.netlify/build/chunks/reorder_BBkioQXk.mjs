import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { l as handleSchemaCollectionReorder } from "./schema-D04_n_7j_avt2iKQU.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { m as collectionReorderBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/collections/reorder.mjs
var reorder_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const body = await parseBody(request, collectionReorderBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleSchemaCollectionReorder(emdash.db, body.slugs));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/reorder@_@mjs
var page = () => reorder_exports;
export { page };
