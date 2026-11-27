import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getRegistryConfigInput } from "./config-DeluGa9H_Db3EBMuk.mjs";
import { n as apiSuccess, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { d as handleMarketplaceUpdateCheck } from "./marketplace-D9fChLav_DPvHsZ-B.mjs";
import { i as handleRegistryUpdateCheck } from "./registry-COR9pjyi_B92xLeUt.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs
var updates_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	const [marketplace, registry] = await Promise.all([handleMarketplaceUpdateCheck(emdash.db, emdash.config.marketplace).catch((err) => {
		console.warn("[plugins/updates] marketplace check threw:", err);
		return null;
	}), handleRegistryUpdateCheck(emdash.db, getRegistryConfigInput(emdash.config.registry)).catch((err) => {
		console.warn("[plugins/updates] registry check threw:", err);
		return null;
	})]);
	if (marketplace && !marketplace.success) console.warn(`[plugins/updates] marketplace check failed: ${marketplace.error.code} ${marketplace.error.message}`);
	if (registry && !registry.success) console.warn(`[plugins/updates] registry check failed: ${registry.error.code} ${registry.error.message}`);
	const items = [];
	if (marketplace?.success) items.push(...marketplace.data.items);
	if (registry?.success) items.push(...registry.data.items);
	return apiSuccess({ items });
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/updates@_@mjs
var page = () => updates_exports;
export { page };
