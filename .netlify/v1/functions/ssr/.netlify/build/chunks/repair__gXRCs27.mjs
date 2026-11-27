import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as handleMediaUsageRepair } from "./media-usage-D6LjfdGn_BMfzBBVJ.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { H as mediaUsageRepairBody } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs
var repair_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const body = await parseBody(request, mediaUsageRepairBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleMediaUsageRepair(emdash.db, body));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair@_@mjs
var page = () => repair_exports;
export { page };
