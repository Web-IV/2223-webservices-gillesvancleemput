const Router = require('@koa/router');
const installUserRouter = require('./_user');
const installMenuRouter = require('./_menu');
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

	installUserRouter(router);
	installMenuRouter(router);
	installHealthRouter(router);

	app.use(router.routes()).use(router.allowedMethods());
};