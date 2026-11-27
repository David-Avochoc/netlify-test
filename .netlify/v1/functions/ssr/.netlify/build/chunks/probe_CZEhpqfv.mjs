import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { t as SsrfError } from "./ssrf-Em0CeaaN_C95clHBV.mjs";
import { n as parseBody, t as isParseError } from "./parse-BTfkfMuL_eSNNrZq9.mjs";
import { o as importProbeBody } from "./rooms-AcO0YNUt_DDp3Rekz.mjs";
import { l as probeUrl } from "./registry-2vAYgqCz_hl2mE_gm.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
// node_modules/emdash/dist/astro/routes/api/import/probe.mjs
var probe_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { user } = locals;
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	try {
		const body = await parseBody(request, importProbeBody);
		if (isParseError(body)) return body;
		return apiSuccess({
			success: true,
			result: await probeUrl(body.url)
		});
	} catch (error) {
		if (error instanceof SsrfError) return apiError("SSRF_BLOCKED", error.message, 400);
		return handleError(error, "Failed to probe URL", "PROBE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/probe@_@mjs
var page = () => probe_exports;
export { page };
