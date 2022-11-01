const Router = require('@koa/router');
const transactionService = require('../service/transaction');

const getAllTransactions = async (ctx) => {
	ctx.body = await transactionService.getAllTransactions();
};
const deleteTransaction = async (ctx) => {
	await transactionService.deleteByIdService(ctx.params.id);
	ctx.status = 204;
};
const createUser = async (ctx) => {
	await transactionService.createUserService(ctx.request.body.naam, ctx.request.body.voornaam, ctx.request.body.email);
	ctx.status = 204;
};
const updateTransaction = async (ctx) => {
	await transactionService.updateByIdService(ctx.request.body.naam, ctx.request.body.voornaam, ctx.request.body.email);
	ctx.status = 204;
};
const getByEmail = async (ctx) => {
	ctx.body = await transactionService.getByEmailService(ctx.params.email);
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
	router.delete('/:id', deleteTransaction);
	router.post('/', createUser);
	router.put('/:email', updateTransaction);
	router.get('/:email', getByEmail);
	app.use(router.routes()).use(router.allowedMethods());
	
};