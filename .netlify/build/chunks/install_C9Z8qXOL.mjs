import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getRegistryConfigInput } from "./config-DeluGa9H_Db3EBMuk.mjs";
import { n as VERSION } from "./version-BE4RahxC_p74BLWtq.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as checkSiteWriteFence } from "./fence-CkdbSoZX_DNtaDXEC.mjs";
import { n as handleRegistryUninstall, t as handleRegistryInstall } from "./registry-COR9pjyi_B92xLeUt.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as finalizePluginInstall } from "./install-finalization-B02IcpqW_BXDEDJnX.mjs";
import { z } from "zod";
import { hostEnvFromVersions } from "@emdash-cms/registry-client/env";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs
var install_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var installBodySchema = z.object({
	did: z.string().min(1).max(2048).regex(/^did:[a-z]+:/, "Invalid DID"),
	slug: z.string().min(1).max(64).regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, "Invalid slug"),
	version: z.string().min(1).max(64).optional(),
	acknowledgedDeclaredAccess: z.unknown().optional(),
	acknowledgedMcpTools: z.unknown().optional(),
	acknowledgedPublicRoutes: z.unknown().optional(),
	acknowledgedProfileCid: z.string().min(1).max(256).optional(),
	acknowledgedReleaseCid: z.string().min(1).max(256).optional()
});
var POST = async ({ request, locals }) => {
	try {
		const { emdash, user } = locals;
		if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
		const denied = requirePerm(user, "plugins:manage");
		if (denied) return denied;
		const writeFence = await checkSiteWriteFence(emdash.db);
		if (writeFence) return writeFence;
		const body = await parseBody(request, installBodySchema);
		if (isParseError(body)) return body;
		const reservedPluginIds = /* @__PURE__ */ new Set([...emdash.configuredPlugins.map((p) => p.id), ...(emdash.config.sandboxed ?? []).map((p) => p.id)]);
		const result = await handleRegistryInstall(emdash.db, emdash.storage, emdash.getSandboxRunner(), getRegistryConfigInput(emdash.config.registry), {
			did: body.did,
			slug: body.slug,
			version: body.version,
			acknowledgedDeclaredAccess: body.acknowledgedDeclaredAccess,
			acknowledgedMcpTools: body.acknowledgedMcpTools,
			acknowledgedPublicRoutes: body.acknowledgedPublicRoutes,
			acknowledgedProfileCid: body.acknowledgedProfileCid,
			acknowledgedReleaseCid: body.acknowledgedReleaseCid
		}, {
			configuredPluginIds: reservedPluginIds,
			hostEnv: hostEnvFromVersions(VERSION, emdash.config.astroVersion)
		});
		if (!result.success) return unwrapResult(result);
		await finalizePluginInstall({
			pluginId: result.data.pluginId,
			syncRuntime: () => emdash.syncRegistryPlugins(),
			runLifecycle: () => emdash.runPluginInstallLifecycle(result.data.pluginId),
			rollback: () => handleRegistryUninstall(emdash.db, emdash.storage, result.data.pluginId, { rollbackInstall: true })
		});
		return unwrapResult(result, 201);
	} catch (error) {
		console.error("[registry-install] Unhandled error:", error);
		return handleError(error, "Failed to install plugin from registry", "INSTALL_FAILED");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install@_@mjs
var page = () => install_exports;
export { page };
