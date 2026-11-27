import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { _ as recoveryRevisionBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as handleRecoveryRevisionCreate } from "./rooms-C08U-F8Y_B8AS33zD.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs
var revisions_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var encoder = new TextEncoder();
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleRevisionList) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	const collection = params.collection;
	const id = params.id;
	const limitParam = url.searchParams.get("limit");
	const parsedLimit = limitParam ? parseInt(limitParam, 10) : void 0;
	return unwrapResult(await emdash.handleRevisionList(collection, id, { limit: parsedLimit ? Math.max(1, Math.min(parsedLimit, 100)) : void 0 }));
};
var POST = async ({ params, request, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (locals.tokenScopes !== void 0) return apiError("FORBIDDEN", "Saving a recovery revision requires a signed-in session", 403);
	const body = await parseBody(request, recoveryRevisionBody);
	if (isParseError(body)) return body;
	const data = {
		...body.data,
		_slug: body.slug
	};
	if (encoder.encode(JSON.stringify(data)).byteLength > 19e5) return apiError("PAYLOAD_TOO_LARGE", "The recovery revision is too large", 413);
	return unwrapResult(await handleRecoveryRevisionCreate(emdash.db, {
		collection: params.collection,
		id: params.id,
		locale: url.searchParams.get("locale") || void 0,
		user,
		data: body.data,
		slug: body.slug
	}), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions@_@mjs
var page = () => revisions_exports;
export { page };
