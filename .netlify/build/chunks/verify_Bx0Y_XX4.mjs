import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getRegistryConfigInput } from "./config-DeluGa9H_Db3EBMuk.mjs";
import { n as VERSION } from "./version-BE4RahxC_p74BLWtq.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as handleRegistryInstall } from "./registry-COR9pjyi_B92xLeUt.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { z } from "zod";
import { hostEnvFromVersions } from "@emdash-cms/registry-client/env";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var verifyBodySchema = z.object({
	did: z.string().min(1).max(2048).regex(/^did:[a-z]+:/, "Invalid DID"),
	slug: z.string().min(1).max(64).regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, "Invalid slug"),
	version: z.string().min(1).max(64).optional()
});
var POST = async ({ request, locals }) => {
	try {
		const { emdash, user } = locals;
		if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
		const denied = requirePerm(user, "plugins:manage");
		if (denied) return denied;
		const body = await parseBody(request, verifyBodySchema);
		if (isParseError(body)) return body;
		const reservedPluginIds = /* @__PURE__ */ new Set([...emdash.configuredPlugins.map((plugin) => plugin.id), ...(emdash.config.sandboxed ?? []).map((plugin) => plugin.id)]);
		return unwrapResult(await handleRegistryInstall(emdash.db, emdash.storage, emdash.getSandboxRunner(), getRegistryConfigInput(emdash.config.registry), body, {
			configuredPluginIds: reservedPluginIds,
			hostEnv: hostEnvFromVersions(VERSION, emdash.config.astroVersion),
			verifyOnly: true
		}));
	} catch (error) {
		console.error("[registry-verify] Unhandled error:", error);
		return handleError(error, "Failed to verify registry plugin", "VERIFICATION_FAILED");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify@_@mjs
var page = () => verify_exports;
export { page };
