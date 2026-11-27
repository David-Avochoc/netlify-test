import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as menuTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { i as handleMenuItemCreate } from "./menus-DoVbs2sn_BUtW_mCF.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { s as localeFilterQuery } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { n as createMenuItemBody } from "./menus-CnEw5nz8_BgREfxfw.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs
var items_exports = /* @__PURE__ */ __exportAll({
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
		const body = await parseBody(request, createMenuItemBody);
		if (isParseError(body)) return body;
		const result = await handleMenuItemCreate(emdash.db, name, body, { locale: localeQ.locale });
		if (!result.success) return unwrapResult(result, 201);
		await invalidateRouteCache(cache, [menuTag(name)]);
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create menu item", "MENU_ITEM_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items@_@mjs
var page = () => items_exports;
export { page };
