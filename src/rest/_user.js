const Router = require('@koa/router');
const userservice = require('../service/user');

const getAllTransactions = async (ctx) => {
	ctx.body = await userservice.getAllusers();
};
const deleteTransaction = async (ctx) => {
	await userservice.deleteByIdService(ctx.params.id);
	ctx.status = 204;
};
const createUser = async (ctx) => {
	await userservice.createUserService(ctx);
	ctx.status = 201;
};
const updateTransaction = async (ctx) => {
	await userservice.updateByIdService(ctx);
	ctx.status = 204;
};
const getByEmail = async (ctx) => {
	ctx.body = await userservice.getByEmailService(ctx);
	ctx.status = 201;
};



/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
 module.exports = (app) => {
	const router = new Router({
		prefix: '/user',
	});

	router.get('/', getAllTransactions);
	router.delete('/:id', deleteTransaction);
	router.post('/', createUser);
	router.put('/:email', updateTransaction);
	router.get('/:email', getByEmail);

	app.use(router.routes()).use(router.allowedMethods());
	
};