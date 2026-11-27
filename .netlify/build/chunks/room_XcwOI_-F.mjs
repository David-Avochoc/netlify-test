import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { v as roomJoinBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { n as handleRoomJoin } from "./rooms-C08U-F8Y_B8AS33zD.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/room.mjs
var room_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var TRAILING_SLASH_RE = /\/$/;
var POST = async ({ params, request, locals, url }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (locals.tokenScopes !== void 0) return apiError("FORBIDDEN", "Joining a room requires a signed-in session", 403);
	const body = await parseBody(request, roomJoinBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleRoomJoin(emdash.db, emdash.rooms, {
		collection: params.collection,
		id: params.id,
		locale: url.searchParams.get("locale") || void 0,
		user,
		body,
		getManifest: () => emdash.getManifest(),
		playground: locals.__playgroundDb !== void 0,
		basePath: "/".replace(TRAILING_SLASH_RE, "")
	}));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/room@_@mjs
var page = () => room_exports;
export { page };
