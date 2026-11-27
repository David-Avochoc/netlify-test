import { r as getRequestContext, t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
// node_modules/emdash/dist/object-cache-I4Re7BOR.mjs
/**
* Object-cache serialization codec.
*
* Cached values are JSON, with one extension: `Date` instances are preserved
* across the round-trip. EmDash content entries carry `Date` objects for the
* system timestamp columns (`createdAt`, `updatedAt`, `publishedAt`,
* `scheduledAt`) and on `cacheHint.lastModified`; plain `JSON.stringify` would
* silently flatten those to ISO strings, so a value read from cache would no
* longer be `=== instanceof Date` and downstream `value instanceof Date`
* branches (cursor encoding, scheduled-visibility checks) would diverge from a
* fresh database read.
*
* Functions and symbol-keyed properties are NOT preserved — callers that cache
* values carrying either (e.g. content entries with their `.edit` proxy and
* the non-enumerable `CURSOR_RAW_VALUES` symbol) must reduce to a serializable
* snapshot before caching and rebuild the non-serializable parts on read. See
* `query.ts` content snapshot helpers.
*/
/** Tag used to mark a serialized `Date`. Deliberately unlikely to collide. */
var DATE_TAG = "$$emdashDate";
function isTaggedDate(value) {
	if (typeof value !== "object" || value === null) return false;
	return Object.keys(value).length === 1 && typeof value[DATE_TAG] === "string";
}
/**
* Serialize a value to a cache string, preserving `Date` instances.
*
* Uses the JSON replacer's `this` binding to inspect the *original* property
* value: `JSON.stringify` invokes `Date.prototype.toJSON` before the replacer
* sees it, so by the time `value` arrives it is already an ISO string. Reading
* `this[key]` recovers the live `Date` so we can tag it.
*/
function encode(value) {
	return JSON.stringify(value, function(key, val) {
		const original = this[key];
		if (original instanceof Date) return { [DATE_TAG]: original.toISOString() };
		return val;
	});
}
/**
* Parse a cache string produced by {@link encode}, rehydrating tagged `Date`s.
*
* Returns `undefined` if the input is not valid JSON (treated as a cache miss
* by the read-through layer rather than throwing).
*/
function decode(raw) {
	try {
		return JSON.parse(raw, (_key, value) => {
			if (isTaggedDate(value)) return new Date(value[DATE_TAG]);
			return value;
		});
	} catch {
		return;
	}
}
/**
* Object cache — distributed read-through query cache.
*
* Layering (per query):
*
*   requestCached   → in-request dedupe (per render, WeakMap on ALS context)
*   cachedQuery     → THIS layer: distributed L2 (KV / memory), epoch-keyed
*   database        → source of truth
*
* Optional and off by default: when no `objectCache` descriptor is configured,
* `virtual:emdash/object-cache` exports `createObjectCache = undefined`,
* {@link getBackend} resolves to `null`, and {@link cachedQuery} is a
* transparent passthrough to its `load` function. Configure with
* `memoryCache()` (Node) or `kvCache()` from `@emdash-cms/cloudflare`.
*
* Invalidation is epoch-based: each cache key embeds a per-namespace epoch
* ("last changed" marker) read from the backend. A write calls
* {@link invalidateObjectCache}, which stamps the namespace epoch to
* `Date.now()`; every previously-stored key for that namespace is instantly
* orphaned and reclaimed by its TTL. This is O(1) and needs no key
* enumeration (KV has no prefix delete).
*
* Every batch of epoch writes also rewrites one site-wide change marker. When
* an isolate's cached epochs pass `revalidate`, it reads that marker; if the
* marker is unchanged it keeps all of them, so a render re-reads one key
* rather than one per namespace. See {@link getChangeMarker}. The `comments`
* epoch is left out: any visitor can bump it, and it is always read directly.
*
* The singleton backend/config and the per-isolate epoch cache live on
* `globalThis` behind `Symbol.for` keys so Vite SSR chunk duplication can't
* fork them (same pattern as `request-context.ts`).
*/
var DEFAULT_KEY_PREFIX = "em";
var DEFAULT_TTL_SECONDS = 3600;
var DEFAULT_REVALIDATE_MS = 1e3;
var DEFAULT_TIMEOUT_MS = 2e3;
/**
* Race a backend operation against a timeout so a stalled call (e.g. a KV read
* that never resolves *and* never rejects — a cold cross-region read, or one
* queued behind the Workers simultaneous-connection limit) degrades to a
* rejection instead of hanging the isolate. A rejection is benign: callers
* already treat a failed read as a cache miss / last-known epoch.
*/
function withTimeout(promise, ms, label) {
	if (!(ms > 0)) return promise;
	let timer;
	const timeout = new Promise((_resolve, reject) => {
		timer = setTimeout(() => {
			reject(/* @__PURE__ */ new Error(`object-cache ${label} timed out after ${ms}ms`));
		}, ms);
	});
	return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
/**
* A marker only vouches for an epoch read at least this long after the marker
* was written. KV serves edge-cached values for up to ~60s after a write, so an
* epoch read sooner may predate the write that produced the marker; such an
* epoch is re-read until a read lands past this window.
*/
var MARKER_SETTLE_MS = 12e4;
/**
* Longest an epoch may be reused on the marker's word before it is re-read
* from the backend. Bounds staleness when a marker write is lost, or when an
* isolate running an older release bumps an epoch without rewriting the marker.
*/
var MARKER_MAX_TRUST_MS = 6e5;
/** Minimum gap between marker writes; KV rejects a second write to a key within a second. */
var MARKER_RETRY_MS = 1100;
/**
* Extra time past the configured read timeout before an in-flight epoch read
* is presumed dead. A live owner's read settles within `timeout` (enforced by
* {@link withTimeout}), so the grace only needs to absorb scheduling jitter.
*/
var EPOCH_READ_GRACE_MS = 1e3;
/**
* How long an in-flight epoch read may be trusted. A read older than this can
* only exist because its owning request was cancelled mid-await — on workerd
* a cancelled request's continuations never run, *including the timeout's own
* `setTimeout` callback*, so the shared promise never settles and is never
* replaced. A cross-request promise may also reject immediately when the
* runtime detects that its owner has ended; callers treat that the same as a
* timeout. With the timeout disabled (`timeout: 0`) the default is used as
* the deadline; the worst case of guessing too short is one duplicate
* backend read.
*/
function epochReadDeadline() {
	return (holder.config.timeout > 0 ? holder.config.timeout : DEFAULT_TIMEOUT_MS) + EPOCH_READ_GRACE_MS;
}
/**
* Await another request's in-flight epoch read, bounded by the waiter's own
* timer. The bare promise must never be awaited across requests: if the
* owning request is cancelled, the promise may never settle or may reject
* immediately (see {@link epochReadDeadline}) and an unguarded waiter hangs or
* throws. The race timer below belongs to the *waiter's* request context and
* therefore always fires; on timeout or rejection the waiter degrades to
* `fallback` (the last known epoch), the same contract as a failed backend read.
*/
function raceInFlightEpochRead(promise, ms, fallback) {
	let timer;
	const timeout = new Promise((resolve) => {
		timer = setTimeout(resolve, Math.max(ms, 1), fallback);
	});
	return Promise.race([promise.catch(() => fallback), timeout]).finally(() => clearTimeout(timer));
}
/** Bound a waiter on another request's backend initialization. */
function raceInFlightBackendInit(promise, ms) {
	let timer;
	const timeout = new Promise((resolve) => {
		timer = setTimeout(resolve, Math.max(ms, 1), null);
	});
	return Promise.race([promise.catch(() => null), timeout]).finally(() => clearTimeout(timer));
}
var BACKEND_KEY = Symbol.for("emdash:object-cache:backend");
var EPOCH_KEY = Symbol.for("emdash:object-cache:epochs");
var PENDING_KEY = Symbol.for("emdash:object-cache:pending-bumps:v2");
var LAST_CONTENT_WRITE_KEY = Symbol.for("emdash:object-cache:last-content-write");
var PENDING_CONTENT_WRITE_KEY = Symbol.for("emdash:object-cache:pending-content-write");
var WRITE_SCOPE_KEY = Symbol.for("emdash:object-cache:write-scope");
var INVALIDATION_SCOPE_KEY = Symbol.for("emdash:object-cache:invalidation-scope");
var CHANGE_MARKER_KEY = Symbol.for("emdash:object-cache:change-marker");
var MARKER_WRITE_KEY = Symbol.for("emdash:object-cache:marker-write");
var g = globalThis;
var holder = g[BACKEND_KEY] ?? (() => {
	const h = {
		initialized: false,
		backend: null,
		initPromise: null,
		config: {
			keyPrefix: DEFAULT_KEY_PREFIX,
			defaultTtl: DEFAULT_TTL_SECONDS,
			revalidate: DEFAULT_REVALIDATE_MS,
			timeout: DEFAULT_TIMEOUT_MS
		}
	};
	g[BACKEND_KEY] = h;
	return h;
})();
var epochCache = g[EPOCH_KEY] ?? (() => {
	const m = /* @__PURE__ */ new Map();
	g[EPOCH_KEY] = m;
	return m;
})();
/** Namespaces with a backend epoch write already scheduled this tick. */
var pendingBumps = g[PENDING_KEY] ?? (() => {
	const m = /* @__PURE__ */ new Map();
	g[PENDING_KEY] = m;
	return m;
})();
var lastContentWrite = g[LAST_CONTENT_WRITE_KEY] ?? (() => {
	const s = {
		value: 0,
		at: 0
	};
	g[LAST_CONTENT_WRITE_KEY] = s;
	return s;
})();
/** Whether a backend persist of the content-write stamp is already scheduled. */
var contentWritePersist = g[PENDING_CONTENT_WRITE_KEY] ?? (() => {
	const s = { pending: false };
	g[PENDING_CONTENT_WRITE_KEY] = s;
	return s;
})();
var changeMarker = g[CHANGE_MARKER_KEY] ?? (() => {
	const s = {
		marker: null,
		at: 0,
		failed: false
	};
	g[CHANGE_MARKER_KEY] = s;
	return s;
})();
var markerWrite = g[MARKER_WRITE_KEY] ?? (() => {
	const s = {
		epochWritesInFlight: 0,
		busySince: 0,
		lastWriteAt: 0,
		writtenSinceMarker: false
	};
	g[MARKER_WRITE_KEY] = s;
	return s;
})();
var writeScopes = g[WRITE_SCOPE_KEY] ?? (() => {
	const als = new AsyncLocalStorage();
	g[WRITE_SCOPE_KEY] = als;
	return als;
})();
var invalidationScopes = g[INVALIDATION_SCOPE_KEY] ?? (() => {
	const als = new AsyncLocalStorage();
	g[INVALIDATION_SCOPE_KEY] = als;
	return als;
})();
/**
* Resolve (once per isolate) the configured object-cache backend.
*
* Loads `virtual:emdash/object-cache`, which exports `createObjectCache`
* (`undefined` when no cache is configured) and the serialized
* `objectCacheConfig`. Returns `null` when the cache is disabled.
*/
async function getBackend() {
	if (holder.initialized) return holder.backend;
	if (holder.initPromise) {
		const age = Date.now() - (holder.initPromiseAt ?? 0);
		const deadline = epochReadDeadline();
		if (age < deadline) return raceInFlightBackendInit(holder.initPromise, deadline - age);
	}
	holder.initPromiseAt = Date.now();
	holder.initPromise = (async () => {
		try {
			const mod = await import("./object-cache_XrGln1aI.mjs");
			const config = mod.objectCacheConfig ?? {};
			holder.config = {
				keyPrefix: typeof config.keyPrefix === "string" && config.keyPrefix.length > 0 ? config.keyPrefix : DEFAULT_KEY_PREFIX,
				defaultTtl: typeof config.defaultTtl === "number" && config.defaultTtl > 0 ? config.defaultTtl : DEFAULT_TTL_SECONDS,
				revalidate: typeof config.revalidate === "number" && config.revalidate >= 0 ? config.revalidate : DEFAULT_REVALIDATE_MS,
				timeout: typeof config.timeout === "number" && config.timeout >= 0 ? config.timeout : DEFAULT_TIMEOUT_MS
			};
			holder.backend = typeof mod.createObjectCache === "function" ? mod.createObjectCache(config) : null;
		} catch (error) {
			if (Object.assign({
				"ASSETS_PREFIX": void 0,
				"BASE_URL": "/",
				"DEV": false,
				"MODE": "production",
				"PROD": true,
				"SITE": void 0,
				"SSR": true
			}, { _: "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/.bin/astro" })?.DEV) console.warn("[object-cache] backend unavailable:", error);
			holder.backend = null;
		}
		holder.initialized = true;
		holder.initPromise = null;
		holder.initPromiseAt = void 0;
		return holder.backend;
	})();
	const started = holder.initPromise;
	after(() => started.then(() => void 0, () => void 0));
	return started;
}
/** Build the backend key for a namespace's epoch anchor. */
function epochKey(namespace) {
	return `${holder.config.keyPrefix}:epoch:${namespace}`;
}
/** Backend key for the shared "last content write" stamp (no short TTL). */
function lastContentWriteKey() {
	return `${holder.config.keyPrefix}:last-content-write-at`;
}
/** Backend key for the site-wide change marker (no TTL). */
function changeMarkerKey() {
	return `${holder.config.keyPrefix}:epochs-changed`;
}
function parseChangeMarker(raw) {
	if (raw === null) return null;
	const writtenAt = Number(raw.slice(0, raw.indexOf(".")));
	return Number.isFinite(writtenAt) && writtenAt > 0 ? {
		token: raw,
		writtenAt
	} : null;
}
/**
* Whether the change marker covers `namespace`. Any visitor can bump the
* comments epoch, so it neither writes the marker nor relies on it.
*/
function isCoveredByMarker(namespace) {
	return namespace !== CacheNamespace.COMMENTS;
}
function isContentNamespace(namespace) {
	return namespace.startsWith("content:");
}
/**
* Build the (epoch-independent) backend key for a cached value.
*
* The key is stable across invalidations — the namespace epochs are stored
* *inside* the value envelope and validated on read, not baked into the key.
* This lets the value and the epochs be fetched in one parallel round-trip
* (instead of "read epoch, then read value"), and means an invalidated value
* is overwritten in place rather than orphaned under a dead epoch-keyed name.
*/
function valueKey(namespaces, key) {
	return `${holder.config.keyPrefix}:${namespaces.join(",")}:${key}`;
}
function epochsMatch(stored, current) {
	if (stored.length !== current.length) return false;
	for (let i = 0; i < stored.length; i++) if (stored[i] !== current[i]) return false;
	return true;
}
/**
* Requests that must always read live data and never populate the cache:
* visual edit mode, preview tokens, isolated databases (playground / DO
* preview, whose schema and content diverge from the configured site), and
* Astro route-cache fills that must not rebuild a purged page from a stale
* object-cache snapshot.
*/
function shouldBypass() {
	const ctx = getRequestContext();
	if (!ctx) return false;
	return ctx.editMode === true || ctx.preview !== void 0 || ctx.dbIsIsolated === true || ctx.routeCacheFill === true;
}
/**
* Read the current epoch for `namespace`, reusing an isolate-cached value for
* up to `revalidate` ms. A missing epoch (never bumped) is treated as `0`.
*
* Backend errors and stalls are non-fatal: the read is bounded by a timeout,
* and on failure we fall back to the last known epoch (or `0`), so a flaky or
* hung cache degrades to "serve whatever's keyed" rather than throwing or
* hanging.
*/
async function getEpoch(namespace, backend) {
	const now = Date.now();
	const cached = epochCache.get(namespace);
	if (cached && now - cached.at < holder.config.revalidate) return cached.value;
	if (cached?.promise) {
		const age = now - (cached.promiseAt ?? 0);
		const deadline = epochReadDeadline();
		if (age < deadline) return raceInFlightEpochRead(cached.promise, deadline - age, cached.value);
	}
	if (cached && canVouch(namespace, cached, now)) {
		const marker = await getChangeMarker(backend);
		if (epochCache.get(namespace) !== cached) return getEpoch(namespace, backend);
		if (marker?.token === cached.token) {
			epochCache.set(namespace, {
				...cached,
				at: Date.now()
			});
			return cached.value;
		}
	}
	const markerRecheckMs = changeMarker.failed ? holder.config.revalidate : MARKER_MAX_TRUST_MS;
	const markerUnknown = holder.config.revalidate > 0 && isCoveredByMarker(namespace) && (changeMarker.at === 0 || changeMarker.marker === null && now - changeMarker.at >= markerRecheckMs);
	const markerReadPending = changeMarker.promise !== void 0 && now - (changeMarker.promiseAt ?? 0) < epochReadDeadline();
	if (markerUnknown && !markerReadPending) getChangeMarker(backend);
	const promise = (async () => {
		let value;
		let readOk = true;
		try {
			const raw = await withTimeout(backend.get(epochKey(namespace)), holder.config.timeout, "epoch read");
			const parsed = raw === null ? 0 : Number(raw);
			value = Number.isFinite(parsed) ? parsed : 0;
		} catch {
			value = cached?.value ?? 0;
			readOk = false;
		}
		const local = epochCache.get(namespace)?.value ?? 0;
		const merged = Math.max(value, local);
		const token = readOk && value >= local && isCoveredByMarker(namespace) ? changeMarker.marker?.token : void 0;
		epochCache.set(namespace, {
			value: merged,
			at: Date.now(),
			readAt: now,
			token
		});
		return merged;
	})();
	after(() => promise.then(() => void 0, () => void 0));
	epochCache.set(namespace, {
		value: cached?.value ?? 0,
		at: cached?.at ?? 0,
		promise,
		promiseAt: now
	});
	return promise;
}
/**
* Whether a stale cached epoch may be revalidated against the change marker
* instead of being re-read. `revalidate: 0` keeps its promise of reading every
* epoch on every query.
*
* The entry must already pass the settle check against the last marker this
* isolate saw. A fresh marker read can only confirm that marker or replace it
* with a newer token the entry cannot match, so otherwise it cannot spare the
* epoch read.
*/
function canVouch(namespace, entry, now) {
	const seen = changeMarker.marker;
	return holder.config.revalidate > 0 && isCoveredByMarker(namespace) && entry.promise === void 0 && entry.token !== void 0 && entry.readAt !== void 0 && now - entry.readAt < MARKER_MAX_TRUST_MS && seen !== null && seen.token === entry.token && entry.readAt >= seen.writtenAt + MARKER_SETTLE_MS;
}
/**
* Read the site-wide change marker, reusing an isolate-cached read for up to
* `revalidate` ms. Resolves to `null` when the marker is absent, unreadable, or
* its read stalls, so callers fall back to reading epochs directly. Concurrent
* callers share one in-flight read, with the same reclaim rules as epochs.
*/
async function getChangeMarker(backend) {
	const now = Date.now();
	if (changeMarker.at > 0 && now - changeMarker.at < holder.config.revalidate) return changeMarker.marker;
	if (changeMarker.promise) {
		const age = now - (changeMarker.promiseAt ?? 0);
		const deadline = epochReadDeadline();
		if (age < deadline) {
			let timer;
			const timeout = new Promise((resolve) => {
				timer = setTimeout(resolve, Math.max(deadline - age, 1), null);
			});
			return Promise.race([changeMarker.promise.catch(() => null), timeout]).finally(() => clearTimeout(timer));
		}
	}
	const promise = (async () => {
		let marker;
		let failed = false;
		try {
			marker = parseChangeMarker(await withTimeout(backend.get(changeMarkerKey()), holder.config.timeout, "marker read"));
		} catch {
			marker = null;
			failed = true;
		}
		changeMarker.marker = marker;
		changeMarker.at = Date.now();
		changeMarker.failed = failed;
		changeMarker.promise = void 0;
		changeMarker.promiseAt = void 0;
		return marker;
	})();
	after(() => promise.then(() => void 0, () => void 0));
	changeMarker.promise = promise;
	changeMarker.promiseAt = now;
	return promise;
}
/**
* Distributed read-through cache around `load`.
*
* `T` must be the value as it should be *stored* — i.e. JSON-serializable with
* the codec's `Date` support, carrying no functions or symbol-keyed props.
* Callers caching richer objects (content entries) reduce to a serializable
* snapshot here and rebuild on the way out; see `query.ts`.
*
* On a miss or when the cache is disabled/bypassed, this is equivalent to
* `await load()`. Backend errors never propagate: a failing `get` is a miss, a
* failing `set` is dropped.
*/
async function cachedQuery(options) {
	return cachedQueryWithEpochs(options);
}
/**
* {@link cachedQuery} that also passes `onEpochs` the namespace epochs the read
* is checked against and stored under, in namespace order, before the cached
* value is returned or `load` runs. Not called when the cache is disabled or
* bypassed.
*
* @internal
*/
async function cachedQueryWithEpochs(options) {
	const backend = await getBackend();
	if (!backend || shouldBypass()) return options.load();
	const namespaces = typeof options.namespace === "string" ? [options.namespace] : options.namespace;
	const fullKey = valueKey(namespaces, options.key);
	const epochsPromise = Promise.all(namespaces.map((ns) => getEpoch(ns, backend)));
	const rawPromise = withTimeout(backend.get(fullKey), holder.config.timeout, "read").catch(() => null);
	const currentEpochs = await epochsPromise;
	options.onEpochs?.(currentEpochs);
	const raw = await rawPromise;
	if (raw !== null) {
		const decoded = decode(raw);
		if (decoded !== void 0) {
			const envelope = decoded;
			if (epochsMatch(envelope.e, currentEpochs)) return envelope.v;
		}
	}
	const value = await options.load();
	if (options.cacheable ? options.cacheable(value) : true) {
		const ttl = options.ttl ?? holder.config.defaultTtl;
		after(async () => {
			try {
				const encoded = encode({
					e: currentEpochs,
					v: value
				});
				await backend.set(fullKey, encoded, ttl);
			} catch (error) {
				if (Object.assign({
					"ASSETS_PREFIX": void 0,
					"BASE_URL": "/",
					"DEV": false,
					"MODE": "production",
					"PROD": true,
					"SITE": void 0,
					"SSR": true
				}, { _: "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/.bin/astro" })?.DEV) console.warn("[object-cache] set failed:", error);
			}
		});
	}
	return value;
}
/** Whether object-cache reads are active for the current request. */
async function isObjectCacheActive() {
	return await getBackend() !== null && !shouldBypass();
}
/**
* Stamp the isolate-local + backend "last content write" marker when a
* content collection namespace is invalidated. Used by DB adapters (Hyperdrive)
* to briefly prefer uncached SQL after a publish so edge/object caches are not
* reseeded from a stale query-cache hit.
*/
function stampLastContentWrite() {
	const stamp = Math.max(lastContentWrite.value + 1, Date.now());
	lastContentWrite.value = stamp;
	lastContentWrite.at = stamp;
	lastContentWrite.promise = void 0;
	lastContentWrite.promiseAt = void 0;
	scheduleBackendWrite("last-content-write", persistLastContentWrite);
}
function persistLastContentWrite() {
	if (contentWritePersist.pending) return;
	contentWritePersist.pending = true;
	after(async () => {
		contentWritePersist.pending = false;
		try {
			const backend = await getBackend();
			if (!backend) return;
			const latest = lastContentWrite.value;
			await backend.set(lastContentWriteKey(), String(latest));
		} catch (error) {
			console.error("[object-cache] last-content-write stamp failed:", error);
		}
	});
}
/**
* ms-epoch of the last content-namespace invalidation (`content:*`), or `0`
* if unknown. Returns `max(local, backend)` so a warm isolate that just
* published is immediately correct, and cold isolates learn within their
* `revalidate` window after another isolate stamped the backend.
*/
async function getLastContentWriteAt() {
	const local = lastContentWrite.value;
	const now = Date.now();
	if (now - lastContentWrite.at < holder.config.revalidate) return local;
	const backend = await getBackend();
	if (!backend) return local;
	if (lastContentWrite.promise) {
		const age = now - (lastContentWrite.promiseAt ?? 0);
		const deadline = epochReadDeadline();
		if (age < deadline) return raceInFlightEpochRead(lastContentWrite.promise, deadline - age, local);
	}
	const promise = (async () => {
		let value;
		try {
			const raw = await withTimeout(backend.get(lastContentWriteKey()), holder.config.timeout, "last-content-write read");
			const parsed = raw === null ? 0 : Number(raw);
			value = Number.isFinite(parsed) ? parsed : 0;
		} catch {
			value = lastContentWrite.value;
		}
		const merged = Math.max(value, lastContentWrite.value);
		lastContentWrite.value = merged;
		lastContentWrite.at = Date.now();
		lastContentWrite.promise = void 0;
		lastContentWrite.promiseAt = void 0;
		return merged;
	})();
	after(() => promise.then(() => void 0, () => void 0));
	lastContentWrite.promise = promise;
	lastContentWrite.promiseAt = now;
	return promise;
}
function invalidateObjectCache(namespace, options) {
	const deferred = invalidationScopes.getStore();
	if (deferred && !deferred.closed) {
		deferred.namespaces.add(namespace);
		return options?.waitForPersist ? Promise.resolve() : void 0;
	}
	const prev = epochCache.get(namespace)?.value ?? 0;
	const stamp = Math.max(prev + 1, Date.now());
	epochCache.set(namespace, {
		value: stamp,
		at: stamp
	});
	if (isContentNamespace(namespace)) stampLastContentWrite();
	if (options?.waitForPersist) {
		writeScopes.getStore()?.held.delete(`epoch:${namespace}`);
		return persistEpoch(namespace, stamp);
	}
	scheduleBackendWrite(`epoch:${namespace}`, () => {
		persistEpoch(namespace, stamp);
	});
}
function persistEpoch(namespace, stamp) {
	const pending = pendingBumps.get(namespace);
	if (pending) return pending;
	const covered = isCoveredByMarker(namespace);
	if (covered && markerWrite.epochWritesInFlight++ === 0) markerWrite.busySince = Date.now();
	let backend = null;
	const write = async () => {
		pendingBumps.delete(namespace);
		try {
			backend = await getBackend();
			if (!backend) return;
			const latest = epochCache.get(namespace)?.value ?? stamp;
			await withTimeout(backend.set(epochKey(namespace), String(latest)), holder.config.timeout, "epoch write");
		} catch (error) {
			console.error("[object-cache] epoch bump failed for", namespace, error);
		}
	};
	const task = Promise.resolve().then(write);
	pendingBumps.set(namespace, task);
	after(async () => {
		await task;
		if (covered) {
			markerWrite.epochWritesInFlight--;
			if (backend) markerWrite.writtenSinceMarker = true;
			const sinceMarker = Date.now() - Math.max(markerWrite.busySince, markerWrite.lastWriteAt);
			if (backend && markerWrite.writtenSinceMarker && (markerWrite.epochWritesInFlight === 0 || sinceMarker >= MARKER_RETRY_MS)) await writeChangeMarker(backend);
		}
	});
	return task;
}
/**
* Rewrite the change marker. Runs after epoch writes settle, whether they
* succeeded or not. If the marker lands before an epoch, the settle check
* covers it: no epoch read within `MARKER_SETTLE_MS` of the marker's write is
* vouched for, so isolates keep re-reading until they see the new epoch.
*/
async function writeChangeMarker(backend) {
	markerWrite.lastWriteAt = Date.now();
	markerWrite.writtenSinceMarker = false;
	const write = () => backend.set(changeMarkerKey(), `${Date.now()}.${crypto.randomUUID()}`);
	try {
		await write();
	} catch {
		try {
			await new Promise((resolve) => setTimeout(resolve, MARKER_RETRY_MS));
			await write();
		} catch (error) {
			markerWrite.writtenSinceMarker = true;
			console.error("[object-cache] change marker write failed:", error);
		}
	}
}
function scheduleBackendWrite(key, write) {
	const scope = writeScopes.getStore();
	if (scope && !scope.closed) {
		scope.held.set(key, write);
		return;
	}
	write();
}
/**
* Run a bulk write, such as applying a seed, with its backend epoch writes held
* until it settles. Invalidations inside `fn` still stamp the local epochs
* immediately; the backend then receives one write per namespace, carrying the
* latest epoch, whether `fn` resolves or throws. Without this, every entry
* rewrites the same few keys, and KV accepts about one write per second per key.
*
* Other isolates see none of these invalidations until `fn` ends, so don't wrap
* work that purges edge-cached pages part-way through: a page rebuilt after
* such a purge would still read the old epoch. If the invocation is killed
* before `fn` settles, the held writes are lost with it, and other isolates
* keep their cached values until those expire.
*/
async function coalesceObjectCacheWrites(fn) {
	const scope = {
		held: /* @__PURE__ */ new Map(),
		closed: false
	};
	try {
		return await writeScopes.run(scope, fn);
	} finally {
		scope.closed = true;
		for (const write of scope.held.values()) write();
	}
}
/**
* Run a database transaction with its invalidations held until it settles.
*
* A bump inside the transaction would land before its writes are visible to
* other connections: a concurrent read would capture the new epoch, load the
* uncommitted (old) rows and cache them under that epoch, where they stay a
* HIT until the next write or the TTL. Bumping once `fn` settles orphans
* anything read while it ran. Nested scopes join the outermost one.
*/
async function deferObjectCacheInvalidations(fn) {
	const outer = invalidationScopes.getStore();
	if (outer && !outer.closed) return fn();
	const scope = {
		namespaces: /* @__PURE__ */ new Set(),
		closed: false
	};
	try {
		return await invalidationScopes.run(scope, fn);
	} finally {
		scope.closed = true;
		for (const namespace of scope.namespaces) invalidateObjectCache(namespace);
	}
}
/**
* Fixed namespaces for data shared across collections. Content reads fold the
* `BYLINES` and `TAXONOMIES` epochs into their keys (via {@link cachedQuery})
* because entries hydrate byline and taxonomy-term data — so renaming an
* author or a category correctly invalidates every cached entry that displays
* it, without tracking which collections reference it.
*/
var CacheNamespace = {
	SETTINGS: "settings",
	MENUS: "menus",
	TAXONOMIES: "taxonomies",
	BYLINES: "bylines",
	SCHEMA: "schema",
	COMMENTS: "comments",
	WIDGETS: "widgets"
};
/** Namespace for a content collection's cached queries. */
function contentNamespace(collection) {
	return `content:v2:${collection}`;
}
function legacyContentNamespace(collection) {
	return `content:${collection}`;
}
/**
* Content epochs carried by current cache entries. The versioned namespace
* makes snapshots written before the current cache format unreachable.
*/
function contentCacheNamespaces(collection) {
	return [contentNamespace(collection)];
}
function contentInvalidationNamespaces(collection) {
	return [contentNamespace(collection), legacyContentNamespace(collection)];
}
/**
* Namespaces a content read depends on: the collection itself plus the shared
* byline/taxonomy data folded into each entry.
*/
function contentNamespaces(collection) {
	return [
		...contentCacheNamespaces(collection),
		CacheNamespace.BYLINES,
		CacheNamespace.TAXONOMIES
	];
}
/**
* Invalidate all cached reads (list + entry) for a content collection.
* Call from every write path that mutates rows in `ec_<collection>`.
*/
function invalidateCollectionCache(collection) {
	for (const namespace of contentInvalidationNamespaces(collection)) invalidateObjectCache(namespace);
}
/** Invalidate cached taxonomy definitions/terms and all content that hydrates them. */
function invalidateTaxonomyObjectCache() {
	invalidateObjectCache(CacheNamespace.TAXONOMIES);
}
/** Invalidate cached bylines and all content that hydrates them. */
function invalidateBylineObjectCache() {
	invalidateObjectCache(CacheNamespace.BYLINES);
}
/** Invalidate cached navigation menus. */
function invalidateMenuObjectCache() {
	invalidateObjectCache(CacheNamespace.MENUS);
}
function invalidateWidgetObjectCache(options) {
	if (options?.waitForPersist) return invalidateObjectCache(CacheNamespace.WIDGETS, options);
	invalidateObjectCache(CacheNamespace.WIDGETS);
}
/** Invalidate cached collection schema/metadata reads (e.g. getCollectionInfo). */
function invalidateSchemaObjectCache() {
	invalidateObjectCache(CacheNamespace.SCHEMA);
}
/** Invalidate cached public comment reads. */
function invalidateCommentObjectCache() {
	invalidateObjectCache(CacheNamespace.COMMENTS);
}
export { isObjectCacheActive as _, contentCacheNamespaces as a, getLastContentWriteAt as c, invalidateCommentObjectCache as d, invalidateMenuObjectCache as f, invalidateWidgetObjectCache as g, invalidateTaxonomyObjectCache as h, coalesceObjectCacheWrites as i, invalidateBylineObjectCache as l, invalidateSchemaObjectCache as m, cachedQuery as n, contentNamespaces as o, invalidateObjectCache as p, cachedQueryWithEpochs as r, deferObjectCacheInvalidations as s, CacheNamespace as t, invalidateCollectionCache as u };
