import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { i as parseQuery, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { Ft as usersListQuery } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import "./dist__l0ohBBn.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs
var users_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		const query = parseQuery(url, usersListQuery);
		if (isParseError(query)) return query;
		const result = await adapter.getUsers({
			search: query.search,
			role: query.role ? parseInt(query.role, 10) : void 0,
			cursor: query.cursor,
			limit: query.limit
		});
		return apiSuccess({
			items: result.items.map((u) => ({
				id: u.id,
				email: u.email,
				name: u.name,
				avatarUrl: u.avatarUrl,
				role: u.role,
				emailVerified: u.emailVerified,
				disabled: u.disabled,
				createdAt: u.createdAt.toISOString(),
				updatedAt: u.updatedAt.toISOString(),
				lastLogin: u.lastLogin?.toISOString() ?? null,
				credentialCount: u.credentialCount,
				oauthProviders: u.oauthProviders
			})),
			nextCursor: result.nextCursor
		});
	} catch (error) {
		return handleError(error, "Failed to list users", "USER_LIST_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/index@_@mjs
var page = () => users_exports;
export { page };
