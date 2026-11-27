import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { l as resolveConfiguredLocale, r as getI18nConfig } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { t as after } from "./after-B8cG5P6f_CIVXcY7f.mjs";
import { i as encodeBase64, t as decodeBase64 } from "./base64-GXviT28w_CJsXkxay.mjs";
import { a as InvalidCursorError, l as decodeCursor } from "./types-BBH-w_KS_DiGw3TjO.mjs";
import { n as siteSettingsTag, r as taxonomyTag, t as menuTag } from "./chrome-tags-BocDVqqx_jlfjNk4e.mjs";
import { r as isTransferError, t as TransferError } from "./errors-u5rZhbVQ_Kim2d0N0.mjs";
import { f as toSha256Digest } from "./digest-DSsUd9oL_C_lXhh0f.mjs";
import { t as apiError } from "./error-0Y0dFPxm_D68N8-KM.mjs";
import { a as readSiteWriteFence, o as recordSiteWrite } from "./fence-CkdbSoZX_DNtaDXEC.mjs";
import { A as contentSeoInput, Ct as updateBlockTypeBody, I as createBlockTypeBody, L as createCollectionBody, Ot as updateTaxonomyDefBody, Tt as updateFieldBody, V as createTaxonomyDefBody, l as bylineUpdateBody, s as bylineCreateBody, v as contentBylineInputSchema, wt as updateCollectionBody } from "./entry-lock-DJgDNfMf_D-xtMmVq.mjs";
import { t as CONTENT_TYPE_RE } from "./media-Cq_oKN_Y_BsQ2SfEN.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { f as mediaCacheTag, u as isRouteCachedMedia } from "./image-endpoint_CAMLdpZa.mjs";
import { n as entryEditAccess } from "./authorize-6a0h5NN5_BnLAdxvQ.mjs";
import { t as pluginToolName } from "./plugin-tool-name-CCXxYq3K_B9E0ANPy.mjs";
import { f as hasScope, r as TRANSFER_SCOPES } from "./passkey_BrGsIm4_.mjs";
import { t as invalidateRouteCache } from "./route-cache-DkhMwAIC_BhESXRbD.mjs";
import { Marked } from "marked";
import { i as RECORD_KINDS } from "./kinds-DyAmbNrx_Dqw8eVqh.mjs";
import { t as claimEntryLockForWrite } from "./entry-lock-GKD0lJI5_CTe_5RRm.mjs";
import { l as TransferApprovalRepository } from "./approvals-DbCK12-7_CMfwSVX4.mjs";
import { a as siteImportDecisionsInputSchema, t as isPlanExecutable } from "./plan-DQoNgF2Y_CfpY0DKw.mjs";
import { t as TransferOperationRepository } from "./stage-Ctas_E7M_BvIWzg1C.mjs";
import { C as handleTransferCapabilities, E as requestTransferApproval, S as handleImportReceipt, T as openExportPackage, a as handleExportAdvance, f as handleImportAdvance, g as handleImportExecute, l as handleExportGet, n as exportParamsDigest, p as handleImportAnalyze, s as handleExportCreate, t as analysisTargetContext, v as handleImportGet, w as loadImportPlan } from "./transfer-BwKpOrTV_BPKywtjZ.mjs";
import { z } from "zod";
import { h as hasPermission, i as Permissions, o as canActOnOwn } from "./dist__l0ohBBn.mjs";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// node_modules/emdash/dist/portable-text-D18C1jR6.mjs
/**
* Portable Text <-> Markdown conversion layer.
*
* Three tiers of block handling:
*   Tier 1: Standard PT blocks <-> standard Markdown (headings, paragraphs, lists, etc.)
*   Tier 2: EmDash custom blocks <-> Markdown directives (future)
*   Tier 3: Unknown blocks <-> opaque HTML comment fences (preserved, not editable)
*/
/**
* Convert Portable Text blocks to Markdown.
* Unknown block types are serialized as opaque fences.
*/
function portableTextToMarkdown(blocks) {
	const lines = [];
	let prevWasList = false;
	const listWidths = [];
	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		if (block._type === "block") {
			const isList = !!block.listItem;
			if (i > 0 && (!isList || !prevWasList)) lines.push("");
			const level = Math.max(1, block.level ?? 1);
			const indent = Array.from({ length: level - 1 }, (_, index) => listWidths[index] ?? 2).reduce((sum, width) => sum + width, 0);
			listWidths[level - 1] = block.listItem === "number" ? 3 : 2;
			listWidths.length = isList ? level : 0;
			lines.push(renderStandardBlock(block, indent));
			prevWasList = isList;
		} else if (block._type === "code") {
			if (i > 0) lines.push("");
			const lang = block.language || "";
			const code = block.code || "";
			lines.push("```" + lang);
			lines.push(code);
			lines.push("```");
			prevWasList = false;
		} else if (block._type === "image") {
			if (i > 0) lines.push("");
			const alt = block.alt || "";
			const url = block.asset?.url || "";
			lines.push(`![${alt}](${url})`);
			prevWasList = false;
		} else if (block._type === "table") {
			if (i > 0) lines.push("");
			lines.push(renderTable(block) ?? `<!--ec:block ${JSON.stringify(block)} -->`);
			prevWasList = false;
		} else {
			if (i > 0) lines.push("");
			lines.push(`<!--ec:block ${JSON.stringify(block)} -->`);
			prevWasList = false;
		}
	}
	return lines.join("\n") + "\n";
}
var LINE_BREAK_PATTERN = /[\n\r]/;
var CODE_EDGE_PATTERN = /^`|`$/;
var PADDED_CODE_PATTERN = /^ .* $/;
var CODE_PIPE_PATTERN = /\\\|/;
var TABLE_FIELDS = /* @__PURE__ */ new Set([
	"_type",
	"_key",
	"rows",
	"hasHeaderRow",
	"markDefs"
]);
var ROW_FIELDS = /* @__PURE__ */ new Set([
	"_type",
	"_key",
	"cells"
]);
var CELL_FIELDS = /* @__PURE__ */ new Set([
	"_type",
	"_key",
	"content",
	"markDefs",
	"isHeader",
	"colspan",
	"rowspan",
	"colwidth",
	"textAlign"
]);
var SPAN_FIELDS = /* @__PURE__ */ new Set([
	"_type",
	"_key",
	"text",
	"marks"
]);
var LINK_FIELDS = /* @__PURE__ */ new Set([
	"_type",
	"_key",
	"href"
]);
var MARKDOWN_MARKS = /* @__PURE__ */ new Set([
	"strong",
	"em",
	"code",
	"strike-through",
	"strikethrough"
]);
function hasOnlyFields(value, fields) {
	return Object.keys(value).every((key) => fields.has(key));
}
function canRenderMarkDefs(defs) {
	return defs.every((def) => def?._type === "link" && hasOnlyFields(def, LINK_FIELDS) && !def.href?.includes("\\") && !def.href?.includes("|"));
}
function renderTable(block) {
	if (!Array.isArray(block.rows) || !block.rows.length || !hasOnlyFields(block, TABLE_FIELDS) || !canRenderMarkDefs(block.markDefs ?? [])) return void 0;
	const rows = block.rows;
	const width = rows[0]?.cells?.length;
	if (!width || !block.hasHeaderRow) return void 0;
	const rendered = [];
	for (const [index, row] of rows.entries()) {
		if (!Array.isArray(row?.cells) || row.cells.length !== width || !hasOnlyFields(row, ROW_FIELDS)) return void 0;
		const cells = [];
		for (const [column, cell] of row.cells.entries()) {
			if (!cell || cell._type !== "tableCell" || !hasOnlyFields(cell, CELL_FIELDS) || !canRenderMarkDefs(cell.markDefs ?? []) || !Array.isArray(cell.content) || (cell.colspan ?? 1) !== 1 || (cell.rowspan ?? 1) !== 1 || cell.colwidth || (cell.isHeader ?? index === 0) !== (index === 0) || cell.textAlign !== rows[0]?.cells?.[column]?.textAlign || cell.textAlign === "justify" || cell.content.some((span) => !span || span._type !== "span" || !hasOnlyFields(span, SPAN_FIELDS) || LINE_BREAK_PATTERN.test(span.text ?? "") || span.marks?.some((mark) => !MARKDOWN_MARKS.has(mark) && ![...cell.markDefs ?? [], ...block.markDefs ?? []].some((def) => def._key === mark && def._type === "link")))) return void 0;
			const text = cell.content.map((span) => span.text ?? "").join("");
			if (text !== text.trim() || coalesceSpans(cell.content).some((span) => span.marks?.includes("code") && CODE_PIPE_PATTERN.test(span.text ?? ""))) return void 0;
			cells.push(renderSpans(cell.content, [...cell.markDefs ?? [], ...block.markDefs ?? []]).replaceAll("|", "\\|"));
		}
		rendered.push(`| ${cells.join(" | ")} |`);
		if (index === 0) rendered.push(`| ${row.cells.map((cell) => cell.textAlign === "center" ? ":---:" : cell.textAlign === "right" ? "---:" : cell.textAlign === "left" ? ":---" : "---").join(" | ")} |`);
	}
	return rendered.join("\n");
}
function renderStandardBlock(block, indentation = 0) {
	const text = escapeBlockStarts(renderSpans(block.children ?? [], block.markDefs ?? []));
	if (block.listItem) {
		const indent = " ".repeat(indentation);
		const marker = block.listItem === "number" ? "1." : "-";
		return `${indent}${marker} ${text.replaceAll("\n", `\n${indent}${" ".repeat(marker.length + 1)}`)}`;
	}
	if (block.style && block.style.startsWith("h")) {
		const level = parseInt(block.style.substring(1), 10);
		if (level >= 1 && level <= 6) {
			if (block.children?.some((span) => span._type === "span" && LINE_BREAK_PATTERN.test(span.text ?? ""))) return `<!--ec:block ${JSON.stringify(block)} -->`;
			return `${"#".repeat(level)} ${text}`;
		}
	}
	if (block.style === "blockquote") return `> ${text.replaceAll("\n", "\n> ")}`;
	return text;
}
function escapeBlockStarts(text) {
	return text.replace(/^([ \t]{0,3})([#=+|:-]|\d{1,9}[.)])/gm, (_match, indent, marker) => `${indent}${marker.slice(0, -1)}\\${marker.at(-1)}`);
}
function wrapMark(text, delimiter) {
	const trimmed = text.trim();
	if (!trimmed) return text;
	const start = text.length - text.trimStart().length;
	return `${text.slice(0, start)}${delimiter}${trimmed}${delimiter}${text.slice(start + trimmed.length)}`;
}
function coalesceSpans(spans) {
	const runs = [];
	for (const span of spans) {
		const previous = runs.at(-1);
		const marks = [...new Set(span.marks ?? [])];
		if (span._type === "span" && previous?._type === "span" && marks.length === previous.marks?.length && marks.every((mark) => previous.marks?.includes(mark))) previous.text = (previous.text ?? "") + (span.text ?? "");
		else runs.push({
			...span,
			marks
		});
	}
	return runs;
}
function renderSpans(spans, markDefs) {
	let result = "";
	for (const span of coalesceSpans(spans)) {
		if (span._type !== "span") continue;
		const marks = span.marks ?? [];
		const normalized = (span.text ?? "").replaceAll("\r\n", "\n").replaceAll("\r", "\n");
		const value = marks.includes("code") ? normalized.replaceAll("\n", " ") : normalized;
		let text;
		if (marks.includes("code")) {
			const runs = value.match(/`+/g) ?? [];
			const fence = "`".repeat(runs.reduce((max, run) => Math.max(max, run.length), 0) + 1);
			const padding = CODE_EDGE_PATTERN.test(value) || PADDED_CODE_PATTERN.test(value) && value.trim() ? " " : "";
			text = `${fence}${padding}${value}${padding}${fence}`;
		} else text = value.replace(/[\\`*_[\]<>~]/g, "\\$&");
		for (const mark of marks) switch (mark) {
			case "strong":
				text = wrapMark(text, "**");
				break;
			case "em":
				text = wrapMark(text, "*");
				break;
			case "strike-through":
			case "strikethrough": text = wrapMark(text, "~~");
		}
		for (const mark of marks) {
			const def = markDefs.find((candidate) => candidate._key === mark);
			if (def?._type === "link") text = `[${text}](${def.href ?? ""})`;
		}
		result += text;
	}
	let end = result.length;
	while (end > 0 && result[end - 1] === "\n") end--;
	return result.slice(0, end).replaceAll("\n", "\\\n");
}
var markdownLexer;
var OPAQUE_FENCE_PATTERN = /^<!--ec:block (.+) -->$/;
/**
* Convert Markdown to Portable Text blocks.
* Opaque fences (<!--ec:block ... -->) are deserialized and spliced back in.
*/
function markdownToPortableText(markdown) {
	markdownLexer ??= new Marked({
		gfm: true,
		tokenizer: { url: () => void 0 }
	});
	return convertTokens(markdownLexer.lexer(markdown));
}
function convertTokens(tokens, level = 0, splitParagraphImages = true) {
	const blocks = [];
	for (const token of tokens) switch (token.type) {
		case "space":
		case "def":
		case "checkbox": break;
		case "heading":
			blocks.push(makeBlock(token.tokens, `h${token.depth}`));
			break;
		case "paragraph":
		case "text": {
			const children = token.tokens ?? [{
				type: "text",
				raw: token.text,
				text: token.text
			}];
			const parts = splitParagraphImages ? splitInlineImages(children) : [children];
			for (const part of parts) if (Array.isArray(part)) {
				const block = makeBlock(part);
				if (parts.length > 1) {
					const first = block.children?.[0];
					const last = block.children?.at(-1);
					if (first && !first.marks?.length) first.text = first.text?.trimStart();
					if (last && !last.marks?.length) last.text = last.text?.trimEnd();
				}
				if (block.children?.some((span) => span.text)) blocks.push(block);
			} else blocks.push({
				_type: "image",
				_key: generateKey(),
				alt: part.text,
				asset: { url: part.href }
			});
			break;
		}
		case "blockquote":
			for (const block of convertTokens(token.tokens, level, false)) {
				if (block._type === "block") block.style = "blockquote";
				blocks.push(block);
			}
			break;
		case "list":
			for (const item of token.items) {
				let first = true;
				for (const block of convertTokens(item.tokens, level + 1, false)) {
					if (first && block._type === "block" && !block.listItem) {
						block.listItem = token.ordered ? "number" : "bullet";
						block.level = level + 1;
						if (item.tokens[0]?.type === "checkbox") block.children?.unshift({
							_type: "span",
							_key: generateKey(),
							text: item.tokens[0].raw,
							marks: []
						});
					}
					first = false;
					blocks.push(block);
				}
			}
			break;
		case "code":
			blocks.push({
				_type: "code",
				_key: generateKey(),
				language: token.lang || void 0,
				code: token.text
			});
			break;
		case "table":
			blocks.push({
				_type: "table",
				_key: generateKey(),
				hasHeaderRow: true,
				rows: [token.header, ...token.rows].map((row, index) => ({
					_type: "tableRow",
					_key: generateKey(),
					cells: row.map((cell, column) => {
						const { spans, markDefs } = parseInline(cell.tokens);
						return {
							_type: "tableCell",
							_key: generateKey(),
							content: spans,
							markDefs,
							isHeader: index === 0,
							...token.align[column] ? { textAlign: token.align[column] } : {}
						};
					})
				}))
			});
			break;
		case "html":
			for (const line of token.raw.trimEnd().split("\n")) {
				const match = line.match(OPAQUE_FENCE_PATTERN);
				if (match) try {
					blocks.push(JSON.parse(match[1]));
					continue;
				} catch {}
				blocks.push(makeBlock([{
					type: "text",
					raw: line,
					text: line
				}]));
			}
			break;
		default: blocks.push(makeBlock([{
			type: "text",
			raw: token.raw,
			text: token.raw.trimEnd()
		}]));
	}
	return blocks;
}
function splitInlineImages(tokens) {
	const parts = [];
	let pending = [];
	function appendImage(image) {
		if (pending.length) parts.push(pending);
		pending = [];
		parts.push(image);
	}
	for (const token of tokens) if (token.type === "image") appendImage(token);
	else if ((token.type === "strong" || token.type === "em" || token.type === "del" || token.type === "text") && token.tokens) for (const part of splitInlineImages(token.tokens)) if (Array.isArray(part)) pending.push({
		...token,
		tokens: part
	});
	else appendImage(part);
	else pending.push(token);
	if (pending.length) parts.push(pending);
	return parts;
}
function makeBlock(tokens, style = "normal") {
	const { spans, markDefs } = parseInline(tokens);
	return {
		_type: "block",
		_key: generateKey(),
		style,
		markDefs,
		children: spans
	};
}
function parseInline(tokens) {
	const spans = [];
	const markDefs = [];
	const append = (text, marks) => {
		spans.push({
			_type: "span",
			_key: generateKey(),
			text,
			marks
		});
	};
	function visit(children, marks = []) {
		for (const token of children) switch (token.type) {
			case "strong":
			case "em":
			case "del":
				visit(token.tokens, [...marks, token.type === "del" ? "strike-through" : token.type]);
				break;
			case "link": {
				const key = generateKey();
				markDefs.push({
					_type: "link",
					_key: key,
					href: token.href
				});
				visit(token.tokens, [...marks, key]);
				break;
			}
			case "codespan":
				append(token.text, [...marks, "code"]);
				break;
			case "br":
				append("\n", marks);
				break;
			case "text":
				if (token.tokens) visit(token.tokens, marks);
				else append(token.text.replaceAll("\n", " "), marks);
				break;
			case "escape":
				append(token.text, marks);
				break;
			default: append(token.raw, marks);
		}
	}
	visit(tokens);
	if (!spans.length) append("", []);
	return {
		spans,
		markDefs
	};
}
var keyCounter = 0;
function generateKey() {
	return `k${(keyCounter++).toString(36)}`;
}
function convertNestedBlockPortableText(value, field, direction) {
	if (!Array.isArray(value)) return value;
	const validation = field.validation;
	const allowedTypes = validation && typeof validation === "object" && "allowedTypes" in validation ? validation.allowedTypes : void 0;
	return value.map((block) => {
		if (!block || typeof block !== "object" || Array.isArray(block)) return block;
		const record = { ...block };
		const type = record._type === void 0 && direction === "write" && Array.isArray(allowedTypes) && allowedTypes.length === 1 ? allowedTypes[0] : record._type;
		const version = typeof record._version === "number" ? record._version : void 0;
		const blockType = field.blockTypes?.find((candidate) => candidate.slug === type);
		const definition = blockType?.versions.find((candidate) => candidate.version === (version ?? blockType.currentVersion));
		if (!definition) return block;
		for (const nestedField of definition.fields) {
			if (nestedField.type !== "portableText") continue;
			const nestedValue = record[nestedField.slug];
			if (direction === "read" && Array.isArray(nestedValue)) record[nestedField.slug] = portableTextToMarkdown(nestedValue);
			else if (direction === "write" && typeof nestedValue === "string") record[nestedField.slug] = markdownToPortableText(nestedValue);
		}
		return record;
	});
}
/**
* Convert content data for reading: Portable Text arrays -> Markdown strings.
* Converts top-level `portableText` arrays and nested `portableText` arrays
* inside `blocks` arrays.
*/
function convertDataForRead(data, fields, raw = false) {
	if (raw) return data;
	const result = { ...data };
	for (const field of fields) if (field.type === "portableText" && Array.isArray(result[field.slug])) result[field.slug] = portableTextToMarkdown(result[field.slug]);
	else if (field.type === "blocks" && Array.isArray(result[field.slug])) result[field.slug] = convertNestedBlockPortableText(result[field.slug], field, "read");
	return result;
}
/**
* Convert content data for writing: Markdown strings -> Portable Text arrays.
* Converts top-level `portableText` strings and nested Markdown strings
* in `portableText` fields inside `blocks` arrays.
*/
function convertDataForWrite(data, fields) {
	const result = { ...data };
	for (const field of fields) if (field.type === "portableText" && typeof result[field.slug] === "string") result[field.slug] = markdownToPortableText(result[field.slug]);
	else if (field.type === "blocks" && Array.isArray(result[field.slug])) result[field.slug] = convertNestedBlockPortableText(result[field.slug], field, "write");
	return result;
}
// node_modules/emdash/dist/astro/routes/api/mcp.mjs
var mcp_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/** Plan principals, warnings, and blockers listed per call; the totals are always reported. */
var MCP_PLAN_LIST_LIMIT = 50;
function failure(code, message, details) {
	return {
		success: false,
		error: details === void 0 ? {
			code,
			message
		} : {
			code,
			message,
			details
		}
	};
}
function transferFailure(error, fallbackCode) {
	if (isTransferError(error)) return failure(error.code, error.message);
	console.error("[transfer] MCP tool failed:", error);
	return failure(fallbackCode, "Site transfer request failed");
}
function storageMissing() {
	return failure("STORAGE_NOT_CONFIGURED", "No storage backend is configured");
}
function tokenRequired() {
	return failure("INSUFFICIENT_SCOPE", "Approval grants need a caller authenticated with an API or OAuth token");
}
function summarizeOperation(operation) {
	const progress = operation.progress;
	return {
		id: operation.id,
		kind: operation.kind,
		state: operation.state,
		stage: operation.stage,
		progress: progress ? {
			done: progress.done,
			total: progress.total,
			...progress.records === void 0 ? {} : { records: progress.records },
			...progress.bytesDone === void 0 ? {} : { bytesDone: progress.bytesDone },
			...progress.bytesTotal === void 0 ? {} : { bytesTotal: progress.bytesTotal }
		} : null,
		packageDigest: operation.packageDigest,
		planDigest: operation.planDigest,
		error: operation.errorCode ? { code: operation.errorCode } : null,
		createdAt: operation.createdAt,
		updatedAt: operation.updatedAt,
		completedAt: operation.completedAt,
		expiresAt: operation.expiresAt
	};
}
function summarizeIssue(issue) {
	return {
		code: issue.code,
		message: issue.message,
		...issue.kind === void 0 ? {} : { kind: issue.kind },
		...issue.id === void 0 ? {} : { id: issue.id },
		...issue.count === void 0 ? {} : { count: issue.count },
		...issue.detail === void 0 ? {} : { detail: { ...issue.detail } }
	};
}
/** How many records a transformation touches; its listed ids and values are not returned. */
function transformationCount(item) {
	switch (item.code) {
		case "redirect_loop_disabled":
		case "search_unsupported": return item.ids.length;
		case "locale_recased": return item.locales.length;
		default: return item.count;
	}
}
function summarizePlan(plan, planDigest) {
	return {
		packageDigest: plan.packageDigest,
		planDigest,
		executable: isPlanExecutable(plan),
		origin: {
			siteId: plan.origin.siteId,
			packageId: plan.origin.packageId,
			createdAt: plan.origin.createdAt,
			emdashVersion: plan.origin.createdByEmDashVersion
		},
		counts: { ...plan.counts },
		bytes: {
			records: plan.bytes.records,
			media: plan.bytes.media
		},
		principals: {
			total: plan.principals.length,
			items: plan.principals.toSorted((a, b) => b.references - a.references || a.id.localeCompare(b.id)).slice(0, MCP_PLAN_LIST_LIMIT).map((principal) => ({
				id: principal.id,
				displayName: principal.displayName,
				references: principal.references,
				suggestedUserId: principal.suggestedUserId ?? null,
				mappedUserId: plan.decisions.principalMappings[principal.id] ?? null
			}))
		},
		decisions: {
			siteTitle: plan.decisions.siteTitle,
			siteTagline: plan.decisions.siteTagline
		},
		transformations: plan.transformations.map((item) => ({
			code: item.code,
			..."kind" in item ? { kind: item.kind } : {},
			count: transformationCount(item)
		})),
		warnings: {
			total: plan.warnings.length,
			items: plan.warnings.slice(0, MCP_PLAN_LIST_LIMIT).map(summarizeIssue)
		},
		blockers: {
			total: plan.blockers.length,
			items: plan.blockers.slice(0, MCP_PLAN_LIST_LIMIT).map(summarizeIssue)
		},
		estimatedSteps: plan.estimatedSteps
	};
}
/**
* Whether `caller` may drive or read `operationId` through a grant it
* consumed for it, in place of the transfer scope.
*/
async function hasOperationGrant(db, caller, action, operationId) {
	if (caller.tokenId === void 0) return false;
	return new TransferApprovalRepository(db).hasConsumed({
		userId: caller.userId,
		action,
		operationId,
		tokenId: caller.tokenId
	});
}
async function transferCapabilities(context) {
	return handleTransferCapabilities(context.db, analysisTargetContext({
		i18n: getI18nConfig(),
		maxUploadSize: context.maxUploadSize
	}));
}
async function startExport(context, caller, input) {
	const options = input.comments === void 0 ? {} : { comments: input.comments };
	if (!input.scoped) {
		if (caller.tokenId === void 0) return tokenRequired();
		if (input.approvalId === void 0) return withInstruction(await requestTransferApproval(context.db, {
			userId: caller.userId,
			action: "export",
			paramsDigest: await exportParamsDigest(options),
			requestedByTokenId: caller.tokenId
		}));
	}
	const created = await handleExportCreate(context.db, {
		userId: caller.userId,
		options,
		...input.scoped || input.approvalId === void 0 ? {} : { approval: {
			id: input.approvalId,
			tokenId: caller.tokenId
		} }
	});
	if (!created.success) return created;
	return {
		success: true,
		data: { operation: summarizeOperation(created.data.operation) }
	};
}
/**
* Put the approval id and the next step in the message text, which is all
* many MCP clients show the model; `details` carries the same values.
*/
function withInstruction(result) {
	if (result.success || result.error.code !== "TRANSFER_APPROVAL_REQUIRED") return result;
	const details = result.error.details ?? {};
	const approvalId = String(details.approvalId);
	return failure("TRANSFER_APPROVAL_REQUIRED", `Approval ${approvalId} is pending until ${String(details.expiresAt)}. An admin must approve it in the EmDash admin under Settings → Transfer. Then call this tool again with the same arguments and approvalId "${approvalId}".`, details);
}
async function exportTotals(db, storage, operationId) {
	const manifest = await openExportPackage({
		db,
		storage,
		operation: await new TransferOperationRepository(db).require(operationId)
	}).manifest();
	const byKind = {};
	let total = 0;
	for (const kind of RECORD_KINDS) {
		const summary = manifest.records[kind];
		if (!summary) continue;
		byKind[kind] = summary.count;
		total += summary.count;
	}
	return {
		records: {
			total,
			byKind
		},
		media: {
			count: manifest.media.count,
			totalBytes: manifest.media.totalBytes
		},
		files: {
			count: manifest.files.count,
			totalBytes: manifest.files.totalBytes
		}
	};
}
async function exportStatus(context, input) {
	let operation;
	let nextRequestInMs;
	if (input.advance) {
		if (!context.storage) return storageMissing();
		const step = await handleExportAdvance(context.db, context.storage, { operationId: input.operationId });
		if (!step.success) return step;
		operation = step.data.operation;
		nextRequestInMs = step.data.nextRequestInMs;
	} else {
		const read = await handleExportGet(context.db, input.operationId);
		if (!read.success) return read;
		operation = read.data.operation;
		nextRequestInMs = operation.state === "pending" || operation.state === "running" ? 0 : null;
	}
	const status = {
		operation: summarizeOperation(operation),
		nextRequestInMs
	};
	if (operation.state === "complete" && operation.stagingCollectedAt === null) {
		if (!context.storage) return storageMissing();
		try {
			status.totals = await exportTotals(context.db, context.storage, operation.id);
		} catch (error) {
			return transferFailure(error, "TRANSFER_EXPORT_ERROR");
		}
	}
	return {
		success: true,
		data: status
	};
}
async function analyzeImport(context, input) {
	if (!context.storage) return storageMissing();
	const result = await handleImportAnalyze(context.db, context.storage, {
		operationId: input.operationId,
		decisions: input.decisions,
		target: analysisTargetContext({
			i18n: getI18nConfig(),
			maxUploadSize: context.maxUploadSize
		})
	});
	if (!result.success) return result;
	const { operation, plan, planDigest, nextRequestInMs } = result.data;
	return {
		success: true,
		data: {
			operation: summarizeOperation(operation),
			...plan && planDigest ? { plan: summarizePlan(plan, planDigest) } : {},
			nextRequestInMs
		}
	};
}
/**
* Check what `handleImportExecute` would, before a pending grant is created,
* so an admin is only ever asked to approve an import that can run.
*/
async function assertExecutable(context, input) {
	const operation = await new TransferOperationRepository(context.db).get(input.operationId);
	if (!operation || operation.kind !== "import") throw new TransferError("TRANSFER_OPERATION_NOT_FOUND", "Transfer operation not found");
	if (operation.packageDigest !== input.packageDigest) throw new TransferError("TRANSFER_PACKAGE_DIGEST_MISMATCH", "Package digest does not match");
	if (operation.planDigest === null || operation.planDigest !== input.planDigest) throw new TransferError("TRANSFER_PLAN_DIGEST_MISMATCH", "Plan digest does not match");
	if (operation.state !== "planned") throw new TransferError("TRANSFER_INVALID_STATE", "Import is not waiting to be started");
	const plan = await loadImportPlan(context.storage, operation);
	if (!plan || !isPlanExecutable(plan)) throw new TransferError("TRANSFER_PLAN_BLOCKED", "The import plan has blockers");
}
async function startImport(context, caller, input) {
	const storage = context.storage;
	if (!storage) return storageMissing();
	if (!input.scoped) {
		if (caller.tokenId === void 0) return tokenRequired();
		if (input.approvalId === void 0) {
			try {
				await assertExecutable({
					...context,
					storage
				}, input);
			} catch (error) {
				return transferFailure(error, "TRANSFER_IMPORT_ERROR");
			}
			return withInstruction(await requestTransferApproval(context.db, {
				userId: caller.userId,
				action: "import",
				operationId: input.operationId,
				packageDigest: input.packageDigest,
				planDigest: input.planDigest,
				requestedByTokenId: caller.tokenId
			}));
		}
	}
	const executed = await handleImportExecute(context.db, storage, {
		operationId: input.operationId,
		userId: caller.userId,
		packageDigest: input.packageDigest,
		planDigest: input.planDigest,
		...input.scoped || input.approvalId === void 0 ? {} : { approval: {
			id: input.approvalId,
			tokenId: caller.tokenId
		} }
	});
	if (!executed.success) return executed;
	return {
		success: true,
		data: { operation: summarizeOperation(executed.data.operation) }
	};
}
async function importStatus(context, operationId) {
	const result = await handleImportGet(context.db, operationId);
	if (!result.success) return result;
	return {
		success: true,
		data: {
			operation: summarizeOperation(result.data.operation),
			files: {
				declared: result.data.files.declared,
				verified: result.data.files.verified
			}
		}
	};
}
async function resumeImport(context, caller, operationId) {
	if (!context.storage) return storageMissing();
	const step = await handleImportAdvance(context.db, context.storage, {
		operationId,
		userId: caller.userId
	});
	if (!step.success) return step;
	return {
		success: true,
		data: {
			operation: summarizeOperation(step.data.operation),
			nextRequestInMs: step.data.nextRequestInMs
		}
	};
}
async function importReceipt(context, operationId) {
	return handleImportReceipt(context.db, operationId);
}
var COLLECTION_SLUG_PATTERN = /^[a-z][a-z0-9_]*$/;
/** http(s) scheme matcher used by `settings_update` URL validation. */
var HTTP_SCHEME_PATTERN = /^https?:\/\//i;
/**
* Shared wording for the `_rev` parameter on write tools. Agents only see the
* tool schema, so the retry protocol is stated here.
*/
var REV_PARAM_DESCRIPTION = "Revision token proving you have read the current item. Call content_get first and pass back the _rev it returns. If this call fails with CONFLICT the item changed in the meantime: call content_get again and retry with the new token.";
/**
* Replaces Zod's "expected string, received undefined" for a caller that never
* read the schema, so the message says where the token comes from.
*/
var REV_MISSING_ERROR = "_rev is required: call content_get for this item and pass back the _rev it returns.";
/**
* Shared wording for the `overrideLock` parameter on write tools. Agents only
* see the tool schema, and re-reading never clears ENTRY_LOCKED, so when to
* override is stated here.
*/
var OVERRIDE_LOCK_PARAM_DESCRIPTION = "Write even though someone else has this item open in the admin. Without it, the call fails with ENTRY_LOCKED and the error names who is editing; calling content_get again does not clear it. Tell the user who holds the item, and set this only if they ask you to write anyway.";
var SHA256_DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;
var transferOperationIdSchema = z.string().regex(/^[0-9A-Za-z_-]{1,64}$/, "Invalid operation id").describe("Transfer operation id");
var transferApprovalIdSchema = z.string().min(1).max(64).describe("Approval id from an earlier TRANSFER_APPROVAL_REQUIRED error, once approved");
/**
* The site transfer tools. Like the transfer REST API they are exempt from
* the site write fence, so an import started over MCP can be driven to
* completion over MCP.
*/
var TRANSFER_TOOL_NAMES = /* @__PURE__ */ new Set([
	"site_transfer_capabilities",
	"site_export_start",
	"site_export_status",
	"site_import_analyze",
	"site_import_start",
	"site_import_status",
	"site_import_resume",
	"site_import_receipt"
]);
var APPROVAL_FLOW_DESCRIPTION = "If the token lacks the scope, the first call fails with TRANSFER_APPROVAL_REQUIRED and details.approvalId; an admin must approve that request in the EmDash admin (Settings → Transfer). Then repeat the call with the same arguments plus approvalId. Approvals are single-use, bound to this user, this token, and these exact arguments, and expire 15 minutes after they are requested or approved.";
var TAXONOMY_CURSOR_VERSION = 2;
var MAX_TAXONOMY_CURSOR_LENGTH = 2048;
var contentDateTimeInputSchema = z.iso.datetime({
	offset: true,
	message: "must be an ISO 8601 datetime"
}).or(z.iso.datetime({
	offset: true,
	precision: -1,
	message: "must be an ISO 8601 datetime"
}));
var settingsMediaReferenceSchema = z.object({
	mediaId: z.string().describe("Media item ID (use media_create or media_list)"),
	alt: z.string().optional().describe("Alt text for the media reference")
});
var settingsSocialSchema = z.object({
	twitter: z.string().optional(),
	github: z.string().optional(),
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	linkedin: z.string().optional(),
	youtube: z.string().optional()
});
var settingsSeoSchema = z.object({
	titleSeparator: z.string().max(10).optional().describe("Separator between page title and site title (e.g. ' | ')"),
	defaultOgImage: settingsMediaReferenceSchema.nullable().optional().describe("Default Open Graph image when content has none; null removes it"),
	robotsTxt: z.string().max(5e3).optional().describe("Custom robots.txt body. Leave unset for the EmDash default. Changes are rejected when the site serves its own src/pages/robots.txt."),
	disallowAiTraining: z.boolean().optional().describe("Add robots.txt rules asking AI crawlers not to use the site for training. Changes are rejected when the site serves its own src/pages/robots.txt."),
	googleVerification: z.string().max(100).optional().describe("Google Search Console verification token"),
	bingVerification: z.string().max(100).optional().describe("Bing Webmaster Tools verification token")
});
var mediaUsageRepairToolSchema = z.object({
	scope: z.enum(["collection", "all"]).describe("Repair one collection or all collections"),
	collection: z.string().min(1).max(63).regex(COLLECTION_SLUG_PATTERN, "Invalid collection slug").optional().describe("Collection slug; required only when scope is collection")
}).strict().superRefine((input, ctx) => {
	if (input.scope === "collection" && input.collection === void 0) ctx.addIssue({
		code: "custom",
		path: ["collection"],
		message: "Collection is required when scope is collection"
	});
	if (input.scope === "all" && input.collection !== void 0) ctx.addIssue({
		code: "custom",
		path: ["collection"],
		message: "Collection must be omitted when scope is all"
	});
});
var schemaUpdateCollectionToolSchema = z.object({
	slug: z.string().min(1).max(63).regex(COLLECTION_SLUG_PATTERN, "Invalid collection slug").describe("Collection slug to update; the slug itself cannot be changed"),
	label: updateCollectionBody.shape.label.describe("New plural display name"),
	labelSingular: updateCollectionBody.shape.labelSingular.describe("New singular display name"),
	description: updateCollectionBody.shape.description.describe("New collection description"),
	icon: updateCollectionBody.shape.icon.describe("New admin UI icon name"),
	supports: updateCollectionBody.shape.supports.describe("Complete feature list to enable; omit to preserve the current list"),
	urlPattern: updateCollectionBody.shape.urlPattern.describe("New public URL pattern such as /blog/{slug}, with at most one placeholder per path segment; pass null to clear it"),
	routable: updateCollectionBody.shape.routable.describe("Whether entries require a slug before they can be published"),
	hasSeo: updateCollectionBody.shape.hasSeo.describe("Whether the collection supports SEO metadata"),
	group: updateCollectionBody.shape.group.describe("Admin sidebar folder shared with other collections of the same group; pass null to move the collection back inline"),
	commentsEnabled: updateCollectionBody.shape.commentsEnabled.describe("Whether comments are enabled for this collection"),
	commentsModeration: updateCollectionBody.shape.commentsModeration.describe("Comment moderation policy"),
	commentsClosedAfterDays: updateCollectionBody.shape.commentsClosedAfterDays.describe("Close comments after this many days; 0 keeps them open"),
	commentsAutoApproveUsers: updateCollectionBody.shape.commentsAutoApproveUsers.describe("Whether comments from authenticated users are automatically approved"),
	editLocking: updateCollectionBody.shape.editLocking.describe("Whether opening an entry takes an edit lock that refuses other editors' writes"),
	titleField: updateCollectionBody.shape.titleField.describe("Field slug to use as the Title column in admin lists; pass null to fall back to the default"),
	dateField: updateCollectionBody.shape.dateField.describe("Datetime field slug or system timestamp (publishedAt, createdAt, updatedAt) to use as the Date column and default sort in admin lists; pass null to fall back to last-updated")
});
var schemaUpdateFieldToolSchema = z.object({
	collection: z.string().min(1).max(63).regex(COLLECTION_SLUG_PATTERN, "Invalid collection slug").describe("Collection slug containing the field"),
	fieldSlug: z.string().min(1).max(63).regex(COLLECTION_SLUG_PATTERN, "Invalid field slug").describe("Field slug to update; the slug itself cannot be changed"),
	label: updateFieldBody.shape.label.describe("New display name"),
	type: updateFieldBody.shape.type.describe("New field type; only string, text, and slug aliases can be changed in place"),
	required: updateFieldBody.shape.required.describe("Whether the field is required; changing this requires a manual content migration"),
	unique: updateFieldBody.shape.unique.describe("Whether field values must be unique; changing this requires a manual content migration"),
	defaultValue: updateFieldBody.shape.defaultValue.describe("Default value for new content"),
	validation: updateFieldBody.shape.validation.describe("Validation constraints; pass null to clear existing constraints"),
	widget: updateFieldBody.shape.widget.describe("Admin editor widget name"),
	options: updateFieldBody.shape.options.describe("Widget configuration"),
	sortOrder: updateFieldBody.shape.sortOrder.describe("Field order in the content editor"),
	searchable: updateFieldBody.shape.searchable.describe("Whether full-text search indexes the field"),
	translatable: updateFieldBody.shape.translatable.describe("Whether values vary by locale; changing to false requires a manual content migration"),
	indexed: updateFieldBody.shape.indexed.describe("Create or remove a physical index for structured sorting")
});
function encodeTaxonomyCursor(term) {
	const cursor = encodeBase64(JSON.stringify({
		v: TAXONOMY_CURSOR_VERSION,
		id: term.id
	}));
	if (cursor.length > MAX_TAXONOMY_CURSOR_LENGTH) throw new InvalidCursorError(cursor);
	return cursor;
}
function decodeTaxonomyCursor(cursor) {
	if (!cursor || cursor.length > MAX_TAXONOMY_CURSOR_LENGTH) throw new InvalidCursorError(cursor);
	let parsed;
	try {
		parsed = JSON.parse(decodeBase64(cursor));
	} catch {
		throw new InvalidCursorError(cursor);
	}
	if (parsed === null || typeof parsed !== "object") throw new InvalidCursorError(cursor);
	const candidate = parsed;
	if ("v" in candidate) {
		const { v, id } = candidate;
		if (v !== TAXONOMY_CURSOR_VERSION || typeof id !== "string" || id.length === 0 || id.includes("\0")) throw new InvalidCursorError(cursor);
		return { id };
	}
	const legacy = decodeCursor(cursor);
	if (legacy.orderValue.includes("\0") || legacy.id.length === 0 || legacy.id.includes("\0")) throw new InvalidCursorError(cursor);
	return { id: legacy.id };
}
/**
* Return a successful tool response with the data as pretty-printed JSON.
*/
function respondData(data) {
	return { content: [{
		type: "text",
		text: JSON.stringify(data, null, 2)
	}] };
}
/**
* Return a structured error tool response.
*
* The error code is emitted both in the human-readable message (as a stable
* `[CODE]` prefix that callers can match on) and in `_meta.code` so MCP-aware
* clients can read it programmatically once the SDK supports forwarding meta.
*/
function respondError(code, message, details) {
	const text = `[${code}] ${message}`;
	const meta = { code };
	if (details !== void 0) meta.details = details;
	return {
		content: [{
			type: "text",
			text
		}],
		isError: true,
		_meta: meta
	};
}
/**
* Auth/permission errors thrown from `requireScope` / `requireRole` /
* `requireOwnership` / `requireDraftAccess`. Carries a stable string `code`
* field so `respondHandlerError` can surface it through `_meta.code` and
* the message prefix.
*
* Distinct from `McpError` (which the SDK catches at JSON-RPC level — the
* code there is numeric, not a stable EmDash error code).
*/
var EmDashAuthError = class extends Error {
	name = "EmDashAuthError";
	constructor(message, code) {
		super(message);
		this.code = code;
	}
};
/**
* Map an unknown thrown error to a structured error envelope.
*
* Recognises (in priority order):
*  - `EmDashAuthError` — `code` is a stable EmDash auth code
*    (`UNAUTHORIZED`, `INSUFFICIENT_SCOPE`, `INSUFFICIENT_PERMISSIONS`).
*  - `Error` objects with an `apiError: { code, details? }` annotation
*    (handlers throw these for NOT_FOUND / CONFLICT inside transactions;
*    see `api/handlers/content.ts:538`).
*  - `SchemaError` (and any error with a string `code` field) — the code
*    is forwarded verbatim. `details` is forwarded too if present.
*  - Plain `Error` instances — message preserved, code falls back to
*    `fallbackCode` (or `INTERNAL_ERROR`).
*  - Strings — used directly as the message.
*  - Anything else — coerced via `String()`.
*
* The original message is always preserved so tests and humans can see the
* specific failure cause. Numeric `code` values (e.g. on `McpError`) are
* ignored — the field is reserved for stable string codes.
*/
function respondHandlerError(error, fallbackCode = "INTERNAL_ERROR") {
	let code = fallbackCode;
	let message;
	let details;
	if (error instanceof EmDashAuthError) {
		message = error.message || fallbackCode;
		code = error.code;
	} else if (error instanceof Error) {
		message = error.message || fallbackCode;
		const apiError = error.apiError;
		if (apiError && typeof apiError.code === "string" && apiError.code) {
			code = apiError.code;
			if (apiError.details && typeof apiError.details === "object") details = apiError.details;
		} else {
			const rawCode = error.code;
			if (typeof rawCode === "string" && rawCode) code = rawCode;
			const rawDetails = error.details;
			if (rawDetails && typeof rawDetails === "object") details = rawDetails;
		}
	} else if (typeof error === "string") message = error;
	else message = String(error);
	return respondError(code, message, details);
}
/**
* Unwrap an ApiResult<T> into MCP tool result format.
*
* On success returns the data as JSON. On failure propagates the structured
* `{ code, message, details }` from the handler so the caller sees both a
* machine-readable code (in `_meta.code` and as a `[CODE]` message prefix)
* and the original human-readable message.
*/
function unwrap(result) {
	if (result.success && result.data !== void 0) return respondData(result.data);
	const err = result.error && typeof result.error === "object" ? result.error : void 0;
	if (!err) return respondError("INTERNAL_ERROR", "Unknown error");
	return respondError(typeof err.code === "string" && err.code ? err.code : "INTERNAL_ERROR", typeof err.message === "string" && err.message ? err.message : "Unknown error", err.details && typeof err.details === "object" ? err.details : void 0);
}
/**
* Return a JSON text block (success path for tools that don't go through
* the ApiResult-returning handler layer, e.g. schema/menu/taxonomy).
*/
function jsonResult(data) {
	return respondData(data);
}
function isPublished(t) {
	return typeof t === "object" && t !== null && "status" in t && t.status === "published";
}
function isEntry(t, idOrSlug) {
	return typeof t === "object" && t !== null && ("id" in t && t.id === idOrSlug || "slug" in t && t.slug === idOrSlug);
}
function getExtra(extra) {
	const payload = extra.authInfo?.extra;
	if (!payload?.emdash) throw new Error("EmDash not available — server misconfigured");
	return payload;
}
function getEmDash(extra) {
	return getExtra(extra).emdash;
}
/**
* Unwrap a write result, first invalidating `tags` in the route cache when the
* write succeeded. Pass `changedEarlier` when an earlier step of the same tool
* already changed live content, so a failure in a later step still invalidates.
*/
async function unwrapAndInvalidate(extra, result, tags, changedEarlier = false) {
	if (result.success || changedEarlier) await invalidateRouteCache(getExtra(extra).cache, tags);
	return unwrap(result);
}
async function getCollectionFields(ec, collection) {
	try {
		const { SchemaRegistry } = await import("./schema-B7ODIkP4_GDXf9kH-.mjs").then((n) => n.t);
		const { expandCollectionBlockFields } = await import("./block-values-BRJZHvF4_BgbAezpO.mjs").then((n) => n.t);
		const col = await new SchemaRegistry(ec.db).getCollectionWithFields(collection);
		return col ? (await expandCollectionBlockFields(ec.db, col)).fields : null;
	} catch {
		return null;
	}
}
/**
* Convert markdown strings to Portable Text for `portableText` fields on write.
* Non-string values pass through, so callers may still send Portable Text. If
* the schema can't be loaded, data is returned unchanged for the handler to
* validate.
*/
async function convertWriteData(ec, collection, data) {
	const fields = await getCollectionFields(ec, collection);
	if (!fields) return data;
	return convertDataForWrite(data, fields);
}
/**
* Convert `portableText` field values on each item's `data` to markdown,
* mutating in place. Inverse of {@link convertWriteData}, gated on the read
* tools' `markdown` argument.
*/
async function applyReadMarkdown(ec, collection, items) {
	const fields = await getCollectionFields(ec, collection);
	if (!fields) return;
	for (const item of items) if (item.data && typeof item.data === "object") item.data = convertDataForRead(item.data, fields, false);
}
async function invalidateBylines() {
	const { invalidateBylineCache } = await import("./bylines-a01JW9yq_BD0IY8N5.mjs").then((n) => n.t);
	invalidateBylineCache();
}
/**
* Enforce a scope requirement on the current request.
*
* When tokenScopes is undefined (session auth), all operations are allowed
* since session users have full access based on their role. When scopes are
* present (token auth), the required scope must be included.
*/
function requireScope(extra, scope) {
	const payload = getExtra(extra);
	if (payload.tokenScopes && !hasScope(payload.tokenScopes, scope)) throw new EmDashAuthError(`Insufficient scope: requires ${scope}`, "INSUFFICIENT_SCOPE");
}
/**
* Defense-in-depth: enforce a minimum RBAC role on the current request.
*
* This is checked in addition to scope requirements. Even if a token has
* the right scopes (e.g. due to a bug in scope clamping), the user's
* actual role must still meet the minimum.
*/
function requireRole(extra, minRole) {
	if (getExtra(extra).userRole < minRole) throw new EmDashAuthError("Insufficient permissions for this operation", "INSUFFICIENT_PERMISSIONS");
}
/**
* Whether the caller's token holds `scope` (`transfer:*`: any transfer
* scope). A caller without token scopes holds none.
*/
function transferScopeHeld(extra, scope) {
	const { tokenScopes } = getExtra(extra);
	if (!tokenScopes) return false;
	if (scope === "transfer:*") return TRANSFER_SCOPES.some((held) => hasScope(tokenScopes, held));
	return hasScope(tokenScopes, scope);
}
function insufficientTransferScope(scope) {
	return new EmDashAuthError(`Insufficient scope: requires ${scope === "transfer:*" ? TRANSFER_SCOPES.join(" or ") : scope}`, "INSUFFICIENT_SCOPE");
}
function requireTransferScope(extra, scope) {
	if (!transferScopeHeld(extra, scope)) throw insufficientTransferScope(scope);
}
/**
* Require `scope`, or a grant this user consumed with this token to start
* `operationId`.
*/
async function requireTransferAccess(extra, scope, action, operationId) {
	if (transferScopeHeld(extra, scope)) return;
	const { emdash, userId, tokenId } = getExtra(extra);
	if (await hasOperationGrant(emdash.db, {
		userId,
		tokenId
	}, action, operationId)) return;
	throw insufficientTransferScope(scope);
}
function transferContext(extra) {
	const { emdash } = getExtra(extra);
	return {
		db: emdash.db,
		storage: emdash.storage,
		maxUploadSize: emdash.config.maxUploadSize
	};
}
function transferDigest(value) {
	return toSha256Digest(value.slice(7));
}
/**
* Whether the current user may read non-published content (drafts, scheduled,
* trashed, revisions, compare). SUBSCRIBER may hold content:read for
* member-only published content but must not see drafts.
*/
function canReadDrafts(extra) {
	return hasPermission({ role: getExtra(extra).userRole }, "content:read_drafts");
}
/**
* Throw if the current user cannot read non-published content. Used by
* editor-only views (revisions, compare, trash, preview-url).
*/
function requireDraftAccess(extra) {
	if (!canReadDrafts(extra)) throw new EmDashAuthError("Insufficient permissions for this operation", "INSUFFICIENT_PERMISSIONS");
}
/**
* Enforce ownership-based permission checks, mirroring the REST API's
* requireOwnerPerm() pattern.
*
* If the user is the owner, checks ownPermission. Otherwise checks
* anyPermission (which requires EDITOR+ role).
*/
function requireOwnership(extra, ownerId, ownPermission, anyPermission) {
	const payload = getExtra(extra);
	if (!canActOnOwn({
		id: payload.userId,
		role: payload.userRole
	}, ownerId, ownPermission, anyPermission)) throw new EmDashAuthError("Insufficient permissions for this operation", "INSUFFICIENT_PERMISSIONS");
}
/**
* Extract the author ID from a content handler response.
*
* Content handlers return `{ item: { id, authorId, ... }, _rev? }`.
* This helper navigates that shape safely. Returns "" when authorId is
* missing or non-string (e.g. seed-imported content with no author);
* `canActOnOwn` then decides based on the caller's permissions —
* an actor with `*:edit_any` succeeds, an actor with only `*:edit_own`
* is denied with a clean permission error.
*/
function extractContentAuthorId(data) {
	if (!data || typeof data !== "object") return "";
	const obj = data;
	const item = obj.item && typeof obj.item === "object" ? obj.item : obj;
	return typeof item?.authorId === "string" ? item.authorId : "";
}
/**
* Extract the resolved ID from a content handler response.
* Handles slug -> ID resolution performed by the handler.
*/
function extractContentId(data) {
	if (!data || typeof data !== "object") return void 0;
	const obj = data;
	const item = obj.item && typeof obj.item === "object" ? obj.item : obj;
	return typeof item?.id === "string" ? item.id : void 0;
}
/**
* Refuses a write while another user holds the entry's edit lock. Resolves to
* `null` when the write may proceed, and extends the caller's own lease if they
* hold it.
*/
async function refuseLockedEntry(extra, collection, entryId, overrideLock) {
	const { emdash, userId } = getExtra(extra);
	const refusal = await claimEntryLockForWrite(emdash.db, collection, entryId, userId, { override: overrideLock });
	return refusal ? respondError(refusal.code, refusal.message, { ...refusal.details }) : null;
}
/** Extract the status from a content handler response. */
function extractContentStatus(data) {
	if (!data || typeof data !== "object") return void 0;
	const obj = data;
	return (obj.item && typeof obj.item === "object" ? obj.item : obj)?.status;
}
/** Extract the `_rev` token from a content handler response. */
function extractContentRev(data) {
	if (!data || typeof data !== "object") return void 0;
	const rev = data._rev;
	return typeof rev === "string" ? rev : void 0;
}
/**
* The publish or unpublish `content_update` chains after saving fields. When it conflicts, the
* fields stay saved, so the error says so and names the `_rev` they saved.
*/
function afterSavedFields(result, savedRev, step) {
	const error = result.error;
	if (result.success || savedRev === void 0 || error?.code !== "CONFLICT") return result;
	return {
		success: false,
		error: {
			code: "CONFLICT",
			message: `The fields were saved, but the ${step} conflicted${typeof error.message === "string" ? `: ${error.message}` : ""}`,
			details: { _rev: savedRev }
		}
	};
}
function createMcpServer(pluginTools = [], request) {
	const server = new McpServer({
		name: "emdash",
		version: "0.1.0"
	}, { capabilities: { logging: {} } });
	const originalRegisterTool = server.registerTool.bind(server);
	server.registerTool = ((name, config, callback) => {
		const fenced = config.annotations?.readOnlyHint !== true && !TRANSFER_TOOL_NAMES.has(name);
		const wrapped = async (...callbackArgs) => {
			try {
				if (!fenced) return await callback(...callbackArgs);
				const { db } = getEmDash(callbackArgs.at(-1));
				const fence = await readSiteWriteFence(db);
				if (fence.error) return respondError(fence.error.code, fence.error.message);
				const result = await callback(...callbackArgs);
				if (fence.exportRunning && !("isError" in result && result.isError)) await recordSiteWrite(db);
				return result;
			} catch (error) {
				return respondHandlerError(error, "INTERNAL_ERROR");
			}
		};
		return originalRegisterTool(name, config, wrapped);
	});
	const registeredPluginNames = /* @__PURE__ */ new Set();
	for (const tool of pluginTools) {
		if (!Object.hasOwn(Permissions, tool.permission)) continue;
		const name = pluginToolName(tool.pluginId, tool.name);
		if (registeredPluginNames.has(name)) {
			console.warn(`[emdash] Skipping duplicate MCP tool name ${name} from ${tool.pluginId}/${tool.name}`);
			continue;
		}
		registeredPluginNames.add(name);
		server.registerTool(name, {
			description: tool.description,
			inputSchema: tool.inputSchema,
			outputSchema: tool.outputSchema,
			annotations: { destructiveHint: tool.destructive }
		}, async (input, extra) => {
			const payload = getExtra(extra);
			const requiredScope = `mcp:tools:${tool.pluginId}`;
			if (payload.tokenScopes && !hasScope(payload.tokenScopes, requiredScope)) {
				if (request) await payload.emdash.handlePluginMcpDenied(tool.pluginId, tool.name, tool.route, payload.userId, request, `Missing scope: ${requiredScope}`);
				throw new EmDashAuthError(`Insufficient scope: requires ${requiredScope}`, "INSUFFICIENT_SCOPE");
			}
			if (!hasPermission({ role: payload.userRole }, tool.permission)) {
				if (request) await payload.emdash.handlePluginMcpDenied(tool.pluginId, tool.name, tool.route, payload.userId, request, `Missing permission: ${tool.permission}`);
				throw new EmDashAuthError(`Insufficient permission: requires ${tool.permission}`, "INSUFFICIENT_PERMISSIONS");
			}
			if (!request) return respondError("INTERNAL_ERROR", "Missing MCP request context");
			const routeCache = payload.cache;
			const result = await payload.emdash.handlePluginMcpTool(tool.pluginId, tool.name, tool.route, input, payload.userId, request, payload.user, routeCache?.enabled ? (tags) => routeCache.invalidate({ tags }) : void 0);
			if (!result.success) return unwrap(result);
			if (tool.outputSchema) {
				if (!result.data || typeof result.data !== "object" || Array.isArray(result.data)) return respondError("INVALID_PLUGIN_OUTPUT", "Plugin tool output must be an object when outputSchema is declared");
				return {
					content: [{
						type: "text",
						text: JSON.stringify(result.data, null, 2)
					}],
					structuredContent: result.data
				};
			}
			return respondData(result.data);
		});
	}
	server.registerTool("content_list", {
		title: "List Content",
		description: "List content items in a collection with optional filtering and pagination. Returns items sorted by the specified field. Use the nextCursor value from the response to fetch the next page. Status can be 'draft', 'published', or 'scheduled'. If no status is given, all non-trashed items are returned.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug (e.g. 'posts', 'pages')"),
			status: z.enum([
				"draft",
				"published",
				"scheduled"
			]).optional().describe("Filter by content status"),
			limit: z.number().int().min(1).max(100).optional().describe("Max items to return (default 50, max 100)"),
			cursor: z.string().min(1).max(2048).optional().describe("Pagination cursor from a previous response"),
			orderBy: z.string().optional().describe("Field to sort by: 'createdAt' (default), 'updatedAt', 'publishedAt', 'scheduledAt', 'slug', 'status', 'locale', or a field slug that is indexed or set as the collection's titleField or dateField"),
			order: z.enum(["asc", "desc"]).optional().describe("Sort direction (default 'desc')"),
			locale: z.string().optional().describe("Filter by locale (e.g. 'en', 'fr'). Only relevant when i18n is enabled."),
			markdown: z.boolean().optional().describe("Return rich text (portableText) fields as Markdown strings instead of Portable Text arrays (default false).")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		const status = canReadDrafts(extra) ? args.status : "published";
		const result = await ec.handleContentList(args.collection, {
			status,
			limit: args.limit,
			cursor: args.cursor,
			orderBy: args.orderBy,
			order: args.order,
			locale: args.locale
		});
		if (result.success && args.markdown) {
			const payload = result.data;
			if (payload && typeof payload === "object" && "items" in payload && Array.isArray(payload.items)) await applyReadMarkdown(ec, args.collection, payload.items);
		}
		return unwrap(result);
	});
	server.registerTool("content_get", {
		title: "Get Content",
		description: "Get a single content item by its ID or slug. Returns the full content data including all field values, metadata, and a _rev token. content_update, content_publish, content_unpublish and content_discard_draft require that token, so read the item here before calling them.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug (e.g. 'posts', 'pages')"),
			id: z.string().describe("Content item ID (ULID) or slug"),
			locale: z.string().optional().describe("Locale to scope slug lookup (e.g. 'fr'). Only affects slug resolution; IDs are globally unique."),
			markdown: z.boolean().optional().describe("Return rich text (portableText) fields as Markdown strings instead of Portable Text arrays (default false).")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		const result = await ec.handleContentGet(args.collection, args.id, args.locale);
		if (!result.success) return unwrap(result);
		let item = result.data.item;
		if (!canReadDrafts(extra)) {
			const { liveData, draftRevisionId: _draftRevisionId, ...published } = result.data.item;
			if (published.status !== "published") return unwrap({
				success: false,
				error: {
					code: "NOT_FOUND",
					message: `Content item not found: ${args.id}`
				}
			});
			item = {
				...published,
				data: liveData ?? published.data
			};
		}
		if (args.markdown) await applyReadMarkdown(ec, args.collection, [item]);
		return unwrap({
			success: true,
			data: {
				...result.data,
				item
			}
		});
	});
	server.registerTool("content_create", {
		title: "Create Content",
		description: "Create a new content item in a collection. The 'data' object should contain field values matching the collection's schema (use schema_get_collection to check). For rich text (portableText) fields, pass a Markdown string — converted to Portable Text automatically; prefer this. Pass a Portable Text JSON array only for complex content Markdown can't express (custom blocks, embeds). A slug is auto-generated if not provided. Items are created as 'draft' by default — use content_publish or pass status='published' to make them live. `seo` and `publishedAt` can be set in the same call; `publishedAt` requires content:publish_any.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug (e.g. 'posts', 'pages')"),
			data: z.record(z.string(), z.unknown()).describe("Field values as key-value pairs matching the collection schema"),
			slug: z.string().optional().describe("URL slug (auto-generated from title if omitted)"),
			status: z.enum(["draft", "published"]).optional().describe("Initial status (default 'draft'). Requires publish permission."),
			locale: z.string().optional().describe("Locale for this content (e.g. 'fr'). Defaults to default locale."),
			translationOf: z.string().optional().describe("ID of the content item this is a translation of. Links items in the same translation group."),
			migrateBlocks: z.boolean().optional().describe("Allow retained blocks to migrate to their type's active version"),
			replaceBlocks: z.boolean().optional().describe("Treat an entirely keyless blocks array as an explicit replacement"),
			bylines: z.array(contentBylineInputSchema).optional().describe("Bylines to credit. Each entry references an existing byline by id (see byline_list / byline_create) with an optional roleLabel. The first entry becomes the primary byline."),
			taxonomies: z.record(z.string(), z.array(z.string())).optional().describe("Taxonomy term assignments as { taxonomyName: [termSlug, ...] }. Term slugs are resolved in the entry's locale. Call taxonomy_list to see available taxonomies and taxonomy_list_terms to look up slugs. Missing keys leave that taxonomy unchanged."),
			seo: contentSeoInput.optional().describe("Per-content SEO metadata. Only valid for collections with SEO enabled (see schema_get_collection.hasSeo)."),
			publishedAt: contentDateTimeInputSchema.nullish().describe("Override the publication timestamp (ISO 8601). Requires content:publish_any permission. Useful for content migrations.")
		}),
		annotations: { destructiveHint: false }
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.CONTRIBUTOR);
		const { emdash, userId, userRole } = getExtra(extra);
		const actor = {
			id: userId,
			role: userRole
		};
		if (args.publishedAt !== void 0) {
			if (!hasPermission({
				id: userId,
				role: userRole
			}, "content:publish_any")) throw new EmDashAuthError("Setting publishedAt requires content:publish_any permission", "INSUFFICIENT_PERMISSIONS");
		}
		if (args.translationOf) {
			const source = await emdash.handleContentGet(args.collection, args.translationOf);
			if (!source.success) return unwrap(source);
			requireOwnership(extra, extractContentAuthorId(source.data), "content:edit_own", "content:edit_any");
		}
		const data = await convertWriteData(emdash, args.collection, args.data);
		if (args.status === "published") {
			if (!hasPermission({
				id: userId,
				role: userRole
			}, "content:publish_own")) throw new EmDashAuthError("Insufficient permissions: publishing requires content:publish_own", "INSUFFICIENT_PERMISSIONS");
			const result = await emdash.handleContentCreate(args.collection, {
				data,
				slug: args.slug,
				authorId: userId,
				locale: args.locale,
				translationOf: args.translationOf,
				bylines: args.bylines,
				taxonomies: args.taxonomies,
				migrateBlocks: args.migrateBlocks,
				replaceBlocks: args.replaceBlocks,
				seo: args.seo,
				publishedAt: args.publishedAt,
				actor
			});
			if (!result.success) return unwrap(result);
			const itemId = extractContentId(result.data);
			if (itemId) return unwrapAndInvalidate(extra, await emdash.handleContentPublish(args.collection, itemId, {
				publishedAt: args.publishedAt ?? void 0,
				actor: {
					...actor,
					source: "mcp"
				},
				origin: { source: "mcp" }
			}), [args.collection, itemId], true);
			return unwrap(result);
		}
		return unwrap(await emdash.handleContentCreate(args.collection, {
			data,
			slug: args.slug,
			authorId: userId,
			locale: args.locale,
			translationOf: args.translationOf,
			bylines: args.bylines,
			taxonomies: args.taxonomies,
			migrateBlocks: args.migrateBlocks,
			replaceBlocks: args.replaceBlocks,
			seo: args.seo,
			publishedAt: args.publishedAt,
			actor
		}));
	});
	server.registerTool("content_update", {
		title: "Update Content",
		description: "Update an existing content item. Only include fields you want to change in the 'data' object — unspecified fields are left unchanged. Rich text (portableText) fields accept a Markdown string (recommended, converted automatically); use a Portable Text JSON array only for complex content Markdown can't express (custom blocks, embeds). Requires the _rev token from content_get, so read the item before updating it: the update fails if the item changed since that read. When status is not set, a change to a published item is staged as a draft, so the response shows the new values while the live version keeps the old ones until content_publish. `seo` and `bylines` are persisted alongside the field updates in a single transaction. `publishedAt` requires the content:publish_any permission and is useful for migrations or correcting historical dates.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug"),
			locale: z.string().optional().describe("Locale to scope slug lookup (e.g. 'fr'). Only affects slug resolution; IDs are globally unique."),
			data: z.record(z.string(), z.unknown()).optional().describe("Field values to update (only include changed fields)"),
			slug: z.string().optional().describe("New URL slug"),
			status: z.enum(["draft", "published"]).optional().describe("New status. Setting to 'published' requires publish permission. Setting to 'draft' unpublishes the item and also requires publish permission."),
			seo: contentSeoInput.optional().describe("Per-content SEO metadata. Only valid for collections with SEO enabled (see schema_get_collection.hasSeo). Fields not included are left unchanged; pass null to clear."),
			bylines: z.array(contentBylineInputSchema).optional().describe("Replace the byline list for this item. The first entry becomes the primary byline. Pass an empty array to clear all bylines."),
			taxonomies: z.record(z.string(), z.array(z.string())).optional().describe("Replace taxonomy term assignments as { taxonomyName: [termSlug, ...] }. Term slugs are resolved in the entry's locale. Only named taxonomies are touched; other taxonomies are left unchanged. Pass an empty array to clear a taxonomy."),
			publishedAt: contentDateTimeInputSchema.nullish().describe("Override the publication timestamp (ISO 8601). Requires content:publish_any permission. Pass null to clear. Useful for content migrations."),
			migrateBlocks: z.boolean().optional().describe("Allow existing blocks to migrate to their type's active version"),
			replaceBlocks: z.boolean().optional().describe("Treat an entirely keyless blocks array as an explicit replacement"),
			_rev: z.string({ error: REV_MISSING_ERROR }).describe(REV_PARAM_DESCRIPTION),
			overrideLock: z.boolean().optional().describe(OVERRIDE_LOCK_PARAM_DESCRIPTION)
		})
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.CONTRIBUTOR);
		const { emdash, userId, userRole } = getExtra(extra);
		const actor = {
			id: userId,
			role: userRole
		};
		const existing = await emdash.handleContentGet(args.collection, args.id, args.locale);
		if (!existing.success) return unwrap(existing);
		const ownerId = extractContentAuthorId(existing.data);
		if (!entryEditAccess({
			id: userId,
			role: userRole
		}, {
			authorId: ownerId,
			status: extractContentStatus(existing.data)
		})) throw new EmDashAuthError("Insufficient permissions for this operation", "INSUFFICIENT_PERMISSIONS");
		const data = args.data ? await convertWriteData(emdash, args.collection, args.data) : args.data;
		if (args.publishedAt !== void 0) {
			if (!hasPermission({
				id: userId,
				role: userRole
			}, "content:publish_any")) throw new EmDashAuthError("Setting publishedAt requires content:publish_any permission", "INSUFFICIENT_PERMISSIONS");
		}
		const resolvedId = extractContentId(existing.data) ?? args.id;
		if (args.status !== void 0) requireOwnership(extra, ownerId, "content:publish_own", "content:publish_any");
		const locked = await refuseLockedEntry(extra, args.collection, resolvedId, args.overrideLock);
		if (locked) return locked;
		if (args.status === "published") {
			let rev = args._rev;
			let savedRev;
			let liveChanged = false;
			if (args.data || args.slug || args.seo !== void 0 || args.bylines !== void 0 || args.taxonomies !== void 0 || args.publishedAt !== void 0) {
				const updateResult = await emdash.handleContentUpdate(args.collection, resolvedId, {
					data,
					slug: args.slug,
					actor,
					locale: args.locale,
					seo: args.seo,
					bylines: args.bylines,
					taxonomies: args.taxonomies,
					publishedAt: args.publishedAt,
					migrateBlocks: args.migrateBlocks,
					replaceBlocks: args.replaceBlocks,
					_rev: args._rev
				});
				if (!updateResult.success) return unwrap(updateResult);
				liveChanged = updateResult.liveContentChanged !== false;
				savedRev = extractContentRev(updateResult.data);
				rev = savedRev;
			}
			return unwrapAndInvalidate(extra, afterSavedFields(await emdash.handleContentPublish(args.collection, resolvedId, {
				_rev: rev,
				actor: {
					...actor,
					source: "mcp"
				},
				origin: { source: "mcp" }
			}), savedRev, "publish"), [args.collection, resolvedId], liveChanged);
		}
		if (args.status === "draft") {
			let rev = args._rev;
			let savedRev;
			let liveChanged = false;
			if (args.data || args.slug || args.seo !== void 0 || args.bylines !== void 0 || args.taxonomies !== void 0 || args.publishedAt !== void 0) {
				const updateResult = await emdash.handleContentUpdate(args.collection, resolvedId, {
					data,
					slug: args.slug,
					actor,
					locale: args.locale,
					seo: args.seo,
					bylines: args.bylines,
					taxonomies: args.taxonomies,
					publishedAt: args.publishedAt,
					migrateBlocks: args.migrateBlocks,
					replaceBlocks: args.replaceBlocks,
					_rev: args._rev
				});
				if (!updateResult.success) return unwrap(updateResult);
				liveChanged = updateResult.liveContentChanged !== false;
				savedRev = extractContentRev(updateResult.data);
				rev = savedRev;
			}
			return unwrapAndInvalidate(extra, afterSavedFields(await emdash.handleContentUnpublish(args.collection, resolvedId, {
				_rev: rev,
				actor: {
					...actor,
					source: "mcp"
				},
				origin: { source: "mcp" }
			}), savedRev, "unpublish"), [args.collection, resolvedId], liveChanged);
		}
		const result = await emdash.handleContentUpdate(args.collection, resolvedId, {
			data,
			slug: args.slug,
			actor,
			locale: args.locale,
			seo: args.seo,
			bylines: args.bylines,
			taxonomies: args.taxonomies,
			publishedAt: args.publishedAt,
			migrateBlocks: args.migrateBlocks,
			replaceBlocks: args.replaceBlocks,
			_rev: args._rev
		});
		if (result.liveContentChanged === false) return unwrap(result);
		return unwrapAndInvalidate(extra, result, [args.collection, resolvedId]);
	});
	server.registerTool("content_delete", {
		title: "Delete Content (Trash)",
		description: "Soft-delete a content item by moving it to the trash. The item can be restored later with content_restore, or permanently deleted with content_permanent_delete.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug"),
			overrideLock: z.boolean().optional().describe(OVERRIDE_LOCK_PARAM_DESCRIPTION)
		}),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.AUTHOR);
		const { emdash: ec, userId, userRole } = getExtra(extra);
		const existing = await ec.handleContentGet(args.collection, args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, extractContentAuthorId(existing.data), "content:delete_own", "content:delete_any");
		const resolvedId = extractContentId(existing.data) ?? args.id;
		const locked = await refuseLockedEntry(extra, args.collection, resolvedId, args.overrideLock);
		if (locked) return locked;
		return unwrapAndInvalidate(extra, await ec.handleContentDelete(args.collection, resolvedId, { actor: {
			id: userId,
			role: userRole,
			source: "mcp"
		} }), [args.collection, resolvedId]);
	});
	server.registerTool("content_restore", {
		title: "Restore Content",
		description: "Restore a soft-deleted content item from the trash. It comes back as a draft with no schedule, even if it was published or scheduled before it was trashed.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug")
		})
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.AUTHOR);
		const ec = getEmDash(extra);
		const existing = await ec.handleContentGetIncludingTrashed(args.collection, args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, extractContentAuthorId(existing.data), "content:edit_own", "content:edit_any");
		const resolvedId = extractContentId(existing.data) ?? args.id;
		return unwrapAndInvalidate(extra, await ec.handleContentRestore(args.collection, resolvedId), [args.collection, resolvedId]);
	});
	server.registerTool("content_permanent_delete", {
		title: "Permanently Delete Content",
		description: "Permanently and irreversibly delete a trashed content item. The item must be in the trash first (use content_delete). This cannot be undone.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug")
		}),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.ADMIN);
		return unwrapAndInvalidate(extra, await getEmDash(extra).handleContentPermanentDelete(args.collection, args.id), [args.collection, args.id]);
	});
	server.registerTool("content_publish", {
		title: "Publish Content",
		description: "Publish a content item, making it live on the site. Creates a published revision from the current draft. Further edits create a new draft without affecting the live version until re-published. Pass `publishedAt` to backdate (e.g. when migrating content from another CMS) — this requires the content:publish_any permission. Without `publishedAt`, the existing `published_at` is preserved on re-publish (idempotent) and falls back to the current time on first publish.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug"),
			_rev: z.string({ error: REV_MISSING_ERROR }).describe(REV_PARAM_DESCRIPTION),
			publishedAt: contentDateTimeInputSchema.optional().describe("Override publication timestamp (ISO 8601). Requires content:publish_any permission. Useful when importing content with original publish dates."),
			overrideLock: z.boolean().optional().describe(OVERRIDE_LOCK_PARAM_DESCRIPTION)
		})
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.AUTHOR);
		const { emdash, userId, userRole } = getExtra(extra);
		const existing = await emdash.handleContentGet(args.collection, args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, extractContentAuthorId(existing.data), "content:publish_own", "content:publish_any");
		if (args.publishedAt !== void 0) {
			if (!hasPermission({
				id: userId,
				role: userRole
			}, "content:publish_any")) throw new EmDashAuthError("Setting publishedAt requires content:publish_any permission", "INSUFFICIENT_PERMISSIONS");
		}
		const resolvedId = extractContentId(existing.data) ?? args.id;
		const locked = await refuseLockedEntry(extra, args.collection, resolvedId, args.overrideLock);
		if (locked) return locked;
		return unwrapAndInvalidate(extra, await emdash.handleContentPublish(args.collection, resolvedId, {
			publishedAt: args.publishedAt,
			_rev: args._rev,
			actor: {
				id: userId,
				role: userRole,
				source: "mcp"
			},
			origin: { source: "mcp" }
		}), [args.collection, resolvedId]);
	});
	server.registerTool("content_unpublish", {
		title: "Unpublish Content",
		description: "Unpublish a content item, reverting it to draft status. It will no longer be visible on the live site, but its content and publication date are preserved. Any pending schedule is cancelled.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug"),
			_rev: z.string({ error: REV_MISSING_ERROR }).describe(REV_PARAM_DESCRIPTION),
			overrideLock: z.boolean().optional().describe(OVERRIDE_LOCK_PARAM_DESCRIPTION)
		})
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.AUTHOR);
		const { emdash: ec, userId, userRole } = getExtra(extra);
		const existing = await ec.handleContentGet(args.collection, args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, extractContentAuthorId(existing.data), "content:publish_own", "content:publish_any");
		const resolvedId = extractContentId(existing.data) ?? args.id;
		const locked = await refuseLockedEntry(extra, args.collection, resolvedId, args.overrideLock);
		if (locked) return locked;
		return unwrapAndInvalidate(extra, await ec.handleContentUnpublish(args.collection, resolvedId, {
			_rev: args._rev,
			actor: {
				id: userId,
				role: userRole,
				source: "mcp"
			},
			origin: { source: "mcp" }
		}), [args.collection, resolvedId]);
	});
	server.registerTool("content_schedule", {
		title: "Schedule Content",
		description: "Schedule a content item for future publication. It will be automatically published at the specified date/time. The scheduledAt value must be an ISO 8601 datetime string in the future (e.g. '2025-06-01T09:00:00Z').",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug"),
			_rev: z.string({ error: REV_MISSING_ERROR }).describe(REV_PARAM_DESCRIPTION),
			scheduledAt: contentDateTimeInputSchema.describe("ISO 8601 datetime for publication (e.g. '2025-06-01T09:00:00Z')"),
			overrideLock: z.boolean().optional().describe(OVERRIDE_LOCK_PARAM_DESCRIPTION)
		})
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.AUTHOR);
		const { emdash: ec, userId, userRole } = getExtra(extra);
		const existing = await ec.handleContentGet(args.collection, args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, extractContentAuthorId(existing.data), "content:publish_own", "content:publish_any");
		const resolvedId = extractContentId(existing.data) ?? args.id;
		const locked = await refuseLockedEntry(extra, args.collection, resolvedId, args.overrideLock);
		if (locked) return locked;
		return unwrapAndInvalidate(extra, await ec.handleContentSchedule(args.collection, resolvedId, args.scheduledAt, {
			_rev: args._rev,
			actor: {
				id: userId,
				role: userRole,
				source: "mcp"
			},
			origin: { source: "mcp" }
		}), [args.collection, resolvedId]);
	});
	server.registerTool("content_unschedule", {
		title: "Cancel Scheduled Publication",
		description: "Cancel a previously scheduled publication. Scheduled drafts return to draft status; published items stay published. The scheduledAt timestamp is cleared. Idempotent — calling on an item that isn't scheduled is a no-op.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug"),
			overrideLock: z.boolean().optional().describe(OVERRIDE_LOCK_PARAM_DESCRIPTION)
		})
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.AUTHOR);
		const { emdash: ec, userId, userRole } = getExtra(extra);
		const existing = await ec.handleContentGet(args.collection, args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, extractContentAuthorId(existing.data), "content:publish_own", "content:publish_any");
		const resolvedId = extractContentId(existing.data) ?? args.id;
		const locked = await refuseLockedEntry(extra, args.collection, resolvedId, args.overrideLock);
		if (locked) return locked;
		return unwrapAndInvalidate(extra, await ec.handleContentUnschedule(args.collection, resolvedId, { actor: {
			id: userId,
			role: userRole,
			source: "mcp"
		} }), [args.collection, resolvedId]);
	});
	server.registerTool("content_compare", {
		title: "Compare Live vs Draft",
		description: "Compare the published (live) version of a content item with its current draft. Returns both versions and a flag indicating whether there are changes. Useful for reviewing unpublished edits before publishing.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		requireDraftAccess(extra);
		return unwrap(await getEmDash(extra).handleContentCompare(args.collection, args.id));
	});
	server.registerTool("content_discard_draft", {
		title: "Discard Draft",
		description: "Discard the current draft revision. Published content reverts to its live version; an item without a pending draft is unchanged.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug"),
			_rev: z.string({ error: REV_MISSING_ERROR }).describe(REV_PARAM_DESCRIPTION),
			overrideLock: z.boolean().optional().describe(OVERRIDE_LOCK_PARAM_DESCRIPTION)
		}),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.AUTHOR);
		const { emdash: ec, userId, userRole } = getExtra(extra);
		const existing = await ec.handleContentGet(args.collection, args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, extractContentAuthorId(existing.data), "content:edit_own", "content:edit_any");
		const resolvedId = extractContentId(existing.data) ?? args.id;
		const locked = await refuseLockedEntry(extra, args.collection, resolvedId, args.overrideLock);
		if (locked) return locked;
		return unwrapAndInvalidate(extra, await ec.handleContentDiscardDraft(args.collection, resolvedId, {
			_rev: args._rev,
			actor: {
				id: userId,
				role: userRole,
				source: "mcp"
			}
		}), [args.collection, resolvedId]);
	});
	server.registerTool("content_list_trashed", {
		title: "List Trashed Content",
		description: "List soft-deleted content items in a collection's trash. These items can be restored with content_restore or permanently deleted with content_permanent_delete.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			limit: z.number().int().min(1).max(100).optional().describe("Max items (default 50)"),
			cursor: z.string().min(1).max(2048).optional().describe("Pagination cursor")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		requireDraftAccess(extra);
		return unwrap(await getEmDash(extra).handleContentListTrashed(args.collection, {
			limit: args.limit,
			cursor: args.cursor
		}));
	});
	server.registerTool("content_duplicate", {
		title: "Duplicate Content",
		description: "Create a copy of an existing content item. The duplicate is created as a draft with '(Copy)' appended to the title and an auto-generated slug.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug to duplicate")
		})
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.CONTRIBUTOR);
		const { emdash, userId } = getExtra(extra);
		const existing = await emdash.handleContentGet(args.collection, args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, extractContentAuthorId(existing.data), "content:edit_own", "content:edit_any");
		const resolvedId = extractContentId(existing.data) ?? args.id;
		return unwrap(await emdash.handleContentDuplicate(args.collection, resolvedId, userId));
	});
	server.registerTool("content_translations", {
		title: "Get Content Translations",
		description: "Get all locale variants of a content item. Returns the translation group and a summary of each locale version (id, locale, slug, status). Only relevant when i18n is enabled on the site.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const result = await getEmDash(extra).handleContentTranslations(args.collection, args.id);
		if (result.success && !canReadDrafts(extra)) {
			const data = result.data && typeof result.data === "object" ? result.data : void 0;
			const filtered = (Array.isArray(data?.translations) ? data.translations : []).filter(isPublished);
			if (!filtered.some((t) => isEntry(t, args.id))) return unwrap({
				success: false,
				error: {
					code: "NOT_FOUND",
					message: `Content item not found: ${args.id}`
				}
			});
			return unwrap({
				success: true,
				data: {
					...data,
					translations: filtered
				}
			});
		}
		return unwrap(result);
	});
	server.registerTool("byline_list", {
		title: "List Bylines",
		description: "List bylines (author/contributor credits) with optional filtering and pagination. Bylines are standalone records referenced by content items; use the returned id with content_create/content_update or byline_get. Use the nextCursor value from the response to fetch the next page.",
		inputSchema: z.object({
			search: z.string().optional().describe("Filter by display name or slug substring"),
			isGuest: z.boolean().optional().describe("Filter by guest (true) or linked-user (false)"),
			userId: z.string().optional().describe("Filter to the byline linked to a CMS user ID"),
			locale: z.string().optional().describe("Filter by locale (omit for all)"),
			limit: z.number().int().min(1).max(100).optional().describe("Max items (default 50)"),
			cursor: z.string().min(1).max(2048).optional().describe("Pagination cursor")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { BylineRepository } = await import("./byline-BufjxQyd_DBlWNwIS.mjs").then((n) => n.n);
			return jsonResult(await new BylineRepository(ec.db).findMany({
				search: args.search,
				isGuest: args.isGuest,
				userId: args.userId,
				locale: args.locale,
				limit: args.limit,
				cursor: args.cursor
			}));
		} catch (error) {
			return respondHandlerError(error, "BYLINE_LIST_ERROR");
		}
	});
	server.registerTool("byline_get", {
		title: "Get Byline",
		description: "Get a single byline by its ID, including bio, avatar, website, linked user, and any custom fields.",
		inputSchema: z.object({ id: z.string().describe("Byline ID") }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { BylineRepository } = await import("./byline-BufjxQyd_DBlWNwIS.mjs").then((n) => n.n);
			const byline = await new BylineRepository(ec.db).findById(args.id);
			if (!byline) return respondError("NOT_FOUND", `Byline '${args.id}' not found`);
			return jsonResult(byline);
		} catch (error) {
			return respondHandlerError(error, "BYLINE_GET_ERROR");
		}
	});
	server.registerTool("byline_create", {
		title: "Create Byline",
		description: "Create a new byline (author/contributor credit). The slug must be unique and contain only lowercase letters, digits, and hyphens. Link the byline to a CMS user via userId, or leave it as a standalone guest credit. A translation created with translationOf keeps the source's userId unless you pass one; pass null to leave it unlinked. The returned id can then be passed to content_create/content_update bylines.",
		inputSchema: z.object({ ...bylineCreateBody.shape }),
		annotations: { destructiveHint: false }
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleBylineCreate } = await import("./bylines-C8ZT6iWw_Cj3Bcs7P.mjs").then((n) => n.t);
			const result = await handleBylineCreate(ec.db, args);
			if (result.success) {
				await invalidateBylines();
				const byline = result.data;
				after(() => ec.hooks.runBylineAfterSave(byline, true));
			}
			return unwrap(result);
		} catch (error) {
			return respondHandlerError(error, "BYLINE_CREATE_ERROR");
		}
	});
	server.registerTool("byline_update", {
		title: "Update Byline",
		description: "Update an existing byline. Any field can be omitted to leave it unchanged. Renaming the slug must not collide with another byline.",
		inputSchema: z.object({
			id: z.string().describe("Byline ID to update"),
			...bylineUpdateBody.shape
		})
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleBylineUpdate } = await import("./bylines-C8ZT6iWw_Cj3Bcs7P.mjs").then((n) => n.t);
			const { id, ...input } = args;
			const result = await handleBylineUpdate(ec.db, id, input);
			if (result.success) {
				await invalidateBylines();
				const byline = result.data;
				after(() => ec.hooks.runBylineAfterSave(byline, false));
			}
			return unwrap(result);
		} catch (error) {
			return respondHandlerError(error, "BYLINE_UPDATE_ERROR");
		}
	});
	server.registerTool("byline_delete", {
		title: "Delete Byline",
		description: "Permanently delete a byline. Any content crediting this byline loses the association, and it is cleared as a primary byline where set.",
		inputSchema: z.object({ id: z.string().describe("Byline ID to delete") }),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { BylineRepository } = await import("./byline-BufjxQyd_DBlWNwIS.mjs").then((n) => n.n);
			const repo = new BylineRepository(ec.db);
			const existing = ec.hooks.hasHooks("byline:afterDelete") ? await repo.findById(args.id) : null;
			if (!await repo.delete(args.id)) return respondError("NOT_FOUND", `Byline '${args.id}' not found`);
			await invalidateBylines();
			if (existing) after(() => ec.hooks.runBylineAfterDelete(existing));
			return jsonResult({ deleted: args.id });
		} catch (error) {
			return respondHandlerError(error, "BYLINE_DELETE_ERROR");
		}
	});
	server.registerTool("byline_translations", {
		title: "List Byline Translations",
		description: "Return every locale variant of a byline, identified via its shared translation_group.",
		inputSchema: z.object({ id: z.string().describe("Byline id (or translation_group)") }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { handleBylineTranslations } = await import("./bylines-C8ZT6iWw_Cj3Bcs7P.mjs").then((n) => n.t);
			return unwrap(await handleBylineTranslations(ec.db, args.id));
		} catch (error) {
			return respondHandlerError(error, "BYLINE_TRANSLATIONS_ERROR");
		}
	});
	server.registerTool("schema_list_collections", {
		title: "List Collections",
		description: "List all content collections defined in the CMS. Each collection represents a content type (e.g. posts, pages, products) with its own schema and database table. Returns slug, label, supported features, and timestamps.",
		inputSchema: z.object({}),
		annotations: { readOnlyHint: true }
	}, async (_args, extra) => {
		requireScope(extra, "schema:read");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { SchemaRegistry } = await import("./schema-B7ODIkP4_GDXf9kH-.mjs").then((n) => n.t);
			return jsonResult({ items: await new SchemaRegistry(ec.db).listCollections() });
		} catch (error) {
			return respondHandlerError(error, "SCHEMA_LIST_ERROR");
		}
	});
	server.registerTool("schema_get_collection", {
		title: "Get Collection Schema",
		description: "Get detailed info about a collection including all field definitions. Fields describe the data model: name, type (string, text, number, boolean, datetime, portableText, image, reference, json, select, multiSelect, slug, blocks), constraints, and validation rules. Blocks fields include every allowed and retired block type version. Use this to understand what data content_create and content_update expect.",
		inputSchema: z.object({ slug: z.string().describe("Collection slug (e.g. 'posts'). Use schema_list_collections to see available slugs.") }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "schema:read");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { SchemaRegistry, expandCollectionBlockFields } = await import("./schema-B7ODIkP4_GDXf9kH-.mjs").then((n) => n.t);
			const collection = await new SchemaRegistry(ec.db).getCollectionWithFields(args.slug);
			if (!collection) return respondError("NOT_FOUND", `Collection '${args.slug}' not found`);
			return jsonResult(await expandCollectionBlockFields(ec.db, collection));
		} catch (error) {
			return respondHandlerError(error, "SCHEMA_GET_ERROR");
		}
	});
	server.registerTool("schema_list_block_types", {
		title: "List Block Types",
		description: "List every database-owned block type and all retained versions.",
		inputSchema: z.object({}),
		annotations: { readOnlyHint: true }
	}, async (_args, extra) => {
		requireScope(extra, "schema:read");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		const { handleBlockTypeList } = await import("./block-types-BeLZ85Sw_4SnZxVnv.mjs").then((n) => n.t);
		return unwrap(await handleBlockTypeList(ec.db));
	});
	server.registerTool("schema_get_block_type", {
		title: "Get Block Type",
		description: "Get one block type, including active, inactive, and historical versions.",
		inputSchema: z.object({ slug: z.string().describe("Block type slug") }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "schema:read");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		const { handleBlockTypeGet } = await import("./block-types-BeLZ85Sw_4SnZxVnv.mjs").then((n) => n.t);
		return unwrap(await handleBlockTypeGet(ec.db, args.slug));
	});
	server.registerTool("schema_create_block_type", {
		title: "Create Block Type",
		description: "Create a block type with active version 1.",
		inputSchema: z.object(createBlockTypeBody.shape)
	}, async (args, extra) => {
		requireScope(extra, "schema:write");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		const { handleBlockTypeCreate } = await import("./block-types-BeLZ85Sw_4SnZxVnv.mjs").then((n) => n.t);
		return unwrap(await handleBlockTypeCreate(ec.db, args));
	});
	server.registerTool("schema_update_block_type", {
		title: "Update Block Type",
		description: "Update presentation or compatible fields in place. Set breaking to create an inactive retained version.",
		inputSchema: z.object({
			slug: z.string(),
			...updateBlockTypeBody.shape
		})
	}, async (args, extra) => {
		requireScope(extra, "schema:write");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		const { slug, ...input } = args;
		const { handleBlockTypeUpdate } = await import("./block-types-BeLZ85Sw_4SnZxVnv.mjs").then((n) => n.t);
		return unwrap(await handleBlockTypeUpdate(ec.db, slug, input));
	});
	server.registerTool("schema_activate_block_type_version", {
		title: "Activate Block Type Version",
		description: "Make a retained version the active version used by newly created blocks.",
		inputSchema: z.object({
			slug: z.string(),
			version: z.number().int().positive(),
			expectedFingerprint: z.string().min(1)
		})
	}, async (args, extra) => {
		requireScope(extra, "schema:write");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		const { handleBlockTypeVersionActivate } = await import("./block-types-BeLZ85Sw_4SnZxVnv.mjs").then((n) => n.t);
		return unwrap(await handleBlockTypeVersionActivate(ec.db, args.slug, args.version, args.expectedFingerprint));
	});
	server.registerTool("schema_create_collection", {
		title: "Create Collection",
		description: "Create a new content collection (content type). This creates a database table and schema definition. The slug must be lowercase alphanumeric with underscores, starting with a letter. Supports: 'drafts' (draft/publish workflow), 'revisions' (version history), 'preview' (live preview), 'no-scheduling' (disables timed publishing, which is otherwise allowed), 'search' (full-text indexing), and 'seo' (SEO metadata).",
		inputSchema: z.object({
			slug: z.string().regex(COLLECTION_SLUG_PATTERN).describe("Unique identifier (lowercase letters, numbers, underscores)"),
			label: z.string().describe("Display name (plural, e.g. 'Blog Posts')"),
			labelSingular: z.string().optional().describe("Singular display name (e.g. 'Blog Post')"),
			description: z.string().optional().describe("Description of this collection"),
			icon: createCollectionBody.shape.icon.describe("Icon name for the admin UI"),
			supports: createCollectionBody.shape.supports.describe("Collection capabilities and opt-outs (default: ['drafts', 'revisions']); scheduling is allowed unless 'no-scheduling' is present"),
			routable: createCollectionBody.shape.routable.describe("Require a slug before publishing (default: true)"),
			editLocking: createCollectionBody.shape.editLocking.describe("Take an edit lock when an entry is opened (default: true)"),
			group: createCollectionBody.shape.group.describe("Admin sidebar folder shared with other collections of the same group")
		})
	}, async (args, extra) => {
		requireScope(extra, "schema:write");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		try {
			const { SchemaRegistry } = await import("./schema-B7ODIkP4_GDXf9kH-.mjs").then((n) => n.t);
			const collection = await new SchemaRegistry(ec.db).createCollection({
				slug: args.slug,
				label: args.label,
				labelSingular: args.labelSingular,
				description: args.description,
				icon: args.icon,
				supports: args.supports,
				routable: args.routable,
				editLocking: args.editLocking,
				group: args.group
			});
			ec.invalidateUrlPatternCache();
			return jsonResult(collection);
		} catch (error) {
			return respondHandlerError(error, "SCHEMA_CREATE_ERROR");
		}
	});
	server.registerTool("schema_delete_collection", {
		title: "Delete Collection",
		description: "Delete a collection and its database table. This is irreversible and deletes all content in the collection. Use with extreme caution.",
		inputSchema: z.object({
			slug: z.string().describe("Collection slug to delete"),
			force: z.boolean().optional().describe("Force deletion even if the collection has content (default false)")
		}),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "schema:write");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		try {
			const { SchemaRegistry } = await import("./schema-B7ODIkP4_GDXf9kH-.mjs").then((n) => n.t);
			await new SchemaRegistry(ec.db).deleteCollection(args.slug, { force: args.force });
			ec.invalidateUrlPatternCache();
			return jsonResult({ deleted: args.slug });
		} catch (error) {
			return respondHandlerError(error, "SCHEMA_DELETE_ERROR");
		}
	});
	server.registerTool("schema_update_collection", {
		title: "Update Collection",
		description: "Update an existing collection without deleting its table, fields, or content. Only provided settings change; omitted settings keep their current values. The collection slug cannot be changed.",
		inputSchema: schemaUpdateCollectionToolSchema,
		annotations: { destructiveHint: false }
	}, async (args, extra) => {
		requireScope(extra, "schema:write");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		const { slug, ...input } = args;
		try {
			const { handleSchemaCollectionUpdate } = await import("./schema-D04_n_7j_DcnIm1F8.mjs").then((n) => n._);
			const result = await handleSchemaCollectionUpdate(ec.db, slug, input);
			if (result.success) ec.invalidateUrlPatternCache();
			return unwrap(result);
		} catch (error) {
			return respondHandlerError(error, "SCHEMA_UPDATE_ERROR");
		}
	});
	server.registerTool("schema_create_field", {
		title: "Add Field to Collection",
		description: "Add a new field to a collection's schema. This adds a column to the database table. Field types: string (short text), text (long text), number (decimal), integer, boolean, datetime, select (single choice), multiSelect (multiple), portableText (rich text), image, file, reference (link to another collection), json, slug (URL-safe id), or blocks. For select/multiSelect, provide choices in validation.options array.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug to add the field to"),
			slug: z.string().regex(COLLECTION_SLUG_PATTERN).describe("Field identifier (lowercase letters, numbers, underscores)"),
			label: z.string().describe("Display name for the field"),
			type: z.enum([
				"string",
				"text",
				"number",
				"integer",
				"boolean",
				"datetime",
				"select",
				"multiSelect",
				"portableText",
				"image",
				"file",
				"reference",
				"json",
				"slug",
				"blocks"
			]).describe("Data type for this field"),
			required: z.boolean().optional().describe("Whether the field is required (default false)"),
			unique: z.boolean().optional().describe("Whether values must be unique (default false)"),
			defaultValue: z.unknown().optional().describe("Default value for new items"),
			validation: z.object({
				min: z.number().optional(),
				max: z.number().optional(),
				minLength: z.number().optional(),
				maxLength: z.number().optional(),
				pattern: z.string().optional(),
				options: z.array(z.string()).optional().describe("Allowed values for select/multiSelect"),
				allowedTypes: z.array(z.string()).optional().describe("Ordered block type slugs allowed by a blocks field"),
				minItems: z.number().int().min(0).optional(),
				maxItems: z.number().int().min(1).optional()
			}).optional().describe("Validation constraints"),
			options: z.object({
				collection: z.string().optional().describe("Target collection slug for reference fields"),
				rows: z.number().optional().describe("Number of rows for textarea")
			}).loose().optional().describe("Widget configuration"),
			searchable: z.boolean().optional().describe("Include in full-text search index (default false)"),
			indexed: z.boolean().optional().describe("Create a physical index for structured sorting"),
			translatable: z.boolean().optional().describe("Whether this field is translatable (default true). Non-translatable fields are synced across all locales in a translation group.")
		})
	}, async (args, extra) => {
		requireScope(extra, "schema:write");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		try {
			const { SchemaRegistry } = await import("./schema-B7ODIkP4_GDXf9kH-.mjs").then((n) => n.t);
			return jsonResult(await new SchemaRegistry(ec.db).createField(args.collection, {
				slug: args.slug,
				label: args.label,
				type: args.type,
				required: args.required,
				unique: args.unique,
				defaultValue: args.defaultValue,
				validation: args.validation,
				options: args.options,
				searchable: args.searchable,
				indexed: args.indexed,
				translatable: args.translatable
			}));
		} catch (error) {
			return respondHandlerError(error, "FIELD_CREATE_ERROR");
		}
	});
	server.registerTool("schema_delete_field", {
		title: "Remove Field from Collection",
		description: "Remove a field from a collection. This drops the column from the database table and deletes all data in that field. Irreversible.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			fieldSlug: z.string().describe("Field slug to remove")
		}),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "schema:write");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		try {
			const { SchemaRegistry } = await import("./schema-B7ODIkP4_GDXf9kH-.mjs").then((n) => n.t);
			await new SchemaRegistry(ec.db).deleteField(args.collection, args.fieldSlug);
			return jsonResult({
				deleted: args.fieldSlug,
				collection: args.collection
			});
		} catch (error) {
			return respondHandlerError(error, "FIELD_DELETE_ERROR");
		}
	});
	server.registerTool("schema_update_field", {
		title: "Update Field",
		description: "Update an existing field without deleting its column or stored values. Only provided settings change; omitted settings keep their current values. Changes that require a content or column migration are rejected with migration guidance.",
		inputSchema: schemaUpdateFieldToolSchema,
		annotations: { destructiveHint: false }
	}, async (args, extra) => {
		requireScope(extra, "schema:write");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		const { collection, fieldSlug, ...input } = args;
		try {
			const { handleSchemaFieldUpdate } = await import("./schema-D04_n_7j_DcnIm1F8.mjs").then((n) => n._);
			return unwrap(await handleSchemaFieldUpdate(ec.db, collection, fieldSlug, input));
		} catch (error) {
			return respondHandlerError(error, "SCHEMA_FIELD_UPDATE_ERROR");
		}
	});
	server.registerTool("media_list", {
		title: "List Media",
		description: "List uploaded media files (images, documents, etc.) with optional MIME type filtering and pagination. Returns file metadata including filename, URL, dimensions, and alt text.",
		inputSchema: z.object({
			mimeType: z.string().optional().describe("Filter by MIME type prefix (e.g. 'image/', 'application/pdf')"),
			limit: z.number().int().min(1).max(100).optional().describe("Max items (default 50)"),
			cursor: z.string().min(1).max(2048).optional().describe("Pagination cursor")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "media:read");
		return unwrap(await getEmDash(extra).handleMediaList({
			mimeType: args.mimeType,
			limit: args.limit,
			cursor: args.cursor
		}));
	});
	server.registerTool("media_create", {
		title: "Confirm Signed Media Upload",
		description: "Confirm a file after uploading it with a signed URL obtained from POST /_emdash/api/media/upload-url. `storageKey` must be the key returned for the same user. Confirmation checks that the stored file exists and matches the size fixed when the URL was issued, then makes it available through media_list / media_get. To upload through MCP, use media_upload instead.",
		inputSchema: z.object({ storageKey: z.string().describe("Storage key returned by the signed upload URL request") })
	}, async (args, extra) => {
		requireScope(extra, "media:write");
		requireRole(extra, Role.AUTHOR);
		const { emdash, userId } = getExtra(extra);
		return unwrap(await emdash.handleMediaRegisterUpload({
			storageKey: args.storageKey,
			authorId: userId
		}));
	});
	server.registerTool("media_upload", {
		title: "Upload Media",
		description: "Upload a media file from base64-encoded data and register it in the media library. Returns the media item with id, storageKey, and url — ready to reference from content fields (e.g. featured_image) via content_create / content_update. Uploads are deduplicated by content hash: re-uploading identical bytes returns the existing item with deduplicated: true. Subject to the global upload MIME allowlist and the configured maximum upload size.",
		inputSchema: z.object({
			filename: z.string().min(1).describe("Filename including extension (e.g. 'cover.png')"),
			base64: z.string().describe("Base64-encoded file contents."),
			contentType: z.string().regex(CONTENT_TYPE_RE, "Invalid content type").describe("MIME type (e.g. 'image/png')."),
			alt: z.string().optional().describe("Alt text for accessibility"),
			caption: z.string().optional().describe("Caption stored on the media record, such as the credit")
		}),
		annotations: { destructiveHint: false }
	}, async (args, extra) => {
		requireScope(extra, "media:write");
		requireRole(extra, Role.CONTRIBUTOR);
		const { emdash, userId } = getExtra(extra);
		if (!emdash.storage) return respondError("NO_STORAGE", "Storage not configured");
		try {
			return unwrap(await emdash.handleMediaUpload({
				filename: args.filename,
				base64: args.base64,
				contentType: args.contentType,
				alt: args.alt,
				caption: args.caption,
				authorId: userId,
				maxUploadSize: emdash.config.maxUploadSize
			}));
		} catch (error) {
			return respondHandlerError(error, "UPLOAD_ERROR");
		}
	});
	server.registerTool("media_get", {
		title: "Get Media Item",
		description: "Get details of a single media file by its ID. Returns metadata including filename, MIME type, size, dimensions, alt text, and URL.",
		inputSchema: z.object({ id: z.string().describe("Media item ID") }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "media:read");
		return unwrap(await getEmDash(extra).handleMediaGet(args.id));
	});
	server.registerTool("media_update", {
		title: "Update Media Metadata",
		description: "Update the metadata of an uploaded media file. You can change the alt text, caption, and dimensions. The file itself cannot be changed.",
		inputSchema: z.object({
			id: z.string().describe("Media item ID"),
			alt: z.string().optional().describe("Alt text for accessibility"),
			caption: z.string().optional().describe("Caption text"),
			width: z.number().int().optional().describe("Image width in pixels"),
			height: z.number().int().optional().describe("Image height in pixels")
		})
	}, async (args, extra) => {
		requireScope(extra, "media:write");
		requireRole(extra, Role.AUTHOR);
		const ec = getEmDash(extra);
		const existing = await ec.handleMediaGet(args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, existing.data.item.authorId ?? "", "media:edit_own", "media:edit_any");
		return unwrap(await ec.handleMediaUpdate(args.id, {
			alt: args.alt,
			caption: args.caption,
			width: args.width,
			height: args.height
		}));
	});
	server.registerTool("media_delete", {
		title: "Delete Media",
		description: "Permanently delete an uploaded media file. Removes the database record and the file from storage. Content referencing this media will have broken references. Cannot be undone.",
		inputSchema: z.object({ id: z.string().describe("Media item ID") }),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "media:write");
		requireRole(extra, Role.AUTHOR);
		const ec = getEmDash(extra);
		const existing = await ec.handleMediaGet(args.id);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, existing.data.item.authorId ?? "", "media:delete_own", "media:delete_any");
		const result = await ec.handleMediaDelete(args.id);
		if (result.success && result.data?.storageDeleted && isRouteCachedMedia(result.data.storageKey, result.data.mimeType)) await invalidateRouteCache(getExtra(extra).cache, [mediaCacheTag(result.data.storageKey)]);
		return unwrap(result);
	});
	server.registerTool("media_usage_repair", {
		title: "Repair Media Usage Index",
		description: "Repair content media usage indexes for one collection or every collection. Returns complete, partial, failed, or stale status; inspect the structured result.",
		inputSchema: mediaUsageRepairToolSchema
	}, async (args, extra) => {
		requireScope(extra, "admin");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		let input;
		if (args.scope === "collection") {
			if (args.collection === void 0) return respondError("VALIDATION_ERROR", "Collection is required when scope is collection");
			input = {
				scope: "collection",
				collection: args.collection
			};
		} else input = { scope: "all" };
		try {
			const { handleMediaUsageRepair } = await import("./media-usage-D6LjfdGn_CgcIamND.mjs").then((n) => n.o);
			return unwrap(await handleMediaUsageRepair(ec.db, input));
		} catch (error) {
			return respondHandlerError(error, "MEDIA_USAGE_REPAIR_ERROR");
		}
	});
	server.registerTool("search", {
		title: "Search Content",
		description: "Full-text search across content collections. Searches indexed fields for matching content. Collections must have 'search' in their supports list and fields must be marked as searchable. Returns collection, item ID, title, excerpt, and relevance score.",
		inputSchema: z.object({
			query: z.string().describe("Search query text"),
			collections: z.array(z.string()).optional().describe("Limit search to specific collection slugs (all if omitted)"),
			locale: z.string().optional().describe("Filter results by locale (omit to search all locales)"),
			limit: z.number().int().min(1).max(50).optional().describe("Max results (default 20)"),
			cursor: z.string().min(1).max(2048).optional().describe("Pagination cursor from a previous response")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { searchWithDb } = await import("./search-BxBg7Xq1_6mWiZaNm.mjs").then((n) => n.t);
			return jsonResult(await searchWithDb(ec.db, args.query, {
				collections: args.collections,
				locale: args.locale,
				limit: args.limit,
				cursor: args.cursor
			}));
		} catch (error) {
			return respondHandlerError(error, "SEARCH_ERROR");
		}
	});
	server.registerTool("taxonomy_list", {
		title: "List Taxonomies",
		description: "List all taxonomy definitions (e.g. categories, tags). Taxonomies are classification systems applied to content. Each has a name, label, and can be hierarchical (categories) or flat (tags). Optionally filter by locale.",
		inputSchema: z.object({ locale: z.string().optional().describe("Filter by locale (omit for all)") }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { handleTaxonomyList } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			return unwrap(await handleTaxonomyList(ec.db, { locale: args.locale }));
		} catch (error) {
			return respondHandlerError(error, "TAXONOMY_LIST_ERROR");
		}
	});
	server.registerTool("taxonomy_get", {
		title: "Get Taxonomy Definition",
		description: "Get a single taxonomy definition by name. Taxonomy definitions describe a classification system (e.g. categories or tags), which collections it applies to, and whether it is hierarchical. Pass `locale` to resolve a specific translation; otherwise the lowest matching locale is returned.",
		inputSchema: z.object({
			name: z.string().describe("Taxonomy name (e.g. 'categories', 'tags')"),
			locale: z.string().optional().describe("Locale to resolve the definition for")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { handleTaxonomyGet } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			return unwrap(await handleTaxonomyGet(ec.db, args.name, { locale: args.locale }));
		} catch (error) {
			return respondHandlerError(error, "TAXONOMY_GET_ERROR");
		}
	});
	server.registerTool("taxonomy_create", {
		title: "Create Taxonomy Definition",
		description: "Create a taxonomy definition in one locale. `label` and `labelSingular` belong to that locale; `hierarchical` and `collections` belong to the taxonomy and are the same in every locale. `collections` names which content types the taxonomy applies to. A definition for a name that already exists in another locale joins that taxonomy and takes its `hierarchical` and `collections`; passing different values is an error (change them with taxonomy_update).",
		inputSchema: z.object({
			name: createTaxonomyDefBody.shape.name.describe("Taxonomy name (lowercase letters, numbers, underscores)"),
			label: createTaxonomyDefBody.shape.label.describe("Display name"),
			labelSingular: createTaxonomyDefBody.shape.labelSingular.describe("Singular form of the display name"),
			hierarchical: createTaxonomyDefBody.shape.hierarchical.describe("Whether the taxonomy supports parent/child terms, in every locale (defaults to false; must match when the taxonomy exists in another locale)"),
			collections: createTaxonomyDefBody.shape.collections.describe("Collection slugs this taxonomy applies to, in every locale (defaults to []; must match when the taxonomy exists in another locale)"),
			locale: z.string().optional().describe("Locale for this definition (e.g. 'fr-fr')"),
			translationOf: z.string().optional().describe("Existing taxonomy definition id to create this locale variant from")
		})
	}, async (args, extra) => {
		requireScope(extra, "taxonomies:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleTaxonomyCreate } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			return unwrapAndInvalidate(extra, await handleTaxonomyCreate(ec.db, {
				name: args.name,
				label: args.label,
				labelSingular: args.labelSingular,
				hierarchical: args.hierarchical,
				collections: args.collections,
				locale: args.locale,
				translationOf: args.translationOf
			}), [taxonomyTag(args.name)]);
		} catch (error) {
			return respondHandlerError(error, "TAXONOMY_CREATE_ERROR");
		}
	});
	server.registerTool("taxonomy_update", {
		title: "Update Taxonomy Definition",
		description: "Update an existing taxonomy definition. The taxonomy `name` cannot be changed. Pass `locale` to update a specific translation's `label` and `labelSingular`; otherwise the lowest matching locale is updated. `hierarchical` and `collections` change for every locale. Any field may be omitted to leave it unchanged.",
		inputSchema: z.object({
			name: z.string().describe("Taxonomy name to update"),
			label: updateTaxonomyDefBody.shape.label.describe("New display name"),
			labelSingular: updateTaxonomyDefBody.shape.labelSingular.describe("New singular display name; pass null to clear"),
			hierarchical: updateTaxonomyDefBody.shape.hierarchical.describe("Whether the taxonomy supports parent/child terms, in every locale"),
			collections: updateTaxonomyDefBody.shape.collections.describe("Collection slugs this taxonomy applies to, in every locale"),
			locale: z.string().optional().describe("Locale of the definition to update")
		})
	}, async (args, extra) => {
		requireScope(extra, "taxonomies:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleTaxonomyUpdate } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			return unwrapAndInvalidate(extra, await handleTaxonomyUpdate(ec.db, args.name, {
				label: args.label,
				labelSingular: args.labelSingular,
				hierarchical: args.hierarchical,
				collections: args.collections,
				locale: args.locale
			}), [taxonomyTag(args.name)]);
		} catch (error) {
			return respondHandlerError(error, "TAXONOMY_UPDATE_ERROR");
		}
	});
	server.registerTool("taxonomy_delete", {
		title: "Delete Taxonomy Definition",
		description: "Delete a taxonomy definition and all of its terms in every locale, along with any content assignments those terms hold. This cannot be undone.",
		inputSchema: z.object({ name: z.string().describe("Taxonomy name to delete") }),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "taxonomies:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleTaxonomyDelete } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			return unwrapAndInvalidate(extra, await handleTaxonomyDelete(ec.db, args.name), [taxonomyTag(args.name)]);
		} catch (error) {
			return respondHandlerError(error, "TAXONOMY_DELETE_ERROR");
		}
	});
	server.registerTool("taxonomy_list_terms", {
		title: "List Taxonomy Terms",
		description: "List terms in a taxonomy with pagination. Terms are individual entries (e.g. specific categories or tags). Hierarchical taxonomies can have parent-child relationships.",
		inputSchema: z.object({
			taxonomy: z.string().describe("Taxonomy name (e.g. 'categories', 'tags')"),
			limit: z.number().int().min(1).max(100).optional().describe("Max items (default 50)"),
			cursor: z.string().min(1).max(MAX_TAXONOMY_CURSOR_LENGTH).optional().describe("Pagination cursor"),
			locale: z.string().optional().describe("Filter by locale (omit for all)")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { handleTaxonomyList } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			const listResult = await handleTaxonomyList(ec.db, { locale: args.locale });
			if (!listResult.success) return unwrap(listResult);
			if (!listResult.data.taxonomies.find((t) => t.name === args.taxonomy)) return respondError("NOT_FOUND", `Taxonomy '${args.taxonomy}' not found`);
			const { TaxonomyRepository } = await import("./taxonomy-D4Fl2smf_C4qI23tr.mjs").then((n) => n.n);
			const repo = new TaxonomyRepository(ec.db);
			const limit = Math.max(1, Math.min(args.limit ?? 50, 100));
			let cursor;
			if (args.cursor) try {
				cursor = decodeTaxonomyCursor(args.cursor);
			} catch (error) {
				if (error instanceof InvalidCursorError) return respondError("INVALID_CURSOR", error.message);
				throw error;
			}
			let pageCursor;
			if (cursor) {
				const cursorTerm = await repo.findById(cursor.id);
				if (!cursorTerm || cursorTerm.name !== args.taxonomy || args.locale !== void 0 && resolveConfiguredLocale(cursorTerm.locale) !== resolveConfiguredLocale(args.locale)) return respondError("INVALID_CURSOR", "Pagination cursor no longer identifies a term");
				pageCursor = {
					sortOrder: cursorTerm.sortOrder,
					label: cursorTerm.label,
					id: cursorTerm.id
				};
			}
			const page = await repo.findPageByName(args.taxonomy, {
				locale: args.locale,
				limit,
				...pageCursor ? { cursor: pageCursor } : {}
			});
			const last = page.items.at(-1);
			const nextCursor = page.hasMore && last ? encodeTaxonomyCursor(last) : void 0;
			return jsonResult({
				items: page.items.map((t) => ({
					id: t.id,
					name: t.name,
					slug: t.slug,
					label: t.label,
					parentId: t.parentId,
					description: typeof t.data?.description === "string" ? t.data.description : void 0,
					locale: t.locale,
					translationGroup: t.translationGroup
				})),
				nextCursor
			});
		} catch (error) {
			return respondHandlerError(error, "TAXONOMY_LIST_TERMS_ERROR");
		}
	});
	server.registerTool("taxonomy_create_term", {
		title: "Create Taxonomy Term",
		description: "Create a new term in a taxonomy. For hierarchical taxonomies like categories, you can specify a parentId to create a child term. The parent must exist and belong to the same taxonomy. The parent's ancestor chain must not exceed 100 levels — attempts to attach a new term beneath a chain of 100+ existing ancestors are rejected.",
		inputSchema: z.object({
			taxonomy: z.string().describe("Taxonomy name (e.g. 'categories', 'tags')"),
			slug: z.string().min(1).optional().describe("URL identifier for the term; omit to derive it from the label"),
			label: z.string().describe("Display name"),
			parentId: z.string().optional().describe("Parent term ID for hierarchical taxonomies"),
			description: z.string().optional().describe("Description of the term"),
			locale: z.string().optional().describe("Locale for the new term (e.g. 'es')"),
			translationOf: z.string().optional().describe("Term id to join as a translation (same translation_group). The new term takes that term's parent and position; a different parentId moves the term in every locale")
		})
	}, async (args, extra) => {
		requireScope(extra, "taxonomies:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleTermCreate } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			return unwrapAndInvalidate(extra, await handleTermCreate(ec.db, args.taxonomy, {
				slug: args.slug,
				label: args.label,
				parentId: args.parentId,
				description: args.description,
				locale: args.locale,
				translationOf: args.translationOf
			}), [taxonomyTag(args.taxonomy)]);
		} catch (error) {
			return respondHandlerError(error, "TAXONOMY_TERM_CREATE_ERROR");
		}
	});
	server.registerTool("taxonomy_update_term", {
		title: "Update Taxonomy Term",
		description: "Update an existing term in a taxonomy. Any field can be omitted to leave it unchanged. Renaming a term's slug must not collide with another term in the same taxonomy. Set parentId to null to detach from a parent. The new parent must exist, belong to the same taxonomy, and not introduce a cycle (a term cannot be its own ancestor). The new parent's ancestor chain must not exceed 100 levels — reparenting under a chain of 100+ ancestors is rejected. Translations of a term can share a slug: pass `locale` to update a specific translation; otherwise the lowest matching locale is updated.",
		inputSchema: z.object({
			taxonomy: z.string().describe("Taxonomy name (e.g. 'categories', 'tags')"),
			termSlug: z.string().describe("Current slug of the term to update"),
			slug: z.string().optional().describe("New slug (must be unique in the taxonomy)"),
			label: z.string().optional().describe("New display name"),
			parentId: z.string().nullable().optional().describe("New parent term ID; null to detach"),
			description: z.string().optional().describe("New description"),
			locale: z.string().optional().describe("Locale of the term to update (e.g. 'fr')")
		})
	}, async (args, extra) => {
		requireScope(extra, "taxonomies:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleTermUpdate } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			return unwrapAndInvalidate(extra, await handleTermUpdate(ec.db, args.taxonomy, args.termSlug, {
				slug: args.slug,
				label: args.label,
				parentId: args.parentId,
				description: args.description
			}, { locale: args.locale }), [taxonomyTag(args.taxonomy)]);
		} catch (error) {
			return respondHandlerError(error, "TAXONOMY_TERM_UPDATE_ERROR");
		}
	});
	server.registerTool("taxonomy_delete_term", {
		title: "Delete Taxonomy Term",
		description: "Permanently delete a term from a taxonomy. Any content tagged with this term loses the association. Cannot delete a term that has children — delete children first. Translations of a term can share a slug: pass `locale` to delete a specific translation; otherwise the lowest matching locale is deleted.",
		inputSchema: z.object({
			taxonomy: z.string().describe("Taxonomy name"),
			termSlug: z.string().describe("Slug of the term to delete"),
			locale: z.string().optional().describe("Locale of the term to delete (e.g. 'fr')")
		}),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "taxonomies:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleTermDelete } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			return unwrapAndInvalidate(extra, await handleTermDelete(ec.db, args.taxonomy, args.termSlug, { locale: args.locale }), [taxonomyTag(args.taxonomy)]);
		} catch (error) {
			return respondHandlerError(error, "TAXONOMY_TERM_DELETE_ERROR");
		}
	});
	server.registerTool("taxonomy_term_translations", {
		title: "List Term Translations",
		description: "Return every locale variant of a taxonomy term, identified via its shared translation_group.",
		inputSchema: z.object({ id: z.string().describe("Term id (or translation_group)") }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { handleTermTranslations } = await import("./taxonomies-D5bavOHA_D8M6rNVI.mjs").then((n) => n.m);
			return unwrap(await handleTermTranslations(ec.db, args.id));
		} catch (error) {
			return respondHandlerError(error, "TERM_TRANSLATIONS_ERROR");
		}
	});
	server.registerTool("menu_list", {
		title: "List Menus",
		description: "List navigation menus. Menus are per-locale: filter by `locale` to get just one locale's worth, or omit to list every row (one per locale per menu name).",
		inputSchema: z.object({ locale: z.string().optional().describe("Filter by locale (omit for all)") }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { handleMenuList } = await import("./menus-DoVbs2sn_C510poqW.mjs").then((n) => n.d);
			return unwrap(await handleMenuList(ec.db, { locale: args.locale }));
		} catch (error) {
			return respondHandlerError(error, "MENU_LIST_ERROR");
		}
	});
	server.registerTool("menu_get", {
		title: "Get Menu with Items",
		description: "Get a menu by name, including its items. When multiple locales exist, pass `locale` to pick the right one.",
		inputSchema: z.object({
			name: z.string().describe("Menu name (e.g. 'main', 'footer')"),
			locale: z.string().optional().describe("Locale to resolve the menu for")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { handleMenuGet } = await import("./menus-DoVbs2sn_C510poqW.mjs").then((n) => n.d);
			return unwrap(await handleMenuGet(ec.db, args.name, { locale: args.locale }));
		} catch (error) {
			return respondHandlerError(error, "MENU_GET_ERROR");
		}
	});
	server.registerTool("menu_translations", {
		title: "List Menu Translations",
		description: "Return every locale variant of a menu, identified via the shared translation_group.",
		inputSchema: z.object({ id: z.string().describe("Menu id (or translation_group)") }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		const ec = getEmDash(extra);
		try {
			const { handleMenuTranslations } = await import("./menus-DoVbs2sn_C510poqW.mjs").then((n) => n.d);
			return unwrap(await handleMenuTranslations(ec.db, args.id));
		} catch (error) {
			return respondHandlerError(error, "MENU_TRANSLATIONS_ERROR");
		}
	});
	server.registerTool("menu_create", {
		title: "Create Menu",
		description: "Create a new navigation menu. The `name` is the stable identifier used by site templates (e.g. 'main', 'footer'); `label` is the human-readable name shown in the admin. Menus are per-locale, so pass `locale` when the same menu name exists in multiple translations. Add items afterwards with menu_set_items. If `translationOf` is set, `locale` must also be set.",
		inputSchema: z.object({
			name: z.string().regex(COLLECTION_SLUG_PATTERN).describe("Stable identifier (lowercase letters, numbers, underscores)"),
			label: z.string().describe("Display name for the admin"),
			locale: z.string().optional().describe("Locale for this menu (e.g. 'fr-fr')"),
			translationOf: z.string().optional().describe("Existing menu id to create this locale variant from")
		})
	}, async (args, extra) => {
		requireScope(extra, "menus:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleMenuCreate } = await import("./menus-DoVbs2sn_C510poqW.mjs").then((n) => n.d);
			return unwrapAndInvalidate(extra, await handleMenuCreate(ec.db, {
				name: args.name,
				label: args.label,
				locale: args.locale,
				translationOf: args.translationOf
			}), [menuTag(args.name)]);
		} catch (error) {
			return respondHandlerError(error, "MENU_CREATE_ERROR");
		}
	});
	server.registerTool("menu_update", {
		title: "Update Menu",
		description: "Update a menu's label. The `name` (stable identifier) cannot be changed. On multi-locale installs, pass `locale` so the correct translation is updated.",
		inputSchema: z.object({
			name: z.string().describe("Menu name to update"),
			label: z.string().describe("New display label"),
			locale: z.string().optional().describe("Locale of the menu to update")
		})
	}, async (args, extra) => {
		requireScope(extra, "menus:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleMenuUpdate } = await import("./menus-DoVbs2sn_C510poqW.mjs").then((n) => n.d);
			return unwrapAndInvalidate(extra, await handleMenuUpdate(ec.db, args.name, {
				label: args.label,
				locale: args.locale
			}), [menuTag(args.name)]);
		} catch (error) {
			return respondHandlerError(error, "MENU_UPDATE_ERROR");
		}
	});
	server.registerTool("menu_delete", {
		title: "Delete Menu",
		description: "Delete a menu. Items are also removed. Cannot be undone. On multi-locale installs, pass `locale` so only the intended translation is removed.",
		inputSchema: z.object({
			name: z.string().describe("Menu name to delete"),
			locale: z.string().optional().describe("Locale of the menu to delete")
		}),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireScope(extra, "menus:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleMenuDelete } = await import("./menus-DoVbs2sn_C510poqW.mjs").then((n) => n.d);
			return unwrapAndInvalidate(extra, await handleMenuDelete(ec.db, args.name, { locale: args.locale }), [menuTag(args.name)]);
		} catch (error) {
			return respondHandlerError(error, "MENU_DELETE_ERROR");
		}
	});
	server.registerTool("menu_set_items", {
		title: "Set Menu Items",
		description: "Replace the entire item list of a menu in one call. This is atomic: the existing items are deleted and the new list is inserted in the order provided. Use this rather than per-item add/remove tools so the resulting order and parent links are unambiguous. On multi-locale installs, pass `locale` so only the intended translation is rewritten.",
		inputSchema: z.object({
			name: z.string().describe("Menu name to update"),
			locale: z.string().optional().describe("Locale of the menu to rewrite"),
			items: z.array(z.object({
				label: z.string().describe("Item display text"),
				type: z.enum([
					"custom",
					"page",
					"post",
					"taxonomy",
					"collection"
				]).describe("Item kind"),
				customUrl: z.string().optional().describe("URL for type='custom' items (ignored otherwise)"),
				referenceCollection: z.string().optional().describe("Target collection slug for content references"),
				referenceId: z.string().optional().describe("Target content/term ID for references"),
				titleAttr: z.string().optional().describe("HTML title attribute"),
				target: z.string().optional().describe("HTML target attribute, e.g. '_blank'"),
				cssClasses: z.string().optional().describe("Space-separated CSS classes"),
				parentIndex: z.number().int().nonnegative().optional().describe("Array index of the parent item (must be earlier in the list). Omit for top-level items.")
			})).describe("Ordered list of menu items")
		})
	}, async (args, extra) => {
		requireScope(extra, "menus:manage");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleMenuSetItems } = await import("./menus-DoVbs2sn_C510poqW.mjs").then((n) => n.d);
			return unwrapAndInvalidate(extra, await handleMenuSetItems(ec.db, args.name, args.items, { locale: args.locale }), [menuTag(args.name)]);
		} catch (error) {
			return respondHandlerError(error, "MENU_SET_ITEMS_ERROR");
		}
	});
	server.registerTool("revision_list", {
		title: "List Revisions",
		description: "List revision history for a content item. Revisions are snapshots created on publish or update. Returns newest-first. Requires the collection to support 'revisions'.",
		inputSchema: z.object({
			collection: z.string().describe("Collection slug"),
			id: z.string().describe("Content item ID or slug"),
			limit: z.number().int().min(1).max(50).optional().describe("Max revisions (default 20)")
		}),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireScope(extra, "content:read");
		requireDraftAccess(extra);
		return unwrap(await getEmDash(extra).handleRevisionList(args.collection, args.id, { limit: args.limit }));
	});
	server.registerTool("revision_restore", {
		title: "Restore Revision",
		description: "Restore a content item to a previous revision. Replaces the current draft with the specified revision's data. Not automatically published — use content_publish afterward if needed.",
		inputSchema: z.object({
			revisionId: z.string().describe("Revision ID to restore"),
			overrideLock: z.boolean().optional().describe(OVERRIDE_LOCK_PARAM_DESCRIPTION)
		})
	}, async (args, extra) => {
		requireScope(extra, "content:write");
		requireRole(extra, Role.AUTHOR);
		const { emdash, userId, userRole } = getExtra(extra);
		const revision = await emdash.handleRevisionGet(args.revisionId);
		if (!revision.success) return unwrap(revision);
		const revItem = revision.data?.item;
		if (!revItem?.collection || !revItem?.entryId) return respondError("VALIDATION_ERROR", "Revision is missing collection or entry reference");
		const existing = await emdash.handleContentGet(revItem.collection, revItem.entryId);
		if (!existing.success) return unwrap(existing);
		requireOwnership(extra, extractContentAuthorId(existing.data), "content:edit_own", "content:edit_any");
		const locked = await refuseLockedEntry(extra, revItem.collection, revItem.entryId, args.overrideLock);
		if (locked) return locked;
		return unwrap(await emdash.handleRevisionRestore(args.revisionId, userId, userRole));
	});
	server.registerTool("settings_get", {
		title: "Get Site Settings",
		description: "Get all site-wide settings (title, tagline, logo, favicon, URL, date/time formatting, social links, SEO defaults, and staging status). Media references (logo, favicon, defaultOgImage) include resolved URLs. Unset values are omitted from the response.",
		inputSchema: z.object({}),
		annotations: { readOnlyHint: true }
	}, async (_args, extra) => {
		requireScope(extra, "settings:read");
		requireRole(extra, Role.EDITOR);
		const ec = getEmDash(extra);
		try {
			const { handleSettingsGet } = await import("./settings-DMHIgDyb_BoKO0DHK.mjs").then((n) => n.r);
			return unwrap(await handleSettingsGet(ec.db, ec.storage));
		} catch (error) {
			return respondHandlerError(error, "SETTINGS_READ_ERROR");
		}
	});
	server.registerTool("settings_update", {
		title: "Update Site Settings",
		description: "Update one or more site-wide settings. This is a partial update: only the fields provided are changed; omitted fields are left as-is, including fields inside `seo` and `social`. Send an empty string to clear a text field. Returns the full settings object after the update. To set a media reference (logo, favicon, seo.defaultOgImage), pass an object with `mediaId` (and optional `alt`) — the media item must already exist (use media_create first), or pass null to remove it.",
		inputSchema: z.object({
			title: z.string().optional().describe("Site title"),
			tagline: z.string().optional().describe("Site tagline / short description"),
			logo: settingsMediaReferenceSchema.nullable().optional().describe("Logo media reference ({ mediaId, alt? }); null removes it"),
			favicon: settingsMediaReferenceSchema.nullable().optional().describe("Favicon media reference ({ mediaId, alt? }); null removes it"),
			url: z.union([z.url().refine((u) => HTTP_SCHEME_PATTERN.test(u), "URL must use http or https"), z.literal("")]).optional().describe("Canonical site URL (http or https). Empty string clears it."),
			staging: z.boolean().optional().describe("true asks search engines not to index the site (noindex); false makes it live"),
			postsPerPage: z.number().int().min(1).max(100).optional().describe("Default page size for content listings"),
			dateFormat: z.string().optional().describe("Date format token string"),
			timezone: z.string().optional().describe("IANA timezone identifier"),
			social: settingsSocialSchema.optional().describe("Social handles / URLs"),
			seo: settingsSeoSchema.optional().describe("Site-wide SEO defaults")
		})
	}, async (args, extra) => {
		requireScope(extra, "settings:manage");
		requireRole(extra, Role.ADMIN);
		const ec = getEmDash(extra);
		try {
			const seo = args.seo;
			if (ec.config.robotsTxtOverridden && seo && (Boolean(seo.robotsTxt) || seo.disallowAiTraining === true)) {
				const { getSiteSettingWithDb } = await import("./settings-BApLX_aS_wxBON0NV.mjs").then((n) => n.f);
				const stored = await getSiteSettingWithDb("seo", ec.db);
				const changesRobotsTxt = Boolean(seo.robotsTxt) && seo.robotsTxt !== stored?.robotsTxt;
				const enablesAiRule = seo.disallowAiTraining === true && stored?.disallowAiTraining !== true;
				if (changesRobotsTxt || enablesAiRule) return respondError("ROBOTS_TXT_OVERRIDDEN", "This site serves its own src/pages/robots.txt, so seo.robotsTxt and seo.disallowAiTraining would have no effect. Edit that file instead.");
			}
			const { handleSettingsUpdate } = await import("./settings-DMHIgDyb_BoKO0DHK.mjs").then((n) => n.r);
			return unwrapAndInvalidate(extra, await handleSettingsUpdate(ec.db, ec.storage, args), [siteSettingsTag()]);
		} catch (error) {
			return respondHandlerError(error, "SETTINGS_UPDATE_ERROR");
		}
	});
	server.registerTool("site_transfer_capabilities", {
		title: "Get Site Transfer Capabilities",
		description: "Site package format versions, features, and limits this site supports, and whether it can receive an import (its portable content is empty) with the reasons it cannot. Requires any transfer scope (transfer:export, transfer:analyze, or transfer:execute).",
		inputSchema: z.object({}),
		annotations: { readOnlyHint: true }
	}, async (_args, extra) => {
		requireRole(extra, Role.ADMIN);
		requireTransferScope(extra, "transfer:*");
		return unwrap(await transferCapabilities(transferContext(extra)));
	});
	server.registerTool("site_export_start", {
		title: "Start Site Export",
		description: "Start exporting the whole site as a portable site package (schema, content, media, settings; never users, credentials, or secrets). Returns the operation id and status only; drive it with site_export_status. The package itself is downloaded outside MCP, from the admin or the CLI. Requires the transfer:export scope. " + APPROVAL_FLOW_DESCRIPTION,
		inputSchema: z.object({
			comments: z.boolean().optional().describe("Include comments and reactions (default true)"),
			approvalId: transferApprovalIdSchema.optional()
		})
	}, async (args, extra) => {
		requireRole(extra, Role.ADMIN);
		const scoped = transferScopeHeld(extra, "transfer:export");
		const { userId, tokenId } = getExtra(extra);
		return unwrap(await startExport(transferContext(extra), {
			userId,
			tokenId
		}, {
			...args,
			scoped
		}));
	});
	server.registerTool("site_export_status", {
		title: "Get Site Export Status",
		description: "Report an export's state, stage, and progress, and once it is complete its package digest and record and media totals. By default each call also runs one bounded export step, so call it repeatedly until nextRequestInMs is null; pass advance: false to only read. Requires the transfer:export scope, or the approval that started this export (same token).",
		inputSchema: z.object({
			operationId: transferOperationIdSchema,
			advance: z.boolean().optional().describe("Run one bounded export step before reporting (default true)")
		})
	}, async (args, extra) => {
		requireRole(extra, Role.ADMIN);
		await requireTransferAccess(extra, "transfer:export", "export", args.operationId);
		return unwrap(await exportStatus(transferContext(extra), {
			operationId: args.operationId,
			advance: args.advance ?? true
		}));
	});
	server.registerTool("site_import_analyze", {
		title: "Analyze Site Import",
		description: "Validate an uploaded site package against this site and produce an import plan. The package must already be uploaded over HTTP, from the admin or the CLI; MCP never carries package bytes. Each call runs one bounded analysis step: repeat until nextRequestInMs is null, then read plan (counts, principals with suggested user mappings, warnings, blockers, packageDigest, planDigest). Pass decisions to map principals or keep this site's title and tagline; that produces a new planDigest. Principal emails are never returned. Writes no site content. Requires the transfer:analyze scope.",
		inputSchema: z.object({
			operationId: transferOperationIdSchema,
			decisions: siteImportDecisionsInputSchema.optional().describe("principalMappings (principal id to target user id, or null to drop the reference) and siteTitle / siteTagline ('package' or 'target'). Omitted values keep the plan defaults.")
		})
	}, async (args, extra) => {
		requireRole(extra, Role.ADMIN);
		requireTransferScope(extra, "transfer:analyze");
		return unwrap(await analyzeImport(transferContext(extra), args));
	});
	server.registerTool("site_import_start", {
		title: "Start Site Import",
		description: "Start importing an analyzed package into this site. packageDigest and planDigest must be the values from the latest site_import_analyze plan, which must have no blockers. Returns the operation id and status; drive it with site_import_resume. The site refuses ordinary content writes until the import completes or an admin abandons it. Requires the transfer:execute scope. " + APPROVAL_FLOW_DESCRIPTION,
		inputSchema: z.object({
			operationId: transferOperationIdSchema,
			packageDigest: z.string().regex(SHA256_DIGEST_PATTERN, "Expected sha256:<64 hex>").describe("Package digest from the plan"),
			planDigest: z.string().regex(SHA256_DIGEST_PATTERN, "Expected sha256:<64 hex>").describe("Plan digest from the latest analysis"),
			approvalId: transferApprovalIdSchema.optional()
		}),
		annotations: { destructiveHint: true }
	}, async (args, extra) => {
		requireRole(extra, Role.ADMIN);
		const scoped = transferScopeHeld(extra, "transfer:execute");
		const { userId, tokenId } = getExtra(extra);
		return unwrap(await startImport(transferContext(extra), {
			userId,
			tokenId
		}, {
			operationId: args.operationId,
			packageDigest: transferDigest(args.packageDigest),
			planDigest: transferDigest(args.planDigest),
			approvalId: args.approvalId,
			scoped
		}));
	});
	server.registerTool("site_import_status", {
		title: "Get Site Import Status",
		description: "Report an import's state, stage, progress, digests, and uploaded file counts. Does not advance the import. Requires any transfer scope, or the approval that started this import (same token).",
		inputSchema: z.object({ operationId: transferOperationIdSchema }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireRole(extra, Role.ADMIN);
		await requireTransferAccess(extra, "transfer:*", "import", args.operationId);
		return unwrap(await importStatus(transferContext(extra), args.operationId));
	});
	server.registerTool("site_import_resume", {
		title: "Resume Site Import",
		description: "Run one bounded step of a started import and report its status. Call repeatedly until nextRequestInMs is null; safe to repeat after a disconnect. Requires the transfer:execute scope, or the approval that started this import (same token).",
		inputSchema: z.object({ operationId: transferOperationIdSchema })
	}, async (args, extra) => {
		requireRole(extra, Role.ADMIN);
		await requireTransferAccess(extra, "transfer:execute", "import", args.operationId);
		const { userId, tokenId } = getExtra(extra);
		return unwrap(await resumeImport(transferContext(extra), {
			userId,
			tokenId
		}, args.operationId));
	});
	server.registerTool("site_import_receipt", {
		title: "Get Site Import Receipt",
		description: "Return the verified receipt of a completed import: package and plan digests, origin and target site ids, logical digest, record counts, warnings, and the receipt's own digest. Requires any transfer scope, or the approval that started this import (same token).",
		inputSchema: z.object({ operationId: transferOperationIdSchema }),
		annotations: { readOnlyHint: true }
	}, async (args, extra) => {
		requireRole(extra, Role.ADMIN);
		await requireTransferAccess(extra, "transfer:*", "import", args.operationId);
		return unwrap(await importReceipt(transferContext(extra), args.operationId));
	});
	return server;
}
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	const server = createMcpServer(await emdash.getEnabledPluginMcpTools(), request);
	try {
		const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: void 0 });
		await server.connect(transport);
		return await transport.handleRequest(request, { authInfo: {
			token: "",
			clientId: "emdash-admin",
			scopes: [],
			extra: {
				emdash,
				user,
				userId: user.id,
				userRole: user.role,
				tokenScopes: locals.tokenScopes,
				tokenId: locals.tokenId,
				cache
			}
		} });
	} catch (error) {
		console.error("[MCP]", error);
		await server.close().catch(() => {});
		return new Response(JSON.stringify({
			jsonrpc: "2.0",
			error: {
				code: -32603,
				message: "Internal server error"
			},
			id: null
		}), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "private, no-store"
			}
		});
	}
};
/**
* GET — SSE stream. Not used in stateless mode.
*/
var GET = async () => {
	return new Response(JSON.stringify({
		jsonrpc: "2.0",
		error: {
			code: -32e3,
			message: "Method not allowed. This is a stateless MCP endpoint — use POST."
		},
		id: null
	}), {
		status: 405,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "private, no-store"
		}
	});
};
/**
* DELETE — Session close. Not used in stateless mode.
*/
var DELETE = async () => {
	return new Response(JSON.stringify({
		jsonrpc: "2.0",
		error: {
			code: -32e3,
			message: "Method not allowed. This is a stateless MCP endpoint."
		},
		id: null
	}), {
		status: 405,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "private, no-store"
		}
	});
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/mcp@_@mjs
var page = () => mcp_exports;
export { page };
