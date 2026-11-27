import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { d as renderTemplate, f as maybeRenderHead } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import "./compiler_CJfKk-QH.mjs";
import { i as getEmDashCollection } from "./query-CslUTGOV_Dwc0aJYy.mjs";
// src/pages/emdash-test.astro
var emdash_test_exports = /* @__PURE__ */ __exportAll({
	default: () => $$EmdashTest,
	file: () => $$file,
	url: () => $$url
});
var $$EmdashTest = createComponent(async ($$result, $$props, $$slots) => {
	const { entries: posts, error } = await getEmDashCollection("posts");
	if (error) throw error;
	return renderTemplate`${maybeRenderHead($$result)}<h1>EmDash posts</h1><pre>${JSON.stringify(posts[0]?.data, null, 2)}</pre><ul>${posts.map((post) => renderTemplate`<li>${post.data.title}</li>`)}</ul>`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/emdash-test.astro", void 0);
var $$file = "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/src/pages/emdash-test.astro";
var $$url = "/emdash-test";
// \0virtual:astro:page:src/pages/emdash-test@_@astro
var page = () => emdash_test_exports;
export { page };
