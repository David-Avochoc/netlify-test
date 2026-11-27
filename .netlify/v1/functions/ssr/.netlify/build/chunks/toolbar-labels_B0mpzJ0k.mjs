import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as loadVisualEditingToolbarLabels } from "./server_DQMhNxoo.mjs";
// node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels.mjs
var toolbar_labels_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ request }) => {
	const labels = await loadVisualEditingToolbarLabels(request);
	const response = apiSuccess({
		editMode: labels.editMode,
		hideToolbar: labels.hideToolbar
	});
	response.headers.set("Cache-Control", "private, no-store");
	return response;
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels@_@mjs
var page = () => toolbar_labels_exports;
export { page };
