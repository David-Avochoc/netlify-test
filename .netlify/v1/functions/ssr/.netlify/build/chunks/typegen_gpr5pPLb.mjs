import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
// node_modules/emdash/dist/astro/routes/api/typegen.mjs
var typegen_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* GET - Return types as plain text (for preview/debugging)
*/
var GET = async ({ locals }) => {
	return apiError("FORBIDDEN", "Typegen is only available in development", 403);
};
/**
* POST - Generate types and return as JSON
*
* The caller writes the file to disk. Response shape:
* { types: string, hash: string, collections: number }
*/
var POST = async ({ locals }) => {
	return apiError("FORBIDDEN", "Typegen is only available in development", 403);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/typegen@_@mjs
var page = () => typegen_exports;
export { page };
