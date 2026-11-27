import { t as isValidFocalPointUpdate } from "./focal-point-Cup37tLI_BNfHGmCJ.mjs";
import { t as MEDIA_USAGE_SITE_SETTINGS } from "./site-settings-B7VxSqP6_BRHgHgYj.mjs";
import { r as cursorPaginationQuery, v as slugPattern } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { z } from "zod";
// node_modules/emdash/dist/media-Cq_oKN_Y.mjs
var mediaUsageCoverageStatusSchema = z.enum([
	"complete",
	"never",
	"running",
	"partial",
	"failed",
	"stale",
	"unknown"
]).meta({ id: "MediaUsageCoverageStatus" });
var mediaUsageCoverageSchema = z.object({
	scope: z.literal("all_content_collections"),
	status: mediaUsageCoverageStatusSchema
}).meta({ id: "MediaUsageCoverage" });
var mediaUsageProgressSchema = z.object({
	status: z.enum([
		"indexing",
		"ready",
		"needs_attention"
	]),
	readyCollections: z.number().int().min(0),
	totalCollections: z.number().int().min(0)
}).meta({ id: "MediaUsageProgress" });
var mediaUsageSummarySchema = z.object({
	count: z.number().int().min(0).nullable(),
	coverage: mediaUsageCoverageSchema
}).meta({ id: "MediaUsageSummary" });
var mediaUsageDetailsQuery = z.object({
	cursor: z.string().min(1).max(2048).optional().meta({ description: "Opaque content-entry-group cursor" }),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50).meta({ description: "Maximum number of content entry groups to return (1-100, default 50)" })
});
var mediaUsageOccurrenceDetailSchema = z.object({
	fieldSlug: z.string(),
	fieldPath: z.string(),
	occurrenceIndex: z.number().int().min(0),
	referenceType: z.enum([
		"image_field",
		"file_field",
		"portable_text_image",
		"portable_text_video",
		"link",
		"unknown"
	])
}).meta({ id: "MediaUsageOccurrenceDetail" });
var mediaUsageSourceDetailSchema = z.object({
	variant: z.enum(["columns", "draft_overlay"]),
	occurrences: z.array(mediaUsageOccurrenceDetailSchema)
}).meta({ id: "MediaUsageSourceDetail" });
var mediaUsageEntryDetailSchema = z.object({
	collection: z.string(),
	contentId: z.string(),
	title: z.string().nullable(),
	slug: z.string().nullable(),
	locale: z.string().nullable(),
	status: z.string().nullable(),
	scheduledAt: z.string().nullable(),
	deletedAt: z.string().nullable(),
	sources: z.array(mediaUsageSourceDetailSchema)
}).meta({ id: "MediaUsageEntryDetail" });
var mediaUsageSiteSettingDetailSchema = z.object({ setting: z.enum(MEDIA_USAGE_SITE_SETTINGS) }).meta({ id: "MediaUsageSiteSettingDetail" });
var mediaUsageDetailsResponseSchema = z.object({
	items: z.array(mediaUsageEntryDetailSchema),
	nextCursor: z.string().optional(),
	siteSettings: z.array(mediaUsageSiteSettingDetailSchema).meta({ description: "Site settings that select the media item, repeated on every page" }),
	coverage: mediaUsageCoverageSchema
}).meta({ id: "MediaUsageDetailsResponse" });
var mediaUsageRepairStatusSchema = z.enum([
	"complete",
	"partial",
	"failed",
	"stale"
]).meta({ id: "MediaUsageRepairStatus" });
var mediaUsageRepairCollectionBody = z.object({
	scope: z.literal("collection"),
	collection: z.string().min(1).max(63).regex(slugPattern, "Invalid collection slug")
}).strict();
var mediaUsageRepairAllBody = z.object({ scope: z.literal("all") }).strict();
var mediaUsageRepairBody = z.discriminatedUnion("scope", [mediaUsageRepairCollectionBody, mediaUsageRepairAllBody]).meta({ id: "MediaUsageRepairBody" });
var mediaUsageRepairCollectionSummarySchema = z.object({
	collection: z.string(),
	status: mediaUsageRepairStatusSchema,
	indexedSourceCount: z.number().int().min(0),
	failedSourceCount: z.number().int().min(0),
	skippedSourceCount: z.number().int().min(0),
	deletedSourceCount: z.number().int().min(0),
	lastErrorCode: z.string().nullable(),
	startedAt: z.string(),
	completedAt: z.string().nullable()
}).meta({ id: "MediaUsageRepairCollectionSummary" });
var mediaUsageRepairResponseSchema = z.object({
	status: mediaUsageRepairStatusSchema,
	indexedSourceCount: z.number().int().min(0),
	failedSourceCount: z.number().int().min(0),
	skippedSourceCount: z.number().int().min(0),
	deletedSourceCount: z.number().int().min(0),
	collections: z.array(mediaUsageRepairCollectionSummarySchema)
}).meta({ id: "MediaUsageRepairResponse" });
var mediaUsageWorkStateSchema = z.enum([
	"pending",
	"retry",
	"leased",
	"failed"
]).meta({ id: "MediaUsageWorkState" });
var mediaUsageWorkListQuery = z.object({
	collection: z.string().min(1).max(63).regex(slugPattern, "Invalid collection slug"),
	state: mediaUsageWorkStateSchema.optional(),
	cursor: z.string().min(1).max(2048).optional().meta({ description: "Opaque work-page cursor" }),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50).meta({ description: "Maximum number of work items to return (1-100, default 50)" })
});
var mediaUsageWorkItemSchema = z.object({
	collectionId: z.string(),
	collectionSlug: z.string(),
	contentId: z.string(),
	state: mediaUsageWorkStateSchema,
	attemptCount: z.number().int().min(0),
	nextAttemptAt: z.string(),
	leaseExpiresAt: z.string().nullable(),
	lastAttemptedAt: z.string().nullable(),
	lastErrorCode: z.string().nullable(),
	updatedAt: z.string()
}).meta({ id: "MediaUsageWorkItem" });
var mediaUsageWorkListResponseSchema = z.object({
	items: z.array(mediaUsageWorkItemSchema),
	nextCursor: z.string().optional()
}).meta({ id: "MediaUsageWorkListResponse" });
var boundedOpaqueMediaUsageId = z.string().min(1).max(2048);
var mediaUsageWorkRetryBody = z.object({
	collectionId: boundedOpaqueMediaUsageId.meta({ description: "Current immutable collection identity" }),
	contentId: boundedOpaqueMediaUsageId.meta({ description: "Content entry identity, including a deleted entry" })
}).strict().meta({ id: "MediaUsageWorkRetryBody" });
var mediaUsageWorkRetryResponseSchema = z.object({
	changed: z.boolean(),
	item: mediaUsageWorkItemSchema
}).meta({ id: "MediaUsageWorkRetryResponse" });
var mediaUsageWorkRetryConflictSchema = z.object({
	success: z.literal(false),
	error: z.discriminatedUnion("code", [z.object({
		code: z.literal("WORK_LEASE_ACTIVE"),
		message: z.string(),
		details: z.object({ leaseExpiresAt: z.string() })
	}), z.object({
		code: z.literal("WORK_CHANGED"),
		message: z.string()
	})])
});
var mediaUsageActivationStateSchema = z.enum([
	"expanded",
	"activating",
	"active"
]).meta({ id: "MediaUsageActivationState" });
var mediaUsageActivationStatusSchema = z.object({
	state: mediaUsageActivationStateSchema,
	collectionCursor: z.string().nullable(),
	attemptCount: z.number().int().min(0),
	drainConfirmedAt: z.string().nullable(),
	lastAttemptedAt: z.string().nullable(),
	lastErrorCode: z.literal("MEDIA_USAGE_ACTIVATION_FAILED").nullable(),
	leaseExpiresAt: z.string().nullable(),
	activatedAt: z.string().nullable(),
	updatedAt: z.string()
}).meta({ id: "MediaUsageActivationStatus" });
var mediaUsageActivationAdvanceBody = z.object({ writersDrained: z.literal(true) }).strict().meta({ id: "MediaUsageActivationAdvanceBody" });
var mediaUsageActivationAdvanceResponseSchema = z.object({
	outcome: z.enum(["activating", "active"]),
	processedCollections: z.number().int().min(0).max(1),
	activation: mediaUsageActivationStatusSchema
}).meta({ id: "MediaUsageActivationAdvanceResponse" });
var mediaUsageProgressAdvanceResponseSchema = z.object({
	activation: mediaUsageActivationStatusSchema,
	progress: mediaUsageProgressSchema.nullable(),
	nextRequestInMs: z.union([
		z.literal(0),
		z.literal(3e4),
		z.null()
	])
}).meta({ id: "MediaUsageProgressAdvanceResponse" });
var mediaUsageActivationConflictSchema = z.object({
	success: z.literal(false),
	error: z.discriminatedUnion("code", [
		z.object({
			code: z.literal("MEDIA_USAGE_ACTIVATION_BUSY"),
			message: z.string(),
			details: z.object({ leaseExpiresAt: z.string() })
		}),
		z.object({
			code: z.literal("MEDIA_USAGE_ACTIVATION_CONFLICT"),
			message: z.string()
		}),
		z.object({
			code: z.literal("MEDIA_USAGE_ACTIVATION_VERSION_MISMATCH"),
			message: z.string()
		})
	])
});
var mediaUsageCollectionDeletionStateSchema = z.enum([
	"pending",
	"retry",
	"leased",
	"failed"
]).meta({ id: "MediaUsageCollectionDeletionState" });
var mediaUsageCollectionDeletionPhaseSchema = z.enum([
	"fence",
	"registry",
	"table",
	"work",
	"sources",
	"status",
	"finalize"
]).meta({ id: "MediaUsageCollectionDeletionPhase" });
var mediaUsageCollectionDeletionListQuery = z.object({
	state: mediaUsageCollectionDeletionStateSchema.optional().default("failed"),
	cursor: z.string().min(1).max(2048).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50)
}).meta({ id: "MediaUsageCollectionDeletionListQuery" });
var mediaUsageCollectionDeletionItemSchema = z.object({
	collectionId: z.string(),
	collectionSlug: z.string(),
	state: mediaUsageCollectionDeletionStateSchema,
	phase: mediaUsageCollectionDeletionPhaseSchema,
	attemptCount: z.number().int().min(0),
	nextAttemptAt: z.string(),
	leaseExpiresAt: z.string().nullable(),
	lastErrorCode: z.string().nullable(),
	updatedAt: z.string()
}).meta({ id: "MediaUsageCollectionDeletionItem" });
var mediaUsageCollectionDeletionListResponseSchema = z.object({
	items: z.array(mediaUsageCollectionDeletionItemSchema),
	nextCursor: z.string().optional()
}).meta({ id: "MediaUsageCollectionDeletionListResponse" });
var mediaUsageCollectionDeletionRetryBody = z.object({ collectionId: boundedOpaqueMediaUsageId }).strict().meta({ id: "MediaUsageCollectionDeletionRetryBody" });
var mediaUsageCollectionDeletionRetryResponseSchema = z.object({
	changed: z.boolean(),
	item: mediaUsageCollectionDeletionItemSchema
}).meta({ id: "MediaUsageCollectionDeletionRetryResponse" });
/**
* Accepts a comma-separated string (from URL query params) or an array of
* strings (from JSON body or programmatic use) and normalises to string[].
*/
var mimeTypeFilter = z.union([z.string(), z.array(z.string())]).transform((v) => {
	return (Array.isArray(v) ? v : v.split(",")).map((s) => s.trim()).filter((s) => s.length > 0);
}).optional();
var mediaListQuery = cursorPaginationQuery.extend({
	page: z.coerce.number().int().min(1).max(Number.MAX_SAFE_INTEGER).optional(),
	mimeType: mimeTypeFilter,
	folderId: z.union([z.literal("unfiled"), z.string().min(1).max(64)]).optional().meta({ description: "Filter by a media folder ID. Use `unfiled` for the Main library; omit for all media." }),
	q: z.string().trim().min(1).max(200).optional(),
	includeUsage: z.literal("1").optional().meta({ description: "Include a coverage-aware usage summary on each media item" })
}).refine(({ cursor, page }) => cursor === void 0 || page === void 0, {
	message: "cursor and page cannot be used together",
	path: ["page"]
}).meta({ id: "MediaListQuery" });
var mediaGetQuery = z.object({ includeUsage: z.literal("1").optional().meta({ description: "Include a coverage-aware usage summary on the media item" }) }).meta({ id: "MediaGetQuery" });
var mediaUpdateBody = z.object({
	alt: z.string().optional(),
	caption: z.string().optional(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional(),
	folderId: z.union([z.literal("unfiled"), z.string().min(1).max(64)]).nullable().optional().transform((value) => value === "unfiled" ? null : value).meta({ description: "Assign a media folder ID, or use null or `unfiled` to return the item to the Main library." }),
	focalX: z.number().min(0).max(1).nullable().optional(),
	focalY: z.number().min(0).max(1).nullable().optional()
}).superRefine((value, context) => {
	if (!isValidFocalPointUpdate(value)) context.addIssue({
		code: "custom",
		message: "focalX and focalY must both be numbers or both be null",
		path: ["focalX"]
	});
}).meta({ id: "MediaUpdateBody" });
var mediaFolderIdSchema = z.string().min(1).max(64);
var mediaFolderListQuery = cursorPaginationQuery.extend({ q: z.string().trim().min(1).max(200).optional() }).meta({ id: "MediaFolderListQuery" });
var mediaFolderNameSchema = z.string().refine((value) => {
	const length = value.trim().length;
	return length >= 1 && length <= 200;
}, { message: "Folder name must be between 1 and 200 characters" });
var mediaFolderBody = z.object({ name: mediaFolderNameSchema }).meta({ id: "MediaFolderBody" });
/** Default maximum allowed file upload size (50 MB). */
var DEFAULT_MAX_UPLOAD_SIZE = 52428800;
function formatFileSize(bytes) {
	if (bytes < 1024) return `${bytes}B`;
	if (bytes < 1048576) return `${Math.floor(bytes / 1024)}KB`;
	return `${Math.floor(bytes / 1024 / 1024)}MB`;
}
var CONTENT_TYPE_RE = /^[a-z0-9][a-z0-9!#$&^_+\-.]*\/[a-z0-9!#$&^_+\-.]+(\s*;[^\r\n]*)?$/i;
function mediaUploadUrlBody(maxSize) {
	if (!Number.isFinite(maxSize) || maxSize <= 0) throw new Error(`EmDash: maxUploadSize must be a positive finite number, got ${maxSize}`);
	return z.object({
		filename: z.string().min(1, "filename is required"),
		contentType: z.string().min(1, "contentType is required").regex(CONTENT_TYPE_RE, "Invalid content type"),
		size: z.number().int().nonnegative().max(maxSize, `File size must not exceed ${formatFileSize(maxSize)}`),
		contentHash: z.string().optional(),
		fieldId: z.string().optional().describe("Schema field ID, repeaterFieldId.subFieldSlug, or outerFieldId:blockKey:fieldSlug[.subFieldSlug] for a block field"),
		blockType: z.string().optional().describe("Block type slug for a composite block fieldId"),
		blockVersion: z.number().int().positive().max(Number.MAX_SAFE_INTEGER).optional().describe("Retained block version containing the nested media field"),
		deduplicate: z.boolean().optional(),
		ensureUniqueFilename: z.boolean().optional(),
		folderId: mediaFolderIdSchema.nullable().optional()
	}).meta({ id: "MediaUploadUrlBody" });
}
var mediaUploadDeduplicateForm = z.enum(["true", "false"]).default("true").transform((value) => value === "true");
var mediaUploadEnsureUniqueFilenameForm = z.enum(["true", "false"]).default("false").transform((value) => value === "true");
var optionalMediaTextForm = z.string().optional().transform((value) => value === "" ? void 0 : value);
var mediaUploadMetadataForm = z.object({
	alt: optionalMediaTextForm,
	caption: optionalMediaTextForm
});
var mediaReplaceMetadataForm = z.object({
	width: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER),
	height: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER)
});
var binaryFileSchema = z.string().meta({ format: "binary" });
var mediaDirectUploadBody = z.object({
	file: binaryFileSchema,
	alt: z.string().optional(),
	caption: z.string().optional(),
	width: z.string().optional(),
	height: z.string().optional(),
	thumbnail: binaryFileSchema.optional(),
	fieldId: z.string().optional().describe("Schema field ID, repeaterFieldId.subFieldSlug, or outerFieldId:blockKey:fieldSlug[.subFieldSlug] for a block field"),
	blockType: z.string().optional().describe("Block type slug for a composite block fieldId"),
	blockVersion: z.string().optional().describe("Retained block version number as a string"),
	deduplicate: z.enum(["true", "false"]).optional(),
	ensureUniqueFilename: z.enum(["true", "false"]).optional(),
	folderId: z.union([mediaFolderIdSchema, z.literal("unfiled")]).optional()
}).meta({ id: "MediaDirectUploadBody" });
var mediaReplaceBody = z.object({
	file: binaryFileSchema,
	width: z.number().int().positive(),
	height: z.number().int().positive()
}).meta({ id: "MediaReplaceBody" });
var mediaConfirmBody = z.object({
	size: z.number().int().nonnegative().optional(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional(),
	thumbnail: z.object({
		contentType: z.enum(["image/jpeg", "image/png"]),
		data: z.string().max(32768)
	}).optional().meta({ description: "Optional base64-encoded JPEG or PNG thumbnail for LQIP generation. Used instead of decoding the full-resolution original when imagePlaceholders is enabled, on every runtime." })
}).meta({ id: "MediaConfirmBody" });
cursorPaginationQuery.extend({
	query: z.string().optional(),
	mimeType: mimeTypeFilter
}).meta({ id: "MediaProviderListQuery" });
var mediaStatusSchema = z.enum([
	"pending",
	"ready",
	"failed"
]);
var mediaItemSchema = z.object({
	id: z.string(),
	filename: z.string(),
	mimeType: z.string(),
	size: z.number().nullable(),
	width: z.number().nullable(),
	height: z.number().nullable(),
	focalX: z.number().nullable(),
	focalY: z.number().nullable(),
	alt: z.string().nullable(),
	caption: z.string().nullable(),
	storageKey: z.string(),
	status: mediaStatusSchema,
	contentHash: z.string().nullable(),
	blurhash: z.string().nullable(),
	dominantColor: z.string().nullable(),
	createdAt: z.string(),
	authorId: z.string().nullable(),
	folderId: z.string().nullable()
}).meta({ id: "MediaItem" });
var mediaFolderSchema = z.object({
	id: z.string(),
	name: z.string()
}).meta({ id: "MediaFolder" });
var mediaFolderResponseSchema = z.object({ item: mediaFolderSchema }).meta({ id: "MediaFolderResponse" });
var mediaFolderListResponseSchema = z.object({
	items: z.array(mediaFolderSchema),
	nextCursor: z.string().optional()
}).meta({ id: "MediaFolderListResponse" });
var mediaResponseSchema = z.object({ item: mediaItemSchema }).meta({ id: "MediaResponse" });
var mediaReadItemSchema = mediaItemSchema.extend({ usage: mediaUsageSummarySchema.optional() }).meta({ id: "MediaReadItem" });
var mediaReadResponseSchema = z.object({ item: mediaReadItemSchema }).meta({ id: "MediaReadResponse" });
var mediaListReadItemSchema = mediaReadItemSchema.extend({ url: z.string() }).meta({ id: "MediaListReadItem" });
var mediaListReadResponseSchema = z.object({
	items: z.array(mediaListReadItemSchema),
	nextCursor: z.string().optional(),
	totalCount: z.number().int().nonnegative().optional()
}).meta({ id: "MediaListReadResponse" });
var mediaListResponseSchema = z.object({
	items: z.array(mediaItemSchema),
	nextCursor: z.string().optional(),
	totalCount: z.number().int().nonnegative().optional()
}).meta({ id: "MediaListResponse" });
var mediaUploadUrlResponseSchema = z.object({
	uploadUrl: z.string(),
	method: z.literal("PUT"),
	headers: z.record(z.string(), z.string()),
	mediaId: z.string(),
	storageKey: z.string(),
	expiresAt: z.string()
}).meta({ id: "MediaUploadUrlResponse" });
var mediaExistingResponseSchema = z.object({
	existing: z.literal(true),
	mediaId: z.string(),
	storageKey: z.string(),
	url: z.string()
}).meta({ id: "MediaExistingResponse" });
var mediaConfirmResponseSchema = z.object({ item: mediaItemSchema.extend({ url: z.string() }) }).meta({ id: "MediaConfirmResponse" });
var mediaUploadResponseSchema = z.object({
	item: mediaItemSchema.extend({ url: z.string() }),
	deduplicated: z.literal(true).optional()
}).meta({ id: "MediaUploadResponse" });
var mediaReplaceResponseSchema = z.object({ item: mediaItemSchema.extend({ url: z.string() }) }).meta({ id: "MediaReplaceResponse" });
var mediaStreamUploadResponseSchema = z.object({
	uploaded: z.literal(true),
	size: z.number().int().nonnegative()
}).meta({ id: "MediaStreamUploadResponse" });
export { mediaUsageActivationAdvanceBody as A, mediaUsageProgressAdvanceResponseSchema as B, mediaUpdateBody as C, mediaUploadResponseSchema as D, mediaUploadMetadataForm as E, mediaUsageCollectionDeletionListResponseSchema as F, mediaUsageWorkListResponseSchema as G, mediaUsageRepairBody as H, mediaUsageCollectionDeletionRetryBody as I, mediaUsageWorkRetryResponseSchema as J, mediaUsageWorkRetryBody as K, mediaUsageCollectionDeletionRetryResponseSchema as L, mediaUsageActivationConflictSchema as M, mediaUsageActivationStatusSchema as N, mediaUploadUrlBody as O, mediaUsageCollectionDeletionListQuery as P, mediaUsageDetailsQuery as R, mediaStreamUploadResponseSchema as S, mediaUploadEnsureUniqueFilenameForm as T, mediaUsageRepairResponseSchema as U, mediaUsageProgressSchema as V, mediaUsageWorkListQuery as W, mediaReadResponseSchema as _, mediaConfirmResponseSchema as a, mediaReplaceResponseSchema as b, mediaFolderBody as c, mediaFolderListResponseSchema as d, mediaFolderResponseSchema as f, mediaListResponseSchema as g, mediaListReadResponseSchema as h, mediaConfirmBody as i, mediaUsageActivationAdvanceResponseSchema as j, mediaUploadUrlResponseSchema as k, mediaFolderIdSchema as l, mediaListQuery as m, DEFAULT_MAX_UPLOAD_SIZE as n, mediaDirectUploadBody as o, mediaGetQuery as p, mediaUsageWorkRetryConflictSchema as q, formatFileSize as r, mediaExistingResponseSchema as s, CONTENT_TYPE_RE as t, mediaFolderListQuery as u, mediaReplaceBody as v, mediaUploadDeduplicateForm as w, mediaResponseSchema as x, mediaReplaceMetadataForm as y, mediaUsageDetailsResponseSchema as z };
