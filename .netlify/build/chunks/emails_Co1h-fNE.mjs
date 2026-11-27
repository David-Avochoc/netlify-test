import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
// node_modules/emdash/dist/astro/routes/api/dev/emails.mjs
var emails_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	prerender: () => false
});
var GET = async () => {
	return apiError("FORBIDDEN", "Dev emails endpoint is only available in development mode", 403);
};
var DELETE = async () => {
	return apiError("FORBIDDEN", "Dev emails endpoint is only available in development mode", 403);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dev/emails@_@mjs
var page = () => emails_exports;
export { page };
