import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { n as handleDeviceCodeLookup, t as handleDeviceAuthorize } from "./device-flow-D6kyi3jX_Baq3dIkn.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs
var authorize_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var lookupSchema = z.object({ user_code: z.string().min(1) });
var authorizeSchema = z.object({
	user_code: z.string().min(1),
	action: z.enum(["approve", "deny"]).optional()
});
var GET = async ({ url, locals }) => {
	const { emdash } = locals;
	const { user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Authentication required", 401);
	try {
		const query = parseQuery(url, lookupSchema);
		if (isParseError(query)) return query;
		return unwrapResult(await handleDeviceCodeLookup(emdash.db, user.role, query));
	} catch (error) {
		return handleError(error, "Failed to look up device code", "DEVICE_CODE_LOOKUP_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	const { user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Authentication required", 401);
	try {
		const body = await parseBody(request, authorizeSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleDeviceAuthorize(emdash.db, user.id, user.role, body));
	} catch (error) {
		return handleError(error, "Failed to authorize device", "AUTHORIZE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/authorize@_@mjs
var page = () => authorize_exports;
export { page };
