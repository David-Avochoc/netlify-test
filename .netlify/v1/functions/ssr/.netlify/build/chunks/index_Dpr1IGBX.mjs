import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { t as BylineRepository } from "./byline-BufjxQyd_CopmbbPN.mjs";
import { i as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { l as bylineUpdateBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { i as handleBylineUpdate } from "./bylines-C8ZT6iWw_DusNTBrE.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "bylines:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const byline = await new BylineRepository(emdash.db).findById(params.id);
		if (!byline) return apiError("NOT_FOUND", "Byline not found", 404);
		return apiSuccess(byline);
	} catch (error) {
		return handleError(error, "Failed to get byline", "BYLINE_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const body = await parseBody(request, bylineUpdateBody);
	if (isParseError(body)) return body;
	const result = await handleBylineUpdate(emdash.db, params.id, {
		slug: body.slug,
		displayName: body.displayName,
		bio: body.bio ?? null,
		avatarMediaId: body.avatarMediaId ?? null,
		websiteUrl: body.websiteUrl ?? null,
		userId: body.userId ?? null,
		isGuest: body.isGuest,
		customFields: body.customFields
	});
	if (result.success) {
		const byline = result.data;
		after(() => emdash.hooks.runBylineAfterSave(byline, false));
	}
	return unwrapResult(result);
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const repo = new BylineRepository(emdash.db);
		const existing = emdash.hooks.hasHooks("byline:afterDelete") ? await repo.findById(params.id) : null;
		if (!await repo.delete(params.id)) return apiError("NOT_FOUND", "Byline not found", 404);
		if (existing) after(() => emdash.hooks.runBylineAfterDelete(existing));
		return apiSuccess({ deleted: true });
	} catch (error) {
		return handleError(error, "Failed to delete byline", "BYLINE_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index@_@mjs
var page = () => _id__exports;
export { page };
