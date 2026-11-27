import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as menuTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { o as handleMenuItemReorder } from "./menus-DoVbs2sn_BUtW_mCF.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { s as localeFilterQuery } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { o as reorderMenuItemsBody } from "./menus-CnEw5nz8_BgREfxfw.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs
var reorder_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		const body = await parseBody(request, reorderMenuItemsBody);
		if (isParseError(body)) return body;
		const result = await handleMenuItemReorder(emdash.db, name, body.items, { locale: localeQ.locale });
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [menuTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to reorder menu items", "MENU_REORDER_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder@_@mjs
var page = () => reorder_exports;
export { page };
