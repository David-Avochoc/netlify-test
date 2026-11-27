import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as mapErrorStatus } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { G as entryLockAcquireBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { i as requireEntryEditPerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { a as handleEntryLockRelease, i as handleEntryLockRead, r as handleEntryLockAcquire } from "./entry-lock-GKD0lJI5_CTe_5RRm.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock.mjs
var lock_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* Resolves the entry the way every other single-entry route does, and applies
* the same edit permission, since holding a lock is the prelude to a write.
*/
async function resolveEntry(locals, collection, id, locale) {
	const { emdash, user } = locals;
	if (!emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const existingItem = existing.data.item;
	const denied = requireEntryEditPerm(user, {
		authorId: existingItem.authorId ?? "",
		status: existingItem.status
	});
	if (denied) return denied;
	return {
		emdash,
		resolvedId: existingItem.id,
		userId: user.id
	};
}
var GET = async ({ params, locals, url }) => {
	const collection = params.collection;
	const resolved = await resolveEntry(locals, collection, params.id, url.searchParams.get("locale") || void 0);
	if (resolved instanceof Response) return resolved;
	return unwrapResult(await handleEntryLockRead(resolved.emdash.db, collection, resolved.resolvedId, resolved.userId, { rooms: resolved.emdash.rooms }));
};
var POST = async ({ params, request, locals, url }) => {
	const collection = params.collection;
	const id = params.id;
	const body = await parseOptionalBody(request, entryLockAcquireBody, {});
	if (isParseError(body)) return body;
	const resolved = await resolveEntry(locals, collection, id, url.searchParams.get("locale") || void 0);
	if (resolved instanceof Response) return resolved;
	return unwrapResult(await handleEntryLockAcquire(resolved.emdash.db, collection, resolved.resolvedId, resolved.userId, {
		takeover: body?.takeover,
		token: body?.token,
		rooms: resolved.emdash.rooms
	}));
};
var DELETE = async ({ params, locals, url }) => {
	const collection = params.collection;
	const resolved = await resolveEntry(locals, collection, params.id, url.searchParams.get("locale") || void 0);
	if (resolved instanceof Response) return resolved;
	return unwrapResult(await handleEntryLockRelease(resolved.emdash.db, collection, resolved.resolvedId, resolved.userId, { token: url.searchParams.get("token") ?? void 0 }));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock@_@mjs
var page = () => lock_exports;
export { page };
