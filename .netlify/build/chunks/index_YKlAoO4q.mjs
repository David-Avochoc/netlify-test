import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { h as isValidScope } from "./passkey_BrGsIm4_.mjs";
import { n as handleApiTokenList, t as handleApiTokenCreate } from "./api-tokens-BIwfh_Ke_CfLteyeO.mjs";
import { z } from "zod";
import "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs
var api_tokens_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var createTokenSchema = z.object({
	name: z.string().min(1).max(100),
	scopes: z.array(z.string().refine(isValidScope)).min(1),
	expiresAt: z.iso.datetime().or(z.iso.datetime({ precision: -1 })).optional()
});
/**
* List API tokens for the current user.
* Admins can list all tokens (future: add ?userId= filter).
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	return unwrapResult(await handleApiTokenList(emdash.db, user.id));
};
/**
* Create a new API token.
* Returns the raw token once — it cannot be retrieved again.
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	try {
		const body = await parseBody(request, createTokenSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleApiTokenCreate(emdash.db, user.id, body), 201);
	} catch (error) {
		return handleError(error, "Failed to create API token", "TOKEN_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index@_@mjs
var page = () => api_tokens_exports;
export { page };
