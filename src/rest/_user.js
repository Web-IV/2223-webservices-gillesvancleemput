const Router = require("@koa/router");
const userservice = require("../service/user");
const Joi = require("joi");
const validate = require("../rest/_validation");
const { addUserInfo } = require("../core/auth");

const createUser = async (ctx) => {
  await addUserInfo(ctx);
  console.log(ctx.state);
  await userservice.createUserService({
    auth0id: ctx.state.user.sub,
    name: ctx.state.user.name,
  });
  ctx.status = 201;
};

const getUserByAuth0Id = async (ctx) => {
  const user = await userservice.getByAuth0Id(ctx.params.auth0id);
  ctx.body = user;
};
const checkForUser = async (ctx) => {
  const boolean = await userservice.checkForUser(ctx.params.auth0id);
  ctx.body = boolean;
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/user",
  });
  router.get("/:auth0id", getUserByAuth0Id);
  router.post("/", createUser);
  router.get("/check/:auth0id", checkForUser);
  app.use(router.routes()).use(router.allowedMethods());
};
