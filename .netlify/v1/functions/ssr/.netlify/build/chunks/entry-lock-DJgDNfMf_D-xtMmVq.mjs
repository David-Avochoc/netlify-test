import { t as SEARCH_TOKENIZERS } from "./types-CpFfDrGH_BSdE3MQZ.mjs";
import { t as compileUrlPattern } from "./url-pattern-DViEwhDu_BvReWGfJ.mjs";
import { _ as roleLevel, a as httpUrl, o as localeCode, r as cursorPaginationQuery, v as slugPattern$1 } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { z } from "zod";
// node_modules/emdash/dist/entry-lock-DJgDNfMf.mjs
/** Slug pattern: lowercase letters, digits, and hyphens; must start with a letter */
var bylineSlugPattern = /^[a-z][a-z0-9-]*$/;
var bylineSummarySchema = z.object({
	id: z.string(),
	slug: z.string(),
	displayName: z.string(),
	bio: z.string().nullable(),
	avatarMediaId: z.string().nullable(),
	avatarStorageKey: z.string().nullish(),
	avatarAlt: z.string().nullish(),
	avatarBlurhash: z.string().nullish(),
	avatarDominantColor: z.string().nullish(),
	websiteUrl: z.string().nullable(),
	userId: z.string().nullable(),
	isGuest: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	locale: z.string(),
	translationGroup: z.string().nullable(),
	customFields: z.record(z.string(), z.union([
		z.string(),
		z.boolean(),
		z.null()
	])).optional()
}).meta({ id: "BylineSummary" });
var bylineCreditSchema = z.object({
	byline: bylineSummarySchema,
	sortOrder: z.number().int(),
	roleLabel: z.string().nullable(),
	source: z.enum(["explicit", "inferred"]).optional().meta({ description: "Whether this credit was explicitly assigned or inferred from authorId" })
}).meta({ id: "BylineCredit" });
var contentBylineInputSchema = z.object({
	bylineId: z.string().min(1),
	roleLabel: z.string().nullish()
}).meta({ id: "ContentBylineInput" });
var bylinesListQuery = cursorPaginationQuery.extend({
	search: z.string().optional(),
	isGuest: z.coerce.boolean().optional(),
	userId: z.string().optional(),
	locale: localeCode.optional()
}).meta({ id: "BylinesListQuery" });
var bylineCreateBody = z.object({
	slug: z.string().min(1).regex(bylineSlugPattern, "Slug must contain only lowercase letters, digits, and hyphens"),
	displayName: z.string().min(1),
	bio: z.string().nullish(),
	avatarMediaId: z.string().nullish(),
	websiteUrl: httpUrl.nullish(),
	userId: z.string().nullish(),
	isGuest: z.boolean().optional(),
	locale: localeCode.optional(),
	translationOf: z.string().min(1).optional(),
	customFields: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "BylineCreateBody" });
var bylineTranslationCreateBody = z.object({
	locale: localeCode,
	slug: z.string().min(1).regex(bylineSlugPattern, "Slug must contain only lowercase letters, digits, and hyphens").optional(),
	displayName: z.string().min(1).optional(),
	bio: z.string().nullish(),
	avatarMediaId: z.string().nullish(),
	websiteUrl: httpUrl.nullish()
}).meta({ id: "BylineTranslationCreateBody" });
z.object({ items: z.array(bylineSummarySchema) }).meta({ id: "BylineTranslationsResponse" });
var bylineUpdateBody = z.object({
	slug: z.string().min(1).regex(bylineSlugPattern, "Slug must contain only lowercase letters, digits, and hyphens").optional(),
	displayName: z.string().min(1).optional(),
	bio: z.string().nullish(),
	avatarMediaId: z.string().nullish(),
	websiteUrl: httpUrl.nullish(),
	userId: z.string().nullish(),
	isGuest: z.boolean().optional(),
	customFields: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "BylineUpdateBody" });
z.object({
	items: z.array(bylineSummarySchema),
	nextCursor: z.string().optional()
}).meta({ id: "BylineListResponse" });
var slugPattern = /^[a-z][a-z0-9_]*$/;
var collectionSlug$1 = z.string().min(1).max(63).regex(slugPattern, "Invalid collection slug format");
/** NULL means unlimited on that side. */
var roleLimit = z.number().int().positive().nullable().optional();
var roleLabelSingular = z.string().min(1).max(200).nullable().optional();
var createRelationBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern, "Slug must be lowercase alphanumeric with underscores"),
	parentCollection: collectionSlug$1,
	childCollection: collectionSlug$1,
	parentLabel: z.string().min(1).max(200),
	parentLabelSingular: roleLabelSingular,
	childLabel: z.string().min(1).max(200),
	childLabelSingular: roleLabelSingular,
	maxChildrenPerParent: roleLimit,
	maxParentsPerChild: roleLimit
}).meta({ id: "CreateRelationBody" });
var relationListQuery = z.object({ collection: collectionSlug$1.optional().meta({ description: "Only relations with this collection on one end" }) }).meta({ id: "RelationListQuery" });
var updateRelationBody = z.object({
	parentLabel: z.string().min(1).max(200).optional(),
	parentLabelSingular: roleLabelSingular,
	childLabel: z.string().min(1).max(200).optional(),
	childLabelSingular: roleLabelSingular,
	maxChildrenPerParent: roleLimit,
	maxParentsPerChild: roleLimit
}).refine((body) => Object.values(body).some((value) => value !== void 0), { message: "At least one field is required" }).meta({ id: "UpdateRelationBody" });
/** A relation plus what deleting it would take: the fields that view it and
* how many links it holds. */
var relationWithUsageSchema = z.object({
	id: z.string(),
	slug: z.string(),
	parentCollection: z.string(),
	childCollection: z.string(),
	parentLabel: z.string(),
	parentLabelSingular: z.string().nullable(),
	childLabel: z.string(),
	childLabelSingular: z.string().nullable(),
	maxChildrenPerParent: z.number().int().nullable(),
	maxParentsPerChild: z.number().int().nullable()
}).meta({ id: "RelationDef" }).extend({
	boundFields: z.array(z.object({
		collectionSlug: z.string(),
		fieldSlug: z.string(),
		side: z.enum(["parent", "child"])
	})),
	linkCount: z.number().int()
}).meta({ id: "RelationWithUsage" });
z.object({ relations: z.array(relationWithUsageSchema) }).meta({ id: "RelationListResponse" });
z.object({ relation: relationWithUsageSchema }).meta({ id: "RelationResponse" });
var entryRefSchema = z.object({
	id: z.string(),
	slug: z.string().nullable(),
	collection: z.string(),
	title: z.string().nullable(),
	locale: z.string().nullable(),
	translationGroup: z.string().nullable(),
	sortOrder: z.number().int().optional()
}).meta({ id: "ReferenceEntryRef" });
var referenceChildrenResponseSchema = z.object({
	children: z.array(entryRefSchema),
	nextCursor: z.string().optional()
}).meta({ id: "ReferenceChildrenResponse" });
z.object({
	parents: z.array(entryRefSchema),
	nextCursor: z.string().optional()
}).meta({ id: "ReferenceParentsResponse" });
var contentDateTime = z.iso.datetime({
	offset: true,
	message: "must be an ISO 8601 datetime"
}).or(z.iso.datetime({
	offset: true,
	precision: -1,
	message: "must be an ISO 8601 datetime"
}));
/** SEO input — per-content meta fields */
var contentSeoInput = z.object({
	title: z.string().max(200).nullish(),
	description: z.string().max(500).nullish(),
	image: z.string().nullish(),
	canonical: httpUrl.nullish(),
	noIndex: z.boolean().optional()
}).meta({ id: "ContentSeoInput" });
/** ISO 8601 date or datetime bound for the content-list date range filter. */
var contentDateBound = z.union([contentDateTime, z.iso.date({ message: "must be an ISO 8601 date" })]).optional();
/**
* Byline ids for the content-list filter: either the literal `none` or a
* comma-separated list, parsed into an array.
*
* The 25-id cap keeps the `IN (...)` clause clear of D1's bound-parameter
* ceiling once the rest of the list query's placeholders are counted
* (`SQL_BATCH_SIZE` is 50 for a query binding nothing else).
*/
var bylineFilterParam = z.string().trim().min(1).max(2e3).optional().transform((value) => value === void 0 ? void 0 : value === "none" ? "none" : [...new Set(value.split(",").map((id) => id.trim()))].filter((id) => id.length > 0)).refine((value) => value === void 0 || value === "none" || value.length <= 25, { message: "at most 25 bylines may be selected" }).refine((value) => value === void 0 || value === "none" || value.length > 0, { message: "must contain at least one byline id" });
/** Query-string boolean. Explicit values only — `z.coerce.boolean()` reads "false" as true. */
var booleanParam = z.enum([
	"1",
	"0",
	"true",
	"false"
]).optional().transform((value) => value === "1" || value === "true");
var contentFieldComparable = z.union([z.string().max(2048), z.number()]);
var contentFieldFilterScalar = z.union([
	contentFieldComparable,
	z.boolean(),
	z.null()
]);
var contentFieldFilterValue = z.union([
	contentFieldFilterScalar,
	z.object({ in: z.array(z.union([contentFieldComparable, z.boolean()])).min(1).max(50) }).strict(),
	z.object({
		gt: contentFieldComparable.optional(),
		gte: contentFieldComparable.optional(),
		lt: contentFieldComparable.optional(),
		lte: contentFieldComparable.optional()
	}).strict().refine((value) => Object.values(value).some((bound) => bound !== void 0), { message: "Range filter must include at least one bound" })
]);
function contentFieldFilterOperandCount(value) {
	if (value === null) return 0;
	if (!value || typeof value !== "object" || Array.isArray(value)) return 1;
	if ("in" in value && Array.isArray(value.in)) return value.in.length;
	return Object.values(value).filter((bound) => bound !== void 0).length;
}
/** AND-combined filters over custom fields explicitly marked as indexed. */
var contentFieldFiltersSchema = z.record(z.string().max(128).regex(/^[a-z][a-z0-9_]*$/, "must be a safe field identifier"), contentFieldFilterValue).refine((filters) => Object.keys(filters).length <= 20, { message: "At most 20 indexed field filters are allowed" }).refine((filters) => Object.values(filters).reduce((total, value) => total + contentFieldFilterOperandCount(value), 0) <= 50, { message: `Indexed field filters have a total operand budget of 50` });
var contentFieldFiltersQuery = z.string().max(8192).transform((value, ctx) => {
	try {
		return JSON.parse(value);
	} catch {
		ctx.addIssue({
			code: "custom",
			message: "must be valid JSON"
		});
		return z.NEVER;
	}
}).pipe(contentFieldFiltersSchema);
/** Statuses the content list can filter by. */
var CONTENT_STATUSES = [
	"draft",
	"published",
	"scheduled",
	"archived",
	"pending",
	"private",
	"future"
];
var pageParam = z.coerce.number().int().min(1).max(Number.MAX_SAFE_INTEGER).optional().meta({ description: "1-based page number, for numbered pages instead of a cursor" });
var contentListQuery = cursorPaginationQuery.extend({
	page: pageParam,
	status: z.enum([...CONTENT_STATUSES, "all"]).optional().transform((status) => status === "all" ? void 0 : status),
	orderBy: z.string().optional(),
	order: z.enum(["asc", "desc"]).optional(),
	locale: localeCode.optional(),
	q: z.string().trim().min(1).max(200).optional(),
	authorId: z.string().min(1).max(64).optional(),
	dateField: z.enum([
		"createdAt",
		"updatedAt",
		"publishedAt"
	]).optional(),
	dateFrom: contentDateBound,
	dateTo: contentDateBound,
	bylines: bylineFilterParam,
	includeInferredBylines: booleanParam,
	fieldFilters: contentFieldFiltersQuery.optional()
}).refine(({ cursor, page }) => cursor === void 0 || page === void 0, {
	message: "cursor and page cannot be used together",
	path: ["page"]
}).transform(({ bylines, ...rest }) => ({
	...rest,
	bylinesNone: bylines === "none",
	bylines: bylines === "none" ? void 0 : bylines
})).meta({ id: "ContentListQuery" });
var MAX_CALENDAR_RANGE_MS = 53568e5;
/** Canonical UTC form, so bounds compare as text against stored timestamps. */
var calendarBound = z.iso.datetime({
	offset: true,
	message: "must be an ISO 8601 datetime"
}).transform((value) => new Date(value).toISOString());
/** Calendar range: `from` inclusive, `to` exclusive, at most 62 days apart. */
var calendarQuery = cursorPaginationQuery.extend({
	from: calendarBound,
	to: calendarBound
}).refine((query) => query.from < query.to, {
	message: "to must be after from",
	path: ["to"]
}).refine((query) => Date.parse(query.to) - Date.parse(query.from) <= MAX_CALENDAR_RANGE_MS, {
	message: "the range can span at most 62 days",
	path: ["to"]
});
/** ISO 8601 datetime for `publishedAt` / `createdAt`. Routes gate writes behind `content:publish_any`. */
var contentDateOverride = contentDateTime.nullish();
var overrideLockFlag = z.boolean().optional().meta({ description: "Write even though another editor holds this entry's edit lock. Without it the write is refused with 409 ENTRY_LOCKED." });
var contentCreateBody = z.object({
	data: z.record(z.string(), z.unknown()),
	slug: z.string().nullish(),
	status: z.enum(["draft"]).optional(),
	bylines: z.array(contentBylineInputSchema).optional(),
	locale: localeCode.optional(),
	translationOf: z.string().optional(),
	seo: contentSeoInput.optional(),
	taxonomies: z.record(z.string(), z.array(z.string())).optional().meta({ description: "Taxonomy term assignments as { taxonomyName: [termSlug, ...] }, resolved in the entry's locale." }),
	references: z.record(z.string(), z.array(z.string()).max(1e3)).optional().meta({ description: "Reference selections as { fieldSlug: [entryId, ...] }, in display order. Written as content-reference links in the same transaction as the entry. A field bound to the child end of its relation selects the entries pointing at this one, which carry no order." }),
	publishedAt: contentDateOverride,
	createdAt: contentDateOverride,
	migrateBlocks: z.boolean().optional(),
	replaceBlocks: z.boolean().optional()
}).meta({ id: "ContentCreateBody" });
var contentUpdateBody = z.object({
	data: z.record(z.string(), z.unknown()).optional(),
	slug: z.string().nullish(),
	status: z.enum(["draft"]).optional(),
	authorId: z.string().nullish(),
	bylines: z.array(contentBylineInputSchema).optional(),
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" }),
	skipRevision: z.boolean().optional(),
	overrideLock: overrideLockFlag,
	seo: contentSeoInput.optional(),
	taxonomies: z.record(z.string(), z.array(z.string())).optional().meta({ description: "Replace taxonomy assignments as { taxonomyName: [termSlug, ...] }. Only named taxonomies are touched; pass an empty array to clear a taxonomy." }),
	references: z.record(z.string(), z.array(z.string()).max(1e3)).optional().meta({ description: "Reference selections as { fieldSlug: [entryId, ...] }, in display order. Written as content-reference links in the same transaction as the entry. A field bound to the child end of its relation selects the entries pointing at this one, which carry no order." }),
	expected: z.object({
		bylines: z.array(contentBylineInputSchema).optional(),
		references: z.record(z.string(), z.array(z.string()).max(1e3)).optional()
	}).optional().meta({ description: "The bylines and reference selections this save was based on, as a read of the entry returned them (every page of a reference field). When a stored list no longer matches, nothing is written and the save fails with 409 LIST_CONFLICT, so the client can read the entry again and rebase its change." }),
	publishedAt: contentDateOverride,
	migrateBlocks: z.boolean().optional(),
	replaceBlocks: z.boolean().optional()
}).meta({ id: "ContentUpdateBody" });
var contentScheduleBody = z.object({
	scheduledAt: contentDateTime.meta({
		description: "ISO 8601 datetime with Z or an explicit offset for scheduled publishing",
		examples: ["2025-06-15T09:00:00Z"]
	}),
	overrideLock: overrideLockFlag,
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" })
}).meta({ id: "ContentScheduleBody" });
var contentRevisionConditionBody = z.object({
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" }),
	overrideLock: overrideLockFlag
}).meta({ id: "ContentRevisionConditionBody" });
var revisionRestoreBody = z.object({ overrideLock: overrideLockFlag });
var contentPublishBody = contentRevisionConditionBody.extend({ publishedAt: contentDateTime.optional().meta({ description: "Optional ISO 8601 datetime to backdate the publish (e.g. when migrating content). Requires content:publish_any permission. Without this, existing published_at is preserved on re-publish." }) }).meta({ id: "ContentPublishBody" });
var contentPreviewUrlBody = z.object({
	expiresIn: z.union([z.string(), z.number()]).optional(),
	pathPattern: z.string().optional()
}).meta({ id: "ContentPreviewUrlBody" });
var contentTermsBody = z.object({
	termIds: z.array(z.string()),
	expected: z.array(z.string()).optional().meta({ description: "The term ids this change was based on, as a read of the entry's terms returned them. When the entry's terms no longer match, nothing is written and the request fails with 409 LIST_CONFLICT." })
}).meta({ id: "ContentTermsBody" });
/** A single term variant returned as part of an entry's term assignments. */
var contentEntryTermSchema = z.object({
	id: z.string(),
	name: z.string().meta({ description: "Taxonomy name" }),
	slug: z.string(),
	label: z.string(),
	parentId: z.string().nullable(),
	locale: localeCode,
	translationGroup: z.string().nullable()
}).meta({ id: "ContentEntryTerm" });
/** Term assignments response for the content terms endpoint. */
var contentTermsResponseSchema = z.object({
	terms: z.array(contentEntryTermSchema),
	unresolved: z.array(z.object({
		translationGroup: z.string(),
		availableLocales: z.array(localeCode),
		translations: z.array(z.object({
			id: z.string(),
			slug: z.string(),
			locale: localeCode
		}))
	})),
	entryLocale: localeCode,
	defaultLocale: localeCode,
	implicitDefaultLocale: z.boolean()
}).meta({ id: "ContentTermsResponse" });
var contentTrashQuery = cursorPaginationQuery.extend({
	page: pageParam,
	locale: localeCode.optional().meta({ description: "Restrict the trash listing to entries in this locale" })
}).refine(({ cursor, page }) => cursor === void 0 || page === void 0, {
	message: "cursor and page cannot be used together",
	path: ["page"]
}).meta({ id: "ContentTrashQuery" });
/** SEO metadata on a content item */
var contentSeoSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	image: z.string().nullable(),
	canonical: z.string().nullable(),
	noIndex: z.boolean()
}).meta({ id: "ContentSeo" });
/** A single content item as returned by the API */
var contentItemSchema = z.object({
	id: z.string(),
	type: z.string().meta({ description: "Collection slug this item belongs to" }),
	slug: z.string().nullable(),
	status: z.string().meta({ description: "draft, published, or scheduled" }),
	data: z.record(z.string(), z.unknown()).meta({ description: "User-defined field values" }),
	authorId: z.string().nullable(),
	primaryBylineId: z.string().nullable(),
	byline: bylineSummarySchema.nullable().optional(),
	bylines: z.array(bylineCreditSchema).optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
	publishedAt: z.string().nullable(),
	scheduledAt: z.string().nullable(),
	liveRevisionId: z.string().nullable(),
	draftRevisionId: z.string().nullable(),
	version: z.number().int(),
	locale: z.string().nullable(),
	translationGroup: z.string().nullable(),
	seo: contentSeoSchema.optional(),
	references: z.record(z.string(), referenceChildrenResponseSchema).optional()
}).meta({ id: "ContentItem" });
/** Response for single content item endpoints (get, create, update) */
var contentResponseSchema = z.object({
	item: contentItemSchema,
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" })
}).meta({ id: "ContentResponse" });
/** Response for restoring an item from trash */
var contentRestoreResponseSchema = z.object({
	restored: z.literal(true),
	item: contentItemSchema,
	_rev: z.string().meta({ description: "Opaque revision token for optimistic concurrency" })
}).meta({ id: "ContentRestoreResponse" });
/** Response for content list endpoints */
var contentListResponseSchema = z.object({
	items: z.array(contentItemSchema),
	nextCursor: z.string().optional(),
	total: z.number().int().nonnegative().optional()
}).meta({ id: "ContentListResponse" });
/** A distinct content author for the admin author filter */
var contentAuthorSchema = z.object({
	id: z.string(),
	name: z.string().nullable(),
	email: z.string(),
	avatarUrl: z.string().nullable()
}).meta({ id: "ContentAuthor" });
/** Response for the content authors endpoint */
var contentAuthorsResponseSchema = z.object({ items: z.array(contentAuthorSchema) }).meta({ id: "ContentAuthorsResponse" });
/** Trashed content item */
var trashedContentItemSchema = z.object({
	id: z.string(),
	type: z.string(),
	slug: z.string().nullable(),
	status: z.string(),
	locale: z.string().nullable(),
	translationGroup: z.string().nullable(),
	data: z.record(z.string(), z.unknown()),
	authorId: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
	publishedAt: z.string().nullable(),
	deletedAt: z.string()
}).meta({ id: "TrashedContentItem" });
/** Response for trashed content list */
var trashedContentListResponseSchema = z.object({
	items: z.array(trashedContentItemSchema),
	nextCursor: z.string().optional(),
	total: z.number().int().nonnegative().optional()
}).meta({ id: "TrashedContentListResponse" });
/** Response for content compare (live vs draft) */
var contentCompareResponseSchema = z.object({
	hasChanges: z.boolean(),
	live: z.record(z.string(), z.unknown()).nullable(),
	draft: z.record(z.string(), z.unknown()).nullable()
}).meta({ id: "ContentCompareResponse" });
/** Translation summary for a content item */
var contentTranslationSchema = z.object({
	id: z.string(),
	locale: z.string().nullable(),
	slug: z.string().nullable(),
	status: z.string(),
	updatedAt: z.string()
});
/** Response for content translations endpoint */
var contentTranslationsResponseSchema = z.object({
	translationGroup: z.string(),
	translations: z.array(contentTranslationSchema)
}).meta({ id: "ContentTranslationsResponse" });
var collectionSupportValues = z.enum([
	"drafts",
	"revisions",
	"preview",
	"scheduling",
	"no-scheduling",
	"search",
	"seo"
]);
var collectionSourcePattern = /^(template:.+|import:.+|manual|discovered|seed)$/;
var collectionListColumns = z.array(z.string().min(1).max(63).regex(slugPattern$1, "Invalid field slug format"));
var systemDateField = z.enum([
	"publishedAt",
	"createdAt",
	"updatedAt"
]);
var collectionDateField = z.union([systemDateField, z.string().min(1).max(63).regex(slugPattern$1, "Invalid field slug format")]);
var collectionAdminInputConfig = z.object({
	listColumns: collectionListColumns.max(4, `At most 4 list columns are allowed`).optional(),
	quickCreate: z.boolean().optional()
});
var collectionAdminResponseConfig = z.object({
	listColumns: collectionListColumns.optional(),
	quickCreate: z.boolean().optional()
});
var fieldTypeValues = z.enum([
	"string",
	"text",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect",
	"portableText",
	"image",
	"file",
	"reference",
	"json",
	"slug",
	"repeater",
	"blocks"
]);
var repeaterSubFieldValidation = z.object({ allowedMimeTypes: z.array(z.string().regex(/^[a-z0-9][a-z0-9!#$&^_+\-.]*\/[a-z0-9!#$&^_+\-.]*$/i, "Invalid MIME type")).min(1, "allowedMimeTypes must not be empty — omit the field to allow all types").max(64, "allowedMimeTypes may contain at most 64 entries").optional() });
var repeaterSubFieldSchema = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid slug format"),
	type: z.enum([
		"string",
		"text",
		"url",
		"number",
		"integer",
		"boolean",
		"datetime",
		"select",
		"image"
	]),
	label: z.string().min(1),
	required: z.boolean().optional(),
	options: z.array(z.string()).optional(),
	validation: repeaterSubFieldValidation.nullish().transform((value) => value ?? void 0).pipe(repeaterSubFieldValidation.optional())
});
var urlPatternValue = z.string().superRefine((pattern, ctx) => {
	try {
		compileUrlPattern(pattern);
	} catch (error) {
		ctx.addIssue({
			code: "custom",
			message: error instanceof Error ? error.message : "Invalid URL pattern"
		});
	}
});
var fieldValidation = z.object({
	required: z.boolean().optional(),
	min: z.number().optional(),
	max: z.number().optional(),
	minLength: z.number().int().min(0).optional(),
	maxLength: z.number().int().min(0).optional(),
	pattern: z.string().optional(),
	options: z.array(z.string()).optional(),
	subFields: z.array(repeaterSubFieldSchema).min(1).optional(),
	minItems: z.number().int().min(0).optional(),
	maxItems: z.number().int().min(1).optional(),
	allowedMimeTypes: z.array(z.string().regex(/^[a-z0-9][a-z0-9!#$&^_+\-.]*\/[a-z0-9!#$&^_+\-.]*$/i, "Invalid MIME type")).min(1, "allowedMimeTypes must not be empty — omit the field to allow all types").max(64, "allowedMimeTypes may contain at most 64 entries").optional(),
	targetCollection: z.string().min(1).optional(),
	multiple: z.boolean().optional(),
	relation: z.string().min(1).max(63).regex(slugPattern$1, "Invalid relation slug format").optional(),
	relationSide: z.enum(["parent", "child"]).optional(),
	allowedTypes: z.array(z.string().min(1).max(63).regex(slugPattern$1)).optional(),
	retiredTypes: z.array(z.string().min(1).max(63).regex(slugPattern$1)).optional()
}).superRefine((validation, ctx) => {
	for (const [minimum, maximum] of [
		["min", "max"],
		["minLength", "maxLength"],
		["minItems", "maxItems"]
	]) {
		const minimumValue = validation[minimum];
		const maximumValue = validation[maximum];
		if (minimumValue !== void 0 && maximumValue !== void 0 && minimumValue > maximumValue) ctx.addIssue({
			code: "custom",
			path: [maximum],
			message: `${maximum} must be greater than or equal to ${minimum}`
		});
	}
	if (validation.pattern !== void 0) try {
		RegExp(validation.pattern);
	} catch {
		ctx.addIssue({
			code: "custom",
			path: ["pattern"],
			message: "Invalid validation pattern"
		});
	}
}).optional();
var fieldWidgetOptions = z.record(z.string(), z.unknown()).optional();
/** Admin sidebar folder label; an empty string clears it like `null`. */
var navGroupValue = z.string().trim().max(100);
var createCollectionBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid slug format"),
	label: z.string().min(1),
	labelSingular: z.string().optional(),
	description: z.string().optional(),
	icon: z.string().trim().max(64).optional(),
	admin: collectionAdminInputConfig.optional(),
	supports: z.array(collectionSupportValues).optional(),
	source: z.string().regex(collectionSourcePattern).optional(),
	urlPattern: urlPatternValue.optional(),
	routable: z.boolean().optional(),
	hasSeo: z.boolean().optional(),
	hidden: z.boolean().optional(),
	sortOrder: z.number().int().nullish(),
	editLocking: z.boolean().optional(),
	group: navGroupValue.nullish()
}).meta({ id: "CreateCollectionBody" });
var updateCollectionBody = z.object({
	label: z.string().min(1).optional(),
	labelSingular: z.string().optional(),
	description: z.string().optional(),
	icon: z.string().trim().max(64).optional(),
	admin: collectionAdminInputConfig.optional(),
	supports: z.array(collectionSupportValues).optional(),
	urlPattern: z.string().nullish(),
	routable: z.boolean().optional(),
	hasSeo: z.boolean().optional(),
	hidden: z.boolean().optional(),
	sortOrder: z.number().int().nullish(),
	group: navGroupValue.nullish(),
	commentsEnabled: z.boolean().optional(),
	commentsModeration: z.enum([
		"all",
		"first_time",
		"none"
	]).optional(),
	commentsClosedAfterDays: z.number().int().min(0).optional(),
	commentsAutoApproveUsers: z.boolean().optional(),
	editLocking: z.boolean().optional(),
	titleField: z.string().min(1).max(63).regex(slugPattern$1, "Invalid field slug format").nullish(),
	dateField: collectionDateField.nullish()
}).meta({ id: "UpdateCollectionBody" });
var createFieldBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid slug format"),
	label: z.string().min(1),
	type: fieldTypeValues,
	required: z.boolean().optional(),
	unique: z.boolean().optional(),
	defaultValue: z.unknown().optional(),
	validation: fieldValidation.nullable(),
	widget: z.string().optional(),
	options: fieldWidgetOptions,
	sortOrder: z.number().int().min(0).optional(),
	searchable: z.boolean().optional(),
	indexed: z.boolean().optional(),
	translatable: z.boolean().optional()
}).meta({ id: "CreateFieldBody" });
var updateFieldBody = z.object({
	label: z.string().min(1).optional(),
	type: fieldTypeValues.optional(),
	required: z.boolean().optional(),
	unique: z.boolean().optional(),
	defaultValue: z.unknown().optional(),
	validation: fieldValidation.nullable(),
	widget: z.string().optional(),
	options: fieldWidgetOptions,
	sortOrder: z.number().int().min(0).optional(),
	searchable: z.boolean().optional(),
	indexed: z.boolean().optional(),
	translatable: z.boolean().optional()
}).meta({ id: "UpdateFieldBody" });
var fieldReorderBody = z.object({ fieldSlugs: z.array(z.string().min(1)) }).meta({ id: "FieldReorderBody" });
var collectionReorderBody = z.object({ slugs: z.array(z.string().min(1)) }).meta({ id: "CollectionReorderBody" });
var orphanRegisterBody = z.object({
	label: z.string().optional(),
	labelSingular: z.string().optional(),
	description: z.string().optional()
}).meta({ id: "OrphanRegisterBody" });
z.object({ format: z.string().optional() });
var blockFieldTypeValues = z.enum([
	"string",
	"text",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect",
	"portableText",
	"image",
	"file",
	"repeater"
]);
var blockFieldValidation = z.object({
	min: z.number().optional(),
	max: z.number().optional(),
	minLength: z.number().int().min(0).optional(),
	maxLength: z.number().int().min(0).optional(),
	pattern: z.string().optional(),
	options: z.array(z.string()).optional(),
	subFields: z.array(repeaterSubFieldSchema).min(1).optional(),
	minItems: z.number().int().min(0).optional(),
	maxItems: z.number().int().min(1).optional(),
	allowedMimeTypes: z.array(z.string()).min(1).max(64).optional()
}).strict().optional();
var blockFieldDefinitionSchema = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid field slug format"),
	label: z.string().min(1).max(200),
	type: blockFieldTypeValues,
	required: z.boolean().optional(),
	defaultValue: z.unknown().optional(),
	validation: blockFieldValidation,
	options: z.object({ darkVariant: z.boolean().optional() }).strict().optional()
}).strict();
var createBlockTypeBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid block type slug format"),
	label: z.string().min(1).max(200),
	description: z.string().optional(),
	icon: z.string().optional(),
	category: z.string().optional(),
	fields: z.array(blockFieldDefinitionSchema)
}).strict().meta({ id: "CreateBlockTypeBody" });
var updateBlockTypeBody = z.object({
	expectedFingerprint: z.string().min(1),
	label: z.string().min(1).max(200).optional(),
	description: z.string().nullish(),
	icon: z.string().nullish(),
	category: z.string().nullish(),
	fields: z.array(blockFieldDefinitionSchema).optional(),
	breaking: z.boolean().optional()
}).strict().meta({ id: "UpdateBlockTypeBody" });
var activateBlockTypeVersionBody = z.object({ expectedFingerprint: z.string().min(1) }).strict().meta({ id: "ActivateBlockTypeVersionBody" });
var collectionGetQuery = z.object({ includeFields: z.string().transform((v) => v === "true").optional() });
var collectionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	label: z.string(),
	labelSingular: z.string().nullable(),
	description: z.string().nullable(),
	icon: z.string().nullable(),
	admin: collectionAdminResponseConfig.optional(),
	supports: z.array(z.string()),
	source: z.string().nullable(),
	urlPattern: z.string().nullable(),
	routable: z.boolean(),
	hasSeo: z.boolean(),
	hidden: z.boolean(),
	sortOrder: z.number().int().nullable(),
	editLocking: z.boolean(),
	group: z.string().nullish(),
	createdAt: z.string(),
	updatedAt: z.string(),
	titleField: z.string().nullish(),
	dateField: z.string().nullish()
}).meta({ id: "Collection" });
var fieldSchema = z.object({
	id: z.string(),
	collectionId: z.string(),
	slug: z.string(),
	label: z.string(),
	type: fieldTypeValues,
	required: z.boolean(),
	unique: z.boolean(),
	defaultValue: z.unknown().nullable(),
	validation: z.record(z.string(), z.unknown()).nullable(),
	widget: z.string().nullable(),
	options: z.record(z.string(), z.unknown()).nullable(),
	blockTypes: z.array(z.lazy(() => blockTypeSchema)).optional(),
	blockTypeFingerprint: z.string().optional(),
	sortOrder: z.number().int(),
	searchable: z.boolean(),
	indexed: z.boolean(),
	translatable: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Field" });
var collectionResponseSchema = z.object({ item: collectionSchema }).meta({ id: "CollectionResponse" });
var collectionWithFieldsResponseSchema = z.object({ item: collectionSchema.extend({ fields: z.array(fieldSchema) }) }).meta({ id: "CollectionWithFieldsResponse" });
var collectionListResponseSchema = z.object({ items: z.array(collectionSchema) }).meta({ id: "CollectionListResponse" });
var fieldResponseSchema = z.object({ item: fieldSchema }).meta({ id: "FieldResponse" });
var fieldListResponseSchema = z.object({ items: z.array(fieldSchema) }).meta({ id: "FieldListResponse" });
var blockTypeVersionSchema = z.object({
	id: z.string(),
	blockTypeId: z.string(),
	version: z.number().int().positive(),
	fields: z.array(blockFieldDefinitionSchema),
	fingerprint: z.string(),
	active: z.boolean(),
	unsupportedTypes: z.array(z.object({
		type: z.string(),
		path: z.string()
	}).strict()).optional(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "BlockTypeVersion" });
var blockTypeSchema = z.object({
	id: z.string(),
	slug: z.string(),
	label: z.string(),
	description: z.string().optional(),
	icon: z.string().optional(),
	category: z.string().optional(),
	currentVersion: z.number().int().positive(),
	source: z.enum(["user", "seed"]),
	versions: z.array(blockTypeVersionSchema),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "BlockType" });
var blockTypeResponseSchema = z.object({ item: blockTypeSchema }).meta({ id: "BlockTypeResponse" });
var blockTypeListResponseSchema = z.object({ items: z.array(blockTypeSchema) }).meta({ id: "BlockTypeListResponse" });
var orphanedTableSchema = z.object({
	slug: z.string(),
	tableName: z.string(),
	rowCount: z.number().int()
}).meta({ id: "OrphanedTable" });
var orphanedTableListResponseSchema = z.object({ items: z.array(orphanedTableSchema) }).meta({ id: "OrphanedTableListResponse" });
var collectionSlug = z.string().min(1).max(63).regex(/^[a-z][a-z0-9_]*$/, "Invalid collection slug format");
var createTaxonomyDefBody = z.object({
	name: z.string().min(1).max(63).regex(/^[a-z][a-z0-9_]*$/, "Name must be lowercase alphanumeric with underscores"),
	label: z.string().min(1).max(200),
	labelSingular: z.string().min(1).max(200).optional(),
	hierarchical: z.boolean().optional(),
	collections: z.array(collectionSlug).max(100).optional(),
	locale: localeCode.optional(),
	translationOf: z.string().min(1).optional()
}).meta({ id: "CreateTaxonomyDefBody" });
/**
* `name` and `locale` are absent on purpose: both identify the definition row
* being written, and `.strict()` turns an attempt to change either into a 400
* rather than a silently ignored field.
*/
var updateTaxonomyDefBody = z.object({
	label: z.string().min(1).max(200).optional(),
	labelSingular: z.string().min(1).max(200).nullish(),
	hierarchical: z.boolean().optional(),
	collections: z.array(collectionSlug).max(100).optional()
}).strict().meta({ id: "UpdateTaxonomyDefBody" });
var createTermBody = z.object({
	slug: z.string().min(1).optional().meta({ description: "Term slug. Omit to derive a unique slug from the label." }),
	label: z.string().min(1),
	parentId: z.string().nullish(),
	description: z.string().optional(),
	locale: localeCode.optional(),
	translationOf: z.string().min(1).optional()
}).meta({ id: "CreateTermBody" });
var bulkTagBody = z.object({
	termId: z.string().min(1),
	apply: z.boolean().default(false),
	refreshOnly: z.boolean().optional(),
	items: z.array(z.union([z.object({
		collection: collectionSlug,
		id: z.string().min(1)
	}).strict(), z.object({ url: z.string().min(1).max(2048) }).strict()])).min(1).max(50)
}).strict().meta({ id: "BulkTagBody" });
var updateTermBody = z.object({
	slug: z.string().min(1).optional(),
	label: z.string().min(1).optional(),
	parentId: z.string().nullish(),
	description: z.string().optional()
}).meta({ id: "UpdateTermBody" });
var reorderTermsBody = z.object({
	parentId: z.string().min(1).nullish().meta({ description: "Parent term whose children are being ordered (translation_group or row id). Omit or null for the top level, which for a flat taxonomy is every term." }),
	ids: z.array(z.string().min(1)).max(100).meta({ description: "Terms to move, in the desired order — each a row id or translation_group. May be a subset of the group: the listed terms are permuted within the positions they already occupy and every other member keeps its place. An id outside the group is rejected with REORDER_MISMATCH." })
}).strict().meta({ id: "ReorderTermsBody" });
var termListQuery = z.object({
	locale: localeCode.optional(),
	includeCounts: z.enum(["true", "false"]).transform((v) => v === "true").optional().default(true).meta({ description: "Include each term's visible-usage count. Pass false to skip the aggregate; `count` is then absent from every term." }),
	resolveFallback: z.enum(["true", "false"]).transform((value) => value === "true").optional().default(false).meta({ description: "Resolve one term per translation group, preferring the requested locale and then the configured default locale." })
}).meta({ id: "TermListQuery" });
var taxonomyDefSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	labelSingular: z.string().optional(),
	hierarchical: z.boolean(),
	collections: z.array(z.string()),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "TaxonomyDef" });
var taxonomyDefTranslationsSchema = z.object({
	translationGroup: z.string().nullable(),
	translations: z.array(z.object({
		id: z.string(),
		name: z.string(),
		label: z.string(),
		locale: z.string()
	}))
}).meta({ id: "TaxonomyDefTranslations" });
var taxonomyListResponseSchema = z.object({ taxonomies: z.array(taxonomyDefSchema) }).meta({ id: "TaxonomyListResponse" });
var taxonomyResponseSchema = z.object({ taxonomy: taxonomyDefSchema }).meta({ id: "TaxonomyResponse" });
var termSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	label: z.string(),
	parentId: z.string().nullable(),
	description: z.string().optional(),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "Term" });
z.object({
	translationGroup: z.string().nullable(),
	translations: z.array(z.object({
		id: z.string(),
		slug: z.string(),
		label: z.string(),
		locale: z.string()
	}))
}).meta({ id: "TermTranslations" });
var termWithCountSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	label: z.string(),
	parentId: z.string().nullable(),
	description: z.string().optional(),
	count: z.number().int().optional(),
	children: z.array(z.lazy(() => termWithCountSchema)),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "TermWithCount" });
var termListResponseSchema = z.object({ terms: z.array(termWithCountSchema) }).meta({ id: "TermListResponse" });
var termResponseSchema = z.object({ term: termSchema }).meta({ id: "TermResponse" });
var termReorderResponseSchema = z.object({ reordered: z.literal(true) }).meta({ id: "TermReorderResponse" });
var termGetResponseSchema = z.object({ term: termSchema.extend({
	count: z.number().int(),
	children: z.array(z.object({
		id: z.string(),
		slug: z.string(),
		label: z.string()
	}))
}) }).meta({ id: "TermGetResponse" });
var sectionSource = z.enum([
	"theme",
	"user",
	"import"
]);
var sectionsListQuery = z.object({
	source: sectionSource.optional(),
	search: z.string().optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50),
	cursor: z.string().max(2048).optional()
}).meta({ id: "SectionsListQuery" });
var createSectionBody = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	description: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	content: z.array(z.record(z.string(), z.unknown())),
	previewMediaId: z.string().optional(),
	source: z.enum(["user", "import"]).optional(),
	themeId: z.string().optional()
}).meta({ id: "CreateSectionBody" });
var updateSectionBody = z.object({
	slug: z.string().min(1).optional(),
	title: z.string().min(1).optional(),
	description: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	previewMediaId: z.string().nullish()
}).meta({ id: "UpdateSectionBody" });
var sectionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	keywords: z.array(z.string()).nullable(),
	content: z.array(z.record(z.string(), z.unknown())),
	previewMediaId: z.string().nullable(),
	source: z.string(),
	themeId: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Section" });
var sectionListResponseSchema = z.object({
	items: z.array(sectionSchema),
	nextCursor: z.string().optional()
}).meta({ id: "SectionListResponse" });
var mediaReferenceInput = z.object({
	mediaId: z.string(),
	alt: z.string().optional()
});
var socialSettings = z.object({
	twitter: z.string().optional(),
	github: z.string().optional(),
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	linkedin: z.string().optional(),
	youtube: z.string().optional()
});
var seoSettingsInput = z.object({
	titleSeparator: z.string().max(10).optional(),
	defaultOgImage: mediaReferenceInput.nullable().optional(),
	robotsTxt: z.string().max(5e3).optional(),
	disallowAiTraining: z.boolean().optional(),
	googleVerification: z.string().max(100).optional(),
	bingVerification: z.string().max(100).optional()
});
var settingsUpdateBody = z.object({
	title: z.string().optional(),
	tagline: z.string().optional(),
	logo: mediaReferenceInput.nullable().optional(),
	favicon: mediaReferenceInput.nullable().optional(),
	url: z.union([httpUrl, z.literal("")]).optional(),
	staging: z.boolean().optional(),
	postsPerPage: z.number().int().min(1).max(100).optional(),
	dateFormat: z.string().optional(),
	timezone: z.string().optional(),
	social: socialSettings.optional(),
	seo: seoSettingsInput.optional()
}).meta({ id: "SettingsUpdateBody" });
var mediaReferenceResponse = z.object({
	mediaId: z.string(),
	alt: z.string().optional(),
	url: z.string().optional(),
	contentType: z.string().optional(),
	width: z.number().int().optional(),
	height: z.number().int().optional()
});
var seoSettingsResponse = z.object({
	titleSeparator: z.string().max(10).optional(),
	defaultOgImage: mediaReferenceResponse.optional(),
	robotsTxt: z.string().max(5e3).optional(),
	disallowAiTraining: z.boolean().optional(),
	googleVerification: z.string().max(100).optional(),
	bingVerification: z.string().max(100).optional()
});
var siteSettingsSchema = z.object({
	title: z.string().optional(),
	tagline: z.string().optional(),
	logo: mediaReferenceResponse.optional(),
	favicon: mediaReferenceResponse.optional(),
	url: z.string().optional(),
	staging: z.boolean().optional(),
	postsPerPage: z.number().int().optional(),
	dateFormat: z.string().optional(),
	timezone: z.string().optional(),
	social: socialSettings.optional(),
	seo: seoSettingsResponse.optional()
}).meta({ id: "SiteSettings" });
var searchQuery = z.object({
	q: z.string().min(1),
	collections: z.string().optional(),
	status: z.string().optional(),
	locale: localeCode.optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
	cursor: z.string().optional(),
	scope: z.enum(["all", "title"]).optional().meta({ description: "Which indexed fields to match against. 'title' matches only the collection's title field; collections without an indexed title field return no results. Defaults to 'all'." })
}).meta({ id: "SearchQuery" });
var searchSuggestQuery = z.object({
	q: z.string().min(1),
	collections: z.string().optional(),
	locale: localeCode.optional(),
	limit: z.coerce.number().int().min(1).max(20).optional()
}).meta({ id: "SearchSuggestQuery" });
var searchRebuildBody = z.object({ collection: z.string().min(1) }).meta({ id: "SearchRebuildBody" });
var searchEnableBody = z.object({
	collection: z.string().min(1),
	enabled: z.boolean(),
	weights: z.record(z.string(), z.number()).optional(),
	tokenize: z.enum(SEARCH_TOKENIZERS).optional()
}).meta({ id: "SearchEnableBody" });
var searchResultSchema = z.object({
	collection: z.string(),
	id: z.string(),
	slug: z.string().nullable(),
	locale: z.string(),
	title: z.string().optional(),
	snippet: z.string().optional(),
	score: z.number()
}).meta({ id: "SearchResult" });
var searchResponseSchema = z.object({
	items: z.array(searchResultSchema),
	nextCursor: z.string().optional()
}).meta({ id: "SearchResponse" });
var usersListQuery = z.object({
	search: z.string().optional(),
	role: z.string().optional(),
	cursor: z.string().max(2048).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50)
}).meta({ id: "UsersListQuery" });
var userUpdateBody = z.object({
	name: z.string().optional(),
	email: z.email().optional(),
	role: roleLevel.optional()
}).meta({ id: "UserUpdateBody" });
var allowedDomainCreateBody = z.object({
	domain: z.string().min(1),
	defaultRole: roleLevel
}).meta({ id: "AllowedDomainCreateBody" });
var allowedDomainUpdateBody = z.object({
	enabled: z.boolean().optional(),
	defaultRole: roleLevel.optional()
}).meta({ id: "AllowedDomainUpdateBody" });
var userSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	avatarUrl: z.string().nullable(),
	role: z.number().int(),
	emailVerified: z.boolean(),
	disabled: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	lastLogin: z.string().nullable(),
	credentialCount: z.number().int().optional(),
	oauthProviders: z.array(z.string()).optional()
}).meta({ id: "User" });
var userListResponseSchema = z.object({
	items: z.array(userSchema),
	nextCursor: z.string().optional()
}).meta({ id: "UserListResponse" });
var userDetailSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	avatarUrl: z.string().nullable(),
	role: z.number().int(),
	emailVerified: z.boolean(),
	disabled: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	lastLogin: z.string().nullable(),
	credentials: z.array(z.object({
		id: z.string(),
		name: z.string().nullable(),
		deviceType: z.string().nullable(),
		createdAt: z.string(),
		lastUsedAt: z.string()
	})),
	oauthAccounts: z.array(z.object({
		provider: z.string(),
		createdAt: z.string()
	}))
}).meta({ id: "UserDetail" });
var widgetType = z.enum([
	"content",
	"menu",
	"component"
]);
var createWidgetAreaBody = z.object({
	name: z.string().min(1),
	label: z.string().min(1),
	description: z.string().optional()
}).meta({ id: "CreateWidgetAreaBody" });
var createWidgetBody = z.object({
	type: widgetType,
	title: z.string().optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	menuName: z.string().optional(),
	componentId: z.string().optional(),
	componentProps: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "CreateWidgetBody" });
var updateWidgetBody = z.object({
	type: widgetType.optional(),
	title: z.string().optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	menuName: z.string().optional(),
	componentId: z.string().optional(),
	componentProps: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "UpdateWidgetBody" });
var reorderWidgetsBody = z.object({ widgetIds: z.array(z.string().min(1)) }).meta({ id: "ReorderWidgetsBody" });
var widgetAreaSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	description: z.string().nullable(),
	created_at: z.string(),
	updated_at: z.string()
}).meta({ id: "WidgetArea" });
var widgetSchema = z.object({
	id: z.string(),
	type: widgetType,
	title: z.string().optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	menuName: z.string().optional(),
	componentId: z.string().optional(),
	componentProps: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "Widget" });
var widgetAreaWithWidgetsSchema = widgetAreaSchema.extend({ widgets: z.array(widgetSchema) }).meta({ id: "WidgetAreaWithWidgets" });
var widgetAreaWithWidgetsAndCountSchema = widgetAreaWithWidgetsSchema.extend({ widgetCount: z.number().int() }).meta({ id: "WidgetAreaWithWidgetsAndCount" });
var entryLockAcquireBody = z.object({
	takeover: z.boolean().optional().meta({ description: "Take the lock from whoever holds it. Their next heartbeat or save reports the new holder." }),
	token: z.string().min(1).max(128).optional().meta({ description: "Identifies the caller's editing session. Send the same value on DELETE so a release from one tab does not drop a lock another tab of the same account still relies on." })
}).meta({ id: "EntryLockAcquireBody" });
var entryLockHolderSchema = z.object({
	userId: z.string(),
	userName: z.string().nullable(),
	acquiredAt: z.string(),
	expiresAt: z.string()
}).meta({ id: "EntryLockHolder" });
var entryLockStatusSchema = z.object({
	enabled: z.boolean().meta({ description: "Whether the collection takes edit locks at all. Always true while a room is open" }),
	holder: entryLockHolderSchema.nullable(),
	heldByCaller: z.boolean(),
	room: z.boolean().meta({ description: "Whether a co-editing room holds the entry. The room then stands as the holder, and taking the lock deletes every user lock on the entry instead of granting one." })
}).meta({ id: "EntryLockStatus" });
var entryLockReleaseResponseSchema = z.object({ released: z.boolean() }).meta({ id: "EntryLockReleaseResponse" });
z.object({
	success: z.literal(false),
	error: z.object({
		code: z.literal("ENTRY_LOCKED"),
		message: z.string(),
		details: entryLockHolderSchema
	})
});
var entryMutationConflictSchema = z.object({
	success: z.literal(false),
	error: z.object({
		code: z.string().meta({ examples: ["CONFLICT", "ENTRY_LOCKED"] }),
		message: z.string(),
		details: entryLockHolderSchema.optional()
	})
});
export { orphanedTableListResponseSchema as $, contentSeoInput as A, updateWidgetBody as At, createSectionBody as B, contentListResponseSchema as C, updateBlockTypeBody as Ct, contentRestoreResponseSchema as D, updateSectionBody as Dt, contentResponseSchema as E, updateRelationBody as Et, contentUpdateBody as F, usersListQuery as Ft, entryLockAcquireBody as G, createTermBody as H, createBlockTypeBody as I, widgetAreaSchema as It, entryMutationConflictSchema as J, entryLockReleaseResponseSchema as K, createCollectionBody as L, widgetAreaWithWidgetsAndCountSchema as Lt, contentTermsResponseSchema as M, userListResponseSchema as Mt, contentTranslationsResponseSchema as N, userSchema as Nt, contentRevisionConditionBody as O, updateTaxonomyDefBody as Ot, contentTrashQuery as P, userUpdateBody as Pt, orphanRegisterBody as Q, createFieldBody as R, widgetAreaWithWidgetsSchema as Rt, contentListQuery as S, trashedContentListResponseSchema as St, contentPublishBody as T, updateFieldBody as Tt, createWidgetAreaBody as U, createTaxonomyDefBody as V, createWidgetBody as W, fieldReorderBody as X, fieldListResponseSchema as Y, fieldResponseSchema as Z, contentAuthorsResponseSchema as _, termGetResponseSchema as _t, blockTypeResponseSchema as a, searchQuery as at, contentCreateBody as b, termReorderResponseSchema as bt, bylineTranslationCreateBody as c, searchSuggestQuery as ct, calendarQuery as d, sectionsListQuery as dt, relationListQuery as et, collectionGetQuery as f, settingsUpdateBody as ft, collectionWithFieldsResponseSchema as g, taxonomyResponseSchema as gt, collectionResponseSchema as h, taxonomyListResponseSchema as ht, blockTypeListResponseSchema as i, searchEnableBody as it, contentTermsBody as j, userDetailSchema as jt, contentScheduleBody as k, updateTermBody as kt, bylineUpdateBody as l, sectionListResponseSchema as lt, collectionReorderBody as m, taxonomyDefTranslationsSchema as mt, allowedDomainCreateBody as n, reorderWidgetsBody as nt, bulkTagBody as o, searchRebuildBody as ot, collectionListResponseSchema as p, siteSettingsSchema as pt, entryLockStatusSchema as q, allowedDomainUpdateBody as r, revisionRestoreBody as rt, bylineCreateBody as s, searchResponseSchema as st, activateBlockTypeVersionBody as t, reorderTermsBody as tt, bylinesListQuery as u, sectionSchema as ut, contentBylineInputSchema as v, termListQuery as vt, contentPreviewUrlBody as w, updateCollectionBody as wt, contentItemSchema as x, termResponseSchema as xt, contentCompareResponseSchema as y, termListResponseSchema as yt, createRelationBody as z, widgetSchema as zt };
