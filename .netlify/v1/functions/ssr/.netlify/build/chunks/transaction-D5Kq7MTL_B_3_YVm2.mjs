import { s as deferObjectCacheInvalidations } from "./object-cache-I4Re7BOR_CyRvBWDi.mjs";
import { w as validateIdentifier } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { t as chunks } from "./chunks-CvgCLYip_BPNjBngy.mjs";
import { n as roomId } from "./types-D2zSjG0c_DDfeE_GP.mjs";
import { sql } from "kysely";
import { AsyncLocalStorage } from "node:async_hooks";
// node_modules/emdash/dist/rooms/notifications.mjs
/**
* Tells rooms about outside writes. Repositories call `notifyRoom` after each write to an existing
* entry. Inside the outermost `withTransaction` the notifications wait until it returns, so a room
* never loads its entry before the write commits.
*
* Shared code may import this module, so it must stay free of the room engine.
*/
var STATE_KEY = Symbol.for("emdash:rooms:notifications");
var store = globalThis;
function state() {
	let current = store[STATE_KEY];
	if (!current) {
		current = {
			notifier: null,
			queues: new AsyncLocalStorage()
		};
		store[STATE_KEY] = current;
	}
	return current;
}
/** Writers that need a query to find the entries they changed skip it when this is false. */
function hasRoomNotifier() {
	return state().notifier !== null;
}
/**
* Tells the entry's room that a write changed it, and which values outside the shared document
* changed. Waits in the innermost open queue, or goes out at once without one.
*/
function notifyRoom(entry, outside = []) {
	const { notifier, queues } = state();
	if (!notifier) return;
	const id = roomId(entry);
	const queue = openQueue(queues.getStore());
	if (queue) hold(queue, id, outside);
	else send(id, [...outside]);
}
/**
* Tells the room of every locale in the translation groups, for writes keyed by group, such as
* term assignments and published references. Runs no query while no notifier is set.
*/
async function notifyEntryGroups(db, collection, entryGroups, outside) {
	if (!hasRoomNotifier()) return;
	validateIdentifier(collection, "collection type");
	const tableName = `ec_${collection}`;
	for (const batch of chunks([...new Set(entryGroups)], 50)) {
		const rows = await sql`
			SELECT id FROM ${sql.ref(tableName)}
			WHERE translation_group IN (${sql.join(batch)})
		`.execute(db);
		for (const row of rows.rows) notifyRoom({
			collection,
			id: row.id
		}, outside);
	}
}
/**
* Runs `run` with its notifications held until it settles, then sends one per room. Without
* `skip`, joins a queue that is already open. With `skip`, always opens its own, which drops
* that room's notifications while it is open and then hands the rest to the queue around it.
* Opens nothing while no notifier is set.
*/
async function withRoomNotificationQueue(run, options = {}) {
	const { notifier, queues } = state();
	if (!notifier) return run();
	const parent = openQueue(queues.getStore());
	if (parent && options.skip === void 0) return run();
	const queue = {
		held: /* @__PURE__ */ new Map(),
		skip: options.skip,
		closed: false,
		parent
	};
	try {
		return await queues.run(queue, run);
	} finally {
		flush(queue);
	}
}
/** Work deferred past its queue's end still runs in that queue's context. */
function openQueue(queue) {
	let current = queue;
	while (current?.closed) current = current.parent;
	return current;
}
function hold(queue, id, outside) {
	if (queue.skip === id) return;
	let values = queue.held.get(id);
	if (!values) {
		values = /* @__PURE__ */ new Set();
		queue.held.set(id, values);
	}
	for (const value of outside) values.add(value);
}
function flush(queue) {
	queue.closed = true;
	const parent = openQueue(queue.parent);
	for (const [id, values] of queue.held) if (parent) hold(parent, id, values);
	else send(id, [...values]);
	queue.held.clear();
}
/** Never awaited: the writer doesn't wait for the room. */
function send(id, outside) {
	after(() => state().notifier?.notify(id, outside));
}
// node_modules/emdash/dist/transaction-D5Kq7MTL.mjs
/**
* Run a callback inside a transaction if supported, or directly if not.
*
* Probes the database once on first call to determine if transactions work.
* The result is cached for the lifetime of the process/worker.
*
* Where a real transaction is used, object-cache invalidations made by `fn`
* are held until it commits or rolls back: an epoch bumped mid-transaction
* would let a concurrent read cache the pre-write rows under the new epoch,
* where they keep matching and are served as a HIT. Backends without
* transactions commit each statement as it runs, so no such window exists;
* deferring there would only add risk, since a callback cancelled mid-flight
* (a client disconnect on workerd) would never run the release and would
* leave a committed write without its bump.
*/
var transactionsSupported = null;
var TRANSACTIONS_NOT_SUPPORTED_RE = /transactions are not supported/i;
async function withTransaction(db, fn) {
	if (db.isTransaction) return fn(db);
	return withRoomNotificationQueue(() => runTransaction(db, fn));
}
async function runTransaction(db, fn) {
	if (transactionsSupported === true) return deferObjectCacheInvalidations(() => db.transaction().execute(fn));
	if (transactionsSupported === false) return fn(db);
	try {
		const result = await deferObjectCacheInvalidations(() => db.transaction().execute(fn));
		transactionsSupported = true;
		return result;
	} catch (error) {
		if (error instanceof Error && TRANSACTIONS_NOT_SUPPORTED_RE.test(error.message)) {
			transactionsSupported = false;
			return fn(db);
		}
		throw error;
	}
}
export { notifyRoom as i, hasRoomNotifier as n, notifyEntryGroups as r, withTransaction as t };
