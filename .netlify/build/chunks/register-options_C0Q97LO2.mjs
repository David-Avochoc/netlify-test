import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { l as inviteRegisterOptionsBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { t as getSiteTitle } from "./site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { n as createChallengeStore } from "./challenge-store-B0PoBBqW_BxsHW0tI.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D9iYgt4G_CqIEyCDq.mjs";
import { ulid } from "ulidx";
import { t as InviteError, y as validateInvite } from "./dist__l0ohBBn.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
import { l as generateRegistrationOptions } from "./passkey_BrGsIm4_.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs
var register_options_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, inviteRegisterOptionsBody);
		if (isParseError(body)) return body;
		const invite = await validateInvite(createKyselyAdapter(emdash.db), body.token);
		const url = new URL(request.url);
		const passkeyConfig = getPasskeyConfig(url, await getSiteTitle(new OptionsRepository(emdash.db)), getPublicOrigin(url, emdash?.config));
		const challengeStore = createChallengeStore(emdash.db);
		return apiSuccess({ options: await generateRegistrationOptions(passkeyConfig, {
			id: ulid(),
			email: invite.email,
			name: body.name || null
		}, [], challengeStore) });
	} catch (error) {
		if (error instanceof InviteError) return apiError(error.code.toUpperCase(), error.message, {
			invalid_token: 404,
			token_expired: 410,
			user_exists: 409
		}[error.code] ?? 400);
		return handleError(error, "Failed to generate registration options", "INVITE_REGISTER_OPTIONS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/register-options@_@mjs
var page = () => register_options_exports;
export { page };
