import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as taxonomyTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { c as handleTermDelete, l as handleTermGet, p as handleTermUpdate } from "./taxonomies-D5bavOHA_BsPI1epc.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { s as localeFilterQuery } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { kt as updateTermBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs
var _slug__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
/**
* Get a single term
*/
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { name, slug } = params;
	if (!name || !slug) return apiError("VALIDATION_ERROR", "Taxonomy name and slug required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "taxonomies:read");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleTermGet(emdash.db, name, slug, { locale: query.locale }));
	} catch (error) {
		return handleError(error, "Failed to get term", "TERM_GET_ERROR");
	}
};
/**
* Update a term
*/
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { name, slug } = params;
	if (!name || !slug) return apiError("VALIDATION_ERROR", "Taxonomy name and slug required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "taxonomies:manage");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const body = await parseBody(request, updateTermBody);
		if (isParseError(body)) return body;
		const result = await handleTermUpdate(emdash.db, name, slug, body, { locale: query.locale });
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [taxonomyTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update term", "TERM_UPDATE_ERROR");
	}
};
/**
* Delete a term
*/
var DELETE = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { name, slug } = params;
	if (!name || !slug) return apiError("VALIDATION_ERROR", "Taxonomy name and slug required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "taxonomies:manage");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const result = await handleTermDelete(emdash.db, name, slug, { locale: query.locale });
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [taxonomyTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to delete term", "TERM_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_@_@mjs
var page = () => _slug__exports;
export { page };
