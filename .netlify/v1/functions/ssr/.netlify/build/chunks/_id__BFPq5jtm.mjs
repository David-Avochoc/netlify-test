import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as handleMediaFolderUpdate, n as handleMediaFolderDelete, r as handleMediaFolderGet } from "./media-folders-Lc9Ks8az_iqlsKl2x.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { c as mediaFolderBody, l as mediaFolderIdSchema } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/folders/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
function parseFolderId(id) {
	const result = mediaFolderIdSchema.safeParse(id);
	return result.success ? result.data : apiError("VALIDATION_ERROR", "Invalid media folder ID", 400);
}
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:read");
	if (denied) return denied;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const id = parseFolderId(params.id);
	if (id instanceof Response) return id;
	return unwrapResult(await handleMediaFolderGet(emdash.db, id));
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:edit_any");
	if (denied) return denied;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const id = parseFolderId(params.id);
	if (id instanceof Response) return id;
	const body = await parseBody(request, mediaFolderBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleMediaFolderUpdate(emdash.db, id, body));
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:edit_any");
	if (denied) return denied;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const id = parseFolderId(params.id);
	if (id instanceof Response) return id;
	return unwrapResult(await handleMediaFolderDelete(emdash.db, id));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/folders/_id_@_@mjs
var page = () => _id__exports;
export { page };
