import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { a as getBackupSettings, l as runBackupToStorage } from "./backup-GBRxixs1_CWxMkpt7.mjs";
// node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs
var archives_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	const settings = await getBackupSettings(emdash.db);
	return unwrapResult(await runBackupToStorage(emdash.db, emdash.storage, settings.retention), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index@_@mjs
var page = () => archives_exports;
export { page };
