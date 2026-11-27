import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { u as isPostgres, w as validateIdentifier } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { r as getI18nConfig } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { t as ContentRepository } from "./content-2gjSbGP3_DRBiG6uA.mjs";
import { t as chunks } from "./chunks-CvgCLYip_BPNjBngy.mjs";
import { t as withTransaction } from "./transaction-D5Kq7MTL_B_3_YVm2.mjs";
import { t as TaxonomyRepository } from "./taxonomy-D4Fl2smf_D54uY0xV.mjs";
import { r as taxonomyTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { f as invalidateTermCache } from "./taxonomies-DApyZAJq_ChSZiGZH.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { j as contentTermsBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { i as requireEntryEditPerm, o as requirePerm, r as requireAnyPerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { sql } from "kysely";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs
var _taxonomy__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var MAX_CACHE_PURGE_TAGS = 100;
function assignmentResponse(assignments, entryLocale) {
	const config = getI18nConfig();
	const defaultLocale = config?.defaultLocale ?? "en";
	return {
		terms: assignments.flatMap(({ term }) => term ? [{
			id: term.id,
			name: term.name,
			slug: term.slug,
			label: term.label,
			parentId: term.parentId,
			locale: term.locale,
			translationGroup: term.translationGroup
		}] : []),
		unresolved: assignments.filter(({ term }) => term === null).map(({ translationGroup, availableLocales, translations }) => ({
			translationGroup,
			availableLocales,
			translations
		})),
		entryLocale,
		defaultLocale,
		implicitDefaultLocale: config === null
	};
}
/**
* Get terms assigned to an entry
*/
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { collection, id, taxonomy } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	if (!collection || !id || !taxonomy) return apiError("VALIDATION_ERROR", "Collection, id, and taxonomy required", 400);
	try {
		const entry = await new ContentRepository(emdash.db).findByIdOrSlug(collection, id);
		if (!entry || entry.status !== "published" && !hasPermission(user, "content:read_drafts")) return apiError("NOT_FOUND", "Content not found", 404);
		const locale = entry.locale || getI18nConfig()?.defaultLocale || "en";
		const defaultLocale = getI18nConfig()?.defaultLocale ?? "en";
		return apiSuccess(assignmentResponse(await new TaxonomyRepository(emdash.db).getTermAssignmentsForEntry(collection, entry.id, taxonomy, locale, defaultLocale), locale));
	} catch (error) {
		return handleError(error, "Failed to get entry terms", "TERMS_GET_ERROR");
	}
};
/**
* Set terms for an entry (replaces existing)
*/
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { collection, id, taxonomy } = params;
	if (!collection || !id || !taxonomy) return apiError("VALIDATION_ERROR", "Collection, id, and taxonomy required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requireAnyPerm(user, ["content:edit_own", "content:edit_own_drafts"]);
	if (denied) return denied;
	if (!emdash.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const existing = await emdash.handleContentGet(collection, id);
	if (!existing.success) return apiError(existing.error?.code ?? "NOT_FOUND", existing.error?.message ?? "Content not found", existing.error?.code === "NOT_FOUND" ? 404 : 500);
	const existingItem = existing.data.item;
	const editDenied = requireEntryEditPerm(user, {
		authorId: existingItem.authorId ?? "",
		status: existingItem.status
	});
	if (editDenied) return editDenied;
	const canonicalId = existingItem.id;
	const entryLocale = typeof existingItem?.locale === "string" ? existingItem.locale : getI18nConfig()?.defaultLocale ?? "en";
	try {
		const body = await parseBody(request, contentTermsBody);
		if (isParseError(body)) return body;
		const { termIds, expected } = body;
		const repo = new TaxonomyRepository(emdash.db);
		for (const termId of termIds) {
			const term = await repo.findById(termId);
			if (!term) return apiError("NOT_FOUND", `Term ID '${termId}' not found`, 404);
			if (term.name !== taxonomy) return apiError("VALIDATION_ERROR", `Term ID '${termId}' does not belong to taxonomy '${taxonomy}'`, 400);
		}
		if (!await withTransaction(emdash.db, async (trx) => {
			if (expected) {
				if (isPostgres(trx)) {
					validateIdentifier(collection, "collection slug");
					const table = sql.ref(`ec_${collection}`);
					await sql`SELECT id FROM ${table} WHERE id = ${canonicalId} OR translation_group = (SELECT translation_group FROM ${table} WHERE id = ${canonicalId}) ORDER BY id FOR UPDATE`.execute(trx);
				}
				const stored = (await new TaxonomyRepository(trx).getTermAssignmentsForEntry(collection, canonicalId, taxonomy, entryLocale, getI18nConfig()?.defaultLocale ?? "en")).flatMap(({ term, translations }) => {
					const termId = term?.id ?? translations[0]?.id;
					return termId ? [termId] : [];
				}).toSorted();
				const wanted = [...expected].toSorted();
				if (stored.length !== wanted.length || stored.some((termId, i) => termId !== wanted[i])) return false;
			}
			await new TaxonomyRepository(trx).setTermsForEntry(collection, canonicalId, taxonomy, termIds, expected);
			return true;
		})) return apiError("LIST_CONFLICT", "The entry's terms changed. Read them again and apply the change to them.", 409);
		invalidateTermCache();
		if (cache?.enabled) {
			const translationGroup = existingItem?.translationGroup;
			const siblingIds = typeof translationGroup === "string" ? await new ContentRepository(emdash.db).findTranslationIds(collection, translationGroup) : [];
			const tags = [
				collection,
				.../* @__PURE__ */ new Set([canonicalId, ...siblingIds]),
				taxonomyTag(taxonomy)
			];
			for (const tagBatch of chunks(tags, MAX_CACHE_PURGE_TAGS)) await invalidateRouteCache(cache, tagBatch);
		}
		return apiSuccess(assignmentResponse(await repo.getTermAssignmentsForEntry(collection, canonicalId, taxonomy, entryLocale, getI18nConfig()?.defaultLocale ?? "en"), entryLocale));
	} catch (error) {
		return handleError(error, "Failed to set entry terms", "TERMS_SET_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_@_@mjs
var page = () => _taxonomy__exports;
export { page };
