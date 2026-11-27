import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess, r as handleError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
// node_modules/emdash/dist/redirect-3A3kqsD-.mjs
var CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;
/**
* Validate that a redirect URL is a safe local path.
*
* Rejects:
* - Protocol-relative URLs (`//evil.com`)
* - Backslash bypass (`/\evil.com` — browsers normalize `\` to `/` in Location headers)
* - Control characters (`/\t/evil.com` — browsers strip tab/CR/LF, leaving `//evil.com`)
* - Absolute URLs (`https://evil.com`)
* - Empty / nullish values
*/
function isSafeRedirect(url) {
	return typeof url === "string" && url.startsWith("/") && !url.startsWith("//") && !url.includes("\\") && !CONTROL_CHARACTERS.test(url);
}
// node_modules/emdash/dist/astro/routes/api/auth/logout.mjs
var logout_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ session, url }) => {
	try {
		if (session) session.destroy();
		const redirect = url.searchParams.get("redirect");
		if (isSafeRedirect(redirect)) return new Response(null, {
			status: 302,
			headers: { Location: redirect }
		});
		return apiSuccess({
			success: true,
			message: "Logged out successfully"
		});
	} catch (error) {
		return handleError(error, "Logout failed", "LOGOUT_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/logout@_@mjs
var page = () => logout_exports;
export { page };
