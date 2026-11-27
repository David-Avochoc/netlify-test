import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { p as handleThemeSearch } from "./marketplace-D9fChLav_DPvHsZ-B.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs
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
	const keyword = url.searchParams.get("keyword") ?? void 0;
	const sortParam = url.searchParams.get("sort");
	const validSorts = /* @__PURE__ */ new Set([
		"name",
		"created",
		"updated"
	]);
	let sort;
	if (sortParam && validSorts.has(sortParam)) sort = sortParam;
	const cursor = url.searchParams.get("cursor") ?? void 0;
	const limitParam = url.searchParams.get("limit");
	const limit = limitParam ? Math.min(Math.max(1, parseInt(limitParam, 10) || 50), 100) : void 0;
	return unwrapResult(await handleThemeSearch(emdash.config.marketplace, query, {
		keyword,
		sort,
		cursor,
		limit
	}));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index@_@mjs
var page = () => marketplace_exports;
export { page };
