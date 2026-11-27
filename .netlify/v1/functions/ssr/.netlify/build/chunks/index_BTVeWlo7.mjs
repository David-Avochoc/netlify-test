import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as handleSectionList, t as handleSectionCreate } from "./sections-BK7soA2U_CzKRMbyR.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { B as createSectionBody, dt as sectionsListQuery } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/sections/index.mjs
var sections_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const denied = requirePerm(user, "sections:read");
	if (denied) return denied;
	try {
		const query = parseQuery(url, sectionsListQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleSectionList(db, query));
	} catch (error) {
		return handleError(error, "Failed to fetch sections", "SECTION_LIST_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const db = emdash.db;
	const denied = requirePerm(user, "sections:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, createSectionBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleSectionCreate(db, body), 201);
	} catch (error) {
		return handleError(error, "Failed to create section", "SECTION_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/index@_@mjs
var page = () => sections_exports;
export { page };
