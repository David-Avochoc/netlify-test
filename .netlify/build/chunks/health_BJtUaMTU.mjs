import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getRegistryConfigInput } from "./config-DeluGa9H_Db3EBMuk.mjs";
import { n as VERSION } from "./version-BE4RahxC_p74BLWtq.mjs";
import { n as apiSuccess } from "./error-0Y0dFPxm_D68N8-KM.mjs";
// node_modules/emdash/dist/astro/routes/api/health.mjs
var health_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = ({ locals }) => {
	const response = apiSuccess({
		product: "emdash",
		version: VERSION,
		registry: Boolean(getRegistryConfigInput(locals.emdash?.config.registry))
	});
	response.headers.set("Access-Control-Allow-Origin", "*");
	return response;
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/health@_@mjs
var page = () => health_exports;
export { page };
