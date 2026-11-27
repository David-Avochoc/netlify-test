import { t as PluginStateRepository } from "./state-Cdkt6b1h_DPYKkuog.mjs";
import { n as handlePluginEnable, t as handlePluginDisable } from "./plugins-DDiWIA_N_X-1YZygM.mjs";
import { r as setCronTasksEnabled } from "./cron-DEV8oz3R_DHNgvWvU.mjs";
// node_modules/emdash/dist/lifecycle-1Nl01SeB.mjs
async function enableRuntimePlugin(runtime, pluginId) {
	const result = await handlePluginEnable(runtime.db, runtime.configuredPlugins, runtime.sandboxedPluginEntries, pluginId);
	if (!result.success) return result;
	const generation = new PluginStateRepository(runtime.db).getLastWrittenGeneration();
	const source = result.data.item.source;
	if (source === "registry") await runtime.syncRegistryPlugins();
	else if (source === "marketplace") await runtime.syncMarketplacePlugins();
	try {
		await runtime.setPluginStatus(pluginId, "active", generation);
	} catch (error) {
		console.error(`EmDash: Failed to activate plugin "${pluginId}":`, error);
		try {
			const stateRepo = new PluginStateRepository(runtime.db);
			const state = await stateRepo.get(pluginId);
			if (state) await stateRepo.disable(pluginId, state.version);
		} catch (rollbackError) {
			console.error(`EmDash: Failed to persist plugin "${pluginId}" as inactive:`, rollbackError);
		}
		try {
			await setCronTasksEnabled(runtime.db, pluginId, false, { throwOnError: true });
		} catch (rollbackError) {
			console.error(`EmDash: Failed to disable cron tasks for plugin "${pluginId}":`, rollbackError);
		}
		return {
			success: false,
			error: {
				code: "PLUGIN_ENABLE_ERROR",
				message: "Failed to enable plugin"
			}
		};
	}
	await setCronTasksEnabled(runtime.db, pluginId, true);
	return result;
}
async function disableRuntimePlugin(runtime, pluginId) {
	const result = await handlePluginDisable(runtime.db, runtime.configuredPlugins, runtime.sandboxedPluginEntries, pluginId);
	if (!result.success) return result;
	try {
		await runtime.setPluginStatus(pluginId, "inactive", new PluginStateRepository(runtime.db).getLastWrittenGeneration());
	} finally {
		await setCronTasksEnabled(runtime.db, pluginId, false);
	}
	return result;
}
export { enableRuntimePlugin as n, disableRuntimePlugin as t };
