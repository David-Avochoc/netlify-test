import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { _ as addAttribute, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container, c as renderScript, i as $$Columns, s as $$PrimaryBtn, t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
import { i as $$ScrollLockCards, n as $$OrbBackground, r as $$LargeCard, t as $$ISOCertified } from "./ISOCertified_ChLzNd6I.mjs";
import { n as $$PreviewHoverList, t as ourWork } from "./ourWork_BHYLuv0G.mjs";
import { t as $$WhatClientsSay } from "./WhatClientsSay_BeUZava3.mjs";
import { t as $$ContactFooter } from "./ContactFooter_BnyGinfL.mjs";
// src/sections/homepage/HomeHero.astro
var $$HomeHero = createComponent(($$result, $$props, $$slots) => {
	const videoPath = "/videos/Hero-Vid.mp4";
	return renderTemplate`${maybeRenderHead($$result)}<section class="hero-wrapper" data-astro-cid-gny3q2af><video class="bg-video" muted loop playsinline data-astro-cid-gny3q2af><source${addAttribute(videoPath, "src")} type="video/mp4" data-astro-cid-gny3q2af></video><div class="content-container" data-astro-cid-gny3q2af>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-gny3q2af": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"class": "interactive-columns",
		"layout": "50-50",
		"align": "center",
		"data-astro-cid-gny3q2af": true
	}, { "default": ($$result) => renderTemplate`<div class="interactive-column" data-astro-cid-gny3q2af><div class="video-card" data-astro-cid-gny3q2af><video class="card-video" muted loop playsinline data-astro-cid-gny3q2af><source${addAttribute(videoPath, "src")} type="video/mp4" data-astro-cid-gny3q2af></video></div></div><div class="text-column" data-astro-cid-gny3q2af><h1 data-astro-cid-gny3q2af>Custom software and AI built to work<br data-astro-cid-gny3q2af>with your systems, <span class="dimmed" data-astro-cid-gny3q2af>not replace them.</span></h1><div class="hero__actions" data-astro-cid-gny3q2af>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "START THE CONVERSATION",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"data-astro-cid-gny3q2af": true
	})}</div></div>` })}` })}</div></section>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/HomeHero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/HomeHero.astro", void 0);
// src/sections/homepage/Map.astro
createAstro("https://astro.build");
var $$Map = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Map;
	const { title = "AvoChoc builds solutions that work in the real world, not only the slide deck." } = Astro.props;
	const logos = [
		"/images/logos/elyvate_logo.svg",
		"/images/logos/Engen.svg",
		"/images/logos/Firedart_Logo.svg",
		"/images/logos/gritcargo_Logo.svg",
		"/images/logos/BERYLLS.svg"
	];
	return renderTemplate`${maybeRenderHead($$result)}<section class="map-section" data-astro-cid-6il2lw4x><!-- Map Background --><div class="map-background" style="background-image: url('/images/AvoChoc-Map.svg')" data-astro-cid-6il2lw4x></div><div class="map-content" data-astro-cid-6il2lw4x><h2 data-astro-cid-6il2lw4x>${title}</h2><div class="pills-container" data-astro-cid-6il2lw4x><div class="pill" data-astro-cid-6il2lw4x><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-6il2lw4x><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" data-astro-cid-6il2lw4x></path><circle cx="12" cy="10" r="3" data-astro-cid-6il2lw4x></circle></svg>Based in South Africa.</div><div class="pill" data-astro-cid-6il2lw4x><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-6il2lw4x><circle cx="12" cy="12" r="10" data-astro-cid-6il2lw4x></circle><line x1="2" y1="12" x2="22" y2="12" data-astro-cid-6il2lw4x></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" data-astro-cid-6il2lw4x></path></svg>Working globally.</div></div></div><div class="sa-glow-overlay" data-astro-cid-6il2lw4x><div class="ring ring-1" data-astro-cid-6il2lw4x></div><div class="ring ring-2" data-astro-cid-6il2lw4x></div><div class="ring ring-3" data-astro-cid-6il2lw4x></div></div><div class="logo-carousel-wrapper" data-astro-cid-6il2lw4x><div class="logo-track" data-astro-cid-6il2lw4x>${logos.map((logo) => renderTemplate`<img${addAttribute(logo, "src")} alt="Partner Logo" class="carousel-logo" loading="lazy" data-astro-cid-6il2lw4x>`)}${logos.map((logo) => renderTemplate`<img${addAttribute(logo, "src")} alt="Partner Logo" class="carousel-logo" loading="lazy" data-astro-cid-6il2lw4x>`)}</div></div></section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/Map.astro", void 0);
// src/sections/homepage/AvoApproach.astro
var $$AvoApproach = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="avo-approach-section" data-astro-cid-i6ais6az>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-i6ais6az": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "33-33-33",
		"gap": "0",
		"class": "avo-approach-columns",
		"data-astro-cid-i6ais6az": true
	}, { "default": ($$result) => renderTemplate`<div class="avo-approach-left" data-astro-cid-i6ais6az>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Move fast and introduce risk. <span class='light-txt'>Or stay stable and fall behind.</span>",
		"fontSize": "var(--font-size-36)",
		"mobileFontSize": "var(--font-size-30)",
		"fontWeight": "var(--font-weight-regular)",
		"color": "var(--navy)",
		"textTransform": "none",
		"data-astro-cid-i6ais6az": true
	})}</div><div class="avo-approach-center" aria-label="Abstract green graphic" data-astro-cid-i6ais6az></div><div class="avo-approach-right" data-astro-cid-i6ais6az><div class="avo-approach-right__content" data-astro-cid-i6ais6az><p data-astro-cid-i6ais6az>Most organisations don't struggle because they lack ambition. They struggle because their systems carry too much. Old platforms. Daily operations that depend on each other. Rules they have to follow. Every component relies on the next. Change one thing, and you risk breaking something else.</p><br data-astro-cid-i6ais6az><p data-astro-cid-i6ais6az>Most partners only work one way. Some push new ideas without understanding your limits. Others protect what you have, but don't help you move forward. Neither works when your systems can't afford to fail.</p><br data-astro-cid-i6ais6az><p class="avo-approach-bold" data-astro-cid-i6ais6az>We take a new approach.</p><br data-astro-cid-i6ais6az><p data-astro-cid-i6ais6az>We deliver secure modernisation for large organisations, without disrupting day-to-day operations. We build systems for the real world, not the ideal one.</p></div>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "Work with us",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"data-astro-cid-i6ais6az": true
	})}</div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/AvoApproach.astro", void 0);
// src/components/cards/LargeCTACard.astro
createAstro("https://astro.build");
var $$LargeCTACard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LargeCTACard;
	const { image, imageAlt, title, description, ctaLabel, href, panelOpen, width = "100%", minWidth = "0", maxWidth = "40.312rem", height = "auto", imageHeight = "24.187rem", imagePadding = "0", gap = "var(--space-44)", backgroundColor = "var(--white)", textColor = "var(--navy)", borderRadius = "var(--border-radius-med)" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<a class="large-cta-card"${addAttribute(href ?? (panelOpen ? `#${panelOpen}` : void 0), "href")}${addAttribute(panelOpen, "data-panel-open")}${addAttribute(`--card-width: ${width}; --card-min-width: ${minWidth}; --card-max-width: ${maxWidth}; --card-height: ${height}; --card-image-height: ${imageHeight}; --card-image-padding: ${imagePadding}; --card-gap: ${gap}; --card-background: ${backgroundColor}; --card-text-color: ${textColor}; --card-radius: ${borderRadius};`, "style")} data-astro-cid-owocq4gl><div class="large-cta-card__image-wrapper" data-astro-cid-owocq4gl><img class="large-cta-card__image"${addAttribute(image, "src")}${addAttribute(imageAlt, "alt")} loading="lazy" data-astro-cid-owocq4gl></div><div class="large-cta-card__body" data-astro-cid-owocq4gl><div class="large-cta-card__content" data-astro-cid-owocq4gl><h3 class="large-cta-card__title" data-astro-cid-owocq4gl>${title}</h3><p class="large-cta-card__description" data-astro-cid-owocq4gl>${description}</p></div><div class="large-cta-card__divider" data-astro-cid-owocq4gl></div><div class="large-cta-card__cta" data-astro-cid-owocq4gl><span class="large-cta-card__label" data-astro-cid-owocq4gl>${ctaLabel}</span><span class="large-cta-card__arrow" data-astro-cid-owocq4gl><img src="/icons/arrow-up-right-drk.svg" alt="" aria-hidden="true" data-astro-cid-owocq4gl></span></div></div></a>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/cards/LargeCTACard.astro", void 0);
// src/sections/homepage/WhatWeBuild.astro
var $$WhatWeBuild = createComponent(($$result, $$props, $$slots) => {
	const services = [
		{
			image: "/images/backgrounds/cards/AvoSoftwareDev.webp",
			imageAlt: "Custom software development",
			title: "Custom Software Development",
			description: "Enterprise-grade software built around how your business actually works. Not around what a framework says it should do. We map constraints before we write a line of code.",
			ctaLabel: "See our approach",
			href: "/services"
		},
		{
			image: "/images/backgrounds/cards/AvoMachineLearning.webp",
			imageAlt: "AI and machine learning",
			title: "AI & Machine Learning",
			description: "AI that earns its place in real workflows, not only boardroom demos. We use AI where it can prove its value. Not where it only looks impressive.",
			ctaLabel: "See AI services",
			panelOpen: "contact-panel"
		},
		{
			image: "/images/backgrounds/cards/AvoSystemIntegration.webp",
			imageAlt: "System integration and modernisation",
			title: "System Integration & Modernisation",
			description: "Legacy infrastructure carrying years of decisions doesn't get replaced overnight. We modernise in a way that respects what's already working.",
			ctaLabel: "See our work",
			href: "/services/system-integration"
		},
		{
			image: "/images/backgrounds/cards/AvoProductDev.webp",
			imageAlt: "Product development",
			title: "Product Development",
			description: "From post-MVP chaos to production-ready software. We turn prototypes into systems that last. Built for real users, real scale, real pressure.",
			ctaLabel: "How we work",
			href: "/services/product-development"
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<section class="what-we-build-section" data-what-we-build data-astro-cid-7bsnb5vf>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-7bsnb5vf": true }, { "default": ($$result) => renderTemplate`<div class="what-we-build-section__intro" data-astro-cid-7bsnb5vf>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "What We Build",
		"fontSize": "var(--font-size-24)",
		"fontWeight": "var(--font-weight-semibold)",
		"textTransform": "uppercase",
		"color": "var(--navy)",
		"class": "what-we-build__title",
		"data-astro-cid-7bsnb5vf": true
	})}<h3 class="what-we-build-body" data-astro-cid-7bsnb5vf>From legacy system modernisation to production-ready AI development.<span class="light-txt" data-astro-cid-7bsnb5vf>Everything built for the environments your business actually runs in.</span></h3></div><nav class="what-we-build-section__pills" aria-label="Services" data-astro-cid-7bsnb5vf>${services.map((service, index) => renderTemplate`<button type="button"${addAttribute(["what-we-build-section__pill", { "is-active": index === 0 }], "class:list")}${addAttribute(index === 0 ? "true" : "false", "aria-pressed")}${addAttribute(index, "data-service-pill")} data-astro-cid-7bsnb5vf>${service.title}</button>`)}</nav><div class="what-we-build-section__viewport" data-service-viewport data-astro-cid-7bsnb5vf><div class="what-we-build-section__track" data-service-track data-astro-cid-7bsnb5vf>${services.map((service, index) => renderTemplate`<article class="what-we-build-section__card"${addAttribute(index, "data-service-card")} data-astro-cid-7bsnb5vf>${renderComponent($$result, "LargeCtaCard", $$LargeCTACard, {
		"image": service.image,
		"imageAlt": service.imageAlt,
		"title": service.title,
		"description": service.description,
		"ctaLabel": service.ctaLabel,
		"href": service.href,
		"panelOpen": service.panelOpen,
		"width": "100%",
		"minWidth": "0",
		"maxWidth": "none",
		"height": "100%",
		"imageHeight": "18rem",
		"gap": "var(--space-32)",
		"data-astro-cid-7bsnb5vf": true
	})}</article>`)}</div></div>` })}</section>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/WhatWeBuild.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/WhatWeBuild.astro", void 0);
// src/sections/homepage/HowWeWork_Home.astro
var $$HowWeWorkHome = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "OrbBackground", $$OrbBackground, {
		"class": "how-we-work-background",
		"fixed": true,
		"base": "#ebecf0",
		"teal": "#63a1a0",
		"cyan": "#adf1f1",
		"yellow": "#d9eec1",
		"speed": 1,
		"intensity": .8,
		"grain": true,
		"data-astro-cid-ghd5trxu": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="how-we-work-section_home" data-astro-cid-ghd5trxu>${renderComponent($$result, "ScrollLockCards", $$ScrollLockCards, {
		"steps": 3,
		"data-astro-cid-ghd5trxu": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Container", $$Container, { "data-astro-cid-ghd5trxu": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "40-60",
		"gap": "var(--space-80)",
		"align": "center",
		"class": "how-we-work_home-columns",
		"data-astro-cid-ghd5trxu": true
	}, { "default": ($$result) => renderTemplate`<div class="how_we_work-section_home-left" data-astro-cid-ghd5trxu>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "How we work",
		"fontSize": "var(--font-size-24)",
		"fontWeight": "var(--font-weight-semibold)",
		"textTransform": "uppercase",
		"color": "var(--navy)",
		"class": "how-we-work-section__title",
		"data-astro-cid-ghd5trxu": true
	})}<h3 class="solutions-body-txt-main" data-astro-cid-ghd5trxu>We don't start with solutions.<br data-astro-cid-ghd5trxu><span class="body-txt-light" data-astro-cid-ghd5trxu>We start by understanding what can't break.</span></h3><p class="solutions-body-txt-sub" data-astro-cid-ghd5trxu>You won't get big promises upfront. You'll get clear thinking, trade-offs, and a realistic path forward.</p></div><div class="how_we_work-section_home-right" data-astro-cid-ghd5trxu><div class="stack-cards" data-astro-cid-ghd5trxu><div data-stack-item data-astro-cid-ghd5trxu>${renderComponent($$result, "LargeCard", $$LargeCard, {
		"animation": "/animations/AvoWebsite-Lottie-1.lottie",
		"imageBackground": "/images/backgrounds/cards/AvoCardBackground.webp",
		"imageAlt": "Map What Matters",
		"title": "Map What Matters",
		"description": "Before we design anything, we find out what can't change. That means mapping dependencies, risk surfaces, and constraints.",
		"step": "Step",
		"stepNumber": "1",
		"height": "42.127rem",
		"imageHeight": "22.062rem",
		"gap": "var(--space-34)",
		"backgroundColor": "var(--white)",
		"maxWidth": "auto",
		"data-astro-cid-ghd5trxu": true
	})}</div><div data-stack-item data-astro-cid-ghd5trxu>${renderComponent($$result, "LargeCard", $$LargeCard, {
		"animation": "/animations/AvoWebsite-Lottie-2.lottie",
		"imageBackground": "/images/backgrounds/cards/AvoCardBackground.webp",
		"imageAlt": "Design Around Constraints",
		"title": "Design Around Constraints",
		"description": "We don't simplify by ignoring your reality. We simplify by working within it. Every decision accounts for how your business actually runs.",
		"step": "Step",
		"stepNumber": "2",
		"height": "42.127rem",
		"imageHeight": "22.062rem",
		"gap": "var(--space-34)",
		"backgroundColor": "var(--white)",
		"maxWidth": "auto",
		"data-astro-cid-ghd5trxu": true
	})}</div><div data-stack-item data-astro-cid-ghd5trxu>${renderComponent($$result, "LargeCard", $$LargeCard, {
		"animation": "/animations/AvoWebsite-Lottie-3.lottie",
		"imageBackground": "/images/backgrounds/cards/AvoCardBackground.webp",
		"imageAlt": "Build for What Happens After",
		"title": "Build for What Happens After",
		"description": "Delivery isn't the finish line. We build for post-go-live: the edge cases, the scale, the Monday morning when real users hit a real system. (That Monday morning. Every CIO knows the one.)",
		"step": "Step",
		"stepNumber": "3",
		"height": "42.127rem",
		"imageHeight": "22.062rem",
		"backgroundColor": "var(--white)",
		"maxWidth": "auto",
		"data-astro-cid-ghd5trxu": true
	})}</div></div></div>` })}` })}` })}</section>` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/HowWeWork_Home.astro", void 0);
// src/data/workSelections.js
var hoverPreviewProjects = [
	"gritcargo",
	"cvo",
	"elyvate",
	"firedart",
	"iteach"
];
// src/utils/getProjects.js
function getProjectsBySlug(allProjects, selectedSlugs) {
	const projectsBySlug = new Map(allProjects.map((project) => [project.slug, project]));
	return selectedSlugs.map((slug) => {
		const project = projectsBySlug.get(slug);
		if (!project) throw new Error(`Project "${slug}" was not found in ourWork.js`);
		return project;
	});
}
// src/sections/homepage/CaseSudies_Home.astro
var $$CaseSudiesHome = createComponent(($$result, $$props, $$slots) => {
	const projects = getProjectsBySlug(ourWork, hoverPreviewProjects);
	return renderTemplate`${maybeRenderHead($$result)}<section class="case-studies-showcase-section" data-astro-cid-mpxqrcqb>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-mpxqrcqb": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Case Studies",
		"fontSize": "var(--font-size-24)",
		"mobileFontSize": "var(--font-size-30)",
		"fontWeight": "var(--font-weight-semibold)",
		"color": "var(--navy)",
		"textTransform": "uppercase",
		"data-astro-cid-mpxqrcqb": true
	})}${renderComponent($$result, "PreviewHoverList", $$PreviewHoverList, {
		"projects": projects,
		"data-astro-cid-mpxqrcqb": true
	})}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/homepage/CaseSudies_Home.astro", void 0);
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Home",
		"description": "Progress Done Properly"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HomeHero", $$HomeHero, {})}${renderComponent($$result, "Map", $$Map, {})}${renderComponent($$result, "AvoApproach", $$AvoApproach, {})}${renderComponent($$result, "WhatWeBuild", $$WhatWeBuild, {})}${renderComponent($$result, "HowWeWork_Home", $$HowWeWorkHome, {})}${renderComponent($$result, "CaseSudies_Home", $$CaseSudiesHome, {})}${renderComponent($$result, "WhatClientsSay", $$WhatClientsSay, {})}${renderComponent($$result, "ContactFooter", $$ContactFooter, {})}${renderComponent($$result, "ISOCertified", $$ISOCertified, {})}` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/index.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
