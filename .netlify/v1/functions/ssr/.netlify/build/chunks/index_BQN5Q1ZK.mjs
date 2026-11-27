import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container, i as $$Columns, s as $$PrimaryBtn, t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$Hero } from "./Hero_qzH1GuZs.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
// src/sections/careers/CareersHero.astro
var $$CareersHero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="careers-hero-section" id="careers-hero-section" data-astro-cid-yxit562w>${renderComponent($$result, "Hero", $$Hero, {
		"backgroundImage": "/images/backgrounds/hero/hero_image3.webp",
		"data-astro-cid-yxit562w": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Container", $$Container, { "data-astro-cid-yxit562w": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"class": "careers-hero-columns",
		"layout": "50-50",
		"gap": "var(--space-20)",
		"data-astro-cid-yxit562w": true
	}, { "default": ($$result) => renderTemplate`<div class="careers-hero-left" data-astro-cid-yxit562w><h1 data-astro-cid-yxit562w>Check out our open roles and grow with us.</h1></div><div class="careers-hero-right" data-astro-cid-yxit562w><p data-astro-cid-yxit562w>We're a global team building custom software from the ground up. With diverse backgrounds and a passion for innovation, we tackle every project with fresh ideas. If you're creative, driven, and ready for a fun, fast-paced environment.</p></div>` })}` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/careers/CareersHero.astro", void 0);
// src/sections/careers/WeHiring.astro
var $$WeHiring = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="avo-hiring" id="avo-hiring" data-astro-cid-farnf4ge>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-farnf4ge": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "We are Hiring",
		"fontSize": "var(--font-size-36)",
		"fontWeight": "var(--font-weight-regular)",
		"textTransform": "sentencecase",
		"class": "avo-hiring__title",
		"data-astro-cid-farnf4ge": true
	})}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/careers/WeHiring.astro", void 0);
// src/sections/careers/NothingAvailable.astro
var $$NothingAvailable = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="avo-nothing-available" id="avo-nothing-available" data-astro-cid-7vrrq7bn>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-7vrrq7bn": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "custom",
		"customColumns": "1fr",
		"data-astro-cid-7vrrq7bn": true
	}, { "default": ($$result) => renderTemplate`<div class="avo-nothing-available-inner" data-astro-cid-7vrrq7bn>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Nothing available for you right now?",
		"fontSize": "var(--font-size-36)",
		"fontWeight": "var(--font-weight-medium)",
		"textTransform": "sentencecase",
		"class": "avo-hiring__title",
		"data-astro-cid-7vrrq7bn": true
	})}<h3 data-astro-cid-7vrrq7bn>Submit your cv to stay on our radar</h3><div class="avo-nothing-available-inner__cta" data-astro-cid-7vrrq7bn>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "/careers/apply-now",
		"text": "Send us your details",
		"background": "var(--navy)",
		"textColor": "var(--white)",
		"data-astro-cid-7vrrq7bn": true
	})}</div></div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/careers/NothingAvailable.astro", void 0);
// src/pages/careers/index.astro
var careers_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Careers" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "CareersHero", $$CareersHero, {})}${renderComponent($$result, "WeHiring", $$WeHiring, {})}${renderComponent($$result, "NothingAvailable", $$NothingAvailable, {})}` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/careers/index.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/careers/index.astro";
var $$url = "/careers";
// \0virtual:astro:page:src/pages/careers/index@_@astro
var page = () => careers_exports;
export { page };
