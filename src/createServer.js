const Koa = require("koa");
const { initializeLogger, getLogger } = require("./core/logging");
const config = require("config");
const bodyParser = require("koa-bodyparser");
const yamljs = require("yamljs");
const { initializeData } = require("./data");
const installRest = require("./rest");
const koaCors = require("@koa/cors");
const CORS_ORIGINS = config.get("cors.origins");
const CORS_MAX_AGE = config.get("cors.maxAge");
const { shutdownData } = require("./data");
const { serializeError } = require("serialize-error");
const ServiceError = require("./core/serviceError");
const { checkJwtToken } = require("./core/auth");

const swaggerJsdoc = require("swagger-jsdoc");
const { koaSwagger } = require("koa2-swagger-ui");

const swaggerOptions = require("../swagger.config");

const NODE_ENV = config.get("env");
const LOG_LEVEL = config.get("log.level");
const LOG_DISABLED = config.get("log.disabled");

const Router = require("@koa/router");
const { startTimer } = require("winston");
const router = new Router();

module.exports = async function createServer() {
  await initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: { NODE_ENV },
  });

  await initializeData();

  router.get("/", async (ctx, next) => {
    ctx.body = "Hello";
  });

  const logger = getLogger();

  const app = new Koa();
  app.use(bodyParser());

  const spec = swaggerJsdoc(swaggerOptions);
  app.use(
    koaSwagger({
      routePrefix: "/swagger", // host at /swagger instead of default /docs
      specPrefix: "/swagger/spec", // route where the spec is returned
      exposeSpec: true, // expose spec file
      swaggerOptions: {
        // passed to SwaggerUi()
        spec,
      },
    })
  );

  app.use(checkJwtToken());

  app.use(async (ctx, next) => {
    const logger = getLogger();
    logger.debug(ctx.headers.authorization);
    logger.debug(JSON.stringify(ctx.state.user));
    logger.debug(ctx.state.jwtOriginalError);
    await next();
  });

  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        // Not a valid domain at this point, let's return the first valid as we should return a string
        return CORS_ORIGINS[0];
      },
      allowHeaders: ["Accept", "Content-Type", "Authorization"],
      maxAge: CORS_MAX_AGE,
    })
  );

  const emoji = require("node-emoji");

  app.use(async (ctx, next) => {
    const logger = getLogger();
    logger.info(`${emoji.get("fast_forward")} ${ctx.method} ${ctx.url}`);

    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get("skull");
      if (ctx.status >= 400) return emoji.get("x");
      if (ctx.status >= 300) return emoji.get("rocket");
      if (ctx.status >= 200) return emoji.get("white_check_mark");
      return emoji.get("rewind");
    };

    try {
      await next();
      logger.info(`${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`);
    } catch (error) {
      logger.error(`${emoji.get("x")} ${ctx.method} ${ctx.status} ${ctx.url}`, {
        error,
      });

      throw error;
    }
  });
  app.use(async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.body = {
          code: "NOT_FOUND",
          message: `Unknown resource: ${ctx.url}`,
        };
      }
    } catch (error) {
      const logger = getLogger();
      logger.error("Error occured while handling a request", {
        error: serializeError(error),
      });

      let statusCode = error.status || 500;
      let errorBody = {
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== "production" ? error.stack : undefined,
      };

      if (error instanceof ServiceError) {
        if (error.isNotFound) {
          statusCode = 404;
        }

        if (error.isValidationFailed) {
          statusCode = 400;
        }

        if (error.isUnauthorized) {
          statusCode = 401;
        }

        if (error.isForbidden) {
          statusCode = 403;
        }
      }
      if (ctx.state.jwtOriginalError) {
        statusCode = 401;
        errorBody.code = "UNAUTHORIZED";
        errorBody.message = ctx.state.jwtOriginalError.message;
        errorBody.details.jwtOriginalError = serializeError(
          ctx.state.jwtOriginalError
        );
      }
      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  installRest(app);
  app.use(router.routes());

  return {
    getApp() {
      return app;
    },
    start() {
      return new Promise((resolve) => {
        const port = config.get("port");
        app.listen(port);
        logger.info(`🚀 Server listening on http://localhost:${port}`);
        resolve();
      });
    },

    async stop() {
      {
        app.removeAllListeners();
        await shutdownData();
        getLogger().info("Goodbye");
      }
    },
  };
};
