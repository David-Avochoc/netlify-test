// node_modules/emdash/dist/start-user-session-CdyNie0P.mjs
async function startUserSession(db, session, userId) {
	await db.updateTable("users").set({ last_login_at: (/* @__PURE__ */ new Date()).toISOString() }).where("id", "=", userId).execute();
	session.set("user", { id: userId });
}
export { startUserSession as t };
