// node_modules/emdash/dist/site-title-DHgWlyMw.mjs
/** Prefer the General settings title, falling back to the title recorded during setup. */
function resolveSiteTitle(setting, setupTitle) {
	if (typeof setting === "string" && setting) return setting;
	if (typeof setupTitle === "string" && setupTitle) return setupTitle;
}
async function getSiteTitle(options) {
	const titles = await options.getMany(["site:title", "emdash:site_title"]);
	return resolveSiteTitle(titles.get("site:title"), titles.get("emdash:site_title"));
}
export { resolveSiteTitle as n, getSiteTitle as t };
