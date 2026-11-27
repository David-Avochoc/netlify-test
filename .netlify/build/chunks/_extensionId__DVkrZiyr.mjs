import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as dispatchPluginEditorExtensionApiRequest } from "./http-route-dispatch-Y8bwyixm_BzR7Yvp-.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_.mjs
var _extensionId__exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const kind = params.kind;
	if (kind !== "panel" && kind !== "action") return apiError("NOT_FOUND", "Plugin editor extension not found", 404);
	return dispatchPluginEditorExtensionApiRequest({
		runtime: emdash,
		pluginId: params.pluginId,
		kind,
		extensionId: params.extensionId,
		collection: params.collection,
		entryId: params.id,
		request,
		user,
		tokenScopes: locals.tokenScopes,
		invalidateContentCache: cache?.enabled ? (tags) => cache.invalidate({ tags }) : void 0
	});
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_@_@mjs
var page = () => _extensionId__exports;
export { page };
