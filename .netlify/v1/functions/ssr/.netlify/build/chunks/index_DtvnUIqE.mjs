import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as handleRelationCreate, c as handleRelationList } from "./relations-5fVj42fZ_Cw6otGYO.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { et as relationListQuery, z as createRelationBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/relations/index.mjs
var relations_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), relationListQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleRelationList(emdash.db, { collection: query.collection }));
	} catch (error) {
		return handleError(error, "Failed to list relations", "RELATION_LIST_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, createRelationBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleRelationCreate(emdash.db, body), 201);
	} catch (error) {
		return handleError(error, "Failed to create relation", "RELATION_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/relations/index@_@mjs
var page = () => relations_exports;
export { page };
