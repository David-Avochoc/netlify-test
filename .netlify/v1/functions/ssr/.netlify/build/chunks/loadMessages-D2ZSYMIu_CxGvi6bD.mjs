// node_modules/@emdash-cms/admin/dist/locales-BXI6DeJs.js
/**
* All locales that have (or should have) a PO catalog.
* First entry is the source/default locale.
*/
var LOCALES = [
	{
		code: "en",
		label: "English",
		enabled: true
	},
	{
		code: "ar",
		label: "العربية",
		enabled: true,
		dir: "rtl",
		dateLocale: () => import("react-day-picker/locale/ar").then((m) => m.ar)
	},
	{
		code: "eu",
		label: "Euskara",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/eu").then((m) => m.eu)
	},
	{
		code: "bn",
		label: "বাংলা",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/bn").then((m) => m.bn)
	},
	{
		code: "ca",
		label: "Català",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/ca").then((m) => m.ca)
	},
	{
		code: "zh-CN",
		label: "简体中文",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/zh-CN").then((m) => m.zhCN)
	},
	{
		code: "zh-TW",
		label: "繁體中文",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/zh-TW").then((m) => m.zhTW)
	},
	{
		code: "hr",
		label: "Hrvatski",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/hr").then((m) => m.hr)
	},
	{
		code: "cs",
		label: "Čeština",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/cs").then((m) => m.cs)
	},
	{
		code: "da",
		label: "Dansk",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/da").then((m) => m.da)
	},
	{
		code: "nl",
		label: "Nederlands",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/nl").then((m) => m.nl)
	},
	{
		code: "en-GB",
		label: "English (UK)",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/en-GB").then((m) => m.enGB)
	},
	{
		code: "fa",
		label: "فارسی",
		enabled: true,
		dir: "rtl",
		dateLocale: () => import("react-day-picker/locale/fa-IR").then((m) => m.faIR)
	},
	{
		code: "fr",
		label: "Français",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/fr").then((m) => m.fr)
	},
	{
		code: "ka",
		label: "ქართული",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/ka").then((m) => m.ka)
	},
	{
		code: "de",
		label: "Deutsch",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/de").then((m) => m.de)
	},
	{
		code: "he",
		label: "עברית",
		enabled: true,
		dir: "rtl",
		dateLocale: () => import("react-day-picker/locale/he").then((m) => m.he)
	},
	{
		code: "hi",
		label: "हिन्दी",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/hi").then((m) => m.hi)
	},
	{
		code: "hu",
		label: "Magyar",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/hu").then((m) => m.hu)
	},
	{
		code: "id",
		label: "Bahasa Indonesia",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/id").then((m) => m.id)
	},
	{
		code: "it",
		label: "Italiano",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/it").then((m) => m.it)
	},
	{
		code: "ja",
		label: "日本語",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/ja").then((m) => m.ja)
	},
	{
		code: "ko",
		label: "한국어",
		enabled: false,
		dateLocale: () => import("react-day-picker/locale/ko").then((m) => m.ko)
	},
	{
		code: "lt",
		label: "Lietuvių",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/lt").then((m) => m.lt)
	},
	{
		code: "nb",
		label: "Norsk bokmål",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/nb").then((m) => m.nb)
	},
	{
		code: "pl",
		label: "Polski",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/pl").then((m) => m.pl)
	},
	{
		code: "pt-BR",
		label: "Português (Brasil)",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/pt-BR").then((m) => m.ptBR)
	},
	{
		code: "pt-PT",
		label: "Português (Portugal)",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/pt").then((m) => m.pt)
	},
	{
		code: "ru",
		label: "Русский",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/ru").then((m) => m.ru)
	},
	{
		code: "sr-Latn",
		label: "Srpski",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/sr-Latn").then((m) => m.srLatn)
	},
	{
		code: "es-419",
		label: "Español (Latinoamérica)",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/es").then((m) => m.es)
	},
	{
		code: "es-ES",
		label: "Español (España)",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/es").then((m) => m.es)
	},
	{
		code: "sv",
		label: "Svenska",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/sv").then((m) => m.sv)
	},
	{
		code: "th",
		label: "ไทย",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/th").then((m) => m.th)
	},
	{
		code: "tr",
		label: "Türkçe",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/tr").then((m) => m.tr)
	},
	{
		code: "uk",
		label: "Українська",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/uk").then((m) => m.uk)
	},
	{
		code: "vi",
		label: "Tiếng Việt",
		enabled: true,
		dateLocale: () => import("react-day-picker/locale/vi").then((m) => m.vi)
	},
	{
		code: "pseudo",
		label: "Pseudo",
		enabled: false
	}
];
/** The source locale (first entry). */
var SOURCE_LOCALE = LOCALES[0];
LOCALES.map((l) => l.code);
LOCALES.slice(1);
/** Locales enabled in the admin UI. */
var ENABLED_LOCALES = LOCALES.filter((l) => l.enabled);
// node_modules/@emdash-cms/admin/dist/locales/config.js
/**
* Locale configuration for the admin UI runtime.
*
* Locale definitions are in `./locales.ts` -- the single source of truth
* shared by this file, lingui.config.ts and lunaria.config.ts.
*/
function isValidLocale(code) {
	try {
		return new Intl.Locale(code).baseName !== "";
	} catch {
		return false;
	}
}
function isAllowedLocale(code) {
	return true;
}
/** Available locales at runtime, validated against BCP 47. */
var SUPPORTED_LOCALES = [...ENABLED_LOCALES.filter((l) => isValidLocale(l.code) && isAllowedLocale(l.code)), ...[]];
var SUPPORTED_LOCALE_CODES = new Set(SUPPORTED_LOCALES.map((l) => l.code));
var DEFAULT_LOCALE = SOURCE_LOCALE.code;
/** Maps base language codes to supported locales (e.g. "pt" -> "pt-BR"). */
var BASE_LANGUAGE_MAP = /* @__PURE__ */ new Map();
/** Maps script codes to supported locales (e.g. "zh-Hant" -> "zh-TW", "zh-Hans" -> "zh-CN"). */
var SCRIPT_LANGUAGE_MAP = /* @__PURE__ */ new Map();
for (const l of SUPPORTED_LOCALES) {
	const base = l.code.split("-")[0].toLowerCase();
	if (!BASE_LANGUAGE_MAP.has(base)) BASE_LANGUAGE_MAP.set(base, l.code);
	const maximized = new Intl.Locale(l.code).maximize();
	if (maximized.script) {
		const scriptKey = `${maximized.language}-${maximized.script}`.toLowerCase();
		if (!SCRIPT_LANGUAGE_MAP.has(scriptKey)) SCRIPT_LANGUAGE_MAP.set(scriptKey, l.code);
	}
}
/**
* Find the best matching supported locale for a BCP 47 tag.
* Canonicalizes via Intl.Locale so case differences (e.g. "pt-br" vs "pt-BR")
* don't prevent matching. Supports script codes (zh-Hant -> zh-TW, zh-Hans -> zh-CN)
* and falls back to base language (pt-PT -> pt-BR).
*/
function matchLocale(tag) {
	const trimmed = tag.trim();
	if (!trimmed) return void 0;
	let canonical;
	try {
		canonical = new Intl.Locale(trimmed).baseName;
	} catch {
		return;
	}
	if (SUPPORTED_LOCALE_CODES.has(canonical)) return canonical;
	const locale = new Intl.Locale(trimmed);
	if (locale.script) {
		const scriptKey = `${locale.language}-${locale.script}`.toLowerCase();
		const scriptMatch = SCRIPT_LANGUAGE_MAP.get(scriptKey);
		if (scriptMatch) return scriptMatch;
	}
	const base = canonical.split("-")[0].toLowerCase();
	return BASE_LANGUAGE_MAP.get(base);
}
new Map(SUPPORTED_LOCALES.map((l) => [l.code.toLowerCase(), l.label]));
var LOCALE_DIRS = new Map(SUPPORTED_LOCALES.map((l) => [l.code, l.dir]));
/** Get the text direction for a locale code. Defaults to "ltr" if not specified. */
function getLocaleDir(code) {
	return LOCALE_DIRS.get(code) ?? "ltr";
}
var LOCALE_COOKIE_RE = /(?:^|;\s*)emdash-locale=([^;]+)/;
/**
* Resolve the admin locale from a Request.
* Priority: emdash-locale cookie -> Accept-Language -> DEFAULT_LOCALE.
*/
function resolveLocale(request) {
	const cookieLocale = (request.headers.get("cookie") ?? "").match(LOCALE_COOKIE_RE)?.[1]?.trim() ?? "";
	if (SUPPORTED_LOCALE_CODES.has(cookieLocale)) return cookieLocale;
	const acceptLang = request.headers.get("accept-language") ?? "";
	for (const entry of acceptLang.split(",")) {
		const matched = matchLocale(entry.split(";")[0].trim());
		if (matched) return matched;
	}
	return DEFAULT_LOCALE;
}
// node_modules/@emdash-cms/admin/dist/loadMessages-D2ZSYMIu.js
var LOCALE_LOADERS = /* @__PURE__ */ Object.assign({
	"./ar/messages.mjs": () => import("./messages-BFP27cPa_B7AYPVTu.mjs"),
	"./bn/messages.mjs": () => import("./messages-D54_G1T3_WfaDB-gw.mjs"),
	"./ca/messages.mjs": () => import("./messages-Cr2O9X1x_phYREuLd.mjs"),
	"./cs/messages.mjs": () => import("./messages-DYDRsTz5_tpKsu1El.mjs"),
	"./da/messages.mjs": () => import("./messages-DG2iG_JJ_DnO1G1dd.mjs"),
	"./de/messages.mjs": () => import("./messages-CM44V0y5_DwGLKUae.mjs"),
	"./en/messages.mjs": () => import("./messages-BF8xdAI8_C8favbQg.mjs"),
	"./en-GB/messages.mjs": () => import("./messages-DPKn9QIg_D2vwMeD1.mjs"),
	"./es-419/messages.mjs": () => import("./messages-Cw269vbh_D52pknbh.mjs"),
	"./es-ES/messages.mjs": () => import("./messages-Ctd2bivK_CCBUyGLx.mjs"),
	"./eu/messages.mjs": () => import("./messages-x6Xf5V88_C3FSTONC.mjs"),
	"./fa/messages.mjs": () => import("./messages-B8ZeAA8U_BoE84-sl.mjs"),
	"./fr/messages.mjs": () => import("./messages-sxm3cgp-_C7kTyZhl.mjs"),
	"./he/messages.mjs": () => import("./messages-uyeoSi8t_BgEaNST2.mjs"),
	"./hi/messages.mjs": () => import("./messages-DWZv8MVZ_CEDC0pj3.mjs"),
	"./hr/messages.mjs": () => import("./messages-BZZGBbQ5_DybqyILG.mjs"),
	"./hu/messages.mjs": () => import("./messages-CFWDZ27W_uQ4xbAbM.mjs"),
	"./id/messages.mjs": () => import("./messages-B_vZoujn_Cafn0SaN.mjs"),
	"./it/messages.mjs": () => import("./messages-uFomUl-W_CqVEfos4.mjs"),
	"./ja/messages.mjs": () => import("./messages-YOQUrrdZ_DuSc61GG.mjs"),
	"./ka/messages.mjs": () => import("./messages-6Qw3S1f6_DXUvKDni.mjs"),
	"./ko/messages.mjs": () => import("./messages-cVoGTRl2_Dpcr7QJp.mjs"),
	"./lt/messages.mjs": () => import("./messages-C1gFepcH_DNHmKeX_.mjs"),
	"./nb/messages.mjs": () => import("./messages-DIUd7tWg_DW-O7vqW.mjs"),
	"./nl/messages.mjs": () => import("./messages-BefYD9qF_B6gfUWXL.mjs"),
	"./pl/messages.mjs": () => import("./messages-DdtLUflK_CMfKSXTB.mjs"),
	"./pseudo/messages.mjs": () => import("./messages-BxNTk-gk_4xn5oRn_.mjs"),
	"./pt-BR/messages.mjs": () => import("./messages-DqXefsCH_mwOvYP_E.mjs"),
	"./pt-PT/messages.mjs": () => import("./messages-CWO2az5c_DzpOJ31X.mjs"),
	"./ru/messages.mjs": () => import("./messages-BHPvHMBG_YPixY5ul.mjs"),
	"./sr-Latn/messages.mjs": () => import("./messages-BC2Kjxql_Bk3FRkjV.mjs"),
	"./sv/messages.mjs": () => import("./messages-C_mvBelI_YW7KmlO6.mjs"),
	"./th/messages.mjs": () => import("./messages-DZE2Fcoe_Dd7lhcnJ.mjs"),
	"./tr/messages.mjs": () => import("./messages-DPXp_0fz_zuAidfo7.mjs"),
	"./uk/messages.mjs": () => import("./messages-BKtU2A41_4UlULlAA.mjs"),
	"./vi/messages.mjs": () => import("./messages-CV-A5Rwg_DezAHrMX.mjs"),
	"./zh-CN/messages.mjs": () => import("./messages-DWVuRRpI_Br5-4Xdj.mjs"),
	"./zh-TW/messages.mjs": () => import("./messages-CfsdrLwV_D_-ku72u.mjs")
});
async function loadMessages(locale) {
	const key = `./${locale}/messages.mjs`;
	const fallbackKey = `./${DEFAULT_LOCALE}/messages.mjs`;
	const loader = LOCALE_LOADERS[key] ?? LOCALE_LOADERS[fallbackKey];
	if (!loader) throw new Error(`No locale catalog found for "${locale}" or "${DEFAULT_LOCALE}". Run \`pnpm locale:compile\` to generate catalogs.`);
	const { messages } = await loader();
	return messages;
}
export { resolveLocale as i, getLocaleDir as n, matchLocale as r, loadMessages as t };
