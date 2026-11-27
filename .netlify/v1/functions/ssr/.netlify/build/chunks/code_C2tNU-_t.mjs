import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-DaSru7xW_s31QftBx.mjs";
import { n as getClientIp, r as rateLimitResponse, t as checkRateLimit } from "./rate-limit-iZgsy_oY_B5FQp4cK.mjs";
import { r as handleDeviceCodeRequest } from "./device-flow-D6kyi3jX_Baq3dIkn.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs
var code_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var deviceCodeSchema = z.object({
	client_id: z.string().optional(),
	scope: z.string().optional()
});
var POST = async ({ request, locals, url }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, deviceCodeSchema);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "device/code", 10, 60)).allowed) return rateLimitResponse(60);
		const verificationUri = new URL("/_emdash/admin/device", getPublicOrigin(url, emdash?.config)).toString();
		return unwrapResult(await handleDeviceCodeRequest(emdash.db, body, verificationUri));
	} catch (error) {
		return handleError(error, "Failed to create device code", "DEVICE_CODE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/code@_@mjs
var page = () => code_exports;
export { page };
