import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { s as handleBylineFieldUsage } from "./byline-fields-Bw7z2opJ_9bNi0QbI.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs
var usage_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const slug = params.slug;
	if (!slug) return apiError("MISSING_PARAM", "Field slug is required", 400);
	return unwrapResult(await handleBylineFieldUsage(emdash.db, slug));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage@_@mjs
var page = () => usage_exports;
export { page };
