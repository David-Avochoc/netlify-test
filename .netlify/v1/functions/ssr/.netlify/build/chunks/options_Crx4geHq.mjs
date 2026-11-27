import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { f as passkeyOptionsBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-DaSru7xW_s31QftBx.mjs";
import { t as getSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { n as createChallengeStore, t as cleanupExpiredChallenges } from "./challenge-store-B0PoBBqW_BxsHW0tI.mjs";
import { n as getClientIp, r as rateLimitResponse, t as checkRateLimit } from "./rate-limit-iZgsy_oY_B5FQp4cK.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D9iYgt4G_CqIEyCDq.mjs";
import { s as generateAuthenticationOptions } from "./passkey_BrGsIm4_.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs
var options_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		after(async () => {
			try {
				await cleanupExpiredChallenges(emdash.db);
			} catch (error) {
				console.error("[passkey] failed to delete expired challenges:", error);
			}
		});
		const body = await parseOptionalBody(request, passkeyOptionsBody, {});
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "passkey/options", 10, 60)).allowed) return rateLimitResponse(60);
		const url = new URL(request.url);
		return apiSuccess({
			success: true,
			options: await generateAuthenticationOptions(getPasskeyConfig(url, await getSiteTitle(new OptionsRepository(emdash.db)), getPublicOrigin(url, emdash?.config)), [], createChallengeStore(emdash.db))
		});
	} catch (error) {
		return handleError(error, "Failed to generate passkey options", "PASSKEY_OPTIONS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/options@_@mjs
var page = () => options_exports;
export { page };
