import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as handleMediaFolderList, t as handleMediaFolderCreate } from "./media-folders-Lc9Ks8az_iqlsKl2x.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { c as mediaFolderBody, u as mediaFolderListQuery } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/folders/index.mjs
var folders_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:read");
	if (denied) return denied;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), mediaFolderListQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await handleMediaFolderList(emdash.db, {
		limit: query.limit,
		cursor: query.cursor,
		q: query.q
	}));
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:edit_any");
	if (denied) return denied;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const body = await parseBody(request, mediaFolderBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleMediaFolderCreate(emdash.db, body), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/folders/index@_@mjs
var page = () => folders_exports;
export { page };
