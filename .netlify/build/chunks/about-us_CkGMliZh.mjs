import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { _ as addAttribute, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container, c as renderScript, i as $$Columns, s as $$PrimaryBtn, t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$Hero } from "./Hero_qzH1GuZs.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
import { t as $$ContactFooter } from "./ContactFooter_BnyGinfL.mjs";
// src/sections/aboutpage/AboutUsHero.astro
var $$AboutUsHero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="about-hero-section" id="about-hero-section" data-astro-cid-srwbhtsy><div id="hero-content" data-astro-cid-srwbhtsy>${renderComponent($$result, "Hero", $$Hero, {
		"backgroundImage": "/images/backgrounds/hero/hero_image2.webp",
		"data-astro-cid-srwbhtsy": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Container", $$Container, { "data-astro-cid-srwbhtsy": true }, { "default": ($$result) => renderTemplate`<div class="AboutUsHero-heading-container" data-astro-cid-srwbhtsy><h1 data-astro-cid-srwbhtsy><span class="halfAvo" data-astro-cid-srwbhtsy>Half Avo.</span> <span class="halfChoc" data-astro-cid-srwbhtsy>Half Choc.</span> <span class="genuis" data-astro-cid-srwbhtsy>All Genius.</span></h1><h2 data-astro-cid-srwbhtsy>Two things that probably shouldn't work together.</h2><p data-astro-cid-srwbhtsy>A bit like:</p><div class="AboutUsHero-heading-container__pills" data-astro-cid-srwbhtsy><div class="technical-pill pill" data-astro-cid-srwbhtsy><img src="/icons/file.svg" alt="" aria-hidden="true" data-astro-cid-srwbhtsy><span data-astro-cid-srwbhtsy>Technical specs + empathy</span></div><div class="progress-pill pill" data-astro-cid-srwbhtsy><img src="/icons/arrow-progress.svg" alt="" aria-hidden="true" data-astro-cid-srwbhtsy><span data-astro-cid-srwbhtsy>Progress + not breaking everything</span></div><div class="systems-pill pill" data-astro-cid-srwbhtsy><img src="/icons/computer.svg" alt="" aria-hidden="true" data-astro-cid-srwbhtsy><span data-astro-cid-srwbhtsy>Serious system + actual personality</span></div></div></div>` })}` })}</div></section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/AboutUsHero.astro", void 0);
// src/sections/aboutpage/MostSoftware.astro
var $$MostSoftware = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="mostsoftware-wrapper" id="mostsoftware-section" data-astro-cid-gh3ciaxa><div class="mostsoftware-sticky" data-astro-cid-gh3ciaxa><canvas id="mostsoftware-canvas" class="mostsoftware-canvas" data-astro-cid-gh3ciaxa></canvas><div class="mostsoftware-text-container" data-astro-cid-gh3ciaxa>${renderComponent($$result, "Container", $$Container, {
		"class": "mostsoftware-container",
		"data-astro-cid-gh3ciaxa": true
	}, { "default": ($$result) => renderTemplate`<h2 class="mostsoftware-text active" data-step="0" data-astro-cid-gh3ciaxa>Most software companies tell you they're innovative.</h2><h2 class="mostsoftware-text" data-step="1" data-astro-cid-gh3ciaxa>We'd rather tell you what we don't believe.</h2><h2 class="mostsoftware-text" data-step="2" data-astro-cid-gh3ciaxa>We don't believe AI fixes broken businesses.</h2><h2 class="mostsoftware-text" data-step="3" data-astro-cid-gh3ciaxa>We don't believe modernisation should mean starting over.</h2><h2 class="mostsoftware-text" data-step="4" data-astro-cid-gh3ciaxa>We don't believe enterprise software has to be slow, bloated, or impossible to enjoy.</h2><h2 class="mostsoftware-text" data-step="5" data-astro-cid-gh3ciaxa>We believe progress should make things better without breaking everything that already works.</h2><div class="mostsoftware-text" data-step="6" data-astro-cid-gh3ciaxa><h2 class="mostsoftware-heading" data-astro-cid-gh3ciaxa>That's been our approach since day one.</h2><p class="mostsoftware-subtext" data-astro-cid-gh3ciaxa>Weird name. Serious systems. A decade of not breaking things.</p>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "/services/#howWeWork",
		"text": "HOW WE WORK",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"data-astro-cid-gh3ciaxa": true
	})}</div>` })}</div></div></section>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/MostSoftware.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/MostSoftware.astro", void 0);
// src/sections/aboutpage/AvoCrew.astro
var $$AvoCrew = createComponent(($$result, $$props, $$slots) => {
	const teamMembers = [
		{
			id: "designers",
			category: "Designers",
			image: "/images/backgrounds/cards/ShapeShifters.webp"
		},
		{
			id: "engineers",
			category: "Software Engineers",
			image: "/images/backgrounds/cards/TheBuilders.webp"
		},
		{
			id: "pm",
			category: "Project Managers",
			image: "/images/backgrounds/cards/TrafficControllers.webp"
		},
		{
			id: "qa",
			category: "QA",
			image: "/images/backgrounds/cards/TheSceptics.webp"
		},
		{
			id: "ba",
			category: "Business Analysts",
			image: "/images/backgrounds/cards/TheTranslators.webp"
		},
		{
			id: "specialist",
			category: "Specialist Engineers",
			image: "/images/backgrounds/cards/DeepDivers.webp"
		},
		{
			id: "marketing",
			category: "Marketing",
			image: "/images/backgrounds/cards/NoiseMakers.webp"
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<section class="pickYour-wrapper" id="pickYour-section" data-astro-cid-f24yut5c><div class="pickYour-sticky" data-astro-cid-f24yut5c>${renderComponent($$result, "Container", $$Container, {
		"class": "pickYour-container",
		"data-astro-cid-f24yut5c": true
	}, { "default": ($$result) => renderTemplate`<div class="pickYour-header" data-astro-cid-f24yut5c>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "Who's who in the avo crew.",
		"fontSize": "var(--font-size-36)",
		"fontWeight": "var(--font-weight-regular)",
		"color": "var(--navy)",
		"textTransform": "capatilize",
		"class": "pickYour-header__title",
		"data-astro-cid-f24yut5c": true
	})}<p class="pickYour-subtitle" data-astro-cid-f24yut5c>40+ people. Seven teams. One way of doing things: properly.</p><nav class="pickYour-nav" aria-label="Specialist Categories" data-astro-cid-f24yut5c><div class="pickYour-nav-track" data-astro-cid-f24yut5c>${teamMembers.map((member, idx) => renderTemplate`<button${addAttribute(`pickYour-nav-pill ${idx === 0 ? "active" : ""}`, "class")}${addAttribute(idx, "data-index")} type="button" data-astro-cid-f24yut5c>${member.category}</button>`)}</div></nav></div><div class="pickYour-carousel-stage" data-astro-cid-f24yut5c><div class="pickYour-carousel" id="pickYour-carousel" data-astro-cid-f24yut5c>${teamMembers.map((member, idx) => renderTemplate`<article${addAttribute(`pickYour-card ${idx === 0 ? "is-active" : ""}`, "class")}${addAttribute(idx, "data-index")} data-astro-cid-f24yut5c><div class="pickYour-card-inner"${addAttribute(`background-image: url('${member.image}');`, "style")} data-astro-cid-f24yut5c></div></article>`)}</div></div>` })}</div></section>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/AvoCrew.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/AvoCrew.astro", void 0);
// src/sections/aboutpage/WeDontDo.astro
var $$WeDontDo = createComponent(($$result, $$props, $$slots) => {
	const items = [
		"AI because AI.",
		"Developers treated like ticket machines.",
		"Design arriving at the end.",
		"Building for the demo instead of the real world"
	];
	return renderTemplate`${maybeRenderHead($$result)}<section class="WhatWeDontDo-section" data-astro-cid-q34re6ri>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-q34re6ri": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "What We Don't Do",
		"fontSize": "var(--font-size-24)",
		"fontWeight": "var(--font-weight-regular)",
		"color": "var(--navy)",
		"textTransform": "capatilize",
		"class": "WhatWeDontDo-section__title",
		"data-astro-cid-q34re6ri": true
	})}${renderComponent($$result, "Columns", $$Columns, {
		"class": "WhatWeDontDo-section__columns",
		"layout": "50-50",
		"gap": "0",
		"data-astro-cid-q34re6ri": true
	}, { "default": ($$result) => renderTemplate`<div class="WhatWeDontDo-left" data-astro-cid-q34re6ri><h3 class="WhatWeDontDo-left__title" data-astro-cid-q34re6ri>Keep this nonsense out of the guac.</h3></div><div class="WhatWeDontDo-right" data-astro-cid-q34re6ri><div class="WhatWeDontDo-right-content" data-astro-cid-q34re6ri><ul class="WhatWeDontDo-right__list" role="list" data-astro-cid-q34re6ri>${items.map((item) => renderTemplate`<li class="WhatWeDontDo-list__item" data-astro-cid-q34re6ri><span class="WhatWeDontDo-icon" aria-hidden="true" data-astro-cid-q34re6ri><svg width="1rem" height="1rem" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-q34re6ri><path d="M11 3L3 11M3 3L11 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" data-astro-cid-q34re6ri></path></svg></span><p data-astro-cid-q34re6ri>${item}</p></li>`)}</ul></div><div class="WhatWeDontDo-callout" data-astro-cid-q34re6ri><img src="/images/AvoChoc-misc.webp" data-astro-cid-q34re6ri><div class="WhatWeDontDo-callout__content" data-astro-cid-q34re6ri><h4 data-astro-cid-q34re6ri>Breaking what matters in the name of progress.</h4><p data-astro-cid-q34re6ri>That's not progress. That's an incident.</p></div></div></div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/WeDontDo.astro", void 0);
// src/sections/aboutpage/MattersToUs.astro
var $$MattersToUs = createComponent(($$result, $$props, $$slots) => {
	const matters = [
		{
			number: "01",
			title: "You matter more than the ticket.",
			tag: "People-first",
			description: "Kindness isn't a value we print. It's how we actually treat each other, and you."
		},
		{
			number: "02",
			title: "Do what you said you'd do.",
			tag: "Integrity & Accountability",
			description: "Own the work. Own the outcome."
		},
		{
			number: "03",
			title: "Mix your brains.",
			tag: "Collaborative by Nature",
			description: "We build together, or we can't build it right."
		},
		{
			number: "04",
			title: "Find a way.",
			tag: "Resilient & Resourceful",
			description: "Messy systems surprise you. We keep going."
		},
		{
			number: "05",
			title: "Build it for a reason.",
			tag: "Purposeful Innovation",
			description: "Innovation is a tool, not a gimmick."
		},
		{
			number: "06",
			title: "Bring the energy.",
			tag: "Energy that Elevates",
			description: "We build together, or we don't build it right."
		},
		{
			number: "07",
			title: "We build people too.",
			tag: "Empowerment & Growth",
			description: "Nobody leaves the way they came in."
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<section class="WhatMattersTo-section" data-astro-cid-wgrumjcx>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-wgrumjcx": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"class": "WhatMattersTo-columns",
		"layout": "40-60",
		"gap": "var(--space-20)",
		"data-astro-cid-wgrumjcx": true
	}, { "default": ($$result) => renderTemplate`<div class="WhatMattersTo-left" data-astro-cid-wgrumjcx>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "What Matters To Us",
		"fontSize": "var(--font-size-24)",
		"fontWeight": "var(--font-weight-regular)",
		"color": "var(--navy)",
		"textTransform": "uppercase",
		"class": "WhatMattersTo-left__title",
		"data-astro-cid-wgrumjcx": true
	})}</div><div class="WhatMattersTo-right" data-astro-cid-wgrumjcx><div class="WhatMattersTo-right__list" data-astro-cid-wgrumjcx>${matters.map((item) => renderTemplate`<div class="WhatMattersTo-item" data-astro-cid-wgrumjcx><div class="WhatMattersTo-item-top" data-astro-cid-wgrumjcx><div class="WhatMattersTo-pill-composite" data-astro-cid-wgrumjcx><span class="WhatMattersTo-pill-number" data-astro-cid-wgrumjcx>${item.number}</span><span class="WhatMattersTo-pill-text" data-astro-cid-wgrumjcx>${item.title}</span></div><span class="WhatMattersTo-tag" data-astro-cid-wgrumjcx>${item.tag}</span></div><p class="WhatMattersTo-item-description" data-astro-cid-wgrumjcx>${item.description}</p></div>`)}</div></div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/MattersToUs.astro", void 0);
// src/sections/aboutpage/GameSection.astro
createAstro("https://astro.build");
var $$GameSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GameSection;
	const { eyebrow = "AVOCHOC — THE GAME", heading = "PROGRESS, DONE PROPERLY.", description = "Step into the office as Avo!", src = "/game/index.html", class: className } = Astro.props;
	let letterIndex = 0;
	const words = heading.split(" ").map((word) => [...word].map((char) => ({
		char,
		i: letterIndex++
	})));
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(["game-section", className], "class:list")} aria-labelledby="game-section-heading" data-game data-state="idle" data-astro-cid-uw347p5o>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-uw347p5o": true }, { "default": ($$result) => renderTemplate`<header class="game-section__header" data-astro-cid-uw347p5o><span class="game-section__eyebrow" data-astro-cid-uw347p5o><span class="game-section__pip" aria-hidden="true" data-astro-cid-uw347p5o></span>${eyebrow}</span><h2 id="game-section-heading" class="game-section__title"${addAttribute(heading, "aria-label")} data-astro-cid-uw347p5o>${words.map((letters) => renderTemplate`<span class="game-section__word" aria-hidden="true" data-astro-cid-uw347p5o>${letters.map(({ char, i }) => renderTemplate`<span class="game-section__letter"${addAttribute(`--i: ${i}`, "style")} data-astro-cid-uw347p5o>${char}</span>`)}</span>`)}</h2><p class="game-section__description" data-astro-cid-uw347p5o>${description}</p></header><div class="game-section__toolbar" data-astro-cid-uw347p5o><button type="button" class="game-section__exit" data-game-exit data-astro-cid-uw347p5o><span aria-hidden="true" data-astro-cid-uw347p5o>✕</span> Exit game</button></div><div class="game-section__frame" data-astro-cid-uw347p5o><div class="game-section__screen" data-astro-cid-uw347p5o><!-- Start screen: shown before the first play, and whenever the game is closed.
             After the first play the game stays loaded (paused) behind it. --><div class="game-section__start" data-game-start data-astro-cid-uw347p5o><p class="game-section__kicker" data-astro-cid-uw347p5o><span class="game-section__kicker--idle" data-astro-cid-uw347p5o>Ready?</span><span class="game-section__kicker--exited" data-astro-cid-uw347p5o>Game paused</span></p><button type="button" class="game-section__play" data-game-play data-astro-cid-uw347p5o><span class="game-section__play-icon" aria-hidden="true" data-astro-cid-uw347p5o></span><span class="game-section__play-label--idle" data-astro-cid-uw347p5o>Press start</span><span class="game-section__play-label--exited" data-astro-cid-uw347p5o>Continue</span></button><p class="game-section__note" data-astro-cid-uw347p5o><span class="game-section__note--idle" data-astro-cid-uw347p5o>Loads when you press start</span><span class="game-section__note--exited" data-astro-cid-uw347p5o>Your progress is kept — pick up where you left off</span></p></div><iframe class="game-section__iframe" data-game-frame${addAttribute(src, "data-src")} title="AvoChoc — the game" allow="fullscreen 'none'; autoplay" tabindex="-1" data-astro-cid-uw347p5o></iframe></div></div>` })}</section>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/GameSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/GameSection.astro", void 0);
// src/sections/aboutpage/ThePeople.astro
var $$ThePeople = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="ThePeople-section" id="ThePeople-section" data-astro-cid-atwhwlhx>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-atwhwlhx": true }, { "default": ($$result) => renderTemplate`<div class="ThePeople-section_top-row" data-astro-cid-atwhwlhx>${renderComponent($$result, "Columns", $$Columns, {
		"class": "ThePeople-section_top-row-columns",
		"layout": "50-50",
		"gap": "var(--space-12)",
		"data-astro-cid-atwhwlhx": true
	}, { "default": ($$result) => renderTemplate`<div class="ThePeople-section_top-row-left" data-astro-cid-atwhwlhx>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "The People",
		"fontSize": "var(--font-size-24)",
		"fontWeight": "var(--font-weight-regular)",
		"color": "var(--white)",
		"textTransform": "uppercase",
		"class": "ThePeople-section_top-row-left__title",
		"data-astro-cid-atwhwlhx": true
	})}</div><div class="ThePeople-section_top-row-right" data-astro-cid-atwhwlhx>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "The people behind the platforms.",
		"fontSize": "var(--font-size-36)",
		"fontWeight": "var(--font-weight-regular)",
		"color": "var(--white)",
		"textTransform": "none",
		"class": "ThePeople-section_top-row-right__title",
		"data-astro-cid-atwhwlhx": true
	})}<p class="ThePeople-section_top-row-right__body" data-astro-cid-atwhwlhx>Software doesn't build itself.<br data-astro-cid-atwhwlhx><br data-astro-cid-atwhwlhx>Behind every deployment, architecture diagram, and AI workflow is a team of designers, engineers, strategists, QA specialists, and product people who genuinely enjoy solving difficult problems.<br data-astro-cid-atwhwlhx><br data-astro-cid-atwhwlhx>We care about performance. We care about quality. We care about users.<br data-astro-cid-atwhwlhx><br data-astro-cid-atwhwlhx>We also care an unreasonable amount about coffee. Nobody's perfect.</p></div>` })}</div><div class="ThePeople-section_bottom-row" data-astro-cid-atwhwlhx>${renderComponent($$result, "Columns", $$Columns, {
		"class": "ThePeople-section_bottom-row-columns",
		"layout": "50-50",
		"gap": "var(--space-20)",
		"data-astro-cid-atwhwlhx": true
	}, { "default": ($$result) => renderTemplate`<div class="ThePeople-section_bottom-row-left" data-astro-cid-atwhwlhx><div class="ThePeople-cards-wrapper" data-astro-cid-atwhwlhx><div class="ThePeople-card" data-astro-cid-atwhwlhx><div class="ThePeople-avatar-wrap" data-astro-cid-atwhwlhx><img src="/images/content/staff/jaco-avatar.png" alt="Jaco Bruwer" data-astro-cid-atwhwlhx></div><h3 data-astro-cid-atwhwlhx>Jaco Bruwer</h3><p class="ThePeople-job-title" data-astro-cid-atwhwlhx>CHIEF EXECUTIVE OFFICER</p><p class="ThePeople-bio" data-astro-cid-atwhwlhx>The mastermind leading AvoChoc with a people-first belief: our clients' critical systems move forward safely when teams feel trusted and free to grow.</p></div><div class="ThePeople-card" data-astro-cid-atwhwlhx><div class="ThePeople-avatar-wrap" data-astro-cid-atwhwlhx><img src="/images/content/staff/johan-avatar.png" alt="Jaco Bruwer" data-astro-cid-atwhwlhx></div><h3 data-astro-cid-atwhwlhx>Johan Botha</h3><p class="ThePeople-job-title" data-astro-cid-atwhwlhx>CHIEF OPERATING OFFICER</p><p class="ThePeople-bio" data-astro-cid-atwhwlhx>The mastermind behind AvoChoc's daily operations, turning complex delivery into calm, predictable progress that both clients and teams can genuinely rely on.</p></div></div></div><div class="ThePeople-section_bottom-row-right" data-astro-cid-atwhwlhx><img src="/images/content/staff/avo-avatars.png" data-astro-cid-atwhwlhx><p class="ThePeople-section_bottom-row-right__body" data-astro-cid-atwhwlhx>Real people. Real expertise. <span class="lime-txt" data-astro-cid-atwhwlhx>Mostly real plants.</span></p>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "Insights",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"data-astro-cid-atwhwlhx": true
	})}</div>` })}</div>` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/aboutpage/ThePeople.astro", void 0);
// src/pages/about-us.astro
var about_us_exports = /* @__PURE__ */ __exportAll({
	default: () => $$AboutUs,
	file: () => $$file,
	url: () => $$url
});
var $$AboutUs = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "About Us",
		"description": "Progress Done Properly"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "AboutUsHero", $$AboutUsHero, {})}${renderComponent($$result, "MostSoftware", $$MostSoftware, {})}${renderComponent($$result, "AvoCrew", $$AvoCrew, {})}${renderComponent($$result, "WeDontDo", $$WeDontDo, {})}${renderComponent($$result, "MattersToUs", $$MattersToUs, {})}${renderComponent($$result, "GameSection", $$GameSection, {})}${renderComponent($$result, "ThePeople", $$ThePeople, {})}${renderComponent($$result, "ContactFooter", $$ContactFooter, {})}` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/about-us.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/about-us.astro";
var $$url = "/about-us";
// \0virtual:astro:page:src/pages/about-us@_@astro
var page = () => about_us_exports;
export { page };
