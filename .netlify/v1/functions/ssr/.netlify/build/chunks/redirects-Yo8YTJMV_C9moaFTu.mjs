import { t as LOCALE_CODE_PATTERN } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { r as isTerminalStatus, t as REDIRECT_RULE_STATUSES } from "./status-vvme29qV_DggpgIhl.mjs";
import { z } from "zod";
// node_modules/emdash/dist/redirects-Yo8YTJMV.mjs
/** Valid role level values */
var VALID_ROLE_LEVELS = /* @__PURE__ */ new Set([
	10,
	20,
	30,
	40,
	50
]);
/** Role level — coerces string/number to valid RoleLevel (10|20|30|40|50) */
var roleLevel = z.coerce.number().int().refine((n) => VALID_ROLE_LEVELS.has(n), { message: "Invalid role level. Must be 10, 20, 30, 40, or 50" });
/** Pagination query params — cursor-based */
var cursorPaginationQuery = z.object({
	cursor: z.string().max(2048).optional().meta({ description: "Opaque cursor for pagination" }),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50).meta({ description: "Maximum number of items to return (1-100, default 50)" })
}).meta({ id: "CursorPaginationQuery" });
z.object({
	limit: z.coerce.number().int().min(1).max(100).optional().default(50),
	offset: z.coerce.number().int().min(0).optional().default(0)
}).meta({ id: "OffsetPaginationQuery" });
/** Slug pattern: lowercase letters, digits, underscores; starts with letter */
var slugPattern = /^[a-z][a-z0-9_]*$/;
/** Matches http(s) scheme at start of URL */
var HTTP_SCHEME_RE = /^https?:\/\//i;
/** Validates that a URL string uses http or https scheme. Rejects javascript:/data: URI XSS vectors. */
var httpUrl = z.url().refine((url) => HTTP_SCHEME_RE.test(url), "URL must use http or https");
/**
* BCP 47 locale code — language with optional script/region subtags (e.g. en, en-US, pt-BR, es-419, zh-Hant).
* Validation is case-insensitive, but the value is preserved verbatim because the site config, stored
* `locale` columns, and public query path all keep the raw BCP-47 casing.
*/
var localeCode = z.string().regex(LOCALE_CODE_PATTERN, "Invalid locale code");
/** Shared `?locale=xx` query shape for endpoints that filter by locale. */
var localeFilterQuery = z.object({ locale: localeCode.optional() }).meta({ id: "LocaleFilterQuery" });
/** Standard API error response */
var apiErrorSchema = z.object({
	success: z.literal(false).meta({ description: "Discriminant: always false for errors" }),
	error: z.object({
		code: z.string().meta({
			description: "Machine-readable error code",
			examples: ["NOT_FOUND"]
		}),
		message: z.string().meta({ description: "Human-readable error message" })
	})
}).meta({ id: "ApiError" });
/** Wrap a data schema in the standard success envelope: { success: true, data: T } */
function successEnvelope(dataSchema) {
	return z.object({
		success: z.literal(true).meta({ description: "Discriminant: always true for success" }),
		data: dataSchema
	});
}
/** Standard delete response */
var deleteResponseSchema = z.object({ deleted: z.literal(true) }).meta({ id: "DeleteResponse" });
/** Media delete response: `storageDeleted` is false when the stored file survived and is retried by cleanup */
var mediaDeleteResponseSchema = deleteResponseSchema.extend({ storageDeleted: z.boolean() }).meta({ id: "MediaDeleteResponse" });
z.object({ count: z.number().int().min(0) }).meta({ id: "CountResponse" });
var redirectType = z.coerce.number().int().refine((n) => REDIRECT_RULE_STATUSES.includes(n), { message: "Redirect type must be 301, 302, 307, 308, 410, or 451" });
/** Matches CR or LF characters */
var CRLF = /[\r\n]/;
/** Path must start with / and not be protocol-relative, contain no CRLF, and no path traversal */
var urlPath = z.string().min(1).refine((s) => s.startsWith("/") && !s.startsWith("//"), { message: "Must be a path starting with / (no protocol-relative URLs)" }).refine((s) => !CRLF.test(s), { message: "URL must not contain newline characters" }).refine((s) => {
	try {
		return !decodeURIComponent(s).split("/").includes("..");
	} catch {
		return false;
	}
}, { message: "URL must not contain path traversal segments" });
var createRedirectBody = z.object({
	source: urlPath,
	destination: z.union([urlPath, z.literal("")]).optional(),
	type: redirectType.optional().default(301),
	enabled: z.boolean().optional().default(true),
	groupName: z.string().nullish()
}).refine((o) => isTerminalStatus(o.type ?? 301) || !!o.destination, {
	message: "destination is required for redirect types (301, 302, 307, 308)",
	path: ["destination"]
}).meta({ id: "CreateRedirectBody" });
var updateRedirectBody = z.object({
	source: urlPath.optional(),
	destination: z.union([urlPath, z.literal("")]).optional(),
	type: redirectType.optional(),
	enabled: z.boolean().optional(),
	groupName: z.string().nullish()
}).refine((o) => Object.values(o).some((v) => v !== void 0), { message: "At least one field must be provided" }).meta({ id: "UpdateRedirectBody" });
var redirectsListQuery = cursorPaginationQuery.extend({
	search: z.string().optional(),
	group: z.string().optional(),
	enabled: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
	auto: z.enum(["true", "false"]).transform((v) => v === "true").optional()
}).meta({ id: "RedirectsListQuery" });
var notFoundListQuery = cursorPaginationQuery.extend({ search: z.string().optional() }).meta({ id: "NotFoundListQuery" });
var notFoundSummaryQuery = z.object({ limit: z.coerce.number().int().min(1).max(100).optional().default(50) });
var notFoundPruneBody = z.object({ olderThan: z.iso.datetime({ message: "olderThan must be an ISO 8601 datetime" }).or(z.iso.datetime({
	precision: -1,
	message: "olderThan must be an ISO 8601 datetime"
})) }).meta({ id: "NotFoundPruneBody" });
var redirectSchema = z.object({
	id: z.string(),
	source: z.string(),
	destination: z.string(),
	type: z.number().int(),
	isPattern: z.boolean(),
	enabled: z.boolean(),
	hits: z.number().int(),
	lastHitAt: z.string().nullable(),
	groupName: z.string().nullable(),
	auto: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Redirect" });
var redirectListResponseSchema = z.object({
	items: z.array(redirectSchema),
	nextCursor: z.string().optional(),
	loopRedirectIds: z.array(z.string()).optional()
}).meta({ id: "RedirectListResponse" });
var notFoundEntrySchema = z.object({
	id: z.string(),
	path: z.string(),
	referrer: z.string().nullable(),
	userAgent: z.string().nullable(),
	ip: z.string().nullable(),
	createdAt: z.string()
}).meta({ id: "NotFoundEntry" });
var notFoundListResponseSchema = z.object({
	items: z.array(notFoundEntrySchema),
	nextCursor: z.string().optional()
}).meta({ id: "NotFoundListResponse" });
var notFoundSummarySchema = z.object({
	path: z.string(),
	count: z.number().int(),
	lastSeen: z.string(),
	topReferrer: z.string().nullable()
}).meta({ id: "NotFoundSummary" });
var notFoundSummaryResponseSchema = z.object({ items: z.array(notFoundSummarySchema) }).meta({ id: "NotFoundSummaryResponse" });
export { roleLevel as _, httpUrl as a, updateRedirectBody as b, mediaDeleteResponseSchema as c, notFoundPruneBody as d, notFoundSummaryQuery as f, redirectsListQuery as g, redirectSchema as h, deleteResponseSchema as i, notFoundListQuery as l, redirectListResponseSchema as m, createRedirectBody as n, localeCode as o, notFoundSummaryResponseSchema as p, cursorPaginationQuery as r, localeFilterQuery as s, apiErrorSchema as t, notFoundListResponseSchema as u, slugPattern as v, successEnvelope as y };
