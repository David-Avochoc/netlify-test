import { _ as addAttribute, c as renderSlot, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import { a as $$Container, c as renderScript } from "./BaseLayout_DO4EBRO4.mjs";
import "./compiler_CJfKk-QH.mjs";
import { t as $$HighlightSection } from "./HighlightSection_B07rGijS.mjs";
// src/components/ui/ScrollLockCards.astro
createAstro("https://astro.build");
var $$ScrollLockCards = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ScrollLockCards;
	const { steps = 3, scrollPerStep = "80vh" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="scroll-stack" data-scroll-stack${addAttribute(`--stack-steps: ${steps}; --stack-scroll-per-step: ${scrollPerStep}`, "style")} data-astro-cid-voovcho4><div class="scroll-stack__sticky" data-astro-cid-voovcho4>${renderSlot($$result, $$slots["default"])}</div></div>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/ScrollLockCards.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/ScrollLockCards.astro", void 0);
// src/components/ui/LottieAnimation.astro
createAstro("https://astro.build");
var $$LottieAnimation = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LottieAnimation;
	const { src, alt = "", fit = "contain" } = Astro.props;
	return renderTemplate`${renderComponent($$result, "dotlottie-wc", "dotlottie-wc", {
		"class": "lottie-animation",
		"src": src,
		"autoplay": true,
		"loop": true,
		"role": alt ? "img" : void 0,
		"aria-label": alt || void 0,
		"aria-hidden": alt ? void 0 : "true",
		"data-astro-cid-wfsrym66": true
	})}${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/LottieAnimation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/LottieAnimation.astro", void 0);
// src/components/cards/LargeCard.astro
createAstro("https://astro.build");
var $$LargeCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LargeCard;
	const { image, animation, imageBackground, imageAlt, title, description, step, stepNumber, width = "100%", minWidth = "23.25rem", maxWidth = "40.312rem", height = "auto", gap = "1rem", imageHeight = "13.75rem", backgroundColor = "var(--white)", textColor = "var(--navy)" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<article class="large-card"${addAttribute(`--card-width: ${width}; --card-min-width: ${minWidth}; --card-max-width: ${maxWidth};--card-height: ${height}; --card-gap: ${gap}; --card-image-height: ${imageHeight}; --card-background: ${backgroundColor}; --card-text-color: ${textColor}`, "style")} data-astro-cid-frrelhoa>${animation || image ? renderTemplate`<div class="large-card__media"${addAttribute(imageBackground ? `background-image: url('${imageBackground}')` : void 0, "style")} data-astro-cid-frrelhoa>${animation ? renderTemplate`${renderComponent($$result, "LottieAnimation", $$LottieAnimation, {
		"src": animation,
		"alt": imageAlt,
		"data-astro-cid-frrelhoa": true
	})}` : image ? renderTemplate`<img class="large-card__image"${addAttribute(image, "src")}${addAttribute(imageAlt, "alt")} loading="lazy" data-astro-cid-frrelhoa>` : null}</div>` : null}<div class="large-card__header" data-astro-cid-frrelhoa>${step || stepNumber !== void 0 ? renderTemplate`<div class="large-card__step" data-astro-cid-frrelhoa>${step && renderTemplate`<span class="large-card__step-label" data-astro-cid-frrelhoa>${step}</span>`}${stepNumber !== void 0 && renderTemplate`<span class="large-card__step-number" data-astro-cid-frrelhoa>${stepNumber}</span>`}</div>` : null}<div class="large-card__content" data-astro-cid-frrelhoa><h4 class="large-card__title" data-astro-cid-frrelhoa>${title}</h4><p class="large-card__description" data-astro-cid-frrelhoa>${description}</p></div></div></article>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/cards/LargeCard.astro", void 0);
// src/components/OrbBackground.astro
createAstro("https://astro.build");
var $$OrbBackground = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OrbBackground;
	const { as: Tag = "section", class: className, style: userStyle, base, teal, cyan, yellow, speed, intensity, grain = true, fixed = false, ...rest } = Astro.props;
	const vars = [
		base && `--orb-base:${base}`,
		teal && `--orb-teal:${teal}`,
		cyan && `--orb-cyan:${cyan}`,
		yellow && `--orb-yellow:${yellow}`,
		speed !== void 0 && `--orb-speed:${speed}`,
		intensity !== void 0 && `--orb-intensity:${intensity}`,
		userStyle
	].filter(Boolean).join(";");
	return renderTemplate`${renderComponent($$result, "Tag", Tag, {
		"class:list": ["orb-section", className],
		"style": vars || void 0,
		"data-orb-section": true,
		...rest,
		"data-astro-cid-36zydoj7": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="orb-section__bg" aria-hidden="true" data-astro-cid-36zydoj7><div class="orb orb--teal" data-astro-cid-36zydoj7><div class="orb__core" data-astro-cid-36zydoj7></div></div><div class="orb orb--cyan" data-astro-cid-36zydoj7><div class="orb__core" data-astro-cid-36zydoj7></div></div><div class="orb orb--yellow" data-astro-cid-36zydoj7><div class="orb__core" data-astro-cid-36zydoj7></div></div></div>${grain && renderTemplate`<div class="orb-section__grain" aria-hidden="true" data-astro-cid-36zydoj7></div>`}<div class="orb-section__content" data-astro-cid-36zydoj7>${renderSlot($$result, $$slots["default"])}</div>` })}${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/OrbBackground.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/OrbBackground.astro", void 0);
// src/sections/shared-sections/ISOCertified.astro
var $$ISOCertified = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="iso-highlight-section" data-astro-cid-oulo7vf6>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-oulo7vf6": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HighlightSection", $$HighlightSection, {
		"columns": 2,
		"customColumns": "9.375rem minmax(0, 1fr)",
		"gap": "var(--space-24)",
		"accentColor": "transparent",
		"padding": "0",
		"data-astro-cid-oulo7vf6": true
	}, { "default": ($$result) => renderTemplate`<div class="iso-certification-badge" data-astro-cid-oulo7vf6><img src="/images/iso_badge.svg" alt="ISO Certification" data-astro-cid-oulo7vf6></div><div class="iso-heading" data-astro-cid-oulo7vf6><h4 data-astro-cid-oulo7vf6>ISO 27001 certified · POPIA and GDPR compliant<span class="iso-heading-subtext" data-astro-cid-oulo7vf6>Our compliance is built to grow as regulations change.</span></h4></div>` })}` })}</section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/shared-sections/ISOCertified.astro", void 0);
export { $$ScrollLockCards as i, $$OrbBackground as n, $$LargeCard as r, $$ISOCertified as t };
