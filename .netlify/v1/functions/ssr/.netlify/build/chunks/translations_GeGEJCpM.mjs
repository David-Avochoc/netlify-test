import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs
var translations_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
function isPublished(t) {
	return typeof t === "object" && t !== null && "status" in t && t.status === "published";
}
function isEntry(t, idOrSlug) {
	return typeof t === "object" && t !== null && ("id" in t && t.id === idOrSlug || "slug" in t && t.slug === idOrSlug);
}
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleContentTranslations) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	const collection = params.collection;
	const id = params.id;
	const result = await emdash.handleContentTranslations(collection, id);
	if (result.success && !hasPermission(user, "content:read_drafts")) {
		const data = result.data && typeof result.data === "object" ? result.data : void 0;
		const filtered = (Array.isArray(data?.translations) ? data.translations : []).filter(isPublished);
		if (!filtered.some((t) => isEntry(t, id))) return apiError("NOT_FOUND", `Content item not found: ${id}`, 404);
		return unwrapResult({
			success: true,
			data: {
				...data,
				translations: filtered
			}
		});
	}
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations@_@mjs
var page = () => translations_exports;
export { page };
