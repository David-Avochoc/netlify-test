import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as handleBlockTypeUpdate, r as handleBlockTypeGet } from "./block-types-BeLZ85Sw_V_rhgmW9.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { Ct as updateBlockTypeBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index.mjs
var _slug__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	return unwrapResult(await handleBlockTypeGet(emdash.db, params.slug));
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const body = await parseBody(request, updateBlockTypeBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleBlockTypeUpdate(emdash.db, params.slug, body));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index@_@mjs
var page = () => _slug__exports;
export { page };
