import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { o as handleSchemaCollectionDelete, s as handleSchemaCollectionGet, u as handleSchemaCollectionUpdate } from "./schema-D04_n_7j_avt2iKQU.mjs";
import { i as unwrapResult, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { f as collectionGetQuery, wt as updateCollectionBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs
var _slug__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	const slug = params.slug;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	const query = parseQuery(url, collectionGetQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await handleSchemaCollectionGet(emdash.db, slug, { includeFields: query.includeFields ?? false }));
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const slug = params.slug;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const body = await parseBody(request, updateCollectionBody);
	if (isParseError(body)) return body;
	const result = await handleSchemaCollectionUpdate(emdash.db, slug, body);
	emdash.invalidateUrlPatternCache();
	return unwrapResult(result);
};
var DELETE = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	const slug = params.slug;
	const force = url.searchParams.get("force") === "true";
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const result = await handleSchemaCollectionDelete(emdash.db, slug, { force });
	emdash.invalidateUrlPatternCache();
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index@_@mjs
var page = () => _slug__exports;
export { page };
