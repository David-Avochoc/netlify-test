import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { i as bylineFieldReorderBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { a as handleBylineFieldReorder } from "./byline-fields-Bw7z2opJ_9bNi0QbI.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs
var reorder_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const body = await parseBody(request, bylineFieldReorderBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleBylineFieldReorder(emdash.db, body.slugs));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder@_@mjs
var page = () => reorder_exports;
export { page };
