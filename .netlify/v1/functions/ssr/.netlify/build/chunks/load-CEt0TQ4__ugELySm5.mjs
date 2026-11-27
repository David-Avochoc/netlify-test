import { a as __exportAll } from "./runner-Nv0yWP-G_mZbAgbBU.mjs";
// node_modules/emdash/dist/load-CEt0TQ4_.mjs
var load_exports = /* @__PURE__ */ __exportAll({
	loadSeed: () => loadSeed,
	loadSeedMediaBasePath: () => loadSeedMediaBasePath,
	loadUserSeed: () => loadUserSeed
});
async function getSeedModule() {
	return import("./seed_DPQAolQK.mjs");
}
/**
* Load the seed file (user seed or default).
*/
async function loadSeed() {
	const { seed } = await getSeedModule();
	return seed;
}
/**
* Load the user's seed file, or null if none exists.
*/
async function loadUserSeed() {
	const { userSeed } = await getSeedModule();
	return userSeed ?? null;
}
/**
* Load the directory containing the user's seed file, if one was found.
*/
async function loadSeedMediaBasePath() {
	const { mediaBasePath } = await getSeedModule();
	return mediaBasePath;
}
export { load_exports as i, loadSeedMediaBasePath as n, loadUserSeed as r, loadSeed as t };
