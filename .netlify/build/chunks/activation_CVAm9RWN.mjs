import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as activateMediaUsageCapture, s as getMediaUsageActivationStatus, t as MediaUsageActivationVersionMismatchError } from "./activation-BRmrunZ3_BFONje3D.mjs";
import { t as ErrorCode } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { A as mediaUsageActivationAdvanceBody } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
// node_modules/emdash/dist/media-usage-activation-i6tqb6cn.mjs
async function handleMediaUsageActivationStatus(db) {
	try {
		return {
			success: true,
			data: await getMediaUsageActivationStatus(db)
		};
	} catch (error) {
		if (error instanceof MediaUsageActivationVersionMismatchError) return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_VERSION_MISMATCH,
				message: "Media usage activation version is incompatible with this runtime"
			}
		};
		console.error("[media-usage:activation] status read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_READ_ERROR,
				message: "Failed to read media usage activation status"
			}
		};
	}
}
async function handleMediaUsageActivationAdvance(db, input) {
	try {
		const result = await activateMediaUsageCapture(db, { writersDrained: input.writersDrained });
		if (result.outcome === "lease_active") return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_BUSY,
				message: "Media usage activation is already in progress",
				details: { leaseExpiresAt: result.leaseExpiresAt }
			}
		};
		if (result.outcome === "conflict") return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_CONFLICT,
				message: "Media usage activation ownership changed"
			}
		};
		const activation = await getMediaUsageActivationStatus(db);
		if (activation.state === "expanded") throw new Error("Media usage activation did not advance");
		return {
			success: true,
			data: {
				outcome: activation.state,
				processedCollections: result.processedCollections,
				activation
			}
		};
	} catch (error) {
		if (error instanceof MediaUsageActivationVersionMismatchError) return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_VERSION_MISMATCH,
				message: "Media usage activation version is incompatible with this runtime"
			}
		};
		console.error("[media-usage:activation] advance failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_ADVANCE_ERROR,
				message: "Failed to advance media usage activation"
			}
		};
	}
}
// node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation.mjs
var activation_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	return unwrapResult(await handleMediaUsageActivationStatus(emdash.db));
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	const body = await parseBody(request, mediaUsageActivationAdvanceBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleMediaUsageActivationAdvance(emdash.db, body));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation@_@mjs
var page = () => activation_exports;
export { page };
