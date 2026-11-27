// node_modules/emdash/dist/oauth-state-store-V4y2qZwD.mjs
/**
* Choose the env object OAuth provider credentials are read from.
*
* A non-null `platformEnv` is the Cloudflare Workers env and is returned
* unchanged. Otherwise the runtime env is used. `buildEnv` fills gaps only
* in dev: Vite inlines `import.meta.env`, so spreading it in a production
* server bundle bakes build-machine secrets in and shadows credentials
* configured on the host. See `readDefaultEnv` in `config/secrets.ts`.
*/
function resolveOAuthEnv(platformEnv, runtimeEnv, buildEnv, dev) {
	if (platformEnv != null) return platformEnv;
	return dev ? {
		...buildEnv,
		...runtimeEnv
	} : { ...runtimeEnv };
}
/**
* Read OAuth credentials for the current adapter.
*
* `virtual:emdash/env` is the Worker env on Cloudflare and `undefined` on
* Node. Production reads `process.env` only. Build-time `import.meta.env`
* is a dev fallback for values `astro dev` loaded from `.env`.
*/
async function getOAuthEnv() {
	const { env: platformEnv } = await import("./env_D4nDvOOj.mjs");
	return resolveOAuthEnv(platformEnv, typeof process !== "undefined" ? process.env : void 0, Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": void 0,
		"SSR": true
	}, { _: "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/.bin/astro" }).DEV ? Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": void 0,
		"SSR": true
	}, { _: "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/.bin/astro" }) : {}, Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": void 0,
		"SSR": true
	}, { _: "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/.bin/astro" }).DEV);
}
var OAUTH_STATE_TTL_MS = 6e5;
function createOAuthStateStore(db) {
	return {
		async set(state, data) {
			const expiresAt = new Date(Date.now() + OAUTH_STATE_TTL_MS).toISOString();
			await db.insertInto("auth_challenges").values({
				challenge: state,
				type: "oauth",
				user_id: null,
				data: JSON.stringify(data),
				expires_at: expiresAt
			}).onConflict((oc) => oc.column("challenge").doUpdateSet({
				type: "oauth",
				data: JSON.stringify(data),
				expires_at: expiresAt
			})).execute();
		},
		async get(state) {
			const row = await db.selectFrom("auth_challenges").selectAll().where("challenge", "=", state).where("type", "=", "oauth").executeTakeFirst();
			if (!row) return null;
			if (new Date(row.expires_at).getTime() < Date.now()) {
				await this.delete(state);
				return null;
			}
			if (!row.data) return null;
			try {
				const parsed = JSON.parse(row.data);
				if (typeof parsed !== "object" || parsed === null || !("provider" in parsed) || typeof parsed.provider !== "string" || !("redirectUri" in parsed) || typeof parsed.redirectUri !== "string") return null;
				const oauthState = {
					provider: parsed.provider,
					redirectUri: parsed.redirectUri
				};
				if ("codeVerifier" in parsed && typeof parsed.codeVerifier === "string") oauthState.codeVerifier = parsed.codeVerifier;
				if ("nonce" in parsed && typeof parsed.nonce === "string") oauthState.nonce = parsed.nonce;
				if ("inviteToken" in parsed && typeof parsed.inviteToken === "string") oauthState.inviteToken = parsed.inviteToken;
				return oauthState;
			} catch {
				return null;
			}
		},
		async delete(state) {
			await db.deleteFrom("auth_challenges").where("challenge", "=", state).where("type", "=", "oauth").execute();
		}
	};
}
export { getOAuthEnv as n, createOAuthStateStore as t };
