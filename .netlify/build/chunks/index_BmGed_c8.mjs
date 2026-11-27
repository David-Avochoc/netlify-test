import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { c as handleMarketplaceSearch } from "./marketplace-D9fChLav_DPvHsZ-B.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs
var marketplace_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	const query = url.searchParams.get("q") ?? void 0;
	const category = url.searchParams.get("category") ?? void 0;
	const cursor = url.searchParams.get("cursor") ?? void 0;
	const limitParam = url.searchParams.get("limit");
	const limit = limitParam ? Math.min(Math.max(1, parseInt(limitParam, 10) || 50), 100) : void 0;
	return unwrapResult(await handleMarketplaceSearch(emdash.config.marketplace, query, {
		category,
		cursor,
		limit
	}));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index@_@mjs
var page = () => marketplace_exports;
export { page };
