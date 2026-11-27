// node_modules/emdash/dist/config-Cs_AwWXI.mjs
var LOCALE_CODE_PATTERN = /^[a-z]{2,3}(-[a-z0-9]{2,8})*$/i;
var I18N_CONFIG_KEY = Symbol.for("emdash:i18n-config");
function configStore() {
	return globalThis;
}
/**
* Initialize i18n config from virtual module data.
* Called during runtime initialization.
*/
function setI18nConfig(config) {
	configStore()[I18N_CONFIG_KEY] = config;
}
/**
* Get the current i18n config.
* Returns null if i18n is not configured.
*/
function getI18nConfig() {
	return configStore()[I18N_CONFIG_KEY] ?? null;
}
/** Match a locale path or Astro code to the canonical content locale. */
function resolveConfiguredLocale(locale, config = getI18nConfig()) {
	const configured = config?.locales.find((candidate) => candidate.toLowerCase() === locale.toLowerCase());
	if (configured) return configured;
	const aliased = Object.entries(config?.localeAliases ?? {}).find(([code]) => code.toLowerCase() === locale.toLowerCase())?.[1];
	if (aliased === void 0) return locale;
	return config?.locales.find((candidate) => candidate.toLowerCase() === aliased.toLowerCase()) ?? aliased;
}
/** Stored locale spellings for one configured locale, in read-preference order. */
function getLocaleCandidates(locale) {
	const canonical = resolveConfiguredLocale(locale);
	const candidates = [canonical];
	const seen = /* @__PURE__ */ new Set([canonical.toLowerCase()]);
	for (const code of Object.keys(getI18nConfig()?.localeAliases ?? {})) if (resolveConfiguredLocale(code) === canonical && !seen.has(code.toLowerCase())) {
		candidates.push(code);
		seen.add(code.toLowerCase());
	}
	return candidates;
}
/** Rank a stored row's locale for a lookup by path or code. */
function getLocaleRank(stored, requested) {
	const candidates = getLocaleCandidates(requested);
	const rank = candidates.findIndex((candidate) => candidate.toLowerCase() === stored.toLowerCase());
	return rank === -1 ? candidates.length : rank;
}
/** Rank stored locale variants before moving to the next fallback locale. */
function getLocaleChainRank(stored, chain) {
	let offset = 0;
	for (const locale of chain) {
		const candidates = getLocaleCandidates(locale);
		const rank = getLocaleRank(stored, locale);
		if (rank < candidates.length) return offset + rank;
		offset += candidates.length;
	}
	return offset;
}
/** Whether a string matches the locale-code subset accepted by EmDash. */
function isValidLocaleCode(locale) {
	return LOCALE_CODE_PATTERN.test(locale);
}
/** Resolve the locale for a new content row. */
function resolveContentCreateLocale(locale, config = getI18nConfig()) {
	if (locale !== void 0) {
		if (typeof locale !== "string") throw new Error("Invalid locale code: expected a string");
		const configured = resolveConfiguredLocale(locale, config);
		if (config?.locales.includes(configured)) return configured;
		if (!isValidLocaleCode(locale)) throw new Error(`Invalid locale code: "${locale}"`);
		if (config) throw new Error(`Locale "${locale}" is not configured for this site`);
		return locale;
	}
	return config?.defaultLocale ?? "en";
}
/**
* Check if i18n is enabled.
* Returns true when multiple locales are configured.
*/
function isI18nEnabled() {
	const config = getI18nConfig();
	return config != null && config.locales.length > 1;
}
/**
* Resolve fallback locale chain for a given locale.
* Returns array of locales to try, from most preferred to least.
* Always ends with defaultLocale.
*/
function getFallbackChain(locale) {
	const config = getI18nConfig();
	if (!config) return [locale];
	locale = resolveConfiguredLocale(locale, config);
	const chain = [locale];
	let current = locale;
	const visited = /* @__PURE__ */ new Set([locale]);
	while (config.fallback?.[current]) {
		const next = resolveConfiguredLocale(config.fallback[current], config);
		if (visited.has(next)) break;
		chain.push(next);
		visited.add(next);
		current = next;
	}
	if (!visited.has(config.defaultLocale)) chain.push(config.defaultLocale);
	return chain;
}
export { getLocaleChainRank as a, isValidLocaleCode as c, setI18nConfig as d, getLocaleCandidates as i, resolveConfiguredLocale as l, getFallbackChain as n, getLocaleRank as o, getI18nConfig as r, isI18nEnabled as s, LOCALE_CODE_PATTERN as t, resolveContentCreateLocale as u };
