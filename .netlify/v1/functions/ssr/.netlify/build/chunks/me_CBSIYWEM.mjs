import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as UserRepository } from "./user-Cy4kOmtD_CPESG2fx.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { a as validate, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { n as authMeActionBody, t as adminLayoutSchema, y as setAdminLayoutBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/me.mjs
var me_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { user, emdash } = locals;
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	let userData = user.data;
	if (locals.__playgroundDb) {
		if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
		try {
			const persistedUser = await new UserRepository(emdash.db).findById(user.id);
			if (persistedUser) userData = persistedUser.data;
		} catch (error) {
			return handleError(error, "Failed to fetch current user", "CURRENT_USER_ERROR");
		}
	}
	const isFirstLogin = !userData?.welcomeDismissed;
	const adminLayout = adminLayoutSchema.safeParse(userData?.adminLayout);
	return apiSuccess({
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		avatarUrl: user.avatarUrl,
		isFirstLogin,
		adminLayout: adminLayout.success ? adminLayout.data : null
	});
};
/**
* POST /_emdash/api/auth/me
*
* - `{ action: "dismissWelcome" }` marks the welcome modal as seen.
* - `{ action: "setAdminLayout", adminLayout }` replaces the personal sidebar
*   layout, or removes it when `adminLayout` is `null`.
*/
var POST = async ({ request, locals }) => {
	const { user, emdash } = locals;
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const body = await parseBody(request, authMeActionBody);
	if (isParseError(body)) return body;
	const users = new UserRepository(emdash.db);
	switch (body.action) {
		case "dismissWelcome": try {
			await users.setDataKey(user.id, "welcomeDismissed", true);
			return apiSuccess({ success: true });
		} catch (error) {
			return handleError(error, "Failed to dismiss welcome", "WELCOME_DISMISS_ERROR");
		}
		case "setAdminLayout": {
			const input = validate(setAdminLayoutBody, body);
			if (isParseError(input)) return input;
			try {
				if (input.adminLayout) await users.setDataKey(user.id, "adminLayout", input.adminLayout);
				else await users.removeDataKey(user.id, "adminLayout");
				return apiSuccess({ adminLayout: input.adminLayout });
			} catch (error) {
				return handleError(error, "Failed to save admin layout", "ADMIN_LAYOUT_SAVE_ERROR");
			}
		}
		default: return apiError("UNKNOWN_ACTION", "Unknown action", 400);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/me@_@mjs
var page = () => me_exports;
export { page };
