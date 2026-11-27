import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as normalizeMime } from "./mime-C_YV5Mjm_puGdJELd.mjs";
import { n as computeContentHash } from "./hash-SY9Nq5FH_BcfKQxdw.mjs";
import { i as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { y as mediaReplaceMetadataForm } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { f as mediaCacheTag, n as MUTABLE_MEDIA_CACHE_CONTROL, s as isCacheableMediaKey } from "./image-endpoint_CAMLdpZa.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
// node_modules/emdash/dist/astro/routes/api/media/_id_/replace.mjs
var replace_exports = /* @__PURE__ */ __exportAll({
	PUT: () => PUT,
	prerender: () => false
});
var REPLACEABLE_IMAGE_TYPES = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/webp"
]);
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const editDenied = requirePerm(user, "media:edit_own");
	if (editDenied) return editDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet || !emdash?.handleMediaReplaceMetadata) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!emdash.storage) return apiError("NO_STORAGE", "Storage not configured", 500);
	const getResult = await emdash.handleMediaGet(id);
	if (!getResult.success) return unwrapResult(getResult);
	const media = getResult.data.item;
	const ownerDenied = requireOwnerPerm(user, media.authorId ?? "", "media:edit_own", "media:edit_any");
	if (ownerDenied) return ownerDenied;
	if (media.status !== "ready") return apiError("INVALID_STATE", "Only ready media can be replaced", 400);
	const sourceMime = normalizeMime(media.mimeType);
	if (!REPLACEABLE_IMAGE_TYPES.has(sourceMime)) return apiError("INVALID_TYPE", "Media type cannot be replaced", 400);
	const rawMax = emdash.config.maxUploadSize ?? 52428800;
	if (!Number.isFinite(rawMax) || rawMax <= 0) return apiError("CONFIGURATION_ERROR", "Invalid maxUploadSize configuration", 500);
	const maxUploadSize = rawMax;
	const contentLength = request.headers.get("Content-Length");
	if (contentLength && parseInt(contentLength, 10) > maxUploadSize) return apiError("PAYLOAD_TOO_LARGE", "Upload too large", 413);
	try {
		const formData = await request.formData();
		const fileEntry = formData.get("file");
		const file = fileEntry instanceof File ? fileEntry : null;
		if (!file) return apiError("NO_FILE", "No file provided", 400);
		if (file.size === 0) return apiError("VALIDATION_ERROR", "Replacement file is empty", 400);
		if (file.size > maxUploadSize) return apiError("PAYLOAD_TOO_LARGE", "Upload too large", 413);
		const replacementMime = normalizeMime(file.type);
		if (!REPLACEABLE_IMAGE_TYPES.has(replacementMime) || replacementMime !== sourceMime) return apiError("INVALID_TYPE", "Replacement file type must match the media item", 400);
		const metadataResult = mediaReplaceMetadataForm.safeParse({
			width: formData.get("width"),
			height: formData.get("height")
		});
		if (!metadataResult.success) return apiError("VALIDATION_ERROR", "Invalid request data", 400, { issues: metadataResult.error.issues.map((issue) => ({
			path: issue.path.join("."),
			message: issue.message
		})) });
		const { width, height } = metadataResult.data;
		const bytes = new Uint8Array(await file.arrayBuffer());
		const contentHash = await computeContentHash(bytes);
		try {
			await emdash.storage.upload({
				key: media.storageKey,
				body: bytes,
				contentType: sourceMime,
				cacheControl: MUTABLE_MEDIA_CACHE_CONTROL
			});
		} catch (error) {
			return handleError(error, "Failed to replace media", "MEDIA_REPLACE_ERROR");
		}
		if (isCacheableMediaKey(media.storageKey)) await invalidateRouteCache(cache, [mediaCacheTag(media.storageKey)]);
		const result = await emdash.handleMediaReplaceMetadata(id, media.storageKey, {
			size: file.size,
			width,
			height,
			contentHash
		});
		if (!result.success) return unwrapResult(result);
		return apiSuccess({ item: {
			...result.data.item,
			url: `/_emdash/api/media/file/${result.data.item.storageKey}`
		} });
	} catch (error) {
		return handleError(error, "Failed to replace media", "MEDIA_REPLACE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/replace@_@mjs
var page = () => replace_exports;
export { page };
