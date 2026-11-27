import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as handleOrphanedTableList } from "./schema-D04_n_7j_avt2iKQU.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs
var orphans_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	return unwrapResult(await handleOrphanedTableList(emdash.db));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/orphans/index@_@mjs
var page = () => orphans_exports;
export { page };
