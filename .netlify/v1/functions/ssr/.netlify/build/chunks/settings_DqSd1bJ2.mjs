import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as siteSettingsTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as handleSettingsUpdate, t as handleSettingsGet } from "./settings-DMHIgDyb_7Zp5l3QR.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { ft as settingsUpdateBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/settings.mjs
var settings_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* GET /_emdash/api/settings
*
* Returns all site settings as a JSON object.
* Unset values are undefined. Media references include resolved URLs.
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:read");
	if (denied) return denied;
	try {
		return unwrapResult(await handleSettingsGet(emdash.db, emdash.storage));
	} catch (error) {
		return handleError(error, "Failed to get settings", "SETTINGS_READ_ERROR");
	}
};
/**
* POST /_emdash/api/settings
*
* Updates site settings. Accepts a partial settings object.
* Merges with existing settings and returns the updated settings.
*/
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, settingsUpdateBody);
		if (isParseError(body)) return body;
		const result = await handleSettingsUpdate(emdash.db, emdash.storage, body);
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [siteSettingsTag()]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update settings", "SETTINGS_UPDATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings@_@mjs
var page = () => settings_exports;
export { page };
