import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as dispatchPluginApiRequest } from "./http-route-dispatch-Y8bwyixm_BzR7Yvp-.mjs";
// node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs
var ____path__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	HEAD: () => HEAD,
	PATCH: () => PATCH,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
/**
* Handle all methods by matching against plugin-defined routes
*/
var handleRequest = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const pluginId = params.pluginId;
	const path = params.path || "";
	if (!emdash?.handlePluginApiRoute) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	return dispatchPluginApiRequest({
		runtime: emdash,
		pluginId,
		path: `/${path}`,
		request,
		user,
		tokenScopes: locals.tokenScopes,
		invalidateContentCache: cache?.enabled ? (tags) => cache.invalidate({ tags }) : void 0
	});
};
var GET = handleRequest;
var HEAD = handleRequest;
var POST = handleRequest;
var PUT = handleRequest;
var PATCH = handleRequest;
var DELETE = handleRequest;
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_@_@mjs
var page = () => ____path__exports;
export { page };
