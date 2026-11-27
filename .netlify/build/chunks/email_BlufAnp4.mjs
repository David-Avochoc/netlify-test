import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as getSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { a as loadSmtpConfigFromDb, i as isSmtpEnvConfigured, n as SmtpDeliveryError, o as loadSmtpConfigFromEnv, s as saveSmtpConfigToDb, t as SMTP_EMAIL_PLUGIN_ID } from "./email-smtp-CE6nESRL_C41HBcgp.mjs";
import { z } from "zod";
import { p as escapeHtml } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/settings/email.mjs
var email_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
var EMAIL_DELIVER_HOOK = "email:deliver";
var EMAIL_BEFORE_SEND_HOOK = "email:beforeSend";
var EMAIL_AFTER_SEND_HOOK = "email:afterSend";
/**
* GET /_emdash/api/settings/email
*
* Returns the email configuration state:
* - Current provider selection
* - Available providers (plugins with email:deliver)
* - Active middleware (email:beforeSend / email:afterSend plugins)
* - Whether email is available
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	try {
		const pipeline = emdash.hooks;
		const optionsRepo = new OptionsRepository(emdash.db);
		const providers = pipeline.getExclusiveHookProviders(EMAIL_DELIVER_HOOK);
		const selectedProviderId = await optionsRepo.get(`emdash:exclusive_hook:${EMAIL_DELIVER_HOOK}`) ?? pipeline.getExclusiveSelection(EMAIL_DELIVER_HOOK);
		const beforeSendPlugins = pipeline.getHookProviders(EMAIL_BEFORE_SEND_HOOK).map((p) => p.pluginId);
		const afterSendPlugins = pipeline.getHookProviders(EMAIL_AFTER_SEND_HOOK).map((p) => p.pluginId);
		let smtpStatus = {
			configured: false,
			source: null
		};
		const encryptionKey = process.env.EMDASH_ENCRYPTION_KEY;
		const dbConfig = encryptionKey ? await loadSmtpConfigFromDb(emdash.db, encryptionKey) : null;
		let envConfig = null;
		if (!dbConfig) try {
			envConfig = loadSmtpConfigFromEnv();
		} catch {}
		const smtpConfig = dbConfig ?? envConfig;
		if (smtpConfig) smtpStatus = {
			configured: true,
			source: dbConfig ? "db" : "env",
			host: smtpConfig.host,
			port: smtpConfig.port,
			secure: smtpConfig.secure,
			user: smtpConfig.user,
			...smtpConfig.fromName ? { fromName: smtpConfig.fromName } : {},
			...smtpConfig.fromEmail ? { fromEmail: smtpConfig.fromEmail } : {},
			...smtpConfig.replyTo ? { replyTo: smtpConfig.replyTo } : {}
		};
		return apiSuccess({
			available: emdash.email?.isAvailable() ?? false,
			providers: providers.map((p) => ({ pluginId: p.pluginId })),
			selectedProviderId: selectedProviderId ?? null,
			middleware: {
				beforeSend: beforeSendPlugins,
				afterSend: afterSendPlugins
			},
			smtp: smtpStatus
		});
	} catch (error) {
		return handleError(error, "Failed to get email settings", "EMAIL_SETTINGS_READ_ERROR");
	}
};
/**
* POST /_emdash/api/settings/email
*
* Send a test email through the full pipeline.
* Validates the pipeline is configured and the provider works.
*/
var testEmailBody = z.object({ to: z.email() });
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "No email provider is configured. Configure SMTP or activate an email provider plugin.", 503);
	try {
		const body = await parseBody(request, testEmailBody);
		if (isParseError(body)) return body;
		const siteName = await getSiteTitle(new OptionsRepository(emdash.db)) ?? "EmDash";
		const safeName = escapeHtml(siteName);
		await emdash.email.send({
			to: body.to,
			subject: `Test email from ${siteName}`,
			text: `This is a test email from ${siteName}.\n\nIf you received this, your email provider is working correctly.`,
			html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-size: 24px; margin-bottom: 20px;">Test Email</h1>
  <p>This is a test email from <strong>${safeName}</strong>.</p>
  <p>If you received this, your email provider is working correctly.</p>
  <p style="color: #666; font-size: 14px; margin-top: 30px;">
    Sent via the EmDash email pipeline.
  </p>
</body>
</html>`
		}, "admin");
		return apiSuccess({
			success: true,
			message: `Test email sent to ${body.to}`
		});
	} catch (error) {
		if (error instanceof SmtpDeliveryError) {
			console.error("[EMAIL_TEST_ERROR]", error);
			return apiError("EMAIL_TEST_ERROR", `Failed to send test email: ${error.message}`, 502);
		}
		return handleError(error, "Failed to send test email", "EMAIL_TEST_ERROR");
	}
};
var smtpConfigSchema = z.object({
	host: z.string().min(1),
	port: z.number().int().min(1).max(65535).refine((p) => p !== 25, { message: "Port 25 is not supported. Use 587 (STARTTLS) or 465 (implicit TLS) instead." }),
	secure: z.enum(["starttls", "tls"]),
	user: z.string().min(1),
	pass: z.string().min(1).optional(),
	fromName: z.string().optional(),
	fromEmail: z.string().email().optional(),
	replyTo: z.string().email().optional()
}).refine((smtp) => smtp.fromEmail || z.email().safeParse(smtp.user).success, {
	message: "A sender email is required when the SMTP username is not an email address.",
	path: ["fromEmail"]
});
var emailSettingsBody = z.discriminatedUnion("provider", [z.object({
	provider: z.literal("smtp"),
	smtp: smtpConfigSchema.optional()
}), z.object({
	provider: z.literal("plugin"),
	pluginId: z.string().min(1)
})]);
var PUT = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, emailSettingsBody);
		if (isParseError(body)) return body;
		const encryptionKey = process.env.EMDASH_ENCRYPTION_KEY;
		const optionsRepo = new OptionsRepository(emdash.db);
		const optionKey = `emdash:exclusive_hook:${EMAIL_DELIVER_HOOK}`;
		switch (body.provider) {
			case "smtp": {
				if (!body.smtp) {
					if (!(encryptionKey ? await loadSmtpConfigFromDb(emdash.db, encryptionKey) : null) && !isSmtpEnvConfigured()) return apiError("VALIDATION_ERROR", "SMTP settings are required", 400);
					await optionsRepo.set(optionKey, SMTP_EMAIL_PLUGIN_ID);
					emdash.hooks.setExclusiveSelection(EMAIL_DELIVER_HOOK, SMTP_EMAIL_PLUGIN_ID);
					return apiSuccess({
						success: true,
						message: "SMTP activated"
					});
				}
				if (!encryptionKey) return apiError("ENCRYPTION_KEY_MISSING", "EMDASH_ENCRYPTION_KEY is required to store SMTP credentials securely", 500);
				let pass = body.smtp.pass;
				if (!pass) {
					const existing = await loadSmtpConfigFromDb(emdash.db, encryptionKey);
					if (!existing) return apiError("VALIDATION_ERROR", "Password is required for initial SMTP configuration", 400);
					if (existing.host !== body.smtp.host || existing.user !== body.smtp.user) return apiError("VALIDATION_ERROR", "Re-enter the password when changing the SMTP host or username", 400);
					pass = existing.pass;
				}
				await saveSmtpConfigToDb(emdash.db, encryptionKey, {
					host: body.smtp.host,
					port: body.smtp.port,
					secure: body.smtp.secure,
					user: body.smtp.user,
					pass,
					...body.smtp.fromName ? { fromName: body.smtp.fromName } : {},
					...body.smtp.fromEmail ? { fromEmail: body.smtp.fromEmail } : {},
					...body.smtp.replyTo ? { replyTo: body.smtp.replyTo } : {}
				});
				await optionsRepo.set(optionKey, SMTP_EMAIL_PLUGIN_ID);
				emdash.hooks.setExclusiveSelection(EMAIL_DELIVER_HOOK, SMTP_EMAIL_PLUGIN_ID);
				return apiSuccess({
					success: true,
					message: "SMTP configured and activated"
				});
			}
			case "plugin":
				if (body.pluginId === "emdash-builtin-smtp") return apiError("VALIDATION_ERROR", "Use the smtp provider variant for SMTP", 400);
				if (!emdash.hooks.getExclusiveHookProviders(EMAIL_DELIVER_HOOK).some((p) => p.pluginId === body.pluginId)) return apiError("VALIDATION_ERROR", "Unknown email provider", 400);
				await optionsRepo.set(optionKey, body.pluginId);
				emdash.hooks.setExclusiveSelection(EMAIL_DELIVER_HOOK, body.pluginId);
				return apiSuccess({
					success: true,
					message: "Email provider updated"
				});
			default: return body;
		}
	} catch (error) {
		return handleError(error, "Failed to save email settings", "EMAIL_SETTINGS_SAVE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/email@_@mjs
var page = () => email_exports;
export { page };
