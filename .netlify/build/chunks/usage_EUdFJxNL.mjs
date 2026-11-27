import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as handleMediaUsageDetails } from "./media-usage-D6LjfdGn_BMfzBBVJ.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { R as mediaUsageDetailsQuery } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as requireScope } from "./scopes-CHc86VzZ_BKaBLkVk.mjs";
// node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs
var usage_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const mediaDenied = requirePerm(user, "media:read");
	if (mediaDenied) return mediaDenied;
	const contentDenied = requirePerm(user, "content:read_drafts");
	if (contentDenied) return contentDenied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	const { id } = params;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), mediaUsageDetailsQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await handleMediaUsageDetails(emdash.db, id, query));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/usage@_@mjs
var page = () => usage_exports;
export { page };
