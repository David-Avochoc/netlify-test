import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { n as decodeBase64Bytes } from "./base64-GXviT28w_CJsXkxay.mjs";
import { t as MediaRepository } from "./media--P-IEycF_BxdQj7uT.mjs";
import { n as readDimensions, t as enrichImageMetadata } from "./enrich-C4vKniyi_C9GKhuCi.mjs";
import { n as computeContentHash, t as MAX_CONTENT_HASH_BYTES } from "./hash-SY9Nq5FH_BcfKQxdw.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { i as mediaConfirmBody } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs
var confirm_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Max raw bytes to buffer for server-side LQIP generation at confirm time. The
* signed-URL upload flow exists so large files bypass server buffering — re-reading
* the whole object into a Worker's 128 MB heap to compute a blurhash would OOM
* on the very uploads that flow was designed for. LQIP is progressive
* enhancement: large images simply ship without a server-generated placeholder.
*/
var MAX_PLACEHOLDER_DOWNLOAD_BYTES = MAX_CONTENT_HASH_BYTES;
/**
* Add URL to media item (relative URL for portability)
*/
function addUrlToMedia(item) {
	return {
		...item,
		url: `/_emdash/api/media/file/${item.storageKey}`
	};
}
async function cancelDownload(download) {
	try {
		await download.body.cancel();
	} catch (error) {
		console.error("[media] confirm download cancellation failed:", error);
	}
}
async function forgetUploadAttempt(repo, storageKey) {
	try {
		await repo.deleteUploadAttempt(storageKey);
	} catch (error) {
		console.error("[media] confirm upload attempt cleanup failed:", error);
	}
}
async function confirmationConflict(repo, id) {
	const current = await repo.findById(id);
	if (!current) return apiError("NOT_FOUND", `Media item not found: ${id}`, 404);
	if (current.status === "ready") {
		await forgetUploadAttempt(repo, current.storageKey);
		return apiSuccess({ item: addUrlToMedia(current) });
	}
	if (current.status === "pending") return apiError("INVALID_STATE", "Media item changed during confirmation", 409);
	return apiError("INVALID_STATE", `Media item is not pending: ${current.status}`, 400);
}
function decodeThumbnail(thumbnail) {
	if (!thumbnail) return void 0;
	try {
		const bytes = decodeBase64Bytes(thumbnail.data);
		const dimensions = readDimensions(bytes);
		return dimensions && dimensions.width * dimensions.height <= 4096 ? bytes : /* @__PURE__ */ new Uint8Array();
	} catch (error) {
		console.error("[media] confirm thumbnail decode failed:", error);
		return /* @__PURE__ */ new Uint8Array();
	}
}
async function consumeDownload(download) {
	const reader = download.body.getReader();
	try {
		const bytes = new Uint8Array(download.size);
		let receivedSize = 0;
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			if (receivedSize + value.byteLength > bytes.byteLength) throw new Error("Stored file exceeds its reported size");
			bytes.set(value, receivedSize);
			receivedSize += value.byteLength;
		}
		if (receivedSize !== download.size) throw new Error("Stored file size does not match its reported size");
		return bytes;
	} catch (error) {
		try {
			await reader.cancel(error);
		} catch (cancelError) {
			console.error("[media] confirm download cancellation failed:", cancelError);
		}
		throw error;
	} finally {
		reader.releaseLock();
	}
}
/**
* Confirm upload completion
*/
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const denied = requirePerm(user, "media:upload");
	if (denied) return denied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID is required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseOptionalBody(request, mediaConfirmBody, {});
		if (isParseError(body)) return body;
		const repo = new MediaRepository(emdash.db);
		const existing = await repo.findById(id);
		if (!existing) return apiError("NOT_FOUND", `Media item not found: ${id}`, 404);
		const ownerDenied = requireOwnerPerm(user, existing.authorId ?? "", "media:upload", "media:edit_any");
		if (ownerDenied) return ownerDenied;
		if (existing.status === "ready") {
			await forgetUploadAttempt(repo, existing.storageKey);
			return apiSuccess({ item: addUrlToMedia(existing) });
		}
		if (existing.status !== "pending") return apiError("INVALID_STATE", `Media item is not pending: ${existing.status}`, 400);
		if (body.size !== void 0 && existing.size !== null && body.size !== existing.size) return apiError("UPLOAD_SIZE_MISMATCH", "Confirmed size does not match the pending media item", 400);
		let confirmedSize = existing.size ?? body.size;
		let contentHash = existing.contentHash;
		let imageBytes;
		if (emdash.storage) {
			if (!await emdash.storage.exists(existing.storageKey)) {
				if (!await repo.markFailed(id, existing.storageKey)) return await confirmationConflict(repo, id);
				return apiError("FILE_NOT_FOUND", "File was not uploaded to storage", 400);
			}
			const storedFile = await emdash.storage.download(existing.storageKey);
			if (confirmedSize !== void 0 && storedFile.size !== confirmedSize) {
				await cancelDownload(storedFile);
				return apiError("UPLOAD_SIZE_MISMATCH", "Stored file size does not match the pending media item", 400);
			}
			confirmedSize = storedFile.size;
			const isImage = existing.mimeType.startsWith("image/");
			const canBuffer = storedFile.size <= MAX_PLACEHOLDER_DOWNLOAD_BYTES;
			const hasServerHash = contentHash !== null && await repo.hasUploadAttempt(existing.storageKey);
			if (canBuffer && (isImage || !hasServerHash)) {
				const bytes = await consumeDownload(storedFile);
				contentHash = bytes.byteLength > 0 ? await computeContentHash(bytes) : null;
				if (isImage && bytes.byteLength > 0) imageBytes = bytes;
			} else {
				if (!hasServerHash) contentHash = null;
				await cancelDownload(storedFile);
			}
		}
		let blurhash;
		let dominantColor;
		let width = body.width;
		let height = body.height;
		const placeholdersEnabled = emdash.config?.imagePlaceholders ?? true;
		const thumbnail = body.thumbnail;
		const thumbnailBytes = placeholdersEnabled ? decodeThumbnail(thumbnail) : void 0;
		if (imageBytes || thumbnailBytes) try {
			const enriched = await enrichImageMetadata(imageBytes ?? /* @__PURE__ */ new Uint8Array(), existing.mimeType, {
				knownDimensions: body.width != null && body.height != null ? {
					width: body.width,
					height: body.height
				} : void 0,
				placeholder: thumbnail && thumbnailBytes ? {
					bytes: thumbnailBytes,
					contentType: thumbnail.contentType
				} : void 0,
				placeholders: placeholdersEnabled
			});
			blurhash = enriched.blurhash;
			dominantColor = enriched.dominantColor;
			width = width ?? enriched.width;
			height = height ?? enriched.height;
		} catch (error) {
			console.error("[media] confirm placeholder generation failed:", error);
		}
		const item = await repo.confirmUpload(id, {
			size: confirmedSize,
			width,
			height,
			blurhash,
			dominantColor,
			contentHash
		}, existing.storageKey);
		if (!item) return await confirmationConflict(repo, id);
		await forgetUploadAttempt(repo, item.storageKey);
		const itemWithUrl = addUrlToMedia(item);
		if (emdash.hooks?.hasHooks("media:afterUpload")) after(async () => {
			try {
				await emdash.hooks.runMediaAfterUpload({
					id: itemWithUrl.id,
					filename: itemWithUrl.filename,
					mimeType: itemWithUrl.mimeType,
					size: itemWithUrl.size,
					url: itemWithUrl.url,
					createdAt: itemWithUrl.createdAt
				});
			} catch (error) {
				console.error("[media] afterUpload hook failed:", error);
			}
		});
		return apiSuccess({ item: itemWithUrl });
	} catch (error) {
		return handleError(error, "Failed to confirm upload", "CONFIRM_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/confirm@_@mjs
var page = () => confirm_exports;
export { page };
