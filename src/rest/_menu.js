const Router = require('@koa/router');
const MenuService = require('../service/menu');
const {getLogger} = require('../core/logging');
const Joi = require('joi');
const validate = require ('../rest/_validation');



const getByIdMenu = async (ctx) => {
	ctx.body = await MenuService.getByIdMenuService(ctx.params.id);
	ctx.status = 200;
};
getByIdMenu.valildationScheme = {
	params: Joi.object({
		id: Joi.string().required().min(1).max(255),
	}),
};

const getAllMenu = async (ctx) => {
	ctx.body = await MenuService.getAllMenuService();
	ctx.status = 200;
};
const deleteMenu = async (ctx) => {
	getLogger().silly(`Router: deleteMenu with id ${ctx.params.id}`);
	const Menu = await MenuService.deleteByIdMenuService(ctx.params.id);
	ctx.body = Menu;
	ctx.status = 204;
};
deleteMenu.valildationScheme = {
	params: Joi.object({
		id: Joi.string().required().min(1).max(255),
	}),
};
const createMenuItem = async (ctx) => {
	getLogger().silly(`Router: createMenuItem with body ${JSON.stringify(ctx.request.body)}`);
	const Menu = await MenuService.createMenuItemService(ctx);
	ctx.body = Menu;
  	ctx.status = 201;
  };
  createMenuItem.valildationScheme = {
	body: Joi.object({
		naam: Joi.string().required(),
		prijs: Joi.number().required().positive().integer(),
		type: Joi.string().required(),
		beschrijving: Joi.string().allow('').allow(null),		
	}),
};
const updateMenuItem = async (ctx) => {
	getLogger().silly(`Router: updateMenuItem with body ${JSON.stringify(ctx.request.body)}`);
	const Menu = await MenuService.updateByIdMenuService(ctx.params.id, ctx.request.body);
	ctx.body = Menu;
	ctx.status = 200;
};
updateMenuItem.valildationScheme = {
	params: Joi.object({
		id: Joi.string().required().min(1).max(255),
	}),
	body: Joi.object({
		naam: Joi.string().required(),
		prijs: Joi.number().required().positive().integer(),
		type: Joi.string().required(),
		beschrijving: Joi.string().allow('').allow(null),
	}),
	
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
 module.exports = (app) => {
	const router = new Router({
		prefix: '/menu',
	});
    router.get('/', getAllMenu);
	router.get('/:id',validate(getByIdMenu.valildationScheme),getByIdMenu);
	router.delete('/:id',validate(deleteMenu.valildationScheme),deleteMenu);
	router.post('/', validate(createMenuItem.valildationScheme), createMenuItem);
	router.put('/:id', validate(updateMenuItem.valildationScheme), updateMenuItem);

    
	app.use(router.routes()).use(router.allowedMethods());
	
};