import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as PluginStateRepository } from "./state-Cdkt6b1h_DPYKkuog.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as checkSiteWriteFence } from "./fence-CkdbSoZX_DNtaDXEC.mjs";
import { g as rollbackPluginUpdate, u as handleMarketplaceUpdate } from "./marketplace-D9fChLav_DPvHsZ-B.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { i as pluginPublicRouteAcknowledgementSchema } from "./routes-BScyES_G_D2rFeUGB.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as finalizePluginUpdate } from "./install-finalization-B02IcpqW_BXDEDJnX.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs
var update_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var updateBodySchema = z.object({
	version: z.string().min(1).optional(),
	confirmCapabilityChanges: z.boolean().optional(),
	acknowledgedPublicRoutes: pluginPublicRouteAcknowledgementSchema.optional(),
	confirmMcpTools: z.boolean().optional()
});
var POST = async ({ params, request, locals }) => {
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
	const result = await handleMarketplaceUpdate(emdash.db, emdash.storage, emdash.getSandboxRunner(), emdash.config.marketplace, id, {
		version: body.version,
		confirmCapabilityChanges: body.confirmCapabilityChanges,
		acknowledgedPublicRoutes: body.acknowledgedPublicRoutes,
		confirmMcpTools: body.confirmMcpTools,
		sandboxBypassed: emdash.isSandboxBypassed()
	});
	if (!result.success) return unwrapResult(result);
	if (!previousState) return apiError("UPDATE_FAILED", "Failed to update plugin", 500);
	await finalizePluginUpdate({
		pluginId: id,
		syncRuntime: () => emdash.syncMarketplacePlugins(),
		runLifecycle: () => emdash.runPluginActivateLifecycle(id),
		rollback: () => rollbackPluginUpdate(emdash.db, emdash.storage, previousState, result.data.newVersion, "marketplace"),
		runRollbackLifecycle: () => previousState.status === "active" ? emdash.runPluginActivateLifecycle(id) : Promise.resolve()
	});
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update@_@mjs
var page = () => update_exports;
export { page };
