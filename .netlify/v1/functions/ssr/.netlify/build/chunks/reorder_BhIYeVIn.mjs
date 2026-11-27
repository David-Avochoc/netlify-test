import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { g as invalidateWidgetObjectCache } from "./object-cache-I4Re7BOR_CyRvBWDi.mjs";
import { i as widgetAreaTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { nt as reorderWidgetsBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs
var reorder_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const { name } = params;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	if (!name) return apiError("VALIDATION_ERROR", "name is required", 400);
	try {
		const area = await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", name).executeTakeFirst();
		if (!area) return apiError("NOT_FOUND", `Widget area "${name}" not found`, 404);
		const body = await parseBody(request, reorderWidgetsBody);
		if (isParseError(body)) return body;
		const existingWidgets = await db.selectFrom("_emdash_widgets").select("id").where("area_id", "=", area.id).execute();
		const existingIds = new Set(existingWidgets.map((w) => w.id));
		for (const id of body.widgetIds) if (!existingIds.has(id)) return apiError("VALIDATION_ERROR", `Widget "${id}" not found in area "${name}"`, 400);
		const results = await Promise.allSettled(body.widgetIds.map((id, index) => db.updateTable("_emdash_widgets").set({ sort_order: index }).where("id", "=", id).execute()));
		await invalidateWidgetObjectCache({ waitForPersist: true });
		const failed = results.find((result) => result.status === "rejected");
		if (failed) throw failed.reason;
		await invalidateRouteCache(cache, [widgetAreaTag(name)]);
		return apiSuccess({ success: true });
	} catch (error) {
		return handleError(error, "Failed to reorder widgets", "WIDGET_REORDER_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder@_@mjs
var page = () => reorder_exports;
export { page };
