import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { _ as addAttribute, c as renderSlot, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container, c as renderScript, i as $$Columns, o as $$SecondaryBtn, s as $$PrimaryBtn, t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$Hero } from "./Hero_qzH1GuZs.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
import { t as $$HighlightBox } from "./HighlightBox_CboipHlT.mjs";
import { t as $$HighlightSection } from "./HighlightSection_B07rGijS.mjs";
import { t as $$ContactFooter } from "./ContactFooter_BnyGinfL.mjs";
// src/components/ui/GlassCursor.astro
createAstro("https://astro.build");
var $$GlassCursor = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GlassCursor;
	const { size = 180, refraction = 100, depth = 395.31, dispersion = 100, frost = 0, lightAngle = -45, lightIntensity = 80, smoothing = .25, hideNativeCursor = false, scope = "", clip = true } = Astro.props;
	const rimAngle = 90 - lightAngle;
	return renderTemplate`${maybeRenderHead($$result)}<!-- SVG filter: displacement map + per-channel offsets = refraction with dispersion --><svg aria-hidden="true" focusable="false" width="0" height="0" style="position:absolute;pointer-events:none"><defs><filter id="glass-cursor-filter" x="0" y="0"${addAttribute(size, "width")}${addAttribute(size, "height")} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feGaussianBlur id="gc-blur" in="SourceGraphic" stdDeviation="0" result="src"></feGaussianBlur><feImage id="gc-map" x="0" y="0"${addAttribute(size, "width")}${addAttribute(size, "height")} preserveAspectRatio="none" result="map"></feImage><feDisplacementMap id="gc-dr" in="src" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G" result="dr"></feDisplacementMap><feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"></feColorMatrix><feDisplacementMap id="gc-dg" in="src" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G" result="dg"></feDisplacementMap><feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"></feColorMatrix><feDisplacementMap id="gc-db" in="src" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G" result="db"></feDisplacementMap><feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"></feColorMatrix><feBlend in="r" in2="g" mode="screen" result="rg"></feBlend><feBlend in="rg" in2="b" mode="screen"></feBlend></filter></defs></svg><div id="glass-cursor"${addAttribute(["glass-cursor", { "hide-cursor": hideNativeCursor }], "class:list")} aria-hidden="true"${addAttribute(size, "data-size")}${addAttribute(refraction, "data-refraction")}${addAttribute(depth, "data-depth")}${addAttribute(dispersion, "data-dispersion")}${addAttribute(frost, "data-frost")}${addAttribute(smoothing, "data-smoothing")}${addAttribute(scope, "data-scope")}${addAttribute(clip, "data-clip")}${addAttribute(`--gc-size:${size}px;--gc-rim-angle:${rimAngle}deg;--gc-light:${lightIntensity / 100};`, "style")}></div>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/GlassCursor.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/GlassCursor.astro", void 0);
// src/sections/aipage/AiHero.astro
var $$AiHero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="ai-hero-section" id="ai-hero-section" data-astro-cid-qsidmd2j><div id="hero-content" data-astro-cid-qsidmd2j>${renderComponent($$result, "Hero", $$Hero, {
		"backgroundImage": "/images/backgrounds/hero/blue-orbs-background.webp",
		"data-astro-cid-qsidmd2j": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Container", $$Container, { "data-astro-cid-qsidmd2j": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"class": "ai-hero-container",
		"layout": "50-50",
		"align": "stretch",
		"data-astro-cid-qsidmd2j": true
	}, { "default": ($$result) => renderTemplate`<div class="ai-hero-left" data-astro-cid-qsidmd2j><h1 data-astro-cid-qsidmd2j>[AI] that<br data-astro-cid-qsidmd2j><span class="gradient-text" data-astro-cid-qsidmd2j>earns its place</span></h1></div><div class="ai-hero-right" data-astro-cid-qsidmd2j><p data-astro-cid-qsidmd2j>We build custom software, AI, and integrated systems for organisations operating under conditions where failure is expensive, visible, and hard to undo.</p><div class="hero__actions" data-astro-cid-qsidmd2j>${renderComponent($$result, "SecondaryBtn", $$SecondaryBtn, {
		"href": "/contact",
		"text": "Talk to our team",
		"data-astro-cid-qsidmd2j": true
	})}${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "Take our AI maturity assessment",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"data-astro-cid-qsidmd2j": true
	})}</div></div>` })}` })}` })}</div>${renderComponent($$result, "GlassCursor", $$GlassCursor, { "data-astro-cid-qsidmd2j": true })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/AiHero.astro", void 0);
// src/sections/aipage/TheReality.astro
var $$TheReality = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="the-reality-section" data-astro-cid-s6mkaswe>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-s6mkaswe": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"class": "the-reality-container",
		"layout": "50-50",
		"align": "stretch",
		"gap": "2rem",
		"data-astro-cid-s6mkaswe": true
	}, { "default": ($$result) => renderTemplate`<div class="the-reality-left" data-astro-cid-s6mkaswe>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "The Reality",
		"fontSize": "var(--font-size-36)",
		"mobileFontSize": "var(--font-size-20)",
		"data-astro-cid-s6mkaswe": true
	})}<h3 data-astro-cid-s6mkaswe>Everyone says they do AI. Most of it never leaves the prototype stage.</h3></div><div class="the-reality-right" data-astro-cid-s6mkaswe><p class="reality-light-txt" data-astro-cid-s6mkaswe>AI is not short on promises. It is short on production.</p><p class="reality-dark-txt" data-astro-cid-s6mkaswe>The problem is rarely the model. It is usually the workflow nobody mapped, the data nobody prepared, or the AI first build nobody validated against how the business actually runs.</p>${renderComponent($$result, "HighlightBox", $$HighlightBox, {
		"fontSize": "var(--font-size-24)",
		"data-astro-cid-s6mkaswe": true
	}, { "default": ($$result) => renderTemplate`
          That gap is where we work
        ` })}</div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/TheReality.astro", void 0);
// src/components/ui/ScrollTabs.astro
createAstro("https://astro.build");
var $$ScrollTabs = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ScrollTabs;
	const { tabs, scrollHeight = "400vh", gap = "var(--space-8)", class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["scroll-tabs", className], "class:list")}${addAttribute(`--scroll-tabs-height: ${scrollHeight}; --scroll-tabs-gap: ${gap};`, "style")} data-astro-cid-rlwfpkyg><div class="scroll-tabs__sticky" data-astro-cid-rlwfpkyg><div class="scroll-tabs__inner" data-astro-cid-rlwfpkyg><div class="scroll-tabs__heading" data-astro-cid-rlwfpkyg>${renderSlot($$result, $$slots["heading"])}</div><div class="scroll-tabs__tabs" role="tablist" aria-label="Section navigation" data-astro-cid-rlwfpkyg>${tabs.map((tab, index) => renderTemplate`<button type="button"${addAttribute(["scroll-tabs__tab", { active: index === 0 }], "class:list")}${addAttribute(`scroll-tab-${index}`, "id")} role="tab"${addAttribute(index === 0, "aria-selected")}${addAttribute(`scroll-panel-${index}`, "aria-controls")} tabindex="-1" data-astro-cid-rlwfpkyg>${tab}</button>`)}</div><div class="scroll-tabs__panels" data-astro-cid-rlwfpkyg>${renderSlot($$result, $$slots["default"])}</div><div class="scroll-tabs__footer" data-astro-cid-rlwfpkyg>${renderSlot($$result, $$slots["footer"])}</div></div></div></div>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/ScrollTabs.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/ScrollTabs.astro", void 0);
// src/sections/aipage/WeTell.astro
var $$WeTell = createComponent(($$result, $$props, $$slots) => {
	const tabs = [
		"Readiness",
		"Discovery",
		"Honesty",
		"Risk"
	];
	return renderTemplate`${maybeRenderHead($$result)}<section class="we-tell-section" data-astro-cid-inhjvlcb>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-inhjvlcb": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ScrollTabs", $$ScrollTabs, {
		"tabs": tabs,
		"scrollHeight": "400vh",
		"class": "we-tell__scroll-tabs",
		"gap": "var(--space-8)",
		"data-astro-cid-inhjvlcb": true
	}, {
		"default": ($$result) => renderTemplate`<div class="scroll-tabs__panel" id="scroll-panel-0" role="tabpanel" aria-labelledby="scroll-tab-0" data-astro-cid-inhjvlcb>${renderComponent($$result, "Columns", $$Columns, {
			"layout": "33-33-33",
			"gap": "1rem",
			"align": "center",
			"class": "we-tell__panel",
			"data-astro-cid-inhjvlcb": true
		}, { "default": ($$result) => renderTemplate`<div class="panel-left" data-astro-cid-inhjvlcb><h3 data-astro-cid-inhjvlcb>Readiness</h3><span class="phonetic" data-astro-cid-inhjvlcb> /'rɛdɪnɪs/ </span><p class="definition" data-astro-cid-inhjvlcb>being fully prepared for action or showing a clear willingness to do something.</p></div><div class="panel-center" data-astro-cid-inhjvlcb><img src="/images/visuals/Ai_Page.Readiness.svg" alt="Readiness" loading="lazy" data-astro-cid-inhjvlcb></div><div class="panel-right" data-astro-cid-inhjvlcb><span class="step" data-astro-cid-inhjvlcb>01/04</span><h4 data-astro-cid-inhjvlcb>Not everything needs AI</h4><p data-astro-cid-inhjvlcb>Some workflows are ready. Some aren't yet. Some never will be — and that's fine.</p></div>` })}</div><div class="scroll-tabs__panel" id="scroll-panel-1" role="tabpanel" aria-labelledby="scroll-tab-1" data-astro-cid-inhjvlcb>${renderComponent($$result, "Columns", $$Columns, {
			"layout": "33-33-33",
			"gap": "1rem",
			"align": "center",
			"class": "we-tell__panel",
			"data-astro-cid-inhjvlcb": true
		}, { "default": ($$result) => renderTemplate`<div class="panel-left" data-astro-cid-inhjvlcb><h3 data-astro-cid-inhjvlcb>Discovery</h3><span class="phonetic" data-astro-cid-inhjvlcb> /dɪˈskʌv(ə)ri/ </span><p class="definition" data-astro-cid-inhjvlcb>the action or process of finding something or finding out about something for the first time.</p></div><div class="panel-center" data-astro-cid-inhjvlcb><img src="/images/visuals/Ai_Page_Discovery.svg" alt="Discovery" loading="lazy" data-astro-cid-inhjvlcb></div><div class="panel-right" data-astro-cid-inhjvlcb><span class="step" data-astro-cid-inhjvlcb>02/04</span><h4 data-astro-cid-inhjvlcb>Finding the real problem</h4><p data-astro-cid-inhjvlcb>We don't start with solutions. We look at your current systems to find out where the friction actually lives.</p></div>` })}</div><div class="scroll-tabs__panel" id="scroll-panel-2" role="tabpanel" aria-labelledby="scroll-tab-2" data-astro-cid-inhjvlcb>${renderComponent($$result, "Columns", $$Columns, {
			"layout": "33-33-33",
			"gap": "1rem",
			"align": "center",
			"class": "we-tell__panel",
			"data-astro-cid-inhjvlcb": true
		}, { "default": ($$result) => renderTemplate`<div class="panel-left" data-astro-cid-inhjvlcb><h3 data-astro-cid-inhjvlcb>Honesty</h3><span class="phonetic" data-astro-cid-inhjvlcb> /ˈɒnɪsti/ </span><p class="definition" data-astro-cid-inhjvlcb>the quality of being free of deceit; truthfulness; sincerity.</p></div><div class="panel-center" data-astro-cid-inhjvlcb><img src="/images/visuals/Ai_Page _Honesty.svg" alt="Honesty" loading="lazy" data-astro-cid-inhjvlcb></div><div class="panel-right" data-astro-cid-inhjvlcb><span class="step" data-astro-cid-inhjvlcb>03/04</span><h4 data-astro-cid-inhjvlcb>No buzzwords allowed</h4><p data-astro-cid-inhjvlcb>If a simple database query does the job better than a language model, we will tell you to use the database.</p></div>` })}</div><div class="scroll-tabs__panel" id="scroll-panel-3" role="tabpanel" aria-labelledby="scroll-tab-3" data-astro-cid-inhjvlcb>${renderComponent($$result, "Columns", $$Columns, {
			"layout": "33-33-33",
			"gap": "1rem",
			"align": "center",
			"class": "we-tell__panel",
			"data-astro-cid-inhjvlcb": true
		}, { "default": ($$result) => renderTemplate`<div class="panel-left" data-astro-cid-inhjvlcb><h3 data-astro-cid-inhjvlcb>Risk</h3><span class="phonetic" data-astro-cid-inhjvlcb> /rɪsk/ </span><p class="definition" data-astro-cid-inhjvlcb>a situation involving exposure to danger, harm, or loss.</p></div><div class="panel-center" data-astro-cid-inhjvlcb><img src="/images/visuals/ai_page_risk.svg" alt="Risk" loading="lazy" data-astro-cid-inhjvlcb></div><div class="panel-right" data-astro-cid-inhjvlcb><span class="step" data-astro-cid-inhjvlcb>04/04</span><h4 data-astro-cid-inhjvlcb>Protecting the core</h4><p data-astro-cid-inhjvlcb>Innovation shouldn't break daily operations. We assess the vulnerabilities before writing a single line of code.</p></div>` })}</div>`,
		"heading": ($$result) => renderTemplate`${renderComponent($$result, "SectionTitle", $$SectionTitle, {
			"slot": "heading",
			"title": "We'll tell you when AI is not the answer",
			"fontSize": "var(--font-size-36)",
			"textTransform": "capitalize",
			"fontWeight": "var(--font-weight-regular)",
			"data-astro-cid-inhjvlcb": true
		})}`,
		"footer": ($$result) => renderTemplate`<p class="we-tell__footer" data-astro-cid-inhjvlcb>Four checks. No guesswork. Nothing else.</p>`
	})}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/WeTell.astro", void 0);
// src/sections/aipage/HumanFirst.astro
var $$HumanFirst = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="human-first-section" data-astro-cid-4srmscm6>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-4srmscm6": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "40-60",
		"gap": "0",
		"class": "human-first__columns",
		"data-astro-cid-4srmscm6": true
	}, { "default": ($$result) => renderTemplate`<div class="human-first__left" data-astro-cid-4srmscm6>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Human-first",
		"fontSize": "var(--font-size-36)",
		"color": "var(--white)",
		"class": "human-first__title",
		"data-astro-cid-4srmscm6": true
	})}${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Not AI-First",
		"fontSize": "var(--font-size-36)",
		"color": "transparent",
		"class": "human-first__title2",
		"data-astro-cid-4srmscm6": true
	})}</div><div class="human-first__right" data-astro-cid-4srmscm6><p class="into-txt" data-astro-cid-4srmscm6>A lot of AI-first companies start with the AI. Brainstorm with AI, architect with AI, build with AI, and check the output with a human at the end.</p></div>` })}` })}${renderComponent($$result, "Container", $$Container, { "data-astro-cid-4srmscm6": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "40-60",
		"gap": "0",
		"class": "human-first__columns2",
		"data-astro-cid-4srmscm6": true
	}, { "default": ($$result) => renderTemplate`<div class="human-first__left2" data-astro-cid-4srmscm6><img src="/images/content/staff/avo_humans_first.webp" alt="Staff working" data-astro-cid-4srmscm6></div><div class="human-first__right2" data-astro-cid-4srmscm6><div class="into-txt2" data-astro-cid-4srmscm6><p data-astro-cid-4srmscm6>We work the other way. Our people lead the thinking. AI is a tool inside that process, not a replacement for it.</p><p data-astro-cid-4srmscm6>That means the humans making decisions about your systems understand your business first, and reach for AI because it earns its place, not because it's trendy.</p><p data-astro-cid-4srmscm6>Effective business AI integration. Not AI for its own sake.</p></div>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "Learn more about ai integration",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"class": "ai-cta",
		"data-astro-cid-4srmscm6": true
	})}</div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/HumanFirst.astro", void 0);
// src/components/ui/Accordion/Accordion.astro
createAstro("https://astro.build");
var $$Accordion = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Accordion;
	const { class: className = "", gap = "0" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["accordion", className], "class:list")}${addAttribute(`--accordion-gap: ${gap};`, "style")} data-astro-cid-dmozrebl>${renderSlot($$result, $$slots["default"])}</div>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Accordion/Accordion.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Accordion/Accordion.astro", void 0);
// src/components/ui/Accordion/AccordionItem.astro
createAstro("https://astro.build");
var $$AccordionItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AccordionItem;
	const { number = "", title, backgroundColor = "transparent", backgroundOpenColor = "transparent", textColor = "var(--navy)", textOpenColor = "var(--navy)", numberColor = "var(--grey-400)", iconColor = "var(--grey-600)", titleSize = "var(--font-size-36)", contentSize = "var(--font-size-20)", paddingY = "0rem", paddingX = "0rem", contentPaddingTop = "var(--space-32)", contentPaddingBottom = "var(--space-32)", contentPaddingLeft = "var(--space-80)", contentPaddingRight = "1rem", borderColor = "transparent", borderWidth = "0px", transitionDuration = "var(--transition-duration-standard)", class: additionalClass = "" } = Astro.props;
	const panelId = `accordion-panel-${crypto.randomUUID()}`;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["accordion-item", additionalClass], "class:list")}${addAttribute(`
    --accordion-background: ${backgroundColor};
    --accordion-background-open: ${backgroundOpenColor};
    --accordion-text: ${textColor};
    --accordion-text-open: ${textOpenColor};
    --accordion-number: ${numberColor};
    --accordion-icon: ${iconColor};
    --accordion-title-size: ${titleSize};
    --accordion-content-size: ${contentSize};
    --accordion-padding-y: ${paddingY};
    --accordion-padding-x: ${paddingX};
    --accordion-content-padding-top: ${contentPaddingTop};
    --accordion-content-padding-bottom: ${contentPaddingBottom};
    --accordion-content-padding-left: ${contentPaddingLeft};
    --accordion-content-padding-right: ${contentPaddingRight};
    --accordion-border-color: ${borderColor};
    --accordion-border-width: ${borderWidth};
    --accordion-transition-duration: ${transitionDuration};
  `, "style")} data-astro-cid-3imfkj3g><button class="accordion__trigger" type="button" aria-expanded="false"${addAttribute(panelId, "aria-controls")} data-astro-cid-3imfkj3g>${number && renderTemplate`<span class="accordion__number" data-astro-cid-3imfkj3g>${number}</span>`}<span class="accordion__title" data-astro-cid-3imfkj3g>${title}</span><span class="accordion__icon" aria-hidden="true" data-astro-cid-3imfkj3g></span></button><div class="accordion__content"${addAttribute(panelId, "id")} aria-hidden="true" inert data-astro-cid-3imfkj3g><div class="accordion__content-clip" data-astro-cid-3imfkj3g><div class="accordion__content-inner" data-astro-cid-3imfkj3g>${renderSlot($$result, $$slots["default"])}</div></div></div></div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Accordion/AccordionItem.astro", void 0);
// src/sections/aipage/HowWeWork_Ai.astro
var $$HowWeWorkAi = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="how-we-work-section" data-astro-cid-dcgl4l3s>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-dcgl4l3s": true }, { "default": ($$result) => renderTemplate`<div class="how-we-work-section__inner" data-astro-cid-dcgl4l3s><div class="how-we-work-section__header" data-astro-cid-dcgl4l3s>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "How We Work",
		"fontSize": "var(--font-size-24)",
		"data-astro-cid-dcgl4l3s": true
	})}</div>${renderComponent($$result, "Accordion", $$Accordion, {
		"class": "how-we-work-section__accordion",
		"gap": "0",
		"data-astro-cid-dcgl4l3s": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "AccordionItem", $$AccordionItem, {
		"number": "01",
		"title": "AI Business Integration",
		"data-astro-cid-dcgl4l3s": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-dcgl4l3s>Mapping how your business actually works, then integrating AI where it fits your workflows, your data, and your people.</p>` })}${renderComponent($$result, "AccordionItem", $$AccordionItem, {
		"number": "02",
		"title": "AI Maturity Audits",
		"data-astro-cid-dcgl4l3s": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-dcgl4l3s>An honest, structured look at where your AI adoption actually stands: what's working, what's risky, and what to do next.</p>` })}${renderComponent($$result, "AccordionItem", $$AccordionItem, {
		"number": "03",
		"title": "AI Agent Building",
		"data-astro-cid-dcgl4l3s": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-dcgl4l3s>Mapping how your business actually works, then integrating AI where it fits your workflows, your data, and your people.</p>` })}${renderComponent($$result, "AccordionItem", $$AccordionItem, {
		"number": "04",
		"title": "Legacy System Modernisation with AI",
		"data-astro-cid-dcgl4l3s": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-dcgl4l3s>AI performs best where the training data is most mature: legacy code. We use it to help bring older systems forward without a full rebuild.</p>` })}${renderComponent($$result, "AccordionItem", $$AccordionItem, {
		"number": "05",
		"title": "From Prototype to Production",
		"data-astro-cid-dcgl4l3s": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-dcgl4l3s>Built something fast with AI and not sure it will hold up? We validate it, flag the risks, and take it from a working prototype to something production-ready.</p>` })}${renderComponent($$result, "AccordionItem", $$AccordionItem, {
		"number": "06",
		"title": "AI Training",
		"data-astro-cid-dcgl4l3s": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-dcgl4l3s>We help your team, or your developers, follow AI best practice: using it correctly, securely, and to a standard that holds up.</p>` })}${renderComponent($$result, "AccordionItem", $$AccordionItem, {
		"number": "07",
		"title": "AI Governance and Compliance",
		"data-astro-cid-dcgl4l3s": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-dcgl4l3s>Setting up the right guardrails, data handling, and oversight so your AI use meets GDPR, POPIA, and the standards your industry expects. A live dashboard gives you visibility into how AI is being used across your organisation, not just an audit trail once a year.</p>` })}${renderComponent($$result, "AccordionItem", $$AccordionItem, {
		"number": "08",
		"title": "On-Site and Local AI Deployment",
		"data-astro-cid-dcgl4l3s": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-dcgl4l3s>For businesses that need their data to stay on their own infrastructure, we deploy AI directly onto your servers rather than hosting it on ours. This is still an early-access capability. If that's where you're heading, talk to us early.</p>` })}` })}<div class="how-we-work-section__cta" data-astro-cid-dcgl4l3s>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "/contact",
		"text": "Talk to our team",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"data-astro-cid-dcgl4l3s": true
	})}${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "See real references",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"data-astro-cid-dcgl4l3s": true
	})}</div></div>` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/HowWeWork_Ai.astro", void 0);
// src/components/cards/StepRevealCard.astro
createAstro("https://astro.build");
var $$StepRevealCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$StepRevealCard;
	const { step, title, description, icon, iconAlt = "", class: className = "", height = "21.25rem", backgroundColor = "var(--grey-100)", borderColor = "var(--grey-200)", textColor = "var(--grey-500)" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute(["step-reveal-card", className], "class:list")}${addAttribute(`--step-reveal-card-height: ${height}; --step-reveal-card-bg: ${backgroundColor}; --step-reveal-card-border: ${borderColor}; --step-reveal-card-text: ${textColor};`, "style")} data-astro-cid-gerr7yxd><div class="step-reveal-card__icon" data-astro-cid-gerr7yxd><img${addAttribute(icon, "src")}${addAttribute(iconAlt, "alt")} loading="lazy" data-astro-cid-gerr7yxd></div><div class="step-reveal-card__panel" data-astro-cid-gerr7yxd><div class="step-reveal-card__content" data-astro-cid-gerr7yxd><div class="step-reveal-card__heading" data-astro-cid-gerr7yxd><span class="step-reveal-card__number" data-astro-cid-gerr7yxd>${step}</span><h3 class="step-reveal-card__title" data-astro-cid-gerr7yxd>${title}</h3></div><div class="step-reveal-card__details" data-astro-cid-gerr7yxd><div class="step-reveal-card__divider" data-astro-cid-gerr7yxd></div><p data-astro-cid-gerr7yxd>${description}</p></div></div></div></article>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/cards/StepRevealCard.astro", void 0);
// src/sections/aipage/WorkWithUs.astro
var $$WorkWithUs = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="work-with-us" data-astro-cid-ldyqi5cw>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-ldyqi5cw": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "40-60",
		"gap": "var(--space-22)",
		"align": "stretch",
		"data-astro-cid-ldyqi5cw": true
	}, { "default": ($$result) => renderTemplate`<div class="work-with-us__content" data-astro-cid-ldyqi5cw>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Here's what working with us actually looks like.",
		"fontSize": "var(--font-size-36)",
		"fontWeight": "var(--font-weight-regular)",
		"textTransform": "capatilize",
		"data-astro-cid-ldyqi5cw": true
	})}${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "See all services",
		"background": "var(--grey)",
		"textColor": "var(--navy)",
		"class": "CTA-services",
		"data-astro-cid-ldyqi5cw": true
	})}</div><div class="work-with-us__carousel" data-astro-cid-ldyqi5cw><div class="carousel-controls-container" data-astro-cid-ldyqi5cw><button class="work-with-us__arrow work-with-us__arrow--prev" type="button" aria-label="Previous Card" disabled data-astro-cid-ldyqi5cw><span aria-hidden="true" data-astro-cid-ldyqi5cw>&lt;</span></button><button class="work-with-us__arrow work-with-us__arrow--next" type="button" aria-label="Next Card" disabled data-astro-cid-ldyqi5cw><span aria-hidden="true" data-astro-cid-ldyqi5cw>&gt;</span></button></div><div class="work-with-us__grid" data-astro-cid-ldyqi5cw>${renderComponent($$result, "StepRevealCard", $$StepRevealCard, {
		"step": "01.",
		"title": "Free AI maturity assessment.",
		"description": "A short, no-obligation look at where AI could genuinely help your business, and where the risk sits.",
		"icon": "/icons/star-ai-page.svg",
		"data-astro-cid-ldyqi5cw": true
	})}${renderComponent($$result, "StepRevealCard", $$StepRevealCard, {
		"step": "02.",
		"title": "A real conversation. Not a sales call.",
		"description": "You'll speak directly with our leadership about what you actually need.",
		"icon": "/icons/flower-ai-page.svg",
		"data-astro-cid-ldyqi5cw": true
	})}${renderComponent($$result, "StepRevealCard", $$StepRevealCard, {
		"step": "03.",
		"title": "A plan, not a pitch.",
		"description": "We map your workflows and tell you, honestly, where AI fits and where it doesn't yet.",
		"icon": "/icons/clover-ai-page.svg",
		"data-astro-cid-ldyqi5cw": true
	})}${renderComponent($$result, "StepRevealCard", $$StepRevealCard, {
		"step": "04.",
		"title": "Build, integrate, or train.",
		"description": "Depending on what you need: development, integration, orLink: Insights page (not yet built, flagged in the design brief)",
		"icon": "/icons/build-ai-page.svg",
		"data-astro-cid-ldyqi5cw": true
	})}${renderComponent($$result, "StepRevealCard", $$StepRevealCard, {
		"step": "05.",
		"title": "Governance, built in.",
		"description": "Compliance and oversight set up alongside the work, not bolted on afterward.",
		"icon": "/icons/governance-ai-page.svg",
		"data-astro-cid-ldyqi5cw": true
	})}${renderComponent($$result, "StepRevealCard", $$StepRevealCard, {
		"step": "06.",
		"title": "Ongoing support.",
		"description": "AI moves fast. We keep watching so you don't have to.",
		"icon": "/icons/support-ai-page.svg",
		"data-astro-cid-ldyqi5cw": true
	})}</div>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "See all services",
		"background": "var(--grey)",
		"textColor": "var(--navy)",
		"class": "CarouselCTA",
		"data-astro-cid-ldyqi5cw": true
	})}</div>` })}` })}</section>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/WorkWithUs.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/WorkWithUs.astro", void 0);
// src/components/cards/StatCard.astro
createAstro("https://astro.build");
var $$StatCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$StatCard;
	const { label, labelBackground = "var(--white-25)", cardTitle, cardTitleSize = "var(--font-size-60)", cardDescription, cardBackground = "var(--navy)", cardBackgroundImage, cardSource, cardSourceIcon } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<article class="stat-card"${addAttribute(`
    --card-background: ${cardBackground};
    --card-background-image: ${cardBackgroundImage ? `url('${cardBackgroundImage}')` : "none"};
  `, "style")} data-astro-cid-pkz573jr><div class="stat-card__main" data-astro-cid-pkz573jr>${label && renderTemplate`<span class="stat-card__label"${addAttribute(`--label-background: ${labelBackground}`, "style")} data-astro-cid-pkz573jr>${label}</span>`}${cardTitle && renderTemplate`<h3 class="stat-card__title"${addAttribute(`--card-title-size: ${cardTitleSize}`, "style")} data-astro-cid-pkz573jr>${cardTitle}</h3>`}${cardDescription && renderTemplate`<p class="stat-card__description" data-astro-cid-pkz573jr>${cardDescription}</p>`}</div>${cardSource && renderTemplate`<div class="stat-card__source" data-astro-cid-pkz573jr>${cardSourceIcon && renderTemplate`<img class="stat-card__source-icon"${addAttribute(cardSourceIcon, "src")} alt="" aria-hidden="true" data-astro-cid-pkz573jr>`}<span class="stat-card__source-text" data-astro-cid-pkz573jr>${cardSource}</span></div>`}</article>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/cards/StatCard.astro", void 0);
// src/sections/aipage/DataBackUps.astro
var $$DataBackUps = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="data-backup-section" data-astro-cid-ayb32sfg>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-ayb32sfg": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "The data backs up why we work this way.",
		"fontSize": "var(--font-size-36)",
		"fontWeight": "var(--font-weight-regular",
		"textTransform": "capitalize",
		"color": "var(--navy)",
		"class": "data-backup__title",
		"data-astro-cid-ayb32sfg": true
	})}${renderComponent($$result, "Columns", $$Columns, {
		"layout": "33-33-33",
		"gap": "var(--space-16)",
		"align": "center",
		"class": "data-backup-columns",
		"data-astro-cid-ayb32sfg": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "StatCard", $$StatCard, {
		"label": "The upside",
		"cardBackgroundImage": "/images/backgrounds/cards/backgroundgradient3.webp",
		"cardTitle": "14-34%",
		"cardDescription": "Increase in worker productivity from generative AI tools — rising to 34% for newer or less experienced staff.",
		"cardSource": "Quarterly Journal of Economics",
		"cardSourceIcon": "/icons/book-bookmark.svg",
		"data-astro-cid-ayb32sfg": true
	})}${renderComponent($$result, "StatCard", $$StatCard, {
		"label": "The reality",
		"cardBackgroundImage": "/images/backgrounds/cards/backgroundgradient1.webp",
		"cardTitle": "40%+",
		"cardDescription": "Of agentic AI projects expected to be cancelled before the end of 2027, largely due to unclear business value and weak governance.",
		"cardSource": "Gartner",
		"cardSourceIcon": "/icons/book-bookmark.svg",
		"data-astro-cid-ayb32sfg": true
	})}${renderComponent($$result, "StatCard", $$StatCard, {
		"label": "The trust gap",
		"cardBackgroundImage": "/images/backgrounds/cards/backgroundgradient2.webp",
		"cardTitle": "Unreliable AI outputs make buyers less confident in their decisions, not more.",
		"cardTitleSize": "var(--font-size-30)",
		"cardDescription": "Vague AI claims don't build trust. Evidence does.",
		"cardSource": "Forrester",
		"cardSourceIcon": "/icons/book-bookmark.svg",
		"data-astro-cid-ayb32sfg": true
	})}` })}<div class="backup-data-statement" data-astro-cid-ayb32sfg><p data-astro-cid-ayb32sfg>This is exactly why we lead with mapping, governance, and honesty about fit<span class="light-txt" data-astro-cid-ayb32sfg> - instead of the hype.</span></p></div><div class="backup-data-cta" data-astro-cid-ayb32sfg>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "See Principles",
		"background": "var(--grey)",
		"textColor": "var(--navy)",
		"data-astro-cid-ayb32sfg": true
	})}${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "See Insights",
		"background": "var(--grey)",
		"textColor": "var(--navy)",
		"data-astro-cid-ayb32sfg": true
	})}</div>` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/DataBackUps.astro", void 0);
// src/sections/aipage/ComplianceFirst.astro
var $$ComplianceFirst = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="compliance-first-section" data-astro-cid-n6hdthta>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-n6hdthta": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Compliance isn't an afterthought. It's the starting point.",
		"fontSize": "var(--font-size-36)",
		"fontWeight": "var(--font-weight-regular)",
		"color": "var(--navy)",
		"textTransform": "capatilize",
		"class": "compliance-first__title",
		"data-astro-cid-n6hdthta": true
	})}${renderComponent($$result, "HighlightSection", $$HighlightSection, {
		"columns": 3,
		"customColumns": "9.75rem minmax(0, 1fr) minmax(0, 1fr)",
		"background": "transparent",
		"textColor": "var(--navy)",
		"padding": "var(--space-8) var(--space-16)",
		"minHeight": "21.562rem",
		"data-astro-cid-n6hdthta": true
	}, { "default": ($$result) => renderTemplate`<div class="iso-certification-badge" data-astro-cid-n6hdthta><img src="/images/iso_badge.svg" alt="ISO Certification" data-astro-cid-n6hdthta></div><div class="iso-heading" data-astro-cid-n6hdthta><span class="certified-pill" data-astro-cid-n6hdthta>ISO 27001 Certified</span><h4 data-astro-cid-n6hdthta>The internationally recognised standard for information security management.</h4></div><div class="iso-description" data-astro-cid-n6hdthta><p data-astro-cid-n6hdthta>For an AI partner, that matters more than most. Building or integrating AI means access to your systems, your data, and often your most sensitive workflows. ISO 27001 means that access is governed by an independently audited system, not just good intentions.</p></div>` })}<div class="other-compliance" data-astro-cid-n6hdthta><div class="gdpr-compliance" data-astro-cid-n6hdthta><h4 data-astro-cid-n6hdthta>GDPR & POPIA</h4><p data-astro-cid-n6hdthta>We build to GDPR and POPIA requirements from day one.</p></div><div class="ongoing-compliance" data-astro-cid-n6hdthta><h4 data-astro-cid-n6hdthta>Ongoing Governance</h4><p data-astro-cid-n6hdthta>Governance isn't a document we hand you once. We help you set it up, keep it working, and revisit it as AI changes - because this is a partnership, not a one-and-done project.</p></div></div>` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aipage/ComplianceFirst.astro", void 0);
// src/pages/ai.astro
var ai_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Ai,
	file: () => $$file,
	url: () => "/ai"
});
var $$Ai = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "AI",
		"description": "Progress Done Properly",
		"data-astro-cid-nx5ilvnz": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="avochoc-page-sections" data-astro-cid-nx5ilvnz><div class="aps ai_hero" data-astro-cid-nx5ilvnz>${renderComponent($$result, "AiHero", $$AiHero, { "data-astro-cid-nx5ilvnz": true })}</div><div class="aps ai_reality" data-astro-cid-nx5ilvnz>${renderComponent($$result, "TheReality", $$TheReality, { "data-astro-cid-nx5ilvnz": true })}</div><div class="aps ai_we_tell" data-astro-cid-nx5ilvnz>${renderComponent($$result, "We_Tell", $$WeTell, { "data-astro-cid-nx5ilvnz": true })}</div><div class="aps ai_human_first" data-astro-cid-nx5ilvnz>${renderComponent($$result, "HumanFirst", $$HumanFirst, { "data-astro-cid-nx5ilvnz": true })}</div><div class="aps ai_how_we_work" data-astro-cid-nx5ilvnz>${renderComponent($$result, "HowWeWork", $$HowWeWorkAi, { "data-astro-cid-nx5ilvnz": true })}</div><div class="aps ai_compliance_first" data-astro-cid-nx5ilvnz>${renderComponent($$result, "ComplianceFirst", $$ComplianceFirst, { "data-astro-cid-nx5ilvnz": true })}</div><div class="aps ai_work_with_us" data-astro-cid-nx5ilvnz>${renderComponent($$result, "WorkWithUs", $$WorkWithUs, { "data-astro-cid-nx5ilvnz": true })}</div><div class="aps ai_data_backups" data-astro-cid-nx5ilvnz>${renderComponent($$result, "DataBackUps", $$DataBackUps, { "data-astro-cid-nx5ilvnz": true })}</div><div class="aps ai_contact" data-astro-cid-nx5ilvnz>${renderComponent($$result, "ContactFooter", $$ContactFooter, { "data-astro-cid-nx5ilvnz": true })}</div></div>` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/ai.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/ai.astro";
// \0virtual:astro:page:src/pages/ai@_@astro
var page = () => ai_exports;
export { page };
