import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
// node_modules/emdash/dist/scheduler-health-B5n19775.mjs
var SCHEDULER_HEARTBEAT_OPTION = "system:scheduler:last_completed_at";
var SCHEDULER_STALE_AFTER_MS = 3e5;
async function recordSchedulerHeartbeat(db, completedAt = /* @__PURE__ */ new Date()) {
	await new OptionsRepository(db).set(SCHEDULER_HEARTBEAT_OPTION, completedAt.toISOString());
}
async function recordSchedulerHeartbeatSafely(db, completedAt = /* @__PURE__ */ new Date()) {
	try {
		await recordSchedulerHeartbeat(db, completedAt);
	} catch (error) {
		console.error("[scheduler] Failed to record heartbeat:", error);
	}
}
async function getSchedulerHealth(db, now = /* @__PURE__ */ new Date()) {
	const lastCompletedAt = await new OptionsRepository(db).get(SCHEDULER_HEARTBEAT_OPTION);
	const lastCompletedAtMs = lastCompletedAt ? Date.parse(lastCompletedAt) : NaN;
	if (!lastCompletedAt || Number.isNaN(lastCompletedAtMs)) return {
		status: "unknown",
		lastCompletedAt: null
	};
	return {
		status: now.getTime() - lastCompletedAtMs > SCHEDULER_STALE_AFTER_MS ? "stale" : "healthy",
		lastCompletedAt
	};
}
export { recordSchedulerHeartbeatSafely as n, getSchedulerHealth as t };
