import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { n as getSiteBaseUrl } from "./site-url-OBYES-gb_Co1gxb5_.mjs";
import { n as apiSuccess, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { u as magicLinkSendBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-DaSru7xW_s31QftBx.mjs";
import { n as resolveSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { n as getClientIp, t as checkRateLimit } from "./rate-limit-iZgsy_oY_B5FQp4cK.mjs";
import { t as resolveEmailLocale } from "./email-locale-CGjBa23b_C2-aIh1O.mjs";
import { v as sendMagicLink } from "./dist__l0ohBBn.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
import { r as getMagicLinkEmailStrings } from "./emails_B3qSvFBK.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs
var send_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, magicLinkSendBody);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "magic-link/send", 3, 300)).allowed) return apiSuccess({
			success: true,
			message: "If an account exists for this email, a magic link has been sent."
		});
		if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "Email is not configured. Magic link authentication requires an email provider.", 503);
		const options = new OptionsRepository(emdash.db);
		const baseUrl = await getSiteBaseUrl(emdash.db, request, emdash.config);
		const siteOptions = await options.getMany([
			"site:title",
			"emdash:site_title",
			"emdash:locale"
		]);
		const siteName = resolveSiteTitle(siteOptions.get("site:title"), siteOptions.get("emdash:site_title")) ?? "EmDash";
		const emailLocale = resolveEmailLocale(siteOptions.get("emdash:locale"), request);
		await sendMagicLink({
			baseUrl,
			siteName,
			email: (message) => emdash.email.send(message, "system"),
			emailStrings: await getMagicLinkEmailStrings(emailLocale, siteName),
			emailLocale
		}, createKyselyAdapter(emdash.db), body.email.toLowerCase());
		return apiSuccess({
			success: true,
			message: "If an account exists for this email, a magic link has been sent."
		});
	} catch (error) {
		console.error("Magic link send error:", error);
		return apiSuccess({
			success: true,
			message: "If an account exists for this email, a magic link has been sent."
		});
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/send@_@mjs
var page = () => send_exports;
export { page };
