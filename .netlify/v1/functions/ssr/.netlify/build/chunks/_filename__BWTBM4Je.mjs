import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as MediaRepository } from "./media--P-IEycF_BxdQj7uT.mjs";
import { r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_.mjs
var _filename__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var SAFE_INLINE_TYPES = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp",
	"image/avif",
	"image/bmp",
	"image/x-icon",
	"video/mp4",
	"video/webm",
	"audio/mpeg",
	"audio/wav",
	"audio/ogg"
]);
var GET = async ({ params, locals }) => {
	const { id, filename } = params;
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:read");
	if (denied) return denied;
	if (!id || !filename) return apiError("NOT_FOUND", "File not found", 404);
	if (!emdash?.storage) return apiError("NOT_CONFIGURED", "Storage not configured", 500);
	try {
		const item = await new MediaRepository(emdash.db).findById(id);
		if (!item || item.status !== "ready" || item.filename !== filename) return apiError("NOT_FOUND", "File not found", 404);
		const result = await emdash.storage.download(item.storageKey);
		const headers = {
			"Content-Type": result.contentType,
			"Cache-Control": "private, max-age=0, must-revalidate",
			"X-Content-Type-Options": "nosniff",
			"Content-Security-Policy": "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
			"Content-Disposition": SAFE_INLINE_TYPES.has(result.contentType) ? "inline" : "attachment"
		};
		if (result.size) headers["Content-Length"] = String(result.size);
		return new Response(result.body, {
			status: 200,
			headers
		});
	} catch (error) {
		return handleError(error, "Failed to serve file", "FILE_SERVE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_@_@mjs
var page = () => _filename__exports;
export { page };
