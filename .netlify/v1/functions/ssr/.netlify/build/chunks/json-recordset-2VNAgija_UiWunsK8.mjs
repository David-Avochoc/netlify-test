import { u as isPostgres } from "./dialect-helpers-DRe1Y08G_GduuePu7.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/json-recordset-2VNAgija.mjs
function jsonTextValues(db, values) {
	const payload = JSON.stringify([...new Set(values)]);
	return isPostgres(db) ? sql`SELECT value::text AS value FROM jsonb_array_elements_text(${payload}::jsonb) AS value` : sql`SELECT value AS value FROM json_each(${payload})`;
}
export { jsonTextValues as t };
