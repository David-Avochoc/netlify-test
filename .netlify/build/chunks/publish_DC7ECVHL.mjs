import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as resolveSecretsCached } from "./secrets-O25WpEe__B3AoQE_o.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as verifyVisualEditingActionToken, t as VISUAL_ACTION_TOKEN_INVALID } from "./action-token-DyXQ5VhB_m21ar3Pc.mjs";
import { t as publishContent } from "./publish_C1yO8dPD.mjs";
// node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish.mjs
var publish_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async (context) => {
	const { emdash, user } = context.locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	const token = context.request.headers.get("x-emdash-visual-action");
	if (!token) return apiError(VISUAL_ACTION_TOKEN_INVALID, "Visual editing action token is required", 403);
	const { previewSecret } = await resolveSecretsCached(emdash.db);
	if (!await verifyVisualEditingActionToken(token, previewSecret, user.id)) return apiError(VISUAL_ACTION_TOKEN_INVALID, "Visual editing action token is invalid or expired", 403);
	return publishContent(context, "visual-editor");
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish@_@mjs
var page = () => publish_exports;
export { page };
