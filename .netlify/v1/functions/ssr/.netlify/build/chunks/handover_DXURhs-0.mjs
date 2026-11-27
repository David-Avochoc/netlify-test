import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as getChosenSiteOrigin } from "./site-url-OBYES-gb_Co1gxb5_.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as checkRateLimit } from "./rate-limit-iZgsy_oY_B5FQp4cK.mjs";
import { f as createMagicLinkUrl } from "./dist__l0ohBBn.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/handover.mjs
var handover_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var HANDOVER_EXPIRY_MS = 3e5;
var HANDOVER_REDIRECT = "/_emdash/admin/settings/security?addPasskey=1";
var POST = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	if (locals.tokenScopes !== void 0) return apiError("FORBIDDEN", "Sign-in handover requires a signed-in session", 403);
	try {
		if (!(await checkRateLimit(emdash.db, user.id, "auth/handover", 5, 300)).allowed) return apiError("RATE_LIMITED", "Too many sign-in links. Try again in a few minutes.", 429);
		const origin = await getChosenSiteOrigin(emdash.db, emdash.config);
		if (!origin) return apiError("NO_SITE_URL", "Set a Site URL before continuing at another address", 409);
		return apiSuccess({ url: await createMagicLinkUrl(createKyselyAdapter(emdash.db), user, origin, {
			expiresInMs: HANDOVER_EXPIRY_MS,
			redirect: HANDOVER_REDIRECT
		}) });
	} catch (error) {
		return handleError(error, "Failed to create a sign-in link", "SIGN_IN_HANDOVER_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/handover@_@mjs
var page = () => handover_exports;
export { page };
