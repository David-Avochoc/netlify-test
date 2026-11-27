import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-DaSru7xW_s31QftBx.mjs";
import { n as getClientIp, r as rateLimitResponse, t as checkRateLimit } from "./rate-limit-iZgsy_oY_B5FQp4cK.mjs";
import { i as handleDeviceTokenExchange } from "./device-flow-D6kyi3jX_Baq3dIkn.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs
var token_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var deviceTokenSchema = z.object({
	device_code: z.string().min(1),
	grant_type: z.string().min(1)
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, deviceTokenSchema);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "device/token", 12, 60)).allowed) return rateLimitResponse(60);
		const result = await handleDeviceTokenExchange(emdash.db, body);
		if (!result.success && result.deviceFlowError) {
			const errorBody = { error: result.deviceFlowError };
			if (result.deviceFlowInterval !== void 0) errorBody.interval = result.deviceFlowInterval;
			return Response.json(errorBody, {
				status: 400,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store",
					Pragma: "no-cache"
				}
			});
		}
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to exchange device code", "TOKEN_EXCHANGE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/token@_@mjs
var page = () => token_exports;
export { page };
