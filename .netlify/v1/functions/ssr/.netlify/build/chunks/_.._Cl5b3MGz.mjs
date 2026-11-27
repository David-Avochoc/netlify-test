import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_.mjs
var ____path__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	HEAD: () => HEAD,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
var TRANSFER_ROUTES = [
	{
		pattern: /^capabilities$/,
		params: [],
		load: () => import("./capabilities_DkB98MOB.mjs")
	},
	{
		pattern: /^approvals$/,
		params: [],
		load: () => import("./approvals_DztWuQDw.mjs")
	},
	{
		pattern: /^approvals\/([^/]+)\/approve$/,
		params: ["id"],
		load: () => import("./approve_hpDv3Zb4.mjs")
	},
	{
		pattern: /^approvals\/([^/]+)\/deny$/,
		params: ["id"],
		load: () => import("./deny_DtORFBex.mjs")
	},
	{
		pattern: /^exports$/,
		params: [],
		load: () => import("./exports_CX2cyD03.mjs")
	},
	{
		pattern: /^exports\/([^/]+)$/,
		params: ["id"],
		load: () => import("./_id__DjYvfeEj.mjs")
	},
	{
		pattern: /^exports\/([^/]+)\/advance$/,
		params: ["id"],
		load: () => import("./advance_BwvFEj76.mjs")
	},
	{
		pattern: /^exports\/([^/]+)\/manifest$/,
		params: ["id"],
		load: () => import("./manifest_DVSGzTJs.mjs")
	},
	{
		pattern: /^exports\/([^/]+)\/archive$/,
		params: ["id"],
		load: () => import("./archive_uUpbbqgq.mjs")
	},
	{
		pattern: /^exports\/([^/]+)\/files\/(.+)$/,
		params: ["id", "path"],
		load: () => import("./_...path__lu7TyZpP.mjs")
	},
	{
		pattern: /^imports$/,
		params: [],
		load: () => import("./imports_DiV8tK5v.mjs")
	},
	{
		pattern: /^imports\/([^/]+)$/,
		params: ["id"],
		load: () => import("./_id__6GFZlPy7.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/missing$/,
		params: ["id"],
		load: () => import("./missing_DLJJnOJL.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/files\/(.+)$/,
		params: ["id", "path"],
		load: () => import("./_...path__Bjfr1q3l.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/analyze$/,
		params: ["id"],
		load: () => import("./analyze_DbllvwJH.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/plan$/,
		params: ["id"],
		load: () => import("./plan_DgCalT9t.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/cancel$/,
		params: ["id"],
		load: () => import("./cancel_BoJrlvWi.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/abandon$/,
		params: ["id"],
		load: () => import("./abandon_BXH1hMdm.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/execute$/,
		params: ["id"],
		load: () => import("./execute_B8FB4uG8.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/advance$/,
		params: ["id"],
		load: () => import("./advance_ItSYcgYj.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/receipt$/,
		params: ["id"],
		load: () => import("./receipt_BtjWlA22.mjs")
	}
];
function isRouteMethod(method) {
	return method === "GET" || method === "HEAD" || method === "POST" || method === "PUT" || method === "DELETE";
}
var handleRequest = async (context) => {
	const path = context.params.path ?? "";
	for (const route of TRANSFER_ROUTES) {
		const match = route.pattern.exec(path);
		if (!match) continue;
		const params = {};
		route.params.forEach((name, index) => {
			params[name] = match[index + 1] ?? "";
		});
		const module = await route.load();
		const method = context.request.method.toUpperCase();
		const handler = isRouteMethod(method) ? module[method] : void 0;
		if (!handler) return apiError("METHOD_NOT_ALLOWED", "Method not allowed", 405);
		return handler(new Proxy(context, { get: (target, property) => property === "params" ? params : Reflect.get(target, property, target) }));
	}
	return apiError("NOT_FOUND", "Not found", 404);
};
var GET = handleRequest;
var HEAD = handleRequest;
var POST = handleRequest;
var PUT = handleRequest;
var DELETE = handleRequest;
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_@_@mjs
var page = () => ____path__exports;
export { page };
