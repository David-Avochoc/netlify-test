import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as roleFromLevel, t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { r as allowedDomainUpdateBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import "./dist__l0ohBBn.mjs";
import { t as createKyselyAdapter } from "./kysely_pDtYrmXS.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs
var _domain__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PATCH: () => PATCH,
	prerender: () => false
});
/**
* PATCH - Update domain settings
*/
var PATCH = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { domain } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "Database not configured", 500);
	if (!domain) return apiError("VALIDATION_ERROR", "Domain is required", 400);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		const body = await parseBody(request, allowedDomainUpdateBody);
		if (isParseError(body)) return body;
		const existing = await adapter.getAllowedDomain(domain);
		if (!existing) return apiError("NOT_FOUND", "Domain not found", 404);
		const defaultRole = body.defaultRole;
		const enabled = body.enabled ?? existing.enabled;
		await adapter.updateAllowedDomain(domain, enabled, defaultRole);
		const updated = await adapter.getAllowedDomain(domain);
		return apiSuccess({
			success: true,
			domain: updated ? {
				domain: updated.domain,
				defaultRole: updated.defaultRole,
				roleName: roleFromLevel(updated.defaultRole),
				enabled: updated.enabled,
				createdAt: updated.createdAt.toISOString()
			} : null
		});
	} catch (error) {
		return handleError(error, "Failed to update allowed domain", "DOMAIN_UPDATE_ERROR");
	}
};
/**
* DELETE - Remove an allowed domain
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { domain } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "Database not configured", 500);
	if (!domain) return apiError("VALIDATION_ERROR", "Domain is required", 400);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		if (!await adapter.getAllowedDomain(domain)) return apiError("NOT_FOUND", "Domain not found", 404);
		await adapter.deleteAllowedDomain(domain);
		return apiSuccess({ success: true });
	} catch (error) {
		return handleError(error, "Failed to delete allowed domain", "DOMAIN_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_@_@mjs
var page = () => _domain__exports;
export { page };
