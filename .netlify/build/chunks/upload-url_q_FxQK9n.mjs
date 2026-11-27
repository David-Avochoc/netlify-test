import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as MediaRepository } from "./media--P-IEycF_BxdQj7uT.mjs";
import { a as resolveUploadMimeType, n as matchesMimeAllowlist, r as normalizeMime } from "./mime-C_YV5Mjm_puGdJELd.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { O as mediaUploadUrlBody } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { n as resolveFieldAllowlist, t as GLOBAL_UPLOAD_ALLOWLIST } from "./media-allowlist-C_kSleFj_alAAF99-.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { ulid } from "ulidx";
import * as path from "node:path";
// node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs
var upload_url_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
function isUnsupportedSignedUpload(error) {
	return error instanceof Error && "code" in error && error.code === "NOT_SUPPORTED";
}
/**
* Get a signed upload URL for direct-to-storage upload
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:upload");
	if (denied) return denied;
	if (!emdash?.storage) return apiError("NO_STORAGE", "Storage not configured. Signed URL uploads require S3-compatible storage.", 501);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const maxSize = emdash.config.maxUploadSize ?? 52428800;
		if (!Number.isFinite(maxSize) || maxSize <= 0) return apiError("CONFIGURATION_ERROR", "Invalid maxUploadSize configuration. Expected a positive finite number.", 500);
		const uploadSchema = mediaUploadUrlBody(maxSize);
		const body = await parseBody(request, uploadSchema);
		if (isParseError(body)) return body;
		let beforeUploadFile = {
			name: body.filename,
			type: body.contentType,
			size: body.size
		};
		if (emdash.hooks?.hasHooks("media:beforeUpload")) {
			const hookResult = await emdash.hooks.runMediaBeforeUpload(beforeUploadFile);
			const metadata = uploadSchema.safeParse({
				filename: hookResult.file?.name,
				contentType: hookResult.file?.type,
				size: body.size
			});
			if (!metadata.success) return apiError("VALIDATION_ERROR", "Invalid media:beforeUpload result", 400);
			beforeUploadFile = {
				name: metadata.data.filename,
				type: metadata.data.contentType,
				size: body.size
			};
		}
		const mimeType = resolveUploadMimeType(beforeUploadFile.name, beforeUploadFile.type);
		const normalizedContentType = normalizeMime(mimeType);
		if (!matchesMimeAllowlist(mimeType, (body.fieldId ? await resolveFieldAllowlist(emdash.db, body.fieldId, body.blockType, body.blockVersion) : null) ?? [...GLOBAL_UPLOAD_ALLOWLIST])) return apiError("INVALID_TYPE", "File type not allowed", 400);
		const repo = new MediaRepository(emdash.db);
		if (body.deduplicate !== false && body.contentHash && body.size > 0) {
			const existing = await repo.findByContentHash(body.contentHash);
			if (existing && existing.mimeType === normalizedContentType && existing.size === body.size) return apiSuccess({
				existing: true,
				mediaId: existing.id,
				storageKey: existing.storageKey,
				url: `/_emdash/api/media/file/${existing.storageKey}`
			});
		}
		const filename = body.ensureUniqueFilename ? await repo.findAvailableFilename(beforeUploadFile.name) : beforeUploadFile.name;
		const storageKey = `${ulid()}${path.extname(filename) || ""}`;
		let signedUrl;
		try {
			signedUrl = await emdash.storage.getSignedUploadUrl({
				key: storageKey,
				contentType: mimeType,
				size: body.size,
				expiresIn: 3600
			});
		} catch (error) {
			if (!isUnsupportedSignedUpload(error)) throw error;
			signedUrl = null;
		}
		const mediaItem = await repo.createPending({
			filename,
			mimeType: normalizedContentType,
			size: body.size,
			storageKey,
			authorId: user?.id,
			folderId: body.folderId
		});
		return apiSuccess({
			uploadUrl: signedUrl?.url ?? `/_emdash/api/media/${mediaItem.id}/upload`,
			method: signedUrl?.method ?? "PUT",
			headers: signedUrl?.headers ?? {
				"Content-Type": normalizedContentType,
				"X-EmDash-Request": "1"
			},
			mediaId: mediaItem.id,
			storageKey,
			expiresAt: signedUrl?.expiresAt ?? new Date(Date.now() + 36e5).toISOString()
		});
	} catch (error) {
		return handleError(error, "Failed to generate upload URL", "UPLOAD_URL_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/upload-url@_@mjs
var page = () => upload_url_exports;
export { page };
