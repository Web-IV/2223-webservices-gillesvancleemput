const Router = require('@koa/router');
const installTransactionRouter = require('./_transactions');
const installHealthRouter = require('./_health');


/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
 module.exports = (app) => {
	const router = new Router({
		prefix: '/api',
	});

	installTransactionRouter(router);
	installHealthRouter(router);

	app.use(router.routes()).use(router.allowedMethods());
};