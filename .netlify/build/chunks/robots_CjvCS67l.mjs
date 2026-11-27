import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as getPublicSiteUrl } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { s as getSiteSettingsWithDb } from "./settings-BApLX_aS_DL4S1VIP.mjs";
// node_modules/emdash/dist/astro/routes/robots.txt.mjs
var robots_txt_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* `Content-Signal` is not a rule, so the empty `Disallow:` is what closes the
* `*` group; without a rule, crawlers merge it with the next group and apply
* `Disallow: /` to everyone.
*/
var AI_TRAINING_RULES = [
	"# Disallow AI training",
	"User-agent: *",
	"Content-Signal: search=yes, ai-train=no",
	"Disallow:",
	...[
		"Amazonbot",
		"Applebot-Extended",
		"Bytespider",
		"CCBot",
		"ClaudeBot",
		"Google-Extended",
		"GPTBot",
		"meta-externalagent"
	].flatMap((agent) => [
		"",
		`User-agent: ${agent}`,
		"Disallow: /"
	])
].join("\n");
var GET = async ({ locals, url }) => {
	const { emdash } = locals;
	if (!emdash?.db) return new Response("User-agent: *\nAllow: /\n", {
		status: 200,
		headers: { "Content-Type": "text/plain; charset=utf-8" }
	});
	try {
		const settings = await getSiteSettingsWithDb(emdash.db);
		const sitemapUrl = `${getPublicSiteUrl(url, emdash.config, settings.url, "/")}/sitemap.xml`;
		const disallowAiTraining = settings.seo?.disallowAiTraining === true;
		const cacheControl = settings.staging ? "no-store" : "public, max-age=86400";
		if (settings.seo?.robotsTxt) {
			let content = settings.seo.robotsTxt;
			if (disallowAiTraining) content = `${content.trimEnd()}\n\n${AI_TRAINING_RULES}\n`;
			if (!content.toLowerCase().includes("sitemap:")) content = `${content.trimEnd()}\n\nSitemap: ${sitemapUrl}\n`;
			return new Response(content, {
				status: 200,
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
					"Cache-Control": cacheControl
				}
			});
		}
		const defaultRobots = [
			"User-agent: *",
			"Allow: /",
			"",
			"# Disallow admin and API routes",
			"Disallow: /_emdash/",
			"",
			...disallowAiTraining ? [AI_TRAINING_RULES, ""] : [],
			`Sitemap: ${sitemapUrl}`,
			""
		].join("\n");
		return new Response(defaultRobots, {
			status: 200,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"Cache-Control": cacheControl
			}
		});
	} catch {
		return new Response("User-agent: *\nAllow: /\n", {
			status: 200,
			headers: { "Content-Type": "text/plain; charset=utf-8" }
		});
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/robots.txt@_@mjs
var page = () => robots_txt_exports;
export { page };
