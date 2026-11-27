import { w as validateIdentifier } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { d as normalizeContentDatetimes, f as normalizeDatetime, u as DatetimeNormalizationError } from "./runner-Nv0yWP-G_mZbAgbBU.mjs";
import { t as chunks } from "./chunks-CvgCLYip_BPNjBngy.mjs";
import { u as isStoragelessFieldRow } from "./types-BmBK2cqf_DwQUyWfv.mjs";
import { r as requestCached } from "./request-cache-BYMs-BGX_Ol4MyTL8.mjs";
import { r as isSafeUrlFieldWriteValue } from "./url-BVdd-tah_7QjS1g7o.mjs";
import { i as EmDashValidationError } from "./types-BBH-w_KS_DiGw3TjO.mjs";
import { sql } from "kysely";
import { B32_CHARACTERS, ULID_REGEX, decodeTime, encodeTime, monotonicFactory } from "ulidx";
// node_modules/emdash/dist/revision-Dk9VI8Vf.mjs
function repeaterSubFieldsOfType(validation, type) {
	if (!validation) return [];
	let parsed;
	try {
		parsed = JSON.parse(validation);
	} catch {
		return [];
	}
	if (typeof parsed !== "object" || parsed === null || !("subFields" in parsed)) return [];
	const subFields = parsed.subFields;
	if (!Array.isArray(subFields)) return [];
	return subFields.filter((field) => typeof field === "object" && field !== null && "type" in field && field.type === type && "slug" in field && typeof field.slug === "string").map((field) => field.slug);
}
var ContentDatetimeNormalizer = class {
	constructor(db, contexts) {
		this.db = db;
		this.contexts = contexts;
	}
	context(collection) {
		if (this.contexts) {
			let context = this.contexts.get(collection);
			if (!context) {
				context = this.loadContext(collection);
				this.contexts.set(collection, context);
			}
			return context;
		}
		return requestCached(`datetimeContext:${collection}`, () => this.loadContext(collection));
	}
	async loadContext(collection) {
		const [rows, timezoneRow] = await Promise.all([this.db.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").select([
			"field.slug",
			"field.type",
			"field.validation"
		]).where("collection.slug", "=", collection).execute(), this.db.selectFrom("options").select("value").where("name", "=", "site:timezone").executeTakeFirst()]);
		let timezone = "UTC";
		if (timezoneRow) try {
			const configured = JSON.parse(timezoneRow.value);
			if (typeof configured === "string" && configured) timezone = configured;
		} catch {}
		const fields = [];
		const urlFields = [];
		for (const row of rows) if (row.type === "datetime") fields.push({
			slug: row.slug,
			type: "datetime"
		});
		else if (row.type === "url") urlFields.push({ slug: row.slug });
		else if (row.type === "repeater") {
			fields.push({
				slug: row.slug,
				type: "repeater",
				datetimeSubFields: repeaterSubFieldsOfType(row.validation, "datetime")
			});
			const urlSubFields = repeaterSubFieldsOfType(row.validation, "url");
			if (urlSubFields.length > 0) urlFields.push({
				slug: row.slug,
				urlSubFields
			});
		}
		const writableFieldSlugs = new Set(rows.filter((field) => !isStoragelessFieldRow(field)).map((field) => field.slug));
		return {
			timezone,
			fields,
			urlFields,
			writableFieldSlugs
		};
	}
	async writableFieldSlugs(collection) {
		return (await this.context(collection)).writableFieldSlugs;
	}
	/**
	* Normalizes datetimes in incoming field values and rejects `url` values
	* with unsafe schemes, control characters, or off-site path forms. Values
	* already stored are not checked, so restoring or syncing existing data
	* goes through {@link normalizeData} instead.
	*/
	async normalizeInput(collection, data) {
		const context = await this.context(collection);
		assertSafeUrlFields(data, context.urlFields);
		return this.normalizeWithContext(context, [data])[0] ?? data;
	}
	async normalizeData(collection, data) {
		const [normalized] = await this.normalizeDataMany(collection, [data]);
		return normalized ?? data;
	}
	async normalizeDataMany(collection, items) {
		return this.normalizeWithContext(await this.context(collection), items);
	}
	normalizeWithContext(context, items) {
		try {
			return items.map((data) => normalizeContentDatetimes(data, context.fields, context.timezone).value);
		} catch (error) {
			if (error instanceof DatetimeNormalizationError) throw new EmDashValidationError(error.message);
			throw error;
		}
	}
	async normalizeValue(collection, value) {
		const context = await this.context(collection);
		try {
			return normalizeDatetime(value, context.timezone).value;
		} catch (error) {
			if (error instanceof DatetimeNormalizationError) throw new EmDashValidationError(error.message);
			throw error;
		}
	}
};
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function repeaterRows(value) {
	let rows = value;
	if (typeof rows === "string" && rows.startsWith("[")) try {
		rows = JSON.parse(rows);
	} catch {
		return;
	}
	return Array.isArray(rows) ? rows : void 0;
}
function assertSafeUrl(path, value) {
	if (typeof value === "string" && !isSafeUrlFieldWriteValue(value)) throw new EmDashValidationError(`Field "${path}" must use http, https, mailto, or tel, or be a safe relative path or fragment`, { path });
}
function assertSafeUrlFields(data, urlFields) {
	for (const field of urlFields) {
		const value = data[field.slug];
		if (!field.urlSubFields) {
			assertSafeUrl(field.slug, value);
			continue;
		}
		const rows = repeaterRows(value);
		if (!rows) continue;
		for (const [index, row] of rows.entries()) {
			if (!isRecord(row)) continue;
			for (const subField of field.urlSubFields) assertSafeUrl(`${field.slug}.${index}.${subField}`, row[subField]);
		}
	}
}
var monotonic = monotonicFactory();
function createRevisionId() {
	return monotonic();
}
/**
* The id of an entry's starting revision. Every save of the entry derives the same id, so
* overlapping first saves write the row once. Its time is just before the entry was created,
* so it sorts before every other revision of the entry.
*/
function startingRevisionId(collection, entryId, createdAt) {
	const created = ULID_REGEX.test(entryId) ? decodeTime(entryId) : Date.parse(createdAt);
	const time = Number.isFinite(created) ? Math.max(created - 1, 0) : 0;
	let hash = 14695981039346656037n;
	let suffix = "";
	for (const char of `${collection}/${entryId}`) hash = BigInt.asUintN(64, (hash ^ BigInt(char.codePointAt(0))) * 1099511628211n);
	for (let i = 0; i < 16; i++) {
		hash = BigInt.asUintN(64, (hash ^ BigInt(i)) * 1099511628211n);
		suffix += B32_CHARACTERS[Number(hash >> 59n)];
	}
	return encodeTime(time, 10) + suffix;
}
var EDITOR_SETS_PAGE = 100;
function normalizeRevisionLimit(value) {
	const numeric = Number(value);
	if (!Number.isFinite(numeric)) return 50;
	return Math.max(1, Math.min(Math.trunc(numeric), 100));
}
/**
* Revision repository for version history
*
* Each revision stores a JSON snapshot of the content at a point in time.
* Used when collection has `supports: ["revisions"]` enabled.
*/
var RevisionRepository = class {
	datetimes;
	constructor(db, datetimeContexts) {
		this.db = db;
		this.datetimes = new ContentDatetimeNormalizer(db, datetimeContexts);
	}
	/**
	* Create a new revision
	*/
	async create(input) {
		const id = createRevisionId();
		const data = input.kind === "recovery" ? input.data : await this.datetimes.normalizeData(input.collection, input.data);
		const row = {
			id,
			collection: input.collection,
			entry_id: input.entryId,
			data: JSON.stringify(data),
			author_id: input.authorId ?? null,
			kind: input.kind ?? null,
			edited_by: input.editedBy?.length ? JSON.stringify(input.editedBy) : null
		};
		await this.db.insertInto("revisions").values(row).execute();
		const revision = await this.findById(id);
		if (!revision) throw new Error("Failed to create revision");
		await this.queuePruning(input.collection, input.entryId, id);
		return revision;
	}
	/**
	* Write a revision under a given id unless one with that id already exists.
	*/
	async createIfMissing(input) {
		const data = await this.datetimes.normalizeData(input.collection, input.data);
		await this.db.insertInto("revisions").values({
			id: input.id,
			collection: input.collection,
			entry_id: input.entryId,
			data: JSON.stringify(data),
			author_id: input.authorId ?? null
		}).onConflict((conflict) => conflict.column("id").doNothing()).execute();
	}
	async queuePruning(collection, entryId, revisionId) {
		try {
			await this.db.insertInto("_emdash_revision_prune_queue").values({
				collection,
				entry_id: entryId,
				revision_id: revisionId
			}).onConflict((conflict) => conflict.columns(["collection", "entry_id"]).doUpdateSet({ revision_id: revisionId })).execute();
		} catch (error) {
			console.error(`[revisions] Failed to queue revision pruning for ${collection}/${entryId}:`, error);
		}
	}
	/**
	* Find revision by ID
	*/
	async findById(id) {
		const row = await this.findRow(id);
		return row ? this.normalizeRow(row) : null;
	}
	/** Find a draft revision a save builds on, with what kind of save wrote it and who edited it. */
	async findDraftBase(id) {
		const row = await this.findRow(id);
		if (!row) return null;
		return {
			...await this.normalizeRow(row),
			kind: parseRevisionKind(row.kind),
			editedBy: parseEditedBy(row.edited_by)
		};
	}
	findRow(id) {
		return this.db.selectFrom("revisions").selectAll().where("id", "=", id).executeTakeFirst();
	}
	/** Shallow-merge `patch` into a stored revision's data. */
	async mergeData(id, patch) {
		const row = await this.db.selectFrom("revisions").select("data").where("id", "=", id).executeTakeFirst();
		if (!row) return;
		const data = {
			...JSON.parse(row.data),
			...patch
		};
		await this.db.updateTable("revisions").set({ data: JSON.stringify(data) }).where("id", "=", id).execute();
	}
	/**
	* Get all revisions for an entry (newest first)
	*
	* Orders by monotonic ULID (descending). The monotonic factory
	* guarantees strictly increasing IDs even within the same millisecond.
	*/
	async findByEntry(collection, entryId, options = {}) {
		let query = this.db.selectFrom("revisions").leftJoin("users", "users.id", "revisions.author_id").selectAll("revisions").select(["users.id as author_user_id", "users.name as author_name"]).where("revisions.collection", "=", collection).where("revisions.entry_id", "=", entryId).orderBy("revisions.id", "desc");
		if (options.limit) query = query.limit(options.limit);
		const rows = await query.execute();
		const data = await this.normalizeRows(collection, rows);
		const editorIds = rows.map((row) => parseEditedBy(row.edited_by));
		const editors = await this.findAuthors(editorIds.flatMap((ids) => ids ?? []));
		return rows.map((row, index) => {
			const normalized = data[index];
			if (!normalized) throw new Error("Failed to normalize revision data");
			const ids = editorIds[index];
			return {
				...this.rowToRevision(row, normalized),
				author: row.author_user_id ? {
					id: row.author_user_id,
					name: row.author_name?.trim() || null
				} : null,
				editedBy: ids ? ids.map((id) => editors.get(id) ?? null) : null
			};
		});
	}
	/**
	* Everyone the entry's revisions newer than `sinceId` credit, newest first and once each, or
	* everyone its revisions credit when `sinceId` is `null`. A revision credits its editors, or its
	* author when none are recorded; one that records no one credits no one. An entry is `null` for
	* an account that no longer exists. Revisions that credit the same people are read as one set,
	* {@link EDITOR_SETS_PAGE} sets per query.
	*/
	async findEditorsSince(collection, entryId, sinceId) {
		const ids = /* @__PURE__ */ new Set();
		let before = null;
		for (;;) {
			let query = this.db.selectFrom("revisions").select((eb) => [
				"author_id",
				"edited_by",
				eb.fn.max("id").as("newest")
			]).where("collection", "=", collection).where("entry_id", "=", entryId).groupBy(["author_id", "edited_by"]).orderBy("newest", "desc").limit(EDITOR_SETS_PAGE);
			if (sinceId) query = query.where("id", ">", sinceId);
			if (before) query = query.having((eb) => eb(eb.fn.max("id"), "<", before));
			const rows = await query.execute();
			for (const row of rows) for (const id of parseEditedBy(row.edited_by) ?? (row.author_id ? [row.author_id] : [])) ids.add(id);
			const last = rows.at(-1);
			if (rows.length < EDITOR_SETS_PAGE || !last) break;
			before = last.newest;
		}
		const authors = await this.findAuthors([...ids]);
		return Array.from(ids, (id) => authors.get(id) ?? null);
	}
	/** The accounts among `userIds` that still exist, keyed by ID. */
	async findAuthors(userIds) {
		const authors = /* @__PURE__ */ new Map();
		for (const batch of chunks([...new Set(userIds)], 50)) {
			const users = await this.db.selectFrom("users").select(["id", "name"]).where("id", "in", batch).execute();
			for (const user of users) authors.set(user.id, {
				id: user.id,
				name: user.name?.trim() || null
			});
		}
		return authors;
	}
	async findByIds(collection, ids) {
		const revisions = [];
		for (const batch of chunks([...new Set(ids)], 50)) {
			const rows = await this.db.selectFrom("revisions").selectAll().where("collection", "=", collection).where("id", "in", batch).execute();
			const data = await this.datetimes.normalizeDataMany(collection, rows.map((row) => JSON.parse(row.data)));
			for (const [index, row] of rows.entries()) {
				const normalized = data[index];
				if (!normalized) throw new Error("Failed to normalize revision data");
				revisions.push(this.rowToRevision(row, normalized));
			}
		}
		return revisions;
	}
	/** Read revisions only when the owning content row is visible in the same statement snapshot. */
	async findVisibleByEntry(collection, entryId, options = {}) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		const limit = normalizeRevisionLimit(options.limit);
		const result = await sql`
			SELECT revisions.* FROM revisions
			WHERE revisions.collection = ${collection}
			AND revisions.entry_id = ${entryId}
			AND EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.id = ${entryId}
				AND content.deleted_at IS NULL
			)
			ORDER BY revisions.id DESC
			LIMIT ${limit}
		`.execute(this.db);
		const data = await this.normalizeRows(collection, result.rows);
		return result.rows.map((row, index) => {
			const normalized = data[index];
			if (!normalized) throw new Error("Failed to normalize revision data");
			return this.rowToRevision(row, normalized);
		});
	}
	/** Read one revision only when its owning content row is visible in the same statement snapshot. */
	async findVisibleById(collection, entryId, revisionId) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		const row = (await sql`
			SELECT revisions.* FROM revisions
			WHERE revisions.id = ${revisionId}
			AND revisions.collection = ${collection}
			AND revisions.entry_id = ${entryId}
			AND EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.id = ${entryId}
				AND content.deleted_at IS NULL
			)
			LIMIT 1
		`.execute(this.db)).rows[0];
		return row ? this.normalizeRow(row) : null;
	}
	/**
	* Get the most recent revision for an entry
	*/
	async findLatest(collection, entryId) {
		const row = await this.db.selectFrom("revisions").selectAll().where("collection", "=", collection).where("entry_id", "=", entryId).orderBy("id", "desc").limit(1).executeTakeFirst();
		return row ? this.normalizeRow(row) : null;
	}
	/**
	* Count revisions for an entry
	*/
	async countByEntry(collection, entryId) {
		const result = await this.db.selectFrom("revisions").select((eb) => eb.fn.count("id").as("count")).where("collection", "=", collection).where("entry_id", "=", entryId).executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Delete all revisions for an entry (use when entry is deleted)
	*/
	async deleteByEntry(collection, entryId) {
		const result = await this.db.deleteFrom("revisions").where("collection", "=", collection).where("entry_id", "=", entryId).executeTakeFirst();
		try {
			await this.db.deleteFrom("_emdash_revision_prune_queue").where("collection", "=", collection).where("entry_id", "=", entryId).execute();
		} catch (error) {
			console.error(`[revisions] Failed to clear queued revision pruning for ${collection}/${entryId}:`, error);
		}
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Delete old revisions, keeping the most recent N
	*/
	async pruneOldRevisions(collection, entryId, keepCount, throughRevisionId) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		let keepQuery = this.db.selectFrom("revisions").select("id").where("collection", "=", collection).where("entry_id", "=", entryId).orderBy("created_at", "desc").orderBy("id", "desc").limit(keepCount);
		if (throughRevisionId) keepQuery = keepQuery.where("id", "<=", throughRevisionId);
		const keepIds = (await keepQuery.execute()).map((r) => r.id);
		if (keepIds.length === 0) return 0;
		const result = await sql`
			DELETE FROM revisions
			WHERE collection = ${collection}
			AND entry_id = ${entryId}
			${throughRevisionId ? sql`AND id <= ${throughRevisionId}` : sql``}
			AND id NOT IN (${sql.join(keepIds.map((id) => sql`${id}`))})
			AND NOT EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.live_revision_id = revisions.id
				OR content.draft_revision_id = revisions.id
			)
		`.execute(this.db);
		return Number(result.numAffectedRows ?? 0);
	}
	async pruneQueuedEntry(collection, entryId, queuedRevisionId, keepCount) {
		const pruned = await this.pruneOldRevisions(collection, entryId, keepCount, queuedRevisionId);
		await this.db.deleteFrom("_emdash_revision_prune_queue").where("collection", "=", collection).where("entry_id", "=", entryId).where("revision_id", "=", queuedRevisionId).execute();
		return pruned;
	}
	/**
	* With `autosaveOnly`, deletes the revision only while it is still an autosave, so one marked
	* kept after the caller decided to replace it survives.
	*/
	async deleteIfUnreferenced(collection, entryId, revisionId, options = {}) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		return ((await sql`
			DELETE FROM revisions
			WHERE id = ${revisionId}
			AND collection = ${collection}
			AND entry_id = ${entryId}
			${options.autosaveOnly ? sql`AND kind = 'autosave'` : sql``}
			AND NOT EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.live_revision_id = revisions.id
				OR content.draft_revision_id = revisions.id
			)
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
	}
	/**
	* Convert database row to Revision object
	*/
	async normalizeRow(row) {
		const [data] = await this.normalizeRows(row.collection, [row]);
		return this.rowToRevision(row, data ?? {});
	}
	/** Recovery revisions keep their data as sent; restoring one validates it. */
	async normalizeRows(collection, rows) {
		const data = rows.map((row) => JSON.parse(row.data));
		const kept = rows.flatMap((row, index) => row.kind === "recovery" ? [] : [index]);
		const normalized = await this.datetimes.normalizeDataMany(collection, kept.map((index) => data[index]));
		for (const [position, index] of kept.entries()) data[index] = normalized[position];
		return data;
	}
	rowToRevision(row, data) {
		return {
			id: row.id,
			collection: row.collection,
			entryId: row.entry_id,
			data,
			authorId: row.author_id,
			createdAt: row.created_at
		};
	}
};
function parseRevisionKind(value) {
	return value === "autosave" || value === "recovery" ? value : null;
}
function parseEditedBy(value) {
	if (value === null) return null;
	let parsed;
	try {
		parsed = JSON.parse(value);
	} catch {
		return null;
	}
	return Array.isArray(parsed) && parsed.length > 0 && parsed.every((id) => typeof id === "string") ? parsed : null;
}
export { startingRevisionId as a, normalizeRevisionLimit as i, RevisionRepository as n, createRevisionId as r, ContentDatetimeNormalizer as t };
