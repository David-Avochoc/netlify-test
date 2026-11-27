import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { t as MediaRepository } from "./media--P-IEycF_BxdQj7uT.mjs";
import { n as VERSION, t as COMMIT } from "./version-BE4RahxC_p74BLWtq.mjs";
import { n as apiSuccess, r as handleError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as resolveSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { t as getAuthMode } from "./mode-D6Qg_-2J_D3bpCne5.mjs";
// node_modules/emdash/dist/astro/routes/api/manifest.mjs
var manifest_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash } = locals;
	try {
		const emdashManifest = emdash ? await emdash.getManifest() : null;
		const authMode = getAuthMode(emdash?.config);
		const providerManagedName = authMode.type === "external" && !(typeof authMode.config === "object" && authMode.config !== null && "syncName" in authMode.config && authMode.config.syncName === false);
		let adminBranding = emdash?.config?.admin;
		let siteTitle;
		let siteTimezone = "UTC";
		let staging = false;
		if (emdash?.db) try {
			const titles = await new OptionsRepository(emdash.db).getMany([
				"site:title",
				"emdash:site_title",
				"site:timezone",
				"site:staging",
				"site:logo"
			]);
			const savedSiteTitle = titles.get("site:title");
			siteTitle = typeof savedSiteTitle === "string" ? savedSiteTitle.trim() || void 0 : resolveSiteTitle(void 0, titles.get("emdash:site_title"))?.trim() || void 0;
			const brandingSiteTitle = resolveSiteTitle(savedSiteTitle, titles.get("emdash:site_title"));
			const timezone = titles.get("site:timezone");
			siteTimezone = typeof timezone === "string" && timezone ? timezone : "UTC";
			staging = titles.get("site:staging") === true;
			if (!adminBranding?.siteName && brandingSiteTitle) adminBranding = {
				...adminBranding,
				siteName: brandingSiteTitle
			};
			const siteLogo = titles.get("site:logo");
			if (!adminBranding?.logo && typeof siteLogo === "object" && siteLogo !== null && "mediaId" in siteLogo && typeof siteLogo.mediaId === "string") {
				const media = await new MediaRepository(emdash.db).findById(siteLogo.mediaId);
				if (media) adminBranding = {
					...adminBranding,
					logo: `/_emdash/api/media/file/${media.storageKey}`
				};
			}
		} catch {}
		let signupEnabled = false;
		if (emdash?.db && authMode.type === "passkey") try {
			const { sql } = await import("kysely");
			const result = await sql`
					SELECT COUNT(*) as cnt FROM allowed_domains WHERE enabled = 1
				`.execute(emdash.db);
			signupEnabled = Number(result.rows[0]?.cnt ?? 0) > 0;
		} catch {}
		return apiSuccess(emdashManifest ? {
			...emdashManifest,
			siteTitle,
			timezone: siteTimezone,
			staging,
			coEditing: Boolean(emdash?.rooms),
			authMode: authMode.type === "external" ? authMode.providerType : "passkey",
			providerManagedName,
			signupEnabled,
			admin: adminBranding
		} : {
			version: VERSION,
			commit: COMMIT,
			hash: "default",
			collections: {},
			plugins: {},
			siteTitle,
			timezone: siteTimezone,
			staging,
			taxonomies: [],
			authMode: "passkey",
			providerManagedName,
			signupEnabled,
			admin: adminBranding
		});
	} catch (error) {
		return handleError(error, "Failed to build manifest", "MANIFEST_BUILD_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/manifest@_@mjs
var page = () => manifest_exports;
export { page };
