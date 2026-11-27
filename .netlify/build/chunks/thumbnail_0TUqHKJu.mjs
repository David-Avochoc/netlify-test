import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as fetchWithinOrigin, t as MarketplaceError } from "./marketplace-BsMC_Z7o_Ci_WJFCL.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs
var thumbnail_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	const marketplaceUrl = emdash.config.marketplace;
	if (!marketplaceUrl || !id) return apiError("NOT_CONFIGURED", "Marketplace not configured", 400);
	const width = url.searchParams.get("w");
	const target = new URL(`/api/v1/themes/${encodeURIComponent(id)}/thumbnail`, marketplaceUrl);
	if (width) target.searchParams.set("w", width);
	try {
		const resp = await fetchWithinOrigin(target.href, "Thumbnail fetch", "PROXY");
		if (!resp.ok) return new Response(resp.body, {
			status: resp.status,
			headers: {
				"Content-Type": resp.headers.get("Content-Type") ?? "application/octet-stream",
				"Cache-Control": "private, no-store"
			}
		});
		return new Response(resp.body, { headers: {
			"Content-Type": resp.headers.get("Content-Type") ?? "image/png",
			"Cache-Control": "private, no-store"
		} });
	} catch (error) {
		if (error instanceof MarketplaceError && error.code) return apiError(error.code, "Thumbnail redirect was not followed", 502);
		return apiError("PROXY_ERROR", "Failed to fetch thumbnail", 502);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail@_@mjs
var page = () => thumbnail_exports;
export { page };
