import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import "./compiler_CJfKk-QH.mjs";
import { t as $$Hero } from "./Hero_qzH1GuZs.mjs";
import { a as $$Container, i as $$Columns } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$HighlightBox } from "./HighlightBox_CboipHlT.mjs";
// src/sections/servicespage/ServicesHero.astro
var $$ServicesHero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="services-hero-section" data-astro-cid-mcwpdpc4>${renderComponent($$result, "Hero", $$Hero, {
		"backgroundImage": "/images/backgrounds/hero/hero_image.webp",
		"data-astro-cid-mcwpdpc4": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Container", $$Container, { "data-astro-cid-mcwpdpc4": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"class": "services-hero-container",
		"layout": "60-40",
		"align": "stretch",
		"data-astro-cid-mcwpdpc4": true
	}, { "default": ($$result) => renderTemplate`<div class="services-hero-left" data-astro-cid-mcwpdpc4><h1 data-astro-cid-mcwpdpc4>Complex systems.<br data-astro-cid-mcwpdpc4>Real constraints.<br data-astro-cid-mcwpdpc4>No shortcuts.<br data-astro-cid-mcwpdpc4></h1></div><div class="services-hero-right" data-astro-cid-mcwpdpc4><p data-astro-cid-mcwpdpc4>We build custom software, AI, and integrated systems for organisations operating under</p>${renderComponent($$result, "HighlightBox", $$HighlightBox, {
		"background": "var(--navy-20)",
		"textColor": "var(--white)",
		"accentColor": "var(--lime)",
		"fontSize": "var(--font-size-24)",
		"data-astro-cid-mcwpdpc4": true
	}, { "default": ($$result) => renderTemplate`
            real-world pressure
          ` })}</div>` })}` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/servicespage/ServicesHero.astro", void 0);
export { $$ServicesHero as t };
