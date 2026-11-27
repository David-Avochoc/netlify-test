import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { w as validateIdentifier } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { a as InvalidCursorError, l as decodeCursor, u as encodeCursor } from "./types-BBH-w_KS_DiGw3TjO.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { d as calendarQuery } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/astro/routes/api/calendar.mjs
var calendar_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Calendar handler
*
* Lists published entries at their publish time and scheduled entries at
* their scheduled time, across every visible collection, in time order.
*/
var KINDS = ["published", "scheduled"];
var KIND_COLUMN = {
	published: "published_at",
	scheduled: "scheduled_at"
};
var TITLE_FIELD_TYPES = [
	"string",
	"text",
	"slug"
];
var SLUG_PATTERN = /^[a-z][a-z0-9_]*$/;
function compareText(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}
/** Streams run in collection slug order, published before scheduled. */
function compareStreams(a, b) {
	return compareText(a.collection, b.collection) || KINDS.indexOf(a.kind) - KINDS.indexOf(b.kind);
}
function isKind(value) {
	return value === "published" || value === "scheduled";
}
/** Stored timestamps are canonical `toISOString()` values. */
function isCanonicalTime(value) {
	const time = Date.parse(value);
	return !Number.isNaN(time) && new Date(time).toISOString() === value;
}
function encodeCalendarCursor(entry) {
	return encodeCursor(`${entry.at}|${entry.collection}|${entry.kind}`, entry.id);
}
function decodeCalendarCursor(cursor) {
	const { orderValue, id } = decodeCursor(cursor);
	const [at = "", collection = "", kind, ...rest] = orderValue.split("|");
	if (rest.length > 0 || !isCanonicalTime(at) || !SLUG_PATTERN.test(collection) || !isKind(kind) || !id) throw new InvalidCursorError(cursor);
	return {
		at,
		collection,
		kind,
		id
	};
}
/**
* Title columns follow the admin's rule: the collection's title field, then
* `title`, then `name`, skipping empty values, then the slug and the id. A
* `title_field` that names no text field is ignored.
*/
async function loadStreams(db) {
	const rows = await db.selectFrom("_emdash_collections as c").leftJoin("_emdash_fields as f", (join) => join.onRef("f.collection_id", "=", "c.id").on("f.type", "in", TITLE_FIELD_TYPES).on((eb) => eb.or([eb("f.slug", "in", ["title", "name"]), eb("f.slug", "=", eb.ref("c.title_field"))]))).select([
		"c.slug as slug",
		"c.title_field as title_field",
		"f.slug as field"
	]).where("c.hidden", "=", 0).execute();
	const collections = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const collection = collections.get(row.slug) ?? {
			titleField: row.title_field,
			fields: /* @__PURE__ */ new Set()
		};
		if (row.field) collection.fields.add(row.field);
		collections.set(row.slug, collection);
	}
	return [...collections.entries()].toSorted(([a], [b]) => compareText(a, b)).flatMap(([slug, { titleField, fields }]) => {
		validateIdentifier(slug, "collection slug");
		const columns = [.../* @__PURE__ */ new Set([
			titleField,
			"title",
			"name"
		])].filter((column) => !!column && fields.has(column));
		const title = sql`COALESCE(${sql.join([...columns, "slug"].map((column) => {
			validateIdentifier(column, "title column");
			return sql`NULLIF(${sql.ref(column)}, '')`;
		}))}, id)`;
		return KINDS.map((kind) => ({
			collection: slug,
			kind,
			title
		}));
	});
}
function keysetCondition(stream, cursor) {
	if (!cursor) return sql``;
	const column = sql.ref(KIND_COLUMN[stream.kind]);
	const order = compareStreams(stream, cursor);
	if (order < 0) return sql`AND ${column} > ${cursor.at}`;
	if (order === 0) return sql`AND (${column} > ${cursor.at} OR id > ${cursor.id})`;
	return sql``;
}
async function queryStream(db, stream, params, cursor) {
	const column = sql.ref(KIND_COLUMN[stream.kind]);
	const lower = cursor && cursor.at > params.from ? cursor.at : params.from;
	return (await sql`
		SELECT id, locale, status, ${stream.title} AS title, ${column} AS event_at
		FROM ${sql.ref(`ec_${stream.collection}`)}
		WHERE deleted_at IS NULL
			AND ${column} IS NOT NULL
			AND ${column} >= ${lower}
			AND ${column} < ${params.to}
			${stream.kind === "published" ? sql`AND status = 'published'` : sql``}
			${keysetCondition(stream, cursor)}
		ORDER BY ${column} ASC, id ASC
		LIMIT ${params.limit + 1}
	`.execute(db)).rows;
}
/**
* Each stream (one collection and kind) is read in its own query, and the
* rows are merged by time. Ties keep the stream order and then each stream's
* SQL order, which matches the next page's keyset conditions.
*/
async function handleCalendarEntries(db, params) {
	try {
		const cursor = params.cursor ? decodeCalendarCursor(params.cursor) : void 0;
		const streams = await loadStreams(db);
		const merged = (await Promise.all(streams.map(async (stream) => {
			return (await queryStream(db, stream, params, cursor)).map((row, position) => ({
				row,
				stream,
				position
			}));
		}))).flat().toSorted((a, b) => compareText(a.row.event_at, b.row.event_at) || compareStreams(a.stream, b.stream) || a.position - b.position);
		const items = merged.slice(0, params.limit).map(({ row, stream }) => ({
			collection: stream.collection,
			id: row.id,
			locale: row.locale,
			title: row.title,
			status: row.status,
			kind: stream.kind,
			at: row.event_at
		}));
		const last = items.at(-1);
		const nextCursor = merged.length > params.limit && last ? encodeCalendarCursor(last) : void 0;
		return {
			success: true,
			data: nextCursor ? {
				items,
				nextCursor
			} : { items }
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		console.error("Calendar error:", error);
		return {
			success: false,
			error: {
				code: "CALENDAR_ERROR",
				message: "Failed to load calendar"
			}
		};
	}
}
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(url, calendarQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleCalendarEntries(emdash.db, query));
	} catch (error) {
		return handleError(error, "Failed to load calendar", "CALENDAR_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/calendar@_@mjs
var page = () => calendar_exports;
export { page };
