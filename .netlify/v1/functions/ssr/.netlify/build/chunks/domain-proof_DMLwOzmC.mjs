import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { i as unwrapResult, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as handleDomainProof } from "./site-domain-B2KvJstd_CKoeYMlP.mjs";
// node_modules/emdash/dist/astro/routes/api/site/domain-proof.mjs
var domain_proof_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		return unwrapResult(await handleDomainProof(emdash.db));
	} catch (error) {
		return handleError(error, "Failed to read domain proof", "DOMAIN_PROOF_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/site/domain-proof@_@mjs
var page = () => domain_proof_exports;
export { page };
