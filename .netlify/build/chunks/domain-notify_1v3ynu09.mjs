import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { t as getChosenSiteOrigin } from "./site-url-OBYES-gb_Co1gxb5_.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as resolveSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { t as getAuthMode } from "./mode-D6Qg_-2J_D3bpCne5.mjs";
import { t as checkRateLimit } from "./rate-limit-iZgsy_oY_B5FQp4cK.mjs";
import { t as resolveEmailLocale } from "./email-locale-CGjBa23b_C2-aIh1O.mjs";
import { p as escapeHtml } from "./dist__l0ohBBn.mjs";
import { t as getDomainMoveEmailStrings } from "./emails_B3qSvFBK.mjs";
import { n as getLocaleDir } from "./loadMessages-D2ZSYMIu_CxGvi6bD.mjs";
// node_modules/emdash/dist/astro/routes/api/settings/domain-notify.mjs
var domain_notify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Tell users that the site moved to a new address.
*/
function buildDomainMoveEmail(to, loginUrl, strings, locale) {
	const url = escapeHtml(loginUrl);
	return {
		to,
		subject: strings.subject,
		text: `${strings.intro}\n\n${strings.instruction}\n\n${loginUrl}\n\n${strings.passkeyNote}`,
		html: `
<!DOCTYPE html>
<html lang="${escapeHtml(locale)}" dir="${getLocaleDir(locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-size: 24px; margin-bottom: 20px;">${escapeHtml(strings.subject)}</h1>
  <p>${escapeHtml(strings.intro)}</p>
  <p>${escapeHtml(strings.instruction)}</p>
  <p style="margin: 30px 0;">
    <a href="${url}" style="background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">${escapeHtml(strings.buttonLabel)}</a>
  </p>
  <p style="color: #666; font-size: 14px;">${escapeHtml(strings.passkeyNote)}</p>
</body>
</html>`
	};
}
/**
* Email every active user except the sender a link to the sign-in page at
* `origin`. The email carries no sign-in token. Sends one email per user,
* so a failed send for one address doesn't stop the others.
*/
async function handleDomainMoveNotice(db, options) {
	try {
		const users = await db.selectFrom("users").select("email").where("disabled", "=", 0).where("id", "!=", options.senderId).execute();
		const loginUrl = new URL("/_emdash/admin/login", options.origin).toString();
		let sent = 0;
		let failed = 0;
		for (const user of users) try {
			await options.send(buildDomainMoveEmail(user.email, loginUrl, options.strings, options.locale));
			sent++;
		} catch (error) {
			failed++;
			console.error("[domain-move-notice] send failed:", error);
		}
		return {
			success: true,
			data: {
				sent,
				failed
			}
		};
	} catch (error) {
		console.error("[domain-move-notice] failed:", error);
		return {
			success: false,
			error: {
				code: "DOMAIN_MOVE_NOTICE_ERROR",
				message: "Failed to email users"
			}
		};
	}
}
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	const denied = requirePerm(user, "users:manage");
	if (denied) return denied;
	if (locals.tokenScopes !== void 0) return apiError("FORBIDDEN", "Emailing users requires a signed-in session", 403);
	if (getAuthMode(emdash.config).type !== "passkey") return apiError("NOT_SUPPORTED", "Users sign in through an external provider", 400);
	if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "No email provider is configured. Install and activate an email provider plugin.", 503);
	try {
		const origin = await getChosenSiteOrigin(emdash.db, emdash.config);
		if (!origin) return apiError("NO_SITE_URL", "Set a Site URL before emailing users about it", 409);
		if (!(await checkRateLimit(emdash.db, "site", "settings/domain/notify", 3, 3600)).allowed) return apiError("RATE_LIMITED", "Users were emailed recently. Try again later.", 429);
		const siteOptions = await new OptionsRepository(emdash.db).getMany([
			"site:title",
			"emdash:site_title",
			"emdash:locale"
		]);
		const siteName = resolveSiteTitle(siteOptions.get("site:title"), siteOptions.get("emdash:site_title")) || "EmDash";
		const locale = resolveEmailLocale(siteOptions.get("emdash:locale"), request);
		const email = emdash.email;
		return unwrapResult(await handleDomainMoveNotice(emdash.db, {
			origin,
			strings: await getDomainMoveEmailStrings(locale, siteName, new URL(origin).host),
			locale,
			senderId: user.id,
			send: (message) => email.send(message, "system")
		}));
	} catch (error) {
		return handleError(error, "Failed to email users", "DOMAIN_MOVE_NOTICE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/domain-notify@_@mjs
var page = () => domain_notify_exports;
export { page };
