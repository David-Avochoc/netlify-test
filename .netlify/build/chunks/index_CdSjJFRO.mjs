import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as ErrorCode } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { a as getBackupSettings, s as listBackupArchives, u as updateBackupSettings } from "./backup-GBRxixs1_CWxMkpt7.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs
var backups_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	try {
		const settings = await getBackupSettings(emdash.db);
		let archives = [];
		const storageAvailable = !!emdash.storage;
		if (emdash.storage) {
			const listed = await listBackupArchives(emdash.storage);
			if (listed.success) archives = listed.data;
		}
		return apiSuccess({
			settings,
			archives,
			storageAvailable
		});
	} catch (error) {
		return handleError(error, "Failed to load backup settings", ErrorCode.BACKUP_SETTINGS_READ_ERROR);
	}
};
var settingsBody = z.object({
	enabled: z.boolean(),
	retention: z.number().int().min(1).max(30)
});
var PUT = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	const body = await parseBody(request, settingsBody);
	if (isParseError(body)) return body;
	return unwrapResult(await updateBackupSettings(emdash.db, body));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/index@_@mjs
var page = () => backups_exports;
export { page };
