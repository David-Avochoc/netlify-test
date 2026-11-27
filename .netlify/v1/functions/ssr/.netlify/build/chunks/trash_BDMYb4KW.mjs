import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { P as contentTrashQuery } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs
var trash_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	if (!emdash?.handleContentListTrashed) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	const query = parseQuery(url, contentTrashQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await emdash.handleContentListTrashed(collection, query));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/trash@_@mjs
var page = () => trash_exports;
export { page };
