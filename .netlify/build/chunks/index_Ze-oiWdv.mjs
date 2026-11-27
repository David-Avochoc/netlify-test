import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { _ as addAttribute, b as unescapeHTML, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
import { t as $$BaseLayout } from "./BaseLayout_DO4EBRO4.mjs";
import { t as $$EmDashImage } from "./EmDashImage_DWKmDmOs.mjs";
import { i as getEmDashCollection } from "./query-CslUTGOV_Dwc0aJYy.mjs";
// src/components/cards/InsightCard.astro
createAstro("https://astro.build");
var $$InsightCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$InsightCard;
	const { post } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<article class="insight-card" data-astro-cid-2ebrr4in>${post.image && renderTemplate`<a${addAttribute(`/insights/${post.slug}`, "href")} class="insight-card__image-link" data-astro-cid-2ebrr4in>${renderComponent($$result, "Image", $$EmDashImage, {
		"image": post.image,
		"alt": post.imageAlt,
		"width": 800,
		"height": 450,
		"data-astro-cid-2ebrr4in": true
	})}</a>`}<div class="insight-card__content" data-astro-cid-2ebrr4in><h2 class="insight-card__title" data-astro-cid-2ebrr4in><a${addAttribute(`/insights/${post.slug}`, "href")} data-astro-cid-2ebrr4in>${post.title}</a></h2><div class="insight-card__excerpt" data-astro-cid-2ebrr4in>${unescapeHTML(post.excerpt)}</div><a${addAttribute(`/insights/${post.slug}`, "href")} class="insight-card__link" data-astro-cid-2ebrr4in>Read more</a></div></article>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/components/cards/InsightCard.astro", void 0);
// src/sections/insights/InsightsGrid.astro
createAstro("https://astro.build");
var $$InsightsGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$InsightsGrid;
	const { posts } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="insights-grid" data-astro-cid-3l6nfym5><div class="insights-grid__container" data-astro-cid-3l6nfym5>${posts.map((post) => renderTemplate`${renderComponent($$result, "InsightCard", $$InsightCard, {
		"post": post,
		"data-astro-cid-3l6nfym5": true
	})}`)}</div></section>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/sections/insights/InsightsGrid.astro", void 0);
// src/pages/insights/index.astro
var insights_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const { entries, error } = await getEmDashCollection("posts");
	if (error) throw error;
	const posts = entries.map(({ data }) => {
		const textBlocks = (data.content ?? []).flatMap((block) => block.children ?? []).filter((child) => child._type === "span").map((child) => child.text).filter(Boolean);
		return {
			title: data.title,
			slug: data.slug,
			image: data.featured_image,
			imageAlt: data.title,
			excerpt: data.excerpt || textBlocks.join(" ").slice(0, 180)
		};
	});
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Insights",
		"data-astro-cid-pt5ruj3o": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main data-astro-cid-pt5ruj3o><section class="insights-page-header" data-astro-cid-pt5ruj3o><div class="insights-page-header__container" data-astro-cid-pt5ruj3o><h1 data-astro-cid-pt5ruj3o>Insights</h1><p data-astro-cid-pt5ruj3o>Explore our latest articles, news and ideas.</p></div></section>${renderComponent($$result, "InsightsGrid", $$InsightsGrid, {
		"posts": posts,
		"data-astro-cid-pt5ruj3o": true
	})}</main>` })}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/insights/index.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/insights/index.astro";
var $$url = "/insights";
// \0virtual:astro:page:src/pages/insights/index@_@astro
var page = () => insights_exports;
export { page };
