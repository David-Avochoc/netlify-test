import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as handleMediaUsageCollectionDeletionRetry } from "./media-usage-work-CxqS_Ny9_A-c4xmSh.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { I as mediaUsageCollectionDeletionRetryBody } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry.mjs
var retry_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	if (!locals.emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(locals.user, "schema:manage");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	const body = await parseBody(request, mediaUsageCollectionDeletionRetryBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleMediaUsageCollectionDeletionRetry(locals.emdash.db, body));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry@_@mjs
var page = () => retry_exports;
export { page };
