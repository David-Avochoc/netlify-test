import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container, i as $$Columns, n as formFieldConfig, r as $$Form } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
// src/sections/shared-sections/ContactFooter.astro
var $$ContactFooter = createComponent(($$result, $$props, $$slots) => {
	const fields = [
		{
			...formFieldConfig.fullName,
			width: "full"
		},
		{
			...formFieldConfig.email,
			width: "full"
		},
		{
			...formFieldConfig.phone,
			width: "full"
		},
		{
			...formFieldConfig.message,
			width: "full"
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<section class="contact-section" data-astro-cid-vdfkasy4>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-vdfkasy4": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "40-60",
		"gap": "0",
		"class": "contact-section__columns",
		"data-astro-cid-vdfkasy4": true
	}, { "default": ($$result) => renderTemplate`<div class="contact-section__left" data-astro-cid-vdfkasy4>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Ready to move things forward?",
		"fontSize": "var(--font-size-24)",
		"color": "var(--white)",
		"class": "contact-section-title",
		"data-astro-cid-vdfkasy4": true
	})}<h3 class="contact-section-body" data-astro-cid-vdfkasy4>Not a pitch. Not a proposal. Just a clear-eyed look at what you're working with and whether we're the right fit to help you move it forward.</h3><p class="contact-section-footer" data-astro-cid-vdfkasy4>No RFP required. No vendor shortlist performance. A straight conversation about whether we're the right fit.</p></div><div class="contact-section__right" data-astro-cid-vdfkasy4><div class="contact-section__right-inner" data-astro-cid-vdfkasy4>${renderComponent($$result, "Form", $$Form, {
		"title": "Fill in your details",
		"fields": fields,
		"submitLabel": "Start a conversation",
		"note": "No pitch deck. No pressure.",
		"layout": "grid",
		"class": "contact-section__form",
		"data-astro-cid-vdfkasy4": true
	})}</div></div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/shared-sections/ContactFooter.astro", void 0);
export { $$ContactFooter as t };
