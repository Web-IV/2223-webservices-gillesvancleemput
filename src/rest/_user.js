const Router = require("@koa/router");
const userservice = require("../service/user");
const Joi = require("joi");
const validate = require("../rest/_validation");
const { addUserInfo } = require("../core/auth");

/**
 * @openapi
 * tags:
 *   name: user
 *   description:alle users ophalen verwijderen en aanpassen
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     user:
 *       allOf:
 *         - $ref: "#/components/schemas/user"
 *         - type: object
 *           required:
 *             - userId
 *             - name
 *             - voornaam
 *             - email
 *             - straat
 *             - huisnummer
 *             - postcode
 *             - gemeente
 *             - auth0id
 *             - rol
 *           properties:
 *             userId:
 *               type: "string"
 *             name:
 *               type: "string"
 *             voornaam:
 *               type: "string"
 *             email:
 *               type: "string"
 *             straat:
 *               type: "string"
 *             huisnummer:
 *               type: "string"
 *             postcode:
 *               type: "string"
 *             gemeente:
 *               type: "string"
 *             auth0id:
 *               type: "string"
 *             rol:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/userVB"
 *   examples:
 *     userVB:
 *       userId: "00d1535a-b152-4d6c-bd50-b5d408f98948"
 *       name: "test"
 *       voornaam: "test"
 *       email: "test@test"
 *       straat: "laan"
 *       huisnummer: "11"
 *       postcode: "11"
 *       gemeente: "gent"
 *       auth0id: "google-oauth2|116459538618082009237"
 *       rol: "admin"
 *
 */

/**
 * @openapi
 * /api/user/{Auth0id}:
 *   get:
 *     summary: get user met gegeven auth0id
 *     tags:
 *      - user
 *     parameters:
 *       - Auth0id: auth0id
 *     responses:
 *       200:
 *         description: de user met gegeven auth0id wordt teruggegeven
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/user"
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
const getUserByAuth0Id = async (ctx) => {
  try {
    const user = await userservice.getByAuth0Id(ctx.params.auth0id);
    ctx.body = user;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
  }
};
getUserByAuth0Id.valildationScheme = {
  params: Joi.object({
    auth0id: Joi.string().required(),
  }),
};

/**
 * @openapi
 * /api/user/check/{Auth0id}:
 *   get:
 *     summary: check dat user met gegeven auth0id bestaat
 *     tags:
 *      - user
 *     parameters:
 *       - Auth0id: auth0id
 *     responses:
 *       200:
 *         description: de user bestaat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/user"
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
const checkForUser = async (ctx) => {
  try {
    const boolean = await userservice.checkForUser(ctx.params.auth0id);
    ctx.body = boolean;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
  }
};

checkForUser.valildationScheme = {
  params: Joi.object({
    auth0id: Joi.string().required(),
  }),
};

/**
 * @openapi
 * /api/user/{email}:
 *   put:
 *     summary: Update an existing user adress
 *     tags:
 *      - user
 *     parameters:
 *       - email: email
 *     requestBody:
 *       -straat: "update"
 *       -huisnummer: 3
 *       -postcode: "9820"
 *       -gemeente: "update"
 *     responses:
 *       200:
 *         description: het menu item dat is upgedate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/user"
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

const updateUser = async (ctx) => {
  try {
    const { straat, huisnummer, postcode, gemeente } = ctx.request.body;
    const email = ctx.params.email;
    const user = await userservice.updateUser(
      email,
      straat,
      huisnummer,
      postcode,
      gemeente
    );
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = 500;
  }
};
updateUser.valildationScheme = {
  params: Joi.object({
    email: Joi.string().required(),
  }),
  body: Joi.object({
    straat: Joi.string().required(),
    huisnummer: Joi.string().required(),
    postcode: Joi.string().required(),
    gemeente: Joi.string().required(),
  }),
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/user",
  });
  router.get(
    "/:auth0id",
    validate(getUserByAuth0Id.valildationScheme),
    getUserByAuth0Id
  );
  router.get(
    "/check/:auth0id",
    validate(checkForUser.valildationScheme),
    checkForUser
  );
  router.put("/:email", validate(updateUser.valildationScheme), updateUser);
  app.use(router.routes()).use(router.allowedMethods());
};
