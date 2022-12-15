const Router = require("@koa/router");
const bestellingservice = require("../service/bestelling");
const { getLogger } = require("../core/logging");
const validate = require("../rest/_validation");
const Joi = require("joi");
const userService = require("../service/user");
const { addUserInfo } = require("../core/auth");

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
createBestelling.valildationScheme = {};

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
  router.post(
    "/",
    validate(createBestelling.valildationScheme),
    createBestelling
  );
  router.get("/", getAllBestellingen);

  app.use(router.routes()).use(router.allowedMethods());
};
