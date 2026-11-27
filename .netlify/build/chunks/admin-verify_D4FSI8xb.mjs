import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { x as setupAdminVerifyBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { n as validateAllowedOrigins, t as getConfiguredAllowedOrigins } from "./allowed-origins-CUNAP6hl_CuHnds46.mjs";
import { t as getSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { n as createChallengeStore } from "./challenge-store-B0PoBBqW_BxsHW0tI.mjs";
import { r as sessionUnavailableError } from "./session-user-BrCPLyWB_B1TZCa32.mjs";
import { t as startUserSession } from "./start-user-session-CdyNie0P_D3BXuQ7j.mjs";
import { t as createFirstAdmin } from "./setup-complete-DQ1nNEjm_DuuSuIf3.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D9iYgt4G_CqIEyCDq.mjs";
import { t as SETUP_NONCE_COOKIE } from "./setup-nonce-5k8BY3W__nU-eH01-.mjs";
import "./dist__l0ohBBn.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
import { _ as secureCompare, g as registerPasskey, v as verifyRegistrationResponse } from "./passkey_BrGsIm4_.mjs";
// node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs
var admin_verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ cookies, request, locals, session }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!session) return sessionUnavailableError();
	try {
		const options = new OptionsRepository(emdash.db);
		const setupComplete = await options.get("emdash:setup_complete");
		const isComplete = setupComplete === true || setupComplete === "true";
		const adapter = createKyselyAdapter(emdash.db);
		if (await adapter.countUsers() > 0) {
			if (isComplete) return apiError("SETUP_COMPLETE", "Setup already complete", 400);
			return apiError("ADMIN_EXISTS", "Admin user already exists", 400);
		}
		const setupState = await options.get("emdash:setup_state");
		if (!setupState || setupState.step !== "admin") return apiError("INVALID_STATE", "Invalid setup state. Please restart setup.", 400);
		const cookieNonce = cookies.get(SETUP_NONCE_COOKIE)?.value;
		if (!setupState.nonce || !cookieNonce || !secureCompare(cookieNonce, setupState.nonce)) return apiError("INVALID_STATE", "Setup session expired or tampered with. Please restart the admin step.", 400);
		if (!setupState.email) return apiError("INVALID_STATE", "Invalid setup state. Please restart setup.", 400);
		const body = await parseBody(request, setupAdminVerifyBody);
		if (isParseError(body)) return body;
		const url = new URL(request.url);
		const siteName = await getSiteTitle(options);
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl, validateAllowedOrigins(siteUrl, getConfiguredAllowedOrigins(emdash?.config)));
		const challengeStore = createChallengeStore(emdash.db);
		const verified = await verifyRegistrationResponse(passkeyConfig, body.credential, challengeStore);
		const user = await createFirstAdmin(emdash.db, {
			email: setupState.email,
			name: setupState.name ?? null
		});
		if (!user) return apiError("ADMIN_EXISTS", "Admin user already exists", 400);
		await registerPasskey(adapter, user.id, verified, "Setup passkey");
		await options.set("emdash:setup_complete", true);
		await startUserSession(emdash.db, session, user.id);
		await options.delete("emdash:setup_state");
		cookies.delete(SETUP_NONCE_COOKIE, { path: "/_emdash/" });
		return apiSuccess({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role
			}
		});
	} catch (error) {
		return handleError(error, "Failed to verify admin setup", "SETUP_VERIFY_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin-verify@_@mjs
var page = () => admin_verify_exports;
export { page };
