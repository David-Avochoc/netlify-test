import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as mapErrorStatus } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as unwrapResult, n as apiSuccess, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { F as contentUpdateBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as saveContent } from "./content-save-BKDTKmkx_YSPUOBA2.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { t as claimEntryLockForWrite } from "./entry-lock-GKD0lJI5_CTe_5RRm.mjs";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	const collection = params.collection;
	const id = params.id;
	const locale = url.searchParams.get("locale") || void 0;
	const result = await emdash.handleContentGet(collection, id, locale, { includeDrafts: hasPermission(user, "content:read_drafts") });
	if (result.success && !hasPermission(user, "content:read_drafts")) {
		const { liveData, draftRevisionId: _draftRevisionId, ...item } = result.data.item;
		if (item.status !== "published") return apiError("NOT_FOUND", `Content item not found: ${id}`, 404);
		return apiSuccess({
			...result.data,
			item: {
				...item,
				data: liveData ?? item.data
			}
		});
	}
	return unwrapResult(result);
};
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	const locale = new URL(request.url).searchParams.get("locale") || void 0;
	const body = await parseBody(request, contentUpdateBody);
	if (isParseError(body)) return body;
	if (!emdash?.handleContentUpdate || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const { overrideLock, ...saveBody } = body;
	let resolvedId = id;
	const result = await saveContent(emdash, {
		collection,
		id,
		locale,
		user,
		body: saveBody,
		beforeWrite: async (entryId) => {
			resolvedId = entryId;
			const refusal = await claimEntryLockForWrite(emdash.db, collection, entryId, user.id, { override: overrideLock });
			return refusal && {
				code: refusal.code,
				message: refusal.message,
				details: { ...refusal.details }
			};
		}
	});
	if (!result.success) return unwrapResult(result);
	if (result.liveContentChanged !== false) await invalidateRouteCache(cache, [collection, resolvedId]);
	return unwrapResult(result);
};
var DELETE = async ({ params, locals, url, cache }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	if (!emdash?.handleContentDelete || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const locale = url.searchParams.get("locale") || void 0;
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const deleteItem = existing.data.item;
	const deleteDenied = requireOwnerPerm(user, deleteItem.authorId ?? "", "content:delete_own", "content:delete_any");
	if (deleteDenied) return deleteDenied;
	const resolvedId = deleteItem.id;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, resolvedId, user.id, { override: url.searchParams.get("overrideLock") === "true" });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	const result = await emdash.handleContentDelete(collection, resolvedId, { actor: {
		id: user.id,
		role: user.role
	} });
	if (!result.success) return unwrapResult(result);
	await invalidateRouteCache(cache, [collection, resolvedId]);
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_@_@mjs
var page = () => _id__exports;
export { page };
