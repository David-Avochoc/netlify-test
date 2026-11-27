import { _ as addAttribute, d as renderTemplate, f as maybeRenderHead, i as renderComponent, t as spreadAttributes } from "./server_BUeai1qo.mjs";
import { t as createComponent } from "./astro-component_BxSY7fqD.mjs";
import { t as createAstro } from "./astro-global_DoCOPDY1.mjs";
import "./compiler_CJfKk-QH.mjs";
import { n as getImage, o as $$Picture, s as $$Image } from "./_astro_assets_Apbw_6vY.mjs";
import { t as focalPointToObjectPosition } from "./focal-point_CmWLDffv.mjs";
// node_modules/emdash/src/media/normalize.ts
var INTERNAL_MEDIA_PREFIX = "/_emdash/api/media/file/";
function normalizeLegacyExternalMediaValue(value) {
	if (value.provider !== "external-url") return value;
	const src = value.src ?? value.previewUrl;
	return {
		...value,
		provider: "external",
		...src === void 0 ? {} : { src }
	};
}
// node_modules/emdash/src/media/url.ts
var SAFE_STORAGE_KEY = /^[A-Za-z0-9._-]+$/;
/**
* Build the internal file route URL for a storage key, encoding each path
* segment so `?`, `#` and `%` stay inside the path. A key with an empty, `.` or
* `..` segment is encoded whole, because the URL parser would collapse those
* segments and move the request off the route. Mirrors the admin's
* `localMediaFileUrl`.
*/
function localMediaFileUrl(key) {
	const segments = key.split("/");
	if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) return `${INTERNAL_MEDIA_PREFIX}${encodeURIComponent(key)}`;
	return `${INTERNAL_MEDIA_PREFIX}${segments.map(encodeURIComponent).join("/")}`;
}
/**
* Build a render-time media URL. Prefers `storageKey`, then rewrites an
* internal `url` via `resolve`, then falls back to the internal proxy for a
* bare `id`. External URLs and non-matching internal-looking URLs pass
* through untouched. Returns `""` when nothing usable is present.
*
* @internal
*/
function buildRenderMediaUrl(resolve, ref) {
	const { storageKey, url, id } = ref;
	if (storageKey) return resolve ? resolve(storageKey) : `${INTERNAL_MEDIA_PREFIX}${storageKey}`;
	if (url) {
		if (resolve && url.startsWith("/_emdash/api/media/file/")) {
			const key = url.slice(INTERNAL_MEDIA_PREFIX.length);
			if (SAFE_STORAGE_KEY.test(key)) return resolve(key);
		}
		return url;
	}
	if (id) return `${INTERNAL_MEDIA_PREFIX}${id}`;
	return "";
}
// node_modules/emdash/src/media/provider-loader.ts
var virtualMediaProviders;
var mediaProviderInstances = /* @__PURE__ */ new Map();
/**
* Load media providers from virtual module
*/
async function loadMediaProviders() {
	if (virtualMediaProviders === void 0) virtualMediaProviders = (await import("./media-providers_CsI1ANqo.mjs")).mediaProviders || [];
}
/**
* Get a media provider by ID.
*
* Used by EmDashMedia component for frontend rendering.
* Providers are lazy-loaded from virtual module and cached.
*
* @example
* ```ts
* const provider = await getMediaProvider("cloudflare-images");
* if (provider) {
*   const embed = provider.getEmbed(mediaValue, { width: 800 });
* }
* ```
*/
async function getMediaProvider(providerId) {
	const cached = mediaProviderInstances.get(providerId);
	if (cached) return cached;
	await loadMediaProviders();
	const entry = virtualMediaProviders?.find((p) => p.id === providerId);
	if (!entry) return;
	const provider = entry.createProvider({});
	mediaProviderInstances.set(providerId, provider);
	return provider;
}
// node_modules/emdash/src/media/responsive.ts
/** Standard responsive breakpoints. Matches CDN-provider srcset generation. */
var RESPONSIVE_BREAKPOINTS = [
	640,
	750,
	828,
	960,
	1080,
	1280,
	1600,
	1920
];
/** Matches absolute http(s) URLs — the only shape Astro's image services optimize. */
var ABSOLUTE_HTTP_URL = /^https?:\/\//i;
/**
* Pick the srcset widths to generate for an image rendered at `maxWidth`.
* Includes breakpoints up to 2x (retina) plus the rendered width itself, so the
* browser always has an exact-fit candidate. A known `originalWidth` below 2x
* lowers that limit, so the source is never upscaled for a high-density
* candidate. The limit itself is a candidate up to the largest breakpoint, so
* images narrower than the first breakpoint still get one.
*/
function responsiveWidths(maxWidth, originalWidth) {
	const width = Math.round(maxWidth);
	if (!(width >= 1)) return [];
	const original = Math.round(originalWidth ?? 0);
	const cap = original >= 1 && original < width * 2 ? original : width * 2;
	const widths = new Set(RESPONSIVE_BREAKPOINTS.filter((w) => w <= cap));
	widths.add(width);
	if (cap <= Math.max(...RESPONSIVE_BREAKPOINTS)) widths.add(cap);
	return [...widths].toSorted((a, b) => a - b);
}
/** Build the `sizes` attribute for an image with a known display width. */
function responsiveSizes(width) {
	return width ? `(min-width: ${width}px) ${width}px, 100vw` : "100vw";
}
/**
* Build the `sizes` attribute for one cell of a Portable Text gallery.
*
* Mirrors the gallery's CSS: `columns` equal cells with a `1rem` gap, and two
* columns at `640px` and below. Each cell is estimated against the viewport, so
* a gallery inside a narrower content column still gets a larger slot than it
* renders at; pass `sizes` to `Gallery` when the container width is known.
*/
function gallerySizes(columns) {
	const count = typeof columns === "number" && Number.isInteger(columns) && columns > 0 ? columns : 3;
	return `(max-width: 640px) ${galleryCell(2)}, ${galleryCell(count)}`;
}
function galleryCell(columns) {
	return columns === 1 ? "100vw" : `calc((100vw - ${columns - 1}rem) / ${columns})`;
}
/**
* Make a same-origin media URL absolute so Astro's image service can optimize it.
*
* Astro only optimizes absolute http(s) URLs; a same-origin proxy path like
* `/_emdash/api/media/file/x.jpg` is otherwise treated as an unoptimizable
* public asset. Resolving it against the site's public origin (and authorizing
* that origin via `image.remotePatterns`) lets the service transform it.
*
* Only **same-origin** root-relative paths are resolved. Protocol-relative
* URLs (`//evil.com/x`) and backslash tricks (`/\evil.com`) also start with `/`
* but resolve to a different origin -- a classic SSRF vector once a
* remotePattern authorizes the media path -- so anything that escapes the
* origin is returned unchanged (and then skipped by `buildResponsiveImage`,
* which only accepts absolute http(s) URLs). Already-absolute URLs (CDN/public
* bucket) and non-path values (`data:`, `blob:`) are returned unchanged too.
*/
function toAbsoluteMediaUrl(src, origin) {
	if (!src || !origin || !src.startsWith("/")) return src;
	try {
		const resolved = new URL(src, origin);
		if (resolved.origin !== new URL(origin).origin) return src;
		return resolved.href;
	} catch {
		return src;
	}
}
/** MIME type for a transform output format, for `<source type>`. */
function formatContentType(format) {
	return `image/${format === "jpg" ? "jpeg" : format}`;
}
/** Return whether the image service rewrites the URL for this transform. */
async function canOptimizeImage(getImage, opts) {
	if (!ABSOLUTE_HTTP_URL.test(opts.src)) return false;
	try {
		const result = await getImage(opts);
		return Boolean(result.src && result.src !== opts.src);
	} catch {
		return false;
	}
}
/**
* Generate a responsive `src`/`srcset`/`sizes` for a media URL via Astro's
* configured image service.
*
* Astro's image services (sharp, Cloudflare `/cdn-cgi/image`, and the default
* Cloudflare `cloudflare-binding` service) only optimize **absolute** URLs whose
* host is authorized via `image.domains` / `image.remotePatterns`. Anything else
* is passed through unchanged, which would yield a useless srcset (the same URL
* at every width descriptor). We therefore only attempt optimization for
* absolute http(s) URLs and verify the service actually rewrote the URL.
*
* Returns `null` so callers fall back to a plain `<img>` when:
*  - dimensions are unknown (avoids an inferSize fetch on every render),
*  - the URL is relative (a same-origin proxy/public asset Astro won't optimize),
*  - the host isn't authorized (the service passed the URL through unchanged),
*  - no image service is configured / `getImage` throws.
*/
async function buildResponsiveImage(getImage, opts) {
	const { src, width, height, originalWidth, format, quality } = opts;
	if (!src || !width || !height) return null;
	if (!ABSOLUTE_HTTP_URL.test(src)) return null;
	try {
		const sizes = responsiveSizes(width);
		const result = await getImage({
			src,
			width,
			height,
			widths: responsiveWidths(width, originalWidth),
			sizes,
			format,
			...quality !== void 0 ? { quality } : {}
		});
		if (!result.src || result.src === src) return null;
		return {
			src: result.src,
			srcset: result.srcSet?.attribute || void 0,
			sizes
		};
	} catch {
		return null;
	}
}
// node_modules/emdash/src/api/public-url.ts
/**
* Resolve siteUrl from runtime environment variables.
*
* Uses process.env (not import.meta.env) because Vite statically replaces
* import.meta.env at build time, baking out any env vars not present during
* the build. Container deployments set env vars at runtime, so we must read
* process.env which Vite leaves untouched.
*
* On Cloudflare Workers process.env is empty by default, so the fallback
* chain continues to url.origin — unless the Worker enables the
* `nodejs_compat_populate_process_env` compatibility flag, in which case
* `vars`/secrets (e.g. EMDASH_SITE_URL) are readable here too.
*
* Caches after first call.
*/
var _envSiteUrl = null;
function getEnvSiteUrl() {
	if (_envSiteUrl !== null) return _envSiteUrl || void 0;
	try {
		const value = typeof process !== "undefined" && process.env?.EMDASH_SITE_URL || typeof process !== "undefined" && process.env?.SITE_URL || "";
		if (value) {
			const parsed = new URL(value);
			if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
				_envSiteUrl = "";
				return;
			}
			_envSiteUrl = parsed.origin;
		} else _envSiteUrl = "";
	} catch {
		_envSiteUrl = "";
	}
	return _envSiteUrl || void 0;
}
/**
* Return the public-facing origin for the site.
*
* Resolution order:
*   1. `config.siteUrl` (set in astro.config.mjs, origin-normalized at startup)
*   2. `EMDASH_SITE_URL` or `SITE_URL` env var (resolved at runtime for containers)
*   3. `url.origin` (internal request URL — correct when no proxy)
*
* @param url  The request URL (`new URL(request.url)` or `Astro.url`)
* @param config  The EmDash config (from `locals.emdash?.config`)
* @returns Origin string, e.g. `"https://mysite.example.com"`
*/
function getPublicOrigin(url, config) {
	return getConfiguredOrigin(config) || url.origin;
}
/**
* Return the operator-configured public origin, if any.
*
* The first two steps of {@link getPublicOrigin}'s resolution —
* `config.siteUrl`, then the `EMDASH_SITE_URL`/`SITE_URL` env vars — without
* the request-URL fallback. For callers that have a more trustworthy fallback
* than the request (e.g. the stored setup origin used for outbound emails).
*/
function getConfiguredOrigin(config) {
	return config?.siteUrl || getEnvSiteUrl() || void 0;
}
// node_modules/emdash/src/components/EmDashImage.astro
createAstro("https://astro.build");
var $$EmDashImage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashImage;
	const { image, darkVariant, alt, width, height, quality, priority, placeholder = true, formats, fallbackFormat, class: className, id, ...attrs } = Astro.props;
	function normalizeImage(img) {
		if (!img) return null;
		if (typeof img === "string") return {
			id: "",
			src: img
		};
		return normalizeLegacyExternalMediaValue(img);
	}
	function buildLocalImageUrl(img) {
		return buildRenderMediaUrl(Astro.locals.emdash?.getPublicMediaUrl, {
			storageKey: img.meta?.storageKey,
			id: img.id
		});
	}
	function generateSrcset(getSrc, maxWidth, aspectRatio, originalWidth) {
		return responsiveWidths(maxWidth, originalWidth).map((w) => {
			return `${getSrc({
				width: w,
				height: aspectRatio ? Math.round(w / aspectRatio) : void 0,
				quality
			})} ${w}w`;
		}).join(", ");
	}
	const imgFormat = formats?.length ? fallbackFormat ?? formats.at(-1) : void 0;
	const sourceFormats = formats?.length ? fallbackFormat ? formats : formats.slice(0, -1) : [];
	const outputFormats = [.../* @__PURE__ */ new Set([imgFormat, ...sourceFormats])];
	async function resolveImage(img) {
		const finalWidth = width ?? img.width;
		const finalHeight = height ?? img.height;
		const aspectRatio = finalWidth && finalHeight ? finalWidth / finalHeight : void 0;
		let src = "";
		let srcset;
		let sizes;
		let astroImageSrc = "";
		const sources = [];
		const providerId = img.provider ?? "local";
		if (providerId === "local" || img.src) {
			src = img.src || buildLocalImageUrl(img);
			const publicOrigin = getPublicOrigin(Astro.url, Astro.locals.emdash?.config);
			const absoluteSrc = toAbsoluteMediaUrl(src, publicOrigin);
			if (finalWidth && finalHeight && absoluteSrc.startsWith(`${publicOrigin}/`)) {
				if ((await Promise.all(outputFormats.map((format) => canOptimizeImage(getImage, {
					src: absoluteSrc,
					width: finalWidth,
					height: finalHeight,
					...format !== void 0 ? { format } : {},
					...quality !== void 0 ? { quality } : {}
				})))).every(Boolean)) astroImageSrc = absoluteSrc;
			} else {
				const optimized = await buildResponsiveImage(getImage, {
					src: absoluteSrc,
					width: finalWidth,
					height: finalHeight,
					originalWidth: img.width,
					format: imgFormat,
					quality
				});
				if (optimized) {
					src = optimized.src;
					srcset = optimized.srcset;
					sizes = optimized.sizes;
					const alternates = await Promise.all(sourceFormats.map((sourceFormat) => sourceFormat === imgFormat ? Promise.resolve({
						sourceFormat,
						alternate: optimized
					}) : buildResponsiveImage(getImage, {
						src: absoluteSrc,
						width: finalWidth,
						height: finalHeight,
						originalWidth: img.width,
						format: sourceFormat,
						quality
					}).then((alternate) => ({
						sourceFormat,
						alternate
					}))));
					for (const { sourceFormat, alternate } of alternates) {
						if (!alternate) continue;
						sources.push({
							type: formatContentType(sourceFormat),
							srcset: alternate.srcset || alternate.src,
							sizes: alternate.srcset ? attrs.sizes ?? alternate.sizes : void 0
						});
					}
				}
			}
		} else {
			try {
				const provider = await getMediaProvider(providerId);
				if (provider) {
					const result = provider.getEmbed(img, {
						width: finalWidth,
						height: finalHeight,
						quality
					});
					const embed = result instanceof Promise ? await result : result;
					if (embed.type === "image") {
						src = embed.src;
						if (embed.getSrc) {
							const maxWidth = finalWidth || 1200;
							srcset = generateSrcset(embed.getSrc, maxWidth, aspectRatio, img.width);
							sizes = finalWidth ? `(min-width: ${finalWidth}px) ${finalWidth}px, 100vw` : "100vw";
						}
					}
				} else console.warn(`[EmDashImage] Provider not found: ${providerId}`);
			} catch (error) {
				console.error(`[EmDashImage] Failed to get embed for image ${img.id}:`, error);
			}
			if (!src) src = buildLocalImageUrl(img);
		}
		const blurhash = img.blurhash ?? img.meta?.blurhash;
		const dominantColor = img.dominantColor ?? img.meta?.dominantColor;
		let placeholderStyle = "";
		if (placeholder && blurhash) {
			const { blurhashToImageCssString } = await import("@unpic/placeholder");
			placeholderStyle = blurhashToImageCssString(blurhash);
		} else if (placeholder && dominantColor) placeholderStyle = `background-color: ${dominantColor};`;
		const objectPosition = focalPointToObjectPosition(img.focalX, img.focalY);
		const generatedStyle = [placeholderStyle && !placeholderStyle.endsWith(";") ? `${placeholderStyle};` : placeholderStyle, objectPosition ? `object-position: ${objectPosition};` : ""].filter(Boolean).join(" ");
		return {
			src,
			srcset,
			sizes,
			astroImageSrc,
			width: finalWidth,
			height: finalHeight,
			generatedStyle,
			sources
		};
	}
	const img = normalizeImage(image);
	const darkSource = darkVariant ?? (typeof image === "object" ? image?.darkVariant : void 0);
	const dark = img ? normalizeImage(darkSource) : null;
	const finalAlt = alt ?? img?.alt ?? "";
	const resolved = img ? await resolveImage(img) : null;
	const resolvedDark = dark ? await resolveImage(dark) : null;
	function imgProps(r, variantClass, elementId) {
		return {
			id: elementId,
			src: r.src,
			srcset: r.srcset,
			sizes: r.sizes,
			width: r.width,
			height: r.height,
			alt: finalAlt,
			loading: priority ? "eager" : "lazy",
			fetchpriority: priority ? "high" : void 0,
			decoding: "async",
			style: r.generatedStyle || void 0,
			class: [
				"emdash-image-media",
				variantClass,
				className
			].filter(Boolean).join(" "),
			...attrs
		};
	}
	const lightClass = resolvedDark ? "emdash-image--light" : void 0;
	const darkId = id ? `${id}--dark` : void 0;
	const astroClass = (variantClass) => [variantClass, className].filter(Boolean).join(" ") || void 0;
	return renderTemplate`${resolved && resolved.astroImageSrc ? sourceFormats.length ? renderTemplate`${renderComponent($$result, "AstroPicture", $$Picture, {
		"id": id,
		"src": resolved.astroImageSrc,
		"alt": finalAlt,
		"width": resolved.width,
		"height": resolved.height,
		"sizes": responsiveSizes(resolved.width),
		"quality": quality,
		"priority": priority,
		"layout": "constrained",
		"formats": sourceFormats,
		"fallbackFormat": imgFormat,
		"pictureAttributes": { class: lightClass },
		"loading": priority ? "eager" : "lazy",
		"decoding": "async",
		"class": astroClass(lightClass),
		"style": resolved.generatedStyle || void 0,
		...attrs,
		"data-astro-cid-6depetnu": true
	})}` : renderTemplate`${renderComponent($$result, "AstroImage", $$Image, {
		"id": id,
		"src": resolved.astroImageSrc,
		"alt": finalAlt,
		"width": resolved.width,
		"height": resolved.height,
		"quality": quality,
		"priority": priority,
		"layout": "constrained",
		"format": imgFormat,
		"loading": priority ? "eager" : "lazy",
		"decoding": "async",
		"class": astroClass(lightClass),
		"style": resolved.generatedStyle || void 0,
		...attrs,
		"data-astro-cid-6depetnu": true
	})}` : resolved && resolved.src ? resolved.sources.length ? renderTemplate`${maybeRenderHead($$result)}<picture${addAttribute(lightClass, "class")} data-astro-cid-6depetnu>${resolved.sources.map((source) => renderTemplate`<source${addAttribute(source.type, "type")}${addAttribute(source.srcset, "srcset")}${addAttribute(source.sizes, "sizes")} data-astro-cid-6depetnu>`)}<img${spreadAttributes(imgProps(resolved, lightClass, id))} data-astro-cid-6depetnu></picture>` : renderTemplate`<img${spreadAttributes(imgProps(resolved, lightClass, id))} data-astro-cid-6depetnu>` : null}${resolvedDark && resolvedDark.astroImageSrc ? sourceFormats.length ? renderTemplate`${renderComponent($$result, "AstroPicture", $$Picture, {
		"id": darkId,
		"src": resolvedDark.astroImageSrc,
		"alt": finalAlt,
		"width": resolvedDark.width,
		"height": resolvedDark.height,
		"sizes": responsiveSizes(resolvedDark.width),
		"quality": quality,
		"priority": priority,
		"layout": "constrained",
		"formats": sourceFormats,
		"fallbackFormat": imgFormat,
		"pictureAttributes": { class: "emdash-image--dark" },
		"loading": priority ? "eager" : "lazy",
		"decoding": "async",
		"class": astroClass("emdash-image--dark"),
		"style": resolvedDark.generatedStyle || void 0,
		...attrs,
		"data-astro-cid-6depetnu": true
	})}` : renderTemplate`${renderComponent($$result, "AstroImage", $$Image, {
		"id": darkId,
		"src": resolvedDark.astroImageSrc,
		"alt": finalAlt,
		"width": resolvedDark.width,
		"height": resolvedDark.height,
		"quality": quality,
		"priority": priority,
		"layout": "constrained",
		"format": imgFormat,
		"loading": priority ? "eager" : "lazy",
		"decoding": "async",
		"class": astroClass("emdash-image--dark"),
		"style": resolvedDark.generatedStyle || void 0,
		...attrs,
		"data-astro-cid-6depetnu": true
	})}` : resolvedDark && resolvedDark.src ? resolvedDark.sources.length ? renderTemplate`<picture class="emdash-image--dark" data-astro-cid-6depetnu>${resolvedDark.sources.map((source) => renderTemplate`<source${addAttribute(source.type, "type")}${addAttribute(source.srcset, "srcset")}${addAttribute(source.sizes, "sizes")} data-astro-cid-6depetnu>`)}<img${spreadAttributes(imgProps(resolvedDark, "emdash-image--dark", darkId))} data-astro-cid-6depetnu></picture>` : renderTemplate`<img${spreadAttributes(imgProps(resolvedDark, "emdash-image--dark", darkId))} data-astro-cid-6depetnu>` : null}`;
}, "/Users/davidcorkill/Documents/Development/AvoChoc-Astro/node_modules/emdash/src/components/EmDashImage.astro", void 0);
export { responsiveWidths as a, buildRenderMediaUrl as c, gallerySizes as i, localMediaFileUrl as l, getPublicOrigin as n, toAbsoluteMediaUrl as o, canOptimizeImage as r, getMediaProvider as s, $$EmDashImage as t };
