import { f as removeLeadingForwardSlash, g as stripRequestBase, h as slash, i as collapseDuplicateTrailingSlashes, l as joinPaths, m as removeTrailingForwardSlash, o as hasFileExtension, r as collapseDuplicateSlashes, s as isInternalPath, t as appendForwardSlash, u as prependForwardSlash } from "./path_jvl2hruy.mjs";
import { C as routeHasHtmlExtension, D as pathHasLocale, E as normalizeThePath, O as shouldAppendForwardSlash, S as isFallbackRouteMatch, T as normalizeTheLocale, _ as createAsyncManifestMemo, a as getRouteGenerator, b as getCustom500Route, c as getOriginPathname, d as getLogger, f as getResolvedLogger, g as readBodyWithLimit, h as BodySizeLimitError, i as getRouteCache, k as defineMiddleware, l as setOriginPathname, m as SERVER_ISLAND_COMPONENT, n as getParams, o as getEnvironment, p as DEFAULT_404_ROUTE, r as getProps, s as copyRequest, t as sequence, u as validateAndDecodePathname, v as createManifestMemo, w as getErrorRoutePath, x as getDefaultStatusCode, y as getCustom404Route } from "./sequence_Bnj7VMng.mjs";
import { n as matchHostname } from "./remote_nP2k5s2G.mjs";
import { a as REDIRECT_STATUS_CODES, c as clientAddressSymbol, d as responseSentSymbol$1, l as fetchStateSymbol, n as ASTRO_ERROR_HEADER, o as REROUTABLE_STATUS_CODES, r as ASTRO_GENERATOR, s as STATUS_CODE_PAGES, t as renderEndpoint, u as originPathnameSymbol } from "./server_BzCg7N1U.mjs";
import { D as LocalsReassigned, E as LocalsNotAnObject, F as NoManifestAvailable, G as ResponseSentError, J as SessionStorageSaveError, O as MiddlewareNoDataOrNextCalled, V as PrerenderClientAddressNotAvailable, W as ReservedSlotName, Y as StaticClientAddressNotAvailable, a as ClientAddressNotAvailable, et as AstroError, i as CacheNotEnabled, k as MiddlewareNotAResponse, n as ActionsReturnedInvalidDataError, nt as isAstroError, p as ForbiddenRewrite, q as SessionStorageInitError, r as AstroResponseHeadersReassigned, t as ActionNotFoundError } from "./errors-data_CQpa_Mur.mjs";
import { n as AstroIntegrationLogger, r as astroToRuntimeLogger } from "./console_ClfCadOL.mjs";
import { C as isRoute500, D as normalizeCspResourceEntry, E as generateCspDigest, S as isRoute404, h as isRenderInstruction, l as renderSlotToString, n as renderPage, o as chunkToString, r as renderJSX, u as isRenderTemplateResult, w as decodeKey, x as isRoute3xx } from "./server_BUeai1qo.mjs";
import React, { createElement, memo } from "react";
import ReactDOM from "react-dom/server";
import picomatch from "picomatch";
import { parse, stringify as stringify$1, unflatten as unflatten$1 } from "devalue";
import colors from "piccolore";
import { parseCookie, stringifySetCookie } from "cookie";
import { createStorage } from "unstorage";
import { escape } from "html-escaper";
// node_modules/astro/dist/core/middleware/noop-middleware.js
var NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
	return await next();
};
// node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) routes.push({
		...serializedRoute,
		routeData: deserializeRouteData(serializedRoute.routeData)
	});
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
// node_modules/@astrojs/react-renderer/dist/context.js
var contexts = /* @__PURE__ */ new WeakMap();
var ID_PREFIX = "r";
function getContext(rendererContextResult) {
	if (contexts.has(rendererContextResult)) return contexts.get(rendererContextResult);
	const ctx = {
		currentIndex: 0,
		get id() {
			return ID_PREFIX + this.currentIndex.toString();
		}
	};
	contexts.set(rendererContextResult, ctx);
	return ctx;
}
function incrementId(rendererContextResult) {
	const ctx = getContext(rendererContextResult);
	const id = ctx.id;
	ctx.currentIndex++;
	return id;
}
// node_modules/@astrojs/react-renderer/dist/static-html.js
/**
* Astro passes `children` as a string of HTML, so we need
* a wrapper `div` to render that content as VNodes.
*
* As a bonus, we can signal to React that this subtree is
* entirely static and will never change via `shouldComponentUpdate`.
*/
var StaticHtml = ({ value, name, hydrate = true }) => {
	if (value == null || value.trim() === "") return null;
	return createElement(hydrate ? "astro-slot" : "astro-static-slot", {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value }
	});
};
/**
* React.memo is the modern functional equivalent of shouldComponentUpdate.
*
* By returning `true` in the comparison function (the second argument),
* we tell React that the props are "equal" and it should skip re-rendering,
* effectively making this subtree static.
*/
var static_html_default = memo(StaticHtml, () => true);
// node_modules/@astrojs/internal-helpers/dist/create-filter.js
function ensureArray(thing) {
	if (Array.isArray(thing)) return thing;
	if (thing == null) return [];
	return [thing];
}
function toMatcher(pattern) {
	if (pattern instanceof RegExp) return pattern;
	const normalized = slash(pattern);
	const fn = picomatch(normalized, { dot: true });
	return { test: (what) => fn(what) };
}
function createFilter(include, exclude) {
	const includeMatchers = ensureArray(include).map(toMatcher);
	const excludeMatchers = ensureArray(exclude).map(toMatcher);
	if (!includeMatchers.length && !excludeMatchers.length) return (id) => typeof id === "string" && !id.includes("\0");
	return function(id) {
		if (typeof id !== "string") return false;
		if (id.includes("\0")) return false;
		const pathId = slash(id);
		for (const matcher of excludeMatchers) {
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return false;
		}
		for (const matcher of includeMatchers) {
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return true;
		}
		return !includeMatchers.length;
	};
}
// node_modules/@astrojs/react-renderer/dist/server.js
var slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
var reactTypeof = Symbol.for("react.element");
var reactTransitionalTypeof = Symbol.for("react.transitional.element");
var filters = /* @__PURE__ */ new WeakMap();
function getFilter(opts) {
	if (!opts) return null;
	let filter = filters.get(opts);
	if (filter === void 0) {
		filter = opts.include || opts.exclude ? createFilter(opts.include, opts.exclude) : null;
		filters.set(opts, filter);
	}
	return filter;
}
async function check(Component, props, children, metadata) {
	if (typeof Component === "object") return Component["$$typeof"]?.toString().slice(7).startsWith("react") ?? false;
	if (typeof Component !== "function") return false;
	if (Component.name === "QwikComponent") return false;
	if (typeof Component === "function" && Component["$$typeof"] === Symbol.for("react.forward_ref")) return false;
	if (Component.prototype != null && typeof Component.prototype.render === "function") return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	const filter = getFilter(this?.options);
	if (filter && metadata?.componentUrl && !filter(metadata.componentUrl)) return false;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && (vnode["$$typeof"] === reactTypeof || vnode["$$typeof"] === reactTransitionalTypeof)) isReactComponent = true;
		} catch {}
		return React.createElement("div");
	}
	await renderToStaticMarkup.call(this, Tester, props, children);
	return isReactComponent;
}
async function getNodeWritable() {
	let { Writable } = await import(
		/* @vite-ignore */
		"node:stream"
);
	return Writable;
}
function needsHydration(metadata) {
	return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
	let prefix;
	if (this && this.result) prefix = incrementId(this.result);
	const attrs = { prefix };
	const opts = this?.options ?? {};
	delete props["class"];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = React.createElement(static_html_default, {
			hydrate: needsHydration(metadata),
			value,
			name
		});
	}
	const newProps = {
		...props,
		...slots
	};
	const newChildren = children ?? props.children;
	if (children && opts.experimentalReactChildren) {
		attrs["data-react-children"] = true;
		newProps.children = (await import("./vnode-children_DhTm7i1G.mjs").then((mod) => mod.default))(children);
	} else if (newChildren != null) newProps.children = React.createElement(static_html_default, {
		hydrate: needsHydration(metadata),
		value: newChildren
	});
	const formState = this ? await getFormState(this) : void 0;
	if (formState) {
		attrs["data-action-result"] = JSON.stringify(formState[0]);
		attrs["data-action-key"] = formState[1];
		attrs["data-action-name"] = formState[2];
	}
	const vnode = React.createElement(Component, newProps);
	const renderOptions = {
		identifierPrefix: prefix,
		formState
	};
	let html;
	if (opts.experimentalDisableStreaming) html = ReactDOM.renderToString(vnode, renderOptions);
	else if ("renderToReadableStream" in ReactDOM) html = await renderToReadableStreamAsync(vnode, renderOptions);
	else html = await renderToPipeableStreamAsync(vnode, renderOptions);
	return {
		html,
		attrs
	};
}
async function getFormState({ result }) {
	const { request, actionResult } = result;
	if (!actionResult || !request) return void 0;
	if (!isFormRequest(request.headers.get("content-type"))) return void 0;
	const { searchParams } = new URL(request.url);
	/**
	* The key generated by React to identify each `useActionState()` call.
	* @example "k511f74df5a35d32e7cf266450d85cb6c"
	*/
	const actionKey = (await request.clone().formData()).get("$ACTION_KEY")?.toString();
	/**
	* The action name returned by an action's `toString()` property.
	* This matches the endpoint path.
	* @example "/_actions/blog.like"
	*/
	const actionName = searchParams.get("_action");
	if (!actionKey || !actionName) return void 0;
	return [
		actionResult,
		actionKey,
		actionName
	];
}
async function renderToPipeableStreamAsync(vnode, options) {
	const Writable = await getNodeWritable();
	let html = "";
	return new Promise((resolve, reject) => {
		let error = void 0;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			...options,
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(new Writable({
					write(chunk, _encoding, callback) {
						html += chunk.toString("utf-8");
						callback();
					},
					destroy() {
						resolve(html);
					}
				}));
			}
		});
	});
}
/**
* Use a while loop instead of "for await" due to cloudflare and Vercel Edge issues
* See https://github.com/facebook/react/issues/24169
*/
async function readResult(stream) {
	const reader = stream.getReader();
	let result = "";
	const decoder = new TextDecoder("utf-8");
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) result += decoder.decode(value);
			else decoder.decode(/* @__PURE__ */ new Uint8Array());
			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}
async function renderToReadableStreamAsync(vnode, options) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode, options));
}
var formContentTypes$1 = ["application/x-www-form-urlencoded", "multipart/form-data"];
function isFormRequest(contentType) {
	const type = contentType?.split(";")[0].toLowerCase();
	return formContentTypes$1.some((t) => type === t);
}
var renderer = {
	name: "@astrojs/react",
	check,
	renderToStaticMarkup,
	supportsAstroStaticSlot: true
};
// \0virtual:astro:renderers
var renderers = [Object.assign(Object.assign({
	"name": "@astrojs/react",
	"clientEntrypoint": "@astrojs/react/client.js",
	"serverEntrypoint": "@astrojs/react/server.js"
}, { options: {
	include: void 0,
	exclude: void 0,
	experimentalReactChildren: false,
	experimentalDisableStreaming: false
} }), { ssr: renderer })];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)\\/?$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/emdash/dist/astro/image-endpoint.mjs",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image\\/?$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/.well-known/auth",
			"pattern": "^\\/_emdash\\/\\.well-known\\/auth\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": ".well-known",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs",
			"pathname": "/_emdash/.well-known/auth",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"isIndex": false,
			"route": "/_emdash/admin/[...path]",
			"pattern": "^\\/_emdash\\/admin(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "...path",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["...path"],
			"component": "node_modules/emdash/src/astro/routes/admin.astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/allowed-domains/[domain]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/allowed-domains\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "allowed-domains",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "domain",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["domain"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/allowed-domains",
			"pattern": "^\\/_emdash\\/api\\/admin\\/allowed-domains\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "allowed-domains",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs",
			"pathname": "/_emdash/api/admin/allowed-domains",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/api-tokens/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/api-tokens\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api-tokens",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/api-tokens",
			"pattern": "^\\/_emdash\\/api\\/admin\\/api-tokens\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api-tokens",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs",
			"pathname": "/_emdash/api/admin/api-tokens",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields/reorder",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs",
			"pathname": "/_emdash/api/admin/byline-fields/reorder",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields/[slug]/usage",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/usage\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "usage",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields/[slug]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs",
			"pathname": "/_emdash/api/admin/byline-fields",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/bylines/[id]/translations",
			"pattern": "^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bylines",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/bylines/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bylines",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/bylines",
			"pattern": "^\\/_emdash\\/api\\/admin\\/bylines\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bylines",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs",
			"pathname": "/_emdash/api/admin/bylines",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/bulk",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/bulk\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bulk",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs",
			"pathname": "/_emdash/api/admin/comments/bulk",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/counts",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/counts\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "counts",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs",
			"pathname": "/_emdash/api/admin/comments/counts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/[id]/status",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/status\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "status",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs",
			"pathname": "/_emdash/api/admin/comments",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/core-update",
			"pattern": "^\\/_emdash\\/api\\/admin\\/core-update\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "core-update",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/core-update.mjs",
			"pathname": "/_emdash/api/admin/core-update",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/hooks/exclusive/[hookName]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "hooks",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "exclusive",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "hookName",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["hookName"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/hooks/exclusive",
			"pattern": "^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "hooks",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "exclusive",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs",
			"pathname": "/_emdash/api/admin/hooks/exclusive",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/activation",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/activation\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "activation",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation.mjs",
			"pathname": "/_emdash/api/admin/media-usage/activation",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/collection-deletions/retry",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/collection-deletions\\/retry\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection-deletions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "retry",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry.mjs",
			"pathname": "/_emdash/api/admin/media-usage/collection-deletions/retry",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/collection-deletions",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/collection-deletions\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection-deletions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index.mjs",
			"pathname": "/_emdash/api/admin/media-usage/collection-deletions",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/progress",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/progress\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "progress",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress.mjs",
			"pathname": "/_emdash/api/admin/media-usage/progress",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/repair",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/repair\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "repair",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs",
			"pathname": "/_emdash/api/admin/media-usage/repair",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/work/retry",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/work\\/retry\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "work",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "retry",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/retry.mjs",
			"pathname": "/_emdash/api/admin/media-usage/work/retry",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/work",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/work\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "work",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/index.mjs",
			"pathname": "/_emdash/api/admin/media-usage/work",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/oauth-clients/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/oauth-clients\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth-clients",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/oauth-clients",
			"pattern": "^\\/_emdash\\/api\\/admin\\/oauth-clients\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth-clients",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs",
			"pathname": "/_emdash/api/admin/oauth-clients",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace/[id]/icon",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/icon\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "icon",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace/[id]/install",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/install\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "install",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs",
			"pathname": "/_emdash/api/admin/plugins/marketplace",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/artifact",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/artifact\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "artifact",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/artifact",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/install",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/install\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "install",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/install",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/publisher-handle",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/publisher-handle\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "publisher-handle",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/publisher-handle",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/verify",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/[id]/uninstall",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/([^/]+?)\\/uninstall\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "uninstall",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/[id]/update",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/([^/]+?)\\/update\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "update",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/updates",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/updates\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "updates",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs",
			"pathname": "/_emdash/api/admin/plugins/updates",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/disable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/disable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "disable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/enable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/enable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "enable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/mcp",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/mcp\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "mcp",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/settings",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/settings\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/uninstall",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/uninstall\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "uninstall",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/update",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/update\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "update",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs",
			"pathname": "/_emdash/api/admin/plugins",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/scheduled-policy-rejections/[collection]/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/scheduled-policy-rejections\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "scheduled-policy-rejections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/themes/marketplace/[id]/thumbnail",
			"pattern": "^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/thumbnail\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "thumbnail",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/themes/marketplace/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/themes/marketplace",
			"pattern": "^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs",
			"pathname": "/_emdash/api/admin/themes/marketplace",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/transfer/[...path]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/transfer(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "transfer",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "...path",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["...path"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]/disable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/disable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "disable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]/enable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/enable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "enable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]/send-recovery",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/send-recovery\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "send-recovery",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs",
			"pathname": "/_emdash/api/admin/users",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/dev-bypass",
			"pattern": "^\\/_emdash\\/api\\/auth\\/dev-bypass\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev-bypass",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs",
			"pathname": "/_emdash/api/auth/dev-bypass",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/handover",
			"pattern": "^\\/_emdash\\/api\\/auth\\/handover\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "handover",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/handover.mjs",
			"pathname": "/_emdash/api/auth/handover",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite/accept",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/accept\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "accept",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/accept.mjs",
			"pathname": "/_emdash/api/auth/invite/accept",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite/complete",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/complete\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "complete",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/complete.mjs",
			"pathname": "/_emdash/api/auth/invite/complete",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite/register-options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/register-options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register-options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs",
			"pathname": "/_emdash/api/auth/invite/register-options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs",
			"pathname": "/_emdash/api/auth/invite",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/logout",
			"pattern": "^\\/_emdash\\/api\\/auth\\/logout\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "logout",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/logout.mjs",
			"pathname": "/_emdash/api/auth/logout",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/magic-link/send",
			"pattern": "^\\/_emdash\\/api\\/auth\\/magic-link\\/send\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "magic-link",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "send",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs",
			"pathname": "/_emdash/api/auth/magic-link/send",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/magic-link/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/magic-link\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "magic-link",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs",
			"pathname": "/_emdash/api/auth/magic-link/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/me",
			"pattern": "^\\/_emdash\\/api\\/auth\\/me\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "me",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/me.mjs",
			"pathname": "/_emdash/api/auth/me",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/mode",
			"pattern": "^\\/_emdash\\/api\\/auth\\/mode\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "mode",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/mode.mjs",
			"pathname": "/_emdash/api/auth/mode",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/oauth/[provider]/callback",
			"pattern": "^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/callback\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "provider",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "callback",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["provider"],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/oauth/[provider]",
			"pattern": "^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "provider",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["provider"],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs",
			"pathname": "/_emdash/api/auth/passkey/options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/register/options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs",
			"pathname": "/_emdash/api/auth/passkey/register/options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/register/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs",
			"pathname": "/_emdash/api/auth/passkey/register/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs",
			"pathname": "/_emdash/api/auth/passkey/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/[id]",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/index.mjs",
			"pathname": "/_emdash/api/auth/passkey",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/complete",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/complete\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "complete",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/complete.mjs",
			"pathname": "/_emdash/api/auth/signup/complete",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/register-options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/register-options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register-options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/register-options.mjs",
			"pathname": "/_emdash/api/auth/signup/register-options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/request",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/request\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "request",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs",
			"pathname": "/_emdash/api/auth/signup/request",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs",
			"pathname": "/_emdash/api/auth/signup/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/calendar",
			"pattern": "^\\/_emdash\\/api\\/calendar\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "calendar",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/calendar.mjs",
			"pathname": "/_emdash/api/calendar",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/comments/[collection]/[contentId]/reactions",
			"pattern": "^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/reactions\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "contentId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reactions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "contentId"],
			"component": "node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/comments/[collection]/[contentId]",
			"pattern": "^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "contentId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection", "contentId"],
			"component": "node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/authors",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/authors\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "authors",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/authors.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/trash",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/trash\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "trash",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/compare",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/compare\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "compare",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/discard-draft",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/discard-draft\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "discard-draft",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/duplicate",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/duplicate\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "duplicate",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/lock",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/lock\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "lock",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/permanent",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/permanent\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "permanent",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/plugin-extensions/[pluginId]/[kind]/[extensionId]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/plugin-extensions\\/([^/]+?)\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "plugin-extensions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "pluginId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "kind",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "extensionId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": [
				"collection",
				"id",
				"pluginId",
				"kind",
				"extensionId"
			],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/preview-url",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/preview-url\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "preview-url",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/publish",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "publish",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/references/[relation]/children",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/references\\/([^/]+?)\\/children\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "references",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "relation",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "children",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [
				"collection",
				"id",
				"relation"
			],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/children.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/references/[relation]/parents",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/references\\/([^/]+?)\\/parents\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "references",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "relation",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "parents",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [
				"collection",
				"id",
				"relation"
			],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/restore",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/restore\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "restore",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/revisions/editors",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/revisions\\/editors\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "editors",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions/editors.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/revisions",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/revisions\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/room",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/room\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "room",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/room.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/schedule",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/schedule\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "schedule",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/terms/[taxonomy]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomy",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": [
				"collection",
				"id",
				"taxonomy"
			],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/translations",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/unpublish",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/unpublish\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "unpublish",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/dashboard",
			"pattern": "^\\/_emdash\\/api\\/dashboard\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dashboard",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/dashboard.mjs",
			"pathname": "/_emdash/api/dashboard",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/dev/emails",
			"pattern": "^\\/_emdash\\/api\\/dev\\/emails\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "emails",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/dev/emails.mjs",
			"pathname": "/_emdash/api/dev/emails",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/health",
			"pattern": "^\\/_emdash\\/api\\/health\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "health",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/health.mjs",
			"pathname": "/_emdash/api/health",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/probe",
			"pattern": "^\\/_emdash\\/api\\/import\\/probe\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "probe",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/probe.mjs",
			"pathname": "/_emdash/api/import/probe",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/analyze",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/analyze\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "analyze",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs",
			"pathname": "/_emdash/api/import/wordpress/analyze",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/execute",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/execute\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "execute",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs",
			"pathname": "/_emdash/api/import/wordpress/execute",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/media",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/media\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs",
			"pathname": "/_emdash/api/import/wordpress/media",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/prepare",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/prepare\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "prepare",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs",
			"pathname": "/_emdash/api/import/wordpress/prepare",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/rewrite-urls",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/rewrite-urls\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "rewrite-urls",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs",
			"pathname": "/_emdash/api/import/wordpress/rewrite-urls",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress-plugin/analyze",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/analyze\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress-plugin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "analyze",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs",
			"pathname": "/_emdash/api/import/wordpress-plugin/analyze",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress-plugin/callback",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/callback\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress-plugin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "callback",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs",
			"pathname": "/_emdash/api/import/wordpress-plugin/callback",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress-plugin/execute",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/execute\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress-plugin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "execute",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs",
			"pathname": "/_emdash/api/import/wordpress-plugin/execute",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/manifest",
			"pattern": "^\\/_emdash\\/api\\/manifest\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "manifest",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/manifest.mjs",
			"pathname": "/_emdash/api/manifest",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/mcp",
			"pattern": "^\\/_emdash\\/api\\/mcp\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "mcp",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/mcp.mjs",
			"pathname": "/_emdash/api/mcp",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/asset/[id]/[filename]",
			"pattern": "^\\/_emdash\\/api\\/media\\/asset\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "asset",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "filename",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id", "filename"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/file/[...key]",
			"pattern": "^\\/_emdash\\/api\\/media\\/file(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "file",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "...key",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["...key"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/folders/[id]",
			"pattern": "^\\/_emdash\\/api\\/media\\/folders\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "folders",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/folders/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/folders",
			"pattern": "^\\/_emdash\\/api\\/media\\/folders\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "folders",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media/folders/index.mjs",
			"pathname": "/_emdash/api/media/folders",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/providers/[providerId]/[itemId]",
			"pattern": "^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providers",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providerId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "itemId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["providerId", "itemId"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/providers/[providerId]",
			"pattern": "^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providers",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providerId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["providerId"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/providers",
			"pattern": "^\\/_emdash\\/api\\/media\\/providers\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providers",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs",
			"pathname": "/_emdash/api/media/providers",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/upload-url",
			"pattern": "^\\/_emdash\\/api\\/media\\/upload-url\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "upload-url",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs",
			"pathname": "/_emdash/api/media/upload-url",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/confirm",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/confirm\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "confirm",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/replace",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/replace\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "replace",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/replace.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/upload",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/upload\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "upload",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/upload.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/usage",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/usage\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "usage",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media",
			"pattern": "^\\/_emdash\\/api\\/media\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media.mjs",
			"pathname": "/_emdash/api/media",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/items/[id]",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "items",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/items",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "items",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/reorder",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/translations",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus",
			"pattern": "^\\/_emdash\\/api\\/menus\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/index.mjs",
			"pathname": "/_emdash/api/menus",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/device/authorize",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/device\\/authorize\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "device",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "authorize",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs",
			"pathname": "/_emdash/api/oauth/device/authorize",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/device/code",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/device\\/code\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "device",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "code",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs",
			"pathname": "/_emdash/api/oauth/device/code",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/device/token",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/device\\/token\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "device",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs",
			"pathname": "/_emdash/api/oauth/device/token",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/register",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/register\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/register.mjs",
			"pathname": "/_emdash/api/oauth/register",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/token/refresh",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/token\\/refresh\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "refresh",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs",
			"pathname": "/_emdash/api/oauth/token/refresh",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/token/revoke",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/token\\/revoke\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revoke",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs",
			"pathname": "/_emdash/api/oauth/token/revoke",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/token",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/token\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/token.mjs",
			"pathname": "/_emdash/api/oauth/token",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/openapi.json",
			"pattern": "^\\/_emdash\\/api\\/openapi\\.json$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "openapi.json",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/openapi.json.mjs",
			"pathname": "/_emdash/api/openapi.json",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/plugins/[pluginId]/[...path]",
			"pattern": "^\\/_emdash\\/api\\/plugins\\/([^/]+?)(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "pluginId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "...path",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["pluginId", "...path"],
			"component": "node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects/404s/summary",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/404s\\/summary\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "404s",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "summary",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs",
			"pathname": "/_emdash/api/redirects/404s/summary",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects/404s",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/404s\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "404s",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs",
			"pathname": "/_emdash/api/redirects/404s",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects/[id]",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/index.mjs",
			"pathname": "/_emdash/api/redirects",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/relations/[id]",
			"pattern": "^\\/_emdash\\/api\\/relations\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "relations",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/relations/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/relations",
			"pattern": "^\\/_emdash\\/api\\/relations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "relations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/relations/index.mjs",
			"pathname": "/_emdash/api/relations",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/revisions/[revisionId]/restore",
			"pattern": "^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/restore\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisionId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "restore",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["revisionId"],
			"component": "node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/revisions/[revisionId]",
			"pattern": "^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisionId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["revisionId"],
			"component": "node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/block-types/[slug]/versions/[version]/activate",
			"pattern": "^\\/_emdash\\/api\\/schema\\/block-types\\/([^/]+?)\\/versions\\/([^/]+?)\\/activate\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "block-types",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "versions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "version",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "activate",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug", "version"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/block-types/[slug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/block-types\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "block-types",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/block-types",
			"pattern": "^\\/_emdash\\/api\\/schema\\/block-types\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "block-types",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/block-types/index.mjs",
			"pathname": "/_emdash/api/schema/block-types",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/reorder",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/reorder.mjs",
			"pathname": "/_emdash/api/schema/collections/reorder",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]/fields/reorder",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]/fields/[fieldSlug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "fieldSlug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug", "fieldSlug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]/fields",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "fields",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs",
			"pathname": "/_emdash/api/schema/collections",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/orphans/[slug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/orphans\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "orphans",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/orphans",
			"pattern": "^\\/_emdash\\/api\\/schema\\/orphans\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "orphans",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs",
			"pathname": "/_emdash/api/schema/orphans",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema",
			"pattern": "^\\/_emdash\\/api\\/schema\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/index.mjs",
			"pathname": "/_emdash/api/schema",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/enable",
			"pattern": "^\\/_emdash\\/api\\/search\\/enable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "enable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/enable.mjs",
			"pathname": "/_emdash/api/search/enable",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/rebuild",
			"pattern": "^\\/_emdash\\/api\\/search\\/rebuild\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "rebuild",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs",
			"pathname": "/_emdash/api/search/rebuild",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/stats",
			"pattern": "^\\/_emdash\\/api\\/search\\/stats\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "stats",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/stats.mjs",
			"pathname": "/_emdash/api/search/stats",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/suggest",
			"pattern": "^\\/_emdash\\/api\\/search\\/suggest\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "suggest",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/suggest.mjs",
			"pathname": "/_emdash/api/search/suggest",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search",
			"pattern": "^\\/_emdash\\/api\\/search\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/index.mjs",
			"pathname": "/_emdash/api/search",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/sections/[slug]",
			"pattern": "^\\/_emdash\\/api\\/sections\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "sections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/sections",
			"pattern": "^\\/_emdash\\/api\\/sections\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "sections",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/sections/index.mjs",
			"pathname": "/_emdash/api/sections",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups/archives/[name]",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "archives",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups/archives",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "archives",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs",
			"pathname": "/_emdash/api/settings/backups/archives",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups/export",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/export\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "export",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs",
			"pathname": "/_emdash/api/settings/backups/export",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs",
			"pathname": "/_emdash/api/settings/backups",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/domain/notify",
			"pattern": "^\\/_emdash\\/api\\/settings\\/domain\\/notify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "domain",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "notify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/domain-notify.mjs",
			"pathname": "/_emdash/api/settings/domain/notify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/domain",
			"pattern": "^\\/_emdash\\/api\\/settings\\/domain\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "domain",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/domain.mjs",
			"pathname": "/_emdash/api/settings/domain",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/email",
			"pattern": "^\\/_emdash\\/api\\/settings\\/email\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "email",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/email.mjs",
			"pathname": "/_emdash/api/settings/email",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings",
			"pattern": "^\\/_emdash\\/api\\/settings\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings.mjs",
			"pathname": "/_emdash/api/settings",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/admin/verify",
			"pattern": "^\\/_emdash\\/api\\/setup\\/admin\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs",
			"pathname": "/_emdash/api/setup/admin/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/admin",
			"pattern": "^\\/_emdash\\/api\\/setup\\/admin\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/admin.mjs",
			"pathname": "/_emdash/api/setup/admin",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/dev-bypass",
			"pattern": "^\\/_emdash\\/api\\/setup\\/dev-bypass\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev-bypass",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs",
			"pathname": "/_emdash/api/setup/dev-bypass",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/dev-reset",
			"pattern": "^\\/_emdash\\/api\\/setup\\/dev-reset\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev-reset",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs",
			"pathname": "/_emdash/api/setup/dev-reset",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/status",
			"pattern": "^\\/_emdash\\/api\\/setup\\/status\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "status",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/status.mjs",
			"pathname": "/_emdash/api/setup/status",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup",
			"pattern": "^\\/_emdash\\/api\\/setup\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/index.mjs",
			"pathname": "/_emdash/api/setup",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/site/domain-proof",
			"pattern": "^\\/_emdash\\/api\\/site\\/domain-proof\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "site",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "domain-proof",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/site/domain-proof.mjs",
			"pathname": "/_emdash/api/site/domain-proof",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/snapshot",
			"pattern": "^\\/_emdash\\/api\\/snapshot\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "snapshot",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/snapshot.mjs",
			"pathname": "/_emdash/api/snapshot",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/bulk-tag",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/bulk-tag\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bulk-tag",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag.mjs",
			"pathname": "/_emdash/api/taxonomies/bulk-tag",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/reorder",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/terms/[slug]/translations",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name", "slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/terms/[slug]",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name", "slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/terms",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/translations",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs",
			"pathname": "/_emdash/api/taxonomies",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/themes/preview",
			"pattern": "^\\/_emdash\\/api\\/themes\\/preview\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "preview",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/themes/preview.mjs",
			"pathname": "/_emdash/api/themes/preview",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/typegen",
			"pattern": "^\\/_emdash\\/api\\/typegen\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "typegen",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/typegen.mjs",
			"pathname": "/_emdash/api/typegen",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/visual-editing/action-token",
			"pattern": "^\\/_emdash\\/api\\/visual-editing\\/action-token\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "visual-editing",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "action-token",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/visual-editing/action-token.mjs",
			"pathname": "/_emdash/api/visual-editing/action-token",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/visual-editing/content/[collection]/[id]/publish",
			"pattern": "^\\/_emdash\\/api\\/visual-editing\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "visual-editing",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "publish",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/visual-editing/toolbar-labels",
			"pattern": "^\\/_emdash\\/api\\/visual-editing\\/toolbar-labels\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "visual-editing",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "toolbar-labels",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels.mjs",
			"pathname": "/_emdash/api/visual-editing/toolbar-labels",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]/reorder",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]/widgets/[id]",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "widgets",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]/widgets",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "widgets",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs",
			"pathname": "/_emdash/api/widget-areas",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-components",
			"pattern": "^\\/_emdash\\/api\\/widget-components\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-components",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-components.mjs",
			"pathname": "/_emdash/api/widget-components",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/oauth/authorize",
			"pattern": "^\\/_emdash\\/oauth\\/authorize\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "authorize",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/authorize.mjs",
			"pathname": "/_emdash/oauth/authorize",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/.well-known/oauth-authorization-server/_emdash",
			"pattern": "^\\/\\.well-known\\/oauth-authorization-server\\/_emdash\\/?$",
			"segments": [
				[{
					"content": ".well-known",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth-authorization-server",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server.mjs",
			"pathname": "/.well-known/oauth-authorization-server/_emdash",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/.well-known/oauth-protected-resource",
			"pattern": "^\\/\\.well-known\\/oauth-protected-resource\\/?$",
			"segments": [[{
				"content": ".well-known",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "oauth-protected-resource",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs",
			"pathname": "/.well-known/oauth-protected-resource",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/about-us",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/about-us\\/?$",
			"segments": [[{
				"content": "about-us",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/about-us.astro",
			"pathname": "/about-us",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/ai",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/ai\\/?$",
			"segments": [[{
				"content": "ai",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/ai.astro",
			"pathname": "/ai",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/careers/apply-now",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/careers\\/apply-now\\/?$",
			"segments": [[{
				"content": "careers",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "apply-now",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/careers/apply-now.astro",
			"pathname": "/careers/apply-now",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/careers",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/careers\\/?$",
			"segments": [[{
				"content": "careers",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/careers/index.astro",
			"pathname": "/careers",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/contact",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/contact\\/?$",
			"segments": [[{
				"content": "contact",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/contact.astro",
			"pathname": "/contact",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/emdash-test",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/emdash-test\\/?$",
			"segments": [[{
				"content": "emdash-test",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/emdash-test.astro",
			"pathname": "/emdash-test",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/insights/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/insights\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "insights",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/insights/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/insights",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/insights\\/?$",
			"segments": [[{
				"content": "insights",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/insights/index.astro",
			"pathname": "/insights",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/our-work",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/our-work\\/?$",
			"segments": [[{
				"content": "our-work",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/our-work.astro",
			"pathname": "/our-work",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/privacy-policy",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/privacy-policy\\/?$",
			"segments": [[{
				"content": "privacy-policy",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/privacy-policy.astro",
			"pathname": "/privacy-policy",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/robots.txt",
			"pattern": "^\\/robots\\.txt$",
			"segments": [[{
				"content": "robots.txt",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/robots.txt.mjs",
			"pathname": "/robots.txt",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services.astro",
			"pathname": "/services",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/sitemap.xml",
			"pattern": "^\\/sitemap\\.xml$",
			"segments": [[{
				"content": "sitemap.xml",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/sitemap.xml.mjs",
			"pathname": "/sitemap.xml",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/test",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/test\\/?$",
			"segments": [[{
				"content": "test",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/test.astro",
			"pathname": "/test",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/work/gritcargo",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/work\\/gritcargo\\/?$",
			"segments": [[{
				"content": "work",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "gritcargo",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/work/gritcargo.astro",
			"pathname": "/work/gritcargo",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/work/spotify",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/work\\/spotify\\/?$",
			"segments": [[{
				"content": "work",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "spotify",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/work/spotify.astro",
			"pathname": "/work/spotify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/work/time2read",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/work\\/time2read\\/?$",
			"segments": [[{
				"content": "work",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "time2read",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/work/time2read.astro",
			"pathname": "/work/time2read",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/work",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/work\\/?$",
			"segments": [[{
				"content": "work",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/work/index.astro",
			"pathname": "/work",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/sitemap-[collection].xml",
			"pattern": "^\\/sitemap-([^/]+?)\\.xml$",
			"segments": [[
				{
					"content": "sitemap-",
					"dynamic": false,
					"spread": false
				},
				{
					"content": "collection",
					"dynamic": true,
					"spread": false
				},
				{
					"content": ".xml",
					"dynamic": false,
					"spread": false
				}
			]],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "src/pages/index.astro",
			"pathname": "/",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	}
].map(deserializeRouteInfo);
// \0virtual:astro:pages
var _page0 = () => import("./image-endpoint_CoSERvKV.mjs");
var _page1 = () => import("./auth_JgvRIrKf.mjs");
var _page2 = () => import("./admin_B62z71FS.mjs");
var _page3 = () => import("./_domain__C54Yx3HZ.mjs");
var _page4 = () => import("./index_9bTyyu5t.mjs");
var _page5 = () => import("./_id__D6rRk9aQ.mjs");
var _page6 = () => import("./index_YKlAoO4q.mjs");
var _page7 = () => import("./reorder_XTxtCFSi.mjs");
var _page8 = () => import("./usage_BD3DUCqk.mjs");
var _page9 = () => import("./_slug__DBTsBdbk.mjs");
var _page10 = () => import("./index_B3zzTiCa.mjs");
var _page11 = () => import("./translations_T32O_pwW.mjs");
var _page12 = () => import("./index_Dpr1IGBX.mjs");
var _page13 = () => import("./index_a18RHHIr.mjs");
var _page14 = () => import("./bulk_DDsCRZ2C.mjs");
var _page15 = () => import("./counts_CBF5cFla.mjs");
var _page16 = () => import("./status_Bq-ykJWm.mjs");
var _page17 = () => import("./_id__B6-M-urB.mjs");
var _page18 = () => import("./index_BKVDDXWr.mjs");
var _page19 = () => import("./core-update_B5CSJrPo.mjs");
var _page20 = () => import("./_hookName__BEdUH5tr.mjs");
var _page21 = () => import("./index_C5dYmxsR.mjs");
var _page22 = () => import("./activation_CVAm9RWN.mjs");
var _page23 = () => import("./retry_NaCYVRGJ.mjs");
var _page24 = () => import("./index_R7l7HKLS.mjs");
var _page25 = () => import("./progress_DK9g0V7b.mjs");
var _page26 = () => import("./repair__gXRCs27.mjs");
var _page27 = () => import("./retry_v-b2cTsg.mjs");
var _page28 = () => import("./index_47sL_DCx.mjs");
var _page29 = () => import("./_id__zBsXlgPo.mjs");
var _page30 = () => import("./index_BHczuJH0.mjs");
var _page31 = () => import("./icon_CspI-vJJ.mjs");
var _page32 = () => import("./install_Bx5MHh8M.mjs");
var _page33 = () => import("./index_CpSqVR55.mjs");
var _page34 = () => import("./index_BmGed_c8.mjs");
var _page35 = () => import("./artifact_CwGx7vP9.mjs");
var _page36 = () => import("./install_C9Z8qXOL.mjs");
var _page37 = () => import("./publisher-handle_V_LiJOoQ.mjs");
var _page38 = () => import("./verify_Bx0Y_XX4.mjs");
var _page39 = () => import("./uninstall_B7E9oLOT.mjs");
var _page40 = () => import("./update_kqHc83Ly.mjs");
var _page41 = () => import("./updates_BRMi8M_s.mjs");
var _page42 = () => import("./disable_DUZF4e7m.mjs");
var _page43 = () => import("./enable_y1A1f9jU.mjs");
var _page44 = () => import("./mcp_1qHtiUPk.mjs");
var _page45 = () => import("./settings_CuVYXz-8.mjs");
var _page46 = () => import("./uninstall_CehPOD2n.mjs");
var _page47 = () => import("./update_BA0CSQ8f.mjs");
var _page48 = () => import("./index_C-Jz22A9.mjs");
var _page49 = () => import("./index_CSWT8BSc.mjs");
var _page50 = () => import("./_id__Bvc2D6us.mjs");
var _page51 = () => import("./thumbnail_0TUqHKJu.mjs");
var _page52 = () => import("./index_C5ohRQTZ.mjs");
var _page53 = () => import("./index_BklxKMa_.mjs");
var _page54 = () => import("./_.._Cl5b3MGz.mjs");
var _page55 = () => import("./disable_DP07BQ2w.mjs");
var _page56 = () => import("./enable_1fTvqVPG.mjs");
var _page57 = () => import("./send-recovery_Dcjfajdp.mjs");
var _page58 = () => import("./index_tdaR_Jw0.mjs");
var _page59 = () => import("./index_z3N-0iSF.mjs");
var _page60 = () => import("./dev-bypass_D7Kq2X6I.mjs");
var _page61 = () => import("./handover_DXURhs-0.mjs");
var _page62 = () => import("./accept_BIVPC4ZB.mjs");
var _page63 = () => import("./complete_CLqB52hM.mjs");
var _page64 = () => import("./register-options_C0Q97LO2.mjs");
var _page65 = () => import("./index_Bjh5rPfg.mjs");
var _page66 = () => import("./logout_C6bfoM3E.mjs");
var _page67 = () => import("./send_o5H556s0.mjs");
var _page68 = () => import("./verify_DgkR09XF.mjs");
var _page69 = () => import("./me_CBSIYWEM.mjs");
var _page70 = () => import("./mode_G_SpZ24B.mjs");
var _page71 = () => import("./callback_BsXfrSOG.mjs");
var _page72 = () => import("./_provider__Rru4hKfJ.mjs");
var _page73 = () => import("./options_Crx4geHq.mjs");
var _page74 = () => import("./options_CTh6GMRf.mjs");
var _page75 = () => import("./verify_Dfkgkb2N.mjs");
var _page76 = () => import("./verify_BLbfk2lK.mjs");
var _page77 = () => import("./_id__BeIOz69j.mjs");
var _page78 = () => import("./index_qLtN3FFC.mjs");
var _page79 = () => import("./complete_B29Ni5eo.mjs");
var _page80 = () => import("./register-options_BcE0Fn99.mjs");
var _page81 = () => import("./request_hV8QkY-6.mjs");
var _page82 = () => import("./verify_DjzjKNFL.mjs");
var _page83 = () => import("./calendar_C4v4UVIm.mjs");
var _page84 = () => import("./reactions_DZp8McN3.mjs");
var _page85 = () => import("./index_CDxKQgvw.mjs");
var _page86 = () => import("./authors_nJqqgXNF.mjs");
var _page87 = () => import("./trash_BDMYb4KW.mjs");
var _page88 = () => import("./compare_CbfjMM00.mjs");
var _page89 = () => import("./discard-draft_BV4cpsFU.mjs");
var _page90 = () => import("./duplicate_C4D6plkn.mjs");
var _page91 = () => import("./lock_kszrKQRc.mjs");
var _page92 = () => import("./permanent_cg3PeYgX.mjs");
var _page93 = () => import("./_extensionId__DVkrZiyr.mjs");
var _page94 = () => import("./preview-url_C4oz4n8U.mjs");
var _page95 = () => import("./publish_SJ7LlSKu.mjs");
var _page96 = () => import("./children_CQH2DDCU.mjs");
var _page97 = () => import("./parents_DT_L3Lho.mjs");
var _page98 = () => import("./restore_BLlum5iF.mjs");
var _page99 = () => import("./editors_CwSeHPu7.mjs");
var _page100 = () => import("./revisions_SsN4tSMv.mjs");
var _page101 = () => import("./room_XcwOI_-F.mjs");
var _page102 = () => import("./schedule_Br4dUuRE.mjs");
var _page103 = () => import("./_taxonomy__D6O2l3lu.mjs");
var _page104 = () => import("./translations_GeGEJCpM.mjs");
var _page105 = () => import("./unpublish_Cu-d2Tmy.mjs");
var _page106 = () => import("./_id__BeSbaKvl.mjs");
var _page107 = () => import("./index_Cwz9j_H2.mjs");
var _page108 = () => import("./dashboard_B3QeW9_A.mjs");
var _page109 = () => import("./emails_Co1h-fNE.mjs");
var _page110 = () => import("./health_BJtUaMTU.mjs");
var _page111 = () => import("./probe_CZEhpqfv.mjs");
var _page112 = () => import("./analyze_CqVEvZEJ.mjs");
var _page113 = () => import("./execute_B4BHl2GX.mjs");
var _page114 = () => import("./media_JPGChh1f.mjs");
var _page115 = () => import("./prepare_STyl0BN_.mjs");
var _page116 = () => import("./rewrite-urls_C9Vi1XCa.mjs");
var _page117 = () => import("./analyze_CeBhngHQ.mjs");
var _page118 = () => import("./callback_TQQAR0Qg.mjs");
var _page119 = () => import("./execute_Cwh1Pmje.mjs");
var _page120 = () => import("./manifest_DRW6vFI6.mjs");
var _page121 = () => import("./mcp_ConEcrgl.mjs");
var _page122 = () => import("./_filename__BWTBM4Je.mjs");
var _page123 = () => import("./_.._Dbox9FlZ.mjs");
var _page124 = () => import("./_id__BFPq5jtm.mjs");
var _page125 = () => import("./index_CaNbLSTq.mjs");
var _page126 = () => import("./_itemId__BdzBBdlZ.mjs");
var _page127 = () => import("./index_Cf8Fy-XN.mjs");
var _page128 = () => import("./index_BDOdYioT.mjs");
var _page129 = () => import("./upload-url_q_FxQK9n.mjs");
var _page130 = () => import("./confirm_BE9YXW0V.mjs");
var _page131 = () => import("./replace_tyY6qOjT.mjs");
var _page132 = () => import("./upload_9SUYGcZT.mjs");
var _page133 = () => import("./usage_EUdFJxNL.mjs");
var _page134 = () => import("./_id__DCxxrfss.mjs");
var _page135 = () => import("./media_CLQVKL5F.mjs");
var _page136 = () => import("./_id__DfcOjPwv.mjs");
var _page137 = () => import("./items_D54RxUy_.mjs");
var _page138 = () => import("./reorder_CyV-l4AY.mjs");
var _page139 = () => import("./translations_Dpc0eVlu.mjs");
var _page140 = () => import("./_name__BSw21Clx.mjs");
var _page141 = () => import("./index_eO6yNzVA.mjs");
var _page142 = () => import("./authorize_BW3cdDFb.mjs");
var _page143 = () => import("./code_C2tNU-_t.mjs");
var _page144 = () => import("./token_Lf9glYqY.mjs");
var _page145 = () => import("./register_Bvfi_BLR.mjs");
var _page146 = () => import("./refresh_daj2pBRy.mjs");
var _page147 = () => import("./revoke_7gZ1ztuP.mjs");
var _page148 = () => import("./token_DSASq0_P.mjs");
var _page149 = () => import("./openapi_DDbXlM20.mjs");
var _page150 = () => import("./_.._CWjYKYm2.mjs");
var _page151 = () => import("./summary_D1uY3hqH.mjs");
var _page152 = () => import("./index_BSzxkJic.mjs");
var _page153 = () => import("./_id__CuxBRjzQ.mjs");
var _page154 = () => import("./index_BTUMWSXq.mjs");
var _page155 = () => import("./index_D9Noj8IL.mjs");
var _page156 = () => import("./index_DtvnUIqE.mjs");
var _page157 = () => import("./restore_DeHlNDnt.mjs");
var _page158 = () => import("./index_CMtTegMv.mjs");
var _page159 = () => import("./activate_D9ZwhpEg.mjs");
var _page160 = () => import("./index_BO_n9lJ-.mjs");
var _page161 = () => import("./index_Db7jjq8c.mjs");
var _page162 = () => import("./reorder_BBkioQXk.mjs");
var _page163 = () => import("./reorder_DM0gZgqj.mjs");
var _page164 = () => import("./_fieldSlug__nQ5X7YCk.mjs");
var _page165 = () => import("./index_Dkc5QWuk.mjs");
var _page166 = () => import("./index_Dwl2A2br.mjs");
var _page167 = () => import("./index_9ozN3W4n.mjs");
var _page168 = () => import("./_slug__j3w-qkd9.mjs");
var _page169 = () => import("./index_BI2LLYSz.mjs");
var _page170 = () => import("./index_Dpp0rVo_.mjs");
var _page171 = () => import("./enable_tRZ6Bnru.mjs");
var _page172 = () => import("./rebuild_BtzDT2_A.mjs");
var _page173 = () => import("./stats_C2ccFIrt.mjs");
var _page174 = () => import("./suggest_DL5C9m8o.mjs");
var _page175 = () => import("./index_C0MOvzR8.mjs");
var _page176 = () => import("./_slug__C_J512tb.mjs");
var _page177 = () => import("./index_BTVeWlo7.mjs");
var _page178 = () => import("./_name__D9tTL4c6.mjs");
var _page179 = () => import("./index_BcoO7kNO.mjs");
var _page180 = () => import("./export_CKxFYJL6.mjs");
var _page181 = () => import("./index_CdSjJFRO.mjs");
var _page182 = () => import("./domain-notify_1v3ynu09.mjs");
var _page183 = () => import("./domain_NG3_KJeE.mjs");
var _page184 = () => import("./email_BlufAnp4.mjs");
var _page185 = () => import("./settings_DqSd1bJ2.mjs");
var _page186 = () => import("./admin-verify_D4FSI8xb.mjs");
var _page187 = () => import("./admin_Bm5rU_jL.mjs");
var _page188 = () => import("./dev-bypass_BBtP7Ztw.mjs");
var _page189 = () => import("./dev-reset_COMJZu2E.mjs");
var _page190 = () => import("./status_BQEd_dtF.mjs");
var _page191 = () => import("./index_CvxTKV6v.mjs");
var _page192 = () => import("./domain-proof_DMLwOzmC.mjs");
var _page193 = () => import("./snapshot_BY2xtC_Q.mjs");
var _page194 = () => import("./bulk-tag_BX7Amnbw.mjs");
var _page195 = () => import("./reorder_DGFNrlDt.mjs");
var _page196 = () => import("./translations_Cyug412O.mjs");
var _page197 = () => import("./_slug__C9Jmo_8l.mjs");
var _page198 = () => import("./index_DuaO-G89.mjs");
var _page199 = () => import("./translations_Blyl0AOr.mjs");
var _page200 = () => import("./_name__Dq1owWip.mjs");
var _page201 = () => import("./index_Bn4NjPGz.mjs");
var _page202 = () => import("./preview_d0P54TDD.mjs");
var _page203 = () => import("./typegen_gpr5pPLb.mjs");
var _page204 = () => import("./action-token_eiBs_Ipw.mjs");
var _page205 = () => import("./publish_DC7ECVHL.mjs");
var _page206 = () => import("./toolbar-labels_B0mpzJ0k.mjs");
var _page207 = () => import("./reorder_BhIYeVIn.mjs");
var _page208 = () => import("./_id__BxEpPJPI.mjs");
var _page209 = () => import("./widgets_DnNWCKzE.mjs");
var _page210 = () => import("./_name__DfHaWU99.mjs");
var _page211 = () => import("./index__PEKzCdL.mjs");
var _page212 = () => import("./widget-components_R6gFU4xg.mjs");
var _page213 = () => import("./authorize_C9QbT85T.mjs");
var _page214 = () => import("./oauth-authorization-server_BW2WWtBs.mjs");
var _page215 = () => import("./oauth-protected-resource_DSKjoVx7.mjs");
var _page216 = () => import("./about-us_CkGMliZh.mjs");
var _page217 = () => import("./ai_jngpRmHY.mjs");
var _page218 = () => import("./apply-now_5QeU1dlv.mjs");
var _page219 = () => import("./index_BQN5Q1ZK.mjs");
var _page220 = () => import("./contact_s8Fv0Ogu.mjs");
var _page221 = () => import("./emdash-test_Bp3qq7LY.mjs");
var _page222 = () => import("./_slug__BrDwTiIR.mjs");
var _page223 = () => import("./index_Ze-oiWdv.mjs");
var _page224 = () => import("./our-work_BvyuHR1T.mjs");
var _page225 = () => import("./privacy-policy_BzO06Tm0.mjs");
var _page226 = () => import("./robots_CjvCS67l.mjs");
var _page227 = () => import("./services_yxuODlXy.mjs");
var _page228 = () => import("./sitemap_Ds5KuXx1.mjs");
var _page229 = () => import("./test_CLGjqxMH.mjs");
var _page230 = () => import("./gritcargo_BRlvgSvG.mjs");
var _page231 = () => import("./spotify_zuBH8twj.mjs");
var _page232 = () => import("./time2read_BtMYdOBF.mjs");
var _page233 = () => import("./index_DTP1IKV2.mjs");
var _page234 = () => import("./sitemap-_collection__Dv8VDJVv.mjs");
var _page235 = () => import("./index_DNvvsPrN.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/emdash/dist/astro/image-endpoint.mjs", _page0],
	["node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs", _page1],
	["node_modules/emdash/src/astro/routes/admin.astro", _page2],
	["node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs", _page3],
	["node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs", _page4],
	["node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs", _page5],
	["node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs", _page6],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs", _page7],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs", _page8],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs", _page9],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs", _page10],
	["node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs", _page11],
	["node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs", _page12],
	["node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs", _page13],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs", _page14],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs", _page15],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs", _page16],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs", _page17],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs", _page18],
	["node_modules/emdash/dist/astro/routes/api/admin/core-update.mjs", _page19],
	["node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs", _page20],
	["node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs", _page21],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation.mjs", _page22],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry.mjs", _page23],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index.mjs", _page24],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress.mjs", _page25],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs", _page26],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/retry.mjs", _page27],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/index.mjs", _page28],
	["node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs", _page29],
	["node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs", _page30],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs", _page31],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs", _page32],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs", _page33],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs", _page34],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs", _page35],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs", _page36],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle.mjs", _page37],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify.mjs", _page38],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall.mjs", _page39],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update.mjs", _page40],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs", _page41],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs", _page42],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs", _page43],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs", _page44],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs", _page45],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs", _page46],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs", _page47],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs", _page48],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs", _page49],
	["node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_.mjs", _page50],
	["node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs", _page51],
	["node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs", _page52],
	["node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs", _page53],
	["node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_.mjs", _page54],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable.mjs", _page55],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable.mjs", _page56],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs", _page57],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index.mjs", _page58],
	["node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs", _page59],
	["node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs", _page60],
	["node_modules/emdash/dist/astro/routes/api/auth/handover.mjs", _page61],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/accept.mjs", _page62],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/complete.mjs", _page63],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs", _page64],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs", _page65],
	["node_modules/emdash/dist/astro/routes/api/auth/logout.mjs", _page66],
	["node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs", _page67],
	["node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs", _page68],
	["node_modules/emdash/dist/astro/routes/api/auth/me.mjs", _page69],
	["node_modules/emdash/dist/astro/routes/api/auth/mode.mjs", _page70],
	["node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback.mjs", _page71],
	["node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs", _page72],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs", _page73],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs", _page74],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs", _page75],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs", _page76],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs", _page77],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/index.mjs", _page78],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/complete.mjs", _page79],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/register-options.mjs", _page80],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs", _page81],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs", _page82],
	["node_modules/emdash/dist/astro/routes/api/calendar.mjs", _page83],
	["node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs", _page84],
	["node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs", _page85],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/authors.mjs", _page86],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs", _page87],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs", _page88],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft.mjs", _page89],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs", _page90],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock.mjs", _page91],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs", _page92],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_.mjs", _page93],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs", _page94],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs", _page95],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/children.mjs", _page96],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents.mjs", _page97],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore.mjs", _page98],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions/editors.mjs", _page99],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs", _page100],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/room.mjs", _page101],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs", _page102],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs", _page103],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs", _page104],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish.mjs", _page105],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs", _page106],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs", _page107],
	["node_modules/emdash/dist/astro/routes/api/dashboard.mjs", _page108],
	["node_modules/emdash/dist/astro/routes/api/dev/emails.mjs", _page109],
	["node_modules/emdash/dist/astro/routes/api/health.mjs", _page110],
	["node_modules/emdash/dist/astro/routes/api/import/probe.mjs", _page111],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs", _page112],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs", _page113],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs", _page114],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs", _page115],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs", _page116],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs", _page117],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs", _page118],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs", _page119],
	["node_modules/emdash/dist/astro/routes/api/manifest.mjs", _page120],
	["node_modules/emdash/dist/astro/routes/api/mcp.mjs", _page121],
	["node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_.mjs", _page122],
	["node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs", _page123],
	["node_modules/emdash/dist/astro/routes/api/media/folders/_id_.mjs", _page124],
	["node_modules/emdash/dist/astro/routes/api/media/folders/index.mjs", _page125],
	["node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs", _page126],
	["node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs", _page127],
	["node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs", _page128],
	["node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs", _page129],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs", _page130],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/replace.mjs", _page131],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/upload.mjs", _page132],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs", _page133],
	["node_modules/emdash/dist/astro/routes/api/media/_id_.mjs", _page134],
	["node_modules/emdash/dist/astro/routes/api/media.mjs", _page135],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs", _page136],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs", _page137],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs", _page138],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs", _page139],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs", _page140],
	["node_modules/emdash/dist/astro/routes/api/menus/index.mjs", _page141],
	["node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs", _page142],
	["node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs", _page143],
	["node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs", _page144],
	["node_modules/emdash/dist/astro/routes/api/oauth/register.mjs", _page145],
	["node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs", _page146],
	["node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs", _page147],
	["node_modules/emdash/dist/astro/routes/api/oauth/token.mjs", _page148],
	["node_modules/emdash/dist/astro/routes/api/openapi.json.mjs", _page149],
	["node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs", _page150],
	["node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs", _page151],
	["node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs", _page152],
	["node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs", _page153],
	["node_modules/emdash/dist/astro/routes/api/redirects/index.mjs", _page154],
	["node_modules/emdash/dist/astro/routes/api/relations/_id_/index.mjs", _page155],
	["node_modules/emdash/dist/astro/routes/api/relations/index.mjs", _page156],
	["node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs", _page157],
	["node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs", _page158],
	["node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate.mjs", _page159],
	["node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index.mjs", _page160],
	["node_modules/emdash/dist/astro/routes/api/schema/block-types/index.mjs", _page161],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/reorder.mjs", _page162],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs", _page163],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs", _page164],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs", _page165],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs", _page166],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs", _page167],
	["node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs", _page168],
	["node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs", _page169],
	["node_modules/emdash/dist/astro/routes/api/schema/index.mjs", _page170],
	["node_modules/emdash/dist/astro/routes/api/search/enable.mjs", _page171],
	["node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs", _page172],
	["node_modules/emdash/dist/astro/routes/api/search/stats.mjs", _page173],
	["node_modules/emdash/dist/astro/routes/api/search/suggest.mjs", _page174],
	["node_modules/emdash/dist/astro/routes/api/search/index.mjs", _page175],
	["node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs", _page176],
	["node_modules/emdash/dist/astro/routes/api/sections/index.mjs", _page177],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs", _page178],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs", _page179],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs", _page180],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs", _page181],
	["node_modules/emdash/dist/astro/routes/api/settings/domain-notify.mjs", _page182],
	["node_modules/emdash/dist/astro/routes/api/settings/domain.mjs", _page183],
	["node_modules/emdash/dist/astro/routes/api/settings/email.mjs", _page184],
	["node_modules/emdash/dist/astro/routes/api/settings.mjs", _page185],
	["node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs", _page186],
	["node_modules/emdash/dist/astro/routes/api/setup/admin.mjs", _page187],
	["node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs", _page188],
	["node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs", _page189],
	["node_modules/emdash/dist/astro/routes/api/setup/status.mjs", _page190],
	["node_modules/emdash/dist/astro/routes/api/setup/index.mjs", _page191],
	["node_modules/emdash/dist/astro/routes/api/site/domain-proof.mjs", _page192],
	["node_modules/emdash/dist/astro/routes/api/snapshot.mjs", _page193],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag.mjs", _page194],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder.mjs", _page195],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs", _page196],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs", _page197],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs", _page198],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/translations.mjs", _page199],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_.mjs", _page200],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs", _page201],
	["node_modules/emdash/dist/astro/routes/api/themes/preview.mjs", _page202],
	["node_modules/emdash/dist/astro/routes/api/typegen.mjs", _page203],
	["node_modules/emdash/dist/astro/routes/api/visual-editing/action-token.mjs", _page204],
	["node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish.mjs", _page205],
	["node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels.mjs", _page206],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs", _page207],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs", _page208],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs", _page209],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_.mjs", _page210],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs", _page211],
	["node_modules/emdash/dist/astro/routes/api/widget-components.mjs", _page212],
	["node_modules/emdash/dist/astro/routes/api/oauth/authorize.mjs", _page213],
	["node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server.mjs", _page214],
	["node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs", _page215],
	["src/pages/about-us.astro", _page216],
	["src/pages/ai.astro", _page217],
	["src/pages/careers/apply-now.astro", _page218],
	["src/pages/careers/index.astro", _page219],
	["src/pages/contact.astro", _page220],
	["src/pages/emdash-test.astro", _page221],
	["src/pages/insights/[slug].astro", _page222],
	["src/pages/insights/index.astro", _page223],
	["src/pages/our-work.astro", _page224],
	["src/pages/privacy-policy.astro", _page225],
	["node_modules/emdash/dist/astro/routes/robots.txt.mjs", _page226],
	["src/pages/services.astro", _page227],
	["node_modules/emdash/dist/astro/routes/sitemap.xml.mjs", _page228],
	["src/pages/test.astro", _page229],
	["src/pages/work/gritcargo.astro", _page230],
	["src/pages/work/spotify.astro", _page231],
	["src/pages/work/time2read.astro", _page232],
	["src/pages/work/index.astro", _page233],
	["node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs", _page234],
	["src/pages/index.astro", _page235]
]);
// \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///Users/davidcorkill/Documents/Development/AvoChoc-Astro/","cacheDir":"file:///Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/.astro/","outDir":"file:///Users/davidcorkill/Documents/Development/AvoChoc-Astro/dist/","srcDir":"file:///Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/","publicDir":"file:///Users/davidcorkill/Documents/Development/AvoChoc-Astro/public/","buildClientDir":"file:///Users/davidcorkill/Documents/Development/AvoChoc-Astro/dist/","buildServerDir":"file:///Users/davidcorkill/Documents/Development/AvoChoc-Astro/.netlify/build/","adapterName":"@astrojs/netlify","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/emdash/dist/astro/image-endpoint.mjs","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/.well-known/auth","pattern":"^\\/_emdash\\/\\.well-known\\/auth\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs","pathname":"/_emdash/.well-known/auth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"#emdash-boot-loader[data-astro-cid-u6fdjxxc]{background:var(--color-kumo-elevated);justify-content:center;align-items:center;min-height:100vh;display:flex}#emdash-boot-loader[data-astro-cid-u6fdjxxc] .loader-inner[data-astro-cid-u6fdjxxc]{text-align:center}#emdash-boot-loader[data-astro-cid-u6fdjxxc] .spinner[data-astro-cid-u6fdjxxc]{border:2.5px solid var(--color-kumo-line);border-top-color:var(--text-color-kumo-subtle);border-radius:50%;width:24px;height:24px;margin:0 auto;animation:.8s linear infinite emdash-spin}#emdash-boot-loader[data-astro-cid-u6fdjxxc] p[data-astro-cid-u6fdjxxc]{font-family:var(--font-emdash,ui-sans-serif, system-ui, sans-serif);color:var(--text-color-kumo-subtle);margin-top:1rem;font-size:.875rem}@keyframes emdash-spin{to{transform:rotate(360deg)}}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/_emdash/admin/[...path]","pattern":"^\\/_emdash\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/emdash/src/astro/routes/admin.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/allowed-domains/[domain]","pattern":"^\\/_emdash\\/api\\/admin\\/allowed-domains\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"allowed-domains","dynamic":false,"spread":false}],[{"content":"domain","dynamic":true,"spread":false}]],"params":["domain"],"component":"node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/allowed-domains","pattern":"^\\/_emdash\\/api\\/admin\\/allowed-domains\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"allowed-domains","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs","pathname":"/_emdash/api/admin/allowed-domains","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/api-tokens/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/api-tokens\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"api-tokens","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/api-tokens","pattern":"^\\/_emdash\\/api\\/admin\\/api-tokens\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"api-tokens","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs","pathname":"/_emdash/api/admin/api-tokens","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields/reorder","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs","pathname":"/_emdash/api/admin/byline-fields/reorder","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields/[slug]/usage","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/usage\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"usage","dynamic":false,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields/[slug]","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs","pathname":"/_emdash/api/admin/byline-fields","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/bylines/[id]/translations","pattern":"^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"bylines","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/bylines/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"bylines","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/bylines","pattern":"^\\/_emdash\\/api\\/admin\\/bylines\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"bylines","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs","pathname":"/_emdash/api/admin/bylines","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/bulk","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/bulk\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"bulk","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs","pathname":"/_emdash/api/admin/comments/bulk","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/counts","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/counts\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"counts","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs","pathname":"/_emdash/api/admin/comments/counts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/[id]/status","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/status\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs","pathname":"/_emdash/api/admin/comments","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/core-update","pattern":"^\\/_emdash\\/api\\/admin\\/core-update\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"core-update","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/core-update.mjs","pathname":"/_emdash/api/admin/core-update","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/hooks/exclusive/[hookName]","pattern":"^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"hooks","dynamic":false,"spread":false}],[{"content":"exclusive","dynamic":false,"spread":false}],[{"content":"hookName","dynamic":true,"spread":false}]],"params":["hookName"],"component":"node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/hooks/exclusive","pattern":"^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"hooks","dynamic":false,"spread":false}],[{"content":"exclusive","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs","pathname":"/_emdash/api/admin/hooks/exclusive","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/activation","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/activation\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"activation","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation.mjs","pathname":"/_emdash/api/admin/media-usage/activation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/collection-deletions/retry","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/collection-deletions\\/retry\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"collection-deletions","dynamic":false,"spread":false}],[{"content":"retry","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry.mjs","pathname":"/_emdash/api/admin/media-usage/collection-deletions/retry","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/collection-deletions","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/collection-deletions\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"collection-deletions","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index.mjs","pathname":"/_emdash/api/admin/media-usage/collection-deletions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/progress","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/progress\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"progress","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress.mjs","pathname":"/_emdash/api/admin/media-usage/progress","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/repair","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/repair\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"repair","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs","pathname":"/_emdash/api/admin/media-usage/repair","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/work/retry","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/work\\/retry\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}],[{"content":"retry","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/retry.mjs","pathname":"/_emdash/api/admin/media-usage/work/retry","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/work","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/work\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/index.mjs","pathname":"/_emdash/api/admin/media-usage/work","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/oauth-clients/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/oauth-clients\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"oauth-clients","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/oauth-clients","pattern":"^\\/_emdash\\/api\\/admin\\/oauth-clients\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"oauth-clients","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs","pathname":"/_emdash/api/admin/oauth-clients","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace/[id]/icon","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/icon\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"icon","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace/[id]/install","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/install\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"install","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs","pathname":"/_emdash/api/admin/plugins/marketplace","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/artifact","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/artifact\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"artifact","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs","pathname":"/_emdash/api/admin/plugins/registry/artifact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/install","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/install\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"install","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs","pathname":"/_emdash/api/admin/plugins/registry/install","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/publisher-handle","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/publisher-handle\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"publisher-handle","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle.mjs","pathname":"/_emdash/api/admin/plugins/registry/publisher-handle","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/verify","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify.mjs","pathname":"/_emdash/api/admin/plugins/registry/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/[id]/uninstall","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/([^/]+?)\\/uninstall\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"uninstall","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/[id]/update","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/([^/]+?)\\/update\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"update","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/updates","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/updates\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"updates","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs","pathname":"/_emdash/api/admin/plugins/updates","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/disable","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/disable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"disable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/enable","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/enable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"enable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/mcp","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/mcp\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"mcp","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/settings","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/settings\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/uninstall","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/uninstall\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"uninstall","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/update","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/update\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"update","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs","pathname":"/_emdash/api/admin/plugins","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/scheduled-policy-rejections/[collection]/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/scheduled-policy-rejections\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"scheduled-policy-rejections","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/themes/marketplace/[id]/thumbnail","pattern":"^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/thumbnail\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"thumbnail","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/themes/marketplace/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/themes/marketplace","pattern":"^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs","pathname":"/_emdash/api/admin/themes/marketplace","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/transfer/[...path]","pattern":"^\\/_emdash\\/api\\/admin\\/transfer(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"transfer","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]/disable","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/disable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"disable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]/enable","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/enable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"enable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]/send-recovery","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/send-recovery\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"send-recovery","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs","pathname":"/_emdash/api/admin/users","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/dev-bypass","pattern":"^\\/_emdash\\/api\\/auth\\/dev-bypass\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"dev-bypass","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs","pathname":"/_emdash/api/auth/dev-bypass","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/handover","pattern":"^\\/_emdash\\/api\\/auth\\/handover\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"handover","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/handover.mjs","pathname":"/_emdash/api/auth/handover","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite/accept","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/accept\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}],[{"content":"accept","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/accept.mjs","pathname":"/_emdash/api/auth/invite/accept","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite/complete","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/complete\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}],[{"content":"complete","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/complete.mjs","pathname":"/_emdash/api/auth/invite/complete","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite/register-options","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/register-options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}],[{"content":"register-options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs","pathname":"/_emdash/api/auth/invite/register-options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs","pathname":"/_emdash/api/auth/invite","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/logout","pattern":"^\\/_emdash\\/api\\/auth\\/logout\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/logout.mjs","pathname":"/_emdash/api/auth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/magic-link/send","pattern":"^\\/_emdash\\/api\\/auth\\/magic-link\\/send\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"magic-link","dynamic":false,"spread":false}],[{"content":"send","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs","pathname":"/_emdash/api/auth/magic-link/send","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/magic-link/verify","pattern":"^\\/_emdash\\/api\\/auth\\/magic-link\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"magic-link","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs","pathname":"/_emdash/api/auth/magic-link/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/me","pattern":"^\\/_emdash\\/api\\/auth\\/me\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"me","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/me.mjs","pathname":"/_emdash/api/auth/me","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/mode","pattern":"^\\/_emdash\\/api\\/auth\\/mode\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"mode","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/mode.mjs","pathname":"/_emdash/api/auth/mode","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/oauth/[provider]/callback","pattern":"^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/callback\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"provider","dynamic":true,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":["provider"],"component":"node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/oauth/[provider]","pattern":"^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"provider","dynamic":true,"spread":false}]],"params":["provider"],"component":"node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/options","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs","pathname":"/_emdash/api/auth/passkey/options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/register/options","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}],[{"content":"options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs","pathname":"/_emdash/api/auth/passkey/register/options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/register/verify","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs","pathname":"/_emdash/api/auth/passkey/register/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/verify","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs","pathname":"/_emdash/api/auth/passkey/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/[id]","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/index.mjs","pathname":"/_emdash/api/auth/passkey","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/complete","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/complete\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"complete","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/complete.mjs","pathname":"/_emdash/api/auth/signup/complete","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/register-options","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/register-options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"register-options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/register-options.mjs","pathname":"/_emdash/api/auth/signup/register-options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/request","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/request\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"request","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs","pathname":"/_emdash/api/auth/signup/request","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/verify","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs","pathname":"/_emdash/api/auth/signup/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/calendar","pattern":"^\\/_emdash\\/api\\/calendar\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"calendar","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/calendar.mjs","pathname":"/_emdash/api/calendar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/comments/[collection]/[contentId]/reactions","pattern":"^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/reactions\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"contentId","dynamic":true,"spread":false}],[{"content":"reactions","dynamic":false,"spread":false}]],"params":["collection","contentId"],"component":"node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/comments/[collection]/[contentId]","pattern":"^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"contentId","dynamic":true,"spread":false}]],"params":["collection","contentId"],"component":"node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/authors","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/authors\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"authors","dynamic":false,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/authors.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/trash","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/trash\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"trash","dynamic":false,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/compare","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/compare\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"compare","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/discard-draft","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/discard-draft\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"discard-draft","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/duplicate","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/duplicate\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"duplicate","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/lock","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/lock\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"lock","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/permanent","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/permanent\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"permanent","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/plugin-extensions/[pluginId]/[kind]/[extensionId]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/plugin-extensions\\/([^/]+?)\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"plugin-extensions","dynamic":false,"spread":false}],[{"content":"pluginId","dynamic":true,"spread":false}],[{"content":"kind","dynamic":true,"spread":false}],[{"content":"extensionId","dynamic":true,"spread":false}]],"params":["collection","id","pluginId","kind","extensionId"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/preview-url","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/preview-url\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"preview-url","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/publish","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"publish","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/references/[relation]/children","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/references\\/([^/]+?)\\/children\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"references","dynamic":false,"spread":false}],[{"content":"relation","dynamic":true,"spread":false}],[{"content":"children","dynamic":false,"spread":false}]],"params":["collection","id","relation"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/children.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/references/[relation]/parents","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/references\\/([^/]+?)\\/parents\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"references","dynamic":false,"spread":false}],[{"content":"relation","dynamic":true,"spread":false}],[{"content":"parents","dynamic":false,"spread":false}]],"params":["collection","id","relation"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/restore","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/restore\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"restore","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/revisions/editors","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/revisions\\/editors\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}],[{"content":"editors","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions/editors.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/revisions","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/revisions\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/room","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/room\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"room","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/room.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/schedule","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/schedule\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"schedule","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/terms/[taxonomy]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"taxonomy","dynamic":true,"spread":false}]],"params":["collection","id","taxonomy"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/translations","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/unpublish","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/unpublish\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"unpublish","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/dashboard","pattern":"^\\/_emdash\\/api\\/dashboard\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/dashboard.mjs","pathname":"/_emdash/api/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/dev/emails","pattern":"^\\/_emdash\\/api\\/dev\\/emails\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"dev","dynamic":false,"spread":false}],[{"content":"emails","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/dev/emails.mjs","pathname":"/_emdash/api/dev/emails","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/health","pattern":"^\\/_emdash\\/api\\/health\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"health","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/health.mjs","pathname":"/_emdash/api/health","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/probe","pattern":"^\\/_emdash\\/api\\/import\\/probe\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"probe","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/probe.mjs","pathname":"/_emdash/api/import/probe","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/analyze","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/analyze\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"analyze","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs","pathname":"/_emdash/api/import/wordpress/analyze","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/execute","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/execute\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"execute","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs","pathname":"/_emdash/api/import/wordpress/execute","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/media","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/media\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs","pathname":"/_emdash/api/import/wordpress/media","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/prepare","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/prepare\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"prepare","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs","pathname":"/_emdash/api/import/wordpress/prepare","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/rewrite-urls","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/rewrite-urls\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"rewrite-urls","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs","pathname":"/_emdash/api/import/wordpress/rewrite-urls","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress-plugin/analyze","pattern":"^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/analyze\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress-plugin","dynamic":false,"spread":false}],[{"content":"analyze","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs","pathname":"/_emdash/api/import/wordpress-plugin/analyze","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress-plugin/callback","pattern":"^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/callback\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress-plugin","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs","pathname":"/_emdash/api/import/wordpress-plugin/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress-plugin/execute","pattern":"^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/execute\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress-plugin","dynamic":false,"spread":false}],[{"content":"execute","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs","pathname":"/_emdash/api/import/wordpress-plugin/execute","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/manifest","pattern":"^\\/_emdash\\/api\\/manifest\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"manifest","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/manifest.mjs","pathname":"/_emdash/api/manifest","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/mcp","pattern":"^\\/_emdash\\/api\\/mcp\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"mcp","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/mcp.mjs","pathname":"/_emdash/api/mcp","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/asset/[id]/[filename]","pattern":"^\\/_emdash\\/api\\/media\\/asset\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"asset","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"filename","dynamic":true,"spread":false}]],"params":["id","filename"],"component":"node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/file/[...key]","pattern":"^\\/_emdash\\/api\\/media\\/file(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"file","dynamic":false,"spread":false}],[{"content":"...key","dynamic":true,"spread":true}]],"params":["...key"],"component":"node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/folders/[id]","pattern":"^\\/_emdash\\/api\\/media\\/folders\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"folders","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/folders/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/folders","pattern":"^\\/_emdash\\/api\\/media\\/folders\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"folders","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media/folders/index.mjs","pathname":"/_emdash/api/media/folders","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/providers/[providerId]/[itemId]","pattern":"^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"providers","dynamic":false,"spread":false}],[{"content":"providerId","dynamic":true,"spread":false}],[{"content":"itemId","dynamic":true,"spread":false}]],"params":["providerId","itemId"],"component":"node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/providers/[providerId]","pattern":"^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"providers","dynamic":false,"spread":false}],[{"content":"providerId","dynamic":true,"spread":false}]],"params":["providerId"],"component":"node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/providers","pattern":"^\\/_emdash\\/api\\/media\\/providers\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"providers","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs","pathname":"/_emdash/api/media/providers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/upload-url","pattern":"^\\/_emdash\\/api\\/media\\/upload-url\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"upload-url","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs","pathname":"/_emdash/api/media/upload-url","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/confirm","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/confirm\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"confirm","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/replace","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/replace\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"replace","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/replace.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/upload","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/upload\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/upload.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/usage","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/usage\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"usage","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media","pattern":"^\\/_emdash\\/api\\/media\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media.mjs","pathname":"/_emdash/api/media","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/items/[id]","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"items","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["name","id"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/items","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"items","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/reorder","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/translations","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus","pattern":"^\\/_emdash\\/api\\/menus\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/menus/index.mjs","pathname":"/_emdash/api/menus","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/device/authorize","pattern":"^\\/_emdash\\/api\\/oauth\\/device\\/authorize\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"device","dynamic":false,"spread":false}],[{"content":"authorize","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs","pathname":"/_emdash/api/oauth/device/authorize","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/device/code","pattern":"^\\/_emdash\\/api\\/oauth\\/device\\/code\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"device","dynamic":false,"spread":false}],[{"content":"code","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs","pathname":"/_emdash/api/oauth/device/code","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/device/token","pattern":"^\\/_emdash\\/api\\/oauth\\/device\\/token\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"device","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs","pathname":"/_emdash/api/oauth/device/token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/register","pattern":"^\\/_emdash\\/api\\/oauth\\/register\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/register.mjs","pathname":"/_emdash/api/oauth/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/token/refresh","pattern":"^\\/_emdash\\/api\\/oauth\\/token\\/refresh\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}],[{"content":"refresh","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs","pathname":"/_emdash/api/oauth/token/refresh","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/token/revoke","pattern":"^\\/_emdash\\/api\\/oauth\\/token\\/revoke\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}],[{"content":"revoke","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs","pathname":"/_emdash/api/oauth/token/revoke","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/token","pattern":"^\\/_emdash\\/api\\/oauth\\/token\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/token.mjs","pathname":"/_emdash/api/oauth/token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/openapi.json","pattern":"^\\/_emdash\\/api\\/openapi\\.json$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"openapi.json","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/openapi.json.mjs","pathname":"/_emdash/api/openapi.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/plugins/[pluginId]/[...path]","pattern":"^\\/_emdash\\/api\\/plugins\\/([^/]+?)(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"pluginId","dynamic":true,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["pluginId","...path"],"component":"node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects/404s/summary","pattern":"^\\/_emdash\\/api\\/redirects\\/404s\\/summary\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}],[{"content":"404s","dynamic":false,"spread":false}],[{"content":"summary","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs","pathname":"/_emdash/api/redirects/404s/summary","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects/404s","pattern":"^\\/_emdash\\/api\\/redirects\\/404s\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}],[{"content":"404s","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs","pathname":"/_emdash/api/redirects/404s","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects/[id]","pattern":"^\\/_emdash\\/api\\/redirects\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects","pattern":"^\\/_emdash\\/api\\/redirects\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/redirects/index.mjs","pathname":"/_emdash/api/redirects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/relations/[id]","pattern":"^\\/_emdash\\/api\\/relations\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"relations","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/relations/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/relations","pattern":"^\\/_emdash\\/api\\/relations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"relations","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/relations/index.mjs","pathname":"/_emdash/api/relations","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/revisions/[revisionId]/restore","pattern":"^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/restore\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}],[{"content":"revisionId","dynamic":true,"spread":false}],[{"content":"restore","dynamic":false,"spread":false}]],"params":["revisionId"],"component":"node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/revisions/[revisionId]","pattern":"^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}],[{"content":"revisionId","dynamic":true,"spread":false}]],"params":["revisionId"],"component":"node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/block-types/[slug]/versions/[version]/activate","pattern":"^\\/_emdash\\/api\\/schema\\/block-types\\/([^/]+?)\\/versions\\/([^/]+?)\\/activate\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"block-types","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"versions","dynamic":false,"spread":false}],[{"content":"version","dynamic":true,"spread":false}],[{"content":"activate","dynamic":false,"spread":false}]],"params":["slug","version"],"component":"node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/block-types/[slug]","pattern":"^\\/_emdash\\/api\\/schema\\/block-types\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"block-types","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/block-types","pattern":"^\\/_emdash\\/api\\/schema\\/block-types\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"block-types","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/block-types/index.mjs","pathname":"/_emdash/api/schema/block-types","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/reorder","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/reorder.mjs","pathname":"/_emdash/api/schema/collections/reorder","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]/fields/reorder","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"fields","dynamic":false,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]/fields/[fieldSlug]","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"fields","dynamic":false,"spread":false}],[{"content":"fieldSlug","dynamic":true,"spread":false}]],"params":["slug","fieldSlug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]/fields","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"fields","dynamic":false,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs","pathname":"/_emdash/api/schema/collections","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/orphans/[slug]","pattern":"^\\/_emdash\\/api\\/schema\\/orphans\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"orphans","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/orphans","pattern":"^\\/_emdash\\/api\\/schema\\/orphans\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"orphans","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs","pathname":"/_emdash/api/schema/orphans","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema","pattern":"^\\/_emdash\\/api\\/schema\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/index.mjs","pathname":"/_emdash/api/schema","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/enable","pattern":"^\\/_emdash\\/api\\/search\\/enable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"enable","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/enable.mjs","pathname":"/_emdash/api/search/enable","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/rebuild","pattern":"^\\/_emdash\\/api\\/search\\/rebuild\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"rebuild","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs","pathname":"/_emdash/api/search/rebuild","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/stats","pattern":"^\\/_emdash\\/api\\/search\\/stats\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"stats","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/stats.mjs","pathname":"/_emdash/api/search/stats","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/suggest","pattern":"^\\/_emdash\\/api\\/search\\/suggest\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"suggest","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/suggest.mjs","pathname":"/_emdash/api/search/suggest","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search","pattern":"^\\/_emdash\\/api\\/search\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/index.mjs","pathname":"/_emdash/api/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/sections/[slug]","pattern":"^\\/_emdash\\/api\\/sections\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"sections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/sections","pattern":"^\\/_emdash\\/api\\/sections\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"sections","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/sections/index.mjs","pathname":"/_emdash/api/sections","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups/archives/[name]","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}],[{"content":"archives","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups/archives","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}],[{"content":"archives","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs","pathname":"/_emdash/api/settings/backups/archives","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups/export","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/export\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}],[{"content":"export","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs","pathname":"/_emdash/api/settings/backups/export","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs","pathname":"/_emdash/api/settings/backups","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/domain/notify","pattern":"^\\/_emdash\\/api\\/settings\\/domain\\/notify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"domain","dynamic":false,"spread":false}],[{"content":"notify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/domain-notify.mjs","pathname":"/_emdash/api/settings/domain/notify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/domain","pattern":"^\\/_emdash\\/api\\/settings\\/domain\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"domain","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/domain.mjs","pathname":"/_emdash/api/settings/domain","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/email","pattern":"^\\/_emdash\\/api\\/settings\\/email\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"email","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/email.mjs","pathname":"/_emdash/api/settings/email","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings","pattern":"^\\/_emdash\\/api\\/settings\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings.mjs","pathname":"/_emdash/api/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/admin/verify","pattern":"^\\/_emdash\\/api\\/setup\\/admin\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs","pathname":"/_emdash/api/setup/admin/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/admin","pattern":"^\\/_emdash\\/api\\/setup\\/admin\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/admin.mjs","pathname":"/_emdash/api/setup/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/dev-bypass","pattern":"^\\/_emdash\\/api\\/setup\\/dev-bypass\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"dev-bypass","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs","pathname":"/_emdash/api/setup/dev-bypass","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/dev-reset","pattern":"^\\/_emdash\\/api\\/setup\\/dev-reset\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"dev-reset","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs","pathname":"/_emdash/api/setup/dev-reset","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/status","pattern":"^\\/_emdash\\/api\\/setup\\/status\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/status.mjs","pathname":"/_emdash/api/setup/status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup","pattern":"^\\/_emdash\\/api\\/setup\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/index.mjs","pathname":"/_emdash/api/setup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/site/domain-proof","pattern":"^\\/_emdash\\/api\\/site\\/domain-proof\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"site","dynamic":false,"spread":false}],[{"content":"domain-proof","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/site/domain-proof.mjs","pathname":"/_emdash/api/site/domain-proof","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/snapshot","pattern":"^\\/_emdash\\/api\\/snapshot\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"snapshot","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/snapshot.mjs","pathname":"/_emdash/api/snapshot","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/bulk-tag","pattern":"^\\/_emdash\\/api\\/taxonomies\\/bulk-tag\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"bulk-tag","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag.mjs","pathname":"/_emdash/api/taxonomies/bulk-tag","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/reorder","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/terms/[slug]/translations","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["name","slug"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/terms/[slug]","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["name","slug"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/terms","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/translations","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies","pattern":"^\\/_emdash\\/api\\/taxonomies\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs","pathname":"/_emdash/api/taxonomies","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/themes/preview","pattern":"^\\/_emdash\\/api\\/themes\\/preview\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"preview","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/themes/preview.mjs","pathname":"/_emdash/api/themes/preview","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/typegen","pattern":"^\\/_emdash\\/api\\/typegen\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"typegen","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/typegen.mjs","pathname":"/_emdash/api/typegen","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/visual-editing/action-token","pattern":"^\\/_emdash\\/api\\/visual-editing\\/action-token\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"visual-editing","dynamic":false,"spread":false}],[{"content":"action-token","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/visual-editing/action-token.mjs","pathname":"/_emdash/api/visual-editing/action-token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/visual-editing/content/[collection]/[id]/publish","pattern":"^\\/_emdash\\/api\\/visual-editing\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"visual-editing","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"publish","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/visual-editing/toolbar-labels","pattern":"^\\/_emdash\\/api\\/visual-editing\\/toolbar-labels\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"visual-editing","dynamic":false,"spread":false}],[{"content":"toolbar-labels","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels.mjs","pathname":"/_emdash/api/visual-editing/toolbar-labels","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]/reorder","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]/widgets/[id]","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"widgets","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["name","id"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]/widgets","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"widgets","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas","pattern":"^\\/_emdash\\/api\\/widget-areas\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs","pathname":"/_emdash/api/widget-areas","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-components","pattern":"^\\/_emdash\\/api\\/widget-components\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-components","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/widget-components.mjs","pathname":"/_emdash/api/widget-components","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/oauth/authorize","pattern":"^\\/_emdash\\/oauth\\/authorize\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"authorize","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/authorize.mjs","pathname":"/_emdash/oauth/authorize","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/.well-known/oauth-authorization-server/_emdash","pattern":"^\\/\\.well-known\\/oauth-authorization-server\\/_emdash\\/?$","segments":[[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"oauth-authorization-server","dynamic":false,"spread":false}],[{"content":"_emdash","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server.mjs","pathname":"/.well-known/oauth-authorization-server/_emdash","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/.well-known/oauth-protected-resource","pattern":"^\\/\\.well-known\\/oauth-protected-resource\\/?$","segments":[[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"oauth-protected-resource","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs","pathname":"/.well-known/oauth-protected-resource","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".hero[data-astro-cid-nsjupmmc]{background-position:50%;background-repeat:no-repeat;background-size:cover;width:100%}.hero__container[data-astro-cid-nsjupmmc]{width:100%;min-height:var(--hero-min-height);box-sizing:border-box;align-items:center;margin:0 auto;display:flex}.hero__content[data-astro-cid-nsjupmmc]{width:100%}\n"},{"type":"external","src":"_astro/about-us.D_PhxD_v.css"},{"type":"inline","content":".section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-font-size);font-weight:var(--section-title-font-weight);color:var(--section-title-color);line-height:var(--section-title-line-height);text-transform:var(--section-title-text-transform)}@media screen and (width<=799px){.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-mobile-font-size)}}\n.contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-100);background-image:url(/images/backgrounds/hero/fractal-glass.webp);background-position:50%;background-repeat:no-repeat;background-size:cover}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);flex-direction:column;justify-content:space-between;align-self:stretch;display:flex}.contact-section-body[data-astro-cid-vdfkasy4]{font-weight:var(--font-weight-regular);letter-spacing:-.045rem;max-width:27rem;line-height:1.2}.contact-section-footer[data-astro-cid-vdfkasy4]{color:var(--grey-600);font-size:var(--font-size-20);line-height:1.5}.contact-section__right[data-astro-cid-vdfkasy4]{justify-content:flex-end;display:flex}.contact-section__right-inner[data-astro-cid-vdfkasy4]{background-color:var(--white-10);backdrop-filter:blur(16px);padding:var(--space-56);border-radius:1rem;width:100%;max-width:42.687rem}@media screen and (width<=799px){.contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-64) 0}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);gap:var(--space-48)}.contact-section-body[data-astro-cid-vdfkasy4]{color:var(--white)}.contact-section__right-inner[data-astro-cid-vdfkasy4]{padding:var(--space-24)}}\n"}],"routeData":{"route":"/about-us","isIndex":false,"type":"page","pattern":"^\\/about-us\\/?$","segments":[[{"content":"about-us","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about-us.astro","pathname":"/about-us","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".hero[data-astro-cid-nsjupmmc]{background-position:50%;background-repeat:no-repeat;background-size:cover;width:100%}.hero__container[data-astro-cid-nsjupmmc]{width:100%;min-height:var(--hero-min-height);box-sizing:border-box;align-items:center;margin:0 auto;display:flex}.hero__content[data-astro-cid-nsjupmmc]{width:100%}\n"},{"type":"external","src":"_astro/ai.B_dclLq3.css"},{"type":"inline","content":".highlight-box[data-astro-cid-cgy4vzxo]{width:fit-content;max-width:100%;padding-block:var(--std-btn-padding-y);padding-inline:var(--std-btn-padding-x);background:var(--highlight-background);color:var(--highlight-text);font-size:var(--highlight-font-size);box-sizing:border-box;flex-direction:column;justify-content:center;align-items:center;gap:.125rem;display:flex;position:relative}.highlight-box[data-astro-cid-cgy4vzxo]:before,.highlight-box[data-astro-cid-cgy4vzxo]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent), var(--highlight-accent)) left top / .25rem .25rem no-repeat, linear-gradient(var(--highlight-accent), var(--highlight-accent)) right top / .25rem .25rem no-repeat, linear-gradient(var(--highlight-accent), var(--highlight-accent)) left bottom / .25rem .25rem no-repeat, linear-gradient(var(--highlight-accent), var(--highlight-accent)) right bottom / .25rem .25rem no-repeat;position:absolute;inset:0}\n.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-font-size);font-weight:var(--section-title-font-weight);color:var(--section-title-color);line-height:var(--section-title-line-height);text-transform:var(--section-title-text-transform)}@media screen and (width<=799px){.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-mobile-font-size)}}\n.highlight-section[data-astro-cid-qhw7wc4u]{border:var(--highlight-border);padding:var(--highlight-padding);background:var(--highlight-background);color:var(--highlight-text-color);min-height:var(--highlight-min-height);z-index:2;align-items:center;display:flex;position:relative}.highlight-section[data-astro-cid-qhw7wc4u]:before{content:\"\";pointer-events:none;z-index:1;background:repeating-linear-gradient(to right, var(--blue) 0 3px, var(--navy) 3px 6px) top / 100% 2px no-repeat, repeating-linear-gradient(to right, var(--blue) 0 3px, var(--navy) 3px 6px) bottom / 100% 2px no-repeat, repeating-linear-gradient(to bottom, var(--blue) 0 3px, var(--navy) 3px 6px) left / 2px 100% no-repeat, repeating-linear-gradient(to bottom, var(--blue) 0 3px, var(--navy) 3px 6px) right / 2px 100% no-repeat;position:absolute;inset:0}.highlight-section[data-astro-cid-qhw7wc4u]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left top / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right top / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left bottom / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right bottom / 2rem 2rem no-repeat;z-index:2;position:absolute;inset:0}.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:var(--highlight-custom-columns);gap:var(--highlight-gap);display:grid}@media (width<=800px){.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:repeat(min(var(--highlight-columns), 2), minmax(0, 1fr))}}@media only screen and (width<=799px){.highlight-section[data-astro-cid-qhw7wc4u]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left top / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right top / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left bottom / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right bottom / 1rem 1rem no-repeat;z-index:2;position:absolute;inset:0}}@media (width<=560px){.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:1fr}}\n.contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-100);background-image:url(/images/backgrounds/hero/fractal-glass.webp);background-position:50%;background-repeat:no-repeat;background-size:cover}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);flex-direction:column;justify-content:space-between;align-self:stretch;display:flex}.contact-section-body[data-astro-cid-vdfkasy4]{font-weight:var(--font-weight-regular);letter-spacing:-.045rem;max-width:27rem;line-height:1.2}.contact-section-footer[data-astro-cid-vdfkasy4]{color:var(--grey-600);font-size:var(--font-size-20);line-height:1.5}.contact-section__right[data-astro-cid-vdfkasy4]{justify-content:flex-end;display:flex}.contact-section__right-inner[data-astro-cid-vdfkasy4]{background-color:var(--white-10);backdrop-filter:blur(16px);padding:var(--space-56);border-radius:1rem;width:100%;max-width:42.687rem}@media screen and (width<=799px){.contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-64) 0}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);gap:var(--space-48)}.contact-section-body[data-astro-cid-vdfkasy4]{color:var(--white)}.contact-section__right-inner[data-astro-cid-vdfkasy4]{padding:var(--space-24)}}\n"}],"routeData":{"route":"/ai","isIndex":false,"type":"page","pattern":"^\\/ai\\/?$","segments":[[{"content":"ai","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ai.astro","pathname":"/ai","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-font-size);font-weight:var(--section-title-font-weight);color:var(--section-title-color);line-height:var(--section-title-line-height);text-transform:var(--section-title-text-transform)}@media screen and (width<=799px){.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-mobile-font-size)}}\n.apply-section[data-astro-cid-ngv6gppr]{padding-top:200px;padding-bottom:var(--space-100);background:url(/images/backgrounds/hero/hero_image5.webp) top/cover no-repeat}.apply-left-col[data-astro-cid-ngv6gppr] .contact-us__title h2{margin-bottom:var(--space-16);line-height:1.25}.title-subtxt[data-astro-cid-ngv6gppr]{font-size:var(--font-size-24);font-weight:var(--font-weight-medium);color:var(--white);line-height:1.3}.apply-right-col[data-astro-cid-ngv6gppr]{gap:var(--space-8);flex-direction:column;display:flex}.apply-right-col[data-astro-cid-ngv6gppr] .glass-section[data-astro-cid-ngv6gppr]{background:var(--white-50);-webkit-backdrop-filter:blur(15px);border-radius:1rem;width:100%}.CTA-section[data-astro-cid-ngv6gppr]{gap:var(--space-8);padding:var(--space-24);flex-direction:column;display:flex}.CTA-section[data-astro-cid-ngv6gppr] h2[data-astro-cid-ngv6gppr],.apply-form-section[data-astro-cid-ngv6gppr] h2[data-astro-cid-ngv6gppr]{font-size:var(--font-size-24);font-weight:var(--font-weight-semibold);color:var(--navy);text-transform:uppercase;margin-bottom:var(--space-16);line-height:1.3}.contact-form-section[data-astro-cid-ngv6gppr] h2[data-astro-cid-ngv6gppr]{margin-bottom:var(--space-32)}.serious-tech-section[data-astro-cid-ngv6gppr] h2[data-astro-cid-ngv6gppr]{margin-bottom:0}.CTA-section__new-project[data-astro-cid-ngv6gppr],.CTA-section__existing-client[data-astro-cid-ngv6gppr],.CTA-section__careers[data-astro-cid-ngv6gppr]{gap:var(--space-16);border:1px solid var(--white);padding-block:var(--space-8);padding-inline:var(--space-16);display:flex}.CTA-icon[data-astro-cid-ngv6gppr]{margin:auto 0}.new-project-content__heading[data-astro-cid-ngv6gppr]{font-size:var(--font-size-18);font-weight:var(--font-weight-regular);color:var(--navy);line-height:1.5}.new-project-content__body[data-astro-cid-ngv6gppr]{font-size:var(--font-size-14);font-weight:var(--font-weight-regular);color:var(--grey-600);line-height:1.5}.contact-form-section[data-astro-cid-ngv6gppr]{padding-block:var(--space-48) var(--space-12);padding-inline:var(--space-24)}.form__control::placeholder{color:var(--navy)!important}.form__control{border:1px solid var(--navy)!important;background:0 0!important}.footer{padding-top:var(--space-44)!important}@media screen and (width<=799px){.primary-btn.form__submit,.call-btn,.serious-tech-section-location_1[data-astro-cid-ngv6gppr]{width:100%}.avo-talk-inner[data-astro-cid-ngv6gppr]{gap:var(--space-16)}.avo-talk[data-astro-cid-ngv6gppr],.serious-tech-section-location[data-astro-cid-ngv6gppr]{flex-wrap:wrap}.avo-contact[data-astro-cid-ngv6gppr]{margin-top:var(--space-24);padding-block:var(--space-64)}}\n"}],"routeData":{"route":"/careers/apply-now","isIndex":false,"type":"page","pattern":"^\\/careers\\/apply-now\\/?$","segments":[[{"content":"careers","dynamic":false,"spread":false}],[{"content":"apply-now","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/careers/apply-now.astro","pathname":"/careers/apply-now","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".hero[data-astro-cid-nsjupmmc]{background-position:50%;background-repeat:no-repeat;background-size:cover;width:100%}.hero__container[data-astro-cid-nsjupmmc]{width:100%;min-height:var(--hero-min-height);box-sizing:border-box;align-items:center;margin:0 auto;display:flex}.hero__content[data-astro-cid-nsjupmmc]{width:100%}\n.careers-hero-columns{min-height:25.687rem}.careers-hero-left[data-astro-cid-yxit562w] h1[data-astro-cid-yxit562w]{font-size:var(--font-size-60);font-weight:var(--font-weight-semibold);color:var(--grey);letter-spacing:-.075rem}.careers-hero-right[data-astro-cid-yxit562w]{flex-direction:column;justify-content:flex-end;margin-top:auto;display:flex}.careers-hero-right[data-astro-cid-yxit562w] p[data-astro-cid-yxit562w]{font-size:var(--font-size-24);font-weight:var(--font-weight-regular);color:var(--white);padding-bottom:var(--space-24);line-height:1.3}.hero__actions[data-astro-cid-yxit562w]{gap:var(--space-16);display:flex}@media only screen and (width<=799px){.careers-hero-left[data-astro-cid-yxit562w] h1[data-astro-cid-yxit562w]{font-size:var(--font-size-48);letter-spacing:-.06rem}.hero__actions[data-astro-cid-yxit562w]{gap:var(--space-24);flex-direction:column;display:flex}}.avo-hiring[data-astro-cid-farnf4ge]{padding-block:var(--space-80)}.avo-nothing-available-inner[data-astro-cid-7vrrq7bn]{padding-block:var(--space-120);gap:var(--space-24);text-align:center;flex-direction:column;display:flex}.avo-nothing-available-inner[data-astro-cid-7vrrq7bn] h3[data-astro-cid-7vrrq7bn]{font-size:var(--font-size-24);font-weight:var(--font-weight-regular);color:var(--navy)}\n.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-font-size);font-weight:var(--section-title-font-weight);color:var(--section-title-color);line-height:var(--section-title-line-height);text-transform:var(--section-title-text-transform)}@media screen and (width<=799px){.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-mobile-font-size)}}\n"}],"routeData":{"route":"/careers","isIndex":true,"type":"page","pattern":"^\\/careers\\/?$","segments":[[{"content":"careers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/careers/index.astro","pathname":"/careers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-font-size);font-weight:var(--section-title-font-weight);color:var(--section-title-color);line-height:var(--section-title-line-height);text-transform:var(--section-title-text-transform)}@media screen and (width<=799px){.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-mobile-font-size)}}\n"},{"type":"external","src":"_astro/contact._uNPv7oV.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/emdash-test","isIndex":false,"type":"page","pattern":"^\\/emdash-test\\/?$","segments":[[{"content":"emdash-test","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/emdash-test.astro","pathname":"/emdash-test","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"external","src":"_astro/_slug_.BUmZnVea.css"},{"type":"inline","content":".emdash-image-media[data-astro-cid-6depetnu]{max-width:100%;height:auto}:where(:root.dark) .emdash-image--light,:where(:root.light) .emdash-image--dark{display:none}@media (prefers-color-scheme:dark){:where(:root:not(.light)) .emdash-image--light{display:none}}@media (prefers-color-scheme:light){:where(:root:not(.dark)) .emdash-image--dark{display:none}}\n"}],"routeData":{"route":"/insights/[slug]","isIndex":false,"type":"page","pattern":"^\\/insights\\/([^/]+?)\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/insights/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".insight-card[data-astro-cid-2ebrr4in]{border:1px solid #ddd;border-radius:8px;overflow:hidden}.insight-card__image-link[data-astro-cid-2ebrr4in]{display:block}.insight-card__image[data-astro-cid-2ebrr4in]{aspect-ratio:16/9;object-fit:cover;width:100%;display:block}.insight-card__content[data-astro-cid-2ebrr4in]{padding:2rem}.insight-card__title[data-astro-cid-2ebrr4in]{margin-top:0}.insight-card__title[data-astro-cid-2ebrr4in] a[data-astro-cid-2ebrr4in]{color:inherit;text-decoration:none}.insight-card__excerpt[data-astro-cid-2ebrr4in]{margin:1rem 0}.insight-card__link[data-astro-cid-2ebrr4in]{margin-top:1rem;display:inline-block}.insights-grid[data-astro-cid-3l6nfym5]{padding:4rem 2rem}.insights-grid__container[data-astro-cid-3l6nfym5]{grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;max-width:1200px;margin:0 auto;display:grid}.insights-page-header[data-astro-cid-pt5ruj3o]{padding:6rem 2rem 2rem}.insights-page-header__container[data-astro-cid-pt5ruj3o]{max-width:1200px;margin:0 auto}\n"},{"type":"external","src":"_astro/_slug_.BUmZnVea.css"},{"type":"inline","content":".emdash-image-media[data-astro-cid-6depetnu]{max-width:100%;height:auto}:where(:root.dark) .emdash-image--light,:where(:root.light) .emdash-image--dark{display:none}@media (prefers-color-scheme:dark){:where(:root:not(.light)) .emdash-image--light{display:none}}@media (prefers-color-scheme:light){:where(:root:not(.dark)) .emdash-image--dark{display:none}}\n"}],"routeData":{"route":"/insights","isIndex":true,"type":"page","pattern":"^\\/insights\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/insights/index.astro","pathname":"/insights","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"}],"routeData":{"route":"/our-work","isIndex":false,"type":"page","pattern":"^\\/our-work\\/?$","segments":[[{"content":"our-work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/our-work.astro","pathname":"/our-work","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".hero[data-astro-cid-nsjupmmc]{background-position:50%;background-repeat:no-repeat;background-size:cover;width:100%}.hero__container[data-astro-cid-nsjupmmc]{width:100%;min-height:var(--hero-min-height);box-sizing:border-box;align-items:center;margin:0 auto;display:flex}.hero__content[data-astro-cid-nsjupmmc]{width:100%}\n.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-font-size);font-weight:var(--section-title-font-weight);color:var(--section-title-color);line-height:var(--section-title-line-height);text-transform:var(--section-title-text-transform)}@media screen and (width<=799px){.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-mobile-font-size)}}\n.columns.columns--stack.privacy-hero-container{min-height:25.687rem}.privacy-hero-left[data-astro-cid-uu3lhznn] h1[data-astro-cid-uu3lhznn]{font-size:var(--font-size-60);font-weight:var(--font-weight-semibold);color:var(--white);letter-spacing:-.075rem}.privacy-hero-right[data-astro-cid-uu3lhznn]{gap:var(--space-20);flex-direction:column;margin-top:auto;display:flex}.privacy-hero-right[data-astro-cid-uu3lhznn] .publish-pill[data-astro-cid-uu3lhznn]{font-size:var(--font-size-14);color:var(--black);width:fit-content;padding:var(--space-8) var(--space-16);background:var(--white-50);border-radius:var(--border-radius-large)}.privacy-hero-right[data-astro-cid-uu3lhznn]{font-size:var(--font-size-24);color:var(--white);max-width:42.562rem;line-height:1.3}.privacy-body-section[data-astro-cid-uu3lhznn] .container{padding-block:var(--space-96);gap:var(--space-24);flex-direction:column;display:flex}.privacy-body-section-inner[data-astro-cid-uu3lhznn]{gap:var(--space-16);font-size:var(--font-size-16);font-weight:var(--font-weight-medium);flex-direction:column;line-height:1.5;display:flex}.privacy-body-section-inner[data-astro-cid-uu3lhznn] .privacy-list[data-astro-cid-uu3lhznn]{padding-left:var(--space-24);list-style-type:disc}.privacy-body-section-inner[data-astro-cid-uu3lhznn] .privacy-list[data-astro-cid-uu3lhznn] li[data-astro-cid-uu3lhznn]{margin-bottom:var(--space-4)}.privacy-body-section-inner[data-astro-cid-uu3lhznn] a[data-astro-cid-uu3lhznn]{text-decoration:underline}\n"}],"routeData":{"route":"/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy.astro","pathname":"/privacy-policy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/robots.txt","pattern":"^\\/robots\\.txt$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/robots.txt.mjs","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".hero[data-astro-cid-nsjupmmc]{background-position:50%;background-repeat:no-repeat;background-size:cover;width:100%}.hero__container[data-astro-cid-nsjupmmc]{width:100%;min-height:var(--hero-min-height);box-sizing:border-box;align-items:center;margin:0 auto;display:flex}.hero__content[data-astro-cid-nsjupmmc]{width:100%}\n.highlight-box[data-astro-cid-cgy4vzxo]{width:fit-content;max-width:100%;padding-block:var(--std-btn-padding-y);padding-inline:var(--std-btn-padding-x);background:var(--highlight-background);color:var(--highlight-text);font-size:var(--highlight-font-size);box-sizing:border-box;flex-direction:column;justify-content:center;align-items:center;gap:.125rem;display:flex;position:relative}.highlight-box[data-astro-cid-cgy4vzxo]:before,.highlight-box[data-astro-cid-cgy4vzxo]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent), var(--highlight-accent)) left top / .25rem .25rem no-repeat, linear-gradient(var(--highlight-accent), var(--highlight-accent)) right top / .25rem .25rem no-repeat, linear-gradient(var(--highlight-accent), var(--highlight-accent)) left bottom / .25rem .25rem no-repeat, linear-gradient(var(--highlight-accent), var(--highlight-accent)) right bottom / .25rem .25rem no-repeat;position:absolute;inset:0}\n.highlight-section[data-astro-cid-qhw7wc4u]{border:var(--highlight-border);padding:var(--highlight-padding);background:var(--highlight-background);color:var(--highlight-text-color);min-height:var(--highlight-min-height);z-index:2;align-items:center;display:flex;position:relative}.highlight-section[data-astro-cid-qhw7wc4u]:before{content:\"\";pointer-events:none;z-index:1;background:repeating-linear-gradient(to right, var(--blue) 0 3px, var(--navy) 3px 6px) top / 100% 2px no-repeat, repeating-linear-gradient(to right, var(--blue) 0 3px, var(--navy) 3px 6px) bottom / 100% 2px no-repeat, repeating-linear-gradient(to bottom, var(--blue) 0 3px, var(--navy) 3px 6px) left / 2px 100% no-repeat, repeating-linear-gradient(to bottom, var(--blue) 0 3px, var(--navy) 3px 6px) right / 2px 100% no-repeat;position:absolute;inset:0}.highlight-section[data-astro-cid-qhw7wc4u]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left top / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right top / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left bottom / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right bottom / 2rem 2rem no-repeat;z-index:2;position:absolute;inset:0}.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:var(--highlight-custom-columns);gap:var(--highlight-gap);display:grid}@media (width<=800px){.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:repeat(min(var(--highlight-columns), 2), minmax(0, 1fr))}}@media only screen and (width<=799px){.highlight-section[data-astro-cid-qhw7wc4u]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left top / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right top / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left bottom / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right bottom / 1rem 1rem no-repeat;z-index:2;position:absolute;inset:0}}@media (width<=560px){.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:1fr}}\n.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-font-size);font-weight:var(--section-title-font-weight);color:var(--section-title-color);line-height:var(--section-title-line-height);text-transform:var(--section-title-text-transform)}@media screen and (width<=799px){.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-mobile-font-size)}}\n"},{"type":"external","src":"_astro/ISOCertified.Bhrnlk1f.css"},{"type":"inline","content":".services-hero-container.columns--stack{min-height:22.813rem;padding-top:7.75rem}.services-hero-left[data-astro-cid-mcwpdpc4]{padding-left:calc(var(--space-64) + var(--space-16))}.services-hero-left[data-astro-cid-mcwpdpc4] h1[data-astro-cid-mcwpdpc4]{color:var(--white);letter-spacing:-.075rem}.services-hero-right[data-astro-cid-mcwpdpc4]{gap:var(--space-16);flex-direction:column;justify-content:flex-end;display:flex}.services-hero-right[data-astro-cid-mcwpdpc4] p[data-astro-cid-mcwpdpc4]{font-size:var(--font-size-24);color:var(--white);max-width:32rem;line-height:1.3}@media only screen and (width<=799px){.services-hero-container.columns--stack{padding-top:calc(2.5rem + var(--space-24));min-height:calc(100dvh - 6.875rem)}.services-hero-left[data-astro-cid-mcwpdpc4]{padding-left:0}.services-hero-left[data-astro-cid-mcwpdpc4] h1[data-astro-cid-mcwpdpc4]{font-size:var(--font-size-48);letter-spacing:-.06rem}.services-hero-right[data-astro-cid-mcwpdpc4]{gap:var(--space-48)}.services-hero-right[data-astro-cid-mcwpdpc4] p[data-astro-cid-mcwpdpc4]{font-size:var(--font-size-20)}}\n"},{"type":"external","src":"_astro/services.F5vAgI1X.css"},{"type":"inline","content":".contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-100);background-image:url(/images/backgrounds/hero/fractal-glass.webp);background-position:50%;background-repeat:no-repeat;background-size:cover}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);flex-direction:column;justify-content:space-between;align-self:stretch;display:flex}.contact-section-body[data-astro-cid-vdfkasy4]{font-weight:var(--font-weight-regular);letter-spacing:-.045rem;max-width:27rem;line-height:1.2}.contact-section-footer[data-astro-cid-vdfkasy4]{color:var(--grey-600);font-size:var(--font-size-20);line-height:1.5}.contact-section__right[data-astro-cid-vdfkasy4]{justify-content:flex-end;display:flex}.contact-section__right-inner[data-astro-cid-vdfkasy4]{background-color:var(--white-10);backdrop-filter:blur(16px);padding:var(--space-56);border-radius:1rem;width:100%;max-width:42.687rem}@media screen and (width<=799px){.contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-64) 0}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);gap:var(--space-48)}.contact-section-body[data-astro-cid-vdfkasy4]{color:var(--white)}.contact-section__right-inner[data-astro-cid-vdfkasy4]{padding:var(--space-24)}}\n"},{"type":"external","src":"_astro/TestimonialsSection.Cm29RPpt.css"}],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/sitemap.xml","pattern":"^\\/sitemap\\.xml$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/sitemap.xml.mjs","pathname":"/sitemap.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".hero[data-astro-cid-nsjupmmc]{background-position:50%;background-repeat:no-repeat;background-size:cover;width:100%}.hero__container[data-astro-cid-nsjupmmc]{width:100%;min-height:var(--hero-min-height);box-sizing:border-box;align-items:center;margin:0 auto;display:flex}.hero__content[data-astro-cid-nsjupmmc]{width:100%}\n.preview-hover-list[data-astro-cid-uiw2bu2r]{width:100%;color:var(--navy);flex-direction:column;justify-content:center;padding:0;display:flex;position:relative}.preview-hover-list__header[data-astro-cid-uiw2bu2r],.preview-hover-list__row[data-astro-cid-uiw2bu2r]{grid-template-columns:38% 31% 31%;align-items:center;column-gap:0;min-height:6.5rem;display:grid}.preview-hover-list__header[data-astro-cid-uiw2bu2r]{padding:var(--space-16);font-size:var(--font-size-18);font-weight:var(--font-weight-bold);color:var(--grey-400);text-transform:uppercase}.preview-hover-list__rows[data-astro-cid-uiw2bu2r]{margin:0;padding:0;list-style:none}.preview-hover-list__item[data-astro-cid-uiw2bu2r]{margin:0;padding:0}.preview-hover-list__row[data-astro-cid-uiw2bu2r]{width:100%;padding:var(--space-16);border:0;border-top:1px solid var(--navy);text-align:left;cursor:pointer;background:0 0;border-radius:0;text-decoration:none}.preview-hover-list__item[data-astro-cid-uiw2bu2r]:last-child .preview-hover-list__row[data-astro-cid-uiw2bu2r]{border-bottom:1px solid var(--navy)}.preview-hover-list__title[data-astro-cid-uiw2bu2r]{color:var(--navy);font-size:var(--font-size-36);font-weight:var(--font-weight-regular);letter-spacing:-.045rem}.preview-hover-list__category[data-astro-cid-uiw2bu2r],.preview-hover-list__services[data-astro-cid-uiw2bu2r]{color:var(--navy);font-size:var(--font-size-18);font-weight:var(--font-weight-bold);text-transform:uppercase}.preview-hover-list__preview[data-astro-cid-uiw2bu2r]{z-index:100;aspect-ratio:4/5;border-radius:var(--border-radius-small);opacity:0;visibility:hidden;pointer-events:none;width:clamp(180px,24vw,550px);transition:opacity var(--transition-duration-standard) ease;will-change:transform, opacity;position:fixed;top:0;left:0;overflow:hidden}.preview-hover-list__preview[data-astro-cid-uiw2bu2r].is-visible{opacity:1;visibility:visible}.preview-hover-list__image[data-astro-cid-uiw2bu2r]{border-radius:inherit;object-fit:cover;opacity:0;width:100%;height:100%;display:block;position:absolute;inset:0;transform:scale(1)}.preview-hover-list__image[data-astro-cid-uiw2bu2r].is-current{opacity:1;z-index:2}@media (width<=700px){.preview-hover-list__header[data-astro-cid-uiw2bu2r],.preview-hover-list__row[data-astro-cid-uiw2bu2r]{grid-template-columns:40% 25% 35%}.preview-hover-list__category[data-astro-cid-uiw2bu2r],.preview-hover-list__services[data-astro-cid-uiw2bu2r]{font-size:8px}}@media (prefers-reduced-motion:reduce){.preview-hover-list__row[data-astro-cid-uiw2bu2r]{transition:none}.preview-hover-list__preview[data-astro-cid-uiw2bu2r]{opacity:0;visibility:hidden;transition:none;top:50%;left:auto;right:16px;transform:translateY(-50%)}.preview-hover-list__preview[data-astro-cid-uiw2bu2r].is-visible{opacity:1;visibility:visible}}\n.highlight-box[data-astro-cid-cgy4vzxo]{width:fit-content;max-width:100%;padding-block:var(--std-btn-padding-y);padding-inline:var(--std-btn-padding-x);background:var(--highlight-background);color:var(--highlight-text);font-size:var(--highlight-font-size);box-sizing:border-box;flex-direction:column;justify-content:center;align-items:center;gap:.125rem;display:flex;position:relative}.highlight-box[data-astro-cid-cgy4vzxo]:before,.highlight-box[data-astro-cid-cgy4vzxo]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent), var(--highlight-accent)) left top / .25rem .25rem no-repeat, linear-gradient(var(--highlight-accent), var(--highlight-accent)) right top / .25rem .25rem no-repeat, linear-gradient(var(--highlight-accent), var(--highlight-accent)) left bottom / .25rem .25rem no-repeat, linear-gradient(var(--highlight-accent), var(--highlight-accent)) right bottom / .25rem .25rem no-repeat;position:absolute;inset:0}\n"},{"type":"external","src":"_astro/OurWorkSection.CNWTrZbW.css"},{"type":"inline","content":".services-hero-container.columns--stack{min-height:22.813rem;padding-top:7.75rem}.services-hero-left[data-astro-cid-mcwpdpc4]{padding-left:calc(var(--space-64) + var(--space-16))}.services-hero-left[data-astro-cid-mcwpdpc4] h1[data-astro-cid-mcwpdpc4]{color:var(--white);letter-spacing:-.075rem}.services-hero-right[data-astro-cid-mcwpdpc4]{gap:var(--space-16);flex-direction:column;justify-content:flex-end;display:flex}.services-hero-right[data-astro-cid-mcwpdpc4] p[data-astro-cid-mcwpdpc4]{font-size:var(--font-size-24);color:var(--white);max-width:32rem;line-height:1.3}@media only screen and (width<=799px){.services-hero-container.columns--stack{padding-top:calc(2.5rem + var(--space-24));min-height:calc(100dvh - 6.875rem)}.services-hero-left[data-astro-cid-mcwpdpc4]{padding-left:0}.services-hero-left[data-astro-cid-mcwpdpc4] h1[data-astro-cid-mcwpdpc4]{font-size:var(--font-size-48);letter-spacing:-.06rem}.services-hero-right[data-astro-cid-mcwpdpc4]{gap:var(--space-48)}.services-hero-right[data-astro-cid-mcwpdpc4] p[data-astro-cid-mcwpdpc4]{font-size:var(--font-size-20)}}\n"}],"routeData":{"route":"/test","isIndex":false,"type":"page","pattern":"^\\/test\\/?$","segments":[[{"content":"test","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/test.astro","pathname":"/test","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work/gritcargo","isIndex":false,"type":"page","pattern":"^\\/work\\/gritcargo\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}],[{"content":"gritcargo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/gritcargo.astro","pathname":"/work/gritcargo","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work/spotify","isIndex":false,"type":"page","pattern":"^\\/work\\/spotify\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}],[{"content":"spotify","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/spotify.astro","pathname":"/work/spotify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work/time2read","isIndex":false,"type":"page","pattern":"^\\/work\\/time2read\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}],[{"content":"time2read","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/time2read.astro","pathname":"/work/time2read","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"inline","content":".hero[data-astro-cid-nsjupmmc]{background-position:50%;background-repeat:no-repeat;background-size:cover;width:100%}.hero__container[data-astro-cid-nsjupmmc]{width:100%;min-height:var(--hero-min-height);box-sizing:border-box;align-items:center;margin:0 auto;display:flex}.hero__content[data-astro-cid-nsjupmmc]{width:100%}\n"},{"type":"external","src":"_astro/index.DIfkbvjT.css"},{"type":"inline","content":".highlight-section[data-astro-cid-qhw7wc4u]{border:var(--highlight-border);padding:var(--highlight-padding);background:var(--highlight-background);color:var(--highlight-text-color);min-height:var(--highlight-min-height);z-index:2;align-items:center;display:flex;position:relative}.highlight-section[data-astro-cid-qhw7wc4u]:before{content:\"\";pointer-events:none;z-index:1;background:repeating-linear-gradient(to right, var(--blue) 0 3px, var(--navy) 3px 6px) top / 100% 2px no-repeat, repeating-linear-gradient(to right, var(--blue) 0 3px, var(--navy) 3px 6px) bottom / 100% 2px no-repeat, repeating-linear-gradient(to bottom, var(--blue) 0 3px, var(--navy) 3px 6px) left / 2px 100% no-repeat, repeating-linear-gradient(to bottom, var(--blue) 0 3px, var(--navy) 3px 6px) right / 2px 100% no-repeat;position:absolute;inset:0}.highlight-section[data-astro-cid-qhw7wc4u]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left top / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right top / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left bottom / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right bottom / 2rem 2rem no-repeat;z-index:2;position:absolute;inset:0}.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:var(--highlight-custom-columns);gap:var(--highlight-gap);display:grid}@media (width<=800px){.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:repeat(min(var(--highlight-columns), 2), minmax(0, 1fr))}}@media only screen and (width<=799px){.highlight-section[data-astro-cid-qhw7wc4u]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left top / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right top / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left bottom / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right bottom / 1rem 1rem no-repeat;z-index:2;position:absolute;inset:0}}@media (width<=560px){.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:1fr}}\n.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-font-size);font-weight:var(--section-title-font-weight);color:var(--section-title-color);line-height:var(--section-title-line-height);text-transform:var(--section-title-text-transform)}@media screen and (width<=799px){.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-mobile-font-size)}}\n.preview-hover-list[data-astro-cid-uiw2bu2r]{width:100%;color:var(--navy);flex-direction:column;justify-content:center;padding:0;display:flex;position:relative}.preview-hover-list__header[data-astro-cid-uiw2bu2r],.preview-hover-list__row[data-astro-cid-uiw2bu2r]{grid-template-columns:38% 31% 31%;align-items:center;column-gap:0;min-height:6.5rem;display:grid}.preview-hover-list__header[data-astro-cid-uiw2bu2r]{padding:var(--space-16);font-size:var(--font-size-18);font-weight:var(--font-weight-bold);color:var(--grey-400);text-transform:uppercase}.preview-hover-list__rows[data-astro-cid-uiw2bu2r]{margin:0;padding:0;list-style:none}.preview-hover-list__item[data-astro-cid-uiw2bu2r]{margin:0;padding:0}.preview-hover-list__row[data-astro-cid-uiw2bu2r]{width:100%;padding:var(--space-16);border:0;border-top:1px solid var(--navy);text-align:left;cursor:pointer;background:0 0;border-radius:0;text-decoration:none}.preview-hover-list__item[data-astro-cid-uiw2bu2r]:last-child .preview-hover-list__row[data-astro-cid-uiw2bu2r]{border-bottom:1px solid var(--navy)}.preview-hover-list__title[data-astro-cid-uiw2bu2r]{color:var(--navy);font-size:var(--font-size-36);font-weight:var(--font-weight-regular);letter-spacing:-.045rem}.preview-hover-list__category[data-astro-cid-uiw2bu2r],.preview-hover-list__services[data-astro-cid-uiw2bu2r]{color:var(--navy);font-size:var(--font-size-18);font-weight:var(--font-weight-bold);text-transform:uppercase}.preview-hover-list__preview[data-astro-cid-uiw2bu2r]{z-index:100;aspect-ratio:4/5;border-radius:var(--border-radius-small);opacity:0;visibility:hidden;pointer-events:none;width:clamp(180px,24vw,550px);transition:opacity var(--transition-duration-standard) ease;will-change:transform, opacity;position:fixed;top:0;left:0;overflow:hidden}.preview-hover-list__preview[data-astro-cid-uiw2bu2r].is-visible{opacity:1;visibility:visible}.preview-hover-list__image[data-astro-cid-uiw2bu2r]{border-radius:inherit;object-fit:cover;opacity:0;width:100%;height:100%;display:block;position:absolute;inset:0;transform:scale(1)}.preview-hover-list__image[data-astro-cid-uiw2bu2r].is-current{opacity:1;z-index:2}@media (width<=700px){.preview-hover-list__header[data-astro-cid-uiw2bu2r],.preview-hover-list__row[data-astro-cid-uiw2bu2r]{grid-template-columns:40% 25% 35%}.preview-hover-list__category[data-astro-cid-uiw2bu2r],.preview-hover-list__services[data-astro-cid-uiw2bu2r]{font-size:8px}}@media (prefers-reduced-motion:reduce){.preview-hover-list__row[data-astro-cid-uiw2bu2r]{transition:none}.preview-hover-list__preview[data-astro-cid-uiw2bu2r]{opacity:0;visibility:hidden;transition:none;top:50%;left:auto;right:16px;transform:translateY(-50%)}.preview-hover-list__preview[data-astro-cid-uiw2bu2r].is-visible{opacity:1;visibility:visible}}\n.home-testimonials[data-astro-cid-wahpe44u]{background-color:var(--grey)}.home-testimonials__inner[data-astro-cid-wahpe44u]{padding-block:var(--space-80);gap:var(--space-64);flex-direction:column;display:flex}@media (width<=799px){.home-testimonials[data-astro-cid-wahpe44u] .section-title{padding-inline:var(--space-16)}}\n"},{"type":"external","src":"_astro/OurWorkSection.CNWTrZbW.css"},{"type":"external","src":"_astro/TestimonialsSection.Cm29RPpt.css"},{"type":"inline","content":".contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-100);background-image:url(/images/backgrounds/hero/fractal-glass.webp);background-position:50%;background-repeat:no-repeat;background-size:cover}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);flex-direction:column;justify-content:space-between;align-self:stretch;display:flex}.contact-section-body[data-astro-cid-vdfkasy4]{font-weight:var(--font-weight-regular);letter-spacing:-.045rem;max-width:27rem;line-height:1.2}.contact-section-footer[data-astro-cid-vdfkasy4]{color:var(--grey-600);font-size:var(--font-size-20);line-height:1.5}.contact-section__right[data-astro-cid-vdfkasy4]{justify-content:flex-end;display:flex}.contact-section__right-inner[data-astro-cid-vdfkasy4]{background-color:var(--white-10);backdrop-filter:blur(16px);padding:var(--space-56);border-radius:1rem;width:100%;max-width:42.687rem}@media screen and (width<=799px){.contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-64) 0}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);gap:var(--space-48)}.contact-section-body[data-astro-cid-vdfkasy4]{color:var(--white)}.contact-section__right-inner[data-astro-cid-vdfkasy4]{padding:var(--space-24)}}\n"}],"routeData":{"route":"/work","isIndex":true,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/index.astro","pathname":"/work","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/sitemap-[collection].xml","pattern":"^\\/sitemap-([^/]+?)\\.xml$","segments":[[{"content":"sitemap-","dynamic":false,"spread":false},{"content":"collection","dynamic":true,"spread":false},{"content":".xml","dynamic":false,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.CZPSnt1t.css"},{"type":"external","src":"_astro/index.YDpIFAt_.css"},{"type":"inline","content":".section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-font-size);font-weight:var(--section-title-font-weight);color:var(--section-title-color);line-height:var(--section-title-line-height);text-transform:var(--section-title-text-transform)}@media screen and (width<=799px){.section-title[data-astro-cid-mluwbwhv] h2[data-astro-cid-mluwbwhv]{font-size:var(--section-title-mobile-font-size)}}\n.preview-hover-list[data-astro-cid-uiw2bu2r]{width:100%;color:var(--navy);flex-direction:column;justify-content:center;padding:0;display:flex;position:relative}.preview-hover-list__header[data-astro-cid-uiw2bu2r],.preview-hover-list__row[data-astro-cid-uiw2bu2r]{grid-template-columns:38% 31% 31%;align-items:center;column-gap:0;min-height:6.5rem;display:grid}.preview-hover-list__header[data-astro-cid-uiw2bu2r]{padding:var(--space-16);font-size:var(--font-size-18);font-weight:var(--font-weight-bold);color:var(--grey-400);text-transform:uppercase}.preview-hover-list__rows[data-astro-cid-uiw2bu2r]{margin:0;padding:0;list-style:none}.preview-hover-list__item[data-astro-cid-uiw2bu2r]{margin:0;padding:0}.preview-hover-list__row[data-astro-cid-uiw2bu2r]{width:100%;padding:var(--space-16);border:0;border-top:1px solid var(--navy);text-align:left;cursor:pointer;background:0 0;border-radius:0;text-decoration:none}.preview-hover-list__item[data-astro-cid-uiw2bu2r]:last-child .preview-hover-list__row[data-astro-cid-uiw2bu2r]{border-bottom:1px solid var(--navy)}.preview-hover-list__title[data-astro-cid-uiw2bu2r]{color:var(--navy);font-size:var(--font-size-36);font-weight:var(--font-weight-regular);letter-spacing:-.045rem}.preview-hover-list__category[data-astro-cid-uiw2bu2r],.preview-hover-list__services[data-astro-cid-uiw2bu2r]{color:var(--navy);font-size:var(--font-size-18);font-weight:var(--font-weight-bold);text-transform:uppercase}.preview-hover-list__preview[data-astro-cid-uiw2bu2r]{z-index:100;aspect-ratio:4/5;border-radius:var(--border-radius-small);opacity:0;visibility:hidden;pointer-events:none;width:clamp(180px,24vw,550px);transition:opacity var(--transition-duration-standard) ease;will-change:transform, opacity;position:fixed;top:0;left:0;overflow:hidden}.preview-hover-list__preview[data-astro-cid-uiw2bu2r].is-visible{opacity:1;visibility:visible}.preview-hover-list__image[data-astro-cid-uiw2bu2r]{border-radius:inherit;object-fit:cover;opacity:0;width:100%;height:100%;display:block;position:absolute;inset:0;transform:scale(1)}.preview-hover-list__image[data-astro-cid-uiw2bu2r].is-current{opacity:1;z-index:2}@media (width<=700px){.preview-hover-list__header[data-astro-cid-uiw2bu2r],.preview-hover-list__row[data-astro-cid-uiw2bu2r]{grid-template-columns:40% 25% 35%}.preview-hover-list__category[data-astro-cid-uiw2bu2r],.preview-hover-list__services[data-astro-cid-uiw2bu2r]{font-size:8px}}@media (prefers-reduced-motion:reduce){.preview-hover-list__row[data-astro-cid-uiw2bu2r]{transition:none}.preview-hover-list__preview[data-astro-cid-uiw2bu2r]{opacity:0;visibility:hidden;transition:none;top:50%;left:auto;right:16px;transform:translateY(-50%)}.preview-hover-list__preview[data-astro-cid-uiw2bu2r].is-visible{opacity:1;visibility:visible}}\n"},{"type":"external","src":"_astro/ISOCertified.Bhrnlk1f.css"},{"type":"inline","content":".home-testimonials[data-astro-cid-wahpe44u]{background-color:var(--grey)}.home-testimonials__inner[data-astro-cid-wahpe44u]{padding-block:var(--space-80);gap:var(--space-64);flex-direction:column;display:flex}@media (width<=799px){.home-testimonials[data-astro-cid-wahpe44u] .section-title{padding-inline:var(--space-16)}}\n.highlight-section[data-astro-cid-qhw7wc4u]{border:var(--highlight-border);padding:var(--highlight-padding);background:var(--highlight-background);color:var(--highlight-text-color);min-height:var(--highlight-min-height);z-index:2;align-items:center;display:flex;position:relative}.highlight-section[data-astro-cid-qhw7wc4u]:before{content:\"\";pointer-events:none;z-index:1;background:repeating-linear-gradient(to right, var(--blue) 0 3px, var(--navy) 3px 6px) top / 100% 2px no-repeat, repeating-linear-gradient(to right, var(--blue) 0 3px, var(--navy) 3px 6px) bottom / 100% 2px no-repeat, repeating-linear-gradient(to bottom, var(--blue) 0 3px, var(--navy) 3px 6px) left / 2px 100% no-repeat, repeating-linear-gradient(to bottom, var(--blue) 0 3px, var(--navy) 3px 6px) right / 2px 100% no-repeat;position:absolute;inset:0}.highlight-section[data-astro-cid-qhw7wc4u]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left top / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right top / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left bottom / 2rem 2rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right bottom / 2rem 2rem no-repeat;z-index:2;position:absolute;inset:0}.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:var(--highlight-custom-columns);gap:var(--highlight-gap);display:grid}@media (width<=800px){.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:repeat(min(var(--highlight-columns), 2), minmax(0, 1fr))}}@media only screen and (width<=799px){.highlight-section[data-astro-cid-qhw7wc4u]:after{content:\"\";pointer-events:none;background:linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left top / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right top / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) left bottom / 1rem 1rem no-repeat, linear-gradient(var(--highlight-accent-color), var(--highlight-accent-color)) right bottom / 1rem 1rem no-repeat;z-index:2;position:absolute;inset:0}}@media (width<=560px){.highlight-section__inner[data-astro-cid-qhw7wc4u]{grid-template-columns:1fr}}\n"},{"type":"external","src":"_astro/TestimonialsSection.Cm29RPpt.css"},{"type":"inline","content":".contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-100);background-image:url(/images/backgrounds/hero/fractal-glass.webp);background-position:50%;background-repeat:no-repeat;background-size:cover}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);flex-direction:column;justify-content:space-between;align-self:stretch;display:flex}.contact-section-body[data-astro-cid-vdfkasy4]{font-weight:var(--font-weight-regular);letter-spacing:-.045rem;max-width:27rem;line-height:1.2}.contact-section-footer[data-astro-cid-vdfkasy4]{color:var(--grey-600);font-size:var(--font-size-20);line-height:1.5}.contact-section__right[data-astro-cid-vdfkasy4]{justify-content:flex-end;display:flex}.contact-section__right-inner[data-astro-cid-vdfkasy4]{background-color:var(--white-10);backdrop-filter:blur(16px);padding:var(--space-56);border-radius:1rem;width:100%;max-width:42.687rem}@media screen and (width<=799px){.contact-section[data-astro-cid-vdfkasy4]{padding-block:var(--space-64) 0}.contact-section__left[data-astro-cid-vdfkasy4]{padding-block:var(--space-64);gap:var(--space-48)}.contact-section-body[data-astro-cid-vdfkasy4]{color:var(--white)}.contact-section__right-inner[data-astro-cid-vdfkasy4]{padding:var(--space-24)}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","base":"/","trailingSlash":"ignore","compressHTML":"jsx","componentMetadata":[["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/about-us.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/ai.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/careers/apply-now.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/careers/index.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/insights/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/insights/index.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/our-work.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/privacy-policy.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/services.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/test.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/work/index.astro",{"propagation":"none","containsHead":true}],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/astro/routes/admin.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(function(){let e=(e,t)=>{let n=async()=>{await(await e())()},r=typeof t.value==`object`?t.value:void 0,i={timeout:r==null?void 0:r.timeout};`requestIdleCallback`in window?window.requestIdleCallback(n,i):setTimeout(n,i.timeout||200)};(self.Astro||(self.Astro={})).idle=e,window.dispatchEvent(new Event(`astro:idle`))})();"],["load","(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).load=e,window.dispatchEvent(new Event(`astro:load`))})();"],["media","(function(){let e=(e,t)=>{let n=async()=>{await(await e())()};if(t.value){let e=matchMedia(t.value);e.matches?n():e.addEventListener(`change`,n,{once:!0})}};(self.Astro||(self.Astro={})).media=e,window.dispatchEvent(new Event(`astro:media`))})();"],["only","(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).only=e,window.dispatchEvent(new Event(`astro:only`))})();"],["visible","(function(){let e=(e,t,n)=>{let r=async()=>{await(await e())()},i=typeof t.value==`object`?t.value:void 0,a={rootMargin:i==null?void 0:i.rootMargin},o=new IntersectionObserver(e=>{for(let t of e)if(t.isIntersecting){o.disconnect(),r();break}},a);for(let e of n.children)o.observe(e)};(self.Astro||(self.Astro={})).visible=e,window.dispatchEvent(new Event(`astro:visible`))})();"]],"entryModules":{"\u0000astro:asset-imports":"chunks/_astro_asset-imports_DVH09DLb.mjs","\u0000astro:content":"chunks/_astro_content_Cl-EewGb.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DprqAX32.mjs","\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_BhTW5IeR.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_C7c7ma6M.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/plugins/adapt-sandbox-entry.mjs":"chunks/adapt-sandbox-entry_BJLn3zEY.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/apply-CmE9k57Q.mjs":"chunks/apply-CmE9k57Q_DjTsiBL3.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/artifacts-a_0bb4Ks.mjs":"chunks/artifacts-a_0bb4Ks_BCftQIY0.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/byline-BufjxQyd.mjs":"chunks/byline-BufjxQyd_DBlWNwIS.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/bylines-a01JW9yq.mjs":"chunks/bylines-a01JW9yq_BD0IY8N5.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/cache-LOb3NthC.mjs":"chunks/cache-LOb3NthC_CNHao-L-.mjs","\u0000virtual:emdash/config":"chunks/config_DdkuzFmo.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/content-2gjSbGP3.mjs":"chunks/content-2gjSbGP3_BaBlrh0I.mjs","\u0000virtual:emdash/dialect":"chunks/dialect_6KQ-iXJ1.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/field-map-Bhqs6zUK.mjs":"chunks/field-map-Bhqs6zUK__KMdf5oT.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/gc-CEhfEMLY.mjs":"chunks/gc-CEhfEMLY_DHi43954.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/live.config.ts":"chunks/live.config_CTplZ3i4.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/load-CEt0TQ4_.mjs":"chunks/load-CEt0TQ4__DBSiQhH1.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/loader-DF6J1Fpd.mjs":"chunks/loader-DF6J1Fpd_DWViXqEV.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-6Qw3S1f6.js":"_astro/messages-6Qw3S1f6.DLVPttsZ.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-B8ZeAA8U.js":"_astro/messages-B8ZeAA8U.wd5EWL9L.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-BC2Kjxql.js":"_astro/messages-BC2Kjxql.BxUGy8sE.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-BF8xdAI8.js":"_astro/messages-BF8xdAI8.B8PaRIA0.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-BFP27cPa.js":"_astro/messages-BFP27cPa.lV1hDZw7.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-BHPvHMBG.js":"_astro/messages-BHPvHMBG.DoZBtn1u.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-BKtU2A41.js":"_astro/messages-BKtU2A41.WpltdJUF.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-BZZGBbQ5.js":"_astro/messages-BZZGBbQ5.Db8tQIll.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-B_vZoujn.js":"_astro/messages-B_vZoujn.Bg04t8tv.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-BefYD9qF.js":"_astro/messages-BefYD9qF.B0npsPaa.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-BxNTk-gk.js":"_astro/messages-BxNTk-gk.Dcg1IX5I.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-C1gFepcH.js":"_astro/messages-C1gFepcH.H4Z1PQIa.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-CFWDZ27W.js":"_astro/messages-CFWDZ27W.D7jl4yLj.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-CM44V0y5.js":"_astro/messages-CM44V0y5.CqoxZ-kk.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-CV-A5Rwg.js":"_astro/messages-CV-A5Rwg.DOD3y5C9.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-CWO2az5c.js":"_astro/messages-CWO2az5c.Dtfs7BmS.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-C_mvBelI.js":"_astro/messages-C_mvBelI.BsmkIklG.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-CfsdrLwV.js":"_astro/messages-CfsdrLwV.BAd-mIxE.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-Cr2O9X1x.js":"_astro/messages-Cr2O9X1x.Cq2q2b0d.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-Ctd2bivK.js":"_astro/messages-Ctd2bivK.BUX-_nor.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-Cw269vbh.js":"_astro/messages-Cw269vbh.DNyWkDb-.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-D54_G1T3.js":"_astro/messages-D54_G1T3.CQKfN0DB.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DG2iG_JJ.js":"_astro/messages-DG2iG_JJ.BvLCfbOy.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DIUd7tWg.js":"_astro/messages-DIUd7tWg.CmppELkI.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DPKn9QIg.js":"_astro/messages-DPKn9QIg.Bd1IW89o.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DPXp_0fz.js":"_astro/messages-DPXp_0fz.CKERUaiY.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DWVuRRpI.js":"_astro/messages-DWVuRRpI.D4jhQoq9.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DWZv8MVZ.js":"_astro/messages-DWZv8MVZ.Y8PY6nrU.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DYDRsTz5.js":"_astro/messages-DYDRsTz5.V1V5WfqC.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DZE2Fcoe.js":"_astro/messages-DZE2Fcoe.uhDZL7U7.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DdtLUflK.js":"_astro/messages-DdtLUflK.BHAS8NUt.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-DqXefsCH.js":"_astro/messages-DqXefsCH.k2u-mDhn.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-YOQUrrdZ.js":"_astro/messages-YOQUrrdZ.C28nX9MY.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-cVoGTRl2.js":"_astro/messages-cVoGTRl2.CojYPKyT.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-sxm3cgp-.js":"_astro/messages-sxm3cgp-.CK7JMTNG.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-uFomUl-W.js":"_astro/messages-uFomUl-W.BDyVmWe5.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-uyeoSi8t.js":"_astro/messages-uyeoSi8t.CwkcAY_7.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/messages-x6Xf5V88.js":"_astro/messages-x6Xf5V88.Dopsuzme.js","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_CxXy0p4B.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/oauth-authorization-CvT-8KtG.mjs":"chunks/oauth-authorization-CvT-8KtG_Dbd6rUgR.mjs","\u0000virtual:emdash/object-cache":"chunks/object-cache_XrGln1aI.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/internal/portable-text.js":"chunks/portable-text__cKJ97kt.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/query-CslUTGOV.mjs":"chunks/query-CslUTGOV_C9IH4qak.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/registry-CSLrHSx1.mjs":"chunks/registry-CSLrHSx1_TiKmABYH.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/resolve--EmZidEz.mjs":"chunks/resolve--EmZidEz_Dh1BsDCq.mjs","\u0000virtual:emdash/seed":"chunks/seed_DPQAolQK.mjs","\u0000astro:config/server":"chunks/server_BQeDKbkg.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/taxonomies-DApyZAJq.mjs":"chunks/taxonomies-DApyZAJq_zMULIfVD.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/turnstile-DNR0cwtt.mjs":"chunks/turnstile-DNR0cwtt_B-N9PqKd.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/validate-DBnEN6hU.mjs":"chunks/validate-DBnEN6hU_O4Q-VN2O.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/validation-Becbh-zl.mjs":"chunks/validation-Becbh-zl_DNPjBlnN.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@astrojs/react-renderer/dist/vnode-children.js":"chunks/vnode-children_DhTm7i1G.mjs","\u0000virtual:emdash/wait-until":"chunks/wait-until_bIc_sNRQ.mjs","@astrojs/netlify/ssr-function.js":"entry.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/files/_...path_.mjs":"chunks/_...path__Bjfr1q3l.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/files/_...path_.mjs":"chunks/_...path__lu7TyZpP.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_@_@mjs":"chunks/_.._CWjYKYm2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_@_@mjs":"chunks/_.._Cl5b3MGz.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/file/_...key_@_@mjs":"chunks/_.._Dbox9FlZ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_@_@mjs":"chunks/_domain__C54Yx3HZ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_@_@mjs":"chunks/_extensionId__DVkrZiyr.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_@_@mjs":"chunks/_fieldSlug__nQ5X7YCk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_@_@mjs":"chunks/_filename__BWTBM4Je.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_@_@mjs":"chunks/_hookName__BEdUH5tr.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/index.mjs":"chunks/_id__6GFZlPy7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_@_@mjs":"chunks/_id__B6-M-urB.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/folders/_id_@_@mjs":"chunks/_id__BFPq5jtm.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_@_@mjs":"chunks/_id__BeIOz69j.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_@_@mjs":"chunks/_id__BeSbaKvl.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_@_@mjs":"chunks/_id__Bvc2D6us.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_@_@mjs":"chunks/_id__BxEpPJPI.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/_id_@_@mjs":"chunks/_id__CuxBRjzQ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_@_@mjs":"chunks/_id__D6rRk9aQ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_@_@mjs":"chunks/_id__DCxxrfss.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_@_@mjs":"chunks/_id__DfcOjPwv.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/index.mjs":"chunks/_id__DjYvfeEj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_@_@mjs":"chunks/_id__zBsXlgPo.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_@_@mjs":"chunks/_itemId__BdzBBdlZ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_@_@mjs":"chunks/_name__BSw21Clx.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_@_@mjs":"chunks/_name__D9tTL4c6.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_@_@mjs":"chunks/_name__DfHaWU99.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_@_@mjs":"chunks/_name__Dq1owWip.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_@_@mjs":"chunks/_provider__Rru4hKfJ.mjs","\u0000virtual:astro:page:src/pages/insights/[slug]@_@astro":"chunks/_slug__BrDwTiIR.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_@_@mjs":"chunks/_slug__C9Jmo_8l.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/_slug_@_@mjs":"chunks/_slug__C_J512tb.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_@_@mjs":"chunks/_slug__DBTsBdbk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_@_@mjs":"chunks/_slug__j3w-qkd9.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_@_@mjs":"chunks/_taxonomy__D6O2l3lu.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/abandon.mjs":"chunks/abandon_BXH1hMdm.mjs","\u0000virtual:astro:page:src/pages/about-us@_@astro":"chunks/about-us_CkGMliZh.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/accept@_@mjs":"chunks/accept_BIVPC4ZB.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/action-token@_@mjs":"chunks/action-token_eiBs_Ipw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate@_@mjs":"chunks/activate_D9ZwhpEg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation@_@mjs":"chunks/activation_CVAm9RWN.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin-verify@_@mjs":"chunks/admin-verify_D4FSI8xb.mjs","\u0000virtual:astro:page:node_modules/emdash/src/astro/routes/admin@_@astro":"chunks/admin_B62z71FS.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin@_@mjs":"chunks/admin_Bm5rU_jL.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/advance.mjs":"chunks/advance_BwvFEj76.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/advance.mjs":"chunks/advance_ItSYcgYj.mjs","\u0000virtual:astro:page:src/pages/ai@_@astro":"chunks/ai_jngpRmHY.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze@_@mjs":"chunks/analyze_CeBhngHQ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze@_@mjs":"chunks/analyze_CqVEvZEJ.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/analyze.mjs":"chunks/analyze_DbllvwJH.mjs","\u0000virtual:astro:page:src/pages/careers/apply-now@_@astro":"chunks/apply-now_5QeU1dlv.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/approvals/index.mjs":"chunks/approvals_DztWuQDw.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/approvals/_id_/approve.mjs":"chunks/approve_hpDv3Zb4.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/archive.mjs":"chunks/archive_uUpbbqgq.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact@_@mjs":"chunks/artifact_CwGx7vP9.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/auth@_@mjs":"chunks/auth_JgvRIrKf.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/authorize@_@mjs":"chunks/authorize_BW3cdDFb.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/authorize@_@mjs":"chunks/authorize_C9QbT85T.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/authors@_@mjs":"chunks/authors_nJqqgXNF.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/block-types-BeLZ85Sw.mjs":"chunks/block-types-BeLZ85Sw_4SnZxVnv.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/block-values-BRJZHvF4.mjs":"chunks/block-values-BRJZHvF4_BgbAezpO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag@_@mjs":"chunks/bulk-tag_BX7Amnbw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/bulk@_@mjs":"chunks/bulk_DDsCRZ2C.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/bylines-C8ZT6iWw.mjs":"chunks/bylines-C8ZT6iWw_Cj3Bcs7P.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/calendar@_@mjs":"chunks/calendar_C4v4UVIm.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback@_@mjs":"chunks/callback_BsXfrSOG.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback@_@mjs":"chunks/callback_TQQAR0Qg.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/cancel.mjs":"chunks/cancel_BoJrlvWi.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/capabilities.mjs":"chunks/capabilities_DkB98MOB.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/children@_@mjs":"chunks/children_CQH2DDCU.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/chunks-CvgCLYip.mjs":"chunks/chunks-CvgCLYip_BjOzSuxw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/code@_@mjs":"chunks/code_C2tNU-_t.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare@_@mjs":"chunks/compare_CbfjMM00.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/complete@_@mjs":"chunks/complete_B29Ni5eo.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/complete@_@mjs":"chunks/complete_CLqB52hM.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/confirm@_@mjs":"chunks/confirm_BE9YXW0V.mjs","\u0000virtual:astro:page:src/pages/contact@_@astro":"chunks/contact_s8Fv0Ogu.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/core-update@_@mjs":"chunks/core-update_B5CSJrPo.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/counts@_@mjs":"chunks/counts_CBF5cFla.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dashboard@_@mjs":"chunks/dashboard_B3QeW9_A.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/approvals/_id_/deny.mjs":"chunks/deny_DtORFBex.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-bypass@_@mjs":"chunks/dev-bypass_BBtP7Ztw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/dev-bypass@_@mjs":"chunks/dev-bypass_D7Kq2X6I.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-reset@_@mjs":"chunks/dev-reset_COMJZu2E.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable@_@mjs":"chunks/disable_DP07BQ2w.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable@_@mjs":"chunks/disable_DUZF4e7m.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft@_@mjs":"chunks/discard-draft_BV4cpsFU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/domain-notify@_@mjs":"chunks/domain-notify_1v3ynu09.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/site/domain-proof@_@mjs":"chunks/domain-proof_DMLwOzmC.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/domain@_@mjs":"chunks/domain_NG3_KJeE.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate@_@mjs":"chunks/duplicate_C4D6plkn.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions/editors@_@mjs":"chunks/editors_CwSeHPu7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/email@_@mjs":"chunks/email_BlufAnp4.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dev/emails@_@mjs":"chunks/emails_Co1h-fNE.mjs","\u0000virtual:astro:page:src/pages/emdash-test@_@astro":"chunks/emdash-test_Bp3qq7LY.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable@_@mjs":"chunks/enable_1fTvqVPG.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/enable@_@mjs":"chunks/enable_tRZ6Bnru.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable@_@mjs":"chunks/enable_y1A1f9jU.mjs","\u0000virtual:emdash/env":"chunks/env_D4nDvOOj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/execute@_@mjs":"chunks/execute_B4BHl2GX.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/execute.mjs":"chunks/execute_B8FB4uG8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute@_@mjs":"chunks/execute_Cwh1Pmje.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/export@_@mjs":"chunks/export_CKxFYJL6.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/index.mjs":"chunks/exports_CX2cyD03.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/fts-manager-m8GPxogO.mjs":"chunks/fts-manager-m8GPxogO_Cm9dj2wE.mjs","\u0000virtual:astro:page:src/pages/work/gritcargo@_@astro":"chunks/gritcargo_BRlvgSvG.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/handover@_@mjs":"chunks/handover_DXURhs-0.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/health@_@mjs":"chunks/health_BJtUaMTU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon@_@mjs":"chunks/icon_CspI-vJJ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/image-endpoint@_@mjs":"chunks/image-endpoint_CoSERvKV.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@astrojs/netlify/dist/image-service.js":"chunks/image-service_DioH3UMQ.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/index.mjs":"chunks/imports_DiV8tK5v.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/index@_@mjs":"chunks/index_47sL_DCx.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index@_@mjs":"chunks/index_9bTyyu5t.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/index@_@mjs":"chunks/index_9ozN3W4n.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index@_@mjs":"chunks/index_B3zzTiCa.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/index@_@mjs":"chunks/index_BDOdYioT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index@_@mjs":"chunks/index_BHczuJH0.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/orphans/index@_@mjs":"chunks/index_BI2LLYSz.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/index@_@mjs":"chunks/index_BKVDDXWr.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index@_@mjs":"chunks/index_BO_n9lJ-.mjs","\u0000virtual:astro:page:src/pages/careers/index@_@astro":"chunks/index_BQN5Q1ZK.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/index@_@mjs":"chunks/index_BSzxkJic.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/index@_@mjs":"chunks/index_BTUMWSXq.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/index@_@mjs":"chunks/index_BTVeWlo7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index@_@mjs":"chunks/index_BcoO7kNO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/index@_@mjs":"chunks/index_Bjh5rPfg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index@_@mjs":"chunks/index_BklxKMa_.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index@_@mjs":"chunks/index_BmGed_c8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/index@_@mjs":"chunks/index_Bn4NjPGz.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index@_@mjs":"chunks/index_C-Jz22A9.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/index@_@mjs":"chunks/index_C0MOvzR8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index@_@mjs":"chunks/index_C5dYmxsR.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index@_@mjs":"chunks/index_C5ohRQTZ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index@_@mjs":"chunks/index_CDxKQgvw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index@_@mjs":"chunks/index_CMtTegMv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/index@_@mjs":"chunks/index_CSWT8BSc.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/folders/index@_@mjs":"chunks/index_CaNbLSTq.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/index@_@mjs":"chunks/index_CdSjJFRO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index@_@mjs":"chunks/index_Cf8Fy-XN.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index@_@mjs":"chunks/index_CpSqVR55.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/index@_@mjs":"chunks/index_CvxTKV6v.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/index@_@mjs":"chunks/index_Cwz9j_H2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/relations/_id_/index@_@mjs":"chunks/index_D9Noj8IL.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_DNvvsPrN.mjs","\u0000virtual:astro:page:src/pages/work/index@_@astro":"chunks/index_DTP1IKV2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/block-types/index@_@mjs":"chunks/index_Db7jjq8c.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index@_@mjs":"chunks/index_Dkc5QWuk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/index@_@mjs":"chunks/index_Dpp0rVo_.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index@_@mjs":"chunks/index_Dpr1IGBX.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/relations/index@_@mjs":"chunks/index_DtvnUIqE.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index@_@mjs":"chunks/index_DuaO-G89.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index@_@mjs":"chunks/index_Dwl2A2br.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index@_@mjs":"chunks/index_R7l7HKLS.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index@_@mjs":"chunks/index_YKlAoO4q.mjs","\u0000virtual:astro:page:src/pages/insights/index@_@astro":"chunks/index_Ze-oiWdv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/index@_@mjs":"chunks/index__PEKzCdL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/index@_@mjs":"chunks/index_a18RHHIr.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/index@_@mjs":"chunks/index_eO6yNzVA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/index@_@mjs":"chunks/index_qLtN3FFC.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index@_@mjs":"chunks/index_tdaR_Jw0.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/index@_@mjs":"chunks/index_z3N-0iSF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install@_@mjs":"chunks/install_Bx5MHh8M.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install@_@mjs":"chunks/install_C9Z8qXOL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items@_@mjs":"chunks/items_D54RxUy_.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/auth/dist/adapters/kysely.mjs":"chunks/kysely_BTON22nH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock@_@mjs":"chunks/lock_kszrKQRc.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/logout@_@mjs":"chunks/logout_C6bfoM3E.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/manifest@_@mjs":"chunks/manifest_DRW6vFI6.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/manifest.mjs":"chunks/manifest_DVSGzTJs.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp@_@mjs":"chunks/mcp_1qHtiUPk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/mcp@_@mjs":"chunks/mcp_ConEcrgl.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/me@_@mjs":"chunks/me_CBSIYWEM.mjs","\u0000virtual:emdash/media-providers":"chunks/media-providers_CsI1ANqo.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/media-usage-D6LjfdGn.mjs":"chunks/media-usage-D6LjfdGn_CgcIamND.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media@_@mjs":"chunks/media_CLQVKL5F.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/media@_@mjs":"chunks/media_JPGChh1f.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/menus-DoVbs2sn.mjs":"chunks/menus-DoVbs2sn_C510poqW.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/missing.mjs":"chunks/missing_DLJJnOJL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/mode@_@mjs":"chunks/mode_G_SpZ24B.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server@_@mjs":"chunks/oauth-authorization-server_BW2WWtBs.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource@_@mjs":"chunks/oauth-protected-resource_DSKjoVx7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/openapi.json@_@mjs":"chunks/openapi_DDbXlM20.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options@_@mjs":"chunks/options_CTh6GMRf.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/options@_@mjs":"chunks/options_Crx4geHq.mjs","\u0000virtual:astro:page:src/pages/our-work@_@astro":"chunks/our-work_BvyuHR1T.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents@_@mjs":"chunks/parents_DT_L3Lho.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent@_@mjs":"chunks/permanent_cg3PeYgX.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/plan.mjs":"chunks/plan_DgCalT9t.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare@_@mjs":"chunks/prepare_STyl0BN_.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url@_@mjs":"chunks/preview-url_C4oz4n8U.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/themes/preview@_@mjs":"chunks/preview_d0P54TDD.mjs","\u0000virtual:astro:page:src/pages/privacy-policy@_@astro":"chunks/privacy-policy_BzO06Tm0.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/probe@_@mjs":"chunks/probe_CZEhpqfv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress@_@mjs":"chunks/progress_DK9g0V7b.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish@_@mjs":"chunks/publish_DC7ECVHL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish@_@mjs":"chunks/publish_SJ7LlSKu.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle@_@mjs":"chunks/publisher-handle_V_LiJOoQ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions@_@mjs":"chunks/reactions_DZp8McN3.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/rebuild@_@mjs":"chunks/rebuild_BtzDT2_A.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/receipt.mjs":"chunks/receipt_BtjWlA22.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/refresh@_@mjs":"chunks/refresh_daj2pBRy.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/register-options@_@mjs":"chunks/register-options_BcE0Fn99.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/register-options@_@mjs":"chunks/register-options_C0Q97LO2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/register@_@mjs":"chunks/register_Bvfi_BLR.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/reorder@_@mjs":"chunks/reorder_BBkioQXk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder@_@mjs":"chunks/reorder_BhIYeVIn.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder@_@mjs":"chunks/reorder_CyV-l4AY.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder@_@mjs":"chunks/reorder_DGFNrlDt.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder@_@mjs":"chunks/reorder_DM0gZgqj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder@_@mjs":"chunks/reorder_XTxtCFSi.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair@_@mjs":"chunks/repair__gXRCs27.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/replace@_@mjs":"chunks/replace_tyY6qOjT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/request@_@mjs":"chunks/request_hV8QkY-6.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore@_@mjs":"chunks/restore_BLlum5iF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore@_@mjs":"chunks/restore_DeHlNDnt.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry@_@mjs":"chunks/retry_NaCYVRGJ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/retry@_@mjs":"chunks/retry_v-b2cTsg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions@_@mjs":"chunks/revisions_SsN4tSMv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/revoke@_@mjs":"chunks/revoke_7gZ1ztuP.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls@_@mjs":"chunks/rewrite-urls_C9Vi1XCa.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/robots.txt@_@mjs":"chunks/robots_CjvCS67l.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/room@_@mjs":"chunks/room_XcwOI_-F.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule@_@mjs":"chunks/schedule_Br4dUuRE.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/schema-B7ODIkP4.mjs":"chunks/schema-B7ODIkP4_GDXf9kH-.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/schema-D04_n_7j.mjs":"chunks/schema-D04_n_7j_DcnIm1F8.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/search-BxBg7Xq1.mjs":"chunks/search-BxBg7Xq1_6mWiZaNm.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery@_@mjs":"chunks/send-recovery_Dcjfajdp.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/send@_@mjs":"chunks/send_o5H556s0.mjs","\u0000virtual:astro:page:src/pages/services@_@astro":"chunks/services_yxuODlXy.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/settings-BApLX_aS.mjs":"chunks/settings-BApLX_aS_wxBON0NV.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/settings-DMHIgDyb.mjs":"chunks/settings-DMHIgDyb_BoKO0DHK.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings@_@mjs":"chunks/settings_CuVYXz-8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings@_@mjs":"chunks/settings_DqSd1bJ2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml@_@mjs":"chunks/sitemap-_collection__Dv8VDJVv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/sitemap.xml@_@mjs":"chunks/sitemap_Ds5KuXx1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/snapshot@_@mjs":"chunks/snapshot_BY2xtC_Q.mjs","\u0000virtual:astro:page:src/pages/work/spotify@_@astro":"chunks/spotify_zuBH8twj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/stats@_@mjs":"chunks/stats_C2ccFIrt.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/status@_@mjs":"chunks/status_BQEd_dtF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status@_@mjs":"chunks/status_Bq-ykJWm.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/suggest@_@mjs":"chunks/suggest_DL5C9m8o.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/summary@_@mjs":"chunks/summary_D1uY3hqH.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/taxonomies-D5bavOHA.mjs":"chunks/taxonomies-D5bavOHA_D8M6rNVI.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/dist/taxonomy-D4Fl2smf.mjs":"chunks/taxonomy-D4Fl2smf_C4qI23tr.mjs","\u0000virtual:astro:page:src/pages/test@_@astro":"chunks/test_CLGjqxMH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail@_@mjs":"chunks/thumbnail_0TUqHKJu.mjs","\u0000virtual:astro:page:src/pages/work/time2read@_@astro":"chunks/time2read_BtMYdOBF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token@_@mjs":"chunks/token_DSASq0_P.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/token@_@mjs":"chunks/token_Lf9glYqY.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels@_@mjs":"chunks/toolbar-labels_B0mpzJ0k.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/translations@_@mjs":"chunks/translations_Blyl0AOr.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations@_@mjs":"chunks/translations_Cyug412O.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/translations@_@mjs":"chunks/translations_Dpc0eVlu.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations@_@mjs":"chunks/translations_GeGEJCpM.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations@_@mjs":"chunks/translations_T32O_pwW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/trash@_@mjs":"chunks/trash_BDMYb4KW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/typegen@_@mjs":"chunks/typegen_gpr5pPLb.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall@_@mjs":"chunks/uninstall_B7E9oLOT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall@_@mjs":"chunks/uninstall_CehPOD2n.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish@_@mjs":"chunks/unpublish_Cu-d2Tmy.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update@_@mjs":"chunks/update_BA0CSQ8f.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update@_@mjs":"chunks/update_kqHc83Ly.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/updates@_@mjs":"chunks/updates_BRMi8M_s.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/upload-url@_@mjs":"chunks/upload-url_q_FxQK9n.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/upload@_@mjs":"chunks/upload_9SUYGcZT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage@_@mjs":"chunks/usage_BD3DUCqk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/usage@_@mjs":"chunks/usage_EUdFJxNL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/verify@_@mjs":"chunks/verify_BLbfk2lK.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify@_@mjs":"chunks/verify_Bx0Y_XX4.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify@_@mjs":"chunks/verify_Dfkgkb2N.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify@_@mjs":"chunks/verify_DgkR09XF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/verify@_@mjs":"chunks/verify_DjzjKNFL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-components@_@mjs":"chunks/widget-components_R6gFU4xg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets@_@mjs":"chunks/widgets_DnNWCKzE.mjs","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Accordion/Accordion.astro?astro&type=script&index=0&lang.ts":"_astro/Accordion.astro_astro_type_script_index_0_lang.C8pj00Tq.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/AvoCrew.astro?astro&type=script&index=0&lang.ts":"_astro/AvoCrew.astro_astro_type_script_index_0_lang.DM2HBhRP.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/CallBtn.astro?astro&type=script&index=0&lang.ts":"_astro/CallBtn.astro_astro_type_script_index_0_lang.CB6Dl9F1.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Testimonials/ContactTestimonial.astro?astro&type=script&index=0&lang.ts":"_astro/ContactTestimonial.astro_astro_type_script_index_0_lang.y9jLMG5F.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/GameSection.astro?astro&type=script&index=0&lang.ts":"_astro/GameSection.astro_astro_type_script_index_0_lang.1DEa6-eF.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/GlassCursor.astro?astro&type=script&index=0&lang.ts":"_astro/GlassCursor.astro_astro_type_script_index_0_lang.ECsjKBPw.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/HomeHero.astro?astro&type=script&index=0&lang.ts":"_astro/HomeHero.astro_astro_type_script_index_0_lang.fc4nosXL.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/HtmlBlockFrame.astro?astro&type=script&index=0&lang.ts":"_astro/HtmlBlockFrame.astro_astro_type_script_index_0_lang.BU-pUjYT.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/InlinePortableTextEditor.tsx":"_astro/InlinePortableTextEditor.8aveHmCm.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/LottieAnimation.astro?astro&type=script&index=0&lang.ts":"_astro/LottieAnimation.astro_astro_type_script_index_0_lang.ClWNS8DU.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/MostSoftware.astro?astro&type=script&index=0&lang.ts":"_astro/MostSoftware.astro_astro_type_script_index_0_lang.DS146Yja.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/global/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.BRfwPAQF.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/OrbBackground.astro?astro&type=script&index=0&lang.ts":"_astro/OrbBackground.astro_astro_type_script_index_0_lang.xk6gSD0V.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/shared-sections/OurWorkSection.astro?astro&type=script&index=0&lang.ts":"_astro/OurWorkSection.astro_astro_type_script_index_0_lang.D9KehOq9.js","emdash/internal/routes/PluginRegistry":"_astro/PluginRegistry.nGfPD1lH.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/PreviewHoverList.astro?astro&type=script&index=0&lang.ts":"_astro/PreviewHoverList.astro_astro_type_script_index_0_lang.BCZPWoGA.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/PrimaryBtn.astro?astro&type=script&index=0&lang.ts":"_astro/PrimaryBtn.astro_astro_type_script_index_0_lang.DPh7r1Zt.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/ScrollLockCards.astro?astro&type=script&index=0&lang.ts":"_astro/ScrollLockCards.astro_astro_type_script_index_0_lang.RZdkj10n.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/ScrollTabs.astro?astro&type=script&index=0&lang.ts":"_astro/ScrollTabs.astro_astro_type_script_index_0_lang.DVMok8zU.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/SecondaryBtn.astro?astro&type=script&index=0&lang.ts":"_astro/SecondaryBtn.astro_astro_type_script_index_0_lang.BKmozJFx.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/SlideInPanel/SlideInPanel.astro?astro&type=script&index=0&lang.ts":"_astro/SlideInPanel.astro_astro_type_script_index_0_lang.4jNsTBkJ.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Testimonials/TestimonialsSection.astro?astro&type=script&index=0&lang.ts":"_astro/TestimonialsSection.astro_astro_type_script_index_0_lang.CyCaaW7H.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/WhatWeBuild.astro?astro&type=script&index=0&lang.ts":"_astro/WhatWeBuild.astro_astro_type_script_index_0_lang.D_6531AE.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/WorkWithUs.astro?astro&type=script&index=0&lang.ts":"_astro/WorkWithUs.astro_astro_type_script_index_0_lang.B0Jv_A_e.js","@astrojs/react/client.js":"_astro/client.BtfFIrXo.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/CodeEditor-FZqFz0f8.js":"_astro/CodeEditor-FZqFz0f8.BzhFgkUk.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/ar.js":"_astro/ar.DYD98chC.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/bn.js":"_astro/bn.W8EbPt-6.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/ca.js":"_astro/ca.CTguNep_.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/cs.js":"_astro/cs.BWa0xH-y.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/da.js":"_astro/da.DqGw58vE.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/de.js":"_astro/de.CT6Xn1zK.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/registry-client/dist/discovery/index.js":"_astro/discovery.BZxv8LJh.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/en-GB.js":"_astro/en-GB.S3vnZ-La.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/es.js":"_astro/es.C3QEgrj4.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/eu.js":"_astro/eu.BHix8BRC.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/fa-IR.js":"_astro/fa-IR.CaFpoCJN.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/fr.js":"_astro/fr.OtG3Ckdl.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/he.js":"_astro/he.LSwL14HS.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/hi.js":"_astro/hi.DsTe8VgL.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/hr.js":"_astro/hr.D20IGMq9.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/hu.js":"_astro/hu.CpOafzvf.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/id.js":"_astro/id.BYHfX9m4.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/it.js":"_astro/it.Dpw3xecC.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/ja.js":"_astro/ja.iIUqh7Yc.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/ka.js":"_astro/ka.CLGdPUoN.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/ko.js":"_astro/ko.Ca8eneXT.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/lt.js":"_astro/lt.DhpgpWEq.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/nb.js":"_astro/nb.BQ6hMfCM.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/nl.js":"_astro/nl.CpVVtHZT.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/pl.js":"_astro/pl.Bc6jIXQi.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/pt-BR.js":"_astro/pt-BR.oXFPZYFQ.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/pt.js":"_astro/pt.iL86Dil_.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/@emdash-cms/admin/dist/replica-DU43LLN1.js":"_astro/replica-DU43LLN1.D7O_lpg3.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/ru.js":"_astro/ru.Br0C2zHi.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/sr-Latn.js":"_astro/sr-Latn.BRLUEiAw.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/sv.js":"_astro/sv.BpviOamW.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/th.js":"_astro/th.CRJlCNwD.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/tr.js":"_astro/tr.CsmByO_5.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/uk.js":"_astro/uk.BgvAc_C8.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/vi.js":"_astro/vi.qbL8m5-n.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/zh-CN.js":"_astro/zh-CN.xdhoTMwJ.js","/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/react-day-picker/dist/esm/locale/zh-TW.js":"_astro/zh-TW.BKioCDVU.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Accordion/Accordion.astro?astro&type=script&index=0&lang.ts","function e(){document.querySelectorAll(`.accordion`).forEach(e=>{if(e.dataset.accordionInitialised===`true`)return;e.dataset.accordionInitialised=`true`;let t=Array.from(e.children).filter(e=>e instanceof HTMLElement&&e.classList.contains(`accordion-item`));t.forEach(e=>{e.classList.remove(`is-open`);let t=e.querySelector(`.accordion__trigger`),n=e.querySelector(`.accordion__content`);t?.setAttribute(`aria-expanded`,`false`),n&&(n.setAttribute(`aria-hidden`,`true`),n.setAttribute(`inert`,``))}),t.forEach(e=>{let n=e.querySelector(`.accordion__trigger`);n&&n.addEventListener(`click`,()=>{let r=e.classList.contains(`is-open`);if(t.forEach(e=>{e.classList.remove(`is-open`);let t=e.querySelector(`.accordion__trigger`),n=e.querySelector(`.accordion__content`);t?.setAttribute(`aria-expanded`,`false`),n&&(n.setAttribute(`aria-hidden`,`true`),n.setAttribute(`inert`,``))}),!r){e.classList.add(`is-open`),n.setAttribute(`aria-expanded`,`true`);let t=e.querySelector(`.accordion__content`);t&&(t.setAttribute(`aria-hidden`,`false`),t.removeAttribute(`inert`))}})})})}e();"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/AvoCrew.astro?astro&type=script&index=0&lang.ts","document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`pickYour-section`),t=document.getElementById(`pickYour-carousel`),n=document.querySelectorAll(`.pickYour-card`),r=document.querySelectorAll(`.pickYour-nav-pill`),i=document.querySelector(`.pickYour-nav-track`);if(!e||!t||n.length===0)return;let a=n.length,o=.31,s=a*o,c=a-1,l=c*o,u=()=>window.innerWidth<=768,d=()=>window.innerWidth<1024?1350:1650,f=d(),p=0,m=0,h=-1,g=e=>{e!==h&&(h=e,r.forEach((t,n)=>{if(n===e){if(t.classList.add(`active`),i&&i.scrollWidth>i.clientWidth){let e=t.offsetLeft,n=t.offsetWidth,r=i.clientWidth;i.scrollTo({left:e-r/2+n/2,behavior:`smooth`})}}else t.classList.remove(`active`)}),n.forEach((t,n)=>{n===e?t.classList.add(`is-active`):t.classList.remove(`is-active`)}))},_=e=>{let r=n[e];if(!r)return;let i=r.offsetLeft+r.offsetWidth/2-t.clientWidth/2;t.scrollTo({left:i,behavior:`smooth`})},v=()=>{if(!u())return;let e=t.scrollLeft+t.clientWidth/2,r=0,i=1/0;n.forEach((t,n)=>{let a=t.offsetLeft+t.offsetWidth/2,o=Math.abs(e-a);o<i&&(i=o,r=n)}),g(r)};t.addEventListener(`scroll`,v,{passive:!0});let y=()=>{if(u())return;let t=e.getBoundingClientRect(),n=t.height-window.innerHeight;if(n<=0)return;let r=-t.top/n;r=Math.max(0,Math.min(1,r)),m=r*l};window.addEventListener(`scroll`,y,{passive:!0}),window.addEventListener(`resize`,()=>{f=d(),u()?(n.forEach(e=>{e.style.transform=``,e.style.opacity=``,e.style.visibility=``,e.style.pointerEvents=``,e.style.zIndex=``}),v()):y()});let b=(e,t)=>{let n=t-(e%a+a)%a;n>a/2&&(n-=a),n<-a/2&&(n+=a);let r=e+n;return r<0?r+=a:r>c&&(r-=a),r},x=t=>{let n=e.getBoundingClientRect().top+window.scrollY,r=e.offsetHeight-window.innerHeight,i=n+Math.max(0,Math.min(1,t*o/l))*r;window.scrollTo({top:i,behavior:`smooth`})};r.forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-index`)||`0`,10);if(u()){_(t);return}let n=Math.round(m/o),r=b(n,t);x(r)})}),n.forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-index`)||`0`,10);if(u()){_(t);return}let n=((t*o-p)%s+s)%s;n>s/2&&(n-=s);let r=Math.round(n/o),i=Math.round(m/o);x(i+r)})});let S=()=>{if(!u()){p+=(m-p)*.085;let e=(Math.round(p/o)%a+a)%a;g(e),n.forEach((e,t)=>{let n=((t*o-p)%s+s)%s;n>s/2&&(n-=s);let r=Math.abs(n),i=r/o,a=Math.sin(n)*f,c=(1-Math.cos(n))*1350,l=-r*150,u=180/Math.PI*n*.65,d=-n*(180/Math.PI)*.32,m=Math.max(.75,1.05-r*.25),h=0;h=i<=1?1-i*.2:i<1.35?Math.max(0,.8*(1-(i-1)/.35)):0,e.style.transform=`translate3d(${a.toFixed(1)}px, ${c.toFixed(1)}px, ${l.toFixed(1)}px) rotateZ(${u.toFixed(2)}deg) rotateY(${d.toFixed(2)}deg) scale(${m.toFixed(3)})`,e.style.opacity=h.toFixed(3),e.style.visibility=h<=.01?`hidden`:`visible`,e.style.pointerEvents=h<=.1?`none`:`auto`;let g=Math.round(50-r*20);e.style.zIndex=String(Math.max(1,g))})}requestAnimationFrame(S)};u()?g(0):y(),S()});"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/CallBtn.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`.call-btn`).forEach(e=>{let t=e.querySelector(`.call-btn__label`),n=e.querySelector(`.call-btn__arrow`);if(!t||!n)return;let r=()=>{e.style.setProperty(`--button-label-width`,`${t.offsetWidth}px`)};r(),new ResizeObserver(r).observe(t),e.addEventListener(`pointerenter`,()=>{n.classList.remove(`is-returning`),n.classList.add(`is-behind`)}),e.addEventListener(`pointerleave`,()=>{n.classList.remove(`is-behind`),n.classList.add(`is-returning`)}),n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&n.classList.contains(`is-returning`)&&n.classList.remove(`is-returning`)})});"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Testimonials/ContactTestimonial.astro?astro&type=script&index=0&lang.ts","var e=[{logo:`/images/logos/Firedart_Logo.svg`,logoAlt:`Firedart`,quote:`Working with AvoChoc has been consistently reassuring. Their team is dependable, professional, and focused on delivering outcomes that matter. From day one, they demonstrated a clear understanding of our needs and followed through with solutions that support our long-term goals. They've become a steady partner we know we can count on.`,name:`Prisha Boolah`,role:`CEO`,company:`Firedart`,ctaText:`WORK WITH US`,ctaLink:`/contact`},{logo:`/images/logos/Berylls_Logo.svg`,logoAlt:`Berylls`,quote:`AvoChoc couples a quality-first mindset with proactive execution, ensuring projects run smoothly from start to finish. I trust Jaco Bruwer to deliver, every time.`,name:`Dr Oliver Weis`,role:`Managing Director`,company:`Berylls`,ctaText:`WORK WITH US`,ctaLink:`/contact`},{logo:`/images/logos/GRITCARGO.svg`,logoAlt:`GritCargo`,quote:`At GritCargo, we have the pleasure of working with an exceptional team at AvoChoc. Their developers and managers are extremely competent and trustworthy and they take extra care to ensure that what they deliver is of the highest quality. AvoChoc, as a strategic partner, has played an essential role in enabling our business, always being proactive and focused on execution.`,name:`Nick Kulenkampff`,role:`CTO`,company:`GritCargo`,ctaText:`WORK WITH US`,ctaLink:`/contact`},{logo:`/images/logos/GRITCARGO.svg`,logoAlt:`BCKRDS`,quote:`The team at Avochoc are invaluable partners to us at BCKRDS and were critical to bringing the Spotify MOM DBN festival to life. They delivered a robust, interactive hub that kept our audience engaged and connected to the citywide events during the festival. Their flawless build handled the campaign's high demands effortlessly and significantly contributed to our project's success and our Spotify's impact during the campaign.`,name:`Wade`,role:`Owner`,company:`Time2Read`,ctaText:`WORK WITH US`,ctaLink:`/contact`}],t=()=>{document.querySelectorAll(`.contact-testimonial`).forEach(t=>{if(t.dataset.initialized===`true`||e.length<2)return;t.dataset.initialized=`true`;let n=t.querySelector(`[data-testimonial-quote]`),r=t.querySelector(`[data-testimonial-person]`),i=t.querySelector(`[data-testimonial-logo]`);if(!n||!r||!i)return;let a=Number(t.dataset.initialIndex)||0,o=window.matchMedia(`(prefers-reduced-motion: reduce)`),s=a,c,l=!1,u=6e3,d=(e,t)=>{c=window.setTimeout(()=>{l||e()},t)},f=()=>{l||(t.classList.add(`is-fading`),d(()=>{s=(s+1)%e.length;let a=e[s];n.textContent=a.quote,r.textContent=[a.name,a.role,a.company].filter(Boolean).join(`, `),i.src=a.logo,i.alt=a.logoAlt??``,t.classList.remove(`is-fading`),d(f,u)},o.matches?0:400))};d(f,u),document.addEventListener(`astro:before-swap`,()=>{l=!0,window.clearTimeout(c),t.dataset.initialized=`false`},{once:!0})})};t(),document.addEventListener(`astro:page-load`,t);"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/GameSection.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`[data-game]`).forEach(e=>{let t=e.querySelector(`[data-game-frame]`),n=e.querySelector(`[data-game-play]`),r=e.querySelector(`[data-game-exit]`),i=t?.dataset.src;if(!t||!n||!r||!i)return;let a=new URL(i,window.location.href).origin,o=!1,s=()=>e.dataset.state,c=t=>{e.dataset.state=t},l=e=>{t.contentWindow?.postMessage(e,a)};t.addEventListener(`load`,()=>{try{let e=t.contentWindow;if(!e||e.location.href===`about:blank`)return;let n=e.HTMLElement.prototype.focus;e.HTMLElement.prototype.focus=function(e){return n.call(this,{...e,preventScroll:!0})},e.Element.prototype.scrollIntoView=function(){}}catch{}});let u=()=>{s()!==`playing`&&(c(`playing`),t.tabIndex=0,o?l(`avochoc:resume`):(o=!0,t.src=i),t.focus({preventScroll:!0}))},d=({pauseGame:e})=>{if(s()!==`playing`)return;e&&l(`avochoc:pause`),c(`closing`);let r=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;window.setTimeout(()=>{c(`exited`),t.tabIndex=-1,n.focus({preventScroll:!0})},r?0:400)};n.addEventListener(`click`,u),r.addEventListener(`click`,()=>d({pauseGame:!0})),window.addEventListener(`message`,n=>{n.source===t.contentWindow&&(n.data===`avochoc:ready`?(e.dataset.ready=``,s()===`playing`&&t.focus({preventScroll:!0})):n.data===`avochoc:exit`&&d({pauseGame:!1}))})});"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/GlassCursor.astro?astro&type=script&index=0&lang.ts","var e=document.getElementById(`glass-cursor`);if(e&&!e.dataset.ready){e.dataset.ready=`true`;let t=t=>parseFloat(e.dataset[t]||`0`),n=t(`size`),r=t(`refraction`)/100,i=Math.min(t(`depth`)/400,1),a=t(`dispersion`)/100,o=t(`frost`)/100,s=t(`smoothing`)||.25,c=e.dataset.clip!==`false`,l=e.dataset.scope?document.querySelector(e.dataset.scope):e.parentElement,u=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,d=window.matchMedia(`(hover: hover) and (pointer: fine)`).matches,f=navigator.userAgentData?.brands,p=f?f.some(e=>/Chromium/i.test(e.brand)):/Chrome\\//.test(navigator.userAgent);!d||!l?e.remove():(p?m():e.classList.add(`is-fallback`),h(l));function m(){let e=n,t=document.createElement(`canvas`);t.width=t.height=e;let s=t.getContext(`2d`),c=s.createImageData(e,e),l=.15+.4*i,u=1-l,d=-.12;for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=(n+.5)/e*2-1,i=(t+.5)/e*2-1,a=Math.hypot(r,i),o=0,s=0;if(a<=1){let e=d;a>u&&(e=d+-.88*((a-u)/l)**3),o=r*e,s=i*e}let f=(t*e+n)*4;c.data[f]=Math.round(127.5+o*127.5),c.data[f+1]=Math.round(127.5+s*127.5),c.data[f+2]=127,c.data[f+3]=255}s.putImageData(c,0,0),document.getElementById(`gc-map`).setAttribute(`href`,t.toDataURL(`image/png`));let f=n/2*.9*r*2,p=.35*a;document.getElementById(`gc-dr`).setAttribute(`scale`,String(f*(1+p))),document.getElementById(`gc-dg`).setAttribute(`scale`,String(f)),document.getElementById(`gc-db`).setAttribute(`scale`,String(f*(1-p))),document.getElementById(`gc-blur`).setAttribute(`stdDeviation`,String(o*10))}function h(t){let r=n/2,i=e.classList.contains(`hide-cursor`),a=-9999,o=-9999,l=a,d=o,f=!1,p=0,m=()=>{let e=t.getBoundingClientRect();return a>=e.left&&a<=e.right&&o>=e.top&&o<=e.bottom},h=n=>{n!==f&&(f=n,n&&(l=a,d=o),e.classList.toggle(`is-visible`,n),i&&t.classList.toggle(`gc-hide-native`,n))},g=()=>{if(p=0,h(m()),!f)return;let i=u?1:s;if(l+=(a-l)*i,d+=(o-d)*i,e.style.transform=`translate3d(${l-r}px, ${d-r}px, 0)`,c){let i=t.getBoundingClientRect(),a=l-r,o=d-r,s=Math.max(0,i.top-o),c=Math.max(0,i.left-a),u=Math.max(0,a+n-i.right),f=Math.max(0,o+n-i.bottom);e.style.clipPath=`inset(${s}px ${u}px ${f}px ${c}px)`}(Math.abs(a-l)>.1||Math.abs(o-d)>.1)&&(p=requestAnimationFrame(g))},_=()=>{p||=requestAnimationFrame(g)};window.addEventListener(`pointermove`,e=>{e.pointerType!==`touch`&&(a=e.clientX,o=e.clientY,_())},{passive:!0}),window.addEventListener(`scroll`,_,{passive:!0}),window.addEventListener(`resize`,_),document.documentElement.addEventListener(`mouseleave`,()=>{a=o=-9999,_()})}}"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/HomeHero.astro?astro&type=script&index=0&lang.ts","function e(){let e=document.querySelector(`.video-card`),t=document.querySelector(`.bg-video`),n=document.querySelector(`.card-video`),r=document.querySelector(`.text-column`);e&&t&&n&&r&&(e.addEventListener(`mouseenter`,()=>{t.style.opacity=`1`,n.style.opacity=`1`,r.classList.add(`fade-out`),t.play(),n.play()}),e.addEventListener(`mouseleave`,()=>{t.style.opacity=`0`,n.style.opacity=`0`,r.classList.remove(`fade-out`),t.pause(),n.pause()}))}document.addEventListener(`DOMContentLoaded`,e);"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/global/Navigation.astro?astro&type=script&index=0&lang.ts","var e=document.querySelector(`.nav-bar`),t=document.querySelector(`.mobile-menu-toggle`),n=document.querySelector(`.mobile-menu-overlay`),r=document.querySelector(`.mobile-menu-close`);function i(){n&&t&&(n.classList.add(`is-open`),n.removeAttribute(`inert`),n.setAttribute(`aria-hidden`,`false`),t.setAttribute(`aria-expanded`,`true`),document.body.classList.add(`mobile-menu-open`),r?.focus())}function a(){n&&t&&(n.classList.remove(`is-open`),n.setAttribute(`inert`,``),n.setAttribute(`aria-hidden`,`true`),t.setAttribute(`aria-expanded`,`false`),document.body.classList.remove(`mobile-menu-open`),t.focus())}e&&t&&n&&r&&(t.addEventListener(`click`,i),r.addEventListener(`click`,a),n.querySelectorAll(`a`).forEach(e=>{e.addEventListener(`click`,()=>{n.classList.remove(`is-open`),n.setAttribute(`inert`,``),n.setAttribute(`aria-hidden`,`true`),t.setAttribute(`aria-expanded`,`false`),document.body.classList.remove(`mobile-menu-open`)})}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&n.classList.contains(`is-open`)&&a()}),window.matchMedia(`(min-width: 800px)`).addEventListener(`change`,e=>{e.matches&&n.classList.contains(`is-open`)&&(n.classList.remove(`is-open`),n.setAttribute(`inert`,``),n.setAttribute(`aria-hidden`,`true`),t.setAttribute(`aria-expanded`,`false`),document.body.classList.remove(`mobile-menu-open`))}));"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/OrbBackground.astro?astro&type=script&index=0&lang.ts","var e=document.querySelectorAll(`[data-orb-section]`);if(`IntersectionObserver`in window){let t=new IntersectionObserver(e=>{for(let t of e)t.target.toggleAttribute(`data-orb-paused`,!t.isIntersecting)});e.forEach(e=>t.observe(e))}"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/shared-sections/OurWorkSection.astro?astro&type=script&index=0&lang.ts","var e=()=>{document.querySelectorAll(`[data-our-work]`).forEach(e=>{if(e.dataset.initialized===`true`)return;let t=e.querySelector(`[data-filter-toggle]`),n=e.querySelector(`[data-filter-toggle-label]`),r=e.querySelector(`[data-filter-icon]`),i=e.querySelector(`[data-filter-close-icon]`),a=e.querySelector(`[data-filter-options]`),o=Array.from(e.querySelectorAll(`[data-view-toggle]`)),s=Array.from(e.querySelectorAll(`[data-view-panel]`)),c=e.querySelector(`[data-work-results]`),l=e.querySelector(`[data-work-empty]`);if(!t||!n||!a||!c||!l||o.length===0||s.length===0)return;e.dataset.initialized=`true`;let u=Array.from(c.querySelectorAll(`[data-work-card]`)),d=Array.from(e.querySelectorAll(`[data-preview-list-item]`)),f=Array.from(a.querySelectorAll(`[data-category-filter]`)),p=new Set,m=e=>String(e??``).trim().toLowerCase(),h=t=>{e.dataset.view=t,o.forEach(e=>{let n=e.dataset.viewToggle===t;e.classList.toggle(`is-active`,n),e.setAttribute(`aria-pressed`,String(n))}),s.forEach(e=>{e.hidden=e.dataset.viewPanel!==t})};o.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.viewToggle;(t===`grid`||t===`list`)&&h(t)})});let g=e=>{t.setAttribute(`aria-expanded`,String(e)),t.setAttribute(`aria-label`,e?`Close filters`:`Open filters`),n.textContent=e?``:`Filter`,r&&(r.hidden=e),i&&(i.hidden=e),a.hidden=!e};t.addEventListener(`click`,()=>{let e=t.getAttribute(`aria-expanded`)===`true`;g(!e)});let _=()=>{let t=u.filter(e=>{let t=m(e.dataset.category);return p.size===0||p.has(t)});d.forEach(e=>{let t=m(e.dataset.category);e.hidden=!(p.size===0||p.has(t))}),f.forEach(e=>{let t=m(e.dataset.categoryFilter),n=t===`all`?p.size===0:p.has(t);e.classList.toggle(`is-active`,n),e.setAttribute(`aria-pressed`,String(n))}),c.replaceChildren();let n=p.size>0,r=n?3:4;for(let e=0;e<t.length;e+=r){let i=document.createElement(`div`);i.className=`our-work-section__group`;let a=t.slice(e,e+r);if(n){let e=document.createElement(`div`);e.className=`our-work-section__cards`,a.forEach(t=>{t.classList.remove(`is-featured`),t.classList.add(`is-standard`),e.appendChild(t)}),i.appendChild(e)}else{let[e,...t]=a;if(!e)continue;if(e.classList.add(`is-featured`),e.classList.remove(`is-standard`),i.appendChild(e),t.length>0){let e=document.createElement(`div`);e.className=`our-work-section__cards`,t.forEach(t=>{t.classList.remove(`is-featured`),t.classList.add(`is-standard`),e.appendChild(t)}),i.appendChild(e)}}c.appendChild(i)}l.hidden=t.length>0,e.classList.toggle(`has-active-filter`,p.size>0)};f.forEach(e=>{e.addEventListener(`click`,()=>{let t=m(e.dataset.categoryFilter);t===`all`?p.clear():p.has(t)?p.delete(t):p.add(t),_()})}),g(!1),h(`grid`),_()})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,e,{once:!0}):e();"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/PreviewHoverList.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`[data-preview-hover-list]`).forEach(e=>{let t=Array.from(e.querySelectorAll(`[data-preview-row]`)),n=e.querySelector(`.preview-hover-list__preview`),r=Array.from(e.querySelectorAll(`.preview-hover-list__image`));if(!n||r.length!==2||t.length===0)return;let i=n,a=window.matchMedia(`(prefers-reduced-motion: reduce)`),o=window.matchMedia(`(hover: none), (pointer: coarse)`),s=-1,c=0,l,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=!1,y=0,b=0,x=!1;t.forEach(e=>{let t=e.dataset.photo;if(t){let e=new Image;e.src=t}});function S(e){t.forEach((t,n)=>{t.classList.toggle(`is-active`,n===e)})}function C(e,t){p=e,m=t,v||(h=e,g=t,v=!0,i.style.transform=`translate3d(${e}px, ${t}px, 0)`),a.matches||o.matches?(h=e,g=t,a.matches||(i.style.transform=`translate3d(${e}px, ${t}px, 0)`)):d||=(_=0,requestAnimationFrame(w))}function w(e){let t=_?Math.min(e-_,50):16.67;_=e;let n=1-Math.exp(-t/160);h+=(p-h)*n,g+=(m-g)*n,i.style.transform=`translate3d(${h}px, ${g}px, 0)`,Math.hypot(p-h,m-g)>.15?d=requestAnimationFrame(w):(h=p,g=m,i.style.transform=`translate3d(${h}px, ${g}px, 0)`,d=0,_=0)}function T(e){let n=t[e];if(!n)return;let o=n.dataset.photo;if(!o){E();return}if(window.clearTimeout(u),i.style.visibility=`visible`,i.classList.add(`is-visible`),S(e),e===s)return;s=e,r.forEach(e=>{e.getAnimations().forEach(e=>{e.cancel()})}),l=void 0;let d=1-c,f=r[d],p=r[c];if(f.src=o,p.style.opacity=`1`,p.style.transform=`scale(1)`,p.style.zIndex=`1`,f.classList.remove(`is-current`),f.style.opacity=`0`,f.style.transform=`scale(0.8)`,f.style.zIndex=`2`,a.matches){p.classList.remove(`is-current`),p.style.opacity=`0`,f.classList.add(`is-current`),f.style.opacity=`1`,f.style.transform=`scale(1)`,c=d;return}let m=f.animate([{opacity:0,transform:`scale(0.8)`},{opacity:1,transform:`scale(1)`}],{duration:450,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`,fill:`forwards`});l=m,m.onfinish=()=>{l===m&&s===e&&(f.classList.add(`is-current`),f.style.opacity=`1`,f.style.transform=`scale(1)`,p.classList.remove(`is-current`),p.style.opacity=`0`,p.style.transform=`scale(1)`,m.cancel(),l=void 0,c=d)}}function E(){window.clearTimeout(u),s=-1,S(-1),i.classList.remove(`is-visible`),u=window.setTimeout(()=>{i.classList.contains(`is-visible`)||(i.style.visibility=`hidden`)},300)}function D(){let e=t[0]?.dataset.photo;e?(window.clearTimeout(u),r.forEach(e=>{e.getAnimations().forEach(e=>{e.cancel()}),e.classList.remove(`is-current`),e.style.opacity=`0`,e.style.transform=`scale(1)`}),r[0].src=e,r[0].classList.add(`is-current`),r[0].style.opacity=`1`,r[0].style.zIndex=`2`,c=0,s=0,S(0),i.style.visibility=`visible`,i.classList.add(`is-visible`)):(i.classList.remove(`is-visible`),i.style.visibility=`hidden`,S(-1))}a.matches&&D(),document.addEventListener(`pointermove`,e=>{a.matches||o.matches||(y=e.clientX,b=e.clientY,x=!0,C(e.clientX+40,e.clientY-120))},{passive:!0}),t.forEach((e,t)=>{e.addEventListener(`pointerenter`,()=>{o.matches||T(t)}),e.addEventListener(`focus`,()=>{T(t)}),e.addEventListener(`click`,()=>{if(!o.matches)return;if(!e.dataset.photo){E();return}let n=e.getBoundingClientRect(),r=i.getBoundingClientRect().width,a=i.getBoundingClientRect().height;C(Math.max(16,Math.min(n.right-40,window.innerWidth-r-16)),Math.max(16,Math.min(n.top+n.height/2-a/2,window.innerHeight-a-16))),T(t)})}),e.addEventListener(`pointerleave`,()=>{o.matches||E()});function O(){if(a.matches||o.matches||!x)return;let n=e.getBoundingClientRect();if(y<n.left||y>n.right||b<n.top||b>n.bottom){E();return}let r=document.elementFromPoint(y,b)?.closest(`[data-preview-row]`),i=r?t.indexOf(r):-1;r&&i!==-1&&e.contains(r)?T(i):E()}window.addEventListener(`scroll`,()=>{a.matches||o.matches||(f||=requestAnimationFrame(()=>{f=0,O()}))},{passive:!0}),window.addEventListener(`resize`,()=>{a.matches||o.matches||O()},{passive:!0}),new IntersectionObserver(([e])=>{!e.isIntersecting&&!a.matches&&E()},{threshold:0}).observe(e),a.addEventListener(`change`,e=>{e.matches?(d&&cancelAnimationFrame(d),d=0,f&&cancelAnimationFrame(f),f=0,D()):(E(),x=!1,v=!1)})});"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/PrimaryBtn.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`.primary-btn`).forEach(e=>{let t=e.querySelector(`.primary-btn__label`),n=e.querySelector(`.primary-btn__arrow`);if(!t||!n)return;let r=()=>{e.style.setProperty(`--button-label-width`,`${t.offsetWidth}px`)};r(),new ResizeObserver(r).observe(t),e.addEventListener(`pointerenter`,()=>{n.classList.remove(`is-returning`),n.classList.add(`is-behind`)}),e.addEventListener(`pointerleave`,()=>{n.classList.remove(`is-behind`),n.classList.add(`is-returning`)}),n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&n.classList.contains(`is-returning`)&&n.classList.remove(`is-returning`)})});"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/ScrollLockCards.astro?astro&type=script&index=0&lang.ts","var e=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),t=e=>1-(1-e)**3,n=.84,r=.5;document.querySelectorAll(`[data-scroll-stack]`).forEach(i=>{let a=Array.from(i.querySelectorAll(`[data-stack-item]`)),o=i.querySelector(`.stack-cards`),s=window.matchMedia(`(min-width: 800px) and (prefers-reduced-motion: no-preference)`),c=!1,l=1,u=()=>{if(!s.matches){l=1,o.style.zoom=``;return}o.style.zoom=`1`;let t=o.offsetHeight;l=e(window.innerHeight*n/t,r,1),o.style.zoom=String(l)},d=()=>{if(c=!1,!s.matches){a.forEach(e=>{e.style.transform=``,e.style.opacity=``,e.style.filter=``});return}let n=i.offsetHeight-window.innerHeight,r=e(-i.getBoundingClientRect().top/n)*(a.length-1),o=a.map((n,i)=>i===0?1:t(e(r-(i-1))));a.forEach((e,t)=>{let n=0;for(let e=t+1;e<a.length;e++)n+=o[e];let r=(1-o[t])*window.innerHeight*1.1/l;e.style.transform=`translateY(${r-n*14}px) scale(${1-n*.04})`,e.style.opacity=String(Math.max(.3,1-n*.35)),e.style.filter=``})},f=()=>{c||(c=!0,requestAnimationFrame(d))},p=()=>{u(),f()};window.addEventListener(`scroll`,f,{passive:!0}),window.addEventListener(`resize`,p),window.addEventListener(`load`,p),document.fonts?.ready.then(p),s.addEventListener(`change`,p),u(),d()});"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/ScrollTabs.astro?astro&type=script&index=0&lang.ts","function e(){document.querySelectorAll(`.scroll-tabs`).forEach(e=>{let t=e.querySelectorAll(`.scroll-tabs__tab`),n=e.querySelectorAll(`.scroll-tabs__panel`),r=n.length;if(!r||t.length!==r)return;let i=-1,a=e=>{e!==i&&(i=e,t.forEach((e,t)=>{let n=t===i;e.classList.toggle(`active`,n),e.setAttribute(`aria-selected`,String(n))}),n.forEach((e,t)=>{let n=t===i;e.classList.toggle(`active`,n),e.setAttribute(`aria-hidden`,String(!n))}))};a(0);let o=()=>{let t=e.getBoundingClientRect(),n=e.clientHeight-window.innerHeight;if(n<=0)return;let i=-t.top/n;i=Math.max(0,Math.min(1,i));let o=Math.floor(i*r);o>=r&&(o=r-1),a(o)};window.addEventListener(`scroll`,o,{passive:!0}),o()})}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,e):e();"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/SecondaryBtn.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`.secondary-btn`).forEach(e=>{let t=e.querySelector(`.secondary-btn__label`),n=e.querySelector(`.secondary-btn__arrow`);if(!t||!n)return;let r=()=>{e.style.setProperty(`--button-label-width`,`${t.offsetWidth}px`)};r(),new ResizeObserver(r).observe(t),e.addEventListener(`pointerenter`,()=>{n.classList.remove(`is-returning`),n.classList.add(`is-behind`)}),e.addEventListener(`pointerleave`,()=>{n.classList.remove(`is-behind`),n.classList.add(`is-returning`)}),n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&n.classList.contains(`is-returning`)&&n.classList.remove(`is-returning`)})});"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/SlideInPanel/SlideInPanel.astro?astro&type=script&index=0&lang.ts","var e=`[data-slide-in-panel]`,t=`[data-panel-backdrop]`,n=new WeakSet,r=[],i=``,a=``,o=0;function s(){if(o===0){i=document.body.style.overflow,a=document.body.style.paddingRight;let e=window.innerWidth-document.documentElement.clientWidth;if(e>0){let t=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;document.body.style.paddingRight=`${t+e}px`}document.body.style.overflow=`hidden`}o++}function c(){o=Math.max(0,o-1),o===0&&(document.body.style.overflow=i,document.body.style.paddingRight=a)}function l(e){return[...e.querySelectorAll(`a[href],area[href],button:not([disabled]),input:not([disabled]):not([type='hidden']),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex='-1'])`)].filter(e=>!e.closest(`[hidden]`)&&e.getAttribute(`aria-hidden`)!==`true`&&e.getClientRects().length>0)}function u(e){let n=e.previousElementSibling;return n?.matches(t)?n:null}function d(e){if(n.has(e))return;n.add(e);let t=u(e),i=!1,a=null,o=null;function d(n){i||(clearTimeout(o),i=!0,a=n,s(),e.hidden=!1,t&&(t.hidden=!1),r.push(e),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i&&(e.classList.add(`is-open`),t?.classList.add(`is-open`))})}),requestAnimationFrame(()=>{if(!i)return;let t=l(e);t.length>0?t[0].focus():e.focus()}))}function f(){if(!i)return;i=!1,e.classList.remove(`is-open`),t?.classList.remove(`is-open`),c();let n=r.indexOf(e);n!==-1&&r.splice(n,1),clearTimeout(o);let s=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches?0:650;o=window.setTimeout(()=>{i||(e.hidden=!0,t&&(t.hidden=!0),a?.isConnected&&a.focus(),a=null)},s)}e.__slideInPanel={open:d,close:f}}function f(){document.querySelectorAll(e).forEach(d)}function p(t){let n=t.getAttribute(`data-panel-open`);if(!n)return null;let r=document.getElementById(n);return r?.matches(e)?r:(console.warn(`Slide-in panel \"${n}\" was not found.`),null)}function m(e){let t=e.target.closest(`[data-panel-open]`);if(!t)return;let n=p(t);n?.__slideInPanel&&(e.preventDefault(),n.__slideInPanel.open(t))}function h(n){let r=n.target.closest(`[data-panel-close]`);if(r){let t=r.closest(e);if(t?.__slideInPanel){t.__slideInPanel.close();return}}let i=n.target.closest(t);if(i){let t=i.nextElementSibling;t?.matches(e)&&t.__slideInPanel&&t.__slideInPanel.close()}}function g(e){let t=r[r.length-1];if(!t?.__slideInPanel)return;if(e.key===`Escape`){e.preventDefault(),t.__slideInPanel.close();return}if(e.key!==`Tab`)return;let n=l(t);if(n.length===0){e.preventDefault(),t.focus();return}let i=n[0],a=n[n.length-1];e.shiftKey&&(document.activeElement===i||document.activeElement===t)?(e.preventDefault(),a.focus()):e.shiftKey||document.activeElement!==a&&document.activeElement!==t||(e.preventDefault(),i.focus())}function _(){f(),document.documentElement.dataset.slideInPanelsReady||(document.documentElement.dataset.slideInPanelsReady=`true`,document.addEventListener(`click`,m),document.addEventListener(`click`,h),document.addEventListener(`keydown`,g),document.addEventListener(`astro:page-load`,f))}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,_,{once:!0}):_();"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Testimonials/TestimonialsSection.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`[data-testimonial-section]`).forEach(e=>{if(e.dataset.carouselInitialised===`true`)return;e.dataset.carouselInitialised=`true`;let t=e.querySelector(`[data-testimonial-grid]`),n=e.querySelector(`.testimonial-section__arrow--prev`),r=e.querySelector(`.testimonial-section__arrow--next`);if(!t||!n||!r)return;let i=window.matchMedia(`(max-width: 799px)`),a=()=>i.matches||e.classList.contains(`testimonial-section--carousel`),o=()=>{let e=Math.max(0,t.scrollWidth-t.clientWidth),i=a()&&e>1;n.hidden=!i,r.hidden=!i,n.disabled=!i||t.scrollLeft<=1,r.disabled=!i||t.scrollLeft>=e-1},s=e=>{let n=t.firstElementChild;if(!n)return;let r=window.getComputedStyle(t),i=parseFloat(r.columnGap)||parseFloat(r.gap)||0;t.scrollBy({left:e*(n.getBoundingClientRect().width+i),behavior:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches?`auto`:`smooth`})};n.addEventListener(`click`,()=>s(-1)),r.addEventListener(`click`,()=>s(1)),t.addEventListener(`scroll`,o,{passive:!0}),window.addEventListener(`resize`,o),i.addEventListener(`change`,o),new ResizeObserver(o).observe(t),o()});"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/WhatWeBuild.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`[data-what-we-build]`).forEach(e=>{if(e.dataset.initialised===`true`)return;let t=e.querySelector(`[data-service-viewport]`),n=e.querySelector(`[data-service-track]`),r=Array.from(e.querySelectorAll(`[data-service-pill]`)),i=Array.from(e.querySelectorAll(`[data-service-card]`));if(!t||!n||!r.length||!i.length)return;e.dataset.initialised=`true`;let a=window.matchMedia(`(min-width: 800px)`),o=window.matchMedia(`(prefers-reduced-motion: reduce)`),s=!1,c=!1,l=0,u=0,d=null,f=!1,p=!1,m,h=()=>{p=!1,m&&=(clearTimeout(m),void 0)},g=e=>{e<0||e>=i.length||r.forEach((t,n)=>{let r=n===e;t.classList.toggle(`is-active`,r),t.setAttribute(`aria-pressed`,String(r))})},_=()=>{if(!a.matches){n.style.setProperty(`--service-trailing-space`,`0px`);return}let e=i[i.length-1];if(!e)return;let r=Math.max(0,t.clientWidth-e.getBoundingClientRect().width);n.style.setProperty(`--service-trailing-space`,`${r}px`)},v=()=>{if(!a.matches)return;let e=t.getBoundingClientRect().left,n=0,r=1/0;i.forEach((t,i)=>{let a=t.getBoundingClientRect();if(a.right<=e+1)return;let o=Math.abs(a.left-e);o<r&&(r=o,n=i)}),g(n)},y=e=>{let n=i[e];if(!n)return;g(e);let r=o.matches?`auto`:`smooth`;if(!a.matches){n.scrollIntoView({behavior:r,block:`start`});return}if(e===0){t.scrollTo({left:0,behavior:r});return}let s=t.scrollLeft+n.getBoundingClientRect().left-t.getBoundingClientRect().left;t.scrollTo({left:s,behavior:r})};r.forEach((e,t)=>{e.addEventListener(`click`,()=>y(t))}),t.addEventListener(`scroll`,v,{passive:!0}),t.addEventListener(`pointerdown`,n=>{if(!a.matches||n.button!==0||!n.isPrimary)return;h(),s=!0,c=!1,l=n.clientX,u=t.scrollLeft,d=n.pointerId;let r=n.target;f=r instanceof Element&&!!r.closest(`[data-service-card]`),e.classList.add(`is-dragging`)}),t.addEventListener(`pointermove`,e=>{if(!s||e.pointerId!==d)return;let n=e.clientX-l;!c&&Math.abs(n)>5&&(c=!0,t.classList.add(`is-dragging`),t.hasPointerCapture(e.pointerId)||t.setPointerCapture(e.pointerId)),c&&(t.scrollLeft=u-n)});let b=n=>{if(!s||n.pointerId!==d)return;let r=c&&f;s=!1,d=null,e.classList.remove(`is-dragging`),t.classList.remove(`is-dragging`),t.hasPointerCapture(n.pointerId)&&t.releasePointerCapture(n.pointerId),r&&(p=!0,v(),m=setTimeout(()=>{p=!1,m=void 0},250)),c=!1,f=!1};t.addEventListener(`pointerup`,b),t.addEventListener(`pointercancel`,b),t.addEventListener(`lostpointercapture`,()=>{s&&(s=!1,d=null,e.classList.remove(`is-dragging`),t.classList.remove(`is-dragging`),c=!1,f=!1)}),t.addEventListener(`click`,e=>{p&&(h(),e.preventDefault(),e.stopPropagation())},!0),a.addEventListener(`change`,()=>{s=!1,c=!1,d=null,f=!1,h(),e.classList.remove(`is-dragging`),t.classList.remove(`is-dragging`),t.scrollLeft=0,_(),g(0)});let x=new ResizeObserver(()=>{_(),v()});x.observe(t),x.observe(n),i.forEach(e=>x.observe(e)),_(),v()});"],["/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/WorkWithUs.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`.work-with-us__carousel`).forEach(e=>{let t=e.querySelector(`.work-with-us__grid`),n=e.querySelector(`.work-with-us__arrow--prev`),r=e.querySelector(`.work-with-us__arrow--next`);if(!t||!n||!r)return;let i=()=>{let e=t.scrollWidth-t.clientWidth,i=window.matchMedia(`(max-width: 799px)`).matches;n.disabled=!i||t.scrollLeft<=1,r.disabled=!i||t.scrollLeft>=e-1},a=e=>{let n=t.firstElementChild;if(!n)return;let r=parseFloat(getComputedStyle(t).columnGap)||0;t.scrollBy({left:e*(n.getBoundingClientRect().width+r),behavior:`smooth`})};n.addEventListener(`click`,()=>a(-1)),r.addEventListener(`click`,()=>a(1)),t.addEventListener(`scroll`,i,{passive:!0}),window.addEventListener(`resize`,i),i()});"]],"assets":["/_astro/BaseLayout.CZPSnt1t.css","/_astro/CodeEditor-FZqFz0f8.BzhFgkUk.js","/_astro/DateLib.BmnAgYun.js","/_astro/HtmlBlockFrame.astro_astro_type_script_index_0_lang.BU-pUjYT.js","/_astro/ISOCertified.Bhrnlk1f.css","/_astro/InlinePortableTextEditor.8aveHmCm.js","/_astro/LottieAnimation.astro_astro_type_script_index_0_lang.ClWNS8DU.js","/_astro/MostSoftware.astro_astro_type_script_index_0_lang.DS146Yja.js","/_astro/OurWorkSection.CNWTrZbW.css","/_astro/PluginRegistry.nGfPD1lH.js","/_astro/TestimonialsSection.Cm29RPpt.css","/_astro/_slug_.BUmZnVea.css","/_astro/about-us.D_PhxD_v.css","/_astro/ai.B_dclLq3.css","/_astro/ar.DYD98chC.js","/_astro/bn.W8EbPt-6.js","/_astro/ca.CTguNep_.js","/_astro/client.BJiTmWME.js","/_astro/client.BtfFIrXo.js","/_astro/contact._uNPv7oV.css","/_astro/cs.BWa0xH-y.js","/_astro/da.DqGw58vE.js","/_astro/de.CT6Xn1zK.js","/_astro/discovery.BZxv8LJh.js","/_astro/dist.1iluqyKe.js","/_astro/dist.Xh4WwBlx.js","/_astro/en-GB.S3vnZ-La.js","/_astro/en-US.BfVYve2-.js","/_astro/es.C3QEgrj4.js","/_astro/eu.BHix8BRC.js","/_astro/fa-IR.CaFpoCJN.js","/_astro/fonts/08f0ea18cdf1ae81.woff2","/_astro/fonts/1633c6c006fb5995.woff2","/_astro/fonts/190f8cf059e0f931.woff2","/_astro/fonts/1d7aab50fda97bb3.woff2","/_astro/fonts/1e5097bbf9c9d577.woff2","/_astro/fonts/63342f4e10d096aa.woff2","/_astro/fonts/6ed39b447c70fac7.woff2","/_astro/fonts/81fc65a9fa1b7533.woff2","/_astro/fonts/84070159564df0be.woff2","/_astro/fonts/9593fbb8383eb01c.woff2","/_astro/fonts/a582ec5275b6220a.woff2","/_astro/fonts/a9bea187e846fcc2.woff2","/_astro/fonts/ad35ff1453ab1728.woff2","/_astro/fonts/cced06053f87829e.woff2","/_astro/fonts/d581d51cd793384e.woff2","/_astro/fonts/f52e1d65e1364c61.woff2","/_astro/fr.OtG3Ckdl.js","/_astro/he.LSwL14HS.js","/_astro/hi.DsTe8VgL.js","/_astro/hr.D20IGMq9.js","/_astro/html-block.ClFHzl_P.js","/_astro/hu.CpOafzvf.js","/_astro/id.BYHfX9m4.js","/_astro/index.DIfkbvjT.css","/_astro/index.YDpIFAt_.css","/_astro/isSameWeek.CC_jGW6N.js","/_astro/it.Dpw3xecC.js","/_astro/ja.iIUqh7Yc.js","/_astro/ka.CLGdPUoN.js","/_astro/ko.Ca8eneXT.js","/_astro/lib.CaN88W2u.js","/_astro/listing-policy.CKnc2p5f.js","/_astro/lt.DhpgpWEq.js","/_astro/messages-6Qw3S1f6.DLVPttsZ.js","/_astro/messages-B8ZeAA8U.wd5EWL9L.js","/_astro/messages-BC2Kjxql.BxUGy8sE.js","/_astro/messages-BF8xdAI8.B8PaRIA0.js","/_astro/messages-BFP27cPa.lV1hDZw7.js","/_astro/messages-BHPvHMBG.DoZBtn1u.js","/_astro/messages-BKtU2A41.WpltdJUF.js","/_astro/messages-BZZGBbQ5.Db8tQIll.js","/_astro/messages-B_vZoujn.Bg04t8tv.js","/_astro/messages-BefYD9qF.B0npsPaa.js","/_astro/messages-BxNTk-gk.Dcg1IX5I.js","/_astro/messages-C1gFepcH.H4Z1PQIa.js","/_astro/messages-CFWDZ27W.D7jl4yLj.js","/_astro/messages-CM44V0y5.CqoxZ-kk.js","/_astro/messages-CV-A5Rwg.DOD3y5C9.js","/_astro/messages-CWO2az5c.Dtfs7BmS.js","/_astro/messages-C_mvBelI.BsmkIklG.js","/_astro/messages-CfsdrLwV.BAd-mIxE.js","/_astro/messages-Cr2O9X1x.Cq2q2b0d.js","/_astro/messages-Ctd2bivK.BUX-_nor.js","/_astro/messages-Cw269vbh.DNyWkDb-.js","/_astro/messages-D54_G1T3.CQKfN0DB.js","/_astro/messages-DG2iG_JJ.BvLCfbOy.js","/_astro/messages-DIUd7tWg.CmppELkI.js","/_astro/messages-DPKn9QIg.Bd1IW89o.js","/_astro/messages-DPXp_0fz.CKERUaiY.js","/_astro/messages-DWVuRRpI.D4jhQoq9.js","/_astro/messages-DWZv8MVZ.Y8PY6nrU.js","/_astro/messages-DYDRsTz5.V1V5WfqC.js","/_astro/messages-DZE2Fcoe.uhDZL7U7.js","/_astro/messages-DdtLUflK.BHAS8NUt.js","/_astro/messages-DqXefsCH.k2u-mDhn.js","/_astro/messages-YOQUrrdZ.C28nX9MY.js","/_astro/messages-cVoGTRl2.CojYPKyT.js","/_astro/messages-sxm3cgp-.CK7JMTNG.js","/_astro/messages-uFomUl-W.BDyVmWe5.js","/_astro/messages-uyeoSi8t.CwkcAY_7.js","/_astro/messages-x6Xf5V88.Dopsuzme.js","/_astro/nb.BQ6hMfCM.js","/_astro/nl.CpVVtHZT.js","/_astro/pl.Bc6jIXQi.js","/_astro/pt-BR.oXFPZYFQ.js","/_astro/pt.iL86Dil_.js","/_astro/react-dom.D3E_MV7R.js","/_astro/replica-DU43LLN1.D7O_lpg3.js","/_astro/ru.Br0C2zHi.js","/_astro/services.F5vAgI1X.css","/_astro/sr-Latn.BRLUEiAw.js","/_astro/styles.D4gUjB15.css","/_astro/sv.BpviOamW.js","/_astro/th.CRJlCNwD.js","/_astro/tr.CsmByO_5.js","/_astro/uk.BgvAc_C8.js","/_astro/vi.qbL8m5-n.js","/_astro/zh-CN.xdhoTMwJ.js","/_astro/zh-TW.BKioCDVU.js","/animations/AvoWebsite-Lottie-1.lottie","/animations/AvoWebsite-Lottie-2.lottie","/animations/AvoWebsite-Lottie-3.lottie","/favicon.ico","/favicon.svg","/fonts/Outfit-VariableFont_wght.ttf","/game/index.apple-touch-icon.png","/game/index.audio.position.worklet.js","/game/index.audio.worklet.js","/game/index.html","/game/index.icon.png","/game/index.js","/game/index.pck","/game/index.png","/game/index.wasm","/icons/AvoChoc_Logo_Short_Light.svg","/icons/Ellipsis.svg","/icons/Rectangle6.svg","/icons/arrow-progress.svg","/icons/arrow-right.svg","/icons/arrow-up-right-drk.svg","/icons/book-bookmark.svg","/icons/btn-arrow-up-right-light.svg","/icons/build-ai-page.svg","/icons/calendar_icon.svg","/icons/chevron-left-drk.svg","/icons/chevron-right-drk.svg","/icons/close_icon.svg","/icons/clover-ai-page.svg","/icons/computer.svg","/icons/envelope-light.svg","/icons/file.svg","/icons/filter_icon.svg","/icons/flower-ai-page.svg","/icons/globe.svg","/icons/globe_drk.svg","/icons/governance-ai-page.svg","/icons/grid_icon.svg","/icons/instagram.svg","/icons/linkedin.svg","/icons/location-dot.svg","/icons/location_marker_drk.svg","/icons/minus.svg","/icons/plus.svg","/icons/star-ai-page.svg","/icons/support-ai-page.svg","/icons/tiles_icon.svg","/images/AvoChoc-Map.svg","/images/AvoChoc-misc.webp","/images/Fractal_glass_navy_bg.webp","/images/Local-styles.svg","/images/backgrounds/cards/AvoCardBackground.webp","/images/backgrounds/cards/AvoMachineLearning.webp","/images/backgrounds/cards/AvoProductDev.webp","/images/backgrounds/cards/AvoSoftwareDev.webp","/images/backgrounds/cards/AvoSystemIntegration.webp","/images/backgrounds/cards/DeepDivers.webp","/images/backgrounds/cards/NoiseMakers.webp","/images/backgrounds/cards/ShapeShifters.webp","/images/backgrounds/cards/TheBuilders.webp","/images/backgrounds/cards/TheSceptics.webp","/images/backgrounds/cards/TheTranslators.webp","/images/backgrounds/cards/TrafficControllers.webp","/images/backgrounds/cards/backgroundgradient1.webp","/images/backgrounds/cards/backgroundgradient2.webp","/images/backgrounds/cards/backgroundgradient3.webp","/images/backgrounds/cards/cardbackground1.webp","/images/backgrounds/cards/cardbackground2.webp","/images/backgrounds/cards/cardbackground3.webp","/images/backgrounds/cards/sourcebackground.webp","/images/backgrounds/hero/blue-orbs-background.webp","/images/backgrounds/hero/fractal-glass.webp","/images/backgrounds/hero/hero_image.webp","/images/backgrounds/hero/hero_image2.webp","/images/backgrounds/hero/hero_image3.webp","/images/backgrounds/hero/hero_image4.webp","/images/backgrounds/hero/hero_image5.webp","/images/backgrounds/section/abstract_blue_circles.webp","/images/backgrounds/section/abstract_green_circles.webp","/images/backgrounds/section/avo-contact.webp","/images/backgrounds/section/avo-matters-background.webp","/images/backgrounds/section/background-orbs1.webp","/images/backgrounds/section/background-orbs2.webp","/images/backgrounds/section/backgroundOrbs2.jpg","/images/backgrounds/section/backgroundOrbs3.jpg","/images/backgrounds/section/backgroundOrbs4.webp","/images/backgrounds/section/footer_image.webp","/images/backgrounds/section/mobileBackground.webp","/images/backgrounds/section/world_map.svg","/images/content/caseStudies/CVO_ft_image.webp","/images/content/caseStudies/Coming_Soon_CTA.svg","/images/content/caseStudies/Elyvate_ft_image.webp","/images/content/caseStudies/GritCargo_ft_image.webp","/images/content/staff/Ceo_COO.webp","/images/content/staff/avo-avatars.png","/images/content/staff/avo_humans_first.webp","/images/content/staff/jaco-avatar.png","/images/content/staff/johan-avatar.png","/images/globel-trust.svg","/images/iso_badge.svg","/images/logos/AVOCHOC.svg","/images/logos/AvoChoc_Logo_Full.svg","/images/logos/Berylls_Logo.svg","/images/logos/Engen.svg","/images/logos/Firedart_Logo.svg","/images/logos/GRITCARGO.svg","/images/logos/LogoCards/BTCORP-logo-card.svg","/images/logos/LogoCards/Berylls-logo-card.svg","/images/logos/LogoCards/Elyvate-logo-card.svg","/images/logos/LogoCards/Engen-logo-card.svg","/images/logos/LogoCards/Firedart-logo-card.svg","/images/logos/LogoCards/Gritcargo-logo-card.svg","/images/logos/LogoCards/Spotify-logo-card.svg","/images/logos/LogoCards/Time2Read-logo-card.svg","/images/logos/T2R_LOGO.svg","/images/logos/elyvate_logo.svg","/images/logos/gritcargo_logo.svg","/images/visuals/Ai_Page _Honesty.svg","/images/visuals/Ai_Page.Readiness.svg","/images/visuals/Ai_Page_Discovery.svg","/images/visuals/ai_page_risk.svg","/videos/Hero-Vid.mp4"],"buildFormat":"directory","checkOrigin":false,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"kPHS0yTwRLENlNUmFXJBPT7RVtfzBSGfzfKf1MBB3Kg=","sessionConfig":{"driver":"unstorage/drivers/netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}},"image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./noop-entrypoint_CxXy0p4B.mjs"),
	middleware: () => import("../virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./_virtual_astro_session-driver_C7c7ma6M.mjs"),
	serverIslandMappings: () => import("./_virtual_astro_server-island-manifest_BhTW5IeR.mjs"),
	routes: manifestRoutes,
	pageMap
});
/**
* The ambient manifest: the explicitly registered one, else the virtual
* module's. Throws lazily when neither is available, so merely importing a
* module that uses this never fails — only actually handling a request does.
*/
function getAmbientManifest() {
	const manifest$1 = manifest;
	if (!manifest$1) throw new AstroError(NoManifestAvailable);
	return manifest$1;
}
// node_modules/astro/dist/core/app/render-options.js
/**
* Symbol used to attach `ResolvedRenderOptions` to a `Request` object so
* that they can flow through the `FetchHandler` signature (which only takes
* a request) into the request handler chain. This is an internal implementation
* detail between `BaseApp` and the default handler pipeline.
*/
var renderOptionsSymbol = Symbol.for("astro.renderOptions");
/**
* Reads `ResolvedRenderOptions` that were attached to a request via
* `renderOptionsSymbol`. Returns `undefined` if no options are attached.
*/
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
/**
* Attaches `ResolvedRenderOptions` to a request via `renderOptionsSymbol` so
* that downstream handlers can read them.
*/
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
// node_modules/astro/dist/core/app/origin-check.js
/**
* Content types that can be passed when sending a request via a form
*
* https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype
* @private
*/
var FORM_CONTENT_TYPES = [
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
];
var SAFE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
/**
* Determines whether a request should be rejected because it is a cross-site
* submission for a route rendered on demand.
*
* This encapsulates the shared logic used by both the origin-check middleware
* and the Astro Actions dispatch, so the check is applied consistently
* regardless of where the request is handled.
*
* @private
*/
function isForbiddenCrossOriginRequest(request, url, isPrerendered) {
	if (isPrerendered) return false;
	if (SAFE_METHODS.includes(request.method)) return false;
	const contentType = request.headers.get("content-type");
	if (contentType && !hasFormLikeHeader(contentType)) return false;
	switch (request.headers.get("sec-fetch-site")) {
		case "":
		case null: break;
		case "same-origin":
		case "none": return false;
		default: return true;
	}
	const origin = request.headers.get("origin");
	if (!origin) return false;
	return origin !== url.origin;
}
/**
* Builds the 403 response returned when a cross-site submission is rejected.
*
* @private
*/
function createCrossOriginForbiddenResponse(request) {
	return new Response(`Cross-site ${request.method} form submissions are forbidden`, { status: 403 });
}
/**
* Returns middleware that rejects cross-origin form submissions.
*
* @private
*/
function createOriginCheckMiddleware() {
	return defineMiddleware((context, next) => {
		const { request, url, isPrerendered } = context;
		if (isForbiddenCrossOriginRequest(request, url, isPrerendered)) return createCrossOriginForbiddenResponse(request);
		return next();
	});
}
function hasFormLikeHeader(contentType) {
	if (contentType) {
		for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) return true;
	}
	return false;
}
// node_modules/astro/dist/core/fetch/features.js
/**
* Bit flags for features that handler functions register as "used" when a
* custom `src/fetch.ts` fetch handler is in play. After the first request
* (dev) or at runtime (prod SSR), we compare against the manifest to warn
* about features the user configured but forgot to include in their custom
* fetch handler.
*/
var FetchFeatures = {
	redirects: 1,
	sessions: 2,
	actions: 4,
	middleware: 8,
	i18n: 16,
	cache: 32
};
/** All feature bits ORed together. Keep next to `FetchFeatures` so
*  new flags are hard to forget. */
var ALL_FETCH_FEATURES = FetchFeatures.redirects | FetchFeatures.sessions | FetchFeatures.actions | FetchFeatures.middleware | FetchFeatures.i18n | FetchFeatures.cache;
var usedFeatures = /* @__PURE__ */ new WeakMap();
/** ORs a feature bit into the manifest's used-features bitmask. */
function markFeatureUsed(manifest, feature) {
	const entry = usedFeatures.get(manifest);
	if (entry) entry.bits |= feature;
	else usedFeatures.set(manifest, { bits: feature });
}
/** The used-features bitmask for a manifest; `0` when nothing was marked. */
function getUsedFeatures(manifest) {
	return usedFeatures.get(manifest)?.bits ?? 0;
}
// node_modules/astro/dist/core/routing/invalid-encoding.js
/**
* Returns an empty `400 Bad Request` response when the request path was
* encoded too many times to fully decode, or is not valid percent-encoded
* UTF-8 (`state.invalidEncoding`), or `undefined` otherwise.
*
* Every entry point that routes the request or runs middleware calls this
* first, so composable pipelines reject the request the same way
* `handleRequest` does regardless of which handlers they include.
*/
function rejectInvalidEncoding(state) {
	if (state.invalidEncoding) return new Response(null, {
		status: 400,
		statusText: "Bad Request"
	});
}
// node_modules/astro/dist/actions/consts.js
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
// node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, { _: "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/.bin/astro" })?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
// node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
// node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	#logger;
	constructor(request, logger) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
		this.#logger = logger;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			stringifySetCookie({
				...options,
				name: key,
				value: DELETED_VALUE,
				expires: DELETED_EXPIRATION,
				maxAge: void 0
			}),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value !== void 0) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) this.#logger.warn("SKIP_FORMAT", "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const { encode, ...attributes } = options ?? {};
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			stringifySetCookie({
				...attributes,
				name: key,
				value: serializedValue
			}, { encode }),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = parseCookie(raw, { decode: identity });
	}
};
// node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
// node_modules/astro/dist/core/routing/pattern.js
function getPattern(segments, base, addTrailingSlash) {
	const pathname = segments.map((segment) => {
		if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
		else return "\\/" + segment.map((part) => {
			if (part.spread) return "(.*?)";
			else if (part.dynamic) return "([^/]+?)";
			else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}).join("");
	}).join("");
	const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
	let initial = "\\/";
	if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
	return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
	if (addTrailingSlash === "always") return "\\/$";
	if (addTrailingSlash === "never") return "$";
	return "\\/?$";
}
// node_modules/@astrojs/runtime/dist/internal/core/render/slots.js
function getFunctionExpression(slot) {
	if (!slot) return;
	const expressions = slot?.expressions?.filter((e) => isRenderInstruction(e) === false || isRenderTemplateResult(e));
	if (expressions?.length !== 1) return;
	const expression = expressions[0];
	if (isRenderTemplateResult(expression)) return getFunctionExpression(expression);
	return expression;
}
var Slots = class {
	#result;
	#slots;
	#logger;
	constructor(result, slots, logger) {
		this.#result = result;
		this.#slots = slots;
		this.#logger = logger;
		if (slots) for (const key of Object.keys(slots)) {
			if (this[key] !== void 0) throw new AstroError({
				...ReservedSlotName,
				message: ReservedSlotName.message(key)
			});
			Object.defineProperty(this, key, {
				get() {
					return true;
				},
				enumerable: true
			});
		}
	}
	has(name) {
		if (!this.#slots) return false;
		return Boolean(this.#slots[name]);
	}
	async render(name, args = []) {
		if (!this.#slots || !this.has(name)) return;
		const result = this.#result;
		if (!Array.isArray(args)) this.#logger.warn(null, `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
		else if (args.length > 0) {
			const slotValue = this.#slots[name];
			const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
			const expression = getFunctionExpression(component);
			if (expression) {
				const slot = async () => typeof expression === "function" ? expression(...args) : expression;
				return await renderSlotToString(result, slot).then((res) => {
					return res;
				});
			}
			if (typeof component === "function") return await renderJSX(result, component(...args)).then((res) => res != null ? String(res) : res);
		}
		const content = await renderSlotToString(result, this.#slots[name]);
		return chunkToString(result, content);
	}
};
// node_modules/astro/dist/core/csp/runtime.js
/**
* `existingDirective` is something like `img-src 'self'`. Same as `newDirective`.
*
* Returns `undefined` if no directive has been deduped
* @param existingDirective
* @param newDirective
*/
function deduplicateDirectiveValues(existingDirective, newDirective) {
	const [directiveName, ...existingValues] = existingDirective.split(/\s+/).filter(Boolean);
	const [newDirectiveName, ...newValues] = newDirective.split(/\s+/).filter(Boolean);
	if (directiveName !== newDirectiveName) return;
	return `${directiveName} ${Array.from(/* @__PURE__ */ new Set([...existingValues, ...newValues])).join(" ")}`;
}
function pushDirective(directives, newDirective) {
	if (directives.length === 0) return [newDirective];
	const finalDirectives = [];
	let matched = false;
	for (const directive of directives) {
		if (matched) {
			finalDirectives.push(directive);
			continue;
		}
		const result = deduplicateDirectiveValues(directive, newDirective);
		if (result) {
			finalDirectives.push(result);
			matched = true;
		} else finalDirectives.push(directive);
	}
	if (!matched) finalDirectives.push(newDirective);
	return finalDirectives;
}
// node_modules/astro/dist/i18n/fallback.js
/**
* Compute fallback route for failed responses.
* Pure function - no APIContext, no Response objects, no URL objects.
*
* This function determines whether a failed request should be redirected or rewritten
* to a fallback locale based on the i18n configuration.
*/
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const segments = pathname.split("/");
	const urlLocale = segments.find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const pathFallbackLocale = fallback[urlLocale];
	const localeIndex = segments.indexOf(urlLocale);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
		segments.splice(localeIndex, 1);
		newPathname = segments.join("/") || "/";
	} else {
		segments[localeIndex] = pathFallbackLocale;
		newPathname = segments.join("/");
	}
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
// node_modules/astro/dist/i18n/router.js
/**
* Router for i18n routing strategy decisions.
* Determines whether to continue, redirect, or return 404 based on pathname and locale.
*
* This is a pure class that returns decision objects (not HTTP Responses).
* The middleware layer is responsible for converting decisions to HTTP responses.
*/
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		for (const page of STATUS_CODE_PAGES) if (pathname.includes(page)) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
// node_modules/astro/dist/core/i18n/handler.js
/**
* Pure compile from explicit values — used by `astro:i18n`'s manual-mode
* middleware wrapper (`src/i18n/middleware.ts`), which receives the values as
* arguments rather than reading a manifest.
*/
function compileI18n(i18n, base, trailingSlash, format) {
	return {
		config: i18n,
		base,
		trailingSlash,
		format,
		router: new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		})
	};
}
var i18nMemo = createManifestMemo((manifest) => {
	const config = manifest.i18n;
	return config && config.strategy !== "manual" ? compileI18n(config, manifest.base, manifest.trailingSlash, manifest.buildFormat) : null;
});
/**
* The compiled i18n post-processor for a manifest, or `null` when i18n is
* unset or the routing strategy is `manual`.
*/
function getI18n(manifest) {
	return i18nMemo.get(manifest);
}
/**
* Post-processes a rendered `Response` against the compiled i18n
* configuration, as an explicit step in `handleRequest` after the middleware
* chain returns. The manual-strategy public API (`astro:i18n.middleware(...)`)
* wraps this in a middleware-shaped closure.
*/
async function finalizeI18n(compiled, state, response) {
	markFeatureUsed(state.manifest, FetchFeatures.i18n);
	const i18n = compiled.config;
	if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
	if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
	const url = state.url;
	const currentLocale = state.computeCurrentLocale();
	const routeData = state.routeData;
	const isPrerendered = routeData.prerender;
	const routerContext = {
		currentLocale,
		currentDomain: url.hostname,
		routeType: state.responseRouteType,
		isReroute: false,
		allowUnprefixedPath: routeData.origin === "external" && !routeData.segments?.[0]?.some((part) => part.dynamic)
	};
	const routeDecision = compiled.router.match(url.pathname, routerContext);
	switch (routeDecision.type) {
		case "redirect": {
			let location = routeDecision.location;
			if (shouldAppendForwardSlash(compiled.trailingSlash, compiled.format)) location = appendForwardSlash(location);
			return new Response(null, {
				status: routeDecision.status ?? 302,
				headers: { Location: location }
			});
		}
		case "notFound": {
			if (isPrerendered) {
				const prerenderedRes = new Response(response.body, {
					status: 404,
					headers: response.headers
				});
				state.skipErrorReroute = true;
				if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
				return prerenderedRes;
			}
			const headers = new Headers();
			if (routeDecision.location) headers.set("Location", routeDecision.location);
			return new Response(null, {
				status: 404,
				headers
			});
		}
	}
	if (i18n.fallback && i18n.fallbackType) {
		const effectiveStatus = isMissingLocalePage(state, routeData, response) ? 404 : response.status;
		const fallbackDecision = computeFallbackRoute({
			pathname: url.pathname,
			responseStatus: effectiveStatus,
			currentLocale,
			fallback: i18n.fallback,
			fallbackType: i18n.fallbackType,
			locales: i18n.locales,
			defaultLocale: i18n.defaultLocale,
			strategy: i18n.strategy,
			base: compiled.base
		});
		switch (fallbackDecision.type) {
			case "redirect": return new Response(null, {
				status: 302,
				headers: { Location: fallbackDecision.pathname + url.search }
			});
			case "rewrite": try {
				return await state.rewrite(fallbackDecision.pathname + url.search);
			} catch {
				break;
			}
		}
	}
	return response;
}
/**
* Whether the render pipeline signals that the page does not exist in the
* requested locale. Two signals exist:
*
* - the fallback sentinel (`X-Astro-Route-Type: fallback`, status 500) for
*   routes of type `fallback`;
* - an on-demand page reached through one of its `fallbackRoutes`, which
*   renders with the `302` that `getDefaultStatusCode` assigns to such
*   matches and no `Location` (#18473; the status stopped being consumed
*   in #15704). A page that took over the response (an explicit redirect or
*   status) is not a missing page and is served as is.
*/
function isMissingLocalePage(state, routeData, response) {
	if (state.responseRouteType === "fallback") return true;
	return isFallbackRouteMatch(routeData, state.pathname) && response.status === 302 && !response.headers.has("Location");
}
// node_modules/astro/dist/i18n/index.js
/**
* Returns an array of only locales, by picking the `code`
* @param locales
*/
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
// node_modules/astro/dist/i18n/utils.js
/**
* Parses the value of the `Accept-Language` header:
*
* More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
*
* Complex example: `fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5`
*
*/
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		const qa = a.locale === "*" ? a.qualityValue ?? 0 : a.qualityValue ?? 1;
		return (b.locale === "*" ? b.qualityValue ?? 0 : b.qualityValue ?? 1) - qa;
	});
}
/**
* Set the current locale by parsing the value passed from the `Accept-Header`.
*
* If multiple locales are present in the header, they are sorted by their quality value and the highest is selected as current locale.
*
*/
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(browserLocale.locale)) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
/**
* Check if any of the route's resolved param values match a configured locale.
* This handles dynamic routes like `[locale]` or `[...path]` where the locale
* isn't in a static segment of the route pathname.
*/
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
// node_modules/astro/dist/core/app/prepare-response.js
/**
* Appends cookies written via `Astro.cookie.set()` to the `Set-Cookie` header
* and marks the response as sent.
*
* This is a pure function with no dependencies on the app; it is shared by
* `handleRequest` and the various error handlers.
*/
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
// node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
/**
* Handles dispatch of a matched route (endpoint / redirect / page / fallback)
* at the bottom of the middleware chain. This is a pure dispatch layer — it
* renders whatever route the `FetchState` currently points to without any
* rewrite logic. Rewrites are handled upstream: `executeRewrite()` for
* `Astro.rewrite()` and `handleMiddleware` for `next(payload)`.
*
* `handlePages` is the `next` callback that `handleMiddleware` invokes at
* the end of the middleware chain. Error handlers and the container also
* use it directly for the same dispatch behavior.
*/
async function handlePages(state, ctx) {
	const { logger, streaming } = state;
	state.resetResponseMetadata();
	let response;
	const componentInstance = await state.loadComponentInstance();
	switch (state.routeData.type) {
		case "endpoint":
			response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
			break;
		case "page": {
			const props = await state.getProps();
			const actionApiContext = state.getActionAPIContext();
			const result = await state.createResult(componentInstance, actionApiContext);
			try {
				response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
			} catch (e) {
				result.cancelled = true;
				throw e;
			}
			state.responseRouteType = "page";
			if (isRoute404(state.routeData.route) || isRoute500(state.routeData.route)) state.skipErrorReroute = true;
			break;
		}
		case "redirect": return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		case "fallback":
			state.responseRouteType = "fallback";
			return new Response(null, { status: 500 });
	}
	const responseCookies = getCookiesFromResponse(response);
	if (responseCookies) state.cookies.merge(responseCookies);
	state.response = response;
	return response;
}
// node_modules/astro/dist/core/routing/match.js
/** Find matching route from pathname */
function matchRoute$1(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
/**
* Determines if the given route matches a 404 or 500 error page.
*
* @param {RouteData} route - The route data to check.
* @returns {boolean} `true` if the route matches a 404 or 500 error page; otherwise, `false`.
*/
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
/**
* Determines if a given route is associated with the server island component.
*
* @param {RouteData} route - The route data object to evaluate.
* @return {boolean} Returns true if the route's component is the server island component; otherwise, false.
*/
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
// node_modules/astro/dist/core/routing/astro-designed-error-pages.js
function ensure404Route(manifest) {
	if (!manifest.routes.some((route) => isRoute404(route.route))) manifest.routes.push(DEFAULT_404_ROUTE);
	return manifest;
}
// node_modules/astro/dist/core/routing/priority.js
/**
* Comparator for sorting routes in resolution order.
*
* The routes are sorted in by the following rules in order, following the first rule that
* applies:
* - More specific routes are sorted before less specific routes. Here, "specific" means
*   the number of segments in the route, so a parent route is always sorted after its children.
*   For example, `/foo/bar` is sorted before `/foo`.
*   Index routes, originating from a file named `index.astro`, are considered to have one more
*   segment than the URL they represent.
* - Static routes are sorted before dynamic routes.
*   For example, `/foo/bar` is sorted before `/foo/[bar]`.
* - Dynamic routes with single parameters are sorted before dynamic routes with rest parameters.
*   For example, `/foo/[bar]` is sorted before `/foo/[...bar]`.
* - Prerendered routes are sorted before non-prerendered routes.
* - Endpoints are sorted before pages.
*   For example, a file `/foo.ts` is sorted before `/bar.astro`.
* - If both routes are equal regarding all previous conditions, they are sorted alphabetically.
*   For example, `/bar` is sorted before `/foo`.
*   The definition of "alphabetically" is dependent on the default locale of the running system.
*/
function routeComparator(a, b) {
	const commonLength = Math.min(a.segments.length, b.segments.length);
	for (let index = 0; index < commonLength; index++) {
		const aSegment = a.segments[index];
		const bSegment = b.segments[index];
		const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
		const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
		if (aIsStatic && bIsStatic) {
			const aContent = aSegment.map((part) => part.content).join("");
			const bContent = bSegment.map((part) => part.content).join("");
			if (aContent !== bContent) return aContent.localeCompare(bContent);
		}
		if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
		const aAllDynamic = aSegment.every((part) => part.dynamic);
		if (aAllDynamic !== bSegment.every((part) => part.dynamic)) return aAllDynamic ? 1 : -1;
		const aHasSpread = aSegment.some((part) => part.spread);
		if (aHasSpread !== bSegment.some((part) => part.spread)) return aHasSpread ? 1 : -1;
	}
	const aLength = a.segments.length;
	const bLength = b.segments.length;
	if (aLength !== bLength) {
		const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
		const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
		if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
			if (aLength > bLength && aEndsInRest) return 1;
			if (bLength > aLength && bEndsInRest) return -1;
		}
		return aLength > bLength ? -1 : 1;
	}
	if (a.type === "endpoint" !== (b.type === "endpoint")) return a.type === "endpoint" ? -1 : 1;
	return a.route.localeCompare(b.route);
}
// node_modules/astro/dist/core/routing/router.js
/**
* Matches request pathnames against a route list with base and trailing slash rules.
*/
var Router = class {
	#routes;
	#base;
	#baseWithoutTrailingSlash;
	#buildFormat;
	#trailingSlash;
	constructor(routes, options) {
		this.#routes = [...routes].sort(routeComparator);
		this.#base = normalizeBase(options.base);
		this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
		this.#buildFormat = options.buildFormat;
		this.#trailingSlash = options.trailingSlash;
	}
	/**
	* Match an input pathname against the route list.
	* If allowWithoutBase is true, a non-base-prefixed path is still considered.
	*/
	match(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return {
			type: "redirect",
			location: normalized.redirect,
			status: 301
		};
		if (this.#base !== "/") {
			const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
			if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) return {
				type: "redirect",
				location: baseWithSlash,
				status: 301
			};
			if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) return {
				type: "redirect",
				location: this.#baseWithoutTrailingSlash,
				status: 301
			};
		}
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult) {
			if (!allowWithoutBase) return {
				type: "none",
				reason: "outside-base"
			};
		}
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		const route = this.#routes.find((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
		if (!route) return {
			type: "none",
			reason: "no-match"
		};
		return {
			type: "match",
			route,
			params: getParams(route, pathname),
			pathname
		};
	}
	/**
	* Returns all routes that match the given pathname, in priority order.
	* Used when the first match (e.g. a prerendered route) cannot serve
	* the request and subsequent matches need to be tried.
	*/
	matchAll(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return [];
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult && !allowWithoutBase) return [];
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		return this.#routes.filter((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
	}
};
/**
* Normalize a base path to a leading-slash form.
*/
function normalizeBase(base) {
	if (!base) return "/";
	if (base === "/") return base;
	return prependForwardSlash(base);
}
/**
* Provide a redirect target for pathnames that need correction.
* - Ensures a leading slash.
* - Collapses multiple leading slashes into a single slash redirect.
*/
function getRedirectForPathname(pathname) {
	let value = prependForwardSlash(pathname);
	if (value.startsWith("//")) return {
		pathname: value,
		redirect: `/${value.replace(/^\/+/, "")}`
	};
	return { pathname: value };
}
/**
* Strip the configured base from the pathname and account for trailing slash policies.
* Returns null if the pathname is outside the base or should be redirected elsewhere.
*/
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
	if (base === "/") return pathname;
	const baseWithSlash = `${baseWithoutTrailingSlash}/`;
	if (pathname === baseWithoutTrailingSlash || pathname === base) return trailingSlash === "always" ? null : "/";
	if (pathname === baseWithSlash) return trailingSlash === "never" ? null : "/";
	if (pathname.startsWith(baseWithSlash)) return pathname.slice(baseWithoutTrailingSlash.length);
	return null;
}
/**
* Normalize file-format pathnames by removing .html and /index.html suffixes.
*/
function normalizeFileFormatPathname(pathname) {
	if (pathname.endsWith("/index.html")) {
		const trimmed = pathname.slice(0, -11);
		return trimmed === "" ? "/" : trimmed;
	}
	if (pathname.endsWith(".html")) {
		const trimmed = pathname.slice(0, -5);
		return trimmed === "" ? "/" : trimmed;
	}
	return pathname;
}
// node_modules/astro/dist/core/routing/route-table.js
function compileRouteTable(manifest, routes) {
	const routesList = ensure404Route({ routes });
	const router = new Router(routesList.routes, {
		base: manifest.base,
		trailingSlash: manifest.trailingSlash,
		buildFormat: manifest.buildFormat
	});
	return {
		routes: routesList.routes,
		router
	};
}
var routeTables = createManifestMemo((manifest) => compileRouteTable(manifest, (manifest.routes ?? []).map((route) => route.routeData)));
/**
* The route table for a manifest: the derived route list (with the default
* 404 ensured) and the compiled router. All route reads — matching, rewrites,
* custom-404 fallbacks, `manifestData` accessors — go through this single
* entry so dev HMR updates are visible to every consumer at once.
*/
function getRouteTable(manifest) {
	return routeTables.get(manifest);
}
/**
* Atomically replaces the route table for a manifest (dev `astro:routes-updated`).
* Runs `ensure404Route` on the new list, compiles a fresh `Router`, and swaps
* the memo entry in one step, so no consumer can observe a half-updated table.
*/
function updateRouteTable(manifest, routes) {
	routeTables.set(manifest, compileRouteTable(manifest, [...routes]));
}
/**
* Low-level route matching against the manifest routes. Returns the matched
* `RouteData` or `undefined`. Does not filter prerendered routes or check
* public assets — use the app-level match for that.
*/
function matchRoute(manifest, pathname) {
	const match = getRouteTable(manifest).router.match(pathname, { allowWithoutBase: true });
	if (match.type !== "match") return void 0;
	return match.route;
}
/**
* Returns all routes matching the given pathname, in priority order. Used when
* the first match cannot serve the request (e.g. a prerendered dynamic route
* that doesn't cover this specific path) and the caller needs to try
* subsequent matches.
*/
function matchAllRoutes(manifest, pathname) {
	return getRouteTable(manifest).router.matchAll(pathname, { allowWithoutBase: true });
}
// node_modules/astro/dist/core/cache/provider.js
var cacheProviderMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.cacheProvider) {
		const factory = (await manifest.cacheProvider())?.default || null;
		return factory ? factory(manifest.cacheConfig?.options) : null;
	}
	return null;
});
/** Resolves the cache provider from the manifest, `null` when none. */
function getCacheProvider(manifest) {
	return cacheProviderMemo.get(manifest);
}
// node_modules/astro/dist/core/cache/runtime/utils.js
/**
* Generate default cache response headers from CacheOptions.
* Used when the provider doesn't supply its own `setHeaders()`.
*/
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
// node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = Symbol.for("astro:cache:apply");
var IS_ACTIVE = Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
		if (!response.headers.has("Cache-Control") && !response.headers.has("Expires") && (response.headers.has("Last-Modified") || response.headers.has("ETag"))) response.headers.set("Cache-Control", "no-cache");
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
/**
* Apply cache headers to a response.
*/
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
// node_modules/astro/dist/core/cache/runtime/noop.js
/**
* A no-op cache implementation used in dev mode when cache is configured.
* The API is available so user code doesn't need conditional checks,
* but nothing is actually cached.
*/
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
/**
* A no-op cache used when cache is not configured.
* Logs a warning on first use instead of throwing, so libraries
* can call cache methods without needing try/catch.
* `invalidate()` still throws since it implies the caller
* expects purging to actually work.
*/
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
// node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} — parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
// node_modules/astro/dist/core/cache/runtime/route-matching.js
/**
* Compile config-level cache route patterns into RegExps.
* The result is memoized on the pipeline — this function is only called once,
* on the first request that needs route matching.
* Returns compiled patterns sorted by Astro's standard route priority (most specific first).
*/
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
/**
* Called per-request to find the first matching cache rule for a given pathname.
*/
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
// node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
/**
* Registers a cache provider on the given `FetchState`. When
* `state.resolve('cache')` is first called, the appropriate cache
* implementation is created (disabled, noop for dev, or real).
*
* Returns synchronously when cache is not configured or in dev mode.
*/
function provideCache(state) {
	const manifest = state.manifest;
	if (!manifest.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(state.logger) });
		return;
	}
	if (getEnvironment(manifest).runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, manifest);
}
async function provideCacheAsync(state, manifest) {
	const cacheProvider = await getCacheProvider(manifest);
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (manifest.cacheConfig?.routes) {
			const matched = matchCacheRoute(state.pathname, getCompiledCacheRoutes(manifest));
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
/**
* Wraps a render callback with cache provider logic. Handles both
* runtime caching (onRequest) and CDN-based providers (headers only).
*
* - When a cache provider with `onRequest` is configured, the callback
*   is wrapped so the provider can serve from cache or fall through.
* - When only CDN headers are needed, the callback runs directly and
*   cache headers are applied to the response.
* - When no cache provider is configured, the callback runs as-is.
*
* Cache headers (`CDN-Cache-Control`, `Cache-Tag`) are stripped from
* the final response after the runtime provider has read them.
*/
async function handleCache(state, next) {
	markFeatureUsed(state.manifest, FetchFeatures.cache);
	if (!state.manifest.cacheProvider) return next();
	const cache = state.resolve(CACHE_KEY);
	const cacheProvider = await getCacheProvider(state.manifest);
	if (cacheProvider?.onRequest) {
		const response = await cacheProvider.onRequest({
			request: state.request,
			url: new URL(state.request.url),
			waitUntil: state.renderOptions.waitUntil,
			logger: {
				info(msg) {
					state.logger.info("cache", msg);
				},
				warn(msg) {
					state.logger.warn("cache", msg);
				},
				error(msg) {
					state.logger.error("cache", msg);
				}
			}
		}, async () => {
			const res = await next();
			applyCacheHeaders(cache, res, state.request);
			return res;
		});
		response.headers.delete("CDN-Cache-Control");
		response.headers.delete("Cache-Tag");
		return response;
	}
	const response = await next();
	applyCacheHeaders(cache, response, state.request);
	return response;
}
var compiledCacheRoutesMemo = createManifestMemo((manifest) => manifest.cacheConfig?.routes ? compileCacheRoutes(manifest.cacheConfig.routes, manifest.base, manifest.trailingSlash) : []);
/**
* Config-level cache routes compiled from `manifest.cacheConfig`, derived
* lazily on the first cache-seeded request.
*/
function getCompiledCacheRoutes(manifest) {
	return compiledCacheRoutesMemo.get(manifest);
}
// node_modules/astro/dist/core/session/driver.js
var sessionDriverMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.sessionDriver) return (await manifest.sessionDriver())?.default || null;
	return null;
});
/** Resolves the session driver factory from the manifest, `null` when none. */
function getSessionDriver(manifest) {
	return sessionDriverMemo.get(manifest);
}
// node_modules/astro/dist/core/session/runtime.js
var PERSIST_SYMBOL = Symbol();
var DEFAULT_COOKIE_NAME = "astro-session";
var VALID_COOKIE_REGEX = /^[\w-]+$/;
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
var unflatten = (parsed, _) => {
	return unflatten$1(parsed, { URL: (href) => new URL(href) });
};
var stringify = (data, _) => {
	return stringify$1(data, { URL: (val) => val instanceof URL && val.href });
};
var AstroSession = class AstroSession {
	#cookies;
	#config;
	#cookieConfig;
	#cookieName;
	#storage;
	#data;
	#sessionID;
	#toDestroy = /* @__PURE__ */ new Set();
	#toDelete = /* @__PURE__ */ new Set();
	#dirty = false;
	#cookieSet = false;
	#sessionIDFromCookie = false;
	#partial = true;
	#logger;
	#driverFactory;
	static #sharedStorage = /* @__PURE__ */ new Map();
	constructor({ cookies, config, runtimeMode, driverFactory, mockStorage, logger }) {
		this.#logger = logger;
		if (!config) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("No driver was defined in the session configuration and the adapter did not provide a default driver.")
		});
		this.#cookies = cookies;
		this.#driverFactory = driverFactory;
		const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
		let cookieConfigObject;
		if (typeof cookieConfig === "object") {
			const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
			this.#cookieName = name;
			cookieConfigObject = rest;
		} else this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
		this.#cookieConfig = {
			sameSite: "lax",
			secure: runtimeMode === "production",
			path: "/",
			...cookieConfigObject,
			httpOnly: true
		};
		this.#config = configRest;
		if (mockStorage) this.#storage = mockStorage;
	}
	/**
	* Gets a session value. Returns `undefined` if the session or value does not exist.
	*/
	async get(key) {
		return (await this.#ensureData()).get(key)?.data;
	}
	/**
	* Checks if a session value exists.
	*/
	async has(key) {
		return (await this.#ensureData()).has(key);
	}
	/**
	* Gets all session values.
	*/
	async keys() {
		return (await this.#ensureData()).keys();
	}
	/**
	* Gets all session values.
	*/
	async values() {
		return [...(await this.#ensureData()).values()].map((entry) => entry.data);
	}
	/**
	* Gets all session entries.
	*/
	async entries() {
		return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
	}
	/**
	* Deletes a session value.
	*/
	delete(key) {
		this.#data ??= /* @__PURE__ */ new Map();
		this.#data.delete(key);
		if (this.#partial) this.#toDelete.add(key);
		this.#dirty = true;
	}
	/**
	* Sets a session value. The session is created if it does not exist.
	*/
	set(key, value, { ttl } = {}) {
		if (!key) throw new AstroError({
			...SessionStorageSaveError,
			message: "The session key was not provided."
		});
		let cloned;
		try {
			cloned = unflatten(JSON.parse(stringify(value)));
		} catch (err) {
			throw new AstroError({
				...SessionStorageSaveError,
				message: `The session data for ${key} could not be serialized.`,
				hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
			}, { cause: err });
		}
		if (!this.#cookieSet) {
			this.#setCookie();
			this.#cookieSet = true;
		}
		this.#data ??= /* @__PURE__ */ new Map();
		const lifetime = ttl ?? this.#config.ttl;
		const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
		this.#data.set(key, {
			data: cloned,
			expires
		});
		this.#dirty = true;
	}
	/**
	* Destroys the session, clearing the cookie and storage if it exists.
	*/
	destroy() {
		const cookieValue = this.#cookies.get(this.#cookieName)?.value;
		const sessionId = this.#sessionID ?? (cookieValue && UUID_REGEX.test(cookieValue) ? cookieValue : void 0);
		if (sessionId) this.#toDestroy.add(sessionId);
		this.#cookies.delete(this.#cookieName, this.#cookieConfig);
		this.#sessionID = void 0;
		this.#data = void 0;
		this.#dirty = true;
	}
	/**
	* Regenerates the session, creating a new session ID. The existing session data is preserved.
	*/
	async regenerate() {
		let data = /* @__PURE__ */ new Map();
		try {
			data = await this.#ensureData();
		} catch (err) {
			this.#logger.error("session", `Failed to load session data during regeneration: ${err}`);
			this.#partial = false;
		}
		const oldSessionId = this.#sessionID;
		this.#sessionID = crypto.randomUUID();
		this.#sessionIDFromCookie = false;
		this.#data = data;
		this.#dirty = true;
		await this.#setCookie();
		if (oldSessionId && this.#storage) this.#storage.removeItem(oldSessionId).catch((err) => {
			this.#logger.error("session", `Failed to remove old session ${oldSessionId}: ${err}`);
		});
	}
	async [PERSIST_SYMBOL]() {
		if (!this.#dirty && !this.#toDestroy.size) return;
		const storage = await this.#ensureStorage();
		if (this.#dirty && this.#data) {
			const data = await this.#ensureData();
			this.#toDelete.forEach((key) => data.delete(key));
			const key = this.#ensureSessionID();
			let serialized;
			try {
				serialized = stringify(data);
			} catch (err) {
				throw new AstroError({
					...SessionStorageSaveError,
					message: SessionStorageSaveError.message("The session data could not be serialized.", this.#config.driver)
				}, { cause: err });
			}
			await storage.setItem(key, serialized);
			this.#dirty = false;
		}
		if (this.#toDestroy.size > 0) {
			const cleanupPromises = [...this.#toDestroy].map((sessionId) => storage.removeItem(sessionId).catch((err) => {
				this.#logger.error("session", `Failed to remove session ${sessionId}: ${err}`);
			}));
			await Promise.all(cleanupPromises);
			this.#toDestroy.clear();
		}
	}
	get sessionID() {
		return this.#sessionID;
	}
	/**
	* Loads a session from storage with the given ID, and replaces the current session.
	* Any changes made to the current session will be lost.
	* This is not normally needed, as the session is automatically loaded using the cookie.
	* However it can be used to restore a session where the ID has been recorded somewhere
	* else (e.g. in a database).
	*/
	async load(sessionID) {
		this.#sessionID = sessionID;
		this.#data = void 0;
		await this.#setCookie();
		await this.#ensureData();
	}
	/**
	* Sets the session cookie.
	*/
	async #setCookie() {
		if (!VALID_COOKIE_REGEX.test(this.#cookieName)) throw new AstroError({
			...SessionStorageSaveError,
			message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
		});
		const value = this.#ensureSessionID();
		this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
	}
	/**
	* Attempts to load the session data from storage, or creates a new data object if none exists.
	* If there is existing partial data, it will be merged into the new data object.
	*/
	async #ensureData() {
		if (this.#data && !this.#partial) return this.#data;
		this.#data ??= /* @__PURE__ */ new Map();
		if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
			this.#partial = false;
			return this.#data;
		}
		const raw = await (await this.#ensureStorage()).get(this.#ensureSessionID());
		if (!raw) {
			if (this.#sessionIDFromCookie) {
				this.#sessionID = crypto.randomUUID();
				this.#sessionIDFromCookie = false;
				if (this.#cookieSet) await this.#setCookie();
			}
			return this.#data;
		}
		try {
			const storedMap = unflatten(raw);
			if (!(storedMap instanceof Map)) {
				this.destroy();
				throw new AstroError({
					...SessionStorageInitError,
					message: SessionStorageInitError.message("The session data was an invalid type.", this.#config.driver)
				});
			}
			const now = Date.now();
			for (const [key, value] of storedMap) {
				const expired = typeof value.expires === "number" && value.expires < now;
				if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) this.#data.set(key, value);
			}
			this.#partial = false;
			return this.#data;
		} catch (err) {
			this.destroy();
			if (err instanceof AstroError) throw err;
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("The session data could not be parsed.", this.#config.driver)
			}, { cause: err });
		}
	}
	/**
	* Returns the session ID, generating a new one if it does not exist.
	*/
	#ensureSessionID() {
		if (!this.#sessionID) {
			const cookieValue = this.#cookies.get(this.#cookieName)?.value;
			if (cookieValue && UUID_REGEX.test(cookieValue)) {
				this.#sessionID = cookieValue;
				this.#sessionIDFromCookie = true;
			} else this.#sessionID = crypto.randomUUID();
		}
		return this.#sessionID;
	}
	/**
	* Ensures the storage is initialized.
	* This is called automatically when a storage operation is needed.
	*/
	async #ensureStorage() {
		if (this.#storage) return this.#storage;
		if (AstroSession.#sharedStorage.has(this.#config.driver)) {
			this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
			return this.#storage;
		}
		if (!this.#driverFactory) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("Astro could not load the driver correctly. Does it exist?", this.#config.driver)
		});
		const driver = this.#driverFactory;
		try {
			this.#storage = createStorage({ driver: {
				...driver(this.#config.options),
				hasItem() {
					return false;
				},
				getKeys() {
					return [];
				}
			} });
			AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
			return this.#storage;
		} catch (err) {
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("Unknown error", this.#config.driver)
			}, { cause: err });
		}
	}
};
// node_modules/astro/dist/core/session/handler.js
var SESSION_KEY = "session";
/**
* Registers a session provider on the given `FetchState`. When
* `state.resolve('session')` is first called, the `AstroSession` is
* created lazily. When `state.finalizeAll()` runs, any mutations are
* persisted.
*
* No-op (returns synchronously) if sessions are not configured on the
* manifest, avoiding promise allocation on the hot path.
*/
function provideSession(state) {
	markFeatureUsed(state.manifest, FetchFeatures.sessions);
	const config = state.manifest.sessionConfig;
	if (!config) return;
	return provideSessionAsync(state, config);
}
async function provideSessionAsync(state, config) {
	const driverFactory = await getSessionDriver(state.manifest);
	if (!driverFactory) return;
	state.provide(SESSION_KEY, {
		create() {
			return new AstroSession({
				cookies: state.cookies,
				config,
				runtimeMode: getEnvironment(state.manifest).runtimeMode,
				driverFactory,
				mockStorage: null,
				logger: state.logger
			});
		},
		finalize(session) {
			return session[PERSIST_SYMBOL]();
		}
	});
}
// node_modules/astro/dist/core/app/validate-headers.js
/**
* Parses a potentially comma-separated multi-value header (as produced by
* proxy chains) and returns the first value, trimmed of whitespace.
* Returns `undefined` when the header is absent or empty.
*/
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
/**
* A host is a hostname (DNS name or IPv4 address) with an optional port. Anything else,
* such as userinfo (`user@`), path, query or fragment characters, whitespace or
* percent-encoding, is not a valid `Host`/`X-Forwarded-Host` value.
*/
var HOST_RE = /^[\w-]+(?:\.[\w-]+)*(?::\d{1,5})?$/;
/**
* Returns the host only if it is a plain `hostname[:port]`, otherwise `undefined`.
*/
function sanitizeHost(host) {
	if (!host) return void 0;
	if (!HOST_RE.test(host)) return void 0;
	return host;
}
/**
* Parses a `Host`/`X-Forwarded-Host` value into its hostname and port. Returns
* `undefined` for anything that isn't a plain `hostname[:port]`.
*/
function parseHost(host) {
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const [hostname, port] = sanitized.split(":");
	const urlString = `http://${sanitized}`;
	if (!URL.canParse(urlString)) return void 0;
	const url = new URL(urlString);
	if (url.username !== "" || url.password !== "" || url.hostname !== hostname.toLowerCase()) return;
	return {
		host: sanitized,
		hostname: url.hostname,
		port
	};
}
var DEFAULT_PORTS = {
	http: "80",
	https: "443"
};
/**
* An entry without a `protocol` allows `http` and `https`. An entry with a `protocol`
* allows exactly that protocol.
*/
function allowsProtocol(entry, protocol) {
	if (entry.protocol === void 0) return protocol === "http" || protocol === "https";
	return entry.protocol === protocol.toLowerCase();
}
/**
* Whether a single entry allows this protocol, hostname and port together.
*
* - `port` is the port of the host (e.g. from `example.com:8080`). An entry without a `port`
*   allows any port. An entry with a `port` is compared against the port, or against the
*   protocol's default port when the host has none, so `port: '443'` matches `https://host`.
* - `forwardedPort` is the `X-Forwarded-Port` value. It is only allowed by an entry that
*   lists it explicitly.
*/
function matchesEntry(entry, protocol, host, forwardedPort) {
	if (!allowsProtocol(entry, protocol)) return false;
	if (!matchHostname({ hostname: host.hostname }, entry.hostname, true)) return false;
	if (forwardedPort !== void 0) return entry.port === forwardedPort;
	if (entry.port === void 0) return true;
	return entry.port === (host.port ?? DEFAULT_PORTS[protocol.toLowerCase()]);
}
function matchesAnyEntry(allowedDomains, protocol, host, forwardedPort) {
	return allowedDomains.some((entry) => matchesEntry(entry, protocol, host, forwardedPort));
}
/**
* Validate a host against allowedDomains.
* Returns the host only if it matches an allowed pattern; otherwise, undefined.
* This prevents SSRF attacks by ensuring the Host header is trusted.
*/
function validateHost(host, protocol, allowedDomains) {
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const parsed = parseHost(host);
	if (!parsed) return void 0;
	return matchesAnyEntry(allowedDomains, protocol, parsed) ? parsed.host : void 0;
}
/** A protocol value such as `https`, without the trailing colon. */
var PROTOCOL_RE = /^[a-z][a-z0-9+.-]*$/i;
/**
* Validate forwarded headers (proto, host, port) against allowedDomains.
*
* Protocol, host and port are validated together against each entry, never one at a time:
* - The forwarded host is accepted if an entry allows it with the forwarded protocol, or
*   with `fallback.protocol` (the protocol the server would otherwise use).
* - The forwarded protocol is accepted only if an entry for the host in use (the accepted
*   forwarded host, or else `fallback.host`) allows it. If no entry matches that host, the
*   forwarded protocol is not trusted.
* - The forwarded port is accepted only if the entry for the host in use lists it.
*
* Returns the values to apply. Values that aren't returned must not be applied.
*
* @param fallback What the server would use without forwarded headers: the protocol of the
*   connection or platform request, and the `Host` header or request URL host.
*/
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains, fallback) {
	if (!allowedDomains || allowedDomains.length === 0) return {};
	const protocol = forwardedProtocol && PROTOCOL_RE.test(forwardedProtocol) ? forwardedProtocol : void 0;
	const port = forwardedPort && /^\d{1,5}$/.test(forwardedPort) ? forwardedPort : void 0;
	const protocols = protocol ? [protocol, fallback.protocol] : [fallback.protocol];
	/**
	* Finds the first protocol that an entry allows for this host, and whether the forwarded
	* port is allowed with it. A forwarded port that isn't listed for the host is dropped
	* rather than rejecting the host.
	*/
	const resolve = (host, candidates) => {
		for (const candidate of candidates) {
			if (port !== void 0 && matchesAnyEntry(allowedDomains, candidate, host, port)) return {
				protocol: candidate,
				port
			};
			if (matchesAnyEntry(allowedDomains, candidate, host)) return {
				protocol: candidate,
				port: void 0
			};
		}
	};
	const result = {};
	const parsedForwardedHost = parseHost(forwardedHost);
	const forwardedMatch = parsedForwardedHost && resolve(parsedForwardedHost, protocols);
	if (parsedForwardedHost && forwardedMatch) {
		result.host = parsedForwardedHost.host;
		if (protocol !== void 0 && forwardedMatch.protocol === protocol) result.protocol = protocol;
		if (forwardedMatch.port !== void 0) result.port = forwardedMatch.port;
		return result;
	}
	const parsedFallbackHost = parseHost(fallback.host);
	const fallbackMatch = parsedFallbackHost && resolve(parsedFallbackHost, protocols);
	if (fallbackMatch) {
		if (protocol !== void 0 && fallbackMatch.protocol === protocol) result.protocol = protocol;
		if (fallbackMatch.port !== void 0) result.port = fallbackMatch.port;
	}
	return result;
}
// node_modules/astro/dist/core/output-filename.js
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
	return `${removeTrailingForwardSlash(name)}/index.html`;
}
// node_modules/astro/dist/core/errors/default-handler.js
/**
* The default error strategy used in production SSR. Attempts to render the
* matching error route (404.astro / 500.astro), falling back to a plain
* response with the given status. Handles prerendered error pages via
* `prerenderedErrorPageFetch`.
*/
async function renderDefaultError(manifest, request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const routeTable = getRouteTable(manifest);
	const errorRouteData = matchRoute$1(getErrorRoutePath(resolvedPathname, status, routeTable.routes, manifest.i18n?.locales, manifest.trailingSlash === "always"), routeTable);
	const url = new URL(request.url);
	if (errorRouteData) {
		if (errorRouteData.prerender) {
			const allowedDomains = manifest.allowedDomains;
			const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
			const statusURL = new URL(`${removeTrailingForwardSlash(manifest.base)}${getOutputFilename(manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
			if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
				const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
					status,
					removeContentEncodingHeaders: true
				});
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				const response = mergeResponses(new Response(null, { status }), originalResponse);
				prepareResponse(response, resolvedRenderOptions);
				return response;
			}
		}
		const mod = await getEnvironment(manifest).getComponentByRoute(manifest, errorRouteData);
		const errorState = new FetchState(manifest, request);
		errorState.skipMiddleware = skipMiddleware;
		errorState.clientAddress = resolvedRenderOptions.clientAddress;
		errorState.routeData = errorRouteData;
		errorState.pathname = resolvedPathname;
		errorState.status = status;
		errorState.componentInstance = mod;
		errorState.locals = resolvedRenderOptions.locals ?? {};
		errorState.initialProps = { error };
		try {
			await provideSession(errorState);
			await provideCache(errorState);
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, errorState.routeData, response)) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
			const newResponse = mergeResponses(response, originalResponse);
			prepareResponse(newResponse, resolvedRenderOptions);
			return newResponse;
		} catch {
			if (skipMiddleware === false) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
		} finally {
			await errorState.finalizeAll();
		}
	}
	const response = mergeResponses(new Response(null, { status }), originalResponse);
	prepareResponse(response, resolvedRenderOptions);
	return response;
}
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) {
		const lower = name.toLowerCase();
		if (!seen.has(lower) || lower === "set-cookie") newHeaders.append(name, value);
	}
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) originalCookies.merge(newCookies);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
// node_modules/astro/dist/core/errors/build-handler.js
/**
* The error strategy used during static build / prerendering.
*
* - For 500 errors, returns the original response if present, otherwise
*   throws so the build surfaces the underlying error to the developer.
* - For other errors (e.g. 404), delegates to `renderDefaultError` with
*   `prerenderedErrorPageFetch` cleared (the build pipeline can't fetch
*   prerendered pages the way production SSR can).
*/
async function renderBuildError(manifest, request, options) {
	if (options.status === 500) {
		if (options.response) return options.response;
		throw options.error;
	}
	return renderDefaultError(manifest, request, {
		...options,
		prerenderedErrorPageFetch: void 0
	});
}
// node_modules/astro/dist/core/errors/dev-handler.js
/**
* The dev-server error strategy. Renders custom 404/500 routes if the user
* has them, otherwise throws so Vite's dev overlay is shown. Shared between
* the Vite dev server and the non-runnable dev pipeline; only
* `shouldInjectCspMetaTags` differs between them (carried by the
* environment record's `injectCspMetaTagsOnErrorPages` static).
*/
async function renderDevError(manifest, request, { skipMiddleware = false, error, status, response: _response, pathname, ...resolvedRenderOptions }, { shouldInjectCspMetaTags }) {
	if (isAstroError(error) && [MiddlewareNoDataOrNextCalled.name, MiddlewareNotAResponse.name].includes(error.name)) throw error;
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const renderRoute = async (routeData) => {
		try {
			const preloadedComponent = await getEnvironment(manifest).getComponentByRoute(manifest, routeData);
			const errorState = new FetchState(manifest, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.shouldInjectCspMetaTags = shouldInjectCspMetaTags ? !!manifest.csp : false;
			errorState.routeData = routeData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = preloadedComponent;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			await provideCache(errorState);
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, routeData, errorState.routeData, response)) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				skipMiddleware: true,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			if (error) getLogger(manifest).error("router", error.stack || error.message);
			return response;
		} catch (_err) {
			if (skipMiddleware === false) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status: 500,
				skipMiddleware: true,
				error: _err,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			throw _err;
		}
	};
	if (status === 404) {
		const custom404 = getCustom404Route(getRouteTable(manifest));
		if (custom404) return renderRoute(custom404);
	}
	const custom500 = getCustom500Route(getRouteTable(manifest));
	if (!custom500) throw error;
	else return renderRoute(custom500);
}
// node_modules/astro/dist/core/errors/handler.js
/**
* Renders the error page (404.astro / 500.astro or a plain response) for a
* request, dispatching to the strategy the manifest's environment selects:
* production/container default, dev (overlay + custom error routes, with or
* without CSP meta-tag injection), or build (500s throw so the build fails).
*/
function renderErrorPage(manifest, request, options) {
	const env = getEnvironment(manifest);
	switch (env.errorStrategy) {
		case "dev": return renderDevError(manifest, request, options, { shouldInjectCspMetaTags: env.injectCspMetaTagsOnErrorPages });
		case "build": return renderBuildError(manifest, request, options);
		case "default": return renderDefaultError(manifest, request, options);
	}
}
/**
* Dispatches an internal error render for a request flowing through the
* handler chain: through the facade's late-bound `renderError` hook when the
* state was built by `BaseApp.render`'s fast path (preserving instance
* overrides/reassignments, e.g. cloudflare's prerender-error propagation),
* else through the environment's strategy via {@link renderErrorPage}.
*/
function renderErrorFromState(state, request, options) {
	if (state.renderError) return state.renderError(request, options);
	return renderErrorPage(state.manifest, request, options);
}
/**
* Whether a middleware rewrite (`ctx.rewrite()` / `next(payload)`) issued while
* rendering the error page dead-ended in another empty reroutable (404/500)
* response. The rewrite swaps the state's routeData away from the error route,
* so returning that render as-is would produce a blank page; the error handler
* should instead retry rendering the error page without middleware.
*
* @param skipMiddleware Whether middleware was already skipped for this render.
* @param errorRouteData The error route matched before middleware ran.
* @param renderedRouteData The route data on the state after middleware ran.
* @param response The response produced by the middleware-driven render.
*/
function rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, renderedRouteData, response) {
	return skipMiddleware === false && renderedRouteData !== errorRouteData && response.body === null && REROUTABLE_STATUS_CODES.includes(response.status);
}
// node_modules/astro/dist/core/middleware/callMiddleware.js
/**
* Utility function that is in charge of calling the middleware.
*
* It accepts a `R` generic, which usually is the `Response` returned.
* It is a generic because endpoints can return a different payload.
*
* When calling a middleware, we provide a `next` function, this function might or
* might not be called.
*
* A middleware, to behave correctly, can:
* - return a `Response`;
* - call `next`;
*
* Failing doing so will result an error. A middleware can call `next` and do not return a
* response. A middleware cannot call `next` and return a new `Response` from scratch (maybe with a redirect).
*
* ```js
* const onRequest = async (context, next) => {
*   const response = await next(context);
*   return response;
* }
* ```
*
* ```js
* const onRequest = async (context, next) => {
*   context.locals = "foo";
*   next();
* }
* ```
*
* @param onRequest The function called which accepts a `context` and a `resolve` function
* @param apiContext The API context
* @param responseFunction A callback function that should return a promise with the response
*/
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) {
			/**
			* Then we check if a value is returned. If so, we need to return the value returned by the
			* middleware.
			* e.g.
			* ```js
			* 	const response = await next();
			* 	const new Response(null, { status: 500, headers: response.headers });
			* ```
			*/
			if (typeof value !== "undefined") {
				if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
				return value;
			} else if (responseFunctionPromise) return responseFunctionPromise;
			else throw new AstroError(MiddlewareNotAResponse);
		} else if (typeof value === "undefined")
 /**
		* There might be cases where `next` isn't called and the middleware **must** return
		* something.
		*
		* If not thing is returned, then we raise an Astro error.
		*/
		throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
// node_modules/astro/dist/core/middleware/load.js
var resolvedMiddleware = /* @__PURE__ */ new WeakMap();
var middlewareMemo = createAsyncManifestMemo(async (manifest) => {
	let handler;
	if (manifest.middleware) {
		const internalMiddlewares = [(await manifest.middleware()).onRequest ?? NOOP_MIDDLEWARE_FN];
		if (manifest.checkOrigin) internalMiddlewares.unshift(createOriginCheckMiddleware());
		handler = sequence(...internalMiddlewares);
	} else handler = NOOP_MIDDLEWARE_FN;
	resolvedMiddleware.set(manifest, handler);
	return handler;
});
/**
* Resolves the middleware from the manifest and returns the `onRequest`
* function (prefixed with the origin-check middleware when configured). If
* `onRequest` isn't there, it returns a no-op function.
*/
function getMiddleware(manifest) {
	return middlewareMemo.get(manifest);
}
// node_modules/astro/dist/core/middleware/astro-middleware.js
/**
* Runs Astro's middleware chain (origin check + user `onRequest`) for a
* single render, reading the composed middleware from the manifest and
* per-request data (componentInstance, slots, props, API contexts) off the
* supplied `FetchState`. The actual route dispatch (endpoint / redirect /
* page / fallback) is supplied by the caller as `renderRouteCallback` —
* typically `handlePages`.
*/
async function handleMiddleware(state, renderRouteCallback) {
	markFeatureUsed(state.manifest, FetchFeatures.middleware);
	await state.getProps();
	const apiContext = state.getAPIContext();
	state.counter++;
	if (state.counter === 4) return new Response("Loop Detected", {
		status: 508,
		statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
	});
	const next = async (ctx, payload) => {
		if (payload) {
			state.logger.debug("router", "Called rewriting to:", payload);
			applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request));
		}
		return renderRouteCallback(state, ctx);
	};
	let response;
	if (state.skipMiddleware) response = await next(apiContext);
	else {
		const middleware = await getMiddleware(state.manifest);
		response = await callMiddleware(sequence(middleware), apiContext, next);
	}
	attachCookiesToResponse(response, state.cookies);
	state.response = response;
	return response;
}
// node_modules/astro/dist/core/util/normalized-url.js
/**
* Creates a normalized URL from a request URL string.
* Decodes and validates the pathname, collapses duplicate slashes.
*/
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
/**
* Assigns `url.pathname` only when the value differs.
* The setter re-parses the whole URL, so a no-op write is still expensive.
*/
function setPathname(url, pathname) {
	if (url.pathname !== pathname) url.pathname = pathname;
}
/**
* Normalizes an already-parsed URL in place: decodes and validates the
* pathname, collapses duplicate slashes. Returns the same URL object.
*
* Collapse runs after the decode is written back: the pathname setter
* rewrites `\` to `/`, so a decoded backslash only becomes `//` once assigned.
*/
function normalizeUrl(url) {
	try {
		setPathname(url, validateAndDecodePathname(url.pathname));
	} catch {
		try {
			setPathname(url, decodeURI(url.pathname));
		} catch {}
	}
	setPathname(url, collapseDuplicateSlashes(url.pathname));
	return url;
}
// node_modules/astro/dist/core/rewrites/handler.js
/**
* Validates and applies a rewrite target to the given `FetchState`.
*
* - Validates that SSR→prerender rewrites are not attempted (except
*   for i18n fallback routes).
* - Mutates `state` to reflect the new route: request, URL, cookies,
*   params, pathname, component instance, etc.
* - Invalidates cached API contexts so they're re-derived from the
*   new route.
*
* Called by both `executeRewrite()` (user-triggered `Astro.rewrite`)
* and `handleMiddleware` (middleware `next(payload)`).
*/
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (state.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, state.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request, state.logger);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, state.manifest.trailingSlash, state.manifest.buildFormat);
	state.invalidateContexts();
}
/**
* Executes a user-triggered rewrite (`Astro.rewrite(...)` /
* `ctx.rewrite(...)`) against a `FetchState`. Resolves the rewrite
* target via the environment's `tryRewrite`, validates it, mutates the
* `FetchState` to reflect the new route, and re-runs the middleware
* and page dispatch to produce the new response.
*/
async function executeRewrite(state, payload) {
	state.logger.debug("router", "Calling rewrite: ", payload);
	applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request), { mergeCookies: true });
	return handleMiddleware(state, handlePages);
}
// node_modules/astro/dist/core/i18n/domain.js
/**
* For domain-based i18n routing strategies, derives the locale-prefixed
* pathname from the request's `Host` header rather than its URL. For example,
* a request for `/foo` served from `https://example.fr` resolves to `/fr/foo`.
*
* Returns `undefined` when the strategy isn't domain-based or the host isn't
* mapped to a locale — in which case normal pathname routing applies.
*
*/
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, allowedDomains, logger, pathnameFromRequest) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		const requestHost = request.headers.get("Host") ?? void 0;
		const validated = validateForwardedHeaders(getFirstForwardedValue(request.headers.get("X-Forwarded-Proto") ?? void 0), getFirstForwardedValue(request.headers.get("X-Forwarded-Host") ?? void 0), getFirstForwardedValue(request.headers.get("X-Forwarded-Port") ?? void 0), allowedDomains, {
			protocol: url.protocol.slice(0, -1),
			host: requestHost ?? url.host
		});
		const protocol = validated.protocol ? `${validated.protocol}:` : url.protocol;
		const validatedRequestHost = allowedDomains?.length ? validateHost(requestHost, protocol.slice(0, -1), allowedDomains) : requestHost;
		const host = validated.host ?? validatedRequestHost;
		if (host && protocol) try {
			let locale;
			const hostAsUrl = new URL(`${protocol}//${host}`);
			if (hostAsUrl.username || hostAsUrl.password) return;
			hostAsUrl.port = "";
			for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
				const domainKeyAsUrl = new URL(domainKey);
				if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
					locale = localeValue;
					break;
				}
			}
			if (locale) {
				const requestPathname = pathnameFromRequest ?? stripRequestBase(url.pathname, base);
				pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), requestPathname));
				if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
				else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
				else if (url.pathname.endsWith("/")) pathname = appendForwardSlash(pathname);
			}
		} catch (e) {
			logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
			logger.error("router", `Error: ${e}`);
		}
	}
	return pathname;
}
// node_modules/astro/dist/core/manifest/derived.js
var sites = createManifestMemo((manifest) => manifest.site ? new URL(manifest.site) : void 0);
/** The manifest's `site` as a `URL` (used for `Astro.site`). */
function getSite(manifest) {
	return sites.get(manifest);
}
// node_modules/astro/dist/core/server-islands/mappings.js
/**
* The server-island mappings for a manifest. Deliberately NOT memoized: the
* manifest thunk is a module import, which is cheap.
*/
async function getServerIslands(manifest) {
	if (manifest.serverIslandMappings) return manifest.serverIslandMappings();
	return {
		serverIslandMap: /* @__PURE__ */ new Map(),
		serverIslandNameMap: /* @__PURE__ */ new Map()
	};
}
// node_modules/astro/dist/core/fetch/fetch-state.js
var slotValuesSymbol = Symbol("astro.slotValues");
/**
* Retrieves the `FetchState` stashed on an `APIContext` by
* `FetchState.getAPIContext()`. Throws if not found — this indicates
* the context was not created through Astro's request pipeline.
*/
function getFetchStateFromAPIContext(context) {
	const state = context[fetchStateSymbol];
	if (!state) throw new Error("FetchState not found on APIContext. This is an internal error — the context was not created through Astro's request pipeline.");
	return state;
}
/**
* External `<link href>` / `<script src>` entries are stored with empty
* `children`. Hashing that empty string puts the SHA of `''` in CSP and
* disables `'unsafe-inline'` for that directive.
*/
function isInlineCspHeadContent(element) {
	if (!element.children) return false;
	const props = element.props ?? {};
	return props.href == null && props.src == null;
}
/**
* Holds per-request state as it flows through the handler pipeline.
*
* **This class is user-facing** via `astro/fetch` and `astro/hono`.
* The {@link AstroFetchState} interface defines the stable public
* surface. Members not on that interface are internal and
* may change without notice.
*
* Performance note: fields on this class are plain properties — ES
* private fields (`#foo`) have a non-zero per-access cost in V8
* which is measurable on the hot render path, so `#` is used only
* for rarely-accessed memoized caches and Maps.
*/
var FetchState = class {
	/** The manifest — the single ambient source of static, build-time data. */
	manifest;
	/** The manifest's identity-stable logger, captured once at construction. */
	logger;
	/**
	* Whether page renders stream. From the facade hooks on the fast path,
	* else the environment's default.
	*/
	streaming;
	/**
	* Internal facade hook: late-bound `app.renderError` dispatch. Undefined on
	* bare and custom-handler paths — those fall through to the environment's
	* error strategy (`renderErrorPage`).
	*/
	renderError;
	/**
	* Internal facade hook: late-bound `app.logThisRequest` dispatch. Undefined
	* on bare and custom-handler paths — those fall through to the
	* environment's `logRequest` behavior.
	*/
	logRequest;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `handleRequest` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/** Explicitly assigned status; `undefined` until a caller sets one. */
	#status;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `handleRequest` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	* Reads `200` until assigned.
	*/
	get status() {
		return this.#status ?? 200;
	}
	set status(value) {
		this.#status = value;
	}
	/**
	* Sets `status` from the matched route (see `getDefaultStatusCode`)
	* unless a caller already assigned one.
	*/
	applyDefaultStatus() {
		if (this.#status === void 0 && this.routeData) this.#status = getDefaultStatusCode(this.manifest, this.routeData, this.pathname);
	}
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode, or is not valid percent-encoded UTF-8 (see
	* {@link validateAndDecodePathname}). These requests are rejected with a
	* `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(manifest, request, options, hooks) {
		this.manifest = manifest;
		this.logger = getLogger(manifest);
		this.streaming = hooks?.streaming ?? getEnvironment(manifest).defaultStreaming(manifest);
		this.renderError = hooks?.renderError;
		this.logRequest = hooks?.logRequest;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		const self = this;
		this.renderOptions = {
			...options ?? {
				addCookieHeader: false,
				clientAddress: void 0,
				prerenderedErrorPageFetch: fetch,
				routeData: void 0,
				waitUntil: void 0
			},
			get locals() {
				return self.locals;
			}
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const publicPathname = this.#normalizePathname(url.pathname);
		const pathname = this.#computePathname(publicPathname);
		setPathname(url, publicPathname);
		setPathname(url, collapseDuplicateSlashes(url.pathname));
		const domainPathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, manifest.allowedDomains, this.logger, pathname);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			this.pathname = domainPathname;
		} else this.pathname = pathname;
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = url;
		this.cookies = new AstroCookies(request, this.logger);
		if (manifest.allowedDomains && manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, manifest.trailingSlash, manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the rewrites handler module.
	*/
	rewrite(payload) {
		return executeRewrite(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const manifest = this.manifest;
		const env = getEnvironment(manifest);
		const { clientDirectives, inlinedScripts, compressHTML } = manifest;
		const renderers = env.getRenderers(manifest);
		const resolve = (specifier) => env.resolve(manifest, specifier);
		const routeData = this.routeData;
		const { links, scripts, styles } = await env.headElements(manifest, routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) {
				if (!isInlineCspHeadContent(style)) continue;
				extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			}
			for (const script of scripts) {
				if (!isInlineCspHeadContent(script)) continue;
				extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
			}
		}
		const componentMetadata = await env.componentMetadata(manifest, routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			logger: env.logsStreamErrors ? astroToRuntimeLogger(this.logger) : void 0,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await getServerIslands(manifest)).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				routeHasPropagation: false,
				pendingSlotEvaluations: [],
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			scriptDirective: {
				resources: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.resources] : [],
				hashes: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.hashes] : [],
				strictDynamic: manifest.csp?.scriptDirective?.strictDynamic ?? false
			},
			styleDirective: {
				resources: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.resources] : [],
				hashes: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.hashes] : []
			},
			speculationRulesContent: manifest.csp?.speculationRulesContent,
			importMapContent: manifest.csp?.importMapContent,
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const Astro = Object.assign(Object.create(astroPagePartial), {
			props,
			self: null
		});
		Object.defineProperty(Astro, slotValuesSymbol, {
			value: slotValues,
			writable: true,
			configurable: true,
			enumerable: false
		});
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, logger, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get slots() {
				const slotsByAstro = result._metadata.slotsByAstro ??= /* @__PURE__ */ new WeakMap();
				let slots = slotsByAstro.get(this);
				if (slots === void 0) {
					slots = new Slots(result, this[slotValuesSymbol] ?? null, logger);
					slotsByAstro.set(this, slots);
				}
				return slots;
			},
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: getSite(this.manifest),
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(logger);
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (this.manifest.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(this.manifest.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		if (!this.manifest.csp) {
			if (getEnvironment(this.manifest).runtimeMode === "production") this.logger.warn("csp", `context.csp was used when rendering the route ${colors.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		const warnedFallback = /* @__PURE__ */ new Set();
		const warnFallback = (family, kind) => {
			if (kind === "default" || !state.result) return;
			const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
			if (defaultResources.length === 0) return;
			const key = `${family}:${kind}`;
			if (warnedFallback.has(key)) return;
			warnedFallback.add(key);
			const general = `${family}-src`;
			const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
			state.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
		};
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(payload) {
				if (!state.result) return;
				warnFallback("script", normalizeCspResourceEntry(payload).kind);
				state.result.scriptDirective.resources.push(payload);
			},
			insertStyleResource(payload) {
				if (!state.result) return;
				warnFallback("style", normalizeCspResourceEntry(payload).kind);
				state.result.styleDirective.resources.push(payload);
			},
			insertStyleHash(payload) {
				state.result?.styleDirective.hashes.push(payload);
			},
			insertScriptHash(payload) {
				state.result?.scriptDirective.hashes.push(payload);
			}
		};
	}
	computeCurrentLocale() {
		const { url, manifest: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = getEnvironment(this.manifest).getComponentByRoute(this.manifest, this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) {
			const original = this.pathname;
			this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
			if (this.manifest.trailingSlash === "always" && this.pathname !== "" && !this.pathname.endsWith("/")) this.pathname += "/";
			if (this.pathname !== original && this.routeData.pattern.test(original) && !this.routeData.pattern.test(this.pathname)) this.pathname = original;
		}
	}
	#resolveRouteData() {
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = matchRoute(this.manifest, this.pathname);
		if (matched && matched.prerender && this.manifest.serverLike) {
			if (matched.params.length > 0) {
				const allMatches = matchAllRoutes(this.manifest, this.pathname);
				this.routeData = allMatches.find((r) => !r.prerender);
			} else this.routeData = void 0;
		} else this.routeData = matched;
		this.logger.debug("router", "Astro matched the following route for " + this.request.url);
		this.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(getRouteTable(this.manifest));
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			this.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			this.logger.debug("router", "Here's the available routes:\n", getRouteTable(this.manifest));
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the manifest's base from a normalized request pathname and prepends
	* a forward slash.
	*
	* Mirrors `BaseApp.removeBase`: the router matches against this stripped path
	* while middleware reads the un-stripped `context.url.pathname`, so both must
	* strip the base identically.
	*/
	#computePathname(normalizedPathname) {
		return prependForwardSlash(stripRequestBase(normalizedPathname, this.manifest.base));
	}
	/**
	* Decodes and normalizes the public request pathname before deriving the
	* separate pathname used for route matching.
	*/
	#normalizePathname(pathname) {
		try {
			pathname = validateAndDecodePathname(pathname);
		} catch {
			this.invalidEncoding = true;
		}
		return collapseDuplicateSlashes(pathname);
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-port") ?? void 0), allowedDomains, {
			protocol: this.url.protocol.slice(0, -1),
			host: this.url.host
		});
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const forwardedUrl = new URL(`${this.url.protocol}//${validated.host}`);
			this.url.hostname = forwardedUrl.hostname;
			this.url.port = forwardedUrl.port;
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		this.request = new Request(this.url, this.request);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: getRouteCache(this.manifest),
			pathname: this.pathname,
			logger: this.logger,
			serverLike: this.manifest.serverLike,
			base: this.manifest.base,
			trailingSlash: this.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: getSite(this.manifest),
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(state.logger);
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Called before `getProps()` has resolved, the context carries
	* `props: null` and is not memoized; the next call after `getProps()`
	* fills in `props` on the same object. Callers that read `props`
	* must await `getProps()` first.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		actionApiContext[fetchStateSymbol] = this;
		const apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		if (this.props !== null) this.apiContext = apiContext;
		return apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
// node_modules/@astrojs/internal-helpers/dist/object.js
/**
* Keys that must be rejected when traversing object paths (e.g. dot-separated
* property lookups) to prevent prototype-pollution attacks.
*/
var FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
// node_modules/astro/dist/actions/noop-actions.js
var NOOP_ACTIONS_MOD = { server: {} };
// node_modules/astro/dist/actions/load.js
var actionsMemo = createAsyncManifestMemo(async (manifest) => manifest.actions ? await manifest.actions() : NOOP_ACTIONS_MOD);
/** Resolves the actions module from the manifest (a no-op module when none). */
function getActions(manifest) {
	return actionsMemo.get(manifest);
}
/** Looks up a single action handler by its dot-separated path. */
async function getAction(manifest, path) {
	const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
	let { server } = await getActions(manifest);
	if (!server || !(typeof server === "object")) throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof server}.`);
	for (const key of pathKeys) {
		if (typeof server === "function") throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (FORBIDDEN_PATH_KEYS.has(key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (!Object.hasOwn(server, key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		server = server[key];
	}
	if (typeof server !== "function") throw new TypeError(`Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`);
	return server;
}
// node_modules/astro/dist/actions/runtime/server.js
/**
* Access information about Action requests from middleware.
*/
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const { manifest } = getFetchStateFromAPIContext(context);
			const callerInfoName = shouldAppendForwardSlash(manifest.trailingSlash, manifest.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await getAction(manifest, callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				if (error instanceof URIError) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				if (e instanceof SyntaxError) return {
					data: void 0,
					error: new ActionError({
						code: "BAD_REQUEST",
						message: "Invalid JSON request body"
					})
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, { _: "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/.bin/astro" })?.DEV) actionResultErrorStack.set(res.error.stack);
		let body;
		if (res.error instanceof ActionInputError) body = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify$1(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
// node_modules/astro/dist/actions/handler.js
/**
* Handles Astro Action requests in both modes:
*
* - **RPC**: POST requests to `/_actions/<name>` (originating from the
*   generated JS client). Runs the action and returns the serialized result
*   as the response, so the caller can short-circuit rendering.
* - **Form**: POST requests with `?_action=<name>` targeting a page route
*   (originating from an HTML `<form action={actions.foo}>`). Runs the
*   action, stashes the result into `locals._actionPayload`, and returns
*   `undefined` so the caller continues to render the page.
*
* Non-action requests are a no-op (`undefined`).
*
* This handler is invoked at the bottom of the middleware chain, before
* page dispatch. That placement preserves the existing behavior where
* user middleware sees action requests and response finalization (cookies,
* sessions, etc.) runs around the action response.
*
* Expects the APIContext that is already being used by the render pipeline.
* Returns a `Response` when the action fully handles the request (RPC),
* or `undefined` when the caller should continue processing the request
* (form actions or non-action requests).
*/
function handleAction(apiContext, state) {
	markFeatureUsed(state.manifest, FetchFeatures.actions);
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return Promise.resolve(invalidEncodingResponse);
	if (apiContext.isPrerendered) return;
	const { action, setActionResult } = getActionContext(apiContext);
	if (!action) return;
	if (state.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
	return executeAction(action, setActionResult);
}
async function executeAction(action, setActionResult) {
	const serialized = serializeActionResult(await action.handler());
	if (action.calledFrom === "rpc") {
		if (serialized.type === "empty") return new Response(null, { status: serialized.status });
		return new Response(serialized.body, {
			status: serialized.status,
			headers: { "Content-Type": serialized.contentType }
		});
	}
	setActionResult(action.name, serialized);
}
// node_modules/astro/dist/core/routing/3xx.js
/**
* Generates a minimal HTML redirect page used for SSR redirects.
*/
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
// node_modules/astro/dist/core/routing/trailing-slash-handler.js
/**
* Handles trailing-slash normalization for incoming requests. If the
* request's pathname does not match the manifest's configured
* `trailingSlash` policy, a redirect `Response` is returned. Otherwise,
* returns `undefined` so the caller can continue processing the request.
* Paths encoded too many times to decode get a 400 instead of a redirect.
*/
function handleTrailingSlash(state) {
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return invalidEncodingResponse;
	const url = new URL(state.request.url);
	const redirect = redirectTrailingSlash(state.manifest.trailingSlash, url.pathname);
	if (redirect === url.pathname) return;
	const addCookieHeader = state.renderOptions.addCookieHeader;
	const status = state.request.method === "GET" ? 301 : 308;
	const location = redirect + url.search;
	const response = new Response(redirectTemplate({
		status,
		relativeLocation: location,
		absoluteLocation: location,
		from: state.request.url
	}), {
		status,
		headers: { location }
	});
	prepareResponse(response, { addCookieHeader });
	return response;
}
function redirectTrailingSlash(trailingSlash, pathname) {
	if (pathname === "/" || isInternalPath(pathname)) return pathname;
	const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
	if (path !== pathname) return path;
	if (trailingSlash === "ignore") return pathname;
	if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
	if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
	return pathname;
}
// node_modules/astro/dist/core/errors/not-found.js
/**
* Renders the 404 error page when no route matched the request, or returns
* `undefined` when a route matched. Returns an empty `400` when the request
* path is over-encoded.
*
* `FetchState` only falls back to an SSR `404.astro`, so this renders a
* prerendered (or absent) custom 404 page: through
* `renderOptions.prerenderedErrorPageFetch` in production, or by rendering
* the page source in dev.
*/
function handleNotFound(state) {
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return Promise.resolve(invalidEncodingResponse);
	if (state.routeData) return;
	return renderErrorFromState(state, state.request, {
		...state.renderOptions,
		status: 404,
		pathname: state.pathname
	});
}
// node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
/**
* Computes the HTTP status code for a redirect response.
*
* - If the route has a `redirectRoute` and an explicit numeric status, that status is used.
* - Otherwise: GET → 301, non-GET (e.g. POST) → 308.
*/
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
/**
* Resolves the final redirect target URL by substituting dynamic params into
* the redirect string (e.g. `/[slug]/page` → `/hello/page`).
*
* When `redirectRoute` is provided its route generator is used; otherwise params
* are substituted manually into the string redirect target.
*/
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") {
		if (redirectIsExternal(redirect)) return redirect;
		else {
			let target = redirect;
			for (const param of Object.keys(params)) {
				const paramValue = params[param];
				target = target.replace(`[${param}]`, () => paramValue).replace(`[...${param}]`, () => paramValue);
			}
			return target;
		}
	} else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	markFeatureUsed(state.manifest, FetchFeatures.redirects);
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) {
		if (typeof redirect === "string") return Response.redirect(redirect, status);
		else return Response.redirect(redirect.destination, status);
	}
	return new Response(null, {
		status,
		headers
	});
}
// node_modules/astro/dist/core/routing/redirect-page.js
/** The delay Astro's built-in redirect page uses for `status`. */
function redirectDelayFor(status) {
	return status === 302 ? 2 : 0;
}
/**
* Renders the project's `src/pages/3xx.astro` as the body of a redirect,
* returning its HTML.
*
* Returns `undefined` when the project has no `3xx.astro`, or when rendering it
* fails — the caller falls back to Astro's built-in redirect page so a broken
* custom page degrades to a working redirect instead of failing the build.
*
* Middleware is skipped: it already ran for the request that produced the
* redirect, and re-running it around a template render would let a middleware
* that redirects recurse.
*/
async function renderRedirectPage(manifest, request, props) {
	const route = getRouteTable(manifest).routes.find((candidate) => isRoute3xx(candidate.route));
	if (!route) return;
	const state = new FetchState(manifest, request);
	try {
		state.skipMiddleware = true;
		state.routeData = route;
		state.pathname = route.route;
		state.status = 200;
		state.componentInstance = await getEnvironment(manifest).getComponentByRoute(manifest, route);
		state.initialProps = { ...props };
		return await (await handleMiddleware(state, handlePages)).text();
	} catch (err) {
		state.logger.error("redirects", `Failed to render \`src/pages/3xx.astro\` for the redirect from \`${props.from}\` to \`${props.to}\`. Falling back to the built-in redirect page.\n${err instanceof Error ? err.stack ?? err.message : String(err)}`);
		return;
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			state.logger.error("redirects", `Failed to finalize the \`src/pages/3xx.astro\` render for the redirect from \`${props.from}\` to \`${props.to}\`.\n${err instanceof Error ? err.stack ?? err.message : String(err)}`);
		}
	}
}
// node_modules/astro/dist/core/routing/handler.js
/**
* Dispatches request logging: through the facade's late-bound
* `logThisRequest` hook when the state was built by `BaseApp.render`'s fast
* path (preserving subclass overrides), else through the environment's
* `logRequest` behavior (dev request lines; prod/build/container no-op).
*/
function logRequestFromState(state, payload) {
	if (state.logRequest) state.logRequest(payload);
	else getEnvironment(state.manifest).logRequest(state.manifest, payload);
}
/**
* Runs actions then pages — the callback at the bottom of the middleware
* chain. A module-level function so passing it by reference costs zero
* per-request allocation.
*/
function actionsAndPages(state, ctx) {
	if (!state.skipMiddleware) {
		const actionResult = handleAction(ctx, state);
		if (actionResult) return actionResult.then((response) => response ?? handlePages(state, ctx));
	}
	return handlePages(state, ctx);
}
/**
* Swaps a bodiless redirect response for one carrying the project's rendered
* `src/pages/3xx.astro`.
*
* Only the build environment opts in (see `RenderEnvironment.rendersRedirectPage`):
* a static site has no `Location` header to follow, so the HTML body is the
* redirect. Responses that already carry a body — the trailing-slash
* normalizer's, or a page that rendered its own — are left alone.
*/
async function withRedirectPageBody(state, response) {
	const status = response.status;
	if (status < 300 || status >= 400 || response.body !== null) return response;
	if (!getEnvironment(state.manifest).rendersRedirectPage()) return response;
	const to = response.headers.get("location");
	if (!to) return response;
	const html = await renderRedirectPage(state.manifest, state.request, {
		from: state.pathname,
		to,
		status,
		delay: redirectDelayFor(status)
	});
	if (html === void 0) return response;
	const headers = new Headers(response.headers);
	if (!headers.has("content-type")) headers.set("content-type", "text/html");
	return new Response(html, {
		status,
		statusText: response.statusText,
		headers
	});
}
/**
* The composite "batteries-included" handler that wires up every request
* feature internally; `astro(state)` (astro/fetch) delegates here, as does
* `BaseApp.render`'s default-handler fast path.
*/
async function handleRequest(state) {
	await getResolvedLogger(state.manifest);
	markFeatureUsed(state.manifest, ALL_FETCH_FEATURES);
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return invalidEncodingResponse;
	const trailingSlashRedirect = handleTrailingSlash(state);
	if (trailingSlashRedirect) return trailingSlashRedirect;
	const notFoundResponse = handleNotFound(state);
	if (notFoundResponse) return notFoundResponse;
	return render(state);
}
/**
* Renders a response for the given `FetchState`. Assumes trailing-slash
* redirects and routeData resolution have already run.
*
* User-triggered rewrites (`Astro.rewrite` / `ctx.rewrite`) go through
* `executeRewrite` on the current `FetchState` — they mutate the existing
* state in place and re-run middleware + page dispatch.
*/
async function render(state) {
	const routeData = state.routeData;
	const pathname = state.pathname;
	const request = state.request;
	const { addCookieHeader } = state.renderOptions;
	state.status = getDefaultStatusCode(state.manifest, routeData, pathname);
	let response;
	let finalizeError;
	try {
		const sessionP = state.manifest.sessionConfig ? provideSession(state) : void 0;
		const cacheP = provideCache(state);
		if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
		markFeatureUsed(state.manifest, FetchFeatures.sessions);
		if (routeData.type === "redirect") {
			const redirectResponse = await withRedirectPageBody(state, await renderRedirect(state));
			logRequestFromState(state, {
				pathname,
				method: request.method,
				statusCode: redirectResponse.status,
				isRewrite: false,
				timeStart: state.timeStart
			});
			prepareResponse(redirectResponse, { addCookieHeader });
			state.logger.flush();
			return redirectResponse;
		}
		const i18n = getI18n(state.manifest);
		if (!state.manifest.cacheProvider) {
			markFeatureUsed(state.manifest, FetchFeatures.cache);
			response = await handleMiddleware(state, actionsAndPages);
			if (i18n) response = await finalizeI18n(i18n, state, response);
		} else {
			const runPipeline = async () => {
				let res = await handleMiddleware(state, actionsAndPages);
				if (i18n) res = await finalizeI18n(i18n, state, res);
				return res;
			};
			response = await handleCache(state, runPipeline);
		}
		logRequestFromState(state, {
			pathname,
			method: request.method,
			statusCode: response.status,
			isRewrite: state.isRewriting,
			timeStart: state.timeStart
		});
	} catch (err) {
		state.logger.error(null, err.stack || err.message || String(err));
		return renderErrorFromState(state, request, {
			...state.renderOptions,
			status: 500,
			error: err,
			pathname: state.pathname
		});
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			finalizeError = err;
			state.logger.error(null, err.stack || err.message || String(err));
		}
	}
	if (finalizeError) return renderErrorFromState(state, request, {
		...state.renderOptions,
		status: 500,
		error: finalizeError,
		pathname: state.pathname
	});
	if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return renderErrorFromState(state, request, {
		...state.renderOptions,
		response,
		status: response.status,
		error: response.status === 500 ? null : void 0,
		pathname: state.pathname
	});
	response = await withRedirectPageBody(state, response);
	prepareResponse(response, { addCookieHeader });
	state.logger.flush();
	return response;
}
// node_modules/astro/dist/core/fetch/default-handler.js
/**
* The default request handler for `BaseApp`. Stateless: builds the
* per-request `FetchState` from the manifest and delegates to
* `handleRequest`.
*
* The export path (`astro/app/fetch/default-handler`), the class name, and
* no-arg constructibility are baked into generated builds
* (`core/fetch/vite-plugin.ts` emits `new DefaultFetchHandler()`), so all
* three survive.
*/
var DefaultFetchHandler = class {
	#manifest;
	/**
	* `BaseApp` passes itself so states resolve that app's manifest ahead of
	* the ambient one; generated builds construct the handler with no
	* arguments and use the ambient manifest.
	*/
	constructor(app) {
		this.#manifest = app?.manifest;
	}
	fetch = (request) => {
		const options = getRenderOptions(request);
		return handleRequest(new FetchState(this.#manifest ?? getAmbientManifest(), request, options));
	};
};
// node_modules/astro/dist/core/routing/match-request.js
/**
* Fully decodes a pathname, falling back to a single decode and then the raw pathname
* when validation fails. Matching runs before `render()`, so it must not throw for
* request input that render-time validation handles.
*/
function safeDecodePathname(manifest, pathname) {
	try {
		return validateAndDecodePathname(pathname);
	} catch (e) {
		new AstroIntegrationLogger(getLogger(manifest).options, manifest.adapterName).debug(e.toString());
		try {
			return decodeURI(pathname);
		} catch {
			return pathname;
		}
	}
}
/**
* Given a `Request`, returns the `RouteData` that matches its pathname — the
* appless, purely functional body of `BaseApp.match()`. By default, prerendered
* routes aren't returned, even if they are matched; when
* `allowPrerenderedRoutes` is `true`, matched prerendered routes are returned
* too.
*/
function matchRequest(manifest, request, allowPrerenderedRoutes = false) {
	const url = new URL(request.url);
	if (manifest.assets.has(url.pathname)) return void 0;
	let pathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, manifest.allowedDomains, getLogger(manifest));
	if (!pathname) pathname = prependForwardSlash(stripRequestBase(url.pathname, manifest.base));
	pathname = safeDecodePathname(manifest, pathname);
	const routeData = matchRoute(manifest, pathname);
	if (!routeData) return void 0;
	if (allowPrerenderedRoutes) return routeData;
	if (routeData.prerender) {
		if (routeData.params.length > 0) return matchAllRoutes(manifest, pathname).find((r) => !r.prerender);
		return;
	}
	return routeData;
}
// node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The streaming flag passed to the constructor, surfaced through the
	* protected `resolveStreaming()` hook and fed into the internal
	* `FetchState` facade hooks on the fast path.
	*/
	#streaming;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return getLogger(this.manifest);
	}
	/**
	* Route data derived from the manifest, used for route matching. Reads and
	* writes go through the single per-manifest route table, so HMR updates are
	* visible to every consumer at once.
	*/
	get manifestData() {
		return getRouteTable(this.manifest);
	}
	set manifestData(routesList) {
		updateRouteTable(this.manifest, routesList.routes);
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.#streaming = streaming;
		getRouteTable(manifest);
		getLogger(manifest);
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Resolves the user-configured logger destination from the manifest and
	* returns the logger. Lazy and only resolves once; safe to call before
	* the first render (adapters use this to log startup messages through
	* the configured destination).
	*/
	getLogger() {
		return getResolvedLogger(this.manifest);
	}
	/**
	* The streaming flag fed into the internal `FetchState` facade hooks on
	* the fast path. Returns the constructor flag by
	* default; `BuildApp` overrides this to return `undefined` so streaming
	* falls through to the environment default (`manifest.serverLike`).
	*/
	resolveStreaming() {
		return this.#streaming;
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler used by this app. The default is a thin
	* bridge over the functional error API — strategy selection (production
	* default / dev / build) is environment-driven inside `renderErrorPage`.
	* External subclasses can override this to customize error rendering.
	*/
	createErrorHandler() {
		return { renderError: (request, options) => renderErrorPage(this.manifest, request, options) };
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		return validateHost(forwardedHost, protocol || "https", allowedDomains) !== void 0;
	}
	set setManifestData(newManifestData) {
		updateRouteTable(this.manifest, newManifestData.routes);
	}
	removeBase(pathname) {
		return stripRequestBase(pathname, this.manifest.base);
	}
	/**
	* Fully decodes a pathname, falling back to a single decode and then the raw pathname
	* when validation fails. Adapter matching runs before `render()`, so it must not throw
	* for request input that render-time validation handles.
	*/
	safeDecodePathname(pathname) {
		try {
			return validateAndDecodePathname(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			try {
				return decodeURI(pathname);
			} catch {
				return pathname;
			}
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodePathname(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		return matchRequest(this.manifest, request, allowPrerenderedRoutes);
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.manifest.allowedDomains, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await getResolvedLogger(this.manifest);
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = matchRoute(this.manifest, this.safeDecodePathname(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) response = await handleRequest(new FetchState(this.manifest, request, resolvedOptions, {
			streaming: this.resolveStreaming(),
			renderError: (req, opts) => this.renderError(req, opts),
			logRequest: (payload) => this.logThisRequest(payload)
		}));
		else {
			setRenderOptions(request, resolvedOptions);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = getUsedFeatures(this.manifest);
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & FetchFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & FetchFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & FetchFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & FetchFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & FetchFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & FetchFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless your fetch handler calls it.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		return getDefaultStatusCode(this.manifest, routeData, pathname);
	}
	getManifest() {
		return this.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
// node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
	isDev() {
		return false;
	}
	logRequest(_options) {}
};
export { DefaultFetchHandler as n, manifest as r, App as t };
