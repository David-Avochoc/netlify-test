// node_modules/emdash/dist/content-policy-Drm9sqdA.mjs
var MAX_CONTENT_POLICY_REASON_LENGTH = 500;
var SCHEDULED_POLICY_REJECTION_PREFIX = "emdash:scheduled-policy-rejection:";
function isScheduledPolicyRejection(value) {
	if (!isRecord(value)) return false;
	if (typeof value.collection !== "string" || typeof value.id !== "string" || value.pluginId !== void 0 && typeof value.pluginId !== "string" || value.code !== void 0 && typeof value.code !== "string" || typeof value.rejectedAt !== "string") return false;
	return inspectContentPolicyDecision({
		cancel: true,
		reason: value.reason
	}).kind === "cancel";
}
/**
* An error message as a stored rejection reason: control characters become
* spaces and it is cut to {@link MAX_CONTENT_POLICY_REASON_LENGTH} code points,
* so it passes {@link isScheduledPolicyRejection} and is listed, not just
* counted. Returns undefined for a message with nothing left to show.
*/
function toScheduledRejectionReason(message) {
	if (!message) return void 0;
	let cleaned = "";
	for (const character of message) {
		const code = character.codePointAt(0);
		cleaned += code < 32 || code === 127 ? " " : character;
	}
	let reason = "";
	let length = 0;
	for (const character of cleaned.trim()) {
		if (length++ >= MAX_CONTENT_POLICY_REASON_LENGTH) break;
		reason += character;
	}
	reason = reason.trim();
	return reason.length > 0 ? reason : void 0;
}
function scheduledPolicyRejectionKey(collection, id) {
	return `${SCHEDULED_POLICY_REJECTION_PREFIX}${encodeURIComponent(collection)}:${encodeURIComponent(id)}`;
}
function containsForbiddenControlCharacter(value) {
	for (const character of value) {
		const code = character.codePointAt(0);
		if (code < 32 && code !== 9 && code !== 10 && code !== 13 || code === 127) return true;
	}
	return false;
}
function codePointLength(value) {
	let length = 0;
	for (const _character of value) length++;
	return length;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function inspectContentPolicyDecision(value) {
	if (value === void 0) return { kind: "allow" };
	if (!isRecord(value)) return { kind: "invalid" };
	if (Object.keys(value).length !== 2) return { kind: "invalid" };
	if (!Object.hasOwn(value, "cancel") || value.cancel !== true) return { kind: "invalid" };
	if (!Object.hasOwn(value, "reason") || typeof value.reason !== "string") return { kind: "invalid" };
	const reason = value.reason.trim();
	if (reason.length === 0 || codePointLength(reason) > MAX_CONTENT_POLICY_REASON_LENGTH || containsForbiddenControlCharacter(reason)) return { kind: "invalid" };
	return {
		kind: "cancel",
		reason
	};
}
export { toScheduledRejectionReason as a, scheduledPolicyRejectionKey as i, inspectContentPolicyDecision as n, isScheduledPolicyRejection as r, SCHEDULED_POLICY_REJECTION_PREFIX as t };
