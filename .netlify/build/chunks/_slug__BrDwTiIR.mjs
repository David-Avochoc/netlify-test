import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { _ as addAttribute, a as Fragment, b as unescapeHTML, c as renderSlot, d as renderTemplate, f as maybeRenderHead, i as renderComponent, t as spreadAttributes } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
import { c as renderScript, t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import "./slugify_PHKs_6uy.mjs";
import { a as getEmDashEntry } from "./query-CslUTGOV_Dwc0aJYy.mjs";
import { a as responsiveWidths, c as buildRenderMediaUrl, i as gallerySizes, l as localMediaFileUrl, n as getPublicOrigin, o as toAbsoluteMediaUrl, r as canOptimizeImage, s as getMediaProvider, t as $$EmDashImage } from "./EmDashImage_DWKmDmOs.mjs";
import { LIST_NEST_MODE_HTML, buildMarksTree, isPortableTextBlock, isPortableTextListItemBlock, isPortableTextToolkitList, isPortableTextToolkitSpan, isPortableTextToolkitTextNode, nestLists } from "@portabletext/toolkit";
import { n as getImage, s as $$Image$1 } from "./_astro_assets_Apbw_6vY.mjs";
import { a as HTML_BLOCK_FRAME_SANDBOX, c as SITE_HTML_ALLOWED_TAGS, d as htmlBlockFields, i as normalizePortableTextTable, l as SITE_HTML_IFRAME_HOSTS, n as createPortableTextTableCellMarkResolver, o as SITE_HTML_ALLOWED_ATTRIBUTES, r as getPortableTextTableColumnWidths, s as SITE_HTML_ALLOWED_SCHEMES, u as buildHtmlBlockFrame } from "./portable-text-table_DzMGQUwX.mjs";
import sanitizeHtml from "sanitize-html";
import { t as focalPointToObjectPosition } from "./focal-point_CmWLDffv.mjs";
import { r as isVideoBlock } from "./video-block_Dv21QuSq.mjs";
// node_modules/emdash/dist/slugify-sxuydlHd.mjs
/**
* Decode a URI-encoded slug parameter.
*
* Browsers percent-encode non-ASCII characters in URLs, so a slug like
* "మేష-రాసి" arrives as "%e0%b0%ae%e0%b1%87%e0%b0%b7-%e0%b0%b0%e0%b0%be%e0%b0%b8%e0%b0%bf".
* Call this on `Astro.params.slug` before using it in database lookups.
*/
function decodeSlug(raw) {
	if (!raw) return void 0;
	try {
		return decodeURIComponent(raw);
	} catch {
		return;
	}
}
// node_modules/astro-portabletext/lib/internal.ts
/**
* Returns true if `it` is component
*/
function isComponent(it) {
	return typeof it === "function";
}
/**
* Merges two {@link SomePortableTextComponents} objects, giving priority to overrides.
*
* This function combines two component objects used in Portable Text rendering.
* If both objects have the same key, the value from `overrides` takes precedence.
* This is useful for customizing the rendering of specific components while keeping
* the default behavior for others.
*
* @typeParam Components - The type of the base components object.
* @typeParam Overrides - The type of the overrides components object.
* @typeParam MergedComponents - The type of the resulting merged components object.
*
* @param components - The base components object.
* @param overrides - The overrides components object.
*
* @returns A new object with the merged components.
*/
function mergeComponents(components, overrides) {
	const cmps = { ...components };
	for (const [key, override] of Object.entries(overrides)) {
		const current = components[key];
		cmps[key] = !current || isComponent(override) || isComponent(current) ? override : {
			...current,
			...override
		};
	}
	return cmps;
}
// node_modules/astro-portabletext/lib/warnings.ts
var getTemplate = (prop, type) => `PortableText [components.${prop}] is missing "${type}"`;
var unknownTypeWarning = (type) => getTemplate("type", type);
var unknownMarkWarning = (markType) => getTemplate("mark", markType);
var unknownBlockWarning = (style) => getTemplate("block", style);
var unknownListWarning = (listItem) => getTemplate("list", listItem);
var unknownListItemWarning = (listStyle) => getTemplate("listItem", listStyle);
var getWarningMessage = (nodeType, type) => {
	return {
		block: unknownBlockWarning,
		list: unknownListWarning,
		listItem: unknownListItemWarning,
		mark: unknownMarkWarning,
		type: unknownTypeWarning
	}[nodeType](type);
};
function printWarning(message) {
	console.warn(message);
}
// node_modules/astro-portabletext/lib/context.ts
var key = Symbol("astro-portabletext");
/**
* This function returns rendering utility functions within a Portable Text tree. It should
* only be used within an Astro component that has been passed into the PortableText `components` prop.
* It follows a naming convention similar to React hooks, though it is not a hook as such.
*
* @param node - The Portable Text node that was passed into the Astro component
* @returns Rendering utility functions
*/
function usePortableText(node) {
	if (!(key in globalThis)) throw new Error(`PortableText "context" has not been initialised`);
	return globalThis[key](node);
}
// node_modules/astro-portabletext/components/Block.astro
createAstro("https://astro.build");
var $$Block$1 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Block$1;
	const props = Astro.props;
	const { node, index, isInline, ...attrs } = props;
	const styleIs = (style) => style === node.style;
	const { getUnknownComponent } = usePortableText(node);
	const UnknownStyle = getUnknownComponent();
	return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead($$result)}<h1${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`${renderComponent($$result, "UnknownStyle", UnknownStyle, { ...props }, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/Block.astro", void 0);
// node_modules/astro-portabletext/components/HardBreak.astro
var $$HardBreak = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<br>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/HardBreak.astro", void 0);
// node_modules/astro-portabletext/components/List.astro
createAstro("https://astro.build");
var $$List = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$List;
	const { node, index, isInline, ...attrs } = Astro.props;
	const listItemIs = (listItem) => listItem === node.listItem;
	return renderTemplate`${listItemIs("menu") ? renderTemplate`${maybeRenderHead($$result)}<menu${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</menu>` : listItemIs("number") ? renderTemplate`<ol${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ol>` : renderTemplate`<ul${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ul>`}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/List.astro", void 0);
// node_modules/astro-portabletext/components/ListItem.astro
createAstro("https://astro.build");
var $$ListItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ListItem;
	const { node, index, isInline, ...attrs } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<li${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/ListItem.astro", void 0);
// node_modules/astro-portabletext/components/Mark.astro
createAstro("https://astro.build");
var $$Mark = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Mark;
	const props = Astro.props;
	const { node, index, isInline, ...attrs } = props;
	const markTypeIs = (markType) => markType === node.markType;
	const { getUnknownComponent } = usePortableText(node);
	const UnknownMarkType = getUnknownComponent();
	return renderTemplate`${markTypeIs("code") ? renderTemplate`${maybeRenderHead($$result)}<code${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</code>` : markTypeIs("em") ? renderTemplate`<em${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</em>` : markTypeIs("link") ? renderTemplate`<a${addAttribute(node.markDef.href, "href")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</a>` : markTypeIs("strike-through") ? renderTemplate`<del${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</del>` : markTypeIs("strong") ? renderTemplate`<strong${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</strong>` : markTypeIs("underline") ? renderTemplate`<span style="text-decoration: underline;"${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`${renderComponent($$result, "UnknownMarkType", UnknownMarkType, { ...props }, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/Mark.astro", void 0);
// node_modules/astro-portabletext/components/Text.astro
createAstro("https://astro.build");
var $$Text = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Text;
	const { node } = Astro.props;
	return renderTemplate`${node.text}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/Text.astro", void 0);
// node_modules/astro-portabletext/components/UnknownBlock.astro
var $$UnknownBlock = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<p data-portabletext-unknown="block">${renderSlot($$result, $$slots["default"])}</p>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/UnknownBlock.astro", void 0);
// node_modules/astro-portabletext/components/UnknownList.astro
var $$UnknownList = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<ul data-portabletext-unknown="list">${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/UnknownList.astro", void 0);
// node_modules/astro-portabletext/components/UnknownListItem.astro
var $$UnknownListItem = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<li data-portabletext-unknown="listitem">${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/UnknownListItem.astro", void 0);
// node_modules/astro-portabletext/components/UnknownMark.astro
var $$UnknownMark = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<span data-portabletext-unknown="mark">${renderSlot($$result, $$slots["default"])}</span>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/UnknownMark.astro", void 0);
// node_modules/astro-portabletext/components/UnknownType.astro
createAstro("https://astro.build");
var $$UnknownType = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UnknownType;
	const { node, isInline } = Astro.props;
	const warning = getWarningMessage("type", node._type);
	return renderTemplate`${isInline ? renderTemplate`${maybeRenderHead($$result)}<span style="display:none" data-portabletext-unknown="type">${warning}</span>` : renderTemplate`<div style="display:none" data-portabletext-unknown="type">${warning}</div>`}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/UnknownType.astro", void 0);
// node_modules/astro-portabletext/components/PortableText.astro
createAstro("https://astro.build");
var $$PortableText$1 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PortableText$1;
	const { value, components: componentOverrides = {}, listNestingMode = LIST_NEST_MODE_HTML, onMissingComponent = true } = Astro.props;
	const components = mergeComponents({
		type: {},
		unknownType: $$UnknownType,
		block: {
			h1: $$Block$1,
			h2: $$Block$1,
			h3: $$Block$1,
			h4: $$Block$1,
			h5: $$Block$1,
			h6: $$Block$1,
			blockquote: $$Block$1,
			normal: $$Block$1
		},
		unknownBlock: $$UnknownBlock,
		list: {
			bullet: $$List,
			number: $$List,
			menu: $$List
		},
		unknownList: $$UnknownList,
		listItem: {
			bullet: $$ListItem,
			number: $$ListItem,
			menu: $$ListItem
		},
		unknownListItem: $$UnknownListItem,
		mark: {
			code: $$Mark,
			em: $$Mark,
			link: $$Mark,
			"strike-through": $$Mark,
			strong: $$Mark,
			underline: $$Mark
		},
		unknownMark: $$UnknownMark,
		text: $$Text,
		hardBreak: $$HardBreak
	}, componentOverrides);
	const noop = () => {};
	const missingComponentHandler = ((handler) => {
		if (typeof handler === "function") return handler;
		return !handler ? noop : printWarning;
	})(onMissingComponent);
	const asComponentProps = (node, index, isInline) => ({
		node,
		index,
		isInline
	});
	const provideComponent = (nodeType, type, fallbackComponent) => {
		const component = ((component) => {
			return component[type] || component;
		})(components[nodeType]);
		if (isComponent(component)) return component;
		missingComponentHandler(getWarningMessage(nodeType, type), {
			nodeType,
			type
		});
		return fallbackComponent;
	};
	const cachedNodes = /* @__PURE__ */ new WeakMap();
	function cacheNode(node, Default, Unknown) {
		cachedNodes.set(node, {
			Default,
			Unknown
		});
	}
	let fallbackRenderOptions;
	const portableTextRender = (options, isInline) => {
		if (!fallbackRenderOptions) throw new Error("[PortableText portableTextRender] fallbackRenderOptions is undefined");
		const renderChildren = (children, inline = false) => {
			return children?.map(portableTextRender(options, inline)) ?? [];
		};
		const renderOptions = {
			...fallbackRenderOptions,
			...options ?? {}
		};
		return function renderNode(node, index) {
			function run(handler, props) {
				if (!isComponent(handler)) throw new Error(`[PortableText render] No handler found for node type ${node._type}.`);
				return handler(props);
			}
			if (isPortableTextToolkitList(node)) {
				const UnknownComponent = components.unknownList ?? $$UnknownList;
				cacheNode(node, $$List, UnknownComponent);
				return run(renderOptions.list, {
					Component: provideComponent("list", node.listItem, UnknownComponent),
					props: asComponentProps(node, index, false),
					children: renderChildren(node.children, false)
				});
			}
			if (isPortableTextListItemBlock(node)) {
				const { listItem, ...blockNode } = node;
				const isStyled = node.style && node.style !== "normal";
				node.children = isStyled ? renderNode(blockNode, index) : buildMarksTree(node);
				const UnknownComponent = components.unknownListItem ?? $$UnknownListItem;
				cacheNode(node, $$ListItem, UnknownComponent);
				return run(renderOptions.listItem, {
					Component: provideComponent("listItem", node.listItem, UnknownComponent),
					props: asComponentProps(node, index, false),
					children: isStyled ? node.children : renderChildren(node.children, true)
				});
			}
			if (isPortableTextToolkitSpan(node)) {
				const UnknownComponent = components.unknownMark ?? $$UnknownMark;
				cacheNode(node, $$Mark, UnknownComponent);
				return run(renderOptions.mark, {
					Component: provideComponent("mark", node.markType, UnknownComponent),
					props: asComponentProps(node, index, true),
					children: renderChildren(node.children, true)
				});
			}
			if (isPortableTextBlock(node)) {
				node.style ??= "normal";
				node.children = buildMarksTree(node);
				const UnknownComponent = components.unknownBlock ?? $$UnknownBlock;
				cacheNode(node, $$Block$1, UnknownComponent);
				return run(renderOptions.block, {
					Component: provideComponent("block", node.style, UnknownComponent),
					props: asComponentProps(node, index, false),
					children: renderChildren(node.children, true)
				});
			}
			if (isPortableTextToolkitTextNode(node)) {
				const isHardBreak = "\n" === node.text;
				const props = asComponentProps(node, index, true);
				if (isHardBreak) return run(renderOptions.hardBreak, {
					Component: isComponent(components.hardBreak) ? components.hardBreak : $$HardBreak,
					props
				});
				return run(renderOptions.text, {
					Component: isComponent(components.text) ? components.text : $$Text,
					props
				});
			}
			const UnknownComponent = components.unknownType ?? $$UnknownType;
			return run(renderOptions.type, {
				Component: provideComponent("type", node._type, UnknownComponent),
				props: asComponentProps(node, index, isInline ?? false)
			});
		};
	};
	globalThis[key] = (node) => ({
		getDefaultComponent: provideDefaultComponent.bind(null, node),
		getUnknownComponent: provideUnknownComponent.bind(null, node),
		render: (options) => node.children?.map(portableTextRender(options))
	});
	const provideDefaultComponent = (node) => {
		const DefaultComponent = cachedNodes.get(node)?.Default;
		if (DefaultComponent) return DefaultComponent;
		if (isPortableTextToolkitList(node)) return $$List;
		if (isPortableTextListItemBlock(node)) return $$ListItem;
		if (isPortableTextToolkitSpan(node)) return $$Mark;
		if (isPortableTextBlock(node)) return $$Block$1;
		if (isPortableTextToolkitTextNode(node)) return "\n" === node.text ? $$HardBreak : $$Text;
		return $$UnknownType;
	};
	const provideUnknownComponent = (node) => {
		const UnknownComponent = cachedNodes.get(node)?.Unknown;
		if (UnknownComponent) return UnknownComponent;
		if (isPortableTextToolkitList(node)) return components.unknownList ?? $$UnknownList;
		if (isPortableTextListItemBlock(node)) return components.unknownListItem ?? $$UnknownListItem;
		if (isPortableTextToolkitSpan(node)) return components.unknownMark ?? $$UnknownMark;
		if (isPortableTextBlock(node)) return components.unknownBlock ?? $$UnknownBlock;
		if (!isPortableTextToolkitTextNode(node)) return components.unknownType ?? $$UnknownType;
		throw new Error(`[PortableText getUnknownComponent] Unable to provide component with node type ${node._type}`);
	};
	const nodes = nestLists(Array.isArray(value) ? value : value ? [value] : [], listNestingMode);
	const render = (options) => {
		fallbackRenderOptions = options;
		return portableTextRender(options);
	};
	const createSlotRenderer = (slotName) => Astro.slots.render.bind(Astro.slots, slotName);
	const slots = [
		"type",
		"block",
		"list",
		"listItem",
		"mark",
		"text",
		"hardBreak"
	].reduce((obj, name) => {
		obj[name] = Astro.slots.has(name) ? createSlotRenderer(name) : void 0;
		return obj;
	}, {});
	return renderTemplate`${(() => {
		const renderNode = (slotRenderer) => {
			return ({ Component, props, children }) => slotRenderer?.([{
				Component,
				props,
				children
			}]) ?? renderTemplate`${renderComponent($$result, "Component", Component, { ...props }, { "default": ($$result) => renderTemplate`${children}` })}`;
		};
		return nodes.map(render({
			type: renderNode(slots.type),
			block: renderNode(slots.block),
			list: renderNode(slots.list),
			listItem: renderNode(slots.listItem),
			mark: renderNode(slots.mark),
			text: renderNode(slots.text),
			hardBreak: renderNode(slots.hardBreak)
		}));
	})()}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/astro-portabletext/components/PortableText.astro", void 0);
function normalizeListId(value) {
	if (typeof value !== "string") return void 0;
	const normalized = value.trim();
	return normalized.length > 0 && normalized.length <= 128 ? normalized : void 0;
}
function normalizeListStart(value) {
	return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 0x7fffffff ? value : void 0;
}
function deriveLegacyListId(seed) {
	const readable = `legacy:${seed}`;
	if (readable.length <= 128) return readable;
	let hash = 0x811c9dc5;
	for (let i = 0; i < seed.length; i++) {
		hash ^= seed.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return `legacy:${seed.slice(0, 96)}:${(hash >>> 0).toString(36)}:${seed.length.toString(36)}`;
}
// node_modules/emdash/src/content/portable-text-lists.ts
function isListBlock(node) {
	return node._type === "block" && typeof node.listItem === "string" && Array.isArray(node.children);
}
function readLevel(value) {
	return typeof value === "number" && Number.isInteger(value) && value >= 1 ? value : 1;
}
function findParentItem(items, level) {
	let nearestLevel = 0;
	let nearest;
	for (const [candidate, item] of items) if (candidate < level && candidate > nearestLevel) {
		nearestLevel = candidate;
		nearest = item;
	}
	return nearest;
}
function matchesList(descriptor, listItem, sourceId, parentContext) {
	return descriptor !== void 0 && descriptor.node.listItem === listItem && descriptor.parentContext === parentContext && (listItem !== "number" || descriptor.sourceId === sourceId);
}
function buildListTree(blocks, mode) {
	const tree = [];
	const descriptors = [];
	const activeLists = /* @__PURE__ */ new Map();
	const lastItems = /* @__PURE__ */ new Map();
	let segment = 0;
	for (let index = 0; index < blocks.length; index++) {
		const block = blocks[index];
		if (!isListBlock(block)) {
			tree.push(block);
			activeLists.clear();
			lastItems.clear();
			continue;
		}
		const level = readLevel(block.level);
		for (const activeLevel of activeLists.keys()) if (activeLevel > level) activeLists.delete(activeLevel);
		for (const itemLevel of lastItems.keys()) if (itemLevel > level) lastItems.delete(itemLevel);
		const parent = findParentItem(lastItems, level);
		const parentContext = parent?.context ?? "root";
		const sourceId = block.listItem === "number" ? normalizeListId(block.listId) : void 0;
		let descriptor = activeLists.get(level);
		if (!matchesList(descriptor, block.listItem, sourceId, parentContext)) {
			const node = {
				_type: "@list",
				_key: `${typeof block._key === "string" ? block._key : index}-parent`,
				children: [],
				level,
				listItem: block.listItem,
				mode
			};
			descriptor = {
				node,
				directItems: [],
				level,
				parentContext,
				sourceId,
				segment: segment++
			};
			descriptors.push(descriptor);
			activeLists.set(level, descriptor);
			if (!parent) tree.push(node);
			else if (mode === "direct") parent.list.node.children.push(node);
			else parent.rendered.children.push(node);
		}
		const rendered = {
			...block,
			children: [...block.children]
		};
		descriptor.node.children.push(rendered);
		descriptor.directItems.push({
			original: block,
			rendered
		});
		lastItems.set(level, {
			context: `${parentContext}/item:${index}`,
			list: descriptor,
			rendered
		});
	}
	return {
		tree,
		descriptors
	};
}
function applyNumbering(descriptors) {
	const bases = /* @__PURE__ */ new Map();
	const scopeKeys = /* @__PURE__ */ new Map();
	for (const descriptor of descriptors) {
		if (descriptor.node.listItem !== "number") continue;
		const identity = descriptor.sourceId ?? deriveLegacyListId(`render:${descriptor.segment}:${descriptor.level}:${descriptor.parentContext}`);
		const scope = JSON.stringify([
			identity,
			descriptor.level,
			descriptor.parentContext
		]);
		scopeKeys.set(descriptor, scope);
		if (!descriptor.sourceId || bases.has(scope)) continue;
		for (const { original } of descriptor.directItems) {
			const base = normalizeListStart(original.listStart);
			if (base === void 0) continue;
			bases.set(scope, base);
			break;
		}
	}
	const counts = /* @__PURE__ */ new Map();
	for (const descriptor of descriptors) {
		if (descriptor.node.listItem !== "number") continue;
		const scope = scopeKeys.get(descriptor);
		const base = bases.get(scope) ?? 1;
		const count = counts.get(scope) ?? 0;
		descriptor.node.start = normalizeListStart(base + count) ?? 1;
		counts.set(scope, count + descriptor.directItems.length);
	}
}
function preprocessLists(blocks, mode) {
	const result = buildListTree(blocks, mode);
	applyNumbering(result.descriptors);
	return result;
}
function clonePortableTextValue(value) {
	return structuredClone(value);
}
function buildPortableTextListTree(blocks, mode = "html") {
	return preprocessLists(blocks, mode).tree;
}
// node_modules/emdash/src/query.ts
/** Symbol key for edit metadata on PT arrays — avoids collision with user data */
var EMDASH_EDIT = Symbol.for("__emdash");
/** Type guard for EditFieldMeta */
function isEditFieldMeta(value) {
	if (typeof value !== "object" || value === null) return false;
	if (!("collection" in value) || !("id" in value) || !("field" in value)) return false;
	const { collection, id, field } = value;
	return typeof collection === "string" && typeof id === "string" && typeof field === "string";
}
/**
* Read edit metadata from a value (returns undefined if not tagged).
* Uses Object.getOwnPropertyDescriptor to access Symbol-keyed property
* without an unsafe type assertion.
*/
function getEditMeta(value) {
	if (value && typeof value === "object") {
		const meta = Object.getOwnPropertyDescriptor(value, EMDASH_EDIT)?.value;
		if (isEditFieldMeta(meta)) return meta;
	}
}
var URL_PATTERN_CACHE_KEY = Symbol.for("emdash:url-pattern-cache");
var queryGlobal = globalThis;
queryGlobal[URL_PATTERN_CACHE_KEY] ?? (() => {
	const cache = { patterns: null };
	queryGlobal[URL_PATTERN_CACHE_KEY] = cache;
	return cache;
})();
// \0virtual:emdash/block-components
var pluginBlockComponents = {};
// node_modules/emdash/src/components/InlineEditor.astro
createAstro("https://astro.build");
var $$InlineEditor = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$InlineEditor;
	const { value, collection, entryId, field, tablePlaceholder } = Astro.props;
	return renderTemplate`${renderComponent($$result, "InlinePortableTextEditor", null, {
		"client:only": "react",
		"value": value,
		"collection": collection,
		"entryId": entryId,
		"field": field,
		"tablePlaceholder": tablePlaceholder,
		"client:component-hydration": "only",
		"client:component-path": "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/InlinePortableTextEditor.tsx",
		"client:component-export": "InlinePortableTextEditor"
	})}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/InlineEditor.astro", void 0);
// node_modules/emdash/src/components/portable-text-blockquote-group.ts
function isBlockquoteBlock(block) {
	if (typeof block !== "object" || block === null) return false;
	const b = block;
	return b._type === "block" && b.style === "blockquote" && b.listItem === void 0;
}
function groupBlockquoteRuns(blocks) {
	const result = [];
	let i = 0;
	while (i < blocks.length) {
		const current = blocks[i];
		if (!isBlockquoteBlock(current)) {
			result.push(current);
			i++;
			continue;
		}
		const run = [];
		let next = current;
		while (i < blocks.length && isBlockquoteBlock(next)) {
			run.push(next);
			i++;
			next = blocks[i];
		}
		if (run.length === 1) result.push(run[0]);
		else {
			const group = {
				_type: "blockquoteGroup",
				_key: `${run[0]?._key ?? "quote"}-group`,
				blocks: run
			};
			result.push(group);
		}
	}
	return result;
}
// node_modules/emdash/src/components/PortableText.astro
createAstro("https://astro.build");
var $$PortableText = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PortableText;
	const { value = [], components: userComponents, listNestingMode = "html", tablePlaceholder, ...rest } = Astro.props;
	const editMeta = getEditMeta(value);
	const withPlugins = mergeComponents(emdashComponents, { type: pluginBlockComponents });
	const mergedComponents = userComponents ? mergeComponents(withPlugins, userComponents) : withPlugins;
	let renderValue = value;
	if (!editMeta) renderValue = buildPortableTextListTree(groupBlockquoteRuns(clonePortableTextValue(Array.isArray(value) ? value : value ? [value] : [])), listNestingMode);
	return renderTemplate`${editMeta ? renderTemplate`${renderComponent($$result, "InlineEditor", $$InlineEditor, {
		"value": Array.isArray(value) ? value : [value],
		"collection": editMeta.collection,
		"entryId": editMeta.id,
		"field": editMeta.field,
		"tablePlaceholder": tablePlaceholder
	})}` : renderTemplate`${renderComponent($$result, "BasePortableText", $$PortableText$1, {
		"value": renderValue,
		"components": mergedComponents,
		"listNestingMode": listNestingMode,
		...rest
	})}`}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/PortableText.astro", void 0);
// node_modules/emdash/src/components/Blocks.astro
createAstro("https://astro.build");
// node_modules/emdash/src/utils/url.ts
/**
* URL scheme validation utilities
*
* Prevents XSS via dangerous URL schemes (javascript:, data:, vbscript:, etc.)
* by allowlisting known-safe schemes before rendering into href attributes.
*/
/**
* Matches URLs that are safe to render in href attributes.
*
* Allowed:
* - http:// and https://
* - mailto: and tel:
* - Relative paths (starting with /)
* - Fragment links (starting with #)
* - Protocol-relative URLs are NOT allowed (starting with //) as they can
*   redirect to attacker-controlled hosts.
*/
var SAFE_ABSOLUTE_URL_RE = /^(https?:|mailto:|tel:)/i;
var SITE_RELATIVE_HREF_RE = /^(\/(?![/\\])|#)/;
var URL_BASE = new URL("https://emdash.invalid/");
function containsHrefControl(value) {
	for (const character of value) {
		const codePoint = character.codePointAt(0);
		if (codePoint !== void 0 && (codePoint <= 31 || codePoint === 127)) return true;
	}
	return false;
}
function resolvesOnSite(value) {
	try {
		return new URL(value, URL_BASE).origin === URL_BASE.origin;
	} catch {
		return false;
	}
}
/**
* Returns the URL unchanged if it uses a safe scheme, otherwise returns "#".
*
* Use this at the render layer as the primary defense against XSS via
* dangerous URL schemes like `javascript:`, `data:`, or `vbscript:`.
*
* @example
* ```ts
* sanitizeHref("https://example.com")        // "https://example.com"
* sanitizeHref("/about")                      // "/about"
* sanitizeHref("#section")                    // "#section"
* sanitizeHref("mailto:a@b.com")              // "mailto:a@b.com"
* sanitizeHref("javascript:alert(1)")         // "#"
* sanitizeHref("data:text/html,<script>")     // "#"
* sanitizeHref("")                            // "#"
* ```
*/
function sanitizeHref(url) {
	if (!url) return "#";
	return isSafeHref(url) ? url : "#";
}
/**
* Returns true if the URL uses a safe scheme for rendering in href attributes.
*/
function isSafeHref(url) {
	if (containsHrefControl(url)) return false;
	if (SAFE_ABSOLUTE_URL_RE.test(url)) return URL.canParse(url);
	return SITE_RELATIVE_HREF_RE.test(url) && resolvesOnSite(url);
}
// node_modules/emdash/src/components/widgets/RecentPosts.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/widgets/Categories.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/widgets/Tags.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/widgets/Search.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/widgets/Archives.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/WidgetRenderer.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/WidgetArea.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/EmDashMedia.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/portable-text-text-align.ts
var ALIGN_CLASS_MAP = {
	center: "has-text-align-center",
	right: "has-text-align-right",
	justify: "has-text-align-justify"
};
/**
* Returns the CSS class for a textAlign value, or `undefined` when no class
* should be emitted (default left, missing, or unknown values).
*
* Allowlist-only by design: arbitrary strings are rejected so a hand-edited
* or imported Portable Text block cannot inject attacker-controlled class
* names into the rendered HTML.
*/
function textAlignClassName(value) {
	if (value === void 0) return void 0;
	if (Object.hasOwn(ALIGN_CLASS_MAP, value)) return ALIGN_CLASS_MAP[value];
}
// node_modules/emdash/src/components/Block.astro
createAstro("https://astro.build");
var $$Block = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Block;
	const { node, index: _index, isInline: _isInline, ...attrs } = Astro.props;
	const styleIs = (style) => style === node.style;
	const alignClass = textAlignClassName(node.textAlign);
	return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead($$result)}<h1${addAttribute(alignClass, "class")}${spreadAttributes(attrs)} data-astro-cid-44ocxh3s>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${addAttribute(alignClass, "class")}${spreadAttributes(attrs)} data-astro-cid-44ocxh3s>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${addAttribute(alignClass, "class")}${spreadAttributes(attrs)} data-astro-cid-44ocxh3s>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${addAttribute(alignClass, "class")}${spreadAttributes(attrs)} data-astro-cid-44ocxh3s>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${addAttribute(alignClass, "class")}${spreadAttributes(attrs)} data-astro-cid-44ocxh3s>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${addAttribute(alignClass, "class")}${spreadAttributes(attrs)} data-astro-cid-44ocxh3s>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${addAttribute(alignClass, "class")}${spreadAttributes(attrs)} data-astro-cid-44ocxh3s>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${addAttribute(alignClass, "class")}${spreadAttributes(attrs)} data-astro-cid-44ocxh3s>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`<p${addAttribute(alignClass, "class")}${spreadAttributes(attrs)} data-astro-cid-44ocxh3s>${renderSlot($$result, $$slots["default"])}</p>`}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Block.astro", void 0);
// node_modules/emdash/src/content/converters/image-link.ts
function normalizeImageLink(raw) {
	if (typeof raw === "string") {
		const href = raw.trim();
		return href ? { href } : null;
	}
	if (typeof raw !== "object" || raw === null) return null;
	const { href, blank } = raw;
	if (typeof href !== "string") return null;
	const trimmed = href.trim();
	if (!trimmed) return null;
	return blank === true ? {
		href: trimmed,
		blank: true
	} : { href: trimmed };
}
// node_modules/emdash/src/content/converters/gallery.ts
/**
* Shared sanitization for gallery block images and image media, used by both
* converters so the editor round-trip and the stored shape stay in lockstep.
*/
/**
* Read an image's media reference, alt text, and dimensions. Accepts the
* reference shape (`_ref`, `url`) and the MediaValue that seeded `$media`
* stores instead (`id`, `src`, `meta.storageKey`, dimensions). The image's own
* `alt`, `width`, and `height` take precedence over the asset's.
*/
function resolveImageMedia(image) {
	const record = isRecord(image) ? image : {};
	const asset = isRecord(record.asset) ? record.asset : {};
	const storageKey = isRecord(asset.meta) ? nonEmptyString(asset.meta.storageKey) : void 0;
	const url = nonEmptyString(asset.url) ?? nonEmptyString(asset.src) ?? (storageKey ? localMediaFileUrl(storageKey) : void 0);
	const provider = nonEmptyString(asset.provider);
	const alt = nonEmptyString(record.alt) ?? nonEmptyString(asset.alt);
	const width = typeof record.width === "number" ? record.width : asset.width;
	const height = typeof record.height === "number" ? record.height : asset.height;
	const media = { asset: {
		_type: "reference",
		_ref: nonEmptyString(asset._ref) ?? nonEmptyString(asset.id) ?? "",
		...url ? { url } : {},
		...provider ? { provider } : {}
	} };
	if (alt) media.alt = alt;
	if (typeof width === "number") media.width = width;
	if (typeof height === "number") media.height = height;
	return media;
}
/**
* Normalize an untrusted `images` value into well-formed gallery images.
* Non-object entries and entries without an asset object are dropped.
* Missing `_key`s are filled via `generateKey` when provided (PM → PT);
* left empty otherwise (PT → PM keeps whatever the block carried).
*/
function sanitizeGalleryImages(value, generateKey) {
	if (!Array.isArray(value)) return [];
	const images = [];
	for (const entry of value) {
		if (!isRecord(entry)) continue;
		const record = entry;
		if (!isRecord(record.asset)) continue;
		const { asset, alt, width, height } = resolveImageMedia(record);
		const image = {
			_type: "image",
			_key: typeof record._key === "string" && record._key ? record._key : generateKey ? generateKey() : "",
			asset
		};
		if (alt) image.alt = alt;
		if (typeof record.caption === "string" && record.caption) image.caption = record.caption;
		if (width !== void 0) image.width = width;
		if (height !== void 0) image.height = height;
		if (typeof record.focalX === "number") image.focalX = record.focalX;
		if (typeof record.focalY === "number") image.focalY = record.focalY;
		if (typeof record.blurhash === "string" && record.blurhash) image.blurhash = record.blurhash;
		if (typeof record.dominantColor === "string" && record.dominantColor) image.dominantColor = record.dominantColor;
		images.push(image);
	}
	return images;
}
function nonEmptyString(value) {
	return typeof value === "string" && value ? value : void 0;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
// node_modules/emdash/src/components/Image.astro
createAstro("https://astro.build");
var $$Image = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Image;
	function generateSrcset(getSrc, maxWidth, aspectRatio, originalWidth) {
		return responsiveWidths(maxWidth, originalWidth).map((w) => {
			return `${getSrc({
				width: w,
				height: aspectRatio ? Math.round(w / aspectRatio) : void 0
			})} ${w}w`;
		}).join(", ");
	}
	const { node, placeholder = true } = Astro.props;
	if (!node?.asset) return null;
	const { caption, title, displayWidth, displayHeight, alignment, link } = node;
	const { asset, alt = "", width, height } = resolveImageMedia(node);
	const dimension = (value) => typeof value === "number" && Number.isFinite(value) && value > 0 ? value : void 0;
	const originalWidth = dimension(width);
	const originalHeight = dimension(height);
	const customWidth = dimension(displayWidth);
	const customHeight = dimension(displayHeight);
	const imageLink = normalizeImageLink(link);
	const linkHref = imageLink ? sanitizeHref(imageLink.href) : null;
	const linkBlank = !(linkHref?.startsWith("#") ?? false) && imageLink?.blank === true;
	const linkTarget = linkBlank ? "_blank" : void 0;
	const linkRel = linkBlank ? "noopener noreferrer" : void 0;
	const aspectRatio = originalWidth && originalHeight ? originalWidth / originalHeight : void 0;
	let renderWidth;
	let renderHeight;
	if (customWidth && customHeight) {
		renderWidth = customWidth;
		renderHeight = customHeight;
	} else if (customWidth && aspectRatio) {
		renderWidth = customWidth;
		renderHeight = Math.round(customWidth / aspectRatio);
	} else if (customHeight && aspectRatio) {
		renderWidth = Math.round(customHeight * aspectRatio);
		renderHeight = customHeight;
	} else {
		renderWidth = originalWidth;
		renderHeight = originalHeight;
	}
	let src = "";
	let srcset;
	let sizes;
	let astroImageSrc = "";
	const providerId = asset.provider;
	if (providerId && providerId !== "local") {
		const provider = await getMediaProvider(providerId);
		if (provider) try {
			const mediaValue = {
				provider: providerId,
				id: asset._ref,
				width: renderWidth,
				height: renderHeight,
				alt
			};
			const result = provider.getEmbed(mediaValue, {
				width: renderWidth,
				height: renderHeight
			});
			const embed = result instanceof Promise ? await result : result;
			if (embed.type === "image") {
				src = embed.src;
				if (embed.getSrc) {
					const maxWidth = renderWidth || 1200;
					const ar = renderWidth && renderHeight ? renderWidth / renderHeight : aspectRatio;
					srcset = generateSrcset(embed.getSrc, maxWidth, ar, originalWidth);
					sizes = renderWidth ? `(min-width: ${renderWidth}px) ${renderWidth}px, 100vw` : "100vw";
				}
			}
		} catch (error) {
			console.warn(`Failed to get embed for image ${asset._ref}:`, error);
		}
	}
	if (!src) {
		src = buildRenderMediaUrl(Astro.locals.emdash?.getPublicMediaUrl, {
			url: asset.url,
			id: asset._ref
		});
		if (renderWidth && renderHeight) {
			const absoluteSrc = toAbsoluteMediaUrl(src, getPublicOrigin(Astro.url, Astro.locals.emdash?.config));
			if (await canOptimizeImage(getImage, {
				src: absoluteSrc,
				width: renderWidth,
				height: renderHeight
			})) astroImageSrc = absoluteSrc;
		}
	}
	const blurhash = node.blurhash ?? node.asset.meta?.blurhash;
	const dominantColor = node.dominantColor ?? node.asset.meta?.dominantColor;
	let placeholderStyle = "";
	if (placeholder && blurhash) {
		const { blurhashToImageCssString } = await import("@unpic/placeholder");
		placeholderStyle = blurhashToImageCssString(blurhash);
	} else if (placeholder && dominantColor) placeholderStyle = `background-color: ${dominantColor};`;
	return renderTemplate`${maybeRenderHead($$result)}<figure${addAttribute(["emdash-image", alignment && `emdash-image--align-${alignment}`], "class:list")} data-astro-cid-nzlefzml>${linkHref ? renderTemplate`<a${addAttribute(linkHref, "href")}${addAttribute(linkTarget, "target")}${addAttribute(linkRel, "rel")} data-astro-cid-nzlefzml>${astroImageSrc ? renderTemplate`${renderComponent($$result, "AstroImage", $$Image$1, {
		"src": astroImageSrc,
		"alt": alt,
		"title": title,
		"width": renderWidth,
		"height": renderHeight,
		"layout": "constrained",
		"loading": "lazy",
		"decoding": "async",
		"style": placeholderStyle || void 0,
		"data-astro-cid-nzlefzml": true
	})}` : renderTemplate`<img${addAttribute(src, "src")}${addAttribute(srcset, "srcset")}${addAttribute(sizes, "sizes")}${addAttribute(alt, "alt")}${addAttribute(title, "title")}${addAttribute(renderWidth, "width")}${addAttribute(renderHeight, "height")} loading="lazy" decoding="async"${addAttribute(placeholderStyle || void 0, "style")} data-astro-cid-nzlefzml>`}</a>` : astroImageSrc ? renderTemplate`${renderComponent($$result, "AstroImage", $$Image$1, {
		"src": astroImageSrc,
		"alt": alt,
		"title": title,
		"width": renderWidth,
		"height": renderHeight,
		"layout": "constrained",
		"loading": "lazy",
		"decoding": "async",
		"style": placeholderStyle || void 0,
		"data-astro-cid-nzlefzml": true
	})}` : renderTemplate`<img${addAttribute(src, "src")}${addAttribute(srcset, "srcset")}${addAttribute(sizes, "sizes")}${addAttribute(alt, "alt")}${addAttribute(title, "title")}${addAttribute(renderWidth, "width")}${addAttribute(renderHeight, "height")} loading="lazy" decoding="async"${addAttribute(placeholderStyle || void 0, "style")} data-astro-cid-nzlefzml>`}${caption && renderTemplate`<figcaption data-astro-cid-nzlefzml>${caption}</figcaption>`}</figure>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Image.astro", void 0);
// node_modules/emdash/src/components/Code.astro
createAstro("https://astro.build");
var $$Code = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Code;
	const { node } = Astro.props;
	if (!node?.code) return null;
	const { code, language, filename } = node;
	const languageClass = language ? `language-${language}` : "";
	const label = filename || (language ? `Code: ${language}` : "Code");
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-code" data-astro-cid-dgremz56>${filename && renderTemplate`<div class="emdash-code-filename" data-astro-cid-dgremz56>${filename}</div>`}<pre${addAttribute(languageClass, "class")} tabindex="0" role="region"${addAttribute(label, "aria-label")} data-astro-cid-dgremz56><code${addAttribute(languageClass, "class")} data-astro-cid-dgremz56>${code}</code></pre></div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Code.astro", void 0);
// node_modules/emdash/src/utils/sanitize.ts
/**
* Sanitize HTML content to prevent XSS attacks.
*
* Allows standard formatting tags, images, iframes (from specific providers),
* and basic attributes. The admin's inline HTML block preview uses the same
* allowlist.
*/
function sanitizeContent(html) {
	return sanitizeHtml(html, {
		allowedTags: [...SITE_HTML_ALLOWED_TAGS],
		allowedAttributes: Object.fromEntries(Object.entries(SITE_HTML_ALLOWED_ATTRIBUTES).map(([tag, names]) => [tag, [...names]])),
		allowedSchemes: [...SITE_HTML_ALLOWED_SCHEMES],
		allowedIframeHostnames: [...SITE_HTML_IFRAME_HOSTS]
	});
}
// node_modules/emdash/src/components/Embed.astro
createAstro("https://astro.build");
var $$Embed = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Embed;
	const { node } = Astro.props;
	if (!node?.url) return null;
	const { url: rawUrl, provider, html, caption } = node;
	const url = sanitizeHref(rawUrl);
	const YOUTUBE_HOSTS = /* @__PURE__ */ new Set([
		"youtube.com",
		"www.youtube.com",
		"m.youtube.com"
	]);
	const VIMEO_HOSTS = /* @__PURE__ */ new Set(["vimeo.com", "www.vimeo.com"]);
	const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;
	const YOUTUBE_SHORT_PATH_PATTERN = /^\/([a-zA-Z0-9_-]{11})\/?$/;
	const YOUTUBE_EMBED_PATH_PATTERN = /^\/embed\/([a-zA-Z0-9_-]{11})\/?$/;
	const VIMEO_PATH_PATTERN = /^\/(\d+)(?:\/|$)/;
	const IFRAME_PATTERN = /<iframe\b([^>]*)>[\s\S]*?<\/iframe>/gi;
	const ATTRIBUTE_VALUE_PATTERN = /="[^"]*"/g;
	const SRC_ATTRIBUTE_PATTERN = /\ssrc(?=[\s/]|$)/i;
	const TAG_PATTERN = /<[^>]*>/g;
	const MEDIA_TAG_PATTERN = /<(?:img|iframe)\b/i;
	function getYouTubeId(input) {
		if (!input) return null;
		const id = input.hostname === "youtu.be" ? input.pathname.match(YOUTUBE_SHORT_PATH_PATTERN)?.[1] : YOUTUBE_HOSTS.has(input.hostname) ? input.pathname === "/watch" ? input.searchParams.get("v") : input.pathname.match(YOUTUBE_EMBED_PATH_PATTERN)?.[1] : null;
		return id && YOUTUBE_ID_PATTERN.test(id) ? id : null;
	}
	function getVimeoId(input) {
		if (!input || !VIMEO_HOSTS.has(input.hostname)) return null;
		return input.pathname.match(VIMEO_PATH_PATTERN)?.[1] || null;
	}
	const parsedUrl = URL.canParse(url) ? new URL(url) : null;
	const videoUrl = parsedUrl?.protocol === "https:" || parsedUrl?.protocol === "http:" ? parsedUrl : null;
	const youtubeId = getYouTubeId(videoUrl);
	const vimeoId = getVimeoId(videoUrl);
	const isSelfHostedVideo = provider === "video";
	const isSelfHostedAudio = provider === "audio";
	const sanitizedHtml = html ? sanitizeContent(html) : "";
	const embedHtml = sanitizedHtml.replace(IFRAME_PATTERN, (iframe, attributes) => SRC_ATTRIBUTE_PATTERN.test(attributes.replace(ATTRIBUTE_VALUE_PATTERN, "")) ? iframe : "");
	const hasEmbedHtml = embedHtml.replace(TAG_PATTERN, "").trim() !== "" || MEDIA_TAG_PATTERN.test(embedHtml);
	const showLink = !hasEmbedHtml || embedHtml !== sanitizedHtml;
	return renderTemplate`${maybeRenderHead($$result)}<figure class="emdash-embed" data-astro-cid-n4v2ghzc>${isSelfHostedVideo ? renderTemplate`<div class="emdash-embed-video" data-astro-cid-n4v2ghzc><video controls preload="metadata" data-astro-cid-n4v2ghzc><source${addAttribute(url, "src")} data-astro-cid-n4v2ghzc>Your browser does not support the video element.</video></div>` : isSelfHostedAudio ? renderTemplate`<div class="emdash-embed-audio" data-astro-cid-n4v2ghzc><audio controls preload="metadata" data-astro-cid-n4v2ghzc><source${addAttribute(url, "src")} data-astro-cid-n4v2ghzc>Your browser does not support the audio element.</audio></div>` : youtubeId ? renderTemplate`<div class="emdash-embed-video" data-astro-cid-n4v2ghzc><iframe${addAttribute(`https://www.youtube.com/embed/${youtubeId}`, "src")} title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-astro-cid-n4v2ghzc></iframe></div>` : vimeoId ? renderTemplate`<div class="emdash-embed-video" data-astro-cid-n4v2ghzc><iframe${addAttribute(`https://player.vimeo.com/video/${vimeoId}`, "src")} title="Vimeo video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen data-astro-cid-n4v2ghzc></iframe></div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${hasEmbedHtml && renderTemplate`<div class="emdash-embed-html" data-astro-cid-n4v2ghzc>${unescapeHTML(embedHtml)}</div>`}${showLink && renderTemplate`<a${addAttribute(url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-n4v2ghzc>${url}</a>`}` })}`}${caption && renderTemplate`<figcaption data-astro-cid-n4v2ghzc>${caption}</figcaption>`}</figure>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Embed.astro", void 0);
// node_modules/emdash/src/components/Gallery.astro
createAstro("https://astro.build");
var $$Gallery = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Gallery;
	function generateSrcset(getSrc, maxWidth, aspectRatio, originalWidth) {
		return responsiveWidths(maxWidth, originalWidth).map((w) => {
			return `${getSrc({
				width: w,
				height: aspectRatio ? Math.round(w / aspectRatio) : void 0
			})} ${w}w`;
		}).join(", ");
	}
	const { node, placeholder = true, sizes: sizesOverride } = Astro.props;
	const images = sanitizeGalleryImages(node?.images);
	const columns = node?.columns ?? 3;
	const cellSizes = sizesOverride ?? gallerySizes(columns);
	if (!images.length) return null;
	const resolvedImages = await Promise.all(images.map(async (image) => {
		const { asset, alt = "", width, height } = image;
		const aspectRatio = width && height ? width / height : void 0;
		const objectPosition = focalPointToObjectPosition(image.focalX, image.focalY);
		let src = "";
		let srcset;
		let sizes;
		let astroImageSrc = "";
		const providerId = asset.provider;
		if (providerId && providerId !== "local") {
			const provider = await getMediaProvider(providerId);
			if (provider) try {
				const mediaValue = {
					provider: providerId,
					id: asset._ref,
					width,
					height,
					alt
				};
				const result = provider.getEmbed(mediaValue, {
					width,
					height
				});
				const embed = result instanceof Promise ? await result : result;
				if (embed.type === "image") {
					src = embed.src;
					if (embed.getSrc) {
						const maxWidth = width || 1200;
						srcset = generateSrcset(embed.getSrc, maxWidth, aspectRatio, width);
						sizes = cellSizes;
					}
				}
			} catch (error) {
				console.warn(`Failed to get embed for image ${asset._ref}:`, error);
			}
		}
		if (!src) {
			src = buildRenderMediaUrl(Astro.locals.emdash?.getPublicMediaUrl, {
				url: asset.url,
				id: asset._ref
			});
			if (width && height) {
				const absoluteSrc = toAbsoluteMediaUrl(src, getPublicOrigin(Astro.url, Astro.locals.emdash?.config));
				if (await canOptimizeImage(getImage, {
					src: absoluteSrc,
					width,
					height
				})) astroImageSrc = absoluteSrc;
			}
		}
		let placeholderStyle = "";
		if (placeholder && image.blurhash) {
			const { blurhashToImageCssString } = await import("@unpic/placeholder");
			placeholderStyle = blurhashToImageCssString(image.blurhash);
		} else if (placeholder && image.dominantColor) placeholderStyle = `background-color: ${image.dominantColor};`;
		return {
			key: image._key,
			alt,
			caption: image.caption,
			width,
			height,
			src,
			srcset,
			sizes,
			astroImageSrc,
			placeholderStyle,
			objectPosition
		};
	}));
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-gallery"${addAttribute(`--columns: ${columns}`, "style")} data-astro-cid-d6nmylgu>${resolvedImages.map((image) => renderTemplate`<figure class="emdash-gallery-item"${addAttribute(image.placeholderStyle || void 0, "style")} data-astro-cid-d6nmylgu>${image.astroImageSrc ? renderTemplate`${renderComponent($$result, "AstroImage", $$Image$1, {
		"src": image.astroImageSrc,
		"alt": image.alt,
		"width": image.width,
		"height": image.height,
		"layout": "constrained",
		"sizes": cellSizes,
		"style": image.objectPosition ? `object-position: ${image.objectPosition};` : void 0,
		"data-astro-cid-d6nmylgu": true
	})}` : renderTemplate`<img${addAttribute(image.src, "src")}${addAttribute(image.srcset, "srcset")}${addAttribute(image.sizes, "sizes")}${addAttribute(image.alt, "alt")}${addAttribute(image.width, "width")}${addAttribute(image.height, "height")} loading="lazy" decoding="async"${addAttribute(image.objectPosition ? `object-position: ${image.objectPosition};` : void 0, "style")} data-astro-cid-d6nmylgu>`}${image.caption && renderTemplate`<figcaption data-astro-cid-d6nmylgu>${image.caption}</figcaption>`}</figure>`)}</div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Gallery.astro", void 0);
// node_modules/emdash/src/components/Columns.astro
createAstro("https://astro.build");
var $$Columns = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Columns;
	const { node } = Astro.props;
	const columns = node?.columns ?? [];
	if (!columns.length) return null;
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-columns"${addAttribute(`--column-count: ${columns.length}`, "style")} data-astro-cid-sjaxkm7w>${columns.map((column) => renderTemplate`<div class="emdash-column"${addAttribute(column.width ? `flex-basis: ${column.width}` : void 0, "style")} data-astro-cid-sjaxkm7w>${renderComponent($$result, "PortableText", $$PortableText, {
		"value": column.content,
		"data-astro-cid-sjaxkm7w": true
	})}</div>`)}</div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Columns.astro", void 0);
// node_modules/emdash/src/components/Break.astro
createAstro("https://astro.build");
var $$Break = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Break;
	const { node } = Astro.props;
	const style = node?.style || "line";
	return renderTemplate`${style === "dots" ? renderTemplate`${maybeRenderHead($$result)}<div class="emdash-break emdash-break-dots" data-astro-cid-gvovdxls>• • •</div>` : style === "space" ? renderTemplate`<div class="emdash-break emdash-break-space" data-astro-cid-gvovdxls></div>` : renderTemplate`<hr class="emdash-break emdash-break-line" data-astro-cid-gvovdxls>`}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Break.astro", void 0);
// node_modules/emdash/src/components/HtmlBlockFrame.astro
createAstro("https://astro.build");
var $$HtmlBlockFrame = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HtmlBlockFrame;
	const MARKUP_RE = /[&"<>]/g;
	const ENTITIES = {
		"&": "&amp;",
		"\"": "&quot;",
		"<": "&lt;",
		">": "&gt;"
	};
	const frame = `<iframe class="emdash-html-block" data-emdash-html-block srcdoc="${buildHtmlBlockFrame(Astro.props).replace(MARKUP_RE, (char) => ENTITIES[char] ?? char)}" sandbox="${HTML_BLOCK_FRAME_SANDBOX}" title="Embedded HTML"></iframe>`;
	return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${unescapeHTML(frame)}` })}${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/HtmlBlockFrame.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/HtmlBlockFrame.astro", void 0);
// node_modules/emdash/src/components/HtmlBlock.astro
createAstro("https://astro.build");
var $$HtmlBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HtmlBlock;
	const { node } = Astro.props;
	const { html, css = "", js = "", isolated } = htmlBlockFields(node ?? {});
	if (isolated ? !html.trim() && !css.trim() && !js.trim() : !html) return null;
	return renderTemplate`${isolated ? renderTemplate`${renderComponent($$result, "HtmlBlockFrame", $$HtmlBlockFrame, {
		"html": html,
		"css": css,
		"js": js,
		"data-astro-cid-7hlqo6bn": true
	})}` : renderTemplate`${maybeRenderHead($$result)}<div class="emdash-html-block" data-astro-cid-7hlqo6bn>${unescapeHTML(sanitizeContent(html))}</div>`}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/HtmlBlock.astro", void 0);
// node_modules/emdash/src/components/Iframe.astro
createAstro("https://astro.build");
var $$Iframe = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Iframe;
	const SANDBOX = [
		"allow-scripts",
		"allow-same-origin",
		"allow-forms",
		"allow-popups",
		"allow-popups-to-escape-sandbox",
		"allow-presentation"
	];
	const ALLOWED_FEATURES = /* @__PURE__ */ new Set([
		"accelerometer",
		"autoplay",
		"clipboard-write",
		"encrypted-media",
		"fullscreen",
		"gyroscope",
		"picture-in-picture",
		"web-share"
	]);
	const isString = (value) => typeof value === "string";
	const dimension = (value) => typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 1e4 ? value : void 0;
	const FIELDS = /* @__PURE__ */ new Map([
		["_type", () => true],
		["_key", () => true],
		["src", isString],
		["title", isString],
		["width", (value) => dimension(value) !== void 0],
		["height", (value) => dimension(value) !== void 0],
		["allow", isString],
		["allowFullscreen", (value) => typeof value === "boolean"]
	]);
	const WHITESPACE_RE = /\s+/;
	const MARKUP_RE = /[&"<>]/g;
	const ENTITIES = {
		"&": "&amp;",
		"\"": "&quot;",
		"<": "&lt;",
		">": "&gt;"
	};
	function httpsUrl(value) {
		try {
			const url = new URL(typeof value === "string" ? value : "");
			return url.protocol === "https:" ? url : void 0;
		} catch {
			return;
		}
	}
	const { node } = Astro.props;
	const src = node && Object.entries(node).every(([key, value]) => value === void 0 || (FIELDS.get(key)?.(value) ?? false)) ? httpsUrl(node.src) : void 0;
	if (!src) return null;
	const width = dimension(node.width);
	const height = dimension(node.height);
	const size = width && height ? `aspect-ratio: ${width} / ${height}` : height ? `height: ${height}px` : void 0;
	const ownHosts = /* @__PURE__ */ new Set([Astro.url.host, Astro.site?.host]);
	const sandbox = SANDBOX.filter((token) => token !== "allow-same-origin" || !ownHosts.has(src.host)).join(" ");
	const allow = (typeof node.allow === "string" ? node.allow : "").split(";").map((directive) => directive.trim().split(WHITESPACE_RE)).filter(([feature = "", ...origins]) => ALLOWED_FEATURES.has(feature) && !origins.includes("'none'")).map(([feature]) => feature).join("; ");
	const escape = (value) => value.replace(MARKUP_RE, (char) => ENTITIES[char] ?? char);
	const frame = `<iframe ${[
		`src="${escape(src.href)}"`,
		`title="${escape(node.title || "Embedded content")}"`,
		"loading=\"lazy\"",
		"referrerpolicy=\"strict-origin-when-cross-origin\"",
		`sandbox="${sandbox}"`,
		allow && `allow="${allow}"`,
		node.allowFullscreen === true && "allowfullscreen"
	].filter(Boolean).join(" ")}></iframe>`;
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-iframe"${addAttribute(size, "style")} data-astro-cid-fhxykd76>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${unescapeHTML(frame)}` })}</div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Iframe.astro", void 0);
// node_modules/emdash/src/content/converters/video.ts
/**
* The editor's video block, with the admin editor's rules for its shape and
* its ProseMirror attributes.
*/
/**
* Whether a block is the editor's own video block. A `video` block with other
* fields, or values of other types, belongs to a plugin.
*/
function isPortableTextVideoBlock(block) {
	return isVideoBlock(block);
}
// node_modules/emdash/src/components/Video.astro
createAstro("https://astro.build");
var $$Video = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Video;
	const { node } = Astro.props;
	const asset = isPortableTextVideoBlock(node) ? node.asset : void 0;
	if (!asset) return null;
	const { caption, width, height } = node;
	const providerId = asset.provider && asset.provider !== "local" ? asset.provider : void 0;
	let embed;
	if (providerId) try {
		const result = await (await getMediaProvider(providerId))?.getEmbed({
			provider: providerId,
			id: asset._ref,
			width,
			height
		}, {
			width,
			height
		});
		if (result?.type === "video" && (result.src || result.sources?.length)) embed = result;
	} catch (error) {
		console.warn(`Failed to get embed for video ${asset._ref}:`, error);
	}
	else {
		const src = buildRenderMediaUrl(Astro.locals.emdash?.getPublicMediaUrl, { url: asset.url });
		if (src) embed = {
			type: "video",
			src,
			width,
			height,
			controls: true,
			preload: "metadata"
		};
	}
	if (!embed) return null;
	const url = (value) => value?.replaceAll("<", "%3C").replaceAll(">", "%3E");
	return renderTemplate`${maybeRenderHead($$result)}<figure class="emdash-video" data-astro-cid-ymu5gvpn><video${addAttribute(embed.sources?.length ? void 0 : url(embed.src), "src")}${addAttribute(url(embed.poster), "poster")}${addAttribute(embed.width ?? width, "width")}${addAttribute(embed.height ?? height, "height")}${addAttribute(embed.controls ?? true, "controls")}${addAttribute(embed.autoplay, "autoplay")}${addAttribute(embed.muted, "muted")}${addAttribute(embed.loop, "loop")}${addAttribute(embed.playsinline ?? true, "playsinline")}${addAttribute(embed.preload ?? "metadata", "preload")}${addAttribute(embed.crossorigin, "crossorigin")} data-astro-cid-ymu5gvpn>${embed.src && embed.sources?.length ? renderTemplate`<source${addAttribute(url(embed.src), "src")} data-astro-cid-ymu5gvpn>` : null}${embed.sources?.map((source) => renderTemplate`<source${addAttribute(url(source.src), "src")}${addAttribute(source.type, "type")} data-astro-cid-ymu5gvpn>`)}</video>${caption && renderTemplate`<figcaption data-astro-cid-ymu5gvpn>${caption}</figcaption>`}</figure>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Video.astro", void 0);
// node_modules/emdash/src/components/marks/Link.astro
createAstro("https://astro.build");
var $$Link = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Link;
	const { node } = Astro.props;
	const href = sanitizeHref(node?.markDef?.href);
	const blank = !href.startsWith("#") && node?.markDef?.blank;
	const rawTitle = node?.markDef?.title;
	const title = typeof rawTitle === "string" && rawTitle.trim() ? rawTitle : void 0;
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute(blank ? "_blank" : void 0, "target")}${addAttribute(blank ? "noopener noreferrer" : void 0, "rel")}${addAttribute(title, "title")}>${renderSlot($$result, $$slots["default"])}</a>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/marks/Link.astro", void 0);
// node_modules/emdash/src/components/marks/StrikeThrough.astro
var $$StrikeThrough = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<s>${renderSlot($$result, $$slots["default"])}</s>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/marks/StrikeThrough.astro", void 0);
// node_modules/emdash/src/components/marks/Subscript.astro
var $$Subscript = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<sub>${renderSlot($$result, $$slots["default"])}</sub>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/marks/Subscript.astro", void 0);
// node_modules/emdash/src/components/marks.ts
/**
* Shared mark component map for Portable Text rendering.
*
* Used by both the top-level `emdashComponents` config and individual block
* components (e.g. Table) that render nested inline content through the PT
* pipeline.
*/
var emdashMarkComponents = {
	superscript: createComponent(($$result, $$props, $$slots) => {
		return renderTemplate`${maybeRenderHead($$result)}<sup>${renderSlot($$result, $$slots["default"])}</sup>`;
	}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/marks/Superscript.astro", void 0),
	subscript: $$Subscript,
	underline: createComponent(($$result, $$props, $$slots) => {
		return renderTemplate`${maybeRenderHead($$result)}<u>${renderSlot($$result, $$slots["default"])}</u>`;
	}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/marks/Underline.astro", void 0),
	"strike-through": $$StrikeThrough,
	link: $$Link
};
// node_modules/emdash/src/components/Table.astro
createAstro("https://astro.build");
var $$Table = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Table;
	const markComponents = { mark: emdashMarkComponents };
	const { node } = Astro.props;
	let generatedKey = 0;
	const normalized = normalizePortableTextTable(node, {
		path: "render:table",
		createKey: () => `render-table-${generatedKey++}`
	});
	const table = normalized.ok ? normalized.table : normalized.renderFallback;
	const resolveCellMarkDefs = table ? createPortableTextTableCellMarkResolver(table) : void 0;
	const rawRows = table ? void 0 : getRawRows(normalized.raw);
	const placedRows = table ? placeCells(table) : [];
	const visualWidth = normalized.ok ? normalized.width : table ? getVisualWidth(placedRows) : getRawWidth(rawRows ?? []);
	const columnWidths = table ? getPortableTextTableColumnWidths(table) : void 0;
	const minimumWidth = columnWidths ? columnWidths.reduce((total, columnWidth) => total + columnWidth, 0) : visualWidth * 96;
	const hasHeaderRow = table?.hasHeaderRow === true && table.rows[0]?.cells.length > 0 && table.rows[0].cells.every((cell) => cell.isHeader === true && (cell.rowspan ?? 1) === 1);
	const headerRow = hasHeaderRow ? placedRows[0] : void 0;
	const bodyRows = hasHeaderRow ? placedRows.slice(1) : placedRows;
	function placeCells(value) {
		const occupied = Array.from({ length: value.rows.length }, () => /* @__PURE__ */ new Set());
		return value.rows.map((row, rowIndex) => {
			let column = 0;
			return row.cells.map((cell) => {
				while (occupied[rowIndex]?.has(column)) column++;
				const start = column;
				const colspan = cell.colspan ?? 1;
				const rowspan = cell.rowspan ?? 1;
				for (let rowOffset = 0; rowOffset < rowspan; rowOffset++) for (let columnOffset = 0; columnOffset < colspan; columnOffset++) occupied[rowIndex + rowOffset]?.add(start + columnOffset);
				column += colspan;
				return {
					cell,
					column: start
				};
			});
		});
	}
	function getVisualWidth(rows) {
		let result = 1;
		for (const row of rows) for (const { cell, column } of row) result = Math.max(result, column + (cell.colspan ?? 1));
		return result;
	}
	function getRawRows(value) {
		return isRecord(value) && Array.isArray(value.rows) ? value.rows : [];
	}
	function getRawCells(value) {
		return isRecord(value) && Array.isArray(value.cells) ? value.cells : [];
	}
	function getRawWidth(rows) {
		let rawWidth = 1;
		for (const row of rows) rawWidth = Math.max(rawWidth, getRawCells(row).length);
		return rawWidth;
	}
	function recoverRawCellText(value, depth = 0) {
		if (depth > 32) return "";
		if (typeof value === "string") return value;
		if (Array.isArray(value)) return value.map((entry) => recoverRawCellText(entry, depth + 1)).join("");
		if (!isRecord(value)) return "";
		if (typeof value.text === "string") return value.text;
		if (typeof value.content === "string") return value.content;
		return recoverRawCellText(Array.isArray(value.content) ? value.content : Array.isArray(value.children) ? value.children : [], depth + 1);
	}
	function isRecord(value) {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}
	function cellToBlock(cell) {
		return [{
			_type: "block",
			_key: cell._key,
			style: "normal",
			children: cell.content,
			markDefs: resolveCellMarkDefs?.(cell) ?? []
		}];
	}
	function cellAttributes(cell, scope) {
		return {
			scope,
			colspan: (cell.colspan ?? 1) > 1 ? cell.colspan : void 0,
			rowspan: (cell.rowspan ?? 1) > 1 ? cell.rowspan : void 0,
			style: cell.textAlign ? `text-align: ${cell.textAlign};` : void 0
		};
	}
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-table-wrapper" data-astro-cid-7uypp5bz><table class="emdash-table"${addAttribute(`min-width: ${minimumWidth}px;`, "style")} data-astro-cid-7uypp5bz>${table ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${columnWidths && renderTemplate`<colgroup data-astro-cid-7uypp5bz>${columnWidths.map((columnWidth) => renderTemplate`<col${addAttribute(`width: ${columnWidth}px;`, "style")} data-astro-cid-7uypp5bz>`)}</colgroup>`}${headerRow && renderTemplate`<thead data-astro-cid-7uypp5bz><tr data-astro-cid-7uypp5bz>${headerRow.map(({ cell }) => renderTemplate`<th${spreadAttributes(cellAttributes(cell, "col"))} data-astro-cid-7uypp5bz>${renderComponent($$result, "PortableText", $$PortableText$1, {
		"value": cellToBlock(cell),
		"components": markComponents,
		"data-astro-cid-7uypp5bz": true
	})}</th>`)}</tr></thead>`}<tbody data-astro-cid-7uypp5bz>${bodyRows.map((row) => renderTemplate`<tr data-astro-cid-7uypp5bz>${row.map(({ cell, column }) => {
		const CellTag = cell.isHeader ? "th" : "td";
		const scope = cell.isHeader && column === 0 && (cell.rowspan ?? 1) === 1 ? "row" : void 0;
		return renderTemplate`${renderComponent($$result, "CellTag", CellTag, {
			...cellAttributes(cell, scope),
			"data-astro-cid-7uypp5bz": true
		}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PortableText", $$PortableText$1, {
			"value": cellToBlock(cell),
			"components": markComponents,
			"data-astro-cid-7uypp5bz": true
		})}` })}`;
	})}</tr>`)}</tbody>` })}` : renderTemplate`<tbody data-astro-cid-7uypp5bz>${rawRows?.map((row) => renderTemplate`<tr data-astro-cid-7uypp5bz>${getRawCells(row).map((cell) => renderTemplate`<td data-astro-cid-7uypp5bz>${recoverRawCellText(cell)}</td>`)}</tr>`)}</tbody>`}</table></div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Table.astro", void 0);
// node_modules/emdash/src/components/Button.astro
createAstro("https://astro.build");
var $$Button = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Button;
	const { node } = Astro.props;
	const { text, url: rawUrl, style = "default" } = node ?? {};
	const url = rawUrl ? sanitizeHref(rawUrl) : void 0;
	return renderTemplate`${url ? renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(url, "href")}${addAttribute(["emdash-button", `emdash-button--${style}`], "class:list")} data-astro-cid-i644adhy>${text}</a>` : renderTemplate`<span${addAttribute(["emdash-button", `emdash-button--${style}`], "class:list")} data-astro-cid-i644adhy>${text}</span>`}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Button.astro", void 0);
// node_modules/emdash/src/components/Buttons.astro
createAstro("https://astro.build");
var $$Buttons = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Buttons;
	const { node } = Astro.props;
	const { buttons = [], layout = "horizontal" } = node ?? {};
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["emdash-buttons", `emdash-buttons--${layout}`], "class:list")} data-astro-cid-pxkpowas>${buttons.map((button) => renderTemplate`${renderComponent($$result, "Button", $$Button, {
		"node": button,
		"data-astro-cid-pxkpowas": true
	})}`)}</div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Buttons.astro", void 0);
// node_modules/emdash/src/components/Cover.astro
createAstro("https://astro.build");
var $$Cover = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Cover;
	const { node } = Astro.props;
	const { backgroundImage, backgroundVideo, overlayColor, overlayOpacity = .5, content = [], minHeight = "300px", alignment = "center" } = node ?? {};
	const hasBackground = backgroundImage || backgroundVideo;
	const overlayStyle = overlayColor ? `background-color: ${overlayColor}; opacity: ${overlayOpacity};` : `background-color: rgba(0, 0, 0, ${overlayOpacity});`;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["emdash-cover", `emdash-cover--align-${alignment}`], "class:list")}${addAttribute(`min-height: ${minHeight};`, "style")} data-astro-cid-g6rigryn>${backgroundImage && !backgroundVideo && renderTemplate`<img${addAttribute(backgroundImage, "src")} alt="" class="emdash-cover__background" loading="lazy" data-astro-cid-g6rigryn>`}${backgroundVideo && renderTemplate`<video class="emdash-cover__background emdash-cover__video" autoplay muted loop playsinline data-astro-cid-g6rigryn><source${addAttribute(backgroundVideo, "src")} data-astro-cid-g6rigryn></video>`}${hasBackground && renderTemplate`<div class="emdash-cover__overlay"${addAttribute(overlayStyle, "style")} data-astro-cid-g6rigryn></div>`}<div class="emdash-cover__content" data-astro-cid-g6rigryn>${renderComponent($$result, "PortableText", $$PortableText, {
		"value": content,
		"data-astro-cid-g6rigryn": true
	})}</div></div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Cover.astro", void 0);
// node_modules/emdash/src/components/File.astro
createAstro("https://astro.build");
var $$File = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$File;
	const { node } = Astro.props;
	const { url: rawUrl, filename, showDownloadButton = true } = node ?? {};
	const url = sanitizeHref(rawUrl);
	const displayName = filename || url?.split("/").pop()?.split("?")[0] || "Download";
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-file" data-astro-cid-dsnn5jk3><a${addAttribute(url, "href")} class="emdash-file__link"${addAttribute(filename, "download")} data-astro-cid-dsnn5jk3><svg class="emdash-file__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-dsnn5jk3><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-dsnn5jk3></path><polyline points="14 2 14 8 20 8" data-astro-cid-dsnn5jk3></polyline></svg><span class="emdash-file__name" data-astro-cid-dsnn5jk3>${displayName}</span></a>${showDownloadButton && renderTemplate`<a${addAttribute(url, "href")} class="emdash-file__download"${addAttribute(filename, "download")} aria-label="Download file" data-astro-cid-dsnn5jk3><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-dsnn5jk3><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-dsnn5jk3></path><polyline points="7 10 12 15 17 10" data-astro-cid-dsnn5jk3></polyline><line x1="12" y1="15" x2="12" y2="3" data-astro-cid-dsnn5jk3></line></svg></a>`}</div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/File.astro", void 0);
// node_modules/emdash/src/components/Pullquote.astro
createAstro("https://astro.build");
var $$Pullquote = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pullquote;
	const { node } = Astro.props;
	const { text, citation } = node ?? {};
	return renderTemplate`${maybeRenderHead($$result)}<figure class="emdash-pullquote" data-astro-cid-mtrxdgkr><blockquote class="emdash-pullquote__text" data-astro-cid-mtrxdgkr>${text}</blockquote>${citation && renderTemplate`<figcaption class="emdash-pullquote__citation" data-astro-cid-mtrxdgkr>&mdash; ${citation}</figcaption>`}</figure>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/Pullquote.astro", void 0);
// node_modules/emdash/src/components/BlockquoteGroup.astro
createAstro("https://astro.build");
var $$BlockquoteGroup = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BlockquoteGroup;
	const { node } = Astro.props;
	const paragraphs = (node?.blocks ?? []).map((block) => ({
		...block,
		style: "normal"
	}));
	return renderTemplate`${maybeRenderHead($$result)}<blockquote>${renderComponent($$result, "PortableText", $$PortableText$1, {
		"value": paragraphs,
		"components": {
			block: $$Block,
			mark: emdashMarkComponents
		}
	})}</blockquote>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/BlockquoteGroup.astro", void 0);
// node_modules/emdash/src/components/OrderedList.astro
createAstro("https://astro.build");
var $$OrderedList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OrderedList;
	const { node, index: _index, isInline: _isInline, ...attrs } = Astro.props;
	const start = normalizeListStart(node.start) ?? 1;
	return renderTemplate`${maybeRenderHead($$result)}<ol${spreadAttributes(attrs)}${addAttribute(start === 1 ? void 0 : start, "start")}>${renderSlot($$result, $$slots["default"])}</ol>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/OrderedList.astro", void 0);
// node_modules/emdash/src/components/JsonLdScript.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/EmDashHead.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/EmDashBodyStart.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/EmDashBodyEnd.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/index.ts
/**
* Pre-configured components for EmDash Portable Text content
*
* Includes renderers for:
* - Block styles: paragraph, h1..h6, blockquote — with `textAlign` honoured
*   as a WordPress-style `has-text-align-{value}` class (#1201)
* - Block types: image, code, embed, gallery, columns, break, htmlBlock, iframe,
*   video, table, button, buttons, cover, file, pullquote
* - Marks: superscript, subscript, underline, strike-through, link
*/
var emdashComponents = {
	block: $$Block,
	list: { number: $$OrderedList },
	type: {
		blockquoteGroup: $$BlockquoteGroup,
		image: $$Image,
		code: $$Code,
		embed: $$Embed,
		gallery: $$Gallery,
		columns: $$Columns,
		break: $$Break,
		htmlBlock: $$HtmlBlock,
		iframe: $$Iframe,
		video: $$Video,
		table: $$Table,
		button: $$Button,
		buttons: $$Buttons,
		cover: $$Cover,
		file: $$File,
		pullquote: $$Pullquote
	},
	mark: emdashMarkComponents
};
// src/pages/insights/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const slug = decodeSlug(Astro.params.slug);
	if (!slug) return Astro.rewrite("/404");
	const { entry: post, error } = await getEmDashEntry("posts", slug);
	if (error) throw error;
	if (!post) return Astro.rewrite("/404");
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": post.data.title,
		"data-astro-cid-6ebbwsfy": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="insight" data-astro-cid-6ebbwsfy><article class="insight__article" data-astro-cid-6ebbwsfy><a href="/insights" class="insight__back" data-astro-cid-6ebbwsfy>← Back to Insights</a><h1 data-astro-cid-6ebbwsfy>${post.data.title}</h1>${post.data.featured_image && renderTemplate`<div class="insight__featured-image" data-astro-cid-6ebbwsfy>${renderComponent($$result, "Image", $$EmDashImage, {
		"image": post.data.featured_image,
		"alt": post.data.title,
		"width": 1200,
		"height": 675,
		"data-astro-cid-6ebbwsfy": true
	})}</div>`}${post.data.excerpt && renderTemplate`<p class="insight__excerpt" data-astro-cid-6ebbwsfy>${post.data.excerpt}</p>`}<div class="insight__content" data-astro-cid-6ebbwsfy>${renderComponent($$result, "PortableText", $$PortableText, {
		"value": post.data.content,
		"data-astro-cid-6ebbwsfy": true
	})}</div></article></main>` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/insights/[slug].astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/insights/[slug].astro";
var $$url = "/insights/[slug]";
// \0virtual:astro:page:src/pages/insights/[slug]@_@astro
var page = () => _slug__exports;
export { page };
