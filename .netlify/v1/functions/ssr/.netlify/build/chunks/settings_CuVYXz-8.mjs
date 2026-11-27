import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { t as EmDashSecretsError } from "./secrets-O25WpEe__B3AoQE_o.mjs";
import { t as withTransaction } from "./transaction-D5Kq7MTL_B_3_YVm2.mjs";
import { t as ErrorCode } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as encodePluginSettingValue, t as PluginSettingEncryptionError } from "./settings-DgnWX0GN_BMUOKOTz.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { z } from "zod";
// node_modules/emdash/dist/plugin-settings-CKffVNYE.mjs
function settingsKey(pluginId, key) {
	return `plugin:${pluginId}:settings:${key}`;
}
/**
* Resolve a plugin's settings schema from either the configured
* (in-process) plugin list or the statically-sandboxed entries.
* Returns null when the plugin doesn't exist, undefined-equivalent
* empty object when it declares no schema.
*/
function getPluginSettingsSchema(configuredPlugins, sandboxedPluginEntries, pluginId) {
	const plugin = configuredPlugins.find((p) => p.id === pluginId);
	if (plugin) return plugin.admin.settingsSchema ?? {};
	const sandboxed = sandboxedPluginEntries.find((e) => e.id === pluginId);
	if (sandboxed) return sandboxed.settingsSchema ?? {};
	return null;
}
/**
* Validate a single value against its schema field.
* Returns an error message, or null when valid.
*/
function validateValue(key, field, value) {
	switch (field.type) {
		case "string":
		case "secret":
		case "url":
		case "email":
			if (typeof value !== "string") return `Setting "${key}" must be a string`;
			if (field.type === "url" && value !== "" && !URL.canParse(value)) return `Setting "${key}" must be a valid URL`;
			if (field.type === "email" && value !== "" && !value.includes("@")) return `Setting "${key}" must be a valid email address`;
			return null;
		case "number":
			if (typeof value !== "number" || Number.isNaN(value)) return `Setting "${key}" must be a number`;
			if (field.min !== void 0 && value < field.min) return `Setting "${key}" must be at least ${field.min}`;
			if (field.max !== void 0 && value > field.max) return `Setting "${key}" must be at most ${field.max}`;
			return null;
		case "boolean": return typeof value === "boolean" ? null : `Setting "${key}" must be a boolean`;
		case "select":
			if (typeof value !== "string" || !field.options.some((o) => o.value === value)) return `Setting "${key}" must be one of the defined options`;
			return null;
		default: return `Setting "${key}" has an unknown field type`;
	}
}
async function buildSettingsResponse(optionsRepo, pluginId, schema) {
	const keys = Object.keys(schema);
	const stored = await optionsRepo.getMany(keys.map((key) => settingsKey(pluginId, key)));
	const values = {};
	const secretsSet = {};
	for (const key of keys) {
		const field = schema[key];
		if (!field) continue;
		const storedValue = stored.get(settingsKey(pluginId, key));
		if (field.type === "secret") {
			secretsSet[key] = storedValue !== void 0 && storedValue !== null && storedValue !== "";
			continue;
		}
		if (storedValue !== void 0 && storedValue !== null) values[key] = storedValue;
		else if ("default" in field && field.default !== void 0) values[key] = field.default;
		else values[key] = null;
	}
	return {
		schema,
		values,
		secretsSet
	};
}
/**
* Get a plugin's settings (schema + current values, secrets masked)
*/
async function handlePluginSettingsGet(db, pluginId, schema) {
	try {
		return {
			success: true,
			data: await buildSettingsResponse(new OptionsRepository(db), pluginId, schema)
		};
	} catch {
		return {
			success: false,
			error: {
				code: ErrorCode.PLUGIN_SETTINGS_READ_ERROR,
				message: "Failed to read plugin settings"
			}
		};
	}
}
/**
* Update a plugin's settings.
*
* Only keys present in `updates` are written. A `null` value deletes the
* stored value (reverting to the schema default). Secret fields are
* write-only: they accept a new string value or `null` to clear, and the
* response never echoes them back.
*/
async function handlePluginSettingsUpdate(db, pluginId, schema, updates) {
	try {
		for (const [key, value] of Object.entries(updates)) {
			const field = schema[key];
			if (!field) return {
				success: false,
				error: {
					code: ErrorCode.VALIDATION_ERROR,
					message: `Unknown setting "${key}" for plugin "${pluginId}"`
				}
			};
			if (value === null) continue;
			const error = validateValue(key, field, value);
			if (error) return {
				success: false,
				error: {
					code: ErrorCode.VALIDATION_ERROR,
					message: error
				}
			};
		}
		const encodedUpdates = /* @__PURE__ */ new Map();
		for (const [key, value] of Object.entries(updates)) encodedUpdates.set(key, value === null ? null : await encodePluginSettingValue(pluginId, key, value, schema));
		return {
			success: true,
			data: await withTransaction(db, async (trx) => {
				const txRepo = new OptionsRepository(trx);
				for (const [key, value] of encodedUpdates) {
					if (value === null) await txRepo.delete(settingsKey(pluginId, key));
					else await txRepo.set(settingsKey(pluginId, key), value);
					await trx.deleteFrom("_plugin_storage").where("plugin_id", "=", pluginId).where("collection", "=", "__kv").where("id", "=", `settings:${key}`).execute();
				}
				return buildSettingsResponse(txRepo, pluginId, schema);
			})
		};
	} catch (error) {
		if (error instanceof PluginSettingEncryptionError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message
			}
		};
		if (error instanceof EmDashSecretsError) return {
			success: false,
			error: {
				code: ErrorCode.PLUGIN_SETTING_ENCRYPTION_KEY_INVALID,
				message: "EMDASH_ENCRYPTION_KEY is malformed. Restore or correct the configured key from its secret backup. Generate a new key only if no stored plugin setting depends on the lost key."
			}
		};
		return {
			success: false,
			error: {
				code: ErrorCode.PLUGIN_SETTINGS_UPDATE_ERROR,
				message: "Failed to update plugin settings"
			}
		};
	}
}
// node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs
var settings_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var updateBody = z.object({ values: z.record(z.string(), z.unknown()) });
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:manage");
	if (denied) return denied;
	if (!id) return apiError("INVALID_REQUEST", "Plugin ID required", 400);
	const schema = getPluginSettingsSchema(emdash.configuredPlugins, emdash.sandboxedPluginEntries, id) ?? emdash.getRuntimePluginSettingsSchema(id);
	if (schema === null) return apiError("NOT_FOUND", `Plugin not found: ${id}`, 404);
	return unwrapResult(await handlePluginSettingsGet(emdash.db, id, schema));
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:manage");
	if (denied) return denied;
	if (!id) return apiError("INVALID_REQUEST", "Plugin ID required", 400);
	const schema = getPluginSettingsSchema(emdash.configuredPlugins, emdash.sandboxedPluginEntries, id) ?? emdash.getRuntimePluginSettingsSchema(id);
	if (schema === null) return apiError("NOT_FOUND", `Plugin not found: ${id}`, 404);
	const body = await parseBody(request, updateBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handlePluginSettingsUpdate(emdash.db, id, schema, body.values));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings@_@mjs
var page = () => settings_exports;
export { page };
