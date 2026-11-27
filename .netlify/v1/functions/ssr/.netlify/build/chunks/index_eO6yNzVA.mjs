import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as menuTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { c as handleMenuList, t as handleMenuCreate } from "./menus-DoVbs2sn_BUtW_mCF.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { s as localeFilterQuery } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { t as createMenuBody } from "./menus-CnEw5nz8_BgREfxfw.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/menus/index.mjs
var menus_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "menus:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleMenuList(emdash.db, { locale: query.locale }));
	} catch (error) {
		return handleError(error, "Failed to fetch menus", "MENU_LIST_ERROR");
	}
};
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, createMenuBody);
		if (isParseError(body)) return body;
		const result = await handleMenuCreate(emdash.db, body);
		if (!result.success) return unwrapResult(result, 201);
		await invalidateRouteCache(cache, [menuTag(result.data.name)]);
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create menu", "MENU_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/index@_@mjs
var page = () => menus_exports;
export { page };
