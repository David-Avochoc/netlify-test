import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as getPublicSiteUrl } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as handleSitemapIndexData } from "./seo-Ie7B6cud_BItNtWIg.mjs";
import { s as getSiteSettingsWithDb } from "./settings-BApLX_aS_DL4S1VIP.mjs";
// node_modules/emdash/dist/astro/routes/sitemap.xml.mjs
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var AMP_RE = /&/g;
var LT_RE = /</g;
var GT_RE = />/g;
var QUOT_RE = /"/g;
var APOS_RE = /'/g;
var GET = async ({ locals, url }) => {
	const { emdash } = locals;
	if (!emdash?.db) return new Response("<!-- EmDash not configured -->", {
		status: 500,
		headers: { "Content-Type": "application/xml" }
	});
	try {
		const settings = await getSiteSettingsWithDb(emdash.db);
		const siteUrl = getPublicSiteUrl(url, emdash.config, settings.url, "/");
		const result = await handleSitemapIndexData(emdash.db);
		if (!result.success || !result.data) return new Response("<!-- Failed to generate sitemap -->", {
			status: 500,
			headers: { "Content-Type": "application/xml" }
		});
		const { sitemaps } = result.data;
		const lines = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"];
		for (const sitemap of sitemaps) {
			const suffix = sitemap.page === 1 ? "" : `-${sitemap.page}`;
			const loc = `${siteUrl}/sitemap-${encodeURIComponent(sitemap.collection)}${suffix}.xml`;
			lines.push("  <sitemap>");
			lines.push(`    <loc>${escapeXml(loc)}</loc>`);
			lines.push(`    <lastmod>${escapeXml(sitemap.lastmod)}</lastmod>`);
			lines.push("  </sitemap>");
		}
		lines.push("</sitemapindex>");
		return new Response(lines.join("\n"), {
			status: 200,
			headers: {
				"Content-Type": "application/xml; charset=utf-8",
				"Cache-Control": "public, max-age=3600"
			}
		});
	} catch {
		return new Response("<!-- Internal error generating sitemap -->", {
			status: 500,
			headers: { "Content-Type": "application/xml" }
		});
	}
};
/** Escape special XML characters in a string */
function escapeXml(str) {
	return str.replace(AMP_RE, "&amp;").replace(LT_RE, "&lt;").replace(GT_RE, "&gt;").replace(QUOT_RE, "&quot;").replace(APOS_RE, "&apos;");
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/sitemap.xml@_@mjs
var page = () => sitemap_xml_exports;
export { page };
