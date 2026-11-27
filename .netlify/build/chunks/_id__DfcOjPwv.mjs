import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as menuTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { a as handleMenuItemDelete, s as handleMenuItemUpdate } from "./menus-DoVbs2sn_BUtW_mCF.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { s as localeFilterQuery } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { l as updateMenuItemBody } from "./menus-CnEw5nz8_BgREfxfw.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PUT: () => PUT,
	prerender: () => false
});
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const itemId = params.id;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!itemId) return apiError("VALIDATION_ERROR", "id is required", 400);
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		const body = await parseBody(request, updateMenuItemBody);
		if (isParseError(body)) return body;
		const result = await handleMenuItemUpdate(emdash.db, name, itemId, body, { locale: localeQ.locale });
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [menuTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update menu item", "MENU_ITEM_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const itemId = params.id;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!itemId) return apiError("VALIDATION_ERROR", "id is required", 400);
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		const result = await handleMenuItemDelete(emdash.db, name, itemId, { locale: localeQ.locale });
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [menuTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to delete menu item", "MENU_ITEM_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_@_@mjs
var page = () => _id__exports;
export { page };
