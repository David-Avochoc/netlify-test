import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { i as scheduledPolicyRejectionKey } from "./content-policy-Drm9sqdA_3UgDLujw.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	prerender: () => false
});
var DELETE = async ({ params, locals, url }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "content:publish_any");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const revision = url.searchParams.get("rev");
		if (!revision) return apiError("INVALID_INPUT", "Rejection revision is required", 400);
		if (!(await new OptionsRepository(emdash.db).compareAndDelete(scheduledPolicyRejectionKey(params.collection, params.id), revision)).applied) return apiError("CONFLICT", "Scheduled publication rejection has changed", 409);
		return apiSuccess({ dismissed: true });
	} catch (error) {
		return handleError(error, "Failed to dismiss scheduled publication rejection", "POLICY_REJECTION_DISMISS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_@_@mjs
var page = () => _id__exports;
export { page };
