import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as resolveSecretsCached } from "./secrets-O25WpEe__B3AoQE_o.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as apiSuccess, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/themes/preview.mjs
var preview_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	const { previewSecret: secret } = await resolveSecretsCached(emdash.db);
	let body;
	try {
		body = await request.json();
	} catch {
		return apiError("INVALID_REQUEST", "Invalid JSON body", 400);
	}
	if (!body.previewUrl || typeof body.previewUrl !== "string") return apiError("INVALID_REQUEST", "previewUrl is required", 400);
	let parsedPreviewUrl;
	try {
		parsedPreviewUrl = new URL(body.previewUrl);
	} catch {
		return apiError("INVALID_REQUEST", "previewUrl must be a valid URL", 400);
	}
	if (parsedPreviewUrl.protocol !== "https:") return apiError("INVALID_REQUEST", "previewUrl must use HTTPS", 400);
	const source = getPublicOrigin(url, emdash?.config);
	const exp = Math.floor(Date.now() / 1e3) + 3600;
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey("raw", encoder.encode(secret), {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign"]);
	const buffer = await crypto.subtle.sign("HMAC", key, encoder.encode(`${source}:${exp}`));
	const sig = Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join("");
	const previewUrl = new URL(body.previewUrl);
	previewUrl.searchParams.set("source", source);
	previewUrl.searchParams.set("exp", String(exp));
	previewUrl.searchParams.set("sig", sig);
	return apiSuccess({ url: previewUrl.toString() });
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/themes/preview@_@mjs
var page = () => preview_exports;
export { page };
