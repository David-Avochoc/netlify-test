import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { g as invalidateWidgetObjectCache } from "./object-cache-I4Re7BOR_CyRvBWDi.mjs";
import { i as widgetAreaTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { At as updateWidgetBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { n as rowToWidget } from "./widgets-HYhp_QtR_BvyFPnbA.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PUT: () => PUT,
	prerender: () => false
});
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const { name, id } = params;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	if (!name || !id) return apiError("VALIDATION_ERROR", "name and id are required", 400);
	try {
		const area = await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", name).executeTakeFirst();
		if (!area) return apiError("NOT_FOUND", `Widget area "${name}" not found`, 404);
		if (!await db.selectFrom("_emdash_widgets").select("id").where("id", "=", id).where("area_id", "=", area.id).executeTakeFirst()) return apiError("NOT_FOUND", `Widget "${id}" not found in area "${name}"`, 404);
		const body = await parseBody(request, updateWidgetBody);
		if (isParseError(body)) return body;
		const updates = {};
		if (body.title !== void 0) updates.title = body.title || null;
		if (body.type !== void 0) updates.type = body.type;
		if (body.content !== void 0) updates.content = body.content ? JSON.stringify(body.content) : null;
		if (body.menuName !== void 0) updates.menu_name = body.menuName || null;
		if (body.componentId !== void 0) updates.component_id = body.componentId || null;
		if (body.componentProps !== void 0) updates.component_props = body.componentProps ? JSON.stringify(body.componentProps) : null;
		if (Object.keys(updates).length === 0) return apiError("VALIDATION_ERROR", "No fields to update", 400);
		await db.updateTable("_emdash_widgets").set(updates).where("id", "=", id).execute();
		await invalidateWidgetObjectCache({ waitForPersist: true });
		const widget = await db.selectFrom("_emdash_widgets").selectAll().$castTo().where("id", "=", id).executeTakeFirstOrThrow();
		await invalidateRouteCache(cache, [widgetAreaTag(name)]);
		return apiSuccess(rowToWidget(widget));
	} catch (error) {
		return handleError(error, "Failed to update widget", "WIDGET_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const { name, id } = params;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	if (!name || !id) return apiError("VALIDATION_ERROR", "name and id are required", 400);
	try {
		const area = await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", name).executeTakeFirst();
		if (!area) return apiError("NOT_FOUND", `Widget area "${name}" not found`, 404);
		if (!await db.selectFrom("_emdash_widgets").select("id").where("id", "=", id).where("area_id", "=", area.id).executeTakeFirst()) return apiError("NOT_FOUND", `Widget "${id}" not found in area "${name}"`, 404);
		await db.deleteFrom("_emdash_widgets").where("id", "=", id).execute();
		await invalidateWidgetObjectCache({ waitForPersist: true });
		await invalidateRouteCache(cache, [widgetAreaTag(name)]);
		return apiSuccess({ deleted: true });
	} catch (error) {
		return handleError(error, "Failed to delete widget", "WIDGET_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_@_@mjs
var page = () => _id__exports;
export { page };
