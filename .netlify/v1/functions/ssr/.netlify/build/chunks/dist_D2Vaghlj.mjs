import { t as slugify } from "./slugify_PHKs_6uy.mjs";
import { ulid as ulid$1 } from "ulidx";
import "./portable-text-table_DzMGQUwX.mjs";
import { Extension, Mark, Node } from "@tiptap/core";
import * as mod from "zod/v4";
import { gutenbergToPortableText } from "@emdash-cms/gutenberg-to-portable-text";
// node_modules/emdash/dist/index.mjs
var mediaSchema = mod.object({
	id: mod.string(),
	src: mod.string().optional(),
	alt: mod.string().optional(),
	caption: mod.string().optional(),
	width: mod.number().optional(),
	height: mod.number().optional(),
	filename: mod.string().optional(),
	mimeType: mod.string().optional(),
	blurhash: mod.string().optional(),
	dominantColor: mod.string().optional(),
	focalX: mod.number().optional(),
	focalY: mod.number().optional(),
	provider: mod.string().optional(),
	previewUrl: mod.string().optional(),
	meta: mod.record(mod.string(), mod.unknown()).optional()
});
mediaSchema.extend({ darkVariant: mediaSchema.optional() });
mod.object({
	_type: mod.string(),
	_key: mod.string()
}).loose();
var PORTABLE_TEXT_BLOCK_NODE = "emdashPortableTextBlock";
var PORTABLE_TEXT_BLOCK_ATTR = "emdashPortableTextBlock";
var PORTABLE_TEXT_KEY_ATTR = "emdashPortableTextKey";
var PORTABLE_TEXT_SPAN_MARK = "emdashPortableTextSpan";
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function portableTextBlockFromAttrs(attrs) {
	const block = attrs?.[PORTABLE_TEXT_BLOCK_ATTR];
	if (!isRecord(block) || typeof block._type !== "string" || typeof block._key !== "string") return;
	return {
		...block,
		_type: block._type,
		_key: block._key
	};
}
Extension.create({
	name: "emdashPortableTextIdentity",
	addGlobalAttributes() {
		const hiddenAttribute = {
			default: null,
			rendered: false
		};
		return [{
			types: [
				"paragraph",
				"heading",
				"blockquote",
				"codeBlock",
				"htmlBlock",
				"iframeBlock",
				"image",
				"videoBlock",
				"horizontalRule",
				"gallery",
				PORTABLE_TEXT_BLOCK_NODE
			],
			attributes: { [PORTABLE_TEXT_KEY_ATTR]: hiddenAttribute }
		}];
	}
}), Mark.create({
	name: PORTABLE_TEXT_SPAN_MARK,
	inclusive: false,
	spanning: false,
	addAttributes() {
		return {
			key: {
				default: null,
				rendered: false
			},
			markDefs: {
				default: [],
				rendered: false
			}
		};
	},
	parseHTML() {
		return [];
	},
	renderHTML() {
		return ["span", 0];
	}
}), Node.create({
	name: PORTABLE_TEXT_BLOCK_NODE,
	group: "block",
	atom: true,
	selectable: true,
	draggable: true,
	addAttributes() {
		return { [PORTABLE_TEXT_BLOCK_ATTR]: {
			default: null,
			rendered: false
		} };
	},
	parseHTML() {
		return [{ tag: "div[data-emdash-portable-text-block]" }];
	},
	renderHTML({ node }) {
		const blockType = portableTextBlockFromAttrs(node.attrs)?._type ?? "unknown";
		return [
			"div",
			{
				"data-emdash-portable-text-block": blockType,
				contenteditable: "false"
			},
			`[Unknown block type: ${blockType}]`
		];
	}
});
/** Minimum polling interval (ms) — prevents tight loops if next_run_at is in the past */
var MIN_INTERVAL_MS = 1e3;
/**
* Maximum polling interval (ms). Each wake runs the maintenance pass — stale
* lock recovery *and* the scheduled-publishing sweep + system cleanup.
* `getNextDueTime()` only knows about cron tasks, not content `scheduled_at`,
* so the scheduler also wakes at the start of every minute: the admin
* schedules content to the minute, and a wake on the boundary publishes it on
* time instead of up to a minute late.
*/
var MAX_INTERVAL_MS = 6e4;
/** Wakes just after the minute starts, so a timer that fires early still lands on it. */
var MINUTE_BOUNDARY_SLACK_MS = 25;
function msUntilNextMinute(now) {
	const sinceMinute = now % MAX_INTERVAL_MS;
	if (sinceMinute < MINUTE_BOUNDARY_SLACK_MS) return MINUTE_BOUNDARY_SLACK_MS - sinceMinute;
	return MAX_INTERVAL_MS - sinceMinute + MINUTE_BOUNDARY_SLACK_MS;
}
var NodeCronScheduler = class {
	timer = null;
	running = false;
	systemCleanup = null;
	constructor(executor) {
		this.executor = executor;
	}
	setSystemCleanup(fn) {
		this.systemCleanup = fn;
	}
	start() {
		this.running = true;
		this.arm();
	}
	stop() {
		this.running = false;
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
	reschedule() {
		if (!this.running) return;
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
		this.arm();
	}
	arm() {
		if (!this.running) return;
		this.executor.getNextDueTime().then((nextDue) => {
			if (!this.running) return void 0;
			const now = Date.now();
			let delayMs = msUntilNextMinute(now);
			if (nextDue) {
				const dueAt = new Date(nextDue).getTime();
				delayMs = Math.min(delayMs, Math.max(dueAt - now, MIN_INTERVAL_MS));
			}
			this.timer = setTimeout(() => {
				if (!this.running) return;
				this.executeTick();
			}, delayMs);
			if (this.timer && typeof this.timer === "object" && "unref" in this.timer) this.timer.unref();
		}).catch((error) => {
			console.error("[cron:node] Failed to get next due time:", error);
			if (this.running) {
				this.timer = setTimeout(() => this.arm(), MAX_INTERVAL_MS);
				if (this.timer && typeof this.timer === "object" && "unref" in this.timer) this.timer.unref();
			}
		});
	}
	executeTick() {
		if (!this.running) return;
		const tasks = [this.executor.tick(), this.executor.recoverStaleLocks()];
		if (this.systemCleanup) tasks.push(this.systemCleanup());
		Promise.allSettled(tasks).then((results) => {
			for (const r of results) if (r.status === "rejected") console.error("[cron:node] Tick task failed:", r.reason);
		}).finally(() => {
			if (this.running) this.arm();
		});
	}
};
/**
* Error thrown when attempting to use sandboxing on an unsupported platform.
*/
var SandboxNotAvailableError = class extends Error {
	constructor() {
		super("Plugin sandboxing is not available. Configure a sandbox runner: use @emdash-cms/cloudflare/sandbox on Cloudflare, or @emdash-cms/sandbox-workerd/sandbox on Node.js (requires workerd). Without sandboxing, use trusted plugins (from config) instead.");
		this.name = "SandboxNotAvailableError";
	}
};
/**
* No-op sandbox runner for platforms without isolation support.
*
* - `isAvailable()` returns false
* - `load()` throws SandboxNotAvailableError
* - `terminateAll()` is a no-op
*
* This is the default runner when no platform adapter is configured.
*/
var NoopSandboxRunner = class {
	/**
	* Always returns false - sandboxing is not available.
	*/
	isAvailable() {
		return false;
	}
	/**
	* Always returns false - no sandbox runtime to be healthy.
	*/
	isHealthy() {
		return false;
	}
	/**
	* Always throws - can't load sandboxed plugins without isolation.
	*/
	async load(_manifest, _code) {
		throw new SandboxNotAvailableError();
	}
	/**
	* No-op - sandboxing not available, email callback is irrelevant.
	*/
	setEmailSend() {}
	/**
	* No-op - nothing to terminate.
	*/
	async terminateAll() {}
};
/**
* Create a no-op sandbox runner.
* This is used as the default when no platform adapter is configured.
*/
function createNoopSandboxRunner(_options) {
	return new NoopSandboxRunner();
}
/**
* Import reusable blocks (wp_block post type) from WXR as sections
*
* @param posts - All posts from WXR (will filter to wp_block)
* @param db - Database connection
* @returns Import result with counts
*/
async function importReusableBlocksAsSections(posts, db) {
	const result = {
		sectionsCreated: 0,
		sectionsSkipped: 0,
		errors: []
	};
	const reusableBlocks = posts.filter((post) => post.postType === "wp_block");
	if (reusableBlocks.length === 0) return result;
	for (const block of reusableBlocks) try {
		const slug = block.postName || slugify(block.title || `block-${block.id || Date.now()}`);
		if (await db.selectFrom("_emdash_sections").select("id").where("slug", "=", slug).executeTakeFirst()) {
			result.sectionsSkipped++;
			continue;
		}
		const content = block.content ? gutenbergToPortableText(block.content) : [];
		const id = ulid$1();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await db.insertInto("_emdash_sections").values({
			id,
			slug,
			title: block.title || "Untitled Block",
			description: null,
			keywords: null,
			content: JSON.stringify(content),
			preview_media_id: null,
			source: "import",
			theme_id: null,
			created_at: now,
			updated_at: now
		}).execute();
		result.sectionsCreated++;
	} catch (error) {
		result.errors.push({
			title: block.title || "Untitled Block",
			error: error instanceof Error ? error.message : String(error)
		});
	}
	return result;
}
export { mod as i, createNoopSandboxRunner as n, importReusableBlocksAsSections as r, NodeCronScheduler as t };
