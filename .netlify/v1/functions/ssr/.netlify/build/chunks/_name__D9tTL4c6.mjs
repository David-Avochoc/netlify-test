import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as ErrorCode } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { o as isValidArchiveName, r as deleteBackupArchive, t as BACKUP_STORAGE_PREFIX } from "./backup-GBRxixs1_CWxMkpt7.mjs";
// node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs
var _name__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const name = params.name ?? "";
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	if (!isValidArchiveName(name)) return apiError("VALIDATION_ERROR", "Invalid archive name", 400);
	try {
		const result = await emdash.storage.download(`${BACKUP_STORAGE_PREFIX}${name}`);
		return new Response(result.body, {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Content-Disposition": `attachment; filename="${name}"`,
				"Cache-Control": "private, no-store",
				"X-Content-Type-Options": "nosniff"
			}
		});
	} catch (error) {
		if (error instanceof Error && error.message.toLowerCase().includes("not found")) return apiError("NOT_FOUND", "Archive not found", 404);
		return handleError(error, "Failed to download archive", ErrorCode.BACKUP_DOWNLOAD_ERROR);
	}
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const name = params.name ?? "";
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	return unwrapResult(await deleteBackupArchive(emdash.storage, name));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_@_@mjs
var page = () => _name__exports;
export { page };
