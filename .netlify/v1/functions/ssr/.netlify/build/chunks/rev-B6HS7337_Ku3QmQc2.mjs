import { i as encodeBase64, t as decodeBase64 } from "./base64-GXviT28w_CJsXkxay.mjs";
// node_modules/emdash/dist/rev-B6HS7337.mjs
/**
* Generate a _rev token from a content item's version and updatedAt.
*/
function encodeRev(item) {
	return encodeBase64(`${item.version}:${item.updatedAt}`);
}
/**
* Decode a _rev token into its components.
* Returns null if the token is malformed.
*/
function decodeRev(rev) {
	try {
		const decoded = decodeBase64(rev);
		const colonIdx = decoded.indexOf(":");
		if (colonIdx === -1) return null;
		const version = parseInt(decoded.slice(0, colonIdx), 10);
		const updatedAt = decoded.slice(colonIdx + 1);
		if (isNaN(version) || !updatedAt) return null;
		return {
			version,
			updatedAt
		};
	} catch {
		return null;
	}
}
/**
* Validate a _rev token against a content item.
* Returns null if valid (or if no _rev provided), or an error message if invalid.
*/
function validateRev(rev, item) {
	if (!rev) return { valid: true };
	const decoded = decodeRev(rev);
	if (!decoded) return {
		valid: false,
		message: "Malformed _rev token"
	};
	if (decoded.version !== item.version || decoded.updatedAt !== item.updatedAt) return {
		valid: false,
		message: "Content has been modified since last read (version conflict)"
	};
	return { valid: true };
}
export { encodeRev as n, validateRev as r, decodeRev as t };
