import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { r as handleApiTokenRevoke } from "./api-tokens-BIwfh_Ke_CfLteyeO.mjs";
import "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	prerender: () => false
});
/**
* Revoke (delete) an API token.
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const tokenId = params.id;
	if (!tokenId) return apiError("VALIDATION_ERROR", "Token ID is required", 400);
	try {
		return unwrapResult(await handleApiTokenRevoke(emdash.db, tokenId, user.id));
	} catch (error) {
		return handleError(error, "Failed to revoke API token", "TOKEN_REVOKE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_@_@mjs
var page = () => _id__exports;
export { page };
