import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { _ as addAttribute, d as renderTemplate, i as renderComponent, p as renderHead } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import { i as resolveLocale, n as getLocaleDir, t as loadMessages } from "./loadMessages-D2ZSYMIu_CxGvi6bD.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as componentDataByCssVariable, i as $$Font } from "./_astro_assets_Apbw_6vY.mjs";
import "./locales_D0fXeBVw.mjs";
import { PostgresAdapter, sql } from "kysely";
import { ulid } from "ulidx";
import { n as normalizeFocalPoint } from "./focal-point_CmWLDffv.mjs";
// node_modules/@emdash-cms/admin/dist/styles.css?url
var styles_default = "/_astro/styles.D4gUjB15.css";
// node_modules/emdash/src/plugins/conditional-storage.ts
var MAX_KEY_LENGTH = 1024;
var MAX_REVISION_LENGTH = 128;
var MAX_VALUE_BYTES = 1048576;
function assertStorageKey(key, maxLength = MAX_KEY_LENGTH) {
	if (typeof key !== "string" || key.length === 0 || key.length > maxLength) throw new TypeError(`Storage key must be a nonempty string of at most ${maxLength} characters`);
}
function assertStorageRevision(revision) {
	if (typeof revision !== "string" || revision.length === 0 || revision.length > MAX_REVISION_LENGTH) throw new TypeError("Storage revision must be a nonempty string of at most 128 characters");
}
function serializeConditionalValue(value) {
	const serialized = JSON.stringify(value);
	if (serialized === void 0) throw new TypeError("Storage value must be JSON serializable");
	if (new TextEncoder().encode(serialized).byteLength > MAX_VALUE_BYTES) throw new TypeError("Conditional storage value must not exceed 1 MiB of JSON");
	return serialized;
}
// node_modules/emdash/src/database/repositories/options.ts
function escapeLike$1(value) {
	return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}
/**
* Options repository for key-value settings storage
*
* Used for site settings, plugin configuration, and other arbitrary key-value data.
* Values are stored as JSON for flexibility.
*/
var OptionsRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Get an option value
	*/
	async get(name) {
		const row = await this.db.selectFrom("options").select("value").where("name", "=", name).executeTakeFirst();
		if (!row) return null;
		return JSON.parse(row.value);
	}
	/**
	* Get an option value with a default
	*/
	async getOrDefault(name, defaultValue) {
		return await this.get(name) ?? defaultValue;
	}
	/**
	* Set an option value (creates or updates)
	*/
	async set(name, value) {
		await this.setVersioned(name, value);
	}
	async setVersioned(name, value) {
		const revision = crypto.randomUUID();
		const row = {
			name,
			value: JSON.stringify(value),
			revision
		};
		await this.db.insertInto("options").values(row).onConflict((oc) => oc.column("name").doUpdateSet({
			value: row.value,
			revision: row.revision
		})).execute();
		return revision;
	}
	/**
	* Set an option value only if no row with that name exists. Atomic at the
	* database level via INSERT ... ON CONFLICT DO NOTHING, so concurrent
	* callers can't race past the check.
	*
	* Returns true when the row was inserted, false when a row already
	* existed (regardless of its value — even an empty string or null).
	*/
	async setIfAbsent(name, value) {
		const row = {
			name,
			value: JSON.stringify(value),
			revision: crypto.randomUUID()
		};
		return ((await this.db.insertInto("options").values(row).onConflict((oc) => oc.column("name").doNothing()).executeTakeFirst()).numInsertedOrUpdatedRows ?? 0n) > 0n;
	}
	async getVersioned(name) {
		assertStorageKey(name, 2048);
		const row = await this.db.selectFrom("options").select(["value", "revision"]).where("name", "=", name).executeTakeFirst();
		if (!row) return null;
		return {
			value: JSON.parse(row.value),
			revision: row.revision
		};
	}
	async compareAndSet(name, expectedRevision, value) {
		assertStorageKey(name, 2048);
		if (expectedRevision !== null) assertStorageRevision(expectedRevision);
		const serialized = serializeConditionalValue(value);
		const revision = crypto.randomUUID();
		const row = expectedRevision === null ? await this.db.insertInto("options").values({
			name,
			value: serialized,
			revision
		}).onConflict((oc) => oc.column("name").doNothing()).returning("revision").executeTakeFirst() : await this.db.updateTable("options").set({
			value: serialized,
			revision
		}).where("name", "=", name).where("revision", "=", expectedRevision).returning("revision").executeTakeFirst();
		return row ? {
			applied: true,
			revision: row.revision
		} : { applied: false };
	}
	async compareAndDelete(name, expectedRevision) {
		assertStorageKey(name, 2048);
		assertStorageRevision(expectedRevision);
		return { applied: await this.db.deleteFrom("options").where("name", "=", name).where("revision", "=", expectedRevision).returning("name").executeTakeFirst() !== void 0 };
	}
	/**
	* Delete an option
	*/
	async delete(name) {
		return ((await this.db.deleteFrom("options").where("name", "=", name).executeTakeFirst()).numDeletedRows ?? 0) > 0;
	}
	/**
	* Delete multiple options in one statement.
	*/
	async deleteMany(names) {
		if (names.length === 0) return 0;
		const result = await this.db.deleteFrom("options").where("name", "in", names).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Check if an option exists
	*/
	async exists(name) {
		return !!await this.db.selectFrom("options").select("name").where("name", "=", name).executeTakeFirst();
	}
	/**
	* Get multiple options at once
	*/
	async getMany(names) {
		if (names.length === 0) return /* @__PURE__ */ new Map();
		const rows = await this.db.selectFrom("options").select(["name", "value"]).where("name", "in", names).execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, JSON.parse(row.value));
		return result;
	}
	/**
	* Set multiple options at once
	*/
	async setMany(options) {
		const entries = Object.entries(options);
		if (entries.length === 0) return;
		for (const [name, value] of entries) await this.set(name, value);
	}
	/**
	* Get all options (use sparingly)
	*/
	async getAll() {
		const rows = await this.db.selectFrom("options").select(["name", "value"]).execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, JSON.parse(row.value));
		return result;
	}
	/**
	* Get all options matching a prefix
	*/
	async getByPrefix(prefix, options = {}) {
		const pattern = `${escapeLike$1(prefix)}%`;
		let query = this.db.selectFrom("options").select(["name", "value"]).where(sql`name LIKE ${pattern} ESCAPE '\\'`).orderBy("name", "asc");
		if (options.limit !== void 0) query = query.limit(Math.max(0, options.limit));
		const rows = await query.execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, JSON.parse(row.value));
		return result;
	}
	async getVersionedByPrefix(prefix, options = {}) {
		const pattern = `${escapeLike$1(prefix)}%`;
		let query = this.db.selectFrom("options").select([
			"name",
			"value",
			"revision"
		]).where(sql`name LIKE ${pattern} ESCAPE '\\'`).orderBy("name", "asc");
		if (options.limit !== void 0) query = query.limit(Math.max(0, options.limit));
		const rows = await query.execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, {
			value: JSON.parse(row.value),
			revision: row.revision
		});
		return result;
	}
	async countByPrefix(prefix) {
		const pattern = `${escapeLike$1(prefix)}%`;
		const row = await this.db.selectFrom("options").select((eb) => eb.fn.countAll().as("count")).where(sql`name LIKE ${pattern} ESCAPE '\\'`).executeTakeFirst();
		return Number(row?.count ?? 0);
	}
	/**
	* Delete all options matching a prefix
	*/
	async deleteByPrefix(prefix) {
		const pattern = `${escapeLike$1(prefix)}%`;
		const result = await this.db.deleteFrom("options").where(sql`name LIKE ${pattern} ESCAPE '\\'`).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
};
// node_modules/emdash/src/utils/base64.ts
/**
* Base64 encoding/decoding utilities.
*
* Uses native Uint8Array.prototype.toBase64 / Uint8Array.fromBase64 when
* available (workerd, Node 26+, modern browsers), falls back to btoa/atob.
*
* All base64url encoding uses the { alphabet: "base64url" } option natively
* or manual character replacement as fallback.
*
* Delete the fallback paths when the minimum Node version supports these
* methods natively.
*/
var hasNative = typeof Uint8Array.prototype.toBase64 === "function" && typeof Uint8Array.fromBase64 === "function";
/** Encode a UTF-8 string as standard base64. */
function encodeBase64(str) {
	const bytes = new TextEncoder().encode(str);
	if (hasNative) return bytes.toBase64();
	let binary = "";
	for (const b of bytes) binary += String.fromCharCode(b);
	return btoa(binary);
}
/** Decode a standard base64 string to a UTF-8 string. */
function decodeBase64(base64) {
	return new TextDecoder().decode(decodeBase64Bytes(base64));
}
/** Decode a standard base64 string to raw bytes (for binary payloads). */
function decodeBase64Bytes(base64) {
	if (hasNative) return Uint8Array.fromBase64(base64);
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
// node_modules/emdash/src/utils/init-lock.ts
function createInitLock() {
	return {
		ownerStartedAt: null,
		generation: 0
	};
}
// node_modules/emdash/src/utils/single-flight-cache.ts
/**
* Global-scope async value cache with single-flight and poison-immunity.
*
* Built for the "compute once for the lifetime of the JS global scope, read
* on every request" caches (site settings, search-health verification, ...).
* That global scope is the process on Node and the isolate on Cloudflare
* Workers — this helper is platform-neutral; the hazard it defends against is
* specific to workerd but the cache itself is not.
*
* These caches must coalesce concurrent cold reads into one query — but the
* obvious way to do that, caching the in-flight *promise* on a global and
* awaiting it from later requests, is unsafe on workerd: if the request that
* created the promise is cancelled mid-await (client disconnect, context
* teardown), its continuation never runs, so the promise neither resolves nor
* rejects. Every later request that awaits that shared promise then hangs
* until the isolate is evicted (observed as 524s at the 100s wall, near-zero
* CPU). A `.catch`/`.finally` that clears the cache doesn't help — a cancelled
* request settles neither way.
*
* This cache stores the resolved *value* (not a promise) and coalesces via
* `initWithLock`: one request becomes the owner and runs `fetch`, everyone
* else polls for the published value and never awaits the owner's promise.
* A cancelled owner can therefore never strand a waiter — the worst case is
* the lock looks held until `deadlineMs`, then the next caller reclaims. The
* owner's `fetch` is also anchored (waitUntil) so a cancelled originator's
* query still completes and populates the cache, and bounded by
* `ownerTimeoutMs` so a genuinely stuck fetch reclaims instead of hanging.
*
* Invalidation bumps `version`; reads compare against the version captured at
* call time and refetch on mismatch.
*/
function createSingleFlightCache() {
	return {
		value: null,
		hasValue: false,
		version: 0,
		valueVersion: -1,
		lock: createInitLock()
	};
}
// node_modules/emdash/src/utils/chunks.ts
/**
* Split an array into chunks of at most `size` elements.
*
* Used to keep SQL `IN (?, ?, …)` clauses within Cloudflare D1's
* bound-parameter limit (~100 per statement).
*/
function chunks(arr, size) {
	if (arr.length === 0) return [];
	const result = [];
	for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
	return result;
}
// node_modules/emdash/src/database/dialect-helpers.ts
/**
* Detect dialect type from a Kysely instance via the adapter class.
*/
function detectDialect(db) {
	const adapter = db.getExecutor().adapter;
	if (adapter instanceof PostgresAdapter || adapter.constructor.name === "PostgresAdapter") return "postgres";
	return "sqlite";
}
function isPostgres(db) {
	return detectDialect(db) === "postgres";
}
/** Literal substring position, avoiding D1's 50-byte LIKE pattern limit. */
function textPosition(db, value, term) {
	return isPostgres(db) ? sql`strpos(${value}, ${term})` : sql`instr(${value}, ${term})`;
}
// node_modules/emdash/src/database/json-recordset.ts
function jsonTextValues(db, values) {
	const payload = JSON.stringify([...new Set(values)]);
	return isPostgres(db) ? sql`SELECT value::text AS value FROM jsonb_array_elements_text(${payload}::jsonb) AS value` : sql`SELECT value AS value FROM json_each(${payload})`;
}
/** Encode a cursor from order value + id, optionally carrying the ordered field values. */
function encodeCursor(orderValue, id, sortValues) {
	const payload = {
		orderValue,
		id
	};
	if (sortValues !== void 0 && sortValues.length > 0) payload.sortValues = sortValues;
	return encodeBase64(JSON.stringify(payload));
}
/**
* Thrown when a pagination cursor cannot be decoded.
*
* Repository callers should let this propagate; handler catch blocks
* map it to a structured `INVALID_CURSOR` error so client pagination
* bugs surface immediately rather than silently re-fetching the first
* page.
*/
var InvalidCursorError = class extends Error {
	constructor(cursor) {
		const display = cursor.length > 50 ? `${cursor.slice(0, 47)}...` : cursor;
		super(`Invalid pagination cursor: ${display}`);
		this.name = "InvalidCursorError";
	}
};
function isSortFieldBoundary(item) {
	if (item === null || typeof item !== "object") return false;
	const candidate = item;
	if (candidate.missing !== void 0 && typeof candidate.missing !== "boolean") return false;
	return true;
}
function normalizeSortBoundary(item) {
	if (isSortFieldBoundary(item)) return {
		value: item.value,
		missing: item.missing
	};
	return {
		value: item,
		missing: false
	};
}
/**
* Decode a cursor to order value + id.
*
* Throws `InvalidCursorError` if the cursor is empty, not valid base64,
* not valid JSON, or doesn't contain string `orderValue` and `id` fields.
*/
function decodeCursor(cursor) {
	if (!cursor) throw new InvalidCursorError(cursor);
	if (cursor.length > 4096) throw new InvalidCursorError(cursor);
	let parsed;
	try {
		parsed = JSON.parse(decodeBase64(cursor));
	} catch {
		throw new InvalidCursorError(cursor);
	}
	if (parsed === null || typeof parsed !== "object") throw new InvalidCursorError(cursor);
	const candidate = parsed;
	if (typeof candidate.orderValue !== "string" || typeof candidate.id !== "string") throw new InvalidCursorError(cursor);
	let sortValues;
	if (candidate.sortValues !== void 0) {
		if (!Array.isArray(candidate.sortValues)) throw new InvalidCursorError(cursor);
		sortValues = candidate.sortValues.map(normalizeSortBoundary);
	}
	return {
		orderValue: candidate.orderValue,
		id: candidate.id,
		sortValues
	};
}
var MAX_JSON_BIND_BYTES = 19e5;
function chunkJsonRows(rows) {
	const batches = [];
	let batch = [];
	let batchBytes = 2;
	for (const row of rows) {
		const rowBytes = new TextEncoder().encode(JSON.stringify(row)).byteLength + (batch.length > 0 ? 1 : 0);
		if (batch.length > 0 && batchBytes + rowBytes > MAX_JSON_BIND_BYTES) {
			batches.push(batch);
			batch = [];
			batchBytes = 2;
		}
		batch.push(row);
		batchBytes += rowBytes;
	}
	if (batch.length > 0) batches.push(batch);
	return batches;
}
sql`(
	s.source_variant = 'draft_overlay'
	OR (
		s.source_variant = 'columns'
		AND (
			s.content_status = 'published'
			OR NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_sources AS overlay
				WHERE overlay.source_type = 'content'
					AND overlay.collection_slug = s.collection_slug
					AND overlay.content_id = s.content_id
					AND overlay.source_variant = 'draft_overlay'
					AND ${contentSourceMatchesActiveCollection("overlay", "s.collection_id")}
			)
		)
	)
)`;
function contentSourceMatchesActiveCollection(source, currentCollectionId) {
	return sql`(
		NOT EXISTS (
			SELECT 1
			FROM _emdash_media_usage_activation AS activation
			WHERE activation.task_key = 'incremental_capture'
				AND activation.state = 'active'
		)
		OR (
			${sql.ref(`${source}.collection_id`)} = ${sql.ref(currentCollectionId)}
			AND ${sql.ref(`${source}.identity_version`)} = 1
		)
	)`;
}
// node_modules/emdash/src/database/repositories/media.ts
/** Escape LIKE wildcard characters and the escape char itself in user-supplied values */
function escapeLike(value) {
	return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}
/**
* Normalize a mimeType filter (string or array) into a clean string[].
* Entries that are empty strings are dropped.
*/
function normalizeMimeFilter(input) {
	if (!input) return [];
	return (Array.isArray(input) ? input : [input]).filter((entry) => typeof entry === "string" && entry.length > 0).map((entry) => entry.endsWith("/") ? entry.toLowerCase() : entry.split(";")[0].trim().toLowerCase());
}
function normalizeListLimit(limit) {
	return Math.min(Math.max(typeof limit === "number" && !Number.isNaN(limit) ? Math.trunc(limit) : 50, 1), 100);
}
/**
* Build a WHERE clause that matches `mime_type` against any of the given
* filter entries — exact equality for full MIMEs, LIKE prefix for entries
* ending in "/".
*/
function mimeMatchExpr(eb, filters) {
	return eb.or(filters.map((entry) => entry.endsWith("/") ? sql`mime_type LIKE ${`${escapeLike(entry)}%`} ESCAPE '\\'` : eb("mime_type", "=", entry)));
}
var UPLOAD_ATTEMPT_CLEANUP_AGE_MS = 36e5;
var UPLOAD_ATTEMPT_CLEANUP_BATCH_SIZE = 100;
/**
* Media repository for database operations
*/
var MediaRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Create a new media item
	*/
	async create(input) {
		const id = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const row = {
			id,
			filename: input.filename,
			mime_type: input.mimeType,
			size: input.size ?? null,
			width: input.width ?? null,
			height: input.height ?? null,
			focal_x: null,
			focal_y: null,
			alt: input.alt ?? null,
			caption: input.caption ?? null,
			storage_key: input.storageKey,
			content_hash: input.contentHash ?? null,
			blurhash: input.blurhash ?? null,
			dominant_color: input.dominantColor ?? null,
			status: input.status ?? "ready",
			created_at: now,
			author_id: input.authorId ?? null,
			folder_id: input.folderId ?? null
		};
		await this.db.insertInto("media").values(row).execute();
		return this.rowToItem(row);
	}
	/**
	* Create a pending media item (for signed URL upload flow)
	*/
	async createPending(input) {
		return this.create({
			...input,
			status: "pending"
		});
	}
	async createUploadAttempt(mediaId, storageKey) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.db.insertInto("_emdash_media_upload_attempts").values({
			media_id: mediaId,
			storage_key: storageKey,
			status: "active",
			created_at: now,
			updated_at: now
		}).execute();
	}
	/**
	* Register a stored object for cleanup before its media row is removed,
	* so a failed storage delete is retried by the cleanup sweep instead of
	* leaving the object unreferenced and unreachable.
	*/
	async trackStorageKeyForCleanup(mediaId, storageKey) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.db.insertInto("_emdash_media_upload_attempts").values({
			media_id: mediaId,
			storage_key: storageKey,
			status: "cleanup",
			created_at: now,
			updated_at: now
		}).onConflict((oc) => oc.column("storage_key").doUpdateSet({
			status: "cleanup",
			updated_at: now
		})).execute();
	}
	async hasUploadAttempt(storageKey) {
		return await this.db.selectFrom("_emdash_media_upload_attempts").select("storage_key").where("storage_key", "=", storageKey).executeTakeFirst() !== void 0;
	}
	async claimUploadAttemptForCleanup(storageKey) {
		const result = await this.db.updateTable("_emdash_media_upload_attempts").set({
			status: "cleanup",
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).where("storage_key", "=", storageKey).where((eb) => eb.not(eb.exists(eb.selectFrom("media").select("media.id").whereRef("media.storage_key", "=", "_emdash_media_upload_attempts.storage_key")))).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async deleteUploadAttempt(storageKey) {
		await this.db.deleteFrom("_emdash_media_upload_attempts").where("storage_key", "=", storageKey).execute();
	}
	async deferUploadAttemptCleanup(storageKey) {
		await this.db.updateTable("_emdash_media_upload_attempts").set({ updated_at: (/* @__PURE__ */ new Date()).toISOString() }).where("storage_key", "=", storageKey).execute();
	}
	async deleteCompletedUploadAttempts() {
		const result = await this.db.deleteFrom("_emdash_media_upload_attempts").where("status", "=", "active").where((eb) => eb.exists(eb.selectFrom("media").select("media.id").whereRef("media.id", "=", "_emdash_media_upload_attempts.media_id").whereRef("media.storage_key", "=", "_emdash_media_upload_attempts.storage_key").where("media.status", "=", "ready"))).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	async findUploadAttemptsForCleanup(maxAgeMs = UPLOAD_ATTEMPT_CLEANUP_AGE_MS, limit = UPLOAD_ATTEMPT_CLEANUP_BATCH_SIZE) {
		const cutoff = new Date(Date.now() - maxAgeMs).toISOString();
		return (await this.db.selectFrom("_emdash_media_upload_attempts").select("storage_key").where((eb) => eb.or([eb("status", "=", "cleanup"), eb("created_at", "<", cutoff)])).where((eb) => eb.not(eb.exists(eb.selectFrom("media").select("media.id").whereRef("media.storage_key", "=", "_emdash_media_upload_attempts.storage_key")))).orderBy("updated_at", "asc").limit(limit).execute()).map((row) => row.storage_key);
	}
	async publishPendingStorageKey(id, expectedStorageKey, storageKey, contentHash) {
		const result = await this.db.updateTable("media").set({
			storage_key: storageKey,
			...contentHash !== void 0 ? { content_hash: contentHash } : {}
		}).where("id", "=", id).where("status", "=", "pending").where("storage_key", "=", expectedStorageKey).where((eb) => eb.exists(eb.selectFrom("_emdash_media_upload_attempts").select("storage_key").where("media_id", "=", id).where("storage_key", "=", storageKey).where("status", "=", "active"))).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	/**
	* Confirm upload (mark as ready)
	*/
	async confirmUpload(id, metadata, expectedStorageKey) {
		const updates = { status: "ready" };
		if (metadata?.width !== void 0) updates.width = metadata.width;
		if (metadata?.height !== void 0) updates.height = metadata.height;
		if (metadata?.size !== void 0) updates.size = metadata.size;
		if (metadata?.blurhash !== void 0) updates.blurhash = metadata.blurhash;
		if (metadata?.dominantColor !== void 0) updates.dominant_color = metadata.dominantColor;
		if (metadata?.contentHash !== void 0) updates.content_hash = metadata.contentHash;
		let query = this.db.updateTable("media").set(updates).where("id", "=", id).where("status", "=", "pending");
		if (expectedStorageKey !== void 0) query = query.where("storage_key", "=", expectedStorageKey);
		const row = await query.returningAll().executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Mark upload as failed
	*/
	async markFailed(id, expectedStorageKey) {
		let query = this.db.updateTable("media").set({ status: "failed" }).where("id", "=", id);
		if (expectedStorageKey !== void 0) query = query.where("status", "=", "pending").where("storage_key", "=", expectedStorageKey);
		const row = await query.returningAll().executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Find the pending media row minted for a signed upload URL.
	*/
	async findPendingByStorageKey(storageKey) {
		const row = await this.db.selectFrom("media").selectAll().where("storage_key", "=", storageKey).where("status", "=", "pending").executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Find media by ID
	*/
	async findById(id) {
		const row = await this.db.selectFrom("media").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Map each storage key to the id of its media item, in one query per JSON
	* bind's worth of keys. Unknown keys are left out.
	*/
	async findIdsByStorageKeys(storageKeys) {
		const ids = /* @__PURE__ */ new Map();
		for (const batch of chunkJsonRows(storageKeys)) {
			const result = await sql`
				WITH requested AS (${jsonTextValues(this.db, batch)})
				SELECT media.id, media.storage_key
				FROM media
				INNER JOIN requested ON requested.value = media.storage_key
				ORDER BY media.id
			`.execute(this.db);
			for (const row of result.rows) if (!ids.has(row.storage_key)) ids.set(row.storage_key, row.id);
		}
		return ids;
	}
	/**
	* Find the original upload filename for a storage key.
	*
	* Used by the public media file route to name the download after the file
	* the editor uploaded rather than after its storage key. Selects the single
	* column it needs: this runs on every unauthenticated download.
	*/
	async findFilenameByStorageKey(storageKey) {
		return (await this.db.selectFrom("media").select("filename").where("storage_key", "=", storageKey).executeTakeFirst())?.filename ?? null;
	}
	/**
	* Find media by filename
	* Useful for idempotent imports
	*/
	async findByFilename(filename) {
		const row = await this.db.selectFrom("media").selectAll().where("filename", "=", filename).executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	async findAvailableFilename(filename) {
		const exists = async (candidate) => Boolean(await this.db.selectFrom("media").select("id").where(sql`lower(filename)`, "=", candidate.toLowerCase()).executeTakeFirst());
		if (!await exists(filename)) return filename;
		const extensionIndex = filename.lastIndexOf(".");
		const hasExtension = extensionIndex > 0;
		const extension = hasExtension ? filename.slice(extensionIndex) : "";
		const stem = hasExtension ? filename.slice(0, extensionIndex) : filename;
		let copyNumber = 2;
		let candidate = `${stem}-${copyNumber}${extension}`;
		while (await exists(candidate)) {
			copyNumber += 1;
			candidate = `${stem}-${copyNumber}${extension}`;
		}
		return candidate;
	}
	/**
	* Find media by content hash
	* Used for deduplication - same content = same hash
	*/
	async findByContentHash(contentHash) {
		const row = await this.db.selectFrom("media").selectAll().where("content_hash", "=", contentHash).where("status", "=", "ready").executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Find many media items with cursor pagination
	*
	* Uses keyset pagination (cursor-based) for consistent results.
	* The cursor encodes the created_at and id of the last item.
	*/
	async findMany(options = {}) {
		const limit = normalizeListLimit(options.limit);
		let query = this.applyListFilters(this.db.selectFrom("media"), options).selectAll().orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1);
		if (options.cursor) {
			const { orderValue: createdAt, id: cursorId } = decodeCursor(options.cursor);
			query = query.where((eb) => eb.or([eb("created_at", "<", createdAt), eb.and([eb("created_at", "=", createdAt), eb("id", "<", cursorId)])]));
		}
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit).map((row) => this.rowToItem(row));
		let nextCursor;
		if (hasMore && items.length > 0) {
			const lastItem = items.at(-1);
			nextCursor = encodeCursor(lastItem.createdAt, lastItem.id);
		}
		return {
			items,
			nextCursor
		};
	}
	async findPage(options) {
		const limit = normalizeListLimit(options.limit);
		const offset = (options.page - 1) * limit;
		const filtered = this.applyListFilters(this.db.selectFrom("media"), options);
		const rows = await filtered.selectAll().orderBy("created_at", "desc").orderBy("id", "desc").limit(limit).offset(offset).execute();
		const count = await filtered.select((eb) => eb.fn.count("id").as("count")).executeTakeFirst();
		return {
			items: rows.map((row) => this.rowToItem(row)),
			totalCount: Number(count?.count ?? 0)
		};
	}
	/**
	* Update media metadata
	*/
	async update(id, input) {
		if (!await this.findById(id)) return null;
		const updates = {};
		if (input.alt !== void 0) updates.alt = input.alt;
		if (input.caption !== void 0) updates.caption = input.caption;
		if (input.width !== void 0) updates.width = input.width;
		if (input.height !== void 0) updates.height = input.height;
		if (input.folderId !== void 0) updates.folder_id = input.folderId;
		if (input.focalX !== void 0 && input.focalY !== void 0) {
			updates.focal_x = input.focalX;
			updates.focal_y = input.focalY;
		}
		if (Object.keys(updates).length > 0) await this.db.updateTable("media").set(updates).where("id", "=", id).execute();
		return this.findById(id);
	}
	async updateReadyMetadata(id, input) {
		const updates = {};
		if (input.alt !== void 0) updates.alt = input.alt;
		if (input.caption !== void 0) updates.caption = input.caption;
		if (input.focalX !== void 0 && input.focalY !== void 0) {
			updates.focal_x = input.focalX;
			updates.focal_y = input.focalY;
		}
		if (Object.keys(updates).length === 0) throw new TypeError("Media metadata update requires at least one field");
		const row = await this.db.updateTable("media").set(updates).where("id", "=", id).where("status", "=", "ready").returningAll().executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	async replaceReadyFile(id, expectedStorageKey, input) {
		const row = await this.db.updateTable("media").set({
			size: input.size,
			width: input.width,
			height: input.height,
			content_hash: input.contentHash,
			blurhash: null,
			dominant_color: null,
			focal_x: null,
			focal_y: null
		}).where("id", "=", id).where("status", "=", "ready").where("storage_key", "=", expectedStorageKey).returningAll().executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Delete media item
	*/
	async deleteWithStorageKey(id) {
		const deleted = await this.db.deleteFrom("media").where("id", "=", id).returning("storage_key").executeTakeFirst();
		if (deleted) return deleted.storage_key;
		return null;
	}
	async isStorageKeyReferenced(storageKey) {
		return await this.db.selectFrom("media").select("id").where("storage_key", "=", storageKey).executeTakeFirst() !== void 0;
	}
	async delete(id) {
		return await this.deleteWithStorageKey(id) !== null;
	}
	/**
	* Count media items
	*/
	async count(mimeType) {
		const filters = normalizeMimeFilter(mimeType);
		let query = this.db.selectFrom("media").select((eb) => eb.fn.count("id").as("count"));
		if (filters.length > 0) query = query.where((eb) => mimeMatchExpr(eb, filters));
		const result = await query.executeTakeFirst();
		return Number(result?.count || 0);
	}
	applyListFilters(query, options) {
		const mimeFilters = normalizeMimeFilter(options.mimeType);
		if (mimeFilters.length > 0) query = query.where((eb) => mimeMatchExpr(eb, mimeFilters));
		let term = options.q?.trim() ?? "";
		if (term.includes("/")) {
			const queryIndex = term.indexOf("?");
			if (queryIndex !== -1) term = term.slice(0, queryIndex);
			const fragmentIndex = term.indexOf("#");
			if (fragmentIndex !== -1) term = term.slice(0, fragmentIndex);
			term = term.slice(term.lastIndexOf("/") + 1).trim();
		}
		if (term) query = query.where((eb) => eb.or([
			"filename",
			"storage_key",
			"id"
		].map((column) => eb(textPosition(this.db, sql`lower(${sql.ref(column)})`, sql`lower(${term})`), ">", 0))));
		if (options.status !== "all") query = query.where("status", "=", options.status ?? "ready");
		if (options.folderId === null) query = query.where("folder_id", "is", null);
		else if (options.folderId !== void 0) query = query.where("folder_id", "=", options.folderId);
		return query;
	}
	/**
	* Delete pending uploads older than the given age.
	* Pending uploads that were never confirmed indicate abandoned upload flows.
	*
	* Returns the storage keys of deleted rows so callers can remove the
	* corresponding files from object storage.
	*/
	async cleanupPendingUploads(maxAgeMs = 36e5) {
		const cutoff = new Date(Date.now() - maxAgeMs).toISOString();
		const keys = (await this.db.deleteFrom("media").where("status", "=", "pending").where("created_at", "<", cutoff).returning("storage_key").execute()).map((r) => r.storage_key);
		if (keys.length === 0) return keys;
		const stillReferenced = /* @__PURE__ */ new Set();
		for (const batch of chunks(keys, 50)) {
			const refs = await this.db.selectFrom("media").select("storage_key").where("storage_key", "in", batch).execute();
			for (const ref of refs) stillReferenced.add(ref.storage_key);
		}
		return keys.filter((key) => !stillReferenced.has(key));
	}
	/**
	* Convert database row to MediaItem
	*/
	rowToItem(row) {
		const focalPoint = normalizeFocalPoint(row.focal_x, row.focal_y);
		return {
			id: row.id,
			filename: row.filename,
			mimeType: row.mime_type,
			size: row.size,
			width: row.width,
			height: row.height,
			focalX: focalPoint?.focalX ?? null,
			focalY: focalPoint?.focalY ?? null,
			alt: row.alt,
			caption: row.caption,
			storageKey: row.storage_key,
			contentHash: row.content_hash,
			blurhash: row.blurhash,
			dominantColor: row.dominant_color,
			status: row.status,
			createdAt: row.created_at,
			authorId: row.author_id,
			folderId: row.folder_id
		};
	}
};
// node_modules/emdash/src/settings/version.ts
/** Returns the canonical JSON representation of a site-settings revision fingerprint. */
function normalizeSiteSettingsVersion(input) {
	const decoded = JSON.parse(input);
	if (!Array.isArray(decoded)) throw new Error("Invalid site settings version");
	const entries = [];
	for (const entry of decoded) {
		if (!Array.isArray(entry)) throw new Error("Invalid site settings version entry");
		const name = entry[0];
		const revision = entry[1];
		if (typeof name !== "string" || typeof revision !== "string") throw new Error("Invalid site settings version entry");
		entries.push([name, revision]);
	}
	return JSON.stringify(entries.toSorted(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
}
// node_modules/emdash/src/settings/index.ts
/** Prefix for site settings in the options table */
var SETTINGS_PREFIX = "site:";
var SITE_SETTINGS_CACHE_KEY = Symbol.for("emdash:site-settings:swr");
var g = globalThis;
g[SITE_SETTINGS_CACHE_KEY] ?? (() => {
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
// node_modules/emdash/src/astro/routes/admin.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Admin,
	file: () => $$file,
	prerender: () => false,
	url: () => void 0
});
createAstro("https://astro.build");
var $$Admin = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Admin;
	const resolvedLocale = resolveLocale(Astro.request);
	const resolvedDir = getLocaleDir(resolvedLocale);
	const messages = await loadMessages(resolvedLocale);
	const adminConfig = Astro.locals.emdash?.config?.admin;
	const pageTitle = adminConfig?.siteName ? `${adminConfig.siteName} Admin` : "EmDash Admin";
	Astro.response.headers.set("Cache-Control", "private, no-store");
	const emdash = Astro.locals.emdash;
	let siteFavicon;
	let siteFaviconType;
	if (!adminConfig?.favicon && emdash?.db) try {
		const settings = await getSiteSettingsWithDb(emdash.db, emdash.storage ?? null);
		siteFavicon = settings.favicon?.url ?? void 0;
		siteFaviconType = settings.favicon?.contentType ?? void 0;
	} catch {}
	const favicon = adminConfig?.favicon ?? siteFavicon;
	const faviconType = adminConfig?.favicon ? void 0 : siteFaviconType;
	return renderTemplate`<html${addAttribute(resolvedLocale, "lang")}${addAttribute(resolvedDir, "dir")} data-theme="classic" data-astro-cid-u6fdjxxc><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script>
			(() => {
				let preference = "system";

				try {
					const storedPreference = localStorage.getItem("emdash-theme");
					if (storedPreference === "light" || storedPreference === "dark") {
						preference = storedPreference;
					}
				} catch {
					// Storage can be unavailable in privacy-restricted contexts. Use the system theme.
				}

				const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
				const mode =
					preference === "dark" || (preference === "system" && prefersDark) ? "dark" : "light";
				document.documentElement.setAttribute("data-mode", mode);
			})();
		<\/script><link rel="stylesheet"${addAttribute(styles_default, "href")}>${componentDataByCssVariable.has("--font-emdash") ? renderTemplate`${renderComponent($$result, "Font", $$Font, {
		"cssVariable": "--font-emdash",
		"data-astro-cid-u6fdjxxc": true
	})}` : null}${favicon ? renderTemplate`<link rel="icon"${addAttribute(favicon, "href")}${addAttribute(faviconType, "type")}>` : renderTemplate`<link rel="icon" href="data:image/svg+xml,&lt;svg width='75' height='75' viewBox='0 0 75 75' fill='none' xmlns='http://www.w3.org/2000/svg'&gt; &lt;g clip-path='url(%23clip0_50_99)'&gt; &lt;rect x='3' y='3' width='69' height='69' rx='10.518' stroke='url(%23paint0_linear_50_99)' stroke-width='6'/&gt; &lt;rect x='18' y='34' width='39.3661' height='6.56101' fill='url(%23paint1_linear_50_99)'/&gt; &lt;/g&gt; &lt;defs&gt; &lt;linearGradient id='paint0_linear_50_99' x1='-42.9996' y1='124' x2='92.4233' y2='-41.7456' gradientUnits='userSpaceOnUse'&gt; &lt;stop stop-color='%230F006B'/&gt; &lt;stop offset='0.0833333' stop-color='%23281A81'/&gt; &lt;stop offset='0.166667' stop-color='%235D0C83'/&gt; &lt;stop offset='0.25' stop-color='%23911475'/&gt; &lt;stop offset='0.333333' stop-color='%23CE2F55'/&gt; &lt;stop offset='0.416667' stop-color='%23FF6633'/&gt; &lt;stop offset='0.5' stop-color='%23F6821F'/&gt; &lt;stop offset='0.583333' stop-color='%23FBAD41'/&gt; &lt;stop offset='0.666667' stop-color='%23FFCD89'/&gt; &lt;stop offset='0.75' stop-color='%23FFE9CB'/&gt; &lt;stop offset='0.833333' stop-color='%23FFF7EC'/&gt; &lt;stop offset='0.916667' stop-color='%23FFF8EE'/&gt; &lt;stop offset='1' stop-color='white'/&gt; &lt;/linearGradient&gt; &lt;linearGradient id='paint1_linear_50_99' x1='91.4992' y1='27.4982' x2='28.1217' y2='54.1775' gradientUnits='userSpaceOnUse'&gt; &lt;stop stop-color='white'/&gt; &lt;stop offset='0.129253' stop-color='%23FFF8EE'/&gt; &lt;stop offset='0.617058' stop-color='%23FBAD41'/&gt; &lt;stop offset='0.848019' stop-color='%23F6821F'/&gt; &lt;stop offset='1' stop-color='%23FF6633'/&gt; &lt;/linearGradient&gt; &lt;clipPath id='clip0_50_99'&gt; &lt;rect width='75' height='75' fill='white'/&gt; &lt;/clipPath&gt; &lt;/defs&gt; &lt;/svg&gt;">`}<title>${pageTitle}</title>${renderHead($$result)}</head><body class="isolate" data-astro-cid-u6fdjxxc><div id="admin-root" class="min-h-screen" data-astro-cid-u6fdjxxc><div id="emdash-boot-loader" data-astro-cid-u6fdjxxc><div class="loader-inner" data-astro-cid-u6fdjxxc><div class="spinner" data-astro-cid-u6fdjxxc></div><p data-astro-cid-u6fdjxxc>${adminConfig?.siteName ? `Loading ${adminConfig.siteName}...` : "Loading EmDash..."}</p></div></div>${renderComponent($$result, "AdminWrapper", null, {
		"client:only": "react",
		"locale": resolvedLocale,
		"messages": messages,
		"adminBranding": {
			logo: adminConfig?.logo,
			siteName: adminConfig?.siteName
		},
		"data-astro-cid-u6fdjxxc": true,
		"client:component-hydration": "only",
		"client:component-path": "emdash/internal/routes/PluginRegistry",
		"client:component-export": "default"
	})}</div></body></html>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/astro/routes/admin.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/astro/routes/admin.astro";
// \0virtual:astro:page:node_modules/emdash/src/astro/routes/admin@_@astro
var page = () => admin_exports;
export { page };
