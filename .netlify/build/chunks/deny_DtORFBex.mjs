import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as requireAnyPerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { r as handleApprovalDecide } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/approvals/_id_/deny.mjs
var prerender = false;
var POST = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	const denied = requireAnyPerm(user, ["transfer:export", "transfer:import"]);
	if (denied) return denied;
	if (locals.tokenScopes !== void 0) return apiError("FORBIDDEN", "Transfer approvals require a signed-in session", 403);
	return unwrapResult(await handleApprovalDecide(emdash.db, {
		approvalId: params.id ?? "",
		decision: "deny",
		user
	}));
};
export { POST, prerender };
