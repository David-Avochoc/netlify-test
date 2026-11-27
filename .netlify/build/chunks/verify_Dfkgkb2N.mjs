import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as apiSuccess, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { m as passkeyRegisterVerifyBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { n as validateAllowedOrigins, t as getConfiguredAllowedOrigins } from "./allowed-origins-CUNAP6hl_CuHnds46.mjs";
import { t as getSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { n as createChallengeStore } from "./challenge-store-B0PoBBqW_BxsHW0tI.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D9iYgt4G_CqIEyCDq.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
import { g as registerPasskey, v as verifyRegistrationResponse } from "./passkey_BrGsIm4_.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var MAX_PASSKEYS = 10;
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	try {
		const adapter = createKyselyAdapter(emdash.db);
		if (await adapter.countCredentialsByUserId(user.id) >= MAX_PASSKEYS) return apiError("PASSKEY_LIMIT", `Maximum of ${MAX_PASSKEYS} passkeys allowed`, 400);
		const body = await parseBody(request, passkeyRegisterVerifyBody);
		if (isParseError(body)) return body;
		const url = new URL(request.url);
		const optionsRepo = new OptionsRepository(emdash.db);
		const siteName = await getSiteTitle(optionsRepo);
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl, validateAllowedOrigins(siteUrl, getConfiguredAllowedOrigins(emdash?.config)));
		const challengeStore = createChallengeStore(emdash.db);
		const verified = await verifyRegistrationResponse(passkeyConfig, body.credential, challengeStore);
		let passKeyName = body.name ?? void 0;
		if (!passKeyName) {
			const pending = await optionsRepo.get(`emdash:passkey_pending:${user.id}`);
			if (pending?.name) passKeyName = pending.name;
		}
		await optionsRepo.delete(`emdash:passkey_pending:${user.id}`);
		const credential = await registerPasskey(adapter, user.id, verified, passKeyName);
		return apiSuccess({ passkey: {
			id: credential.id,
			name: credential.name,
			deviceType: credential.deviceType,
			backedUp: credential.backedUp,
			createdAt: credential.createdAt.toISOString(),
			lastUsedAt: credential.lastUsedAt.toISOString()
		} });
	} catch (error) {
		console.error("Passkey registration verify error:", error);
		const message = error instanceof Error ? error.message : "";
		if (message.includes("credential_exists") || message.includes("already")) return apiError("CREDENTIAL_EXISTS", "This passkey is already registered", 400);
		if (message.includes("challenge") || message.includes("expired")) return apiError("CHALLENGE_EXPIRED", "Registration expired. Please try again.", 400);
		return apiError("PASSKEY_REGISTER_ERROR", "Registration failed", 500);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify@_@mjs
var page = () => verify_exports;
export { page };
