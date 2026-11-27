import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as menuTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { n as handleMenuDelete, r as handleMenuGet, u as handleMenuUpdate } from "./menus-DoVbs2sn_BUtW_mCF.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { s as localeFilterQuery } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { c as updateMenuBody } from "./menus-CnEw5nz8_BgREfxfw.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs
var _name__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const denied = requirePerm(user, "menus:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleMenuGet(emdash.db, name, { locale: query.locale }));
	} catch (error) {
		return handleError(error, "Failed to fetch menu", "MENU_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const body = await parseBody(request, updateMenuBody);
		if (isParseError(body)) return body;
		const result = await handleMenuUpdate(emdash.db, name, {
			...body,
			locale: query.locale
		});
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [menuTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update menu", "MENU_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const result = await handleMenuDelete(emdash.db, name, { locale: query.locale });
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [menuTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to delete menu", "MENU_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_@_@mjs
var page = () => _name__exports;
export { page };
