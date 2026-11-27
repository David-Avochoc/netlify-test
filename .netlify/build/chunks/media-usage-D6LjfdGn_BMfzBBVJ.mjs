import { a as __exportAll } from "./runner-Nv0yWP-G_mZbAgbBU.mjs";
import { a as InvalidCursorError } from "./types-BBH-w_KS_DiGw3TjO.mjs";
import { s as getMediaUsageActivationStatus, t as MediaUsageActivationVersionMismatchError } from "./activation-BRmrunZ3_BFONje3D.mjs";
import { n as MediaUsageRepository, t as MediaRepository } from "./media--P-IEycF_BxdQj7uT.mjs";
import { O as loadContentMediaUsageFields, R as runMediaUsageMaintenanceStep, U as withContentUsageCollectionLock, a as MEDIA_USAGE_CONTENT_SOURCE_VARIANTS, k as loadContentMediaUsageSnapshots, n as CONTENT_MEDIA_USAGE_ADAPTER_ID, o as MediaUsageBlockResolutionError, p as buildContentMediaUsageSourceKey, r as CONTENT_MEDIA_USAGE_COLLECTION_SCOPE, s as MediaUsageFieldDiscoveryError } from "./registry-CSLrHSx1_Ce4dsyNi.mjs";
import { t as ErrorCode } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { w as validateIdentifier } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { t as chunks } from "./chunks-CvgCLYip_BPNjBngy.mjs";
import { n as MediaUsageWorkRepository } from "./media-usage-work-C5HHgfEU_DdKNVgb2.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
import { n as MEDIA_USAGE_SITE_SETTING_OPTIONS, r as groupSiteSettingMediaUsage } from "./site-settings-B7VxSqP6_BRHgHgYj.mjs";
// node_modules/emdash/dist/content-repair-Dizo4qiY.mjs
var CONTENT_MEDIA_USAGE_REPAIR_ERROR = {
	COLLECTION_NOT_FOUND: "COLLECTION_NOT_FOUND",
	CONTENT_NOT_FOUND: "CONTENT_NOT_FOUND",
	DRAFT_REVISION_NOT_FOUND: "DRAFT_REVISION_NOT_FOUND",
	DRAFT_REVISION_MISMATCH: "DRAFT_REVISION_MISMATCH",
	DRAFT_REVISION_INVALID: "DRAFT_REVISION_INVALID",
	CONTENT_USAGE_REPAIR_ERROR: "CONTENT_USAGE_REPAIR_ERROR",
	CONTENT_USAGE_REPAIR_CONFLICT: "CONTENT_USAGE_REPAIR_CONFLICT",
	INVALID_REPEATER_VALIDATION: "INVALID_REPEATER_VALIDATION",
	INVALID_BLOCK_VALIDATION: "INVALID_BLOCK_VALIDATION",
	UNSUPPORTED_BLOCK_DEFINITION: "UNSUPPORTED_BLOCK_DEFINITION"
};
async function repairContentMediaUsageAll(db) {
	const collections = await loadContentMediaUsageCollectionRecords(db);
	const results = [];
	for (const collection of collections) results.push({
		collection,
		result: await repairContentMediaUsageCollectionSafely(db, collection)
	});
	return aggregateContentMediaUsageRepairAll(await filterExistingContentMediaUsageCollectionResults(db, results));
}
async function scanContentMediaUsageCollection(db, collectionSlug, expectedCollectionId) {
	validateIdentifier(collectionSlug, "collection slug");
	let collectionQuery = db.selectFrom("_emdash_collections").select("id").where("slug", "=", collectionSlug);
	if (expectedCollectionId !== void 0) collectionQuery = collectionQuery.where("id", "=", expectedCollectionId);
	const collection = await collectionQuery.executeTakeFirst();
	if (!collection) return null;
	const tableName = getContentTableName(collectionSlug);
	return {
		collectionSlug,
		contentIds: (await sql`
		SELECT content.id
		FROM ${sql.ref(tableName)} AS content
		WHERE EXISTS (
			SELECT 1
			FROM _emdash_collections AS collection
			WHERE collection.id = ${collection.id}
				AND collection.slug = ${collectionSlug}
		)
		ORDER BY content.id ASC
	`.execute(db)).rows.map((row) => row.id)
	};
}
async function repairContentMediaUsageCollection(db, input) {
	validateIdentifier(input.collectionSlug, "collection slug");
	return withContentUsageCollectionLock(input.collectionSlug, () => repairContentMediaUsageCollectionUnlocked(db, input.collectionSlug));
}
async function loadContentMediaUsageCollectionRecords(db) {
	return db.selectFrom("_emdash_collections").select(["id", "slug"]).orderBy("slug", "asc").execute();
}
async function repairContentMediaUsageCollectionSafely(db, collection) {
	try {
		return await withContentUsageCollectionLock(collection.slug, () => repairContentMediaUsageCollectionUnlocked(db, collection.slug, collection.id));
	} catch (error) {
		console.error(`[media-usage] Failed to repair collection ${collection.slug}:`, error);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		return {
			scope: contentMediaUsageCollectionScope(collection.slug),
			status: "failed",
			indexedSourceCount: 0,
			failedSourceCount: 0,
			skippedSourceCount: 0,
			deletedSourceCount: 0,
			lastErrorCode: CONTENT_MEDIA_USAGE_REPAIR_ERROR.CONTENT_USAGE_REPAIR_ERROR,
			startedAt: now,
			completedAt: now
		};
	}
}
async function filterExistingContentMediaUsageCollectionResults(db, results) {
	const identityBound = await isIncrementalCaptureActive(db);
	const currentCollections = await loadContentMediaUsageCollectionRecordsSafely(db);
	const currentIdsBySlug = new Map(currentCollections.map((collection) => [collection.slug, collection.id]));
	const includedResults = [];
	const excludedResults = [];
	for (const { collection, result } of results) if (currentIdsBySlug.get(collection.slug) === collection.id) includedResults.push(result);
	else excludedResults.push({
		collection,
		result
	});
	if (excludedResults.length > 0) {
		const repo = new MediaUsageRepository(db);
		for (const excluded of excludedResults) await repo.deleteIndexStatus(excluded.result.scope, identityBound ? excluded.collection.id : void 0);
	}
	return includedResults;
}
async function loadContentMediaUsageCollectionRecordsSafely(db) {
	try {
		return await loadContentMediaUsageCollectionRecords(db);
	} catch {}
	try {
		return await loadContentMediaUsageCollectionRecords(db);
	} catch (error) {
		console.error("[media-usage] Failed to reconcile all-content repair collections:", error);
		throw error;
	}
}
function aggregateContentMediaUsageRepairAll(collections) {
	return {
		status: determineRepairAllStatus(collections),
		collections: [...collections],
		indexedSourceCount: sumCollectionRepairCount(collections, "indexedSourceCount"),
		failedSourceCount: sumCollectionRepairCount(collections, "failedSourceCount"),
		skippedSourceCount: sumCollectionRepairCount(collections, "skippedSourceCount"),
		deletedSourceCount: sumCollectionRepairCount(collections, "deletedSourceCount")
	};
}
function determineRepairAllStatus(collections) {
	if (collections.length === 0) return "complete";
	if (collections.every((collection) => collection.status === "complete")) return "complete";
	if (collections.some((collection) => collection.status === "stale")) return "stale";
	if (collections.some((collection) => collection.status === "partial")) return "partial";
	if (collections.every((collection) => collection.status === "failed")) return "failed";
	return "partial";
}
function sumCollectionRepairCount(collections, key) {
	return collections.reduce((sum, collection) => sum + collection[key], 0);
}
async function repairContentMediaUsageCollectionUnlocked(db, collectionSlug, expectedCollectionId) {
	const requestedAt = (/* @__PURE__ */ new Date()).toISOString();
	const scope = contentMediaUsageCollectionScope(collectionSlug);
	const identityBound = await isIncrementalCaptureActive(db);
	const collection = await loadContentMediaUsageCollectionRecord(db, collectionSlug);
	if (!collection || identityBound && expectedCollectionId && collection.id !== expectedCollectionId) return {
		scope,
		status: "failed",
		indexedSourceCount: 0,
		failedSourceCount: 0,
		skippedSourceCount: 0,
		deletedSourceCount: 0,
		lastErrorCode: CONTENT_MEDIA_USAGE_REPAIR_ERROR.COLLECTION_NOT_FOUND,
		startedAt: requestedAt,
		completedAt: requestedAt
	};
	const repo = new MediaUsageRepository(db);
	const runToken = ulid();
	let startedAt = requestedAt;
	let execution;
	if (identityBound) {
		const run = await repo.beginIndexStatusRepairAtCurrentEpoch({
			...scope,
			collectionId: collection.id,
			runToken,
			schemaVersion: 2
		});
		if (!run) return {
			scope,
			status: "failed",
			indexedSourceCount: 0,
			failedSourceCount: 0,
			skippedSourceCount: 0,
			deletedSourceCount: 0,
			lastErrorCode: CONTENT_MEDIA_USAGE_REPAIR_ERROR.CONTENT_USAGE_REPAIR_ERROR,
			startedAt,
			completedAt: requestedAt
		};
		startedAt = run.startedAt;
		execution = {
			collectionId: collection.id,
			startingEpoch: run.changeEpoch
		};
	} else await repo.beginIndexStatusRepair({
		...scope,
		runToken,
		schemaVersion: 2,
		startedAt
	});
	try {
		const scan = await scanContentMediaUsageCollection(db, collectionSlug, execution?.collectionId);
		if (!scan) {
			const completedAt = (/* @__PURE__ */ new Date()).toISOString();
			return await finalizeRepairStatus(db, repo, {
				...scope,
				runToken,
				counts: {
					indexedSourceCount: 0,
					failedSourceCount: 0,
					skippedSourceCount: 0,
					deletedSourceCount: 0,
					lastErrorCode: CONTENT_MEDIA_USAGE_REPAIR_ERROR.COLLECTION_NOT_FOUND,
					missingContentIds: /* @__PURE__ */ new Set()
				},
				status: "failed",
				startedAt,
				completedAt,
				execution
			});
		}
		const counts = await repairScannedContentSources(db, repo, scan, execution?.collectionId);
		const finalScan = await scanContentMediaUsageCollection(db, collectionSlug, execution?.collectionId);
		if (!finalScan) {
			counts.failedSourceCount++;
			counts.lastErrorCode = CONTENT_MEDIA_USAGE_REPAIR_ERROR.COLLECTION_NOT_FOUND;
		} else if (!sameContentIds(repairedContentIds(scan.contentIds, counts), finalScan.contentIds)) markRepairConflict(counts);
		const completedAt = (/* @__PURE__ */ new Date()).toISOString();
		const status = determineRepairStatus(counts);
		return await finalizeRepairStatus(db, repo, {
			...scope,
			runToken,
			counts,
			status,
			startedAt,
			completedAt,
			execution
		});
	} catch (error) {
		if (!(error instanceof MediaUsageFieldDiscoveryError) && !(error instanceof MediaUsageBlockResolutionError)) console.error(`[media-usage] Failed to repair collection ${collectionSlug}:`, error);
		const completedAt = (/* @__PURE__ */ new Date()).toISOString();
		const lastErrorCode = error instanceof MediaUsageFieldDiscoveryError ? error.code : error instanceof MediaUsageBlockResolutionError ? CONTENT_MEDIA_USAGE_REPAIR_ERROR.UNSUPPORTED_BLOCK_DEFINITION : CONTENT_MEDIA_USAGE_REPAIR_ERROR.CONTENT_USAGE_REPAIR_ERROR;
		return finalizeRepairStatus(db, repo, {
			...scope,
			runToken,
			counts: {
				indexedSourceCount: 0,
				failedSourceCount: 0,
				skippedSourceCount: 0,
				deletedSourceCount: 0,
				lastErrorCode,
				missingContentIds: /* @__PURE__ */ new Set()
			},
			status: "failed",
			startedAt,
			completedAt,
			execution
		});
	}
}
async function repairScannedContentSources(db, repo, scan, collectionId) {
	const counts = {
		indexedSourceCount: 0,
		failedSourceCount: 0,
		skippedSourceCount: 0,
		deletedSourceCount: 0,
		lastErrorCode: null,
		missingContentIds: /* @__PURE__ */ new Set()
	};
	const fieldDiscovery = await loadContentMediaUsageFields(db, scan.collectionSlug, collectionId);
	const observedSources = await repo.findSources(buildContentSourceKeysForScan(scan, collectionId));
	for (const contentId of scan.contentIds) await repairContentSource(db, repo, scan.collectionSlug, contentId, fieldDiscovery, observedSources, counts, collectionId);
	await reconcileOrphanedContentSources(db, repo, scan.collectionSlug, counts, collectionId);
	return counts;
}
async function repairContentSource(db, repo, collectionSlug, contentId, fieldDiscovery, observedSources, counts, collectionId) {
	const sourceKeys = buildContentSourceKeys(collectionSlug, contentId, collectionId);
	const snapshotsResult = await loadContentMediaUsageSnapshots(db, collectionSlug, contentId, fieldDiscovery, collectionId ? {
		collectionId,
		identityVersion: 1
	} : void 0);
	if (!snapshotsResult.success) {
		if (snapshotsResult.error === CONTENT_MEDIA_USAGE_REPAIR_ERROR.CONTENT_NOT_FOUND) {
			markRepairConflict(counts);
			counts.missingContentIds.add(contentId);
			return;
		}
		counts.lastErrorCode = snapshotsResult.error;
		if (snapshotsResult.snapshots) await repairSnapshotSources(repo, snapshotsResult.snapshots, observedSources, counts);
		if (snapshotsResult.source) {
			if ((await repo.markSourceAttemptedIfMatching({
				...snapshotsResult.source,
				sourceCompleteness: "failed",
				lastErrorCode: snapshotsResult.error
			}, observedSources.get(snapshotsResult.source.sourceKey) ?? null)).attempted) counts.failedSourceCount++;
			else markRepairConflict(counts);
			return;
		}
		counts.failedSourceCount++;
		return;
	}
	const expectedSourceKeys = await repairSnapshotSources(repo, snapshotsResult.snapshots, observedSources, counts);
	for (const sourceKey of sourceKeys) {
		if (expectedSourceKeys.has(sourceKey)) continue;
		const observedSource = observedSources.get(sourceKey);
		if (!observedSource) continue;
		await deleteObservedSource(repo, sourceKey, observedSource, counts);
	}
}
async function repairSnapshotSources(repo, snapshots, observedSources, counts) {
	const expectedSourceKeys = /* @__PURE__ */ new Set();
	for (const snapshot of snapshots) {
		expectedSourceKeys.add(snapshot.source.sourceKey);
		const result = await repo.replaceSourceIfMatching(snapshot.source, snapshot.occurrences, observedSources.get(snapshot.source.sourceKey) ?? null);
		if (result.replaced || result.unchanged) counts.indexedSourceCount++;
		else markRepairConflict(counts);
	}
	return expectedSourceKeys;
}
function markRepairConflict(counts) {
	counts.skippedSourceCount++;
	counts.lastErrorCode ??= CONTENT_MEDIA_USAGE_REPAIR_ERROR.CONTENT_USAGE_REPAIR_CONFLICT;
}
async function reconcileOrphanedContentSources(db, repo, collectionSlug, counts, collectionId) {
	const sources = await repo.findCollectionContentSources(collectionSlug, collectionId);
	const existingContentIds = await findExistingContentIds(db, collectionSlug, sources.flatMap((source) => source.contentId ? [source.contentId] : []), collectionId);
	for (const source of sources) {
		if (!source.contentId) {
			await deleteObservedSource(repo, source.sourceKey, source, counts);
			continue;
		}
		if (existingContentIds.has(source.contentId)) continue;
		await deleteObservedSourceIfContentAbsent(repo, collectionSlug, source, counts);
	}
}
async function findExistingContentIds(db, collectionSlug, contentIds, collectionId) {
	validateIdentifier(collectionSlug, "collection slug");
	const existingContentIds = /* @__PURE__ */ new Set();
	const uniqueContentIds = [...new Set(contentIds)];
	if (uniqueContentIds.length === 0) return existingContentIds;
	const tableName = getContentTableName(collectionSlug);
	for (const contentIdBatch of chunks(uniqueContentIds, 50)) {
		const result = await sql`
			SELECT content.id
			FROM ${sql.ref(tableName)} AS content
			WHERE content.id IN (${sql.join(contentIdBatch)})
			${collectionId ? sql`AND EXISTS (
						SELECT 1
						FROM _emdash_collections AS collection
						WHERE collection.id = ${collectionId}
							AND collection.slug = ${collectionSlug}
					)` : sql``}
		`.execute(db);
		for (const row of result.rows) existingContentIds.add(row.id);
	}
	return existingContentIds;
}
async function deleteObservedSourceIfContentAbsent(repo, collectionSlug, observedSource, counts) {
	if (!observedSource.contentId) return;
	const result = await repo.deleteSourceIfMatchingContentAbsent(observedSource.sourceKey, observedSource, collectionSlug, observedSource.contentId);
	if (result.deleted) {
		counts.deletedSourceCount++;
		return;
	}
	if (result.contentPresent) return;
	if (result.source) markRepairConflict(counts);
}
async function deleteObservedSource(repo, sourceKey, observedSource, counts) {
	const result = await repo.deleteSourceIfMatching(sourceKey, observedSource);
	if (result.deleted) {
		counts.deletedSourceCount++;
		return;
	}
	if (result.source) markRepairConflict(counts);
}
async function finalizeRepairStatus(db, repo, input) {
	let result;
	if (input.execution) {
		if (input.status === "complete") await new MediaUsageWorkRepository(db).deleteWorkThroughEpoch(input.execution.collectionId, input.execution.startingEpoch);
		result = await repo.finalizeIndexStatusRepairAtEpoch({
			adapterId: input.adapterId,
			scopeType: input.scopeType,
			scopeKey: input.scopeKey,
			collectionId: input.execution.collectionId,
			runToken: input.runToken,
			startingEpoch: input.execution.startingEpoch,
			status: input.status,
			schemaVersion: 2,
			indexedSourceCount: input.counts.indexedSourceCount,
			failedSourceCount: input.counts.failedSourceCount,
			lastErrorCode: input.counts.lastErrorCode
		});
	} else result = await repo.finalizeIndexStatusRepairIfRunning({
		adapterId: input.adapterId,
		scopeType: input.scopeType,
		scopeKey: input.scopeKey,
		runToken: input.runToken,
		status: input.status,
		schemaVersion: 2,
		completedAt: input.completedAt,
		indexedSourceCount: input.counts.indexedSourceCount,
		failedSourceCount: input.counts.failedSourceCount,
		lastErrorCode: input.counts.lastErrorCode
	});
	return {
		scope: {
			adapterId: input.adapterId,
			scopeType: input.scopeType,
			scopeKey: input.scopeKey
		},
		status: result.finalized ? input.status : "stale",
		indexedSourceCount: input.counts.indexedSourceCount,
		failedSourceCount: input.counts.failedSourceCount,
		skippedSourceCount: input.counts.skippedSourceCount,
		deletedSourceCount: input.counts.deletedSourceCount,
		lastErrorCode: result.finalized ? input.counts.lastErrorCode : result.status?.lastErrorCode ?? CONTENT_MEDIA_USAGE_REPAIR_ERROR.CONTENT_USAGE_REPAIR_CONFLICT,
		startedAt: input.startedAt,
		completedAt: result.finalized ? result.status?.completedAt ?? input.completedAt : null
	};
}
function determineRepairStatus(counts) {
	if (counts.failedSourceCount === 0 && counts.skippedSourceCount === 0) return "complete";
	const trustedProgress = counts.indexedSourceCount + counts.deletedSourceCount;
	if (counts.failedSourceCount > 0 && trustedProgress === 0) return "failed";
	return "partial";
}
function buildContentSourceKeys(collectionSlug, contentId, collectionId) {
	return MEDIA_USAGE_CONTENT_SOURCE_VARIANTS.map((sourceVariant) => buildContentMediaUsageSourceKey({
		collectionId,
		collectionSlug,
		contentId,
		sourceVariant
	}));
}
function buildContentSourceKeysForScan(scan, collectionId) {
	return scan.contentIds.flatMap((contentId) => buildContentSourceKeys(scan.collectionSlug, contentId, collectionId));
}
async function loadContentMediaUsageCollectionRecord(db, collectionSlug) {
	return await db.selectFrom("_emdash_collections").select(["id", "slug"]).where("slug", "=", collectionSlug).executeTakeFirst() ?? null;
}
async function isIncrementalCaptureActive(db) {
	return (await db.selectFrom("_emdash_media_usage_activation").select("state").where("task_key", "=", "incremental_capture").executeTakeFirst())?.state === "active";
}
function sameContentIds(left, right) {
	if (left.length !== right.length) return false;
	const rightIds = new Set(right);
	return left.every((id) => rightIds.has(id));
}
function repairedContentIds(contentIds, counts) {
	if (counts.missingContentIds.size === 0) return [...contentIds];
	return contentIds.filter((contentId) => !counts.missingContentIds.has(contentId));
}
function contentMediaUsageCollectionScope(collectionSlug) {
	return {
		adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
		scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
		scopeKey: collectionSlug
	};
}
function getContentTableName(collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	return `ec_${collectionSlug}`;
}
// node_modules/emdash/dist/media-usage-D6LjfdGn.mjs
var media_usage_exports = /* @__PURE__ */ __exportAll({
	aggregateMediaUsageCoverageStatus: () => aggregateMediaUsageCoverageStatus,
	handleMediaUsageDetails: () => handleMediaUsageDetails,
	handleMediaUsageProgress: () => handleMediaUsageProgress,
	handleMediaUsageProgressAdvance: () => handleMediaUsageProgressAdvance,
	handleMediaUsageRepair: () => handleMediaUsageRepair,
	handleMediaUsageSummaries: () => handleMediaUsageSummaries,
	toMediaUsageRepairResponse: () => toMediaUsageRepairResponse
});
async function handleMediaUsageProgress(db) {
	try {
		const progress = await new MediaUsageRepository(db).findCollectionProgress();
		if (!progress) return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_PROGRESS_NOT_ACTIVE,
				message: "Media Usage is not active"
			}
		};
		return {
			success: true,
			data: progress
		};
	} catch (error) {
		if (error instanceof MediaUsageActivationVersionMismatchError) return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_VERSION_MISMATCH,
				message: "Media Usage activation version does not match this runtime"
			}
		};
		console.error("[media-usage] progress read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_PROGRESS_READ_ERROR,
				message: "Failed to read media usage progress"
			}
		};
	}
}
async function handleMediaUsageProgressAdvance(db) {
	try {
		const step = await runMediaUsageMaintenanceStep(db);
		const activation = await getMediaUsageActivationStatus(db);
		if (activation.state === "expanded") return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_PROGRESS_NOT_ACTIVE,
				message: "Media Usage activation has not started"
			}
		};
		const progress = activation.state === "active" ? await new MediaUsageRepository(db).findCollectionProgress() : null;
		return {
			success: true,
			data: {
				activation,
				progress,
				nextRequestInMs: continuationDelayMs(step.continuation, progress)
			}
		};
	} catch (error) {
		if (error instanceof MediaUsageActivationVersionMismatchError) return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_VERSION_MISMATCH,
				message: "Media Usage activation version does not match this runtime"
			}
		};
		console.error("[media-usage] progress advance failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_PROGRESS_ADVANCE_ERROR,
				message: "Failed to advance media usage progress"
			}
		};
	}
}
function continuationDelayMs(continuation, progress) {
	if (progress?.status === "needs_attention") return null;
	if (continuation.kind === "immediate") return 0;
	if (continuation.kind === "delayed") return 3e4;
	if (progress?.status === "indexing") return 0;
	return null;
}
function aggregateMediaUsageCoverageStatus(scopes) {
	const statuses = scopes.map(normalizeMediaUsageCoverageStatus);
	if (statuses.every((status) => status === "complete")) return "complete";
	if (statuses.includes("unknown")) return "unknown";
	if (statuses.includes("running")) return "running";
	if (statuses.includes("stale")) return "stale";
	if (statuses.includes("partial")) return "partial";
	if (statuses.every((status) => status === "never")) return "never";
	if (statuses.every((status) => status === "failed")) return "failed";
	return "partial";
}
async function handleMediaUsageSummaries(db, mediaIds, options) {
	if (mediaIds.length === 0) return {
		success: true,
		data: {}
	};
	try {
		const repository = new MediaUsageRepository(db);
		const { coverage, siteSettings } = await loadMediaUsageCoverage(repository);
		const counts = options.includeCount && coverage.status === "complete" ? await repository.findActiveEntryCountsByMediaIds(mediaIds) : null;
		const summaries = {};
		for (const mediaId of new Set(mediaIds)) summaries[mediaId] = {
			count: counts ? (counts.get(mediaId) ?? 0) + (siteSettings.get(mediaId)?.length ?? 0) : null,
			coverage
		};
		return {
			success: true,
			data: summaries
		};
	} catch (error) {
		console.error("[media-usage] summary read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_READ_ERROR,
				message: "Failed to read media usage"
			}
		};
	}
}
async function handleMediaUsageDetails(db, mediaId, options) {
	try {
		if (!await new MediaRepository(db).findById(mediaId)) return {
			success: false,
			error: {
				code: ErrorCode.NOT_FOUND,
				message: `Media item not found: ${mediaId}`
			}
		};
		const repository = new MediaUsageRepository(db);
		const { coverage, siteSettings } = await loadMediaUsageCoverage(repository);
		const page = await repository.findCurrentEntryUsagePageByMediaId(mediaId, options);
		return {
			success: true,
			data: {
				items: page.items.map(toMediaUsageEntryDetail),
				...page.nextCursor ? { nextCursor: page.nextCursor } : {},
				siteSettings: (siteSettings.get(mediaId) ?? []).map((setting) => ({ setting })),
				coverage
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: ErrorCode.INVALID_CURSOR,
				message: error.message
			}
		};
		console.error("[media-usage] detail read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_READ_ERROR,
				message: "Failed to read media usage"
			}
		};
	}
}
async function handleMediaUsageRepair(db, input) {
	try {
		let result;
		if (input.scope === "collection") result = await repairContentMediaUsageCollection(db, { collectionSlug: input.collection });
		else if (input.scope === "all") result = await repairContentMediaUsageAll(db);
		else return {
			success: false,
			error: {
				code: ErrorCode.VALIDATION_ERROR,
				message: "Invalid media usage repair request"
			}
		};
		return {
			success: true,
			data: toMediaUsageRepairResponse(result)
		};
	} catch (error) {
		console.error("[media-usage] repair failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_REPAIR_ERROR,
				message: "Failed to repair media usage"
			}
		};
	}
}
function toMediaUsageRepairResponse(result) {
	const collections = "collections" in result ? result.collections : [result];
	return {
		status: result.status,
		indexedSourceCount: result.indexedSourceCount,
		failedSourceCount: result.failedSourceCount,
		skippedSourceCount: result.skippedSourceCount,
		deletedSourceCount: result.deletedSourceCount,
		collections: collections.map(toMediaUsageRepairCollectionSummary)
	};
}
function toMediaUsageRepairCollectionSummary(result) {
	return {
		collection: result.scope.scopeKey,
		status: result.status,
		indexedSourceCount: result.indexedSourceCount,
		failedSourceCount: result.failedSourceCount,
		skippedSourceCount: result.skippedSourceCount,
		deletedSourceCount: result.deletedSourceCount,
		lastErrorCode: result.lastErrorCode,
		startedAt: result.startedAt,
		completedAt: result.completedAt
	};
}
function normalizeMediaUsageCoverageStatus(scope) {
	if (scope.status === null) return "never";
	if (scope.status === "complete") {
		if (scope.reconciliationRequired) return "stale";
		return scope.schemaVersion === 2 ? "complete" : "stale";
	}
	if (scope.status === "never" || scope.status === "running" || scope.status === "partial" || scope.status === "failed" || scope.status === "stale") return scope.status;
	return "unknown";
}
async function loadMediaUsageCoverage(repository) {
	const { scopes, options } = await repository.findCoverageWithOptions({
		adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
		scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE
	}, MEDIA_USAGE_SITE_SETTING_OPTIONS);
	return {
		coverage: {
			scope: "all_content_collections",
			status: aggregateMediaUsageCoverageStatus(scopes)
		},
		siteSettings: groupSiteSettingMediaUsage(options)
	};
}
function toMediaUsageEntryDetail(group) {
	const preferred = group.sources.find(({ source }) => source.sourceVariant === "draft_overlay") ?? group.sources.find(({ source }) => source.sourceVariant === "columns");
	if (!preferred) throw new Error("Media usage entry has no supported source");
	return {
		collection: group.collectionSlug,
		contentId: group.contentId,
		title: preferred.source.contentTitle,
		slug: preferred.source.contentSlug,
		locale: preferred.source.locale,
		status: preferred.source.contentStatus,
		scheduledAt: preferred.source.contentScheduledAt,
		deletedAt: group.contentDeletedAt,
		sources: group.sources.flatMap(({ source, occurrences }) => {
			if (source.sourceVariant !== "columns" && source.sourceVariant !== "draft_overlay") return [];
			return [{
				variant: source.sourceVariant,
				occurrences: occurrences.map((occurrence) => ({
					fieldSlug: occurrence.fieldSlug,
					fieldPath: occurrence.fieldPath,
					occurrenceIndex: occurrence.occurrenceIndex,
					referenceType: normalizeMediaUsageReferenceType(occurrence.referenceType)
				}))
			}];
		})
	};
}
function normalizeMediaUsageReferenceType(referenceType) {
	if (referenceType === "image_field" || referenceType === "file_field" || referenceType === "portable_text_image" || referenceType === "portable_text_video" || referenceType === "link") return referenceType;
	return "unknown";
}
export { handleMediaUsageSummaries as a, handleMediaUsageRepair as i, handleMediaUsageProgress as n, media_usage_exports as o, handleMediaUsageProgressAdvance as r, handleMediaUsageDetails as t };
