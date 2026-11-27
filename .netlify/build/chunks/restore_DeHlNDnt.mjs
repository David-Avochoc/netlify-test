import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as mapErrorStatus } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { rt as revisionRestoreBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { a as requireOwnerPerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as claimEntryLockForWrite } from "./entry-lock-GKD0lJI5_CTe_5RRm.mjs";
// node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs
var restore_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const revisionId = params.revisionId;
	const body = await parseOptionalBody(request, revisionRestoreBody, {});
	if (isParseError(body)) return body;
	if (!emdash?.handleRevisionRestore || !emdash?.handleRevisionGet || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const revision = await emdash.handleRevisionGet(revisionId);
	if (!revision.success) return apiError(revision.error?.code ?? "UNKNOWN_ERROR", revision.error?.message ?? "Revision not found", mapErrorStatus(revision.error?.code));
	const collection = revision.data?.item?.collection;
	const entryId = revision.data?.item?.entryId;
	if (!collection || !entryId) return apiError("INVALID_REVISION", "Revision is missing collection or entry reference", 400);
	const existing = await emdash.handleContentGet(collection, entryId);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Content not found", mapErrorStatus(existing.error?.code));
	const denied = requireOwnerPerm(user, existing.data?.item?.authorId ?? "", "content:edit_own", "content:edit_any");
	if (denied) return denied;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, entryId, user.id, { override: body.overrideLock });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	return unwrapResult(await emdash.handleRevisionRestore(revisionId, user.id, user.role));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore@_@mjs
var page = () => restore_exports;
export { page };
