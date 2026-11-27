import { _ as addAttribute, c as renderSlot, d as renderTemplate, f as maybeRenderHead } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
// src/components/ui/HighlightSection.astro
createAstro("https://astro.build");
var $$HighlightSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HighlightSection;
	const { columns = 3, customColumns = "", gap = "2rem", background = "transparent", textColor = "var(--navy)", accentColor = "var(--lime)", fontSize = "var(--font-size-36)", padding = "var(--space-16) var(--space-32)", border = "1px solid transparent", minHeight = "100%", class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(["highlight-section", className], "class:list")}${addAttribute(`--highlight-columns: ${columns};
          --highlight-custom-columns: ${customColumns || `repeat(${columns}, minmax(0, 1fr))`};
          --highlight-gap: ${gap};
          --highlight-background: ${background};
          --highlight-text-color: ${textColor};
          --highlight-accent-color: ${accentColor};
          --highlight-font-size: ${fontSize};
          --highlight-border: ${border};
          --highlight-padding: ${padding};
          --highlight-min-height: ${minHeight}`, "style")} data-astro-cid-qhw7wc4u><div class="highlight-section__inner" data-astro-cid-qhw7wc4u>${renderSlot($$result, $$slots["default"])}</div></section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/HighlightSection.astro", void 0);
export { $$HighlightSection as t };
