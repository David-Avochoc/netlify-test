import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { a as handleTokenRefresh } from "./device-flow-D6kyi3jX_Baq3dIkn.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs
var refresh_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var refreshSchema = z.object({
	refresh_token: z.string().min(1),
	grant_type: z.string().min(1)
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, refreshSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleTokenRefresh(emdash.db, body));
	} catch (error) {
		return handleError(error, "Failed to refresh token", "TOKEN_REFRESH_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/refresh@_@mjs
var page = () => refresh_exports;
export { page };
