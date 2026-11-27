import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { t as getConfiguredOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { c as invalidateSiteSettingsCache, d as setSiteSettings } from "./settings-BApLX_aS_DL4S1VIP.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { S as setupBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { n as applySeedWithinBudget } from "./apply-CmE9k57Q_DPEZHvtz.mjs";
import { n as validateSeed } from "./validate-DBnEN6hU_BqO-32JV.mjs";
import { n as loadSeedMediaBasePath, t as loadSeed } from "./load-CEt0TQ4__ugELySm5.mjs";
import { t as getAuthMode } from "./mode-D6Qg_-2J_D3bpCne5.mjs";
// node_modules/emdash/dist/astro/routes/api/setup/index.mjs
var setup_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* What one setup request may spend on the seed before the rest continues in
* the next request. Cloudflare Workers Free allows 1,000 calls to D1, KV and R2
* and 50 external fetches per request. A `$media` download takes at least three
* fetches (two DNS-over-HTTPS lookups in `ssrfSafeFetch`, then the file) and
* three more per redirect. The margin covers a redirect per download, the entry
* that crosses the budget with its images, the phases after content and the
* object-cache writes at the end.
*/
var SEED_BUDGET_PER_REQUEST = {
	queries: 500,
	mediaDownloads: 5
};
var POST = async ({ request, url, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		try {
			const setupComplete = await new OptionsRepository(emdash.db).get("emdash:setup_complete");
			if (setupComplete === true || setupComplete === "true") return apiError("ALREADY_CONFIGURED", "Setup has already been completed", 409);
		} catch {}
		const configuredSiteUrl = getConfiguredOrigin(emdash.config);
		url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname;
		const onCloudflareWorkers = typeof navigator !== "undefined" && typeof navigator.userAgent === "string" && navigator.userAgent.includes("Cloudflare-Workers");
		let requestOrigin;
		if (onCloudflareWorkers) requestOrigin = `https://${url.hostname}`;
		const siteUrl = configuredSiteUrl ?? requestOrigin;
		if (!siteUrl) return apiError("SITE_URL_REQUIRED", "Set siteUrl or EMDASH_SITE_URL before running production setup", 500);
		const body = await parseBody(request, setupBody);
		if (isParseError(body)) return body;
		const seed = await loadSeed();
		const mediaBasePath = await loadSeedMediaBasePath();
		seed.settings = {
			...seed.settings,
			title: body.title,
			tagline: body.tagline
		};
		const validation = validateSeed(seed);
		if (!validation.valid) return apiError("INVALID_SEED", `Invalid seed file: ${validation.errors.join(", ")}`, 400);
		let seeded;
		try {
			seeded = await applySeedWithinBudget(emdash.db, seed, {
				includeContent: body.includeContent,
				onConflict: "skip",
				mediaBasePath,
				storage: emdash.storage ?? void 0
			}, SEED_BUDGET_PER_REQUEST);
		} catch (error) {
			return handleError(error, "Failed to apply seed", "SEED_ERROR");
		}
		const { result, complete: seedComplete, progress: seedProgress } = seeded;
		if (seedComplete) await setSiteSettings({
			title: body.title,
			tagline: body.tagline
		}, emdash.db);
		const useExternalAuth = getAuthMode(emdash.config).type === "external";
		try {
			const options = new OptionsRepository(emdash.db);
			await options.setIfAbsent("emdash:site_url", siteUrl);
			if (await options.setIfAbsent("site:staging", true)) invalidateSiteSettingsCache();
			if (seedComplete) if (useExternalAuth) {
				await options.set("emdash:setup_complete", true);
				await options.set("emdash:site_title", body.title);
				if (body.tagline) await options.set("emdash:site_tagline", body.tagline);
			} else await options.set("emdash:setup_state", {
				step: "site_complete",
				title: body.title,
				tagline: body.tagline
			});
		} catch (error) {
			console.error("Failed to save setup state:", error);
		}
		if (!seedComplete) return apiSuccess({
			success: true,
			setupComplete: false,
			seedComplete: false,
			seedProgress,
			result
		});
		return apiSuccess({
			success: true,
			setupComplete: useExternalAuth,
			seedComplete: true,
			result
		});
	} catch (error) {
		return handleError(error, "Setup failed", "SETUP_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/index@_@mjs
var page = () => setup_exports;
export { page };
