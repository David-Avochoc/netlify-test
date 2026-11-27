import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as handlePluginGet } from "./plugins-DDiWIA_N_X-1YZygM.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	if (!id) return apiError("INVALID_REQUEST", "Plugin ID required", 400);
	const result = await handlePluginGet(emdash.db, emdash.configuredPlugins, emdash.sandboxedPluginEntries, id, emdash.config.marketplace, (pluginId) => emdash.getRuntimePluginSettingsSchema(pluginId));
	if (result.success) {
		const tools = await emdash.getPluginMcpTools(id);
		result.data.item.mcpTools = tools.map(({ inputSchema: _, outputSchema: __, pluginId: ___, ...tool }) => tool);
	}
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index@_@mjs
var page = () => _id__exports;
export { page };
