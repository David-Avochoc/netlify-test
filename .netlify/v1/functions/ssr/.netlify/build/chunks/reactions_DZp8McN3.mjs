import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as resolveSecretsCached } from "./secrets-O25WpEe__B3AoQE_o.mjs";
import { d as invalidateCommentObjectCache } from "./object-cache-I4Re7BOR_CyRvBWDi.mjs";
import { i as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { l as createReactionBody } from "./comments-BFyw2y-m_rpr4pda_.mjs";
import { t as extractRequestMeta } from "./request-meta-B0TPrDpq_CQqqLgAB.mjs";
import { t as chunks } from "./chunks-CvgCLYip_BPNjBngy.mjs";
import { ulid } from "ulidx";
import { s as hashIp } from "./comments-D73Sy_2U_Ca-CN1Gs.mjs";
// node_modules/emdash/dist/comment-reaction-1Df3G-ij.mjs
/**
* Repository for comment reactions (likes / emoji).
*
* Reactions are deduped per (comment, voter, reaction) by a unique index, so
* a second toggle of the same reaction by the same voter removes it.
*/
var CommentReactionRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Toggle a reaction for a voter on a comment.
	*
	* @returns `{ reacted: true }` if the reaction was added, `{ reacted: false }`
	*   if an existing reaction was removed.
	*/
	async toggle(input) {
		if (((await this.db.insertInto("_emdash_comment_reactions").values({
			id: ulid(),
			comment_id: input.commentId,
			reaction: input.reaction,
			voter_hash: input.voterHash,
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}).onConflict((oc) => oc.columns([
			"comment_id",
			"voter_hash",
			"reaction"
		]).doNothing()).executeTakeFirst()).numInsertedOrUpdatedRows ?? 0n) > 0n) return { reacted: true };
		await this.db.deleteFrom("_emdash_comment_reactions").where("comment_id", "=", input.commentId).where("voter_hash", "=", input.voterHash).where("reaction", "=", input.reaction).execute();
		return { reacted: false };
	}
	/**
	* Aggregate reaction counts for a set of comments.
	*
	* @returns a Map keyed by comment id; comments with no reactions are absent.
	*/
	async countsForComments(commentIds) {
		const result = /* @__PURE__ */ new Map();
		if (commentIds.length === 0) return result;
		for (const batch of chunks(commentIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_comment_reactions").select(["comment_id", "reaction"]).select((eb) => eb.fn.count("id").as("count")).where("comment_id", "in", batch).groupBy(["comment_id", "reaction"]).execute();
			for (const row of rows) {
				const counts = result.get(row.comment_id) ?? {};
				counts[row.reaction] = Number(row.count);
				result.set(row.comment_id, counts);
			}
		}
		return result;
	}
	/**
	* Which reactions a given voter has set, per comment.
	*
	* @returns a Map keyed by comment id whose values are the reaction names the
	*   voter has active on that comment.
	*/
	async viewerReactions(commentIds, voterHash) {
		const result = /* @__PURE__ */ new Map();
		if (commentIds.length === 0) return result;
		for (const batch of chunks(commentIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_comment_reactions").select(["comment_id", "reaction"]).where("comment_id", "in", batch).where("voter_hash", "=", voterHash).execute();
			for (const row of rows) {
				const list = result.get(row.comment_id) ?? [];
				list.push(row.reaction);
				result.set(row.comment_id, list);
			}
		}
		return result;
	}
	/**
	* Count a voter's reactions within a recent time window (for rate limiting).
	*/
	async countRecentByVoter(voterHash, windowMinutes = 10) {
		const cutoff = (/* @__PURE__ */ new Date(Date.now() - windowMinutes * 60 * 1e3)).toISOString();
		const result = await this.db.selectFrom("_emdash_comment_reactions").select((eb) => eb.fn.count("id").as("count")).where("voter_hash", "=", voterHash).where("created_at", ">", cutoff).executeTakeFirst();
		return Number(result?.count ?? 0);
	}
};
// node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs
var reactions_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/** Max reactions a single voter may register per window before throttling. */
var REACTION_RATE_LIMIT = 30;
var REACTION_RATE_WINDOW_MINUTES = 10;
/**
* Reactions the system accepts. Positive-only for now (matches the shipped
* widget); kept as an allowlist so a voter can't spam arbitrary reaction
* strings and bloat a comment's count map. Extend (or make configurable) as
* the UI grows.
*/
var ALLOWED_REACTIONS = /* @__PURE__ */ new Set(["like"]);
/**
* Toggle a reaction for a voter on an approved comment belonging to the given
* content item. Rate-limited per voter.
*/
async function handleReactionToggle(db, params) {
	try {
		const { collection, contentId, commentId, reaction, voterHash } = params;
		if (!ALLOWED_REACTIONS.has(reaction)) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Unsupported reaction"
			}
		};
		const comment = await db.selectFrom("_emdash_comments").select(["id", "status"]).where("id", "=", commentId).where("collection", "=", collection).where("content_id", "=", contentId).executeTakeFirst();
		if (!comment) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Comment not found"
			}
		};
		if (comment.status !== "approved") return {
			success: false,
			error: {
				code: "COMMENT_NOT_APPROVED",
				message: "Cannot react to this comment"
			}
		};
		const repo = new CommentReactionRepository(db);
		if (await repo.countRecentByVoter(voterHash, REACTION_RATE_WINDOW_MINUTES) >= REACTION_RATE_LIMIT) return {
			success: false,
			error: {
				code: "RATE_LIMITED",
				message: "Too many reactions. Please try again later."
			}
		};
		const { reacted } = await repo.toggle({
			commentId,
			reaction,
			voterHash
		});
		const countsMap = await repo.countsForComments([commentId]);
		invalidateCommentObjectCache();
		return {
			success: true,
			data: {
				commentId,
				reaction,
				reacted,
				counts: countsMap.get(commentId) ?? {}
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REACTION_TOGGLE_ERROR",
				message: "Failed to toggle reaction"
			}
		};
	}
}
/**
* Read aggregate reaction counts for every approved comment on a content item,
* plus (optionally) which reactions the current voter has active.
*/
async function handleReactionCounts(db, collection, contentId, voterHash) {
	try {
		const ids = (await db.selectFrom("_emdash_comments").select("id").where("collection", "=", collection).where("content_id", "=", contentId).where("status", "=", "approved").execute()).map((c) => c.id);
		const repo = new CommentReactionRepository(db);
		const countsMap = await repo.countsForComments(ids);
		const reactions = {};
		for (const [id, counts] of countsMap) reactions[id] = counts;
		const data = { reactions };
		if (voterHash) {
			const viewerMap = await repo.viewerReactions(ids, voterHash);
			const viewer = {};
			for (const [id, list] of viewerMap) viewer[id] = list;
			data.viewer = viewer;
		}
		return {
			success: true,
			data
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REACTION_COUNTS_ERROR",
				message: "Failed to read reactions"
			}
		};
	}
}
var GET = async ({ params, request, locals }) => {
	const { emdash } = locals;
	const { collection, contentId } = params;
	if (!collection || !contentId) return apiError("VALIDATION_ERROR", "Collection and content ID required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const meta = extractRequestMeta(request, emdash.config);
		let voterHash = "unknown";
		if (meta.ip) {
			const { ipSalt } = await resolveSecretsCached(emdash.db);
			voterHash = await hashIp(meta.ip, ipSalt);
		}
		return unwrapResult(await handleReactionCounts(emdash.db, collection, contentId, voterHash));
	} catch (error) {
		return handleError(error, "Failed to read reactions", "REACTION_COUNTS_ERROR");
	}
};
var POST = async ({ params, request, locals }) => {
	const { emdash } = locals;
	const { collection, contentId } = params;
	if (!collection || !contentId) return apiError("VALIDATION_ERROR", "Collection and content ID required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, createReactionBody);
		if (isParseError(body)) return body;
		if (body.website_url) return apiSuccess({
			reacted: false,
			counts: {}
		});
		const meta = extractRequestMeta(request, emdash.config);
		let voterHash = "unknown";
		if (meta.ip) {
			const { ipSalt } = await resolveSecretsCached(emdash.db);
			voterHash = await hashIp(meta.ip, ipSalt);
		}
		return unwrapResult(await handleReactionToggle(emdash.db, {
			collection,
			contentId,
			commentId: body.commentId,
			reaction: body.reaction,
			voterHash
		}), 200);
	} catch (error) {
		return handleError(error, "Failed to toggle reaction", "REACTION_TOGGLE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions@_@mjs
var page = () => reactions_exports;
export { page };
