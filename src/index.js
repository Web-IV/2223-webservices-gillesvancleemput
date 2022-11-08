const Koa = require('koa');
const { initializeLogger, getLogger } = require('./core/logging');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const { initializeData } = require('./data');
const installRest = require('./rest');
const koaCors = require('@koa/cors');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');



const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

const Router = require('@koa/router');
const router = new Router();

async function main() {
  await initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: { NODE_ENV },
  });

  await initializeData();

  router.get('/', async (ctx, next) => {
    ctx.body = 'Hello';
  });

  const logger = getLogger();

  const app = new Koa();
  app.use(bodyParser());
  app.use(
	koaCors({
		origin: (ctx) => {
			if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
				return ctx.request.header.origin;
			}
			// Not a valid domain at this point, let's return the first valid as we should return a string
			return CORS_ORIGINS[0];
		},
		allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
		maxAge: CORS_MAX_AGE,
	})
);
	installRest(app);
	app.use(router.routes());
  	app.listen('9000', () => {
    logger.info('Server started');
  });
}
main();