import { _ as addAttribute, a as Fragment, c as renderSlot, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as createRenderInstruction, p as renderHead } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
// node_modules/@astrojs/runtime/dist/internal/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
// src/components/buttons/PrimaryBtn.astro
createAstro("https://astro.build");
var $$PrimaryBtn = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PrimaryBtn;
	const { href, text, type = "button", background = "var(--navy)", textColor = "var(--white)", class: className = "", panelOpen } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Tag", href ? "a" : "button", {
		"href": href,
		"type": !href ? type : void 0,
		"data-panel-open": panelOpen,
		"class:list": ["primary-btn", className],
		"style": `--button-background: ${background}; --button-text-color: ${textColor}`,
		"data-astro-cid-lsvhwqiz": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<span class="primary-btn__sizer" aria-hidden="true" data-astro-cid-lsvhwqiz>${text}</span><span class="primary-btn__label" data-astro-cid-lsvhwqiz>${text}</span><span class="primary-btn__arrow" aria-hidden="true" data-astro-cid-lsvhwqiz><img src="/icons/arrow-up-right-drk.svg" alt="" data-astro-cid-lsvhwqiz></span>` })}${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/PrimaryBtn.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/PrimaryBtn.astro", void 0);
// src/components/buttons/SecondaryBtn.astro
createAstro("https://astro.build");
var $$SecondaryBtn = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SecondaryBtn;
	const { href, text, type = "button", background = "transparent", textColor = "var(--white)", class: className = "", panelOpen } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Tag", href && !panelOpen ? "a" : "button", {
		"href": href,
		"type": !href ? type : void 0,
		"data-panel-open": panelOpen,
		"class:list": ["secondary-btn", className],
		"style": `--button-background: ${background}; --button-text-color: ${textColor}`,
		"data-astro-cid-xeuylkxs": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<span class="secondary-btn__sizer" aria-hidden="true" data-astro-cid-xeuylkxs>${text}</span><span class="secondary-btn__label" data-astro-cid-xeuylkxs>${text}</span><span class="secondary-btn__arrow" aria-hidden="true" data-astro-cid-xeuylkxs><img src="/icons/arrow-up-right-drk.svg" alt="" data-astro-cid-xeuylkxs></span>` })}${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/SecondaryBtn.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/buttons/SecondaryBtn.astro", void 0);
// src/components/global/Navigation.astro
var $$Navigation = createComponent(($$result, $$props, $$slots) => {
	const navItems = [
		{
			label: "About",
			href: "/about-us"
		},
		{
			label: "Services",
			href: "/services"
		},
		{
			label: "Work",
			href: "/work"
		},
		{
			label: "AI",
			href: "/ai"
		},
		{
			label: "Insights",
			href: "/insights"
		},
		{
			label: "Careers",
			href: "/careers"
		}
	];
	const mobileNavItems = [...navItems, {
		label: "Contact",
		href: "/contact"
	}];
	return renderTemplate`${maybeRenderHead($$result)}<div class="nav-bar" data-astro-cid-kuhcs3hj><a href="/" class="nav-icon" aria-label="Home" data-astro-cid-kuhcs3hj><img src="/icons/AvoChoc_Logo_Short_Light.svg" alt="" data-astro-cid-kuhcs3hj></a><nav class="nav-menu desktop-nav" aria-label="Main navigation" data-astro-cid-kuhcs3hj>${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} data-astro-cid-kuhcs3hj>${item.label}</a>`)}</nav><a href="/contact" class="nav-action" aria-label="Contact us" data-astro-cid-kuhcs3hj><div class="action-icon-box" data-astro-cid-kuhcs3hj><img class="icon-arrow" src="/icons/arrow-right.svg" alt="" data-astro-cid-kuhcs3hj><img class="icon-envelope" src="/icons/envelope-light.svg" alt="" data-astro-cid-kuhcs3hj></div><span class="action-text" data-astro-cid-kuhcs3hj>Contact Us</span></a><button class="mobile-menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu-overlay" data-astro-cid-kuhcs3hj><span data-astro-cid-kuhcs3hj></span><span data-astro-cid-kuhcs3hj></span><span data-astro-cid-kuhcs3hj></span></button></div><div class="mobile-menu-overlay" id="mobile-menu-overlay" aria-hidden="true" inert data-astro-cid-kuhcs3hj><div class="mobile-menu-header" data-astro-cid-kuhcs3hj><a href="/" class="mobile-menu-logo" aria-label="AvoChoc home" data-astro-cid-kuhcs3hj><img src="/icons/AvoChoc_Logo_Short_Light.svg" alt="" data-astro-cid-kuhcs3hj></a><button class="mobile-menu-close" type="button" aria-label="Close navigation menu" data-astro-cid-kuhcs3hj><span data-astro-cid-kuhcs3hj></span><span data-astro-cid-kuhcs3hj></span></button></div><!-- Mobile navigation uses the same links, with Contact added --><nav class="mobile-menu-links" aria-label="Mobile navigation" data-astro-cid-kuhcs3hj>${mobileNavItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} data-astro-cid-kuhcs3hj>${item.label}</a>`)}</nav><div class="mobile-menu-ctas" data-astro-cid-kuhcs3hj>${renderComponent($$result, "SecondaryBtn", $$SecondaryBtn, {
		"href": "/contact",
		"text": "Start a Conversation",
		"background": "transparent",
		"textColor": "var(--white)",
		"class": "mobile-menu-cta mobile-menu-cta--outline",
		"data-astro-cid-kuhcs3hj": true
	})}${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"href": "/services",
		"text": "See Our Services",
		"background": "var(--white)",
		"textColor": "var(--navy)",
		"class": "mobile-menu-cta mobile-menu-cta--light",
		"data-astro-cid-kuhcs3hj": true
	})}</div></div>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/global/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/global/Navigation.astro", void 0);
// src/components/global/Header.astro
var $$Header = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<header class="main-header" data-astro-cid-blryxaq5><a href="/" class="main-logo" data-astro-cid-blryxaq5><img src="/images/logos/AvoChoc_Logo_Full.svg" alt="Avochoc" data-astro-cid-blryxaq5></a>${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-blryxaq5": true })}</header>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/global/Header.astro", void 0);
// src/components/global/Container.astro
createAstro("https://astro.build");
var $$Container = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Container;
	const { class: className, paddingY = "0" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["container", className], "class:list")}${addAttribute(`--container-padding-y: ${paddingY};`, "style")} data-astro-cid-u222eqkk>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/global/Container.astro", void 0);
// src/components/global/Columns.astro
createAstro("https://astro.build");
var $$Columns = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Columns;
	const { layout = "50-50", customColumns = "1fr 1fr", gap = "2rem", align = "start", mobileStack = true, class: customClass = "" } = Astro.props;
	const columnTemplate = layout === "custom" ? customColumns : {
		"50-50": "1fr 1fr",
		"30-70": "3fr 7fr",
		"70-30": "7fr 3fr",
		"40-60": "4fr 6fr",
		"60-40": "6fr 4fr",
		"25-75": "1fr 3fr",
		"75-25": "3fr 1fr",
		"33-33-33": "repeat(3, 1fr)",
		"25-25-25-25": "repeat(4, 1fr)"
	}[layout] ?? "1fr 1fr";
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"columns",
		{ "columns--stack": mobileStack },
		customClass
	], "class:list")}${addAttribute(`
        --columns-template: ${columnTemplate};
        --columns-gap: ${gap};
        --columns-align: ${align};
    `, "style")} data-astro-cid-bexni5gl>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/global/Columns.astro", void 0);
// src/components/ui/Carousels/TextScrollCarousel.astro
createAstro("https://astro.build");
var $$TextScrollCarousel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TextScrollCarousel;
	const { items = [
		"Something interesting",
		"Something interesting",
		"Something interesting",
		"Something interesting"
	], duration = 100, separator = "globe" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="text-scroll" role="region" aria-label="Scrolling announcements"${addAttribute(`--scroll-duration: ${duration}s;`, "style")} data-astro-cid-jzzmhc6m><div class="text-scroll__track" data-astro-cid-jzzmhc6m>${Array.from({ length: 6 }).map((_, groupIndex) => renderTemplate`<div class="text-scroll__group"${addAttribute(groupIndex === 1 ? "true" : void 0, "aria-hidden")} data-astro-cid-jzzmhc6m>${items.map((item) => renderTemplate`<div class="text-scroll__item" data-astro-cid-jzzmhc6m>${separator === "globe" && renderTemplate`<img class="text-scroll__icon" src="/icons/globe.svg" alt="" aria-hidden="true" data-astro-cid-jzzmhc6m>`}<span data-astro-cid-jzzmhc6m>${item}</span></div>`)}</div>`)}</div></div>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/Carousels/TextScrollCarousel.astro", void 0);
// src/components/global/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="footer" data-astro-cid-ui5ps2i3>${renderComponent($$result, "TextScollCarousel", $$TextScrollCarousel, { "data-astro-cid-ui5ps2i3": true })}${renderComponent($$result, "Container", $$Container, { "data-astro-cid-ui5ps2i3": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Columns", $$Columns, {
		"layout": "50-50",
		"gap": "var(--space-32)",
		"class": "footer-columns",
		"data-astro-cid-ui5ps2i3": true
	}, { "default": ($$result) => renderTemplate`<div class="footer-columns-left" data-astro-cid-ui5ps2i3><div class="footer-columns-left__inner" data-astro-cid-ui5ps2i3><span data-astro-cid-ui5ps2i3><h4 data-astro-cid-ui5ps2i3>Office Hours: 08:00 - 17:00 (SAST)</h4></span><span class="avo-location" data-astro-cid-ui5ps2i3><img src="/icons/location_marker_drk.svg" data-astro-cid-ui5ps2i3><h4 data-astro-cid-ui5ps2i3>Based in south africa.</h4><img src="/icons/globe.svg" data-astro-cid-ui5ps2i3><h4 data-astro-cid-ui5ps2i3>Working Globally</h4></span><span class="avo-legal" data-astro-cid-ui5ps2i3><a href="/privacy-policy" data-astro-cid-ui5ps2i3><h4 data-astro-cid-ui5ps2i3>Privacy Policy</h4></a><svg xmlns="http://www.w3.org/2000/svg" width="0.25rem" height="0.25rem" viewBox="0 0 4 4" fill="none" data-astro-cid-ui5ps2i3><circle cx="2" cy="2" r="2" fill="#1D2247" data-astro-cid-ui5ps2i3></circle></svg><a href="/privacy-policy#Cookies" data-astro-cid-ui5ps2i3><h4 data-astro-cid-ui5ps2i3>Cookie Policy</h4></a></span></div></div><div class="footer-columns-right" data-astro-cid-ui5ps2i3><div class="footer-columns-right__inner" data-astro-cid-ui5ps2i3><span data-astro-cid-ui5ps2i3><h4 data-astro-cid-ui5ps2i3>Sign ups or any other marketing?</h4></span><span class="avo-social" data-astro-cid-ui5ps2i3><h4 data-astro-cid-ui5ps2i3>Follow us on</h4><a href="https://www.instagram.com/avochoc/" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Follow AvoChoc on Instagram" data-astro-cid-ui5ps2i3><img src="/icons/instagram.svg" alt="" data-astro-cid-ui5ps2i3></a><a href="https://www.linkedin.com/company/avochoc/" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Follow AvoChoc on LinkedIn" data-astro-cid-ui5ps2i3><img src="/icons/linkedin.svg" alt="" data-astro-cid-ui5ps2i3></a></span><span data-astro-cid-ui5ps2i3><a href="mailto:hello@avochoc.com" data-astro-cid-ui5ps2i3><h4 data-astro-cid-ui5ps2i3>hello@avochoc.com</h4></a></span></div></div>` })}` })}<div class="footer__content" data-astro-cid-ui5ps2i3><img src="/images/logos/AVOCHOC.svg" data-astro-cid-ui5ps2i3></div></footer>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/global/Footer.astro", void 0);
// src/components/ui/SlideInPanel/SlideInPanel.astro
createAstro("https://astro.build");
var $$SlideInPanel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SlideInPanel;
	const { id, title, width = "min(100%, 42.687rem)" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="slide-in-panel__backdrop" data-panel-backdrop data-panel-close aria-hidden="true" hidden data-astro-cid-uqscqhrt></div><section${addAttribute(id, "id")} class="slide-in-panel" data-slide-in-panel role="dialog" aria-modal="true"${addAttribute(title || void 0, "aria-label")} tabindex="-1" hidden${addAttribute(`--panel-width: ${width};`, "style")} data-astro-cid-uqscqhrt><button class="slide-in-panel__close" type="button" data-panel-close aria-label="Close panel" data-astro-cid-uqscqhrt><svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" data-astro-cid-uqscqhrt><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" data-astro-cid-uqscqhrt></path></svg></button><div class="slide-in-panel__content" data-astro-cid-uqscqhrt>${renderSlot($$result, $$slots["default"])}</div></section>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/SlideInPanel/SlideInPanel.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/SlideInPanel/SlideInPanel.astro", void 0);
// src/components/forms/Form.astro
createAstro("https://astro.build");
var $$Form = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Form;
	const { fields = [], title = "", description = "", submitLabel = "Submit", note = "", layout = "stacked", class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<form${addAttribute([
		"form",
		`form--${layout}`,
		className
	], "class:list")} data-preview-form data-astro-cid-ooibqdpc>${title && renderTemplate`<h2 class="form__title" data-astro-cid-ooibqdpc>${title}</h2>`}${description && renderTemplate`<p class="form__description" data-astro-cid-ooibqdpc>${description}</p>`}<div class="form__fields" data-astro-cid-ooibqdpc>${fields.map((field) => renderTemplate`<div${addAttribute(["form__field", `form__field--${field.width ?? "full"}`], "class:list")} data-astro-cid-ooibqdpc><div class="form__control-wrap" data-astro-cid-ooibqdpc>${field.type === "textarea" ? renderTemplate`<textarea${addAttribute(field.name, "id")}${addAttribute(field.name, "name")}${addAttribute(field.placeholder ?? "", "placeholder")}${addAttribute(field.required ?? false, "required")}${addAttribute(field.rows ?? 4, "rows")} class="form__control form__textarea" data-astro-cid-ooibqdpc></textarea>` : field.type === "select" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<label class="form__label"${addAttribute(field.name, "for")} data-astro-cid-ooibqdpc>${field.label}${field.required && renderTemplate`<span aria-hidden="true" data-astro-cid-ooibqdpc> *</span>`}</label><select${addAttribute(field.name, "id")}${addAttribute(field.name, "name")}${addAttribute(field.required ?? false, "required")} class="form__control" data-astro-cid-ooibqdpc>${field.options?.map((option) => renderTemplate`<option${addAttribute(option.value, "value")} data-astro-cid-ooibqdpc>${option.label}</option>`)}</select>` })}` : renderTemplate`<input${addAttribute(field.name, "id")}${addAttribute(field.name, "name")}${addAttribute(field.type ?? "text", "type")}${addAttribute(field.placeholder ?? "", "placeholder")}${addAttribute(field.required ?? false, "required")} class="form__control" data-astro-cid-ooibqdpc>`}${field.type !== "select" && renderTemplate`<label class="form__label"${addAttribute(field.name, "for")} data-astro-cid-ooibqdpc>${field.label}${field.required && renderTemplate`<span aria-hidden="true" data-astro-cid-ooibqdpc> *</span>`}</label>`}</div></div>`)}</div>${renderComponent($$result, "PrimaryBtn", $$PrimaryBtn, {
		"type": "submit",
		"text": submitLabel,
		"class": "form__submit",
		"data-astro-cid-ooibqdpc": true
	})}${note && renderTemplate`<p class="form__note" data-astro-cid-ooibqdpc>${note}</p>`}<p class="form__status" data-form-status role="status" hidden data-astro-cid-ooibqdpc></p></form>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/forms/Form.astro", void 0);
// src/components/forms/formFields.js
/**
* @typedef {Object} FormOption
* @property {string} label
* @property {string} value
*/
/**
* @typedef {Object} FormField
* @property {string} name
* @property {string} label
* @property {
*   "text" |
*   "email" |
*   "tel" |
*   "number" |
*   "url" |
*   "password" |
*   "search" |
*   "date" |
*   "time" |
*   "datetime-local" |
*   "month" |
*   "week" |
*   "color" |
*   "file" |
*   "hidden" |
*   "checkbox" |
*   "radio" |
*   "range" |
*   "submit" |
*   "reset" |
*   "button" |
*   "textarea" |
*   "select"
* } [type]
* @property {string} [placeholder]
* @property {boolean} [required]
* @property {"full" | "half"} [width]
* @property {number} [rows]
* @property {FormOption[]} [options]
*/
/** @type {Record<string, FormField>} */
var formFieldConfig = {
	fullName: {
		name: "fullName",
		label: "Full Name",
		type: "text",
		placeholder: "Enter your full name",
		required: true,
		width: "half"
	},
	email: {
		name: "email",
		label: "Email",
		type: "email",
		placeholder: "name@company.com",
		required: true,
		width: "half"
	},
	company: {
		name: "company",
		label: "Company",
		type: "text",
		placeholder: "Enter company name",
		required: false,
		width: "full"
	},
	phone: {
		name: "phone",
		label: "Phone",
		type: "tel",
		placeholder: "Enter phone number",
		required: false,
		width: "full"
	},
	message: {
		name: "message",
		label: "Message",
		type: "textarea",
		placeholder: "Type your message",
		required: true,
		width: "full",
		rows: 4
	}
};
Object.values(formFieldConfig);
// src/components/ui/SlideInPanel/contact/SlideInPanelContact.astro
var $$SlideInPanelContact = createComponent(($$result, $$props, $$slots) => {
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
	return renderTemplate`${maybeRenderHead($$result)}<section class="contact-panel-content" data-astro-cid-c36oe4ng><div class="contact-panel-content__header" data-astro-cid-c36oe4ng><h4 data-astro-cid-c36oe4ng>Have a project in mind?</h4><h3 data-astro-cid-c36oe4ng>Let's build something amazing together</h3><p data-astro-cid-c36oe4ng>Tell us a little about your project and we will be in touch soonest</p></div><div class="contact-panel-content__form" data-astro-cid-c36oe4ng>${renderComponent($$result, "Form", $$Form, {
		"title": "Fill in your details",
		"fields": fields,
		"submitLabel": "Start a conversation",
		"note": "No pitch deck. No pressure.",
		"layout": "grid",
		"class": "contact-section__form",
		"data-astro-cid-c36oe4ng": true
	})}</div></section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/SlideInPanel/contact/SlideInPanelContact.astro", void 0);
// src/layouts/BaseLayout.astro
createAstro("https://astro.build");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title = "AvoChoc", description = "Progress Done Properly" } = Astro.props;
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}>${renderHead($$result)}</head><body>${renderComponent($$result, "Header", $$Header, {})}<main>${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}${renderComponent($$result, "SlideInPanel", $$SlideInPanel, {
		"id": "contact-panel",
		"title": "Get in touch"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SlideInPanelContact", $$SlideInPanelContact, {})}` })}</body></html>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/layouts/BaseLayout.astro", void 0);
export { $$Container as a, renderScript as c, $$Columns as i, formFieldConfig as n, $$SecondaryBtn as o, $$Form as r, $$PrimaryBtn as s, $$BaseLayout as t };
