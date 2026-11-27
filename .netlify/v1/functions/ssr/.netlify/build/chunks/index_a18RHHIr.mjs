import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { l as resolveConfiguredLocale, r as getI18nConfig } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { t as BylineRepository } from "./byline-BufjxQyd_CopmbbPN.mjs";
import { i as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { s as bylineCreateBody, u as bylinesListQuery } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as handleBylineCreate } from "./bylines-C8ZT6iWw_DusNTBrE.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs
var bylines_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "bylines:read");
	if (denied) return denied;
	const query = parseQuery(url, bylinesListQuery);
	if (isParseError(query)) return query;
	const locale = query.locale ? resolveConfiguredLocale(query.locale) : void 0;
	const i18n = getI18nConfig();
	if (locale && i18n && !i18n.locales.includes(locale)) return apiError("VALIDATION_ERROR", `Locale "${locale}" is not configured for this site`, 400);
	try {
		return apiSuccess(await new BylineRepository(emdash.db).findMany({
			search: query.search,
			isGuest: query.isGuest,
			userId: query.userId,
			locale,
			cursor: query.cursor,
			limit: query.limit
		}));
	} catch (error) {
		return handleError(error, "Failed to list bylines", "BYLINE_LIST_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	const body = await parseBody(request, bylineCreateBody);
	if (isParseError(body)) return body;
	try {
		const result = await handleBylineCreate(emdash.db, {
			slug: body.slug,
			displayName: body.displayName,
			bio: body.bio ?? null,
			avatarMediaId: body.avatarMediaId ?? null,
			websiteUrl: body.websiteUrl ?? null,
			userId: body.userId,
			isGuest: body.isGuest,
			locale: body.locale,
			translationOf: body.translationOf,
			customFields: body.customFields
		});
		if (result.success) {
			const byline = result.data;
			after(() => emdash.hooks.runBylineAfterSave(byline, true));
		}
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create byline", "BYLINE_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/index@_@mjs
var page = () => bylines_exports;
export { page };
