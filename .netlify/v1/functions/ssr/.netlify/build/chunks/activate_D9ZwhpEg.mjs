import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { o as handleBlockTypeVersionActivate } from "./block-types-BeLZ85Sw_V_rhgmW9.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { t as activateBlockTypeVersionBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate.mjs
var activate_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const version = Number(params.version);
	if (!Number.isInteger(version) || version < 1) return apiError("INVALID_INPUT", "Block type version must be a positive integer", 400);
	const body = await parseBody(request, activateBlockTypeVersionBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleBlockTypeVersionActivate(emdash.db, params.slug, version, body.expectedFingerprint));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate@_@mjs
var page = () => activate_exports;
export { page };
