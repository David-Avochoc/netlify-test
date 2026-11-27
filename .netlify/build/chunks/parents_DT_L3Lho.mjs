import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as handleReferenceParentsGet } from "./relations-5fVj42fZ_Cw6otGYO.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { r as cursorPaginationQuery } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents.mjs
var parents_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { collection, id, relation } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	if (!collection || !id || !relation) return apiError("VALIDATION_ERROR", "Collection, id, and relation required", 400);
	const query = parseQuery(new URL(request.url), cursorPaginationQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleReferenceParentsGet(emdash.db, collection, id, relation, {
			limit: query.limit,
			cursor: query.cursor
		}, hasPermission(user, "content:read_drafts")));
	} catch (error) {
		return handleError(error, "Failed to get references", "REFERENCES_GET_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents@_@mjs
var page = () => parents_exports;
export { page };
