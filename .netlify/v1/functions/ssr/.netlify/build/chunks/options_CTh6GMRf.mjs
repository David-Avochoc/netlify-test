import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { p as passkeyRegisterOptionsBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { t as getSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { n as createChallengeStore } from "./challenge-store-B0PoBBqW_BxsHW0tI.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D9iYgt4G_CqIEyCDq.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
import { l as generateRegistrationOptions } from "./passkey_BrGsIm4_.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs
var options_exports = /* @__PURE__ */ __exportAll({
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
		const body = await parseOptionalBody(request, passkeyRegisterOptionsBody, {});
		if (isParseError(body)) return body;
		const existingCredentials = await adapter.getCredentialsByUserId(user.id);
		const url = new URL(request.url);
		const optionsRepo = new OptionsRepository(emdash.db);
		const passkeyConfig = getPasskeyConfig(url, await getSiteTitle(optionsRepo), getPublicOrigin(url, emdash?.config));
		const challengeStore = createChallengeStore(emdash.db);
		const registrationOptions = await generateRegistrationOptions(passkeyConfig, {
			id: user.id,
			email: user.email,
			name: user.name
		}, existingCredentials, challengeStore);
		if (body.name) await optionsRepo.set(`emdash:passkey_pending:${user.id}`, { name: body.name });
		return apiSuccess({ options: registrationOptions });
	} catch (error) {
		return handleError(error, "Failed to generate registration options", "PASSKEY_REGISTER_OPTIONS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options@_@mjs
var page = () => options_exports;
export { page };
