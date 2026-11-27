// node_modules/emdash/dist/types-D2zSjG0c.mjs
/** The room's ID on Node.js: `{collection}:{entry ID}`. Collection slugs can't contain `:`. */
function roomId(entry) {
	return `${entry.collection}:${entry.id}`;
}
/** An operation's save failed. `reason` and `code` are the site's, `INVALID_CONTENT` or `UNLOADED`. */
var RoomSaveError = class extends Error {
	reason;
	code;
	constructor(reason, code, message) {
		super(message);
		this.name = "RoomSaveError";
		this.reason = reason;
		this.code = code;
	}
};
export { roomId as n, RoomSaveError as t };
