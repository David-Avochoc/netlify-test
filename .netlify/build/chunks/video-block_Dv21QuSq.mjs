// node_modules/@emdash-cms/admin/dist/internal/video-block.js
var isRecord = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var isString = (value) => typeof value === "string";
var isDimension = (value) => typeof value === "number" && Number.isInteger(value) && value >= 1;
var hasOnly = (record, fields) => Object.entries(record).every(([key, value]) => value === void 0 || (fields.get(key)?.(value) ?? false));
var ASSET_FIELDS = /* @__PURE__ */ new Map([
	["_ref", isString],
	["url", isString],
	["provider", isString]
]);
var isAsset = (value) => isRecord(value) && isString(value._ref) && hasOnly(value, ASSET_FIELDS);
var VIDEO_FIELDS = /* @__PURE__ */ new Map([
	["_type", () => true],
	["_key", () => true],
	["asset", isAsset],
	["caption", isString],
	["width", isDimension],
	["height", isDimension]
]);
/**
* Whether a block is the editor's own video block. A `video` block with other
* fields, or values of other types, belongs to a plugin.
*/
function isVideoBlock(block) {
	return isRecord(block) && block._type === "video" && hasOnly(block, VIDEO_FIELDS);
}
export { isString as n, isVideoBlock as r, isDimension as t };
