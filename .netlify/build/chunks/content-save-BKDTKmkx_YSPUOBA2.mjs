import { n as assertSiteWriteAllowed, t as SiteWriteBlockedError } from "./fence-CkdbSoZX_DNtaDXEC.mjs";
import { n as entryEditAccess } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/content-save-BKDTKmkx.mjs
/**
* The content save steps: the edit check, an optional lock check, an optional
* site-write fence, and the runtime update. The content `PUT` route saves
* through them, and so does any other caller that saves as a user.
*/
function failure(code, message) {
	return {
		success: false,
		error: {
			code,
			message
		}
	};
}
/**
* Save an entry as `input.user`, with the checks the content `PUT` makes.
*
* - `user` must be the actor's current, enabled account. A caller whose actor
*   was deleted or disabled treats the save as `FORBIDDEN` instead of calling
*   this.
* - Send `data` with every save, `{}` when only the slug changes. A body
*   without `data` or `references` skips draft staging and writes the live
*   slug.
* - `saved` is present only when the save staged a draft revision and wrote no
*   live metadata. Take the write's `_rev` and stored values from it: reading
*   the entry again can pick up another write.
* - Nothing here purges route caches. `liveContentChanged: false` means the
*   save changed no live content.
*/
async function saveContent(site, input) {
	const { collection, locale, body } = input;
	const grant = await checkEditAccess(site, input);
	if ("code" in grant) return failure(grant.code, grant.message);
	const { user, access, checkedRev } = grant;
	const rev = access === "draft" ? body._rev ?? checkedRev : body._rev;
	if (body.publishedAt !== void 0 && !hasPermission(user, "content:publish_any")) return failure("FORBIDDEN", "Writing publishedAt requires content:publish_any permission");
	const resolvedId = grant.entryId;
	const refusal = await input.beforeWrite?.(resolvedId);
	if (refusal) return {
		success: false,
		error: refusal
	};
	let recordWrite;
	if (input.fence) {
		const fenced = await applyFence(site.db);
		if (typeof fenced !== "function") return failure(fenced.code, fenced.message);
		recordWrite = fenced;
	}
	const writeBody = body.authorId !== void 0 && hasPermission(user, "content:edit_any") ? body : {
		...body,
		authorId: void 0
	};
	const result = await site.handleContentUpdate(collection, resolvedId, {
		...writeBody,
		locale,
		_rev: rev,
		actor: {
			id: user.id,
			role: user.role
		},
		editedBy: input.editedBy
	});
	if (result.success) await recordWrite?.();
	return result;
}
/**
* The values a fresh read gives an entry: its live values under the draft revision's, without
* `_` keys, and the draft's staged slug, or else the live slug.
*/
function overlayDraft(live, draft) {
	if (!draft) return {
		data: { ...live.data },
		slug: live.slug
	};
	return {
		data: {
			...live.data,
			...Object.fromEntries(Object.entries(draft).filter(([key]) => !key.startsWith("_")))
		},
		slug: typeof draft._slug === "string" ? draft._slug : live.slug
	};
}
/** The checks a save makes before anything else: the entry exists and the user may edit it. */
async function checkEditAccess(site, input) {
	const { collection, id, locale, user } = input;
	const existing = await site.handleContentGet(collection, id, locale);
	if (!existing.success) return {
		code: existing.error?.code ?? "UNKNOWN_ERROR",
		message: existing.error?.message ?? "Unknown error"
	};
	const existingData = existing.data && typeof existing.data === "object" ? existing.data : void 0;
	const existingItem = existingData?.item && typeof existingData.item === "object" ? existingData.item : existingData;
	const entry = {
		authorId: typeof existingItem?.authorId === "string" ? existingItem.authorId : "",
		status: existingItem?.status
	};
	if (!user) return {
		code: "UNAUTHORIZED",
		message: "Authentication required"
	};
	const access = entryEditAccess(user, entry);
	if (!access) return {
		code: "FORBIDDEN",
		message: "Insufficient permissions"
	};
	return {
		user,
		entryId: typeof existingItem?.id === "string" ? existingItem.id : id,
		access,
		checkedRev: typeof existingData?._rev === "string" ? existingData._rev : void 0
	};
}
/** Applies the site-write fence: the refusal, or the function that records the write. */
async function applyFence(db) {
	try {
		return await assertSiteWriteAllowed(db);
	} catch (error) {
		if (error instanceof SiteWriteBlockedError) return {
			code: error.code,
			message: error.message
		};
		throw error;
	}
}
export { saveContent as n, overlayDraft as t };
