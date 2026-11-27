import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container, i as $$Columns, n as formFieldConfig, r as $$Form, t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
// src/pages/careers/apply-now.astro
var apply_now_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ApplyNow,
	file: () => $$file,
	url: () => $$url
});
var $$ApplyNow = createComponent(($$result, $$props, $$slots) => {
	const fields = [
		{
			...formFieldConfig.fullName,
			width: "half"
		},
		{
			...formFieldConfig.email,
			width: "half"
		},
		{
			...formFieldConfig.company,
			width: "full"
		},
		{
			...formFieldConfig.message,
			width: "full"
		}
	];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Become an Avo",
		"description": "Progress Done Properly",
		"data-astro-cid-ngv6gppr": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="apply-section" data-astro-cid-ngv6gppr>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-ngv6gppr": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "50-50",
		"gap": "var(--space-64)",
		"class": "apply-section-columns",
		"data-astro-cid-ngv6gppr": true
	}, { "default": ($$result) => renderTemplate`<div class="apply-left-col" data-astro-cid-ngv6gppr>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Apply Today",
		"fontSize": "var(--font-size-48)",
		"fontWeight": "var(--font-weight-semibold)",
		"color": "var(--white)",
		"textTransform": "none",
		"class": "contact-us__title",
		"data-astro-cid-ngv6gppr": true
	})}<p class="title-subtxt" data-astro-cid-ngv6gppr>Want to join our inspiring community of software development professionals at AvoChoc? Submit your CV below to stay on our radar and be notified when positions become available.</p></div><div class="apply-right-col" data-astro-cid-ngv6gppr><div class="glass-section contact-form-section" data-astro-cid-ngv6gppr><h2 data-astro-cid-ngv6gppr>Tell us a little about you.</h2>${renderComponent($$result, "Form", $$Form, {
		"fields": fields,
		"submitLabel": "Submit",
		"layout": "grid",
		"class": "contact-section__form",
		"data-astro-cid-ngv6gppr": true
	})}</div></div>` })}` })}</section>` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/careers/apply-now.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/careers/apply-now.astro";
var $$url = "/careers/apply-now";
// \0virtual:astro:page:src/pages/careers/apply-now@_@astro
var page = () => apply_now_exports;
export { page };
