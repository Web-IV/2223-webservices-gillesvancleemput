const Router = require('@koa/router');
const userservice = require('../service/user');
const Joi = require('joi');
const validate = require ('../rest/_validation');

const getAll = async (ctx) => {
	ctx.body = await userservice.getAllusers();
	ctx.status = 200;
};
const deleteUser = async (ctx) => {
	await userservice.deleteByIdService(ctx.params.id);
	ctx.status = 204;
};
deleteUser.valildationScheme = {
	params: Joi.object({
		id: Joi.string().required().min(1).max(255),
	}),
};
const createUser = async (ctx) => {
	await userservice.createUserService(ctx);
	ctx.status = 201;
};
createUser.valildationScheme = {
	body: Joi.object({
		naam: Joi.string().required(),
		gebruikersnaam: Joi.string().required(),
		wachtwoord: Joi.string().required(),
		email: Joi.string().required(),
		telefoon: Joi.string().required(),
		rol: Joi.string().required(),
	}),
};
const updateTransaction = async (ctx) => {
	await userservice.updateByIdService(ctx);
	ctx.status = 204;
};
updateTransaction.valildationScheme = {
	params: Joi.object({
		id: Joi.string().required().min(1).max(255),
	}),
	body: Joi.object({
		naam: Joi.string().required(),
		gebruikersnaam: Joi.string().required(),
		wachtwoord: Joi.string().required(),
		email: Joi.string().required(),
		telefoon: Joi.string().required(),
		rol: Joi.string().required(),
	}),
};
const getById = async (ctx) => {
	ctx.body = await userservice.getByIdService(ctx);
	ctx.status = 201;
};
getById.valildationScheme = {
	params: Joi.object({
		id: Joi.string().required().min(1).max(255),
	}),
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

	router.get('/', getAll);
	router.delete('/:id',validate(deleteUser.valildationScheme), deleteUser);
	router.post('/',validate(createUser.valildationScheme), createUser);
	router.put('/:email',validate(updateTransaction.valildationScheme), updateTransaction);
	router.get('/:id',validate(getById.valildationScheme), getById);

	app.use(router.routes()).use(router.allowedMethods());
	
};