import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { t as BylineRepository } from "./byline-BufjxQyd_CopmbbPN.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { c as bylineTranslationCreateBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as handleBylineCreate, r as handleBylineTranslations } from "./bylines-C8ZT6iWw_DusNTBrE.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs
var translations_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const id = params.id;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "bylines:read");
	if (denied) return denied;
	try {
		return unwrapResult(await handleBylineTranslations(emdash.db, id));
	} catch (error) {
		return handleError(error, "Failed to fetch byline translations", "BYLINE_TRANSLATIONS_ERROR");
	}
};
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const id = params.id;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, bylineTranslationCreateBody);
		if (isParseError(body)) return body;
		const source = await new BylineRepository(emdash.db).findById(id);
		if (!source) return apiError("NOT_FOUND", "Byline not found", 404);
		const result = await handleBylineCreate(emdash.db, {
			slug: body.slug ?? source.slug,
			displayName: body.displayName ?? source.displayName,
			bio: body.bio ?? null,
			avatarMediaId: body.avatarMediaId ?? source.avatarMediaId,
			websiteUrl: body.websiteUrl ?? source.websiteUrl,
			isGuest: source.isGuest,
			locale: body.locale,
			translationOf: id
		});
		if (result.success) {
			const byline = result.data;
			after(() => emdash.hooks.runBylineAfterSave(byline, true));
		}
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create byline translation", "BYLINE_TRANSLATION_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations@_@mjs
var page = () => translations_exports;
export { page };
