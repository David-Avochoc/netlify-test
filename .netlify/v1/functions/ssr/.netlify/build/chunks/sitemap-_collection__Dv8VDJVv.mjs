import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as getI18nConfig, s as isI18nEnabled } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { a as resolveLocalizedContentRoutePath } from "./resolve-Z5YK_6ew_C3Nw14z1.mjs";
import { i as getPublicSiteUrl } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { t as handleSitemapData } from "./seo-Ie7B6cud_BItNtWIg.mjs";
import { s as getSiteSettingsWithDb } from "./settings-BApLX_aS_DL4S1VIP.mjs";
import { t as parseCollectionSitemapName } from "./sitemap-name-BZXv5sf0_Dd0WovkV.mjs";
import { t as config_default } from "./config_B1NN09mD.mjs";
// node_modules/emdash/dist/media-url-BEvOId4Z.mjs
/**
* Resolve a stored SEO image reference to a URL.
*
* The CMS SEO panel stores `seo_image` in one of these shapes:
* - an absolute URL (`https://...`) — returned as-is;
* - a root-relative path that already includes the media API prefix
*   (`/_emdash/api/media/file/01KS....webp`) — prefixed with `siteUrl`;
* - a bare media id (`01KS...`) — expanded to the media API path, then
*   prefixed with `siteUrl`.
*
* Shared by the SEO meta builder (`og:image`) and the sitemap route
* (`<image:image>`) so both resolve image references identically.
*/
var TRAILING_SLASH_RE$1 = /\/$/;
var ABSOLUTE_URL_RE = /^https?:\/\//i;
function buildSeoImageUrl(imageRef, siteUrl) {
	if (ABSOLUTE_URL_RE.test(imageRef)) return imageRef;
	if (imageRef.startsWith("//")) return imageRef;
	if (imageRef.startsWith("/")) return siteUrl ? `${siteUrl.replace(TRAILING_SLASH_RE$1, "")}${imageRef}` : imageRef;
	const mediaPath = `/_emdash/api/media/file/${imageRef}`;
	return siteUrl ? `${siteUrl.replace(TRAILING_SLASH_RE$1, "")}${mediaPath}` : mediaPath;
}
// node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs
var sitemap__collection__xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var TRAILING_SLASH_RE = /\/$/;
var AMP_RE = /&/g;
var LT_RE = /</g;
var GT_RE = />/g;
var QUOT_RE = /"/g;
var APOS_RE = /'/g;
var GET = async ({ params, locals, url }) => {
	const { emdash } = locals;
	const parsed = params.collection ? parseCollectionSitemapName(params.collection) : null;
	if (!parsed) return new Response("<!-- Sitemap not found -->", {
		status: 404,
		headers: { "Content-Type": "application/xml" }
	});
	const { collection: collectionSlug, page } = parsed;
	if (!emdash?.db) return new Response("<!-- EmDash not configured -->", {
		status: 500,
		headers: { "Content-Type": "application/xml" }
	});
	try {
		const settings = await getSiteSettingsWithDb(emdash.db);
		const siteUrl = getPublicSiteUrl(url, emdash.config, settings.url, "/");
		const basePath = "/".replace(TRAILING_SLASH_RE, "");
		const mediaRoot = basePath ? siteUrl.slice(0, -basePath.length) : siteUrl;
		const result = await handleSitemapData(emdash.db, collectionSlug, { page });
		if (!result.success || !result.data) return new Response("<!-- Failed to generate sitemap -->", {
			status: 500,
			headers: { "Content-Type": "application/xml" }
		});
		const col = result.data.collections[0];
		if (!col) return new Response("<!-- Collection not found or empty -->", {
			status: 404,
			headers: { "Content-Type": "application/xml" }
		});
		const i18nEnabled = isI18nEnabled();
		const i18nConfig = getI18nConfig();
		const groups = /* @__PURE__ */ new Map();
		const ungrouped = [];
		for (const entry of col.entries) if (i18nEnabled && entry.translationGroup) {
			const list = groups.get(entry.translationGroup);
			if (list) list.push(entry);
			else groups.set(entry.translationGroup, [entry]);
		} else ungrouped.push(entry);
		const alternatesByGroup = /* @__PURE__ */ new Map();
		const all = [...col.entries, ...col.translations].toSorted((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
		for (const entry of all) {
			if (!i18nEnabled || !entry.translationGroup) continue;
			const list = alternatesByGroup.get(entry.translationGroup);
			if (list) list.push(entry);
			else alternatesByGroup.set(entry.translationGroup, [entry]);
		}
		const urlByEntry = /* @__PURE__ */ new Map();
		const resolveEntryUrl = async (entry) => {
			if (urlByEntry.has(entry.id)) return urlByEntry.get(entry.id) ?? null;
			const absolutePath = await resolveLocalizedContentRoutePath({
				pattern: col.urlPattern,
				collection: col.collection,
				slug: entry.slug || entry.id,
				id: entry.id,
				date: entry.publishedAt,
				locale: entry.locale,
				trailingSlash: config_default?.trailingSlash
			});
			const absolute = absolutePath === null ? null : `${siteUrl}${absolutePath}`;
			urlByEntry.set(entry.id, absolute);
			return absolute;
		};
		const useXhtml = i18nEnabled;
		const lines = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>"];
		lines.push(useXhtml ? "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">" : "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">");
		const writeUrl = async (entry, siblings) => {
			const loc = await resolveEntryUrl(entry);
			if (loc === null) return;
			lines.push("  <url>");
			lines.push(`    <loc>${escapeXml(loc)}</loc>`);
			lines.push(`    <lastmod>${escapeXml(entry.updatedAt)}</lastmod>`);
			if (entry.image) {
				const imageLoc = buildSeoImageUrl(entry.image, mediaRoot);
				lines.push("    <image:image>");
				lines.push(`      <image:loc>${escapeXml(imageLoc)}</image:loc>`);
				lines.push("    </image:image>");
			}
			const alternateEntries = siblings ?? (useXhtml ? [entry] : null);
			if (useXhtml && alternateEntries) {
				for (const sib of alternateEntries) {
					const sibLoc = await resolveEntryUrl(sib);
					if (sibLoc === null) continue;
					lines.push(`    <xhtml:link rel="alternate" hreflang="${escapeXml(sib.locale)}" href="${escapeXml(sibLoc)}" />`);
				}
				const defaultSibling = i18nConfig && alternateEntries.find((s) => s.locale === i18nConfig.defaultLocale);
				let xDefaultLoc = null;
				if (defaultSibling) xDefaultLoc = await resolveEntryUrl(defaultSibling);
				if (xDefaultLoc === null) for (const sib of alternateEntries) {
					const sibLoc = await resolveEntryUrl(sib);
					if (sibLoc !== null) {
						xDefaultLoc = sibLoc;
						break;
					}
				}
				if (xDefaultLoc !== null) lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefaultLoc)}" />`);
			}
			lines.push("  </url>");
		};
		for (const [group, siblings] of groups) {
			const alternates = alternatesByGroup.get(group) ?? siblings;
			for (const entry of siblings) await writeUrl(entry, alternates);
		}
		for (const entry of ungrouped) await writeUrl(entry, null);
		lines.push("</urlset>");
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
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml@_@mjs
var page = () => sitemap__collection__xml_exports;
export { page };
