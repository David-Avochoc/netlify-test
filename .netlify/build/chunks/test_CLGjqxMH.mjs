import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { d as renderTemplate, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import "./compiler_CJfKk-QH.mjs";
import { t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$ServicesHero } from "./ServicesHero_D-6Pe0fO.mjs";
import { t as $$OurWorkSection } from "./OurWorkSection_BvaaN2PY.mjs";
// src/pages/test.astro
var test_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Test,
	file: () => $$file,
	url: () => $$url
});
var $$Test = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Our Work" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ServicesHero", $$ServicesHero, {})}${renderComponent($$result, "OurWorkSection", $$OurWorkSection, {})}` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/test.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/test.astro";
var $$url = "/test";
// \0virtual:astro:page:src/pages/test@_@astro
var page = () => test_exports;
export { page };
