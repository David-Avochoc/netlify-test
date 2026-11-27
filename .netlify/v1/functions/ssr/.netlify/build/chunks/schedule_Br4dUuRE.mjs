import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as mapErrorStatus } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { k as contentScheduleBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { a as requireOwnerPerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { t as claimEntryLockForWrite } from "./entry-lock-GKD0lJI5_CTe_5RRm.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs
var schedule_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	POST: () => POST,
	prerender: () => false
});
/**
* Extract author ID from a content item response (shared by POST and DELETE).
*/
function extractOwnership(data) {
	const obj = data && typeof data === "object" ? data : void 0;
	const item = obj?.item && typeof obj.item === "object" ? obj.item : obj;
	return {
		authorId: typeof item?.authorId === "string" ? item.authorId : "",
		resolvedId: typeof item?.id === "string" ? item.id : void 0
	};
}
var POST = async ({ params, request, locals, url, cache }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	const body = await parseBody(request, contentScheduleBody);
	if (isParseError(body)) return body;
	if (!emdash?.handleContentSchedule || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const locale = url.searchParams.get("locale") || void 0;
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const { authorId, resolvedId } = extractOwnership(existing.data);
	const denied = requireOwnerPerm(user, authorId, "content:publish_own", "content:publish_any");
	if (denied) return denied;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, resolvedId ?? id, user.id, { override: body.overrideLock });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	const result = await emdash.handleContentSchedule(collection, resolvedId ?? id, body.scheduledAt, {
		_rev: body._rev,
		actor: {
			id: user.id,
			role: user.role
		},
		origin: { source: "api" }
	});
	if (!result.success) return unwrapResult(result);
	await invalidateRouteCache(cache, [collection, resolvedId ?? id]);
	return unwrapResult(result);
};
var DELETE = async ({ params, locals, url, cache }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	if (!emdash?.handleContentUnschedule || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const locale = url.searchParams.get("locale") || void 0;
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const { authorId, resolvedId } = extractOwnership(existing.data);
	const denied = requireOwnerPerm(user, authorId, "content:publish_own", "content:publish_any");
	if (denied) return denied;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, resolvedId ?? id, user.id, { override: url.searchParams.get("overrideLock") === "true" });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	const result = await emdash.handleContentUnschedule(collection, resolvedId ?? id, { actor: {
		id: user.id,
		role: user.role
	} });
	if (!result.success) return unwrapResult(result);
	await invalidateRouteCache(cache, [collection, resolvedId ?? id]);
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule@_@mjs
var page = () => schedule_exports;
export { page };
