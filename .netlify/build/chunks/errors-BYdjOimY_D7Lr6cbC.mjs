// node_modules/emdash/dist/errors-BYdjOimY.mjs
var MISSING_FTS5_PATTERN = /no such (?:module: fts5\b|function: bm25\b)/i;
/** Search requires SQLite's FTS5 extension, which some Node builds omit. */
var SearchUnavailableError = class extends Error {
	code = "SEARCH_UNAVAILABLE";
	constructor(cause) {
		super("Search is unavailable because this SQLite build does not include FTS5. Use a SQLite build with FTS5 support, then enable search for the affected collections.", { cause });
		this.name = "SearchUnavailableError";
	}
};
function normalizeSearchError(error) {
	if (error instanceof Error && MISSING_FTS5_PATTERN.test(error.message)) return new SearchUnavailableError(error);
	return error;
}
export { normalizeSearchError as n, SearchUnavailableError as t };
