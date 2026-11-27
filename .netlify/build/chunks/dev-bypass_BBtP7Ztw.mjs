import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
// node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs
var dev_bypass_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
async function handleDevBypass(context) {
	return apiError("FORBIDDEN", "Dev bypass is only available in development mode", 403);
}
var GET = handleDevBypass;
var POST = handleDevBypass;
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-bypass@_@mjs
var page = () => dev_bypass_exports;
export { page };
