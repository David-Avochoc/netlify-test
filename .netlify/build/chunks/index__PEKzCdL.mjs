import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { g as invalidateWidgetObjectCache } from "./object-cache-I4Re7BOR_CyRvBWDi.mjs";
import { i as widgetAreaTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { U as createWidgetAreaBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { n as rowToWidget } from "./widgets-HYhp_QtR_BvyFPnbA.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { ulid } from "ulidx";
// node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs
var widget_areas_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const denied = requirePerm(user, "widgets:read");
	if (denied) return denied;
	try {
		const areas = await db.selectFrom("_emdash_widget_areas").selectAll().orderBy("name", "asc").execute();
		return apiSuccess({ items: await Promise.all(areas.map(async (area) => {
			const widgets = await db.selectFrom("_emdash_widgets").selectAll().$castTo().where("area_id", "=", area.id).orderBy("sort_order", "asc").execute();
			return {
				...area,
				widgets: widgets.map((row) => rowToWidget(row)),
				widgetCount: widgets.length
			};
		})) });
	} catch (error) {
		return handleError(error, "Failed to fetch widget areas", "WIDGET_AREA_LIST_ERROR");
	}
};
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, createWidgetAreaBody);
		if (isParseError(body)) return body;
		if (await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", body.name).executeTakeFirst()) return apiError("CONFLICT", `Widget area with name "${body.name}" already exists`, 409);
		const id = ulid();
		await db.insertInto("_emdash_widget_areas").values({
			id,
			name: body.name,
			label: body.label,
			description: body.description ?? null
		}).execute();
		await invalidateWidgetObjectCache({ waitForPersist: true });
		const area = await db.selectFrom("_emdash_widget_areas").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
		await invalidateRouteCache(cache, [widgetAreaTag(area.name)]);
		return apiSuccess(area, 201);
	} catch (error) {
		return handleError(error, "Failed to create widget area", "WIDGET_AREA_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/index@_@mjs
var page = () => widget_areas_exports;
export { page };
