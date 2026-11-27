// node_modules/@emdash-cms/admin/dist/html-block.js
/**
* HTML block fields and the document an isolated HTML block renders in.
*
* Server-safe: the site renderer, the core converters and the admin editor
* all import this module, so isolated blocks look the same everywhere.
*/
var HTML_BLOCK_FRAME_MESSAGE = "emdash:html-block-frame";
/** Never add `allow-same-origin`: it would give author scripts the site's origin. */
var HTML_BLOCK_FRAME_SANDBOX = "allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation";
/**
* Read an HTML block's fields, keeping `css` and `js` only when non-empty and
* `isolated` only when true, so blocks saved before these fields existed
* round-trip to identical JSON.
*/
function htmlBlockFields(source) {
	const { html, css, js, isolated } = source;
	const fields = { html: typeof html === "string" ? html : "" };
	if (typeof css === "string" && css) fields.css = css;
	if (typeof js === "string" && js) fields.js = js;
	if (isolated === true) fields.isolated = true;
	return fields;
}
/**
* What the site's sanitizer keeps in inline HTML blocks: sanitize-html's
* default tags plus `img`, `span` and `iframe`. Changing it changes how
* existing inline blocks render. The admin's inline preview removes the same
* things, so it shows what the site renders.
*/
var SITE_HTML_ALLOWED_TAGS = [
	"address",
	"article",
	"aside",
	"footer",
	"header",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"hgroup",
	"main",
	"nav",
	"section",
	"blockquote",
	"dd",
	"div",
	"dl",
	"dt",
	"figcaption",
	"figure",
	"hr",
	"li",
	"menu",
	"ol",
	"p",
	"pre",
	"ul",
	"a",
	"abbr",
	"b",
	"bdi",
	"bdo",
	"br",
	"cite",
	"code",
	"data",
	"dfn",
	"em",
	"i",
	"kbd",
	"mark",
	"q",
	"rb",
	"rp",
	"rt",
	"rtc",
	"ruby",
	"s",
	"samp",
	"small",
	"span",
	"strong",
	"sub",
	"sup",
	"time",
	"u",
	"var",
	"wbr",
	"caption",
	"col",
	"colgroup",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"tr",
	"img",
	"iframe"
];
var SITE_HTML_ALLOWED_ATTRIBUTES = {
	"*": [
		"class",
		"id",
		"data-*"
	],
	a: [
		"href",
		"name",
		"target"
	],
	img: [
		"src",
		"srcset",
		"alt",
		"title",
		"width",
		"height",
		"loading"
	],
	iframe: [
		"src",
		"width",
		"height",
		"frameborder",
		"allow",
		"allowfullscreen"
	]
};
/** URL schemes allowed in `href`, `src` and `cite`. Relative URLs are always allowed. */
var SITE_HTML_ALLOWED_SCHEMES = [
	"http",
	"https",
	"ftp",
	"mailto",
	"tel"
];
/** Hosts whose iframes keep their `src`; other iframes lose it. */
var SITE_HTML_IFRAME_HOSTS = ["www.youtube.com", "player.vimeo.com"];
var BASE_STYLE = "body{margin:0;font-family:system-ui,sans-serif;line-height:1.5}";
var BASE = "<base href=\"/\" target=\"_top\">";
var FRAME_SCRIPT = `(() => {
	const type = ${JSON.stringify(HTML_BLOCK_FRAME_MESSAGE)};
	const root = document.documentElement;
	const report = () => {
		const overflow = root.scrollHeight > root.clientHeight ? root.scrollHeight : 0;
		const height = Math.max(root.getBoundingClientRect().height, overflow);
		parent.postMessage({ type, height: Math.ceil(height + innerHeight - root.clientHeight) }, "*");
	};
	const observer = new ResizeObserver(report);
	observer.observe(root);
	addEventListener("DOMContentLoaded", () => observer.observe(document.body));
	addEventListener("message", (event) => {
		if (event.source === parent && event.data?.type === type) report();
	});
	addEventListener(
		"securitypolicyviolation",
		() => parent.postMessage({ type, blocked: true }, "*"),
		{ once: true },
	);
})();`;
var STYLE_END_RE = /<\/(style)/gi;
var SCRIPT_TAG_RE = /<(?=\/?script[\t\n\f\r />])/gi;
function buildHtmlBlockFrame({ html, css = "", js = "" }) {
	return `<!doctype html><html><head><meta charset="utf-8">${BASE}<style>${BASE_STYLE}</style><script>${FRAME_SCRIPT}<\/script>${css.trim() ? `<style>${css.replace(STYLE_END_RE, "<\\/$1")}</style>` : ""}</head><body>${html}${js.trim() ? `<script>${js.replace(SCRIPT_TAG_RE, "\\x3c")}<\/script>` : ""}</body></html>`;
}
var MAX_TABLE_REPAIRED_SLOTS = 2e4;
var MAX_TABLE_SOURCE_ENTRIES = MAX_TABLE_REPAIRED_SLOTS * 4;
var NormalizationFailure = class extends Error {
	constructor(reason) {
		super();
		this.reason = reason;
	}
};
var fail = (reason) => {
	throw new NormalizationFailure(reason);
};
var DECORATOR_MARKS = new Set("strong em underline strike-through subscript superscript code".split(" "));
var TABLE_FIELDS = new Set("_type _key rows hasHeaderRow markDefs".split(" "));
var ROW_FIELDS = new Set("_type _key cells".split(" "));
var CELL_FIELDS = new Set("_type _key content markDefs isHeader colspan rowspan colwidth textAlign".split(" "));
var DOM_FIELD = /^(?:aria-|data-|class(?:name)?$|id$|role$|style$|on(?:animation(?:end|iteration|start)|beforeinput|blur|change|click|contextmenu|copy|cut|drag|drop|error|focus|input|key(?:down|press|up)|load|mouse(?:down|move|up)|paste|pointer(?:down|move|up)|scroll|submit|touch(?:end|move|start)|transition(?:cancel|end|run|start)|wheel)$)/i;
function isPortableTextTableInput(value) {
	return isRecord(value) && value._type === "table";
}
function normalizePortableTextTable(value, context) {
	return catchFailure(value, context, () => normalizeTable(value, context));
}
function normalizeTable(value, context) {
	if (!isPortableTextTableInput(value) || value.rows !== void 0 && !Array.isArray(value.rows)) return fail("INVALID_TABLE");
	const rawRows = Array.isArray(value.rows) ? value.rows : [];
	let sourceCells = 0;
	let sourceEntries = rawRows.length + (Array.isArray(value.markDefs) ? value.markDefs.length : 0);
	for (const row of rawRows) {
		if (!isRecord(row) || !Array.isArray(row.cells)) continue;
		sourceCells += row.cells.length;
		sourceEntries += row.cells.length;
		for (const cell of row.cells) {
			if (!isRecord(cell)) continue;
			if (Array.isArray(cell.content)) sourceEntries += cell.content.length;
			if (Array.isArray(cell.markDefs)) sourceEntries += cell.markDefs.length;
		}
		if (sourceCells > 2e4 || sourceEntries > MAX_TABLE_SOURCE_ENTRIES) return fail("TABLE_TOO_LARGE");
	}
	if (sourceEntries > MAX_TABLE_SOURCE_ENTRIES) return fail("TABLE_TOO_LARGE");
	const seen = /* @__PURE__ */ new Set();
	const tableKey = reserveKey(readKey(value._key) ?? legacyKey(`${context.path}:table`), seen);
	const tableMarkDefs = normalizeMarkDefs(value.markDefs);
	const tableMarks = indexMarkDefs(tableMarkDefs);
	const firstContentRow = rawRows.findIndex((row) => isRecord(row) && Array.isArray(row.cells) && row.cells.length > 0);
	const firstCells = firstContentRow >= 0 && isRecord(rawRows[firstContentRow]) ? rawRows[firstContentRow].cells : void 0;
	const promoteHeader = value.hasHeaderRow === true && Array.isArray(firstCells) && !firstCells.some((cell) => isRecord(cell) && hasOwn(cell, "isHeader"));
	const sourceRows = rawRows.map((rawRow, rowIndex) => {
		const record = asRecord(rawRow);
		const rowKey = reserveKey(readKey(record._key) ?? legacyKey(`${tableKey}:row:${rowIndex}`), seen);
		const rawCells = Array.isArray(record.cells) ? record.cells : [];
		return {
			row: {
				...safeFields(record, ROW_FIELDS),
				_type: "tableRow",
				_key: rowKey
			},
			cells: rawCells.map((cell, cellIndex) => normalizeCell(cell, {
				path: `${rowKey}:cell:${cellIndex}`,
				remainingRows: rawRows.length - rowIndex,
				promoteHeader: promoteHeader && rowIndex === firstContentRow,
				seen,
				tableMarks
			}))
		};
	});
	if (!sourceRows.some((row) => row.cells.length > 0)) return {
		ok: true,
		table: tableFrom(value, tableKey, tableMarkDefs, [{
			_type: "tableRow",
			_key: reserveKey(legacyKey(`${tableKey}:repair-row:0`), seen),
			cells: [emptyCell(reserveKey(legacyKey(`${tableKey}:repair-cell:0:0`), seen))]
		}]),
		width: 1,
		height: 1
	};
	const height = sourceRows.length;
	const occupied = Array.from({ length: height }, () => /* @__PURE__ */ new Set());
	const placed = Array.from({ length: height }, () => []);
	let width = 0;
	for (let row = 0; row < height; row++) {
		let cursor = 0;
		for (const cell of sourceRows[row].cells) {
			const colspan = cell.colspan ?? 1;
			const rowspan = cell.rowspan ?? 1;
			while (!rectangleFree(occupied, row, cursor, rowspan, colspan)) assertGridBound(++cursor + colspan, height);
			assertGridBound(Math.max(width, cursor + colspan), height);
			occupy(occupied, row, cursor, rowspan, colspan);
			placed[row].push({
				cell,
				column: cursor
			});
			cursor += colspan;
			width = Math.max(width, cursor);
		}
	}
	const columnWidths = Array.from({ length: width });
	for (const row of placed) for (const { cell, column } of row) for (let offset = 0; offset < (cell.colspan ?? 1); offset++) {
		const candidate = cell.colwidth?.[offset];
		if (candidate && columnWidths[column + offset] === void 0) columnWidths[column + offset] = candidate;
	}
	const hasWidths = columnWidths.some((entry) => entry !== void 0);
	if (hasWidths) for (let column = 0; column < width; column++) columnWidths[column] ??= 96;
	const rows = sourceRows.map((source, rowIndex) => {
		const anchors = new Map(placed[rowIndex].map(({ cell, column }) => [column, cell]));
		const headers = source.cells.length > 0 && source.cells.every((cell) => cell.isHeader === true);
		const cells = [];
		for (let column = 0; column < width;) {
			const anchored = anchors.get(column);
			if (anchored) {
				const span = anchored.colspan ?? 1;
				cells.push(withWidths(anchored, column, span, columnWidths, hasWidths));
				column += span;
			} else if (occupied[rowIndex].has(column)) column++;
			else {
				const key = reserveKey(legacyKey(`${tableKey}:repair-cell:${rowIndex}:${column}`), seen);
				cells.push(withWidths(emptyCell(key, headers), column++, 1, columnWidths, hasWidths));
			}
		}
		return {
			...source.row,
			cells
		};
	});
	return {
		ok: true,
		table: tableFrom(value, tableKey, tableMarkDefs, rows, sourceRows[0].cells.length > 0 && rows[0].cells.every((cell) => cell.isHeader === true && (cell.rowspan ?? 1) === 1)),
		width,
		height
	};
}
function createPortableTextTableCellMarkResolver(table) {
	const shared = indexMarkDefs(table.markDefs ?? []);
	return (cell) => {
		const local = indexMarkDefs(cell.markDefs ?? []);
		const referenced = /* @__PURE__ */ new Map();
		for (const span of cell.content) for (const key of span.marks ?? []) {
			const definition = local.get(key) ?? shared.get(key);
			if (definition) referenced.set(key, definition);
		}
		return [...referenced.values()];
	};
}
function getPortableTextTableColumnWidths(table) {
	const occupied = Array.from({ length: table.rows.length }, () => /* @__PURE__ */ new Set());
	const widths = [];
	for (let row = 0; row < table.rows.length; row++) {
		let column = 0;
		for (const cell of table.rows[row].cells) {
			while (occupied[row].has(column)) column++;
			const colspan = cell.colspan ?? 1;
			for (let offset = 0; offset < colspan; offset++) {
				const value = cell.colwidth?.[offset];
				if (value && widths[column + offset] === void 0) widths[column + offset] = Math.max(96, value);
			}
			occupy(occupied, row, column, cell.rowspan ?? 1, colspan);
			column += colspan;
		}
	}
	return widths.some(Boolean) ? widths.map((width) => width ?? 96) : void 0;
}
function normalizeCell(value, context) {
	if (typeof value !== "string" && !isRecord(value)) return fail("UNSUPPORTED_CELL_CONTENT");
	const record = asRecord(value);
	const key = reserveKey(readKey(record._key) ?? legacyKey(context.path), context.seen);
	const markDefs = normalizeMarkDefs(record.markDefs);
	const localMarks = indexMarkDefs(markDefs);
	const colspan = normalizeSpan(record.colspan);
	const rowspan = Math.min(normalizeSpan(record.rowspan), Math.max(1, context.remainingRows));
	const colwidth = normalizeColwidth(record.colwidth, colspan);
	const textAlign = normalizeAlignment(record.textAlign);
	const explicitHeader = hasOwn(record, "isHeader");
	const isHeader = context.promoteHeader || record.isHeader === true ? true : explicitHeader && record.isHeader === false ? false : void 0;
	const cell = {
		...safeFields(record, CELL_FIELDS),
		_type: "tableCell",
		_key: key,
		content: normalizeContent(value, record.content, key, (mark) => localMarks.get(mark) ?? context.tableMarks.get(mark))
	};
	if (markDefs.length > 0) cell.markDefs = markDefs;
	if (isHeader !== void 0) cell.isHeader = isHeader;
	if (colspan > 1) cell.colspan = colspan;
	if (rowspan > 1) cell.rowspan = rowspan;
	if (colwidth) cell.colwidth = colwidth;
	if (textAlign) cell.textAlign = textAlign;
	return cell;
}
function normalizeContent(rawCell, rawContent, cellKey, resolveMark) {
	const fallbackSpan = (text) => ({
		_type: "span",
		_key: legacyKey(`${cellKey}:span:0`),
		text
	});
	const values = typeof rawCell === "string" ? [fallbackSpan(rawCell)] : typeof rawContent === "string" ? [fallbackSpan(rawContent)] : rawContent === void 0 ? [] : rawContent;
	if (!Array.isArray(values)) return fail("UNSUPPORTED_CELL_CONTENT");
	const content = values.map((value, index) => {
		if (!isRecord(value) || value._type !== "span" || typeof value.text !== "string") return fail("UNSUPPORTED_CELL_CONTENT");
		const marks = value.marks ?? [];
		if (!Array.isArray(marks)) return fail("UNSUPPORTED_MARK_DEFINITION");
		const normalizedMarks = [];
		for (const mark of marks) {
			if (typeof mark !== "string" || !DECORATOR_MARKS.has(mark) && resolveMark(mark)?._type !== "link") return fail("UNSUPPORTED_MARK_DEFINITION");
			normalizedMarks.push(mark);
		}
		return {
			_type: "span",
			_key: readKey(value._key) ?? legacyKey(`${cellKey}:span:${index}`),
			text: value.text,
			...normalizedMarks.length > 0 ? { marks: normalizedMarks } : {}
		};
	});
	return content.length > 0 ? content : [emptySpan(cellKey)];
}
function normalizeMarkDefs(value) {
	if (value === void 0) return [];
	if (!Array.isArray(value)) return fail("UNSUPPORTED_MARK_DEFINITION");
	return value.map((mark) => {
		const key = isRecord(mark) ? readKey(mark._key) : void 0;
		if (!isRecord(mark) || mark._type !== "link" || !key || typeof mark.href !== "string") return fail("UNSUPPORTED_MARK_DEFINITION");
		return {
			...safeFields(mark),
			_type: "link",
			_key: key
		};
	});
}
var normalizeSpan = (value) => typeof value === "number" && Number.isInteger(value) && value > 0 && value <= 100 ? value : 1;
function normalizeAlignment(value) {
	return value === "left" || value === "center" || value === "right" || value === "justify" ? value : void 0;
}
function normalizeColwidth(value, colspan) {
	if (!Array.isArray(value) || value.length !== colspan || !value.every(validWidth)) return void 0;
	return value;
}
var validWidth = (value) => typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 4096;
function assertGridBound(width, height) {
	if (width * height > 2e4) return fail("TABLE_TOO_LARGE");
}
function rectangleFree(occupied, row, column, rowspan, colspan) {
	for (let y = row; y < row + rowspan; y++) for (let x = column; x < column + colspan; x++) if (occupied[y].has(x)) return false;
	return true;
}
function occupy(occupied, row, column, rowspan, colspan) {
	for (let y = row; y < row + rowspan; y++) for (let x = column; x < column + colspan; x++) occupied[y]?.add(x);
}
function withWidths(cell, column, colspan, widths, hasWidths) {
	const { colwidth: _colwidth, ...rest } = cell;
	if (!hasWidths) return rest;
	return {
		...rest,
		colwidth: widths.slice(column, column + colspan).map((width) => width ?? 96)
	};
}
function tableFrom(raw, key, markDefs, rows, hasHeaderRow = false) {
	return {
		...safeFields(raw, TABLE_FIELDS),
		_type: "table",
		_key: key,
		rows,
		...hasHeaderRow ? { hasHeaderRow: true } : {},
		...markDefs.length > 0 ? { markDefs } : {}
	};
}
var emptySpan = (key) => ({
	_type: "span",
	_key: legacyKey(`${key}:span:0`),
	text: ""
});
function emptyCell(key, isHeader = false) {
	return {
		_type: "tableCell",
		_key: key,
		content: [emptySpan(key)],
		...isHeader ? { isHeader: true } : {}
	};
}
function catchFailure(raw, context, operation) {
	try {
		return operation();
	} catch (error) {
		if (error instanceof NormalizationFailure) return unsafeResult(error.reason, raw, context.path);
		throw error;
	}
}
function unsafeResult(reason, raw, path) {
	return {
		ok: false,
		reason,
		raw,
		...reason === "TABLE_TOO_LARGE" ? {} : { renderFallback: makeRenderFallback(raw, path) }
	};
}
function makeRenderFallback(raw, path) {
	const record = asRecord(raw);
	const seen = /* @__PURE__ */ new Set();
	const tableKey = reserveKey(readKey(record._key) ?? legacyKey(`${path}:fallback-table`), seen);
	let remaining = MAX_TABLE_REPAIRED_SLOTS;
	const rows = [];
	for (const [rowIndex, rawRow] of (Array.isArray(record.rows) ? record.rows : []).entries()) {
		const row = asRecord(rawRow);
		const rawCells = Array.isArray(row.cells) ? row.cells : [];
		if (Math.max(rawCells.length, 1) > remaining) return void 0;
		const rowKey = reserveKey(readKey(row._key) ?? legacyKey(`${tableKey}:fallback-row:${rowIndex}`), seen);
		const cells = rawCells.map((rawCell, cellIndex) => {
			return fallbackCell(rawCell, reserveKey(readKey(asRecord(rawCell)._key) ?? legacyKey(`${rowKey}:fallback-cell:${cellIndex}`), seen));
		});
		if (cells.length === 0) cells.push(emptyCell(reserveKey(legacyKey(`${rowKey}:empty`), seen)));
		remaining -= cells.length;
		rows.push({
			_type: "tableRow",
			_key: rowKey,
			cells
		});
	}
	if (rows.length > 0) return {
		_type: "table",
		_key: tableKey,
		rows
	};
	return {
		_type: "table",
		_key: tableKey,
		rows: [{
			_type: "tableRow",
			_key: reserveKey(legacyKey(`${tableKey}:empty-row`), seen),
			cells: [emptyCell(reserveKey(legacyKey(`${tableKey}:empty-cell`), seen))]
		}]
	};
}
var fallbackCell = (raw, key) => ({
	_type: "tableCell",
	_key: key,
	content: [{
		...emptySpan(key),
		text: recoverText(raw)
	}]
});
function recoverText(value, depth = 0) {
	if (depth > 32) return "";
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value.map((entry) => recoverText(entry, depth + 1)).join("");
	const record = asRecord(value);
	if (typeof record.text === "string") return record.text;
	if (typeof record.content === "string") return record.content;
	return recoverText(Array.isArray(record.content) ? record.content : Array.isArray(record.children) ? record.children : [], depth + 1);
}
var indexMarkDefs = (marks) => new Map(marks.map((mark) => [mark._key, mark]));
function legacyKey(value) {
	let hash = 0x811c9dc5;
	for (let index = 0; index < value.length; index++) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return `legacy-table-${(hash >>> 0).toString(36)}`;
}
function reserveKey(base, seen) {
	let candidate = base;
	for (let suffix = 1; seen.has(candidate); suffix++) candidate = `${base}-${suffix}`;
	seen.add(candidate);
	return candidate;
}
function safeFields(value, excluded = /* @__PURE__ */ new Set()) {
	if (!isRecord(value)) return {};
	return Object.fromEntries(Object.entries(value).filter(([key]) => !excluded.has(key) && key !== "__proto__" && key !== "prototype" && key !== "constructor" && !DOM_FIELD.test(key)));
}
var isRecord = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var asRecord = (value) => isRecord(value) ? value : {};
var readKey = (value) => typeof value === "string" && value.length > 0 ? value : void 0;
var hasOwn = (record, key) => Object.hasOwn(record, key);
export { HTML_BLOCK_FRAME_SANDBOX as a, SITE_HTML_ALLOWED_TAGS as c, htmlBlockFields as d, normalizePortableTextTable as i, SITE_HTML_IFRAME_HOSTS as l, createPortableTextTableCellMarkResolver as n, SITE_HTML_ALLOWED_ATTRIBUTES as o, getPortableTextTableColumnWidths as r, SITE_HTML_ALLOWED_SCHEMES as s, MAX_TABLE_REPAIRED_SLOTS as t, buildHtmlBlockFrame as u };
