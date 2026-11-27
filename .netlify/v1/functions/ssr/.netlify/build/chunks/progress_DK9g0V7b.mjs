import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as handleMediaUsageProgress, r as handleMediaUsageProgressAdvance } from "./media-usage-D6LjfdGn_BMfzBBVJ.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress.mjs
var progress_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	return unwrapResult(await handleMediaUsageProgress(emdash.db));
};
var POST = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	return unwrapResult(await handleMediaUsageProgressAdvance(emdash.db));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress@_@mjs
var page = () => progress_exports;
export { page };
