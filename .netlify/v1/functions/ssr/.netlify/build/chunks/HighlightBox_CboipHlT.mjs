import { _ as addAttribute, c as renderSlot, d as renderTemplate, f as maybeRenderHead } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
// src/components/ui/HighlightBox.astro
createAstro("https://astro.build");
var $$HighlightBox = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HighlightBox;
	const { background = "var(--grey)", textColor = "var(--navy)", accentColor = "var(--green)", fontSize = "var(--font-size-32)" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="highlight-box"${addAttribute(`--highlight-background: ${background}; --highlight-text: ${textColor}; --highlight-accent: ${accentColor}; --highlight-font-size: ${fontSize};`, "style")} data-astro-cid-cgy4vzxo>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/HighlightBox.astro", void 0);
export { $$HighlightBox as t };
