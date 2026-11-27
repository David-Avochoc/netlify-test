import "./portable-text-table_DzMGQUwX.mjs";
import { n as isString, t as isDimension } from "./video-block_Dv21QuSq.mjs";
import { Extension, Mark, Node, mergeAttributes, wrappingInputRule } from "@tiptap/core";
import { Plugin, PluginKey, Selection, TextSelection, Transaction } from "@tiptap/pm/state";
import { canJoin, dropPoint, liftTarget } from "@tiptap/pm/transform";
import { closeHistory, isHistoryTransaction } from "@tiptap/pm/history";
import CodeBlock from "@tiptap/extension-code-block";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
import { OrderedList } from "@tiptap/extension-list";
import { Fragment, Slice } from "@tiptap/pm/model";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { CellSelection, cellAround, deleteColumn, deleteRow, nextCell, selectedRect } from "@tiptap/pm/tables";
// node_modules/@emdash-cms/admin/dist/normalize-D2sMILPP.js
/**
* Normalizers that act only on what this client's own transactions changed.
* Every client renders every other client's changes, so a normalizer that
* wrote while rendering one would have every client write the same fix, and
* Yjs keeps each client's copy.
*
* Server-safe: nothing here touches the DOM, React or `crypto` when loaded.
*/
function numberField(step, field) {
	const value = Reflect.get(step, field);
	return typeof value === "number" ? value : void 0;
}
/** The ranges of the final document that the transactions' steps changed. */
function changedRanges(transactions) {
	const ranges = [];
	for (const transaction of transactions) for (const step of transaction.steps) {
		const map = step.getMap();
		for (const range of ranges) {
			range.from = map.map(range.from, -1);
			range.to = map.map(range.to, 1);
		}
		const stepRanges = [];
		map.forEach((_oldFrom, _oldTo, from, to) => stepRanges.push({
			from,
			to
		}));
		if (stepRanges.length === 0) {
			const from = numberField(step, "from");
			const to = numberField(step, "to");
			const pos = numberField(step, "pos");
			if (from !== void 0 && to !== void 0) stepRanges.push({
				from,
				to
			});
			else if (pos !== void 0) stepRanges.push({
				from: pos,
				to: pos + 1
			});
		}
		ranges.push(...stepRanges);
	}
	return ranges;
}
/** The transaction a plugin's `appendTransaction` answered, or the transaction itself. */
function rootOf(transaction) {
	const root = transaction.getMeta("appendedTransaction");
	return root instanceof Transaction ? root : transaction;
}
var REMOTE = "emdashRemote";
/**
* Whether the transaction renders another client's change, or answers one that does. Only an
* editor with `PortableTextYSync` marks them.
*/
function isRemote(transaction) {
	return transaction.getMeta(REMOTE) === true || rootOf(transaction).getMeta(REMOTE) === true;
}
/**
* `plugin` with an `appendTransaction` that answers only this client's own
* transactions, and only when `onlyIf` holds for them.
*/
function localOnly(plugin, onlyIf) {
	const append = plugin.spec.appendTransaction;
	if (!append) return plugin;
	return new Plugin({
		...plugin.spec,
		appendTransaction(transactions, oldState, newState) {
			if (transactions.some(isRemote)) return null;
			if (onlyIf && !onlyIf(transactions, oldState, newState)) return null;
			return append.call(this, transactions, oldState, newState);
		}
	});
}
/** `extension` with each plugin it adds made local-only. */
function withLocalOnlyPlugins(extension, onlyIf) {
	return extension.extend({ addProseMirrorPlugins() {
		return (this.parent?.() ?? []).map((plugin) => localOnly(plugin, onlyIf));
	} });
}
var FILLED_WHEN_EMPTIED = /* @__PURE__ */ new Set([
	"bulletList",
	"orderedList",
	"blockquote",
	"tableCell",
	"tableHeader"
]);
var REMOVED_WHEN_EMPTIED = /* @__PURE__ */ new Set([
	"listItem",
	"bulletList",
	"orderedList",
	"blockquote"
]);
var clamp = (doc, { from, to }) => {
	const size = doc.content.size;
	return {
		from: Math.max(0, Math.min(from, size)),
		to: Math.max(0, Math.min(to, size))
	};
};
/** A list item without a leading paragraph, or an empty list, quote or cell. */
function misshapen(node) {
	if (!node) return false;
	if (node.type.name === "listItem") return node.firstChild?.type.name !== "paragraph";
	return node.childCount === 0 && FILLED_WHEN_EMPTIED.has(node.type.name);
}
/**
* Where the node that starts at `pos` after the transactions started before
* them, or null when they inserted or replaced it.
*/
function positionBefore(transactions, pos) {
	const maps = transactions.flatMap((transaction) => transaction.mapping.maps);
	let mapped = pos;
	for (const map of maps.toReversed()) {
		const result = map.invert().mapResult(mapped, 1);
		if (result.deleted) return null;
		mapped = result.pos;
	}
	return mapped;
}
/**
* Where the transactions' first change starts, in the document before them:
* the steps before it move nothing.
*/
function firstChangeStart(transactions) {
	for (const transaction of transactions) for (const map of transaction.mapping.maps) {
		let start = null;
		map.forEach((oldStart) => {
			start ??= oldStart;
		});
		if (start !== null) return start;
	}
	return null;
}
/**
* Whether the list item at `pos`, which starts with a nested list and started
* at `before` before the transactions, gives that list's first items its place.
* ProseMirror did that when items had to start with a paragraph and an edit
* that started inside the item reached the nested list's first line, by cutting
* into it, cutting it to its end, or pasting it. Otherwise it gave the item an
* empty paragraph.
*/
function liftsNestedItems(node, pos, before, transactions, oldDoc) {
	const previous = before === null ? null : oldDoc.nodeAt(before);
	const start = firstChangeStart(transactions);
	if (before === null || previous?.type !== node.type || start === null) return false;
	if (start <= before || start >= before + previous.nodeSize) return false;
	let line = node;
	let depth = 0;
	while (!line.isTextblock) {
		if (!line.firstChild) return false;
		line = line.firstChild;
		depth++;
	}
	const lineBefore = positionBefore(transactions, pos + depth + 1);
	if (lineBefore === null) return true;
	const $line = oldDoc.resolve(lineBefore);
	if ($line.parentOffset === 0 && $line.parent.content.eq(line.content)) return false;
	if ($line.parentOffset < $line.parent.content.size) return true;
	return line.content.size === 0 && $line.parent.content.size > 0;
}
/**
* Whether the node at `pos` is one the transactions left as it was, here or
* moved.
*/
function unchanged(node, pos, transactions, oldDoc) {
	const before = positionBefore(transactions, pos);
	return before !== null && oldDoc.nodeAt(before)?.eq(node) === true;
}
/**
* Moves the items the edit made at the start of the nested list that the list
* item at `pos` starts with up into the item's place, and again while the item
* there starts with a nested list. Items the edit left as they were stay
* nested. What the item holds after the moved items stays in an item of its
* own, joined to the last moved item when it starts with a list, and that list
* joins the moved item's own nested list.
*/
function liftEditedNestedItems(tr, pos, transactions, oldDoc) {
	for (;;) {
		const item = tr.doc.nodeAt(pos);
		const nested = item?.firstChild;
		if (!item || !nested || nested.type.name === "paragraph" || nested.childCount === 0) return;
		let count = 1;
		let size = nested.child(0).nodeSize;
		while (count < nested.childCount) {
			const next = nested.child(count);
			if (unchanged(next, tr.mapping.invert().map(pos + 2 + size), transactions, oldDoc)) break;
			size += next.nodeSize;
			count++;
		}
		const last = nested.child(count - 1);
		const range = tr.doc.resolve(pos + 2).blockRange(tr.doc.resolve(pos + 2 + size));
		const target = range ? liftTarget(range) : null;
		if (!range || target === null) return;
		tr.lift(range, target);
		if (count < nested.childCount || item.childCount > 1) {
			const leftover = pos + size;
			if (tr.doc.nodeAt(leftover)?.firstChild?.type.name !== "paragraph" && canJoin(tr.doc, leftover)) {
				tr.join(leftover);
				const lists = leftover - last.nodeSize + 1 + last.content.size;
				const $lists = tr.doc.resolve(lists);
				if ($lists.nodeBefore?.type === $lists.nodeAfter?.type && canJoin(tr.doc, lists)) tr.join(lists);
			}
		}
	}
}
/**
* The positions of the items on the first-line chain of the list item at `pos`:
* the first item of the list it starts with, and so on while each starts with a
* list.
*/
function firstLineChain(node, pos) {
	const chain = [];
	let item = node;
	while (item.firstChild?.type.name !== "paragraph" && item.firstChild?.firstChild) {
		item = item.firstChild.firstChild;
		pos += 2;
		chain.push(pos);
	}
	return chain;
}
/** The containers in `doc` that `misshapen` accepts. */
function misshapenNodes(doc) {
	const nodes = /* @__PURE__ */ new Set();
	doc.descendants((node) => {
		if (node.isTextblock) return false;
		if (misshapen(node)) nodes.add(node);
		return true;
	});
	return nodes;
}
/**
* Gives back the shapes a local edit took from containers. A list item it left
* without a leading paragraph gets one, or gives the items the edit made at
* the start of the nested list it starts with its place, and an empty list,
* quote or cell it added gets an item or a paragraph. A list, list item or quote it emptied is removed, as it was
* when they couldn't be empty, and so is a list or list item that removal leaves
* empty; a cell it emptied gets a paragraph. A container that already had its
* shape, such as one a merge left or one the edit only moved, is left alone,
* and only what the edit itself emptied is removed, so this can't remove what
* another client added.
*/
function reshapeContainers(state, oldState, transactions, tr) {
	const { doc } = state;
	const refills = /* @__PURE__ */ new Set();
	const removals = /* @__PURE__ */ new Set();
	const lifts = /* @__PURE__ */ new Set();
	const chained = /* @__PURE__ */ new Set();
	let existing;
	const existed = (node) => (existing ??= misshapenNodes(oldState.doc)).has(node);
	for (const range of changedRanges(transactions)) {
		const { from, to } = clamp(doc, range);
		doc.nodesBetween(from, to, (node, pos) => {
			if (node.isTextblock) return false;
			if (!misshapen(node) || chained.has(pos)) return true;
			const before = positionBefore(transactions, pos);
			const previous = before === null ? null : oldState.doc.nodeAt(before);
			if (node.childCount === 0 && REMOVED_WHEN_EMPTIED.has(node.type.name) && previous?.type === node.type && previous.childCount > 0) removals.add(pos);
			else if ((previous?.type !== node.type || !misshapen(previous)) && !existed(node)) if (node.type.name === "listItem" && liftsNestedItems(node, pos, before, transactions, oldState.doc)) {
				lifts.add(pos);
				for (const item of firstLineChain(node, pos)) chained.add(item);
			} else refills.add(pos);
			return true;
		});
	}
	const { listItem, paragraph } = state.schema.nodes;
	for (const pos of [
		...refills,
		...removals,
		...lifts
	].toSorted((a, b) => b - a)) {
		const mapped = tr.mapping.mapResult(pos);
		if (mapped.deleted) continue;
		if (lifts.has(pos)) {
			liftEditedNestedItems(tr, mapped.pos, transactions, oldState.doc);
			continue;
		}
		const $inside = tr.doc.resolve(mapped.pos + 1);
		if (removals.has(pos)) {
			let depth = $inside.depth;
			while (depth > 1 && $inside.node(depth - 1).childCount === 1 && REMOVED_WHEN_EMPTIED.has($inside.node(depth - 1).type.name)) depth--;
			tr.delete($inside.before(depth), $inside.after(depth));
			continue;
		}
		const name = $inside.parent.type.name;
		const isList = name === "bulletList" || name === "orderedList";
		tr.insert($inside.pos, isList ? listItem.create(null, paragraph.create()) : paragraph.create());
	}
}
/** Yjs stores no marks on a line break, so the breaks a local edit marks lose them. */
function unmarkLineBreaks(state, transactions, tr) {
	const marked = /* @__PURE__ */ new Map();
	for (const range of changedRanges(transactions)) {
		const { from, to } = clamp(state.doc, range);
		state.doc.nodesBetween(from, to, (node, pos) => {
			if (node.type.name !== "hardBreak") return true;
			if (node.marks.length > 0) marked.set(pos, node);
			return false;
		});
	}
	for (const [pos, node] of marked) for (const mark of node.marks) tr.removeNodeMark(pos, mark.type);
}
/**
* Undo and redo already hold the steps this appended to the edits they replay,
* and the history doesn't map its other entries through steps appended to them.
*/
function shapePlugin() {
	return new Plugin({ appendTransaction(transactions, oldState, state) {
		if (!transactions.some((transaction) => transaction.docChanged)) return null;
		if (transactions.some((transaction) => isHistoryTransaction(rootOf(transaction)))) return null;
		const tr = state.tr;
		unmarkLineBreaks(state, transactions, tr);
		reshapeContainers(state, oldState, transactions, tr);
		return tr.docChanged ? tr : null;
	} });
}
/**
* TipTap's `clearDocument` turns a document whose text was all selected and
* then deleted into one paragraph. Another client emptying the document isn't
* this client's deletion.
*/
function keepRemotelyEmptiedDocuments() {
	return new Plugin({ filterTransaction(transaction) {
		if (isRemote(transaction)) transaction.setMeta("preventClearDocument", true);
		return true;
	} });
}
/**
* Whether `step` lifts the paragraph a list item starts with out of it, leaving
* the item to start with a nested list.
*/
function liftsItemStart(step, before, after) {
	const gapFrom = numberField(step, "gapFrom");
	const gapTo = numberField(step, "gapTo");
	if (gapFrom === void 0 || gapTo === void 0 || Reflect.get(step, "structure") !== true) return false;
	const $gap = before.resolve(gapFrom);
	if ($gap.parent.type.name !== "listItem" || $gap.index() !== 0) return false;
	const rest = before.resolve(gapTo).nodeAfter;
	if (!rest || rest.type.name === "paragraph") return false;
	return after.resolve(step.getMap().map(gapFrom, 1)).depth < $gap.depth;
}
/**
* ProseMirror couldn't lift the paragraph a list item starts with out of it,
* leaving the item to start with a nested list, when items had to start with a
* paragraph, and the item would show as an empty bullet. A local transaction
* that does, as Delete before such a list makes, is dropped.
*/
function keepListItemStarts() {
	return new Plugin({ filterTransaction(transaction) {
		if (isRemote(transaction)) return true;
		return !transaction.steps.some((step, index) => liftsItemStart(step, transaction.docs[index], transaction.docs[index + 1] ?? transaction.doc));
	} });
}
Extension.create({
	name: "emdashPortableTextNormalizers",
	addProseMirrorPlugins() {
		return [
			keepRemotelyEmptiedDocuments(),
			keepListItemStarts(),
			localOnly(shapePlugin())
		];
	}
});
// node_modules/@emdash-cms/admin/dist/schema-KD0ikziq.js
var PORTABLE_TEXT_BLOCK_ATTR = "emdashPortableTextBlock";
var PORTABLE_TEXT_KEY_ATTR = "emdashPortableTextKey";
var PORTABLE_TEXT_SPAN_MARK = "emdashPortableTextSpan";
var SUPPORTED_PORTABLE_TEXT_DECORATORS = /* @__PURE__ */ new Set([
	"strong",
	"em",
	"underline",
	"strike-through",
	"subscript",
	"superscript",
	"code"
]);
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function collectPortableTextMarks(value, inheritedMarkDefs, unsupported) {
	if (Array.isArray(value)) {
		for (const item of value) collectPortableTextMarks(item, inheritedMarkDefs, unsupported);
		return;
	}
	if (!isRecord$1(value)) return;
	let markDefs = inheritedMarkDefs;
	if (Array.isArray(value.markDefs)) {
		const localMarkDefs = new Map(inheritedMarkDefs);
		for (const markDef of value.markDefs) if (isRecord$1(markDef) && typeof markDef._key === "string") localMarkDefs.set(markDef._key, markDef);
		markDefs = localMarkDefs;
	}
	if (value._type === "span" && Array.isArray(value.marks)) for (const mark of value.marks) {
		if (typeof mark !== "string" || SUPPORTED_PORTABLE_TEXT_DECORATORS.has(mark)) continue;
		const markDef = markDefs.get(mark);
		if (markDef?._type === "link") continue;
		unsupported.add(typeof markDef?._type === "string" ? markDef._type : mark);
	}
	for (const [key, child] of Object.entries(value)) if (key !== "markDefs") collectPortableTextMarks(child, markDefs, unsupported);
}
function findUnsupportedPortableTextMarks(blocks) {
	const unsupported = /* @__PURE__ */ new Set();
	for (const block of blocks) if (isRecord$1(block) && (block._type === "block" || block._type === "table")) collectPortableTextMarks(block, /* @__PURE__ */ new Map(), unsupported);
	return [...unsupported].toSorted();
}
Code.extend({ excludes: "" });
var ORDERED_LIST_INPUT_REGEX = /^(\d+)\.\s$/;
var MAX_START = 0x7fffffff;
var normalizeId = (value) => {
	if (typeof value !== "string") return void 0;
	const id = value.trim();
	return id.length > 0 && id.length <= 128 ? id : void 0;
};
var normalizeStart = (value) => typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= MAX_START ? value : void 0;
var legacyId = (seed) => {
	const readable = `legacy:${seed}`;
	if (readable.length <= 128) return readable;
	let hash = 0x811c9dc5;
	for (let i = 0; i < seed.length; i++) {
		hash ^= seed.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return `legacy:${seed.slice(0, 96)}:${(hash >>> 0).toString(36)}:${seed.length.toString(36)}`;
};
var createId = () => globalThis.crypto?.randomUUID?.() ?? `list-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
var createRepairId = (sourceId, scope, attempt) => {
	const base = legacyId(`repair:${sourceId}:${scope}`);
	const suffix = `:${attempt.toString(36)}`;
	return `${base.slice(0, 128 - suffix.length)}${suffix}`;
};
function collectLists(doc) {
	const lists = [];
	doc.descendants((node, pos) => {
		if (node.type.name !== "orderedList") return;
		const resolved = doc.resolve(pos);
		let context = "root";
		let contextPos = null;
		for (let depth = resolved.depth; depth > 0; depth--) if (resolved.node(depth).type.name === "listItem") {
			contextPos = resolved.before(depth);
			context = `listItem:${contextPos}`;
			break;
		}
		if (contextPos === null && resolved.depth > 0) {
			contextPos = resolved.before(resolved.depth);
			context = `${resolved.node(resolved.depth).type.name}:${contextPos}`;
		}
		lists.push({
			node,
			pos,
			depth: resolved.depth,
			context,
			contextPos
		});
	});
	return lists;
}
function normalizeOrderedListDocument(doc) {
	const canonicalBySourceScope = /* @__PURE__ */ new Map();
	const assignedCanonicalIds = /* @__PURE__ */ new Set();
	const lists = collectLists(doc).map((list) => {
		const sourceId = normalizeId(list.node.attrs.listId) ?? legacyId(`pm:${list.pos}:${list.depth}:${list.context}`);
		const scope = JSON.stringify([list.depth, list.context]);
		const sourceScope = JSON.stringify([sourceId, scope]);
		let listId = canonicalBySourceScope.get(sourceScope);
		if (!listId) {
			if (!assignedCanonicalIds.has(sourceId)) listId = sourceId;
			else {
				let attempt = 0;
				do
					listId = createRepairId(sourceId, scope, attempt++);
				while (assignedCanonicalIds.has(listId));
			}
			canonicalBySourceScope.set(sourceScope, listId);
			assignedCanonicalIds.add(listId);
		}
		return {
			...list,
			listId,
			scopeKey: JSON.stringify([
				listId,
				list.depth,
				list.context
			])
		};
	});
	const bases = /* @__PURE__ */ new Map();
	for (const list of lists) {
		const start = normalizeStart(list.node.attrs.listStart);
		if (start !== void 0 && !bases.has(list.scopeKey)) bases.set(list.scopeKey, start);
	}
	for (const list of lists) if (!bases.has(list.scopeKey)) bases.set(list.scopeKey, normalizeStart(list.node.attrs.start) ?? 1);
	const counts = /* @__PURE__ */ new Map();
	const changes = [];
	for (const list of lists) {
		const listStart = bases.get(list.scopeKey);
		const count = counts.get(list.scopeKey) ?? 0;
		const start = normalizeStart(listStart + count) ?? 1;
		counts.set(list.scopeKey, count + list.node.childCount);
		if (list.node.attrs.listId !== list.listId || list.node.attrs.listStart !== listStart || list.node.attrs.start !== start) changes.push({
			pos: list.pos,
			attrs: {
				...list.node.attrs,
				listId: list.listId,
				listStart,
				start
			}
		});
	}
	return changes;
}
function orderedListsIn(doc) {
	const lists = /* @__PURE__ */ new Set();
	doc.descendants((node) => {
		if (node.type.name === "orderedList") {
			lists.add(node);
			return true;
		}
		return node.type.name === "bulletList" || node.type.name === "listItem";
	});
	return lists;
}
/** The ids of the lists the edit from `before` to `after` added, removed or changed. */
function changedListIds(before, after) {
	const beforeLists = orderedListsIn(before);
	const afterLists = orderedListsIn(after);
	const ids = /* @__PURE__ */ new Set();
	for (const list of afterLists) if (!beforeLists.has(list)) ids.add(normalizeId(list.attrs.listId));
	for (const list of beforeLists) if (!afterLists.has(list)) ids.add(normalizeId(list.attrs.listId));
	return ids;
}
/**
* Renumbers the lists that share an id with a list the transactions changed,
* and joins adjacent segments of one list where the transactions changed the
* boundary between them.
*/
function normalizeTransaction(transactions, oldState, newState) {
	if (!transactions.some((transaction) => transaction.docChanged)) return null;
	const changedIds = changedListIds(oldState.doc, newState.doc);
	const changes = changedIds.size === 0 ? [] : normalizeOrderedListDocument(newState.doc).filter((change) => changedIds.has(normalizeId(newState.doc.nodeAt(change.pos)?.attrs.listId)) || changedIds.has(normalizeId(change.attrs.listId)));
	const ranges = changedRanges(transactions);
	const transaction = newState.tr;
	for (const change of changes) transaction.setNodeMarkup(change.pos, void 0, change.attrs);
	const normalizedLists = collectLists(transaction.doc);
	const joinPositions = normalizedLists.flatMap((list, index) => {
		const next = normalizedLists[index + 1];
		return next !== void 0 && next.pos === list.pos + list.node.nodeSize && next.depth === list.depth && next.context === list.context && normalizeId(next.node.attrs.listId) === normalizeId(list.node.attrs.listId) && normalizeStart(next.node.attrs.listStart) === normalizeStart(list.node.attrs.listStart) && ranges.some(({ from, to }) => from <= next.pos && next.pos <= to) ? [next.pos] : [];
	});
	for (const pos of joinPositions.toReversed()) if (canJoin(transaction.doc, pos)) transaction.join(pos);
	if (!transaction.docChanged) return null;
	return transaction;
}
function remapPaste(slice) {
	const identities = /* @__PURE__ */ new Map();
	let missingIndex = 0;
	const mapFragment = (fragment, depth, parentContext) => {
		const children = [];
		fragment.forEach((node, _offset, index) => {
			const childContext = node.type.name === "listItem" ? `${parentContext}/listItem:${index}` : parentContext;
			const content = mapFragment(node.content, depth + 1, childContext);
			if (node.type.name !== "orderedList") {
				children.push(node.copy(content));
				return;
			}
			const sourceId = normalizeId(node.attrs.listId) ?? `missing:${missingIndex++}`;
			const scope = JSON.stringify([
				sourceId,
				depth,
				parentContext
			]);
			let identity = identities.get(scope);
			if (!identity) {
				identity = {
					listId: createId(),
					listStart: normalizeStart(node.attrs.start) ?? normalizeStart(node.attrs.listStart) ?? 1
				};
				identities.set(scope, identity);
			}
			children.push(node.type.create({
				...node.attrs,
				...identity,
				start: identity.listStart
			}, content, node.marks));
		});
		return Fragment.fromArray(children);
	};
	return new Slice(mapFragment(slice.content, 0, "root"), slice.openStart, slice.openEnd);
}
function sliceHasOrderedList(slice) {
	let found = false;
	slice.content.descendants((node) => {
		if (node.type.name !== "orderedList") return true;
		found = true;
		return false;
	});
	return found;
}
function displayedStartAtSelection(state) {
	const current = collectLists(state.doc).findLast((list) => state.selection.from >= list.pos && state.selection.from <= list.pos + list.node.nodeSize);
	if (!current) return null;
	const listId = normalizeId(current.node.attrs.listId);
	const start = normalizeStart(current.node.attrs.start);
	if (!listId || start === void 0) return null;
	let precedingItems = 0;
	current.node.forEach((child, offset) => {
		if (current.pos + 1 + offset + child.nodeSize <= state.selection.from) precedingItems++;
	});
	return {
		listId,
		listStart: normalizeStart(start + precedingItems) ?? 1
	};
}
function rewriteSliceIdentity(slice, sourceId, listId, listStart) {
	const mapFragment = (fragment) => {
		const children = [];
		fragment.forEach((node) => {
			const content = mapFragment(node.content);
			children.push(node.type.name === "orderedList" && normalizeId(node.attrs.listId) === sourceId ? node.type.create({
				...node.attrs,
				listId,
				listStart,
				start: listStart
			}, content, node.marks) : node.copy(content));
		});
		return Fragment.fromArray(children);
	};
	return new Slice(mapFragment(slice.content), slice.openStart, slice.openEnd);
}
function prepareCopy(slice, state) {
	const selected = displayedStartAtSelection(state);
	if (!selected) return slice;
	let updated = false;
	const mapFragment = (fragment) => {
		const children = [];
		fragment.forEach((node) => {
			const isFirstSelectedList = !updated && node.type.name === "orderedList" && normalizeId(node.attrs.listId) === selected.listId;
			if (isFirstSelectedList) updated = true;
			const content = mapFragment(node.content);
			if (isFirstSelectedList) children.push(node.type.create({
				...node.attrs,
				start: selected.listStart
			}, content, node.marks));
			else children.push(node.copy(content));
		});
		return Fragment.fromArray(children);
	};
	return new Slice(mapFragment(slice.content), slice.openStart, slice.openEnd);
}
function remapMove(slice, state) {
	const selected = displayedStartAtSelection(state);
	if (!selected) return slice;
	return rewriteSliceIdentity(slice, selected.listId, createId(), selected.listStart);
}
function selectedList(state) {
	const lists = collectLists(state.doc);
	const current = lists.findLast((list) => state.selection.from >= list.pos && state.selection.to <= list.pos + list.node.nodeSize);
	if (!current) return null;
	return lists.filter((list) => list.depth === current.depth && list.context === current.context && state.selection.from < list.pos + list.node.nodeSize && state.selection.to > list.pos).length === 1 ? {
		current,
		lists
	} : null;
}
function rewriteTail(state, dispatch, mode) {
	const selected = selectedList(state);
	if (!selected) return false;
	const { current, lists } = selected;
	const currentId = normalizeId(current.node.attrs.listId);
	if (!currentId) return false;
	const compatible = lists.filter((list) => list.depth === current.depth && list.context === current.context);
	const predecessor = compatible.findLast((list) => list.pos < current.pos);
	const predecessorId = predecessor ? normalizeId(predecessor.node.attrs.listId) : void 0;
	if (mode === "continue" && (!predecessorId || predecessorId === currentId)) return false;
	if (!dispatch) return true;
	const listId = mode === "continue" ? predecessorId : createId();
	const listStart = mode === "continue" ? normalizeStart(predecessor.node.attrs.listStart) ?? 1 : 1;
	const transaction = state.tr;
	for (const list of compatible) {
		if (list.pos < current.pos || normalizeId(list.node.attrs.listId) !== currentId) continue;
		transaction.setNodeMarkup(list.pos, void 0, {
			...list.node.attrs,
			listId,
			listStart
		});
	}
	dispatch(transaction);
	return true;
}
function buildDropTransaction(state, slice, insertPos, deleteSource) {
	const transaction = state.tr;
	if (deleteSource) transaction.deleteSelection();
	const from = transaction.mapping.map(insertPos);
	const beforeInsert = transaction.doc;
	transaction.replaceRange(from, from, slice);
	if (transaction.doc.eq(beforeInsert)) return null;
	let to = from;
	transaction.mapping.maps.at(-1)?.forEach((_oldFrom, _oldTo, _newFrom, newTo) => {
		to = Math.max(to, newTo);
	});
	return {
		transaction,
		from,
		to
	};
}
function handleMovedDrop(view, event, slice, moved) {
	if (!sliceHasOrderedList(slice)) return false;
	const eventPos = view.posAtCoords({
		left: event.clientX,
		top: event.clientY
	});
	if (!eventPos) return false;
	const insertPos = dropPoint(view.state.doc, eventPos.pos, slice) ?? eventPos.pos;
	if (!moved) {
		const dropped = buildDropTransaction(view.state, remapPaste(slice), insertPos, false);
		if (!dropped) return false;
		const selectionPos = Math.min(dropped.to, dropped.transaction.doc.content.size);
		dropped.transaction.setSelection(Selection.near(dropped.transaction.doc.resolve(selectionPos), -1));
		view.focus();
		view.dispatch(dropped.transaction.setMeta("uiEvent", "drop").scrollIntoView());
		return true;
	}
	const selected = selectedList(view.state);
	if (!selected) return false;
	const preview = buildDropTransaction(view.state, slice, insertPos, true);
	if (!preview) return false;
	const sourceContextPos = selected.current.contextPos;
	const mappedSourceContextPos = sourceContextPos === null ? null : preview.transaction.mapping.map(sourceContextPos, 1);
	if (collectLists(preview.transaction.doc).some((list) => list.pos < preview.to && list.pos + list.node.nodeSize > preview.from && list.depth === selected.current.depth && list.contextPos === mappedSourceContextPos)) return false;
	const remapped = remapMove(slice, view.state);
	if (remapped === slice) return false;
	const dropped = buildDropTransaction(view.state, remapped, insertPos, true);
	if (!dropped) return false;
	const selectionPos = Math.min(dropped.to, dropped.transaction.doc.content.size);
	dropped.transaction.setSelection(Selection.near(dropped.transaction.doc.resolve(selectionPos), -1));
	view.focus();
	view.dispatch(dropped.transaction.setMeta("uiEvent", "drop").scrollIntoView());
	return true;
}
OrderedList.extend({
	content: "listItem*",
	addAttributes() {
		const parent = this.parent?.() ?? {};
		return {
			...parent,
			start: {
				...parent.start,
				parseHTML: (element) => normalizeStart(Number(element.dataset.emdashListFirst)) ?? normalizeStart(Number(element.getAttribute("start"))) ?? 1
			},
			listId: {
				default: null,
				parseHTML: (element) => normalizeId(element.dataset.emdashListId) ?? null,
				rendered: false
			},
			listStart: {
				default: null,
				parseHTML: (element) => normalizeStart(Number(element.dataset.emdashListStart)) ?? null,
				rendered: false
			}
		};
	},
	renderHTML({ HTMLAttributes, node }) {
		const { start: _start, ...withoutStart } = HTMLAttributes;
		const start = normalizeStart(node.attrs.start) ?? 1;
		const continuity = {
			"data-emdash-list-id": normalizeId(node.attrs.listId),
			"data-emdash-list-start": normalizeStart(node.attrs.listStart),
			"data-emdash-list-first": start
		};
		return start === 1 ? [
			"ol",
			mergeAttributes(this.options.HTMLAttributes, withoutStart, continuity),
			0
		] : [
			"ol",
			mergeAttributes(this.options.HTMLAttributes, {
				...withoutStart,
				start
			}, continuity),
			0
		];
	},
	addCommands() {
		return {
			toggleOrderedList: () => ({ commands, chain }) => this.editor.isActive(this.name) ? commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) : chain().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(this.name, {
				listId: createId(),
				listStart: 1
			}).run(),
			continueOrderedList: () => ({ state, dispatch }) => rewriteTail(state, dispatch, "continue"),
			restartOrderedList: () => ({ state, dispatch }) => rewriteTail(state, dispatch, "restart")
		};
	},
	addInputRules() {
		return [wrappingInputRule({
			find: ORDERED_LIST_INPUT_REGEX,
			type: this.type,
			getAttributes: (match) => {
				const listStart = normalizeStart(Number(match[1])) ?? 1;
				return {
					start: listStart,
					listStart,
					listId: createId()
				};
			},
			joinPredicate: () => false
		})];
	},
	addProseMirrorPlugins() {
		return [new Plugin({
			appendTransaction: normalizeTransaction,
			props: {
				transformCopied: (slice, view) => prepareCopy(slice, view.state),
				handleDrop: handleMovedDrop,
				handlePaste(view, _event, slice) {
					if (!sliceHasOrderedList(slice)) return false;
					view.dispatch(view.state.tr.replaceSelection(remapPaste(slice)).setMeta("paste", true).setMeta("uiEvent", "paste").scrollIntoView());
					return true;
				}
			}
		})].map((plugin) => localOnly(plugin));
	}
});
/**
* y-tiptap's plugin keys, read through a plugin a room's rich-text binding adds. Editor code that
* sites also load on the server, through `portableTextExtensions()`, reads them here instead of
* importing y-tiptap.
*/
var Y_PLUGIN_KEYS = new PluginKey("emdashYPluginKeys");
/** y-tiptap's plugin keys, in an editor bound to a room. */
function yPluginKeys(state) {
	return Y_PLUGIN_KEYS.getState(state);
}
/**
* The editor's undo history: prosemirror-history in a single editor, and
* Collaboration's Y.UndoManager in a room, where prosemirror-history's own
* functions find no history.
*/
function undoManager(state) {
	return yPluginKeys(state)?.undo.getState(state)?.undoManager;
}
/** Makes `tr` start a new undo step, so it doesn't join the one before it. */
function closeHistoryGroup(state, tr) {
	const manager = undoManager(state);
	if (!manager) return closeHistory(tr);
	manager.stopCapturing();
	return tr;
}
var TABLE_NODE_ROLES = /* @__PURE__ */ new Set([
	"table",
	"row",
	"cell",
	"header_cell"
]);
var TABLE_ALIGNMENTS = /* @__PURE__ */ new Set([
	"left",
	"center",
	"right",
	"justify"
]);
function hiddenAttribute(defaultValue = null) {
	return {
		default: defaultValue,
		parseHTML: () => null,
		rendered: false
	};
}
function tableAttributes(parent) {
	return {
		...parent,
		emdashKey: hiddenAttribute(),
		emdashData: hiddenAttribute()
	};
}
function cellAttributes(parent) {
	return {
		...tableAttributes(parent),
		textAlign: {
			default: null,
			parseHTML: (element) => {
				const value = element.style.textAlign;
				return TABLE_ALIGNMENTS.has(value) ? value : null;
			},
			renderHTML: (attributes) => {
				const value = attributes.textAlign;
				return typeof value === "string" && TABLE_ALIGNMENTS.has(value) ? { style: `text-align: ${value}` } : {};
			}
		}
	};
}
function createTableKey() {
	const uuid = globalThis.crypto?.randomUUID?.();
	return uuid ? uuid.replaceAll("-", "").slice(0, 12) : Math.random().toString(36).slice(2, 14);
}
function containsTableStructure(value) {
	if (Array.isArray(value)) return value.some(containsTableStructure);
	if (typeof value !== "object" || value === null) return false;
	const type = "type" in value ? value.type : void 0;
	if (typeof type === "string" && [
		"table",
		"tableRow",
		"tableCell",
		"tableHeader"
	].includes(type)) return true;
	return Object.values(value).some(containsTableStructure);
}
function tableCellPosition(position) {
	for (let depth = position.depth; depth > 0; depth--) {
		const role = position.node(depth).type.spec.tableRole;
		if (role === "cell" || role === "header_cell") return position.before(depth);
	}
	return null;
}
function selectionIsContainedInTableCells(state) {
	if (state.selection instanceof CellSelection) return true;
	const from = tableCellPosition(state.selection.$from);
	return from !== null && from === tableCellPosition(state.selection.$to);
}
function boundedInsertion(command, axis, before) {
	return (props) => {
		if (!selectionIsContainedInTableCells(props.state)) return false;
		const rect = selectedRect(props.state);
		const { map, table } = rect;
		const row = axis === "row";
		const extent = row ? map.height : map.width;
		const cross = row ? map.width : map.height;
		if ((extent + 1) * cross > 2e4) return false;
		const boundary = row ? before ? rect.top : rect.bottom : before ? rect.left : rect.right;
		if (boundary > 0 && boundary < extent) for (let index = 0; index < cross; index++) {
			const slot = row ? boundary * map.width + index : index * map.width + boundary;
			const position = map.map[slot];
			if (position === map.map[slot - (row ? map.width : 1)] && table.nodeAt(position).attrs[row ? "rowspan" : "colspan"] >= 100) return false;
		}
		return command(props);
	};
}
function rtlCellEntry(view, cell, direction) {
	const boundary = Selection.near(direction > 0 ? cell : view.state.doc.resolve(cell.pos + cell.nodeAfter.nodeSize), direction).$head;
	const element = view.nodeDOM(cell.pos);
	if (element instanceof HTMLElement) {
		element.scrollIntoView({
			block: "nearest",
			inline: "nearest"
		});
		const start = view.coordsAtPos(boundary.start(), 1);
		const end = view.coordsAtPos(boundary.end(), -1);
		if (start.top === end.top) return view.state.doc.resolve(start.left > end.left === direction > 0 ? boundary.start() : boundary.end());
		const paragraph = element.querySelector(direction > 0 ? "p" : "p:last-of-type");
		if (paragraph) {
			const bounds = paragraph.getBoundingClientRect();
			const hit = view.posAtCoords({
				left: direction > 0 ? bounds.right - 1 : bounds.left + 1,
				top: direction > 0 ? (start.top + start.bottom) / 2 : (end.top + end.bottom) / 2
			});
			if (hit && hit.pos > cell.pos && hit.pos < cell.pos + cell.nodeAfter.nodeSize) return view.state.doc.resolve(hit.pos);
		}
	}
	return boundary;
}
function deleteSelectedTableAxis(view, event) {
	if (!view.editable || view.composing || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.key !== "Backspace" && event.key !== "Delete") return false;
	const { selection } = view.state;
	if (!(selection instanceof CellSelection)) return false;
	const row = selection.isRowSelection();
	if (row === selection.isColSelection()) return false;
	const rect = selectedRect(view.state);
	const handled = (row ? deleteRow : deleteColumn)(view.state, (transaction) => {
		view.dispatch(closeHistoryGroup(view.state, transaction).setMeta(row ? "emdashDeletedTableRows" : "emdashDeletedTableColumns", row ? rect.bottom - rect.top : rect.right - rect.left));
	});
	if (handled) event.preventDefault();
	return handled;
}
function handleRtlTableKey(view, event) {
	if (!view.editable || event.altKey || event.ctrlKey || event.metaKey || event.isComposing || event.key !== "ArrowLeft" && event.key !== "ArrowRight") return false;
	const { selection } = view.state;
	if (!(selection instanceof CellSelection) && !(selection instanceof TextSelection)) return false;
	const cell = selection instanceof CellSelection ? selection.$headCell : cellAround(selection.$head);
	const element = cell ? view.nodeDOM(cell.pos) : null;
	const table = element instanceof Element ? element.closest("table") : null;
	if (!cell || !table || getComputedStyle(table).direction !== "rtl") return false;
	const direction = event.key === "ArrowLeft" ? 1 : -1;
	if (selection instanceof TextSelection) {
		if (!event.shiftKey && !selection.empty) return true;
		const paragraph = selection.$head.index(cell.depth + 1);
		const backward = selection.$head.parent.content.size ? selection.$head.parentOffset === 0 : direction < 0;
		if (!view.endOfTextblock(event.key === "ArrowLeft" ? "left" : "right") || paragraph !== (backward ? 0 : cell.nodeAfter.childCount - 1)) return true;
	}
	const next = selection instanceof CellSelection && !event.shiftKey ? cell : nextCell(cell, "horiz", direction);
	if (!next && !event.shiftKey) return true;
	if (next) {
		const anchor = selection instanceof CellSelection ? selection.$anchorCell : cell;
		view.dispatch(view.state.tr.setSelection(event.shiftKey ? new CellSelection(anchor, next) : Selection.near(rtlCellEntry(view, next, direction), direction)).scrollIntoView());
	}
	event.preventDefault();
	return true;
}
var EmDashTable = Table.extend({
	content: "tableRow*",
	renderHTML(props) {
		if (props.node.childCount > 0) return this.parent(props);
		return [
			"table",
			mergeAttributes(this.options.HTMLAttributes, props.HTMLAttributes),
			["tbody", 0]
		];
	},
	addNodeView() {
		return null;
	},
	addProseMirrorPlugins() {
		return [new Plugin({ props: { handleDOMEvents: { keydown: (view, event) => deleteSelectedTableAxis(view, event) || handleRtlTableKey(view, event) } } }), ...this.parent().map((plugin) => localOnly(plugin))];
	},
	addCommands() {
		const parent = this.parent();
		return {
			...parent,
			addRowBefore: () => boundedInsertion(parent.addRowBefore(), "row", true),
			addRowAfter: () => boundedInsertion(parent.addRowAfter(), "row", false),
			addColumnBefore: () => boundedInsertion(parent.addColumnBefore(), "column", true),
			addColumnAfter: () => boundedInsertion(parent.addColumnAfter(), "column", false)
		};
	},
	addAttributes() {
		return tableAttributes(this.parent?.() ?? {});
	}
});
TableRow.extend({ addAttributes() {
	return tableAttributes(this.parent?.() ?? {});
} });
TableCell.extend({
	content: "paragraph*",
	addAttributes() {
		return cellAttributes(this.parent?.() ?? {});
	}
});
TableHeader.extend({
	content: "paragraph*",
	addAttributes() {
		return cellAttributes(this.parent?.() ?? {});
	}
});
Extension.create({
	name: "tableIdentity",
	addProseMirrorPlugins() {
		return [new Plugin({ appendTransaction(transactions, oldState, newState) {
			if (!transactions.some((transaction) => transaction.steps.some((step) => containsTableStructure(step.toJSON())))) return null;
			const ranges = changedRanges(transactions);
			const changed = (position, size) => ranges.some(({ from, to }) => position < to && position + size > from);
			const survivingPositions = /* @__PURE__ */ new Map();
			oldState.doc.descendants((node, position) => {
				const key = node.attrs.emdashKey;
				if (typeof node.type.spec.tableRole !== "string" || !TABLE_NODE_ROLES.has(node.type.spec.tableRole) || typeof key !== "string" || key.length === 0) return;
				let mapped = position;
				for (const transaction of transactions) {
					const result = transaction.mapping.mapResult(mapped, 1);
					if (result.deleted) return false;
					mapped = result.pos;
				}
				const surviving = newState.doc.nodeAt(mapped);
				if (surviving?.type.spec.tableRole === node.type.spec.tableRole && surviving.attrs.emdashKey === key) {
					const positions = survivingPositions.get(key) ?? /* @__PURE__ */ new Set();
					positions.add(mapped);
					survivingPositions.set(key, positions);
				}
			});
			const topLevelSurvivorKeys = /* @__PURE__ */ new Set();
			for (const [key, positions] of survivingPositions) for (const position of positions) if (newState.doc.resolve(position).depth === 0 && newState.doc.nodeAt(position)?.type.spec.tableRole === "table") {
				topLevelSurvivorKeys.add(key);
				break;
			}
			const seenTopLevelTableKeys = /* @__PURE__ */ new Set();
			const untouchedTableKeys = /* @__PURE__ */ new Set();
			newState.doc.descendants((node, position) => {
				if (node.type.spec.tableRole !== "table") return;
				const key = node.attrs.emdashKey;
				if (typeof key === "string" && key.length > 0 && newState.doc.resolve(position).depth === 0 && !changed(position, node.nodeSize)) untouchedTableKeys.add(key);
				return false;
			});
			const repairs = [];
			newState.doc.descendants((node, position) => {
				if (node.type.spec.tableRole !== "table") return;
				if (!changed(position, node.nodeSize)) return false;
				const isTopLevelTable = newState.doc.resolve(position).depth === 0;
				const entries = [{
					node,
					position
				}];
				node.descendants((descendant, relativePosition) => {
					const role = descendant.type.spec.tableRole;
					if (typeof role === "string" && TABLE_NODE_ROLES.has(role)) entries.push({
						node: descendant,
						position: position + relativePosition + 1
					});
				});
				const reserved = new Set(entries.map((entry) => entry.node.attrs.emdashKey).filter((key) => typeof key === "string" && key.length > 0));
				const seen = /* @__PURE__ */ new Set();
				const survivingKeys = /* @__PURE__ */ new Set();
				for (const entry of entries) {
					const key = entry.node.attrs.emdashKey;
					if (typeof key === "string" && survivingPositions.get(key)?.has(entry.position)) survivingKeys.add(key);
				}
				for (const entry of entries) {
					const currentKey = typeof entry.node.attrs.emdashKey === "string" && entry.node.attrs.emdashKey.length > 0 ? entry.node.attrs.emdashKey : null;
					const duplicate = currentKey !== null && (seen.has(currentKey) || survivingKeys.has(currentKey) && !survivingPositions.get(currentKey)?.has(entry.position) || isTopLevelTable && entry.position === position && (seenTopLevelTableKeys.has(currentKey) || untouchedTableKeys.has(currentKey) || topLevelSurvivorKeys.has(currentKey) && !survivingPositions.get(currentKey)?.has(entry.position)));
					let emdashKey = currentKey;
					const isTopLevelEntry = isTopLevelTable && entry.position === position;
					if (!emdashKey || duplicate) for (;;) {
						emdashKey = createTableKey();
						if (!reserved.has(emdashKey) && !seen.has(emdashKey) && (!isTopLevelEntry || !seenTopLevelTableKeys.has(emdashKey) && !topLevelSurvivorKeys.has(emdashKey))) break;
					}
					seen.add(emdashKey);
					if (isTopLevelEntry) seenTopLevelTableKeys.add(emdashKey);
					if (!currentKey || duplicate) repairs.push({
						position: entry.position,
						attributes: {
							...entry.node.attrs,
							emdashKey
						}
					});
				}
				return false;
			});
			if (repairs.length === 0) return null;
			const transaction = newState.tr;
			for (const repair of repairs) transaction.setNodeMarkup(repair.position, void 0, repair.attributes);
			if (yPluginKeys(newState)?.sync.getState(newState)) return transaction;
			return transaction.setMeta("addToHistory", false);
		} })].map((plugin) => localOnly(plugin));
	}
});
/**
* Portable Text block keys in the editor's document. Each block's `_key` is
* held by the node it is saved from, so a block keeps its key from save to save.
*
* Server-safe: nothing here touches the DOM, React or `crypto` when loaded.
*/
function generateKey() {
	return Math.random().toString(36).substring(2, 11);
}
var TOP_LEVEL_BLOCKS = /* @__PURE__ */ new Set([
	"paragraph",
	"heading",
	"codeBlock",
	"htmlBlock",
	"iframeBlock",
	"videoBlock",
	"image",
	"gallery",
	"horizontalRule",
	"pluginBlock"
]);
/** The nodes that can hold a node that owns a key. */
var KEYED_CONTAINERS = /* @__PURE__ */ new Set([
	"blockquote",
	"bulletList",
	"orderedList",
	"listItem"
]);
/**
* Whether `node`, a child of `parent`, holds the `_key` of a Portable Text
* block: a top-level text block or block atom, or a list item's or quote's
* paragraph. Tables keep their keys in `emdashKey`.
*/
function ownsPortableTextKey(node, parent) {
	if (!parent) return false;
	if (parent.type === parent.type.schema.topNodeType) return TOP_LEVEL_BLOCKS.has(node.type.name);
	if (node.type.name !== "paragraph") return false;
	return parent.type.name === "listItem" || parent.type.name === "blockquote";
}
function keyOf(node) {
	const key = node.attrs[PORTABLE_TEXT_KEY_ATTR];
	return typeof key === "string" && key ? key : void 0;
}
var hasContent = (node) => !node.isTextblock || node.content.size > 0;
/**
* An empty last paragraph, such as TrailingNode's after a final block, isn't
* content: the converter drops it only while it has no key.
*/
function isTrailingParagraph(doc, pos, node) {
	return node.type.name === "paragraph" && node.childCount === 0 && pos + node.nodeSize === doc.content.size;
}
function assignPortableTextKeys(state, ranges) {
	const { doc } = state;
	const changed = /* @__PURE__ */ new Map();
	for (const { from, to } of ranges) doc.nodesBetween(from, to, (node, pos, parent) => {
		if (ownsPortableTextKey(node, parent)) changed.set(pos, node);
		return KEYED_CONTAINERS.has(node.type.name);
	});
	if (changed.size === 0) return null;
	const holders = /* @__PURE__ */ new Map();
	doc.descendants((node, pos, parent) => {
		const key = keyOf(node);
		if (key && ownsPortableTextKey(node, parent)) {
			const positions = holders.get(key);
			if (positions) positions.push(pos);
			else holders.set(key, [pos]);
		}
		return KEYED_CONTAINERS.has(node.type.name);
	});
	const needsKey = [];
	const dropsKey = [];
	for (const [pos, node] of changed) {
		const key = keyOf(node);
		if (isTrailingParagraph(doc, pos, node)) {
			if (key) dropsKey.push(pos);
			continue;
		}
		if (!key) {
			needsKey.push(pos);
			continue;
		}
		const positions = holders.get(key) ?? [];
		if (positions.length < 2) continue;
		if (pos !== (positions.some((position) => !changed.has(position)) ? void 0 : positions.find((position) => hasContent(changed.get(position))) ?? positions[0])) needsKey.push(pos);
	}
	if (needsKey.length === 0 && dropsKey.length === 0) return null;
	const transaction = state.tr;
	for (const pos of dropsKey) transaction.setNodeAttribute(pos, PORTABLE_TEXT_KEY_ATTR, null);
	const used = new Set(holders.keys());
	for (const pos of needsKey) {
		let key;
		do
			key = generateKey();
		while (used.has(key));
		used.add(key);
		transaction.setNodeAttribute(pos, PORTABLE_TEXT_KEY_ATTR, key);
	}
	return transaction;
}
var composes = (transaction) => Boolean(rootOf(transaction).getMeta("composition"));
var portableTextKeysPluginKey = new PluginKey("emdashPortableTextKeys");
/**
* Gives each block the local transactions created or changed a key of its
* own: a block with no key, or a copy of another block's, gets a new one.
* Splitting a block leaves the key with the half that keeps the text.
*
* Changing a block while an input method composes text in it ends the
* composition, so the ranges input method transactions change wait in the
* plugin's state until it has ended.
*/
function portableTextKeysPlugin() {
	return localOnly(new Plugin({
		key: portableTextKeysPluginKey,
		state: {
			init: () => [],
			apply(transaction, deferred) {
				if (transaction.getMeta(portableTextKeysPluginKey)) return [];
				const mapped = deferred.map(({ from, to }) => ({
					from: transaction.mapping.map(from, -1),
					to: transaction.mapping.map(to, 1)
				}));
				return composes(transaction) ? [...mapped, ...changedRanges([transaction])] : mapped;
			}
		},
		appendTransaction(transactions, _oldState, newState) {
			const deferred = portableTextKeysPluginKey.getState(newState) ?? [];
			const keyed = assignPortableTextKeys(newState, [...deferred, ...changedRanges(transactions)]);
			if (!keyed && deferred.length === 0) return null;
			const transaction = (keyed ?? newState.tr).setMeta(portableTextKeysPluginKey, true);
			if (newState.storedMarks) transaction.setStoredMarks(newState.storedMarks);
			if (transactions.every((tr) => rootOf(tr) !== tr)) transaction.setMeta("preventClearDocument", true);
			return transaction;
		},
		props: { handleDOMEvents: { compositionend(view) {
			setTimeout(() => {
				if (view.isDestroyed || view.composing) return;
				if (portableTextKeysPluginKey.getState(view.state)?.length) view.dispatch(view.state.tr);
			});
			return false;
		} } }
	}), (transactions) => !transactions.some(composes));
}
Extension.create({
	name: "emdashPortableTextKeys",
	addProseMirrorPlugins() {
		return [portableTextKeysPlugin()];
	}
});
/**
* The admin editor's ProseMirror schema, as the TipTap extensions it is built
* from. The editor extends these nodes with node views, commands and its own
* clipboard handling, so a document valid here is valid in the editor.
*
* Server-safe: nothing here touches the DOM, React or `crypto` when loaded.
*/
var URL_SCHEME_REGEX = /^[a-z][a-z0-9+.-]*:/i;
var WWW_PREFIX_REGEX = /^www\./i;
Extension.create({
	name: "emdashPortableTextIdentity",
	addGlobalAttributes() {
		const hiddenAttribute = {
			default: null,
			rendered: false
		};
		return [{
			types: [
				"paragraph",
				"heading",
				"blockquote",
				"codeBlock",
				"htmlBlock",
				"iframeBlock",
				"image",
				"videoBlock",
				"horizontalRule",
				"gallery",
				"table",
				"tableRow",
				"tableCell",
				"tableHeader",
				"pluginBlock",
				"hardBreak"
			],
			attributes: { [PORTABLE_TEXT_KEY_ATTR]: hiddenAttribute }
		}, {
			types: ["pluginBlock"],
			attributes: { [PORTABLE_TEXT_BLOCK_ATTR]: hiddenAttribute }
		}];
	}
});
Mark.create({
	name: PORTABLE_TEXT_SPAN_MARK,
	inclusive: false,
	spanning: false,
	addAttributes() {
		return {
			key: {
				default: null,
				rendered: false
			},
			markDefs: {
				default: [],
				rendered: false
			}
		};
	},
	parseHTML() {
		return [];
	},
	renderHTML() {
		return ["span", 0];
	}
});
var changedLastBlock = (transactions, oldState, newState) => transactions.some((transaction) => transaction.docChanged) && oldState.doc.lastChild !== newState.doc.lastChild;
StarterKit.extend({ addExtensions() {
	return (this.parent?.() ?? []).map((extension) => {
		if (extension.name === "blockquote") return extension.extend({ content: "paragraph*" });
		if (extension.name === "bulletList") return extension.extend({ content: "listItem*" });
		if (extension.name === "listItem") return extension.extend({ content: "(paragraph | bulletList | orderedList)*" });
		if (extension.name === "trailingNode") return withLocalOnlyPlugins(extension, changedLastBlock);
		if (extension.name === "link") return withLocalOnlyPlugins(extension);
		return extension;
	});
} }).configure({
	document: false,
	heading: { levels: [
		1,
		2,
		3,
		4,
		5,
		6
	] },
	dropcursor: {
		color: "#3b82f6",
		width: 2
	},
	codeBlock: false,
	code: false,
	orderedList: false,
	link: {
		shouldAutoLink: (url) => URL_SCHEME_REGEX.test(url) || WWW_PREFIX_REGEX.test(url),
		openOnClick: false,
		HTMLAttributes: {
			target: null,
			class: "text-kumo-link underline"
		}
	},
	underline: {}
});
Node.create({
	name: "doc",
	topNode: true,
	content: "(block | topBlock)+"
});
CodeBlock.configure({
	defaultLanguage: "plaintext",
	enableTabIndentation: true,
	tabSize: 4
});
Node.create({
	name: "htmlBlock",
	group: "topBlock",
	atom: true,
	draggable: false,
	selectable: true,
	addAttributes() {
		return {
			html: {
				default: "",
				parseHTML: (element) => element.getAttribute("data-html-content") ?? "",
				renderHTML: (attributes) => {
					const html = typeof attributes.html === "string" ? attributes.html : "";
					if (!html) return {};
					return { "data-html-content": html };
				}
			},
			css: {
				default: "",
				parseHTML: (element) => element.getAttribute("data-html-css") ?? "",
				renderHTML: (attributes) => typeof attributes.css === "string" && attributes.css ? { "data-html-css": attributes.css } : {}
			},
			js: {
				default: "",
				parseHTML: (element) => element.getAttribute("data-html-js") ?? "",
				renderHTML: (attributes) => typeof attributes.js === "string" && attributes.js ? { "data-html-js": attributes.js } : {}
			},
			isolated: { default: false }
		};
	},
	parseHTML() {
		return [{ tag: "div[data-html-block]" }];
	},
	renderHTML({ HTMLAttributes }) {
		return ["div", mergeAttributes(HTMLAttributes, { "data-html-block": "" })];
	}
});
Node.create({
	name: "iframeBlock",
	group: "topBlock",
	atom: true,
	draggable: false,
	selectable: true,
	addAttributes() {
		return {
			src: { default: "" },
			title: { default: "" },
			width: { default: null },
			height: { default: null },
			allow: { default: "" },
			allowFullscreen: { default: false }
		};
	},
	parseHTML() {
		return [{ tag: "div[data-iframe-block]" }];
	},
	renderHTML({ HTMLAttributes }) {
		return ["div", mergeAttributes(HTMLAttributes, { "data-iframe-block": "" })];
	}
});
function videoTextAttribute(name, attribute, fallback) {
	return {
		default: fallback,
		parseHTML: (element) => element.getAttribute(`data-video-${attribute}`) ?? fallback,
		renderHTML: (attributes) => {
			const value = attributes[name];
			return isString(value) && value ? { [`data-video-${attribute}`]: value } : {};
		}
	};
}
function videoNumberAttribute(name) {
	return {
		default: null,
		parseHTML: (element) => {
			const value = Number(element.getAttribute(`data-video-${name}`));
			return isDimension(value) ? value : null;
		},
		renderHTML: (attributes) => isDimension(attributes[name]) ? { [`data-video-${name}`]: String(attributes[name]) } : {}
	};
}
Node.create({
	name: "videoBlock",
	group: "topBlock",
	atom: true,
	draggable: false,
	selectable: true,
	addAttributes() {
		return {
			src: videoTextAttribute("src", "src", ""),
			mediaId: videoTextAttribute("mediaId", "media-id", null),
			provider: videoTextAttribute("provider", "provider", null),
			caption: videoTextAttribute("caption", "caption", ""),
			width: videoNumberAttribute("width"),
			height: videoNumberAttribute("height")
		};
	},
	parseHTML() {
		return [{ tag: "figure[data-video-block]" }];
	},
	renderHTML({ HTMLAttributes }) {
		return ["figure", mergeAttributes(HTMLAttributes, { "data-video-block": "" })];
	}
});
Node.create({
	name: "gallery",
	group: "block",
	atom: true,
	draggable: true,
	addAttributes() {
		return {
			images: { default: [] },
			columns: { default: null }
		};
	},
	parseHTML() {
		return [{ tag: "div[data-type=\"gallery\"]" }];
	},
	renderHTML() {
		return ["div", { "data-type": "gallery" }];
	}
});
Node.create({
	name: "image",
	addOptions() {
		return {
			inline: false,
			allowBase64: false,
			HTMLAttributes: {}
		};
	},
	inline() {
		return this.options.inline;
	},
	group() {
		return this.options.inline ? "inline" : "block";
	},
	draggable: true,
	addAttributes() {
		return {
			src: { default: null },
			alt: { default: null },
			title: { default: null },
			caption: { default: null },
			mediaId: { default: null },
			provider: { default: null },
			width: { default: null },
			height: { default: null },
			blurhash: { default: null },
			dominantColor: { default: null },
			displayWidth: { default: null },
			displayHeight: { default: null },
			alignment: { default: null },
			link: { default: null }
		};
	},
	parseHTML() {
		return [{ tag: "img[src]" }];
	},
	renderHTML({ HTMLAttributes }) {
		return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
	}
});
Node.create({
	name: "pluginBlock",
	group: "block",
	atom: true,
	draggable: true,
	selectable: true,
	addAttributes() {
		return {
			blockType: { default: null },
			id: { default: null },
			data: {
				default: {},
				parseHTML: (el) => JSON.parse(el.getAttribute("data-plugin-data") || "{}"),
				renderHTML: (attrs) => ({ "data-plugin-data": JSON.stringify(attrs.data) })
			}
		};
	},
	parseHTML() {
		return [{ tag: "div[data-plugin-block]" }];
	},
	renderHTML({ HTMLAttributes }) {
		return ["div", mergeAttributes(HTMLAttributes, { "data-plugin-block": "" })];
	}
});
Subscript.extend({ excludes: "superscript" });
Superscript.extend({ excludes: "subscript" });
EmDashTable.configure({
	allowTableNodeSelection: true,
	cellMinWidth: 96,
	resizable: false
});
TextAlign.configure({ types: ["heading", "paragraph"] });
var FILLED_DEFAULTS = {
	listItem: (schema) => schema.nodes.paragraph.create(),
	bulletList: (schema) => schema.nodes.listItem.create(null, schema.nodes.paragraph.create()),
	orderedList: (schema) => schema.nodes.listItem.create(null, schema.nodes.paragraph.create()),
	blockquote: (schema) => schema.nodes.paragraph.create(),
	tableCell: (schema) => schema.nodes.paragraph.create(),
	tableHeader: (schema) => schema.nodes.paragraph.create()
};
var isEmptyContent = (content) => !content || ("type" in content ? false : "size" in content ? content.size === 0 : content.length === 0);
/**
* Makes `createAndFill` fill the containers that may be empty as it did when
* they couldn't be, so commands that build them, such as `insertTable` and
* `splitListItem`, still leave a paragraph for the caret.
*/
function keepFilledDefaults(schema) {
	for (const [name, fill] of Object.entries(FILLED_DEFAULTS)) {
		const type = schema.nodes[name];
		if (!type) continue;
		const createAndFill = type.createAndFill.bind(type);
		type.createAndFill = (attrs, content, marks) => createAndFill(attrs, isEmptyContent(content) ? fill(schema) : content, marks);
	}
}
Extension.create({
	name: "emdashPortableTextFilledDefaults",
	onBeforeCreate() {
		keepFilledDefaults(this.editor.schema);
	}
});
export { findUnsupportedPortableTextMarks };
