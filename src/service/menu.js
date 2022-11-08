
const menu = require('../repository/menu');
const { v4: uuidv4 } = require('uuid');
const { getLogger } = require ('../core/logging');


const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getLogger();
	this.logger.debug(message, meta);
  };

const getByIdMenuService = async (id) => {
	return await menu.getByIdMenu(id);
}
const getAllMenuService = async () => {
	const items = await menu.getAllMenu();
	return {
		items,
	};
}
const deleteByIdMenuService = async (id) => {
	return await menu.deleteByIdMenu(id);
};
const createMenuItemService = async (ctx) => {
	const { naam, prijs, type, beschrijving } = ctx.request.body;
	const itemId = uuidv4();
	getLogger().info(`Service: Creating menu item with id ${itemId}, naam ${naam}, prijs ${prijs}, type ${type}, beschrijving ${beschrijving}`);
	return await menu.createMenuItem(itemId, naam, prijs,type, beschrijving);
}
const updateByIdMenuService = async (ctx) => {
	const { id } = ctx.params;
	const { naam, prijs, type, beschrijving } = ctx.request.body;
	getLogger().info(`Service: Updating menu item with id ${id}`);
	return await menu.updateByIdMenu(id, naam, prijs, type, beschrijving);
}




module.exports = {
	getByIdMenuService,
	getAllMenuService,
	deleteByIdMenuService,
	createMenuItemService,
	updateByIdMenuService
};