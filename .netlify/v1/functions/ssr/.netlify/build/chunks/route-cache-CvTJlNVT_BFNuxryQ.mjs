import { t as chunks } from "./chunks-CvgCLYip_BPNjBngy.mjs";
// node_modules/emdash/dist/route-cache-CvTJlNVT.mjs
async function getCommentRouteCacheTags(db, ids, action) {
	const tags = /* @__PURE__ */ new Set();
	for (const batch of chunks([...new Set(ids)], 50)) {
		const comments = await db.selectFrom("_emdash_comments").select([
			"collection",
			"content_id",
			"status"
		]).where("id", "in", batch).execute();
		if (action === "delete") {
			const replies = await db.selectFrom("_emdash_comments").select([
				"collection",
				"content_id",
				"status"
			]).where("parent_id", "in", batch).where("status", "=", "approved").execute();
			comments.push(...replies);
		}
		for (const comment of comments) if (action === "approve" ? comment.status !== "approved" : comment.status === "approved") {
			tags.add(comment.collection);
			tags.add(comment.content_id);
		}
	}
	return [...tags];
}
export { getCommentRouteCacheTags as t };
