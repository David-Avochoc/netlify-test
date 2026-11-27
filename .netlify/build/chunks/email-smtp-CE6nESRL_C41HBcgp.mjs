import { t as OptionsRepository } from "./options-CMocxAku_DSFt3m7b.mjs";
import { r as parseEncryptionKeys } from "./secrets-O25WpEe__B3AoQE_o.mjs";
import { i as encodeBase64 } from "./base64-GXviT28w_CJsXkxay.mjs";
import { t as withTransaction } from "./transaction-D5Kq7MTL_B_3_YVm2.mjs";
import { a as encryptPluginSetting, o as isEncryptedPluginSetting, r as decryptPluginSetting } from "./settings-DgnWX0GN_BMUOKOTz.mjs";
// node_modules/emdash/dist/email-smtp-CE6nESRL.mjs
/**
* Plugin ID for the built-in SMTP email provider. Distinct from the
* community `emdash-smtp` plugin, which sites may run alongside it.
*/
var SMTP_EMAIL_PLUGIN_ID = "emdash-builtin-smtp";
/** Options key prefix for SMTP settings */
var SMTP_OPTION_PREFIX = "emdash:email:smtp:";
var SMTP_OPTION_PASSWORD = `${SMTP_OPTION_PREFIX}password`;
/** Longest reply line accepted from the server, in bytes. */
var SMTP_LINE_LIMIT = 8192;
function encodeUtf8(input) {
	return new TextEncoder().encode(input);
}
function decodeUtf8(input) {
	return new TextDecoder().decode(input);
}
/** Concatenate chunks into one buffer. */
function concat(chunks) {
	const total = chunks.reduce((n, c) => n + c.length, 0);
	const out = new Uint8Array(total);
	let offset = 0;
	for (const c of chunks) {
		out.set(c, offset);
		offset += c.length;
	}
	return out;
}
/** Byte index of the first CRLF; the buffer is bytes, so a UTF-16 string
* index would drift on multi-byte characters in server replies. */
function indexOfCrlf(buf) {
	for (let i = 0; i + 1 < buf.length; i++) if (buf[i] === 13 && buf[i + 1] === 10) return i;
	return -1;
}
function isWorkerd() {
	return typeof navigator !== "undefined" && typeof navigator.userAgent === "string" && navigator.userAgent.includes("Cloudflare-Workers");
}
/**
* TLS options naming the server. Node only sends SNI when `servername` is
* set, but workerd rejects `servername` and derives SNI from `host` itself.
*/
function tlsServerName(host, isIp) {
	return isWorkerd() || isIp ? { host } : {
		host,
		servername: host
	};
}
/**
* Wrap a connected socket in the reply reader the SMTP session uses.
* Replies are parsed inside the 'data' handler so STARTTLS can hand the
* socket to TLS from that same handler.
*/
function wrapNodeSocket(initial, host, tlsConnect, isIp) {
	let current = initial;
	let pending = /* @__PURE__ */ new Uint8Array(0);
	let lines = [];
	const replies = [];
	let waiter = null;
	let failure = null;
	const fail = (error) => {
		if (failure) return;
		failure = error;
		const w = waiter;
		waiter = null;
		w?.reject(error);
		current.destroy();
	};
	const onData = (chunk) => {
		pending = concat([pending, chunk]);
		for (let idx = indexOfCrlf(pending); idx >= 0; idx = indexOfCrlf(pending)) {
			const line = decodeUtf8(pending.subarray(0, idx));
			pending = pending.slice(idx + 2);
			lines.push(line);
			if (line[3] === "-") continue;
			const reply = {
				code: Number.parseInt(lines[0]?.slice(0, 3) ?? "", 10),
				lines
			};
			lines = [];
			const w = waiter;
			waiter = null;
			if (w) w.resolve(reply);
			else replies.push(reply);
		}
		if (pending.length > SMTP_LINE_LIMIT) fail(new SmtpDeliveryError("SMTP line too long"));
	};
	const onEnd = () => fail(new SmtpDeliveryError("SMTP connection closed unexpectedly"));
	const attach = (sock) => {
		sock.on("data", onData);
		sock.on("end", onEnd);
		sock.on("close", onEnd);
		sock.on("error", fail);
	};
	const detach = (sock) => {
		sock.off("data", onData);
		sock.off("end", onEnd);
		sock.off("close", onEnd);
		sock.off("error", fail);
	};
	attach(initial);
	const write = (data) => new Promise((resolve, reject) => {
		if (failure) {
			reject(failure);
			return;
		}
		current.write(encodeUtf8(data), (error) => {
			if (error) reject(error);
			else resolve();
		});
	});
	return {
		readReply: () => new Promise((resolve, reject) => {
			const queued = replies.shift();
			if (queued) return resolve(queued);
			if (failure) return reject(failure);
			waiter = {
				resolve,
				reject
			};
		}),
		write,
		startTls: () => new Promise((resolve, reject) => {
			if (replies.length > 0) return reject(new SmtpDeliveryError("SMTP server sent an unexpected reply"));
			waiter = {
				reject,
				resolve: (reply) => {
					if (reply.code !== 220) return resolve(reply);
					if (pending.length > 0) {
						const error = new SmtpDeliveryError("SMTP server sent data after STARTTLS");
						reject(error);
						fail(error);
						return;
					}
					const plain = current;
					detach(plain);
					plain.on("error", () => {});
					const secured = tlsConnect({
						socket: plain,
						...tlsServerName(host, isIp)
					});
					current = secured;
					attach(secured);
					const handshake = {
						resolve: () => {},
						reject
					};
					waiter = handshake;
					secured.once("secureConnect", () => {
						if (waiter === handshake) waiter = null;
						resolve(reply);
					});
				}
			};
			write("STARTTLS\r\n").catch(reject);
		}),
		destroy: () => current.destroy()
	};
}
/** Open an SMTP connection over `node:net` (STARTTLS) or `node:tls` (implicit TLS). */
var connectSmtpSocket = async (host, port, secure, signal) => {
	const [{ connect: netConnect, isIP }, { connect: tlsConnect }] = await Promise.all([import("node:net"), import("node:tls")]);
	signal.throwIfAborted();
	const isIp = isIP(host) !== 0;
	return new Promise((resolve, reject) => {
		const sock = secure === "tls" ? tlsConnect({
			port,
			...tlsServerName(host, isIp)
		}) : netConnect({
			host,
			port
		});
		const onAbort = () => {
			sock.destroy();
			reject(signal.reason);
		};
		const onError = (error) => {
			signal.removeEventListener("abort", onAbort);
			reject(error);
		};
		signal.addEventListener("abort", onAbort, { once: true });
		sock.once("error", onError);
		sock.once(secure === "tls" ? "secureConnect" : "connect", () => {
			signal.removeEventListener("abort", onAbort);
			sock.off("error", onError);
			const smtp = wrapNodeSocket(sock, host, tlsConnect, isIp);
			signal.addEventListener("abort", () => smtp.destroy(), { once: true });
			resolve(smtp);
		});
	});
};
/**
* Map raw SMTP failures to actionable messages.
* The raw server line stays in the message so support can still see it.
*/
function humanizeSmtpError(code, context, serverLine) {
	const raw = `${code} ${serverLine}`.trim();
	if (code === 535) return `Authentication failed (${raw}). Username or password rejected by the server. Some providers require an SMTP key or app password instead of the account password.`;
	if (code === 530) return `Authentication required (${raw}). Check the SMTP username and password.`;
	if (code === 550) return `Mailbox unavailable (${raw}). The server rejected the sender or recipient. Check that the "From" address belongs to a domain verified with your provider.`;
	if (code === 534) return `Authentication mechanism rejected (${raw}). The server wants a different auth method (often OAuth2 for Gmail/Outlook). This provider may not support plain SMTP auth.`;
	return `SMTP ${context} failed: ${raw}`;
}
/** Assert reply code matches expectation; throw with server message otherwise. */
function expectCode(reply, expected, context) {
	const codes = Array.isArray(expected) ? expected : [expected];
	if (!(reply.code >= 200 && reply.code < 600)) throw new SmtpDeliveryError(`SMTP ${context} failed: the server did not reply with SMTP`);
	if (!codes.includes(reply.code)) {
		const serverLine = reply.lines.join(" | ");
		throw new SmtpDeliveryError(humanizeSmtpError(reply.code, context, serverLine));
	}
}
/**
* Transcript recorder. Each SMTP step logs what was sent and received so a
* hang or rejection is debuggable from the worker logs instead of requiring
* a local repro. AUTH credential lines are redacted before recording.
*/
var SmtpTrace = class {
	events = [];
	start = Date.now();
	record(direction, line, sensitive = false) {
		const elapsed = Date.now() - this.start;
		const safe = sensitive ? "[credentials]" : line.replace(/[\r\n]/g, " ").slice(0, 120);
		this.events.push(`[+${elapsed}ms] ${direction === "send" ? "C>" : "S<"} ${safe}`);
	}
	/** Last few events: enough context to see where the conversation stalled. */
	tail(n = 6) {
		return this.events.slice(-n).join(" | ");
	}
};
/**
* SMTP delivery failure with a message that is safe to show to an admin:
* a humanized protocol/config error without transcripts or credentials.
*/
var SmtpDeliveryError = class extends Error {
	name = "SmtpDeliveryError";
};
/** Base64 encode UTF-8 text and wrap at 76 columns (RFC 2045 body limit). */
function b64Body(input) {
	return encodeBase64(input).replace(/.{1,76}/g, "$&\r\n").trimEnd();
}
var CRLF_REGEX = /[\r\n]/g;
/** Sanitize a header value against CRLF injection. */
function sanitizeHeader(value) {
	return value.replace(CRLF_REGEX, " ");
}
var NON_ASCII_REGEX = /[^\x20-\x7E]/;
/** RFC 2047 encoded-word for UTF-8 headers (Subject and display names). */
var ENCODED_WORD_MAX_BYTES = 36;
function encodedWord(text) {
	return `=?UTF-8?B?${encodeBase64(text)}?=`;
}
function encodeHeader(value) {
	const sanitized = sanitizeHeader(value);
	if (!NON_ASCII_REGEX.test(sanitized)) return sanitized;
	const words = [];
	let chunk = "";
	let chunkBytes = 0;
	for (const char of sanitized) {
		const bytes = encodeUtf8(char).length;
		if (chunk && chunkBytes + bytes > ENCODED_WORD_MAX_BYTES) {
			words.push(encodedWord(chunk));
			chunk = "";
			chunkBytes = 0;
		}
		chunk += char;
		chunkBytes += bytes;
	}
	if (chunk) words.push(encodedWord(chunk));
	return words.join("\r\n ");
}
var ENVELOPE_ADDRESS_REGEX = /^[^\s<>,;"\\@]+@[^\s<>,;"\\]+$/;
/**
* Validate an address before interpolating it into a MAIL FROM / RCPT TO
* wire command. Rejects control characters, whitespace and angle brackets
* so a crafted address cannot inject SMTP commands.
*/
function assertEnvelopeAddress(address, label) {
	if (!ENVELOPE_ADDRESS_REGEX.test(address)) throw new SmtpDeliveryError(`Invalid ${label} address for SMTP delivery`);
}
/**
* Format "Name <email>" for From/Reply-To. An RFC 2047 encoded-word must
* not sit inside a quoted string, so non-ASCII names are emitted unquoted
* as encoded-words; ASCII names are quoted with `"` and `\` escaped.
*/
function formatNameAddress(name, email) {
	const sanitized = sanitizeHeader(name);
	if (NON_ASCII_REGEX.test(sanitized)) return `${encodeHeader(sanitized)} <${email}>`;
	return `"${sanitized.replace(/[\\"]/g, "\\$&")}" <${email}>`;
}
var ADDRESS_REGEX = /^\s*(?:"([^"]*)"|([^<]*))?\s*<([^>]+)>\s*$/;
var MAX_ADDRESS_LENGTH = 256;
/** Parse "Name <email@example.com>" or bare "email@example.com". */
function parseAddress(input) {
	if (input.length > MAX_ADDRESS_LENGTH) throw new SmtpDeliveryError("Address is too long for SMTP delivery");
	const match = input.match(ADDRESS_REGEX);
	if (match) {
		const name = (match[1] ?? match[2] ?? "").trim();
		return {
			email: match[3].trim(),
			...name ? { name } : {}
		};
	}
	return { email: input.trim() };
}
/** RFC 5321 §4.5.2 transparency: double a period that starts a line of DATA. */
function dotStuff(data) {
	return data.replace(/^\./gm, "..");
}
/**
* Build the MIME message. Bodies are base64-encoded and wrapped at 76
* columns, so no line exceeds the SMTP 998-octet limit.
*/
function buildMime(params) {
	const { from, replyTo, to, cc, subject, text, html } = params;
	const headers = [
		`From: ${from.name ? formatNameAddress(from.name, from.email) : from.email}`,
		`To: ${sanitizeHeader(to)}`,
		...cc?.length ? [`Cc: ${cc.map(sanitizeHeader).join(", ")}`] : [],
		`Subject: ${encodeHeader(subject)}`,
		`Date: ${(/* @__PURE__ */ new Date()).toUTCString()}`,
		`Message-ID: <${crypto.randomUUID()}@${from.email.split("@")[1] || "emdash.invalid"}>`,
		`MIME-Version: 1.0`
	];
	if (replyTo) {
		const { email, name } = parseAddress(replyTo);
		headers.push(`Reply-To: ${name ? formatNameAddress(name, email) : email}`);
	}
	let body;
	if (html) {
		const boundary = `----=_emdash_${crypto.randomUUID()}`;
		headers.push(`Content-Type: multipart/alternative; boundary="${boundary}"`);
		body = [
			`--${boundary}`,
			`Content-Type: text/plain; charset=utf-8`,
			`Content-Transfer-Encoding: base64`,
			``,
			b64Body(text),
			`--${boundary}`,
			`Content-Type: text/html; charset=utf-8`,
			`Content-Transfer-Encoding: base64`,
			``,
			b64Body(html),
			`--${boundary}--`
		].join("\r\n");
	} else {
		headers.push(`Content-Type: text/plain; charset=utf-8`);
		headers.push(`Content-Transfer-Encoding: base64`);
		body = b64Body(text);
	}
	return `${headers.join("\r\n")}\r\n\r\n${body}`;
}
/** Load SMTP config from env; returns null if not configured. */
function loadSmtpConfigFromEnv() {
	const host = process.env.EMAIL_SMTP_HOST;
	if (!host) return null;
	const portRaw = process.env.EMAIL_SMTP_PORT || "587";
	const port = Number(portRaw);
	if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error(`EMAIL_SMTP_PORT must be a port number from 1 to 65535, got "${portRaw}"`);
	if (port === 25) throw new Error("EMAIL_SMTP_PORT=25 is not supported. Use 587 (STARTTLS) or 465 (implicit TLS) instead.");
	const secureRaw = process.env.EMAIL_SMTP_SECURE || (port === 465 ? "tls" : "starttls");
	if (secureRaw !== "starttls" && secureRaw !== "tls") throw new Error(`EMAIL_SMTP_SECURE must be "starttls" or "tls", got "${secureRaw}"`);
	const secure = secureRaw;
	const user = process.env.EMAIL_SMTP_USER;
	const pass = process.env.EMAIL_SMTP_PASS;
	if (!user || !pass) throw new Error("EMAIL_SMTP_USER and EMAIL_SMTP_PASS are required when EMAIL_SMTP_HOST is set");
	let fromName;
	let fromEmail;
	if (process.env.EMAIL_SMTP_FROM_EMAIL) {
		fromName = process.env.EMAIL_SMTP_FROM_NAME || void 0;
		fromEmail = process.env.EMAIL_SMTP_FROM_EMAIL;
	} else if (process.env.EMAIL_SMTP_FROM) {
		const parsed = parseAddress(process.env.EMAIL_SMTP_FROM);
		fromName = parsed.name;
		fromEmail = parsed.email;
	}
	return {
		host,
		port,
		secure,
		user,
		pass,
		...fromName ? { fromName } : {},
		...fromEmail ? { fromEmail } : {},
		...process.env.EMAIL_SMTP_REPLY_TO ? { replyTo: process.env.EMAIL_SMTP_REPLY_TO } : {}
	};
}
function passwordSettingKey(host, user) {
	return JSON.stringify([
		"password",
		host,
		user
	]);
}
/** Load SMTP config from DB, decrypting the password with the encryption key. */
async function loadSmtpConfigFromDb(db, encryptionKey) {
	const values = await new OptionsRepository(db).getMany([
		`${SMTP_OPTION_PREFIX}host`,
		`${SMTP_OPTION_PREFIX}port`,
		`${SMTP_OPTION_PREFIX}secure`,
		`${SMTP_OPTION_PREFIX}user`,
		SMTP_OPTION_PASSWORD,
		`${SMTP_OPTION_PREFIX}fromName`,
		`${SMTP_OPTION_PREFIX}fromEmail`,
		`${SMTP_OPTION_PREFIX}replyTo`
	]);
	const str = (key) => {
		const value = values.get(key);
		return typeof value === "string" && value ? value : void 0;
	};
	const host = str(`${SMTP_OPTION_PREFIX}host`);
	const port = Number(values.get(`${SMTP_OPTION_PREFIX}port`)) || void 0;
	const secureRaw = str(`${SMTP_OPTION_PREFIX}secure`);
	const secure = secureRaw === "tls" || secureRaw === "starttls" ? secureRaw : void 0;
	const user = str(`${SMTP_OPTION_PREFIX}user`);
	const encryptedPass = values.get(SMTP_OPTION_PASSWORD);
	const fromName = str(`${SMTP_OPTION_PREFIX}fromName`);
	const fromEmail = str(`${SMTP_OPTION_PREFIX}fromEmail`);
	const replyTo = str(`${SMTP_OPTION_PREFIX}replyTo`);
	if (!host || !port || !secure || !user || !isEncryptedPluginSetting(encryptedPass)) return null;
	if (port === 25) {
		console.warn("[email-smtp] Stored SMTP port 25 is not supported: save 587 or 465 in Settings → Email.");
		return null;
	}
	if (!Number.isInteger(port) || port < 1 || port > 65535) {
		console.warn(`[email-smtp] Stored SMTP port ${port} is not a valid port number: save a whole number between 1 and 65535 in Settings → Email.`);
		return null;
	}
	let pass;
	try {
		pass = await decryptPluginSetting(SMTP_EMAIL_PLUGIN_ID, passwordSettingKey(host, user), encryptedPass, await parseEncryptionKeys(encryptionKey));
	} catch {
		console.warn("[email-smtp] Stored SMTP password cannot be decrypted for this host and username with the configured encryption key(s): re-save the password in Settings → Email.");
		return null;
	}
	return {
		host,
		port,
		secure,
		user,
		pass,
		...fromName ? { fromName } : {},
		...fromEmail ? { fromEmail } : {},
		...replyTo ? { replyTo } : {}
	};
}
/** Save SMTP config to DB, encrypting the password with the encryption key. */
async function saveSmtpConfigToDb(db, encryptionKey, config) {
	const password = await encryptPluginSetting(SMTP_EMAIL_PLUGIN_ID, passwordSettingKey(config.host, config.user), config.pass, await parseEncryptionKeys(encryptionKey));
	const optional = {
		fromName: config.fromName,
		fromEmail: config.fromEmail,
		replyTo: config.replyTo
	};
	await withTransaction(db, async (trx) => {
		const repo = new OptionsRepository(trx);
		await repo.set(`${SMTP_OPTION_PREFIX}host`, config.host);
		await repo.set(`${SMTP_OPTION_PREFIX}port`, config.port);
		await repo.set(`${SMTP_OPTION_PREFIX}secure`, config.secure);
		await repo.set(`${SMTP_OPTION_PREFIX}user`, config.user);
		await repo.set(SMTP_OPTION_PASSWORD, password);
		for (const [field, value] of Object.entries(optional)) if (value) await repo.set(`${SMTP_OPTION_PREFIX}${field}`, value);
		const cleared = Object.entries(optional).filter(([, value]) => !value).map(([field]) => `${SMTP_OPTION_PREFIX}${field}`);
		if (cleared.length > 0) await repo.deleteMany(cleared);
	});
}
/**
* Load SMTP config from DB first, then fall back to env vars.
* Returns null if neither is configured.
*
* DB settings take precedence so admin changes apply without a restart, so
* every send reads the options table, even when only env vars are set.
*/
async function loadSmtpConfig(db, encryptionKey) {
	const dbConfig = await loadSmtpConfigFromDb(db, encryptionKey);
	if (dbConfig) return dbConfig;
	return loadSmtpConfigFromEnv();
}
/**
* A partial config (host but no password, e.g. a half-saved form) must not
* even attempt delivery: the resulting 535 is more confusing than a clear
* "not fully configured" error.
*/
function isSmtpConfigComplete(config) {
	return Boolean(config?.host && config?.port && config?.user && config?.pass);
}
/** Whether env vars hold a complete SMTP config. Logs why an invalid env config is ignored. */
function isSmtpEnvConfigured() {
	try {
		return isSmtpConfigComplete(loadSmtpConfigFromEnv());
	} catch (error) {
		console.warn(`[email-smtp] Ignoring SMTP environment variables: ${error instanceof Error ? error.message : String(error)}`);
		return false;
	}
}
var EHLO_PARAM_SEPARATOR = /[\s=]+/;
/** EHLO keywords mapped to their parameters ("AUTH LOGIN PLAIN" and legacy "AUTH=LOGIN"). */
function parseEhloExtensions(reply) {
	const extensions = /* @__PURE__ */ new Map();
	for (const line of reply.lines.slice(1)) {
		const [keyword, ...params] = line.slice(4).toUpperCase().split(EHLO_PARAM_SEPARATOR);
		if (keyword) extensions.set(keyword, [...extensions.get(keyword) ?? [], ...params]);
	}
	return extensions;
}
/** Deliver one message over SMTP. Throws on any protocol or network error. */
async function deliverSmtp(config, message, ctx, connectFn) {
	if (config.port === 25) throw new SmtpDeliveryError("SMTP port 25 is not supported. Use 587 (STARTTLS) or 465 (implicit TLS) instead.");
	const from = {
		email: config.fromEmail ?? config.user,
		...config.fromName ? { name: config.fromName } : {}
	};
	assertEnvelopeAddress(from.email, "sender");
	const recipients = [message.to, ...message.cc ?? []];
	for (const recipient of recipients) assertEnvelopeAddress(recipient, "recipient");
	const replyTo = message.replyTo ?? config.replyTo;
	if (replyTo) assertEnvelopeAddress(parseAddress(replyTo).email, "reply-to");
	const timeoutMs = config.timeoutMs ?? 25e3;
	const ehloName = from.email.slice(from.email.lastIndexOf("@") + 1);
	const connect = connectFn ?? connectSmtpSocket;
	const controller = new AbortController();
	const aborted = new Promise((_, reject) => {
		controller.signal.addEventListener("abort", () => reject(controller.signal.reason), { once: true });
	});
	const timer = setTimeout(() => {
		controller.abort(new SmtpDeliveryError(`SMTP operation timed out after ${timeoutMs}ms`));
	}, timeoutMs);
	const trace = new SmtpTrace();
	let socket;
	try {
		try {
			socket = await Promise.race([connect(config.host, config.port, config.secure, controller.signal), aborted]);
		} catch (error) {
			if (controller.signal.aborted) throw error;
			const code = error instanceof Error && "code" in error && typeof error.code === "string" ? ` (${error.code})` : "";
			throw new SmtpDeliveryError(`Failed to connect to SMTP server ${config.host}:${config.port}${code}`, { cause: error });
		}
		return await Promise.race([deliver(socket), aborted]);
	} catch (error) {
		const detail = error instanceof Error ? error.message : String(error);
		ctx.log.error("SMTP delivery failed", {
			error: detail,
			host: config.host,
			port: config.port,
			trace: trace.tail()
		});
		if (error instanceof SmtpDeliveryError) throw error;
		const code = error instanceof Error && "code" in error && typeof error.code === "string" ? ` (${error.code})` : "";
		throw new SmtpDeliveryError(`SMTP delivery via ${config.host}:${config.port} failed${code}`, { cause: error });
	} finally {
		clearTimeout(timer);
		socket?.destroy();
	}
	async function deliver(sock) {
		const send = async (line, sensitive = false) => {
			trace.record("send", line, sensitive);
			await sock.write(`${line}\r\n`);
		};
		const check = (reply, context, expected) => {
			trace.record("recv", reply.lines.join(" / "));
			expectCode(reply, expected, context);
			return reply;
		};
		const recv = async (context, expected) => check(await sock.readReply(), context, expected);
		await recv("greeting", 220);
		await send(`EHLO ${ehloName}`);
		let extensions = parseEhloExtensions(await recv("EHLO", 250));
		if (config.secure === "starttls") {
			if (!extensions.has("STARTTLS")) throw new SmtpDeliveryError(`${config.host} does not offer STARTTLS on port ${config.port}. Use port 465 (implicit TLS) instead.`);
			trace.record("send", "STARTTLS");
			check(await sock.startTls(), "STARTTLS", 220);
			await send(`EHLO ${ehloName}`);
			extensions = parseEhloExtensions(await recv("EHLO after STARTTLS", 250));
		}
		const mechanisms = extensions.get("AUTH") ?? [];
		if (mechanisms.includes("PLAIN")) {
			await send(`AUTH PLAIN ${encodeBase64(`\0${config.user}\0${config.pass}`)}`, true);
			await recv("AUTH PLAIN", 235);
		} else if (mechanisms.includes("LOGIN")) {
			await send("AUTH LOGIN");
			await recv("AUTH LOGIN", 334);
			await send(encodeBase64(config.user), true);
			await recv("AUTH username", 334);
			await send(encodeBase64(config.pass), true);
			await recv("AUTH password", 235);
		} else throw new SmtpDeliveryError(mechanisms.length > 0 ? `${config.host} offers no supported login method (${mechanisms.join(", ")}). EmDash supports PLAIN and LOGIN.` : `${config.host} does not offer authentication on this connection.`);
		await send(`MAIL FROM:<${from.email}>`);
		await recv("MAIL FROM", 250);
		for (const recipient of recipients) {
			await send(`RCPT TO:<${recipient}>`);
			await recv("RCPT TO", [250, 251]);
		}
		await send("DATA");
		await recv("DATA", 354);
		const mime = buildMime({
			from,
			...replyTo ? { replyTo } : {},
			to: message.to,
			...message.cc?.length ? { cc: message.cc } : {},
			subject: message.subject,
			text: message.text,
			...message.html ? { html: message.html } : {}
		});
		await sock.write(`${dotStuff(mime)}\r\n.\r\n`);
		await recv("message accepted", 250);
		try {
			await send("QUIT");
		} catch (error) {
			ctx.log.warn("SMTP QUIT failed after the message was accepted", {
				error: error instanceof Error ? error.message : String(error),
				host: config.host
			});
		}
		ctx.log.info("email delivered via SMTP", {
			to: message.to,
			subject: message.subject,
			host: config.host,
			port: config.port
		});
	}
}
/**
* Build an email:deliver handler that loads the SMTP config lazily on
* every send: DB config first (when an encryption key is available to
* decrypt the stored password), env vars as fallback. Loading per send
* makes admin-saved settings work immediately, no runtime restart.
*/
function createSmtpEmailDeliverFromDb(getDb, encryptionKey, connectFn) {
	return async (event, ctx) => {
		const config = encryptionKey ? await loadSmtpConfig(getDb(), encryptionKey) : loadSmtpConfigFromEnv();
		if (!isSmtpConfigComplete(config)) throw new SmtpDeliveryError("SMTP is not configured. Save host, port, username and password in Settings → Email.");
		return deliverSmtp(config, event.message, ctx, connectFn);
	};
}
export { loadSmtpConfigFromDb as a, isSmtpEnvConfigured as i, SmtpDeliveryError as n, loadSmtpConfigFromEnv as o, createSmtpEmailDeliverFromDb as r, saveSmtpConfigToDb as s, SMTP_EMAIL_PLUGIN_ID as t };
