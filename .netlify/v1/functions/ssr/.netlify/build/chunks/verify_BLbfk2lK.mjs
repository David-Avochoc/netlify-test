import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { g as passkeyVerifyBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { n as validateAllowedOrigins, t as getConfiguredAllowedOrigins } from "./allowed-origins-CUNAP6hl_CuHnds46.mjs";
import { t as getSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { n as createChallengeStore } from "./challenge-store-B0PoBBqW_BxsHW0tI.mjs";
import { r as sessionUnavailableError } from "./session-user-BrCPLyWB_B1TZCa32.mjs";
import { t as startUserSession } from "./start-user-session-CdyNie0P_D3BXuQ7j.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D9iYgt4G_CqIEyCDq.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
import { a as authenticateWithPasskey, t as PasskeyAuthenticationError } from "./passkey_BrGsIm4_.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals, session }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!session) return sessionUnavailableError();
	try {
		const body = await parseBody(request, passkeyVerifyBody);
		if (isParseError(body)) return body;
		const url = new URL(request.url);
		const siteName = await getSiteTitle(new OptionsRepository(emdash.db));
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl, validateAllowedOrigins(siteUrl, getConfiguredAllowedOrigins(emdash?.config)));
		const adapter = createKyselyAdapter(emdash.db);
		const challengeStore = createChallengeStore(emdash.db);
		const user = await authenticateWithPasskey(passkeyConfig, adapter, body.credential, challengeStore);
		await startUserSession(emdash.db, session, user.id);
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
		if (error instanceof PasskeyAuthenticationError) return apiError("UNAUTHORIZED", "Authentication failed", 401);
		return handleError(error, "Authentication failed", "PASSKEY_VERIFY_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/verify@_@mjs
var page = () => verify_exports;
export { page };
