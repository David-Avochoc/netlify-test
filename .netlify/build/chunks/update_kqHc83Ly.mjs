import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getRegistryConfigInput } from "./config-DeluGa9H_Db3EBMuk.mjs";
import { n as VERSION } from "./version-BE4RahxC_p74BLWtq.mjs";
import { t as PluginStateRepository } from "./state-Cdkt6b1h_DPYKkuog.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as checkSiteWriteFence } from "./fence-CkdbSoZX_DNtaDXEC.mjs";
import { g as rollbackPluginUpdate } from "./marketplace-D9fChLav_DPvHsZ-B.mjs";
import { r as handleRegistryUpdate } from "./registry-COR9pjyi_B92xLeUt.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { i as pluginPublicRouteAcknowledgementSchema } from "./routes-BScyES_G_D2rFeUGB.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as finalizePluginUpdate } from "./install-finalization-B02IcpqW_BXDEDJnX.mjs";
import { z } from "zod";
import { hostEnvFromVersions } from "@emdash-cms/registry-client/env";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update.mjs
var update_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var updateBodySchema = z.object({
	version: z.string().min(1).max(64).optional(),
	confirmCapabilityChanges: z.boolean().optional(),
	acknowledgedPublicRoutes: pluginPublicRouteAcknowledgementSchema.optional(),
	confirmMcpTools: z.boolean().optional(),
	acknowledgedProfileCid: z.string().min(1).max(256).optional(),
	acknowledgedReleaseCid: z.string().min(1).max(256).optional()
});
var POST = async ({ params, request, locals }) => {
	try {
		const { emdash, user } = locals;
		const { id } = params;
		if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
		const denied = requirePerm(user, "plugins:manage");
		if (denied) return denied;
		const writeFence = await checkSiteWriteFence(emdash.db);
		if (writeFence) return writeFence;
		if (!id) return apiError("INVALID_REQUEST", "Plugin ID required", 400);
		const body = await parseOptionalBody(request, updateBodySchema, {});
		if (isParseError(body)) return body;
		const previousState = await new PluginStateRepository(emdash.db).get(id);
		const result = await handleRegistryUpdate(emdash.db, emdash.storage, emdash.getSandboxRunner(), getRegistryConfigInput(emdash.config.registry), id, {
			version: body.version,
			confirmCapabilityChanges: body.confirmCapabilityChanges,
			acknowledgedPublicRoutes: body.acknowledgedPublicRoutes,
			confirmMcpTools: body.confirmMcpTools,
			acknowledgedProfileCid: body.acknowledgedProfileCid,
			acknowledgedReleaseCid: body.acknowledgedReleaseCid,
			hostEnv: hostEnvFromVersions(VERSION, emdash.config.astroVersion)
		});
		if (!result.success) return unwrapResult(result);
		if (!previousState) return apiError("UPDATE_FAILED", "Failed to update plugin", 500);
		await finalizePluginUpdate({
			pluginId: id,
			syncRuntime: () => emdash.syncRegistryPlugins(),
			runLifecycle: () => emdash.runPluginActivateLifecycle(id),
			rollback: () => rollbackPluginUpdate(emdash.db, emdash.storage, previousState, result.data.newVersion, "registry"),
			runRollbackLifecycle: () => previousState.status === "active" ? emdash.runPluginActivateLifecycle(id) : Promise.resolve()
		});
		return unwrapResult(result);
	} catch (error) {
		console.error("[registry-update] Unhandled error:", error);
		return handleError(error, "Failed to update plugin from registry", "UPDATE_FAILED");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update@_@mjs
var page = () => update_exports;
export { page };
