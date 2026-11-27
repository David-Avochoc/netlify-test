import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { f as hasScope } from "./passkey_BrGsIm4_.mjs";
// node_modules/emdash/dist/scopes-CHc86VzZ.mjs
/**
* Scope enforcement for API token authentication.
*
* Routes call `requireScope(locals, "content:write")` alongside role checks.
* Session-authenticated requests have no scope restrictions (implicit full access).
* Token-authenticated requests must have the required scope (or "admin").
*/
/**
* Check if the request has a required scope.
* Returns a 403 Response if the scope is missing, or null if OK.
*
* For session-authenticated users (no tokenScopes), always returns null
* since session auth has implicit full scope.
*/
function requireScope(locals, scope) {
	if (!locals.tokenScopes) return null;
	if (hasScope(locals.tokenScopes, scope)) return null;
	return apiError("INSUFFICIENT_SCOPE", `Token lacks required scope: ${scope}`, 403);
}
/** Like {@link requireScope}, but satisfied by any of `scopes`. */
function requireAnyScope(locals, scopes) {
	const tokenScopes = locals.tokenScopes;
	if (!tokenScopes) return null;
	if (scopes.some((scope) => hasScope(tokenScopes, scope))) return null;
	return apiError("INSUFFICIENT_SCOPE", `Token lacks required scope: ${scopes.join(" or ")}`, 403);
}
export { requireScope as n, requireAnyScope as t };
