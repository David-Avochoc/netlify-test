import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { a as resolveSecretsCached } from "./secrets-O25WpEe__B3AoQE_o.mjs";
import { r as getPublicOrigin } from "./public-url-DYZMfvpa_vtmjwIux.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { o as requirePerm } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { n as parsePreviewSignatureHeader, r as verifyPreviewSignature, t as generateSnapshot } from "./snapshot-BaIv7afB_DpBM-STO.mjs";
import { n as resolveSessionUser } from "./session-user-BrCPLyWB_B1TZCa32.mjs";
// node_modules/emdash/dist/astro/routes/api/snapshot.mjs
var snapshot_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ request, locals, url, session }) => {
	const { emdash } = locals;
	let user = locals.user;
	if (!user && session && emdash?.db) try {
		const { createKyselyAdapter } = await import("./kysely_BTON22nH.mjs");
		const sessionUser = await resolveSessionUser(session);
		if (sessionUser?.id) {
			const resolved = await createKyselyAdapter(emdash.db).getUserById(sessionUser.id);
			if (resolved && !resolved.disabled) user = resolved;
		}
	} catch {}
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const previewSig = request.headers.get("X-Preview-Signature");
	let authorized = false;
	if (previewSig) {
		const { previewSecret: secret, previewSecretSource } = await resolveSecretsCached(emdash.db);
		const parsed = parsePreviewSignatureHeader(previewSig);
		if (!parsed) console.warn("[snapshot] Failed to parse X-Preview-Signature header");
		else {
			authorized = await verifyPreviewSignature(parsed.source, parsed.exp, parsed.sig, secret);
			if (!authorized) {
				const fields = {
					source: parsed.source,
					exp: parsed.exp,
					expired: parsed.exp < Date.now() / 1e3,
					secretSource: previewSecretSource
				};
				if (previewSecretSource === "db") fields.hint = "Set EMDASH_PREVIEW_SECRET in both this process and the signing process to share secrets across deployments";
				console.warn("[snapshot] Preview signature verification failed", fields);
			}
		}
	}
	if (!authorized) {
		const contentDenied = requirePerm(user, "content:read");
		if (contentDenied) return contentDenied;
		const schemaDenied = requirePerm(user, "schema:read");
		if (schemaDenied) return schemaDenied;
	}
	try {
		const includeDrafts = !authorized && url.searchParams.get("drafts") === "true";
		return apiSuccess(await generateSnapshot(emdash.db, {
			includeDrafts,
			origin: getPublicOrigin(url, emdash.config)
		}));
	} catch (error) {
		return handleError(error, "Failed to generate snapshot", "SNAPSHOT_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/snapshot@_@mjs
var page = () => snapshot_exports;
export { page };
