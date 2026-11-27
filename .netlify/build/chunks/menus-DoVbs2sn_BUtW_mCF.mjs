import { a as __exportAll } from "./runner-Nv0yWP-G_mZbAgbBU.mjs";
import { l as resolveConfiguredLocale, o as getLocaleRank, r as getI18nConfig } from "./config-Cs_AwWXI_t21XF43J.mjs";
import { n as MenuItemParentError, r as MenuRepository, t as MenuGoneError } from "./menu-CvWToneO_D1i_TJkR.mjs";
// node_modules/emdash/dist/menus-DoVbs2sn.mjs
var menus_exports = /* @__PURE__ */ __exportAll({
	handleMenuCreate: () => handleMenuCreate,
	handleMenuDelete: () => handleMenuDelete,
	handleMenuGet: () => handleMenuGet,
	handleMenuItemCreate: () => handleMenuItemCreate,
	handleMenuItemDelete: () => handleMenuItemDelete,
	handleMenuItemReorder: () => handleMenuItemReorder,
	handleMenuItemUpdate: () => handleMenuItemUpdate,
	handleMenuList: () => handleMenuList,
	handleMenuSetItems: () => handleMenuSetItems,
	handleMenuTranslations: () => handleMenuTranslations,
	handleMenuUpdate: () => handleMenuUpdate
});
/**
* Error returned when a menu lookup by `name` matches multiple locale
* variants and the caller did not pass `locale` to disambiguate. Maps to
* HTTP 400 via `mapErrorStatus`. The available locales are surfaced in the
* message so MCP/REST callers can recover by re-issuing with `locale`.
*/
function ambiguousMenuLocaleError(name, locales) {
	return {
		success: false,
		error: {
			code: "AMBIGUOUS_LOCALE",
			message: `Menu '${name}' exists in multiple locales (${locales.toSorted().join(", ")}); pass 'locale' to disambiguate.`
		}
	};
}
/**
* Resolve a menu by name + optional locale to a single Menu, surfacing the
* canonical NOT_FOUND / AMBIGUOUS_LOCALE errors. Every item handler relies on
* this to translate (name, locale) into an unambiguous menu row.
*/
async function resolveMenu(repo, name, options) {
	const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
	const matches = await repo.findByName(name, { locale });
	if (matches.length === 0) return {
		success: false,
		error: {
			code: "NOT_FOUND",
			message: `Menu '${name}' not found${options.locale ? ` in locale '${options.locale}'` : ""}`
		}
	};
	const canonicalLocales = new Set(matches.map((match) => resolveConfiguredLocale(match.locale)));
	if (locale === void 0 && canonicalLocales.size > 1) return {
		success: false,
		error: ambiguousMenuLocaleError(name, [...canonicalLocales]).error
	};
	const preferredLocale = locale ?? resolveConfiguredLocale(matches[0].locale);
	return {
		success: true,
		menu: matches.toSorted((a, b) => getLocaleRank(a.locale, preferredLocale) - getLocaleRank(b.locale, preferredLocale) || a.id.localeCompare(b.id))[0]
	};
}
/**
* List menus with item counts. Filter by `locale` when provided.
*/
async function handleMenuList(db, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
		return {
			success: true,
			data: await repo.findMany({ locale })
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_LIST_ERROR",
				message: "Failed to fetch menus"
			}
		};
	}
}
/**
* Create a new menu. When `translationOf` is supplied the new menu joins the
* source menu's translation_group (and gets the source's items cloned by the
* repository).
*/
async function handleMenuCreate(db, input) {
	try {
		if (input.translationOf && !input.locale) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "`locale` is required when `translationOf` is provided"
			}
		};
		const repo = new MenuRepository(db);
		if (input.translationOf) {
			const source = await repo.findById(input.translationOf);
			if (!source) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: "Source menu for translation not found"
				}
			};
			if (source.name !== input.name) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: `A translation of menu "${source.name}" must use the same name`
				}
			};
		}
		const effectiveLocale = input.locale ? resolveConfiguredLocale(input.locale) : getI18nConfig()?.defaultLocale ?? "en";
		if (await repo.existsByNameAndLocale(input.name, effectiveLocale)) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: `Menu "${input.name}" already exists${input.locale ? ` in locale "${input.locale}"` : ""}`
			}
		};
		return {
			success: true,
			data: await repo.create({
				...input,
				locale: effectiveLocale
			})
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_CREATE_ERROR",
				message: "Failed to create menu"
			}
		};
	}
}
/**
* Get a single menu by name. Honours an optional `locale` filter; when two
* menus share a name across locales, the locale distinguishes them.
*
* Historical behaviour: when `locale` is omitted, returns the lowest-locale
* match (deterministic). Mirrors the pre-repo handler.
*/
async function handleMenuGet(db, name, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
		const matches = await repo.findByName(name, { locale });
		if (matches.length === 0) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Menu '${name}' not found`
			}
		};
		const menu = matches[0];
		const items = await repo.findItems(menu.id);
		return {
			success: true,
			data: {
				...menu,
				items
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_GET_ERROR",
				message: "Failed to fetch menu"
			}
		};
	}
}
/**
* Update a menu's label. The name + locale are immutable.
*/
async function handleMenuUpdate(db, name, input) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, name, { locale: input.locale });
		if (!resolved.success) return resolved;
		const updated = await repo.update(resolved.menu.id, { label: input.label });
		if (!updated) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Menu '${name}' not found`
			}
		};
		return {
			success: true,
			data: updated
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_UPDATE_ERROR",
				message: "Failed to update menu"
			}
		};
	}
}
/**
* Delete a menu (and its items, via the repository's explicit cleanup).
*/
async function handleMenuDelete(db, name, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, name, options);
		if (!resolved.success) return resolved;
		await repo.delete(resolved.menu.id);
		return {
			success: true,
			data: { deleted: true }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_DELETE_ERROR",
				message: "Failed to delete menu"
			}
		};
	}
}
/**
* List every translation of a menu (by id or translation_group).
*/
async function handleMenuTranslations(db, idOrGroup) {
	try {
		const result = await new MenuRepository(db).listTranslations(idOrGroup);
		if (!result) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Menu not found"
			}
		};
		return {
			success: true,
			data: result
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_TRANSLATIONS_ERROR",
				message: "Failed to list menu translations"
			}
		};
	}
}
/**
* Add an item to a menu. The item inherits the menu's locale.
*/
async function handleMenuItemCreate(db, menuName, input, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		return {
			success: true,
			data: await repo.createItem(resolved.menu.id, resolved.menu.locale, input)
		};
	} catch (error) {
		if (error instanceof MenuItemParentError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "MENU_ITEM_CREATE_ERROR",
				message: "Failed to create menu item"
			}
		};
	}
}
/**
* Update a menu item.
*/
async function handleMenuItemUpdate(db, menuName, itemId, input, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		const updated = await repo.updateItem(resolved.menu.id, itemId, input);
		if (!updated) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Menu item not found"
			}
		};
		return {
			success: true,
			data: updated
		};
	} catch (error) {
		if (error instanceof MenuItemParentError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "MENU_ITEM_UPDATE_ERROR",
				message: "Failed to update menu item"
			}
		};
	}
}
/**
* Delete a menu item.
*/
async function handleMenuItemDelete(db, menuName, itemId, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		if (!await repo.deleteItem(resolved.menu.id, itemId)) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Menu item not found"
			}
		};
		return {
			success: true,
			data: { deleted: true }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_ITEM_DELETE_ERROR",
				message: "Failed to delete menu item"
			}
		};
	}
}
/**
* Replace the entire set of items for a menu in one atomic transaction.
*
* Existing items are deleted and the new list is inserted in the order
* provided. `parentIndex` references resolve to actual parent IDs as the
* insert proceeds.
*/
async function handleMenuSetItems(db, menuName, items, options = {}) {
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		if (item?.parentIndex !== void 0) {
			if (item.parentIndex < 0 || item.parentIndex >= i) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: `item[${i}].parentIndex (${item.parentIndex}) must reference an earlier item`
				}
			};
		}
	}
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		const { itemCount } = await repo.setItems(resolved.menu.id, resolved.menu.locale, items);
		return {
			success: true,
			data: {
				name: menuName,
				itemCount
			}
		};
	} catch (error) {
		if (error instanceof MenuGoneError) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Menu '${menuName}' not found${options.locale ? ` in locale '${options.locale}'` : ""}`
			}
		};
		console.error("[emdash] handleMenuSetItems failed:", error);
		return {
			success: false,
			error: {
				code: "MENU_SET_ITEMS_ERROR",
				message: "Failed to set menu items"
			}
		};
	}
}
/**
* Batch reorder menu items.
*/
async function handleMenuItemReorder(db, menuName, items, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		return {
			success: true,
			data: await repo.reorderItems(resolved.menu.id, items)
		};
	} catch (error) {
		if (error instanceof MenuItemParentError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "MENU_REORDER_ERROR",
				message: "Failed to reorder menu items"
			}
		};
	}
}
export { handleMenuItemDelete as a, handleMenuList as c, menus_exports as d, handleMenuItemCreate as i, handleMenuTranslations as l, handleMenuDelete as n, handleMenuItemReorder as o, handleMenuGet as r, handleMenuItemUpdate as s, handleMenuCreate as t, handleMenuUpdate as u };
