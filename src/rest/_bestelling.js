const Router = require('@koa/router');
const bestellingservice = require('../service/bestelling');
const {getLogger} = require('../core/logging');


const createBestelling = async (ctx) => {
    await bestellingservice.createBestellingService(ctx);
    getLogger().info(`Router: Bestelling created`);
	ctx.status = 201;
};


/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
 module.exports = (app) => {
	const router = new Router({
		prefix: '/bestelling',
	});
	router.post('/', createBestelling);

	app.use(router.routes()).use(router.allowedMethods());
	
};