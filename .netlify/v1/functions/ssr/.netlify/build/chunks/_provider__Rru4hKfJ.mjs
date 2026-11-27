import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as getOAuthEnv, t as createOAuthStateStore } from "./oauth-state-store-V4y2qZwD_C2J4NRGQ.mjs";
import { g as isValidMicrosoftTenant, u as createAuthorizationUrl } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs
var _provider__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var VALID_PROVIDERS = /* @__PURE__ */ new Set([
	"github",
	"google",
	"microsoft"
]);
/** Invite tokens are base64url; clamp shape and length before persisting to state. */
var INVITE_TOKEN_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
function isValidProvider(provider) {
	return VALID_PROVIDERS.has(provider);
}
/** Safely extract a string value from an env-like record */
function envString(env, ...keys) {
	for (const key of keys) {
		const val = env[key];
		if (typeof val === "string" && val) return val;
	}
}
/**
* Get OAuth config from environment variables
*/
function getOAuthConfig(env) {
	const providers = {};
	const githubClientId = envString(env, "EMDASH_OAUTH_GITHUB_CLIENT_ID", "GITHUB_CLIENT_ID");
	const githubClientSecret = envString(env, "EMDASH_OAUTH_GITHUB_CLIENT_SECRET", "GITHUB_CLIENT_SECRET");
	if (githubClientId && githubClientSecret) providers.github = {
		clientId: githubClientId,
		clientSecret: githubClientSecret
	};
	const googleClientId = envString(env, "EMDASH_OAUTH_GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_ID");
	const googleClientSecret = envString(env, "EMDASH_OAUTH_GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_SECRET");
	if (googleClientId && googleClientSecret) providers.google = {
		clientId: googleClientId,
		clientSecret: googleClientSecret
	};
	const microsoftClientId = envString(env, "EMDASH_OAUTH_MICROSOFT_CLIENT_ID", "MICROSOFT_CLIENT_ID");
	const microsoftClientSecret = envString(env, "EMDASH_OAUTH_MICROSOFT_CLIENT_SECRET", "MICROSOFT_CLIENT_SECRET");
	const microsoftTenant = envString(env, "EMDASH_OAUTH_MICROSOFT_TENANT_ID", "MICROSOFT_TENANT_ID");
	if (microsoftClientId && microsoftClientSecret && microsoftTenant && isValidMicrosoftTenant(microsoftTenant)) providers.microsoft = {
		clientId: microsoftClientId,
		clientSecret: microsoftClientSecret,
		tenant: microsoftTenant
	};
	return providers;
}
var GET = async ({ params, request, locals, redirect }) => {
	const { emdash } = locals;
	const provider = params.provider;
	const errorRedirectBase = (request.headers.get("referer") ?? "").includes("/setup") ? "/_emdash/admin/setup" : "/_emdash/admin/login";
	if (!provider || !isValidProvider(provider)) return redirect(`${errorRedirectBase}?error=invalid_provider&message=${encodeURIComponent("Invalid OAuth provider")}`);
	if (!emdash?.db) return redirect(`${errorRedirectBase}?error=server_error&message=${encodeURIComponent("Database not configured")}`);
	try {
		const url = new URL(request.url);
		const providers = getOAuthConfig(await getOAuthEnv());
		if (!providers[provider]) {
			const tenantHint = provider === "microsoft" ? " Microsoft also needs EMDASH_OAUTH_MICROSOFT_TENANT_ID or MICROSOFT_TENANT_ID: a directory (tenant) ID, or common, organizations or consumers." : "";
			return redirect(`${errorRedirectBase}?error=provider_not_configured&message=${encodeURIComponent(`OAuth provider ${provider} is not configured. Set either EMDASH_OAUTH_${provider.toUpperCase()}_CLIENT_ID and EMDASH_OAUTH_${provider.toUpperCase()}_CLIENT_SECRET, or ${provider.toUpperCase()}_CLIENT_ID and ${provider.toUpperCase()}_CLIENT_SECRET.${tenantHint}`)}`);
		}
		const config = {
			baseUrl: `${getPublicOrigin(url, emdash?.config)}/_emdash`,
			providers
		};
		const stateStore = createOAuthStateStore(emdash.db);
		const rawInvite = url.searchParams.get("invite");
		const { url: authUrl } = await createAuthorizationUrl(config, provider, stateStore, { inviteToken: rawInvite && INVITE_TOKEN_REGEX.test(rawInvite) ? rawInvite : void 0 });
		return redirect(authUrl);
	} catch (error) {
		console.error("OAuth initiation error:", error);
		return redirect(`${errorRedirectBase}?error=oauth_error&message=${encodeURIComponent("Failed to start OAuth flow. Please try again.")}`);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_@_@mjs
var page = () => _provider__exports;
export { page };
