import { _ as addAttribute, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import { c as renderScript } from "./BaseLayout_DO4EBRO4.mjs";
import "./compiler_CJfKk-QH.mjs";
import { t as testimonials } from "./testimonials_C2iWvdR3.mjs";
// src/components/cards/TestimonialCard.astro
createAstro("https://astro.build");
var $$TestimonialCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TestimonialCard;
	const { logo, logoAlt = "", quote, name, role, company, ctaText, ctaLink } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<article class="testimonial-card" data-astro-cid-w3n4gxul>${logo && renderTemplate`<div class="testimonial-card__logo" data-astro-cid-w3n4gxul><img${addAttribute(logo, "src")}${addAttribute(logoAlt, "alt")} data-astro-cid-w3n4gxul></div>`}<div class="testimonial-card__content" data-astro-cid-w3n4gxul><blockquote class="testimonial-card__quote" data-astro-cid-w3n4gxul>${quote}</blockquote></div><div class="testimonial-card__footer" data-astro-cid-w3n4gxul><div class="testimonial-card__author" data-astro-cid-w3n4gxul><strong data-astro-cid-w3n4gxul>${name}</strong><span data-astro-cid-w3n4gxul>|</span><span data-astro-cid-w3n4gxul>${role}, ${company}</span></div><div class="testimonial-card__divider" data-astro-cid-w3n4gxul></div><a${addAttribute(ctaLink, "href")} class="testimonial-card__cta" data-astro-cid-w3n4gxul><span data-astro-cid-w3n4gxul>${ctaText}</span><span class="testimonial-card__arrow" data-astro-cid-w3n4gxul><img src="/icons/arrow-up-right-drk.svg" alt="" aria-hidden="true" data-astro-cid-w3n4gxul></span></a></div></article>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/cards/TestimonialCard.astro", void 0);
// src/components/ui/Testimonials/TestimonialsSection.astro
createAstro("https://astro.build");
var $$TestimonialsSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TestimonialsSection;
	const { count = 3, start = 0, class: className = "" } = Astro.props;
	const displayedTestimonials = testimonials.slice(Math.max(0, start), Math.max(0, start) + Math.max(0, count));
	const isDesktopCarousel = displayedTestimonials.length > 3;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute([
		"testimonial-section",
		className,
		{ "testimonial-section--carousel": isDesktopCarousel }
	], "class:list")} data-testimonial-section data-astro-cid-7zivda5o><div class="testimonial-section__content" data-astro-cid-7zivda5o><div class="testimonial-section__carousel" data-astro-cid-7zivda5o><div class="testimonial-section__grid" data-testimonial-grid aria-label="Testimonials" tabindex="0" data-astro-cid-7zivda5o>${displayedTestimonials.map((testimonial) => renderTemplate`${renderComponent($$result, "TestimonialCard", $$TestimonialCard, {
		"logo": testimonial.logo,
		"logoAlt": testimonial.logoAlt,
		"quote": testimonial.quote,
		"name": testimonial.name,
		"role": testimonial.role,
		"company": testimonial.company,
		"ctaText": testimonial.ctaText ?? "WORK WITH US",
		"ctaLink": testimonial.ctaLink ?? "/contact",
		"data-astro-cid-7zivda5o": true
	})}`)}</div><div class="testimonial-section__navigation" data-astro-cid-7zivda5o><button class="testimonial-section__arrow testimonial-section__arrow--prev" type="button" aria-label="Previous testimonials" disabled hidden data-astro-cid-7zivda5o><span aria-hidden="true" data-astro-cid-7zivda5o>&larr;</span></button><button class="testimonial-section__arrow testimonial-section__arrow--next" type="button" aria-label="Next testimonials" hidden data-astro-cid-7zivda5o><span aria-hidden="true" data-astro-cid-7zivda5o>&rarr;</span></button></div></div></div></section>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Testimonials/TestimonialsSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Testimonials/TestimonialsSection.astro", void 0);
export { $$TestimonialsSection as t };
