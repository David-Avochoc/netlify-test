import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { n as getSiteBaseUrl } from "./site-url-OBYES-gb_Co1gxb5_.mjs";
import { n as apiSuccess, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { T as signupRequestBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-DaSru7xW_s31QftBx.mjs";
import { t as getSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { n as getClientIp, t as checkRateLimit } from "./rate-limit-iZgsy_oY_B5FQp4cK.mjs";
import { _ as requestSignup } from "./dist__l0ohBBn.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs
var request_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var GENERIC_SUCCESS = {
	success: true,
	message: "If your email domain is allowed, you'll receive a verification email."
};
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "Email not configured. Self-signup is unavailable.", 503);
	try {
		const body = await parseBody(request, signupRequestBody);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "signup/request", 3, 300)).allowed) return apiSuccess(GENERIC_SUCCESS);
		const adapter = createKyselyAdapter(emdash.db);
		const siteName = await getSiteTitle(new OptionsRepository(emdash.db)) || "EmDash";
		await requestSignup({
			baseUrl: await getSiteBaseUrl(emdash.db, request, emdash.config),
			siteName,
			email: (message) => emdash.email.send(message, "system")
		}, adapter, body.email.toLowerCase().trim());
		return apiSuccess(GENERIC_SUCCESS);
	} catch (error) {
		console.error("Signup request error:", error);
		return apiSuccess(GENERIC_SUCCESS);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/request@_@mjs
var page = () => request_exports;
export { page };
