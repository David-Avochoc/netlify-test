import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs
var providers_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* List all configured media providers
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:read");
	if (denied) return denied;
	if (!emdash?.getMediaProviderList) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	return apiSuccess({ items: emdash.getMediaProviderList() });
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/index@_@mjs
var page = () => providers_exports;
export { page };
