import { c as executeAtomicBatchIfSupported, d as isSqlite } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { t as withTransaction } from "./transaction-D5Kq7MTL_B_3_YVm2.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/state-Cdkt6b1h.mjs
/**
* Plugin State Repository
*
* Database-backed storage for plugin activation state.
* Used by the admin API to persist plugin enable/disable across restarts.
*/
var PLUGIN_STATE_GENERATION_OPTION = "emdash:plugins:generation";
var GENERATION_RECEIPTS_KEY = Symbol.for("emdash.plugin-state-generation-receipts");
function generationUpsert(db, conditional) {
	const sqlite = isSqlite(db);
	const where = conditional && sqlite ? sql`WHERE changes() > 0` : sql`WHERE true`;
	const previous = sqlite ? sql`CASE WHEN json_type(options.value) = 'integer'
			AND CAST(CAST(options.value AS BIGINT) AS TEXT) = options.value
			AND CAST(options.value AS BIGINT) >= 0
			AND CAST(options.value AS BIGINT) < 9223372036854775807
			THEN CAST(options.value AS BIGINT) ELSE json_extract('', '$') END` : sql`CAST(options.value AS BIGINT)`;
	return sql`
		INSERT INTO options (name, value, revision)
		SELECT ${PLUGIN_STATE_GENERATION_OPTION}, '1', ${crypto.randomUUID()}
		${where}
		ON CONFLICT(name) DO UPDATE SET
			value = CAST(${previous} + 1 AS TEXT),
			revision = excluded.revision
		RETURNING value
	`;
}
var receipts = globalThis[GENERATION_RECEIPTS_KEY] ??= /* @__PURE__ */ new WeakMap();
var GENERATION_PATTERN = /^(?:0|[1-9][0-9]*)$/;
var UNSUPPORTED_TRANSACTION_PATTERN = /^transactions are not supported$/i;
function parseGeneration(value) {
	if (value == null) return 0n;
	if (!GENERATION_PATTERN.test(value)) throw new Error(`Invalid plugin state generation: ${value}`);
	return BigInt(value);
}
var TIMEZONE_SUFFIX = /(?:z|[+-]\d{2}(?::?\d{2})?)$/i;
var HOUR_OFFSET_SUFFIX = /\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?[+-]\d{2}$/i;
function parseDatabaseTimestamp(value) {
	let normalized = value.trim().replace(" ", "T");
	if (HOUR_OFFSET_SUFFIX.test(normalized)) normalized += ":00";
	else if (!TIMEZONE_SUFFIX.test(normalized)) normalized += "Z";
	return new Date(normalized);
}
function toPluginStatus(value) {
	if (value === "active") return "active";
	return "inactive";
}
function toPluginSource(value) {
	if (value === "marketplace") return "marketplace";
	if (value === "registry") return "registry";
	return "config";
}
/**
* Repository for plugin state in the database
*/
var PluginStateRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Highest generation returned by writes through this handle, possibly by another local caller.
	* Consume it after any surrounding transaction commits.
	*/
	getLastWrittenGeneration() {
		return receipts.get(this.db);
	}
	async getGeneration() {
		return parseGeneration((await this.db.selectFrom("options").select("value").where("name", "=", PLUGIN_STATE_GENERATION_OPTION).executeTakeFirst())?.value);
	}
	async getSnapshot() {
		const rows = await sql`
			SELECT COALESCE((SELECT value FROM options WHERE name = ${PLUGIN_STATE_GENERATION_OPTION}), '0') AS generation,
			       ps.*
			FROM (SELECT 1 AS anchor) AS a
			LEFT JOIN _plugin_state AS ps ON TRUE
		`.execute(this.db);
		return {
			generation: parseGeneration(rows.rows[0]?.generation),
			states: rows.rows.filter((row) => row.plugin_id !== null).map((row) => rowToPluginState(row))
		};
	}
	async mutate(buildStateQuery) {
		const stateQuery = buildStateQuery(this.db);
		const bump = generationUpsert(this.db, false);
		const batched = await executeAtomicBatchIfSupported(this.db, [stateQuery, generationUpsert(this.db, true)]);
		if (batched) {
			const changed = (batched[0]?.rows.length ?? 0) > 0;
			if (changed) {
				const row = batched[1]?.rows[0];
				if (!row || typeof row !== "object" || !("value" in row) || typeof row.value !== "string") throw new Error("Plugin mutation did not publish a generation");
				this.recordGeneration(parseGeneration(row.value));
			}
			return changed;
		}
		let changed = false;
		let writtenGeneration;
		const run = async (database) => {
			const result = await buildStateQuery(database).executeTakeFirst();
			changed = result !== void 0 && typeof result === "object" && result !== null && "plugin_id" in result;
			if (changed) {
				const value = (await bump.execute(database)).rows[0]?.value;
				if (typeof value !== "string") throw new Error("Plugin mutation did not publish a generation");
				writtenGeneration = parseGeneration(value);
			}
		};
		try {
			await withTransaction(this.db, run);
		} catch (error) {
			if (!(error instanceof Error) || !UNSUPPORTED_TRANSACTION_PATTERN.test(error.message)) throw error;
			await run(this.db);
		}
		if (writtenGeneration !== void 0) this.recordGeneration(writtenGeneration);
		return changed;
	}
	recordGeneration(generation) {
		const previous = receipts.get(this.db);
		if (previous === void 0 || generation > previous) receipts.set(this.db, generation);
	}
	/**
	* Get state for a specific plugin
	*/
	async get(pluginId) {
		const row = await this.db.selectFrom("_plugin_state").selectAll().where("plugin_id", "=", pluginId).executeTakeFirst();
		if (!row) return null;
		return rowToPluginState(row);
	}
	/**
	* Get all plugin states
	*/
	async getAll() {
		return (await this.db.selectFrom("_plugin_state").selectAll().execute()).map(rowToPluginState);
	}
	/**
	* Get all marketplace-installed plugin states
	*/
	async getMarketplacePlugins() {
		return (await this.db.selectFrom("_plugin_state").selectAll().where("source", "=", "marketplace").execute()).map(rowToPluginState);
	}
	/**
	* Get all registry-installed plugin states.
	*
	* The runtime's registry sync path uses this to discover which
	* registry plugins should be loaded into the sandbox on this worker.
	*/
	async getRegistryPlugins() {
		return (await this.db.selectFrom("_plugin_state").selectAll().where("source", "=", "registry").execute()).map(rowToPluginState);
	}
	/**
	* Create or update plugin state
	*/
	async upsert(pluginId, version, status, opts) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = await this.get(pluginId);
		if (existing) {
			const updates = {
				status,
				version
			};
			if (status === "active" && existing.status !== "active") updates.activated_at = now;
			else if (status === "inactive" && existing.status !== "inactive") updates.deactivated_at = now;
			if (opts?.source) updates.source = opts.source;
			if (opts?.marketplaceVersion !== void 0) updates.marketplace_version = opts.marketplaceVersion;
			if (opts?.displayName !== void 0) updates.display_name = opts.displayName;
			if (opts?.description !== void 0) updates.description = opts.description;
			if (opts?.registryPublisherDid !== void 0) updates.registry_publisher_did = opts.registryPublisherDid;
			if (opts?.registrySlug !== void 0) updates.registry_slug = opts.registrySlug;
			if (opts?.mcpToolsEnabled !== void 0) updates.mcp_tools_enabled = opts.mcpToolsEnabled ? 1 : 0;
			if (opts?.mcpToolsConsent !== void 0) updates.mcp_tools_consent = opts.mcpToolsConsent;
			await this.mutate((db) => db.updateTable("_plugin_state").set(updates).where("plugin_id", "=", pluginId).returning("plugin_id"));
		} else await this.mutate((db) => db.insertInto("_plugin_state").values({
			plugin_id: pluginId,
			status,
			version,
			installed_at: now,
			activated_at: status === "active" ? now : null,
			deactivated_at: null,
			data: null,
			source: opts?.source ?? "config",
			marketplace_version: opts?.marketplaceVersion ?? null,
			display_name: opts?.displayName ?? null,
			description: opts?.description ?? null,
			registry_publisher_did: opts?.registryPublisherDid ?? null,
			registry_slug: opts?.registrySlug ?? null,
			mcp_tools_enabled: opts?.mcpToolsEnabled ? 1 : 0,
			mcp_tools_consent: opts?.mcpToolsConsent ?? null
		}).returning("plugin_id"));
		return await this.get(pluginId);
	}
	/**
	* Insert an active state row unless the plugin already has one.
	*
	* Returns true only for the caller whose insert created the row, so
	* concurrent callers agree on a single owner for one-time setup.
	*/
	async createActiveIfAbsent(pluginId, version, source) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		return this.mutate((db) => db.insertInto("_plugin_state").values({
			plugin_id: pluginId,
			status: "active",
			version,
			installed_at: now,
			activated_at: now,
			deactivated_at: null,
			data: null,
			source,
			marketplace_version: null,
			display_name: null,
			description: null,
			registry_publisher_did: null,
			registry_slug: null,
			mcp_tools_enabled: 0,
			mcp_tools_consent: null
		}).onConflict((oc) => oc.column("plugin_id").doNothing()).returning("plugin_id"));
	}
	async restoreIfVersion(expectedVersion, state) {
		return this.mutate((db) => db.updateTable("_plugin_state").set({
			version: state.version,
			status: state.status,
			installed_at: state.installedAt.toISOString(),
			activated_at: state.activatedAt?.toISOString() ?? null,
			deactivated_at: state.deactivatedAt?.toISOString() ?? null,
			source: state.source,
			marketplace_version: state.marketplaceVersion,
			display_name: state.displayName,
			description: state.description,
			registry_publisher_did: state.registryPublisherDid,
			registry_slug: state.registrySlug,
			mcp_tools_enabled: state.mcpToolsEnabled ? 1 : 0,
			mcp_tools_consent: state.mcpToolsConsent
		}).where("plugin_id", "=", state.pluginId).where("version", "=", expectedVersion).where("source", "=", state.source).returning("plugin_id"));
	}
	/**
	* Enable a plugin
	*/
	async enable(pluginId, version) {
		return this.upsert(pluginId, version, "active");
	}
	/**
	* Disable a plugin
	*/
	async disable(pluginId, version) {
		return this.upsert(pluginId, version, "inactive");
	}
	/**
	* Delete plugin state
	*/
	async delete(pluginId, conditions) {
		return this.mutate((db) => {
			let query = db.deleteFrom("_plugin_state").where("plugin_id", "=", pluginId);
			if (conditions?.version !== void 0) query = query.where("version", "=", conditions.version);
			if (conditions?.source !== void 0) query = query.where("source", "=", conditions.source);
			if (conditions?.status !== void 0) query = query.where("status", "=", conditions.status);
			return query.returning("plugin_id");
		});
	}
};
function rowToPluginState(row) {
	return {
		pluginId: row.plugin_id,
		status: toPluginStatus(row.status),
		version: row.version,
		installedAt: parseDatabaseTimestamp(row.installed_at),
		activatedAt: row.activated_at ? parseDatabaseTimestamp(row.activated_at) : null,
		deactivatedAt: row.deactivated_at ? parseDatabaseTimestamp(row.deactivated_at) : null,
		source: toPluginSource(row.source),
		marketplaceVersion: row.marketplace_version ?? null,
		displayName: row.display_name ?? null,
		description: row.description ?? null,
		registryPublisherDid: row.registry_publisher_did ?? null,
		registrySlug: row.registry_slug ?? null,
		mcpToolsEnabled: row.mcp_tools_enabled === 1,
		mcpToolsConsent: row.mcp_tools_consent ?? null
	};
}
export { PluginStateRepository as t };
