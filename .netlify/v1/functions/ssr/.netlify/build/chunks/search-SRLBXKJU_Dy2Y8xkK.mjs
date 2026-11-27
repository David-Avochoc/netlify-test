import { d as isSqlite } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
// node_modules/emdash/dist/search-SRLBXKJU.mjs
function requireSearchSupport(db) {
	if (isSqlite(db)) return null;
	return apiError("SEARCH_UNAVAILABLE", "Built-in search is unavailable on PostgreSQL, including Hyperdrive. Search requires SQLite, D1, or libSQL with FTS5 support.", 503);
}
export { requireSearchSupport as t };
