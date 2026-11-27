import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as mapErrorStatus } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { T as contentPublishBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { a as requireOwnerPerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { t as claimEntryLockForWrite } from "./entry-lock-GKD0lJI5_CTe_5RRm.mjs";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs
var publish_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false,
	publishContent: () => publishContent
});
async function publishContent({ params, request, locals, url, cache }, originSource) {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	if (!emdash?.handleContentPublish || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const body = await parseOptionalBody(request, contentPublishBody, {});
	if (isParseError(body)) return body;
	const locale = url.searchParams.get("locale") || void 0;
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const existingItem = existing.data.item;
	const denied = requireOwnerPerm(user, existingItem.authorId ?? "", "content:publish_own", "content:publish_any");
	if (denied) return denied;
	const publishedAt = body?.publishedAt;
	if (publishedAt !== void 0 && !hasPermission(user, "content:publish_any")) return apiError("FORBIDDEN", "Setting publishedAt requires content:publish_any permission", 403);
	const resolvedId = existingItem.id;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, resolvedId, user.id, { override: body?.overrideLock });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	const result = await emdash.handleContentPublish(collection, resolvedId, {
		publishedAt,
		_rev: body?._rev,
		actor: {
			id: user.id,
			role: user.role
		},
		origin: { source: originSource }
	});
	if (!result.success) return unwrapResult(result);
	await invalidateRouteCache(cache, [collection, resolvedId]);
	return unwrapResult(result);
}
var POST = (context) => publishContent(context, "api");
export { publish_exports as n, publishContent as t };
