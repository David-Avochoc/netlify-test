import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { n as getSiteBaseUrl } from "./site-url-OBYES-gb_Co1gxb5_.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { c as inviteCreateBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { n as resolveSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { t as resolveEmailLocale } from "./email-locale-CGjBa23b_C2-aIh1O.mjs";
import { d as createInvite, t as InviteError } from "./dist__l0ohBBn.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
import { n as getInviteEmailStrings } from "./emails_B3qSvFBK.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs
var invite_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		const body = await parseBody(request, inviteCreateBody);
		if (isParseError(body)) return body;
		const role = body.role ?? Role.AUTHOR;
		const siteOptions = await new OptionsRepository(emdash.db).getMany([
			"site:title",
			"emdash:site_title",
			"emdash:locale"
		]);
		const siteName = resolveSiteTitle(siteOptions.get("site:title"), siteOptions.get("emdash:site_title")) || "EmDash";
		const baseUrl = await getSiteBaseUrl(emdash.db, request, emdash.config);
		const emailSend = emdash.email?.isAvailable() ? (message) => emdash.email.send(message, "system") : void 0;
		const emailLocale = emailSend ? resolveEmailLocale(siteOptions.get("emdash:locale"), request) : void 0;
		const result = await createInvite({
			baseUrl,
			siteName,
			email: emailSend,
			emailStrings: emailLocale ? await getInviteEmailStrings(emailLocale, siteName) : void 0,
			emailLocale
		}, adapter, body.email, role, user.id);
		if (emailSend) return apiSuccess({
			success: true,
			message: `Invite sent to ${body.email}`
		});
		return apiSuccess({
			success: true,
			message: "Invite created. No email provider configured — share the link manually.",
			inviteUrl: result.url
		}, 200);
	} catch (error) {
		if (error instanceof InviteError) return apiError(error.code.toUpperCase(), error.message, {
			user_exists: 409,
			invalid_token: 400,
			token_expired: 400
		}[error.code] ?? 400);
		return handleError(error, "Failed to create invite", "INVITE_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/index@_@mjs
var page = () => invite_exports;
export { page };
