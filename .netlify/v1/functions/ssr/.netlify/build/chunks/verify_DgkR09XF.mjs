import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { d as magicLinkVerifyBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { r as sessionUnavailableError } from "./session-user-BrCPLyWB_B1TZCa32.mjs";
import { t as startUserSession } from "./start-user-session-CdyNie0P_D3BXuQ7j.mjs";
import { n as MagicLinkError, x as verifyMagicLink } from "./dist__l0ohBBn.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ url, redirect }) => {
	const token = url.searchParams.get("token");
	if (!token) return redirect("/_emdash/admin/login?error=missing_token");
	const confirmUrl = new URLSearchParams({ token });
	const rawRedirect = url.searchParams.get("redirect");
	if (rawRedirect) confirmUrl.set("redirect", rawRedirect);
	return redirect(`/_emdash/admin/login/magic-link?${confirmUrl.toString()}`);
};
var POST = async ({ request, locals, session }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!session) return sessionUnavailableError();
	try {
		const body = await parseBody(request, magicLinkVerifyBody);
		if (isParseError(body)) return body;
		const adapter = createKyselyAdapter(emdash.db);
		const user = await verifyMagicLink(adapter, body.token);
		after(async () => {
			try {
				await adapter.deleteExpiredTokens();
			} catch (error) {
				console.error("[magic-link] failed to delete expired tokens:", error);
			}
		});
		await startUserSession(emdash.db, session, user.id);
		return apiSuccess({ success: true });
	} catch (error) {
		if (error instanceof MagicLinkError) return apiError(error.code.toUpperCase(), error.message, {
			invalid_token: 400,
			token_expired: 410,
			user_not_found: 404,
			email_not_configured: 500
		}[error.code]);
		return handleError(error, "Failed to verify magic link", "MAGIC_LINK_VERIFY_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify@_@mjs
var page = () => verify_exports;
export { page };
