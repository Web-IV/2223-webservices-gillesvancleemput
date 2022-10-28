const Router = require('@koa/router');
const transactionService = require('../service/transaction');

const getAllTransactions = async (ctx) => {
	ctx.body = await transactionService.getAllTransactions();
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
 module.exports = (app) => {
	const router = new Router({
		prefix: '/transactions',
	});

	router.get('/', getAllTransactions);
	app.use(router.routes()).use(router.allowedMethods());
};