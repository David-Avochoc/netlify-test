import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as checkSiteWriteFence } from "./fence-CkdbSoZX_DNtaDXEC.mjs";
import { l as handleMarketplaceUninstall, s as handleMarketplaceInstall } from "./marketplace-D9fChLav_DPvHsZ-B.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { i as pluginPublicRouteAcknowledgementSchema } from "./routes-BScyES_G_D2rFeUGB.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as finalizePluginInstall } from "./install-finalization-B02IcpqW_BXDEDJnX.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs
var install_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var installBodySchema = z.object({
	version: z.string().min(1).optional(),
	confirmMcpTools: z.boolean().optional(),
	acknowledgedPublicRoutes: pluginPublicRouteAcknowledgementSchema.optional()
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
		const body = await parseOptionalBody(request, installBodySchema, {});
		if (isParseError(body)) return body;
		const configuredPluginIds = new Set(emdash.configuredPlugins.map((p) => p.id));
		const siteOrigin = new URL(request.url).origin;
		const result = await handleMarketplaceInstall(emdash.db, emdash.storage, emdash.getSandboxRunner(), emdash.config.marketplace, id, {
			version: body.version,
			configuredPluginIds,
			siteOrigin,
			sandboxBypassed: emdash.isSandboxBypassed(),
			confirmMcpTools: body.confirmMcpTools,
			acknowledgedPublicRoutes: body.acknowledgedPublicRoutes
		});
		if (!result.success) return unwrapResult(result);
		await finalizePluginInstall({
			pluginId: id,
			syncRuntime: () => emdash.syncMarketplacePlugins(),
			runLifecycle: () => emdash.runPluginInstallLifecycle(id),
			rollback: () => handleMarketplaceUninstall(emdash.db, emdash.storage, id, { rollbackInstall: true })
		});
		return unwrapResult(result, 201);
	} catch (error) {
		console.error("[marketplace-install] Unhandled error:", error);
		return handleError(error, "Failed to install plugin from marketplace", "INSTALL_FAILED");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install@_@mjs
var page = () => install_exports;
export { page };
