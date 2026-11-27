import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as resolveAndValidateExternalUrl, t as SsrfError } from "./ssrf-Em0CeaaN_C95clHBV.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { D as wpPluginAnalyzeBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { c as getSource, t as SiteChallengeError } from "./registry-2vAYgqCz_hl2mE_gm.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { u as SchemaRegistry } from "./registry-CSLrHSx1_Ce4dsyNi.mjs";
// node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs
var analyze_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	try {
		const body = await parseBody(request, wpPluginAnalyzeBody);
		if (isParseError(body)) return body;
		try {
			await resolveAndValidateExternalUrl(body.url);
		} catch (e) {
			return apiError("SSRF_BLOCKED", e instanceof SsrfError ? e.message : "Invalid URL", 400);
		}
		const source = getSource("wordpress-plugin");
		if (!source) return apiError("NOT_CONFIGURED", "WordPress plugin source not available", 500);
		const existingCollections = await fetchExistingCollections(emdash?.db);
		return apiSuccess({
			success: true,
			analysis: await source.analyze({
				type: "url",
				url: body.url,
				token: body.token
			}, {
				db: emdash?.db,
				getExistingCollections: async () => existingCollections
			})
		});
	} catch (error) {
		if (error instanceof SiteChallengeError) return apiError("WP_SITE_CHALLENGE", error.message, 502);
		return handleError(error, "Failed to analyze WordPress site", "WP_PLUGIN_ANALYZE_ERROR");
	}
};
/** Fetch collections and their fields from schema registry */
async function fetchExistingCollections(db) {
	const result = /* @__PURE__ */ new Map();
	if (!db) return result;
	try {
		const registry = new SchemaRegistry(db);
		const collections = await registry.listCollections();
		for (const collection of collections) {
			const fields = await registry.listFields(collection.id);
			const fieldMap = /* @__PURE__ */ new Map();
			for (const field of fields) fieldMap.set(field.slug, { type: field.type });
			result.set(collection.slug, {
				slug: collection.slug,
				fields: fieldMap
			});
		}
	} catch (error) {
		console.warn("Could not fetch schema registry:", error);
	}
	return result;
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze@_@mjs
var page = () => analyze_exports;
export { page };
