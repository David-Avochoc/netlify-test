import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as handlePluginList } from "./plugins-DDiWIA_N_X-1YZygM.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs
var plugins_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	const result = await handlePluginList(emdash.db, emdash.configuredPlugins, emdash.sandboxedPluginEntries, emdash.config.marketplace, (pluginId) => emdash.getRuntimePluginSettingsSchema(pluginId));
	if (result.success) {
		const tools = await emdash.getPluginMcpTools();
		for (const item of result.data.items) item.mcpTools = tools.filter((tool) => tool.pluginId === item.id).map(({ inputSchema: _, outputSchema: __, pluginId: ___, ...tool }) => tool);
	}
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/index@_@mjs
var page = () => plugins_exports;
export { page };
