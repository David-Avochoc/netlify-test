import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { r as mapErrorStatus } from "./errors-OTWh4SC__BXZuc-yp.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { S as contentListQuery, b as contentCreateBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { h as hasPermission } from "./dist__l0ohBBn.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs
var _collection__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleContentList) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	const collection = params.collection;
	const query = parseQuery(url, contentListQuery);
	if (isParseError(query)) return query;
	const params_ = hasPermission(user, "content:read_drafts") ? query : {
		...query,
		status: "published"
	};
	return unwrapResult(await emdash.handleContentList(collection, params_));
};
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleContentCreate || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:create");
	if (denied) return denied;
	const collection = params.collection;
	const body = await parseBody(request, contentCreateBody);
	if (isParseError(body)) return body;
	if (body.translationOf) {
		const source = await emdash.handleContentGet(collection, body.translationOf);
		if (!source.success) return apiError(source.error?.code ?? "NOT_FOUND", source.error?.message ?? "Translation source not found", mapErrorStatus(source.error?.code));
		const translationDenied = requireOwnerPerm(user, source.data.item.authorId ?? "", "content:edit_own", "content:edit_any");
		if (translationDenied) return translationDenied;
	}
	if ((body.publishedAt !== void 0 || body.createdAt !== void 0) && !hasPermission(user, "content:publish_any")) return apiError("FORBIDDEN", "Writing publishedAt or createdAt requires content:publish_any permission", 403);
	const actor = user ? {
		id: user.id,
		role: user.role
	} : void 0;
	return unwrapResult(await emdash.handleContentCreate(collection, {
		...body,
		authorId: user?.id,
		locale: body.locale,
		translationOf: body.translationOf,
		actor
	}), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/index@_@mjs
var page = () => _collection__exports;
export { page };
