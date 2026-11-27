import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { _ as addAttribute, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container, i as $$Columns, o as $$SecondaryBtn, s as $$PrimaryBtn, t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$Hero } from "./Hero_qzH1GuZs.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
import { t as $$OurWorkSection } from "./OurWorkSection_BvaaN2PY.mjs";
import { t as $$HighlightSection } from "./HighlightSection_B07rGijS.mjs";
import { t as $$WhatClientsSay } from "./WhatClientsSay_BeUZava3.mjs";
import { t as $$ContactFooter } from "./ContactFooter_BnyGinfL.mjs";
// src/sections/workpage/OurWorkHero.astro
var $$OurWorkHero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="our-work-section" id="our-work-section" data-astro-cid-kfb4bhvb>${renderComponent($$result, "Hero", $$Hero, {
		"backgroundImage": "/images/backgrounds/hero/hero_image3.webp",
		"data-astro-cid-kfb4bhvb": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Container", $$Container, { "data-astro-cid-kfb4bhvb": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"class": "our-work-hero-columns",
		"layout": "50-50",
		"gap": "var(--space-20)",
		"data-astro-cid-kfb4bhvb": true
	}, { "default": ($$result) => renderTemplate`<div class="our-work-hero-left" data-astro-cid-kfb4bhvb><h1 data-astro-cid-kfb4bhvb>Proof,<br data-astro-cid-kfb4bhvb>not promises.</h1></div><div class="our-work-hero-right" data-astro-cid-kfb4bhvb><p data-astro-cid-kfb4bhvb>A decade of custom software and AI, built for organisations that need it to work properly, for years, under real pressure.</p><div class="hero__actions" data-astro-cid-kfb4bhvb>${renderComponent($$result, "SecondaryBtn", $$SecondaryBtn, {
		"href": "/contact",
		"text": "Start a conversation",
		"data-astro-cid-kfb4bhvb": true
	})}${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "/services",
		"text": "See our services",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"data-astro-cid-kfb4bhvb": true
	})}</div></div>` })}` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/workpage/OurWorkHero.astro", void 0);
// src/sections/workpage/OrganisationalTrust.astro
var $$OrganisationalTrust = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Container", $$Container, { "data-astro-cid-3ojuvhj6": true }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="organisation-trust-section" data-astro-cid-3ojuvhj6><div class="organisation-trust-section__content" data-astro-cid-3ojuvhj6>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Trusted by organisations that can't afford to get it wrong.",
		"fontSize": "var(--font-size-36)",
		"textTransform": "capitalise",
		"fontWeight": "var(--font-weight-regular)",
		"data-astro-cid-3ojuvhj6": true
	})}<p class="organisation-trust-section__body" data-astro-cid-3ojuvhj6>Real projects across agriculture, automotive, logistics and fleet, financial services, energy and social impact, and every complex organisation in between.</p></div><div class="working-globally" data-astro-cid-3ojuvhj6><img src="/images/globel-trust.svg" alt="globe" data-astro-cid-3ojuvhj6><a href="#" data-panel-open="contact-panel" data-astro-cid-3ojuvhj6>Based in South Africa. <span class="wg-bold" data-astro-cid-3ojuvhj6>Working globally</span><span class="CTA-arrow" data-astro-cid-3ojuvhj6><img src="/icons/arrow-up-right-drk.svg" data-astro-cid-3ojuvhj6></span></a></div></section>` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/workpage/OrganisationalTrust.astro", void 0);
// src/data/logoCarousel.js
var logoCarousel = [
	{
		name: "Elyvate",
		logo: "/images/logos/LogoCards/Elyvate-logo-card.svg",
		href: "",
		hasCaseStudy: false
	},
	{
		name: "GritCargo",
		logo: "/images/logos/LogoCards/Gritcargo-logo-card.svg",
		href: "/work/gritcargo/",
		hasCaseStudy: true
	},
	{
		name: "Engen",
		logo: "/images/logos/LogoCards/Engen-logo-card.svg",
		href: "",
		hasCaseStudy: false
	},
	{
		name: "Spotify",
		logo: "/images/logos/LogoCards/Spotify-logo-card.svg",
		href: "/work/spotify",
		hasCaseStudy: true
	},
	{
		name: "Firedart",
		logo: "/images/logos/LogoCards/Firedart-logo-card.svg",
		href: "",
		hasCaseStudy: false
	},
	{
		name: "Time2Read",
		logo: "/images/logos/LogoCards/Time2Read-logo-card.svg",
		href: "/work/time2read/",
		hasCaseStudy: true
	},
	{
		name: "Berylls",
		logo: "/images/logos/LogoCards/Berylls-logo-card.svg",
		href: "",
		hasCaseStudy: false
	},
	{
		name: "BTCorp",
		logo: "/images/logos/LogoCards/BTCORP-logo-card.svg",
		href: "",
		hasCaseStudy: false
	}
];
// src/components/ui/Carousels/CaseStudyLogoCarousel.astro
createAstro("https://astro.build");
var $$CaseStudyLogoCarousel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CaseStudyLogoCarousel;
	const { duration = 30 } = Astro.props;
	const logos = logoCarousel;
	return renderTemplate`${maybeRenderHead($$result)}<section class="logo-carousel" aria-label="Our clients"${addAttribute(`--scroll-duration: ${duration}s`, "style")} data-astro-cid-3j6tmq66><div class="logo-carousel__track" data-astro-cid-3j6tmq66>${Array.from({ length: 2 }, (_, groupIndex) => renderTemplate`<div class="logo-carousel__group"${addAttribute(groupIndex === 1 ? "true" : void 0, "aria-hidden")} data-astro-cid-3j6tmq66>${logos.map((logo) => renderTemplate`<div class="logo-carousel__item" data-astro-cid-3j6tmq66>${logo.href ? renderTemplate`<a class="logo-carousel__card"${addAttribute(logo.href, "href")}${addAttribute(logo.hasCaseStudy ? `View ${logo.name} case study` : `Visit ${logo.name}`, "aria-label")}${addAttribute(groupIndex === 1 ? -1 : void 0, "tabindex")} data-astro-cid-3j6tmq66><img${addAttribute(logo.logo, "src")}${addAttribute(groupIndex === 0 ? logo.alt || logo.name : "", "alt")} class="logo-carousel__image" loading="lazy" data-astro-cid-3j6tmq66>${logo.hasCaseStudy && renderTemplate`<span class="logo-carousel__label" data-astro-cid-3j6tmq66>Case Study</span>`}</a>` : renderTemplate`<div class="logo-carousel__card" data-astro-cid-3j6tmq66><img${addAttribute(logo.logo, "src")}${addAttribute(groupIndex === 0 ? logo.alt || logo.name : "", "alt")} class="logo-carousel__image" loading="lazy" data-astro-cid-3j6tmq66>${logo.hasCaseStudy && renderTemplate`<span class="logo-carousel__label" data-astro-cid-3j6tmq66>Case Study</span>`}</div>`}</div>`)}</div>`)}</div></section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Carousels/CaseStudyLogoCarousel.astro", void 0);
// src/sections/workpage/DecadeBusiness.astro
var $$DecadeBusiness = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="decadeBusiness-section" data-astro-cid-ibwou3ln>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-ibwou3ln": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "A decade in business",
		"fontSize": "var(--font-size-36)",
		"mobileFontSize": "var(--font-size-30)",
		"fontWeight": "var(--font-weight-regular)",
		"color": "var(--navy)",
		"textTransform": "sentencase",
		"class": "decadeBusiness-section__title",
		"data-astro-cid-ibwou3ln": true
	})}${renderComponent($$result, "Columns", $$Columns, {
		"layout": "33-33-33",
		"gap": "var(--space-20)",
		"align": "center",
		"class": "decadeBusiness-section-columns",
		"data-astro-cid-ibwou3ln": true
	}, { "default": ($$result) => renderTemplate`<div class="avo-stats" data-astro-cid-ibwou3ln><h4 data-astro-cid-ibwou3ln>50+</h4><p data-astro-cid-ibwou3ln>engineers, designers and AI specialists</p></div><div class="avo-stats" data-astro-cid-ibwou3ln><h4 data-astro-cid-ibwou3ln>200+</h4><p data-astro-cid-ibwou3ln>Projects</p></div><div class="avo-stats" data-astro-cid-ibwou3ln><h4 data-astro-cid-ibwou3ln>ISO 27001</h4><p data-astro-cid-ibwou3ln>certified</p></div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/workpage/DecadeBusiness.astro", void 0);
// src/sections/workpage/RealWork.astro
var $$RealWork = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="RealWork-section" data-astro-cid-2jj3rbh3>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-2jj3rbh3": true }, { "default": ($$result) => renderTemplate`<div class="RealWork-section-inner" data-astro-cid-2jj3rbh3><h3 data-astro-cid-2jj3rbh3>Real Work. Real Clients. Real Impact.</h3>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Different industries. Same kind of problem: systems too important to get wrong. Here's how we've solved it.",
		"fontSize": "var(--font-size-36)",
		"mobileFontSize": "var(--font-size-30)",
		"color": "var(--navy)",
		"textTransform": "capitalise",
		"fontWeight": "var(--font-weight-regular)",
		"lineHeight": "1.2",
		"class": "RealWork-section-inner__title",
		"data-astro-cid-2jj3rbh3": true
	})}<p data-astro-cid-2jj3rbh3>What's below is only part of it. Every project here started with a single problem to solve, and most didn't stop there. Scope grew. New phases followed. We stayed on to modernise, to keep foundations steady, and to keep building, as one team with the client, not a vendor who finished and left</p></div>` })}${renderComponent($$result, "OurWorkSection", $$OurWorkSection, { "data-astro-cid-2jj3rbh3": true })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/workpage/RealWork.astro", void 0);
// src/sections/workpage/AvoCompliance.astro
var $$AvoCompliance = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="compliance-first-section" data-astro-cid-qewh4ohm>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-qewh4ohm": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HighlightSection", $$HighlightSection, {
		"columns": 3,
		"customColumns": "9.75rem minmax(0, 1fr) minmax(0, 1fr)",
		"background": "transparent",
		"textColor": "var(--navy)",
		"padding": "var(--space-8) var(--space-16)",
		"minHeight": "21.562rem",
		"data-astro-cid-qewh4ohm": true
	}, { "default": ($$result) => renderTemplate`<div class="iso-certification-badge" data-astro-cid-qewh4ohm><img src="/images/iso_badge.svg" alt="ISO Certification" data-astro-cid-qewh4ohm></div><div class="iso-heading" data-astro-cid-qewh4ohm><span class="certified-pill" data-astro-cid-qewh4ohm>ISO 27001 Certified</span><h4 data-astro-cid-qewh4ohm>Why clients keep coming back.</h4></div><div class="iso-description" data-astro-cid-qewh4ohm><p data-astro-cid-qewh4ohm>One of our clients has worked with us for over 10 years, and counting. That's not an accident. We hold ISO 27001 for information security, and we treat every engagement as the start of a long-term relationship, not a single delivery.</p></div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/workpage/AvoCompliance.astro", void 0);
// src/pages/work/index.astro
var work_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Our Work" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "OurWorkHero", $$OurWorkHero, {})}${renderComponent($$result, "OrganisationalTrust", $$OrganisationalTrust, {})}${renderComponent($$result, "CaseStudyLogoCarousel", $$CaseStudyLogoCarousel, {})}${renderComponent($$result, "DecadeBusiness", $$DecadeBusiness, {})}${renderComponent($$result, "RealWork", $$RealWork, {})}${renderComponent($$result, "AvoCompliance", $$AvoCompliance, {})}${renderComponent($$result, "WhatClientsSay", $$WhatClientsSay, {})}${renderComponent($$result, "ContactFooter", $$ContactFooter, {})}` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/work/index.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/work/index.astro";
var $$url = "/work";
// \0virtual:astro:page:src/pages/work/index@_@astro
var page = () => work_exports;
export { page };
