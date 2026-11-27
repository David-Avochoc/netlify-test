import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as handleTokenRevoke } from "./device-flow-D6kyi3jX_Baq3dIkn.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs
var revoke_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var revokeSchema = z.object({ token: z.string().min(1) });
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, revokeSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleTokenRevoke(emdash.db, body));
	} catch (error) {
		return handleError(error, "Failed to revoke token", "TOKEN_REVOKE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/revoke@_@mjs
var page = () => revoke_exports;
export { page };
