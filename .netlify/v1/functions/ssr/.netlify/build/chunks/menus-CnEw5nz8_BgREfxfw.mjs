import { t as isSafeHref } from "./url-BVdd-tah_7QjS1g7o.mjs";
import { o as localeCode } from "./redirects-Yo8YTJMV_C9moaFTu.mjs";
import { z } from "zod";
// node_modules/emdash/dist/menus-CnEw5nz8.mjs
/**
* Allowed menu item types. `custom` uses `customUrl`; the others resolve a URL
* from `referenceCollection` + `referenceId` (a translation_group id).
*/
var menuItemTypeEnum = z.enum([
	"custom",
	"page",
	"post",
	"taxonomy",
	"collection"
]);
var safeHref = z.string().trim().refine(isSafeHref, "URL must use http, https, mailto, tel, a relative path, or a fragment identifier");
var createMenuBody = z.object({
	name: z.string().min(1),
	label: z.string().min(1),
	locale: localeCode.optional(),
	translationOf: z.string().min(1).optional()
}).strict().meta({ id: "CreateMenuBody" });
var updateMenuBody = z.object({ label: z.string().min(1).optional() }).strict().meta({ id: "UpdateMenuBody" });
var createMenuItemBody = z.object({
	type: menuItemTypeEnum,
	label: z.string().min(1),
	referenceCollection: z.string().optional(),
	referenceId: z.string().optional(),
	customUrl: safeHref.optional(),
	target: z.string().optional(),
	titleAttr: z.string().optional(),
	cssClasses: z.string().optional(),
	parentId: z.string().optional(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "CreateMenuItemBody" });
var updateMenuItemBody = z.object({
	label: z.string().min(1).optional(),
	customUrl: safeHref.optional(),
	target: z.string().optional(),
	titleAttr: z.string().optional(),
	cssClasses: z.string().optional(),
	parentId: z.string().nullish(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "UpdateMenuItemBody" });
var reorderMenuItemsBody = z.object({ items: z.array(z.object({
	id: z.string().min(1),
	parentId: z.string().nullable(),
	sortOrder: z.number().int().min(0)
})) }).meta({ id: "ReorderMenuItemsBody" });
var menuSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "Menu" });
var menuItemSchema = z.object({
	id: z.string(),
	menuId: z.string(),
	parentId: z.string().nullable(),
	sortOrder: z.number().int(),
	type: z.string(),
	referenceCollection: z.string().nullable(),
	referenceId: z.string().nullable(),
	customUrl: z.string().nullable(),
	label: z.string(),
	titleAttr: z.string().nullable(),
	target: z.string().nullable(),
	cssClasses: z.string().nullable(),
	createdAt: z.string(),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "MenuItem" });
z.object({
	translationGroup: z.string().nullable(),
	translations: z.array(z.object({
		id: z.string(),
		name: z.string(),
		label: z.string(),
		locale: z.string(),
		updatedAt: z.string()
	}))
}).meta({ id: "MenuTranslations" });
var menuListItemSchema = menuSchema.extend({ itemCount: z.number().int() }).meta({ id: "MenuListItem" });
var menuWithItemsSchema = menuSchema.extend({ items: z.array(menuItemSchema) }).meta({ id: "MenuWithItems" });
export { menuWithItemsSchema as a, updateMenuBody as c, menuListItemSchema as i, updateMenuItemBody as l, createMenuItemBody as n, reorderMenuItemsBody as o, menuItemSchema as r, safeHref as s, createMenuBody as t };
