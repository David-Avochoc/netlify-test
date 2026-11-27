import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
// node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs
var dev_reset_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ locals }) => {
	return apiError("FORBIDDEN", "Dev reset is only available in development mode", 403);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-reset@_@mjs
var page = () => dev_reset_exports;
export { page };
