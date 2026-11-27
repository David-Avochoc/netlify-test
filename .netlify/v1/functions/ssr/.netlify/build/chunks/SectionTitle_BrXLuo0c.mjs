import { _ as addAttribute, b as unescapeHTML, d as renderTemplate, f as maybeRenderHead } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
// src/components/ui/SectionTitle.astro
createAstro("https://astro.build");
var $$SectionTitle = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SectionTitle;
	const { title, fontSize = "var(--font-size-24)", mobileFontSize, fontWeight = "var(--font-weight-semibold)", lineHeight, color = "var(--navy)", textTransform = "uppercase", class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["section-title", className], "class:list")}${addAttribute(`
    --section-title-font-size: ${fontSize};
    --section-title-mobile-font-size: ${mobileFontSize ?? fontSize};
    --section-title-font-weight: ${fontWeight};
    --section-title-line-height: ${lineHeight};
    --section-title-color: ${color};
    --section-title-text-transform: ${textTransform};
  `, "style")} data-astro-cid-mluwbwhv><h2 data-astro-cid-mluwbwhv>${unescapeHTML(title)}</h2></div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/SectionTitle.astro", void 0);
export { $$SectionTitle as t };
