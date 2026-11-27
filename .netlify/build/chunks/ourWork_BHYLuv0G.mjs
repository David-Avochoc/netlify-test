import { _ as addAttribute, a as Fragment, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import { c as renderScript } from "./BaseLayout_DO4EBRO4.mjs";
import "./compiler_CJfKk-QH.mjs";
// src/components/ui/PreviewHoverList.astro
createAstro("https://astro.build");
var $$PreviewHoverList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PreviewHoverList;
	const { projects, class: className = "", thirdColumnLabel = "Service", useTags = false } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(["preview-hover-list", className], "class:list")} data-preview-hover-list data-astro-cid-uiw2bu2r><div class="preview-hover-list__header" aria-hidden="true" data-astro-cid-uiw2bu2r><span data-astro-cid-uiw2bu2r>Client</span><span data-astro-cid-uiw2bu2r>Industry</span><span data-astro-cid-uiw2bu2r>${thirdColumnLabel}</span></div><ol class="preview-hover-list__rows" data-astro-cid-uiw2bu2r>${projects.map((project) => {
		const rowContent = renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span class="preview-hover-list__title" data-astro-cid-uiw2bu2r>${project.title}</span><span class="preview-hover-list__category" data-astro-cid-uiw2bu2r>${project.category}</span><span class="preview-hover-list__services" data-astro-cid-uiw2bu2r>${useTags ? (project.tags ?? []).join(", ") : (project.services ?? []).join(", ")}</span>` })}`;
		return renderTemplate`<li class="preview-hover-list__item" data-preview-list-item${addAttribute(project.category ?? "", "data-category")} data-astro-cid-uiw2bu2r>${project.status === "coming-soon" ? renderTemplate`<button type="button" class="preview-hover-list__row" data-preview-row${addAttribute(project.slug, "data-slug")}${addAttribute(project.hoverImage ?? project.featuredImage ?? "", "data-photo")} data-panel-open="contact-panel" data-astro-cid-uiw2bu2r>${rowContent}</button>` : renderTemplate`<a class="preview-hover-list__row" data-preview-row${addAttribute(project.slug, "data-slug")}${addAttribute(project.hoverImage ?? project.featuredImage ?? "", "data-photo")}${addAttribute(`/work/${project.slug}/`, "href")} data-astro-cid-uiw2bu2r>${rowContent}</a>`}</li>`;
	})}</ol><div class="preview-hover-list__preview" aria-hidden="true" data-astro-cid-uiw2bu2r><img class="preview-hover-list__image" alt="" draggable="false" data-astro-cid-uiw2bu2r><img class="preview-hover-list__image" alt="" draggable="false" data-astro-cid-uiw2bu2r></div></section>${renderScript($$result, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/PreviewHoverList.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/ui/PreviewHoverList.astro", void 0);
// src/data/ourWork.js
var ourWork = [
	{
		slug: "gritcargo",
		title: "GritCargo",
		description: "A live Iot Platform for Real-Time Cargo Visibility",
		featuredImage: "/images/content/caseStudies/GritCargo_ft_image.webp",
		hoverImage: "/images/content/caseStudies/GritCargo_ft_image.webp",
		imageAlt: "GritCargo",
		logo: "/images/logos/GRITCARGO.svg",
		brandColor: "#D0F8AB",
		cardVisual: "image",
		publishDate: "2026-11-16",
		category: "Logistics",
		services: [
			"Design",
			"Frontend",
			"Backend"
		],
		tags: ["Product Development", "System Integration"]
	},
	{
		slug: "btcorp",
		title: "BTCORP",
		description: "Recovering a Stalled Platform for a Fast-Growing Fleet Network",
		featuredImage: "/images/content/caseStudies/GritCargo_ft_image.webp",
		hoverImage: null,
		imageAlt: null,
		logo: "/images/logos/GRITCARGO.svg",
		brandColor: "#26A9E0",
		cardVisual: "brand",
		publishDate: "2026-11-16",
		category: "Transport",
		services: [
			"Design",
			"Frontend",
			"Backend"
		],
		tags: ["System Integration", "Legacy Modernisation"],
		status: "coming-soon"
	},
	{
		slug: "elyvate",
		title: "Elyvate",
		description: "Live Platform Modernisation for a Global Automotive Project Platform",
		featuredImage: null,
		hoverImage: "/images/content/caseStudies/Elyvate_ft_image.webp",
		imageAlt: null,
		logo: "/images/logos/elyvate_logo.svg",
		brandColor: "#1570EF",
		cardVisual: "brand",
		publishDate: "2026-11-16",
		category: "Automotive",
		services: ["Frontend", "Backend"],
		tags: ["System Integration", "Legacy Modernisation"],
		status: "coming-soon"
	},
	{
		slug: "time2read",
		title: "Time2Read",
		description: "A Five-Platform Learning Ecosystem for South Africa's Youngest Readers",
		featuredImage: null,
		hoverImage: null,
		imageAlt: null,
		logo: "/images/logos/T2R_LOGO.svg",
		brandColor: "#03B48F",
		cardVisual: "brand",
		publishDate: "2026-11-16",
		category: "Education",
		services: [
			"Design",
			"Frontend",
			"Backend"
		],
		tags: ["System Integration"]
	},
	{
		slug: "cvo",
		title: "CVO",
		description: "Live Platform Modernisation for a Global Automotive Project Platform",
		featuredImage: null,
		hoverImage: "/images/content/caseStudies/CVO_ft_image.webp",
		imageAlt: "CVO",
		logo: null,
		brandColor: "#1570EF",
		cardVisual: "brand",
		publishDate: "2026-11-16",
		category: "Religion",
		services: ["Frontend", "Backend"],
		tags: ["System Integration", "Legacy Modernisation"],
		status: "coming-soon"
	},
	{
		slug: "firedart",
		title: "Firedart",
		description: "Live Platform Modernisation for a Global Automotive Project Platform",
		featuredImage: null,
		hoverImage: "/images/content/caseStudies/CVO_ft_image.webp",
		imageAlt: "Firedart",
		logo: null,
		brandColor: "#1570EF",
		cardVisual: "brand",
		publishDate: "2026-11-16",
		category: "Fintech",
		services: [
			"Design",
			"Frontend",
			"Backend"
		],
		tags: ["System Integration", "Legacy Modernisation"],
		status: "coming-soon"
	},
	{
		slug: "iteach",
		title: "iTeach",
		description: "Live Platform Modernisation for a Global Automotive Project Platform",
		featuredImage: null,
		hoverImage: "/images/content/caseStudies/CVO_ft_image.webp",
		imageAlt: "iTeach",
		logo: null,
		brandColor: "#1570EF",
		cardVisual: "brand",
		publishDate: "2026-11-16",
		category: "Education",
		services: [
			"Design",
			"Frontend",
			"Backend"
		],
		tags: ["System Integration", "Legacy Modernisation"],
		status: "coming-soon"
	}
];
export { $$PreviewHoverList as n, ourWork as t };
