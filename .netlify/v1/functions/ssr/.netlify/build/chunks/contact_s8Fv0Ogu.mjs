import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { _ as addAttribute, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container, c as renderScript, i as $$Columns, n as formFieldConfig, r as $$Form, s as $$PrimaryBtn, t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
import { t as testimonials } from "./testimonials_C2iWvdR3.mjs";
// src/components/buttons/CallBtn.astro
createAstro("https://astro.build");
var $$CallBtn = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CallBtn;
	const { href, text, type = "button", background = "var(--navy)", textColor = "var(--white)", class: className = "", panelOpen } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Tag", href ? "a" : "button", {
		"href": href,
		"type": !href ? type : void 0,
		"data-panel-open": panelOpen,
		"class:list": ["call-btn", className],
		"style": `--button-background: ${background}; --button-text-color: ${textColor}`,
		"data-astro-cid-etce7iaz": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<span class="call-btn__sizer" aria-hidden="true" data-astro-cid-etce7iaz>${text}</span><span class="call-btn__label" data-astro-cid-etce7iaz>${text}</span><span class="call-btn__arrow" aria-hidden="true" data-astro-cid-etce7iaz><img src="/icons/calendar_icon.svg" alt="" data-astro-cid-etce7iaz></span>` })}${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/CallBtn.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/CallBtn.astro", void 0);
// src/components/ui/Testimonials/ContactTestimonial.astro
var $$ContactTestimonial = createComponent(($$result, $$props, $$slots) => {
	const initialIndex = Math.max(0, testimonials.findIndex((testimonial) => testimonial.company === "GritCargo"));
	const initialTestimonial = testimonials[initialIndex] ?? testimonials[0];
	return renderTemplate`${initialTestimonial && renderTemplate`${maybeRenderHead($$result)}<section class="contact-testimonial" aria-label="Client testimonials"${addAttribute(initialIndex, "data-initial-index")} data-astro-cid-t4nzr2gp><div class="contact-testimonial__quote-panel" data-astro-cid-t4nzr2gp><h3 data-astro-cid-t4nzr2gp>WHAT OUR CLIENTS ARE SAYING</h3><div class="contact-testimonial__quote" data-astro-cid-t4nzr2gp><p data-testimonial-quote data-astro-cid-t4nzr2gp>${initialTestimonial.quote}</p></div></div><div class="contact-testimonial__footer" data-astro-cid-t4nzr2gp><div class="contact-testimonial__person" data-astro-cid-t4nzr2gp><span class="contact-testimonial__person-icon" aria-hidden="true" data-astro-cid-t4nzr2gp><svg viewBox="0 0 24 24" fill="none" data-astro-cid-t4nzr2gp><circle cx="12" cy="8" r="3.5" data-astro-cid-t4nzr2gp></circle><path d="M5 20v-2a7 7 0 0 1 14 0v2" data-astro-cid-t4nzr2gp></path></svg></span><span data-testimonial-person data-astro-cid-t4nzr2gp>${[
		initialTestimonial.name,
		initialTestimonial.role,
		initialTestimonial.company
	].filter(Boolean).join(", ")}</span></div><div class="contact-testimonial__logo" data-astro-cid-t4nzr2gp><img${addAttribute(initialTestimonial.logo, "src")}${addAttribute(initialTestimonial.logoAlt ?? "", "alt")} data-testimonial-logo data-astro-cid-t4nzr2gp></div></div></section>`}${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Testimonials/ContactTestimonial.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Testimonials/ContactTestimonial.astro", void 0);
// src/pages/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	url: () => $$url
});
var $$Contact = createComponent(($$result, $$props, $$slots) => {
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
		"title": "Contact",
		"description": "Progress Done Properly",
		"data-astro-cid-6bfsojfh": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="contact-section" data-astro-cid-6bfsojfh>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-6bfsojfh": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "50-50",
		"gap": "var(--space-64)",
		"class": "contact-section-columns",
		"data-astro-cid-6bfsojfh": true
	}, { "default": ($$result) => renderTemplate`<div class="contact-left-col" data-astro-cid-6bfsojfh>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Let's talk about what needs to move forward.",
		"fontSize": "var(--font-size-48)",
		"fontWeight": "var(--font-weight-semibold)",
		"color": "var(--white)",
		"textTransform": "none",
		"class": "contact-us__title",
		"data-astro-cid-6bfsojfh": true
	})}<p class="title-subtxt" data-astro-cid-6bfsojfh>Tell us what you're working with. We'll tell you what's possible.</p></div><div class="contact-right-col" data-astro-cid-6bfsojfh><div class="glass-section CTA-section" data-astro-cid-6bfsojfh><h2 data-astro-cid-6bfsojfh>What are you looking for?</h2><div class="CTA-section__new-project" data-astro-cid-6bfsojfh><span class="CTA-icon" data-astro-cid-6bfsojfh><img src="/icons/Rectangle6.svg" data-astro-cid-6bfsojfh></span><div class="CTA-section__new-project-content" data-astro-cid-6bfsojfh><p class="new-project-content__heading" data-astro-cid-6bfsojfh>New Project</p><p class="new-project-content__body" data-astro-cid-6bfsojfh>Something needs building, fixing, modernising or figuring out.</p></div></div><div class="CTA-section__existing-client" data-astro-cid-6bfsojfh><span class="CTA-icon" data-astro-cid-6bfsojfh><img src="/icons/Rectangle6.svg" data-astro-cid-6bfsojfh></span><div class="CTA-section__new-project-content" data-astro-cid-6bfsojfh><p class="new-project-content__heading" data-astro-cid-6bfsojfh>Existing Client</p><p class="new-project-content__body" data-astro-cid-6bfsojfh>Good to hear from you. Tell us what you need and we'll get the right person on it.</p></div></div><div class="CTA-section__careers" data-astro-cid-6bfsojfh><span class="CTA-icon" data-astro-cid-6bfsojfh><img src="/icons/Rectangle6.svg" data-astro-cid-6bfsojfh></span><div class="CTA-section__new-project-content" data-astro-cid-6bfsojfh><p class="new-project-content__heading" data-astro-cid-6bfsojfh>Careers</p><p class="new-project-content__body" data-astro-cid-6bfsojfh>Looking to become an Avo? Head this way.</p></div></div></div><div class="glass-section contact-form-section" data-astro-cid-6bfsojfh><h2 data-astro-cid-6bfsojfh>Tell us a little about what you need.</h2>${renderComponent($$result, "Form", $$Form, {
		"fields": fields,
		"submitLabel": "Start a conversation",
		"note": "No pitch deck. No pressure.",
		"layout": "grid",
		"class": "contact-section__form",
		"data-astro-cid-6bfsojfh": true
	})}</div><div class="avo-talk" data-astro-cid-6bfsojfh><div class="avo-talk__left" data-astro-cid-6bfsojfh><h2 data-astro-cid-6bfsojfh>Rather talk it through first?</h2><div class="avo-talk-inner" data-astro-cid-6bfsojfh><p data-astro-cid-6bfsojfh>Book fifteen minutes with our team.<br data-astro-cid-6bfsojfh> No forms, no waiting.</p>${renderComponent($$result, "CallBtn", $$CallBtn, {
		"href": "#",
		"text": "Book a call",
		"background": "var(--navy)",
		"textColor": "var(--white)",
		"data-astro-cid-6bfsojfh": true
	})}</div></div><div class="avo-talk__right" data-astro-cid-6bfsojfh><img src="/images/content/staff/Ceo_COO.webp" data-astro-cid-6bfsojfh></div></div><div class="glass-section serious-tech-section" data-astro-cid-6bfsojfh><h2 data-astro-cid-6bfsojfh>Serious technology. Actual Humans.</h2><p data-astro-cid-6bfsojfh>Your message goes straight to the people who can work out what needs to happen next, whether that's a conversation with strategy, engineering, AI or design.</p><hr data-astro-cid-6bfsojfh><p data-astro-cid-6bfsojfh>ISO 27001 [accrediting body]. POPIA and GDPR compliant.</p><div class="serious-tech-section-location" data-astro-cid-6bfsojfh><div class="serious-tech-section-location_1" data-astro-cid-6bfsojfh><span class="icon" data-astro-cid-6bfsojfh><img src="/icons/location_marker_drk.svg" data-astro-cid-6bfsojfh></span><p data-astro-cid-6bfsojfh>Based in South Africa</p></div><div class="serious-tech-section-location_1" data-astro-cid-6bfsojfh><span class="icon" data-astro-cid-6bfsojfh><img src="/icons/globe.svg" data-astro-cid-6bfsojfh></span><p data-astro-cid-6bfsojfh>Based in South Africa</p></div></div></div>${renderComponent($$result, "ContactTestimonial", $$ContactTestimonial, { "data-astro-cid-6bfsojfh": true })}</div>` })}<div class="avo-contact" data-astro-cid-6bfsojfh>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Just a conversation with people who know what they're doing.",
		"fontSize": "var(--font-size-36)",
		"fontWeight": "var(--font-weight-medium)",
		"color": "var(--navy)",
		"textTransform": "none",
		"class": "avo-contact__title",
		"data-astro-cid-6bfsojfh": true
	})}<div class="avo-genius-cta" data-astro-cid-6bfsojfh><div class="avo-genius-cta_1" data-astro-cid-6bfsojfh><span class="CTA-icon" data-astro-cid-6bfsojfh><img src="/icons/Rectangle6.svg" data-astro-cid-6bfsojfh></span><p data-astro-cid-6bfsojfh>No pressure</p></div><div class="avo-genius-cta_1" data-astro-cid-6bfsojfh><span class="CTA-icon" data-astro-cid-6bfsojfh><img src="/icons/Rectangle6.svg" data-astro-cid-6bfsojfh></span><p data-astro-cid-6bfsojfh>No pitch</p></div></div>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "Ready When You Are",
		"background": "var(--navy)",
		"textColor": "var(--white)",
		"data-astro-cid-6bfsojfh": true
	})}</div>` })}</section>` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/contact.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/contact.astro";
var $$url = "/contact";
// \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
export { page };
