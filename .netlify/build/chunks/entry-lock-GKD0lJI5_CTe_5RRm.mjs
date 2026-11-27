import { n as roomId } from "./types-D2zSjG0c_DDfeE_GP.mjs";
import { t as EntryLockRepository } from "./entry-locks-B58Q9LZh_hJO7gH4L.mjs";
import { t as ErrorCode } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { ulid } from "ulidx";
// node_modules/emdash/dist/entry-lock-GKD0lJI5.mjs
/**
* How long an entry stays locked without a heartbeat or save. Long enough to
* survive a pause in typing, short enough that a closed tab frees the entry
* within a coffee break.
*/
var ENTRY_LOCK_LEASE_MS = 42e4;
var ENTRY_LOCK_LEASE_SECONDS = ENTRY_LOCK_LEASE_MS / 1e3;
function toHolder(lock) {
	return {
		userId: lock.userId,
		userName: lock.userName,
		acquiredAt: lock.acquiredAt,
		expiresAt: lock.expiresAt
	};
}
function holderLabel(holder) {
	return holder.userName?.trim() ? holder.userName : "Another editor";
}
/** The refusal a write gets while `lock` holds the entry. */
function entryLockedBy(lock) {
	const details = toHolder(lock);
	return {
		code: ErrorCode.ENTRY_LOCKED,
		message: `${holderLabel(details)} is holding this entry`,
		details
	};
}
/**
* An open room reports a holder of its own, so single-editor tabs, which treat any holder as
* taken, open read-only, and keep their heartbeat because locking reads as enabled.
*/
function roomStatus() {
	const now = Date.now();
	return {
		enabled: true,
		holder: {
			userId: "",
			userName: null,
			acquiredAt: new Date(now).toISOString(),
			expiresAt: new Date(now + ENTRY_LOCK_LEASE_MS).toISOString()
		},
		heldByCaller: false,
		room: true
	};
}
async function isRoomOpen(options, collection, entryId) {
	return await options.rooms?.isOpen(roomId({
		collection,
		id: entryId
	})) ?? false;
}
async function isLockingEnabled(db, collection) {
	const row = await db.selectFrom("_emdash_collections").select("edit_locking").where("slug", "=", collection).executeTakeFirst();
	if (!row) return null;
	return row.edit_locking !== 0;
}
function collectionNotFound(collection) {
	return {
		success: false,
		error: {
			code: ErrorCode.COLLECTION_NOT_FOUND,
			message: `Collection '${collection}' not found`
		}
	};
}
/**
* Takes the entry's lock for `userId`, or reports who is holding it. A
* take-over is only granted when the caller asks for one. While a room is
* open, deletes every lock on the entry and grants none.
*/
async function handleEntryLockAcquire(db, collection, entryId, userId, options = {}) {
	try {
		if (await isRoomOpen(options, collection, entryId)) {
			await new EntryLockRepository(db).releaseEntry(collection, entryId);
			return {
				success: true,
				data: roomStatus()
			};
		}
		const enabled = await isLockingEnabled(db, collection);
		if (enabled === null) return collectionNotFound(collection);
		if (!enabled) return {
			success: true,
			data: {
				enabled: false,
				holder: null,
				heldByCaller: false,
				room: false
			}
		};
		const claim = await new EntryLockRepository(db).acquire({
			collection,
			entryId,
			userId,
			token: options.token ?? ulid(),
			leaseSeconds: ENTRY_LOCK_LEASE_SECONDS,
			takeover: options.takeover
		});
		return {
			success: true,
			data: {
				enabled: true,
				holder: toHolder(claim.lock),
				heldByCaller: claim.outcome === "acquired",
				room: false
			}
		};
	} catch (error) {
		console.error("[entry-lock] acquire failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.ENTRY_LOCK_ERROR,
				message: "Failed to acquire the entry lock"
			}
		};
	}
}
async function handleEntryLockRead(db, collection, entryId, userId, options = {}) {
	try {
		if (await isRoomOpen(options, collection, entryId)) return {
			success: true,
			data: roomStatus()
		};
		const enabled = await isLockingEnabled(db, collection);
		if (enabled === null) return collectionNotFound(collection);
		if (!enabled) return {
			success: true,
			data: {
				enabled: false,
				holder: null,
				heldByCaller: false,
				room: false
			}
		};
		const lock = await new EntryLockRepository(db).findLive(collection, entryId);
		return {
			success: true,
			data: {
				enabled: true,
				holder: lock ? toHolder(lock) : null,
				heldByCaller: lock?.userId === userId,
				room: false
			}
		};
	} catch (error) {
		console.error("[entry-lock] read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.ENTRY_LOCK_ERROR,
				message: "Failed to read the entry lock"
			}
		};
	}
}
async function handleEntryLockRelease(db, collection, entryId, userId, options = {}) {
	try {
		return {
			success: true,
			data: { released: await new EntryLockRepository(db).release({
				collection,
				entryId,
				userId,
				token: options.token
			}) }
		};
	} catch (error) {
		console.error("[entry-lock] release failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.ENTRY_LOCK_ERROR,
				message: "Failed to release the entry lock"
			}
		};
	}
}
/**
* Decides whether a write may proceed, and keeps the caller's own lease alive
* while it does. Resolves to `null` when the write is allowed.
*
* A write never takes a lock it was not given, so a CLI or API caller writing
* an unlocked entry leaves it unlocked.
*/
async function claimEntryLockForWrite(db, collection, entryId, userId, options = {}) {
	if (options.override === true) return null;
	const repo = new EntryLockRepository(db);
	if (await repo.refreshHeld({
		collection,
		entryId,
		userId,
		leaseSeconds: ENTRY_LOCK_LEASE_SECONDS
	})) return null;
	const holder = await repo.findEnforceable(collection, entryId);
	return holder ? entryLockedBy(holder) : null;
}
export { handleEntryLockRelease as a, handleEntryLockRead as i, entryLockedBy as n, handleEntryLockAcquire as r, claimEntryLockForWrite as t };
