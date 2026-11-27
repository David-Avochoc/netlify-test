import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { i as VALID_SCOPES } from "./passkey_BrGsIm4_.mjs";
import { t as config_default } from "./config_B1NN09mD.mjs";
// node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs
var oauth_protected_resource_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const origin = getPublicOrigin(url, locals.emdash?.config ?? config_default);
	return Response.json({
		resource: `${origin}/_emdash/api/mcp`,
		authorization_servers: [`${origin}/_emdash`],
		scopes_supported: [...VALID_SCOPES],
		bearer_methods_supported: ["header"]
	}, { headers: {
		"Cache-Control": "public, max-age=3600",
		"Access-Control-Allow-Origin": "*"
	} });
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource@_@mjs
var page = () => oauth_protected_resource_exports;
export { page };
