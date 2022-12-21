const Router = require("@koa/router");
const bestellingservice = require("../service/bestelling");
const { getLogger } = require("../core/logging");
const validate = require("../rest/_validation");
const Joi = require("joi");
const userService = require("../service/user");
const { addUserInfo } = require("../core/auth");

/**
 * @openapi
 * tags:
 *   name: bestelling
 *   description: bestellingen aanmaken en ophalen
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     bestelling:
 *       allOf:
 *         - $ref: "#/components/schemas/bestelling"
 *         - type: object
 *           required:
 *             - bestellingId
 *             - userId
 *             - created_at
 *             - updated_at
 *             - auth0Id
 *           properties:
 *             bestellingId:
 *               type: "string"
 *             userId:
 *               type: "integer"
 *             created_at:
 *               type: "timestamp"
 *             updated_at:
 *               type: "timestamp"
 *             auth0Id:
 *               type: "string"
 *
 *           example:
 *             $ref: "#/components/examples/bestellingVB"
 *   examples:
 *     bestellingVB:
 *       bestellingId: "00d1535a-b152-4d6c-bd50-b5d408f98948"
 *       userId: "00d1535a-b152-4d6c-bd50-b5d408f98948"
 *       created_at: "2021-01-01 00:00:00"
 *       updated_at: "2021-01-01 00:00:00"
 *       auth0Id: "00d1535a-b152-4d6c-bd50-b5d408f98948"
 */

/**
 * @openapi
 * /api/bestelling:
 *   post:
 *     summary: maak een bestelling aan
 *     tags:
 *      - bestelling
 *     requestBody:
 *       -list: [
 *              { "itemId": 1, "aantal": 1 },
 *              { "itemId": 2, "aantal": 1 },
 *              { "itemId": 3, "aantal": 1 },
 *              ]
 *       -adres: {
 *             "email": "test@test",
 *             "straat": "teststraat",
 *             "huisnummer": "1",
 *             "postcode": "1000",
 *             "gemeente": "testgemeente"
 *                }
 *     responses:
 *       200:
 *         description: de bestelling is aangemaakt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/bestelling"
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
const createBestelling = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.userId;
  } catch (err) {
    await addUserInfo(ctx);
    console.log(ctx.state);
    userId = await userService.createUserService({
      auth0id: ctx.state.user.sub,
      name: ctx.state.user.name,
      email: ctx.request.body.adres.Email,
      straat: ctx.request.body.adres.Straat,
      huisnummer: ctx.request.body.adres.Huisnummer,
      postcode: ctx.request.body.adres.Postcode,
      gemeente: ctx.request.body.adres.Gemeente,
    });
  }
  const newBestelling = await bestellingservice.createBestellingService(
    ctx.request.body.list,
    ctx.state.user.sub,
    userId
  );
  ctx.body = newBestelling;
  ctx.status = 201;
};

/**
 * @openapi
 * /api/bestelling/:
 *   get:
 *     summary: Get all bestellingen
 *     tags:
 *      - bestelling
 *     responses:
 *       200:
 *         description: List of bestellingen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/bestelling"
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
getAllBestellingen = async (ctx) => {
  const bestellingen = await bestellingservice.getAllBestellingenService(
    ctx.state.user.sub
  );
  ctx.body = bestellingen;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/bestelling",
  });
  router.post("/", createBestelling);
  router.get("/", getAllBestellingen);

  app.use(router.routes()).use(router.allowedMethods());
};
