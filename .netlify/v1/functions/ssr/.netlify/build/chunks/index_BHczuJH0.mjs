import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { i as handleOAuthClientList, t as handleOAuthClientCreate } from "./oauth-clients-ohsH0FlQ_Bireoxo0.mjs";
import { z } from "zod";
import "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs
var oauth_clients_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var createClientSchema = z.object({
	id: z.string().min(1, "Client ID is required").max(255, "Client ID must be at most 255 characters"),
	name: z.string().min(1, "Name is required").max(255, "Name must be at most 255 characters"),
	redirectUris: z.array(z.url("Each redirect URI must be a valid URL")).min(1, "At least one redirect URI is required"),
	scopes: z.array(z.string()).optional()
});
/**
* List all registered OAuth clients.
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	return unwrapResult(await handleOAuthClientList(emdash.db));
};
/**
* Register a new OAuth client.
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	try {
		const body = await parseBody(request, createClientSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleOAuthClientCreate(emdash.db, body), 201);
	} catch (error) {
		return handleError(error, "Failed to create OAuth client", "CLIENT_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index@_@mjs
var page = () => oauth_clients_exports;
export { page };
