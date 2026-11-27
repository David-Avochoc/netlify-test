import { _ as addAttribute, c as renderSlot, d as renderTemplate, f as maybeRenderHead } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
// src/sections/shared-sections/Hero.astro
createAstro("https://astro.build");
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Hero;
	const { backgroundImage, minHeight = "var(--section-min-height-screen)" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="hero"${addAttribute(`
    ${backgroundImage ? `background-image: url('${backgroundImage}');` : ""}
    --hero-min-height: ${minHeight};
  `, "style")} data-astro-cid-nsjupmmc><div class="hero__container" data-astro-cid-nsjupmmc><div class="hero__content" data-astro-cid-nsjupmmc>${renderSlot($$result, $$slots["default"])}</div></div></section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/shared-sections/Hero.astro", void 0);
export { $$Hero as t };
