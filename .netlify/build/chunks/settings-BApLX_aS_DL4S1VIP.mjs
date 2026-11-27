import { a as __exportAll } from "./runner-Nv0yWP-G_mZbAgbBU.mjs";
import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { r as getRequestContext, t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { i as resolvePluginEncryptionKeys } from "./secrets-O25WpEe__B3AoQE_o.mjs";
import { n as invalidateSingleFlightCache, r as singleFlightCached, t as createSingleFlightCache } from "./single-flight-cache-BCP1Tvcm_BRMod6Xz.mjs";
import { n as cachedQuery, p as invalidateObjectCache } from "./object-cache-I4Re7BOR_CyRvBWDi.mjs";
import { n as peekRequestCache, r as requestCached } from "./request-cache-BYMs-BGX_Ol4MyTL8.mjs";
import { t as withTransaction } from "./transaction-D5Kq7MTL_B_3_YVm2.mjs";
import { t as MediaRepository } from "./media--P-IEycF_BxdQj7uT.mjs";
import { t as normalizeSiteSettingsVersion } from "./version-PIyVra05_Chf17gzG.mjs";
import { n as siteSettingsTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { p as getDb } from "./loader-DF6J1Fpd_Di1oQrTQ.mjs";
import { t as buildRenderMediaUrl } from "./url-CBR5ZBBQ_DuCAEm0Z.mjs";
import { o as isEncryptedPluginSetting, r as decryptPluginSetting, t as PluginSettingEncryptionError } from "./settings-DgnWX0GN_BMUOKOTz.mjs";
import { r as bumpRunningExportWriteEpochs } from "./fence-CkdbSoZX_DNtaDXEC.mjs";
// node_modules/emdash/dist/plugin-utils.mjs
/**
* Narrow `unknown` to a plain object record.
*
* Useful for safely inspecting untyped API responses before accessing properties.
*/
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
// node_modules/emdash/dist/settings-BApLX_aS.mjs
var settings_exports = /* @__PURE__ */ __exportAll({
	getPluginSetting: () => getPluginSetting,
	getPluginSettingWithDb: () => getPluginSettingWithDb,
	getPluginSettings: () => getPluginSettings,
	getPluginSettingsWithDb: () => getPluginSettingsWithDb,
	getSiteSetting: () => getSiteSetting,
	getSiteSettingWithDb: () => getSiteSettingWithDb,
	getSiteSettings: () => getSiteSettings,
	getSiteSettingsWithCacheHint: () => getSiteSettingsWithCacheHint,
	getSiteSettingsWithDb: () => getSiteSettingsWithDb,
	invalidateSiteSettingsCache: () => invalidateSiteSettingsCache,
	invalidateSiteSettingsSnapshot: () => invalidateSiteSettingsSnapshot,
	peekSiteSettingsSnapshot: () => peekSiteSettingsSnapshot,
	setSiteSettings: () => setSiteSettings
});
/** Object-cache namespace for site settings. */
var SETTINGS_CACHE_NAMESPACE = "settings";
/** Prefix for site settings in the options table */
var SETTINGS_PREFIX = "site:";
/** Settings stored as one object whose fields are updated individually. */
var NESTED_SETTING_KEYS = /* @__PURE__ */ new Set(["seo", "social"]);
function isPluginSettingEnvelopeRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value) && "$emdash" in value && value.$emdash === "plugin-setting";
}
async function decodePersistedPluginSetting(pluginId, key, value, encryptionKeys) {
	if (isEncryptedPluginSetting(value)) return decryptPluginSetting(pluginId, key, value, encryptionKeys);
	if (isPluginSettingEnvelopeRecord(value)) throw new PluginSettingEncryptionError("PLUGIN_SETTING_DECRYPTION_FAILED", "Plugin secret setting has an invalid encrypted envelope");
	return value;
}
var SITE_SETTINGS_CACHE_TTL_MS = 3e4;
var SITE_SETTINGS_CACHE_KEY = Symbol.for("emdash:site-settings:swr");
var g = globalThis;
var settingsCache = g[SITE_SETTINGS_CACHE_KEY] ?? (() => {
	const c = {
		snapshot: null,
		expiresAt: 0,
		generation: 0,
		revalidatingUntil: 0,
		refresh: createSingleFlightCache()
	};
	g[SITE_SETTINGS_CACHE_KEY] = c;
	return c;
})();
/** Capture the resolved snapshot before route-cache headers are finalized. @internal */
function peekSiteSettingsSnapshot() {
	return settingsCache.snapshot;
}
/** Discard a snapshot found stale by the route-cache freshness check. @internal */
function invalidateSiteSettingsSnapshot() {
	settingsCache.generation++;
	settingsCache.snapshot = null;
	settingsCache.expiresAt = 0;
	settingsCache.revalidatingUntil = 0;
	invalidateSingleFlightCache(settingsCache.refresh);
}
/**
* Bump the isolate-wide site-settings cache version, forcing the next
* `getSiteSettings()` to re-query the database.
*
* Called from every `site:*` write path. Other isolates still serve their
* own cached copy while a background refresh picks up remote writes.
*/
function invalidateSiteSettingsCache() {
	invalidateSiteSettingsSnapshot();
	invalidateObjectCache(SETTINGS_CACHE_NAMESPACE);
}
/**
* Type guard for MediaReference values
*/
function isMediaReference(value) {
	return typeof value === "object" && value !== null && "mediaId" in value;
}
/**
* Resolve a media reference to include the full URL plus content metadata.
*
* Pulls `mimeType` and intrinsic dimensions from the media row so callers
* can emit correct head tags (e.g. `<link rel="icon" type="image/svg+xml">`,
* which Chromium requires when the URL has no `.svg` extension) without
* a second round-trip to the media table.
*/
async function resolveMediaReference(mediaRef, db, _storage) {
	if (!mediaRef?.mediaId) return mediaRef;
	try {
		const media = await new MediaRepository(db).findById(mediaRef.mediaId);
		if (media) return {
			...mediaRef,
			url: `/_emdash/api/media/file/${media.storageKey}`,
			contentType: media.mimeType,
			...media.width !== null ? { width: media.width } : {},
			...media.height !== null ? { height: media.height } : {}
		};
	} catch {}
	return mediaRef;
}
function withPublicMediaUrl(ref, resolve) {
	if (!ref.url) return ref;
	return {
		...ref,
		url: buildRenderMediaUrl(resolve, { url: ref.url })
	};
}
/**
* Rewrite resolved media URLs through the request's storage adapter so a
* configured `publicUrl` applies. The cached snapshot keeps the internal
* route, so the result is a copy.
*/
function withPublicMediaUrls(settings) {
	const resolve = getRequestContext()?.publicMediaUrl;
	if (!resolve) return settings;
	const resolved = { ...settings };
	if (settings.logo) resolved.logo = withPublicMediaUrl(settings.logo, resolve);
	if (settings.favicon) resolved.favicon = withPublicMediaUrl(settings.favicon, resolve);
	if (settings.seo?.defaultOgImage) resolved.seo = {
		...settings.seo,
		defaultOgImage: withPublicMediaUrl(settings.seo.defaultOgImage, resolve)
	};
	return resolved;
}
/**
* Get a single site setting by key
*
* Returns `undefined` if the setting has not been configured.
* For media settings (logo, favicon), the URL is resolved automatically.
*
* @param key - The setting key (e.g., "title", "logo", "social")
* @returns The setting value, or undefined if not set
*
* @example
* ```ts
* import { getSiteSetting } from "emdash";
*
* const title = await getSiteSetting("title");
* const logo = await getSiteSetting("logo");
* console.log(logo?.url); // Resolved URL
* ```
*/
async function getSiteSetting(key) {
	const primed = peekRequestCache("siteSettings");
	if (primed) return (await primed)[key];
	return requestCached(`siteSetting:${key}`, async () => {
		const value = await getSiteSettingWithDb(key, await getDb());
		if (value === void 0) return void 0;
		const settings = {};
		settings[key] = value;
		return withPublicMediaUrls(settings)[key];
	});
}
/**
* Get a single site setting by key (with explicit db)
*
* @internal Use `getSiteSetting()` in templates. This variant is for admin routes
* that already have a database handle.
*/
async function getSiteSettingWithDb(key, db, storage = null) {
	const value = await new OptionsRepository(db).get(`${SETTINGS_PREFIX}${key}`);
	if (!value) return;
	if ((key === "logo" || key === "favicon") && isMediaReference(value)) return await resolveMediaReference(value, db, storage);
	if (key === "seo" && value && typeof value === "object") {
		const seo = value;
		if (seo.defaultOgImage) return {
			...seo,
			defaultOgImage: await resolveMediaReference(seo.defaultOgImage, db, storage)
		};
	}
	return value;
}
function refreshSiteSettings() {
	return singleFlightCached(settingsCache.refresh, () => cachedQuery({
		namespace: SETTINGS_CACHE_NAMESPACE,
		key: "snapshot-v1",
		load: async () => loadSiteSettingsSnapshot(await getDb())
	}), {
		anchor: (promise) => after(() => promise),
		ownerTimeoutMs: 3e4
	});
}
function installSiteSettings(snapshot) {
	settingsCache.snapshot = snapshot;
	settingsCache.expiresAt = Date.now() + SITE_SETTINGS_CACHE_TTL_MS;
}
function revalidateSiteSettings() {
	const now = Date.now();
	if (settingsCache.revalidatingUntil > now) return;
	settingsCache.revalidatingUntil = now + SITE_SETTINGS_CACHE_TTL_MS;
	const generation = ++settingsCache.generation;
	invalidateSingleFlightCache(settingsCache.refresh);
	after(async () => {
		try {
			const snapshot = await refreshSiteSettings();
			if (generation === settingsCache.generation) installSiteSettings(snapshot);
		} catch (error) {
			console.error("[emdash:settings] revalidating site settings failed:", error);
		}
	});
}
async function loadCachedSiteSettings() {
	for (let attempt = 0; attempt < 3; attempt++) {
		const snapshot = settingsCache.snapshot;
		if (snapshot) {
			if (Date.now() >= settingsCache.expiresAt) revalidateSiteSettings();
			return snapshot;
		}
		const generation = settingsCache.generation;
		const loaded = await refreshSiteSettings();
		if (generation === settingsCache.generation) {
			installSiteSettings(loaded);
			return loaded;
		}
		if (attempt === 2) return loaded;
	}
	throw new Error("Site settings refresh exhausted without loading settings");
}
/**
* Get all site settings
*
* Returns all configured settings. Unset values are undefined.
* Media references (logo/favicon) are resolved to include URLs.
*
* @example
* ```ts
* import { getSiteSettings } from "emdash";
*
* const settings = await getSiteSettings();
* console.log(settings.title); // "My Site"
* console.log(settings.logo?.url); // "/_emdash/api/media/file/abc123.png", or the storage publicUrl
* ```
*/
function getSiteSettings() {
	return requestCached("siteSettings", async () => {
		return withPublicMediaUrls((await requestCached("siteSettingsSnapshot", async () => {
			const ctx = getRequestContext();
			const requestSettings = ctx?.siteSettings;
			if (ctx?.routeCacheFill) return loadSiteSettingsSnapshot(await getDb());
			let loaded = requestSettings?.snapshot ?? await loadCachedSiteSettings();
			if (requestSettings?.version !== void 0 && loaded.version !== requestSettings.version) {
				invalidateSiteSettingsSnapshot();
				const generation = settingsCache.generation;
				loaded = await loadSiteSettingsSnapshot(await getDb());
				if (generation === settingsCache.generation) installSiteSettings(loaded);
			}
			return loaded;
		})).data);
	}).then(async (data) => {
		const snapshot = await peekRequestCache("siteSettingsSnapshot");
		if (snapshot) getRequestContext()?.siteSettings?.onRead(snapshot.version);
		return data;
	});
}
/**
* Get all site settings with a Workers edge-cache hint.
*
* Use the returned `cacheHint` with `Astro.cache.set()` so pages that render
* settings can be purged automatically when site settings change.
*/
async function getSiteSettingsWithCacheHint() {
	return {
		data: await getSiteSettings(),
		cacheHint: { tags: [siteSettingsTag()] }
	};
}
/**
* Get all site settings (with explicit db)
*
* @internal Use `getSiteSettings()` in templates. This variant is for admin routes
* that already have a database handle.
*/
async function getSiteSettingsWithDb(db, storage = null) {
	return (await loadSiteSettingsSnapshot(db, storage)).data;
}
async function loadSiteSettingsSnapshot(db, storage = null) {
	const allOptions = await new OptionsRepository(db).getVersionedByPrefix(SETTINGS_PREFIX);
	const version = normalizeSiteSettingsVersion(JSON.stringify([...allOptions].filter(([key]) => key.startsWith(SETTINGS_PREFIX)).map(([key, value]) => [key, value.revision])));
	const settings = {};
	for (const [key, value] of allOptions) {
		const settingKey = key.replace(SETTINGS_PREFIX, "");
		settings[settingKey] = value.value;
	}
	const typedSettings = settings;
	if (typedSettings.logo) typedSettings.logo = await resolveMediaReference(typedSettings.logo, db, storage);
	if (typedSettings.favicon) typedSettings.favicon = await resolveMediaReference(typedSettings.favicon, db, storage);
	if (typedSettings.seo?.defaultOgImage) typedSettings.seo = {
		...typedSettings.seo,
		defaultOgImage: await resolveMediaReference(typedSettings.seo.defaultOgImage, db, storage)
	};
	return {
		data: typedSettings,
		version
	};
}
/**
* Set site settings (internal function used by admin API)
*
* Merges provided settings with existing ones. Only provided fields are updated,
* including fields inside `seo` and `social`; `seo.defaultOgImage: null` removes the default image.
* Media references should include just the mediaId; URLs are resolved on read.
*
* @param settings - Partial settings object with values to update
* @param db - Kysely database instance
* @returns Promise that resolves when settings are saved
*
* @internal
*
* @example
* ```ts
* // Update multiple settings at once
* await setSiteSettings({
*   title: "My Site",
*   tagline: "Welcome",
*   logo: { mediaId: "med_123", alt: "Logo" }
* }, db);
* ```
*/
async function setSiteSettings(settings, db) {
	const updates = {};
	const deletions = [];
	const nestedPatches = [];
	for (const [key, value] of Object.entries(settings)) {
		if (value === void 0) continue;
		if (value === null) deletions.push(`${SETTINGS_PREFIX}${key}`);
		else if (NESTED_SETTING_KEYS.has(key) && isRecord(value)) nestedPatches.push([key, value]);
		else updates[`${SETTINGS_PREFIX}${key}`] = value;
	}
	if (Object.keys(updates).length === 0 && deletions.length === 0 && nestedPatches.length === 0) return;
	try {
		await withTransaction(db, async (trx) => {
			const transactionOptions = new OptionsRepository(trx);
			await transactionOptions.setMany(updates);
			await transactionOptions.deleteMany(deletions);
			for (const [key, patch] of nestedPatches) {
				const optionName = `${SETTINGS_PREFIX}${key}`;
				const next = { ...await transactionOptions.get(optionName) };
				for (const [field, fieldValue] of Object.entries(patch)) if (fieldValue === null) delete next[field];
				else if (fieldValue !== void 0) next[field] = fieldValue;
				if (Object.keys(next).length === 0) await transactionOptions.delete(optionName);
				else await transactionOptions.set(optionName, next);
			}
			try {
				await bumpRunningExportWriteEpochs(trx);
			} catch (error) {
				if (isMissingTableError(error)) return;
				throw error;
			}
		});
	} finally {
		invalidateSiteSettingsCache();
	}
}
/**
* Get a single plugin setting by key.
*
* Plugin settings are stored in the options table under
* `plugin:<pluginId>:settings:<key>`.
*/
async function getPluginSetting(pluginId, key) {
	return getPluginSettingWithDb(pluginId, key, await getDb());
}
/**
* Get a single plugin setting by key (with explicit db).
*
* @internal Use `getPluginSetting()` in templates and plugin rendering code.
*/
async function getPluginSettingWithDb(pluginId, key, db) {
	const value = await new OptionsRepository(db).get(`plugin:${pluginId}:settings:${key}`);
	if (value === null) return void 0;
	return await decodePersistedPluginSetting(pluginId, key, value);
}
/**
* Get all persisted plugin settings for a plugin.
*
* Defaults declared in `admin.settingsSchema` are not materialized
* automatically; callers should apply their own fallback defaults.
*/
async function getPluginSettings(pluginId) {
	return getPluginSettingsWithDb(pluginId, await getDb());
}
/**
* Get all persisted plugin settings for a plugin (with explicit db).
*
* @internal Use `getPluginSettings()` in templates and plugin rendering code.
*/
async function getPluginSettingsWithDb(pluginId, db) {
	const prefix = `plugin:${pluginId}:settings:`;
	const entries = [...await new OptionsRepository(db).getByPrefix(prefix)].filter(([key]) => key.startsWith(prefix));
	const encryptionKeys = entries.some(([, value]) => isEncryptedPluginSetting(value)) ? await resolvePluginEncryptionKeys() : void 0;
	return Object.fromEntries(await Promise.all(entries.map(async ([storedKey, value]) => {
		const key = storedKey.slice(prefix.length);
		return [key, await decodePersistedPluginSetting(pluginId, key, value, encryptionKeys)];
	})));
}
export { getSiteSettings as a, invalidateSiteSettingsCache as c, setSiteSettings as d, settings_exports as f, getSiteSettingWithDb as i, invalidateSiteSettingsSnapshot as l, getPluginSettings as n, getSiteSettingsWithCacheHint as o, isRecord as p, getSiteSetting as r, getSiteSettingsWithDb as s, getPluginSetting as t, peekSiteSettingsSnapshot as u };
