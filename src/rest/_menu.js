const Router = require('@koa/router');
const MenuService = require('../service/menu');
const getLogger = require('../core/logging');


const getByIdMenu = async (ctx) => {
	ctx.body = await MenuService.getByIdMenuService(ctx.params.id);
};
const getAllMenu = async (ctx) => {
    getLogger().debug(`Fetching all menu`);
	ctx.body = await MenuService.getAllMenuService();
};
const deleteMenu = async (ctx) => {
	await MenuService.deleteByIdMenuService(ctx.params.id);
	ctx.status = 204;
};
const createMenuItem = async (ctx) => {
	await MenuService.createMenuItemService(ctx.request.body.naam, ctx.request.body.prijs, ctx.request.body.type, ctx.request.body.beschrijving);
	ctx.status = 204;
};
const updateMenuItem = async (ctx) => {
	await MenuService.updateByIdMenuService(ctx.request.body.naam, ctx.request.body.prijs, ctx.request.body.type, ctx.request.body.beschrijving);
    ctx.status = 204;
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
	router.get('/:id', getByIdMenu);
	router.delete('/:id', deleteMenu);
	router.post('/', createMenuItem);
	router.put('/:id', updateMenuItem);

    
	app.use(router.routes()).use(router.allowedMethods());
	
};