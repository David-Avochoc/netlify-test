import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
import { t as $$TestimonialsSection } from "./TestimonialsSection_BIVV24cv.mjs";
// src/sections/homepage/WhatClientsSay.astro
var $$WhatClientsSay = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="home-testimonials" data-astro-cid-wahpe44u>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-wahpe44u": true }, { "default": ($$result) => renderTemplate`<div class="home-testimonials__inner" data-astro-cid-wahpe44u>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "What Clients Say",
		"data-astro-cid-wahpe44u": true
	})}${renderComponent($$result, "TestimonialsSection", $$TestimonialsSection, {
		"count": 3,
		"data-astro-cid-wahpe44u": true
	})}</div>` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/WhatClientsSay.astro", void 0);
export { $$WhatClientsSay as t };
