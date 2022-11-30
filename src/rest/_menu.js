const Router = require('@koa/router');
const MenuService = require('../service/menu');
const {getLogger} = require('../core/logging');



const getByIdMenu = async (ctx) => {
	ctx.body = await MenuService.getByIdMenuService(ctx.params.id);
	ctx.status = 200;
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
const createMenuItem = async (ctx) => {
	getLogger().silly(`Router: createMenuItem with body ${JSON.stringify(ctx.request.body)}`);
	const Menu = await MenuService.createMenuItemService(ctx);
	ctx.body = Menu;
  	ctx.status = 201;
  };
const updateMenuItem = async (ctx) => {
	getLogger().silly(`Router: updateMenuItem with body ${JSON.stringify(ctx.request.body)}`);
	const Menu = await MenuService.updateByIdMenuService(ctx.params.id, ctx.request.body);
	ctx.body = Menu;
	ctx.status = 200;
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