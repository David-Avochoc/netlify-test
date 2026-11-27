import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as siteSettingsTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { t as getConfiguredOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { t as getChosenSiteOrigin } from "./site-url-OBYES-gb_Co1gxb5_.mjs";
import { i as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { n as handleSiteDomainChange } from "./site-domain-B2KvJstd_CKoeYMlP.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/settings/domain.mjs
var domain_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var siteDomainBody = z.object({ domain: z.string().min(1).max(253) });
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:read");
	if (denied) return denied;
	try {
		const siteOrigin = await getChosenSiteOrigin(emdash.db, emdash.config) ?? null;
		return apiSuccess({
			configuredUrl: getConfiguredOrigin(emdash.config) ?? null,
			siteOrigin
		});
	} catch (error) {
		return handleError(error, "Failed to read the site domain", "SITE_DOMAIN_ERROR");
	}
};
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, siteDomainBody);
		if (isParseError(body)) return body;
		const result = await handleSiteDomainChange(emdash.db, body.domain);
		if (result.success) await invalidateRouteCache(cache, [siteSettingsTag()]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to change the site domain", "SITE_DOMAIN_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/domain@_@mjs
var page = () => domain_exports;
export { page };
