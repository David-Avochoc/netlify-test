import { t as __exportAll } from "./chunks/rolldown-runtime_D3KUYPsf.mjs";
import { k as defineMiddleware, t as sequence } from "./chunks/sequence_Bnj7VMng.mjs";
import { n as isMissingColumnError, r as isMissingTableError } from "./chunks/db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { a as getLocaleChainRank, d as setI18nConfig, l as resolveConfiguredLocale, o as getLocaleRank, r as getI18nConfig, s as isI18nEnabled, u as resolveContentCreateLocale } from "./chunks/config-Cs_AwWXI_t21XF43J.mjs";
import { d as isSqlite, g as listTablesLike, w as validateIdentifier } from "./chunks/dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { a as createDeferredTaskTracker, i as runWithContext, n as createRequestMetrics, r as getRequestContext, t as after } from "./chunks/after-B8cG5P6f_CIVXcY7f.mjs";
import { n as localeMatches } from "./chunks/query-EVjg8-Bq_DkE4zw_B.mjs";
import { _ as isObjectCacheActive, a as contentCacheNamespaces, c as getLastContentWriteAt, n as cachedQuery, r as cachedQueryWithEpochs, t as CacheNamespace } from "./chunks/object-cache-I4Re7BOR_CyRvBWDi.mjs";
import { t as chunks } from "./chunks/chunks-CvgCLYip_BPNjBngy.mjs";
import { i as setRequestCacheEntry, n as peekRequestCache, r as requestCached } from "./chunks/request-cache-BYMs-BGX_Ol4MyTL8.mjs";
import { i as sanitizeHref } from "./chunks/url-BVdd-tah_7QjS1g7o.mjs";
import { a as resolveLocalizedContentRoutePath, i as resolveLocaleChain, r as resolveLocale, t as interpolateUrlPattern } from "./chunks/resolve-Z5YK_6ew_C3Nw14z1.mjs";
import { C as selectTaxonomyDefs, D as isInstrumentationEnabled, E as flushRecorder, O as kyselyLogOption, T as createRecorder, p as getDb } from "./chunks/loader-DF6J1Fpd_Di1oQrTQ.mjs";
import { Kysely, sql } from "kysely";
import { a as resolveSecretsCached, n as markRequestScopedDb, o as validateEncryptionKeyAtStartup } from "./chunks/secrets-O25WpEe__B3AoQE_o.mjs";
import { n as initWithLock, t as createInitLock } from "./chunks/init-lock-Dn7efXfy_Vmo8eJzl.mjs";
import { i as storageKeyFromLocalMediaFileUrl, n as createPublicMediaUrlResolver } from "./chunks/url-CBR5ZBBQ_DuCAEm0Z.mjs";
import { t as apiError } from "./chunks/error-0Y0dFPxm_D68N8-KM.mjs";
import { S as EmDashStorageError, a as getStorageIndexDefinitions, b as getSandboxRouteErrorDetails, i as generateIndexName, m as loadBundleFromR2, v as syncDeclaredStorageIndexes, y as SandboxUnavailableError } from "./chunks/marketplace-D9fChLav_DPvHsZ-B.mjs";
import { c as invalidateUrlPatternCache } from "./chunks/query-CslUTGOV_Dwc0aJYy.mjs";
import { c as isMigrationCountCurrent, i as MigrationRowLimitError, l as runMigrations, n as MigrationFailedError, o as getAppliedMigrationCount, r as MigrationLockHeldError, s as getExactMigrationStatus, t as MIGRATION_RACE_WAIT_MS } from "./chunks/runner-Nv0yWP-G_mZbAgbBU.mjs";
import { t as OptionsRepository } from "./chunks/options-CMocxAku_DSFt3m7b.mjs";
import { n as decodeBase64Bytes } from "./chunks/base64-GXviT28w_CJsXkxay.mjs";
import { r as singleFlightCached, t as createSingleFlightCache } from "./chunks/single-flight-cache-BCP1Tvcm_BRMod6Xz.mjs";
import { a as isSystemOrderField, i as findTypesWithDueContent, o as keepKnownFields, r as findNextScheduledAt, s as staleStoredKeys, t as ContentRepository } from "./chunks/content-2gjSbGP3_DRBiG6uA.mjs";
import { n as roomId, t as RoomSaveError } from "./chunks/types-D2zSjG0c_DDfeE_GP.mjs";
import { i as notifyRoom, t as withTransaction } from "./chunks/transaction-D5Kq7MTL_B_3_YVm2.mjs";
import { l as isStoragelessField, u as isStoragelessFieldRow } from "./chunks/types-BmBK2cqf_DwQUyWfv.mjs";
import { a as InvalidCursorError, c as ScheduledNotDueError, i as EmDashValidationError, n as ContentMutationConflictError, r as ContentSlugConflictError, t as ContentCollectionNotFoundError } from "./chunks/types-BBH-w_KS_DiGw3TjO.mjs";
import { n as RevisionRepository } from "./chunks/revision-Dk9VI8Vf_CW3Z7_ck.mjs";
import { n as activateMediaUsageCapture } from "./chunks/activation-BRmrunZ3_BFONje3D.mjs";
import { n as MediaUsageRepository, t as MediaRepository } from "./chunks/media--P-IEycF_BxdQj7uT.mjs";
import { t as CommentRepository } from "./chunks/comment-C163Gl_4_Di-OF6ER.mjs";
import { t as AuditRepository } from "./chunks/audit-T3NRtoQ5_BnilMtF3.mjs";
import { a as toRouteCallerInfo, c as createCommentAccess, d as toBylineInfo, f as updatePluginMediaMetadata, l as createSiteInfo, n as buildRouteMeta, o as PluginContextFactory, r as parseRouteInput, s as SeoRepository, t as PluginRouteRegistry, u as createTaxonomyAccessWithWrite } from "./chunks/routes-BScyES_G_D2rFeUGB.mjs";
import { r as redirectPathVariants, t as RedirectRepository } from "./chunks/redirect-DsaFuuQi_BGrUXAuv.mjs";
import { t as BylineRepository } from "./chunks/byline-BufjxQyd_CopmbbPN.mjs";
import { a as mergeStagedReferences, c as readStagedReferences, i as mergeStagedReferenceBaselines, n as STAGED_REFERENCES_BASELINE_KEY, o as pageStagedGroups, r as STAGED_REFERENCES_KEY, s as readStagedReferenceBaselines, t as RelationRepository } from "./chunks/staged-C746SkS0_9ePIrr-5.mjs";
import { n as normalizeMediaValue } from "./chunks/normalize-qcU0SKGf_BkffD2dJ.mjs";
import { a as resolveUploadMimeType, i as parseAllowedMimeTypes, n as matchesMimeAllowlist, r as normalizeMime } from "./chunks/mime-C_YV5Mjm_puGdJELd.mjs";
import { t as enrichImageMetadata } from "./chunks/enrich-C4vKniyi_C9GKhuCi.mjs";
import { a as toScheduledRejectionReason, i as scheduledPolicyRejectionKey, n as inspectContentPolicyDecision } from "./chunks/content-policy-Drm9sqdA_3UgDLujw.mjs";
import { t as FTSManager } from "./chunks/fts-manager-m8GPxogO_D404Fnp6.mjs";
import { r as primeRegisteredCollections } from "./chunks/collection-slugs-cache-CLR_8fY5_ER7bATF2.mjs";
import { n as encodeRev, r as validateRev, t as decodeRev } from "./chunks/rev-B6HS7337_Ku3QmQc2.mjs";
import { A as markContentMediaUsageCollectionStale, C as findNonTranslatableSiblingContentIds, I as refreshContentMediaUsageAfterWrite, P as processMediaUsageWorkAfterWrite, W as isPortableTextVideoBlock, l as SchemaError, t as BlockTypeRegistry, u as SchemaRegistry, v as deleteContentMediaUsage } from "./chunks/registry-CSLrHSx1_Ce4dsyNi.mjs";
import { n as computeContentHash, r as hashString } from "./chunks/hash-SY9Nq5FH_BcfKQxdw.mjs";
import { n as getSiteBaseUrl, r as resolveSiteOrigin } from "./chunks/site-url-OBYES-gb_Co1gxb5_.mjs";
import { a as resolveBlockTypes, i as normalizeBlocksData, n as expandCollectionBlockFields, r as inferBlockTypes } from "./chunks/block-values-BRJZHvF4_wWn_DJi-.mjs";
import { _ as validateReferenceSelection, d as resolveEntries, f as resolveEntryGroups, g as validateOppositeSideLimit, i as handleReferenceParentsGet, m as resolveReferenceSelectionTargets, n as getReferenceTitleField, p as resolveReferenceSelection, r as handleReferenceChildrenGet, u as referenceFieldConstraints, v as validateRequiredReferencesPresent, y as writeReferenceSelection } from "./chunks/relations-5fVj42fZ_Cw6otGYO.mjs";
import { t as UserRepository } from "./chunks/user-Cy4kOmtD_CPESG2fx.mjs";
import { t as TaxonomyRepository } from "./chunks/taxonomy-D4Fl2smf_D54uY0xV.mjs";
import { t as EntryLockRepository } from "./chunks/entry-locks-B58Q9LZh_hJO7gH4L.mjs";
import { i as matchCachedPatterns, n as invalidateRedirectCache, r as loadCachedRedirects } from "./chunks/cache-LOb3NthC_DQ5z8TRI.mjs";
import { n as createRedirectSource, r as publishRedirectChanges } from "./chunks/artifacts-a_0bb4Ks_Aqkp42Js.mjs";
import { f as invalidateTermCache, o as getTaxonomyDefs, s as getTaxonomyTerms } from "./chunks/taxonomies-DApyZAJq_ChSZiGZH.mjs";
import { n as normalizePluginCapabilities, r as warnDeprecatedPluginCapabilities } from "./chunks/types-C3tTVw9y_CtRbxQ8e.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
import { PLUGIN_CAPABILITIES, isJsonPostRouteContract } from "@emdash-cms/plugin-types";
import { n as recordSchedulerHeartbeatSafely } from "./chunks/scheduler-health-B5n19775_DwF6ImgT.mjs";
import { o as resolveManifestRegistryConfig, r as getRegistryConfigInput } from "./chunks/config-DeluGa9H_Db3EBMuk.mjs";
import { n as VERSION, t as COMMIT } from "./chunks/version-BE4RahxC_p74BLWtq.mjs";
import { r as mapErrorStatus, t as ErrorCode } from "./chunks/errors-OTWh4SC__BXZuc-yp.mjs";
import { t as removeUploadAttempt } from "./chunks/upload-attempts-ChkgAfye_aRceFGs3.mjs";
import { a as handleMediaRegisterUpload, i as handleMediaList, n as handleMediaDelete, o as handleMediaReplaceMetadata, r as handleMediaGet, s as handleMediaUpdate, t as handleMediaCreate } from "./chunks/media-CTA82rU1_Ml7Nxoz1.mjs";
import { t as PluginStateRepository } from "./chunks/state-Cdkt6b1h_DPYKkuog.mjs";
import { a as getSiteSettings, c as invalidateSiteSettingsCache, l as invalidateSiteSettingsSnapshot, p as isRecord$3, u as peekSiteSettingsSnapshot } from "./chunks/settings-BApLX_aS_DL4S1VIP.mjs";
import { a as readSiteWriteFence, n as assertSiteWriteAllowed, o as recordSiteWrite } from "./chunks/fence-CkdbSoZX_DNtaDXEC.mjs";
import { i as normalizeManifestRoute$1, r as normalizeManifestHook, t as HOOK_NAMES } from "./chunks/manifest-schema-Pi_JP_Wi_nE6LF1Jl.mjs";
import { r as formatFileSize, t as CONTENT_TYPE_RE } from "./chunks/media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { n as safeJsonSchemaToZod, t as adaptSandboxEntry } from "./chunks/adapt-sandbox-entry_Cd0sdcFl.mjs";
import { t as getTrustedProxyHeaders } from "./chunks/trusted-proxy-DaSru7xW_s31QftBx.mjs";
import { n as sanitizeHeadersForSandbox, t as extractRequestMeta } from "./chunks/request-meta-B0TPrDpq_CQqqLgAB.mjs";
import { t as GLOBAL_UPLOAD_ALLOWLIST } from "./chunks/media-allowlist-C_kSleFj_alAAF99-.mjs";
import { f as mediaCacheTag, s as isCacheableMediaKey } from "./chunks/image-endpoint_CAMLdpZa.mjs";
import { n as CronExecutor, r as setCronTasksEnabled } from "./chunks/cron-DEV8oz3R_DHNgvWvU.mjs";
import { i as toRoleLevel } from "./chunks/types-ndj-bYfi_AO2tfJCj.mjs";
import { t as PluginRouteRequestError } from "./chunks/route-wire-NAkNES3Z_Cu4uuxmF.mjs";
import { n as saveContent, t as overlayDraft } from "./chunks/content-save-BKDTKmkx_YSPUOBA2.mjs";
import { n as resolveSiteTitle } from "./chunks/site-title-DHgWlyMw_DJ5qOvwi.mjs";
import { t as getAuthMode } from "./chunks/mode-D6Qg_-2J_D3bpCne5.mjs";
import { n as sendCommentNotification, r as submitPublicComment, t as lookupContentAuthor } from "./chunks/public-submission-BEcSmcWi_CSmtr2Tq.mjs";
import { t as pluginToolName } from "./chunks/plugin-tool-name-CCXxYq3K_B9E0ANPy.mjs";
import { c as maybeRunScheduledBackup } from "./chunks/backup-GBRxixs1_CWxMkpt7.mjs";
import { t as ACCESS_TOKEN_TTL_SECONDS } from "./chunks/api-tokens-B-p5eI6J_DS3XW82T.mjs";
import { t as cleanupExpiredChallenges } from "./chunks/challenge-store-B0PoBBqW_BxsHW0tI.mjs";
import { n as createComment, r as moderateComment, t as CommentStatusConflictError } from "./chunks/service-DbKGSUHC_U1mO66WU.mjs";
import { i as isSmtpEnvConfigured, r as createSmtpEmailDeliverFromDb, t as SMTP_EMAIL_PLUGIN_ID } from "./chunks/email-smtp-CE6nESRL_C41HBcgp.mjs";
import { n as enableRuntimePlugin, t as disableRuntimePlugin } from "./chunks/lifecycle-1Nl01SeB_BHPxK5pZ.mjs";
import { z } from "zod";
import * as path from "node:path";
import { ulid } from "ulidx";
import { i as Permissions } from "./chunks/dist__l0ohBBn.mjs";
import { t as config_default } from "./chunks/config_B1NN09mD.mjs";
import "./chunks/locales_D0fXeBVw.mjs";
import { normalizePluginPagePath, validateBlockResponse, validateContentEditorActionResponse } from "@emdash-cms/blocks/server";
import { t as createKyselyAdapter } from "./chunks/kysely_pDtYrmXS.mjs";
import { t as parseCollectionSitemapName } from "./chunks/sitemap-name-BZXv5sf0_Dd0WovkV.mjs";
import { t as getWidgetAreas } from "./chunks/widgets-HYhp_QtR_BvyFPnbA.mjs";
import { n as resolveSessionUser } from "./chunks/session-user-BrCPLyWB_B1TZCa32.mjs";
import { i as resolveLocale$1, n as getLocaleDir } from "./chunks/loadMessages-D2ZSYMIu_CxGvi6bD.mjs";
import { n as createRequestScopedDb, t as createDialect } from "./chunks/dialect_CHjhlvfv.mjs";
import { t as mediaProviders } from "./chunks/media-providers_lz4ePGJr.mjs";
import { n as createNoopSandboxRunner, t as NodeCronScheduler } from "./chunks/dist_D2Vaghlj.mjs";
import { n as resolveByteRange } from "./chunks/range-CzdsIs-O_F3NExglN.mjs";
import mime from "mime/lite";
import { createReadStream, existsSync } from "node:fs";
import * as fs from "node:fs/promises";
import { Readable } from "node:stream";
import { t as isSiteRelativeDestination } from "./chunks/destination-BNL1K7Mz_BWISQ04N.mjs";
import { r as isTerminalStatus } from "./chunks/status-vvme29qV_DggpgIhl.mjs";
import { r as getPublicOrigin } from "./chunks/public-url-DYZMfvpa_vtmjwIux.mjs";
import { f as hasScope, r as TRANSFER_SCOPES } from "./chunks/passkey_BrGsIm4_.mjs";
import { a as resolveOAuthToken, i as resolveApiToken } from "./chunks/api-tokens-BIwfh_Ke_CfLteyeO.mjs";
import "./chunks/start-user-session-CdyNie0P_D3BXuQ7j.mjs";
import { n as parseContentId, r as verifyPreviewToken } from "./chunks/tokens-DvEbszXd_DfSr40ny.mjs";
import { t as escapeHtml } from "./chunks/escape-YSAGQRHa_BZcHb96L.mjs";
import { n as generateVisualEditingActionToken, t as VISUAL_ACTION_TOKEN_INVALID } from "./chunks/action-token-DyXQ5VhB_m21ar3Pc.mjs";
import { t as loadVisualEditingToolbarLabels } from "./chunks/server_DQMhNxoo.mjs";
// node_modules/emdash/dist/menus-BzjHvAM4.mjs
/** A configuration failure whose message is safe to return from the API. */
var EmDashConfigurationError = class extends Error {
	constructor(message, code, cause) {
		super(message);
		this.code = code;
		this.cause = cause;
		this.name = "EmDashConfigurationError";
	}
};
/** Per isolate: the namespaces each resolved menu was last cached under. */
var LAST_RESOLVED_NAMESPACES_KEY = Symbol.for("emdash:menu-resolved-namespaces");
var lastResolvedNamespaces = globalThis[LAST_RESOLVED_NAMESPACES_KEY] ?? (() => {
	const map = /* @__PURE__ */ new Map();
	globalThis[LAST_RESOLVED_NAMESPACES_KEY] = map;
	return map;
})();
/**
* Get a menu by name with resolved URLs.
*
* @example
* ```ts
* const menu = await getMenu("primary");
* const menuEs = await getMenu("primary", { locale: "es" });
* ```
*/
async function getMenu(name, options = {}) {
	const locale = resolveLocale(options.locale);
	const trailingSlash = options.trailingSlash ?? await getHostTrailingSlash();
	const key = `${name}:${locale ?? "*"}:${trailingSlash}`;
	return requestCached(`menu:${key}`, async () => {
		if (!await isObjectCacheActive()) return getMenuWithDb(name, await getDb(), {
			locale,
			trailingSlash
		});
		const readRows = async () => {
			let epoch;
			return {
				rows: await cachedQueryWithEpochs({
					namespace: CacheNamespace.MENUS,
					key: `rows:${name}:${locale ?? "*"}`,
					load: async () => loadMenuRows(name, await getDb(), locale),
					onEpochs: ([menus]) => {
						epoch = menus;
					}
				}),
				epoch
			};
		};
		const remembered = lastResolvedNamespaces.get(key);
		const earlyRead = remembered ? void 0 : await readRows();
		const namespaces = remembered ?? (earlyRead?.rows && resolvedMenuNamespaces(earlyRead.rows.items));
		if (!namespaces) return null;
		let resolvedEpoch;
		let loaded;
		const menu = await cachedQueryWithEpochs({
			namespace: namespaces,
			key,
			onEpochs: ([menus]) => {
				resolvedEpoch = menus;
			},
			load: async () => {
				const { rows } = earlyRead && earlyRead.epoch === resolvedEpoch ? earlyRead : await readRows();
				if (!rows) return null;
				loaded = resolvedMenuNamespaces(rows.items);
				return resolveMenu(rows, await getDb(), trailingSlash);
			},
			cacheable: (value) => value !== null && sameNamespaces(loaded, namespaces)
		});
		if (menu) lastResolvedNamespaces.set(key, loaded ?? namespaces);
		else lastResolvedNamespaces.delete(key);
		return menu;
	});
}
/**
* Object-cache namespaces for a resolved menu: the menu epoch plus the content
* epoch of every collection its items link to, and the taxonomy epoch when it
* links to terms. Which links resolve depends on those rows, so publishing,
* unpublishing, or trashing a linked entry invalidates the cached menu.
*/
function resolvedMenuNamespaces(items) {
	const namespaces = [CacheNamespace.MENUS];
	for (const collection of collectContentReferences(items).keys()) namespaces.push(...contentCacheNamespaces(collection));
	if (items.some((item) => item.type === "taxonomy" && item.reference_id)) namespaces.push(CacheNamespace.TAXONOMIES);
	return namespaces;
}
function sameNamespaces(a, b) {
	return a !== void 0 && a.length === b.length && a.every((namespace, i) => namespace === b[i]);
}
async function getHostTrailingSlash() {
	try {
		return (await import("./chunks/config_DdkuzFmo.mjs")).default?.trailingSlash ?? "ignore";
	} catch {
		return "ignore";
	}
}
/**
* Get menu by name with resolved URLs (with explicit db). Internal helper for
* admin routes that already have a database handle.
*/
async function getMenuWithDb(name, db, options = {}) {
	const rows = await loadMenuRows(name, db, options.locale);
	return rows && resolveMenu(rows, db, options.trailingSlash);
}
async function loadMenuRows(name, db, requestedLocale) {
	const chain = resolveLocaleChain(requestedLocale);
	let query = db.selectFrom("_emdash_menus as m").leftJoin("_emdash_menu_items as i", "i.menu_id", "m.id").selectAll("i").select([
		"m.id as m_id",
		"m.name as m_name",
		"m.label as m_label",
		"m.locale as m_locale",
		"m.translation_group as m_translation_group"
	]).where("m.name", "=", name).orderBy("i.sort_order", "asc");
	if (chain.length > 0) query = query.where((eb) => eb.or(chain.map((locale) => localeMatches("m.locale", locale))));
	const rows = await query.execute();
	const menuRow = rows.toSorted((a, b) => {
		if (chain.length === 0) return a.m_locale.localeCompare(b.m_locale) || a.m_id.localeCompare(b.m_id);
		return getLocaleChainRank(a.m_locale, chain) - getLocaleChainRank(b.m_locale, chain) || a.m_id.localeCompare(b.m_id);
	})[0];
	if (!menuRow) return null;
	const menuId = menuRow.m_id;
	const itemRows = rows.filter((row) => row.m_id === menuId && row.id !== null);
	return {
		menu: {
			id: menuRow.m_id,
			name: menuRow.m_name,
			label: menuRow.m_label,
			locale: menuRow.m_locale,
			translationGroup: menuRow.m_translation_group
		},
		items: itemRows
	};
}
async function resolveMenu(rows, db, trailingSlash) {
	return {
		...rows.menu,
		items: await buildMenuTree(rows.items, db, rows.menu.locale, trailingSlash)
	};
}
/**
* Build a hierarchical menu tree from a flat list of items. Items are
* resolved against the given `locale` so references land on the right
* per-locale content rows.
*/
async function buildMenuTree(items, db, locale, trailingSlash) {
	const contentReferences = collectContentReferences(items);
	const taxonomyReferences = new Set(items.flatMap((item) => item.type === "taxonomy" && item.reference_id ? [item.reference_id] : []));
	const [urlPatterns, contentLookup, taxonomyLookup] = await Promise.all([
		contentReferences.size > 0 ? getCollectionUrlPatterns(db, new Set(contentReferences.keys())) : /* @__PURE__ */ new Map(),
		resolveContentReferences(db, contentReferences, locale),
		resolveTaxonomyReferences(db, taxonomyReferences, locale)
	]);
	const validItems = (await Promise.all(items.map((item) => resolveMenuItem(item, urlPatterns, contentLookup, taxonomyLookup, locale, trailingSlash)))).filter((item) => item !== null);
	const itemMap = /* @__PURE__ */ new Map();
	const rootItems = [];
	const itemIds = new Set(items.map((item) => item.id));
	for (const item of validItems) itemMap.set(item.id, {
		...item,
		children: []
	});
	for (const item of items) {
		const menuItem = itemMap.get(item.id);
		if (!menuItem) continue;
		if (item.parent_id && itemIds.has(item.parent_id)) itemMap.get(item.parent_id)?.children.push(menuItem);
		else rootItems.push(menuItem);
	}
	return rootItems;
}
function collectContentReferences(items) {
	const references = /* @__PURE__ */ new Map();
	for (const item of items) {
		const reference = getContentReference(item);
		if (!reference) continue;
		let ids = references.get(reference.collection);
		if (!ids) {
			ids = /* @__PURE__ */ new Set();
			references.set(reference.collection, ids);
		}
		ids.add(reference.id);
	}
	return references;
}
function getContentReference(item) {
	if (item.type === "page" || item.type === "post") {
		if (!item.reference_id) return null;
		return {
			collection: item.reference_collection || `${item.type}s`,
			id: item.reference_id
		};
	}
	if (item.type === "collection") {
		if (!item.reference_collection || !item.reference_id) return null;
		return {
			collection: item.reference_collection,
			id: item.reference_id
		};
	}
	if (item.type !== "custom" && item.type !== "taxonomy" && item.reference_collection && item.reference_id) return {
		collection: item.reference_collection,
		id: item.reference_id
	};
	return null;
}
/**
* Look up the `url_pattern` for a set of collection slugs, request-cached so
* a page rendering several menus (header, footer, ...) only pays for the
* lookup once per distinct slug set. Callers must treat the returned map as
* read-only — it is shared across cache hits within the request.
*/
function getCollectionUrlPatterns(db, collectionSlugs) {
	return requestCached(`menu-collection-patterns:${[...collectionSlugs].toSorted().join(",")}`, async () => {
		const rows = await db.selectFrom("_emdash_collections").select(["slug", "url_pattern"]).where("slug", "in", [...collectionSlugs]).execute();
		const urlPatterns = /* @__PURE__ */ new Map();
		for (const row of rows) urlPatterns.set(row.slug, row.url_pattern);
		return urlPatterns;
	});
}
/**
* Resolve a single menu item's URL. `reference_id` is a translation_group
* (migration 036 remapped all existing references); we look it up against
* the per-locale ec_* row or per-locale taxonomy row.
*/
async function resolveMenuItem(item, urlPatterns, contentLookup, taxonomyLookup, locale, trailingSlash) {
	let url;
	switch (item.type) {
		case "custom":
			url = item.custom_url || "#";
			break;
		case "page":
		case "post":
			url = await resolveContentUrl(item.reference_collection || `${item.type}s`, item.reference_id, urlPatterns, contentLookup, locale, trailingSlash);
			if (url === null) return null;
			break;
		case "taxonomy":
			url = resolveTaxonomyUrl(item.reference_id, taxonomyLookup);
			if (url === null) return null;
			break;
		case "collection":
			if (!item.reference_collection) return null;
			if (item.reference_id) {
				url = await resolveContentUrl(item.reference_collection, item.reference_id, urlPatterns, contentLookup, locale, trailingSlash);
				if (url === null) return null;
			} else url = `/${item.reference_collection}/`;
			break;
		default: if (item.reference_collection && item.reference_id) {
			url = await resolveContentUrl(item.reference_collection, item.reference_id, urlPatterns, contentLookup, locale, trailingSlash);
			if (url === null) return null;
		} else url = "#";
	}
	return {
		id: item.id,
		label: item.label,
		url: sanitizeHref(url),
		target: item.target || void 0,
		titleAttr: item.title_attr || void 0,
		cssClasses: item.css_classes || void 0,
		children: []
	};
}
async function resolveContentReferences(db, references, locale) {
	const editMode = getRequestContext()?.editMode === true;
	const isVisible = (row) => row.deleted_at === null && (editMode || row.status === "published");
	const entries = await Promise.all(Array.from(references, async ([collection, referenceGroups]) => {
		const lookup = /* @__PURE__ */ new Map();
		const localized = /* @__PURE__ */ new Map();
		const found = /* @__PURE__ */ new Set();
		try {
			validateIdentifier(collection, "menu item collection");
			for (const batch of chunks([...referenceGroups], 50)) {
				const result = await sql`
						SELECT id, slug, published_at, locale, translation_group, status, deleted_at
						FROM ${sql.ref(`ec_${collection}`)}
						WHERE translation_group IN (${sql.join(batch)})
					`.execute(db);
				for (const row of result.rows) {
					found.add(row.translation_group);
					if (!isVisible(row)) continue;
					if (shouldPreferLocalizedRow(row, localized.get(row.translation_group), locale)) localized.set(row.translation_group, row);
				}
			}
			for (const [referenceGroup, row] of localized) lookup.set(referenceGroup, {
				id: row.id,
				slug: row.slug,
				publishedAt: row.published_at
			});
			const unresolved = [...referenceGroups].filter((id) => !found.has(id));
			for (const batch of chunks(unresolved, 50)) {
				const result = await sql`
						SELECT id, slug, published_at, status, deleted_at FROM ${sql.ref(`ec_${collection}`)}
						WHERE id IN (${sql.join(batch)})
					`.execute(db);
				for (const row of result.rows) {
					if (!isVisible(row)) continue;
					lookup.set(row.id, {
						id: row.id,
						slug: row.slug,
						publishedAt: row.published_at
					});
				}
			}
		} catch (error) {
			console.error(`Failed to resolve content URLs for ${collection}:`, error);
		}
		return [collection, lookup];
	}));
	return new Map(entries);
}
function shouldPreferLocalizedRow(candidate, existing, locale) {
	if (!existing) return true;
	const candidateRank = getLocaleRank(candidate.locale, locale);
	const existingRank = getLocaleRank(existing.locale, locale);
	return candidateRank < existingRank || candidateRank === existingRank && (candidate.locale < existing.locale || candidate.locale === existing.locale && candidate.id < existing.id);
}
/**
* Resolve the URL for a content reference. `referenceGroup` is the content
* row's translation_group; we look up the row in the requested locale
* (falling back to the source if no translation exists so the menu link is
* still clickable).
*/
async function resolveContentUrl(collection, referenceGroup, urlPatterns, contentLookup, locale, trailingSlash) {
	if (!referenceGroup) return null;
	const row = contentLookup.get(collection)?.get(referenceGroup);
	if (!row) return null;
	return resolveLocalizedContentRoutePath({
		pattern: urlPatterns.get(collection) ?? null,
		collection,
		slug: row.slug,
		id: row.id,
		date: row.publishedAt,
		locale,
		trailingSlash
	});
}
async function resolveTaxonomyReferences(db, referenceGroups, locale) {
	const lookup = /* @__PURE__ */ new Map();
	const localized = /* @__PURE__ */ new Map();
	try {
		for (const batch of chunks([...referenceGroups], 50)) {
			const rows = await db.selectFrom("taxonomies").select([
				"id",
				"name",
				"slug",
				"locale",
				"translation_group"
			]).where("translation_group", "in", batch).$narrowType().execute();
			for (const row of rows) if (shouldPreferLocalizedRow(row, localized.get(row.translation_group), locale)) localized.set(row.translation_group, row);
		}
		for (const [referenceGroup, row] of localized) lookup.set(referenceGroup, {
			name: row.name,
			slug: row.slug
		});
		const unresolved = [...referenceGroups].filter((id) => !lookup.has(id));
		for (const batch of chunks(unresolved, 50)) {
			const rows = await db.selectFrom("taxonomies").select([
				"id",
				"name",
				"slug"
			]).where("id", "in", batch).execute();
			for (const row of rows) lookup.set(row.id, {
				name: row.name,
				slug: row.slug
			});
		}
	} catch (error) {
		console.error("Failed to resolve taxonomy URLs:", error);
	}
	return lookup;
}
/**
* Resolve URL for a taxonomy term reference. `referenceGroup` is the term's
* translation_group; we pick the row in the active locale (or fall back).
*/
function resolveTaxonomyUrl(referenceGroup, taxonomyLookup) {
	if (!referenceGroup) return null;
	const taxonomy = taxonomyLookup.get(referenceGroup);
	if (!taxonomy) return null;
	return `/${taxonomy.name}/${taxonomy.slug}`;
}
// node_modules/emdash/dist/hook-result-mOyk-VCt.mjs
/** One bound field's live selection as translation groups. */
async function liveFieldSelection(repo, field, entryGroup) {
	return (field.relationSide === "child" ? await repo.getParents(field.relation, entryGroup) : await repo.getChildren(field.relation, entryGroup)).map((link) => field.relationSide === "child" ? link.parentGroup : link.childGroup);
}
/**
* Re-check what publication is about to make live against the relation's current
* cardinality.
*
* A draft can sit unpublished across a schema edit that makes its field required
* or narrows the relation's limits, and across another entry claiming what it
* selected. It is publication — not the save that staged it — that has to hold
* the line on both ends. So this walks the collection's bound fields rather than
* the staged keys: a field added as required after the entry was written appears
* in no existing draft, and iterating `staged` would never reach it. A field the
* draft does stage needs no link read.
*/
async function validateStagedReferences(db, collection, staged, entryGroup, baselines) {
	const repo = new RelationRepository(db);
	for (const field of (await referenceFieldConstraints(db, collection)).values()) {
		const isStaged = Object.hasOwn(staged, field.slug);
		let groups = isStaged ? staged[field.slug] ?? [] : void 0;
		const baseline = baselines?.[field.slug];
		if (groups && baseline) {
			const live = await liveFieldSelection(repo, field, entryGroup);
			groups = applyReferenceDiff(baseline, groups, live);
		}
		groups ??= await liveFieldSelection(repo, field, entryGroup);
		const valid = validateReferenceSelection(field, groups);
		if (!valid.success) return valid;
		if (!isStaged || field.relationId === null) continue;
		const far = await validateOppositeSideLimit(db, {
			relationId: field.relationId,
			farLimit: field.maxOpposite,
			side: field.relationSide,
			entryGroup,
			groups
		});
		if (!far.success) return far;
	}
	return {
		success: true,
		data: true
	};
}
/**
* The live selection, in the same shape a draft stages: every bound reference
* field on the collection, by field slug, as translation groups.
*
* One link read per bound field. Used where both selections have to be
* comparable — the live and draft sides of a compare — never on a render path.
*/
async function liveReferenceSelection(db, collection, entryGroup) {
	const repo = new RelationRepository(db);
	const selection = {};
	for (const field of (await referenceFieldConstraints(db, collection)).values()) selection[field.slug] = await liveFieldSelection(repo, field, entryGroup);
	return selection;
}
/**
* The live selection as revision data, so that restoring the revision brings these links back.
* Empty when the collection has no reference field.
*/
async function liveReferenceData(db, collection, entryGroup) {
	if (!entryGroup) return {};
	const selection = await liveReferenceSelection(db, collection, entryGroup);
	return Object.keys(selection).length > 0 ? { [STAGED_REFERENCES_KEY]: selection } : {};
}
/**
* Compute the selection that results from applying the staged-versus-baseline
* diff on top of the current live selection.
*
* Additions and removals made in the draft win. Items the draft left unchanged
* follow the current live selection, preserving additions and removals made
* from the relation's opposite end.
*/
function applyReferenceDiff(baseline, staged, live) {
	const baselineSet = new Set(baseline);
	const stagedSet = new Set(staged);
	const liveSet = new Set(live);
	const additionSet = new Set(staged.filter((group) => !baselineSet.has(group)));
	const removalSet = new Set(baseline.filter((group) => !stagedSet.has(group)));
	const result = [];
	const seen = /* @__PURE__ */ new Set();
	for (const group of staged) {
		if (!additionSet.has(group) && !liveSet.has(group) || seen.has(group)) continue;
		result.push(group);
		seen.add(group);
	}
	for (const group of live) {
		if (removalSet.has(group) || seen.has(group)) continue;
		result.push(group);
		seen.add(group);
	}
	return result;
}
/**
* Record the complete live selection in the revision publication just made live.
*
* A draft stages only the fields its saves named, and a revision written from
* the columns stages none. Restoring either would otherwise leave whatever was
* published after it linked in the fields it does not carry.
*/
async function recordPublishedReferences(db, collection, revisionId, entryGroup) {
	const selection = await liveReferenceSelection(db, collection, entryGroup);
	if (Object.keys(selection).length === 0) return;
	await new RevisionRepository(db).mergeData(revisionId, { [STAGED_REFERENCES_KEY]: selection });
}
/**
* Promote a staged selection to live links.
*
* A field slug the collection no longer carries as a bound reference field is
* skipped: the revision outlived the field, and there is no relation left to
* write into.
*
* When `baselines` are provided, each staged field is promoted as a diff
* against its baseline rather than as a wholesale replacement. That prevents a
* draft saved before a concurrent opposite-end publish from undoing the links
* that publish added or removed.
*/
async function applyStagedReferences(db, collection, entryGroup, staged, baselines) {
	const constraints = await referenceFieldConstraints(db, collection);
	const repo = new RelationRepository(db);
	for (const [fieldSlug, groups] of Object.entries(staged)) {
		const field = constraints.get(fieldSlug);
		if (!field) continue;
		const baseline = baselines?.[fieldSlug];
		let selection;
		if (baseline) selection = applyReferenceDiff(baseline, groups, await liveFieldSelection(repo, field, entryGroup));
		else selection = groups;
		await writeReferenceSelection(db, {
			relation: field.relation,
			side: field.relationSide,
			entryGroup,
			groups: selection
		});
	}
}
function asMediaRef(value) {
	if (value === null || value === void 0) return null;
	if (typeof value !== "object" || Array.isArray(value)) return null;
	return value;
}
function fail$1(message) {
	return {
		success: false,
		error: {
			code: "INVALID_MIME_FOR_FIELD",
			message
		}
	};
}
function addTarget(targets, path, value, allowedMimeTypes, includeDarkVariant) {
	if (!allowedMimeTypes?.length || value == null) return;
	targets.push({
		path,
		value,
		allowedMimeTypes: [...allowedMimeTypes]
	});
	const ref = includeDarkVariant ? asMediaRef(value) : null;
	if (ref && "darkVariant" in ref && ref.darkVariant != null) targets.push({
		path: `${path}.darkVariant`,
		value: ref.darkVariant,
		allowedMimeTypes: [...allowedMimeTypes]
	});
}
function collectBlockTargets(targets, field, value) {
	if (!Array.isArray(value)) return {
		success: true,
		data: true
	};
	const types = new Map((field.blockTypes ?? []).map((type) => [type.slug, type]));
	for (const [index, block] of value.entries()) {
		if (!block || typeof block !== "object" || Array.isArray(block)) continue;
		const typeSlug = "_type" in block && typeof block._type === "string" ? block._type : void 0;
		const versionNumber = "_version" in block && typeof block._version === "number" ? block._version : void 0;
		const key = "_key" in block && typeof block._key === "string" ? block._key : String(index);
		const type = typeSlug ? types.get(typeSlug) : void 0;
		const version = type?.versions.find((candidate) => candidate.version === versionNumber);
		if (!type || !version || version.unsupportedTypes?.length) return {
			success: false,
			error: {
				code: "UNSUPPORTED_FIELD_TYPE",
				message: `Field '${field.slug}' block '${key}' has no retained definition`
			}
		};
		for (const nestedField of version.fields) {
			const nestedValue = nestedField.slug in block ? block[nestedField.slug] : void 0;
			const nestedPath = `${field.slug}.${key}.${nestedField.slug}`;
			if (nestedField.type !== "image" && nestedField.type !== "file") continue;
			addTarget(targets, nestedPath, nestedValue, nestedField.validation?.allowedMimeTypes, nestedField.type === "image");
		}
	}
	return {
		success: true,
		data: true
	};
}
async function loadMediaFieldsForCollection(db, collectionSlug) {
	const rows = await db.selectFrom("_emdash_fields").innerJoin("_emdash_collections", "_emdash_collections.id", "_emdash_fields.collection_id").select([
		"_emdash_fields.slug",
		"_emdash_fields.type",
		"_emdash_fields.validation"
	]).where("_emdash_collections.slug", "=", collectionSlug).where("_emdash_fields.type", "in", [
		"file",
		"image",
		"blocks"
	]).execute();
	const out = [];
	const allBlockTypes = rows.some((row) => row.type === "blocks") ? await new BlockTypeRegistry(db).listBlockTypes() : [];
	const blockTypeBySlug = new Map(allBlockTypes.map((type) => [type.slug, type]));
	for (const row of rows) {
		if (row.type === "blocks") {
			let validation;
			try {
				validation = row.validation ? JSON.parse(row.validation) : {};
			} catch {
				validation = {};
			}
			let configured = [];
			if (validation && typeof validation === "object" && !Array.isArray(validation)) {
				const allowed = "allowedTypes" in validation && Array.isArray(validation.allowedTypes) ? validation.allowedTypes : [];
				const retired = "retiredTypes" in validation && Array.isArray(validation.retiredTypes) ? validation.retiredTypes : [];
				configured = [...allowed, ...retired];
			}
			out.push({
				slug: row.slug,
				type: row.type,
				allowedMimeTypes: [],
				blockTypes: configured.flatMap((slug) => {
					const type = typeof slug === "string" ? blockTypeBySlug.get(slug) : void 0;
					return type ? [type] : [];
				})
			});
			continue;
		}
		const list = parseAllowedMimeTypes(row.validation);
		if (!list) continue;
		out.push({
			slug: row.slug,
			type: row.type,
			allowedMimeTypes: list
		});
	}
	return out;
}
async function validateMediaFields(db, collectionSlug, data) {
	const fields = await requestCached(`mediaFields:${collectionSlug}`, () => loadMediaFieldsForCollection(db, collectionSlug));
	if (fields.length === 0) return {
		success: true,
		data: true
	};
	const targets = [];
	for (const field of fields) {
		const value = data[field.slug];
		if (field.type === "blocks") {
			const collected = collectBlockTargets(targets, field, value);
			if (!collected.success) return collected;
		} else addTarget(targets, field.slug, value, field.allowedMimeTypes, field.type === "image");
	}
	if (targets.length === 0) return {
		success: true,
		data: true
	};
	const localIds = /* @__PURE__ */ new Set();
	for (const target of targets) {
		const ref = asMediaRef(target.value);
		if (!ref) continue;
		if ((typeof ref.provider === "string" ? ref.provider : "local") === "local" && typeof ref.id === "string") localIds.add(ref.id);
	}
	const idList = [...localIds];
	const mimeById = /* @__PURE__ */ new Map();
	if (idList.length > 0) for (const batch of chunks(idList, 50)) {
		const rows = await db.selectFrom("media").select(["id", "mime_type"]).where("id", "in", batch).execute();
		for (const r of rows) mimeById.set(r.id, r.mime_type);
	}
	for (const target of targets) {
		const ref = asMediaRef(target.value);
		if (!ref) continue;
		const provider = typeof ref.provider === "string" ? ref.provider : "local";
		let mime;
		if (provider === "local") {
			if (typeof ref.id !== "string") return fail$1(`Field '${target.path}' references media with an invalid id`);
			mime = mimeById.get(ref.id);
			if (!mime) return fail$1(`Field '${target.path}' references media with unknown MIME type`);
		} else {
			if (typeof ref.mimeType !== "string") return fail$1(`Field '${target.path}' requires a mimeType declaration for non-local media`);
			mime = ref.mimeType;
		}
		if (!matchesMimeAllowlist(mime, target.allowedMimeTypes)) return fail$1(`Field '${target.path}' does not accept ${mime}`);
	}
	return {
		success: true,
		data: true
	};
}
/**
* Narrow a caught error to one carrying a structured `apiError` discriminant.
* Used by transaction callbacks that want to surface a specific error code
* through the standard Error throwing path.
*/
function hasApiError(error) {
	if (!(error instanceof Error) || !("apiError" in error)) return false;
	const { apiError } = error;
	return typeof apiError === "object" && apiError !== null && "code" in apiError && typeof apiError.code === "string";
}
/**
* Abort the surrounding transaction when a relation's limit refused an edge.
*
* `farSide` names the end that filled up, which is the opposite of the end the
* refused group sits on: a child that cannot take another parent refuses with
* `"parent"`.
*/
function throwIfReferenceLimitRefused(rejected, farSide) {
	if (rejected.length === 0) return;
	throw Object.assign(/* @__PURE__ */ new Error(`Entry '${rejected[0]}' already has the maximum number of ${farSide} entries on this relation.`), { apiError: { code: "VALIDATION_ERROR" } });
}
/** The slug a draft revision stages, when it stages one. */
function readStagedSlug(data) {
	return typeof data?._slug === "string" ? data._slug : null;
}
/**
* Make every refusal `publish()` decides before it writes, ahead of it.
*
* `publish()` decides all of them again and stays authoritative; this does not
* replace it. It exists for the one caller that has irreversible work to do
* first — promoting a draft's staged reference selection, which nothing takes
* back where `withTransaction` degrades to plain statements. A refusal that
* landed after that promotion would leave a draft's links live on an entry that
* never published.
*
* The optimistic fence `publish()` ends on is not checked here, because it is
* the write itself: a publish lost to a concurrent edit still promotes.
*/
async function assertPublishWillNotBeRefused(db, collection, id, existing, options) {
	const { expectedRevision } = options;
	if (expectedRevision && (existing.version !== expectedRevision.version || existing.updatedAt !== expectedRevision.updatedAt)) throw new ContentMutationConflictError();
	if (options.requireDue && options.expectedScheduledAt !== void 0 && existing.scheduledAt !== options.expectedScheduledAt) throw new ScheduledNotDueError();
	const intendedSlug = options.stagedSlug ?? existing.slug;
	if (options.requireSlug && !intendedSlug?.trim()) throw new EmDashValidationError("Cannot publish routable content without a slug");
	if (options.stagedSlug !== null && options.stagedSlug !== existing.slug && existing.locale !== null) {
		const conflict = await new ContentRepository(db).findBySlugIncludingTrashed(collection, options.stagedSlug, existing.locale);
		if (conflict && conflict.id !== id) throw new EmDashValidationError(`Cannot publish: slug '${options.stagedSlug}' is already used by another entry in this collection (id: ${conflict.id}). Choose a different slug.`, { code: "SLUG_CONFLICT" });
	}
}
function isTranslationLocaleConflict(error, collection) {
	if (!(error instanceof Error)) return false;
	const message = error.message.toLowerCase();
	const storedIndexName = `uidx_ec_${collection}_active_tg_locale`.slice(0, 63).toLowerCase();
	return message.includes(storedIndexName) || message.includes("unique constraint failed") && message.includes("translation_group") && message.includes("locale");
}
function decodeRevisionPrecondition(rev) {
	if (rev === void 0) return void 0;
	const decoded = decodeRev(rev);
	if (!decoded) throw new ContentMutationConflictError("Revision precondition did not match");
	return decoded;
}
/**
* Extract a slug source from content data: the collection's `titleField` when
* it sets one and the entry has a value for it, otherwise `title`, then `name`.
* Returns null if no suitable string field is found.
*/
function getSlugSource(data, titleField) {
	const configured = titleField ? data[titleField] : void 0;
	if (typeof configured === "string" && configured.length > 0) return configured;
	if (typeof data.title === "string" && data.title.length > 0) return data.title;
	if (typeof data.name === "string" && data.name.length > 0) return data.name;
	return null;
}
/** Default SEO values for content without an explicit SEO row */
var SEO_DEFAULTS = {
	title: null,
	description: null,
	image: null,
	canonical: null,
	noIndex: false
};
/**
* Check if a collection has SEO enabled.
*
* Cached per request so bulk imports do not re-query `_emdash_collections`
* for every item they create.
*/
async function collectionHasSeo(db, collection) {
	return requestCached(`collectionHasSeo:${collection}`, async () => {
		return (await db.selectFrom("_emdash_collections").select("has_seo").where("slug", "=", collection).executeTakeFirst())?.has_seo === 1;
	});
}
/**
* Collection publication metadata, cached per request for bulk imports.
*/
async function getCollectionPublishConfig(db, collection) {
	return requestCached(`collectionPublishConfig:${collection}`, async () => {
		const row = await db.selectFrom("_emdash_collections").select(["supports", "routable"]).where("slug", "=", collection).executeTakeFirst();
		const supports = row?.supports ? JSON.parse(row.supports) : [];
		return {
			supportsRevisions: Array.isArray(supports) && supports.includes("revisions"),
			supportsScheduling: !Array.isArray(supports) || !supports.includes("no-scheduling"),
			routable: row?.routable !== 0
		};
	});
}
async function getCollectionTitleField(db, collection) {
	return requestCached(`collectionTitleField:${collection}`, async () => {
		return (await db.selectFrom("_emdash_collections").select("title_field").where("slug", "=", collection).executeTakeFirst())?.title_field ?? null;
	});
}
function requireRoutablePublishSlug(routable, slug) {
	if (routable && !slug?.trim()) throw new EmDashValidationError("Cannot publish routable content without a slug");
}
/**
* Hydrate SEO data on a single content item if the collection has SEO enabled.
*/
async function hydrateSeo(db, collection, item, hasSeo) {
	if (!hasSeo) return;
	item.seo = await new SeoRepository(db).get(collection, item.id);
}
/**
* Hydrate SEO data on multiple content items using a single batch query.
*/
async function hydrateSeoMany(db, collection, items, hasSeo) {
	if (!hasSeo || items.length === 0) return;
	const seoMap = await new SeoRepository(db).getMany(collection, items.map((i) => i.id));
	for (const item of items) item.seo = seoMap.get(item.id) ?? { ...SEO_DEFAULTS };
}
async function hydrateBylines(db, collection, item) {
	const bylineRepo = new BylineRepository(db);
	const localeOpt = item.locale ? { locale: item.locale } : void 0;
	const bylines = await bylineRepo.getContentBylines(collection, item.id, localeOpt);
	if (bylines.length > 0) {
		item.bylines = bylines.map((c) => ({
			...c,
			source: "explicit"
		}));
		item.byline = bylines[0]?.byline ?? null;
		return;
	}
	if (item.primaryBylineId) {
		item.bylines = [];
		item.byline = null;
		return;
	}
	if (item.authorId) {
		const fallback = await bylineRepo.findByUserId(item.authorId, localeOpt);
		if (fallback) {
			item.bylines = [{
				byline: fallback,
				sortOrder: 0,
				roleLabel: null,
				source: "inferred"
			}];
			item.byline = fallback;
			return;
		}
	}
	item.bylines = [];
	item.byline = null;
}
function isRecord$1(value) {
	return typeof value === "object" && value !== null;
}
/**
* Hydrate the first page of each reference field's selection onto a single
* content item, keyed by field slug — the same key the create and update bodies
* take a selection under.
*
* Callers must have already decided `includeDrafts` — draft visibility is
* enforced by the caller, not this helper — because a resolved entry can carry
* a draft or scheduled entry's id and slug. The admin's REST GET route is the
* only caller, and it asks for every entry it serves, so a collection with no
* reference field still pays the two lookups below.
*
* For a caller that opted into drafts, a field whose selection is staged in the
* entry's draft revision is answered from that revision; every other field, and
* every field for a caller that did not opt in, is answered from the links,
* which hold the published selection. That is what keeps a picker change on a
* published entry invisible until it is published.
*
* Either selection arrives one page at a time, with the cursor to walk the rest
* through the edge routes — a draft's pending selection can be as long as a
* published one, and a caller that reads an entry should not have to take a
* field of a thousand entries to find out.
*/
async function hydrateReferences(db, collection, item, includeDrafts) {
	if (!item.translationGroup) return;
	const collectionRow = await db.selectFrom("_emdash_collections").select("id").where("slug", "=", collection).executeTakeFirst();
	if (!collectionRow) return;
	const fields = await db.selectFrom("_emdash_fields").select(["slug", "validation"]).where("collection_id", "=", collectionRow.id).where("type", "=", "reference").execute();
	const references = {};
	if (fields.length === 0) {
		item.references = references;
		return;
	}
	const repo = new RelationRepository(db);
	const content = new ContentRepository(db);
	const staged = includeDrafts && item.draftRevisionId ? readStagedReferences((await new RevisionRepository(db).findById(item.draftRevisionId))?.data) : void 0;
	for (const field of fields) {
		let validation = {};
		if (field.validation) {
			let parsed;
			try {
				parsed = JSON.parse(field.validation);
			} catch {
				continue;
			}
			if (isRecord$1(parsed)) validation = parsed;
		}
		const relation = typeof validation.relation === "string" ? validation.relation : void 0;
		const targetCollection = typeof validation.targetCollection === "string" ? validation.targetCollection : void 0;
		if (!relation || !targetCollection) continue;
		const stagedGroups = staged?.[field.slug];
		if (stagedGroups) {
			const page = pageStagedGroups(stagedGroups);
			references[field.slug] = {
				children: await resolveEntryGroups(content, targetCollection, page.groups, item.locale, includeDrafts, await getReferenceTitleField(db, targetCollection)),
				...page.nextCursor ? { nextCursor: page.nextCursor } : {}
			};
			continue;
		}
		const onChildSide = validation.relationSide === "child";
		const edges = onChildSide ? await repo.getParentsPage(relation, item.translationGroup) : await repo.getChildrenPage(relation, item.translationGroup);
		const children = await resolveEntries(content, targetCollection, edges.items, (e) => onChildSide ? e.parentGroup : e.childGroup, item.locale, includeDrafts, await getReferenceTitleField(db, targetCollection));
		references[field.slug] = {
			children,
			...edges.nextCursor ? { nextCursor: edges.nextCursor } : {}
		};
	}
	item.references = references;
}
/**
* Batch-hydrate bylines for multiple items using two bulk queries instead of N+1.
*
* Items may live at different locales (e.g. a list endpoint returning the
* translations of an entry). Group by `item.locale` and call the strict
* per-locale repo method once per group so each item resolves against its
* own locale's byline rows.
*/
async function hydrateBylinesMany(db, collection, items) {
	if (items.length === 0) return;
	const bylineRepo = new BylineRepository(db);
	const localeBuckets = /* @__PURE__ */ new Map();
	for (const item of items) {
		const key = item.locale ?? null;
		const bucket = localeBuckets.get(key);
		if (bucket) bucket.push(item);
		else localeBuckets.set(key, [item]);
	}
	const bylinesByItem = /* @__PURE__ */ new Map();
	const itemsNeedingAuthorCheck = [];
	for (const [locale, bucket] of localeBuckets) {
		const localeOpt = locale ? { locale } : void 0;
		const ids = bucket.map((i) => i.id);
		const credits = await bylineRepo.getContentBylinesMany(collection, ids, localeOpt);
		for (const [id, list] of credits) bylinesByItem.set(id, list);
		for (const item of bucket) {
			if (credits.has(item.id) && credits.get(item.id).length > 0) continue;
			if (item.authorId) itemsNeedingAuthorCheck.push(item);
		}
	}
	const fallbackByItem = /* @__PURE__ */ new Map();
	if (itemsNeedingAuthorCheck.length > 0) {
		const authorBuckets = /* @__PURE__ */ new Map();
		for (const item of itemsNeedingAuthorCheck) {
			if (item.primaryBylineId) continue;
			const key = item.locale ?? null;
			const bucket = authorBuckets.get(key);
			if (bucket) bucket.push(item);
			else authorBuckets.set(key, [item]);
		}
		for (const [locale, bucket] of authorBuckets) {
			const localeOpt = locale ? { locale } : void 0;
			const authorIds = bucket.map((i) => i.authorId).filter((id) => id !== null);
			const uniqueAuthorIds = [...new Set(authorIds)];
			if (uniqueAuthorIds.length === 0) continue;
			const authorMap = await bylineRepo.findByUserIds(uniqueAuthorIds, localeOpt);
			for (const item of bucket) {
				if (!item.authorId) continue;
				const f = authorMap.get(item.authorId);
				if (f) fallbackByItem.set(item.id, f);
			}
		}
	}
	for (const item of items) {
		const explicit = bylinesByItem.get(item.id);
		if (explicit && explicit.length > 0) {
			item.bylines = explicit.map((c) => ({
				...c,
				source: "explicit"
			}));
			item.byline = explicit[0]?.byline ?? null;
			continue;
		}
		const fallback = fallbackByItem.get(item.id);
		if (fallback) {
			item.bylines = [{
				byline: fallback,
				sortOrder: 0,
				roleLabel: null,
				source: "inferred"
			}];
			item.byline = fallback;
			continue;
		}
		item.bylines = [];
		item.byline = null;
	}
}
/**
* Resolve an identifier (ID or slug) to a real content ID.
* Returns the ID if found, null if not found.
* When locale is provided, slug lookups are scoped to that locale.
*/
async function resolveId(repo, collection, identifier, locale) {
	return (await repo.findByIdOrSlug(collection, identifier, locale ? resolveConfiguredLocale(locale) : void 0))?.id ?? null;
}
/**
* Resolve an identifier (ID or slug) to a real content ID,
* including trashed (soft-deleted) items.
*/
async function resolveIdIncludingTrashed(repo, collection, identifier, locale) {
	return (await repo.findByIdOrSlugIncludingTrashed(collection, identifier, locale ? resolveConfiguredLocale(locale) : void 0))?.id ?? null;
}
/**
* Resolve the columns a content-list search should match against. Always
* includes `slug` (a standard column), adds the configured `titleField` plus
* the `title`/`name` display fields when the collection actually defines them,
* mirroring the admin's item-title resolution (titleField -> title -> name ->
* slug), and includes every field explicitly marked searchable. Returning only
* fields that have a column (a reference field bound to a relation has none)
* avoids "no such column" errors.
*/
async function resolveSearchColumns(db, collection) {
	const row = await db.selectFrom("_emdash_collections").select(["id", "title_field"]).where("slug", "=", collection).executeTakeFirst();
	if (!row) return ["slug"];
	const fields = (await db.selectFrom("_emdash_fields").select([
		"slug",
		"searchable",
		"type",
		"validation"
	]).where("collection_id", "=", row.id).orderBy("sort_order", "asc").execute()).filter((f) => !isStoragelessFieldRow(f));
	const columns = /* @__PURE__ */ new Set(["slug"]);
	const fieldSlugs = new Set(fields.map((f) => f.slug));
	if (row.title_field && fieldSlugs.has(row.title_field)) columns.add(row.title_field);
	for (const candidate of ["title", "name"]) if (fieldSlugs.has(candidate)) columns.add(candidate);
	for (const field of fields) if (field.searchable === 1) columns.add(field.slug);
	return [...columns];
}
/**
* The keys of `data` that name a storage-less field — a reference field bound
* to a relation, whose selection lives in the edge table and reaches the API
* under the separate `references` key.
*
* A reference field with no relation still owns its column, so its value in
* `data` is exactly where it belongs and is not returned here.
*/
async function storagelessDataKeys(db, collection, data) {
	const collectionRow = await db.selectFrom("_emdash_collections").select("id").where("slug", "=", collection).executeTakeFirst();
	if (!collectionRow) return [];
	const fields = await db.selectFrom("_emdash_fields").select([
		"slug",
		"type",
		"validation"
	]).where("collection_id", "=", collectionRow.id).execute();
	const storageless = new Set(fields.filter(isStoragelessFieldRow).map((f) => f.slug));
	if (storageless.size === 0) return [];
	return Object.keys(data).filter((key) => storageless.has(key));
}
/**
* Refuse a `data` payload that tries to set a storage-less field.
*
* Such a key would otherwise reach the column writer and throw "no such
* column". Dropping it instead is worse than refusing it: a client that can
* only write `data` would be told its write succeeded while nothing was linked.
* On a collection that keeps drafts the key never reaches the column writer at
* all — it is merged into the draft revision's JSON — so the runtime applies
* this before staging rather than leaving it to the write below.
*/
function storagelessDataKeyError(keys) {
	return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message: `Reference fields bound to a relation are set through 'references', not 'data': ${keys.join(", ")}`
		}
	};
}
/**
* The storage-less keys in `data` that an update is actually trying to change.
*
* A field bound to a relation after its column existed keeps that column, and
* every read hands the value frozen in it back under the field's own slug. A
* read-then-write client — the admin editor among them — therefore echoes a key
* it never touched, and refusing that would make such an entry unsaveable. An
* echo asks for nothing; a different value is an attempt to set a selection
* through the one channel that cannot carry it.
*
* A key the entry does not store counts as changed, which is every key of a
* field that never had a column: there is nothing for such a payload to be
* echoing, and letting it through would reach the column writer.
*/
function changedStoragelessDataKeys(storageless, data, stored) {
	return Object.keys(data).filter((key) => storageless.has(key) && (!Object.hasOwn(stored, key) || JSON.stringify(data[key]) !== JSON.stringify(stored[key])));
}
/**
* Decide whether the content-list `q` filter can be served from the
* collection's FTS5 index instead of a full-scan substring LIKE (#1517).
*
* Requires SQLite (FTS5 is SQLite-only), search enabled on the collection,
* every non-slug display column present in the searchable-field set (or the
* index would miss matches the LIKE finds), and the index table actually
* existing.
*/
async function canUseFtsForListFilter(db, collection, searchColumns) {
	if (!isSqlite(db)) return false;
	const ftsManager = new FTSManager(db);
	if (!(await ftsManager.getSearchConfig(collection))?.enabled) return false;
	const searchable = new Set(await ftsManager.getSearchableFields(collection));
	if (!searchColumns.every((col) => col === "slug" || searchable.has(col))) return false;
	return ftsManager.ftsTableExists(collection);
}
/**
* Create a 301 auto-redirect from an entry's old URL to its new one after a
* slug change, using the collection's URL pattern. Shared by
* handleContentUpdate (direct slug edits) and handleContentPublish (slug edits
* staged as `_slug` in a draft revision, which only land on publish).
*/
async function createSlugChangeRedirect(db, collection, oldSlug, newSlug, contentId, oldPublishedAt, newPublishedAt) {
	if (await slugStillTaken(db, collection, oldSlug, contentId)) return false;
	const collectionRow = await db.selectFrom("_emdash_collections").select("url_pattern").where("slug", "=", collection).executeTakeFirst();
	const redirect = await new RedirectRepository(db).createAutoRedirect(collection, oldSlug, newSlug, contentId, collectionRow?.url_pattern ?? null, oldPublishedAt, newPublishedAt);
	invalidateRedirectCache();
	return redirect !== null;
}
/**
* Remove any auto-redirect whose source is the URL a newly published entry
* now occupies. This prevents an earlier slug-change redirect from shadowing
* the new live page, because the redirect middleware runs before routing.
*/
async function removeShadowingAutoRedirect(db, collection, slug, contentId, publishedAt) {
	if (!slug) return false;
	validateIdentifier(collection, "collection slug");
	const url = interpolateUrlPattern({
		pattern: (await db.selectFrom("_emdash_collections").select("url_pattern").where("slug", "=", collection).executeTakeFirst())?.url_pattern ?? null,
		collection,
		slug,
		id: contentId,
		date: publishedAt
	});
	const result = await db.deleteFrom("_emdash_redirects").where("source", "in", redirectPathVariants(url)).where("auto", "=", 1).executeTakeFirst();
	const removed = BigInt(result.numDeletedRows ?? 0n) > 0n;
	if (removed) invalidateRedirectCache();
	return removed;
}
/** Whether a row other than `contentId` still holds `slug` in this collection. */
async function slugStillTaken(db, collection, slug, contentId) {
	validateIdentifier(collection, "collection slug");
	return (await sql`
		SELECT id FROM ${sql.ref(`ec_${collection}`)}
		WHERE slug = ${slug}
		AND id != ${contentId}
		AND deleted_at IS NULL
		LIMIT 1
	`.execute(db)).rows.length > 0;
}
/** Matches a date-only `YYYY-MM-DD` bound (no time component). */
var DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;
/**
* Normalize a date-range bound to an ISO datetime for lexicographic comparison
* against stored ISO 8601 timestamps. A bare `YYYY-MM-DD` is widened to the
* appropriate UTC day boundary so the range stays inclusive: a `start` bound
* becomes the start of the day and an `end` bound the end of the day.
* Otherwise a date-only upper bound would exclude every same-day row (since
* `2024-06-01T12:00:00Z` sorts after `2024-06-01`). Full datetimes pass
* through unchanged.
*/
function normalizeDateBound(value, edge) {
	if (!value) return void 0;
	if (!DATE_ONLY_RE.test(value)) return new Date(value).toISOString();
	return edge === "start" ? `${value}T00:00:00.000Z` : `${value}T23:59:59.999Z`;
}
/**
* Build the repository's byline filter from the wire params.
*
* `locale` is the locale the list is scoped to, which is the locale an
* inferred credit has to resolve at — the admin list is always scoped to the
* locale picked in its switcher.
*/
function resolveBylineFilter(params, locale) {
	const includeInferred = params.includeInferredBylines === true;
	if (params.bylinesNone) return {
		mode: "none",
		includeInferred,
		locale
	};
	const bylineIds = params.bylines ?? [];
	if (bylineIds.length === 0) return void 0;
	return {
		mode: "any",
		bylineIds,
		includeInferred,
		locale
	};
}
/**
* Rows to skip for a numbered page, or `null` when the page can't be served
* (combined with a cursor, or past the safe-integer range).
*/
function pageOffset(params) {
	const offset = (params.page - 1) * params.limit;
	if (params.cursor !== void 0 || !Number.isSafeInteger(params.page) || params.page < 1 || !Number.isSafeInteger(offset)) return null;
	return offset;
}
/**
* Create content list handler
*/
async function handleContentList(db, collection, params) {
	try {
		const limit = Math.max(1, Math.min(params.limit || 50, 100));
		const offset = params.page === void 0 ? void 0 : pageOffset({
			page: params.page,
			limit,
			cursor: params.cursor
		});
		if (offset === null) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Invalid content page"
			}
		};
		const repo = new ContentRepository(db);
		const where = {};
		if (params.status) where.status = params.status;
		const locale = params.locale ? resolveConfiguredLocale(params.locale) : void 0;
		if (locale) where.locale = locale;
		if (params.authorId) where.authorId = params.authorId;
		if (params.fieldFilters && Object.keys(params.fieldFilters).length > 0) where.fieldFilters = params.fieldFilters;
		const bylineFilter = resolveBylineFilter(params, locale);
		if (bylineFilter) where.bylineFilter = bylineFilter;
		if (params.dateField && (params.dateFrom || params.dateTo)) where.dateFilter = {
			field: params.dateField,
			from: normalizeDateBound(params.dateFrom, "start"),
			to: normalizeDateBound(params.dateTo, "end")
		};
		const q = params.q?.trim();
		if (q) {
			where.q = q;
			where.searchColumns = await resolveSearchColumns(db, collection);
			where.useFts = await canUseFtsForListFilter(db, collection, where.searchColumns);
		}
		let sortableExtras;
		if (params.orderBy && !isSystemOrderField(params.orderBy)) {
			const coll = await db.selectFrom("_emdash_collections").select(["title_field", "date_field"]).where("slug", "=", collection).executeTakeFirst();
			sortableExtras = [coll?.title_field, coll?.date_field].filter((slug) => !!slug);
		}
		const result = await repo.findMany(collection, {
			cursor: params.cursor,
			offset,
			limit,
			where: Object.keys(where).length > 0 ? where : void 0,
			orderBy: params.orderBy ? {
				field: params.orderBy,
				direction: params.order || "desc"
			} : void 0,
			sortableExtras
		});
		const unpublishedDrafts = result.items.filter((item) => item.status !== "published" && item.liveRevisionId === null && item.draftRevisionId);
		const draftIds = unpublishedDrafts.flatMap((item) => item.draftRevisionId ? [item.draftRevisionId] : []);
		if (draftIds.length > 0) {
			const revisions = await new RevisionRepository(db).findByIds(collection, draftIds);
			const byId = new Map(revisions.map((revision) => [revision.id, revision]));
			for (const item of unpublishedDrafts) {
				if (!item.draftRevisionId) continue;
				const revision = byId.get(item.draftRevisionId);
				if (!revision || revision.entryId !== item.id) continue;
				const fields = Object.fromEntries(Object.entries(revision.data).filter(([key]) => !key.startsWith("_")));
				item.data = {
					...item.data,
					...fields
				};
			}
		}
		const hasSeo = await collectionHasSeo(db, collection);
		await hydrateSeoMany(db, collection, result.items, hasSeo);
		await hydrateBylinesMany(db, collection, result.items);
		return {
			success: true,
			data: {
				items: result.items,
				nextCursor: result.nextCursor,
				total: result.total
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		if (error instanceof ContentCollectionNotFoundError || isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		if (isMissingColumnError(error, "deleted_at")) return {
			success: false,
			error: {
				code: "COLLECTION_SCHEMA_MISMATCH",
				message: `Collection '${collection}' backing table is missing the 'deleted_at' column`
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content list error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_LIST_ERROR",
				message: "Failed to list content"
			}
		};
	}
}
/**
* List the distinct authors of a collection's live content.
*
* Backs the admin content-list author filter. Unlike `/admin/users` (ADMIN
* only), this is gated on `content:read`, so any editor can filter by author.
* Returns only users who have authored at least one non-trashed entry, sorted
* by display name then email for a stable dropdown order.
*/
async function handleContentAuthors(db, collection) {
	try {
		const authorIds = await new ContentRepository(db).findDistinctAuthorIds(collection);
		if (authorIds.length === 0) return {
			success: true,
			data: { items: [] }
		};
		return {
			success: true,
			data: { items: (await new UserRepository(db).findByIds(authorIds)).map((u) => ({
				id: u.id,
				name: u.name,
				email: u.email,
				avatarUrl: u.avatarUrl
			})).toSorted((a, b) => (a.name ?? a.email).localeCompare(b.name ?? b.email)) }
		};
	} catch (error) {
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		console.error("Content authors error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_AUTHORS_ERROR",
				message: "Failed to list content authors"
			}
		};
	}
}
/**
* Get single content item
*/
async function handleContentGet(db, collection, id, locale, referenceOptions) {
	try {
		const item = await new ContentRepository(db).findByIdOrSlug(collection, id, locale ? resolveConfiguredLocale(locale) : void 0);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		await hydrateBylines(db, collection, item);
		if (referenceOptions) await hydrateReferences(db, collection, item, referenceOptions.includeDrafts);
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		console.error("Content get error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_GET_ERROR",
				message: "Failed to get content"
			}
		};
	}
}
/**
* Get a content item by id, including trashed items.
* Used by restore endpoint for ownership checks on soft-deleted items.
*/
async function handleContentGetIncludingTrashed(db, collection, id, locale) {
	try {
		const item = await new ContentRepository(db).findByIdOrSlugIncludingTrashed(collection, id, locale ? resolveConfiguredLocale(locale) : void 0);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		await hydrateBylines(db, collection, item);
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		console.error("Content get error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_GET_ERROR",
				message: "Failed to get content"
			}
		};
	}
}
/**
* Create content item.
*
* Content + SEO writes are wrapped in a transaction so either both succeed
* or neither does. If `body.seo` is provided for a non-SEO collection, the
* API returns a validation error rather than silently dropping it.
*/
async function handleContentCreate(db, collection, body) {
	try {
		const hasSeo = await collectionHasSeo(db, collection);
		if (body.seo && !hasSeo) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: `Collection "${collection}" does not have SEO enabled. Remove the seo field or enable SEO on this collection.`
			}
		};
		const storagelessKeys = await storagelessDataKeys(db, collection, body.data);
		if (storagelessKeys.length > 0) return storagelessDataKeyError(storagelessKeys);
		const mimeCheck = await validateMediaFields(db, collection, body.data);
		if (!mimeCheck.success) return mimeCheck;
		const requiredReferences = await validateRequiredReferencesPresent(db, collection, body.references, body.translationOf);
		if (!requiredReferences.success) return requiredReferences;
		let redirectChanged = false;
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const bylineRepo = new BylineRepository(trx);
			const inheritedFields = body.translationOf ? (await trx.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").select("field.slug").where("collection.slug", "=", collection).where("field.translatable", "=", 0).execute()).map((field) => field.slug) : [];
			const referenceWrites = [];
			if (body.references) {
				const entryGroup = body.translationOf ? (await repo.findById(collection, body.translationOf))?.translationGroup ?? null : null;
				for (const [fieldSlug, selectedIds] of Object.entries(body.references)) {
					const resolved = await resolveReferenceSelectionTargets(trx, collection, fieldSlug, selectedIds, entryGroup);
					if (!resolved.success) throw Object.assign(new Error(resolved.error.message), { apiError: { code: resolved.error.code } });
					referenceWrites.push(resolved.data);
				}
			}
			const effectiveLocale = body.locale ? resolveConfiguredLocale(body.locale) : getI18nConfig()?.defaultLocale;
			let slug = body.slug;
			if (!slug) {
				const slugSource = getSlugSource(body.data, await getCollectionTitleField(trx, collection));
				if (slugSource) slug = await repo.generateUniqueSlug(collection, slugSource, effectiveLocale);
			}
			if (body.status === "published") requireRoutablePublishSlug((await getCollectionPublishConfig(trx, collection)).routable, slug);
			const created = await repo.create({
				type: collection,
				slug,
				data: body.data,
				status: body.status || "draft",
				authorId: body.authorId,
				locale: effectiveLocale,
				translationOf: body.translationOf,
				inheritFields: inheritedFields,
				createdAt: body.createdAt,
				publishedAt: body.publishedAt
			});
			if (body.bylines !== void 0) created.primaryBylineId = (await bylineRepo.setContentBylines(collection, created.id, body.bylines))[0]?.byline.translationGroup ?? null;
			if (body.translationOf) {
				if (body.bylines === void 0) {
					await bylineRepo.copyContentBylines(collection, body.translationOf, created.id);
					const source = await repo.findById(collection, body.translationOf);
					if (source) created.primaryBylineId = source.primaryBylineId;
				}
			}
			await hydrateBylines(trx, collection, created);
			if (body.seo && hasSeo) created.seo = await new SeoRepository(trx).upsert(collection, created.id, body.seo);
			else if (hasSeo) created.seo = { ...SEO_DEFAULTS };
			if (body.taxonomies) await assignTaxonomies(trx, collection, created.id, effectiveLocale, body.taxonomies);
			if (created.translationGroup) for (const write of referenceWrites) await writeReferenceSelection(trx, {
				...write,
				entryGroup: created.translationGroup
			});
			if (created.status === "published") redirectChanged = await removeShadowingAutoRedirect(trx, collection, created.slug, created.id, created.publishedAt);
			return created;
		});
		if (redirectChanged) after(() => publishRedirectChanges(db));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (hasApiError(error)) return {
			success: false,
			error: {
				code: error.apiError.code,
				message: error.message
			}
		};
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof ContentSlugConflictError) return {
			success: false,
			error: {
				code: "SLUG_CONFLICT",
				message: `Slug '${body.slug ?? "(auto-generated)"}' already exists in collection '${collection}'`
			}
		};
		if (error instanceof EmDashValidationError) {
			if (error.message === "Translation source content not found") return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: error.message
				}
			};
			return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: error.message
				}
			};
		}
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if (message.includes("unique constraint failed") || message.includes("duplicate key")) {
			if (message.includes("active_tg_locale") || message.includes("translation_group") && message.includes("locale")) return {
				success: false,
				error: {
					code: "CONFLICT",
					message: `Translation already exists in locale "${body.locale ?? getI18nConfig()?.defaultLocale ?? "en"}" for this content item`
				}
			};
			if (message.includes("slug")) return {
				success: false,
				error: {
					code: "SLUG_CONFLICT",
					message: `Slug '${body.slug ?? "(auto-generated)"}' already exists in collection '${collection}'`
				}
			};
			return {
				success: false,
				error: {
					code: "CONFLICT",
					message: "Unique constraint violation"
				}
			};
		}
		console.error("Content create error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_CREATE_ERROR",
				message: "Failed to create content"
			}
		};
	}
}
/**
* Update content item.
* If `_rev` is provided, validates it against the current version before writing.
* No `_rev` = blind write (backwards-compatible for admin UI).
*
* Content + SEO writes are wrapped in a transaction for atomicity.
*/
async function handleContentUpdate(db, collection, id, body) {
	try {
		const hasSeo = await collectionHasSeo(db, collection);
		if (body.seo && !hasSeo) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: `Collection "${collection}" does not have SEO enabled. Remove the seo field or enable SEO on this collection.`
			}
		};
		if (body.data) {
			const mimeCheck = await validateMediaFields(db, collection, body.data);
			if (!mimeCheck.success) return mimeCheck;
		}
		const repo = new ContentRepository(db);
		const resolvedId = await resolveId(repo, collection, id, body.locale) ?? id;
		if (body.data) {
			const storagelessKeys = await storagelessDataKeys(db, collection, body.data);
			if (storagelessKeys.length > 0) {
				const stored = await repo.findById(collection, resolvedId);
				const changed = changedStoragelessDataKeys(new Set(storagelessKeys), body.data, stored?.data ?? {});
				if (changed.length > 0) return storagelessDataKeyError(changed);
			}
		}
		let redirectChanged = false;
		const item = await withTransaction(db, async (trx) => {
			const trxRepo = new ContentRepository(trx);
			const bylineRepo = new BylineRepository(trx);
			const existing = body._rev || body.slug !== void 0 || body.status === "published" ? await trxRepo.findById(collection, resolvedId) : null;
			if (body._rev) {
				if (!existing) throw Object.assign(/* @__PURE__ */ new Error(`Content item not found: ${id}`), { apiError: { code: "NOT_FOUND" } });
				const revCheck = validateRev(body._rev, existing);
				if (!revCheck.valid) throw Object.assign(new Error(revCheck.message), { apiError: { code: "CONFLICT" } });
			}
			let oldSlug;
			if (body.slug && existing?.slug && existing.slug !== body.slug) oldSlug = existing.slug;
			if ((body.status ?? existing?.status) === "published") {
				if (!existing) throw Object.assign(/* @__PURE__ */ new Error(`Content item not found: ${id}`), { apiError: { code: "NOT_FOUND" } });
				const publishConfig = await getCollectionPublishConfig(trx, collection);
				const intendedSlug = body.slug !== void 0 ? body.slug : existing.slug;
				requireRoutablePublishSlug(publishConfig.routable, intendedSlug);
			}
			const referenceWrites = [];
			if (body.references) for (const [fieldSlug, selectedIds] of Object.entries(body.references)) {
				const resolved = await resolveReferenceSelection(trx, collection, resolvedId, fieldSlug, selectedIds);
				if (!resolved.success) throw Object.assign(new Error(resolved.error.message), { apiError: { code: resolved.error.code } });
				referenceWrites.push(resolved.data);
			}
			const { supportsRevisions } = await getCollectionPublishConfig(trx, collection);
			const updated = await trxRepo.update(collection, resolvedId, {
				data: body.data,
				slug: body.slug,
				locale: existing?.locale ?? body.locale,
				status: body.status,
				authorId: body.authorId,
				publishedAt: body.publishedAt,
				...supportsRevisions ? {} : { draftRevisionId: null }
			}, body._rev ? decodeRevisionPrecondition(body._rev) : void 0);
			if (body.bylines !== void 0) updated.primaryBylineId = (await bylineRepo.setContentBylines(collection, resolvedId, body.bylines))[0]?.byline.translationGroup ?? null;
			if (oldSlug && body.slug && existing?.status === "published") redirectChanged = await createSlugChangeRedirect(trx, collection, oldSlug, body.slug, resolvedId, existing?.publishedAt ?? null, updated.publishedAt ?? null);
			if (isI18nEnabled() && body.data && updated.translationGroup) await trxRepo.syncNonTranslatableFields(collection, updated.id, updated.translationGroup, body.data);
			if (body.seo && hasSeo) updated.seo = await new SeoRepository(trx).upsert(collection, resolvedId, body.seo);
			else if (hasSeo) updated.seo = await new SeoRepository(trx).get(collection, resolvedId);
			await hydrateBylines(trx, collection, updated);
			if (body.taxonomies) await assignTaxonomies(trx, collection, resolvedId, updated.locale ?? body.locale, body.taxonomies);
			for (const write of referenceWrites) await writeReferenceSelection(trx, write);
			if (updated.status === "published") redirectChanged = await removeShadowingAutoRedirect(trx, collection, updated.slug, updated.id, updated.publishedAt) || redirectChanged;
			return updated;
		});
		if (redirectChanged) after(() => publishRedirectChanges(db));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (hasApiError(error)) return {
			success: false,
			error: {
				code: error.apiError.code,
				message: error.message
			}
		};
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		if (error instanceof ContentSlugConflictError) return {
			success: false,
			error: {
				code: "SLUG_CONFLICT",
				message: `Slug '${body.slug ?? id}' already exists in collection '${collection}'`
			}
		};
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if (message.includes("unique constraint failed") || message.includes("duplicate key")) {
			if (message.includes("slug")) return {
				success: false,
				error: {
					code: "SLUG_CONFLICT",
					message: `Slug '${body.slug ?? id}' already exists in collection '${collection}'`
				}
			};
			return {
				success: false,
				error: {
					code: "CONFLICT",
					message: "Unique constraint violation"
				}
			};
		}
		console.error("Content update error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UPDATE_ERROR",
				message: "Failed to update content"
			}
		};
	}
}
/**
* Duplicate content item.
*
* Only copies SEO data if the collection has SEO enabled.
* Always returns consistent `seo` shape for SEO-enabled collections.
*/
async function handleContentDuplicate(db, collection, id, authorId) {
	try {
		const hasSeo = await collectionHasSeo(db, collection);
		return {
			success: true,
			data: { item: await withTransaction(db, async (trx) => {
				const repo = new ContentRepository(trx);
				const bylineRepo = new BylineRepository(trx);
				const resolvedId = await resolveId(repo, collection, id) ?? id;
				const original = await repo.findById(collection, resolvedId);
				const dup = await repo.duplicate(collection, resolvedId, authorId);
				if (original?.translationGroup && dup.translationGroup) {
					const relations = new RelationRepository(trx);
					throwIfReferenceLimitRefused(await relations.copyParentEdges(original.translationGroup, dup.translationGroup), "parent");
					for (const field of (await referenceFieldConstraints(trx, collection)).values()) {
						if (field.relationSide !== "child") continue;
						const parents = await relations.getParents(field.relation, original.translationGroup);
						if (parents.length === 0) continue;
						throwIfReferenceLimitRefused(await relations.setParents(field.relation, dup.translationGroup, parents.map((parent) => parent.parentGroup)), "child");
					}
				}
				const existingBylines = await bylineRepo.getContentBylines(collection, resolvedId);
				if (existingBylines.length > 0) await bylineRepo.setContentBylines(collection, dup.id, existingBylines.map((entry) => ({
					bylineId: entry.byline.id,
					roleLabel: entry.roleLabel
				})));
				if (hasSeo) {
					const seoRepo = new SeoRepository(trx);
					await seoRepo.copyForDuplicate(collection, resolvedId, dup.id);
					dup.seo = await seoRepo.get(collection, dup.id);
				}
				await hydrateBylines(trx, collection, dup);
				return dup;
			}) }
		};
	} catch (err) {
		if (err instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: err.message
			}
		};
		if (hasApiError(err)) return {
			success: false,
			error: {
				code: err.apiError.code,
				message: err.message
			}
		};
		console.error("Content duplicate error:", err);
		return {
			success: false,
			error: {
				code: "CONTENT_DUPLICATE_ERROR",
				message: "Failed to duplicate content"
			}
		};
	}
}
/**
* Delete content item (soft delete - moves to trash)
*/
async function handleContentDelete(db, collection, id) {
	try {
		const result = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			const deleted = await repo.delete(collection, resolvedId);
			if (deleted) await new EntryLockRepository(trx).releaseEntry(collection, resolvedId);
			return {
				id: resolvedId,
				deleted
			};
		});
		if (!result.deleted) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		return {
			success: true,
			data: {
				deleted: true,
				id: result.id
			}
		};
	} catch (error) {
		console.error("Content delete error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_DELETE_ERROR",
				message: "Failed to delete content"
			}
		};
	}
}
/**
* Restore content item from trash
*/
async function handleContentRestore(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveIdIncludingTrashed(repo, collection, id) ?? id;
			return repo.restore(collection, resolvedId, expectedRevision);
		});
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Trashed content item not found: ${id}`
			}
		};
		return {
			success: true,
			data: {
				restored: true,
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (isTranslationLocaleConflict(error, collection)) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: "An active translation already exists in this locale"
			}
		};
		console.error("Content restore error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_RESTORE_ERROR",
				message: "Failed to restore content"
			}
		};
	}
}
/**
* Permanently delete content item (cannot be undone).
* Also cleans up associated SEO data.
*/
async function handleContentPermanentDelete(db, collection, id) {
	try {
		const resolvedId = await resolveIdIncludingTrashed(new ContentRepository(db), collection, id) ?? id;
		if (!await withTransaction(db, async (trx) => {
			const trxRepo = new ContentRepository(trx);
			const item = await trxRepo.findByIdIncludingTrashed(collection, resolvedId);
			if (!item || item.deletedAt === null) return false;
			const lastOfGroup = item.translationGroup !== null ? !await trxRepo.hasTranslationsIncludingTrashed(collection, item.translationGroup, { excludeId: resolvedId }) : false;
			if (lastOfGroup && item.translationGroup) await new RelationRepository(trx).clearReferencesForGroup(item.translationGroup);
			const wasDeleted = await trxRepo.permanentDelete(collection, resolvedId);
			if (wasDeleted) {
				await new SeoRepository(trx).delete(collection, resolvedId);
				await new CommentRepository(trx).deleteByContent(collection, resolvedId);
				await new RevisionRepository(trx).deleteByEntry(collection, resolvedId);
				await new EntryLockRepository(trx).releaseEntry(collection, resolvedId);
				await new BylineRepository(trx).deleteContentBylines(collection, resolvedId);
				if (lastOfGroup && item.translationGroup) await new TaxonomyRepository(trx).clearEntryGroupTerms(collection, item.translationGroup);
			}
			return wasDeleted;
		})) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		return {
			success: true,
			data: {
				deleted: true,
				id: resolvedId
			}
		};
	} catch (error) {
		console.error("Content permanent delete error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_DELETE_ERROR",
				message: "Failed to permanently delete content"
			}
		};
	}
}
/**
* List trashed content items
*/
async function handleContentListTrashed(db, collection, options = {}) {
	try {
		const limit = Math.max(1, Math.min(options.limit || 50, 100));
		const offset = options.page === void 0 ? void 0 : pageOffset({
			page: options.page,
			limit,
			cursor: options.cursor
		});
		if (offset === null) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Invalid content page"
			}
		};
		const repo = new ContentRepository(db);
		const where = { locale: options.locale };
		const [rowsResult, countResult] = await Promise.allSettled([repo.findTrashed(collection, {
			limit,
			cursor: options.cursor,
			offset,
			where
		}), offset === void 0 ? void 0 : repo.countTrashed(collection, where)]);
		if (rowsResult.status === "rejected") throw rowsResult.reason;
		if (countResult.status === "rejected") throw countResult.reason;
		const result = rowsResult.value;
		return {
			success: true,
			data: {
				items: result.items.map((item) => ({
					id: item.id,
					type: item.type,
					slug: item.slug,
					status: item.status,
					locale: item.locale,
					translationGroup: item.translationGroup,
					data: item.data,
					authorId: item.authorId,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
					publishedAt: item.publishedAt,
					deletedAt: item.deletedAt
				})),
				nextCursor: result.nextCursor,
				total: countResult.value
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		console.error("Content list trashed error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_LIST_ERROR",
				message: "Failed to list trashed content"
			}
		};
	}
}
/**
* Count trashed content items
*/
async function handleContentCountTrashed(db, collection, options = {}) {
	try {
		return {
			success: true,
			data: { count: await new ContentRepository(db).countTrashed(collection, { locale: options.locale }) }
		};
	} catch (error) {
		console.error("Content count trashed error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_COUNT_ERROR",
				message: "Failed to count trashed content"
			}
		};
	}
}
/**
* Schedule content for future publishing
*/
async function handleContentSchedule(db, collection, id, scheduledAt, currentTime = /* @__PURE__ */ new Date(), _rev) {
	try {
		const expectedRevision = decodeRevisionPrecondition(_rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const existing = await repo.findByIdOrSlug(collection, id);
			const resolvedId = existing?.id ?? id;
			if (existing) {
				const publishConfig = await getCollectionPublishConfig(trx, collection);
				if (!publishConfig.supportsScheduling) throw new EmDashValidationError("Scheduling is disabled for this collection");
				requireRoutablePublishSlug(publishConfig.routable, existing.slug);
			}
			return repo.schedule(collection, resolvedId, scheduledAt, currentTime, expectedRevision);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content schedule error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_SCHEDULE_ERROR",
				message: "Failed to schedule content"
			}
		};
	}
}
/**
* Unschedule content (revert to draft)
*/
async function handleContentUnschedule(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			return repo.unschedule(collection, resolvedId, expectedRevision);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content unschedule error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UNSCHEDULE_ERROR",
				message: "Failed to unschedule content"
			}
		};
	}
}
/**
* Persist a permanent policy rejection and unschedule the publication.
* Databases with transactions commit both writes together. D1 persists the
* reason first so a failed option write cannot silently remove the entry from
* future sweeps; if unscheduling then fails, the due entry and its dashboard
* notice remain available for retry and operator action.
*/
async function handleScheduledPolicyRejection(db, collection, id, options) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			const optionsRepo = new OptionsRepository(trx);
			const rejectionKey = scheduledPolicyRejectionKey(collection, resolvedId);
			const rejectionRevision = await optionsRepo.setVersioned(rejectionKey, {
				...options.rejection,
				id: resolvedId
			});
			try {
				return await repo.unschedule(collection, resolvedId, expectedRevision);
			} catch (error) {
				if (error instanceof ContentMutationConflictError) try {
					await optionsRepo.compareAndDelete(rejectionKey, rejectionRevision);
				} catch (cleanupError) {
					console.error("Failed to clear stale scheduled policy rejection:", cleanupError);
				}
				throw error;
			}
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Scheduled policy rejection error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UNSCHEDULE_ERROR",
				message: "Failed to record scheduled publication rejection"
			}
		};
	}
}
/**
* Publish content immediately.
*
* Publication is one atomic content-row statement. On databases that support
* transactions, the slug redirect and the locale sync stay grouped with it.
*/
async function handleContentPublish(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		let redirectChanged = false;
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			const publishConfig = await getCollectionPublishConfig(trx, collection);
			const existing = await repo.findById(collection, resolvedId);
			const draftRevision = publishConfig.supportsRevisions && existing?.draftRevisionId ? await new RevisionRepository(trx).findById(existing.draftRevisionId) : void 0;
			const stagedReferences = draftRevision ? readStagedReferences(draftRevision.data) : void 0;
			const stagedReferenceBaselines = draftRevision ? readStagedReferenceBaselines(draftRevision.data) : void 0;
			if (existing?.translationGroup) {
				const valid = await validateStagedReferences(trx, collection, stagedReferences ?? {}, existing.translationGroup, stagedReferenceBaselines);
				if (!valid.success) throw Object.assign(new Error(valid.error.message), { apiError: { code: valid.error.code } });
				if (stagedReferences) {
					await assertPublishWillNotBeRefused(trx, collection, resolvedId, existing, {
						stagedSlug: readStagedSlug(draftRevision?.data),
						requireSlug: publishConfig.routable,
						requireDue: options.requireScheduledDue,
						expectedScheduledAt: options.expectedScheduledAt,
						expectedRevision
					});
					await applyStagedReferences(trx, collection, existing.translationGroup, stagedReferences, stagedReferenceBaselines);
				}
			}
			if (publishConfig.supportsRevisions && existing) {
				const entryGroup = existing.translationGroup;
				await repo.keepStartingRevision(new RevisionRepository(trx), collection, existing, () => liveReferenceData(trx, collection, entryGroup));
			}
			const published = await repo.publish(collection, resolvedId, options.publishedAt, options.requireScheduledDue, options.expectedScheduledAt, publishConfig.supportsRevisions, publishConfig.routable, expectedRevision, options.currentTime);
			if (publishConfig.supportsRevisions && published.liveRevisionId && published.translationGroup) await recordPublishedReferences(trx, collection, published.liveRevisionId, published.translationGroup);
			if (existing && isI18nEnabled() && publishConfig.supportsRevisions && published.translationGroup) await repo.syncNonTranslatableFields(collection, published.id, published.translationGroup, published.data, { previous: existing.data });
			if (existing?.status === "published" && existing.slug && published.slug && existing.slug !== published.slug) redirectChanged = await createSlugChangeRedirect(trx, collection, existing.slug, published.slug, resolvedId, existing.publishedAt ?? null, published.publishedAt ?? null);
			redirectChanged = await removeShadowingAutoRedirect(trx, collection, published.slug, published.id, published.publishedAt) || redirectChanged;
			return published;
		});
		if (redirectChanged) after(() => publishRedirectChanges(db));
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (hasApiError(error)) return {
			success: false,
			error: {
				code: error.apiError.code,
				message: error.message
			}
		};
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof ScheduledNotDueError) return {
			success: false,
			error: {
				code: "NOT_DUE",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) {
			const details = error.details;
			return {
				success: false,
				error: {
					code: typeof details === "object" && details !== null && "code" in details && details.code === "SLUG_CONFLICT" ? "SLUG_CONFLICT" : "VALIDATION_ERROR",
					message: error.message
				}
			};
		}
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if ((message.includes("unique constraint failed") || message.includes("duplicate key")) && message.includes("slug")) return {
			success: false,
			error: {
				code: "SLUG_CONFLICT",
				message: `The staged slug is already used by another entry in collection '${collection}'`
			}
		};
		console.error("Content publish error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_PUBLISH_ERROR",
				message: "Failed to publish content"
			}
		};
	}
}
/**
* Unpublish content (revert to draft).
*
* Wrapped in a transaction — unpublish may create a draft revision
* from the live version then update the status, which is multi-step.
*/
async function handleContentUnpublish(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			const { supportsRevisions } = await getCollectionPublishConfig(trx, collection);
			return repo.unpublish(collection, resolvedId, expectedRevision, supportsRevisions);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content unpublish error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UNPUBLISH_ERROR",
				message: "Failed to unpublish content"
			}
		};
	}
}
/**
* Count scheduled content items
*/
async function handleContentCountScheduled(db, collection) {
	try {
		return {
			success: true,
			data: { count: await new ContentRepository(db).countScheduled(collection) }
		};
	} catch (error) {
		console.error("Content count scheduled error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_COUNT_ERROR",
				message: "Failed to count scheduled content"
			}
		};
	}
}
/**
* Discard draft changes (revert to live version)
*/
async function handleContentDiscardDraft(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			return repo.discardDraft(collection, resolvedId, expectedRevision);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: error.message
			}
		};
		console.error("Content discard draft error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_DISCARD_DRAFT_ERROR",
				message: "Failed to discard draft"
			}
		};
	}
}
/**
* Compare live and draft revisions
*/
async function handleContentCompare(db, collection, id) {
	try {
		const entry = await new ContentRepository(db).findByIdOrSlug(collection, id);
		if (!entry) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		const revisionRepo = new RevisionRepository(db);
		const live = entry.liveRevisionId ? await revisionRepo.findById(entry.liveRevisionId) : null;
		const draft = entry.draftRevisionId ? await revisionRepo.findById(entry.draftRevisionId) : null;
		const liveReferences = entry.translationGroup ? await liveReferenceSelection(db, collection, entry.translationGroup) : {};
		const withReferences = (revisionData, staged) => {
			if (!revisionData) return void 0;
			const selection = {
				...liveReferences,
				...staged
			};
			if (Object.keys(selection).length === 0) return revisionData;
			return {
				...revisionData,
				[STAGED_REFERENCES_KEY]: selection
			};
		};
		return {
			success: true,
			data: {
				hasChanges: entry.draftRevisionId !== null && entry.draftRevisionId !== entry.liveRevisionId,
				live: withReferences(live?.data, {}) ?? null,
				draft: withReferences(draft?.data, readStagedReferences(draft?.data) ?? {}) ?? null
			}
		};
	} catch (error) {
		console.error("Content compare error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_COMPARE_ERROR",
				message: "Failed to compare revisions"
			}
		};
	}
}
/**
* Get all translations for a content item.
* Returns the item's translation group members with locale and status info.
*/
async function handleContentTranslations(db, collection, id) {
	try {
		const repo = new ContentRepository(db);
		const item = await repo.findByIdOrSlug(collection, id);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		if (!item.translationGroup) return {
			success: true,
			data: {
				translationGroup: item.id,
				translations: [{
					id: item.id,
					locale: item.locale,
					slug: item.slug,
					status: item.status,
					updatedAt: item.updatedAt
				}]
			}
		};
		const translations = await repo.findTranslations(collection, item.translationGroup);
		return {
			success: true,
			data: {
				translationGroup: item.translationGroup,
				translations: translations.map((t) => ({
					id: t.id,
					locale: t.locale,
					slug: t.slug,
					status: t.status,
					updatedAt: t.updatedAt
				}))
			}
		};
	} catch (error) {
		if (error instanceof Error) console.error("Content translations error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_TRANSLATIONS_ERROR",
				message: "Failed to get translations"
			}
		};
	}
}
/**
* Resolve a `{ taxonomyName: [slug, ...] }` map to term IDs and replace the
* entry's assignments for each named taxonomy.
*
* Shared by handleContentCreate and handleContentUpdate so both MCP entry
* points behave identically. Slug resolution is scoped to `locale`; passing
* `undefined` lets `findBySlug` fall back to its default (lowest locale code)
* so callers on single-locale sites don't need to know the site's default.
*
* Throws EmDashValidationError on unknown slug or wrong shape; the calling
* handler translates that into a VALIDATION_ERROR response.
*/
async function assignTaxonomies(trx, collection, entryId, locale, taxonomies) {
	const taxRepo = new TaxonomyRepository(trx);
	let anyChange = false;
	for (const [taxonomyName, slugs] of Object.entries(taxonomies)) {
		if (!Array.isArray(slugs)) throw new EmDashValidationError(`taxonomies.${taxonomyName} must be an array of term slugs`);
		const termIds = [];
		for (const slug of slugs) {
			if (typeof slug !== "string" || slug.length === 0) throw new EmDashValidationError(`taxonomies.${taxonomyName} contains a non-string or empty slug`);
			const term = await taxRepo.findBySlug(taxonomyName, slug, locale);
			if (!term) throw new EmDashValidationError(`Unknown taxonomy term: ${taxonomyName}='${slug}'${locale ? ` (locale '${locale}')` : ""}`);
			termIds.push(term.id);
		}
		await taxRepo.setTermsForEntry(collection, entryId, taxonomyName, termIds);
		anyChange = true;
	}
	if (anyChange) invalidateTermCache();
}
/** Pattern to add spaces before capital letters */
var CAMEL_CASE_PATTERN = /([A-Z])/g;
var FIRST_CHAR_PATTERN = /^./;
/**
* Map schema field types to editor field kinds.
*/
/** Field types that can be surfaced as list columns in the admin. */
var LIST_COLUMN_FIELD_TYPES = /* @__PURE__ */ new Set([
	"string",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect"
]);
var FIELD_TYPE_TO_KIND = {
	string: "string",
	slug: "string",
	url: "url",
	text: "richText",
	number: "number",
	integer: "number",
	boolean: "boolean",
	datetime: "datetime",
	select: "select",
	multiSelect: "multiSelect",
	portableText: "portableText",
	image: "image",
	file: "file",
	reference: "reference",
	json: "json",
	repeater: "repeater",
	blocks: "blocks"
};
/**
* Build collection descriptors from build-time config plus live database rows.
*
* Config collections are added first and win on slug conflicts. Runtime/manual
* collections have no Zod schema to inspect, so their field descriptors are
* synthesized from `_emdash_fields`.
*/
async function buildManifestCollections(collections, db) {
	const manifestCollections = {};
	for (const [name, definition] of Object.entries(collections)) {
		const fields = extractFieldDescriptors(definition.schema);
		manifestCollections[name] = {
			label: definition.admin.label,
			labelSingular: definition.admin.labelSingular || definition.admin.label,
			supports: definition.admin.supports || [],
			hasSeo: (definition.admin.supports || []).includes("seo"),
			routable: definition.admin.routable ?? true,
			fields
		};
	}
	if (!db) return manifestCollections;
	try {
		const storedCollections = await new SchemaRegistry(db).listCollectionsWithFields();
		const dbCollections = await Promise.all(storedCollections.map((collection) => expandCollectionBlockFields(db, collection)));
		const cardinality = await relationCardinality(db, dbCollections);
		for (const collection of dbCollections) {
			if (manifestCollections[collection.slug]) continue;
			const fields = {};
			for (const field of collection.fields) fields[field.slug] = dbFieldDescriptor(field, cardinality);
			const configuredListColumns = collection.admin?.listColumns ?? [];
			const fieldTypes = new Map(collection.fields.map((field) => [field.slug, field.type]));
			const listColumns = [];
			for (const slug of configuredListColumns) {
				if (listColumns.includes(slug)) continue;
				const fieldType = fieldTypes.get(slug);
				if (!fieldType || !LIST_COLUMN_FIELD_TYPES.has(fieldType)) {
					console.warn(`EmDash: Ignoring unsupported or unknown list column "${slug}" in collection "${collection.slug}".`);
					continue;
				}
				if (listColumns.length >= 4) {
					console.warn(`EmDash: Collection "${collection.slug}" declares more than 4 list columns; extra columns are ignored.`);
					break;
				}
				listColumns.push(slug);
			}
			manifestCollections[collection.slug] = {
				label: collection.label,
				labelSingular: collection.labelSingular || collection.label,
				supports: collection.supports || [],
				hasSeo: collection.hasSeo,
				urlPattern: collection.urlPattern,
				routable: collection.routable !== false,
				titleField: collection.titleField,
				dateField: collection.dateField,
				...collection.hidden ? { hidden: true } : {},
				...collection.icon ? { icon: collection.icon } : {},
				...collection.group ? { group: collection.group } : {},
				...collection.admin?.quickCreate === false ? { quickCreate: false } : {},
				listColumns: listColumns.length > 0 ? listColumns : void 0,
				fields
			};
		}
	} catch (error) {
		console.debug("EmDash: Could not load database collections for manifest:", error);
	}
	return manifestCollections;
}
/**
* Extract field descriptors from Zod schema
* Note: This is a simplified implementation that handles common types
*/
function extractFieldDescriptors(schema) {
	const fields = {};
	const shape = typeof schema._def?.shape === "function" ? schema._def.shape() : schema.shape || {};
	for (const [name, fieldSchema] of Object.entries(shape)) fields[name] = extractFieldType(name, fieldSchema);
	return fields;
}
/**
* Extract field type from Zod schema
*/
/** Type guard: check if a value is a non-null object */
function isObject(value) {
	return typeof value === "object" && value !== null;
}
function extractFieldType(name, schema) {
	if (!isObject(schema)) return {
		kind: "string",
		label: formatLabel(name)
	};
	if (schema.isPortableText) return {
		kind: "portableText",
		label: formatLabel(name)
	};
	if (schema.isImage) return {
		kind: "image",
		label: formatLabel(name)
	};
	if (schema.isReference) return {
		kind: "reference",
		label: formatLabel(name)
	};
	const def = isObject(schema._def) ? schema._def : void 0;
	switch (typeof def?.typeName === "string" ? def.typeName : void 0) {
		case "ZodString": return {
			kind: "string",
			label: formatLabel(name)
		};
		case "ZodNumber": return {
			kind: "number",
			label: formatLabel(name)
		};
		case "ZodBoolean": return {
			kind: "boolean",
			label: formatLabel(name)
		};
		case "ZodDate": return {
			kind: "datetime",
			label: formatLabel(name)
		};
		case "ZodEnum": {
			const values = Array.isArray(def?.values) ? def.values : [];
			return {
				kind: "select",
				label: formatLabel(name),
				options: values.filter((v) => typeof v === "string").map((v) => ({
					value: v,
					label: v.charAt(0).toUpperCase() + v.slice(1)
				}))
			};
		}
		case "ZodArray": return {
			kind: "array",
			label: formatLabel(name)
		};
		case "ZodObject": return {
			kind: "object",
			label: formatLabel(name)
		};
		case "ZodOptional":
		case "ZodDefault":
			if (def?.innerType) return extractFieldType(name, def.innerType);
			return {
				kind: "string",
				label: formatLabel(name)
			};
		default: return {
			kind: "string",
			label: formatLabel(name)
		};
	}
}
/**
* The limits of every relation a bound reference field names, by relation slug.
*
* Empty when nothing is bound, so a site with no reference fields never issues
* the query, and empty before migration 086 has created the table.
*/
async function relationCardinality(db, collections) {
	if (!collections.some((collection) => collection.fields.some(isStoragelessField))) return /* @__PURE__ */ new Map();
	try {
		const rows = await db.selectFrom("_emdash_relations").select([
			"slug",
			"max_children_per_parent",
			"max_parents_per_child"
		]).execute();
		return new Map(rows.map((row) => [row.slug, {
			maxChildrenPerParent: row.max_children_per_parent,
			maxParentsPerChild: row.max_parents_per_child
		}]));
	} catch (error) {
		if (isMissingTableError(error)) return /* @__PURE__ */ new Map();
		throw error;
	}
}
/**
* Whether the editor may select more than one entry for a bound reference
* field: the question the relation answers, from the end the field views.
*
* `validation.multiple` on the field row is a create-time input — it is what
* set the relation's limit — and the relation is what the write path enforces.
* Reading the field back would let the two disagree, which is what happens when
* a later edit rewrites the row's validation without it.
*/
function boundReferenceIsMultiple(validation, cardinality) {
	return (validation.relationSide === "child" ? cardinality.maxParentsPerChild : cardinality.maxChildrenPerParent) !== 1;
}
function dbFieldDescriptor(field, cardinality) {
	const entry = {
		kind: field.unsupportedType ? "unsupported" : FIELD_TYPE_TO_KIND[field.type],
		label: field.label,
		required: field.required,
		translatable: field.translatable,
		id: field.id
	};
	if (field.unsupportedType) entry.unsupportedType = field.unsupportedType;
	else entry.type = field.type;
	if (field.type === "integer") entry.integer = true;
	if (field.blockTypes) entry.blockTypes = field.blockTypes;
	if (field.blockTypeFingerprint) entry.blockTypeFingerprint = field.blockTypeFingerprint;
	if (field.widget) entry.widget = field.widget;
	if (field.options) entry.options = field.options;
	if (field.validation?.options) entry.options = field.validation.options.map((value) => ({
		value,
		label: value.charAt(0).toUpperCase() + value.slice(1)
	}));
	if (field.validation) {
		const validation = { ...field.validation };
		if (isStoragelessField(field) && field.validation.relation) {
			const limits = cardinality.get(field.validation.relation);
			if (limits) validation.multiple = boundReferenceIsMultiple(field.validation, limits);
		}
		entry.validation = validation;
	}
	if (field.defaultValue !== void 0 && !isStoragelessField(field)) entry.defaultValue = field.defaultValue;
	return entry;
}
/**
* Format field name as label
*/
function formatLabel(name) {
	return name.replace(CAMEL_CASE_PATTERN, " $1").replace(FIRST_CHAR_PATTERN, (str) => str.toUpperCase()).trim();
}
/**
* List revisions for a content entry
*/
async function handleRevisionList(db, collection, entryId, params = {}) {
	try {
		const repo = new RevisionRepository(db);
		const [items, total] = await Promise.all([repo.findByEntry(collection, entryId, { limit: Math.max(1, Math.min(params.limit || 50, 100)) }), repo.countByEntry(collection, entryId)]);
		return {
			success: true,
			data: {
				items,
				total
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REVISION_LIST_ERROR",
				message: "Failed to list revisions"
			}
		};
	}
}
/**
* Everyone who edited a content entry in the revisions newer than `since`, newest first and once
* each. With no `since`, everyone who edited it.
*/
async function handleRevisionEditors(db, collection, entryId, since) {
	try {
		return {
			success: true,
			data: { items: await new RevisionRepository(db).findEditorsSince(collection, entryId, since) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REVISION_EDITORS_ERROR",
				message: "Failed to list revision editors"
			}
		};
	}
}
/**
* Get a specific revision
*/
async function handleRevisionGet(db, revisionId) {
	try {
		const item = await new RevisionRepository(db).findById(revisionId);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Revision not found: ${revisionId}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REVISION_GET_ERROR",
				message: "Failed to get revision"
			}
		};
	}
}
/**
* Restore a revision (updates content to this revision's data and creates new revision)
*/
async function handleRevisionRestore(db, revisionId, callerUserId) {
	try {
		const revision = await new RevisionRepository(db).findById(revisionId);
		if (!revision) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Revision not found: ${revisionId}`
			}
		};
		const stagedReferences = readStagedReferences(revision.data);
		if (stagedReferences) {
			const entry = await new ContentRepository(db).findById(revision.collection, revision.entryId);
			if (entry?.translationGroup) {
				const valid = await validateStagedReferences(db, revision.collection, stagedReferences, entry.translationGroup);
				if (!valid.success) return valid;
			}
		}
		const restoredData = { ...revision.data };
		delete restoredData[STAGED_REFERENCES_BASELINE_KEY];
		const { item, revisionId: queuedRevisionId } = await new ContentRepository(db).restoreRevision(revision.collection, revision.entryId, restoredData, callerUserId);
		if (stagedReferences && item.translationGroup) await applyStagedReferences(db, revision.collection, item.translationGroup, stagedReferences);
		const pruneRepo = new RevisionRepository(db);
		after(async () => {
			try {
				await pruneRepo.pruneQueuedEntry(revision.collection, revision.entryId, queuedRevisionId, 50);
			} catch (error) {
				console.error(`[revisions] Failed to prune revisions for ${revision.collection}/${revision.entryId}:`, error);
			}
		});
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "REVISION_RESTORE_ERROR",
				message: "Failed to restore revision"
			}
		};
	}
}
/**
* definePlugin() Helper
*
* Native plugin authoring entry. Returns a fully-resolved
* `ResolvedPlugin` ready for the host integration to mount.
*
* Sandboxed plugins do NOT use this function. They default-export
* a bare `{ hooks?, routes? }` object with a `satisfies SandboxedPlugin`
* annotation from `emdash/plugin`. See the `emdash` changeset for the
* authoring shape.
*/
var MCP_TOOL_NAME_PATTERN = /^[a-zA-Z0-9_-]+$/;
/**
* Define a native EmDash plugin.
*
* Native plugins ship as regular npm modules, get installed via
* `pnpm add` + an `astro.config.mjs` edit, and run in the host
* process. They have full access to the runtime — capabilities are
* still enforced by `PluginContextFactory`, but there is no isolation
* boundary.
*
* @example
* ```typescript
* import { definePlugin } from "emdash";
*
* export default definePlugin({
*   id: "my-plugin",
*   version: "1.0.0",
*   capabilities: ["content:write"],
*   hooks: {
*     "content:beforeSave": async (event, ctx) => {
*       ctx.log.info("Saving content", { collection: event.collection });
*       return event.content;
*     }
*   },
*   routes: {
*     "sync": {
*       handler: async (ctx) => {
*         return { status: "ok" };
*       }
*     }
*   }
* });
* ```
*
* Sandboxed-format plugins do not use `definePlugin`. They
* default-export a bare `{ hooks?, routes? }` object with a
* `satisfies SandboxedPlugin` annotation from `emdash/plugin`. Calling
* `definePlugin` with an object that has no `id` throws at runtime
* (the type system already rejects it at compile time — this check is
* for callers that bypass typechecking). Passing a plugin descriptor
* (an object with an `entrypoint`) also throws.
*/
function definePlugin(definition) {
	if (typeof definition.id !== "string" || definition.id.length === 0) throw new Error(`definePlugin() requires \`id\` (got ${typeof definition.id}). For native plugins, make sure your definition has both \`id\` and \`version\`. For sandboxed plugins, drop \`definePlugin()\` entirely and \`export default { hooks, routes } satisfies SandboxedPlugin\` from "emdash/plugin" — identity comes from \`emdash-plugin.jsonc\`.`);
	if ("entrypoint" in definition) throw new Error(`definePlugin() received a plugin descriptor for "${definition.id}" (it has an \`entrypoint\`). Pass the descriptor directly to the \`plugins\` array of the emdash() integration instead of wrapping it in definePlugin().`);
	return defineNativePlugin(definition);
}
/**
* Internal: define a native-format plugin with full validation and normalization.
*/
function defineNativePlugin(definition) {
	const SIMPLE_ID = /^[a-z0-9-]+$/;
	const SCOPED_ID = /^@[a-z0-9-]+\/[a-z0-9-]+$/;
	const SEMVER_PATTERN = /^\d+\.\d+\.\d+/;
	const { id, displayName, description, version, capabilities = [], allowedHosts = [], hooks = {}, routes = {}, mcp = { tools: {} }, admin = {} } = definition;
	const storage = definition.storage ?? {};
	if (!SIMPLE_ID.test(id) && !SCOPED_ID.test(id)) throw new Error(`Invalid plugin id "${id}". Must be lowercase alphanumeric with dashes (e.g., "my-plugin" or "@scope/my-plugin").`);
	if (!SEMVER_PATTERN.test(version)) throw new Error(`Invalid plugin version "${version}". Must be semver format (e.g., "1.0.0").`);
	for (const [name, tool] of Object.entries(mcp.tools)) {
		if (!MCP_TOOL_NAME_PATTERN.test(name)) throw new Error(`Invalid MCP tool name "${name}" in plugin "${id}".`);
		const route = routes[tool.route];
		if (!route) throw new Error(`MCP tool "${name}" references unknown route "${tool.route}".`);
		if (route.public) throw new Error(`MCP tool "${name}" cannot reference a public route.`);
		if (route.response === "raw") throw new Error(`MCP tool "${name}" cannot reference a raw response route.`);
		if (!isJsonPostRouteContract(route)) throw new Error(`MCP tool "${name}" must reference a POST-compatible JSON route.`);
		if (!route.permission) throw new Error(`MCP route "${tool.route}" must declare a permission.`);
	}
	for (const [kind, extensions] of [["editor panel", admin.editorPanels], ["editor action", admin.editorActions]]) for (const extension of extensions ?? []) {
		const route = routes[extension.route];
		if (!route) throw new Error(`Plugin ${kind} "${extension.id}" references unknown route "${extension.route}".`);
		if (route.public) throw new Error(`Plugin ${kind} "${extension.id}" must reference a private route.`);
		if (!isJsonPostRouteContract(route)) throw new Error(`Plugin ${kind} "${extension.id}" must reference a route that accepts POST JSON requests and returns JSON.`);
	}
	if ((admin.pages?.length ?? 0) > 0 || (admin.widgets?.length ?? 0) > 0) {
		const adminRoute = routes.admin;
		if (adminRoute && (adminRoute.public === true || !isJsonPostRouteContract(adminRoute))) throw new Error("Block Kit admin route must accept POST JSON requests and return JSON.");
	}
	const validCapabilities = new Set(PLUGIN_CAPABILITIES);
	for (const cap of capabilities) if (!validCapabilities.has(cap)) throw new Error(`Invalid capability "${cap}" in plugin "${id}".`);
	warnDeprecatedPluginCapabilities(id, capabilities);
	return {
		id,
		displayName,
		description,
		version,
		capabilities: normalizePluginCapabilities(capabilities),
		allowedHosts,
		storage,
		hooks: resolveHooks(hooks, id),
		routes,
		mcp,
		admin
	};
}
/**
* Resolve hooks to normalized format with defaults.
*
* PluginHooks and ResolvedPluginHooks share the same keys — each input value is
* `HookConfig<H> | H` and the output is `ResolvedHook<H>`.  TS can't narrow
* the handler type through a dynamic key, so we assert at the loop boundary.
*/
function resolveHooks(hooks, pluginId) {
	const resolved = {};
	for (const key of Object.keys(hooks)) {
		const hook = hooks[key];
		if (hook) resolved[key] = resolveHook(hook, pluginId);
	}
	return resolved;
}
/**
* Check if a hook value is a config object (has a `handler` property)
*/
function isHookConfig(hook) {
	return typeof hook === "object" && hook !== null && "handler" in hook;
}
/**
* Resolve a single hook to normalized format
*/
function resolveHook(hook, pluginId) {
	if (isHookConfig(hook)) {
		if (hook.exclusive !== void 0 && typeof hook.exclusive !== "boolean") throw new Error(`Invalid "exclusive" value in hook config for plugin "${pluginId}". Must be boolean.`);
		return {
			priority: hook.priority ?? 100,
			timeout: hook.timeout ?? 5e3,
			dependencies: hook.dependencies ?? [],
			errorPolicy: hook.errorPolicy ?? "abort",
			exclusive: hook.exclusive ?? false,
			handler: hook.handler,
			pluginId
		};
	}
	return {
		priority: 100,
		timeout: 5e3,
		dependencies: [],
		errorPolicy: "abort",
		exclusive: false,
		handler: hook,
		pluginId
	};
}
/**
* Plugin Hooks System v2
*
* Uses the unified PluginContext for all hooks.
* Manages lifecycle hooks with:
* - Deterministic ordering via priority + dependencies
* - Timeout enforcement
* - Error isolation
* - Observability
*
*/
/** A host-enforced hook deadline, distinct from an error thrown by plugin code. */
var HookTimeoutError = class extends Error {
	constructor(timeout) {
		super(`Hook timeout after ${timeout}ms`);
	}
};
var CONTENT_SAVE_HOOK_CONTEXT_KEY = Symbol.for("emdash:content-save-hook-context");
var contentSaveHookContext = globalThis[CONTENT_SAVE_HOOK_CONTEXT_KEY] ?? new AsyncLocalStorage();
globalThis[CONTENT_SAVE_HOOK_CONTEXT_KEY] = contentSaveHookContext;
function getActiveContentSaveHookName() {
	return contentSaveHookContext.getStore();
}
function assignSaveHookDetails(event, details) {
	if (details.locale !== void 0) event.locale = details.locale;
	if (details.translationOf !== void 0) event.translationOf = details.translationOf;
	if (details.editedBy !== void 0) event.editedBy = [...details.editedBy];
}
/**
* Hook pipeline for executing hooks in order
*/
var HookPipeline = class HookPipeline {
	hooks = /* @__PURE__ */ new Map();
	pluginMap = /* @__PURE__ */ new Map();
	contextFactory = null;
	/** Stored so setContextFactory can merge incrementally. */
	contextFactoryOptions = {};
	/** Hook names where at least one handler declared exclusive: true */
	exclusiveHookNames = /* @__PURE__ */ new Set();
	/**
	* Selected provider plugin ID for each exclusive hook.
	* Set by the PluginManager after resolution.
	*/
	exclusiveSelections = /* @__PURE__ */ new Map();
	constructor(plugins, factoryOptions) {
		if (factoryOptions) {
			this.contextFactory = new PluginContextFactory(factoryOptions);
			this.contextFactoryOptions = { ...factoryOptions };
		}
		for (const plugin of plugins) this.pluginMap.set(plugin.id, plugin);
		this.registerPlugins(plugins);
	}
	/**
	* Set or update the context factory options.
	*
	* When called on a pipeline that already has a factory, the new options
	* are merged on top of the existing ones so that callers don't need to
	* repeat every field (e.g. adding `cronReschedule` without losing
	* `storage` / `getUploadUrl`).
	*/
	setContextFactory(options) {
		const merged = {
			...this.contextFactoryOptions,
			...options
		};
		this.contextFactory = new PluginContextFactory(merged);
		this.contextFactoryOptions = merged;
	}
	/**
	* Get context for a plugin
	*/
	getContext(pluginId) {
		const plugin = this.pluginMap.get(pluginId);
		if (!plugin) throw new Error(`Plugin "${pluginId}" not found`);
		if (!this.contextFactory) throw new Error("Context factory not initialized - call setContextFactory first");
		return this.contextFactory.createContext(plugin);
	}
	/**
	* Get typed hooks for a specific hook name.
	* The internal map stores ResolvedHook<unknown>, but we know each name
	* maps to a specific handler type via HookHandlerMap.
	*
	* Exclusive hooks that have a selected provider are filtered out — they
	* should only run via invokeExclusiveHook(), not in the regular pipeline.
	*/
	getTypedHooks(name) {
		const all = this.hooks.get(name) ?? [];
		if (this.exclusiveSelections.has(name)) return all.filter((h) => !h.exclusive);
		return all;
	}
	/**
	* Register all hooks from plugins.
	*
	* Registers each hook name individually to preserve type safety. The
	* internal map stores ResolvedHook<unknown> since it's keyed by string,
	* but getTypedHooks() restores the correct handler type on retrieval.
	*/
	registerPlugins(plugins) {
		for (const plugin of plugins) {
			this.registerPluginHook(plugin, "plugin:install");
			this.registerPluginHook(plugin, "plugin:activate");
			this.registerPluginHook(plugin, "plugin:deactivate");
			this.registerPluginHook(plugin, "plugin:uninstall");
			this.registerPluginHook(plugin, "content:beforeSave");
			this.registerPluginHook(plugin, "content:afterSave");
			this.registerPluginHook(plugin, "content:beforeDelete");
			this.registerPluginHook(plugin, "content:afterDelete");
			this.registerPluginHook(plugin, "content:beforePublish");
			this.registerPluginHook(plugin, "content:beforeSchedule");
			this.registerPluginHook(plugin, "content:beforeUnpublish");
			this.registerPluginHook(plugin, "content:afterPublish");
			this.registerPluginHook(plugin, "content:afterUnpublish");
			this.registerPluginHook(plugin, "content:afterRestore");
			this.registerPluginHook(plugin, "content:afterSchedule");
			this.registerPluginHook(plugin, "content:afterUnschedule");
			this.registerPluginHook(plugin, "media:beforeUpload");
			this.registerPluginHook(plugin, "media:afterUpload");
			this.registerPluginHook(plugin, "cron");
			this.registerPluginHook(plugin, "email:beforeSend");
			this.registerPluginHook(plugin, "email:deliver");
			this.registerPluginHook(plugin, "email:afterSend");
			this.registerPluginHook(plugin, "comment:beforeCreate");
			this.registerPluginHook(plugin, "comment:moderate");
			this.registerPluginHook(plugin, "comment:afterCreate");
			this.registerPluginHook(plugin, "comment:afterModerate");
			this.registerPluginHook(plugin, "byline:afterSave");
			this.registerPluginHook(plugin, "byline:afterDelete");
			this.registerPluginHook(plugin, "page:metadata");
			this.registerPluginHook(plugin, "page:fragments");
		}
		for (const [hookName, hooks] of this.hooks) this.hooks.set(hookName, this.sortHooks(hooks));
	}
	/**
	* Maps hook names to the capability required to register them.
	*
	* Hooks not listed here have no capability requirement (e.g. lifecycle
	* hooks, cron). Any plugin declaring a listed hook without the required
	* capability will have that hook silently skipped at registration time.
	*/
	static HOOK_REQUIRED_CAPABILITY = /* @__PURE__ */ new Map([
		["email:beforeSend", "hooks.email-events:register"],
		["email:afterSend", "hooks.email-events:register"],
		["email:deliver", "hooks.email-transport:register"],
		["content:beforeSave", "content:write"],
		["content:afterSave", "content:read"],
		["content:beforeDelete", "content:read"],
		["content:afterDelete", "content:read"],
		["content:beforePublish", "hooks.content-policy:register"],
		["content:beforeSchedule", "hooks.content-policy:register"],
		["content:beforeUnpublish", "hooks.content-policy:register"],
		["content:afterPublish", "content:read"],
		["content:afterUnpublish", "content:read"],
		["content:afterRestore", "content:read"],
		["content:afterSchedule", "content:read"],
		["content:afterUnschedule", "content:read"],
		["media:beforeUpload", "media:write"],
		["media:afterUpload", "media:read"],
		["comment:beforeCreate", "users:read"],
		["comment:moderate", "users:read"],
		["comment:afterCreate", "users:read"],
		["comment:afterModerate", "users:read"],
		["byline:afterSave", "bylines:read"],
		["byline:afterDelete", "bylines:read"],
		["page:fragments", "hooks.page-fragments:register"]
	]);
	/**
	* Register a single plugin's hook by name
	*/
	registerPluginHook(plugin, name) {
		const hook = plugin.hooks[name];
		if (!hook) return;
		const requiredCapability = HookPipeline.HOOK_REQUIRED_CAPABILITY.get(name);
		if (requiredCapability && !plugin.capabilities.includes(requiredCapability)) {
			console.warn(`[hooks] Plugin "${plugin.id}" declares ${name} hook without ${requiredCapability} capability — skipping`);
			return;
		}
		if (hook.exclusive) this.exclusiveHookNames.add(name);
		this.registerHook(name, hook);
	}
	/**
	* Register a single hook
	*/
	registerHook(name, hook) {
		const existing = this.hooks.get(name) || [];
		existing.push(hook);
		this.hooks.set(name, existing);
	}
	/**
	* Sort hooks by priority and dependencies
	*/
	sortHooks(hooks) {
		const sorted = [];
		const remaining = [...hooks];
		while (remaining.length > 0) {
			const ready = remaining.filter((hook) => hook.dependencies.every((dep) => sorted.some((s) => s.pluginId === dep)));
			if (ready.length === 0) {
				const pluginIds = remaining.map((h) => h.pluginId).join(", ");
				console.warn(`[hooks] Hook dependency cycle or missing dependency detected among plugins: ${pluginIds}. Falling back to priority order.`);
				remaining.sort((a, b) => a.priority - b.priority);
				sorted.push(...remaining);
				break;
			}
			ready.sort((a, b) => a.priority - b.priority);
			const next = ready[0];
			sorted.push(next);
			remaining.splice(remaining.indexOf(next), 1);
		}
		return sorted;
	}
	/**
	* Execute a hook with timeout
	*/
	async executeWithTimeout(fn, timeout) {
		let timer;
		const timeoutPromise = new Promise((_, reject) => timer = setTimeout(() => reject(new HookTimeoutError(timeout)), timeout));
		try {
			return await Promise.race([fn(), timeoutPromise]);
		} finally {
			clearTimeout(timer);
		}
	}
	/**
	* Run plugin:install hooks
	*/
	async runPluginInstall(pluginId) {
		return this.runLifecycleHook("plugin:install", pluginId);
	}
	/**
	* Run plugin:activate hooks
	*/
	async runPluginActivate(pluginId) {
		return this.runLifecycleHook("plugin:activate", pluginId);
	}
	/**
	* Run plugin:deactivate hooks
	*/
	async runPluginDeactivate(pluginId) {
		return this.runLifecycleHook("plugin:deactivate", pluginId);
	}
	/**
	* Run plugin:uninstall hooks
	*/
	async runPluginUninstall(pluginId, deleteData) {
		const hooks = this.getTypedHooks("plugin:uninstall");
		const results = [];
		const hook = hooks.find((h) => h.pluginId === pluginId);
		if (!hook) return results;
		const { handler } = hook;
		const event = { deleteData };
		const ctx = this.getContext(pluginId);
		const start = Date.now();
		try {
			await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
			results.push({
				success: true,
				pluginId: hook.pluginId,
				duration: Date.now() - start
			});
		} catch (error) {
			results.push({
				success: false,
				error: error instanceof Error ? error : new Error(String(error)),
				pluginId: hook.pluginId,
				duration: Date.now() - start
			});
		}
		return results;
	}
	async runLifecycleHook(hookName, pluginId) {
		const hooks = this.getTypedHooks(hookName);
		const results = [];
		const hook = hooks.find((h) => h.pluginId === pluginId);
		if (!hook) return results;
		const { handler } = hook;
		const event = {};
		const ctx = this.getContext(pluginId);
		const start = Date.now();
		try {
			await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
			results.push({
				success: true,
				pluginId: hook.pluginId,
				duration: Date.now() - start
			});
		} catch (error) {
			results.push({
				success: false,
				error: error instanceof Error ? error : new Error(String(error)),
				pluginId: hook.pluginId,
				duration: Date.now() - start
			});
		}
		return results;
	}
	/**
	* Run content:beforeSave hooks
	* Returns modified content from the pipeline. `id` is the existing item's
	* ID when updating. `actor` is the authenticated user that triggered the
	* save, when one is available.
	*/
	async runContentBeforeSave(content, collection, isNew, id, actor, details = {}) {
		const hooks = this.getTypedHooks("content:beforeSave");
		const results = [];
		let currentContent = content;
		for (const hook of hooks) {
			const { handler } = hook;
			const event = {
				content: currentContent,
				collection,
				isNew
			};
			if (id !== void 0) event.id = id;
			if (actor !== void 0) event.actor = { ...actor };
			assignSaveHookDetails(event, details);
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				const result = await contentSaveHookContext.run("content:beforeSave", () => this.executeWithTimeout(() => handler(event, ctx), hook.timeout));
				if (result !== void 0) currentContent = result;
				results.push({
					success: true,
					value: currentContent,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			} catch (error) {
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (hook.errorPolicy === "abort") throw error;
			}
		}
		return {
			content: currentContent,
			results
		};
	}
	/**
	* Run content:afterSave hooks
	*/
	async runContentAfterSave(content, collection, isNew, actor, excludePluginId, details = {}) {
		const hooks = this.getTypedHooks("content:afterSave");
		const results = [];
		for (const hook of hooks) {
			if (hook.pluginId === excludePluginId) continue;
			const { handler } = hook;
			const event = {
				content,
				collection,
				isNew
			};
			if (actor !== void 0) event.actor = { ...actor };
			assignSaveHookDetails(event, details);
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				await contentSaveHookContext.run("content:afterSave", () => this.executeWithTimeout(() => handler(event, ctx), hook.timeout));
				results.push({
					success: true,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			} catch (error) {
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (hook.errorPolicy === "abort") throw error;
			}
		}
		return results;
	}
	/**
	* Run content:beforeDelete hooks
	* Returns whether deletion is allowed
	*/
	async runContentBeforeDelete(id, collection) {
		const hooks = this.getTypedHooks("content:beforeDelete");
		const results = [];
		let allowed = true;
		for (const hook of hooks) {
			const { handler } = hook;
			const event = {
				id,
				collection,
				permanent: false
			};
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				const result = await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
				if (result === false) allowed = false;
				results.push({
					success: true,
					value: result !== false,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			} catch (error) {
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (hook.errorPolicy === "abort") throw error;
			}
		}
		return {
			allowed,
			results
		};
	}
	/**
	* Run content:afterDelete hooks
	*/
	async runContentAfterDelete(id, collection, permanent) {
		const hooks = this.getTypedHooks("content:afterDelete");
		const results = [];
		for (const hook of hooks) {
			const { handler } = hook;
			const event = {
				id,
				collection,
				permanent
			};
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
				results.push({
					success: true,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			} catch (error) {
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (hook.errorPolicy === "abort") throw error;
			}
		}
		return results;
	}
	async runContentPolicy(name, event) {
		if (name === "content:beforeSchedule") {
			if (!("scheduledAt" in event)) throw new Error("content:beforeSchedule requires scheduledAt");
			return this.runContentPolicyHooks(name, this.getTypedHooks(name), event);
		}
		return this.runContentPolicyHooks(name, this.getTypedHooks(name), event);
	}
	async runContentPolicyHooks(name, hooks, event) {
		const results = [];
		for (const hook of hooks) {
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				const decision = inspectContentPolicyDecision(await this.executeWithTimeout(() => hook.handler(event, ctx), hook.timeout));
				if (decision.kind === "invalid") throw new Error(`Plugin "${hook.pluginId}" returned an invalid ${name} decision`);
				results.push({
					success: true,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (decision.kind === "cancel") return {
					cancellation: {
						pluginId: hook.pluginId,
						reason: decision.reason
					},
					results
				};
			} catch (error) {
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (hook.errorPolicy === "abort") throw error;
				console.error(`[content-policy] Plugin "${hook.pluginId}" failed ${name}; continuing by policy`);
			}
		}
		return { results };
	}
	/**
	* Run content state-change hooks that all share the same event shape.
	*/
	async runContentStateChangeHook(name, content, collection) {
		const hooks = this.getTypedHooks(name);
		const results = [];
		for (const hook of hooks) {
			const { handler } = hook;
			const event = {
				content,
				collection
			};
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
				results.push({
					success: true,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			} catch (error) {
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (hook.errorPolicy === "abort") throw error;
			}
		}
		return results;
	}
	/**
	* Run content:afterPublish hooks (fire-and-forget).
	*/
	async runContentAfterPublish(content, collection) {
		return this.runContentStateChangeHook("content:afterPublish", content, collection);
	}
	/**
	* Run content:afterUnpublish hooks (fire-and-forget).
	*/
	async runContentAfterUnpublish(content, collection) {
		return this.runContentStateChangeHook("content:afterUnpublish", content, collection);
	}
	/**
	* Run content:afterRestore hooks (fire-and-forget).
	*/
	async runContentAfterRestore(content, collection) {
		return this.runContentStateChangeHook("content:afterRestore", content, collection);
	}
	/**
	* Run content:afterSchedule hooks (fire-and-forget).
	*/
	async runContentAfterSchedule(content, collection) {
		return this.runContentStateChangeHook("content:afterSchedule", content, collection);
	}
	/**
	* Run content:afterUnschedule hooks (fire-and-forget).
	*/
	async runContentAfterUnschedule(content, collection) {
		return this.runContentStateChangeHook("content:afterUnschedule", content, collection);
	}
	/**
	* Run media:beforeUpload hooks
	*/
	async runMediaBeforeUpload(file) {
		const hooks = this.getTypedHooks("media:beforeUpload");
		const results = [];
		let currentFile = file;
		for (const hook of hooks) {
			const { handler } = hook;
			const event = { file: currentFile };
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				const result = await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
				if (result !== void 0) currentFile = result;
				results.push({
					success: true,
					value: currentFile,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			} catch (error) {
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (hook.errorPolicy === "abort") throw error;
			}
		}
		return {
			file: currentFile,
			results
		};
	}
	/**
	* Run media:afterUpload hooks
	*/
	async runMediaAfterUpload(media) {
		const hooks = this.getTypedHooks("media:afterUpload");
		const results = [];
		for (const hook of hooks) {
			const { handler } = hook;
			const event = { media };
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
				results.push({
					success: true,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			} catch (error) {
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (hook.errorPolicy === "abort") throw error;
			}
		}
		return results;
	}
	/**
	* Invoke the cron hook for a specific plugin.
	*
	* Unlike other hooks which broadcast to all plugins, the cron hook is
	* dispatched only to the target plugin — the one that owns the task.
	*/
	async invokeCronHook(pluginId, event) {
		const hook = this.getTypedHooks("cron").find((h) => h.pluginId === pluginId);
		if (!hook) return {
			success: false,
			error: /* @__PURE__ */ new Error(`Plugin "${pluginId}" has no cron hook registered`),
			pluginId,
			duration: 0
		};
		const { handler } = hook;
		const ctx = this.getContext(pluginId);
		const start = Date.now();
		try {
			await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
			return {
				success: true,
				pluginId,
				duration: Date.now() - start
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error(String(error)),
				pluginId,
				duration: Date.now() - start
			};
		}
	}
	/**
	* Run email:beforeSend hooks (middleware pipeline).
	*
	* Each handler receives the message and returns a modified message or
	* `false` to cancel delivery. The pipeline chains message transformations —
	* each handler receives the output of the previous one.
	*/
	async runEmailBeforeSend(message, source) {
		const hooks = this.getTypedHooks("email:beforeSend");
		const results = [];
		let currentMessage = message;
		for (const hook of hooks) {
			const { handler } = hook;
			const event = {
				message: { ...currentMessage },
				source
			};
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				const result = await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
				if (result === false) {
					results.push({
						success: true,
						value: false,
						pluginId: hook.pluginId,
						duration: Date.now() - start
					});
					return {
						message: false,
						results
					};
				}
				if (result && typeof result === "object") currentMessage = result;
				results.push({
					success: true,
					value: currentMessage,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			} catch (error) {
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
				if (hook.errorPolicy === "abort") throw error;
			}
		}
		return {
			message: currentMessage,
			results
		};
	}
	/**
	* Run email:afterSend hooks (fire-and-forget).
	*
	* Errors are logged but don't propagate — they don't affect the caller.
	*/
	async runEmailAfterSend(message, source) {
		const hooks = this.getTypedHooks("email:afterSend");
		const results = [];
		for (const hook of hooks) {
			const { handler } = hook;
			const event = {
				message,
				source
			};
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
				results.push({
					success: true,
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			} catch (error) {
				console.error(`[email:afterSend] Plugin "${hook.pluginId}" error:`, error instanceof Error ? error.message : error);
				results.push({
					success: false,
					error: error instanceof Error ? error : new Error(String(error)),
					pluginId: hook.pluginId,
					duration: Date.now() - start
				});
			}
		}
		return results;
	}
	/**
	* Run comment:beforeCreate hooks (middleware pipeline).
	*
	* Each handler receives the event and returns a modified event or
	* `false` to reject the comment. The pipeline chains transformations —
	* each handler receives the output of the previous one.
	*/
	async runCommentBeforeCreate(event) {
		const hooks = this.getTypedHooks("comment:beforeCreate");
		let currentEvent = event;
		for (const hook of hooks) {
			const { handler } = hook;
			const ctx = this.getContext(hook.pluginId);
			const start = Date.now();
			try {
				const result = await this.executeWithTimeout(() => handler({ ...currentEvent }, ctx), hook.timeout);
				if (result === false) return false;
				if (result && typeof result === "object") currentEvent = result;
			} catch (error) {
				console.error(`[comment:beforeCreate] Plugin "${hook.pluginId}" error (${Date.now() - start}ms):`, error instanceof Error ? error.message : error);
				if (hook.errorPolicy === "abort") throw error;
			}
		}
		return currentEvent;
	}
	/**
	* Run comment:afterCreate hooks (fire-and-forget).
	*
	* Errors are logged but don't propagate — they don't affect the caller.
	*/
	async runCommentAfterCreate(event) {
		const hooks = this.getTypedHooks("comment:afterCreate");
		for (const hook of hooks) {
			const { handler } = hook;
			const ctx = this.getContext(hook.pluginId);
			try {
				await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
			} catch (error) {
				console.error(`[comment:afterCreate] Plugin "${hook.pluginId}" error:`, error instanceof Error ? error.message : error);
			}
		}
	}
	/**
	* Run comment:afterModerate hooks (fire-and-forget).
	*
	* Errors are logged but don't propagate — they don't affect the caller.
	*/
	async runCommentAfterModerate(event) {
		const hooks = this.getTypedHooks("comment:afterModerate");
		for (const hook of hooks) {
			const { handler } = hook;
			const ctx = this.getContext(hook.pluginId);
			try {
				await this.executeWithTimeout(() => handler(event, ctx), hook.timeout);
			} catch (error) {
				console.error(`[comment:afterModerate] Plugin "${hook.pluginId}" error:`, error instanceof Error ? error.message : error);
			}
		}
	}
	/** Run byline:afterSave hooks. Errors are logged and never propagate. */
	async runBylineAfterSave(byline, isNew) {
		const event = {
			byline: toBylineInfo(byline),
			isNew
		};
		for (const hook of this.getTypedHooks("byline:afterSave")) await this.runLoggedHook("byline:afterSave", hook, (ctx) => hook.handler(event, ctx));
	}
	/** Run byline:afterDelete hooks. Errors are logged and never propagate. */
	async runBylineAfterDelete(byline) {
		const event = { byline: toBylineInfo(byline) };
		for (const hook of this.getTypedHooks("byline:afterDelete")) await this.runLoggedHook("byline:afterDelete", hook, (ctx) => hook.handler(event, ctx));
	}
	async runLoggedHook(name, hook, run) {
		try {
			await this.executeWithTimeout(() => run(this.getContext(hook.pluginId)), hook.timeout);
		} catch (error) {
			console.error(`[${name}] Plugin "${hook.pluginId}" error:`, error instanceof Error ? error.message : error);
		}
	}
	/**
	* Run page:metadata hooks. Each handler returns contributions that are
	* merged by the metadata collector. Errors are logged but don't propagate.
	*/
	async runPageMetadata(event) {
		const hooks = this.getTypedHooks("page:metadata");
		const results = [];
		for (const hook of hooks) {
			const { handler } = hook;
			const ctx = this.getContext(hook.pluginId);
			try {
				const result = await this.executeWithTimeout(() => Promise.resolve(handler(event, ctx)), hook.timeout);
				if (result != null) {
					const contributions = Array.isArray(result) ? result : [result];
					results.push({
						pluginId: hook.pluginId,
						contributions
					});
				}
			} catch (error) {
				console.error(`[page:metadata] Plugin "${hook.pluginId}" error:`, error instanceof Error ? error.message : error);
			}
		}
		return results;
	}
	/**
	* Run page:fragments hooks. Only trusted plugins should be registered
	* for this hook. Errors are logged but don't propagate.
	*/
	async runPageFragments(event) {
		const hooks = this.getTypedHooks("page:fragments");
		const results = [];
		for (const hook of hooks) {
			const { handler } = hook;
			const ctx = this.getContext(hook.pluginId);
			try {
				const result = await this.executeWithTimeout(() => Promise.resolve(handler(event, ctx)), hook.timeout);
				if (result != null) {
					const contributions = Array.isArray(result) ? result : [result];
					results.push({
						pluginId: hook.pluginId,
						contributions
					});
				}
			} catch (error) {
				console.error(`[page:fragments] Plugin "${hook.pluginId}" error:`, error instanceof Error ? error.message : error);
			}
		}
		return results;
	}
	/**
	* Check if any hooks are registered for a given name
	*/
	hasHooks(name) {
		const hooks = this.hooks.get(name);
		return hooks !== void 0 && hooks.length > 0;
	}
	/**
	* Get hook count for debugging
	*/
	getHookCount(name) {
		return this.hooks.get(name)?.length || 0;
	}
	/**
	* Get all registered hook names
	*/
	getRegisteredHooks() {
		return [...this.hooks.keys()];
	}
	/**
	* Returns hook names where at least one handler declared exclusive: true
	*/
	getRegisteredExclusiveHooks() {
		return [...this.exclusiveHookNames];
	}
	/**
	* Check if a hook is exclusive
	*/
	isExclusiveHook(name) {
		return this.exclusiveHookNames.has(name);
	}
	/**
	* Set the selected provider for an exclusive hook.
	* Called by PluginManager after resolution.
	*/
	setExclusiveSelection(hookName, pluginId) {
		this.exclusiveSelections.set(hookName, pluginId);
	}
	/**
	* Clear the selected provider for an exclusive hook.
	*/
	clearExclusiveSelection(hookName) {
		this.exclusiveSelections.delete(hookName);
	}
	/**
	* Get the selected provider for an exclusive hook (if any).
	*/
	getExclusiveSelection(hookName) {
		return this.exclusiveSelections.get(hookName);
	}
	/**
	* Get all plugins that registered a handler for a given exclusive hook.
	*/
	getExclusiveHookProviders(hookName) {
		return (this.hooks.get(hookName) ?? []).filter((h) => h.exclusive).map((h) => ({ pluginId: h.pluginId }));
	}
	/**
	* Get all plugins that registered a non-exclusive handler for a given
	* hook (e.g. `email:beforeSend`, `email:afterSend`), preserving priority
	* order. Partitions with `getExclusiveHookProviders()`, which returns
	* plugins whose registration is marked `exclusive: true`.
	*/
	getHookProviders(hookName) {
		return (this.hooks.get(hookName) ?? []).filter((h) => !h.exclusive).map((h) => ({ pluginId: h.pluginId }));
	}
	/**
	* Invoke an exclusive hook — dispatch only to the selected provider.
	* Returns null if no provider is selected or if the selected hook
	* is not found in the pipeline.
	*
	* This is a generic dispatch used by the email pipeline and other
	* exclusive hook consumers. The handler type is unknown — callers
	* must know the expected signature.
	*
	* Errors are isolated: a failing handler returns an error result
	* instead of propagating the exception to the caller.
	*/
	async invokeExclusiveHook(hookName, event) {
		const selectedPluginId = this.exclusiveSelections.get(hookName);
		if (!selectedPluginId) return null;
		const hook = (this.hooks.get(hookName) ?? []).find((h) => h.pluginId === selectedPluginId && h.exclusive);
		if (!hook) return null;
		const start = Date.now();
		try {
			const ctx = this.getContext(selectedPluginId);
			const handler = hook.handler;
			return {
				result: await this.executeWithTimeout(() => handler(event, ctx), hook.timeout),
				pluginId: selectedPluginId,
				duration: Date.now() - start
			};
		} catch (error) {
			return {
				result: void 0,
				pluginId: selectedPluginId,
				error: error instanceof Error ? error : new Error(String(error)),
				duration: Date.now() - start
			};
		}
	}
};
/**
* Create a hook pipeline from plugins
*/
function createHookPipeline(plugins, factoryOptions) {
	return new HookPipeline(plugins, factoryOptions);
}
/** Options table key prefix for exclusive hook selections */
var EXCLUSIVE_HOOK_KEY_PREFIX = "emdash:exclusive_hook:";
/**
* Resolve exclusive hook selections.
*
* Shared algorithm used by both PluginManager and EmDashRuntime:
* 1. If a DB selection exists and that plugin is active → keep it.
* 2. If DB selection is stale (plugin inactive/gone) → clear it.
* 3. If no selection and only one active provider → auto-select it. Fallback
*    providers are not counted when another provider is active, so a single
*    plugin provider is selected over a built-in fallback. A fallback
*    selection is kept in memory only. Manual providers are never
*    auto-selected.
* 4. If preferred hints match an active provider → first match wins.
* 5. If multiple providers and no hint → leave unselected (admin must choose).
*/
async function resolveExclusiveHooks(opts) {
	const { pipeline, isActive, getOption, getOptions, setOption, deleteOption, preferredHints, fallbackProviders, manualProviders } = opts;
	const exclusiveHookNames = pipeline.getRegisteredExclusiveHooks();
	if (exclusiveHookNames.length === 0) return;
	let batchedSelections;
	if (getOptions) try {
		batchedSelections = await getOptions(exclusiveHookNames.map((hookName) => `${EXCLUSIVE_HOOK_KEY_PREFIX}${hookName}`));
	} catch {
		return;
	}
	for (const hookName of exclusiveHookNames) {
		const providers = pipeline.getExclusiveHookProviders(hookName);
		const activeProviderIds = new Set(providers.map((p) => p.pluginId).filter((id) => isActive(id)));
		const key = `${EXCLUSIVE_HOOK_KEY_PREFIX}${hookName}`;
		let currentSelection = null;
		if (batchedSelections) currentSelection = batchedSelections.get(key) ?? null;
		else try {
			currentSelection = await getOption(key);
		} catch {
			continue;
		}
		if (currentSelection && activeProviderIds.has(currentSelection)) {
			pipeline.setExclusiveSelection(hookName, currentSelection);
			continue;
		}
		if (currentSelection) try {
			await deleteOption(key);
		} catch {}
		const autoSelectable = [...activeProviderIds].filter((id) => !manualProviders?.has(id));
		let candidates = autoSelectable.length > 1 && fallbackProviders ? autoSelectable.filter((id) => !fallbackProviders.has(id)) : autoSelectable;
		if (candidates.length === 0 && fallbackProviders) {
			const firstFallback = [...fallbackProviders].find((id) => autoSelectable.includes(id));
			if (firstFallback) candidates = [firstFallback];
		}
		if (candidates.length === 1) {
			const [onlyProvider] = candidates;
			if (!fallbackProviders?.has(onlyProvider)) try {
				await setOption(key, onlyProvider);
			} catch {}
			pipeline.setExclusiveSelection(hookName, onlyProvider);
			continue;
		}
		if (preferredHints) {
			let found = false;
			for (const [pluginId, hooks] of preferredHints) if (hooks.includes(hookName) && activeProviderIds.has(pluginId) && !manualProviders?.has(pluginId)) {
				try {
					await setOption(key, pluginId);
				} catch {}
				pipeline.setExclusiveSelection(hookName, pluginId);
				found = true;
				break;
			}
			if (found) continue;
		}
		pipeline.clearExclusiveSelection(hookName);
	}
}
/**
* Thrown by a `content:beforeSave` hook to reject a save with a message
* that is safe to show to the editor. The runtime converts it into a
* structured `SAVE_REJECTED` API error; any other exception thrown by the
* hook cancels the save with a generic error that hides the exception
* message.
*/
var ContentSaveRejectedError = class extends Error {
	name = "ContentSaveRejectedError";
};
/**
* Matches by name as well as by prototype: bundlers can duplicate this
* module across SSR chunks, and an `instanceof` against the wrong copy of
* the class would misreport a rejection as a plugin crash.
*/
function isContentSaveRejection(error) {
	if (error instanceof ContentSaveRejectedError) return true;
	return error instanceof Error && error.name === "ContentSaveRejectedError";
}
function isRecord$2(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** Validate and normalize an untrusted value returned across the sandbox boundary. */
function inspectSandboxHookResult(value) {
	if (!isRecord$2(value) || !Object.hasOwn(value, "__emdashSandboxHookResult")) return { kind: "value" };
	if (value.__emdashSandboxHookResult !== true || value.version !== 1 || !isRecord$2(value.error) || value.error.code !== "SAVE_REJECTED" || typeof value.error.reason !== "string") return { kind: "malformed" };
	const reason = value.error.reason.trim();
	if (reason.length === 0 || reason.length > 500) return { kind: "malformed" };
	return {
		kind: "error",
		error: {
			code: "SAVE_REJECTED",
			reason
		}
	};
}
// node_modules/emdash/dist/email-console-CBZpj1VI.mjs
/** Plugin ID for the dev console email provider */
var DEV_CONSOLE_EMAIL_PLUGIN_ID = "emdash-console-email";
/**
* In-memory store for dev emails.
* Uses globalThis so the same array is shared across Vite SSR module
* instances (the runtime and the route handler may load separate copies
* of this module, but globalThis is always the same object).
*/
var GLOBAL_KEY = Symbol.for("emdash:dev-emails");
var g = globalThis;
(() => {
	const existing = g[GLOBAL_KEY];
	if (existing) return existing;
	const fresh = [];
	g[GLOBAL_KEY] = fresh;
	return fresh;
})();
// node_modules/emdash/dist/policy-72PGoCgJ.mjs
function parseMigrationMode(value, source) {
	if (value === "auto" || value === "check" || value === "manual") return value;
	throw new Error(`Invalid ${source} value ${JSON.stringify(value)}; expected "auto", "check", or "manual"`);
}
function resolveRuntimeMigrationMode(config, options) {
	if (options.override !== void 0) return parseMigrationMode(options.override, "EMDASH_MIGRATIONS_MODE");
	if (options.dev) return config?.dev ?? "auto";
	return config?.runtime ?? "auto";
}
var PendingMigrationsError = class extends Error {
	pending;
	constructor(pending) {
		super(`Database has pending EmDash migrations: ${pending.join(", ")}`);
		this.name = "PendingMigrationsError";
		this.pending = [...pending];
	}
};
/**
* Whether a runtime init error leaves the database waiting for migrations that
* this request cannot apply. A backed-off init carries the original error as
* its cause.
*/
function isMigrationRequiredError(error) {
	return [error, error instanceof Error ? error.cause : void 0].some((candidate) => candidate instanceof PendingMigrationsError || candidate instanceof MigrationLockHeldError || candidate instanceof MigrationRowLimitError);
}
async function enforceRuntimeMigrationPolicy(db, mode, options = {}) {
	if (mode === "manual") return;
	if (mode === "auto") {
		await runMigrations(db, {
			contentRowLimit: options.contentRowLimit,
			appliedCount: options.appliedCount
		});
		return;
	}
	const status = await getExactMigrationStatus(db);
	if (status.pending.length > 0) throw new PendingMigrationsError(status.pending);
}
// node_modules/emdash/dist/ownership-46c5NS0I.mjs
var AUTO_SEED_COMPLETE_OPTION = "emdash:seed_complete";
// node_modules/emdash/dist/emdash-runtime-CF6KAut9.mjs
/**
* Email Pipeline
*
* Orchestrates the three-stage email pipeline:
* 1. email:beforeSend hooks (middleware — transform, validate, cancel)
* 2. email:deliver hook (exclusive — exactly one provider delivers)
* 3. email:afterSend hooks (logging, analytics, fire-and-forget)
*
* Security features:
* - Recursion guard prevents re-entrant sends (e.g. plugin calling ctx.email.send from a hook)
* - System emails (source="system") bypass email:beforeSend and email:afterSend hooks entirely
*   to protect auth tokens from exfiltration by plugin hooks
*
*/
/** Hook name for the exclusive email delivery hook */
var EMAIL_DELIVER_HOOK = "email:deliver";
/** Source value used for auth emails (magic links, invites, password resets) */
var SYSTEM_SOURCE = "system";
/**
* Error thrown when ctx.email.send() is called but no provider is configured.
*/
var EmailNotConfiguredError = class extends Error {
	constructor() {
		super("No email provider is configured. Install and activate an email provider plugin, then select it in Settings > Email.");
		this.name = "EmailNotConfiguredError";
	}
};
/**
* Error thrown when a recursive email send is detected.
*/
var EmailRecursionError = class extends Error {
	constructor() {
		super("Recursive email send detected. A plugin hook attempted to send an email from within the email pipeline, which would cause infinite recursion.");
		this.name = "EmailRecursionError";
	}
};
/**
* Recursion guard using AsyncLocalStorage.
*
* EmailPipeline is a singleton (worker-lifetime cached via EmDashRuntime).
* Instance state like `sendDepth` would false-positive under concurrent
* requests because two unrelated sends would increment the same counter.
* ALS scopes the guard to the current async execution context, so concurrent
* requests each get their own independent recursion tracking.
*/
var emailSendALS = new AsyncLocalStorage();
/**
* EmailPipeline orchestrates email delivery through the plugin hook system.
*
* The pipeline runs in three stages:
* 1. email:beforeSend — middleware hooks that can transform or cancel messages
* 2. email:deliver — exclusive hook dispatching to the selected provider
* 3. email:afterSend — fire-and-forget hooks for logging/analytics
*/
var EmailPipeline = class {
	pipeline;
	constructor(pipeline) {
		this.pipeline = pipeline;
	}
	/**
	* Replace the underlying hook pipeline.
	*
	* Called by the runtime when rebuilding the hook pipeline after a
	* plugin is enabled or disabled, so the email pipeline dispatches
	* to the current set of active hooks.
	*/
	setPipeline(pipeline) {
		this.pipeline = pipeline;
	}
	/**
	* Send an email through the full pipeline.
	*
	* @param message - The email to send
	* @param source - Where the email originated ("system" for auth, plugin ID for plugins)
	* @throws EmailNotConfiguredError if no provider is selected
	* @throws EmailRecursionError if called re-entrantly from within a hook
	* @throws Error if the provider handler throws
	*/
	async send(message, source) {
		const store = emailSendALS.getStore();
		if (store && store.depth > 0) throw new EmailRecursionError();
		const run = () => this.sendInner(message, source);
		if (store) {
			store.depth++;
			try {
				await run();
			} finally {
				store.depth--;
			}
		} else await emailSendALS.run({ depth: 1 }, run);
	}
	/**
	* Inner send implementation, separated from the recursion guard.
	*/
	async sendInner(message, source) {
		if (!message || typeof message !== "object") throw new Error("Invalid email message: message must be an object");
		if (!message.to || typeof message.to !== "string") throw new Error("Invalid email message: 'to' is required and must be a string");
		if (message.cc !== void 0 && (!Array.isArray(message.cc) || message.cc.some((address) => typeof address !== "string"))) throw new Error("Invalid email message: 'cc' must be an array of strings");
		if (message.replyTo !== void 0 && typeof message.replyTo !== "string") throw new Error("Invalid email message: 'replyTo' must be a string");
		if (!message.subject || typeof message.subject !== "string") throw new Error("Invalid email message: 'subject' is required and must be a string");
		if (!message.text || typeof message.text !== "string") throw new Error("Invalid email message: 'text' is required and must be a string");
		const isSystemEmail = source === SYSTEM_SOURCE;
		let finalMessage;
		if (isSystemEmail) finalMessage = message;
		else {
			const beforeResult = await this.pipeline.runEmailBeforeSend(message, source);
			if (beforeResult.message === false) {
				const cancelledBy = beforeResult.results.find((r) => r.value === false)?.pluginId ?? "unknown";
				console.info(`[email] Email to "${message.to}" cancelled by plugin "${cancelledBy}"`);
				return;
			}
			finalMessage = beforeResult.message;
		}
		const deliverEvent = {
			message: finalMessage,
			source
		};
		const deliverResult = await this.pipeline.invokeExclusiveHook(EMAIL_DELIVER_HOOK, deliverEvent);
		if (!deliverResult) throw new EmailNotConfiguredError();
		if (deliverResult.error) {
			console.error(`[email:deliver] Provider "${deliverResult.pluginId}" failed to send email to "${finalMessage.to}":`, deliverResult.error);
			throw deliverResult.error;
		}
		if (!isSystemEmail) this.pipeline.runEmailAfterSend(finalMessage, source).catch((err) => console.error("[email] afterSend pipeline error:", err instanceof Error ? err.message : err));
	}
	/**
	* Check if an email provider is configured and available.
	*
	* Returns true if an email:deliver provider is selected in the exclusive
	* hook system. Plugins and auth code use this to decide whether to show
	* "send invite" vs "copy invite link" UI.
	*/
	isAvailable() {
		return this.pipeline.getExclusiveSelection(EMAIL_DELIVER_HOOK) !== void 0;
	}
};
/**
* Programmatic media upload handler (MCP `media_upload` tool).
*
* Accepts file bytes as base64, then runs the same pipeline as the multipart
* REST upload route: allowlist + size validation, content-hash deduplication,
* storage upload, image metadata enrichment, and record creation.
*/
function fail(code, message) {
	return {
		success: false,
		error: {
			code,
			message
		}
	};
}
/** Same relative-URL shape the REST media routes return. */
function withUrl(item) {
	return {
		...item,
		url: `/_emdash/api/media/file/${item.storageKey}`
	};
}
/** Decode the file bytes after rejecting an oversized encoded payload. */
async function acquireBytes(input, maxUploadSize) {
	if (input.base64.length * 3 / 4 > maxUploadSize) return fail("PAYLOAD_TOO_LARGE", `File exceeds maximum size of ${formatFileSize(maxUploadSize)}`);
	try {
		return {
			bytes: decodeBase64Bytes(input.base64),
			mimeType: input.contentType
		};
	} catch {
		return fail("VALIDATION_ERROR", "Invalid base64 data");
	}
}
/**
* Upload a media file from base64 data.
*
* Mirrors the REST `POST /_emdash/api/media` route: global MIME allowlist,
* size limit, content-hash dedupe (returns the existing item with
* `deduplicated: true`), storage upload with cleanup on failure, and
* image metadata enrichment (dimensions, blurhash, dominant color).
*/
async function handleMediaUpload(db, storage, input, hooks = {}) {
	if (!input.base64 || !input.contentType) return fail("VALIDATION_ERROR", "base64 and contentType are required");
	const rawMax = input.maxUploadSize ?? 52428800;
	if (!Number.isFinite(rawMax) || rawMax <= 0) return fail("CONFIGURATION_ERROR", "Invalid maxUploadSize configuration");
	const acquired = await acquireBytes(input, rawMax);
	if ("success" in acquired) return acquired;
	const { bytes } = acquired;
	let filename = input.filename;
	let mimeType = resolveUploadMimeType(filename, acquired.mimeType);
	let size = bytes.byteLength;
	if (!CONTENT_TYPE_RE.test(mimeType)) return fail("VALIDATION_ERROR", "Invalid content type");
	if (!matchesMimeAllowlist(mimeType, GLOBAL_UPLOAD_ALLOWLIST)) return fail("INVALID_TYPE", "File type not allowed");
	if (bytes.byteLength > rawMax) return fail("PAYLOAD_TOO_LARGE", `File exceeds maximum size of ${formatFileSize(rawMax)}`);
	try {
		if (hooks.beforeUpload) {
			const processed = await hooks.beforeUpload({
				name: filename,
				type: mimeType,
				size: bytes.byteLength
			});
			filename = processed.name;
			mimeType = normalizeMime(processed.type);
			size = processed.size;
			if (!CONTENT_TYPE_RE.test(processed.type)) return fail("VALIDATION_ERROR", "Invalid content type");
			if (!matchesMimeAllowlist(mimeType, GLOBAL_UPLOAD_ALLOWLIST)) return fail("INVALID_TYPE", "File type not allowed");
		}
		const contentHash = await computeContentHash(bytes);
		const repo = new MediaRepository(db);
		const existing = await repo.findByContentHash(contentHash);
		if (existing) return {
			success: true,
			data: {
				item: withUrl(existing),
				deduplicated: true
			}
		};
		const storageKey = `${ulid()}${path.extname(filename)}`;
		await storage.upload({
			key: storageKey,
			body: bytes,
			contentType: mimeType
		});
		try {
			const enriched = await enrichImageMetadata(bytes, mimeType, { placeholders: input.placeholders ?? true });
			return {
				success: true,
				data: { item: withUrl(await repo.create({
					filename,
					mimeType,
					size,
					width: enriched.width,
					height: enriched.height,
					alt: input.alt,
					caption: input.caption,
					storageKey,
					contentHash,
					blurhash: enriched.blurhash,
					dominantColor: enriched.dominantColor,
					authorId: input.authorId
				})) }
			};
		} catch (error) {
			try {
				await storage.delete(storageKey);
			} catch {}
			throw error;
		}
	} catch {
		return fail("UPLOAD_ERROR", "Upload failed");
	}
}
/** A selection holds at most 1,000 entries, so a read never needs more pages than this. */
var MAX_REFERENCE_PAGES = 11;
var LIST_CONFLICT_MESSAGE = "A list this save was based on changed. Read the entry again and apply the change to it.";
/** Whether every list in `expected` still matches the entry. */
async function listsMatch(db, collection, entry, expected) {
	if (expected.bylines) {
		const stored = (await new BylineRepository(db).getContentBylines(collection, entry.id, entry.locale ? { locale: entry.locale } : void 0)).map((credit) => ({
			bylineId: credit.byline.id,
			roleLabel: credit.roleLabel ?? null
		}));
		const wanted = expected.bylines.map((credit) => ({
			bylineId: credit.bylineId,
			roleLabel: credit.roleLabel ?? null
		}));
		if (JSON.stringify(stored) !== JSON.stringify(wanted)) return false;
	}
	if (expected.references) {
		const fields = await referenceFieldConstraints(db, collection);
		for (const [slug, wanted] of Object.entries(expected.references)) {
			const field = fields.get(slug);
			if (!field) continue;
			const stored = await referenceIds(db, collection, entry.id, field);
			if (!stored || !sameSelection(stored, wanted, field.relationSide === "child")) return false;
		}
	}
	return true;
}
/** The entries a reference field selects, as the admin reads them, or null if it can't tell. */
async function referenceIds(db, collection, entryId, field) {
	const ids = [];
	let cursor;
	for (let page = 0; page < MAX_REFERENCE_PAGES; page++) {
		const options = {
			limit: 100,
			cursor
		};
		const result = field.relationSide === "child" ? await handleReferenceParentsGet(db, collection, entryId, field.relation, options, true) : await handleReferenceChildrenGet(db, collection, entryId, field.relation, options, true);
		if (!result.success) return null;
		const entries = "parents" in result.data ? result.data.parents : result.data.children;
		for (const entry of entries) ids.push(entry.id);
		cursor = result.data.nextCursor;
		if (!cursor) return ids;
	}
	return null;
}
/** The child end of a relation keeps no order, so only its members count. */
function sameSelection(stored, wanted, unordered) {
	if (stored.length !== wanted.length) return false;
	const [a, b] = unordered ? [stored.toSorted(), wanted.toSorted()] : [stored, wanted];
	return a.every((id, index) => id === b[index]);
}
/** Rewrite stored locales to the exact casing used by the site configuration. */
async function repairLocaleCasing(db, configuredLocales) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = sql.ref(tableName);
		for (const locale of configuredLocales) await sql`
				UPDATE ${table} AS target
				SET locale = ${locale}
				WHERE lower(target.locale) = lower(${locale})
					AND target.locale != ${locale}
					AND NOT EXISTS (
						SELECT 1
						FROM ${table} AS existing
						WHERE existing.slug = target.slug AND existing.locale = ${locale}
					)
					AND target.id = (
						SELECT MIN(candidate.id)
						FROM ${table} AS candidate
						WHERE candidate.slug = target.slug
							AND lower(candidate.locale) = lower(${locale})
							AND candidate.locale != ${locale}
					)
			`.execute(db);
	}
}
var REPAIR_GUIDE = "https://docs.emdashcms.com/guides/internationalization/#repairing-taxonomy-locale-mismatches";
async function warnAboutUnconfiguredTaxonomyLocales(db, configuredLocales, definitionLocales) {
	const supportedLocales = configuredLocales.length > 0 ? configuredLocales : ["en"];
	const definitionRows = definitionLocales === void 0 ? await db.selectFrom("_emdash_taxonomy_defs").select("locale").distinct().where("locale", "not in", supportedLocales).execute() : [...new Set(definitionLocales)].filter((locale) => !supportedLocales.includes(locale)).map((locale) => ({ locale }));
	const termRows = await db.selectFrom("taxonomies").select("locale").distinct().where("locale", "not in", supportedLocales).execute();
	const mismatches = [...definitionRows.map(({ locale }) => ({
		source: "definitions",
		locale
	})), ...termRows.map(({ locale }) => ({
		source: "terms",
		locale
	}))].toSorted((a, b) => a.source.localeCompare(b.source) || a.locale.localeCompare(b.locale));
	if (mismatches.length === 0) return;
	const details = mismatches.map(({ source, locale }) => `${source}: ${locale}`).join("; ");
	console.warn(`EmDash: Taxonomy rows use locales outside the configured locales (${supportedLocales.join(", ")}): ${details}. Locale-scoped reads may not return these rows. Review and repair them explicitly: ${REPAIR_GUIDE}`);
}
/**
* Give each Portable Text image, video, and gallery image that names a local
* file only by its URL (as Markdown images do) the id of that file's media
* item in `asset._ref`. The URL stays in `asset.url`. Values without such
* assets are returned as they are, without a lookup.
*/
async function linkPortableTextFileUrls(values, findIds) {
	const assets = values.flatMap((value) => unlinkedFileAssets(value));
	if (assets.length === 0) return [...values];
	const ids = await findIds([...new Set(assets.map((asset) => asset.storageKey))]);
	const linked = /* @__PURE__ */ new Map();
	for (const { asset, storageKey, url } of assets) {
		const id = ids.get(storageKey);
		if (id) linked.set(asset, {
			...asset,
			_ref: id,
			url
		});
	}
	if (linked.size === 0) return [...values];
	return values.map((value) => replaceAssets(value, linked));
}
function unlinkedFileAssets(value) {
	if (!Array.isArray(value)) return [];
	const found = [];
	for (const block of value) for (const asset of blockAssets(block)) {
		const unlinked = unlinkedFileAsset(asset);
		if (unlinked) found.push(unlinked);
	}
	return found;
}
function blockAssets(block) {
	if (!isRecord(block)) return [];
	if (block._type === "image" || isPortableTextVideoBlock(block)) return [block.asset];
	if (block._type === "gallery" && Array.isArray(block.images)) return block.images.map((image) => isRecord(image) ? image.asset : void 0);
	return [];
}
function unlinkedFileAsset(asset) {
	if (!isRecord(asset)) return null;
	const provider = typeof asset.provider === "string" ? asset.provider.trim() : "";
	if (provider && provider !== "local") return null;
	if (typeof asset.id === "string" && asset.id.trim()) return null;
	const ref = typeof asset._ref === "string" ? asset._ref.trim() : "";
	const refKey = ref ? storageKeyFromLocalMediaFileUrl(ref) : null;
	if (ref && !refKey) return null;
	if (refKey) return {
		asset,
		storageKey: refKey,
		url: typeof asset.url === "string" && asset.url.trim() ? asset.url : ref
	};
	if (typeof asset.url !== "string") return null;
	const urlKey = storageKeyFromLocalMediaFileUrl(asset.url);
	return urlKey ? {
		asset,
		storageKey: urlKey,
		url: asset.url
	} : null;
}
function replaceAssets(value, linked) {
	if (!Array.isArray(value)) return value;
	return value.map((block) => {
		if (!isRecord(block)) return block;
		if (block._type === "gallery" && Array.isArray(block.images)) return {
			...block,
			images: block.images.map((image) => {
				if (!isRecord(image) || !isRecord(image.asset)) return image;
				const asset = linked.get(image.asset);
				return asset ? {
					...image,
					asset
				} : image;
			})
		};
		if (!isRecord(block.asset)) return block;
		const asset = linked.get(block.asset);
		return asset ? {
			...block,
			asset
		} : block;
	});
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
var SANDBOX_REJECTION = Symbol("emdash:sandbox-save-rejection");
var VALID_METADATA_KINDS = /* @__PURE__ */ new Set([
	"meta",
	"property",
	"link",
	"jsonld"
]);
var VALID_LINK_REL = /* @__PURE__ */ new Set([
	"canonical",
	"alternate",
	"author",
	"license",
	"nlweb",
	"site.standard.document"
]);
function isValidMetadataContribution(value) {
	if (!value || typeof value !== "object" || !("kind" in value)) return false;
	const contribution = value;
	if (typeof contribution.kind !== "string" || !VALID_METADATA_KINDS.has(contribution.kind)) return false;
	if (contribution.kind === "meta") return typeof contribution.name === "string" && typeof contribution.content === "string";
	if (contribution.kind === "property") return typeof contribution.property === "string" && typeof contribution.content === "string";
	if (contribution.kind === "link") return typeof contribution.href === "string" && typeof contribution.rel === "string" && VALID_LINK_REL.has(contribution.rel);
	return contribution.graph != null && typeof contribution.graph === "object";
}
function getSandboxSaveRejectionDetails(error) {
	if (!(error instanceof ContentSaveRejectedError) || !(SANDBOX_REJECTION in error)) return null;
	const details = Object.getOwnPropertyDescriptor(error, SANDBOX_REJECTION)?.value;
	if (!details || typeof details !== "object") return null;
	if (!("pluginId" in details) || typeof details.pluginId !== "string") return null;
	if (!("reason" in details) || typeof details.reason !== "string") return null;
	return {
		pluginId: details.pluginId,
		reason: details.reason
	};
}
/**
* Represent an isolate-backed plugin inside the normal host hook pipeline.
* The proxy contains metadata and RPC handlers only; plugin code remains in
* the runner isolate.
*/
function createSandboxedPluginProxy(manifest, instance) {
	const hooks = {};
	for (const entry of manifest.hooks) {
		const hook = normalizeManifestHook(entry);
		if (hook.name === "page:fragments") continue;
		hooks[hook.name] = {
			handler: async (event) => {
				const result = await instance.invokeHook(hook.name, event);
				if (hook.name === "page:metadata") {
					if (result == null) return null;
					const contributions = (Array.isArray(result) ? result : [result]).filter(isValidMetadataContribution);
					return contributions.length > 0 ? contributions : null;
				}
				if (hook.name !== "content:beforeSave") return result;
				const inspection = inspectSandboxHookResult(result);
				if (inspection.kind === "error") {
					const error = new ContentSaveRejectedError("Save rejected by a sandboxed plugin");
					return Promise.reject(Object.assign(error, { [SANDBOX_REJECTION]: {
						pluginId: manifest.id,
						reason: inspection.error.reason
					} }));
				}
				if (inspection.kind === "malformed") throw new Error(`Sandboxed plugin "${manifest.id}" returned an invalid hook result`);
				return result;
			},
			priority: hook.priority,
			timeout: hook.timeout,
			dependencies: hook.dependencies,
			errorPolicy: hook.errorPolicy,
			exclusive: hook.exclusive
		};
	}
	return adaptSandboxEntry({ hooks }, {
		id: manifest.id,
		version: manifest.version,
		entrypoint: "",
		format: "standard",
		capabilities: manifest.capabilities,
		allowedHosts: manifest.allowedHosts,
		storage: manifest.storage,
		adminPages: manifest.admin.pages,
		adminWidgets: manifest.admin.widgets,
		editorPanels: manifest.admin.editorPanels,
		editorActions: manifest.admin.editorActions,
		settingsSchema: manifest.admin.settingsSchema,
		portableTextBlocks: manifest.admin.portableTextBlocks,
		fieldWidgets: manifest.admin.fieldWidgets,
		mcp: manifest.mcp
	});
}
/**
* Build platform sandbox options with the same normalized site context used
* by trusted plugin hooks and routes.
*/
function createSandboxRunnerOptions(options, siteInfo) {
	return {
		...options,
		siteInfo: createSiteInfo(siteInfo ?? {})
	};
}
var MEDIA_USAGE_CLEANUP_CANDIDATE_LIMIT = 250;
var MEDIA_USAGE_CLEANUP_DELETE_LIMIT = 50;
var MEDIA_USAGE_CLEANUP_WRITE_LEASE_DELETE_LIMIT = 49;
var MEDIA_USAGE_CLEANUP_INTERVAL_MS = 6e4;
var MEDIA_USAGE_CLEANUP_LEASE_MS = 3e5;
var MEDIA_USAGE_CLEANUP_SAFETY_WINDOW_MS = 36e5;
var MEDIA_USAGE_CLEANUP_TIME_BUDGET_MS = 5e3;
/**
* Reclaims a bounded window of obsolete media-usage occurrences.
*
* The persisted claim makes a cron tick single-flight across Worker isolates
* and Node processes.
*/
async function cleanupMediaUsage(db) {
	const startedMs = Date.now();
	const canIssueStatement = () => withinBudget(startedMs);
	const repo = new MediaUsageRepository(db);
	const leaseToken = ulid();
	const claim = await repo.claimMediaUsageCleanup({
		leaseToken,
		leaseDurationSeconds: MEDIA_USAGE_CLEANUP_LEASE_MS / 1e3,
		nextEligibleDelaySeconds: MEDIA_USAGE_CLEANUP_INTERVAL_MS / 1e3,
		sweepSafetyWindowSeconds: MEDIA_USAGE_CLEANUP_SAFETY_WINDOW_MS / 1e3
	});
	if (!claim) return emptyResult("skipped", elapsedSince(startedMs));
	let candidateRows = 0;
	let deletedOrphans = 0;
	let deletedStale = 0;
	let deletedAbandoned = 0;
	let deletedWriteLeases = 0;
	let backlogLowerBound = 0;
	let scanHasMore = false;
	let nextCursor = claim.cursor;
	let sweepComplete = false;
	try {
		if (canIssueStatement()) deletedWriteLeases = await repo.deleteExpiredGenerationWriteLeases(MEDIA_USAGE_CLEANUP_WRITE_LEASE_DELETE_LIMIT, cleanupLease(leaseToken), canIssueStatement);
		const cutoff = claim.scanBeforeAt;
		const candidates = await repo.findMediaUsageCleanupCandidates({
			cutoff,
			cursor: claim.cursor,
			limit: MEDIA_USAGE_CLEANUP_CANDIDATE_LIMIT,
			cleanupLease: cleanupLease(leaseToken),
			canIssueStatement
		});
		if (candidates) {
			candidateRows = candidates.length;
			scanHasMore = candidates.length === MEDIA_USAGE_CLEANUP_CANDIDATE_LIMIT;
			const selected = selectCleanupCandidates(candidates, claim.claimedAt);
			backlogLowerBound = selected.orphanIds.length + selected.staleIds.length + selected.abandonedIds.length;
			const completedTargets = /* @__PURE__ */ new Set();
			let canContinue = true;
			if (canIssueStatement() && selected.orphanIds.length > 0) {
				deletedOrphans = await repo.deleteOrphanOccurrencesOlderThan(cutoff, selected.orphanIds.length, {
					candidateIds: selected.orphanIds,
					cleanupLease: cleanupLease(leaseToken),
					canIssueStatement
				});
				canContinue = deletedOrphans === selected.orphanIds.length;
				if (canContinue) completedTargets.add("orphan");
			}
			if (canContinue && canIssueStatement() && selected.staleIds.length > 0) {
				deletedStale = await repo.deleteStaleGenerationsOlderThan(cutoff, selected.staleIds.length, {
					candidateIds: selected.staleIds,
					cleanupLease: cleanupLease(leaseToken),
					canIssueStatement
				});
				canContinue = deletedStale === selected.staleIds.length;
				if (canContinue) completedTargets.add("stale");
			}
			if (canContinue && canIssueStatement() && selected.abandonedIds.length > 0) {
				deletedAbandoned = await repo.deleteAbandonedGenerationsOlderThan(cutoff, selected.abandonedIds.length, {
					candidateIds: selected.abandonedIds,
					cleanupLease: cleanupLease(leaseToken),
					canIssueStatement
				});
				if (deletedAbandoned === selected.abandonedIds.length) completedTargets.add("abandoned");
			}
			const hasIncompleteTargets = selected.entries.some((entry) => entry.target !== null && !completedTargets.has(entry.target));
			sweepComplete = !scanHasMore && selected.entries.length === candidates.length && !hasIncompleteTargets;
			nextCursor = sweepComplete ? null : cursorAfterCompletedCandidates(selected, completedTargets, claim.cursor);
		}
		const durationMs = elapsedSince(startedMs);
		return {
			status: await repo.completeMediaUsageCleanup({
				leaseToken,
				nextCursor,
				sweepComplete,
				candidateCount: candidateRows,
				deletedOrphans,
				deletedStale,
				deletedAbandoned,
				deletedWriteLeases,
				backlogLowerBound,
				scanHasMore,
				durationMs
			}) ? "completed" : "skipped",
			candidateRows,
			deletedRows: deletedOrphans + deletedStale + deletedAbandoned,
			deletedOrphans,
			deletedStale,
			deletedAbandoned,
			deletedWriteLeases,
			backlogLowerBound,
			scanHasMore,
			durationMs
		};
	} catch (error) {
		const durationMs = elapsedSince(startedMs);
		const failures = Math.min(claim.consecutiveFailures + 1, 5);
		try {
			await repo.failMediaUsageCleanup({
				leaseToken,
				retryDelaySeconds: failureDelayMs(failures) / 1e3,
				consecutiveFailures: failures,
				durationMs,
				errorCode: "MEDIA_USAGE_CLEANUP_FAILED"
			});
		} catch (failureError) {
			console.error("[media-usage-cleanup] Failed to record cleanup failure:", failureError);
		}
		console.error("[media-usage-cleanup] Cleanup failed:", error);
		return {
			...emptyResult("failed", durationMs),
			candidateRows,
			deletedRows: deletedOrphans + deletedStale + deletedAbandoned,
			deletedOrphans,
			deletedStale,
			deletedAbandoned,
			deletedWriteLeases,
			backlogLowerBound,
			scanHasMore
		};
	}
}
function selectCleanupCandidates(candidates, activeLeaseAt) {
	const orphanIds = [];
	const staleIds = [];
	const abandonedIds = [];
	const entries = [];
	for (const candidate of candidates) {
		if (hasActiveWriteLease(candidate, activeLeaseAt)) {
			entries.push({
				candidate,
				target: null
			});
			continue;
		}
		const target = cleanupTarget(candidate);
		if (target === null) {
			entries.push({
				candidate,
				target: null
			});
			continue;
		}
		if (orphanIds.length + staleIds.length + abandonedIds.length >= MEDIA_USAGE_CLEANUP_DELETE_LIMIT) break;
		if (target === "orphan") orphanIds.push(candidate.id);
		if (target === "stale") staleIds.push(candidate.id);
		if (target === "abandoned") abandonedIds.push(candidate.id);
		entries.push({
			candidate,
			target
		});
	}
	return {
		orphanIds,
		staleIds,
		abandonedIds,
		entries
	};
}
function cleanupTarget(candidate) {
	if (candidate.currentGeneration === null) return "orphan";
	if (candidate.currentGeneration === candidate.generation || candidate.indexedAt === null) return null;
	return candidate.createdAt < candidate.indexedAt ? "stale" : "abandoned";
}
function hasActiveWriteLease(candidate, activeLeaseAt) {
	return candidate.writeLeaseExpiresAt !== null && candidate.writeLeaseExpiresAt > activeLeaseAt;
}
function cursorFor(candidate) {
	return {
		createdAt: candidate.createdAt,
		id: candidate.id
	};
}
function cursorAfterCompletedCandidates(selected, completedTargets, priorCursor) {
	let cursor = priorCursor;
	for (const entry of selected.entries) {
		if (entry.target !== null && !completedTargets.has(entry.target)) break;
		cursor = cursorFor(entry.candidate);
	}
	return cursor;
}
function emptyResult(status, durationMs) {
	return {
		status,
		candidateRows: 0,
		deletedRows: 0,
		deletedOrphans: 0,
		deletedStale: 0,
		deletedAbandoned: 0,
		deletedWriteLeases: 0,
		backlogLowerBound: 0,
		scanHasMore: false,
		durationMs
	};
}
function withinBudget(startedMs) {
	return elapsedSince(startedMs) < MEDIA_USAGE_CLEANUP_TIME_BUDGET_MS;
}
function elapsedSince(startedMs) {
	return Math.max(0, Date.now() - startedMs);
}
function failureDelayMs(consecutiveFailures) {
	return Math.min(2 ** (consecutiveFailures - 1), 15) * MEDIA_USAGE_CLEANUP_INTERVAL_MS;
}
function cleanupLease(leaseToken) {
	return { leaseToken };
}
/**
* System cleanup
*
* Runs periodic maintenance tasks that prevent unbounded accumulation of
* expired or stale data. Called from cron scheduler ticks and (for latency-
* sensitive subsystems) inline during relevant requests.
*
* Each subsystem cleanup is independent and non-fatal -- if one fails, the
* rest still run. Failures are logged but never surface to callers.
*/
/** Most tags Cloudflare accepts in one purge call. */
var PURGE_TAG_BATCH = 100;
var REVISION_KEEP_COUNT = 50;
var REVISION_PRUNE_BATCH_SIZE = 10;
/**
* Revoking a refresh token finds the access tokens issued from it through its
* row, and those can outlive it by one access token lifetime. A device code's
* row is what lets a client that is still polling get `expired_token`.
*/
var OAUTH_EXPIRY_GRACE_MS = ACCESS_TOKEN_TTL_SECONDS * 1e3;
/**
* Decide whether the full system cleanup should run for this tick.
*
* Bookkeeping cleanup is expensive on serverless free tiers with tight CPU
* budgets, so it runs once per hour on the top of the hour. The per-minute
* path keeps only scheduled publishing, cron tasks, and the heartbeat.
*/
function shouldRunSystemCleanup(currentTime, lastRunAt) {
	if (currentTime.getUTCMinutes() !== 0) return false;
	if (!lastRunAt) return true;
	return currentTime.getTime() - lastRunAt.getTime() >= 33e5;
}
/**
* Run all system cleanup tasks.
*
* Safe to call frequently -- each subsystem tolerates repeated calls, and
* repeated calls with nothing to clean are cheap.
*
* @param db - The database instance
* @param storage - Optional storage backend for deleting orphaned files.
*   When omitted, pending upload DB rows are still deleted but the
*   corresponding files in object storage are not removed.
* @param invalidateRouteCache - Purges route cache tags; called with the media
*   tags of the stored files this run removed.
*/
async function runSystemCleanup(db, storage, invalidateRouteCache) {
	const removedKeys = [];
	const result = {
		challenges: -1,
		expiredTokens: -1,
		oauthTokens: -1,
		authorizationCodes: -1,
		deviceCodes: -1,
		pendingUploads: -1,
		pendingUploadFiles: -1,
		uploadAttempts: -1,
		revisionsPruned: -1,
		mediaUsage: -1,
		notFoundLog: -1,
		transferStaging: -1
	};
	try {
		result.challenges = await cleanupExpiredChallenges(db);
	} catch (error) {
		console.error("[cleanup] Failed to clean expired challenges:", error);
	}
	try {
		await createKyselyAdapter(db).deleteExpiredTokens();
		result.expiredTokens = 0;
	} catch (error) {
		console.error("[cleanup] Failed to clean expired tokens:", error);
	}
	try {
		const orphanedKeys = await new MediaRepository(db).cleanupPendingUploads();
		result.pendingUploads = orphanedKeys.length;
		if (storage && orphanedKeys.length > 0) {
			let filesDeleted = 0;
			for (const key of orphanedKeys) try {
				await storage.delete(key);
				filesDeleted++;
				removedKeys.push(key);
			} catch (error) {
				console.error(`[cleanup] Failed to delete storage file ${key}:`, error);
			}
			result.pendingUploadFiles = filesDeleted;
		} else result.pendingUploadFiles = 0;
	} catch (error) {
		console.error("[cleanup] Failed to clean pending uploads:", error);
	}
	try {
		const mediaRepo = new MediaRepository(db);
		const completedAttemptsDeleted = await mediaRepo.deleteCompletedUploadAttempts();
		if (!storage) result.uploadAttempts = completedAttemptsDeleted;
		else {
			const storageKeys = await mediaRepo.findUploadAttemptsForCleanup();
			let attemptsDeleted = completedAttemptsDeleted;
			for (const storageKey of storageKeys) if (await removeUploadAttempt(storage, mediaRepo, storageKey)) {
				attemptsDeleted++;
				removedKeys.push(storageKey);
			}
			result.uploadAttempts = attemptsDeleted;
		}
	} catch (error) {
		console.error("[cleanup] Failed to clean media upload attempts:", error);
	}
	if (invalidateRouteCache) {
		const tags = removedKeys.filter(isCacheableMediaKey).map(mediaCacheTag);
		for (const batch of chunks(tags, PURGE_TAG_BATCH)) try {
			await invalidateRouteCache(batch);
		} catch (error) {
			console.error("[cleanup] Failed to purge removed media from the route cache:", error);
		}
	}
	const oauthCutoff = new Date(Date.now() - OAUTH_EXPIRY_GRACE_MS).toISOString();
	try {
		const deleted = await db.deleteFrom("_emdash_oauth_tokens").where("expires_at", "<", oauthCutoff).executeTakeFirst();
		result.oauthTokens = Number(deleted.numDeletedRows);
	} catch (error) {
		console.error("[cleanup] Failed to clean expired OAuth tokens:", error);
	}
	try {
		const { cleanupExpiredAuthorizationCodes } = await import("./chunks/oauth-authorization-CvT-8KtG_Dbd6rUgR.mjs").then((n) => n.i);
		result.authorizationCodes = await cleanupExpiredAuthorizationCodes(db);
	} catch (error) {
		console.error("[cleanup] Failed to clean expired authorization codes:", error);
	}
	try {
		const deleted = await db.deleteFrom("_emdash_device_codes").where("expires_at", "<", oauthCutoff).executeTakeFirst();
		result.deviceCodes = Number(deleted.numDeletedRows);
	} catch (error) {
		console.error("[cleanup] Failed to clean expired device codes:", error);
	}
	try {
		result.revisionsPruned = await pruneQueuedRevisions(db);
	} catch (error) {
		console.error("[cleanup] Failed to prune revisions:", error);
	}
	try {
		const mediaUsage = await cleanupMediaUsage(db);
		result.mediaUsage = mediaUsage.status === "failed" ? -1 : mediaUsage.deletedRows;
	} catch (error) {
		console.error("[cleanup] Failed to clean media usage:", error);
	}
	try {
		result.notFoundLog = await new RedirectRepository(db).cleanup404Log();
	} catch (error) {
		console.error("[cleanup] Failed to cap the 404 log:", error);
	}
	if (storage) try {
		const { collectTransferStaging } = await import("./chunks/gc-CEhfEMLY_DHi43954.mjs");
		result.transferStaging = (await collectTransferStaging(db, storage)).collected;
	} catch (error) {
		console.error("[transfer] Failed to collect transfer staging:", error);
	}
	else result.transferStaging = 0;
	return result;
}
async function pruneQueuedRevisions(db) {
	const queued = await db.selectFrom("_emdash_revision_prune_queue").selectAll().orderBy("revision_id").limit(REVISION_PRUNE_BATCH_SIZE).execute();
	const revisionRepo = new RevisionRepository(db);
	let totalPruned = 0;
	for (const row of queued) try {
		totalPruned += await revisionRepo.pruneQueuedEntry(row.collection, row.entry_id, row.revision_id, REVISION_KEEP_COUNT);
	} catch (error) {
		console.error(`[cleanup] Failed to prune revisions for ${row.collection}/${row.entry_id}:`, error);
	}
	return totalPruned;
}
/** Plugin ID for the built-in default comment moderator */
var DEFAULT_COMMENT_MODERATOR_PLUGIN_ID = "emdash-default-comment-moderator";
/**
* The comment:moderate handler for the built-in default moderator.
*/
async function defaultCommentModerate(event, _ctx) {
	const { comment, collectionSettings, priorApprovedCount } = event;
	if (collectionSettings.commentsAutoApproveUsers && comment.authorUserId) return {
		status: "approved",
		reason: "Authenticated CMS user"
	};
	if (collectionSettings.commentsModeration === "none") return {
		status: "approved",
		reason: "Moderation disabled"
	};
	if (collectionSettings.commentsModeration === "first_time" && priorApprovedCount > 0) return {
		status: "approved",
		reason: "Returning commenter"
	};
	return {
		status: "pending",
		reason: "Held for review"
	};
}
/**
* Default cap on items promoted per collection in a single sweep. Bounds the
* publish/webhook fan-out of one tick so a large backlog can't exhaust a Worker
* invocation's CPU/subrequest budget; the remainder drains on later ticks.
*/
var SCHEDULED_PUBLISH_BATCH_LIMIT = 100;
var SCHEDULED_PUBLISH_CURSOR_PREFIX = "emdash:scheduled-publish-cursor:";
function scheduledPublishCursorKey(collection) {
	return `${SCHEDULED_PUBLISH_CURSOR_PREFIX}${collection}`;
}
function isScheduledPublishCursor(value) {
	return typeof value === "object" && value !== null && "scheduledAt" in value && typeof value.scheduledAt === "string" && "id" in value && typeof value.id === "string";
}
/**
* `publishDueContent`, plus the next upcoming scheduled time when
* `upcomingUntil` is set.
*/
async function sweepScheduledContent(db, options = {}) {
	const { publish, onPublished, limit = SCHEDULED_PUBLISH_BATCH_LIMIT, currentTime = /* @__PURE__ */ new Date(), upcomingUntil } = options;
	const published = [];
	let collections;
	try {
		collections = await new SchemaRegistry(db).listCollections();
	} catch (error) {
		console.error("[scheduled-publish] Failed to list collections:", error);
		return {
			published,
			nextScheduledAt: null
		};
	}
	const repo = new ContentRepository(db);
	const optionsRepo = new OptionsRepository(db);
	const doPublish = publish ?? ((collection, id, opts) => handleContentPublish(db, collection, id, opts));
	const batchLimit = limit > 0 ? limit : void 0;
	let dueCollections;
	try {
		dueCollections = await findTypesWithDueContent(db, collections.map((collection) => collection.slug), currentTime);
	} catch (error) {
		console.error("[scheduled-publish] Failed to find collections with due content:", error);
	}
	for (const collection of collections) {
		if (dueCollections && !dueCollections.has(collection.slug)) continue;
		try {
			let cursor;
			let cursorRevision = null;
			if (batchLimit !== void 0) try {
				const stored = await optionsRepo.getVersioned(scheduledPublishCursorKey(collection.slug));
				cursorRevision = stored?.revision ?? null;
				if (isScheduledPublishCursor(stored?.value)) cursor = stored.value;
			} catch (error) {
				console.error(`[scheduled-publish] Failed to read cursor for "${collection.slug}":`, error);
			}
			let due = await repo.findReadyToPublish(collection.slug, batchLimit, currentTime, cursor);
			if (cursor && due.length === 0) due = await repo.findReadyToPublish(collection.slug, batchLimit, currentTime);
			const batch = [];
			for (const item of due) {
				const publishedAt = item.publishedAt == null ? item.scheduledAt ?? void 0 : void 0;
				const result = await doPublish(collection.slug, item.id, {
					publishedAt,
					requireScheduledDue: true,
					expectedScheduledAt: item.scheduledAt ?? void 0,
					currentTime
				});
				if (result.success) batch.push({
					collection: collection.slug,
					id: item.id
				});
				else if (result.error?.code === "NOT_DUE" || result.error?.code === "PUBLISH_REJECTED" || result.error?.code === "CONFLICT") {} else console.error(`[scheduled-publish] Failed to publish ${collection.slug}/${item.id}:`, result.error);
			}
			const lastAttempted = due.at(-1);
			if (batchLimit !== void 0 && lastAttempted?.scheduledAt) try {
				await optionsRepo.compareAndSet(scheduledPublishCursorKey(collection.slug), cursorRevision, {
					scheduledAt: lastAttempted.scheduledAt,
					id: lastAttempted.id
				});
			} catch (error) {
				console.error(`[scheduled-publish] Failed to save cursor for "${collection.slug}":`, error);
			}
			if (batch.length > 0) {
				published.push(...batch);
				if (onPublished) try {
					await onPublished(batch);
				} catch (error) {
					console.error(`[scheduled-publish] onPublished failed after "${collection.slug}" batch:`, error);
				}
			}
		} catch (error) {
			console.error(`[scheduled-publish] Sweep failed for "${collection.slug}":`, error);
		}
	}
	let nextScheduledAt = null;
	if (upcomingUntil) try {
		nextScheduledAt = await findNextScheduledAt(db, collections.map((collection) => collection.slug), currentTime, upcomingUntil);
	} catch (error) {
		console.error("[scheduled-publish] Failed to find upcoming scheduled content:", error);
	}
	return {
		published,
		nextScheduledAt
	};
}
/**
* EmDashRuntime - Core runtime for EmDash CMS
*
* Manages database, storage, plugins (trusted + sandboxed), hooks, and
* provides handlers for content/media operations.
*
* Created once per worker lifetime, cached and reused across requests.
*/
var LEADING_SLASH_PATTERN$1 = /^\//;
var LOCALE_CASING_REPAIR_OPTION = "emdash:repair_locale_casing";
var SETUP_COMPLETE_OPTION = "emdash:setup_complete";
var PLUGIN_COMMENT_STATUSES = /* @__PURE__ */ new Set([
	"approved",
	"pending",
	"spam"
]);
function assertPluginCommentStatus(value, name) {
	if (!PLUGIN_COMMENT_STATUSES.has(value)) throw Object.assign(/* @__PURE__ */ new Error(`${name} must be one of: approved, pending, spam`), { code: "COMMENT_STATUS_INVALID" });
}
function getLocaleCasingRepairVersion(locales) {
	if (locales.length === 0) return null;
	return `1:${locales.toSorted().join(",")}`;
}
/**
* Parse a JSON column expected to contain an array of strings.
*
* Throws on malformed JSON rather than returning []; callers are responsible
* for deciding how to handle/log the error. Empty string / null inputs return
* [] (they represent "no value"). Non-string array entries are filtered out.
*/
function parseStringArray(raw) {
	if (!raw) return [];
	const parsed = JSON.parse(raw);
	if (!Array.isArray(parsed)) return [];
	return parsed.filter((v) => typeof v === "string");
}
function isModerationDecision(value) {
	if (typeof value !== "object" || value === null || !("status" in value)) return false;
	if (value.status !== "pending" && value.status !== "approved" && value.status !== "spam") return false;
	return !("reason" in value) || value.reason === void 0 || typeof value.reason === "string";
}
var DRAFT_ONLY_UPDATE_KEYS = /* @__PURE__ */ new Set([
	"data",
	"slug",
	"locale",
	"skipRevision",
	"references",
	"actor",
	"migrateBlocks",
	"replaceBlocks"
]);
/** Field types whose schema is an array, so a stored blank string can never validate. */
var ARRAY_FIELD_TYPES = /* @__PURE__ */ new Set([
	"portableText",
	"multiSelect",
	"repeater"
]);
var MAX_DRAFT_STAGE_ATTEMPTS = 32;
var PLUGIN_INVOCATION_RELEASE_GRACE_MS = 6e4;
/** Publish errors a scheduled retry cannot clear: the entry has to change first. */
var SCHEDULED_REFUSAL_CODES = /* @__PURE__ */ new Set(["VALIDATION_ERROR", "SLUG_CONFLICT"]);
function listConflict() {
	return {
		success: false,
		error: {
			code: "LIST_CONFLICT",
			message: LIST_CONFLICT_MESSAGE
		}
	};
}
/**
* A `ContentSaveRejectedError` carries a message the plugin wrote for the
* editor; every other exception stays internal and is replaced by a generic
* message so hook internals cannot leak through the API.
*/
function beforeSaveFailure(error) {
	if (isContentSaveRejection(error)) {
		const sandbox = getSandboxSaveRejectionDetails(error);
		if (sandbox) return {
			success: false,
			error: {
				code: ErrorCode.SAVE_REJECTED,
				message: error.message,
				details: sandbox
			}
		};
		return {
			success: false,
			error: {
				code: ErrorCode.SAVE_REJECTED,
				message: error.message
			}
		};
	}
	console.error("EmDash: content:beforeSave hook failed:", error);
	return {
		success: false,
		error: {
			code: ErrorCode.CONTENT_HOOK_ERROR,
			message: "A plugin hook failed while saving content"
		}
	};
}
/**
* How a draft save's revision is credited. Only an autosave replaces the draft revision it builds
* on, and only when that one is an autosave too. An autosave names the save's editors, then the
* names it carries from the replaced autosave (or that revision's author when it names none), once
* each and latest first. A kept save names only the editors its caller passed, once each.
* `replaced` is the draft revision the save builds on, or null when there is none or it is also
* the live revision.
*/
function revisionCredit(input) {
	const { autosave, actorId, editedBy, replaced } = input;
	if (!autosave) return {
		kind: null,
		editedBy: editedBy?.length ? [...new Set(editedBy)] : null,
		replaces: false
	};
	const replaces = replaced?.kind === "autosave";
	const own = editedBy ?? (actorId ? [actorId] : []);
	const carried = replaces ? replaced.editedBy ?? (replaced.authorId ? [replaced.authorId] : []) : [];
	const names = [.../* @__PURE__ */ new Set([...own, ...carried])];
	return {
		kind: "autosave",
		editedBy: names.length > 0 ? names : null,
		replaces
	};
}
/**
* Convert a ContentItem to Record<string, unknown> for hook consumption.
* Hooks receive the full item as a flat record.
*/
function contentItemToRecord(item) {
	return { ...item };
}
function toPluginContentItem(item) {
	return {
		id: item.id,
		type: item.type,
		slug: item.slug,
		status: item.status,
		locale: item.locale,
		data: item.data,
		createdAt: item.createdAt,
		updatedAt: item.updatedAt,
		publishedAt: item.publishedAt,
		scheduledAt: item.scheduledAt,
		authorId: item.authorId,
		translationGroup: item.translationGroup,
		liveRevisionId: item.liveRevisionId,
		draftRevisionId: item.draftRevisionId,
		version: item.version,
		...item.seo === void 0 ? {} : { seo: item.seo }
	};
}
/**
* Db init lock reclaim deadline. Derived from the migration race wait so
* they can't drift apart: a healthy init can legitimately block for the
* full MIGRATION_RACE_WAIT_MS inside waitForConcurrentMigrator, plus cold
* connect and migrator work, before it should be presumed dead. The outer
* runtime init lock (middleware.ts) must use a strictly larger deadline —
* it wraps create() → getDatabase() → this lock, and equal deadlines would
* let the outer reclaim while the inner is legitimately still working.
*/
var DB_INIT_DEADLINE_MS = MIGRATION_RACE_WAIT_MS + 2e4;
/**
* Db cache + its init lock live on globalThis behind a Symbol: the bundler
* can duplicate this module across SSR chunks (same reasoning as
* request-cache.ts), and a duplicated cache/lock would mean concurrent
* independent db inits — and duplicate migrators — per isolate.
*/
var DB_HOLDER_KEY = Symbol.for("emdash:db-cache");
var globalSymbolStore = globalThis;
function getDbHolder() {
	let holder = globalSymbolStore[DB_HOLDER_KEY];
	if (!holder) {
		holder = {
			cache: /* @__PURE__ */ new Map(),
			lock: createInitLock(),
			failures: /* @__PURE__ */ new Map()
		};
		globalSymbolStore[DB_HOLDER_KEY] = holder;
	}
	holder.failures ??= /* @__PURE__ */ new Map();
	return holder;
}
/**
* After a database init fails (migrations threw), skip re-attempting for
* this long. Cold isolates still get one attempt each, so a transient
* failure heals on its own; a persistently failing migration is retried at
* most once per backoff window per isolate instead of on every request.
*/
var DB_INIT_FAILURE_BACKOFF_MS = 3e4;
/** The failure a db init is still backing off from, if any. */
function activeInitFailure(holder, cacheKey) {
	const failure = holder.failures.get(cacheKey);
	if (!failure) return void 0;
	if (Date.now() - failure.at < DB_INIT_FAILURE_BACKOFF_MS) return failure;
	holder.failures.delete(cacheKey);
}
/**
* The most content rows auto mode migrates inside a deployed Worker request.
* Datetime normalization (079) issues about one statement per row it changes,
* a paid Worker invocation stops at 10,000 subrequests and 30 s of CPU by
* default, and the migrations around it need some of that budget too.
*/
var WORKER_AUTO_MIGRATION_CONTENT_ROW_LIMIT = 5e3;
/** Local development enforces no Worker limits, and Node has none. */
function autoMigrationContentRowLimit() {
	return typeof navigator !== "undefined" && typeof navigator.userAgent === "string" && navigator.userAgent.includes("Cloudflare-Workers") ? WORKER_AUTO_MIGRATION_CONTENT_ROW_LIMIT : void 0;
}
/**
* Auto-seed runs at most once per isolate per database. Its lock + "done" set
* live on globalThis (same bundler-duplication reasoning as the db cache) so a
* reclaimed-and-rerun `create()` can't seed a second time concurrently. The
* lock polls rather than sharing a promise, so it is safe to await across a
* cancelled owner in workerd.
*/
var SEED_HOLDER_KEY = Symbol.for("emdash:seed-state");
function getSeedHolder() {
	let holder = globalSymbolStore[SEED_HOLDER_KEY];
	if (!holder) {
		holder = {
			done: /* @__PURE__ */ new Set(),
			lock: createInitLock()
		};
		globalSymbolStore[SEED_HOLDER_KEY] = holder;
	}
	return holder;
}
var storageCache = /* @__PURE__ */ new Map();
var sandboxedPluginCache = /* @__PURE__ */ new Map();
var sandboxedManifestCache = /* @__PURE__ */ new Map();
/**
* Per-tier sets of `${pluginId}:${version}` keys present in
* `sandboxedPluginCache`. Used during sync to know which entries belong
* to which install source so we can invalidate only what belongs to the
* tier currently being synced.
*/
var marketplacePluginKeys = /* @__PURE__ */ new Set();
var registryPluginKeys = /* @__PURE__ */ new Set();
var INSTALLED_PLUGIN_REFRESH_RETRY_MS = 5e3;
/**
* Manifest metadata for runtime-installed sandboxed plugins (marketplace
* and registry both). Keyed by `pluginId`; readers don't care which
* source the plugin came from. Named `marketplace*` for legacy reasons.
*/
var marketplaceManifestCache = /* @__PURE__ */ new Map();
/** Route metadata for sandboxed plugins: pluginId -> routeName -> RouteMeta */
var sandboxedRouteMetaCache = /* @__PURE__ */ new Map();
var sandboxRunner = null;
function allowedBrowserImageHosts(capabilities, allowedHosts) {
	if (capabilities.includes("network:request:unrestricted") || capabilities.includes("network:fetch:any")) return ["*"];
	if (capabilities.includes("network:request") || capabilities.includes("network:fetch")) return allowedHosts;
	return [];
}
/**
* EmDashRuntime - singleton per worker
*/
var EmDashRuntime = class EmDashRuntime {
	/**
	* The singleton database instance (worker-lifetime cached).
	* Use the `db` getter instead — it checks the request context first
	* for per-request overrides (D1 read replica sessions, DO multi-site).
	*/
	_db;
	storage;
	configuredPlugins;
	sandboxedPlugins;
	sandboxedPluginEntries;
	/**
	* Schema registry bound to the current request/event-scoped connection.
	* Built per access (SchemaRegistry just wraps a db) against `this.db`, the
	* ALS-aware getter — never a captured snapshot of the singleton. On a
	* connection-backed adapter (Postgres over Hyperdrive) a captured singleton
	* would query a socket opened by an earlier event and trip workerd's
	* cross-request I/O guard; the catch in handlers like handleContentUpdate
	* would then silently treat a revision-enabled collection as non-revisioned
	* and write draft edits to live columns. Same reasoning as the per-call
	* registry in _buildManifest().
	*/
	get schemaRegistry() {
		return new SchemaRegistry(this.db);
	}
	_hooks;
	config;
	mediaProviders;
	mediaProviderEntries;
	cronExecutor;
	email;
	cronScheduler;
	_rooms = null;
	enabledPlugins;
	pluginStates;
	activePluginContentActions = /* @__PURE__ */ new Map();
	pendingPluginAfterHooks = /* @__PURE__ */ new Map();
	activePluginInvocations = /* @__PURE__ */ new Set();
	/** Timed-out sandbox invocations whose later actions must schedule hooks without another flush. */
	releasedPluginInvocations = /* @__PURE__ */ new Set();
	pluginInvocationCacheInvalidators = /* @__PURE__ */ new Map();
	pluginContentCacheInvalidator;
	/**
	* Isolate-lifetime guard so FTS indexes are verified at most once per
	* worker rather than on every admin request. See ensureSearchHealthy().
	* Uses the poison-immune single-flight cache (never a shared awaitable
	* promise) so a cancelled first caller can't wedge later ones.
	*/
	_searchHealthCache = createSingleFlightCache();
	/** Current hook pipeline. Use the `hooks` getter for external access. */
	get hooks() {
		return this._hooks;
	}
	/** All plugins eligible for the hook pipeline (includes built-in plugins).
	*  Stored so we can rebuild the pipeline when plugins are enabled/disabled. */
	allPipelinePlugins;
	/**
	* Plugin IDs whose declared storage indexes have been materialized without
	* errors. Per-plugin tracking lets retries target only the plugins that
	* failed a previous synchronization, and it keeps newly-installed plugins
	* from being treated as ready before their own indexes exist.
	*/
	storageIndexesReady = /* @__PURE__ */ new Set();
	pluginStateLock = createInitLock();
	appliedPluginGeneration = -1n;
	pluginStateSnapshot;
	installedPluginSandboxAvailable;
	pluginPipelineDirty = false;
	pluginRefreshFailures = /* @__PURE__ */ new Map();
	storageIndexesSyncPromises = /* @__PURE__ */ new Map();
	/** Factory options for the hook pipeline context factory */
	pipelineFactoryOptions;
	/** Dependencies needed for exclusive hook resolution */
	runtimeDeps;
	/** Mutable ref for the cron invokeCronHook closure to read the current pipeline */
	pipelineRef;
	commentModerationInProgress = /* @__PURE__ */ new Set();
	/**
	* Get the database instance for the current request.
	*
	* Checks the ALS-based request context first — middleware sets a
	* per-request Kysely instance there for D1 read replica sessions
	* or DO preview databases. Falls back to the singleton instance.
	*/
	get db() {
		const ctx = getRequestContext();
		if (ctx?.db) return ctx.db;
		return this._db;
	}
	/** Co-editing rooms, or null where co-editing is off or this host can't run rooms. */
	get rooms() {
		return this._rooms;
	}
	/** Bind the platform cache provider used by plugin actions, including request-less cron hooks. */
	setPluginContentCacheInvalidator(invalidateContentCache) {
		this.pluginContentCacheInvalidator = invalidateContentCache;
	}
	constructor(parts) {
		this.installedPluginSandboxAvailable = parts.installedPluginSandboxAvailable ?? false;
		this.pluginStateSnapshot = parts.pluginStateSnapshot;
		this.appliedPluginGeneration = parts.pluginStateSnapshot?.generation ?? -1n;
		this._db = parts.db;
		this.storage = parts.storage;
		this.configuredPlugins = parts.configuredPlugins;
		this.sandboxedPlugins = parts.sandboxedPlugins;
		this.sandboxedPluginEntries = parts.sandboxedPluginEntries;
		this._hooks = parts.hooks;
		this.enabledPlugins = parts.enabledPlugins;
		this.pluginStates = parts.pluginStates;
		this.config = parts.config;
		this.mediaProviders = parts.mediaProviders;
		this.mediaProviderEntries = parts.mediaProviderEntries;
		this.cronExecutor = parts.cronExecutor;
		this.cronScheduler = parts.cronScheduler;
		this.email = parts.emailPipeline;
		this.allPipelinePlugins = parts.allPipelinePlugins;
		this.pipelineFactoryOptions = parts.pipelineFactoryOptions;
		this.runtimeDeps = parts.runtimeDeps;
		this.pipelineRef = parts.pipelineRef;
	}
	/**
	* Get the sandbox runner instance (for marketplace install/update)
	*/
	getSandboxRunner() {
		return sandboxRunner;
	}
	/**
	* Whether the sandbox bypass mode (sandbox: false) is active.
	* Marketplace install/update handlers use this to skip the
	* SANDBOX_NOT_AVAILABLE gate, since the bypass path loads
	* marketplace plugins in-process via syncMarketplacePlugins().
	*/
	isSandboxBypassed() {
		return this.runtimeDeps.sandboxBypassed === true;
	}
	/**
	* Publish any content whose scheduled time has passed.
	* Returns the items promoted so callers can invalidate their cache tags.
	*/
	async publishScheduled() {
		const { published } = await this.publishScheduledWithFence();
		return published;
	}
	async publishScheduledWithFence(onPublished, upcomingUntil, currentTime = this.runtimeDeps.now?.() ?? /* @__PURE__ */ new Date()) {
		const recordWrite = await assertSiteWriteAllowed(this.db);
		const result = await sweepScheduledContent(this.db, {
			publish: (collection, id, options) => this.handleContentPublish(collection, id, {
				...options,
				origin: { source: "scheduler" }
			}),
			onPublished,
			currentTime,
			upcomingUntil
		});
		if (result.published.length > 0) await recordWrite();
		return result;
	}
	/**
	* Waits for each upcoming scheduled time up to `until` and sweeps again at
	* that moment, so content goes live on time even when the next platform
	* tick starts late. The sweep's fence re-checks every item, so a concurrent
	* tick racing for the same item publishes it once.
	*/
	async publishAtScheduledTimes(first, until, onPublished) {
		const now = () => this.runtimeDeps.now?.() ?? /* @__PURE__ */ new Date();
		const sleep = this.runtimeDeps.sleep ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
		const published = [];
		let next = first;
		while (next) {
			let currentTime = now();
			for (let attempt = 0; currentTime < next && attempt < 3; attempt++) {
				await sleep(next.getTime() - currentTime.getTime());
				currentTime = now();
			}
			if (currentTime < next) break;
			const result = await this.publishScheduledWithFence(onPublished, until, currentTime);
			published.push(...result.published);
			if (result.nextScheduledAt && result.nextScheduledAt <= currentTime) break;
			next = result.nextScheduledAt;
		}
		return published;
	}
	/**
	* Run the scheduled-maintenance batch: cron tasks, scheduled publishing,
	* and hourly system cleanup. For request-less drivers — the Cloudflare
	* `scheduled()` handler invokes this from a Cron Trigger. (On Node the
	* timer-based scheduler drives the same work itself.)
	*
	* Full cleanup runs only on the top of the hour so per-minute work stays
	* proportional to what is due; the heartbeat and scheduled publish sweep
	* still run every tick.
	*
	* Each step is independent and non-fatal. Returns the content promoted
	* by the publishing sweep so the caller can purge edge-cache tags.
	*
	* `onPublished` (optional) is awaited after each collection's batch so a
	* request-less driver can invalidate edge-cache tags incrementally rather
	* than only after the whole sweep — bounding stale-cache exposure if the
	* runtime is killed mid-sweep.
	*/
	async runScheduledTasks(options = {}) {
		const { published } = await this.runScheduledTasksWithStats(options);
		return { published };
	}
	async runScheduledTasksWithStats(options = {}) {
		if (options.invalidateContentCache) this.pluginContentCacheInvalidator = options.invalidateContentCache;
		try {
			await this.ensureStorageIndexesSynced();
		} catch (error) {
			console.error("[plugins] Storage index sync failed:", error);
		}
		const currentTime = this.runtimeDeps.now?.() ?? /* @__PURE__ */ new Date();
		const requestedWindowMs = options.publishUpcomingWithinMs ?? 0;
		const upcomingWindowMs = Number.isFinite(requestedWindowMs) ? requestedWindowMs : 0;
		const upcomingUntil = upcomingWindowMs > 0 ? new Date(currentTime.getTime() + upcomingWindowMs) : void 0;
		const [processed, { published }] = await Promise.all([this.runCronTick(), this.runScheduledMaintenanceTick({
			onPublished: options.onPublished,
			upcomingUntil
		}, currentTime)]);
		return {
			processed,
			published
		};
	}
	async runCronTick() {
		if (!this.cronExecutor) return 0;
		let processed = 0;
		try {
			processed = await this.cronExecutor.tick();
		} catch (error) {
			console.error("[cron] Tick failed:", error);
		}
		try {
			await this.cronExecutor.recoverStaleLocks();
		} catch (error) {
			console.error("[cron] Stale lock recovery failed:", error);
		}
		return processed;
	}
	/**
	* Time-gated maintenance pass shared by Cloudflare `scheduled()` and the
	* Node timer scheduler. Scheduled publishing and the heartbeat run every
	* tick; the heavier bookkeeping cleanups run only on the top of the hour so
	* per-minute work stays proportional to what is actually due. This keeps the
	* cold-start CPU budget on Workers Free from being consumed by cleanup
	* queries on every quiet-hours tick.
	*/
	async runScheduledMaintenanceTick(options, currentTime) {
		let sweep = {
			published: [],
			nextScheduledAt: null
		};
		try {
			sweep = await this.publishScheduledWithFence(options.onPublished, options.upcomingUntil, currentTime);
		} catch (error) {
			console.error("[scheduled-publish] Sweep failed:", error);
		}
		const upcoming = options.upcomingUntil && sweep.nextScheduledAt ? this.publishAtScheduledTimes(sweep.nextScheduledAt, options.upcomingUntil, options.onPublished).catch((error) => {
			console.error("[scheduled-publish] Upcoming publication failed:", error);
			return [];
		}) : void 0;
		await this.runSystemCleanupIfDue(currentTime);
		try {
			await this.ensureStorageIndexesSynced();
		} catch (error) {
			console.error("[plugins] Storage index sync failed:", error);
		}
		await maybeRunScheduledBackup(this.db, this.storage ?? void 0);
		await recordSchedulerHeartbeatSafely(this.db, currentTime);
		const published = [...sweep.published];
		if (upcoming) published.push(...await upcoming);
		return { published };
	}
	lastSystemCleanupAt = null;
	shouldRunSystemCleanup(currentTime) {
		return shouldRunSystemCleanup(currentTime, this.lastSystemCleanupAt);
	}
	async runSystemCleanupIfDue(currentTime) {
		if (!this.shouldRunSystemCleanup(currentTime)) return;
		this.lastSystemCleanupAt = currentTime;
		try {
			await runSystemCleanup(this.db, this.storage ?? void 0, this.pluginContentCacheInvalidator);
		} catch (error) {
			console.error("[cleanup] System cleanup failed:", error);
		}
		if (this._rooms) try {
			await this._rooms.expireIdle();
		} catch (error) {
			console.error("[co-editing] Hourly room drop failed:", error);
		}
	}
	/**
	* Build the deduplicated set of plugins that may declare storage indexes.
	* Includes configured/trusted plugins, adapted sandboxed plugins, and cached
	* marketplace/registry manifests for plugins that may not have been loaded
	* into the pipeline yet.
	*/
	getStorageIndexPlugins() {
		const map = /* @__PURE__ */ new Map();
		for (const plugin of this.allPipelinePlugins) map.set(plugin.id, plugin);
		for (const manifest of marketplaceManifestCache.values()) if (!map.has(manifest.id)) map.set(manifest.id, manifest);
		return map;
	}
	async runStorageIndexSync(pluginId) {
		const candidates = [...this.getStorageIndexPlugins().values()].filter((plugin) => !this.storageIndexesReady.has(plugin.id) && plugin.id === pluginId);
		const errors = [];
		for (const plugin of candidates) try {
			const stored = await this.db.selectFrom("_plugin_indexes").select(["collection", "index_name"]).where("plugin_id", "=", plugin.id).execute();
			const storage = { ...plugin.storage };
			const expected = /* @__PURE__ */ new Map();
			for (const [collection, config] of Object.entries(storage)) expected.set(collection, new Set(getStorageIndexDefinitions(config.indexes, config).map((entry) => generateIndexName(plugin.id, collection, entry.fields, { unique: entry.unique }))));
			let hasExtra = false;
			for (const row of stored) {
				if (!expected.get(row.collection)?.delete(row.index_name)) hasExtra = true;
				if (!Object.hasOwn(storage, row.collection)) storage[row.collection] = { indexes: [] };
			}
			const hasMissing = [...expected.values()].some((names) => names.size > 0);
			if (hasExtra || hasMissing) {
				const result = await syncDeclaredStorageIndexes(this.db, [{
					id: plugin.id,
					storage
				}]);
				errors.push(...result.errors);
				if (!result.ok) continue;
			}
			if (this.getStorageIndexPlugins().get(plugin.id) === plugin) this.storageIndexesReady.add(plugin.id);
		} catch (error) {
			console.error(`[plugins] Failed to check storage indexes for ${plugin.id}:`, error);
			errors.push({
				pluginId: plugin.id,
				collection: "(sync)",
				index: "(sync)",
				error: error instanceof Error ? error.message : String(error)
			});
		}
		return {
			ok: errors.length === 0,
			errors
		};
	}
	invalidateStorageIndexReadiness(pluginId) {
		this.storageIndexesReady.delete(pluginId);
	}
	/**
	* Ensure declared storage indexes are ready before state-changing plugin
	* work runs. Returns `true` only when the requested plugin (or all plugins,
	* when no ID is given) has been successfully synchronized. Uses a single
	* in-flight sync per plugin, shared by targeted and all-plugin callers.
	*/
	async ensureStorageIndexesSynced(pluginId) {
		if (!pluginId) return (await Promise.all(Array.from(this.getStorageIndexPlugins().keys(), (id) => this.ensureStorageIndexesSynced(id)))).every(Boolean);
		if (this.storageIndexesReady.has(pluginId)) return true;
		const declaration = this.getStorageIndexPlugins().get(pluginId);
		if (!declaration) return false;
		let flight = this.storageIndexesSyncPromises.get(pluginId);
		if (!flight) {
			const promise = this.runStorageIndexSync(pluginId).finally(() => {
				if (this.storageIndexesSyncPromises.get(pluginId)?.promise === promise) this.storageIndexesSyncPromises.delete(pluginId);
			});
			flight = {
				declaration,
				promise
			};
			this.storageIndexesSyncPromises.set(pluginId, flight);
		}
		await flight.promise;
		if (this.getStorageIndexPlugins().get(pluginId) !== declaration) return false;
		if (flight.declaration !== declaration) return this.ensureStorageIndexesSynced(pluginId);
		return this.storageIndexesReady.has(pluginId);
	}
	/**
	* Stop the cron scheduler gracefully.
	* Call during worker shutdown or hot-reload.
	*/
	async stopCron() {
		if (this.cronScheduler) await this.cronScheduler.stop();
	}
	/** Stop background work and discard loaded sandbox isolates. */
	async shutdown() {
		await this._rooms?.shutdown();
		await this.stopCron();
		sandboxRunner?.setCommentModerate?.(null);
		await sandboxRunner?.terminateAll();
		sandboxRunner = null;
		sandboxedPluginCache.clear();
		sandboxedManifestCache.clear();
		sandboxedRouteMetaCache.clear();
		marketplaceManifestCache.clear();
		marketplacePluginKeys.clear();
		registryPluginKeys.clear();
	}
	/**
	* Update in-memory plugin status and rebuild the hook pipeline.
	*
	* Rebuilding the pipeline ensures disabled plugins' hooks stop firing
	* and re-enabled plugins' hooks start firing again without a restart.
	* Exclusive hook selections are re-resolved after each rebuild.
	*/
	async setPluginStatus(pluginId, status, generation) {
		const repo = new PluginStateRepository(this.db);
		await this.withPluginStateLock(async (isCurrentClaim) => {
			const previousPlugin = this.allPipelinePlugins.find((plugin) => plugin.id === pluginId);
			const deactivation = status === "inactive" && this.isPluginEnabled(pluginId) && previousPlugin ? {
				plugin: previousPlugin,
				pipeline: this._hooks
			} : void 0;
			try {
				let snapshot;
				if (generation !== void 0) {
					snapshot = await repo.getSnapshot();
					if (!isCurrentClaim()) return;
					if (this.pluginStateSnapshot && this.pluginStateSnapshot.generation > snapshot.generation) snapshot = this.pluginStateSnapshot;
					if (snapshot.generation < generation) throw new Error("Plugin snapshot precedes the committed mutation");
					if (snapshot.states.find((state) => state.pluginId === pluginId)?.status !== status) {
						await this.applyPluginStateSnapshot(snapshot, isCurrentClaim, pluginId);
						return;
					}
				}
				await this.updatePluginStatus(pluginId, status, isCurrentClaim, snapshot, deactivation);
				if (isCurrentClaim() && snapshot) await this.applyPluginStateSnapshot(snapshot, isCurrentClaim, pluginId);
			} catch (error) {
				if (isCurrentClaim()) throw error;
			}
		});
	}
	async updatePluginStatus(pluginId, status, isCurrentClaim, snapshot, deactivation) {
		this.pluginStates.set(pluginId, status);
		this.pluginPipelineDirty = true;
		if (status === "active") try {
			await this.pluginForStatusLifecycle(pluginId, isCurrentClaim, snapshot);
			if (!isCurrentClaim()) return;
			this.setSandboxedPluginActive(pluginId, true);
			this.enabledPlugins.add(pluginId);
			await this.finishPluginPipeline(isCurrentClaim);
			if (!isCurrentClaim()) return;
			const results = await this._hooks.runPluginActivate(pluginId);
			if (!isCurrentClaim()) return;
			const failure = results.find((result) => !result.success);
			if (failure) throw failure.error ?? /* @__PURE__ */ new Error("Plugin activation failed");
		} catch (error) {
			if (!isCurrentClaim()) return;
			this.pluginStates.set(pluginId, "inactive");
			this.setSandboxedPluginActive(pluginId, false);
			this.enabledPlugins.delete(pluginId);
			this.pluginPipelineDirty = true;
			await this.finishPluginPipeline(isCurrentClaim);
			throw error;
		}
		else try {
			const plugin = await this.pluginForStatusLifecycle(pluginId, isCurrentClaim, snapshot, false);
			if (!isCurrentClaim()) return;
			this.setSandboxedPluginActive(pluginId, true);
			await (deactivation && deactivation.plugin === plugin ? deactivation.pipeline : plugin ? this.statusLifecyclePipeline(plugin) : this._hooks).runPluginDeactivate(pluginId);
		} finally {
			if (isCurrentClaim()) {
				this.setSandboxedPluginActive(pluginId, false);
				this.enabledPlugins.delete(pluginId);
				for (const key of [...registryPluginKeys, ...marketplacePluginKeys]) if (key.slice(0, key.lastIndexOf(":")) === pluginId) await this.discardRuntimePlugin(key, isCurrentClaim);
				await this.finishPluginPipeline(isCurrentClaim);
			}
		}
	}
	async pluginForStatusLifecycle(pluginId, isCurrentClaim, snapshot = this.pluginStateSnapshot, required = true) {
		const state = snapshot?.states.find((item) => item.pluginId === pluginId);
		const matches = (plugin) => plugin.id === pluginId && (!state || !this.isRuntimePluginState(state) || plugin.version === this.runtimePluginVersion(state));
		let plugin = this.allPipelinePlugins.find(matches);
		if (!plugin && snapshot && state && this.isRuntimePluginState(state)) {
			if (this.runtimeDeps.sandboxBypassed) {
				if (!required && state.source === "marketplace" && this.storage) try {
					const bundle = await loadBundleFromR2(this.storage, pluginId, this.runtimePluginVersion(state));
					if (!isCurrentClaim()) return;
					if (bundle) {
						const restored = await this.adaptBypassedRuntimePlugin(bundle);
						if (isCurrentClaim()) return restored;
					}
				} catch (error) {
					console.warn(`EmDash: Bypassed teardown unavailable for ${pluginId}:`, error);
				}
				return;
			}
			if (!this.installedPluginSandboxAvailable || !this.storage || !sandboxRunner) return;
			await this.retryRuntimePlugins(snapshot, isCurrentClaim, pluginId, true);
			if (!isCurrentClaim()) return;
			plugin = this.allPipelinePlugins.find(matches);
			if (!plugin) {
				const error = this.pluginRefreshFailures.get(pluginId)?.error ?? /* @__PURE__ */ new Error("Plugin lifecycle is unavailable");
				if (required) throw error;
				console.warn(`EmDash: Skipping unavailable deactivation cleanup for ${pluginId}:`, error);
			}
		}
		return plugin;
	}
	statusLifecyclePipeline(plugin) {
		const pipeline = createHookPipeline([plugin], this.pipelineFactoryOptions);
		pipeline.setContextFactory({
			emailPipeline: this.email ?? void 0,
			cronReschedule: () => this.cronScheduler?.reschedule()
		});
		return pipeline;
	}
	setSandboxedPluginActive(pluginId, active) {
		for (const [key, plugin] of this.sandboxedPlugins) if (key.slice(0, key.lastIndexOf(":")) === pluginId) plugin.setActive?.(active);
	}
	async handlePluginEnable(pluginId) {
		return enableRuntimePlugin(this, pluginId);
	}
	async handlePluginDisable(pluginId) {
		return disableRuntimePlugin(this, pluginId);
	}
	/** Run teardown before bundle deletion, including plugins already disabled in this isolate. */
	async runPluginUninstallLifecycle(pluginId, deleteData) {
		try {
			await this.withPluginStateLock(async (isCurrentClaim) => {
				let warned = false;
				const current = () => {
					const held = isCurrentClaim();
					if (!held && !warned) {
						warned = true;
						console.warn(`EmDash: Uninstall cleanup for ${pluginId} was superseded; remaining cleanup was skipped`);
					}
					return held;
				};
				let snapshot = await new PluginStateRepository(this.db).getSnapshot();
				if (!current()) return;
				if (this.pluginStateSnapshot && this.pluginStateSnapshot.generation > snapshot.generation) snapshot = this.pluginStateSnapshot;
				await this.applyPluginStateSnapshot(snapshot, current, pluginId);
				if (!current()) return;
				const active = snapshot.states.find((state) => state.pluginId === pluginId)?.status === "active";
				try {
					const plugin = await this.pluginForStatusLifecycle(pluginId, current, snapshot, false);
					if (!current()) return;
					const pipeline = plugin ? this.statusLifecyclePipeline(plugin) : this._hooks;
					this.setSandboxedPluginActive(pluginId, true);
					if (active) try {
						await pipeline.runPluginDeactivate(pluginId);
					} catch (error) {
						console.error(`EmDash: Plugin ${pluginId} deactivate hook failed during uninstall:`, error);
					}
					if (!current()) return;
					if ((await pipeline.runPluginUninstall(pluginId, deleteData)).length === 0) await this.findSandboxedPlugin(pluginId)?.invokeHook("plugin:uninstall", { deleteData });
				} finally {
					if (current()) {
						this.setSandboxedPluginActive(pluginId, active);
						if (!active) {
							for (const key of [...registryPluginKeys, ...marketplacePluginKeys]) if (key.slice(0, key.lastIndexOf(":")) === pluginId) await this.discardRuntimePlugin(key, current);
						}
						await this.finishPluginPipeline(current);
					}
				}
			});
		} catch (error) {
			console.error(`EmDash: Plugin ${pluginId} uninstall hook failed:`, error);
		}
	}
	async runPluginInstallLifecycle(pluginId) {
		await this._hooks.runPluginInstall(pluginId);
		await this._hooks.runPluginActivate(pluginId);
	}
	async runPluginActivateLifecycle(pluginId) {
		await this._hooks.runPluginActivate(pluginId);
	}
	/**
	* Run install → activate once for each loaded plugin registered in the
	* integration config that has no `_plugin_state` row.
	*
	* Only the isolate whose insert creates the row runs the hooks. A plugin
	* whose own hooks fail is recorded as inactive rather than retried on later
	* boots; re-enabling it from the admin runs `plugin:activate`. Sandbox
	* unavailability leaves no state so the next boot can retry.
	*/
	async installUnrecordedConfigPlugins(configPlugins, recordedStates) {
		const stateRepo = new PluginStateRepository(this.db);
		const failed = [];
		let sandboxReadinessFailed = false;
		let sandboxReadiness;
		const recordFailure = async (plugin, hook, error) => {
			if (this.sandboxedPlugins.has(`${plugin.id}:${plugin.version}`) && (error?.name === "SandboxUnavailableError" || error instanceof HookTimeoutError && sandboxRunner && !sandboxRunner.isHealthy())) {
				sandboxReadiness = void 0;
				await stateRepo.delete(plugin.id, {
					version: plugin.version,
					source: "config",
					status: "active"
				});
				this.pluginStates.delete(plugin.id);
				console.warn(`EmDash: Sandbox unavailable for config plugin "${plugin.id}"; retrying on next boot:`, error);
				return;
			}
			console.error(`EmDash: ${hook} failed for config plugin "${plugin.id}"; disabling it:`, error);
			failed.push(plugin);
		};
		for (const plugin of configPlugins) {
			if (recordedStates.has(plugin.id)) continue;
			try {
				if (this.sandboxedPlugins.has(`${plugin.id}:${plugin.version}`) && (plugin.hooks["plugin:install"] || plugin.hooks["plugin:activate"])) {
					if (sandboxReadinessFailed) continue;
					try {
						await (sandboxReadiness ??= sandboxRunner?.ensureRunning?.({ waitForPendingRestart: true }) ?? Promise.resolve());
						if (sandboxRunner && !sandboxRunner.isHealthy()) throw new SandboxUnavailableError(plugin.id, sandboxRunner.unavailableReason?.() ?? "not ready");
					} catch (error) {
						sandboxReadinessFailed = true;
						console.warn(`EmDash: Sandbox not ready for config plugin "${plugin.id}"; retrying on next boot:`, error);
						continue;
					}
				}
				if (!await stateRepo.createActiveIfAbsent(plugin.id, plugin.version, "config")) continue;
				this.pluginStates.set(plugin.id, "active");
				const installFailure = (await this._hooks.runPluginInstall(plugin.id)).find((result) => !result.success);
				if (installFailure) {
					await recordFailure(plugin, "plugin:install", installFailure.error);
					continue;
				}
				if (this.sandboxedPlugins.has(`${plugin.id}:${plugin.version}`) && plugin.hooks["plugin:activate"] && sandboxRunner && !sandboxRunner.isHealthy()) {
					await recordFailure(plugin, "plugin:activate", new SandboxUnavailableError(plugin.id, sandboxRunner.unavailableReason?.() ?? "not ready"));
					continue;
				}
				const activateFailure = (await this._hooks.runPluginActivate(plugin.id)).find((result) => !result.success);
				if (activateFailure) await recordFailure(plugin, "plugin:activate", activateFailure.error);
			} catch (error) {
				console.error(`EmDash: Config plugin "${plugin.id}" install/activate failed:`, error);
			}
		}
		if (failed.length === 0) return;
		for (const plugin of failed) {
			try {
				await stateRepo.disable(plugin.id, plugin.version);
				await setCronTasksEnabled(this.db, plugin.id, false);
			} catch (error) {
				console.error(`EmDash: Failed to record config plugin "${plugin.id}" as disabled:`, error);
			}
			this.pluginStates.set(plugin.id, "inactive");
			this.setSandboxedPluginActive(plugin.id, false);
			this.enabledPlugins.delete(plugin.id);
		}
		await this.rebuildHookPipeline();
	}
	/**
	* Rebuild the hook pipeline from the current set of enabled plugins.
	*
	* Filters `allPipelinePlugins` to only those in `enabledPlugins`,
	* creates a fresh HookPipeline, re-resolves exclusive hook selections,
	* and re-wires the context factory so existing references (cron
	* callbacks, email pipeline) use the new pipeline.
	*/
	async rebuildHookPipeline(isCurrentClaim = () => true) {
		const newPipeline = createHookPipeline(this.allPipelinePlugins.filter((p) => this.enabledPlugins.has(p.id)), this.pipelineFactoryOptions);
		await EmDashRuntime.resolveExclusiveHooks(newPipeline, this.db, this.runtimeDeps);
		if (!isCurrentClaim()) return;
		if (this.email) newPipeline.setContextFactory({ emailPipeline: this.email });
		newPipeline.setContextFactory({ cronReschedule: () => this.cronScheduler?.reschedule() });
		if (this.email) this.email.setPipeline(newPipeline);
		this.pipelineRef.current = newPipeline;
		this._hooks = newPipeline;
	}
	/** Reconcile locally committed marketplace mutations through the shared state lock. */
	async syncMarketplacePlugins() {
		if (!this.config.marketplace) return;
		await this.syncPluginState();
	}
	/** Reconcile locally committed registry mutations through the shared state lock. */
	async syncRegistryPlugins() {
		if (!getRegistryConfigInput(this.config.registry)) return;
		await this.syncPluginState();
	}
	withPluginStateLock(run) {
		return initWithLock(this.pluginStateLock, () => null, run, { anchor: (promise) => after(() => promise) });
	}
	async syncPluginState() {
		const repo = new PluginStateRepository(this.db);
		const writtenGeneration = repo.getLastWrittenGeneration();
		if (!this.runtimeDeps.sandboxBypassed && sandboxRunner) this.installedPluginSandboxAvailable = sandboxRunner.isAvailable();
		try {
			await this.withPluginStateLock(async (isCurrentClaim) => {
				const snapshot = await repo.getSnapshot();
				if (!isCurrentClaim()) return;
				if (writtenGeneration !== void 0 && snapshot.generation < writtenGeneration) throw new Error("Plugin snapshot precedes the committed mutation");
				await this.applyPluginStateSnapshot(snapshot, isCurrentClaim);
				if (!isCurrentClaim()) return;
				if (this.pluginStateSnapshot) await this.retryRuntimePlugins(this.pluginStateSnapshot, isCurrentClaim);
				await this.finishPluginPipeline(isCurrentClaim);
			});
		} catch (error) {
			console.error("EmDash: Failed to synchronize plugin state:", error);
		}
	}
	/** Whether route lookup may need runtime-installed plugin state. Does no I/O. */
	mayNeedInstalledPluginRefresh(pluginId) {
		if (this.runtimeDeps.sandboxBypassed || !this.storage || !this.installedPluginSandboxAvailable) return false;
		if (!this.config.marketplace && !getRegistryConfigInput(this.config.registry)) return false;
		return !(this.sandboxedPluginEntries.some((entry) => entry.id === pluginId) || this.configuredPlugins.some((plugin) => plugin.id === pluginId) && !marketplaceManifestCache.has(pluginId));
	}
	/** Refresh route state before authentication without polling on ordinary pages. */
	async refreshInstalledPluginRoute(pluginId) {
		if (!this.mayNeedInstalledPluginRefresh(pluginId)) return;
		await this.refreshPluginState(pluginId);
	}
	/** Apply newer generation-tagged snapshots; callers choose their freshness boundary. */
	async refreshPluginState(requestedPluginId) {
		const repo = new PluginStateRepository(this.db);
		const generation = await repo.getGeneration();
		const pending = this.pluginStateSnapshot;
		if (generation > this.appliedPluginGeneration || pending && pending.generation > this.appliedPluginGeneration || this.pluginPipelineDirty || (requestedPluginId ? this.needsPluginRetry(requestedPluginId) : pending?.states.some((state) => this.needsPluginRetry(state.pluginId)))) await this.withPluginStateLock(async (isCurrentClaim) => {
			let snapshot = this.pluginStateSnapshot;
			if (!snapshot || generation > snapshot.generation) {
				snapshot = await repo.getSnapshot();
				if (!isCurrentClaim()) return;
				if (snapshot.generation < generation) throw new Error("Plugin snapshot precedes its generation");
			}
			await this.applyPluginStateSnapshot(snapshot, isCurrentClaim, requestedPluginId);
			if (!isCurrentClaim()) return;
			if (this.pluginStateSnapshot) await this.retryRuntimePlugins(this.pluginStateSnapshot, isCurrentClaim, requestedPluginId);
			await this.finishPluginPipeline(isCurrentClaim);
		});
		if (requestedPluginId) {
			const state = this.pluginStateSnapshot?.states.find((item) => item.pluginId === requestedPluginId);
			if (state?.status === "active") {
				const failure = this.pluginRefreshFailures.get(requestedPluginId);
				if (failure?.stateKey === this.pluginStateFingerprint(state)) throw failure.error;
			}
		}
	}
	pluginStateFingerprint(state) {
		return JSON.stringify([
			state.source,
			state.status,
			state.version,
			state.marketplaceVersion,
			state.installedAt,
			state.activatedAt,
			state.deactivatedAt
		]);
	}
	runtimePluginVersion(state) {
		return state.source === "marketplace" ? state.marketplaceVersion ?? state.version : state.version;
	}
	isRuntimePluginState(state) {
		return state.source === "marketplace" && !!this.config.marketplace || state.source === "registry" && !!getRegistryConfigInput(this.config.registry);
	}
	needsPluginRetry(pluginId) {
		const state = this.pluginStateSnapshot?.states.find((item) => item.pluginId === pluginId);
		if (!state || state.status !== "active" || !this.isRuntimePluginState(state)) return false;
		const failure = this.pluginRefreshFailures.get(pluginId);
		if (failure?.stateKey === this.pluginStateFingerprint(state) && Date.now() < failure.retryAt) return false;
		return !sandboxedPluginCache.has(`${pluginId}:${this.runtimePluginVersion(state)}`);
	}
	async finishPluginPipeline(isCurrentClaim) {
		if (this.pluginPipelineDirty) {
			await this.rebuildHookPipeline(isCurrentClaim);
			if (!isCurrentClaim()) throw new Error("Plugin synchronization was superseded");
			this.pluginPipelineDirty = false;
		}
	}
	async applyPluginStateSnapshot(snapshot, isCurrentClaim, requestedPluginId) {
		if (!isCurrentClaim()) return;
		if (this.pluginStateSnapshot && snapshot.generation < this.pluginStateSnapshot.generation) snapshot = this.pluginStateSnapshot;
		const states = new Map(snapshot.states.map((state) => [state.pluginId, state]));
		if (snapshot.generation <= this.appliedPluginGeneration) {
			if (!this.runtimeDeps.sandboxBypassed) await this.discardInactiveRuntimePlugins(states, isCurrentClaim);
			return;
		}
		this.pluginStateSnapshot = snapshot;
		for (const pluginId of this.pluginStates.keys()) {
			if (states.has(pluginId)) continue;
			this.pluginStates.delete(pluginId);
			this.pluginRefreshFailures.delete(pluginId);
			const configured = this.runtimeDeps.plugins.some((plugin) => plugin.id === pluginId) || this.sandboxedPluginEntries.some((plugin) => plugin.id === pluginId);
			if (this.enabledPlugins.has(pluginId) !== configured) this.pluginPipelineDirty = true;
			if (configured) this.enabledPlugins.add(pluginId);
			else this.enabledPlugins.delete(pluginId);
			this.setSandboxedPluginActive(pluginId, configured);
		}
		for (const state of snapshot.states) {
			const enabled = state.status === "active";
			if (this.enabledPlugins.has(state.pluginId) !== enabled) this.pluginPipelineDirty = true;
			this.pluginStates.set(state.pluginId, state.status);
			if (enabled) this.enabledPlugins.add(state.pluginId);
			else this.enabledPlugins.delete(state.pluginId);
			this.setSandboxedPluginActive(state.pluginId, enabled);
			const failure = this.pluginRefreshFailures.get(state.pluginId);
			if (failure && failure.stateKey !== this.pluginStateFingerprint(state)) this.pluginRefreshFailures.delete(state.pluginId);
		}
		if (this.runtimeDeps.sandboxBypassed) {
			if (this.config.marketplace) await this.syncMarketplacePluginsBypassed(snapshot.states, isCurrentClaim);
		} else {
			await this.discardInactiveRuntimePlugins(states, isCurrentClaim);
			await this.retryRuntimePlugins(snapshot, isCurrentClaim, requestedPluginId);
		}
		await this.finishPluginPipeline(isCurrentClaim);
		if (!isCurrentClaim()) throw new Error("Plugin synchronization was superseded");
		this.appliedPluginGeneration = snapshot.generation;
	}
	async discardInactiveRuntimePlugins(states, isCurrentClaim) {
		for (const key of [...registryPluginKeys, ...marketplacePluginKeys]) {
			const pluginId = key.slice(0, key.lastIndexOf(":"));
			const desired = states.get(pluginId);
			const source = registryPluginKeys.has(key) ? "registry" : "marketplace";
			if (desired?.status === "active" && this.isRuntimePluginState(desired) && desired.source === source) continue;
			await this.discardRuntimePlugin(key, isCurrentClaim);
		}
	}
	async discardRuntimePlugin(key, isCurrentClaim) {
		const pluginId = key.slice(0, key.lastIndexOf(":"));
		try {
			const instance = sandboxedPluginCache.get(key);
			instance?.setActive?.(false);
			await instance?.terminate();
		} catch (error) {
			console.warn(`EmDash: Failed to terminate sandboxed plugin ${key}:`, error);
		}
		if (!isCurrentClaim()) throw new Error("Plugin synchronization was superseded");
		sandboxedPluginCache.delete(key);
		sandboxedManifestCache.delete(key);
		this.sandboxedPlugins.delete(key);
		registryPluginKeys.delete(key);
		marketplacePluginKeys.delete(key);
		sandboxedRouteMetaCache.delete(pluginId);
		marketplaceManifestCache.delete(pluginId);
		this.removePluginFromLists(pluginId);
		this.pluginPipelineDirty = true;
	}
	async retryRuntimePlugins(snapshot, isCurrentClaim, requestedPluginId, includeInactive = false) {
		if (this.runtimeDeps.sandboxBypassed || !this.storage || !sandboxRunner || !this.installedPluginSandboxAvailable) return;
		for (const state of snapshot.states) {
			if (requestedPluginId && state.pluginId !== requestedPluginId) continue;
			if (!includeInactive && state.status !== "active" || !this.isRuntimePluginState(state)) continue;
			const pluginId = state.pluginId;
			const version = this.runtimePluginVersion(state);
			const key = `${pluginId}:${version}`;
			if (sandboxedPluginCache.has(key)) continue;
			const stateKey = this.pluginStateFingerprint(state);
			const failed = this.pluginRefreshFailures.get(pluginId);
			if (failed?.stateKey === stateKey && Date.now() < failed.retryAt) continue;
			try {
				const bundle = await loadBundleFromR2(this.storage, pluginId, version, state.source === "registry" ? "registry" : "marketplace");
				if (!isCurrentClaim()) throw new Error("Plugin synchronization was superseded");
				if (!bundle) throw new Error(`Plugin bundle unavailable: ${pluginId}@${version}`);
				const loaded = await sandboxRunner.load(bundle.manifest, bundle.backendCode);
				if (!isCurrentClaim()) {
					if (sandboxedPluginCache.get(key) !== loaded) await loaded.terminate();
					throw new Error("Plugin synchronization was superseded");
				}
				for (const previous of [...registryPluginKeys, ...marketplacePluginKeys]) if (previous !== key && previous.slice(0, previous.lastIndexOf(":")) === pluginId) await this.discardRuntimePlugin(previous, isCurrentClaim);
				this.invalidateStorageIndexReadiness(pluginId);
				sandboxedPluginCache.set(key, loaded);
				sandboxedManifestCache.set(key, bundle.manifest);
				this.sandboxedPlugins.set(key, loaded);
				this.allPipelinePlugins.push(createSandboxedPluginProxy(bundle.manifest, loaded));
				(state.source === "registry" ? registryPluginKeys : marketplacePluginKeys).add(key);
				this.pluginRefreshFailures.delete(pluginId);
				this.pluginPipelineDirty = true;
				marketplaceManifestCache.set(pluginId, {
					id: bundle.manifest.id,
					version: bundle.manifest.version,
					admin: bundle.manifest.admin,
					mcp: bundle.manifest.mcp,
					storage: bundle.manifest.storage,
					allowedHosts: bundle.manifest.allowedHosts,
					capabilities: bundle.manifest.capabilities
				});
				const routeMeta = /* @__PURE__ */ new Map();
				for (const entry of bundle.manifest.routes) {
					const normalized = normalizeManifestRoute$1(entry);
					routeMeta.set(normalized.name, buildRouteMeta(normalized));
				}
				if (routeMeta.size > 0) sandboxedRouteMetaCache.set(pluginId, routeMeta);
				else sandboxedRouteMetaCache.delete(pluginId);
			} catch (error) {
				if (!isCurrentClaim()) throw error;
				this.pluginRefreshFailures.set(pluginId, {
					stateKey,
					retryAt: Date.now() + INSTALLED_PLUGIN_REFRESH_RETRY_MS,
					error
				});
				console.error(`EmDash: Failed to load plugin ${pluginId}@${version}:`, error);
			}
		}
	}
	/**
	* Remove a plugin from the in-memory pipeline lists by ID.
	* Mutates allPipelinePlugins and configuredPlugins in place.
	*/
	removePluginFromLists(pluginId) {
		this.invalidateStorageIndexReadiness(pluginId);
		const allIdx = this.allPipelinePlugins.findIndex((p) => p.id === pluginId);
		if (allIdx !== -1) {
			this.allPipelinePlugins.splice(allIdx, 1);
			this.pluginPipelineDirty = true;
		}
		const configIdx = this.configuredPlugins.findIndex((p) => p.id === pluginId);
		if (configIdx !== -1) this.configuredPlugins.splice(configIdx, 1);
	}
	/**
	* Sync marketplace plugin metadata in sandbox: false bypass mode.
	*
	* In bypass mode the noop runner can't load plugins, but admin pages,
	* widgets, and route metadata still need to refresh in-process when an
	* admin installs/updates/uninstalls a marketplace plugin. Otherwise the
	* admin UI shows stale data until the server restarts.
	*
	* Lifecycle hooks belong to the mutation owner, not snapshot materialization.
	*
	* Known limitation: bypass plugins are loaded via `import(dataUrl)`,
	* which Node's ESM cache keys on the full URL. Updates create fresh
	* module objects, but old ones remain cached for the worker's lifetime.
	* In practice this is a few KB per update — only matters for sites with
	* very frequent marketplace updates running long-lived processes. The
	* fix would be vm.SourceTextModule for explicit lifecycle management.
	*/
	async syncMarketplacePluginsBypassed(states, isCurrentClaim) {
		if (!this.storage) return;
		try {
			const marketplaceStates = states.filter((state) => state.source === "marketplace");
			const desired = /* @__PURE__ */ new Map();
			for (const state of marketplaceStates) {
				this.pluginStates.set(state.pluginId, state.status);
				if (state.status === "active") this.enabledPlugins.add(state.pluginId);
				else this.enabledPlugins.delete(state.pluginId);
				if (state.status !== "active") continue;
				desired.set(state.pluginId, state.marketplaceVersion ?? state.version);
			}
			const toRemove = [];
			for (const pluginId of marketplaceManifestCache.keys()) if (!desired.has(pluginId)) toRemove.push(pluginId);
			for (const pluginId of toRemove) {
				if (!isCurrentClaim()) throw new Error("Plugin synchronization was superseded");
				marketplaceManifestCache.delete(pluginId);
				sandboxedRouteMetaCache.delete(pluginId);
				this.removePluginFromLists(pluginId);
				this.enabledPlugins.delete(pluginId);
			}
			for (const [pluginId, version] of desired) {
				if (marketplaceManifestCache.get(pluginId)?.version === version && this.configuredPlugins.some((plugin) => plugin.id === pluginId && plugin.version === version)) continue;
				const bundle = await loadBundleFromR2(this.storage, pluginId, version);
				if (!isCurrentClaim()) throw new Error("Plugin synchronization was superseded");
				if (!bundle) {
					console.warn(`EmDash: Marketplace plugin ${pluginId}@${version} not found in R2`);
					continue;
				}
				marketplaceManifestCache.set(pluginId, {
					id: bundle.manifest.id,
					version: bundle.manifest.version,
					admin: bundle.manifest.admin,
					mcp: bundle.manifest.mcp,
					storage: bundle.manifest.storage,
					allowedHosts: bundle.manifest.allowedHosts,
					capabilities: bundle.manifest.capabilities
				});
				if (bundle.manifest.routes.length > 0) {
					const routeMetaMap = /* @__PURE__ */ new Map();
					for (const entry of bundle.manifest.routes) {
						const normalized = normalizeManifestRoute$1(entry);
						routeMetaMap.set(normalized.name, buildRouteMeta(normalized));
					}
					sandboxedRouteMetaCache.set(pluginId, routeMetaMap);
				} else sandboxedRouteMetaCache.delete(pluginId);
				const existing = this.allPipelinePlugins.find((p) => p.id === pluginId);
				if (existing && existing.version === bundle.manifest.version) continue;
				this.invalidateStorageIndexReadiness(pluginId);
				if (existing) this.removePluginFromLists(pluginId);
				try {
					const adapted = await this.adaptBypassedRuntimePlugin(bundle);
					if (!isCurrentClaim()) throw new Error("Plugin synchronization was superseded");
					this.pluginPipelineDirty = true;
					this.allPipelinePlugins.push(adapted);
					this.configuredPlugins.push(adapted);
					this.enabledPlugins.add(adapted.id);
				} catch (error) {
					console.error(`EmDash: Failed to load marketplace plugin ${pluginId}@${version} in-process:`, error);
				}
			}
		} catch (error) {
			console.error("EmDash: Failed to sync marketplace plugins (bypass):", error);
		}
	}
	async adaptBypassedRuntimePlugin(bundle) {
		const { adaptSandboxEntry } = await import("./chunks/adapt-sandbox-entry_BJLn3zEY.mjs");
		const pluginModule = await import(`data:text/javascript;base64,${Buffer.from(bundle.backendCode).toString("base64")}`);
		return adaptSandboxEntry(pluginModule.default ?? pluginModule, {
			id: bundle.manifest.id,
			version: bundle.manifest.version,
			entrypoint: "",
			capabilities: bundle.manifest.capabilities ?? [],
			allowedHosts: bundle.manifest.allowedHosts ?? [],
			storage: bundle.manifest.storage ?? {},
			adminPages: bundle.manifest.admin?.pages,
			adminWidgets: bundle.manifest.admin?.widgets?.map((w) => ({
				id: w.id,
				title: w.title,
				size: w.size === "full" || w.size === "half" || w.size === "third" ? w.size : void 0
			})),
			settingsSchema: bundle.manifest.admin?.settingsSchema,
			editorPanels: bundle.manifest.admin?.editorPanels,
			editorActions: bundle.manifest.admin?.editorActions,
			mcp: bundle.manifest.mcp
		});
	}
	/**
	* Create and initialize the runtime
	*/
	static async create(deps, timings) {
		const phase = async (name, desc, fn) => {
			if (!timings) return fn();
			const t0 = performance.now();
			try {
				return await fn();
			} finally {
				timings.push({
					name,
					dur: performance.now() - t0,
					desc
				});
			}
		};
		await phase("rt.secrets", "Validate encryption key", () => validateEncryptionKeyAtStartup());
		const storage = EmDashRuntime.getStorage(deps);
		const configuredLocales = config_default?.i18n?.locales ?? getI18nConfig()?.locales ?? [];
		const localeCasingRepairVersion = getLocaleCasingRepairVersion(configuredLocales);
		const reqCtx = getRequestContext();
		const ownsConfiguredDb = !!deps.config.database && !(reqCtx?.dbIsIsolated && reqCtx.db);
		let coalescingDb;
		let readDbDisposable;
		const disposeReadDb = async () => {
			const disposable = readDbDisposable;
			readDbDisposable = void 0;
			if (!disposable) return;
			try {
				await disposable.destroy();
			} catch {}
		};
		if (ownsConfiguredDb && deps.createCoalescingDialect && deps.config.database) try {
			const dialect = deps.createCoalescingDialect(deps.config.database.config);
			if (dialect) {
				coalescingDb = new Kysely({
					dialect,
					log: kyselyLogOption()
				});
				readDbDisposable = coalescingDb;
			}
		} catch {}
		let missingManualSchemaError;
		const captureMissingManualSchema = (error) => {
			if ((deps.migrationMode ?? "auto") === "manual" && isMissingTableError(error)) missingManualSchemaError ??= error;
		};
		const readSiteInfo = async (readDb) => {
			const siteOpts = await new OptionsRepository(readDb).getMany([
				"site:title",
				"emdash:site_title",
				"site:url",
				"emdash:site_url",
				"emdash:locale",
				LOCALE_CASING_REPAIR_OPTION,
				AUTO_SEED_COMPLETE_OPTION,
				SETUP_COMPLETE_OPTION
			]);
			const siteTitle = resolveSiteTitle(siteOpts.get("site:title"), siteOpts.get("emdash:site_title"));
			const siteUrl = resolveSiteOrigin(deps.config, siteOpts.get("site:url"), siteOpts.get("emdash:site_url"));
			const locale = siteOpts.get("emdash:locale");
			const repairVersion = siteOpts.get(LOCALE_CASING_REPAIR_OPTION);
			return {
				siteInfo: {
					siteName: deps.siteInfo?.name ?? siteTitle,
					siteUrl: deps.siteInfo?.url ?? siteUrl,
					locale: deps.siteInfo?.locale ?? (typeof locale === "string" ? locale : void 0),
					trailingSlash: deps.siteInfo?.trailingSlash ?? config_default?.trailingSlash
				},
				storedLocaleCasingRepairVersion: typeof repairVersion === "string" ? repairVersion : void 0,
				seedComplete: siteOpts.get(AUTO_SEED_COMPLETE_OPTION) === true,
				setupDone: siteOpts.get(SETUP_COMPLETE_OPTION) === true
			};
		};
		const runColdStartReads = async (readDb) => {
			const reads = {
				pluginStates: /* @__PURE__ */ new Map(),
				pluginStatesRead: false,
				installedPluginStates: [],
				seedCollectionsReadable: false
			};
			const coldStartReads = [
				phase("rt.plugins", "Plugin states", async () => {
					try {
						const snapshot = await new PluginStateRepository(readDb).getSnapshot();
						reads.pluginStates = new Map(snapshot.states.map((state) => [state.pluginId, state.status]));
						reads.pluginStatesRead = true;
						reads.pluginStateSnapshot = snapshot;
						reads.installedPluginStates = snapshot.states.filter((state) => state.source === "marketplace" || state.source === "registry");
					} catch (error) {
						captureMissingManualSchema(error);
					}
				}),
				phase("rt.site", "Site info options", async () => {
					try {
						reads.site = await readSiteInfo(readDb);
					} catch (error) {
						captureMissingManualSchema(error);
					}
				}),
				phase("rt.hookselections", "Exclusive hook selections", async () => {
					const keys = Array.from(/* @__PURE__ */ new Set([
						"comment:moderate",
						"email:deliver",
						...deps.plugins.flatMap((plugin) => Object.entries(plugin.hooks).filter(([, hook]) => hook?.exclusive).map(([name]) => name))
					]), (name) => `${EXCLUSIVE_HOOK_KEY_PREFIX}${name}`);
					try {
						const stored = await new OptionsRepository(readDb).getMany(keys);
						reads.exclusiveHookSelections = new Map(keys.map((key) => [key, stored.get(key)]));
					} catch (error) {
						captureMissingManualSchema(error);
					}
				})
			];
			if (ownsConfiguredDb) coldStartReads.push(phase("rt.seedcheck", "Auto-seed gate", async () => {
				try {
					primeRegisteredCollections((await readDb.selectFrom("_emdash_collections").select("slug").execute()).map((row) => row.slug));
					reads.seedCollectionsReadable = true;
				} catch (error) {
					captureMissingManualSchema(error);
				}
			}));
			await Promise.all(coldStartReads);
			return reads;
		};
		let migrationsCurrent = false;
		let foldedColdStartReads;
		let appliedMigrationCount;
		if (coalescingDb && (deps.migrationMode ?? "auto") === "auto" && EmDashRuntime.databaseNeedsInit(deps)) {
			appliedMigrationCount = getAppliedMigrationCount(coalescingDb).catch(() => void 0);
			foldedColdStartReads = runColdStartReads(coalescingDb);
		}
		let db;
		try {
			db = await phase("rt.db", "DB init + migration policy", async () => {
				const count = await appliedMigrationCount;
				migrationsCurrent = isMigrationCountCurrent(count);
				return EmDashRuntime.getDatabase(deps, { appliedMigrationCount: count });
			});
		} catch (error) {
			await foldedColdStartReads?.catch(() => void 0);
			await disposeReadDb();
			throw error;
		}
		const resolveDb = () => {
			return getRequestContext()?.db ?? db;
		};
		const readDb = coalescingDb ?? db;
		const foldedReads = await foldedColdStartReads;
		const reads = foldedReads && migrationsCurrent ? foldedReads : await runColdStartReads(readDb);
		const { pluginStates, pluginStatesRead, installedPluginStates, exclusiveHookSelections, seedCollectionsReadable } = reads;
		let siteInfo = reads.site?.siteInfo;
		const storedLocaleCasingRepairVersion = reads.site?.storedLocaleCasingRepairVersion;
		const seedComplete = reads.site?.seedComplete ?? true;
		const setupDone = reads.site?.setupDone ?? true;
		if (missingManualSchemaError) {
			await disposeReadDb();
			throw missingManualSchemaError;
		}
		if (localeCasingRepairVersion && (configuredLocales.some((locale) => locale.includes("-") || locale !== locale.toLowerCase()) || storedLocaleCasingRepairVersion !== void 0) && storedLocaleCasingRepairVersion !== localeCasingRepairVersion) await phase("rt.locale", "Repair locale casing", async () => {
			await repairLocaleCasing(db, configuredLocales);
			await new OptionsRepository(db).set(LOCALE_CASING_REPAIR_OPTION, localeCasingRepairVersion);
		});
		if (seedCollectionsReadable && !seedComplete && !setupDone) {
			try {
				if ((await activateMediaUsageCapture(db, { writersDrained: true })).outcome !== "active") throw new Error("Fresh-site media usage activation did not complete");
			} catch (error) {
				await disposeReadDb();
				throw error;
			}
			const seedKey = deps.config.database?.entrypoint ?? "default";
			const seedHolder = getSeedHolder();
			try {
				await initWithLock(seedHolder.lock, () => seedHolder.done.has(seedKey) ? true : void 0, async () => {
					const { applySeed } = await import("./chunks/apply-CmE9k57Q_DjTsiBL3.mjs").then((n) => n.r);
					const { loadSeed } = await import("./chunks/load-CEt0TQ4__DBSiQhH1.mjs").then((n) => n.i);
					const { validateSeed } = await import("./chunks/validate-DBnEN6hU_O4Q-VN2O.mjs").then((n) => n.r);
					const seed = await loadSeed();
					if (!validateSeed(seed).valid) return false;
					const seedResult = await applySeed(db, seed, { onConflict: "skip" });
					await new OptionsRepository(db).set(AUTO_SEED_COMPLETE_OPTION, true);
					console.log("Auto-seeded default collections");
					if (seedResult.taxonomies.skipped > 0) console.warn(`[auto-seed] Kept ${seedResult.taxonomies.skipped} existing taxonomy definition(s) instead of the seed's. Edit them in the admin, or run \`emdash seed <file> --on-conflict update\` to replace them (this also overwrites other seeded records).`);
					seedHolder.done.add(seedKey);
					return true;
				}, {
					deadlineMs: DB_INIT_DEADLINE_MS,
					anchor: (promise) => after(() => promise)
				});
				try {
					siteInfo = (await readSiteInfo(readDb)).siteInfo;
				} catch {}
			} catch {}
		}
		await disposeReadDb();
		const enabledPlugins = /* @__PURE__ */ new Set();
		for (const plugin of deps.plugins) {
			const status = pluginStates.get(plugin.id);
			if (status === void 0 || status === "active") enabledPlugins.add(plugin.id);
		}
		const allPipelinePlugins = [...deps.plugins];
		const bypassedPluginsList = [];
		try {
			const smtpPlugin = definePlugin({
				id: SMTP_EMAIL_PLUGIN_ID,
				version: "1.0.0",
				capabilities: ["hooks.email-transport:register"],
				hooks: { "email:deliver": {
					exclusive: true,
					timeout: 3e4,
					handler: createSmtpEmailDeliverFromDb(resolveDb, process.env.EMDASH_ENCRYPTION_KEY ?? null)
				} }
			});
			allPipelinePlugins.push(smtpPlugin);
			enabledPlugins.add(smtpPlugin.id);
		} catch (error) {
			console.warn("[email] Failed to register SMTP email provider:", error);
		}
		try {
			const defaultModeratorPlugin = definePlugin({
				id: DEFAULT_COMMENT_MODERATOR_PLUGIN_ID,
				version: "0.0.0",
				capabilities: ["users:read"],
				hooks: { "comment:moderate": {
					exclusive: true,
					handler: defaultCommentModerate
				} }
			});
			allPipelinePlugins.push(defaultModeratorPlugin);
			enabledPlugins.add(defaultModeratorPlugin.id);
		} catch (error) {
			console.warn("[comments] Failed to register default moderator:", error);
		}
		if (deps.sandboxBypassed && deps.sandboxedPluginEntries.length > 0) {
			if (typeof navigator !== "undefined" && typeof navigator.userAgent === "string" && navigator.userAgent.includes("Cloudflare-Workers")) throw new Error("sandbox: false is not supported in Cloudflare Workers. Remove the sandbox: false option or use the Cloudflare sandbox runner.");
			console.info("EmDash: Sandbox disabled (sandbox: false). Sandboxed plugins will run in-process without isolation.");
			const bypassedPlugins = await EmDashRuntime.loadBypassedPlugins(deps.sandboxedPluginEntries);
			for (const plugin of bypassedPlugins) {
				allPipelinePlugins.push(plugin);
				bypassedPluginsList.push(plugin);
				const status = pluginStates.get(plugin.id);
				if (status === void 0 || status === "active") enabledPlugins.add(plugin.id);
			}
		}
		if (deps.sandboxBypassed && deps.config.marketplace && storage) {
			const marketplaceBypassed = await EmDashRuntime.loadMarketplacePluginsBypassed(storage, installedPluginStates);
			for (const plugin of marketplaceBypassed) {
				allPipelinePlugins.push(plugin);
				bypassedPluginsList.push(plugin);
				const status = pluginStates.get(plugin.id);
				if (status === void 0 || status === "active") enabledPlugins.add(plugin.id);
			}
		}
		const sandboxedPluginPool = await phase("rt.sandbox", "Sandboxed plugins", () => EmDashRuntime.loadSandboxedPlugins(deps, db, storage, siteInfo));
		for (const [key, plugin] of sandboxedPluginPool) {
			const pluginId = key.slice(0, key.lastIndexOf(":"));
			const status = pluginStates.get(pluginId);
			plugin.setActive?.(status === void 0 || status === "active");
		}
		const installedTierPhases = [];
		if (deps.config.marketplace && storage && !deps.sandboxBypassed) installedTierPhases.push(phase("rt.market", "Marketplace plugins", () => EmDashRuntime.loadInstalledSandboxedPlugins("marketplace", db, storage, deps, sandboxedPluginPool, installedPluginStates, siteInfo)));
		if (getRegistryConfigInput(deps.config.registry) && storage) installedTierPhases.push(phase("rt.registry", "Registry plugins", () => EmDashRuntime.loadInstalledSandboxedPlugins("registry", db, storage, deps, sandboxedPluginPool, installedPluginStates, siteInfo)));
		const installedPluginSandboxAvailable = (await Promise.all(installedTierPhases)).some(Boolean);
		const configuredSandboxIds = new Set(deps.sandboxedPluginEntries.map((entry) => entry.id));
		const sandboxedPlugins = new Map([...sandboxedPluginPool].filter(([pluginKey]) => {
			const pluginId = pluginKey.slice(0, pluginKey.lastIndexOf(":"));
			return configuredSandboxIds.has(pluginId) || pluginStates.get(pluginId) === "active";
		}));
		for (const [pluginKey, instance] of sandboxedPlugins) {
			const manifest = sandboxedManifestCache.get(pluginKey);
			if (!manifest) continue;
			allPipelinePlugins.push(createSandboxedPluginProxy(manifest, instance));
			const status = pluginStates.get(manifest.id);
			if (status === void 0 || status === "active") enabledPlugins.add(manifest.id);
		}
		const runtimeRef = { current: null };
		const requireRuntime = () => {
			if (!runtimeRef.current) throw new Error("EmDash runtime is not ready");
			return runtimeRef.current;
		};
		const contentActions = {
			begin: (pluginId, invocationId, invalidateContentCache) => requireRuntime().beginPluginInvocation(pluginId, invocationId, invalidateContentCache),
			flush: (pluginId, invocationId, final) => requireRuntime().flushPluginAfterHooks(pluginId, invocationId, final),
			invalidateMedia: async (pluginId, storageKey, invocationId, invalidateContentCache) => runtimeRef.current?.invalidatePluginMedia(pluginId, storageKey, invocationId, invalidateContentCache),
			getVersioned: (pluginId, collection, id) => requireRuntime().pluginGetVersioned(pluginId, collection, id),
			publish: (pluginId, collection, id, options, invocationId, invalidateContentCache) => requireRuntime().pluginPublish(pluginId, collection, id, options, invocationId, invalidateContentCache),
			unpublish: (pluginId, collection, id, options, invocationId, invalidateContentCache) => requireRuntime().pluginUnpublish(pluginId, collection, id, options, invocationId, invalidateContentCache),
			schedule: (pluginId, collection, id, options, invocationId, invalidateContentCache) => requireRuntime().pluginSchedule(pluginId, collection, id, options, invocationId, invalidateContentCache),
			unschedule: (pluginId, collection, id, options, invocationId, invalidateContentCache) => requireRuntime().pluginUnschedule(pluginId, collection, id, options, invocationId, invalidateContentCache),
			getTrashedVersioned: (pluginId, collection, id) => requireRuntime().pluginGetTrashedVersioned(pluginId, collection, id),
			restore: (pluginId, collection, id, options, invocationId, invalidateContentCache) => requireRuntime().pluginRestore(pluginId, collection, id, options, invocationId, invalidateContentCache)
		};
		const pipelineFactoryOptions = {
			db,
			getDb: resolveDb,
			beforeContentWrite: () => assertSiteWriteAllowed(resolveDb()),
			contentActions,
			now: deps.now,
			storage: storage ?? void 0,
			imagePlaceholders: deps.config.imagePlaceholders ?? true,
			siteInfo,
			commentModerate: (pluginId, id, status, expectedStatus) => {
				const current = runtimeRef.current;
				if (!current) throw new Error("Comment moderation is unavailable during runtime startup");
				return current.handlePluginCommentModerate(pluginId, id, status, expectedStatus);
			}
		};
		const pipeline = createHookPipeline(allPipelinePlugins.filter((p) => enabledPlugins.has(p.id)), pipelineFactoryOptions);
		const mediaProviders = /* @__PURE__ */ new Map();
		const mediaProviderEntries = deps.mediaProviderEntries ?? [];
		const providerContext = {
			db,
			storage,
			getDb: resolveDb
		};
		for (const entry of mediaProviderEntries) try {
			const provider = entry.createProvider(providerContext);
			mediaProviders.set(entry.id, provider);
		} catch (error) {
			console.warn(`Failed to initialize media provider "${entry.id}":`, error);
		}
		await phase("rt.hooks", "Exclusive hook resolution", () => EmDashRuntime.resolveExclusiveHooks(pipeline, db, deps, exclusiveHookSelections));
		const emailPipeline = new EmailPipeline(pipeline);
		if (sandboxRunner) sandboxRunner.setEmailSend((message, pluginId) => emailPipeline.send(message, pluginId));
		const pipelineRef = { current: pipeline };
		const invokeCronHook = async (pluginId, event) => {
			const result = await pipelineRef.current.invokeCronHook(pluginId, event);
			if (!result.success && result.error) throw result.error;
		};
		pipeline.setContextFactory({ emailPipeline });
		let cronExecutor = null;
		let cronScheduler = null;
		await phase("rt.cron", "Cron init", async () => {
			try {
				cronExecutor = new CronExecutor(resolveDb, invokeCronHook, deps.now);
				pipeline.setContextFactory({ cronReschedule: () => cronScheduler?.reschedule() });
				if (deps.createScheduler) {
					const scheduler = deps.createScheduler(cronExecutor);
					cronScheduler = scheduler;
					scheduler.setSystemCleanup(async () => {
						const runtime = runtimeRef.current;
						if (!runtime) return;
						const currentTime = deps.now?.() ?? /* @__PURE__ */ new Date();
						try {
							await runtime.runScheduledMaintenanceTick({}, currentTime);
						} catch (error) {
							console.error("[scheduled] Maintenance tick failed:", error);
						}
					});
					scheduler.start();
				}
			} catch (error) {
				console.warn("[cron] Failed to initialize cron system:", error);
			}
		});
		sandboxRunner?.setCronReschedule?.(() => cronScheduler?.reschedule());
		const runtime = new EmDashRuntime({
			installedPluginSandboxAvailable,
			pluginStateSnapshot: reads.pluginStateSnapshot,
			db,
			storage,
			configuredPlugins: [...deps.plugins, ...bypassedPluginsList],
			sandboxedPlugins,
			sandboxedPluginEntries: deps.sandboxedPluginEntries,
			hooks: pipeline,
			enabledPlugins,
			pluginStates,
			config: deps.config,
			mediaProviders,
			mediaProviderEntries,
			cronExecutor,
			cronScheduler,
			emailPipeline,
			allPipelinePlugins,
			pipelineFactoryOptions,
			runtimeDeps: deps,
			pipelineRef
		});
		const contentCreate = async (_pluginId, collection, input, options) => {
			const { seo, ...data } = input;
			const result = await runtime.handleContentCreate(collection, {
				data,
				seo,
				locale: resolveContentCreateLocale(options?.locale),
				translationOf: options?.translationOf
			}, {
				skipSaveHooks: options?.sandboxOrigin ? options.originHook !== void 0 : getActiveContentSaveHookName() != null,
				excludeAfterSavePluginId: _pluginId
			});
			if (!result.success) throw Object.assign(new Error(result.error.message), {
				name: result.error.code,
				code: result.error.code
			});
			return result.data.item;
		};
		runtime.pipelineFactoryOptions.contentCreate = contentCreate;
		pipeline.setContextFactory({ contentCreate });
		sandboxRunner?.setContentCreate?.(contentCreate);
		runtimeRef.current = runtime;
		sandboxRunner?.setCommentModerate?.((pluginId, id, status, expectedStatus) => runtime.handlePluginCommentModerate(pluginId, id, status, expectedStatus));
		sandboxRunner?.setContentActions?.(contentActions);
		if (ownsConfiguredDb && pluginStatesRead) {
			const configPlugins = [...deps.plugins, ...allPipelinePlugins.filter((plugin) => configuredSandboxIds.has(plugin.id))];
			await phase("rt.lifecycle", "Config plugin install/activate", () => runtime.installUnrecordedConfigPlugins(configPlugins, new Map(pluginStates)));
		}
		runtime._rooms = deps.createRoomHost?.(runtime) ?? null;
		return runtime;
	}
	/**
	* Get a media provider by ID
	*/
	getMediaProvider(providerId) {
		return this.mediaProviders.get(providerId);
	}
	/**
	* Get all media provider entries (for admin UI)
	*/
	getMediaProviderList() {
		return this.mediaProviderEntries.map((e) => ({
			id: e.id,
			name: e.name,
			icon: e.icon,
			capabilities: e.capabilities
		}));
	}
	/**
	* Whether getDatabase would initialize the configured database: it isn't
	* cached yet and isn't backing off after a failed init.
	*/
	static databaseNeedsInit(deps) {
		const dbConfig = deps.config.database;
		if (!dbConfig) return false;
		const holder = getDbHolder();
		return !holder.cache.has(dbConfig.entrypoint) && !activeInitFailure(holder, dbConfig.entrypoint);
	}
	/**
	* Get or create database instance
	*
	* `appliedMigrationCount` is a count the caller already read from this
	* database; the migration policy uses it rather than reading its own.
	*/
	static async getDatabase(deps, options) {
		const ctx = getRequestContext();
		if (ctx?.dbIsIsolated && ctx.db) return ctx.db;
		const dbConfig = deps.config.database;
		if (!dbConfig) try {
			return await getDb();
		} catch {
			throw new Error("EmDash database not configured. Either configure database in astro.config.mjs or use emdashLoader in live.config.ts");
		}
		const cacheKey = dbConfig.entrypoint;
		const holder = getDbHolder();
		const throwIfBackingOff = () => {
			const failure = activeInitFailure(holder, cacheKey);
			if (!failure) return;
			throw new Error(`Database initialization is backing off after a recent migration failure: ${failure.message}`, { cause: failure.cause });
		};
		throwIfBackingOff();
		return initWithLock(holder.lock, () => holder.cache.get(cacheKey), async (isCurrentClaim) => {
			throwIfBackingOff();
			const db = new Kysely({
				dialect: deps.createDialect(dbConfig.config),
				log: kyselyLogOption()
			});
			try {
				await enforceRuntimeMigrationPolicy(db, deps.migrationMode ?? "auto", {
					contentRowLimit: autoMigrationContentRowLimit(),
					appliedCount: options?.appliedMigrationCount
				});
			} catch (error) {
				if (error instanceof MigrationFailedError || error instanceof MigrationLockHeldError || error instanceof MigrationRowLimitError) holder.failures.set(cacheKey, {
					at: Date.now(),
					message: error.message,
					cause: error
				});
				await db.destroy().catch(() => {});
				throw error;
			}
			holder.failures.delete(cacheKey);
			if (isCurrentClaim()) holder.cache.set(cacheKey, db);
			return db;
		}, {
			deadlineMs: DB_INIT_DEADLINE_MS,
			anchor: (promise) => after(() => promise)
		});
	}
	/**
	* Get or create storage instance
	*/
	static getStorage(deps) {
		const storageConfig = deps.config.storage;
		if (!storageConfig || !deps.createStorage) return null;
		const cacheKey = storageConfig.entrypoint;
		const cached = storageCache.get(cacheKey);
		if (cached) return cached;
		const storage = deps.createStorage(storageConfig.config);
		storageCache.set(cacheKey, storage);
		return storage;
	}
	/**
	* Load sandboxed plugin entries as trusted in-process plugins.
	* Used by the sandbox: false debugging escape hatch.
	*
	* Imports each plugin's bundled ESM code via a data URL, adapts it
	* with adaptSandboxEntry, and returns ResolvedPlugin objects ready
	* to be merged into the pipeline plugin list.
	*/
	static async loadBypassedPlugins(entries) {
		const { adaptSandboxEntry } = await import("./chunks/adapt-sandbox-entry_BJLn3zEY.mjs");
		const plugins = [];
		for (const entry of entries) try {
			const pluginModule = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString("base64")}`);
			const pluginDef = pluginModule.default ?? pluginModule;
			const adminPages = entry.adminPages?.map((p) => ({
				path: p.path,
				label: p.label ?? p.path,
				icon: p.icon,
				group: p.group
			}));
			const adminWidgets = entry.adminWidgets?.map((w) => {
				const size = w.size === "full" || w.size === "half" || w.size === "third" ? w.size : void 0;
				return {
					id: w.id,
					title: w.title,
					size
				};
			});
			const resolved = adaptSandboxEntry(pluginDef, {
				id: entry.id,
				version: entry.version,
				entrypoint: "",
				capabilities: entry.capabilities,
				allowedHosts: entry.allowedHosts,
				storage: entry.storage,
				adminPages,
				adminWidgets,
				settingsSchema: entry.settingsSchema,
				portableTextBlocks: entry.portableTextBlocks,
				fieldWidgets: entry.fieldWidgets,
				editorPanels: entry.editorPanels,
				editorActions: entry.editorActions,
				mcp: entry.mcp
			});
			plugins.push(resolved);
			console.log(`EmDash: Loaded plugin ${entry.id}:${entry.version} in-process (sandbox bypassed)`);
		} catch (error) {
			console.error(`EmDash: Failed to load sandboxed plugin ${entry.id} in-process:`, error);
		}
		return plugins;
	}
	/**
	* Load sandboxed plugins using SandboxRunner
	*/
	static async loadSandboxedPlugins(deps, db, mediaStorage, siteInfo) {
		if (!deps.sandboxEnabled) return sandboxedPluginCache;
		if (!sandboxRunner && deps.createSandboxRunner) sandboxRunner = deps.createSandboxRunner(createSandboxRunnerOptions({
			db,
			beforeContentWrite: () => assertSiteWriteAllowed(db),
			taxonomyWrite: createTaxonomyAccessWithWrite(db),
			now: deps.now,
			mediaStorage: mediaStorage ? {
				upload: (opts) => mediaStorage.upload({
					key: opts.key,
					body: opts.body,
					contentType: opts.contentType
				}),
				download: (key) => mediaStorage.download(key),
				delete: (key) => mediaStorage.delete(key)
			} : void 0
		}, siteInfo));
		if (!sandboxRunner) return sandboxedPluginCache;
		if (!sandboxRunner.isAvailable()) {
			const reason = sandboxRunner.unavailableReason?.();
			console.warn(reason ? `EmDash: Plugin sandbox is configured but not available on this platform: ${reason}. Sandboxed plugins will not be loaded.` : "EmDash: Plugin sandbox is configured but not available on this platform. Sandboxed plugins will not be loaded. If using @emdash-cms/sandbox-workerd/sandbox, ensure workerd is installed.");
			return sandboxedPluginCache;
		}
		if (deps.sandboxedPluginEntries.length === 0) return sandboxedPluginCache;
		if (deps.sandboxBypassed) return sandboxedPluginCache;
		for (const entry of deps.sandboxedPluginEntries) {
			const pluginKey = `${entry.id}:${entry.version}`;
			if (sandboxedPluginCache.has(pluginKey)) continue;
			try {
				const adminPages = entry.adminPages?.map((page) => ({
					path: page.path,
					label: page.label ?? page.path,
					icon: page.icon,
					group: page.group
				}));
				const adminWidgets = entry.adminWidgets?.map((widget) => ({
					id: widget.id,
					title: widget.title,
					size: widget.size === "full" || widget.size === "half" || widget.size === "third" ? widget.size : void 0
				}));
				warnDeprecatedPluginCapabilities(entry.id, entry.capabilities ?? []);
				const capabilities = normalizePluginCapabilities(entry.capabilities ?? []);
				const manifest = {
					id: entry.id,
					version: entry.version,
					capabilities,
					allowedHosts: entry.allowedHosts ?? [],
					storage: entry.storage ?? {},
					hooks: entry.hooks ?? [...HOOK_NAMES],
					routes: entry.routes ?? [],
					admin: {
						pages: adminPages,
						widgets: adminWidgets,
						settingsSchema: entry.settingsSchema,
						portableTextBlocks: entry.portableTextBlocks,
						fieldWidgets: entry.fieldWidgets,
						editorPanels: entry.editorPanels,
						editorActions: entry.editorActions
					},
					mcp: entry.mcp
				};
				const plugin = await sandboxRunner.load(manifest, entry.code);
				sandboxedPluginCache.set(pluginKey, plugin);
				sandboxedManifestCache.set(pluginKey, manifest);
				console.log(`EmDash: Loaded sandboxed plugin ${pluginKey} with capabilities: [${manifest.capabilities.join(", ")}]`);
				if (manifest.routes.length > 0) {
					const routeMetaMap = /* @__PURE__ */ new Map();
					for (const routeEntry of manifest.routes) {
						const normalized = normalizeManifestRoute$1(routeEntry);
						routeMetaMap.set(normalized.name, buildRouteMeta(normalized));
					}
					sandboxedRouteMetaCache.set(entry.id, routeMetaMap);
				} else sandboxedRouteMetaCache.delete(entry.id);
			} catch (error) {
				console.error(`EmDash: Failed to load sandboxed plugin ${entry.id}:`, error);
			}
		}
		return sandboxedPluginCache;
	}
	/**
	* Cold-start load of all active sandboxed plugins for one install
	* tier (marketplace or registry) from site-local R2.
	*
	* Mirrors the runtime snapshot reconciler but runs once at runtime
	* creation, before request traffic arrives; the sync method runs on
	* demand after install / update / uninstall handlers. `states` are the
	* `_plugin_state` rows read in the cold-start batch.
	*/
	static async loadInstalledSandboxedPlugins(source, db, storage, deps, cache, states, siteInfo) {
		if (!sandboxRunner && deps.createSandboxRunner) sandboxRunner = deps.createSandboxRunner(createSandboxRunnerOptions({
			db,
			beforeContentWrite: () => assertSiteWriteAllowed(db),
			taxonomyWrite: createTaxonomyAccessWithWrite(db),
			now: deps.now,
			mediaStorage: {
				upload: (opts) => storage.upload({
					key: opts.key,
					body: opts.body,
					contentType: opts.contentType
				}),
				download: (key) => storage.download(key),
				delete: (key) => storage.delete(key)
			}
		}, siteInfo));
		if (deps.sandboxBypassed) return false;
		if (!sandboxRunner || !sandboxRunner.isAvailable()) return false;
		const keySet = source === "marketplace" ? marketplacePluginKeys : registryPluginKeys;
		for (const plugin of states.filter((state) => state.source === source)) {
			if (plugin.status !== "active") continue;
			const version = source === "marketplace" ? plugin.marketplaceVersion ?? plugin.version : plugin.version;
			const pluginKey = `${plugin.pluginId}:${version}`;
			if (cache.has(pluginKey)) continue;
			try {
				const bundle = await loadBundleFromR2(storage, plugin.pluginId, version, source);
				if (!bundle) {
					console.warn(`EmDash: ${source} plugin ${plugin.pluginId}@${version} not found in R2`);
					continue;
				}
				const loaded = await sandboxRunner.load(bundle.manifest, bundle.backendCode);
				cache.set(pluginKey, loaded);
				sandboxedManifestCache.set(pluginKey, bundle.manifest);
				keySet.add(pluginKey);
				marketplaceManifestCache.set(plugin.pluginId, {
					id: bundle.manifest.id,
					version: bundle.manifest.version,
					admin: bundle.manifest.admin,
					mcp: bundle.manifest.mcp,
					storage: bundle.manifest.storage,
					allowedHosts: bundle.manifest.allowedHosts,
					capabilities: bundle.manifest.capabilities
				});
				if (bundle.manifest.routes.length > 0) {
					const routeMeta = /* @__PURE__ */ new Map();
					for (const entry of bundle.manifest.routes) {
						const normalized = normalizeManifestRoute$1(entry);
						routeMeta.set(normalized.name, buildRouteMeta(normalized));
					}
					sandboxedRouteMetaCache.set(plugin.pluginId, routeMeta);
				}
				console.log(`EmDash: Loaded ${source} plugin ${pluginKey} with capabilities: [${bundle.manifest.capabilities.join(", ")}]`);
			} catch (error) {
				console.error(`EmDash: Failed to load ${source} plugin ${plugin.pluginId}:`, error);
			}
		}
		return true;
	}
	/**
	* Cold-start: load marketplace plugins in bypass mode (sandbox: false).
	*
	* Each active marketplace bundle is read, evaluated via data URL, adapted
	* with adaptSandboxEntry, and returned as a ResolvedPlugin. The caller is
	* responsible for merging these into allPipelinePlugins / configuredPlugins
	* BEFORE the hook pipeline is created, so hooks and routes register in
	* the trusted pipeline.
	*
	* Also caches manifest and route metadata so admin UI / getManifest() work.
	*
	* Returns ResolvedPlugins to be merged into the pipeline.
	*/
	static async loadMarketplacePluginsBypassed(storage, states) {
		const resolved = [];
		const marketplacePlugins = states.filter((state) => state.source === "marketplace");
		if (marketplacePlugins.length === 0) return resolved;
		console.info("EmDash: Sandbox disabled (sandbox: false). Marketplace plugins will run in-process without isolation.");
		const { adaptSandboxEntry } = await import("./chunks/adapt-sandbox-entry_BJLn3zEY.mjs");
		for (const plugin of marketplacePlugins) {
			if (plugin.status !== "active") continue;
			const version = plugin.marketplaceVersion ?? plugin.version;
			try {
				const bundle = await loadBundleFromR2(storage, plugin.pluginId, version);
				if (!bundle) {
					console.warn(`EmDash: Marketplace plugin ${plugin.pluginId}@${version} not found in R2`);
					continue;
				}
				marketplaceManifestCache.set(plugin.pluginId, {
					id: bundle.manifest.id,
					version: bundle.manifest.version,
					admin: bundle.manifest.admin,
					mcp: bundle.manifest.mcp,
					storage: bundle.manifest.storage,
					allowedHosts: bundle.manifest.allowedHosts,
					capabilities: bundle.manifest.capabilities
				});
				if (bundle.manifest.routes.length > 0) {
					const routeMeta = /* @__PURE__ */ new Map();
					for (const entry of bundle.manifest.routes) {
						const normalized = normalizeManifestRoute$1(entry);
						routeMeta.set(normalized.name, buildRouteMeta(normalized));
					}
					sandboxedRouteMetaCache.set(plugin.pluginId, routeMeta);
				}
				const pluginModule = await import(`data:text/javascript;base64,${Buffer.from(bundle.backendCode).toString("base64")}`);
				const adapted = adaptSandboxEntry(pluginModule.default ?? pluginModule, {
					id: bundle.manifest.id,
					version: bundle.manifest.version,
					entrypoint: "",
					capabilities: bundle.manifest.capabilities ?? [],
					allowedHosts: bundle.manifest.allowedHosts ?? [],
					storage: bundle.manifest.storage ?? {},
					adminPages: bundle.manifest.admin?.pages,
					adminWidgets: bundle.manifest.admin?.widgets?.map((w) => ({
						id: w.id,
						title: w.title,
						size: w.size === "full" || w.size === "half" || w.size === "third" ? w.size : void 0
					})),
					settingsSchema: bundle.manifest.admin?.settingsSchema,
					editorPanels: bundle.manifest.admin?.editorPanels,
					editorActions: bundle.manifest.admin?.editorActions,
					mcp: bundle.manifest.mcp
				});
				resolved.push(adapted);
				console.log(`EmDash: Loaded marketplace plugin ${plugin.pluginId}@${version} in-process (sandbox bypassed)`);
			} catch (error) {
				console.error(`EmDash: Failed to load marketplace plugin ${plugin.pluginId} in-process:`, error);
			}
		}
		return resolved;
	}
	/**
	* Resolve exclusive hook selections on startup.
	*
	* Delegates to the shared resolveExclusiveHooks() in hooks.ts.
	* The runtime version considers all pipeline providers as "active" since
	* the pipeline was already built from only active/enabled plugins.
	*/
	static async resolveExclusiveHooks(pipeline, db, deps, storedSelections) {
		if (pipeline.getRegisteredExclusiveHooks().length === 0) return;
		let optionsRepo;
		try {
			optionsRepo = new OptionsRepository(db);
		} catch {
			return;
		}
		const preferredHints = /* @__PURE__ */ new Map();
		for (const entry of deps.sandboxedPluginEntries) if (entry.preferred && entry.preferred.length > 0) preferredHints.set(entry.id, entry.preferred);
		const smtpFromEnv = isSmtpEnvConfigured();
		await resolveExclusiveHooks({
			pipeline,
			isActive: () => true,
			getOption: (key) => optionsRepo.get(key),
			getOptions: async (keys) => {
				const unread = keys.filter((key) => !storedSelections?.has(key));
				const selections = unread.length > 0 ? await optionsRepo.getMany(unread) : /* @__PURE__ */ new Map();
				for (const key of keys) {
					const value = storedSelections?.get(key);
					if (value !== void 0) selections.set(key, value);
				}
				return selections;
			},
			setOption: (key, value) => optionsRepo.set(key, value),
			deleteOption: async (key) => {
				await optionsRepo.delete(key);
			},
			preferredHints,
			fallbackProviders: /* @__PURE__ */ new Set([
				DEFAULT_COMMENT_MODERATOR_PLUGIN_ID,
				...smtpFromEnv ? [SMTP_EMAIL_PLUGIN_ID] : [],
				DEV_CONSOLE_EMAIL_PLUGIN_ID
			]),
			manualProviders: smtpFromEnv ? void 0 : /* @__PURE__ */ new Set([SMTP_EMAIL_PLUGIN_ID])
		});
	}
	/**
	* Build the admin manifest from the live database.
	*
	* Used by the admin UI (sidebar collections, content editor field
	* dispatch, manifest endpoint) and by WordPress import — it's never
	* read on a public request, so this isn't on any anonymous hot path.
	*
	* No cross-request cache. The previous worker-isolate cache produced
	* a class of cross-isolate staleness bugs (#776, #873, #876, #877)
	* because Cloudflare Workers keeps multiple warm isolates per region
	* and there's no fan-out primitive to invalidate them in step. The
	* cache existed to amortize an N+1 schema query pattern; now that
	* `listCollectionsWithFields()` does the same work in two queries,
	* the rebuild is fast enough to pay on every admin request.
	*
	* Within a single request, `requestCached` deduplicates concurrent
	* callers (the manifest endpoint and an admin SSR template, say).
	*/
	getManifest() {
		return requestCached("emdash:manifest", () => this._buildManifest());
	}
	/**
	* Build the manifest from the database.
	*
	* Constant query shapes via `listCollectionsWithFields()` — one query
	* for collections, one batched query for fields (chunked at
	* `SQL_BATCH_SIZE` collection IDs to stay under D1's bound-parameter
	* limit). Typical sites stay well under the chunk threshold, so this
	* is two queries in practice; never N+1.
	*/
	async _buildManifest() {
		const manifestCollections = await buildManifestCollections({}, this.db);
		const manifestPlugins = {};
		for (const plugin of this.configuredPlugins) {
			const status = this.pluginStates.get(plugin.id);
			const enabled = status === void 0 || status === "active";
			const hasAdminEntry = !!plugin.admin?.entry;
			const hasAdminPages = (plugin.admin?.pages?.length ?? 0) > 0;
			const hasWidgets = (plugin.admin?.widgets?.length ?? 0) > 0;
			const hasEditorExtensions = (plugin.admin?.editorPanels?.length ?? 0) > 0 || (plugin.admin?.editorActions?.length ?? 0) > 0;
			let adminMode = "none";
			if (hasAdminEntry) adminMode = "react";
			else if (hasAdminPages || hasWidgets || hasEditorExtensions) adminMode = "blocks";
			manifestPlugins[plugin.id] = {
				version: plugin.version,
				enabled,
				adminMode,
				adminPages: plugin.admin?.pages ?? [],
				dashboardWidgets: plugin.admin?.widgets ?? [],
				portableTextBlocks: plugin.admin?.portableTextBlocks,
				fieldWidgets: plugin.admin?.fieldWidgets,
				editorPanels: plugin.admin?.editorPanels,
				editorActions: plugin.admin?.editorActions
			};
		}
		for (const entry of this.sandboxedPluginEntries) {
			const status = this.pluginStates.get(entry.id);
			const enabled = status === void 0 || status === "active";
			const hasAdminPages = (entry.adminPages?.length ?? 0) > 0;
			const hasWidgets = (entry.adminWidgets?.length ?? 0) > 0;
			const hasEditorExtensions = (entry.editorPanels?.length ?? 0) > 0 || (entry.editorActions?.length ?? 0) > 0;
			manifestPlugins[entry.id] = {
				version: entry.version,
				enabled,
				sandboxed: true,
				adminMode: hasAdminPages || hasWidgets || hasEditorExtensions ? "blocks" : "none",
				adminPages: entry.adminPages ?? [],
				dashboardWidgets: entry.adminWidgets ?? [],
				portableTextBlocks: entry.portableTextBlocks,
				fieldWidgets: entry.fieldWidgets,
				editorPanels: entry.editorPanels,
				editorActions: entry.editorActions
			};
		}
		for (const [pluginId, meta] of marketplaceManifestCache) {
			if (manifestPlugins[pluginId]) continue;
			const enabled = this.pluginStates.get(pluginId) === "active";
			const pages = meta.admin?.pages;
			const widgets = meta.admin?.widgets;
			const hasAdminPages = (pages?.length ?? 0) > 0;
			const hasWidgets = (widgets?.length ?? 0) > 0;
			const hasEditorExtensions = (meta.admin?.editorPanels?.length ?? 0) > 0 || (meta.admin?.editorActions?.length ?? 0) > 0;
			manifestPlugins[pluginId] = {
				version: meta.version,
				enabled,
				sandboxed: true,
				adminMode: hasAdminPages || hasWidgets || hasEditorExtensions ? "blocks" : "none",
				adminPages: pages ?? [],
				dashboardWidgets: widgets ?? [],
				editorPanels: meta.admin?.editorPanels,
				editorActions: meta.admin?.editorActions
			};
		}
		let manifestTaxonomies = [];
		let taxonomyDefinitionLocales = [];
		try {
			const rows = await selectTaxonomyDefs(this.db).orderBy("d.name").execute();
			taxonomyDefinitionLocales = rows.map((row) => row.locale);
			manifestTaxonomies = rows.map((row) => ({
				id: row.id,
				name: row.name,
				label: row.label,
				labelSingular: row.label_singular ?? void 0,
				hierarchical: row.hierarchical === 1,
				collections: parseStringArray(row.collections).toSorted(),
				locale: row.locale,
				translationGroup: row.translation_group ?? row.id
			}));
		} catch (error) {
			console.debug("EmDash: Could not load taxonomy definitions:", error);
		}
		try {
			const configuredLocales = config_default?.i18n?.locales ?? getI18nConfig()?.locales ?? [];
			await warnAboutUnconfiguredTaxonomyLocales(this.db, configuredLocales, taxonomyDefinitionLocales);
		} catch (error) {
			console.warn("[i18n] taxonomy locale diagnostic failed:", error);
		}
		const manifestHash = await hashString(JSON.stringify(manifestCollections) + JSON.stringify(manifestPlugins) + JSON.stringify(manifestTaxonomies));
		const authMode = getAuthMode(this.config);
		const authModeValue = authMode.type === "external" ? authMode.providerType : "passkey";
		const i18nConfig = config_default?.i18n ?? getI18nConfig();
		const i18n = i18nConfig && i18nConfig.locales && i18nConfig.locales.length > 1 ? {
			defaultLocale: i18nConfig.defaultLocale,
			locales: i18nConfig.locales,
			prefixDefaultLocale: i18nConfig.prefixDefaultLocale
		} : void 0;
		const { registry, error: registryConfigurationError } = resolveManifestRegistryConfig(getRegistryConfigInput(this.config.registry));
		if (registryConfigurationError) console.error(`EmDash registry configuration error in ${registryConfigurationError.field} (${registryConfigurationError.code})`);
		return {
			version: VERSION,
			commit: COMMIT,
			astroVersion: this.config.astroVersion,
			hash: manifestHash,
			collections: manifestCollections,
			plugins: manifestPlugins,
			taxonomies: manifestTaxonomies,
			authMode: authModeValue,
			i18n,
			contentLocale: {
				defaultLocale: i18nConfig?.defaultLocale ?? "en",
				implicit: i18nConfig === null
			},
			marketplace: !!this.config.marketplace,
			sandboxEnabled: this.runtimeDeps.sandboxEnabled && this.runtimeDeps.sandboxBypassed !== true,
			registry,
			registryConfigurationError
		};
	}
	/**
	* Repair missing or empty FTS indexes on demand, at most once per worker
	* lifetime. Search endpoints check existence and emptiness only: row-count
	* verification scans entire content and FTS tables on D1, even for healthy indexes.
	* Full drift checks remain available through FTSManager.verifyAndRepairAll().
	*
	* Uses the runtime's singleton database (`this._db`) rather than the
	* request-scoped DB. Verify reads only, but `rebuildIndex` writes, and
	* a GET search request on D1 carries a `first-unconstrained` session
	* that's free to route at a read replica — unsafe for writes. The
	* singleton always goes through the default binding, which the D1
	* adapter will promote to `first-primary` for write statements.
	*
	* Safe to call concurrently: repeated callers share the same in-flight
	* promise. Errors are swallowed internally so callers don't need to
	* defend against FTS not existing yet (pre-setup).
	*/
	async ensureSearchHealthy() {
		if (!isSqlite(this._db)) return;
		try {
			await singleFlightCached(this._searchHealthCache, async () => {
				try {
					const repaired = await new FTSManager(this._db).verifyAndRepairAll({ checkRowCounts: false });
					if (repaired > 0) console.log(`Repaired ${repaired} missing or empty FTS index(es)`);
				} catch {}
			}, {
				anchor: (promise) => after(() => promise),
				ownerTimeoutMs: 3e4
			});
		} catch {}
	}
	async handleContentList(collection, params) {
		return handleContentList(this.db, collection, params);
	}
	async handleContentAuthors(collection) {
		return handleContentAuthors(this.db, collection);
	}
	async handleContentGet(collection, id, locale, referenceOptions, draftOptions) {
		const result = await handleContentGet(this.db, collection, id, locale, referenceOptions);
		return this.hydrateDraftData(result, draftOptions);
	}
	async handleContentGetIncludingTrashed(collection, id, locale) {
		const result = await handleContentGetIncludingTrashed(this.db, collection, id, locale);
		return this.hydrateDraftData(result);
	}
	/**
	* If the response item has a `draftRevisionId`, replace `item.data` with
	* the draft revision's data and expose the original published values as
	* `liveData`. This makes the content_get / content_update round-trip
	* intuitive — read returns the latest content the caller has saved
	* (their pending draft), with the previously-published values still
	* accessible for compare-style flows.
	*
	* No-op when no draft exists or the response is an error.
	*/
	async hydrateDraftData(result, options = {}) {
		if (!result || typeof result !== "object") return result;
		const r = result;
		if (!r.success || !r.data?.item) return result;
		const item = r.data.item;
		const draftRevisionId = typeof item.draftRevisionId === "string" ? item.draftRevisionId : null;
		if (!draftRevisionId) return result;
		try {
			const revision = await new RevisionRepository(this.db).findById(draftRevisionId);
			if (!revision) {
				if (options.strict) throw new Error(`Draft revision not found: ${draftRevisionId}`);
				return result;
			}
			const liveData = item.data && typeof item.data === "object" ? item.data : {};
			const revisionData = {};
			for (const [key, value] of Object.entries(revision.data)) if (!key.startsWith("_")) revisionData[key] = value;
			const mergedData = {
				...liveData,
				...revisionData
			};
			return {
				...result,
				data: {
					...r.data,
					item: {
						...item,
						...options.includeStagedSlug && typeof revision.data._slug === "string" ? { slug: revision.data._slug } : {},
						data: mergedData,
						liveData
					}
				}
			};
		} catch (error) {
			if (options.strict) throw error;
			console.error("[emdash] draft hydration failed:", error);
			return result;
		}
	}
	async handleContentCreate(collection, body, options = {}) {
		const actor = body.actor ? { ...body.actor } : void 0;
		let locale;
		try {
			locale = resolveContentCreateLocale(body.locale);
		} catch (error) {
			return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: error instanceof Error ? error.message : "Invalid locale"
				}
			};
		}
		let translationSource = null;
		let sharedFieldSlugs = [];
		if (body.translationOf) {
			const repo = new ContentRepository(this.db);
			const source = await repo.findById(collection, body.translationOf);
			if (!source) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: "Translation source content not found"
				}
			};
			translationSource = source;
			sharedFieldSlugs = (await this.db.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").select([
				"field.slug",
				"field.type",
				"field.validation"
			]).where("collection.slug", "=", collection).where("field.translatable", "=", 0).execute()).filter((field) => !isStoragelessFieldRow(field)).map((field) => field.slug);
			if ((await repo.findTranslations(collection, source.translationGroup ?? source.id)).some((sibling) => sibling.locale?.toLowerCase() === locale.toLowerCase())) return {
				success: false,
				error: {
					code: "CONFLICT",
					message: `Translation already exists in locale "${locale}" for this content item`
				}
			};
		}
		const saveHookDetails = {
			locale,
			...body.translationOf ? { translationOf: body.translationOf } : {},
			...actor ? { editedBy: [actor.id] } : {}
		};
		const collectionInfo = await this.schemaRegistry.getCollectionWithFields(collection).catch(() => null);
		let processedData = body.data;
		if (!options.skipSaveHooks && this.hooks.hasHooks("content:beforeSave")) {
			const hookData = collectionInfo ? await inferBlockTypes(collectionInfo, body.data, () => Promise.resolve(translationSource?.data)) : body.data;
			try {
				processedData = (await this.hooks.runContentBeforeSave(hookData, collection, true, void 0, actor, saveHookDetails)).content;
			} catch (error) {
				return beforeSaveFailure(error);
			}
		}
		if (translationSource) {
			processedData = { ...processedData };
			for (const slug of sharedFieldSlugs) if (Object.hasOwn(translationSource.data, slug)) processedData[slug] = translationSource.data[slug];
			else delete processedData[slug];
		}
		const resolvedBlockTypes = collectionInfo?.fields.some((field) => field.type === "blocks") ? await resolveBlockTypes(this.db) : void 0;
		if (collectionInfo) try {
			processedData = await normalizeBlocksData(this.db, collectionInfo, processedData, translationSource?.data, {
				migrateBlocks: body.migrateBlocks,
				replaceBlocks: body.replaceBlocks
			}, false, resolvedBlockTypes);
		} catch (error) {
			if (error instanceof SchemaError) return {
				success: false,
				error: {
					code: error.code,
					message: error.message,
					details: error.details
				}
			};
			throw error;
		}
		processedData = await this.normalizeFieldValues(collection, processedData, collectionInfo, resolvedBlockTypes);
		const { validateContentData } = await import("./chunks/validation-Becbh-zl_DNPjBlnN.mjs");
		const validation = await validateContentData(this.db, collection, processedData, { partial: false });
		if (!validation.ok) return {
			success: false,
			error: validation.error
		};
		const { actor: _discardedActor, migrateBlocks: _discardedMigrateBlocks, replaceBlocks: _discardedReplaceBlocks, ...contentBody } = body;
		const result = await handleContentCreate(this.db, collection, {
			...contentBody,
			data: processedData,
			locale,
			authorId: body.authorId,
			bylines: body.bylines
		});
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (!options.skipSaveHooks && result.success && result.data) this.runAfterSaveHooks(contentItemToRecord(result.data.item), collection, true, actor, options.excludeAfterSavePluginId, {
			...saveHookDetails,
			locale: result.data.item.locale ?? locale
		});
		return result;
	}
	async handleContentUpdate(collection, id, body) {
		const actor = body.actor ? { ...body.actor } : void 0;
		const repo = new ContentRepository(this.db);
		const resolvedItem = await repo.findByIdOrSlug(collection, id, body.locale);
		const resolvedId = resolvedItem?.id ?? id;
		const checksLists = Boolean(body.expected?.bylines || body.expected?.references);
		if (body._rev) {
			if (!resolvedItem) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: `Content item not found: ${id}`
				}
			};
			const revCheck = validateRev(body._rev, resolvedItem);
			if (!revCheck.valid) {
				if (checksLists) return listConflict();
				return {
					success: false,
					error: {
						code: "CONFLICT",
						message: revCheck.message
					}
				};
			}
		}
		const { _rev: _discardedRev, actor: _discardedActor, editedBy: passedEditors, migrateBlocks, replaceBlocks, expected, ...bodyWithoutRev } = body;
		let revGuard = body._rev;
		if (expected && checksLists) {
			if (!resolvedItem) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: `Content item not found: ${id}`
				}
			};
			if (!await listsMatch(this.db, collection, resolvedItem, expected)) return listConflict();
			revGuard ??= encodeRev(resolvedItem);
		}
		const editedBy = passedEditors?.length ? [...new Set(passedEditors)] : void 0;
		const blockWriteOptions = {
			migrateBlocks,
			replaceBlocks
		};
		const saveHookEditors = { editedBy: editedBy ?? (actor ? [actor.id] : void 0) };
		const collectionInfo = bodyWithoutRev.data || bodyWithoutRev.references ? await this.schemaRegistry.getCollectionWithFields(collection).catch(() => null) : null;
		const knownFieldSlugs = new Set((collectionInfo?.fields ?? []).map((f) => f.slug));
		if (checksLists && collectionInfo?.supports?.includes("revisions") && Object.entries(bodyWithoutRev).some(([key, value]) => value !== void 0 && !DRAFT_ONLY_UPDATE_KEYS.has(key))) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "A save with `expected` can't change draft and live values together in a collection with revisions. Send them as two saves."
			}
		};
		if (bodyWithoutRev.data && collectionInfo) {
			const changed = changedStoragelessDataKeys(new Set(collectionInfo.fields.filter(isStoragelessField).map((field) => field.slug)), bodyWithoutRev.data, resolvedItem?.data ?? {});
			if (changed.length > 0) return storagelessDataKeyError(changed);
		}
		let processedData = bodyWithoutRev.data;
		let resolvedBlockTypes;
		if (bodyWithoutRev.data) {
			if (this.hooks.hasHooks("content:beforeSave")) {
				const hookData = collectionInfo ? await inferBlockTypes(collectionInfo, bodyWithoutRev.data, async () => {
					if (resolvedItem?.draftRevisionId && collectionInfo.supports?.includes("revisions")) return (await new RevisionRepository(this.db).findById(resolvedItem.draftRevisionId))?.data ?? resolvedItem.data;
					return resolvedItem?.data;
				}) : bodyWithoutRev.data;
				try {
					processedData = (await this.hooks.runContentBeforeSave(hookData, collection, false, resolvedItem?.id, actor, resolvedItem?.locale ? {
						...saveHookEditors,
						locale: resolvedItem.locale
					} : saveHookEditors)).content;
				} catch (error) {
					return beforeSaveFailure(error);
				}
			}
			processedData = await this.normalizeFieldValues(collection, processedData, collectionInfo, void 0, false);
			if (collectionInfo?.fields) processedData = await this.dropUnknownKeysAlreadyStored(processedData, resolvedItem, knownFieldSlugs);
			if (collectionInfo?.fields.some((field) => field.type === "blocks" && Object.hasOwn(processedData, field.slug))) resolvedBlockTypes = await resolveBlockTypes(this.db);
			if (!collectionInfo?.supports?.includes("revisions")) {
				if (collectionInfo) try {
					processedData = await normalizeBlocksData(this.db, collectionInfo, processedData, resolvedItem?.data, blockWriteOptions, true, resolvedBlockTypes);
					processedData = await this.normalizeFieldValues(collection, processedData, collectionInfo, resolvedBlockTypes);
				} catch (error) {
					if (error instanceof SchemaError) return {
						success: false,
						error: {
							code: error.code,
							message: error.message,
							details: error.details
						}
					};
					throw error;
				}
				const { validateContentData } = await import("./chunks/validation-Becbh-zl_DNPjBlnN.mjs");
				const validation = await validateContentData(this.db, collection, processedData, { partial: true });
				if (!validation.ok) return {
					success: false,
					error: validation.error
				};
			}
		}
		let usesDraftRevisions = false;
		let draftStorageChanged = false;
		let stagedWrite;
		if (processedData || bodyWithoutRev.references) {
			if (collectionInfo?.supports?.includes("revisions")) {
				usesDraftRevisions = true;
				let stagedReferences;
				let stagedReferenceBaselines;
				if (bodyWithoutRev.references) {
					stagedReferences = {};
					let entryGroup;
					for (const [fieldSlug, selectedIds] of Object.entries(bodyWithoutRev.references)) {
						const resolved = await resolveReferenceSelection(this.db, collection, resolvedId, fieldSlug, selectedIds);
						if (!resolved.success) return {
							success: false,
							error: resolved.error
						};
						stagedReferences[fieldSlug] = resolved.data.groups;
						entryGroup = resolved.data.entryGroup;
					}
					if (entryGroup) {
						const liveSelection = await liveReferenceSelection(this.db, collection, entryGroup);
						stagedReferenceBaselines = {};
						for (const fieldSlug of Object.keys(stagedReferences)) stagedReferenceBaselines[fieldSlug] = liveSelection[fieldSlug] ?? [];
					}
				}
				const revisionRepo = new RevisionRepository(this.db);
				let existing = await repo.findById(collection, resolvedId);
				if (revGuard && existing) {
					const revCheck = validateRev(revGuard, existing);
					if (!revCheck.valid) {
						if (checksLists) return listConflict();
						return {
							success: false,
							error: {
								code: "CONFLICT",
								message: revCheck.message
							}
						};
					}
				}
				for (let attempt = 0; existing && attempt < MAX_DRAFT_STAGE_ATTEMPTS; attempt++) {
					const draftBase = existing.draftRevisionId ? await revisionRepo.findDraftBase(existing.draftRevisionId) : null;
					const baseData = draftBase?.data ?? existing.data;
					let attemptData = processedData ?? {};
					try {
						attemptData = await normalizeBlocksData(this.db, collectionInfo, attemptData, baseData, blockWriteOptions, true, resolvedBlockTypes);
						attemptData = await this.normalizeFieldValues(collection, attemptData, collectionInfo, resolvedBlockTypes);
					} catch (error) {
						if (error instanceof SchemaError) return {
							success: false,
							error: {
								code: error.code,
								message: error.message,
								details: error.details
							}
						};
						throw error;
					}
					const { validateContentData } = await import("./chunks/validation-Becbh-zl_DNPjBlnN.mjs");
					const validation = await validateContentData(this.db, collection, attemptData, { partial: true });
					if (!validation.ok) return {
						success: false,
						error: validation.error
					};
					const mergedData = collectionInfo?.fields ? keepKnownFields({
						...baseData,
						...attemptData
					}, knownFieldSlugs) : {
						...baseData,
						...attemptData
					};
					if (bodyWithoutRev.slug !== void 0) mergedData._slug = bodyWithoutRev.slug;
					if (stagedReferences) mergedData[STAGED_REFERENCES_KEY] = mergeStagedReferences(baseData, stagedReferences);
					if (stagedReferenceBaselines) mergedData[STAGED_REFERENCES_BASELINE_KEY] = mergeStagedReferenceBaselines(baseData, stagedReferenceBaselines);
					const entryGroup = existing.translationGroup;
					await repo.keepStartingRevision(revisionRepo, collection, existing, () => liveReferenceData(this.db, collection, entryGroup));
					const credit = revisionCredit({
						autosave: bodyWithoutRev.skipRevision === true,
						actorId: actor?.id,
						editedBy,
						replaced: existing.draftRevisionId === existing.liveRevisionId ? null : draftBase
					});
					const revision = await revisionRepo.create({
						collection,
						entryId: resolvedId,
						data: mergedData,
						authorId: actor?.id,
						kind: credit.kind,
						editedBy: credit.editedBy
					});
					let staged;
					try {
						staged = await repo.stageDraftRevision(collection, resolvedId, revision.id, existing);
					} catch (error) {
						try {
							await revisionRepo.deleteIfUnreferenced(collection, resolvedId, revision.id);
						} catch (cleanupError) {
							console.error(`[emdash] Failed to clean up unstaged revision ${revision.id}:`, cleanupError);
						}
						throw error;
					}
					if (!staged) {
						try {
							await revisionRepo.deleteIfUnreferenced(collection, resolvedId, revision.id);
						} catch (cleanupError) {
							console.error(`[emdash] Failed to clean up unstaged revision ${revision.id}:`, cleanupError);
						}
						if (checksLists) return listConflict();
						if (body._rev || attempt === 31) return {
							success: false,
							error: {
								code: "CONFLICT",
								message: new ContentMutationConflictError().message
							}
						};
						existing = await repo.findById(collection, resolvedId);
						continue;
					}
					draftStorageChanged = true;
					processedData = attemptData;
					stagedWrite = {
						rev: encodeRev({
							...existing,
							...staged
						}),
						...overlayDraft(existing, revision.data)
					};
					if (credit.replaces && existing.draftRevisionId) try {
						await revisionRepo.deleteIfUnreferenced(collection, resolvedId, existing.draftRevisionId, { autosaveOnly: true });
					} catch (error) {
						console.error(`[emdash] Failed to clean up superseded revision ${existing.draftRevisionId}:`, error);
					}
					else after(async () => {
						try {
							await revisionRepo.pruneQueuedEntry(collection, resolvedId, revision.id, 50);
						} catch (error) {
							console.error(`[revisions] Failed to prune revisions for ${collection}/${resolvedId}:`, error);
						}
					});
					break;
				}
			}
		}
		const liveMetaTouched = Object.entries(bodyWithoutRev).some(([key, value]) => value !== void 0 && !DRAFT_ONLY_UPDATE_KEYS.has(key));
		const result = usesDraftRevisions && !liveMetaTouched ? await handleContentGet(this.db, collection, resolvedId) : await handleContentUpdate(this.db, collection, resolvedId, {
			...bodyWithoutRev,
			_rev: draftStorageChanged ? checksLists ? stagedWrite?.rev : void 0 : revGuard,
			data: usesDraftRevisions ? void 0 : processedData,
			slug: usesDraftRevisions ? void 0 : bodyWithoutRev.slug,
			references: usesDraftRevisions ? void 0 : bodyWithoutRev.references,
			authorId: bodyWithoutRev.authorId,
			bylines: bodyWithoutRev.bylines
		});
		if (!result.success && checksLists && result.error.code === "CONFLICT") return listConflict();
		if (result.success && bodyWithoutRev.references) notifyRoom({
			collection,
			id: resolvedId
		}, ["references"]);
		const liveContentChanged = usesDraftRevisions ? liveMetaTouched : Boolean(processedData || bodyWithoutRev.slug !== void 0 || bodyWithoutRev.references || liveMetaTouched);
		const hydrated = await this.hydrateDraftData(result);
		if (hydrated.success && hydrated.data) {
			const contentIdsToRefresh = [resolvedId];
			if (!usesDraftRevisions && processedData) contentIdsToRefresh.push(...await this.findSyncedSiblingsForUsageRefresh(collection, resolvedId, hydrated.data.item.translationGroup, processedData));
			await this.refreshContentUsageAfterSuccessfulWrite(collection, contentIdsToRefresh);
		} else if (draftStorageChanged) try {
			await markContentMediaUsageCollectionStale(this.db, collection, "CONTENT_USAGE_STALE");
		} catch (error) {
			console.error(`[media-usage] Failed to mark ${collection} stale:`, error);
		}
		if (hydrated.success && hydrated.data) {
			const savedLocale = hydrated.data.item.locale;
			this.runAfterSaveHooks(contentItemToRecord(hydrated.data.item), collection, false, actor, void 0, savedLocale ? {
				...saveHookEditors,
				locale: savedLocale
			} : saveHookEditors);
		}
		if (hydrated.success) {
			if (stagedWrite && !liveMetaTouched) return {
				...hydrated,
				liveContentChanged,
				saved: stagedWrite
			};
			return {
				...hydrated,
				liveContentChanged
			};
		}
		return hydrated;
	}
	async handleContentDelete(collection, id, options = {}) {
		return this.withRoomHold({
			collection,
			id
		}, options, () => this.trashEntry(collection, id));
	}
	async trashEntry(collection, id) {
		if (this.hooks.hasHooks("content:beforeDelete")) {
			const { allowed } = await this.hooks.runContentBeforeDelete(id, collection);
			if (!allowed) return {
				success: false,
				error: {
					code: "DELETE_BLOCKED",
					message: "Delete blocked by plugin hook"
				}
			};
		}
		const policyRejectionRevision = await this.getScheduledPolicyRejectionRevision(collection, id);
		const result = await handleContentDelete(this.db, collection, id);
		if (result.success) {
			await this.clearScheduledPolicyRejection(collection, result.data.id, policyRejectionRevision);
			await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.id]);
		}
		if (result.success) this.runAfterDeleteHooks(id, collection, false);
		return result;
	}
	async handleContentListTrashed(collection, params = {}) {
		return handleContentListTrashed(this.db, collection, params);
	}
	async handleContentRestore(collection, id, options = {}) {
		const result = await handleContentRestore(this.db, collection, id, { _rev: options._rev });
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (result.success) this.runAfterRestoreHooks(contentItemToRecord(result.data.item), collection, options.origin?.source === "plugin" ? options.origin.pluginId : void 0, options.pluginInvocationId);
		return result;
	}
	async handleContentPermanentDelete(collection, id) {
		const policyRejectionRevision = await this.getScheduledPolicyRejectionRevision(collection, id);
		const result = await handleContentPermanentDelete(this.db, collection, id);
		if (result.success) {
			await this.clearScheduledPolicyRejection(collection, result.data.id, policyRejectionRevision);
			await this.deleteContentUsageAfterSuccessfulPermanentDelete(collection, result.data.id);
		}
		if (result.success) this.runAfterDeleteHooks(id, collection, true);
		return result;
	}
	async handleContentCountTrashed(collection, params = {}) {
		return handleContentCountTrashed(this.db, collection, params);
	}
	async handleContentDuplicate(collection, id, authorId) {
		const result = await handleContentDuplicate(this.db, collection, id, authorId);
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		return result;
	}
	pluginVersionedResult(result) {
		if (!result.success) throw Object.assign(new Error(result.error.message), { code: result.error.code });
		if (!result.data._rev) throw new Error("Content action returned no revision");
		return {
			item: toPluginContentItem(result.data.item),
			_rev: result.data._rev
		};
	}
	async runPluginContentAction(pluginId, action, collection, id, fn, invocationId, invalidateContentCache) {
		let invocationInvalidator;
		if (invocationId) {
			const invocationKey = this.pluginInvocationKey(pluginId, invocationId);
			if (!this.activePluginInvocations.has(invocationKey) && !this.releasedPluginInvocations.has(invocationKey)) throw Object.assign(/* @__PURE__ */ new Error("Plugin content action invocation has expired"), { code: "CONTENT_ACTION_INVOCATION_EXPIRED" });
			invocationInvalidator = this.pluginInvocationCacheInvalidators.get(invocationKey);
		}
		const recordWrite = await assertSiteWriteAllowed(this.db);
		const repo = new ContentRepository(this.db);
		const resolvedId = (action === "restore" ? await repo.findByIdOrSlugIncludingTrashed(collection, id) : await repo.findByIdOrSlug(collection, id))?.id ?? id;
		const key = this.pluginContentActionKey(collection, resolvedId);
		if ((this.activePluginContentActions.get(key) ?? 0) > 0) throw Object.assign(/* @__PURE__ */ new Error("Plugin content action re-entered itself"), { code: "CONTENT_ACTION_REENTRANT" });
		this.retainPluginContentAction(key);
		try {
			const result = await fn(resolvedId);
			await recordWrite();
			const invalidator = invalidateContentCache ?? invocationInvalidator ?? this.pluginContentCacheInvalidator;
			if (invalidator) try {
				await invalidator([collection, resolvedId]);
			} catch (error) {
				console.error(`[plugin-content-action] Cache invalidation failed for ${collection}/${resolvedId}:`, error);
			}
			return result;
		} finally {
			this.releasePluginContentAction(key);
		}
	}
	pluginContentActionKey(collection, id) {
		return JSON.stringify([collection, id]);
	}
	retainPluginContentAction(key) {
		this.activePluginContentActions.set(key, (this.activePluginContentActions.get(key) ?? 0) + 1);
	}
	releasePluginContentAction(key) {
		const remaining = (this.activePluginContentActions.get(key) ?? 1) - 1;
		if (remaining > 0) this.activePluginContentActions.set(key, remaining);
		else this.activePluginContentActions.delete(key);
	}
	async pluginGetVersioned(_pluginId, collection, id) {
		const result = await this.handleContentGet(collection, id);
		if (!result.success) {
			if (result.error.code === "NOT_FOUND") return null;
			throw Object.assign(new Error(result.error.message), { code: result.error.code });
		}
		if (!result.data._rev) throw new Error("Content read returned no revision");
		return {
			item: toPluginContentItem(result.data.item),
			_rev: result.data._rev
		};
	}
	async pluginGetTrashedVersioned(_pluginId, collection, id) {
		const result = await this.handleContentGetIncludingTrashed(collection, id);
		if (!result.success) {
			if (result.error.code === "NOT_FOUND") return null;
			throw Object.assign(new Error(result.error.message), { code: result.error.code });
		}
		if (!await new ContentRepository(this.db).isTrashed(collection, result.data.item.id)) return null;
		if (!result.data._rev) throw new Error("Trashed content read returned no revision");
		return {
			item: toPluginContentItem(result.data.item),
			_rev: result.data._rev
		};
	}
	pluginPublish(pluginId, collection, id, options, invocationId, invalidateContentCache) {
		return this.runPluginContentAction(pluginId, "publish", collection, id, async (resolvedId) => this.pluginVersionedResult(await this.handleContentPublish(collection, resolvedId, {
			_rev: options._rev,
			origin: {
				source: "plugin",
				pluginId
			},
			pluginInvocationId: invocationId
		})), invocationId, invalidateContentCache);
	}
	pluginUnpublish(pluginId, collection, id, options, invocationId, invalidateContentCache) {
		return this.runPluginContentAction(pluginId, "unpublish", collection, id, async (resolvedId) => this.pluginVersionedResult(await this.handleContentUnpublish(collection, resolvedId, {
			_rev: options._rev,
			origin: {
				source: "plugin",
				pluginId
			},
			pluginInvocationId: invocationId
		})), invocationId, invalidateContentCache);
	}
	pluginSchedule(pluginId, collection, id, options, invocationId, invalidateContentCache) {
		return this.runPluginContentAction(pluginId, "schedule", collection, id, async (resolvedId) => this.pluginVersionedResult(await this.handleContentSchedule(collection, resolvedId, options.scheduledAt, {
			_rev: options._rev,
			origin: {
				source: "plugin",
				pluginId
			},
			pluginInvocationId: invocationId
		})), invocationId, invalidateContentCache);
	}
	pluginUnschedule(pluginId, collection, id, options, invocationId, invalidateContentCache) {
		return this.runPluginContentAction(pluginId, "unschedule", collection, id, async (resolvedId) => this.pluginVersionedResult(await this.handleContentUnschedule(collection, resolvedId, {
			...options,
			origin: {
				source: "plugin",
				pluginId
			},
			pluginInvocationId: invocationId
		})), invocationId, invalidateContentCache);
	}
	pluginRestore(pluginId, collection, id, options, invocationId, invalidateContentCache) {
		return this.runPluginContentAction(pluginId, "restore", collection, id, async (resolvedId) => this.pluginVersionedResult(await this.handleContentRestore(collection, resolvedId, {
			...options,
			origin: {
				source: "plugin",
				pluginId
			},
			pluginInvocationId: invocationId
		})), invocationId, invalidateContentCache);
	}
	/**
	* Runs a user's operation on an entry while the entry's room, if one is open in this process,
	* holds: the room saves a kept checkpoint as the actor first, and merges the entry once the
	* operation ends. `run` gets the caller's `_rev`, or else the checkpoint's. Operations that
	* replace the draft pass the values they write as `overwrite`: an open room refuses rich text
	* it can't represent, and afterwards writes the stored values over its document. Callers pass
	* the entry's ID: a slug finds no room.
	*/
	async withRoomHold(entry, options, run) {
		const rooms = this._rooms;
		const actorId = options.actor?.id;
		const source = options.origin?.source;
		if (!rooms || actorId === void 0 || source === "scheduler" || source === "plugin") return run(options._rev);
		const id = roomId(entry);
		if (options.overwrite && await rooms.isOpen(id)) {
			const { findUnsupportedPortableTextMarks } = await import("./chunks/portable-text__cKJ97kt.mjs");
			const values = await options.overwrite();
			const collection = await this.schemaRegistry.getCollectionWithFields(entry.collection);
			for (const field of collection?.fields ?? []) {
				const value = values?.[field.slug];
				if (field.type !== "portableText" || !Array.isArray(value)) continue;
				const marks = findUnsupportedPortableTextMarks(value);
				if (marks.length === 0) continue;
				return {
					success: false,
					error: {
						code: "ROOM_UNSUPPORTED_CONTENT",
						message: `The ${field.slug} field has formatting the editor can't show while the entry is open: ${marks.join(", ")}`
					}
				};
			}
		}
		let held;
		try {
			held = await rooms.save(id, actorId, options._rev);
		} catch (error) {
			if (error instanceof RoomSaveError) return roomSaveFailure(error);
			throw error;
		}
		if (held === null) return run(options._rev);
		if (held === "conflict") return {
			success: false,
			error: {
				code: "CONFLICT",
				message: "Revision precondition did not match"
			}
		};
		try {
			return await run(options._rev ?? held.rev);
		} finally {
			try {
				await rooms.release(id, held.hold, { overwrite: options.overwrite !== void 0 });
			} catch (error) {
				console.error(`[co-editing] room ${id} couldn't merge after an operation:`, error);
			}
		}
	}
	async checkContentPolicy(name, collection, id, options, rejectionCode, failureCode, scheduledAt) {
		let current = await handleContentGet(this.db, collection, id);
		if (!current.success) return {
			allowed: false,
			revision: options._rev ?? "",
			error: current.error
		};
		const revision = current.data._rev;
		if (!revision) return {
			allowed: false,
			revision: options._rev ?? "",
			error: {
				code: failureCode,
				message: "Failed to read content revision"
			}
		};
		if (options._rev !== void 0 && options._rev !== revision) return {
			allowed: false,
			revision,
			error: {
				code: "CONFLICT",
				message: "Revision precondition did not match"
			}
		};
		if (options.expectedScheduledAt !== void 0 && current.data.item.scheduledAt !== options.expectedScheduledAt) return {
			allowed: false,
			revision,
			error: {
				code: "NOT_DUE",
				message: "Content is no longer scheduled to publish"
			}
		};
		if (!this.hooks.hasHooks(name)) return {
			allowed: true,
			revision
		};
		if (name !== "content:beforeUnpublish") try {
			current = await this.hydrateDraftData(current, {
				includeStagedSlug: true,
				strict: true
			});
		} catch (error) {
			console.error(`[content-policy] ${name} draft hydration failed:`, error);
			return {
				allowed: false,
				revision,
				error: {
					code: failureCode,
					message: `Failed to read content for ${name} policy`
				}
			};
		}
		const origin = options.origin ?? { source: "system" };
		const actor = options.actor && (origin.source === "api" || origin.source === "mcp" || origin.source === "visual-editor") ? {
			...options.actor,
			source: origin.source
		} : void 0;
		try {
			const decision = await this.hooks.runContentPolicy(name, {
				content: contentItemToRecord(current.data.item),
				collection,
				origin,
				actor,
				...scheduledAt === void 0 ? {} : { scheduledAt }
			});
			if (decision.cancellation) return {
				allowed: false,
				revision,
				error: {
					code: rejectionCode,
					message: decision.cancellation.reason
				},
				cancellation: decision.cancellation
			};
			return {
				allowed: true,
				revision
			};
		} catch (error) {
			console.error(`[content-policy] ${name} failed:`, error);
			return {
				allowed: false,
				revision,
				error: {
					code: failureCode,
					message: `Failed to run ${name} policy`
				}
			};
		}
	}
	async getScheduledPolicyRejectionRevision(collection, id) {
		try {
			return (await new OptionsRepository(this.db).getVersioned(scheduledPolicyRejectionKey(collection, id)))?.revision;
		} catch (error) {
			console.error(`[content-policy] Failed to read scheduled rejection for ${collection}/${id}:`, error);
			return;
		}
	}
	async clearScheduledPolicyRejection(collection, id, expectedRevision) {
		if (expectedRevision === void 0) return;
		try {
			await new OptionsRepository(this.db).compareAndDelete(scheduledPolicyRejectionKey(collection, id), expectedRevision);
		} catch (error) {
			console.error(`[content-policy] Failed to clear scheduled rejection for ${collection}/${id}:`, error);
		}
	}
	createScheduledPolicyRejection(collection, id, cancellation) {
		return {
			collection,
			id,
			pluginId: cancellation.pluginId,
			reason: cancellation.reason,
			rejectedAt: (this.runtimeDeps.now?.() ?? /* @__PURE__ */ new Date()).toISOString()
		};
	}
	async unscheduleRefusedPublish(collection, id, revision, error) {
		if (!error?.code || !SCHEDULED_REFUSAL_CODES.has(error.code)) return;
		const reason = toScheduledRejectionReason(error.message);
		if (!reason || revision === void 0) return;
		const unscheduled = await handleScheduledPolicyRejection(this.db, collection, id, {
			_rev: revision,
			rejection: {
				collection,
				id,
				code: error.code,
				reason,
				rejectedAt: (this.runtimeDeps.now?.() ?? /* @__PURE__ */ new Date()).toISOString()
			}
		});
		if (!unscheduled.success) {
			console.error(`[scheduled-publish] Failed to unschedule refused ${collection}/${id}:`, unscheduled.error);
			return;
		}
		await this.refreshContentUsageAfterSuccessfulWrite(collection, [unscheduled.data.item.id]);
		this.runAfterUnscheduleHooks(contentItemToRecord(unscheduled.data.item), collection);
	}
	async handleContentPublish(collection, id, options = {}) {
		return this.withRoomHold({
			collection,
			id
		}, options, (_rev) => this.publishEntry(collection, id, {
			...options,
			_rev
		}));
	}
	async publishEntry(collection, id, options) {
		const policy = await this.checkContentPolicy("content:beforePublish", collection, id, options, "PUBLISH_REJECTED", "CONTENT_PUBLISH_ERROR");
		if (!policy.allowed) {
			if (policy.cancellation && options.origin?.source === "scheduler") {
				const unscheduled = await handleScheduledPolicyRejection(this.db, collection, id, {
					_rev: policy.revision,
					rejection: this.createScheduledPolicyRejection(collection, id, policy.cancellation)
				});
				if (!unscheduled.success) return unscheduled;
				await this.refreshContentUsageAfterSuccessfulWrite(collection, [unscheduled.data.item.id]);
				this.runAfterUnscheduleHooks(contentItemToRecord(unscheduled.data.item), collection);
			}
			return {
				success: false,
				error: policy.error
			};
		}
		const policyRejectionRevision = await this.getScheduledPolicyRejectionRevision(collection, id);
		const { actor: _actor, origin: _origin, pluginInvocationId: _pluginInvocationId, ...handlerOptions } = options;
		const result = await handleContentPublish(this.db, collection, id, {
			...handlerOptions,
			_rev: policy.revision
		});
		if (!result.success && options.origin?.source === "scheduler") await this.unscheduleRefusedPublish(collection, id, policy.revision, result.error);
		if (result.success && result.data) {
			await this.clearScheduledPolicyRejection(collection, result.data.item.id, policyRejectionRevision);
			const { item } = result.data;
			await this.refreshContentUsageAfterSuccessfulWrite(collection, [item.id, ...await this.findSyncedSiblingsForUsageRefresh(collection, item.id, item.translationGroup, item.data, { absentAsCleared: true })]);
		}
		if (result.success && result.data) this.runAfterPublishHooks(contentItemToRecord(result.data.item), collection, options.origin?.source === "plugin" ? options.origin.pluginId : void 0, options.pluginInvocationId);
		return result;
	}
	async handleContentUnpublish(collection, id, options = {}) {
		return this.withRoomHold({
			collection,
			id
		}, options, (_rev) => this.unpublishEntry(collection, id, {
			...options,
			_rev
		}));
	}
	async unpublishEntry(collection, id, options) {
		const policy = await this.checkContentPolicy("content:beforeUnpublish", collection, id, options, "UNPUBLISH_REJECTED", "CONTENT_UNPUBLISH_ERROR");
		if (!policy.allowed) return {
			success: false,
			error: policy.error
		};
		const result = await handleContentUnpublish(this.db, collection, id, { _rev: policy.revision });
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (result.success && result.data) this.runAfterUnpublishHooks(contentItemToRecord(result.data.item), collection, options.origin?.source === "plugin" ? options.origin.pluginId : void 0, options.pluginInvocationId);
		return result;
	}
	async handleContentSchedule(collection, id, scheduledAt, options = {}) {
		return this.withRoomHold({
			collection,
			id
		}, options, (_rev) => this.scheduleEntry(collection, id, scheduledAt, {
			...options,
			_rev
		}));
	}
	async scheduleEntry(collection, id, scheduledAt, options) {
		const policy = await this.checkContentPolicy("content:beforeSchedule", collection, id, options, "SCHEDULE_REJECTED", "CONTENT_SCHEDULE_ERROR", scheduledAt);
		if (!policy.allowed) return {
			success: false,
			error: policy.error
		};
		const policyRejectionRevision = await this.getScheduledPolicyRejectionRevision(collection, id);
		const result = await handleContentSchedule(this.db, collection, id, scheduledAt, this.runtimeDeps.now?.() ?? /* @__PURE__ */ new Date(), policy.revision);
		if (result.success && result.data) {
			await this.clearScheduledPolicyRejection(collection, result.data.item.id, policyRejectionRevision);
			await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		}
		if (result.success && result.data) this.runAfterScheduleHooks(contentItemToRecord(result.data.item), collection, options.origin?.source === "plugin" ? options.origin.pluginId : void 0, options.pluginInvocationId);
		return result;
	}
	async handleContentUnschedule(collection, id, options = {}) {
		return this.withRoomHold({
			collection,
			id
		}, options, (_rev) => this.unscheduleEntry(collection, id, {
			...options,
			_rev
		}));
	}
	async unscheduleEntry(collection, id, options) {
		const result = await handleContentUnschedule(this.db, collection, id, { _rev: options._rev });
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (result.success && result.data) this.runAfterUnscheduleHooks(contentItemToRecord(result.data.item), collection, options.origin?.source === "plugin" ? options.origin.pluginId : void 0, options.pluginInvocationId);
		return result;
	}
	async handleContentCountScheduled(collection) {
		return handleContentCountScheduled(this.db, collection);
	}
	async handleContentDiscardDraft(collection, id, options = {}) {
		return this.withRoomHold({
			collection,
			id
		}, {
			...options,
			overwrite: async () => (await new ContentRepository(this.db).findById(collection, id))?.data
		}, (_rev) => this.discardEntryDraft(collection, id, { _rev }));
	}
	async discardEntryDraft(collection, id, options) {
		const result = await handleContentDiscardDraft(this.db, collection, id, options);
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		return result;
	}
	async handleContentCompare(collection, id) {
		return handleContentCompare(this.db, collection, id);
	}
	async handleContentTranslations(collection, id) {
		return handleContentTranslations(this.db, collection, id);
	}
	async handleMediaList(params) {
		return handleMediaList(this.db, params);
	}
	async handleMediaGet(id) {
		return handleMediaGet(this.db, id);
	}
	async handleMediaUpload(input) {
		if (!this.storage) return {
			success: false,
			error: {
				code: "NO_STORAGE",
				message: "Storage not configured"
			}
		};
		const result = await handleMediaUpload(this.db, this.storage, {
			...input,
			placeholders: input.placeholders ?? this.config.imagePlaceholders ?? true
		}, { beforeUpload: async (file) => {
			if (!this.hooks.hasHooks("media:beforeUpload")) return file;
			return (await this.hooks.runMediaBeforeUpload(file)).file;
		} });
		if (result.success && !result.data.deduplicated && this.hooks.hasHooks("media:afterUpload")) {
			const item = result.data.item;
			await this.hooks.runMediaAfterUpload({
				id: item.id,
				filename: item.filename,
				mimeType: item.mimeType,
				size: item.size,
				url: item.url,
				createdAt: item.createdAt
			});
		}
		return result;
	}
	async handleMediaRegisterUpload(input) {
		if (!this.storage) return {
			success: false,
			error: {
				code: "NO_STORAGE",
				message: "Storage not configured"
			}
		};
		const result = await handleMediaRegisterUpload(this.db, this.storage, input);
		if (result.success && this.hooks.hasHooks("media:afterUpload")) {
			const item = result.data.item;
			const mediaItem = {
				id: item.id,
				filename: item.filename,
				mimeType: item.mimeType,
				size: item.size,
				url: `/media/${item.id}/${item.filename}`,
				createdAt: item.createdAt
			};
			this.runMediaAfterUploadHook(mediaItem);
		}
		return result;
	}
	async handleMediaCreate(input) {
		let processedInput = input;
		if (this.hooks.hasHooks("media:beforeUpload")) {
			const hookResult = await this.hooks.runMediaBeforeUpload({
				name: input.filename,
				type: input.mimeType,
				size: input.size || 0
			});
			processedInput = {
				...input,
				filename: hookResult.file.name,
				mimeType: hookResult.file.type,
				size: hookResult.file.size
			};
		}
		const result = await handleMediaCreate(this.db, processedInput);
		if (result.success && this.hooks.hasHooks("media:afterUpload")) {
			const item = result.data.item;
			const mediaItem = {
				id: item.id,
				filename: item.filename,
				mimeType: item.mimeType,
				size: item.size,
				url: `/media/${item.id}/${item.filename}`,
				createdAt: item.createdAt
			};
			this.runMediaAfterUploadHook(mediaItem);
		}
		return result;
	}
	async handleMediaUpdate(id, input) {
		const result = await handleMediaUpdate(this.db, id, input);
		if (result.success) invalidateSiteSettingsCache();
		return result;
	}
	async handlePluginMediaMetadataUpdate(id, patch) {
		return updatePluginMediaMetadata(this.db, id, patch);
	}
	async handleMediaReplaceMetadata(id, expectedStorageKey, input) {
		const result = await handleMediaReplaceMetadata(this.db, id, expectedStorageKey, input);
		if (result.success) {
			invalidateSiteSettingsCache();
			if (this.hooks.hasHooks("media:afterUpload")) {
				const item = result.data.item;
				const mediaItem = {
					id: item.id,
					filename: item.filename,
					mimeType: item.mimeType,
					size: item.size,
					url: `/media/${item.id}/${item.filename}`,
					createdAt: item.createdAt
				};
				this.runMediaAfterUploadHook(mediaItem);
			}
		}
		return result;
	}
	async handleMediaDelete(id) {
		const result = await handleMediaDelete(this.db, id, this.storage);
		if (result.success) invalidateSiteSettingsCache();
		return result;
	}
	commentHooks() {
		return {
			runBeforeCreate: (event) => this.hooks.runCommentBeforeCreate(event),
			runModerate: async (event) => {
				const result = await this.hooks.invokeExclusiveHook("comment:moderate", event);
				if (!result) return {
					status: "pending",
					reason: "No moderator configured"
				};
				if (result.error) {
					console.error(`[comments] Moderation error (${result.pluginId}):`, result.error.message);
					return {
						status: "pending",
						reason: "Moderation error"
					};
				}
				if (!isModerationDecision(result.result)) return {
					status: "pending",
					reason: "Invalid moderation result"
				};
				return result.result;
			},
			fireAfterCreate: (event) => {
				after(() => this.hooks.runCommentAfterCreate(event).catch((error) => console.error("[comments] afterCreate error:", error instanceof Error ? error.message : error)));
			},
			fireAfterModerate: (event) => {
				return this.hooks.runCommentAfterModerate(event).catch((error) => console.error("[comments] afterModerate error:", error instanceof Error ? error.message : error));
			}
		};
	}
	async handleCommentCreate(input, settings, contentInfo) {
		return createComment(this.db, input, settings, this.commentHooks(), contentInfo);
	}
	async handlePublicCommentSubmission(collection, contentId, request, user) {
		return submitPublicComment(this, collection, contentId, request, user);
	}
	async sendCommentApproval(comment, request) {
		if (!comment || !this.email) return;
		try {
			const adminBaseUrl = await getSiteBaseUrl(this.db, request ?? new Request("https://plugin.invalid/"), this.config);
			const content = await lookupContentAuthor(this.db, comment.collection, comment.contentId);
			if (content?.author) await sendCommentNotification({
				email: this.email,
				comment,
				contentAuthor: content.author,
				adminBaseUrl
			});
		} catch (error) {
			console.error("[comments] notification error:", error instanceof Error ? error.message : error);
		}
	}
	async moderateCommentWithOrigin(id, status, expectedStatus, origin, request) {
		if (this.commentModerationInProgress.has(id)) {
			const current = await new CommentRepository(this.db).findById(id);
			if (current && current.status !== expectedStatus) throw new CommentStatusConflictError(current.status);
			throw Object.assign(/* @__PURE__ */ new Error("Comment moderation is already in progress"), { code: "COMMENT_MODERATION_IN_PROGRESS" });
		}
		this.commentModerationInProgress.add(id);
		try {
			return await moderateComment(this.db, id, status, expectedStatus, origin, this.commentHooks(), (comment) => this.sendCommentApproval(comment, request));
		} finally {
			this.commentModerationInProgress.delete(id);
		}
	}
	async handleCommentModerate(id, status, moderator, expectedStatus, request) {
		let expected = expectedStatus;
		if (!expected) {
			const current = await new CommentRepository(this.db).findById(id);
			if (!current || current.status === "trash") return null;
			expected = current.status;
		}
		return this.moderateCommentWithOrigin(id, status, expected, {
			source: "admin",
			userId: moderator.id,
			name: moderator.name
		}, request);
	}
	async handlePluginCommentModerate(pluginId, id, status, expectedStatus) {
		assertPluginCommentStatus(status, "status");
		assertPluginCommentStatus(expectedStatus, "expectedStatus");
		if (!await this.moderateCommentWithOrigin(id, status, expectedStatus, {
			source: "plugin",
			pluginId
		})) throw new Error(`Comment not found: ${id}`);
		const result = await createCommentAccess(this.db).get(id);
		if (!result) throw new Error(`Comment not found: ${id}`);
		return result;
	}
	async handleRevisionList(collection, entryId, params = {}) {
		return handleRevisionList(this.db, collection, entryId, params);
	}
	async handleRevisionEditors(collection, entryId, since) {
		return handleRevisionEditors(this.db, collection, entryId, since);
	}
	async handleRevisionGet(revisionId) {
		return handleRevisionGet(this.db, revisionId);
	}
	/** Without `role`, reads the caller's current role, which only a recovery revision needs. */
	async handleRevisionRestore(revisionId, callerUserId, role) {
		const revision = await new RevisionRepository(this.db).findDraftBase(revisionId);
		if (!revision) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Revision not found: ${revisionId}`
			}
		};
		return this.withRoomHold({
			collection: revision.collection,
			id: revision.entryId
		}, {
			actor: { id: callerUserId },
			overwrite: async () => revision.data
		}, () => this.restoreRevision(revisionId, revision, callerUserId, role));
	}
	async restoreRevision(revisionId, revision, callerUserId, role) {
		const revisionRepo = new RevisionRepository(this.db);
		if (revision.kind === "recovery") return this.restoreRecoveryRevision(revision, callerUserId, role);
		if (!((await this.schemaRegistry.getCollectionWithFields(revision.collection))?.supports?.includes("revisions") ?? false)) {
			const result = await handleRevisionRestore(this.db, revisionId, callerUserId);
			if (result.success) await this.refreshContentUsageAfterSuccessfulWrite(revision.collection, [revision.entryId]);
			return this.hydrateDraftData(result);
		}
		try {
			const contentRepo = new ContentRepository(this.db);
			const restoredData = { ...revision.data };
			delete restoredData[STAGED_REFERENCES_BASELINE_KEY];
			const newDraftId = await contentRepo.restoreDraftRevision(revision.collection, revision.entryId, restoredData, callerUserId);
			if (!newDraftId) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: `Content item not found: ${revision.entryId}`
				}
			};
			after(async () => {
				try {
					await revisionRepo.pruneQueuedEntry(revision.collection, revision.entryId, newDraftId, 50);
				} catch (error) {
					console.error(`[revisions] Failed to prune revisions for ${revision.collection}/${revision.entryId}:`, error);
				}
			});
			const refetched = await handleContentGet(this.db, revision.collection, revision.entryId);
			const hydrated = await this.hydrateDraftData(refetched);
			if (hydrated.success) await this.refreshContentUsageAfterSuccessfulWrite(revision.collection, [revision.entryId]);
			return hydrated;
		} catch (error) {
			if (error instanceof ContentMutationConflictError) return {
				success: false,
				error: {
					code: "CONFLICT",
					message: error.message
				}
			};
			console.error("[emdash] revision restore failed:", error);
			return {
				success: false,
				error: {
					code: "REVISION_RESTORE_ERROR",
					message: "Failed to restore revision"
				}
			};
		}
	}
	/**
	* Recovery revisions are stored without validation or hooks, so restoring one saves its
	* fields and slug as the restoring user, as a kept save.
	*/
	async restoreRecoveryRevision(revision, callerUserId, role) {
		const user = role === void 0 ? await this.findEnabledUser(callerUserId) : {
			id: callerUserId,
			role
		};
		if (!user) return {
			success: false,
			error: {
				code: "FORBIDDEN",
				message: "Insufficient permissions"
			}
		};
		const slug = revision.data._slug;
		return saveContent(this, {
			collection: revision.collection,
			id: revision.entryId,
			user,
			body: {
				data: Object.fromEntries(Object.entries(revision.data).filter(([key]) => !key.startsWith("_"))),
				...typeof slug === "string" ? { slug } : {}
			}
		});
	}
	async findEnabledUser(id) {
		const row = await this.db.selectFrom("users").select(["role", "disabled"]).where("id", "=", id).executeTakeFirst();
		const role = row && !row.disabled ? toRoleLevel(row.role) : null;
		return role === null ? null : {
			id,
			role
		};
	}
	async findSyncedSiblingsForUsageRefresh(collection, contentId, translationGroup, data, options = {}) {
		try {
			return await findNonTranslatableSiblingContentIds(this.db, collection, contentId, translationGroup, data, options);
		} catch (error) {
			console.error(`[media-usage] Failed to discover synced i18n siblings for ${collection}/${contentId}:`, error);
			try {
				await markContentMediaUsageCollectionStale(this.db, collection, "CONTENT_USAGE_REFRESH_ERROR");
			} catch (staleError) {
				console.error(`[media-usage] Failed to mark ${collection} stale:`, staleError);
			}
			return [];
		}
	}
	async refreshContentUsageAfterSuccessfulWrite(collection, contentIds) {
		for (const contentId of new Set(contentIds)) try {
			if ((await processMediaUsageWorkAfterWrite(this.db, collection, contentId)).outcome !== "inactive") continue;
			await refreshContentMediaUsageAfterWrite(this.db, collection, contentId);
		} catch (error) {
			console.error(`[media-usage] Failed after content write ${collection}/${contentId}:`, error);
			continue;
		}
	}
	async deleteContentUsageAfterSuccessfulPermanentDelete(collection, contentId) {
		try {
			if ((await processMediaUsageWorkAfterWrite(this.db, collection, contentId)).outcome !== "inactive") return;
			const result = await deleteContentMediaUsage(this.db, collection, contentId);
			if (!result.success) console.error(`[media-usage] Usage delete for ${collection}/${contentId} finished with ${result.errorCode}`);
		} catch (error) {
			console.error(`[media-usage] Failed after permanent content delete ${collection}/${contentId}:`, error);
		}
	}
	getSandboxedAdminDefinition(pluginId) {
		const entry = this.sandboxedPluginEntries.find((candidate) => candidate.id === pluginId);
		if (entry) {
			const pages = (entry.adminPages ?? []).map((page) => normalizePluginPagePath(page.path));
			const imageHosts = allowedBrowserImageHosts(entry.capabilities, entry.allowedHosts);
			return {
				pages,
				widgets: (entry.adminWidgets ?? []).map((widget) => widget.id),
				policy: {
					pluginPagePaths: pages,
					allowedImageHosts: imageHosts
				}
			};
		}
		const manifest = marketplaceManifestCache.get(pluginId);
		if (!manifest) return null;
		const pages = (manifest.admin?.pages ?? []).map((page) => normalizePluginPagePath(page.path));
		const imageHosts = allowedBrowserImageHosts(manifest.capabilities ?? [], manifest.allowedHosts ?? []);
		return {
			pages,
			widgets: (manifest.admin?.widgets ?? []).map((widget) => widget.id),
			policy: {
				pluginPagePaths: pages,
				allowedImageHosts: imageHosts
			}
		};
	}
	resolvePluginUiContext(definition, body, request) {
		if (typeof body !== "object" || body === null || !("page" in body)) return {};
		const page = body.page;
		if (typeof page !== "string") return { error: {
			code: "INVALID_PLUGIN_UI_CONTEXT",
			message: "Plugin UI page must be a string"
		} };
		let surface;
		if (page.startsWith("widget:")) {
			if (!definition.widgets.includes(page.slice(7))) return { error: {
				code: "INVALID_PLUGIN_UI_CONTEXT",
				message: "Plugin dashboard widget is not declared"
			} };
			surface = "dashboard-widget";
		} else {
			if (!definition.pages.includes(normalizePluginPagePath(page))) return { error: {
				code: "INVALID_PLUGIN_UI_CONTEXT",
				message: "Plugin admin page is not declared"
			} };
			surface = "admin-page";
		}
		const locale = resolveLocale$1(request);
		return { context: {
			surface,
			locale,
			direction: getLocaleDir(locale)
		} };
	}
	/**
	* UI context for a configured plugin's Block Kit page or widget. An
	* undeclared surface yields no context and no error: configured plugins
	* are not held to their declarations, so rejecting here would break
	* configured plugins that serve undeclared pages.
	*/
	resolveTrustedUiContext(plugin, routeKey, body, request) {
		if (routeKey !== "admin") return void 0;
		const surfaces = {
			pages: (plugin.admin.pages ?? []).map((page) => normalizePluginPagePath(page.path)),
			widgets: (plugin.admin.widgets ?? []).map((widget) => widget.id)
		};
		return this.resolvePluginUiContext(surfaces, body, request).context;
	}
	validateSandboxedAdminResponse(pluginId, definition, result) {
		if (!result.success) return result;
		const validation = validateBlockResponse(result.data, definition.policy);
		if (validation.valid) return result;
		console.error(`EmDash: Sandboxed plugin ${pluginId} returned invalid Block Kit content:`, validation.errors);
		return {
			success: false,
			status: 502,
			error: {
				code: "INVALID_BLOCK_RESPONSE",
				message: "Plugin returned invalid Block Kit content"
			}
		};
	}
	getPluginEditorExtension(pluginId, kind, extensionId, collection) {
		if (!this.isPluginEnabled(pluginId)) return null;
		let panels;
		let actions;
		let pages = [];
		let capabilities = [];
		let allowedHosts = [];
		const configured = this.configuredPlugins.find((plugin) => plugin.id === pluginId);
		if (configured) {
			if (configured.admin.entry) return null;
			panels = configured.admin.editorPanels;
			actions = configured.admin.editorActions;
			pages = (configured.admin.pages ?? []).map((page) => page.path);
			capabilities = configured.capabilities;
			allowedHosts = configured.allowedHosts;
		} else {
			const entry = this.sandboxedPluginEntries.find((candidate) => candidate.id === pluginId);
			if (entry) {
				panels = entry.editorPanels;
				actions = entry.editorActions;
				pages = (entry.adminPages ?? []).map((page) => page.path);
				capabilities = entry.capabilities;
				allowedHosts = entry.allowedHosts;
			} else {
				const manifest = marketplaceManifestCache.get(pluginId);
				if (!manifest) return null;
				panels = manifest.admin?.editorPanels;
				actions = manifest.admin?.editorActions;
				pages = (manifest.admin?.pages ?? []).map((page) => page.path);
				capabilities = manifest.capabilities ?? [];
				allowedHosts = manifest.allowedHosts ?? [];
			}
		}
		const normalizedCapabilities = normalizePluginCapabilities(capabilities);
		const policy = {
			pluginPagePaths: pages,
			allowedImageHosts: allowedBrowserImageHosts(capabilities, allowedHosts)
		};
		if (kind === "panel") {
			const matches = panels?.filter((panel) => panel.id === extensionId) ?? [];
			const extension = matches[0];
			if (matches.length !== 1 || !extension || extension.collections && !extension.collections.includes(collection)) return null;
			return {
				kind,
				extension,
				policy,
				capabilities: normalizedCapabilities
			};
		}
		const matches = actions?.filter((action) => action.id === extensionId) ?? [];
		const extension = matches[0];
		if (matches.length !== 1 || !extension || extension.collections && !extension.collections.includes(collection) || extension.style === "danger" && !extension.confirm) return null;
		return {
			kind,
			extension,
			policy,
			capabilities: normalizedCapabilities
		};
	}
	async getPluginEditorDraftSchema(collection) {
		return this.schemaRegistry.getCollectionWithFields(collection);
	}
	validatePluginEditorExtensionResponse(pluginId, dispatch, result) {
		if (!result.success) return result;
		const validation = dispatch.kind === "panel" ? validateBlockResponse(result.data, dispatch.policy) : validateContentEditorActionResponse(result.data, dispatch.policy);
		if (validation.valid) return result;
		console.error(`EmDash: Plugin ${pluginId} returned an invalid content editor ${dispatch.kind} response:`, validation.errors);
		return {
			success: false,
			status: 502,
			error: {
				code: dispatch.kind === "panel" ? "INVALID_BLOCK_RESPONSE" : "INVALID_EDITOR_ACTION_RESPONSE",
				message: "Plugin returned an invalid editor extension response"
			}
		};
	}
	/**
	* Get route metadata for a plugin route without invoking the handler.
	* Used by the catch-all route to decide auth before dispatch.
	* Returns null if the plugin or route doesn't exist.
	*/
	getPluginRouteMeta(pluginId, path) {
		if (!this.isPluginEnabled(pluginId)) return null;
		const routeKey = path.replace(LEADING_SLASH_PATTERN$1, "");
		const trustedPlugin = this.configuredPlugins.find((p) => p.id === pluginId);
		if (trustedPlugin) {
			const route = trustedPlugin.routes[routeKey];
			if (!route) return null;
			return buildRouteMeta(route);
		}
		const meta = sandboxedRouteMetaCache.get(pluginId);
		if (meta) {
			const routeMeta = meta.get(routeKey);
			if (routeMeta) return routeMeta;
		}
		if (routeKey === "admin") {
			const manifestMeta = marketplaceManifestCache.get(pluginId);
			if (manifestMeta?.admin?.pages?.length || manifestMeta?.admin?.widgets?.length) return { public: false };
			const entry = this.sandboxedPluginEntries.find((e) => e.id === pluginId);
			if (entry?.adminPages?.length || entry?.adminWidgets?.length) return { public: false };
		}
		if (this.findSandboxedPlugin(pluginId)) return { public: false };
		return null;
	}
	/**
	* Resolve the settings schema for a runtime-installed (marketplace or
	* registry) plugin from its cached manifest. Returns `{}` for a known
	* plugin without a schema and `null` for unknown plugins, matching the
	* contract of `getPluginSettingsSchema` for build-time plugins.
	*/
	getRuntimePluginSettingsSchema(pluginId) {
		const meta = marketplaceManifestCache.get(pluginId);
		if (!meta) return null;
		return meta.admin?.settingsSchema ?? {};
	}
	async handlePluginApiRoute(pluginId, method, path, request, user, invalidateContentCache, editorDispatch) {
		if (!this.isPluginEnabled(pluginId)) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not enabled: ${pluginId}`
			}
		};
		const normalizedMethod = method.toUpperCase();
		const routeMeta = this.getPluginRouteMeta(pluginId, path);
		if (routeMeta?.methods && !routeMeta.methods.some((allowed) => allowed === normalizedMethod)) return {
			success: false,
			status: 405,
			error: {
				code: "METHOD_NOT_ALLOWED",
				message: "Method not allowed"
			}
		};
		if (normalizedMethod !== "GET" && normalizedMethod !== "HEAD") {
			if (!await this.ensureStorageIndexesSynced(pluginId)) return {
				success: false,
				status: 503,
				error: {
					code: "STORAGE_INDEXES_NOT_READY",
					message: "Plugin storage indexes are not ready"
				}
			};
		}
		const caller = user ? toRouteCallerInfo(user) : void 0;
		let body;
		try {
			body = await parseRouteInput(request, routeMeta?.request);
		} catch (error) {
			if (error instanceof PluginRouteRequestError) return {
				success: false,
				status: error.status,
				error: {
					code: "INVALID_PLUGIN_REQUEST",
					message: error.message
				}
			};
			throw error;
		}
		const routeKey = path.replace(LEADING_SLASH_PATTERN$1, "");
		const adminDefinition = !editorDispatch && routeKey === "admin" ? this.getSandboxedAdminDefinition(pluginId) : null;
		const uiResult = adminDefinition ? this.resolvePluginUiContext(adminDefinition, body, request) : {};
		if (uiResult.error) return {
			success: false,
			status: 400,
			error: uiResult.error
		};
		const trustedPlugin = this.configuredPlugins.find((p) => p.id === pluginId);
		if (trustedPlugin && this.enabledPlugins.has(trustedPlugin.id)) {
			const routeRegistry = new PluginRouteRegistry({
				...this.pipelineFactoryOptions,
				contentActions: this.contentActionsWithInvalidator(invalidateContentCache),
				emailPipeline: this.email ?? void 0,
				cronReschedule: () => this.cronScheduler?.reschedule(),
				trustedProxyHeaders: getTrustedProxyHeaders(this.config)
			});
			routeRegistry.register(trustedPlugin);
			const result = await routeRegistry.invoke(pluginId, routeKey, {
				request,
				body,
				user: caller,
				ui: editorDispatch?.ui ?? uiResult.context ?? this.resolveTrustedUiContext(trustedPlugin, routeKey, body, request)
			});
			return editorDispatch ? this.validatePluginEditorExtensionResponse(pluginId, editorDispatch, result) : adminDefinition ? this.validateSandboxedAdminResponse(pluginId, adminDefinition, result) : result;
		}
		const sandboxedPlugin = this.findSandboxedPlugin(pluginId);
		if (sandboxedPlugin) {
			const result = await this.handleSandboxedRoute(sandboxedPlugin, path, request, body, routeMeta ?? { public: false }, caller, editorDispatch?.ui ?? uiResult.context, invalidateContentCache);
			return editorDispatch ? this.validatePluginEditorExtensionResponse(pluginId, editorDispatch, result) : adminDefinition ? this.validateSandboxedAdminResponse(pluginId, adminDefinition, result) : result;
		}
		return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
	}
	contentActionsWithInvalidator(invalidateContentCache) {
		const actions = this.pipelineFactoryOptions.contentActions;
		if (!actions || !invalidateContentCache) return actions;
		return {
			...actions,
			begin: (pluginId, invocationId, invocationInvalidator) => actions.begin?.(pluginId, invocationId, invocationInvalidator ?? invalidateContentCache),
			invalidateMedia: (pluginId, storageKey, invocationId) => actions.invalidateMedia?.(pluginId, storageKey, invocationId, invalidateContentCache) ?? Promise.resolve(),
			publish: (pluginId, collection, id, options, invocationId) => actions.publish(pluginId, collection, id, options, invocationId, invalidateContentCache),
			unpublish: (pluginId, collection, id, options, invocationId) => actions.unpublish(pluginId, collection, id, options, invocationId, invalidateContentCache),
			schedule: (pluginId, collection, id, options, invocationId) => actions.schedule(pluginId, collection, id, options, invocationId, invalidateContentCache),
			unschedule: (pluginId, collection, id, options, invocationId) => actions.unschedule(pluginId, collection, id, options, invocationId, invalidateContentCache),
			restore: (pluginId, collection, id, options, invocationId) => actions.restore(pluginId, collection, id, options, invocationId, invalidateContentCache)
		};
	}
	async getPluginMcpTools(pluginId) {
		const tools = [];
		const seen = /* @__PURE__ */ new Set();
		for (const plugin of this.configuredPlugins) {
			if (pluginId && plugin.id !== pluginId) continue;
			for (const [name, tool] of Object.entries(plugin.mcp?.tools ?? {})) {
				const route = plugin.routes[tool.route];
				if (!route || route.public || route.response === "raw" || !isJsonPostRouteContract(route) || !route.permission || !Object.hasOwn(Permissions, route.permission)) continue;
				const key = `${plugin.id}__${name}`;
				if (seen.has(key)) continue;
				seen.add(key);
				tools.push({
					pluginId: plugin.id,
					name,
					mcpName: pluginToolName(plugin.id, name),
					description: tool.description,
					route: tool.route,
					permission: route.permission,
					destructive: tool.destructive ?? false,
					inputSchema: tool.input,
					outputSchema: tool.output
				});
			}
		}
		const addManifestTools = (id, mcp) => {
			if (pluginId && id !== pluginId) return;
			for (const tool of mcp?.tools ?? []) {
				const key = `${id}__${tool.name}`;
				const routeMeta = this.getPluginRouteMeta(id, tool.route);
				if (seen.has(key) || !routeMeta || routeMeta.public || routeMeta.response === "raw" || !isJsonPostRouteContract(routeMeta) || routeMeta.permission !== tool.permission || !Object.hasOwn(Permissions, tool.permission)) continue;
				seen.add(key);
				tools.push({
					pluginId: id,
					name: tool.name,
					mcpName: pluginToolName(id, tool.name),
					description: tool.description,
					route: tool.route,
					permission: tool.permission,
					destructive: tool.destructive,
					inputSchema: safeJsonSchemaToZod({ ...tool.inputSchema }, `${id}/${tool.name}`, "input") ?? z.record(z.string(), z.unknown()),
					outputSchema: tool.outputSchema ? safeJsonSchemaToZod({ ...tool.outputSchema }, `${id}/${tool.name}`, "output") : void 0
				});
			}
		};
		for (const entry of this.sandboxedPluginEntries) addManifestTools(entry.id, entry.mcp);
		for (const [id, manifest] of marketplaceManifestCache) addManifestTools(id, manifest.mcp);
		return tools;
	}
	async getEnabledPluginMcpTools() {
		const [tools, states] = await Promise.all([this.getPluginMcpTools(), new PluginStateRepository(this.db).getAll()]);
		const stateByPlugin = new Map(states.map((state) => [state.pluginId, state]));
		return tools.filter((tool) => {
			const state = stateByPlugin.get(tool.pluginId);
			if (!state?.mcpToolsEnabled || state.status !== "active" || !this.isPluginEnabled(tool.pluginId)) return false;
			return state.mcpToolsConsent === this.serializePluginMcpConsent(tools, tool.pluginId);
		});
	}
	serializePluginMcpConsent(tools, pluginId) {
		return JSON.stringify(tools.filter((tool) => tool.pluginId === pluginId).map((tool) => ({
			name: tool.name,
			description: tool.description,
			route: tool.route,
			permission: tool.permission,
			destructive: tool.destructive,
			inputSchema: z.toJSONSchema(tool.inputSchema, { target: "draft-7" }),
			...tool.outputSchema ? { outputSchema: z.toJSONSchema(tool.outputSchema, { target: "draft-7" }) } : {}
		})).toSorted((a, b) => a.name.localeCompare(b.name)));
	}
	async handlePluginMcpTool(pluginId, toolName, route, input, actorId, request, caller, invalidateContentCache) {
		const requestMeta = extractRequestMeta(request, getTrustedProxyHeaders(this.config));
		const audit = new AuditRepository(this.db);
		const headers = new Headers(request.headers);
		headers.delete("content-length");
		headers.delete("content-encoding");
		const internalRequest = new Request(request, {
			method: "POST",
			headers,
			body: JSON.stringify(input)
		});
		const result = await this.handlePluginApiRoute(pluginId, "POST", route, internalRequest, caller, invalidateContentCache);
		await audit.log({
			actorId,
			actorIp: requestMeta.ip ?? void 0,
			action: "plugin_tool_invoke",
			resourceType: "plugin_mcp_tool",
			resourceId: `${pluginId}__${toolName}`,
			details: {
				pluginId,
				tool: toolName,
				route
			},
			status: result.success ? "success" : "failure"
		});
		return result;
	}
	async handlePluginMcpDenied(pluginId, toolName, route, actorId, request, reason) {
		const requestMeta = extractRequestMeta(request, getTrustedProxyHeaders(this.config));
		await new AuditRepository(this.db).log({
			actorId,
			actorIp: requestMeta.ip ?? void 0,
			action: "plugin_tool_invoke",
			resourceType: "plugin_mcp_tool",
			resourceId: `${pluginId}__${toolName}`,
			details: {
				pluginId,
				tool: toolName,
				route,
				reason
			},
			status: "denied"
		});
	}
	findSandboxedPlugin(pluginId) {
		for (const [key, plugin] of this.sandboxedPlugins) if (key.startsWith(pluginId + ":")) return plugin;
	}
	/**
	* Drop incoming keys that have no matching collection field when the entry
	* already stores them in its live data or current draft revision.
	*
	* Draft revisions keep the full `data` JSON, so deleting a field can strand
	* the old value; this lets a read-then-write save succeed without allowing
	* genuinely unknown keys.
	*/
	async dropUnknownKeysAlreadyStored(data, existing, knownFieldSlugs) {
		if (!existing) return data;
		let stored = existing.data ?? {};
		if (existing.draftRevisionId) {
			const draft = await new RevisionRepository(this.db).findById(existing.draftRevisionId).catch(() => null);
			if (draft?.data) stored = {
				...stored,
				...draft.data
			};
		}
		const stale = staleStoredKeys(data, stored, knownFieldSlugs);
		if (stale.length === 0) return data;
		const result = { ...data };
		for (const key of stale) delete result[key];
		return result;
	}
	/**
	* Normalize field values in content data before validation.
	* Turns a blank string in an array-valued field into `null`, fills
	* missing image/file dimensions, storageKey, mimeType, and filename from
	* providers, and links rich text media named by file URL to its media item.
	*/
	async normalizeFieldValues(collection, data, preloaded, preloadedBlockTypes, includeBlocks = true) {
		let collectionInfo = preloaded;
		if (collectionInfo === void 0) try {
			collectionInfo = await this.schemaRegistry.getCollectionWithFields(collection);
		} catch {
			return data;
		}
		if (!collectionInfo?.fields) return data;
		const result = { ...data };
		for (const field of collectionInfo.fields) {
			const value = result[field.slug];
			if (ARRAY_FIELD_TYPES.has(field.type) && typeof value === "string" && !value.trim()) result[field.slug] = null;
		}
		const imageFields = collectionInfo.fields.filter((f) => f.type === "image" || f.type === "file");
		const repeaterFields = collectionInfo.fields.filter((f) => f.type === "repeater" && Array.isArray(f.validation?.subFields));
		const blockFields = includeBlocks ? collectionInfo.fields.filter((field) => field.type === "blocks") : [];
		const portableTextValues = collectionInfo.fields.filter((field) => field.type === "portableText" && Array.isArray(result[field.slug])).map((field) => ({
			owner: result,
			slug: field.slug
		}));
		const linkPortableTextValues = async () => {
			if (portableTextValues.length === 0) return;
			try {
				const linked = await linkPortableTextFileUrls(portableTextValues.map(({ owner, slug }) => owner[slug]), (storageKeys) => new MediaRepository(this.db).findIdsByStorageKeys(storageKeys));
				for (const [index, { owner, slug }] of portableTextValues.entries()) owner[slug] = linked[index];
			} catch {}
		};
		if (imageFields.length === 0 && repeaterFields.length === 0 && blockFields.length === 0) {
			await linkPortableTextValues();
			return result;
		}
		const getProvider = (id) => this.getMediaProvider(id);
		for (const field of imageFields) {
			const value = result[field.slug];
			if (value == null) continue;
			try {
				const normalized = field.type === "image" ? await normalizeImageValue(value, getProvider) : await normalizeMediaValue(value, getProvider);
				if (normalized) result[field.slug] = normalized;
				else if (isBlankString(value)) result[field.slug] = null;
			} catch {}
		}
		for (const field of repeaterFields) {
			const value = result[field.slug];
			if (!Array.isArray(value)) continue;
			const mediaSubFieldSlugs = (field.validation?.subFields ?? []).filter((sub) => sub.type === "image").map((sub) => sub.slug);
			if (mediaSubFieldSlugs.length === 0) continue;
			const items = value;
			result[field.slug] = await Promise.all(items.map(async (item) => {
				if (!isRecord$3(item)) return item;
				const normalizedItem = { ...item };
				for (const slug of mediaSubFieldSlugs) {
					const subValue = normalizedItem[slug];
					if (subValue == null) continue;
					try {
						const normalized = await normalizeImageValue(subValue, getProvider);
						if (normalized) normalizedItem[slug] = normalized;
						else if (isBlankString(subValue)) normalizedItem[slug] = null;
					} catch {}
				}
				return normalizedItem;
			}));
		}
		if (blockFields.length > 0) {
			const blockTypes = preloadedBlockTypes ?? await resolveBlockTypes(this.db);
			for (const field of blockFields) {
				const value = result[field.slug];
				if (!Array.isArray(value)) continue;
				result[field.slug] = await Promise.all(value.map(async (block) => {
					if (!isRecord$3(block) || typeof block._type !== "string") return block;
					const version = blockTypes.get(block._type)?.versions.find((candidate) => candidate.version === block._version);
					if (!version || version.unsupportedTypes?.length) return block;
					const normalizedBlock = { ...block };
					for (const nestedField of version.fields) {
						const nestedValue = normalizedBlock[nestedField.slug];
						if (nestedValue == null) continue;
						try {
							if (nestedField.type === "image" || nestedField.type === "file") {
								const normalized = nestedField.type === "image" ? await normalizeImageValue(nestedValue, getProvider) : await normalizeMediaValue(nestedValue, getProvider);
								if (normalized) normalizedBlock[nestedField.slug] = normalized;
								else if (isBlankString(nestedValue)) normalizedBlock[nestedField.slug] = null;
							} else if (nestedField.type === "portableText" && Array.isArray(nestedValue)) portableTextValues.push({
								owner: normalizedBlock,
								slug: nestedField.slug
							});
							else if (nestedField.type === "repeater" && Array.isArray(nestedValue)) {
								const imageSlugs = (nestedField.validation?.subFields ?? []).filter((subField) => subField.type === "image").map((subField) => subField.slug);
								normalizedBlock[nestedField.slug] = await Promise.all(nestedValue.map(async (item) => {
									if (!isRecord$3(item)) return item;
									const normalizedItem = { ...item };
									for (const slug of imageSlugs) try {
										const normalized = await normalizeImageValue(normalizedItem[slug], getProvider);
										if (normalized) normalizedItem[slug] = normalized;
										else if (isBlankString(normalizedItem[slug])) normalizedItem[slug] = null;
									} catch {
										continue;
									}
									return normalizedItem;
								}));
							}
						} catch {
							continue;
						}
					}
					return normalizedBlock;
				}));
			}
		}
		await linkPortableTextValues();
		return result;
	}
	runAfterSaveHooks(content, collection, isNew, actor, excludePluginId, details) {
		after(async () => {
			if (this.hooks.hasHooks("content:afterSave")) try {
				await this.hooks.runContentAfterSave(content, collection, isNew, actor, excludePluginId, details);
			} catch (err) {
				console.error("EmDash afterSave hook error:", err);
			}
		});
	}
	runAfterDeleteHooks(id, collection, permanent) {
		after(async () => {
			if (this.hooks.hasHooks("content:afterDelete")) try {
				await this.hooks.runContentAfterDelete(id, collection, permanent);
			} catch (err) {
				console.error("EmDash afterDelete hook error:", err);
			}
		});
	}
	runMediaAfterUploadHook(mediaItem) {
		after(async () => {
			try {
				await this.hooks.runMediaAfterUpload(mediaItem);
			} catch (err) {
				console.error("EmDash afterUpload hook error:", err);
			}
		});
	}
	runDeferredContentHook(name, content, collection, afterPluginId, pluginInvocationId) {
		const label = name.slice(8);
		const invoke = async () => {
			if (this.hooks.hasHooks(name)) try {
				switch (name) {
					case "content:afterPublish":
						await this.hooks.runContentAfterPublish(content, collection);
						break;
					case "content:afterUnpublish":
						await this.hooks.runContentAfterUnpublish(content, collection);
						break;
					case "content:afterRestore":
						await this.hooks.runContentAfterRestore(content, collection);
						break;
					case "content:afterSchedule":
						await this.hooks.runContentAfterSchedule(content, collection);
						break;
					case "content:afterUnschedule": await this.hooks.runContentAfterUnschedule(content, collection);
				}
			} catch (err) {
				console.error(`EmDash ${label} hook error:`, err);
			}
		};
		const contentId = typeof content.id === "string" ? content.id : void 0;
		const guardKey = afterPluginId && contentId ? this.pluginContentActionKey(collection, contentId) : void 0;
		const invokeWithGuard = async () => {
			if (guardKey) this.retainPluginContentAction(guardKey);
			try {
				await invoke();
			} finally {
				if (guardKey) this.releasePluginContentAction(guardKey);
			}
		};
		if (afterPluginId && pluginInvocationId && this.findSandboxedPlugin(afterPluginId)) {
			const key = this.pluginInvocationKey(afterPluginId, pluginInvocationId);
			if (!this.activePluginInvocations.has(key) || this.releasedPluginInvocations.has(key)) {
				after(invokeWithGuard);
				return;
			}
			const pending = this.pendingPluginAfterHooks.get(key) ?? [];
			pending.push(invokeWithGuard);
			this.pendingPluginAfterHooks.set(key, pending);
			return;
		}
		after(invokeWithGuard);
	}
	pluginInvocationKey(pluginId, invocationId) {
		return JSON.stringify([pluginId, invocationId]);
	}
	async invalidatePluginMedia(pluginId, storageKey, invocationId, invalidateContentCache) {
		const key = invocationId ? this.pluginInvocationKey(pluginId, invocationId) : void 0;
		const invalidator = invalidateContentCache ?? (key ? this.pluginInvocationCacheInvalidators.get(key) : void 0) ?? this.pluginContentCacheInvalidator;
		if (!invalidator) return;
		const purge = async () => {
			try {
				await invalidator([mediaCacheTag(storageKey)]);
			} catch (error) {
				console.error(`[plugin-media] Cache invalidation failed for ${storageKey}:`, error);
			}
		};
		if (key && this.activePluginInvocations.has(key)) {
			const pending = this.pendingPluginAfterHooks.get(key) ?? [];
			pending.push(purge);
			this.pendingPluginAfterHooks.set(key, pending);
			return;
		}
		await purge();
	}
	beginPluginInvocation(pluginId, invocationId, invalidateContentCache) {
		const key = this.pluginInvocationKey(pluginId, invocationId);
		this.pendingPluginAfterHooks.delete(key);
		this.releasedPluginInvocations.delete(key);
		if (invalidateContentCache) this.pluginInvocationCacheInvalidators.set(key, invalidateContentCache);
		else this.pluginInvocationCacheInvalidators.delete(key);
		this.activePluginInvocations.add(key);
	}
	flushPluginAfterHooks(pluginId, invocationId, final = true) {
		if (!invocationId) return Promise.resolve();
		const key = this.pluginInvocationKey(pluginId, invocationId);
		this.releasedPluginInvocations.add(key);
		const pending = this.pendingPluginAfterHooks.get(key) ?? [];
		this.pendingPluginAfterHooks.delete(key);
		for (const invoke of pending) after(invoke);
		if (final) {
			this.releasedPluginInvocations.delete(key);
			this.activePluginInvocations.delete(key);
			this.pluginInvocationCacheInvalidators.delete(key);
		} else {
			const timer = setTimeout(() => {
				const late = this.pendingPluginAfterHooks.get(key) ?? [];
				this.pendingPluginAfterHooks.delete(key);
				for (const invoke of late) after(invoke);
				this.releasedPluginInvocations.delete(key);
				this.activePluginInvocations.delete(key);
				this.pluginInvocationCacheInvalidators.delete(key);
			}, PLUGIN_INVOCATION_RELEASE_GRACE_MS);
			if (typeof timer === "object") timer.unref();
		}
		return Promise.resolve();
	}
	runAfterPublishHooks(content, collection, afterPluginId, pluginInvocationId) {
		this.runDeferredContentHook("content:afterPublish", content, collection, afterPluginId, pluginInvocationId);
	}
	runAfterUnpublishHooks(content, collection, afterPluginId, pluginInvocationId) {
		this.runDeferredContentHook("content:afterUnpublish", content, collection, afterPluginId, pluginInvocationId);
	}
	runAfterRestoreHooks(content, collection, afterPluginId, pluginInvocationId) {
		this.runDeferredContentHook("content:afterRestore", content, collection, afterPluginId, pluginInvocationId);
	}
	runAfterScheduleHooks(content, collection, afterPluginId, pluginInvocationId) {
		this.runDeferredContentHook("content:afterSchedule", content, collection, afterPluginId, pluginInvocationId);
	}
	runAfterUnscheduleHooks(content, collection, afterPluginId, pluginInvocationId) {
		this.runDeferredContentHook("content:afterUnschedule", content, collection, afterPluginId, pluginInvocationId);
	}
	async handleSandboxedRoute(plugin, path, request, body, routeMeta, user, ui, invalidateContentCache) {
		const routeName = path.replace(LEADING_SLASH_PATTERN$1, "");
		try {
			const declaredHeaders = routeMeta.request ? routeMeta.request.headers ?? [] : void 0;
			const headers = sanitizeHeadersForSandbox(request.headers, declaredHeaders);
			const meta = extractRequestMeta(request, this.config);
			return {
				success: true,
				data: await plugin.invokeRoute(routeName, body, {
					url: request.url,
					method: request.method,
					headers,
					meta,
					user,
					ui
				}, { invalidateContentCache })
			};
		} catch (error) {
			if (error instanceof PluginRouteRequestError) return {
				success: false,
				status: error.status,
				error: {
					code: "INVALID_PLUGIN_REQUEST",
					message: error.message
				}
			};
			console.error(`EmDash: Sandboxed plugin route error:`, error);
			const sandboxRouteError = getSandboxRouteErrorDetails(error);
			if (sandboxRouteError) return {
				success: false,
				status: sandboxRouteError.status,
				error: {
					code: sandboxRouteError.code,
					message: sandboxRouteError.message
				}
			};
			return {
				success: false,
				error: {
					code: "ROUTE_ERROR",
					message: error instanceof Error ? error.message : String(error)
				}
			};
		}
	}
	/**
	* Cache for page contributions. Uses a WeakMap keyed on the PublicPageContext
	* object so results are collected once per page context per request, even when
	* multiple render components (EmDashHead, EmDashBodyStart, EmDashBodyEnd)
	* request contributions from the same page.
	*/
	pageContributionCache = /* @__PURE__ */ new WeakMap();
	/**
	* Collect all page contributions (metadata + fragments) in a single pass.
	* Results are cached by page context object identity.
	*/
	async collectPageContributions(page) {
		const cached = this.pageContributionCache.get(page);
		if (cached) return cached;
		const promise = this.doCollectPageContributions(page);
		this.pageContributionCache.set(page, promise);
		return promise;
	}
	async doCollectPageContributions(page) {
		const metadata = [];
		const fragments = [];
		if (this.hooks.hasHooks("page:metadata")) {
			const results = await this.hooks.runPageMetadata({ page });
			for (const r of results) metadata.push(...r.contributions);
		}
		if (this.hooks.hasHooks("page:fragments")) {
			const results = await this.hooks.runPageFragments({ page });
			for (const r of results) fragments.push(...r.contributions);
		}
		return {
			metadata,
			fragments
		};
	}
	/**
	* Collect page metadata contributions from trusted and sandboxed plugins.
	* Delegates to the single-pass collector and returns the metadata portion.
	*/
	async collectPageMetadata(page) {
		const { metadata } = await this.collectPageContributions(page);
		return metadata;
	}
	/**
	* Collect page fragment contributions from trusted plugins only.
	* Delegates to the single-pass collector and returns the fragments portion.
	*/
	async collectPageFragments(page) {
		const { fragments } = await this.collectPageContributions(page);
		return fragments;
	}
	isPluginEnabled(pluginId) {
		const status = this.pluginStates.get(pluginId);
		return status === void 0 || status === "active";
	}
};
function isBlankString(value) {
	return typeof value === "string" && value.trim() === "";
}
/**
* Normalize an image field value together with its `darkVariant`. The media
* normalizer only keeps the media item's own keys, so the variant is normalized
* separately and reattached.
*/
async function normalizeImageValue(value, getProvider) {
	const primary = await normalizePrimaryImageValue(value, getProvider);
	if (!primary || !isRecord$3(value) || value.darkVariant == null) return primary;
	const darkVariant = await normalizeMediaValue(value.darkVariant, getProvider);
	return darkVariant ? {
		...primary,
		darkVariant
	} : primary;
}
/**
* Normalize the primary image of an image field value.
*
* A legacy string URL that the admin upgraded to `{ id: "", src: url }` so it
* can carry a dark variant still has to normalize as a string: as an object it
* counts as local media, which strips `src` and leaves nothing behind. The
* upgrade outlives the variant — an editor can add one and remove it again —
* so the shape decides, not the presence of `darkVariant`.
*/
async function normalizePrimaryImageValue(value, getProvider) {
	if (isRecord$3(value) && !value.id && typeof value.src === "string" && !value.provider) return normalizeMediaValue(value.src, getProvider);
	return normalizeMediaValue(value, getProvider);
}
/** A failed room save fails the operation, with the status its reason gives. */
function roomSaveFailure(error) {
	return {
		success: false,
		error: {
			code: error.code,
			message: error.message
		},
		status: roomSaveStatus(error)
	};
}
function roomSaveStatus({ reason, code }) {
	if (reason === "CONFLICT") return 409;
	if (reason === "FORBIDDEN") return 403;
	if (reason === "NOT_FOUND") return 404;
	if (code === "UNLOADED" || code === "SITE_UNAVAILABLE") return 503;
	return mapErrorStatus(code);
}
// node_modules/emdash/dist/runtime-holder-DkZ_0f7A.mjs
var RUNTIME_HOLDER_KEY = Symbol.for("emdash:runtime-holder");
var store = globalThis;
function getRuntimeHolder() {
	let holder = store[RUNTIME_HOLDER_KEY];
	if (!holder) {
		holder = {
			instance: null,
			lock: createInitLock(),
			closed: false
		};
		store[RUNTIME_HOLDER_KEY] = holder;
	}
	return holder;
}
// node_modules/emdash/dist/public-plugin-api-routes-Bq55wwHn.mjs
/**
* Request-scoped database lifecycle helpers.
*
* Extracted from middleware.ts so they can be unit-tested without pulling in
* the virtual:emdash/* module graph. The middleware imports these to settle a
* request-scoped db adapter's lifecycle around the response.
*/
/**
* Astro attaches AstroCookies to outgoing responses via a well-known global
* symbol. Cloning a Response (`new Response(body, init)`) drops non-header
* metadata, so any helper that wraps the response must explicitly forward this
* symbol or `cookies.set()` calls will be silently dropped. `Symbol.for`
* returns the same registry symbol everywhere, so this matches the copy in
* middleware.ts.
*/
var ASTRO_COOKIES_SYMBOL = Symbol.for("astro.cookies");
/**
* Whether the request ended authenticated, for the db adapter's `commit()`.
* `isAuthenticated` is captured before the route runs, so it misses
* login/signup/invite requests that create the Astro session mid-request;
* `session.set()` writes the `astro-session` cookie into the jar synchronously,
* so scanning the outgoing cookies detects them. Only outgoing cookies count —
* a stale `astro-session` cookie arriving on an anonymous render must not
* qualify, or its replica-read bookmark would overwrite a fresher one from an
* earlier authenticated write.
*/
function requestEndedAuthenticated(isAuthenticated, cookies) {
	if (isAuthenticated) return true;
	for (const header of cookies.headers()) if (header.startsWith("astro-session=")) return true;
	return false;
}
/** Hold the real adapter close behind both response and deferred-task completion. */
function coordinateScopedDbLifecycle(scoped) {
	if (!scoped.close) return { lifecycle: scoped };
	const close = scoped.close;
	const deferredTasks = createDeferredTaskTracker(() => {
		try {
			close();
		} catch (error) {
			console.error("[emdash] request-scoped db close failed:", error);
		}
	});
	return {
		closed: deferredTasks.settled,
		deferredTasks,
		lifecycle: {
			commit: scoped.commit,
			close: deferredTasks.settle
		}
	};
}
/**
* Run a request-scoped db's `close()` once the response body has finished
* streaming. Astro streams HTML and components issue DB queries during that
* stream, so a connection-backed adapter (e.g. Postgres over Hyperdrive) must
* not be torn down until the body is flushed. Bodyless responses (redirects,
* 304s, errors) close immediately. A guard makes close idempotent and a stream
* `cancel` (client disconnect) still triggers it so connections never leak.
*
* No-op for adapters without a `close` (D1): the response passes through.
*/
function wrapResponseForScopedClose(response, close) {
	let closed = false;
	const runClose = () => {
		if (closed) return;
		closed = true;
		try {
			close();
		} catch (error) {
			console.error("[emdash] request-scoped db close failed:", error);
		}
	};
	if (!response.body) {
		runClose();
		return response;
	}
	const transformer = {
		flush: runClose,
		cancel: runClose
	};
	const transform = new TransformStream(transformer);
	const wrapped = new Response(response.body.pipeThrough(transform), response);
	const astroCookies = Reflect.get(response, ASTRO_COOKIES_SYMBOL);
	if (astroCookies !== void 0) Reflect.set(wrapped, ASTRO_COOKIES_SYMBOL, astroCookies);
	wrapped.headers.delete("Content-Length");
	return wrapped;
}
/**
* Run the request body under a request-scoped db, then settle its lifecycle:
* `commit()` runs before the response is returned (so per-request state like a
* D1 bookmark cookie is persisted in the headers, even if render throws), while
* `close()` (if any) is deferred to lifecycle settlement so a
* connection-backed adapter isn't torn down mid-render or mid-task. On error
* the lifecycle is settled before rethrowing so it never leaks.
*
* On the error path both `commit()` and `close()` are defended: a throw from
* either is logged and swallowed so it can't replace the propagating render
* error (which is the one the caller needs to see). On the success path
* `commit()` is guarded too — if it throws, the connection is closed before the
* failure is surfaced, so it never leaks. For the current adapters `commit()`
* is a no-op (Hyperdrive) or a cookie write (D1, no `close`) and `close()` is
* fire-and-forget, so these guards only matter for a future connection-backed
* adapter with throwing teardown, but the helper is generic and must not leak
* or mask.
*/
async function finishScoped(scoped, run) {
	let response;
	try {
		response = await run();
	} catch (error) {
		commitSafely(scoped.commit);
		closeSafely(scoped.close);
		throw error;
	}
	try {
		scoped.commit();
	} catch (error) {
		closeSafely(scoped.close);
		throw error;
	}
	return scoped.close ? wrapResponseForScopedClose(response, scoped.close) : response;
}
/**
* Run commit() swallowing any error. Used where an exception is already
* propagating (or about to be thrown) and a commit failure must neither mask it
* nor skip the subsequent close().
*/
function commitSafely(commit) {
	try {
		commit();
	} catch (error) {
		console.error("[emdash] request-scoped db commit failed during error handling:", error);
	}
}
/**
* Run close() swallowing any error. Used on the error/commit-failure paths
* where another exception is the one the caller must see; a throwing teardown
* must not replace it.
*/
function closeSafely(close) {
	if (!close) return;
	try {
		close();
	} catch (error) {
		console.error("[emdash] request-scoped db close failed during error handling:", error);
	}
}
/**
* Stream-end metrics
*
* Server-Timing db.* counters are snapshotted when middleware's next()
* returns — but at that point only the response *headers* are final.
* Astro streams the body afterwards, and components rendered during
* streaming issue further DB queries that the headers can never report.
*
* This module wraps the response body in an identity TransformStream and
* snapshots the request metrics in flush(), i.e. when the body actually
* finishes streaming. The metrics object lives on the request context
* (AsyncLocalStorage) and is mutated in-place by the Kysely log hook, so
* a reference captured before wrapping observes every post-header query.
* The snapshot is emitted as prefixed NDJSON on stdout (same transport as
* [emdash-query-log] — console.log works in both Node and workerd).
*
* Gated on isInstrumentationEnabled() (EMDASH_QUERY_LOG=1): zero overhead
* in normal production traffic.
*/
var STREAM_END_PREFIX = "[emdash-stream-end]";
/**
* Wrap a response body so the FINAL request metrics are emitted when the
* body finishes streaming. Returns the response unchanged when
* instrumentation is disabled, the body is null, or no request metrics
* are attached (e.g. outside the middleware's ALS context).
*/
function wrapBodyForStreamMetrics(response) {
	if (!isInstrumentationEnabled()) return response;
	if (!response.body) return response;
	const ctx = getRequestContext();
	const metrics = ctx?.metrics;
	if (!metrics) return response;
	const recorder = ctx?.queryRecorder;
	if (recorder) recorder.deferredFlush = true;
	const transform = new TransformStream({ flush() {
		const snapshot = {
			route: recorder?.route,
			method: recorder?.method,
			phase: recorder?.phase,
			totalMs: performance.now() - metrics.start,
			dbCount: metrics.dbCount,
			dbTotalMs: metrics.dbTotalMs,
			dbFirstOffset: metrics.dbFirstOffset,
			dbLastOffset: metrics.dbLastOffset,
			cacheHits: metrics.cacheHits,
			cacheMisses: metrics.cacheMisses
		};
		console.log(`${STREAM_END_PREFIX} ${JSON.stringify(snapshot)}`);
		if (recorder) flushRecorder(recorder);
	} });
	const wrapped = new Response(response.body.pipeThrough(transform), response);
	const astroCookies = Reflect.get(response, ASTRO_COOKIES_SYMBOL);
	if (astroCookies !== void 0) Reflect.set(wrapped, ASTRO_COOKIES_SYMBOL, astroCookies);
	wrapped.headers.delete("Content-Length");
	return wrapped;
}
/**
* Eager, transparent prefetch of site-global "chrome" data.
*
* On a public page render, the shared layout pulls the same site-global data on
* every request -- menus, widget areas, taxonomy term lists, site settings --
* but each is awaited inside a separately-rendered Astro component, so they
* execute as serial DB round trips. This fires them all CONCURRENTLY at the
* very start of the request, before `next()`:
*
*   - On remote backends whose adapter can overlap queries the round trips
*     overlap instead of serializing, collapsing ~N sequential RTTs into ~1
*     wall-clock RTT. On a coalescing backend they additionally batch into a
*     single round trip.
*   - The results land in the per-request `requestCached` store. On multilingual
*     sites, menus and taxonomy terms target the page locale, matching helpers
*     called with `{ locale: Astro.currentLocale }`. Implicit-locale calls can
*     resolve to the default locale instead and load separately.
*
* This warms the real helpers without changing their locale resolution. The
* caller gates this to the public-page path on a request-scoped (remote) backend
* that can overlap queries; it is a no-op-ish waste on synchronous local SQLite
* and only delays the page on a handle that runs one query at a time, so don't
* call it there.
*
* Fire-and-forget: never awaited by middleware, never throws (a prefetch failure
* must not affect the request -- the helpers will simply run on demand).
*/
/** Warm widget areas: one bulk load, primed under each per-area cache key. */
async function prefetchWidgetAreas() {
	const areas = await requestCached("widget-areas", getWidgetAreas);
	for (const area of areas) setRequestCacheEntry(`widget-area:${area.name}`, area);
}
/**
* Warm every taxonomy's term list via the real helper (primes per-name keys).
* Counts are left out: they cost an aggregate over the whole assignment pivot
* per taxonomy, and only a consumer that renders one can say it's needed. A
* consumer that does asks for it and reuses the term list warmed here.
*/
async function prefetchTaxonomyTerms(locale) {
	const defs = await getTaxonomyDefs();
	await Promise.allSettled(defs.map((def) => getTaxonomyTerms(def.name, {
		locale,
		includeCounts: false
	})));
}
/** Warm every menu via the real helper (primes `menu:${name}:${locale}`). */
async function prefetchMenus(locale) {
	const names = await cachedQuery({
		namespace: CacheNamespace.MENUS,
		key: "names",
		load: async () => {
			const rows = await (await getDb()).selectFrom("_emdash_menus").select("name").distinct().execute();
			return [...new Set(rows.map((r) => r.name))];
		}
	});
	await Promise.allSettled(names.map((name) => getMenu(name, { locale })));
}
/**
* Concurrently warm the site-global layout data for the current request.
* Safe to call only inside the request ALS frame that owns the (remote)
* request-scoped db. Never throws.
*/
async function prefetchLayoutData(pageLocale) {
	const locale = isI18nEnabled() ? pageLocale : void 0;
	try {
		await Promise.allSettled([
			getSiteSettings(),
			prefetchMenus(locale),
			prefetchWidgetAreas(),
			prefetchTaxonomyTerms(locale)
		]);
	} catch (error) {
		console.error("[emdash] layout prefetch failed (non-fatal):", error);
	}
}
function getPublicPluginRouteMeta(runtime, pluginId, path) {
	const meta = runtime.getPluginRouteMeta(pluginId, path);
	return meta?.public === true ? meta : null;
}
function pluginRouteNotFound() {
	return {
		success: false,
		error: {
			code: "NOT_FOUND",
			message: "Plugin route not found"
		}
	};
}
function createPublicPluginApiRouteHandler(runtime) {
	return async (pluginId, method, path, request) => {
		if (!getPublicPluginRouteMeta(runtime, pluginId, path)) return pluginRouteNotFound();
		return runtime.handlePluginApiRoute(pluginId, method, path, request);
	};
}
// \0virtual:emdash/build
var buildTime = 0x1a21efaa9ad;
// \0virtual:emdash/plugins
function plugins() {
	const key = Symbol.for("emdash:plugins");
	const cache = globalThis[key] ??= {};
	return cache["e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"] ??= [];
}
// \0virtual:emdash/sandbox-runner
var sandbox_runner_exports = /* @__PURE__ */ __exportAll({
	createSandboxRunner: () => createSandboxRunner,
	sandboxEnabled: () => false
});
var createSandboxRunner = createNoopSandboxRunner;
// \0virtual:emdash/sandboxed-plugins
var sandboxedPlugins = [];
// \0virtual:emdash/scheduler
function createScheduler(executor) {
	return new NodeCronScheduler(executor);
}
// node_modules/emdash/dist/storage/local.mjs
/**
* Local Filesystem Storage Implementation
*
* For development and testing. Stores files in a local directory.
*/
/** Type guard for Node.js ErrnoException */
function isNodeError(error) {
	return error instanceof Error && "code" in error;
}
/** Pattern to remove leading slashes */
var LEADING_SLASH_PATTERN = /^\//;
/** Pattern to remove trailing slashes */
var TRAILING_SLASH_PATTERN = /\/$/;
/**
* Local filesystem storage implementation
*/
var LocalStorage = class {
	/** Resolved absolute base directory for all stored files */
	directory;
	baseUrl;
	constructor(config) {
		this.directory = path.resolve(config.directory);
		this.baseUrl = config.baseUrl.replace(TRAILING_SLASH_PATTERN, "");
	}
	/**
	* Resolve a storage key to an absolute file path, ensuring it stays
	* within the configured storage directory. Uses path.resolve() for
	* canonical resolution rather than regex stripping.
	*
	* @throws EmDashStorageError if the resolved path escapes the base directory
	*/
	getFilePath(key) {
		const normalizedKey = key.replace(LEADING_SLASH_PATTERN, "");
		const resolved = path.resolve(this.directory, normalizedKey);
		if (!resolved.startsWith(this.directory + path.sep) && resolved !== this.directory) throw new EmDashStorageError("Invalid file path", "INVALID_PATH");
		return resolved;
	}
	async upload(options) {
		try {
			const filePath = this.getFilePath(options.key);
			const dir = path.dirname(filePath);
			await fs.mkdir(dir, { recursive: true });
			let buffer;
			if (options.body instanceof ReadableStream) {
				const chunks = [];
				const reader = options.body.getReader();
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					chunks.push(value);
				}
				buffer = Buffer.concat(chunks);
			} else if (options.body instanceof Uint8Array) buffer = Buffer.from(options.body);
			else buffer = options.body;
			await fs.writeFile(filePath, buffer);
			return {
				key: options.key,
				url: this.getPublicUrl(options.key),
				size: buffer.length
			};
		} catch (error) {
			throw new EmDashStorageError(`Failed to upload file: ${options.key}`, "UPLOAD_FAILED", error);
		}
	}
	async download(key, options = {}) {
		try {
			const filePath = this.getFilePath(key);
			if (!existsSync(filePath)) throw new EmDashStorageError(`File not found: ${key}`, "NOT_FOUND");
			const stat = await fs.stat(filePath);
			const range = options.range && resolveByteRange(options.range, stat.size);
			const nodeStream = createReadStream(filePath, range ? {
				start: range.offset,
				end: range.offset + range.length - 1
			} : void 0);
			return {
				body: Readable.toWeb(nodeStream),
				contentType: getContentType(path.extname(key).toLowerCase()),
				size: stat.size,
				lastModified: stat.mtime,
				...range && { range }
			};
		} catch (error) {
			if (error instanceof EmDashStorageError) throw error;
			throw new EmDashStorageError(`Failed to download file: ${key}`, "DOWNLOAD_FAILED", error);
		}
	}
	async delete(key) {
		try {
			const filePath = this.getFilePath(key);
			await fs.unlink(filePath);
		} catch (error) {
			if (!isNodeError(error) || error.code !== "ENOENT") throw new EmDashStorageError(`Failed to delete file: ${key}`, "DELETE_FAILED", error);
		}
	}
	async exists(key) {
		try {
			const filePath = this.getFilePath(key);
			await fs.access(filePath);
			return true;
		} catch {
			return false;
		}
	}
	async list(options = {}) {
		try {
			const prefix = options.prefix || "";
			const searchDir = path.resolve(this.directory, path.dirname(prefix));
			if (!searchDir.startsWith(this.directory + path.sep) && searchDir !== this.directory) throw new EmDashStorageError("Invalid list prefix", "INVALID_PATH");
			const prefixBase = path.basename(prefix);
			try {
				await fs.access(searchDir);
			} catch {
				return { files: [] };
			}
			const entries = await fs.readdir(searchDir, { withFileTypes: true });
			const files = [];
			for (const entry of entries) if (entry.isFile() && entry.name.startsWith(prefixBase)) {
				const key = path.join(path.dirname(prefix), entry.name);
				const filePath = path.join(searchDir, entry.name);
				const stat = await fs.stat(filePath);
				files.push({
					key,
					size: stat.size,
					lastModified: stat.mtime
				});
			}
			files.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
			const startIndex = options.cursor ? parseInt(options.cursor, 10) : 0;
			const limit = options.limit || 1e3;
			return {
				files: files.slice(startIndex, startIndex + limit),
				nextCursor: startIndex + limit < files.length ? String(startIndex + limit) : void 0
			};
		} catch (error) {
			throw new EmDashStorageError("Failed to list files", "LIST_FAILED", error);
		}
	}
	async getSignedUploadUrl(_options) {
		throw new EmDashStorageError("Local storage does not support signed upload URLs. Upload files directly through the API.", "NOT_SUPPORTED");
	}
	getPublicUrl(key) {
		return `${this.baseUrl}/${key}`;
	}
};
/**
* Get content type from file extension
*/
function getContentType(ext) {
	return mime.getType(ext) ?? "application/octet-stream";
}
/**
* Create local storage adapter
* This is the factory function called at runtime
*/
function createStorage$1(config) {
	return new LocalStorage({
		directory: typeof config.directory === "string" ? config.directory : "",
		baseUrl: typeof config.baseUrl === "string" ? config.baseUrl : ""
	});
}
// \0virtual:emdash/storage
var createStorage = createStorage$1;
// node_modules/emdash/dist/astro/middleware.mjs
/**
* Runtime init lock reclaim deadline. Must be strictly larger than the db
* init deadline: this lock wraps EmDashRuntime.create() → getDatabase() →
* the db init lock, and equal deadlines would let this outer lock reclaim
* (spawning a second cron scheduler and sandbox runner) while the inner db
* init is legitimately still working through a contended migration.
*/
var RUNTIME_INIT_DEADLINE_MS = DB_INIT_DEADLINE_MS + 15e3;
/**
* Throttle for the anonymous-path runtime-init failure log. While a site is
* stuck (e.g. a failing migration in its backoff window, #1744) every
* anonymous request lands in that catch; one line per interval per isolate
* keeps the failure visible without flooding logs on a busy site. Plain
* module state (not globalThis): a duplicated SSR chunk just means an extra
* log line, which is harmless.
*/
var RUNTIME_INIT_ERROR_LOG_INTERVAL_MS = 3e4;
var lastRuntimeInitErrorLogAt = 0;
/**
* Whether we've verified the database has been set up.
* On a fresh deployment the first request may hit a public page, bypassing
* runtime init. Without this check, template helpers like getSiteSettings()
* would query an empty database and crash. Once verified (or once the runtime
* has initialized via an admin/API request), this stays true for the worker's
* lifetime.
*
* Stored on globalThis behind a Symbol key so the flag is a true singleton
* even when the bundler duplicates this module across SSR chunks (same
* pattern as request-cache.ts). A plain module-scoped `let` becomes multiple
* independent variables, which would make the setup probe re-run far more
* often than intended — and every re-run is another chance for a transient
* DB error to be misread as "fresh install" and bounce visitors to setup.
*/
var SETUP_VERIFIED_KEY = Symbol.for("emdash:setup-verified");
var setupFlagStore = globalThis;
function isSetupVerified() {
	return setupFlagStore[SETUP_VERIFIED_KEY] === true;
}
function markSetupVerified() {
	setupFlagStore[SETUP_VERIFIED_KEY] = true;
}
/** Nested request contexts copy this one, so call it before creating them. */
function providePublicMediaUrl(storage) {
	const resolve = createPublicMediaUrlResolver(storage);
	const ctx = getRequestContext();
	if (ctx) ctx.publicMediaUrl = resolve;
	return resolve;
}
/** Whether i18n config has been initialized from the virtual module */
var i18nInitialized = false;
/**
* Get EmDash configuration from virtual module
*/
function getConfig() {
	if (config_default && typeof config_default === "object") {
		if (!i18nInitialized) {
			i18nInitialized = true;
			const config = config_default;
			if (config.i18n && typeof config.i18n === "object") setI18nConfig(config.i18n);
			else setI18nConfig(null);
		}
		return config_default;
	}
	return null;
}
/**
* Get plugins from virtual module
*/
function getPlugins() {
	const plugins$1 = plugins;
	return (typeof plugins$1 === "function" ? plugins$1() : plugins$1) || [];
}
/**
* Build runtime dependencies from virtual modules
*/
function buildDependencies(config, migrationMode) {
	const sandboxModule = sandbox_runner_exports;
	return {
		config,
		migrationMode,
		plugins: getPlugins(),
		createDialect,
		createCoalescingDialect: void 0,
		createStorage,
		createScheduler,
		createRoomHost: null,
		sandboxEnabled: sandboxModule.sandboxEnabled,
		sandboxBypassed: sandboxModule.sandboxBypassed ?? false,
		sandboxedPluginEntries: sandboxedPlugins || [],
		createSandboxRunner: sandboxModule.createSandboxRunner,
		mediaProviderEntries: mediaProviders || []
	};
}
/**
* Get or create the runtime instance.
*
* When `initTimings` is provided, any timing samples recorded during a
* genuine cold init are appended. Subsequent warm calls (hitting the
* cached instance) push nothing — callers should treat an empty array
* as "warm, nothing to report".
*/
async function getRuntime(config, migrationMode, initTimings) {
	const holder = getRuntimeHolder();
	return initWithLock(holder.lock, () => {
		if (holder.closed) throw new Error("EmDash dev server has closed");
		return holder.instance;
	}, async (isCurrentClaim) => {
		if (holder.closed) throw new Error("EmDash dev server has closed");
		const deps = buildDependencies(config, migrationMode);
		const runtime = await EmDashRuntime.create(deps, initTimings);
		if (holder.closed) {
			await runtime.shutdown();
			throw new Error("EmDash dev server has closed");
		}
		if (isCurrentClaim()) {
			holder.instance = runtime;
			runtime.rooms?.activate();
		} else {
			runtime.stopCron().catch((error) => {
				console.error("[emdash] failed to stop superseded runtime's cron:", error);
			});
			runtime.rooms?.shutdown().catch((error) => {
				console.error("[co-editing] failed to shut down superseded runtime's rooms:", error);
			});
		}
		return runtime;
	}, {
		deadlineMs: RUNTIME_INIT_DEADLINE_MS,
		anchor: (promise) => after(() => promise)
	});
}
new URL("https://cron.emdash.internal/");
function resolveConfiguredMigrationMode(config) {
	const processOverride = typeof process !== "undefined" && process.env ? process.env.EMDASH_MIGRATIONS_MODE : void 0;
	return resolveRuntimeMigrationMode(config.migrations, {
		dev: false,
		override: processOverride ?? void 0
	});
}
function pendingMigrationsResponse(error) {
	console.error("[emdash] database migrations are pending:", error.pending.join(", "));
	return migrationRequiredResponse();
}
function migrationRequiredErrorResponse(error) {
	if (error instanceof PendingMigrationsError) return pendingMigrationsResponse(error);
	if (Date.now() - lastRuntimeInitErrorLogAt >= RUNTIME_INIT_ERROR_LOG_INTERVAL_MS) {
		lastRuntimeInitErrorLogAt = Date.now();
		console.error("[emdash] database migrations are required:", error instanceof Error ? error.message : error);
	}
	return migrationRequiredResponse();
}
function migrationRequiredResponse() {
	return new Response("Database migrations are required. Apply the deployment migration manifest and retry.", {
		status: 503,
		headers: { "Retry-After": "60" }
	});
}
function unmigratedDatabaseResponse() {
	return new Response("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"robots\" content=\"noindex\"><title>Site unavailable</title></head><body><p>This site's database has not been migrated yet. <a href=\"/_emdash/admin/setup\">Set up EmDash</a></p></body></html>", {
		status: 503,
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "no-store",
			"Retry-After": "60"
		}
	});
}
function runtimeConfigurationErrorResponse(error, pathname) {
	if (!pathname.startsWith("/_emdash/api/")) return null;
	if (error instanceof EmDashConfigurationError) return apiError(error.code, error.message, 500);
	if (error instanceof EmDashStorageError && error.code === "BINDING_NOT_FOUND") return apiError(error.code, error.message, 500);
	return null;
}
/**
* Baseline security headers applied to all responses.
* Admin routes get additional headers (strict CSP) from auth middleware.
*/
function finalizeResponse(response, serverTimings) {
	const res = new Response(response.body, response);
	const astroCookies = Reflect.get(response, ASTRO_COOKIES_SYMBOL);
	if (astroCookies !== void 0) Reflect.set(res, ASTRO_COOKIES_SYMBOL, astroCookies);
	if (!res.headers.has("X-Content-Type-Options")) res.headers.set("X-Content-Type-Options", "nosniff");
	if (!res.headers.has("Referrer-Policy")) res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	if (!res.headers.has("Permissions-Policy")) res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
	if (!res.headers.has("Content-Security-Policy")) res.headers.set("X-Frame-Options", "SAMEORIGIN");
	if (serverTimings && serverTimings.length > 0) res.headers.set("Server-Timing", serverTimings.map((t) => {
		const dur = Math.round(t.dur);
		return t.desc ? `${t.name};dur=${dur};desc="${t.desc}"` : `${t.name};dur=${dur}`;
	}).join(", "));
	return res;
}
/**
* Append always-on counters (db.*, cache.*) to the Server-Timing list.
*
* dur values for `count`, `hit`, `miss` are integer counts — Server-Timing
* spec only models milliseconds, but browsers show whatever number is given,
* which is the convention most projects use for non-time samples.
*/
function pushMetricsTimings(timings, metrics) {
	if (metrics.dbCount > 0) {
		timings.push({
			name: "db.total",
			dur: metrics.dbTotalMs,
			desc: "DB total"
		});
		timings.push({
			name: "db.count",
			dur: metrics.dbCount,
			desc: "Query count"
		});
		if (metrics.dbFirstOffset !== null) timings.push({
			name: "db.first",
			dur: metrics.dbFirstOffset,
			desc: "First query at"
		});
		if (metrics.dbLastOffset !== null) timings.push({
			name: "db.last",
			dur: metrics.dbLastOffset,
			desc: "Last query at"
		});
	}
	if (metrics.rpcCount > 0) timings.push({
		name: "rpc.count",
		dur: metrics.rpcCount,
		desc: "DB round trips"
	});
	if (metrics.cacheHits + metrics.cacheMisses > 0) {
		timings.push({
			name: "cache.hit",
			dur: metrics.cacheHits,
			desc: "Cache hits"
		});
		timings.push({
			name: "cache.miss",
			dur: metrics.cacheMisses,
			desc: "Cache misses"
		});
	}
}
var TRAILING_SLASH_RE = /\/$/;
/** Public routes that require the runtime (sitemap, robots.txt, etc.) */
var PUBLIC_RUNTIME_ROUTES = /* @__PURE__ */ new Set(["/sitemap.xml", "/robots.txt"]);
var SITEMAP_COLLECTION_RE = /^\/sitemap-([^/]+)\.xml$/;
/** Whether `pathname` is a per-collection sitemap a collection could have. */
function isCollectionSitemapPath(pathname) {
	const match = SITEMAP_COLLECTION_RE.exec(pathname);
	return match !== null && parseCollectionSitemapName(match[1]) !== null;
}
function isImageEndpointRequest(context) {
	const route = config_default?.imageEndpointRoute;
	return typeof route === "string" && context.routePattern === route;
}
/** The runtime's storage adapter, or null when none is configured or it cannot be created. */
function tryGetStorage(config, migrationMode) {
	try {
		return EmDashRuntime.getStorage(buildDependencies(config, migrationMode));
	} catch {
		return null;
	}
}
/**
* Run an image endpoint request on the adapter's request-scoped db. Anything
* on its path that queries (host middleware, the redirect middleware under a
* custom endpoint route) must not fall back to the per-isolate singleton: a
* request-bound connection (pg over Hyperdrive) reused by another request fails
* or hangs on workerd's cross-request I/O guard. A signed-in request also gets
* the db as `locals.emdash.db`, which the auth middleware resolves `locals.user`
* with.
*
* The adapter's `commit()` is skipped: on D1 it sets the bookmark cookie, and a
* response that sets a cookie is never stored by Workers Cache. This assumes
* nothing on the image path writes data the client must read back; the
* bookmark it sent still covers its earlier writes.
*/
async function runImageRequest(config, context, imageLocals, signedIn, metrics, next) {
	const scoped = createRequestScopedDb$1({
		config: config.database?.config,
		isAuthenticated: signedIn,
		isWrite: false,
		canUseCachedBinding: false,
		cookies: context.cookies,
		url: context.url
	});
	if (!scoped) {
		if (signedIn) try {
			const { getDb } = await import("./chunks/loader-DF6J1Fpd_DWViXqEV.mjs").then((n) => n.p);
			imageLocals.db = await getDb();
		} catch (error) {
			console.error("[emdash] image request could not open the database:", error);
		}
		return finalizeResponse(await next());
	}
	if (signedIn) imageLocals.db = scoped.db;
	const { deferredTasks, lifecycle } = coordinateScopedDbLifecycle({
		...scoped,
		commit: () => {}
	});
	const parent = getRequestContext();
	return runWithContext(parent ? {
		...parent,
		db: scoped.db,
		deferredTasks
	} : {
		editMode: false,
		db: scoped.db,
		metrics,
		deferredTasks
	}, () => finishScoped(lifecycle, async () => finalizeResponse(await next())));
}
/**
* Ask the configured database adapter for a per-request scoped Kysely. The
* adapter encapsulates any per-request semantics (D1 sessions, read-replica
* routing, bookmark cookies, etc.); core just forwards the cookie jar and
* request flags, registers the returned handle as a view of the configured
* database, and wraps next() in ALS if a scope was returned.
*/
function createRequestScopedDb$1(opts) {
	if (typeof createRequestScopedDb !== "function") return null;
	const scoped = createRequestScopedDb(opts);
	if (scoped) markRequestScopedDb(scoped.db);
	return scoped;
}
var buildDate = new Date(buildTime);
/**
* Fold the build timestamp into the route cache validator.
*
* `CacheHint.lastModified` describes the content, but the response also depends
* on the build: `/_astro/*` names are content-hashed, and a deployment only
* serves its own. Without the build dimension a code-only deploy answers a
* returning visitor's conditional request with 304, leaving them on HTML whose
* assets 404.
*
* Only a route that set a content validator gets the build dimension. The build
* alone does not move when content is published, so as a page's only validator
* it would answer every returning visitor with 304 until the next deploy.
*
* Prerendered pages are served by the host's static layer, which manages its
* own validators — only on-demand responses need the build dimension.
*
* Only forward moves are covered. `Last-Modified` expresses newer, not
* different, so after a rollback the earlier build still answers a conditional
* request with 304 and the browser stays on the newer build's HTML.
*
* Must run after next(), once the route has set its hint. Astro keeps the later
* of two dates, so a route's own hint still wins when content is newer.
* `Astro.cache.set(false)` also clears `lastModified`, so for an opted-out
* route the guard skips the build `set()` below, which would re-enable caching.
*/
function applyBuildValidator(context) {
	if (context.isPrerendered || !buildDate || !context.cache?.enabled) return;
	if (!context.cache.options.lastModified) return;
	context.cache.set({ lastModified: buildDate });
}
var UNSHARED_CACHE_CONTROL_RE = /\b(?:private|no-store)\b/i;
/**
* Route rules match by path, so a rule can cover responses rendered for a
* signed-in user or marked private by the route itself. Opting them out of the
* route cache keeps the shared edge cache from serving them to anyone else.
*
* Must run after next(): the route and its layout call `cache.set()` while
* rendering, which turns caching back on.
*/
function keepUnsharedResponsesOutOfRouteCache(context, response) {
	if (!context.cache?.enabled) return;
	if (context.locals.user || UNSHARED_CACHE_CONTROL_RE.test(response.headers.get("Cache-Control") ?? "")) context.cache.set(false);
}
var ANONYMOUS_RENDER = Symbol.for("emdash:anonymous-render");
function getPublicPageSignals(context) {
	const { url, cookies } = context;
	const base = "/".replace(TRAILING_SLASH_RE, "");
	const publicPath = base && url.pathname.startsWith(`${base}/`) ? url.pathname.slice(base.length) : url.pathname;
	return {
		publicPath,
		isEmDashRoute: url.pathname.startsWith("/_emdash"),
		isPublicRuntimeRoute: PUBLIC_RUNTIME_ROUTES.has(publicPath) || isCollectionSitemapPath(publicPath),
		hasEditCookie: !context.isPrerendered && cookies.get("emdash-edit-mode")?.value === "true",
		hasPreviewToken: url.searchParams.has("_preview"),
		hasSessionCookie: !context.isPrerendered && cookies.get(config_default?.sessionCookieName ?? "astro-session") !== void 0,
		playgroundDb: context.locals.__playgroundDb
	};
}
function isAnonymousPublicPage(signals, hasSession) {
	return !signals.isEmDashRoute && !signals.isPublicRuntimeRoute && !signals.hasEditCookie && !signals.hasPreviewToken && !hasSession && !signals.playgroundDb;
}
function canReuseAnonymousRender(context) {
	const original = context.locals[ANONYMOUS_RENDER];
	const parent = getRequestContext();
	if (!original || !parent) return false;
	if (context.request.method !== original.method) return false;
	if (context.locals.user || parent.editMode || parent.preview) return false;
	if (parent.db !== original.db || parent.metrics !== original.metrics) return false;
	if (context.request.headers.has("authorization")) return false;
	const signals = getPublicPageSignals(context);
	if (!isAnonymousPublicPage(signals, signals.hasSessionCookie)) return false;
	if (isImageEndpointRequest(context)) return false;
	if (config_default?.objectCacheEnabled && context.cache?.enabled && !parent.routeCacheFill) return false;
	return true;
}
var onRequest$6 = defineMiddleware(async (context, next) => {
	const { request, locals, cookies } = context;
	const url = context.url;
	if (!url.pathname.startsWith("/_emdash") && config_default?.authProviders) {
		if (config_default.authProviders.some((p) => p.routes?.some((r) => r.pattern && url.pathname === r.pattern))) return finalizeResponse(await next());
	}
	if (canReuseAnonymousRender(context)) return next();
	const queryRecorder = isInstrumentationEnabled() ? createRecorder(url.pathname, request.method, request.headers.get("x-perf-phase") ?? "default") : void 0;
	const metrics = createRequestMetrics(performance.now());
	const run = async () => {
		const config = getConfig();
		const migrationMode = config ? resolveConfiguredMigrationMode(config) : "auto";
		const pageSignals = getPublicPageSignals(context);
		const { publicPath, isEmDashRoute, hasEditCookie, hasPreviewToken, hasSessionCookie, playgroundDb } = pageSignals;
		const sessionUser = context.isPrerendered || !hasSessionCookie ? null : await resolveSessionUser(context.session);
		const imageStorage = config && !playgroundDb && isImageEndpointRequest(context) ? tryGetStorage(config, migrationMode) : null;
		if (config && imageStorage) {
			const imageLocals = { storage: imageStorage };
			locals.emdash = imageLocals;
			return runImageRequest(config, context, imageLocals, !!sessionUser, metrics, next);
		}
		const hasBearerAuth = !context.isPrerendered && (request.headers.get("authorization") ?? "").toLowerCase().startsWith("bearer ");
		const isWrite = request.method !== "GET" && request.method !== "HEAD";
		const isAuthenticated = !!sessionUser || hasBearerAuth;
		const endedAuthenticated = () => requestEndedAuthenticated(isAuthenticated, cookies);
		const canUseCachedBinding = !isAuthenticated && !isWrite && !playgroundDb && !isEmDashRoute && !hasEditCookie && !hasPreviewToken;
		if (isAnonymousPublicPage(pageSignals, !!sessionUser)) {
			const timings = [];
			const mwStart = performance.now();
			const initSubTimings = [];
			const runtimeInitStart = performance.now();
			const runtimeInit = config ? getRuntime(config, migrationMode, initSubTimings) : void 0;
			runtimeInit?.catch(() => {});
			let unmigrated = false;
			let probeFailed = false;
			if (migrationMode === "auto" && !isSetupVerified() && !context.isPrerendered) {
				const t0 = performance.now();
				try {
					const { getDb } = await import("./chunks/loader-DF6J1Fpd_DWViXqEV.mjs").then((n) => n.p);
					await (await getDb()).selectFrom("_emdash_migrations").selectAll().limit(1).execute();
					markSetupVerified();
				} catch (error) {
					if (isMissingTableError(error)) unmigrated = true;
					else {
						probeFailed = !getRuntimeHolder().instance;
						console.error("Setup probe failed (non-fatal):", error);
					}
				}
				timings.push({
					name: "setup",
					dur: performance.now() - t0,
					desc: "Setup probe"
				});
			}
			if (runtimeInit && !probeFailed) {
				try {
					const runtime = await runtimeInit;
					markSetupVerified();
					const handlePublicPluginApiRoute = createPublicPluginApiRouteHandler(runtime);
					const getPublicMediaUrl = providePublicMediaUrl(runtime.storage);
					locals.emdash = {
						handlePublicPluginApiRoute,
						getPublicPluginRouteMeta: (pluginId, path) => getPublicPluginRouteMeta(runtime, pluginId, path),
						collectPageMetadata: runtime.collectPageMetadata.bind(runtime),
						collectPageFragments: runtime.collectPageFragments.bind(runtime),
						getPublicMediaUrl,
						storage: runtime.storage
					};
				} catch (error) {
					if (isMigrationRequiredError(error)) return migrationRequiredErrorResponse(error);
					if (migrationMode === "manual" && isMissingTableError(error)) {
						console.error("[emdash] database schema is unavailable in manual migration mode:", error);
						return migrationRequiredResponse();
					}
					if (Date.now() - lastRuntimeInitErrorLogAt >= RUNTIME_INIT_ERROR_LOG_INTERVAL_MS) {
						lastRuntimeInitErrorLogAt = Date.now();
						console.error("[emdash] runtime init failed (page renders without CMS data):", error);
					}
				}
				timings.push({
					name: "rt",
					dur: performance.now() - runtimeInitStart,
					desc: "Runtime init"
				});
				for (const sub of initSubTimings) timings.push(sub);
			}
			if (unmigrated && !locals.emdash) return finalizeResponse(unmigratedDatabaseResponse(), timings);
			const lastContentWriteAt = canUseCachedBinding && config?.database?.needsLastContentWriteAt ? await getLastContentWriteAt() : void 0;
			const anonScoped = createRequestScopedDb$1({
				config: config?.database?.config,
				isAuthenticated,
				endedAuthenticated,
				isWrite,
				canUseCachedBinding,
				cookies,
				url,
				lastContentWriteAt
			});
			const runAnon = async () => {
				const t0 = performance.now();
				const renderLocals = locals;
				const previous = renderLocals[ANONYMOUS_RENDER];
				const scope = getRequestContext();
				renderLocals[ANONYMOUS_RENDER] = {
					method: request.method,
					db: scope?.db,
					metrics: scope?.metrics
				};
				let response;
				try {
					response = await next();
				} finally {
					if (previous) renderLocals[ANONYMOUS_RENDER] = previous;
					else delete renderLocals[ANONYMOUS_RENDER];
				}
				timings.push({
					name: "render",
					dur: performance.now() - t0,
					desc: "Page render"
				});
				timings.push({
					name: "mw",
					dur: performance.now() - mwStart,
					desc: "Total middleware"
				});
				pushMetricsTimings(timings, metrics);
				return wrapBodyForStreamMetrics(finalizeResponse(response, timings));
			};
			if (anonScoped) {
				const { deferredTasks, lifecycle } = coordinateScopedDbLifecycle(anonScoped);
				const parent = getRequestContext();
				const ctx = parent ? {
					...parent,
					db: anonScoped.db,
					deferredTasks
				} : {
					editMode: false,
					db: anonScoped.db,
					metrics,
					deferredTasks
				};
				const acceptsHtml = (request.headers.get("accept") ?? "").split(",", 1)[0].trim().startsWith("text/html");
				return runWithContext(ctx, async () => {
					if (acceptsHtml && anonScoped.db.getExecutor().adapter.supportsMultipleConnections !== false) after(() => prefetchLayoutData(context.currentLocale));
					return finishScoped(lifecycle, runAnon);
				});
			}
			return runAnon();
		}
		if (!config) {
			console.error("EmDash: No configuration found");
			return finalizeResponse(await next());
		}
		const doInit = async () => {
			let refreshPluginRoutes;
			const timings = [];
			const mwStart = performance.now();
			try {
				const initSubTimings = [];
				let t0 = performance.now();
				const runtime = await getRuntime(config, migrationMode, initSubTimings);
				const installedPluginId = publicPath.startsWith("/_emdash/api/plugins/") ? publicPath.slice(21).split("/")[0] : void 0;
				if (installedPluginId && runtime.mayNeedInstalledPluginRefresh(installedPluginId)) refreshPluginRoutes = () => runtime.refreshInstalledPluginRoute(installedPluginId);
				timings.push({
					name: "rt",
					dur: performance.now() - t0,
					desc: "Runtime init"
				});
				for (const sub of initSubTimings) timings.push(sub);
				markSetupVerified();
				locals.emdash = {
					handleContentList: runtime.handleContentList.bind(runtime),
					handleContentGet: runtime.handleContentGet.bind(runtime),
					handleContentAuthors: runtime.handleContentAuthors.bind(runtime),
					handleContentCreate: runtime.handleContentCreate.bind(runtime),
					handleContentUpdate: runtime.handleContentUpdate.bind(runtime),
					handleContentDelete: runtime.handleContentDelete.bind(runtime),
					handleContentListTrashed: runtime.handleContentListTrashed.bind(runtime),
					handleContentRestore: runtime.handleContentRestore.bind(runtime),
					handleContentPermanentDelete: runtime.handleContentPermanentDelete.bind(runtime),
					handleContentCountTrashed: runtime.handleContentCountTrashed.bind(runtime),
					handleContentGetIncludingTrashed: runtime.handleContentGetIncludingTrashed.bind(runtime),
					handleContentDuplicate: runtime.handleContentDuplicate.bind(runtime),
					handleContentPublish: runtime.handleContentPublish.bind(runtime),
					handleContentUnpublish: runtime.handleContentUnpublish.bind(runtime),
					handleContentSchedule: runtime.handleContentSchedule.bind(runtime),
					handleContentUnschedule: runtime.handleContentUnschedule.bind(runtime),
					handleContentCountScheduled: runtime.handleContentCountScheduled.bind(runtime),
					handleContentDiscardDraft: runtime.handleContentDiscardDraft.bind(runtime),
					handleContentCompare: runtime.handleContentCompare.bind(runtime),
					handleContentTranslations: runtime.handleContentTranslations.bind(runtime),
					handleMediaList: runtime.handleMediaList.bind(runtime),
					handleMediaGet: runtime.handleMediaGet.bind(runtime),
					handleMediaUpload: runtime.handleMediaUpload.bind(runtime),
					handleMediaCreate: runtime.handleMediaCreate.bind(runtime),
					handleMediaRegisterUpload: runtime.handleMediaRegisterUpload.bind(runtime),
					handleMediaUpdate: runtime.handleMediaUpdate.bind(runtime),
					...runtime.handleMediaReplaceMetadata ? { handleMediaReplaceMetadata: runtime.handleMediaReplaceMetadata.bind(runtime) } : {},
					handleMediaDelete: runtime.handleMediaDelete.bind(runtime),
					...runtime.handleCommentModerate ? { handleCommentModerate: runtime.handleCommentModerate.bind(runtime) } : {},
					handleRevisionList: runtime.handleRevisionList.bind(runtime),
					handleRevisionEditors: runtime.handleRevisionEditors.bind(runtime),
					handleRevisionGet: runtime.handleRevisionGet.bind(runtime),
					handleRevisionRestore: runtime.handleRevisionRestore.bind(runtime),
					handlePluginApiRoute: runtime.handlePluginApiRoute.bind(runtime),
					getPluginEditorExtension: runtime.getPluginEditorExtension.bind(runtime),
					getPluginEditorDraftSchema: runtime.getPluginEditorDraftSchema.bind(runtime),
					handlePublicPluginApiRoute: createPublicPluginApiRouteHandler(runtime),
					getPublicPluginRouteMeta: (pluginId, path) => getPublicPluginRouteMeta(runtime, pluginId, path),
					getPluginRouteMeta: runtime.getPluginRouteMeta.bind(runtime),
					getPluginMcpTools: runtime.getPluginMcpTools.bind(runtime),
					getEnabledPluginMcpTools: runtime.getEnabledPluginMcpTools.bind(runtime),
					serializePluginMcpConsent: runtime.serializePluginMcpConsent.bind(runtime),
					handlePluginMcpTool: runtime.handlePluginMcpTool.bind(runtime),
					handlePluginMcpDenied: runtime.handlePluginMcpDenied.bind(runtime),
					getMediaProvider: runtime.getMediaProvider.bind(runtime),
					getMediaProviderList: runtime.getMediaProviderList.bind(runtime),
					collectPageMetadata: runtime.collectPageMetadata.bind(runtime),
					collectPageFragments: runtime.collectPageFragments.bind(runtime),
					ensureSearchHealthy: runtime.ensureSearchHealthy.bind(runtime),
					storage: runtime.storage,
					get db() {
						return runtime.db;
					},
					getPublicMediaUrl: providePublicMediaUrl(runtime.storage),
					hooks: runtime.hooks,
					email: runtime.email,
					configuredPlugins: runtime.configuredPlugins,
					sandboxedPluginEntries: runtime.sandboxedPluginEntries,
					config,
					getManifest: runtime.getManifest.bind(runtime),
					rooms: runtime.rooms,
					invalidateUrlPatternCache,
					getSandboxRunner: runtime.getSandboxRunner.bind(runtime),
					isSandboxBypassed: runtime.isSandboxBypassed.bind(runtime),
					syncMarketplacePlugins: runtime.syncMarketplacePlugins.bind(runtime),
					syncRegistryPlugins: runtime.syncRegistryPlugins.bind(runtime),
					runPluginInstallLifecycle: runtime.runPluginInstallLifecycle.bind(runtime),
					runPluginActivateLifecycle: runtime.runPluginActivateLifecycle.bind(runtime),
					runPluginUninstallLifecycle: runtime.runPluginUninstallLifecycle.bind(runtime),
					getRuntimePluginSettingsSchema: runtime.getRuntimePluginSettingsSchema.bind(runtime),
					setPluginStatus: runtime.setPluginStatus.bind(runtime)
				};
			} catch (error) {
				if (isMigrationRequiredError(error)) return migrationRequiredErrorResponse(error);
				if (migrationMode === "manual" && isMissingTableError(error)) {
					console.error("[emdash] database schema is unavailable in manual migration mode:", error);
					return migrationRequiredResponse();
				}
				console.error("EmDash middleware error:", error);
				const configurationError = runtimeConfigurationErrorResponse(error, url.pathname);
				if (configurationError) return configurationError;
			}
			const lastContentWriteAt = canUseCachedBinding && config?.database?.needsLastContentWriteAt ? await getLastContentWriteAt() : void 0;
			const scoped = createRequestScopedDb$1({
				config: config?.database?.config,
				isAuthenticated,
				endedAuthenticated,
				isWrite,
				canUseCachedBinding,
				cookies: context.cookies,
				url,
				lastContentWriteAt
			});
			const renderAndFinalize = async () => {
				if (refreshPluginRoutes && publicPath.startsWith("/_emdash/api/plugins/")) try {
					await refreshPluginRoutes();
				} catch (error) {
					console.error("EmDash: Failed to refresh installed plugin routes:", error);
					return finalizeResponse(apiError("PLUGIN_SYNC_ERROR", "Plugin routes are temporarily unavailable", 503));
				}
				const t0 = performance.now();
				const response = await next();
				timings.push({
					name: "render",
					dur: performance.now() - t0,
					desc: "Page render"
				});
				timings.push({
					name: "mw",
					dur: performance.now() - mwStart,
					desc: "Total middleware"
				});
				pushMetricsTimings(timings, metrics);
				return wrapBodyForStreamMetrics(finalizeResponse(response, timings));
			};
			if (scoped) {
				const { deferredTasks, lifecycle } = coordinateScopedDbLifecycle(scoped);
				const parent = getRequestContext();
				return runWithContext(parent ? {
					...parent,
					db: scoped.db,
					deferredTasks
				} : {
					editMode: false,
					db: scoped.db,
					metrics,
					deferredTasks
				}, () => finishScoped(lifecycle, renderAndFinalize));
			}
			return renderAndFinalize();
		};
		if (playgroundDb) {
			const editMode = context.cookies.get("emdash-edit-mode")?.value === "true";
			const parent = getRequestContext();
			return runWithContext(parent ? {
				...parent,
				editMode,
				db: playgroundDb,
				dbIsIsolated: true
			} : {
				editMode,
				db: playgroundDb,
				dbIsIsolated: true,
				metrics
			}, doInit);
		}
		return doInit();
	};
	try {
		const response = await runWithContext({
			editMode: false,
			queryRecorder,
			metrics
		}, run);
		applyBuildValidator(context);
		keepUnsharedResponsesOutOfRouteCache(context, response);
		return response;
	} finally {
		if (queryRecorder && !queryRecorder.deferredFlush) flushRecorder(queryRecorder);
	}
});
// node_modules/emdash/dist/astro/middleware/redirect.mjs
/** Paths that should never be intercepted by redirects */
var SKIP_PREFIXES = ["/_emdash", "/_image"];
var FILE_EXTENSION = /\.\w{1,10}$/;
function isRedirectCode(code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
}
function warnUnsafeDestination(id) {
	console.warn(`[emdash:redirects] Skipping redirect ${id}: destination is not a site-relative path`);
}
function recordHitInBackground(repo, id) {
	after(async () => {
		try {
			await repo.recordHit(id);
		} catch (error) {
			console.error("[emdash:redirects] failed to record redirect hit:", error);
		}
	});
}
/** Exact rules first, with or without a trailing slash, then patterns in precedence order. */
function matchRedirect(cached, pathname, includePatterns = true) {
	let exact = cached.exact.get(pathname);
	if (!exact && pathname.length > 1) {
		const alt = pathname.endsWith("/") ? pathname.slice(0, -1) : `${pathname}/`;
		exact = cached.exact.get(alt);
	}
	if (exact) return {
		redirect: exact,
		destination: exact.destination
	};
	return includePatterns ? matchCachedPatterns(cached.patterns, pathname) : null;
}
/** The response for a matched rule, or null when its destination is not safe to send. */
function redirectResponse(context, repo, { redirect, destination }) {
	if (isTerminalStatus(redirect.type)) {
		recordHitInBackground(repo, redirect.id);
		return new Response(null, { status: redirect.type });
	}
	if (!isSiteRelativeDestination(destination)) {
		warnUnsafeDestination(redirect.id);
		return null;
	}
	recordHitInBackground(repo, redirect.id);
	const code = isRedirectCode(redirect.type) ? redirect.type : 301;
	return context.redirect(encodeLocation(destination), code);
}
var NON_ASCII = /[^\p{ASCII}]+/gu;
/**
* Percent-encode non-ASCII characters, since a Location header only accepts
* ByteStrings. Everything else is left as is so the path is not re-resolved.
*/
function encodeLocation(destination) {
	return destination.replace(NON_ASCII, encodeURIComponent);
}
/** Whether Astro's route cache will store the response: it does once a max age or a tag is set. */
function routeCacheStores(cache) {
	if (!cache?.enabled) return false;
	const { maxAge, tags } = cache.options;
	return maxAge !== void 0 || (tags?.length ?? 0) > 0;
}
var onRequest$5 = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;
	if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return next();
	const isFilePath = FILE_EXTENSION.test(pathname);
	let db = context.locals.emdash?.db;
	if (!db) try {
		db = await getDb();
	} catch {
		return next();
	}
	const routeCache = context.cache?.enabled ? context.cache : void 0;
	const renderedSettings = /* @__PURE__ */ new Set();
	let currentSettingsVersion;
	const checkSettings = () => {
		if (currentSettingsVersion === void 0 || renderedSettings.size === 0) return;
		if (currentSettingsVersion === null) routeCache?.set(false);
		else if ([...renderedSettings].some((v) => v !== currentSettingsVersion)) {
			routeCache?.set(false);
			invalidateSiteSettingsSnapshot();
		}
	};
	const requestSettings = { onRead(version) {
		renderedSettings.add(version);
		checkSettings();
	} };
	const finalizeSettings = async () => {
		if (!routeCacheStores(routeCache)) return;
		if (requestSettings.live) {
			if (currentSettingsVersion == null) routeCache?.set(false);
			return;
		}
		const prefetched = await peekRequestCache("siteSettingsSnapshot");
		if (prefetched) requestSettings.onRead(prefetched.version);
		const snapshot = peekSiteSettingsSnapshot();
		if (currentSettingsVersion == null) routeCache?.set(false);
		else if (!snapshot) requestSettings.version = currentSettingsVersion;
		else if (snapshot.version !== currentSettingsVersion) {
			routeCache?.set(false);
			invalidateSiteSettingsSnapshot();
		} else requestSettings.snapshot = snapshot;
	};
	const run = async () => {
		let repo;
		let source;
		let cached;
		let match = null;
		let verified = false;
		try {
			repo = new RedirectRepository(db);
			source = createRedirectSource(db, routeCache?.enabled ? (version) => {
				currentSettingsVersion = version;
				checkSettings();
			} : void 0);
			cached = await loadCachedRedirects(source);
			match = matchRedirect(cached, pathname, !isFilePath);
			if (match && routeCacheStores(routeCache)) {
				cached = await loadCachedRedirects(source, { verify: true });
				verified = true;
				match = matchRedirect(cached, pathname, !isFilePath);
			}
		} catch {
			currentSettingsVersion = null;
			routeCache?.set(false);
			return next();
		}
		if (match) {
			const redirected = redirectResponse(context, repo, match);
			if (redirected) return redirected;
		}
		const response = await next();
		if (isFilePath && !routeCacheStores(routeCache)) return response;
		try {
			if (!isFilePath && response.status === 404 && routeCacheStores(routeCache)) routeCache?.set({
				maxAge: Math.min(routeCache.options.maxAge ?? 60, 60),
				swr: 0
			});
			if (!verified && routeCacheStores(routeCache) && source && cached) {
				currentSettingsVersion = void 0;
				const current = await loadCachedRedirects(source, { verify: true }).catch(() => cached);
				if (currentSettingsVersion === void 0) {
					currentSettingsVersion = null;
					checkSettings();
				}
				const late = current === cached ? null : matchRedirect(current, pathname, !isFilePath);
				const redirected = late && redirectResponse(context, repo, late);
				if (redirected) {
					routeCache?.set(false);
					after(() => response.body?.pipeTo(new WritableStream()));
					return redirected;
				}
			}
			if (isFilePath) return response;
			try {
				await finalizeSettings();
			} catch {
				routeCache?.set(false);
			}
			const location = response.headers.get("location");
			const missedByRedirect = isRedirectCode(response.status) && (location === "/404" || location === "/404/");
			if (response.status === 404 && pathname !== "/404" && pathname !== "/404/" || missedByRedirect) {
				const referrer = context.isPrerendered ? null : context.request.headers.get("referer") ?? null;
				const userAgent = context.isPrerendered ? null : context.request.headers.get("user-agent") ?? null;
				after(async () => {
					try {
						await repo.log404({
							path: pathname,
							referrer,
							userAgent
						});
					} catch (error) {
						console.error("[emdash:redirects] failed to log 404:", error);
					}
				});
			}
		} catch (error) {
			console.error("[emdash:redirects] post-response step failed:", error);
		}
		return response;
	};
	if (!routeCache?.enabled) return run();
	const parent = getRequestContext();
	if (parent) {
		const previousSettings = parent.siteSettings;
		requestSettings.live = parent.routeCacheFill === true;
		parent.siteSettings = requestSettings;
		try {
			return await run();
		} finally {
			if (previousSettings) parent.siteSettings = previousSettings;
		}
	}
	return runWithContext({
		editMode: false,
		siteSettings: requestSettings
	}, run);
});
// node_modules/emdash/dist/astro/middleware/setup.mjs
/**
* Setup detection middleware
*
* Redirects to setup wizard if the site hasn't been set up yet.
* Checks both "emdash:setup_complete" option AND user existence.
*
* Detection logic (in order):
* 1. Does options table exist? No → setup needed
* 2. Is setup_complete true? No → setup needed
* 3. In passkey mode: Are there any users? No → setup needed
*    In Access mode: Skip user check (first user created on first login)
* 4. Proceed to admin
*/
var onRequest$4 = defineMiddleware(async (context, next) => {
	const isAdminRoute = context.url.pathname.startsWith("/_emdash/admin");
	const isSetupRoute = context.url.pathname.startsWith("/_emdash/admin/setup");
	if (isAdminRoute && !isSetupRoute) {
		const { emdash } = context.locals;
		if (!emdash?.db) return next();
		try {
			const setupComplete = await emdash.db.selectFrom("options").select("value").where("name", "=", "emdash:setup_complete").executeTakeFirst();
			if (!(setupComplete && (() => {
				try {
					const parsed = JSON.parse(setupComplete.value);
					return parsed === true || parsed === "true";
				} catch {
					return false;
				}
			})())) return context.redirect("/_emdash/admin/setup");
			if (getAuthMode(emdash.config).type === "passkey") {
				if ((await emdash.db.selectFrom("users").select((eb) => eb.fn.countAll().as("count")).executeTakeFirstOrThrow()).count === 0) return context.redirect("/_emdash/admin/setup");
			}
		} catch (error) {
			if (error instanceof Error && error.message.includes("no such table")) return context.redirect("/_emdash/admin/setup");
			console.error("Setup middleware error:", error);
		}
	}
	return next();
});
// node_modules/emdash/dist/astro/middleware/auth.mjs
/**
* CSRF protection utilities.
*
* Two mechanisms:
* 1. Custom header check (X-EmDash-Request: 1) — used for authenticated API routes.
*    Browsers block cross-origin custom headers, so presence proves same-origin.
* 2. Origin check — used for public API routes that skip auth. Compares the Origin
*    header against the request origin. Same approach as Astro's `checkOrigin`.
*/
/**
* Origin-based CSRF check for public API routes that skip auth.
*
* State-changing requests (POST/PUT/DELETE) to public endpoints must either:
*   1. Include the X-EmDash-Request: 1 header (custom header blocked cross-origin), OR
*   2. Have an Origin header matching the request origin (or the configured public origin)
*
* This prevents cross-origin form submissions (which can't set custom headers)
* and cross-origin fetch (blocked by CORS unless allowed). Same-origin requests
* always include a matching Origin header.
*
* Returns a 403 Response if the check fails, or null if allowed.
*
* @param request  The incoming request
* @param url      The request URL (internal origin)
* @param publicOrigin  The public-facing origin from config.siteUrl. Must be
*        `undefined` when absent — never `null` or `""` (security invariant H-1a).
*/
function checkPublicCsrf(request, url, publicOrigin) {
	if (request.headers.get("X-EmDash-Request") === "1") return null;
	const origin = request.headers.get("Origin");
	if (origin) {
		try {
			const originUrl = new URL(origin);
			if (originUrl.origin === url.origin) return null;
			if (publicOrigin && originUrl.origin === publicOrigin) return null;
		} catch {}
		return apiError("CSRF_REJECTED", "Cross-origin request blocked", 403);
	}
	return null;
}
/** Entrypoint constant used by the `s3()` adapter (see `astro/storage/adapters.ts`). */
var S3_ADAPTER_ENTRYPOINT = "emdash/storage/s3";
/**
* Storage entrypoints are free to shape their config however they like, so
* `endpoint` isn't a known field on `StorageDescriptor["config"]` -- only
* S3-compatible adapters (R2, S3, Minio, ...) set it. Anything else (e.g.
* local filesystem storage) simply has no `endpoint` to allow.
*
* The `s3()` adapter resolves any field omitted from its config -- including
* `endpoint` -- from the matching `S3_*` env var at runtime (see
* `storage/s3.ts`'s `resolveS3Config`). A site configured as `s3({ ... })`
* with only `S3_ENDPOINT` set has no `endpoint` in the descriptor's config,
* so fall back to that env var for S3-adapter storage. Custom adapters can
* expose their runtime upload origin through `getClientUploadOrigin()`.
*/
function getConfiguredStorageEndpoint(storage, runtimeStorage) {
	const config = storage?.config;
	if (typeof config === "object" && config !== null && "endpoint" in config) {
		const endpoint = config.endpoint;
		if (typeof endpoint === "string") return endpoint;
	}
	if (storage?.entrypoint === S3_ADAPTER_ENTRYPOINT) {
		const envEndpoint = typeof process !== "undefined" && process.env ? process.env.S3_ENDPOINT : void 0;
		if (envEndpoint) return envEndpoint;
	}
	return runtimeStorage?.getClientUploadOrigin?.();
}
function getRegistryAggregatorOrigin(registry) {
	const aggregatorUrl = typeof registry === "string" ? registry : registry?.aggregatorUrl;
	if (!aggregatorUrl) return void 0;
	try {
		const url = new URL(aggregatorUrl);
		if (url.protocol !== "http:" && url.protocol !== "https:") return void 0;
		return url.origin;
	} catch {
		return;
	}
}
function getHttpOrigin(rawUrl) {
	if (!rawUrl) return void 0;
	try {
		const url = new URL(rawUrl);
		if (url.protocol !== "http:" && url.protocol !== "https:") return void 0;
		return url.origin;
	} catch {
		return;
	}
}
function buildEmDashCsp(registry, storageEndpoint) {
	const connectSrc = ["connect-src 'self'"];
	const origins = /* @__PURE__ */ new Set();
	const registryAggregatorOrigin = getRegistryAggregatorOrigin(registry);
	if (registryAggregatorOrigin) origins.add(registryAggregatorOrigin);
	const storageOrigin = getHttpOrigin(storageEndpoint);
	if (storageOrigin) origins.add(storageOrigin);
	connectSrc.push(...origins);
	return [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline'",
		"style-src 'self' 'unsafe-inline'",
		connectSrc.join(" "),
		"form-action 'self'",
		"frame-src 'self' https:",
		"frame-ancestors 'none'",
		"img-src 'self' https: data: blob:",
		"media-src 'self' blob: https:",
		"object-src 'none'",
		"base-uri 'self'"
	].join("; ");
}
/**
* Auth middleware for admin routes
*
* Checks if the user is authenticated and has appropriate permissions.
* Supports two auth modes:
* - Passkey (default): Session-based auth with passkey login
* - External providers: JWT-based auth (Cloudflare Access, etc.)
*
* This middleware runs AFTER the setup middleware - so if we get here,
* we know setup is complete and users exist.
*/
/** Cache headers for middleware error responses (matches API_CACHE_HEADERS in api/error.ts) */
var MW_CACHE_HEADERS = { "Cache-Control": "private, no-store" };
var MCP_ENDPOINT_PATH = "/_emdash/api/mcp";
var COMMENT_SUBMISSION_PATH = /^\/_emdash\/api\/comments\/[^/]+\/[^/]+\/?$/;
function isUnsafeMethod(method) {
	return method !== "GET" && method !== "HEAD" && method !== "OPTIONS";
}
function csrfRejectedResponse() {
	return apiError("CSRF_REJECTED", "Missing required header", 403);
}
function mcpUnauthorizedResponse(url, config) {
	const origin = getPublicOrigin(url, config);
	const response = apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	response.headers.set("WWW-Authenticate", `Bearer resource_metadata="${origin}/.well-known/oauth-protected-resource"`);
	return response;
}
/**
* API routes that skip auth — each handles its own access control.
*
* Prefix entries match any path starting with that prefix.
* Entries in PUBLIC_API_EXACT match that path with or without a trailing slash.
*/
var PUBLIC_API_PREFIXES = [
	"/_emdash/api/setup",
	"/_emdash/api/auth/login",
	"/_emdash/api/auth/register",
	"/_emdash/api/auth/dev-bypass",
	"/_emdash/api/auth/signup/",
	"/_emdash/api/auth/magic-link/",
	"/_emdash/api/auth/oauth/",
	"/_emdash/api/oauth/device/token",
	"/_emdash/api/oauth/device/code",
	"/_emdash/api/oauth/token",
	"/_emdash/api/oauth/register",
	"/_emdash/api/comments/",
	"/_emdash/api/media/file/",
	"/_emdash/.well-known/"
];
var PUBLIC_API_EXACT = /* @__PURE__ */ new Set([
	"/_emdash/api/auth/invite/accept",
	"/_emdash/api/auth/invite/register-options",
	"/_emdash/api/auth/invite/complete",
	"/_emdash/api/auth/passkey/options",
	"/_emdash/api/auth/passkey/verify",
	"/_emdash/api/auth/mode",
	"/_emdash/api/health",
	"/_emdash/api/site/domain-proof",
	"/_emdash/api/oauth/token",
	"/_emdash/api/snapshot",
	"/_emdash/api/visual-editing/toolbar-labels",
	"/_emdash/api/search",
	"/_emdash/api/search/suggest"
]);
var { exact: _providerExactRoutes, prefixes: _providerPrefixRoutes } = (() => {
	const exact = /* @__PURE__ */ new Set();
	const prefixes = [];
	if (!config_default?.authProviders) return {
		exact,
		prefixes
	};
	for (const route of config_default.authProviders.flatMap((p) => p.publicRoutes ?? [])) if (route.endsWith("/")) prefixes.push(route);
	else exact.add(route);
	return {
		exact,
		prefixes
	};
})();
/**
* OAuth protocol endpoints that are CSRF-exempt by design.
*
* These are RFC-defined endpoints (RFC 6749 §3.2, RFC 7591 §3, RFC 8628 §3.1/§3.4)
* specified to be called cross-origin by external clients (MCP clients, CLIs,
* native apps). They authenticate each request on its own merits:
*
* - /oauth/token: requires PKCE code_verifier, device_code, or refresh_token
* - /oauth/register: RFC 7591 dynamic client registration — anonymous by design
* - /oauth/device/code: RFC 8628 device flow initiation — anonymous by design
* - /oauth/device/token: requires device_code the client already holds
*
* None of these rely on ambient cookie credentials, so browser-based CSRF
* attacks have nothing to exploit. The endpoints themselves advertise
* `Access-Control-Allow-Origin: *`. Note: /oauth/device/authorize (the user
* consent step) is NOT in this list — it is session-authenticated.
*/
var CSRF_EXEMPT_PUBLIC_ROUTES = /* @__PURE__ */ new Set([
	"/_emdash/api/oauth/token",
	"/_emdash/api/oauth/register",
	"/_emdash/api/oauth/device/code",
	"/_emdash/api/oauth/device/token"
]);
function stripTrailingSlash(pathname) {
	return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
function isPublicEmDashRoute(pathname) {
	const exactPathname = stripTrailingSlash(pathname);
	if (PUBLIC_API_EXACT.has(exactPathname)) return true;
	if (PUBLIC_API_PREFIXES.some((p) => pathname.startsWith(p))) return true;
	if (_providerExactRoutes.has(exactPathname)) return true;
	if (_providerPrefixRoutes.some((p) => pathname.startsWith(p))) return true;
	return false;
}
function isCsrfExemptPublicRoute(pathname) {
	return CSRF_EXEMPT_PUBLIC_ROUTES.has(stripTrailingSlash(pathname));
}
var onRequest$3 = defineMiddleware(async (context, next) => {
	const { url } = context;
	const isAdminRoute = url.pathname.startsWith("/_emdash/admin");
	const isSetupRoute = url.pathname.startsWith("/_emdash/admin/setup");
	const isApiRoute = url.pathname.startsWith("/_emdash/api");
	const isPublicApiRoute = isPublicEmDashRoute(url.pathname);
	const isPublicRoute = !isAdminRoute && !isApiRoute;
	if (isPublicApiRoute) {
		const method = context.request.method.toUpperCase();
		if (isUnsafeMethod(method) && !isCsrfExemptPublicRoute(url.pathname)) {
			const publicOrigin = getPublicOrigin(url, context.locals.emdash?.config);
			const csrfError = checkPublicCsrf(context.request, url, publicOrigin);
			if (csrfError) return csrfError;
		}
		if (method === "POST" && COMMENT_SUBMISSION_PATH.test(url.pathname)) return handlePublicRouteAuth(context, next);
		if (stripTrailingSlash(url.pathname) === "/_emdash/api/search") return handlePublicRouteAuth(context, next);
		return next();
	}
	if (url.pathname.startsWith("/_emdash/api/plugins/")) {
		const method = context.request.method.toUpperCase();
		if (method !== "GET" && method !== "HEAD" && method !== "OPTIONS") {
			const publicOrigin = getPublicOrigin(url, context.locals.emdash?.config);
			const csrfError = checkPublicCsrf(context.request, url, publicOrigin);
			if (csrfError) return csrfError;
		}
		return handlePluginRouteAuth(context, next);
	}
	if (isSetupRoute) {
		const method = context.request.method.toUpperCase();
		if (method !== "GET" && method !== "HEAD" && method !== "OPTIONS") {
			if (context.request.headers.get("X-EmDash-Request") !== "1") return apiError("CSRF_REJECTED", "Missing required header", 403);
		}
		const response = await next();
		response.headers.set("Content-Security-Policy", buildEmDashCsp(getRegistryConfigInput(context.locals.emdash?.config.registry), getConfiguredStorageEndpoint(context.locals.emdash?.config.storage, context.locals.emdash?.storage)));
		return response;
	}
	if (isPublicRoute) return handlePublicRouteAuth(context, next);
	const bearerResult = await handleBearerAuth(context);
	if (bearerResult === "invalid") {
		const response = apiError("INVALID_TOKEN", "Invalid or expired token", 401);
		if (url.pathname === "/_emdash/api/mcp") {
			const origin = getPublicOrigin(url, context.locals.emdash?.config);
			response.headers.set("WWW-Authenticate", `Bearer resource_metadata="${origin}/.well-known/oauth-protected-resource"`);
		}
		return response;
	}
	const isTokenAuth = bearerResult === "authenticated";
	const method = context.request.method.toUpperCase();
	if (url.pathname === MCP_ENDPOINT_PATH && !isTokenAuth) return mcpUnauthorizedResponse(url, context.locals.emdash?.config);
	const isOAuthConsent = url.pathname.startsWith("/_emdash/oauth/authorize");
	if (isApiRoute && !isTokenAuth && !isOAuthConsent && isUnsafeMethod(method) && !isPublicApiRoute) {
		if (context.request.headers.get("X-EmDash-Request") !== "1") return csrfRejectedResponse();
	}
	if (isTokenAuth) {
		const scopeError = enforceTokenScope(url.pathname, method, context.locals.tokenScopes);
		if (scopeError) return scopeError;
		const response = await next();
		response.headers.set("Content-Security-Policy", buildEmDashCsp(getRegistryConfigInput(context.locals.emdash?.config.registry), getConfiguredStorageEndpoint(context.locals.emdash?.config.storage, context.locals.emdash?.storage)));
		return response;
	}
	const response = await handleEmDashAuth(context, next);
	response.headers.set("Content-Security-Policy", buildEmDashCsp(getRegistryConfigInput(context.locals.emdash?.config.registry), getConfiguredStorageEndpoint(context.locals.emdash?.config.storage, context.locals.emdash?.storage)));
	return response;
});
/**
* Auth handling for /_emdash routes. Returns a Response from either
* an auth error/redirect or the downstream route handler.
*/
async function handleEmDashAuth(context, next) {
	const { url, locals } = context;
	const { emdash } = locals;
	const isPublicAdminRoute = url.pathname.startsWith("/_emdash/admin/login") || url.pathname.startsWith("/_emdash/admin/signup") || url.pathname.startsWith("/_emdash/admin/invite/accept");
	const isApiRoute = url.pathname.startsWith("/_emdash/api");
	if (!emdash?.db) return next();
	const authMode = getAuthMode(emdash.config);
	if (authMode.type === "external") return handleExternalAuth(context, next, emdash, authMode, isApiRoute);
	if (isPublicAdminRoute) return next();
	return handlePasskeyAuth(context, next, emdash, isApiRoute);
}
/**
* Plugin-route auth. Resolves the user in three steps, stopping at the first that
* applies:
*
* 1. Bearer token (all modes). A valid token authenticates; an invalid/expired one
*    returns 401 (we never silently downgrade a bad token to anonymous).
* 2. External provider — only for a *private* route in production external-auth
*    mode. Here `handleExternalAuth` is the sole authority: the provider (e.g.
*    Cloudflare Access) is re-verified on every request, so it hard-blocks with
*    401 on failure. It does persist an EmDash session (so public pages can
*    identify the user), but on these routes that session is deliberately NOT
*    consulted as a fallback — the provider check is authoritative every time.
* 3. Session — everything else (non-external mode, DEV, and all public routes).
*    This is soft: it sets `locals.user` if a session exists but never blocks.
*
* Public routes are always allowed through. The catch-all handler still enforces
* the `plugins:manage` permission and CSRF for private invocations.
*/
async function handlePluginRouteAuth(context, next) {
	const { locals, url } = context;
	const { emdash } = locals;
	try {
		const bearerResult = await handleBearerAuth(context);
		if (bearerResult === "authenticated") return next();
		if (bearerResult === "invalid") return apiError("INVALID_TOKEN", "Invalid or expired token", 401);
	} catch (error) {
		console.error("Plugin route bearer auth error:", error);
	}
	const authMode = getAuthMode(emdash?.config);
	if (emdash && authMode.type === "external" && !isPublicPluginApiRoute(url.pathname, emdash)) return handleExternalAuth(context, next, emdash, authMode, true);
	try {
		const { session } = context;
		const sessionUser = await resolveSessionUser(session);
		if (sessionUser?.id && emdash?.db) {
			const user = await createKyselyAdapter(emdash.db).getUserById(sessionUser.id);
			if (user && !user.disabled) locals.user = user;
		}
	} catch (error) {
		console.error("Plugin route session auth error:", error);
	}
	return next();
}
function isPublicPluginApiRoute(pathname, emdash) {
	const route = pathname.slice(21);
	const slashIndex = route.indexOf("/");
	if (slashIndex <= 0 || !emdash?.getPluginRouteMeta) return false;
	return emdash.getPluginRouteMeta(route.slice(0, slashIndex), route.slice(slashIndex))?.public === true;
}
/**
* Soft auth check for public routes with edit mode cookie.
* Checks the session and sets locals.user if valid, but never blocks the request.
*/
async function handlePublicRouteAuth(context, next) {
	if (context.isPrerendered || context.cookies.get(config_default?.sessionCookieName ?? "astro-session") === void 0) return next();
	const { locals, session } = context;
	const { emdash } = locals;
	try {
		const sessionUser = await resolveSessionUser(session);
		if (sessionUser?.id && emdash?.db) {
			const user = await createKyselyAdapter(emdash.db).getUserById(sessionUser.id);
			if (user && !user.disabled) locals.user = user;
		}
	} catch {}
	return next();
}
/**
* Handle external auth provider authentication (Cloudflare Access, etc.)
*/
async function handleExternalAuth(context, next, emdash, authMode, _isApiRoute) {
	const { locals, request } = context;
	try {
		throw new Error(`Auth provider ${authMode.entrypoint} does not export an authenticate function`);
	} catch (error) {
		console.error("[external-auth] Auth error:", error);
		return new Response("Authentication failed", {
			status: 401,
			headers: {
				"Content-Type": "text/plain",
				...MW_CACHE_HEADERS
			}
		});
	}
}
/**
* Try to authenticate via Bearer token (API token or OAuth token).
*
* Returns:
* - "authenticated" if token is valid and user is resolved
* - "invalid" if a token was provided but is invalid/expired
* - "none" if no Bearer token was provided
*/
async function handleBearerAuth(context) {
	const authHeader = context.request.headers.get("Authorization");
	if (!authHeader?.startsWith("Bearer ")) return "none";
	const token = authHeader.slice(7);
	if (!token) return "none";
	const { locals } = context;
	const { emdash } = locals;
	if (!emdash?.db) return "none";
	let resolved = null;
	if (token.startsWith("ec_pat_")) resolved = await resolveApiToken(emdash.db, token);
	else if (token.startsWith("ec_oat_")) resolved = await resolveOAuthToken(emdash.db, token);
	else return "invalid";
	if (!resolved) return "invalid";
	const user = await createKyselyAdapter(emdash.db).getUserById(resolved.userId);
	if (!user || user.disabled) return "invalid";
	locals.user = user;
	locals.tokenScopes = resolved.scopes;
	locals.tokenId = resolved.tokenId;
	return "authenticated";
}
/**
* Handle passkey (session-based) authentication
*/
async function handlePasskeyAuth(context, next, emdash, isApiRoute) {
	const { url, locals, session } = context;
	try {
		const sessionUser = await resolveSessionUser(session);
		if (!sessionUser?.id) {
			if (isApiRoute) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
			const loginUrl = new URL("/_emdash/admin/login", getPublicOrigin(url, emdash?.config));
			loginUrl.searchParams.set("redirect", url.pathname + url.search);
			return context.redirect(loginUrl.toString());
		}
		const user = await createKyselyAdapter(emdash.db).getUserById(sessionUser.id);
		if (!user) {
			session?.destroy();
			if (isApiRoute) return apiError("NOT_FOUND", "User not found", 401);
			const loginUrl = new URL("/_emdash/admin/login", getPublicOrigin(url, emdash?.config));
			return context.redirect(loginUrl.toString());
		}
		if (user.disabled) {
			session?.destroy();
			if (isApiRoute) return apiError("ACCOUNT_DISABLED", "Account disabled", 403);
			const loginUrl = new URL("/_emdash/admin/login", getPublicOrigin(url, emdash?.config));
			loginUrl.searchParams.set("error", "account_disabled");
			return context.redirect(loginUrl.toString());
		}
		locals.user = user;
	} catch (error) {
		console.error("Auth middleware error:", error);
		return context.redirect("/_emdash/admin/login");
	}
	return next();
}
/**
* Scope rules: ordered list of (pathPrefix, method, requiredScope) tuples.
* First matching rule wins. Methods: "*" = any, "WRITE" = POST/PUT/PATCH/DELETE.
* A list of scopes is satisfied by holding any one of them.
*
* Routes not matched by any rule default to "admin" scope (fail-closed).
*/
var SCOPE_RULES = [
	[
		"/_emdash/api/content",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/content",
		"WRITE",
		"content:write"
	],
	[
		"/_emdash/api/media/file",
		"*",
		"media:read"
	],
	[
		"/_emdash/api/media",
		"GET",
		"media:read"
	],
	[
		"/_emdash/api/media",
		"WRITE",
		"media:write"
	],
	[
		"/_emdash/api/schema",
		"GET",
		"schema:read"
	],
	[
		"/_emdash/api/schema",
		"WRITE",
		"schema:write"
	],
	[
		"/_emdash/api/taxonomies",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/taxonomies/bulk-tag",
		"WRITE",
		"content:write"
	],
	[
		"/_emdash/api/taxonomies",
		"WRITE",
		"taxonomies:manage"
	],
	[
		"/_emdash/api/menus",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/menus",
		"WRITE",
		"menus:manage"
	],
	[
		"/_emdash/api/sections",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/sections",
		"WRITE",
		"content:write"
	],
	[
		"/_emdash/api/widget-areas",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/widget-areas",
		"WRITE",
		"content:write"
	],
	[
		"/_emdash/api/revisions",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/revisions",
		"WRITE",
		"content:write"
	],
	[
		"/_emdash/api/search",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/search",
		"WRITE",
		"admin"
	],
	[
		"/_emdash/api/admin/transfer",
		"*",
		TRANSFER_SCOPES
	],
	[
		"/_emdash/api/import",
		"*",
		"admin"
	],
	[
		"/_emdash/api/admin",
		"*",
		"admin"
	],
	[
		"/_emdash/api/plugins",
		"*",
		"admin"
	],
	[
		"/_emdash/api/redirects/404s",
		"GET",
		"settings:read"
	],
	[
		"/_emdash/api/redirects/404s",
		"WRITE",
		"settings:manage"
	],
	[
		"/_emdash/api/redirects",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/redirects",
		"WRITE",
		"settings:manage"
	],
	[
		"/_emdash/api/settings/backups",
		"*",
		"admin"
	],
	[
		"/_emdash/api/settings",
		"GET",
		"settings:read"
	],
	[
		"/_emdash/api/settings",
		"WRITE",
		"settings:manage"
	]
];
var WRITE_METHODS = /* @__PURE__ */ new Set([
	"POST",
	"PUT",
	"PATCH",
	"DELETE"
]);
/**
* Enforce API token scopes based on the request URL and HTTP method.
* Returns a 403 Response if the scope is insufficient, or null if allowed.
*
* Session-authenticated requests (tokenScopes === undefined) are never checked.
*/
function enforceTokenScope(pathname, method, tokenScopes) {
	if (!tokenScopes) return null;
	if (pathname === MCP_ENDPOINT_PATH) return null;
	const isWrite = WRITE_METHODS.has(method);
	for (const [prefix, ruleMethod, scope] of SCOPE_RULES) {
		if (pathname !== prefix && !pathname.startsWith(prefix + "/")) continue;
		if (ruleMethod === "*" || ruleMethod === "WRITE" && isWrite || ruleMethod === method) {
			const anyOf = typeof scope === "string" ? [scope] : scope;
			if (anyOf.some((required) => hasScope(tokenScopes, required))) return null;
			return apiError("INSUFFICIENT_SCOPE", `Token lacks required scope: ${anyOf.join(" or ")}`, 403);
		}
	}
	if (hasScope(tokenScopes, "admin")) return null;
	return apiError("INSUFFICIENT_SCOPE", "Token lacks required scope: admin", 403);
}
// node_modules/emdash/dist/astro/middleware/media-usage-write-fence.mjs
var API_PREFIX = "/_emdash/api/";
/** Write paths that media usage activation fences, in addition to transfer imports. */
var MEDIA_USAGE_FENCED_PATHS = [
	"/_emdash/api/content",
	"/_emdash/api/schema",
	"/_emdash/api/admin/media-usage/repair",
	"/_emdash/api/revisions",
	"/_emdash/api/import"
];
/**
* API write paths a transfer import does not fence: the transfer API itself,
* sign-in and identity management, and dev-only tooling. The MCP endpoint
* fences each tool call itself (`mcp/server.ts`), since every MCP request is
* a POST whether the tool reads or writes.
*/
var TRANSFER_EXEMPT_PATHS = [
	"/_emdash/api/admin/transfer",
	"/_emdash/api/mcp",
	"/_emdash/api/auth",
	"/_emdash/api/oauth",
	"/_emdash/api/well-known",
	"/_emdash/api/admin/users",
	"/_emdash/api/admin/api-tokens",
	"/_emdash/api/admin/oauth-clients",
	"/_emdash/api/admin/allowed-domains",
	"/_emdash/api/setup/dev-bypass",
	"/_emdash/api/setup/dev-reset",
	"/_emdash/api/dev",
	"/_emdash/api/typegen"
];
/**
* Entry edit locks coordinate editors and hold no portable data, so neither a
* transfer import nor a running export cares about them.
*/
var ENTRY_LOCK_PATTERN = /^\/_emdash\/api\/content\/[^/]+\/[^/]+\/lock$/;
/** Joining a co-editing room writes no content. */
var ROOM_JOIN_PATTERN = /^\/_emdash\/api\/content\/[^/]+\/[^/]+\/room$/;
/**
* Plugin lifecycle routes check the site write fence themselves, after
* authorization; fencing them here as well would query it twice. Their
* successful writes are still recorded for running exports.
*/
var ROUTE_CHECKED_PATTERNS = [
	/^\/_emdash\/api\/admin\/plugins\/[^/]+\/(?:enable|disable|uninstall|update)$/,
	/^\/_emdash\/api\/admin\/plugins\/marketplace\/[^/]+\/install$/,
	/^\/_emdash\/api\/admin\/plugins\/registry\/[^/]+\/(?:uninstall|update)$/,
	/^\/_emdash\/api\/admin\/plugins\/registry\/install$/
];
var SAFE_METHODS = /* @__PURE__ */ new Set([
	"GET",
	"HEAD",
	"OPTIONS"
]);
var SLASH = 47;
function underPrefix(pathname, prefix) {
	return pathname === prefix || pathname.startsWith(`${prefix}/`);
}
function normalizePathname(pathname) {
	let decoded = pathname;
	try {
		decoded = decodeURI(pathname);
	} catch {}
	return trimTrailingSlashes(decoded.toLowerCase());
}
function trimTrailingSlashes(path) {
	let end = path.length;
	while (end > 0 && path.charCodeAt(end - 1) === SLASH) end--;
	return path.slice(0, end);
}
/** Which fences apply to a request, or null when it is not a site write. */
function siteWriteFenceScope(method, pathname) {
	if (SAFE_METHODS.has(method.toUpperCase())) return null;
	const path = normalizePathname(pathname);
	if (!path.startsWith(API_PREFIX)) return null;
	if (ROOM_JOIN_PATTERN.test(path)) return null;
	if (ROUTE_CHECKED_PATTERNS.some((pattern) => pattern.test(path))) return {
		transfer: false,
		mediaUsage: false,
		recordWrite: true
	};
	const entryLock = ENTRY_LOCK_PATTERN.test(path);
	const transfer = !entryLock && !TRANSFER_EXEMPT_PATHS.some((prefix) => underPrefix(path, prefix));
	const mediaUsage = MEDIA_USAGE_FENCED_PATHS.some((prefix) => underPrefix(path, prefix));
	if (!transfer && !mediaUsage) return null;
	return {
		transfer,
		mediaUsage,
		recordWrite: !entryLock
	};
}
var onRequest$2 = defineMiddleware(async (context, next) => {
	const scope = siteWriteFenceScope(context.request.method, context.url.pathname);
	if (!scope) return next();
	const db = context.locals.emdash?.db;
	if (!db) return next();
	if (!scope.transfer && !scope.mediaUsage) {
		const response = await next();
		if (response.ok) await recordSiteWrite(db);
		return response;
	}
	const fence = await readSiteWriteFence(db, scope);
	if (fence.error) return apiError(fence.error.code, fence.error.message, fence.error.status);
	const response = await next();
	if (scope.recordWrite && fence.exportRunning && response.ok) await recordSiteWrite(db);
	return response;
});
// node_modules/emdash/dist/astro/middleware/request-context.mjs
/**
* EmDash Toolbar Bootstrap (toolbar: "client")
*
* A tiny script injected into every public HTML response when the client
* toolbar mode is enabled. It is identical for every visitor, so the HTML
* stays fully cacheable by shared caches (Workers Cache, Cache Everything,
* Fastly, Varnish, …).
*
* Behavior: if this browser has logged into the admin (non-secret
* localStorage flag set by the admin SPA), render a small "Edit" pill.
* Clicking it verifies the session server-side and reloads the page with the
* `_edit` query param — that URL is always rendered fresh with the full
* server-side toolbar. Logged-out browsers pay one localStorage read and
* nothing else.
*/
/**
* Non-secret localStorage flag set by the admin SPA when an editor session
* exists in this browser. It only means "a session may exist" — the click
* handler verifies the real session before entering edit mode. The literal
* is duplicated in `@emdash-cms/admin` (Shell/Header), which cannot import
* from core.
*/
var EDITOR_FLAG_KEY = "emdash-editor";
/**
* localStorage flag set when the user dismisses the toolbar in this browser.
* Cleared the next time an editor opens the admin. Also duplicated in
* `@emdash-cms/admin`.
*/
var TOOLBAR_DISMISSED_KEY = "emdash-toolbar-dismissed";
/** Localized bootstrap labels written by the admin SPA for this browser. */
var TOOLBAR_LABELS_KEY = "emdash-toolbar-labels";
/**
* Query param that requests a fresh (never cached) editor render. Presence is
* verified server-side: non-editors are redirected to the canonical URL.
*/
var EDIT_PARAM = "_edit";
function renderToolbarBootstrap() {
	return `
<!-- EmDash Toolbar Bootstrap -->
<script>
(function mountToolbar() {
  var flag, dismissed, labelsRaw;
  var labels = null;
  try {
    flag = localStorage.getItem("${EDITOR_FLAG_KEY}");
    dismissed = localStorage.getItem("${TOOLBAR_DISMISSED_KEY}");
    labelsRaw = localStorage.getItem("${TOOLBAR_LABELS_KEY}");
  } catch (e) {
    return;
  }
  if (!flag || dismissed) return;
  if (labelsRaw) {
    try {
      var storedLabels = JSON.parse(labelsRaw);
      if (storedLabels && typeof storedLabels.editMode === "string" && typeof storedLabels.hideToolbar === "string") {
        labels = storedLabels;
      }
    } catch (e) {}
  }
  if (!labels) {
    fetch("/_emdash/api/visual-editing/toolbar-labels", { credentials: "same-origin" })
      .then(function(response) { return response.ok ? response.json() : null; })
      .then(function(body) {
        var fetched = body && body.data;
        if (!fetched || typeof fetched.editMode !== "string" || typeof fetched.hideToolbar !== "string") return;
        try { localStorage.setItem("${TOOLBAR_LABELS_KEY}", JSON.stringify(fetched)); } catch (e) { return; }
        mountToolbar();
      })
      .catch(function() {});
    return;
  }
  // The server toolbar is present on _edit / edit-mode / preview renders.
  if (document.getElementById("emdash-toolbar")) return;

  var root = document.createElement("div");
  root.id = "emdash-toolbar-bootstrap";
  root.style.cssText = "position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;line-height:1;-webkit-font-smoothing:antialiased;";

  var inner = document.createElement("div");
  inner.style.cssText = "display:flex;align-items:center;gap:10px;padding:8px 16px;background:#1a1a1a;color:#e0e0e0;border-radius:999px;box-shadow:0 4px 24px rgba(0,0,0,0.3),0 0 0 1px rgba(255,255,255,0.08);white-space:nowrap;user-select:none;";

  var logo = document.createElement("span");
  logo.textContent = "EmDash";
  logo.style.cssText = "font-weight:600;font-size:12px;letter-spacing:0.02em;color:#fff;opacity:0.7;";

  var divider = document.createElement("span");
  divider.style.cssText = "width:1px;height:16px;background:rgba(255,255,255,0.15);";

  var editBtn = document.createElement("button");
  editBtn.textContent = labels.editMode;
  editBtn.style.cssText = "padding:4px 12px;background:#3b82f6;color:#fff;border:none;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;";

  var closeBtn = document.createElement("button");
  closeBtn.textContent = "\\u00d7";
  closeBtn.title = labels.hideToolbar;
  closeBtn.setAttribute("aria-label", labels.hideToolbar);
  closeBtn.style.cssText = "background:none;border:none;color:#666;cursor:pointer;font-size:16px;padding:0 2px;line-height:1;font-family:inherit;";

  editBtn.addEventListener("click", function() {
    editBtn.disabled = true;
    fetch("/_emdash/api/auth/me", {
      credentials: "same-origin",
      headers: { "X-EmDash-Request": "1" }
    })
    .then(function(r) { return r.ok ? r.json() : null; })
    .then(function(body) {
      var user = body && body.data;
      if (user && user.role >= 30) {
        var u = new URL(location.href);
        u.searchParams.set("${EDIT_PARAM}", "1");
        location.href = u.toString();
      } else if (user) {
        // Logged in but not an editor — the flag is stale for this browser.
        try { localStorage.removeItem("${EDITOR_FLAG_KEY}"); } catch (e) {}
        root.remove();
      } else {
        // No session — go to the admin login page.
        location.href = "/_emdash/admin/login";
      }
    })
    .catch(function() {
      editBtn.disabled = false;
    });
  });

  closeBtn.addEventListener("click", function() {
    try { localStorage.setItem("${TOOLBAR_DISMISSED_KEY}", "1"); } catch (e) {}
    root.remove();
  });

  inner.appendChild(logo);
  inner.appendChild(divider);
  inner.appendChild(editBtn);
  inner.appendChild(closeBtn);
  root.appendChild(inner);
  document.body.appendChild(root);
})();
<\/script>
`;
}
var SCRIPT_LINE_SEPARATOR_RE = /\u2028/g;
var SCRIPT_PARAGRAPH_SEPARATOR_RE = /\u2029/g;
function inlineScriptJson(value) {
	return JSON.stringify(value).replaceAll("<", "\\u003c").replace(SCRIPT_LINE_SEPARATOR_RE, "\\u2028").replace(SCRIPT_PARAGRAPH_SEPARATOR_RE, "\\u2029");
}
function renderToolbar(config) {
	const { editMode, isPreview, actionToken = "", labels, hidden = false } = config;
	const recoveryBadge = `<span class="emdash-tb-badge emdash-tb-badge--error">${escapeHtml(labels.sessionExpired)}</span>`;
	return `
<!-- EmDash Visual Editing Toolbar -->
<div id="emdash-toolbar" data-edit-mode="${editMode}" data-preview="${isPreview}"${hidden ? " hidden" : ""}>
  <div class="emdash-tb-inner">
    <span class="emdash-tb-logo">EmDash</span>

    <div class="emdash-tb-divider"></div>

    <label class="emdash-tb-toggle" title="${escapeHtml(labels.editMode)}">
      <input type="checkbox" id="emdash-edit-toggle" ${editMode ? "checked" : ""} />
      <span class="emdash-tb-toggle-track">
        <span class="emdash-tb-toggle-thumb"></span>
      </span>
      <span class="emdash-tb-toggle-label">${escapeHtml(labels.editMode)}</span>
    </label>

    <span class="emdash-tb-status" id="emdash-tb-status"></span>

    <span class="emdash-tb-save-status" id="emdash-tb-save-status"></span>

    <a class="emdash-tb-admin" id="emdash-tb-admin" href="#" style="display:none" title="${escapeHtml(labels.openInAdmin)}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    </a>

    <button class="emdash-tb-publish" id="emdash-tb-publish" style="display:none">${escapeHtml(labels.publish)}</button>

    <button class="emdash-tb-dismiss" id="emdash-tb-dismiss" title="${escapeHtml(labels.hideToolbar)}" aria-label="${escapeHtml(labels.hideToolbar)}">&times;</button>
  </div>
</div>

<style>
  #emdash-toolbar {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 13px;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }

  .emdash-tb-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    background: #1a1a1a;
    color: #e0e0e0;
    border-radius: 999px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08);
    white-space: nowrap;
    user-select: none;
  }

  .emdash-tb-logo {
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.02em;
    color: #fff;
    opacity: 0.7;
  }

  .emdash-tb-divider {
    width: 1px;
    height: 16px;
    background: rgba(255,255,255,0.15);
  }

  /* Toggle switch */
  .emdash-tb-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .emdash-tb-toggle input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .emdash-tb-toggle-track {
    position: relative;
    width: 32px;
    height: 18px;
    background: #444;
    border-radius: 9px;
    transition: background 0.2s;
  }

  .emdash-tb-toggle input:checked + .emdash-tb-toggle-track {
    background: #3b82f6;
  }

  .emdash-tb-toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
  }

  .emdash-tb-toggle input:checked + .emdash-tb-toggle-track .emdash-tb-toggle-thumb {
    transform: translateX(14px);
  }

  .emdash-tb-toggle-label {
    font-size: 12px;
    color: #aaa;
  }

  .emdash-tb-toggle input:checked ~ .emdash-tb-toggle-label {
    color: #fff;
  }

  /* Status area — flex for multiple badges */
  .emdash-tb-status {
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }

  /* Badges */
  .emdash-tb-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .emdash-tb-badge--preview {
    background: rgba(139,92,246,0.2);
    color: #a78bfa;
  }

  .emdash-tb-badge--draft {
    background: rgba(245,158,11,0.2);
    color: #fbbf24;
  }

  .emdash-tb-badge--published {
    background: rgba(34,197,94,0.2);
    color: #4ade80;
  }

  .emdash-tb-badge--pending {
    background: rgba(59,130,246,0.2);
    color: #60a5fa;
  }

  .emdash-tb-badge--unsaved {
    background: rgba(245,158,11,0.2);
    color: #fbbf24;
  }

  .emdash-tb-badge--saving {
    background: rgba(148,163,184,0.2);
    color: #94a3b8;
  }

  .emdash-tb-badge--saved {
    background: rgba(34,197,94,0.2);
    color: #4ade80;
    transition: opacity 0.3s;
  }

  .emdash-tb-badge--error {
    background: rgba(239,68,68,0.2);
    color: #f87171;
  }

  /* Admin link */
  .emdash-tb-admin {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #888;
    text-decoration: none;
    padding: 2px;
    border-radius: 4px;
    transition: color 0.15s;
  }

  .emdash-tb-admin:hover {
    color: #fff;
  }

  /* Publish button */
  .emdash-tb-publish {
    padding: 4px 12px;
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
    font-family: inherit;
  }

  .emdash-tb-publish:hover {
    background: #2563eb;
  }

  .emdash-tb-publish:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Dismiss button */
  .emdash-tb-dismiss {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 2px;
    font-family: inherit;
    transition: color 0.15s;
  }

  .emdash-tb-dismiss:hover {
    color: #fff;
  }

  /* Edit mode: editable hover styles — uses :has() to check toolbar state */
  body:has(#emdash-toolbar[data-edit-mode="true"]) [data-emdash-ref] {
    transition: box-shadow 0.15s, background-color 0.15s;
  }

  body:has(#emdash-toolbar[data-edit-mode="true"]) [data-emdash-ref]:hover {
    box-shadow: 0 0 0 2px rgba(59,130,246,0.5);
    border-radius: 4px;
    background-color: rgba(59,130,246,0.04);
    cursor: text;
  }

  /* Active editing state — override hover pencil cursor */
  [data-emdash-editing] {
    box-shadow: 0 0 0 2px #3b82f6 !important;
    border-radius: 4px !important;
    background-color: rgba(59,130,246,0.04) !important;
    cursor: text !important;
  }

  /* Suppress browser focus ring on contenteditable and tiptap editor */
  [data-emdash-editing]:focus,
  [data-emdash-ref] .tiptap:focus,
  [data-emdash-ref] .ProseMirror:focus {
    outline: none !important;
  }

  /* Image editor popover */
  .emdash-img-popover {
    position: fixed;
    z-index: 1000000;
    background: #1a1a1a;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08);
    color: #e0e0e0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 13px;
    width: 320px;
    overflow: hidden;
    animation: emdash-img-fadein 0.15s ease-out;
  }

  @keyframes emdash-img-fadein {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .emdash-img-popover-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .emdash-img-popover-title {
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #999;
  }

  .emdash-img-popover-close {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 2px;
    line-height: 1;
    font-size: 16px;
    border-radius: 4px;
    transition: color 0.15s;
  }

  .emdash-img-popover-close:hover {
    color: #fff;
  }

  .emdash-img-popover-body {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .emdash-img-preview {
    width: 100%;
    max-height: 160px;
    object-fit: contain;
    border-radius: 6px;
    background: #111;
  }

  .emdash-img-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    border: 2px dashed rgba(255,255,255,0.15);
    border-radius: 6px;
    color: #666;
    font-size: 12px;
  }

  .emdash-img-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .emdash-img-field label {
    font-size: 11px;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .emdash-img-field input[type="text"] {
    background: #111;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 6px;
    color: #e0e0e0;
    padding: 6px 8px;
    font-size: 13px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
  }

  .emdash-img-field input[type="text"]:focus {
    border-color: #3b82f6;
  }

  .emdash-img-actions {
    display: flex;
    gap: 6px;
  }

  .emdash-img-btn {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 6px;
    background: #222;
    color: #e0e0e0;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    text-align: center;
    white-space: nowrap;
  }

  .emdash-img-btn:hover {
    background: #333;
    border-color: rgba(255,255,255,0.2);
  }

  .emdash-img-btn--primary {
    background: #3b82f6;
    border-color: #3b82f6;
    color: #fff;
  }

  .emdash-img-btn--primary:hover {
    background: #2563eb;
    border-color: #2563eb;
  }

  .emdash-img-btn--danger {
    color: #f87171;
    border-color: rgba(248,113,113,0.3);
  }

  .emdash-img-btn--danger:hover {
    background: rgba(248,113,113,0.1);
    border-color: rgba(248,113,113,0.5);
  }

  /* Media browser within the popover */
  .emdash-img-browser {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 12px;
  }

  .emdash-img-browser-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .emdash-img-browser-title {
    font-size: 12px;
    font-weight: 600;
    color: #999;
  }

  .emdash-img-browser-back {
    background: none;
    border: none;
    color: #3b82f6;
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    padding: 2px 4px;
  }

  .emdash-img-browser-back:hover {
    text-decoration: underline;
  }

  .emdash-img-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    max-height: 240px;
    overflow-y: auto;
  }

  .emdash-img-grid-item {
    aspect-ratio: 1;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.15s;
    background: #111;
  }

  .emdash-img-grid-item:hover {
    border-color: rgba(59,130,246,0.5);
  }

  .emdash-img-grid-item--selected {
    border-color: #3b82f6;
  }

  .emdash-img-grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .emdash-img-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    color: #666;
    font-size: 12px;
  }

  .emdash-img-drop {
    border: 2px dashed #3b82f6;
    background: rgba(59,130,246,0.05);
  }

  .emdash-img-uploading {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    color: #999;
    font-size: 12px;
  }

  .emdash-img-popover-backdrop {
    position: fixed;
    inset: 0;
    z-index: 999999;
  }
</style>

<script>
(function() {
  var toolbar = document.getElementById("emdash-toolbar");
  var toggle = document.getElementById("emdash-edit-toggle");
  var statusEl = document.getElementById("emdash-tb-status");
  var saveStatusEl = document.getElementById("emdash-tb-save-status");
  var publishBtn = document.getElementById("emdash-tb-publish");
  if (!toolbar || !toggle || !statusEl || !publishBtn || !saveStatusEl) return;

  // Dismissed in this browser (localStorage flag, cleared on the next admin
  // visit). Remove the toolbar entirely instead of rendering it.
  try {
    if (localStorage.getItem("emdash-toolbar-dismissed")) {
      toolbar.remove();
      return;
    }
  } catch (e) {
    // localStorage unavailable — render normally
  }

  var isEditMode = toolbar.getAttribute("data-edit-mode") === "true";
  var visualActionToken = ${inlineScriptJson(actionToken)};
  var visualActionTokenErrorCode = ${inlineScriptJson(VISUAL_ACTION_TOKEN_INVALID)};
  var toolbarLabels = ${inlineScriptJson(labels)};
  var visualActionRefreshTimer = null;

  function showVisualActionRecovery() {
    waitingForPublish = false;
    if (visualActionRefreshTimer !== null) clearTimeout(visualActionRefreshTimer);
    visualActionRefreshTimer = null;
    statusEl.innerHTML = ${inlineScriptJson(recoveryBadge)};
    publishBtn.disabled = true;
    publishBtn.textContent = toolbarLabels.refreshPage;
  }

  function showPublishError(message) {
    waitingForPublish = false;
    statusEl.textContent = message || toolbarLabels.publishFailed;
    publishBtn.disabled = false;
    publishBtn.textContent = toolbarLabels.publish;
  }

  function scheduleVisualActionTokenRefresh(delay) {
    if (visualActionRefreshTimer !== null) clearTimeout(visualActionRefreshTimer);
    visualActionRefreshTimer = setTimeout(function() {
      visualActionRefreshTimer = null;
      refreshVisualActionToken();
    }, delay);
  }

  function refreshVisualActionToken() {
    return ecFetch("/_emdash/api/visual-editing/action-token", {
      method: "POST",
      credentials: "same-origin",
      headers: { "X-EmDash-Visual-Action": visualActionToken },
    })
    .then(function(res) {
      if (res.status === 401 || res.status === 403) {
        showVisualActionRecovery();
        return null;
      }
      if (!res.ok) throw new Error("Visual action token renewal failed");
      return res.json();
    })
    .then(function(body) {
      if (!body) return;
      if (!body.data || !body.data.token) throw new Error("Visual action token renewal returned no token");
      visualActionToken = body.data.token;
      scheduleVisualActionTokenRefresh(240000);
    })
    .catch(function(error) {
      console.error("Visual action token renewal failed:", error);
      scheduleVisualActionTokenRefresh(30000);
    });
  }

  if (visualActionToken) scheduleVisualActionTokenRefresh(240000);

  var dismissBtn = document.getElementById("emdash-tb-dismiss");
  if (dismissBtn) {
    dismissBtn.addEventListener("click", function() {
      try { localStorage.setItem("emdash-toolbar-dismissed", "1"); } catch (e) {}
      // Dismissing while edit mode is on would strand the user in edit mode
      // with no UI to leave it — clear the cookie too.
      if (isEditMode) {
        document.cookie = "emdash-edit-mode=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        toolbar.remove();
        location.replace(location.href);
        return;
      }
      toolbar.remove();
    });
  }

  // CSRF-protected fetch — adds X-EmDash-Request header to all API calls
  function ecFetch(url, init) {
    init = init || {};
    init.headers = Object.assign({ "X-EmDash-Request": "1" }, init.headers || {});
    return fetch(url, init);
  }

  // --- Save status tracking ---
  var saveState = "idle"; // idle | unsaved | saving | saved | error
  var saveHideTimer = null;
  var pendingSaves = [];
  var waitingForPublish = false;

  function trackSave(save) {
    var settled = save.then(untrack, untrack);
    function untrack() {
      pendingSaves = pendingSaves.filter(function(pending) { return pending !== settled; });
    }
    pendingSaves.push(settled);
  }

  function badgeHtml(kind, label) {
    return '<span class="emdash-tb-badge emdash-tb-badge--' + kind + '">' + escapeAttr(label) + '</span>';
  }

  function setSaveState(state) {
    saveState = state;
    clearTimeout(saveHideTimer);

    switch (state) {
      case "unsaved":
        saveStatusEl.innerHTML = badgeHtml("unsaved", toolbarLabels.unsaved);
        break;
      case "saving":
        saveStatusEl.innerHTML = badgeHtml("saving", toolbarLabels.saving);
        break;
      case "saved":
        saveStatusEl.innerHTML = badgeHtml("saved", toolbarLabels.saved);
        saveHideTimer = setTimeout(function() {
          saveStatusEl.innerHTML = "";
          saveState = "idle";
        }, 2000);
        break;
      case "error":
        saveStatusEl.innerHTML = badgeHtml("error", toolbarLabels.saveFailed);
        saveHideTimer = setTimeout(function() {
          saveStatusEl.innerHTML = "";
          saveState = "idle";
        }, 3000);
        break;
      default:
        saveStatusEl.innerHTML = "";
    }
  }

  // Listen for save events from inline editors (e.g. PT editor)
  document.addEventListener("emdash:save", function(e) {
    var detail = e.detail || {};
    if (detail.state) {
      setSaveState(detail.state);
    }
  });

  // The inline Portable Text editor sends its own save requests and reports
  // each one here, so publish() can wait for it.
  document.addEventListener("emdash:save-pending", function(e) {
    if (e.detail && e.detail.done) {
      trackSave(e.detail.done);
    }
  });

  document.addEventListener("emdash:content-changed", function(e) {
    var detail = e.detail || {};
    if (detail.collection && detail.id) {
      showUnpublishedChanges(detail.collection, detail.id);
    }
  });

  // --- Entry status ---
  var pendingEntries = new Map();

  function entryKey(collection, id) {
    return JSON.stringify([collection, id]);
  }

  function updateStatus() {
    if (!isEditMode) {
      statusEl.innerHTML = "";
      publishBtn.style.display = "none";
      return;
    }

    var hasDraft = false;
    var hasPublished = false;
    var adminRef = null;
    document.querySelectorAll("[data-emdash-ref]").forEach(function(element) {
      try {
        var ref = JSON.parse(element.getAttribute("data-emdash-ref"));
        if (!ref || !ref.collection || !ref.id || !ref.status) return;
        if (!adminRef) adminRef = ref;
        if (ref.status === "draft" || (ref.status === "published" && ref.hasDraft)) {
          pendingEntries.set(entryKey(ref.collection, ref.id), ref);
        }
        if (ref.status === "draft") hasDraft = true;
        if (ref.status === "published") hasPublished = true;
      } catch (e) {
        // ignore parse errors
      }
    });

    var adminLink = document.getElementById("emdash-tb-admin");
    if (adminLink && adminRef) {
      adminLink.href = "/_emdash/admin/content/" + encodeURIComponent(adminRef.collection) + "/" + encodeURIComponent(adminRef.id);
      adminLink.target = adminWindowName(adminRef.collection, adminRef.id);
      adminLink.style.display = "";
    }

    if (hasDraft) {
      statusEl.innerHTML = badgeHtml("draft", toolbarLabels.draft);
    } else if (pendingEntries.size) {
      statusEl.innerHTML = badgeHtml("pending", toolbarLabels.unpublishedChanges);
    } else if (hasPublished) {
      statusEl.innerHTML = badgeHtml("published", toolbarLabels.published);
    } else {
      statusEl.innerHTML = "";
    }
    publishBtn.style.display = pendingEntries.size ? "" : "none";
  }

  publishBtn.onclick = function() { publish(); };

  // Publish action
  function publish(failedEntries, publishError) {
    failedEntries = failedEntries || new Set();
    waitingForPublish = true;
    publishBtn.disabled = true;
    publishBtn.textContent = toolbarLabels.publishing;

    if (pendingSaves.length) {
      Promise.all(pendingSaves).then(function() { publish(failedEntries, publishError); });
      return;
    }

    var next = Array.from(pendingEntries.entries()).find(function(entry) {
      return !failedEntries.has(entry[0]);
    });
    if (!next) {
      if (failedEntries.size) {
        showPublishError(publishError);
        return;
      }
      if (document.startViewTransition) {
        document.startViewTransition(function() { location.reload(); });
      } else {
        location.reload();
      }
      return;
    }

    var key = next[0];
    var ref = next[1];
    ecFetch("/_emdash/api/visual-editing/content/" + encodeURIComponent(ref.collection) + "/" + encodeURIComponent(ref.id) + "/publish", {
      method: "POST",
      credentials: "same-origin",
      headers: { "X-EmDash-Visual-Action": visualActionToken },
    })
    .then(function(res) {
      if (res.ok) {
        // A save during the request replaces the ref and still needs publishing.
        if (pendingEntries.get(key) === ref) pendingEntries.delete(key);
        publish(failedEntries, publishError);
      } else {
        if (res.status === 401) {
          showVisualActionRecovery();
          return;
        }
        return res.json().catch(function() { return null; }).then(function(body) {
          if (body && body.error && body.error.code === visualActionTokenErrorCode) {
            showVisualActionRecovery();
            return;
          }
          failedEntries.add(key);
          console.error("Publish failed:", res.status);
          publish(failedEntries, publishError || (body && body.error && body.error.message) || toolbarLabels.publishFailed);
        });
      }
    })
    .catch(function(err) {
      failedEntries.add(key);
      console.error("Publish failed:", err);
      publish(failedEntries, publishError || toolbarLabels.publishFailed);
    });
  }

  // Edit mode toggle
  toggle.addEventListener("change", function() {
    if (toggle.checked) {
      document.cookie = "emdash-edit-mode=true;path=/;samesite=lax";
    } else {
      document.cookie = "emdash-edit-mode=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    if (document.startViewTransition) {
      document.startViewTransition(function() { location.replace(location.href); });
    } else {
      location.replace(location.href);
    }
  });

  // --- Inline editing ---

  // Cached manifest (fetched once on first edit click)
  var manifestCache = null;
  var manifestPromise = null;

  function fetchManifest() {
    if (manifestCache) return Promise.resolve(manifestCache);
    if (manifestPromise) return manifestPromise;
    manifestPromise = ecFetch("/_emdash/api/manifest", { credentials: "same-origin" })
      .then(function(r) { return r.json(); })
      .then(function(m) {
        // The manifest endpoint wraps the payload in a { success, data } envelope (ApiResponse shape).
        // Unwrap it so getFieldKind can read manifest.collections directly.
        manifestCache = m && m.data ? m.data : m;
        return manifestCache;
      });
    return manifestPromise;
  }

  function getFieldKind(manifest, collection, field) {
    var col = manifest.collections && manifest.collections[collection];
    if (!col || !col.fields) return null;
    var f = col.fields[field];
    return f ? f.kind : null;
  }

  // Load manifest early so the first click can resolve field kinds without racing the event.
  if (isEditMode) {
    fetchManifest();
  }

  // Save a single field value. Never rejects: resolves to whether the save
  // succeeded, after the save badge already shows the outcome.
  function saveField(collection, id, field, value) {
    setSaveState("saving");
    var saved = ecFetch("/_emdash/api/content/" + encodeURIComponent(collection) + "/" + encodeURIComponent(id), {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { [field]: value } }),
    })
    .then(function(res) {
      if (res.ok) {
        setSaveState("saved");
        // A save creates/updates a draft — show unpublished changes
        showUnpublishedChanges(collection, id);
        return true;
      }
      setSaveState("error");
      console.error("Save failed:", res.status);
      return false;
    })
    .catch(function(err) {
      setSaveState("error");
      console.error("Save failed:", err);
      return false;
    });
    trackSave(saved);
    return saved;
  }

  function showUnpublishedChanges(collection, id) {
    pendingEntries.set(entryKey(collection, id), { collection: collection, id: id });
    statusEl.innerHTML = badgeHtml("pending", toolbarLabels.unpublishedChanges);
    publishBtn.style.display = "";
    if (!waitingForPublish) {
      publishBtn.disabled = false;
      publishBtn.textContent = toolbarLabels.publish;
    }
  }

  // Plain text inline editing (contenteditable)
  var currentlyEditing = null;

  // Browsers add line breaks while editing as <br> or <div> elements (Shift+Enter,
  // pasted lines), which textContent drops.
  function editableText(element) {
    var text = "";
    (function walk(node) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType === Node.TEXT_NODE) {
          text += child.data;
        } else if (child.nodeName === "BR") {
          text += "\\n";
        } else {
          if (child.nodeName === "DIV" && text && text.slice(-1) !== "\\n") text += "\\n";
          walk(child);
        }
      }
    })(element);
    return text;
  }

  function caretRangeAt(x, y) {
    if (document.caretPositionFromPoint) {
      var position = document.caretPositionFromPoint(x, y);
      // Over a text input the offset counts into its value, which a range can't hold.
      if (!position || position.offsetNode.nodeType !== Node.TEXT_NODE) return null;
      var range = document.createRange();
      range.setStart(position.offsetNode, position.offset);
      return range;
    }
    return document.caretRangeFromPoint ? document.caretRangeFromPoint(x, y) : null;
  }

  function selectionPoints() {
    var selection = window.getSelection();
    return [selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset];
  }

  // A click on text moves the selection to where it landed (a caret, or the
  // end of a drag), and focusing the field keeps it there. A click on a link
  // leaves the selection where it was.
  var selectionAtMousedown = null;

  // Where to put the caret for a click, or null when the click placed it.
  function caretForClick(e) {
    var moved = !selectionAtMousedown || selectionPoints().some(function(point, i) {
      return point !== selectionAtMousedown[i];
    });
    return moved ? null : caretRangeAt(e.clientX, e.clientY);
  }

  function startTextEdit(element, annotation, caret, multiline) {
    if (currentlyEditing === element) return;
    if (currentlyEditing) endCurrentEdit();

    // Line breaks only belong in multi-line fields.
    function readText() {
      return multiline ? editableText(element) : element.textContent || "";
    }

    currentlyEditing = element;
    var originalText = readText();

    element.setAttribute("data-emdash-editing", "");
    element.contentEditable = "plaintext-only";
    element.focus();
    if (caret && element.contains(caret.startContainer)) {
      window.getSelection().collapse(caret.startContainer, caret.startOffset);
    }

    // Track dirty state via input events
    function handleInput() {
      var current = readText().trim();
      if (current !== originalText.trim()) {
        setSaveState("unsaved");
      } else {
        setSaveState("idle");
      }
    }

    function handleBlur() {
      element.removeEventListener("blur", handleBlur);
      element.removeEventListener("keydown", handleKeydown);
      element.removeEventListener("input", handleInput);
      element.contentEditable = "false";
      element.removeAttribute("data-emdash-editing");
      currentlyEditing = null;

      var newValue = readText().trim();
      if (newValue !== originalText.trim()) {
        saveField(annotation.collection, annotation.id, annotation.field, newValue);
      } else {
        setSaveState("idle");
      }
    }

    function handleKeydown(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
      if (e.key === "Escape") {
        element.textContent = originalText;
        setSaveState("idle");
        element.blur();
      }
    }

    element.addEventListener("input", handleInput);
    element.addEventListener("blur", handleBlur);
    element.addEventListener("keydown", handleKeydown);
  }

  function endCurrentEdit() {
    if (currentlyEditing) {
      currentlyEditing.blur();
    }
  }

  // Text fields are often rendered transformed (Markdown to HTML, truncated
  // excerpts). Saving the page text over the stored value would lose content,
  // so they are edited in place only when the page shows the stored text.
  function startTextEditIfShownAsStored(element, annotation, caret) {
    // Rendered markup means the text was transformed. Open the admin before the
    // lookup, while the click still lets popup blockers allow window.open().
    if (element.children.length > 0) {
      openAdmin(annotation);
      return;
    }
    ecFetch("/_emdash/api/content/" + encodeURIComponent(annotation.collection) + "/" + encodeURIComponent(annotation.id), {
      credentials: "same-origin"
    })
    .then(function(r) { return r.json(); })
    .then(function(body) {
      var item = body && body.data && body.data.item;
      var stored = item && item.data ? item.data[annotation.field] : null;
      if (typeof stored === "string" && stored.trim() === (element.textContent || "").trim()) {
        startTextEdit(element, annotation, caret, true);
      } else {
        openAdmin(annotation);
      }
    })
    .catch(function() {
      openAdmin(annotation);
    });
  }

  function adminWindowName(collection, id) {
    return "emdash-admin-" + encodeURIComponent(collection) + "/" + encodeURIComponent(id);
  }

  // Fallback: open admin
  function openAdmin(annotation) {
    var url = "/_emdash/admin/content/" + encodeURIComponent(annotation.collection) + "/" + encodeURIComponent(annotation.id);
    if (annotation.field) {
      url += "?field=" + encodeURIComponent(annotation.field);
    }
    window.open(url, adminWindowName(annotation.collection, annotation.id));
  }

  // --- Inline image editing ---
  var activeImagePopover = null;

  function closeImagePopover() {
    if (activeImagePopover) {
      activeImagePopover.backdrop.remove();
      activeImagePopover.popover.remove();
      if (activeImagePopover.escapeHandler) {
        document.removeEventListener("keydown", activeImagePopover.escapeHandler);
      }
      activeImagePopover = null;
    }
  }

  function startImageEdit(element, annotation) {
    closeImagePopover();

    // Find the current image value by fetching the entry
    var collection = annotation.collection;
    var id = annotation.id;
    var field = annotation.field;

    // Find img element inside the annotated container (or the element itself if it's an img)
    var imgEl = element.tagName === "IMG" ? element : element.querySelector("img");

    // Fetch current field value from the content API
    ecFetch("/_emdash/api/content/" + encodeURIComponent(collection) + "/" + encodeURIComponent(id), {
      credentials: "same-origin"
    })
    .then(function(r) { return r.json(); })
    .then(function(body) {
      if (!body || !body.success) throw new Error("Failed to load entry");
      showImagePopover(element, imgEl, annotation, body.data.item.data[field]);
    })
    .catch(function() {
      // If fetch fails, still show popover with what we can infer from DOM
      showImagePopover(element, imgEl, annotation, null);
    });
  }

  function showImagePopover(element, imgEl, annotation, currentValue) {
    closeImagePopover();

    var collection = annotation.collection;
    var id = annotation.id;
    var field = annotation.field;

    // Position near the element
    var rect = element.getBoundingClientRect();
    var viewportH = window.innerHeight;
    var viewportW = window.innerWidth;

    // Create backdrop for click-outside-to-close
    var backdrop = document.createElement("div");
    backdrop.className = "emdash-img-popover-backdrop";
    backdrop.addEventListener("click", function(e) {
      if (e.target === backdrop) closeImagePopover();
    });

    // Create popover
    var popover = document.createElement("div");
    popover.className = "emdash-img-popover";

    // Local images are stored without a URL (the site builds it at render
    // time), so preview what the page shows when the value carries none.
    var currentSrc = (currentValue && (currentValue.previewUrl || currentValue.src)) || (imgEl ? imgEl.src : null);
    var currentAlt = currentValue ? (currentValue.alt || "") : (imgEl ? (imgEl.alt || "") : "");

    // Build popover HTML
    var html = '';
    html += '<div class="emdash-img-popover-header">';
    html += '  <span class="emdash-img-popover-title">' + escapeAttr(toolbarLabels.image) + '</span>';
    html += '  <button class="emdash-img-popover-close" data-action="close">&times;</button>';
    html += '</div>';
    html += '<div class="emdash-img-popover-body" id="emdash-img-main">';

    if (currentSrc) {
      html += '<img class="emdash-img-preview" src="' + escapeAttr(currentSrc) + '" alt="" />';
    } else {
      html += '<div class="emdash-img-empty">' + escapeAttr(toolbarLabels.noImageSelected) + '</div>';
    }

    html += '<div class="emdash-img-field">';
    html += '  <label for="emdash-img-alt">' + escapeAttr(toolbarLabels.altText) + '</label>';
    html += '  <input type="text" id="emdash-img-alt" value="' + escapeAttr(currentAlt) + '" placeholder="' + escapeAttr(toolbarLabels.altTextPlaceholder) + '" />';
    html += '</div>';

    html += '<div class="emdash-img-actions">';
    html += '  <button class="emdash-img-btn emdash-img-btn--primary" data-action="browse">' + escapeAttr(toolbarLabels.replaceImage) + '</button>';
    html += '  <label class="emdash-img-btn" style="cursor:pointer">';
    html += '    ' + escapeAttr(toolbarLabels.uploadImage);
    html += '    <input type="file" accept="image/*" id="emdash-img-upload" style="display:none" />';
    html += '  </label>';
    if (currentSrc) {
      html += '  <button class="emdash-img-btn emdash-img-btn--danger" data-action="remove">' + escapeAttr(toolbarLabels.removeImage) + '</button>';
    }
    html += '</div>';
    html += '</div>';

    popover.innerHTML = html;

    backdrop.appendChild(popover);
    document.body.appendChild(backdrop);

    // Position the popover
    positionPopover(popover, rect, viewportW, viewportH);

    // Escape key handler
    function handleEscape(e) {
      if (e.key === "Escape") {
        closeImagePopover();
        document.removeEventListener("keydown", handleEscape);
      }
    }
    document.addEventListener("keydown", handleEscape);

    activeImagePopover = {
      backdrop: backdrop,
      popover: popover,
      annotation: annotation,
      currentValue: currentValue,
      element: element,
      imgEl: imgEl,
      escapeHandler: handleEscape
    };

    // Event handlers
    popover.querySelector('[data-action="close"]').addEventListener("click", closeImagePopover);

    popover.querySelector('[data-action="browse"]').addEventListener("click", function() {
      showMediaBrowser(popover, annotation, currentValue, element, imgEl);
    });

    var uploadInput = popover.querySelector("#emdash-img-upload");
    uploadInput.addEventListener("change", function(e) {
      var file = e.target.files && e.target.files[0];
      if (file) handleImageUpload(file, popover, annotation, currentValue, element, imgEl);
    });

    var removeBtn = popover.querySelector('[data-action="remove"]');
    if (removeBtn) {
      removeBtn.addEventListener("click", function() {
        saveField(collection, id, field, null).then(function(saved) {
          if (saved && imgEl) {
            imgEl.style.display = "none";
          }
          closeImagePopover();
        });
      });
    }

    // Save alt text on change (debounced)
    var altInput = popover.querySelector("#emdash-img-alt");
    var altTimer = null;
    altInput.addEventListener("input", function() {
      clearTimeout(altTimer);
      altTimer = setTimeout(function() {
        var newAlt = altInput.value;
        if (currentValue) {
          var updated = Object.assign({}, currentValue, { alt: newAlt });
          saveField(collection, id, field, updated).then(function(saved) {
            if (saved && imgEl) imgEl.alt = newAlt;
          });
        }
      }, 500);
    });

    // Handle drag and drop on the popover body
    var body = popover.querySelector(".emdash-img-popover-body");
    body.addEventListener("dragover", function(e) {
      e.preventDefault();
      body.classList.add("emdash-img-drop");
    });
    body.addEventListener("dragleave", function() {
      body.classList.remove("emdash-img-drop");
    });
    body.addEventListener("drop", function(e) {
      e.preventDefault();
      body.classList.remove("emdash-img-drop");
      var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleImageUpload(file, popover, annotation, currentValue, element, imgEl);
      }
    });
  }

  function positionPopover(popover, targetRect, viewportW, viewportH) {
    var popoverW = 320;
    var gap = 8;

    // Try to place to the right of the element
    var left = targetRect.right + gap;
    var top = targetRect.top;

    // If it overflows right, place to the left
    if (left + popoverW > viewportW - 16) {
      left = targetRect.left - popoverW - gap;
    }
    // If it still overflows (narrow viewport), center below
    if (left < 16) {
      left = Math.max(16, (viewportW - popoverW) / 2);
      top = targetRect.bottom + gap;
    }
    // Clamp vertically
    if (top + 400 > viewportH - 80) { // 80 for toolbar
      top = Math.max(16, viewportH - 480);
    }
    if (top < 16) top = 16;

    popover.style.left = left + "px";
    popover.style.top = top + "px";
  }

  function escapeAttr(str) {
    return String(str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function showMediaBrowser(popover, annotation, currentValue, element, imgEl) {
    var mainBody = popover.querySelector("#emdash-img-main");
    if (mainBody) mainBody.style.display = "none";

    // Remove existing browser if any
    var existing = popover.querySelector(".emdash-img-browser");
    if (existing) existing.remove();

    var browser = document.createElement("div");
    browser.className = "emdash-img-browser";

    browser.innerHTML = '<div class="emdash-img-browser-header">' +
      '<span class="emdash-img-browser-title">' + escapeAttr(toolbarLabels.mediaLibrary) + '</span>' +
      '<button class="emdash-img-browser-back">' + escapeAttr(toolbarLabels.back) + '</button>' +
      '</div>' +
      '<div class="emdash-img-loading">' + escapeAttr(toolbarLabels.loading) + '</div>';

    popover.appendChild(browser);

    browser.querySelector(".emdash-img-browser-back").addEventListener("click", function() {
      browser.remove();
      if (mainBody) mainBody.style.display = "";
    });

    // Fetch media
    ecFetch("/_emdash/api/media?mimeType=image/&limit=30", { credentials: "same-origin" })
    .then(function(r) { return r.json(); })
    .then(function(body) {
      if (!body || !body.success) throw new Error((body && body.error && body.error.message) || "Failed to load media");
      var items = body.data.items || [];
      var loadingEl = browser.querySelector(".emdash-img-loading");
      if (loadingEl) loadingEl.remove();

      if (items.length === 0) {
        var empty = document.createElement("div");
        empty.className = "emdash-img-loading";
        empty.textContent = toolbarLabels.noImagesFound;
        browser.appendChild(empty);
        return;
      }

      var grid = document.createElement("div");
      grid.className = "emdash-img-grid";

      items.forEach(function(item) {
        var thumb = document.createElement("div");
        thumb.className = "emdash-img-grid-item";
        if (currentValue && currentValue.id === item.id) {
          thumb.classList.add("emdash-img-grid-item--selected");
        }
        var thumbUrl = item.url || item.previewUrl || ("/_emdash/api/media/file/" + item.storageKey);
        thumb.innerHTML = '<img src="' + escapeAttr(thumbUrl) + '" alt="' + escapeAttr(item.alt || item.filename || "") + '" loading="lazy" />';

        thumb.addEventListener("click", function() {
          selectMediaItem(item, annotation, currentValue, element, imgEl);
        });

        grid.appendChild(thumb);
      });

      browser.appendChild(grid);
    })
    .catch(function(err) {
      var loadingEl = browser.querySelector(".emdash-img-loading");
      if (loadingEl) loadingEl.textContent = toolbarLabels.mediaLoadFailed;
      console.error("Media fetch error:", err);
    });
  }

  function selectMediaItem(item, annotation, currentValue, element, imgEl) {
    var collection = annotation.collection;
    var id = annotation.id;
    var field = annotation.field;

    var isLocal = !item.provider || item.provider === "local";
    var itemUrl = item.url || item.previewUrl || ("/_emdash/api/media/file/" + item.storageKey);

    var newValue = {
      id: item.id,
      provider: item.provider || "local",
      src: isLocal ? itemUrl : undefined,
      previewUrl: isLocal ? undefined : itemUrl,
      alt: item.alt || "",
      width: item.width,
      height: item.height,
      focalX: item.focalX == null ? undefined : item.focalX,
      focalY: item.focalY == null ? undefined : item.focalY,
      meta: item.meta,
      // The save replaces the whole field, so a dark variant not sent is deleted.
      darkVariant: currentValue ? currentValue.darkVariant : undefined
    };

    // Clean undefined fields
    Object.keys(newValue).forEach(function(k) {
      if (newValue[k] === undefined) delete newValue[k];
    });

    saveField(collection, id, field, newValue).then(function(saved) {
      // Update the image in the DOM
      if (saved && imgEl) {
        replacePageImageSource(imgEl, itemUrl);
        imgEl.alt = item.alt || "";
        imgEl.style.display = "";
      }
      closeImagePopover();
    });
  }

  // The rendered srcset/sizes (and any <picture> sources) still describe the
  // previous media and take precedence over src, so they have to go. The next
  // server render restores responsive variants for the new image.
  function replacePageImageSource(img, url) {
    var picture = img.parentElement;
    if (picture && picture.tagName === "PICTURE") {
      Array.prototype.forEach.call(picture.querySelectorAll("source"), function(source) {
        source.removeAttribute("srcset");
        source.removeAttribute("sizes");
      });
    }
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    img.src = url;
  }

  function handleImageUpload(file, popover, annotation, currentValue, element, imgEl) {
    var collection = annotation.collection;
    var id = annotation.id;
    var field = annotation.field;

    // Show uploading state
    var mainBody = popover.querySelector("#emdash-img-main");
    var browserEl = popover.querySelector(".emdash-img-browser");
    if (browserEl) browserEl.remove();
    if (mainBody) {
      mainBody.innerHTML = '<div class="emdash-img-uploading">' +
        '<span>' + escapeAttr(toolbarLabels.uploadingFile.replace("{filename}", function() { return file.name; })) + '</span>' +
        '</div>';
      mainBody.style.display = "";
    }

    // Detect dimensions before upload
    var dimPromise = new Promise(function(resolve) {
      if (!file.type.startsWith("image/")) return resolve({});
      var img = new Image();
      img.onload = function() {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = function() {
        resolve({});
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });

    dimPromise.then(function(dims) {
      // Generate a small thumbnail for server-side blurhash generation.
      // Thumbnail fits within a 64x64 box so extreme aspect ratios do not
      // create a large canvas client-side.
      var thumbPromise;
      if (dims.width && dims.height) {
        thumbPromise = new Promise(function(resolve) {
          try {
            var maxDim = Math.max(dims.width, dims.height);
            var scale = Math.min(1, 64 / maxDim);
            var thumbW = Math.max(1, Math.round(dims.width * scale));
            var thumbH = Math.max(1, Math.round(dims.height * scale));
            var canvas = document.createElement("canvas");
            canvas.width = thumbW;
            canvas.height = thumbH;
            var ctx = canvas.getContext("2d");
            if (ctx) {
              var img = new Image();
              img.onload = function() {
                try {
                  ctx.drawImage(img, 0, 0, thumbW, thumbH);
                  canvas.toBlob(function(blob) {
                    URL.revokeObjectURL(img.src);
                    resolve(blob);
                  }, "image/png");
                } catch (e) {
                  URL.revokeObjectURL(img.src);
                  resolve(null);
                }
              };
              img.onerror = function() {
                URL.revokeObjectURL(img.src);
                resolve(null);
              };
              img.src = URL.createObjectURL(file);
            } else {
              resolve(null);
            }
          } catch (e) {
            resolve(null);
          }
        });
      } else {
        thumbPromise = Promise.resolve(null);
      }

      return thumbPromise.then(function(thumbnail) {
        var formData = new FormData();
        formData.append("file", file);
        if (dims.width) formData.append("width", String(dims.width));
        if (dims.height) formData.append("height", String(dims.height));
        if (thumbnail) formData.append("thumbnail", thumbnail, "thumb.png");

        return ecFetch("/_emdash/api/media", {
          method: "POST",
          credentials: "same-origin",
          body: formData
        });
      });
    })
    .then(function(r) { return r.json(); })
    .then(function(body) {
      var item = body && body.success && body.data && body.data.item;
      if (!item) throw new Error((body && body.error && body.error.message) || "Upload failed");
      selectMediaItem(item, annotation, currentValue, element, imgEl);
    })
    .catch(function(err) {
      console.error("Upload error:", err);
      setSaveState("error");
      closeImagePopover();
    });
  }

  // Click handler for edit mode
  if (isEditMode) {
    document.addEventListener("mousedown", function() {
      selectionAtMousedown = selectionPoints();
    }, true);

    document.addEventListener("click", function(e) {
      var target = e.target;

      // Clicks inside the field being edited only move the caret; cancel them so
      // a link wrapping the field isn't followed.
      if (target.closest && target.closest("[data-emdash-editing]")) {
        e.preventDefault();
        return;
      }

      // Walk up to find annotated element
      while (target && target !== document.body) {
        var ref = target.getAttribute && target.getAttribute("data-emdash-ref");
        if (ref) {
          try {
            var annotation = JSON.parse(ref);

            // Entry-level annotation (no field) — keep walking for a field-level ancestor
            if (!annotation.field) {
              target = target.parentElement;
              continue;
            }

            // Read now: editing may only start once the manifest or the stored
            // value has loaded, and the page can scroll in the meantime.
            var caret = caretForClick(e);

            function dispatchInline(kind) {
              closeImagePopover();
              // Portable Text is edited in-page by InlinePortableTextEditor — do not open admin
              if (kind === "portableText") {
                return;
              }
              e.preventDefault();
              e.stopPropagation();
              if (kind === "string" || kind === "text") {
                startTextEdit(target, annotation, caret);
              } else if (kind === "richText") {
                startTextEditIfShownAsStored(target, annotation, caret);
              } else if (kind === "image") {
                startImageEdit(target, annotation);
              } else {
                openAdmin(annotation);
              }
            }

            if (manifestCache) {
              dispatchInline(getFieldKind(manifestCache, annotation.collection, annotation.field));
            } else {
              // The click can only be cancelled now, so a link wrapping the field
              // isn't followed while the manifest loads.
              e.preventDefault();
              fetchManifest().then(function(manifest) {
                dispatchInline(getFieldKind(manifest, annotation.collection, annotation.field));
              });
            }
          } catch (err) {
            console.error("Failed to parse emdash ref:", err);
          }
          return;
        }
        target = target.parentElement;
      }
    }, true);
  }

  updateStatus();
})();
<\/script>
`;
}
/**
* EmDash Request Context Middleware
*
* Sets up AsyncLocalStorage-based request context for query functions.
* Skips ALS for logged-out users with no CMS signals unless a configured
* object cache must be fenced off during a route-cache render.
*
* Handles:
* - Preview tokens: _preview query param with signed HMAC token
* - Edit mode: emdash-edit-mode cookie (for visual editing)
* - Toolbar injection: floating pill for authenticated editors
* - Client toolbar mode (`toolbar: "client"`): cache-identical HTML with a
*   client-side bootstrap pill and an `_edit` query param for fresh editor
*   renders; the backend verifies the `_edit` param and redirects non-editors
*/
var toolbarMode = config_default?.toolbar ?? "server";
async function renderEditorToolbar(context, config) {
	const labels = await loadVisualEditingToolbarLabels(context.request);
	const { emdash, user } = context.locals;
	if (!emdash?.db || !user) return renderToolbar({
		...config,
		labels
	});
	const { previewSecret } = await resolveSecretsCached(emdash.db);
	const actionToken = await generateVisualEditingActionToken(previewSecret, user.id);
	return renderToolbar({
		...config,
		actionToken,
		labels
	});
}
/**
* Opt the current request out of Astro's route cache (e.g. Workers Cache on
* Cloudflare). `Cache-Control` headers do NOT cover this: the adapter derives
* the shared-cache TTL from the route-cache options (on Cloudflare via
* `Cloudflare-CDN-Cache-Control`), so session-specific responses must
* explicitly disable it or they get stored in the shared cache and served to
* anonymous visitors without ever invoking the middleware again. With no cache
* provider configured, or no cache handle on the request, this is a no-op.
*/
function optOutOfRouteCache(cache) {
	cache?.set(false);
}
/**
* The content a valid `_preview` token grants draft access to. The preview
* secret is resolved via `resolveSecretsCached`: env wins, otherwise a
* DB-stored value is read (or generated on first need).
*/
async function verifyPreview(db, url) {
	const { previewSecret } = await resolveSecretsCached(db);
	const result = await verifyPreviewToken({
		url,
		secret: previewSecret
	});
	return result.valid ? parseContentId(result.payload.cid) : void 0;
}
/**
* Preview responses must not be cached -- draft content could leak past token
* expiry. `Cache-Control` only governs browsers/downstream proxies; the shared
* edge cache follows the route-cache options, so opt out of those too --
* otherwise the draft response is stored in the shared cache and served on
* cache hits without token verification until TTL/purge. Opt out for any
* request carrying a `_preview` param (valid or not): those URLs are
* per-token, so cached copies are useless at best and drafts at worst.
*/
function keepPreviewUncached(response, opts) {
	if (opts.hasPreviewToken) optOutOfRouteCache(opts.routeCache);
	if (!opts.isPreview) return response;
	const uncached = new Response(response.body, response);
	uncached.headers.set("Cache-Control", "private, no-store");
	return uncached;
}
function isHtmlResponse(response) {
	return response.headers.get("content-type")?.includes("text/html") ?? false;
}
var DOCUMENT_START_RE = /^\s*<(?:!doctype|html)\b/i;
/**
* Inject HTML before the page's closing `</body>` if the response is a whole
* HTML document with one. Does not touch cache headers — callers decide
* whether the result is still shareable. `injected` tells the caller whether
* the result carries the injected HTML.
*
* `Astro.rewrite()` runs this middleware again for the rewritten route inside
* the original request, so the response can already contain the HTML; `marker`
* identifies it so it is injected only once.
*/
async function injectBeforeBodyEnd(response, htmlToInject, marker) {
	if (!isHtmlResponse(response)) return {
		response,
		injected: false
	};
	const html = await response.text();
	if (html.includes(marker)) return {
		response: new Response(html, response),
		injected: true
	};
	const bodyEnd = DOCUMENT_START_RE.test(html) ? html.lastIndexOf("</body>") : -1;
	if (bodyEnd === -1) return {
		response: new Response(html, response),
		injected: false
	};
	const injected = html.slice(0, bodyEnd) + htmlToInject + html.slice(bodyEnd);
	return {
		response: new Response(injected, {
			status: response.status,
			headers: response.headers
		}),
		injected: true
	};
}
/**
* Inject toolbar HTML into a response if it's an HTML page.
* Returns the original response if not HTML, without calling
* `renderToolbarHtml`, which loads labels and, for an editor, resolves the
* preview secret.
*/
async function injectToolbar(response, renderToolbarHtml, routeCache) {
	if (!isHtmlResponse(response)) return response;
	const result = await injectBeforeBodyEnd(response, await renderToolbarHtml(), "id=\"emdash-toolbar\"");
	if (result.injected) {
		result.response.headers.set("Cache-Control", "private, no-store");
		optOutOfRouteCache(routeCache);
	}
	return result.response;
}
/**
* Inject the client-toolbar bootstrap script. Identical for every visitor, so
* cache headers and route-cache options are left untouched and the response
* stays fully shareable.
*/
async function injectBootstrap(response) {
	return (await injectBeforeBodyEnd(response, renderToolbarBootstrap(), "<!-- EmDash Toolbar Bootstrap -->")).response;
}
/**
* Redirect an `_edit` URL to its canonical form (same URL without the param).
* Applied when the requester is not an authenticated editor, so a shared
* `?_edit` link degrades gracefully for everyone else.
*/
function redirectToCanonical(url) {
	const canonical = new URL(url);
	canonical.searchParams.delete(EDIT_PARAM);
	return new Response(null, {
		status: 302,
		headers: {
			Location: canonical.pathname + canonical.search + canonical.hash,
			"Cache-Control": "private, no-store"
		}
	});
}
var onRequest$1 = defineMiddleware(async (context, next) => {
	const { cookies, url } = context;
	if (url.pathname.startsWith("/_emdash")) return next();
	const { user } = context.locals;
	const isEditor = !!user && user.role >= 30;
	const playgroundDb = context.locals.__playgroundDb;
	if (playgroundDb) {
		const hasEditCookie = !context.isPrerendered && cookies.get("emdash-edit-mode")?.value === "true";
		const hasPreviewToken = url.searchParams.has("_preview");
		let preview;
		if (hasPreviewToken) preview = await verifyPreview(playgroundDb, url);
		return runWithContext({
			editMode: hasEditCookie,
			preview,
			db: playgroundDb,
			dbIsIsolated: true
		}, async () => {
			const response = keepPreviewUncached(await next(), {
				hasPreviewToken,
				isPreview: !!preview,
				routeCache: context.cache
			});
			if (!hasEditCookie || toolbarMode === false) return response;
			return injectToolbar(response, async () => renderToolbar({
				editMode: true,
				isPreview: false,
				labels: await loadVisualEditingToolbarLabels(context.request),
				hidden: true
			}), context.cache);
		});
	}
	const hasEditCookie = !context.isPrerendered && cookies.get("emdash-edit-mode")?.value === "true";
	const hasPreviewToken = url.searchParams.has("_preview");
	const hasEditParam = toolbarMode === "client" && url.searchParams.has(EDIT_PARAM);
	if (hasEditParam) {
		optOutOfRouteCache(context.cache);
		if (!isEditor) return redirectToCanonical(url);
	}
	if (!hasEditCookie && !hasPreviewToken && !isEditor) {
		const render = async () => {
			const response = await next();
			return toolbarMode === "client" ? injectBootstrap(response) : response;
		};
		if (config_default?.objectCacheEnabled && context.cache?.enabled) {
			const parent = getRequestContext();
			if (parent?.siteSettings) parent.siteSettings.live = true;
			if (parent?.routeCacheFill) return render();
			return runWithContext({
				...parent,
				editMode: false,
				routeCacheFill: true
			}, render);
		}
		return render();
	}
	const editMode = hasEditCookie && isEditor;
	const locale = context.currentLocale;
	const routeCache = context.cache;
	let preview;
	if (hasPreviewToken) {
		const db = context.locals.emdash?.db;
		if (db) preview = await verifyPreview(db, url);
		else console.warn("[emdash] Preview token present but EmDash runtime not initialized; preview disabled.");
	}
	if (hasEditCookie || hasPreviewToken) return runWithContext({
		...getRequestContext(),
		editMode,
		preview,
		locale
	}, async () => {
		const response = keepPreviewUncached(await next(), {
			hasPreviewToken,
			isPreview: !!preview,
			routeCache
		});
		if (isEditor && toolbarMode !== false) return injectToolbar(response, () => renderEditorToolbar(context, {
			editMode,
			isPreview: !!preview
		}), routeCache);
		if (toolbarMode === "client" && !isEditor && !preview) return injectBootstrap(response);
		return response;
	});
	if (isEditor) {
		if (toolbarMode === false) return next();
		if (toolbarMode === "client" && !hasEditParam) return injectBootstrap(await next());
		return injectToolbar(await next(), () => renderEditorToolbar(context, {
			editMode: false,
			isPreview: false
		}), routeCache);
	}
	return next();
});
// \0virtual:astro:middleware
var onRequest = sequence(onRequest$6, onRequest$5, onRequest$4, onRequest$3, onRequest$2, onRequest$1);
export { onRequest };
