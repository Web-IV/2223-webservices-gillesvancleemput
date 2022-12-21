const Router = require("@koa/router");
const MenuService = require("../service/menu");
const { getLogger } = require("../core/logging");
const Joi = require("joi");
const validate = require("../rest/_validation");

/**
 * @openapi
 * tags:
 *   name: menu
 *   description:alle menu items ophalen verwijderen en aanpassen
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Menu:
 *       allOf:
 *         - $ref: "#/components/schemas/Menu"
 *         - type: object
 *           required:
 *             - itemId
 *             - naam
 *             - prijs
 *             - type
 *             - beschrijving
 *           properties:
 *             itemId:
 *               type: "string"
 *             naam:
 *               type: "integer"
 *             type:
 *               type: "string"
 *             prijs:
 *               type: "string"
 *             beschrijving:
 *               type: "string"
 *
 *           example:
 *             $ref: "#/components/examples/menuitem"
 *   examples:
 *     menuitem:
 *       itemId: "00d1535a-b152-4d6c-bd50-b5d408f98948"
 *       naam: "pizza"
 *       prijs: 5
 *       type: "Burgers & Wraps"
 *       beschrijving: "pizza met kaas"
 */

/**
 * @openapi
 * /api/menu/{itemid}:
 *   get:
 *     summary: Get a single menuitem
 *     tags:
 *      - menu
 *     parameters:
 *       - itemId: itemId
 *     responses:
 *       200:
 *         description: het menu item met het gegeven id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Menu"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/403Forbidden'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */
const getByIdMenu = async (ctx) => {
  getLogger().silly(`Router: getByIdMenu with id ${ctx.params.id}`);
  ctx.body = await MenuService.getByIdMenuService(ctx.params.id);
  ctx.status = 200;
};
getByIdMenu.valildationScheme = {
  params: Joi.object({
    id: Joi.string().required().min(1).max(255),
  }),
};

/**
 * @openapi
 * /api/menu:
 *   get:
 *     summary: Get all menu items
 *     tags:
 *      - menu
 *     responses:
 *       200:
 *         description: List of menu items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Menu"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/403Forbidden'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */
const getAllMenu = async (ctx) => {
  ctx.body = await MenuService.getAllMenuService();
  ctx.status = 200;
};

/**
 * @openapi
 * /api/menu/{itemid}:
 *   delete:
 *     summary: Delete a menu item
 *     tags:
 *      - menu
 *     parameters:
 *        - itemId: itemId
 *     responses:
 *       204:
 *         description: Menu item deleted
 *       404:
 *         description: No menu with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */
const deleteMenu = async (ctx) => {
  getLogger().silly(`Router: deleteMenu with id ${ctx.params.id}`);
  const Menu = await MenuService.deleteByIdMenuService(ctx.params.id);
  ctx.body = Menu;
  ctx.status = 204;
};
deleteMenu.valildationScheme = {
  params: Joi.object({
    id: Joi.string().required().min(1).max(255),
  }),
};

/**
 * @openapi
 * /api/menu:
 *   post:
 *     summary: menuitem aanmaken
 *     tags:
 *      - menu
 *     requestBody:
 *       -naam: "update"
 *       -prijs: 3
 *       -type: "Sushibowls"
 *       -beschrijving: "update"
 *     responses:
 *       200:
 *         description: het menu item dat is aangemaakt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Menu"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No place with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const createMenuItem = async (ctx) => {
  getLogger().silly(
    `Router: createMenuItem with body ${JSON.stringify(ctx.request.body)}`
  );
  const Menu = await MenuService.createMenuItemService(ctx);
  ctx.body = Menu;
  ctx.status = 201;
};
createMenuItem.valildationScheme = {
  body: Joi.object({
    naam: Joi.string().required(),
    prijs: Joi.number().required().positive().integer(),
    type: Joi.string().required(),
    beschrijving: Joi.string().allow("").allow(null),
  }),
};

/**
 * @openapi
 * /api/menu/{itemid}:
 *   put:
 *     summary: Update an existing menuitem
 *     tags:
 *      - menu
 *     parameters:
 *       - itemId: itemId
 *     requestBody:
 *       -naam: "update"
 *       -prijs: 3
 *       -type: "Sushibowls"
 *       -beschrijving: "update"
 *     responses:
 *       200:
 *         description: het menu item dat is upgedate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Menu"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No place with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */
const updateMenuItem = async (ctx) => {
  getLogger().silly(
    `Router: updateMenuItem with body ${JSON.stringify(ctx.request.body)}`
  );
  const Menu = await MenuService.updateByIdMenuService(
    ctx.params.id,
    ctx.request.body
  );
  ctx.body = Menu;
  ctx.status = 200;
};
updateMenuItem.valildationScheme = {
  params: Joi.object({
    id: Joi.string().required().min(1).max(255),
  }),
  body: Joi.object({
    naam: Joi.string().required(),
    prijs: Joi.number().required().positive().integer(),
    type: Joi.string().required(),
    beschrijving: Joi.string().allow("").allow(null),
  }),
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/menu",
  });
  router.get("/", getAllMenu);
  router.get("/:id", validate(getByIdMenu.valildationScheme), getByIdMenu);
  router.delete("/:id", validate(deleteMenu.valildationScheme), deleteMenu);
  router.post("/", validate(createMenuItem.valildationScheme), createMenuItem);
  router.put(
    "/:id",
    validate(updateMenuItem.valildationScheme),
    updateMenuItem
  );

  app.use(router.routes()).use(router.allowedMethods());
};
