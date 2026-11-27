import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { w as validateIdentifier } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { t as ContentRepository } from "./content-2gjSbGP3_DRBiG6uA.mjs";
import { t as MediaRepository } from "./media--P-IEycF_BxdQj7uT.mjs";
import { t as UserRepository } from "./user-Cy4kOmtD_CPESG2fx.mjs";
import { r as isScheduledPolicyRejection, t as SCHEDULED_POLICY_REJECTION_PREFIX } from "./content-policy-Drm9sqdA_3UgDLujw.mjs";
import { t as getSchedulerHealth } from "./scheduler-health-B5n19775_DwF6ImgT.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { sql } from "kysely";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/dashboard.mjs
var dashboard_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Dashboard stats handler
*
* Returns summary data for the admin dashboard in a single request:
* collection content counts, media count, user count, and recent
* content across all collections.
*/
var POLICY_REJECTION_PREVIEW_LIMIT = 20;
/**
* Fetch dashboard statistics.
*
* Queries are intentionally lightweight — counts use indexed columns,
* and recent items are capped at 10.
*
* Without `includeDrafts` (callers lacking `content:read_drafts`), only
* published entries are counted or listed, and scheduled-publication policy
* rejections are omitted. Without `includeMediaCount` / `includeUserCount`,
* `mediaCount` / `userCount` are omitted.
*/
async function handleDashboardStats(db, { includeDrafts, includeMediaCount, includeUserCount }, now = /* @__PURE__ */ new Date()) {
	try {
		const collections = await db.selectFrom("_emdash_collections").select(["slug", "label"]).orderBy("slug", "asc").execute();
		const contentRepo = new ContentRepository(db);
		const collectionStats = await Promise.all(collections.map(async (col) => {
			const stats = await contentRepo.getStats(col.slug, now);
			if (!includeDrafts) return {
				slug: col.slug,
				label: col.label,
				total: stats.published,
				published: stats.published,
				draft: 0,
				scheduled: 0,
				overdueScheduled: 0
			};
			return {
				slug: col.slug,
				label: col.label,
				total: stats.total,
				published: stats.published,
				draft: stats.draft,
				scheduled: stats.scheduled,
				overdueScheduled: stats.overdueScheduled
			};
		}));
		const mediaRepo = new MediaRepository(db);
		const userRepo = new UserRepository(db);
		const optionsRepo = new OptionsRepository(db);
		const [mediaCount, userCount, schedulerHealth, policyRejectedScheduled, versionedPolicyRejectionOptions] = await Promise.all([
			includeMediaCount ? mediaRepo.count() : void 0,
			includeUserCount ? userRepo.count() : void 0,
			getSchedulerHealth(db, now),
			includeDrafts ? optionsRepo.countByPrefix(SCHEDULED_POLICY_REJECTION_PREFIX) : 0,
			includeDrafts ? optionsRepo.getVersionedByPrefix(SCHEDULED_POLICY_REJECTION_PREFIX, { limit: POLICY_REJECTION_PREVIEW_LIMIT }) : /* @__PURE__ */ new Map()
		]);
		const policyRejections = [...versionedPolicyRejectionOptions.values()].filter(({ value }) => isScheduledPolicyRejection(value)).map(({ value, revision }) => ({
			...value,
			_rev: revision
		}));
		return {
			success: true,
			data: {
				collections: collectionStats,
				mediaCount,
				userCount,
				recentItems: await fetchRecentItems(db, collections, includeDrafts),
				schedulerHealth,
				policyRejectedScheduled,
				policyRejections
			}
		};
	} catch (error) {
		console.error("Dashboard stats error:", error);
		return {
			success: false,
			error: {
				code: "DASHBOARD_STATS_ERROR",
				message: "Failed to load dashboard statistics"
			}
		};
	}
}
/**
* Fetch the 10 most recently updated items across all collections.
*
* Uses UNION ALL over each ec_* table. The query is safe because
* collection slugs come from the system table and are validated.
*
* `title` is not a standard column — it's a user-defined field. We query
* `_emdash_fields` to discover which collections have one and fall back
* to `slug` (which is always present) otherwise.
*
* Without `includeDrafts`, only published entries are considered.
*/
async function fetchRecentItems(db, collections, includeDrafts) {
	if (collections.length === 0) return [];
	const titleFields = await db.selectFrom("_emdash_fields as f").innerJoin("_emdash_collections as c", "c.id", "f.collection_id").select(["c.slug as collection_slug"]).where("f.slug", "=", "title").execute();
	const collectionsWithTitle = new Set(titleFields.map((r) => r.collection_slug));
	const statusFilter = includeDrafts ? sql`` : sql`AND status = 'published'`;
	return (await Promise.all(collections.map(async (col) => {
		validateIdentifier(col.slug);
		const table = `ec_${col.slug}`;
		const titleExpr = collectionsWithTitle.has(col.slug) ? sql`COALESCE(title, slug, id)` : sql`COALESCE(slug, id)`;
		return (await sql`
				SELECT
					id,
					${sql.lit(col.slug)} AS collection,
					${sql.lit(col.label)} AS collection_label,
					${titleExpr} AS title,
					slug,
					status,
					updated_at,
					author_id
				FROM ${sql.ref(table)}
				WHERE deleted_at IS NULL ${statusFilter}
				ORDER BY updated_at DESC
				LIMIT 10
			`.execute(db)).rows;
	}))).flat().toSorted((a, b) => a.updated_at < b.updated_at ? 1 : a.updated_at > b.updated_at ? -1 : 0).slice(0, 10).map((row) => ({
		id: row.id,
		collection: row.collection,
		collectionLabel: row.collection_label,
		title: row.title,
		slug: row.slug,
		status: row.status,
		updatedAt: row.updated_at,
		authorId: row.author_id
	}));
}
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		return unwrapResult(await handleDashboardStats(emdash.db, {
			includeDrafts: hasPermission(user, "content:read_drafts"),
			includeMediaCount: hasPermission(user, "media:read"),
			includeUserCount: hasPermission(user, "users:read")
		}));
	} catch (error) {
		return handleError(error, "Failed to load dashboard", "DASHBOARD_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dashboard@_@mjs
var page = () => dashboard_exports;
export { page };
