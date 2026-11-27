import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { _ as addAttribute, d as renderTemplate, f as maybeRenderHead, i as renderComponent, v as defineScriptVars } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import "./compiler_CJfKk-QH.mjs";
import { a as $$Container, i as $$Columns, s as $$PrimaryBtn, t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$ServicesHero } from "./ServicesHero_D-6Pe0fO.mjs";
import { t as $$SectionTitle } from "./SectionTitle_BrXLuo0c.mjs";
import { i as $$ScrollLockCards, n as $$OrbBackground, r as $$LargeCard, t as $$ISOCertified } from "./ISOCertified_ChLzNd6I.mjs";
import { t as $$TestimonialsSection } from "./TestimonialsSection_BIVV24cv.mjs";
import { t as $$ContactFooter } from "./ContactFooter_BnyGinfL.mjs";
// src/sections/servicespage/CustomSoftware.astro
var $$CustomSoftware = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="cust-software-section" data-astro-cid-c3b4edii>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-c3b4edii": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "33-33-33",
		"gap": "0",
		"class": "cust-software-columns",
		"data-astro-cid-c3b4edii": true
	}, { "default": ($$result) => renderTemplate`<div class="cust-software-left" data-astro-cid-c3b4edii>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "We build custom software, AI, and integrated systems for organisations operating under real-world pressure.",
		"fontSize": "var(--font-size-36)",
		"mobileFontSize": "var(--font-size-30)",
		"fontWeight": "var(--font-weight-regular)",
		"color": "var(--navy)",
		"textTransform": "none",
		"data-astro-cid-c3b4edii": true
	})}</div><div class="cust-software-center" aria-label="Abstract blue graphic" data-astro-cid-c3b4edii></div><div class="cust-software-right" data-astro-cid-c3b4edii><div class="cust-softwar-right__content" data-astro-cid-c3b4edii><p data-astro-cid-c3b4edii>Most vendors sell you the solution before they understand the problem.</p><br data-astro-cid-c3b4edii><p class="cust-software-bold" data-astro-cid-c3b4edii>We do it the other way around.</p><br data-astro-cid-c3b4edii><p data-astro-cid-c3b4edii>Complex organisations don't need more technology. They need technology that fits. Around legacy infrastructure, operational dependencies, and the systems that genuinely cannot fail.</p><br data-astro-cid-c3b4edii><p data-astro-cid-c3b4edii>Every service we offer starts from the same place. Understanding what can't break before we decide what should change.</p></div>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "#",
		"text": "How we work",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"data-astro-cid-c3b4edii": true
	})}</div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/servicespage/CustomSoftware.astro", void 0);
// src/sections/servicespage/Practice.astro
var $$Practice = createComponent(($$result, $$props, $$slots) => {
	const sections = [
		{
			id: "custom-software",
			title: "CUSTOM SOFTWARE DEVELOPMENT",
			headline: "Enterprise-grade software designed around how your business actually operates, not how we wish it did.",
			subheadline: "We map constraints before we write a line of code.",
			content: [
				"Off-the-shelf doesn't work for organizations with a lot to protect. It never did. Your systems carry years of decisions, workarounds, and dependencies. A generic platform was never built for that.",
				"Software that ignores this reality doesn't modernize your operations. It adds to the problem.",
				"We start by mapping how your systems actually behave. Where the dependencies sit. What your operations rely on. Only then do we design a solution. And we design it around what your environment can support.",
				"The result is software that holds up. Not only on launch day, but under real users, real volume, and real pressure."
			],
			listTitle: "WHAT THIS LOOKS LIKE IN PRACTICE",
			listItems: [
				"Bespoke application development for enterprise and mid-market",
				"Systems designed around operational constraints, not against them",
				"Architecture built for longevity, not just the current requirements"
			],
			ctaText: "START A CONVERSATION",
			ctaLink: "#",
			image: "images/backgrounds/cards/AvoSoftwareDev.webp"
		},
		{
			id: "ai-machine-learning",
			title: "AI AND MACHINE LEARNING",
			headline: "AI development that earns its place in real workflows, not just the ones that look good in a boardroom.",
			subheadline: "We implement AI where it creates measurable, operational value.",
			content: [
				"Most AI implementations fail. Not because the model is bad. They fail because nobody mapped the workflow the model has to live inside.",
				"AI that works in a demo and AI that works in production are two different things. The gap usually comes down to one thing: Nobody understood the systems it had to fit into.",
				"We don't implement AI for the sake of it. We find where it creates real value in your workflows. We design around the systems it needs to work with. And we build for the edge cases that only show up in the real world."
			],
			listTitle: "WHAT THIS LOOKS LIKE IN PRACTICE",
			listItems: [
				"AI integration into existing operational systems and workflows",
				"Machine learning models built and validated against real production data",
				"Responsible AI implementation aligned to ISO 42001 standards",
				"Clear, measurable outcomes defined before a model goes anywhere near your environment"
			],
			ctaText: "SEE HOW WE IMPLEMENT AI",
			ctaLink: "#",
			image: "images/backgrounds/cards/AvoMachineLearning.webp"
		},
		{
			id: "system-integration",
			title: "SYSTEM INTEGRATION AND MODERNISATION",
			headline: "Legacy infrastructure carrying years of decisions doesn't get replaced overnight.",
			subheadline: "We modernise it in a way that respects what's already working, and what your operations depend on.",
			content: [
				"You already know what needs to change. You can't afford to break what's holding everything together. That's exactly where we work.",
				"Legacy systems aren't failures. They're evidence of years of decisions and integrations. Your business has grown around them. The problem isn't the legacy system. It's the assumption that you have to choose between keeping it and moving forward.",
				"We map how your systems actually connect before we touch anything. We identify what we can modernise. We identify what needs no need to integrate. And we identify what needs to stay exactly as it is. Then we build a path forward that doesn't put your operations at risk."
			],
			listTitle: "WHAT THIS LOOKS LIKE IN PRACTICE",
			listItems: [
				"Legacy system integration with modern platforms and APIs",
				"Phased modernisation that keeps operations running throughout",
				"System audits that identify risk before change begins",
				"Architecture that connects old and new without forcing a full replacement"
			],
			ctaText: "TALK TO US ABOUT YOUR SYSTEMS",
			ctaLink: "#",
			image: "images/backgrounds/cards/AvoMachineLearning.webp"
		},
		{
			id: "product-development",
			title: "PRODUCT DEVELOPMENT",
			headline: "From post-MVP chaos to production-ready software.",
			subheadline: "We turn promising prototypes into systems that hold up under real users, real scale, and real pressure.",
			content: [
				"The prototype worked. The demo went well. Now it needs to survive real users, real scale, and the edge cases that only show up when something goes live.",
				"Most post-MVP products carry technical debt. Architecture decisions made under time pressure. Integrations held together by good intentions. That's not a criticism, it's what happens when speed is the priority.",
				"We take what you've built. We understand what it needs to become. Then we close the gap between the two, without burning down what's already working. The result is a product that can scale, integrate, and hold up. Without starting over."
			],
			listTitle: "WHAT THIS LOOKS LIKE IN PRACTICE",
			listItems: [
				"Post-MVP architecture review and remediation",
				"Scalability planning and infrastructure hardening",
				"Integration with third-party systems and enterprise environments",
				"Ongoing development and support beyond initial launch"
			],
			ctaText: "TALK TO US ABOUT YOUR PRODUCT",
			ctaLink: "#",
			image: "images/backgrounds/cards/AvoMachineLearning.webp"
		}
	];
	const sectionsData = sections.map((s, index) => ({
		title: s.title,
		index
	}));
	return renderTemplate`${maybeRenderHead($$result)}<section class="services-normal-scroll-section" data-astro-cid-atfyug72>${renderComponent($$result, "Container", $$Container, {
		"class": "panel-inner-container",
		"data-astro-cid-atfyug72": true
	}, { "default": ($$result) => renderTemplate`<div class="panels-stack" data-astro-cid-atfyug72>${sections.map((section, index) => renderTemplate`<div class="panel-content"${addAttribute(index, "data-index")}${addAttribute(`service-panel-${index}`, "id")} data-astro-cid-atfyug72><div class="panel-main-content" data-astro-cid-atfyug72><div class="panel-header" data-astro-cid-atfyug72><h3 class="section-title" data-astro-cid-atfyug72>${section.title}</h3><h2 class="headline" data-astro-cid-atfyug72>${section.headline}</h2><p class="subheadline" data-astro-cid-atfyug72>${section.subheadline}</p></div>${renderComponent($$result, "Columns", $$Columns, {
		"layout": "50-50",
		"gap": "var(--space-22)",
		"align": "stretch",
		"class": "panel-columns",
		"data-astro-cid-atfyug72": true
	}, { "default": ($$result) => renderTemplate`<div class="panel-left" data-astro-cid-atfyug72><img${addAttribute(section.image, "src")}${addAttribute(section.title, "alt")} class="panel-image"${addAttribute(index === 0 ? "eager" : "lazy", "loading")} data-astro-cid-atfyug72></div><div class="panel-right" data-astro-cid-atfyug72><div class="content-text-area" data-astro-cid-atfyug72><div class="paragraphs" data-astro-cid-atfyug72>${section.content.map((paragraph) => renderTemplate`<p class="body-text" data-astro-cid-atfyug72>${paragraph}</p>`)}</div><div class="list-section" data-astro-cid-atfyug72><h4 class="list-title" data-astro-cid-atfyug72>${section.listTitle}</h4><ul class="practice-list" data-astro-cid-atfyug72>${section.listItems.map((item) => renderTemplate`<li data-astro-cid-atfyug72>${item}</li>`)}</ul></div></div><div class="cta-wrapper" data-astro-cid-atfyug72><a${addAttribute(section.ctaLink, "href")} class="text-link" data-astro-cid-atfyug72>${section.ctaText}</a><a${addAttribute(section.ctaLink, "href")} class="arrow-icon"${addAttribute(section.ctaText, "aria-label")} data-astro-cid-atfyug72>↗</a></div></div>` })}</div></div>`)}</div>` })}<div class="sticky-menu-wrapper" data-astro-cid-atfyug72>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-atfyug72": true }, { "default": ($$result) => renderTemplate`<div class="practice-menu-global" data-astro-cid-atfyug72><div class="badges-scroll" data-astro-cid-atfyug72><div class="active-group" data-astro-cid-atfyug72><button class="menu-badge badge--active" id="active-badge-btn" data-target="0" data-astro-cid-atfyug72>${sections[0].title}</button></div><div class="inactive-group" id="inactive-badges-container" data-astro-cid-atfyug72>${sections.slice(1).map((sec, i) => renderTemplate`<button class="menu-badge badge--inactive"${addAttribute(i + 1, "data-target")} data-astro-cid-atfyug72>${sec.title}</button>`)}</div></div></div>` })}</div></section><script>(function(){${defineScriptVars({ sectionsData })}
  function setupNaturalScrollMenu() {
    const panels = Array.from(document.querySelectorAll('.panel-content'));
    const globalMenu = document.querySelector('.sticky-menu-wrapper');
    const activeBtn = document.getElementById('active-badge-btn');
    const inactiveContainer = document.getElementById('inactive-badges-container');

    if (!panels.length || !globalMenu || !activeBtn || !inactiveContainer) return;

    if (window.__servicesScrollCleanup) {
      window.__servicesScrollCleanup();
    }

    const controller = new AbortController();
    const { signal } = controller;
    let currentIndex = -1;
    let ticking = false;

    function renderMenu(index) {
      if (index === currentIndex || !sectionsData[index]) return;
      currentIndex = index;

      activeBtn.textContent = sectionsData[index].title;
      activeBtn.setAttribute('data-target', String(index));

      inactiveContainer.innerHTML = '';
      sectionsData.forEach((sec) => {
        if (sec.index !== index) {
          const btn = document.createElement('button');
          btn.className = 'menu-badge badge--inactive';
          btn.setAttribute('data-target', String(sec.index));
          btn.textContent = sec.title;
          inactiveContainer.appendChild(btn);
        }
      });
    }

    function updateActiveSection() {
      ticking = false;
      const triggerLine = Math.max(120, window.innerHeight * 0.35);
      let activeIndex = 0;

      for (let i = 0; i < panels.length; i++) {
        const rect = panels[i].getBoundingClientRect();
        if (rect.top <= triggerLine) {
          activeIndex = i;
        }
      }

      const lastRect = panels[panels.length - 1].getBoundingClientRect();
      const atPageBottom =
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.documentElement.scrollHeight - 2;

      if (atPageBottom && lastRect.top < window.innerHeight && lastRect.bottom > 0) {
        activeIndex = panels.length - 1;
      }

      renderMenu(activeIndex);
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    }

    globalMenu.addEventListener(
      'click',
      (e) => {
        const badge = e.target.closest('.menu-badge');
        if (!badge) return;
        const targetIndex = Number(badge.getAttribute('data-target'));
        const targetPanel = document.querySelector(\`.panel-content[data-index="\${targetIndex}"]\`);
        if (targetPanel) {
          renderMenu(targetIndex);
          targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      { signal }
    );

    window.addEventListener('scroll', onScrollOrResize, { passive: true, signal });
    window.addEventListener('resize', onScrollOrResize, { passive: true, signal });

    window.__servicesScrollCleanup = () => controller.abort();
    updateActiveSection();
  }

  setupNaturalScrollMenu();
  document.addEventListener('astro:after-swap', setupNaturalScrollMenu);
})();<\/script>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/servicespage/Practice.astro", void 0);
// src/sections/servicespage/HowWeWork_Services.astro
var $$HowWeWorkServices = createComponent(($$result, $$props, $$slots) => {
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
		"data-astro-cid-mmjn4xyk": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="how-we-work-page-section" id="howWeWork" data-astro-cid-mmjn4xyk><section class="how-we-work-section_services" data-astro-cid-mmjn4xyk>${renderComponent($$result, "ScrollLockCards", $$ScrollLockCards, {
		"steps": 3,
		"data-astro-cid-mmjn4xyk": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Container", $$Container, { "data-astro-cid-mmjn4xyk": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "40-60",
		"gap": "var(--space-80)",
		"align": "center",
		"class": "how-we-work_services-columns",
		"data-astro-cid-mmjn4xyk": true
	}, { "default": ($$result) => renderTemplate`<div class="how_we_work-section_services-left" data-astro-cid-mmjn4xyk>${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"title": "How we work",
		"fontSize": "var(--font-size-24)",
		"fontWeight": "var(--font-weight-semibold)",
		"textTransform": "uppercase",
		"color": "var(--navy)",
		"class": "how-we-work-section__title",
		"data-astro-cid-mmjn4xyk": true
	})}<h3 class="solutions-body-txt-main" data-astro-cid-mmjn4xyk>We don't start with solutions.<br data-astro-cid-mmjn4xyk><span class="body-txt-light" data-astro-cid-mmjn4xyk>We start by understanding what can't break.</span></h3><p class="solutions-body-txt-sub" data-astro-cid-mmjn4xyk>You won't get big promises upfront. You'll get clear thinking, trade-offs, and a realistic path forward.</p></div><div class="how_we_work-section_services-right" data-astro-cid-mmjn4xyk><div class="stack-cards" data-astro-cid-mmjn4xyk><div data-stack-item data-astro-cid-mmjn4xyk>${renderComponent($$result, "LargeCard", $$LargeCard, {
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
		"data-astro-cid-mmjn4xyk": true
	})}</div><div data-stack-item data-astro-cid-mmjn4xyk>${renderComponent($$result, "LargeCard", $$LargeCard, {
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
		"data-astro-cid-mmjn4xyk": true
	})}</div><div data-stack-item data-astro-cid-mmjn4xyk>${renderComponent($$result, "LargeCard", $$LargeCard, {
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
		"data-astro-cid-mmjn4xyk": true
	})}</div></div></div>` })}` })}` })}</section><section class="how-we-work-section_services2" data-astro-cid-mmjn4xyk>${renderComponent($$result, "Container", $$Container, {
		"paddingY": "var(--space-80)",
		"data-astro-cid-mmjn4xyk": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "TestimonialsSection", $$TestimonialsSection, { "data-astro-cid-mmjn4xyk": true })}` })}</section></div>` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/servicespage/HowWeWork_Services.astro", void 0);
// src/pages/services.astro
var services_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Services,
	file: () => $$file,
	url: () => $$url
});
var $$Services = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Services",
		"description": "Progress Done Properly"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ServicesHero", $$ServicesHero, {})}${renderComponent($$result, "CustomSoftware", $$CustomSoftware, {})}${renderComponent($$result, "ISOCertified", $$ISOCertified, {})}${renderComponent($$result, "Practice", $$Practice, {})}${renderComponent($$result, "HowWeWork_Services", $$HowWeWorkServices, {})}${renderComponent($$result, "ContactFooter", $$ContactFooter, {})}` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/services.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/services.astro";
var $$url = "/services";
// \0virtual:astro:page:src/pages/services@_@astro
var page = () => services_exports;
export { page };
