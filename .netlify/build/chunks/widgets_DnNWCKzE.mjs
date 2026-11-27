import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { g as invalidateWidgetObjectCache } from "./object-cache-I4Re7BOR_CyRvBWDi.mjs";
import { i as widgetAreaTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { W as createWidgetBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { n as rowToWidget } from "./widgets-HYhp_QtR_BvyFPnbA.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { ulid } from "ulidx";
// node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs
var widgets_exports = /* @__PURE__ */ __exportAll({
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
		const body = await parseBody(request, createWidgetBody);
		if (isParseError(body)) return body;
		const sortOrder = ((await db.selectFrom("_emdash_widgets").select(({ fn }) => fn.max("sort_order").as("maxOrder")).where("area_id", "=", area.id).executeTakeFirst())?.maxOrder ?? -1) + 1;
		const id = ulid();
		await db.insertInto("_emdash_widgets").values({
			id,
			area_id: area.id,
			sort_order: sortOrder,
			type: body.type,
			title: body.title ?? null,
			content: body.content ? JSON.stringify(body.content) : null,
			menu_name: body.menuName ?? null,
			component_id: body.componentId ?? null,
			component_props: body.componentProps ? JSON.stringify(body.componentProps) : null
		}).execute();
		await invalidateWidgetObjectCache({ waitForPersist: true });
		const widget = await db.selectFrom("_emdash_widgets").selectAll().$castTo().where("id", "=", id).executeTakeFirstOrThrow();
		await invalidateRouteCache(cache, [widgetAreaTag(name)]);
		return apiSuccess(rowToWidget(widget), 201);
	} catch (error) {
		return handleError(error, "Failed to create widget", "WIDGET_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets@_@mjs
var page = () => widgets_exports;
export { page };
