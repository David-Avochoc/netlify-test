import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { l as resolveConfiguredLocale } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { t as ContentRepository } from "./content-2gjSbGP3_DRBiG6uA.mjs";
import { n as roomId } from "./types-D2zSjG0c_DDfeE_GP.mjs";
import { i as EmDashValidationError } from "./types-BBH-w_KS_DiGw3TjO.mjs";
import { n as RevisionRepository } from "./revision-Dk9VI8Vf_CW3Z7_ck.mjs";
import { t as EntryLockRepository } from "./entry-locks-B58Q9LZh_hJO7gH4L.mjs";
import { n as encodeRev } from "./rev-B6HS7337_Ku3QmQc2.mjs";
import { t as ErrorCode } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { n as entryEditAccess } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as entryLockedBy } from "./entry-lock-GKD0lJI5_CTe_5RRm.mjs";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/rooms-C08U-F8Y.mjs
/**
* Co-editing room handlers: joining an entry's room, and recovery revisions.
*/
var LOG = "[co-editing]";
function failure(code, message) {
	return {
		success: false,
		error: {
			code,
			message
		}
	};
}
var singleEditor = () => ({
	success: true,
	data: { mode: "single-editor" }
});
var roomBusy = () => failure(ErrorCode.ROOM_BUSY, "The entry's room isn't available here right now. Join again soon.");
/** The join route's own path, where the client opens its socket. */
function roomUrl(basePath, collection, entryId) {
	return `${basePath}/_emdash/api/content/${encodeURIComponent(collection)}/${encodeURIComponent(entryId)}/room`;
}
function findEntry(db, input, options) {
	const repo = new ContentRepository(db);
	const locale = input.locale ? resolveConfiguredLocale(input.locale) : void 0;
	return options.includeTrashed ? repo.findByIdOrSlugIncludingTrashed(input.collection, input.id, locale) : repo.findByIdOrSlug(input.collection, input.id, locale);
}
/**
* Joins the entry's room, or tells the client which mode to open in. `rooms` is null where
* co-editing is off or the host can't run rooms.
*/
async function handleRoomJoin(db, rooms, input) {
	try {
		const { user } = input;
		if (!user) return failure(ErrorCode.UNAUTHORIZED, "Authentication required");
		const first = await joinOnce(db, rooms, input, user);
		if (first !== "stale") return first;
		const second = await joinOnce(db, rooms, input, user);
		return second === "stale" ? roomBusy() : second;
	} catch (error) {
		if (isMissingTableError(error)) return failure(ErrorCode.NOT_FOUND, "Content item not found");
		console.error(`${LOG} join failed:`, error);
		return failure("ROOM_JOIN_ERROR", "Failed to join the room");
	}
}
async function joinOnce(db, rooms, input, user) {
	const entry = await findEntry(db, input, { includeTrashed: false });
	if (!entry) return failure(ErrorCode.NOT_FOUND, "Content item not found");
	if (!hasPermission(user, "content:read_drafts")) return failure(ErrorCode.FORBIDDEN, "Insufficient permissions");
	const room = roomId({
		collection: input.collection,
		id: entry.id
	});
	if (!rooms || input.playground) return singleEditor();
	const manifest = await input.getManifest();
	if (!manifest.collections[input.collection]?.supports.includes("revisions")) return singleEditor();
	if (input.body.singleEditor) {
		await rooms.forgetTokens(room, user.id);
		console.warn(`${LOG} ${room}: a client's sockets didn't open, so it edits in single-editor mode`);
		return singleEditor();
	}
	const locks = new EntryLockRepository(db);
	const lock = await locks.findLive(input.collection, entry.id);
	if (lock?.userId === user.id) return singleEditor();
	const editable = {
		authorId: entry.authorId ?? "",
		status: entry.status
	};
	const holder = lock ? await locks.findEnforceable(input.collection, entry.id) : null;
	if (holder && holder.userId !== user.id) {
		if (!input.body.takeover) {
			const refusal = entryLockedBy(holder);
			return {
				success: false,
				error: {
					code: refusal.code,
					message: refusal.message,
					details: { ...refusal.details }
				}
			};
		}
		if (!entryEditAccess(user, editable)) return failure(ErrorCode.FORBIDDEN, "Insufficient permissions");
	}
	const { version, commit, hash } = input.body.fingerprint;
	if (version !== manifest.version || commit !== manifest.commit || hash !== manifest.hash) return failure(ErrorCode.CLIENT_OUTDATED, "The admin is out of date. Reload it to keep editing.");
	const access = entryEditAccess(user, editable) ? "edit" : "view";
	const issued = await rooms.issueToken(room, {
		userId: user.id,
		name: user.name || user.email,
		access,
		fingerprint: {
			version,
			commit,
			hash
		},
		rev: encodeRev(entry),
		status: entry.status,
		authorId: entry.authorId
	});
	if (issued === "stale") return "stale";
	if (issued === "busy") return roomBusy();
	if (issued === "full") return {
		success: true,
		data: { mode: "read-only" }
	};
	if (issued === null) return singleEditor();
	if (holder && holder.userId !== user.id) await locks.releaseEntry(input.collection, entry.id);
	return {
		success: true,
		data: {
			mode: "room",
			url: roomUrl(input.basePath, input.collection, entry.id),
			token: issued.token,
			access
		}
	};
}
/**
* Stores a client's document as a recovery revision authored by the caller, for entries in Trash
* too. Checks edit access but not edit locks or fields, so content from before a schema change
* still saves, and moves neither the draft nor the live pointer.
*/
async function handleRecoveryRevisionCreate(db, input) {
	try {
		if (!input.user) return failure(ErrorCode.UNAUTHORIZED, "Authentication required");
		const entry = await findEntry(db, input, { includeTrashed: true });
		if (!entry) return failure(ErrorCode.NOT_FOUND, "Content item not found");
		if (!entryEditAccess(input.user, {
			authorId: entry.authorId ?? "",
			status: entry.status
		})) return failure(ErrorCode.FORBIDDEN, "Insufficient permissions");
		return {
			success: true,
			data: { id: (await new RevisionRepository(db).create({
				collection: input.collection,
				entryId: entry.id,
				data: {
					...input.data,
					_slug: input.slug
				},
				authorId: input.user.id,
				kind: "recovery"
			})).id }
		};
	} catch (error) {
		if (isMissingTableError(error)) return failure(ErrorCode.NOT_FOUND, "Content item not found");
		if (error instanceof EmDashValidationError) return failure(ErrorCode.VALIDATION_ERROR, error.message);
		console.error(`${LOG} recovery revision failed:`, error);
		return failure("RECOVERY_REVISION_ERROR", "Failed to save the recovery revision");
	}
}
export { handleRoomJoin as n, handleRecoveryRevisionCreate as t };
