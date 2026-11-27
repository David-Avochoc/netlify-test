import { n as DefaultFetchHandler, r as manifest, t as App } from "./chunks/app_DCG0fQMI.mjs";
// \0virtual:astro:fetchable
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
// node_modules/astro/dist/core/app/entrypoints/virtual/prod.js
var createApp$1 = ({ streaming } = {}) => {
	const app = new App(manifest, streaming);
	app.setFetchHandler(_virtual_astro_fetchable_default);
	return app;
};
var app = createApp$1();
function createHandler({ notFoundContent }) {
	return async function handler(request, context) {
		const routeData = app.match(request);
		if (!routeData && typeof notFoundContent !== "undefined") return new Response(notFoundContent, {
			status: 404,
			headers: { "Content-Type": "text/html; charset=utf-8" }
		});
		let locals = {};
		const astroLocalsHeader = request.headers.get("x-astro-locals");
		const middlewareSecretHeader = request.headers.get("x-astro-middleware-secret");
		if (astroLocalsHeader) {
			if (middlewareSecretHeader !== "859bea59-317c-49e9-a2fb-fb911e9e0acd") return new Response("Forbidden", { status: 403 });
			request.headers.delete("x-astro-middleware-secret");
			locals = JSON.parse(astroLocalsHeader);
		}
		locals.netlify = { context };
		const response = await app.render(request, {
			routeData,
			locals,
			clientAddress: context.ip
		});
		if (app.setCookieHeaders) for (const setCookieHeader of app.setCookieHeaders(response)) response.headers.append("Set-Cookie", setCookieHeader);
		return response;
	};
}
export { createHandler };
