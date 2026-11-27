import { D as validateStorageCollectionName, E as validatePluginIdentifier, T as validateJsonFieldName, f as jsonExtractExpr, u as isPostgres } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { t as PluginStateRepository } from "./state-Cdkt6b1h_DPYKkuog.mjs";
import { a as pluginManifestSchema$1, i as normalizeManifestRoute$1, o as reconcileManifestAccess$1 } from "./manifest-schema-Pi_JP_Wi_nE6LF1Jl.mjs";
import { n as MarketplaceUnavailableError, r as createMarketplaceClient, t as MarketplaceError } from "./marketplace-BsMC_Z7o_Ci_WJFCL.mjs";
import { r as warnDeprecatedPluginCapabilities, t as normalizeCapabilities } from "./types-C3tTVw9y_CtRbxQ8e.mjs";
import { sql } from "kysely";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
// node_modules/emdash/dist/types-CTQEkZcI.mjs
/**
* Storage error with additional context
*/
var EmDashStorageError = class extends Error {
	constructor(message, code, cause) {
		super(message);
		this.code = code;
		this.cause = cause;
		this.name = "EmDashStorageError";
	}
};
// node_modules/emdash/dist/types-DHjtQujX.mjs
var SANDBOX_ROUTE_ERROR_DEFINITIONS = {
	MEDIA_USAGE_ACTIVATION_IN_PROGRESS: {
		message: "Media usage activation is in progress",
		status: 503
	},
	MEDIA_USAGE_ACTIVATION_CHECK_FAILED: {
		message: "Unable to verify media usage activation state",
		status: 503
	},
	TRANSFER_IMPORT_IN_PROGRESS: {
		message: "A site import is in progress or incomplete; writes are disabled",
		status: 503
	},
	TRANSFER_FENCE_CHECK_FAILED: {
		message: "Unable to verify whether site writes are allowed",
		status: 503
	}
};
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
function isSandboxRouteErrorCode(value) {
	return typeof value === "string" && value in SANDBOX_ROUTE_ERROR_DEFINITIONS;
}
function getSandboxRouteErrorDetails(error) {
	if (!isRecord(error)) return null;
	const propertyCode = isSandboxRouteErrorCode(error.code) ? error.code : null;
	const nameCode = error instanceof Error && isSandboxRouteErrorCode(error.name) ? error.name : null;
	if (propertyCode && nameCode && propertyCode !== nameCode) return null;
	const code = propertyCode ?? nameCode;
	if (!code || error.status !== void 0 && error.status !== 503) return null;
	return {
		code,
		...SANDBOX_ROUTE_ERROR_DEFINITIONS[code]
	};
}
function withUnavailableReason(message, runner) {
	const reason = runner?.unavailableReason?.();
	return reason ? `${message}: ${reason}` : message;
}
/**
* Error thrown when the sandbox runtime is unavailable.
* This happens when the sidecar process has crashed or hasn't started.
*/
var SandboxUnavailableError = class extends Error {
	constructor(pluginId, reason) {
		super(`Plugin sandbox unavailable for ${pluginId}: ${reason}`);
		this.name = "SandboxUnavailableError";
	}
};
// node_modules/emdash/dist/marketplace-D9fChLav.mjs
function storageIndexHash(pluginId, collection, fields) {
	const identity = JSON.stringify([
		pluginId,
		collection,
		fields
	]);
	return encodeHexLowerCase(sha256(new TextEncoder().encode(identity))).slice(0, 32);
}
/** Preserve short lookup names; unique names must distinguish case-sensitive identities. */
function generateIndexName(pluginId, collection, fields, options) {
	const prefix = options?.unique ? "uidx" : "idx";
	const name = `${prefix}_plugin_${pluginId}_${collection}_${fields.join("_")}`;
	const parts = [
		pluginId,
		collection,
		...fields
	];
	if (name.length <= 63 && (!options?.unique || name === name.toLowerCase() && parts.every((part) => !part.includes("_")))) return name;
	return `${prefix}_plugin_${storageIndexHash(pluginId, collection, fields)}`;
}
/**
* Generate a Kysely sql expression for creating an expression index.
*
* Validates all inputs before interpolation. The collection uses the
* permissive manifest-key rules rather than SQL-identifier rules — it is
* stored as opaque text in index names and partial-index predicates.
*/
function generateCreateIndexSql(db, pluginId, collection, fields, options) {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateStorageCollectionName(collection, "collection name");
	for (const field of fields) validateJsonFieldName(field, "index field name");
	const indexName = generateIndexName(pluginId, collection, fields, options);
	const expressions = fields.map((field) => {
		if (isPostgres(db)) return `(${jsonExtractExpr(db, "data", field)})`;
		return jsonExtractExpr(db, "data", field);
	}).join(", ");
	const createKeyword = options?.unique ? "CREATE UNIQUE INDEX" : "CREATE INDEX";
	const predicate = options?.unique ? sql`WHERE plugin_id = ${sql.lit(pluginId)} AND collection = ${sql.lit(collection)}` : sql``;
	return sql`${sql.raw(createKeyword)} IF NOT EXISTS ${sql.ref(indexName)}
		ON _plugin_storage(plugin_id, collection, ${sql.raw(expressions)})
		${predicate}
	`;
}
/**
* Generate a Kysely sql expression for dropping an index.
*
* Uses sql.ref() for safe identifier quoting.
*/
function generateDropIndexSql(indexName) {
	return sql`DROP INDEX IF EXISTS ${sql.ref(indexName)}`;
}
/**
* Normalize index declarations to arrays of field arrays
*/
function normalizeIndexes(indexes) {
	return indexes.map((index) => Array.isArray(index) ? index : [index]);
}
function getStorageIndexDefinitions(indexes, options) {
	const normalized = normalizeIndexes(indexes);
	const uniqueNormalized = normalizeIndexes(options?.uniqueIndexes ?? []);
	return [...[...new Map([...normalized, ...uniqueNormalized].map((fields) => [fields.join(","), fields])).values()].map((fields) => ({
		fields,
		unique: false
	})), ...uniqueNormalized.map((fields) => ({
		fields,
		unique: true
	}))];
}
/**
* Create all declared indexes for a plugin collection
*/
async function createStorageIndexes(db, pluginId, collection, indexes, options) {
	const allEntries = getStorageIndexDefinitions(indexes, options);
	const created = [];
	const errors = [];
	for (const entry of allEntries) {
		const { fields } = entry;
		const indexName = generateIndexName(pluginId, collection, fields, { unique: entry.unique });
		try {
			await generateCreateIndexSql(db, pluginId, collection, fields, { unique: entry.unique }).execute(db);
			const fieldsJson = JSON.stringify(fields);
			await db.insertInto("_plugin_indexes").values({
				plugin_id: pluginId,
				collection,
				index_name: indexName,
				fields: fieldsJson
			}).onConflict((oc) => oc.columns([
				"plugin_id",
				"collection",
				"index_name"
			]).doUpdateSet({ fields: fieldsJson }).whereRef("_plugin_indexes.fields", "!=", "excluded.fields")).execute();
			created.push(indexName);
		} catch (error) {
			errors.push({
				index: indexName,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}
	return {
		created,
		errors
	};
}
/**
* Remove indexes that are no longer declared
*/
async function removeOrphanedIndexes(db, pluginId, collection, currentIndexes, options) {
	const currentIndexNames = new Set(getStorageIndexDefinitions(currentIndexes, options).map((entry) => generateIndexName(pluginId, collection, entry.fields, { unique: entry.unique })));
	const existingIndexes = await db.selectFrom("_plugin_indexes").select(["index_name"]).where("plugin_id", "=", pluginId).where("collection", "=", collection).execute();
	const removed = [];
	const errors = [];
	for (const { index_name } of existingIndexes) if (!currentIndexNames.has(index_name)) try {
		await generateDropIndexSql(index_name).execute(db);
		await db.deleteFrom("_plugin_indexes").where("plugin_id", "=", pluginId).where("collection", "=", collection).where("index_name", "=", index_name).execute();
		removed.push(index_name);
	} catch (error) {
		errors.push({
			index: index_name,
			error: error instanceof Error ? error.message : String(error)
		});
	}
	return {
		removed,
		errors
	};
}
/**
* Sync indexes for a plugin collection (create new, remove old)
*/
async function syncStorageIndexes(db, pluginId, collection, indexes, options) {
	const removeResult = await removeOrphanedIndexes(db, pluginId, collection, indexes, options);
	const createResult = await createStorageIndexes(db, pluginId, collection, indexes, options);
	return {
		created: createResult.created,
		removed: removeResult.removed,
		errors: [...createResult.errors, ...removeResult.errors]
	};
}
/**
* Materialize the storage indexes a set of plugins declare in their
* manifests. Failures are logged per collection and returned in the result so
* callers can decide whether to treat the sync as complete.
*/
async function syncDeclaredStorageIndexes(db, plugins) {
	const errors = [];
	for (const plugin of plugins) for (const [collection, config] of Object.entries(plugin.storage ?? {})) try {
		const result = await syncStorageIndexes(db, plugin.id, collection, config.indexes, { uniqueIndexes: config.uniqueIndexes });
		for (const failure of result.errors) {
			console.error(`[plugins] Failed to sync storage index ${failure.index} for ${plugin.id}/${collection}: ${failure.error}`);
			errors.push({
				pluginId: plugin.id,
				collection,
				index: failure.index,
				error: failure.error
			});
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`[plugins] Failed to sync storage indexes for ${plugin.id}/${collection}:`, error);
		errors.push({
			pluginId: plugin.id,
			collection,
			index: "(sync)",
			error: message
		});
	}
	return {
		ok: errors.length === 0,
		errors
	};
}
/**
* Remove all indexes for a plugin
*/
async function removeAllPluginIndexes(db, pluginId) {
	const existingIndexes = await db.selectFrom("_plugin_indexes").select(["index_name", "collection"]).where("plugin_id", "=", pluginId).execute();
	const removed = [];
	const errors = [];
	for (const { index_name } of existingIndexes) try {
		await generateDropIndexSql(index_name).execute(db);
		removed.push(index_name);
	} catch (error) {
		errors.push({
			index: index_name,
			error: error instanceof Error ? error.message : String(error)
		});
	}
	await db.deleteFrom("_plugin_indexes").where("plugin_id", "=", pluginId).execute();
	return {
		removed,
		errors
	};
}
/** Semver-like pattern: digits, dots, hyphens, plus signs (e.g. 1.0.0, 1.0.0-beta.1) */
var VERSION_PATTERN = /^[a-z0-9][a-z0-9._+-]*$/i;
function validateVersion(version) {
	if (version.includes("..")) throw new Error("Invalid version format");
	if (!VERSION_PATTERN.test(version)) throw new Error("Invalid version format");
}
function getClient(marketplaceUrl, siteOrigin) {
	if (!marketplaceUrl) return null;
	return createMarketplaceClient(marketplaceUrl, siteOrigin);
}
function diffCapabilities(oldCaps, newCaps) {
	const oldNorm = normalizeCapabilities(oldCaps);
	const newNorm = normalizeCapabilities(newCaps);
	const oldSet = new Set(oldNorm);
	const newSet = new Set(newNorm);
	return {
		added: newNorm.filter((c) => !oldSet.has(c)),
		removed: oldNorm.filter((c) => !newSet.has(c))
	};
}
/**
* Diff route visibility between two manifests.
* Returns routes that changed from private to public (newly exposed).
*/
function diffRouteVisibility(oldManifest, newManifest) {
	const oldPublicRoutes = /* @__PURE__ */ new Set();
	if (oldManifest) for (const entry of oldManifest.routes) {
		const normalized = normalizeManifestRoute$1(entry);
		if (normalized.public === true) oldPublicRoutes.add(normalized.name);
	}
	const newlyPublic = [];
	for (const entry of newManifest.routes) {
		const normalized = normalizeManifestRoute$1(entry);
		if (normalized.public === true && !oldPublicRoutes.has(normalized.name)) newlyPublic.push(normalized.name);
	}
	return { newlyPublic };
}
async function resolveVersionMetadata(client, pluginId, pluginDetail, version) {
	if (pluginDetail.latestVersion?.version === version) return {
		version: pluginDetail.latestVersion.version,
		minEmDashVersion: pluginDetail.latestVersion.minEmDashVersion,
		bundleSize: pluginDetail.latestVersion.bundleSize,
		checksum: pluginDetail.latestVersion.checksum,
		changelog: pluginDetail.latestVersion.changelog,
		capabilities: pluginDetail.latestVersion.capabilities,
		status: pluginDetail.latestVersion.status,
		auditVerdict: pluginDetail.latestVersion.audit?.verdict ?? null,
		imageAuditVerdict: pluginDetail.latestVersion.imageAudit?.verdict ?? null,
		publishedAt: pluginDetail.latestVersion.publishedAt
	};
	return (await client.getVersions(pluginId)).find((v) => v.version === version) ?? null;
}
/** A null verdict means no audit ran, which is allowed; "fail" and "warn" are not. */
function checkAuditVerdict(versionMetadata) {
	if (versionMetadata.auditVerdict !== "fail" && versionMetadata.auditVerdict !== "warn") return null;
	return {
		success: false,
		error: {
			code: "AUDIT_FAILED",
			message: versionMetadata.auditVerdict === "fail" ? "Plugin failed security audit and cannot be installed or updated" : "Plugin audit was inconclusive and cannot be installed or updated until reviewed"
		}
	};
}
function validateBundleIdentity(bundle, pluginId, version) {
	if (bundle.manifest.id !== pluginId) return {
		success: false,
		error: {
			code: "MANIFEST_MISMATCH",
			message: `Bundle manifest ID (${bundle.manifest.id}) does not match requested plugin (${pluginId})`
		}
	};
	if (bundle.manifest.version !== version) return {
		success: false,
		error: {
			code: "MANIFEST_VERSION_MISMATCH",
			message: `Bundle manifest version (${bundle.manifest.version}) does not match requested version (${version})`
		}
	};
	return null;
}
function bundlePrefix(source, pluginId, version) {
	return `${source}/${pluginId}/${version}`;
}
async function storeBundleInR2(storage, pluginId, version, bundle, source = "marketplace") {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateVersion(version);
	const prefix = bundlePrefix(source, pluginId, version);
	await storage.upload({
		key: `${prefix}/manifest.json`,
		body: new TextEncoder().encode(JSON.stringify(bundle.manifest)),
		contentType: "application/json"
	});
	await storage.upload({
		key: `${prefix}/backend.js`,
		body: new TextEncoder().encode(bundle.backendCode),
		contentType: "application/javascript"
	});
	if (bundle.adminCode) await storage.upload({
		key: `${prefix}/admin.js`,
		body: new TextEncoder().encode(bundle.adminCode),
		contentType: "application/javascript"
	});
}
/** Read a ReadableStream to string */
async function streamToText(stream) {
	return new Response(stream).text();
}
/**
* Load a plugin bundle from site-local R2 storage.
*
* `source` selects the R2 key prefix: marketplace plugins are stored
* under `marketplace/<id>/<version>/`, registry plugins under
* `registry/<id>/<version>/`. Defaults to `"marketplace"` for
* backwards compatibility with pre-registry call sites.
*/
async function loadBundleFromR2(storage, pluginId, version, source = "marketplace") {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateVersion(version);
	const prefix = bundlePrefix(source, pluginId, version);
	try {
		const manifestResult = await storage.download(`${prefix}/manifest.json`);
		const backendResult = await storage.download(`${prefix}/backend.js`);
		const manifestText = await streamToText(manifestResult.body);
		const backendCode = await streamToText(backendResult.body);
		const parsed = JSON.parse(manifestText);
		const result = pluginManifestSchema$1.safeParse(parsed);
		if (!result.success) return null;
		const manifest = reconcileManifestAccess$1(result.data);
		warnDeprecatedPluginCapabilities(manifest.id, manifest.capabilities);
		let adminCode;
		try {
			adminCode = await streamToText((await storage.download(`${prefix}/admin.js`)).body);
		} catch {}
		return {
			manifest,
			backendCode,
			adminCode
		};
	} catch {
		return null;
	}
}
/** Delete a plugin bundle from site-local R2 storage */
async function deleteBundleFromR2(storage, pluginId, version, source = "marketplace") {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateVersion(version);
	const prefix = bundlePrefix(source, pluginId, version);
	for (const file of [
		"manifest.json",
		"backend.js",
		"admin.js"
	]) try {
		await storage.delete(`${prefix}/${file}`);
	} catch {}
}
async function rollbackPluginUpdate(db, storage, previousState, failedVersion, source) {
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required"
		}
	};
	if (previousState.source !== source) return {
		success: false,
		error: {
			code: "UPDATE_ROLLBACK_CONFLICT",
			message: "Plugin source changed during update"
		}
	};
	try {
		if (!await new PluginStateRepository(db).restoreIfVersion(failedVersion, previousState)) return {
			success: false,
			error: {
				code: "UPDATE_ROLLBACK_CONFLICT",
				message: "Plugin state changed before the failed update could be rolled back"
			}
		};
		await deleteBundleFromR2(storage, previousState.pluginId, failedVersion, source);
		return {
			success: true,
			data: {
				pluginId: previousState.pluginId,
				version: previousState.version
			}
		};
	} catch (error) {
		console.error("Failed to roll back plugin update:", error);
		return {
			success: false,
			error: {
				code: "UPDATE_ROLLBACK_FAILED",
				message: "Failed to roll back plugin update"
			}
		};
	}
}
async function handleMarketplaceInstall(db, storage, sandboxRunner, marketplaceUrl, pluginId, opts) {
	const client = getClient(marketplaceUrl, opts?.siteOrigin);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required for marketplace plugin installation"
		}
	};
	if (!opts?.sandboxBypassed && (!sandboxRunner || !sandboxRunner.isAvailable())) return {
		success: false,
		error: {
			code: "SANDBOX_NOT_AVAILABLE",
			message: withUnavailableReason("Sandbox runner is required for marketplace plugins", sandboxRunner)
		}
	};
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (existing && existing.source === "marketplace") return {
			success: false,
			error: {
				code: "ALREADY_INSTALLED",
				message: `Plugin ${pluginId} is already installed`
			}
		};
		if (opts?.configuredPluginIds?.has(pluginId)) return {
			success: false,
			error: {
				code: "PLUGIN_ID_CONFLICT",
				message: `Cannot install marketplace plugin "${pluginId}" — a configured plugin with the same ID already exists`
			}
		};
		const pluginDetail = await client.getPlugin(pluginId);
		const version = opts?.version ?? pluginDetail.latestVersion?.version;
		if (!version) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: `No published versions found for plugin ${pluginId}`
			}
		};
		const versionMetadata = await resolveVersionMetadata(client, pluginId, pluginDetail, version);
		if (!versionMetadata) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: `Version ${version} was not found for plugin ${pluginId}`
			}
		};
		const auditError = checkAuditVerdict(versionMetadata);
		if (auditError) return auditError;
		const bundle = await client.downloadBundle(pluginId, version);
		if (versionMetadata.checksum && bundle.checksum !== versionMetadata.checksum) return {
			success: false,
			error: {
				code: "CHECKSUM_MISMATCH",
				message: "Bundle checksum does not match marketplace record. Download may be corrupted."
			}
		};
		const bundleIdentityError = validateBundleIdentity(bundle, pluginId, version);
		if (bundleIdentityError) return bundleIdentityError;
		const routeVisibilityChanges = diffRouteVisibility(void 0, bundle.manifest);
		const hasPublicRoutes = routeVisibilityChanges.newlyPublic.length > 0;
		const publicRoutes = routeVisibilityChanges.newlyPublic.toSorted();
		const acknowledgedPublicRoutes = (opts?.acknowledgedPublicRoutes ?? []).toSorted();
		const mcpTools = bundle.manifest.mcp?.tools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool);
		const consentDetails = {
			routeVisibilityChanges: hasPublicRoutes ? { newlyPublic: publicRoutes } : void 0,
			mcpTools
		};
		if (hasPublicRoutes && JSON.stringify(acknowledgedPublicRoutes) !== JSON.stringify(publicRoutes)) return {
			success: false,
			error: {
				code: "ROUTE_VISIBILITY_ESCALATION",
				message: "Plugin install exposes public (unauthenticated) routes",
				details: consentDetails
			}
		};
		if ((mcpTools?.length ?? 0) > 0 && !opts?.confirmMcpTools) return {
			success: false,
			error: {
				code: "MCP_TOOL_CONSENT_REQUIRED",
				message: "Plugin MCP tools require explicit consent",
				details: consentDetails
			}
		};
		await storeBundleInR2(storage, pluginId, version, bundle);
		await stateRepo.upsert(pluginId, version, "active", {
			source: "marketplace",
			marketplaceVersion: version,
			displayName: pluginDetail.name,
			description: pluginDetail.description ?? void 0
		});
		await syncDeclaredStorageIndexes(db, [bundle.manifest]);
		client.reportInstall(pluginId, version).catch(() => {});
		return {
			success: true,
			data: {
				pluginId,
				version,
				capabilities: bundle.manifest.capabilities
			}
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Plugin marketplace is currently unavailable"
			}
		};
		if (err instanceof MarketplaceError) return {
			success: false,
			error: {
				code: err.code ?? "MARKETPLACE_ERROR",
				message: err.message
			}
		};
		if (err instanceof EmDashStorageError) return {
			success: false,
			error: {
				code: err.code ?? "STORAGE_ERROR",
				message: "Storage error while installing plugin"
			}
		};
		if (err && typeof err === "object" && "code" in err) {
			const code = err.code;
			if (typeof code === "string" && code.trim()) return {
				success: false,
				error: {
					code,
					message: "Failed to install plugin from marketplace"
				}
			};
		}
		console.error("Failed to install marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "INSTALL_FAILED",
				message: "Failed to install plugin from marketplace"
			}
		};
	}
}
async function handleMarketplaceUpdate(db, storage, sandboxRunner, marketplaceUrl, pluginId, opts) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required"
		}
	};
	if (!opts?.sandboxBypassed && (!sandboxRunner || !sandboxRunner.isAvailable())) return {
		success: false,
		error: {
			code: "SANDBOX_NOT_AVAILABLE",
			message: withUnavailableReason("Sandbox runner is required", sandboxRunner)
		}
	};
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `No marketplace plugin found: ${pluginId}`
			}
		};
		const oldVersion = existing.marketplaceVersion ?? existing.version;
		const pluginDetail = await client.getPlugin(pluginId);
		const newVersion = opts?.version ?? pluginDetail.latestVersion?.version;
		if (!newVersion) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: "No newer version available"
			}
		};
		if (newVersion === oldVersion) return {
			success: false,
			error: {
				code: "ALREADY_UP_TO_DATE",
				message: "Plugin is already up to date"
			}
		};
		const versionMetadata = await resolveVersionMetadata(client, pluginId, pluginDetail, newVersion);
		if (!versionMetadata) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: `Version ${newVersion} was not found for plugin ${pluginId}`
			}
		};
		const auditError = checkAuditVerdict(versionMetadata);
		if (auditError) return auditError;
		const bundle = await client.downloadBundle(pluginId, newVersion);
		if (versionMetadata.checksum && bundle.checksum !== versionMetadata.checksum) return {
			success: false,
			error: {
				code: "CHECKSUM_MISMATCH",
				message: "Bundle checksum does not match marketplace record. Download may be corrupted."
			}
		};
		const bundleIdentityError = validateBundleIdentity(bundle, pluginId, newVersion);
		if (bundleIdentityError) return bundleIdentityError;
		const oldBundle = await loadBundleFromR2(storage, pluginId, oldVersion);
		const capabilityChanges = diffCapabilities(oldBundle?.manifest.capabilities ?? [], bundle.manifest.capabilities);
		const hasEscalation = capabilityChanges.added.length > 0;
		const routeVisibilityChanges = diffRouteVisibility(oldBundle?.manifest, bundle.manifest);
		const hasNewPublicRoutes = routeVisibilityChanges.newlyPublic.length > 0;
		const newlyPublicRoutes = routeVisibilityChanges.newlyPublic.toSorted();
		const acknowledgedPublicRoutes = (opts?.acknowledgedPublicRoutes ?? []).toSorted();
		const oldMcpTools = [...oldBundle?.manifest.mcp?.tools ?? []].toSorted((a, b) => a.name.localeCompare(b.name));
		const newMcpTools = [...bundle.manifest.mcp?.tools ?? []].toSorted((a, b) => a.name.localeCompare(b.name));
		const hasMcpChanges = JSON.stringify(oldMcpTools) !== JSON.stringify(newMcpTools);
		const mcpTools = newMcpTools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool);
		const consentDetails = {
			capabilityChanges,
			routeVisibilityChanges: hasNewPublicRoutes ? { newlyPublic: newlyPublicRoutes } : void 0,
			mcpTools: hasMcpChanges ? mcpTools : void 0
		};
		if (hasEscalation && !opts?.confirmCapabilityChanges) return {
			success: false,
			error: {
				code: "CAPABILITY_ESCALATION",
				message: "Plugin update requires new capabilities",
				details: consentDetails
			}
		};
		if (hasNewPublicRoutes && JSON.stringify(acknowledgedPublicRoutes) !== JSON.stringify(newlyPublicRoutes)) return {
			success: false,
			error: {
				code: "ROUTE_VISIBILITY_ESCALATION",
				message: "Plugin update exposes new public (unauthenticated) routes",
				details: consentDetails
			}
		};
		if (hasMcpChanges && !opts?.confirmMcpTools) return {
			success: false,
			error: {
				code: "MCP_TOOL_CONSENT_REQUIRED",
				message: "Plugin update changes its MCP tools",
				details: consentDetails
			}
		};
		await storeBundleInR2(storage, pluginId, newVersion, bundle);
		await stateRepo.upsert(pluginId, newVersion, "active", {
			source: "marketplace",
			marketplaceVersion: newVersion,
			displayName: pluginDetail.name,
			description: pluginDetail.description ?? void 0,
			mcpToolsEnabled: false,
			mcpToolsConsent: null
		});
		await syncDeclaredStorageIndexes(db, [bundle.manifest]);
		return {
			success: true,
			data: {
				pluginId,
				oldVersion,
				newVersion,
				capabilityChanges,
				routeVisibilityChanges: hasNewPublicRoutes ? routeVisibilityChanges : void 0
			}
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		if (err instanceof MarketplaceError) return {
			success: false,
			error: {
				code: err.code ?? "MARKETPLACE_ERROR",
				message: err.message
			}
		};
		console.error("Failed to update marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "UPDATE_FAILED",
				message: "Failed to update plugin"
			}
		};
	}
}
async function handleMarketplaceUninstall(db, storage, pluginId, opts) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `No marketplace plugin found: ${pluginId}`
			}
		};
		const version = existing.marketplaceVersion ?? existing.version;
		await opts?.beforeDelete?.();
		let dataDeleted = false;
		if (opts?.deleteData && !opts.rollbackInstall) try {
			await db.deleteFrom("_plugin_storage").where("plugin_id", "=", pluginId).execute();
			await new OptionsRepository(db).deleteByPrefix(`plugin:${pluginId}:`);
			dataDeleted = true;
		} catch {}
		try {
			await removeAllPluginIndexes(db, pluginId);
		} catch {}
		await stateRepo.delete(pluginId);
		if (storage) await deleteBundleFromR2(storage, pluginId, version);
		return {
			success: true,
			data: {
				pluginId,
				dataDeleted
			}
		};
	} catch (err) {
		console.error("Failed to uninstall marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "UNINSTALL_FAILED",
				message: "Failed to uninstall plugin"
			}
		};
	}
}
async function handleMarketplaceUpdateCheck(db, marketplaceUrl) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		const marketplacePlugins = await new PluginStateRepository(db).getMarketplacePlugins();
		const items = [];
		for (const plugin of marketplacePlugins) try {
			const detail = await client.getPlugin(plugin.pluginId);
			const latest = detail.latestVersion?.version;
			const installed = plugin.marketplaceVersion ?? plugin.version;
			if (!latest) continue;
			const hasUpdate = latest !== installed;
			let capabilityChanges;
			let hasCapabilityChanges = false;
			if (hasUpdate && detail.latestVersion) {
				capabilityChanges = diffCapabilities(detail.capabilities ?? [], detail.latestVersion.capabilities ?? []);
				hasCapabilityChanges = capabilityChanges.added.length > 0 || capabilityChanges.removed.length > 0;
			}
			items.push({
				pluginId: plugin.pluginId,
				installed,
				latest: latest ?? installed,
				hasUpdate,
				hasCapabilityChanges,
				capabilityChanges: hasCapabilityChanges ? capabilityChanges : void 0,
				hasRouteVisibilityChanges: false
			});
		} catch (err) {
			console.warn(`Failed to check updates for ${plugin.pluginId}:`, err);
		}
		return {
			success: true,
			data: { items }
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to check marketplace updates:", err);
		return {
			success: false,
			error: {
				code: "UPDATE_CHECK_FAILED",
				message: "Failed to check for updates"
			}
		};
	}
}
async function handleMarketplaceSearch(marketplaceUrl, query, opts) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.search(query, opts)
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to search marketplace:", err);
		return {
			success: false,
			error: {
				code: "SEARCH_FAILED",
				message: "Failed to search marketplace"
			}
		};
	}
}
async function handleMarketplaceGetPlugin(marketplaceUrl, pluginId) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.getPlugin(pluginId)
		};
	} catch (err) {
		if (err instanceof MarketplaceError && err.status === 404) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to get marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "GET_PLUGIN_FAILED",
				message: "Failed to get plugin details"
			}
		};
	}
}
async function handleThemeSearch(marketplaceUrl, query, opts) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.searchThemes(query, opts)
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to search themes:", err);
		return {
			success: false,
			error: {
				code: "THEME_SEARCH_FAILED",
				message: "Failed to search themes"
			}
		};
	}
}
async function handleThemeGetDetail(marketplaceUrl, themeId) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.getTheme(themeId)
		};
	} catch (err) {
		if (err instanceof MarketplaceError && err.status === 404) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Theme not found: ${themeId}`
			}
		};
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to get marketplace theme:", err);
		return {
			success: false,
			error: {
				code: "GET_THEME_FAILED",
				message: "Failed to get theme details"
			}
		};
	}
}
export { EmDashStorageError as S, storeBundleInR2 as _, getStorageIndexDefinitions as a, getSandboxRouteErrorDetails as b, handleMarketplaceSearch as c, handleMarketplaceUpdateCheck as d, handleThemeGetDetail as f, rollbackPluginUpdate as g, removeAllPluginIndexes as h, generateIndexName as i, handleMarketplaceUninstall as l, loadBundleFromR2 as m, diffCapabilities as n, handleMarketplaceGetPlugin as o, handleThemeSearch as p, diffRouteVisibility as r, handleMarketplaceInstall as s, deleteBundleFromR2 as t, handleMarketplaceUpdate as u, syncDeclaredStorageIndexes as v, withUnavailableReason as x, SandboxUnavailableError as y };
