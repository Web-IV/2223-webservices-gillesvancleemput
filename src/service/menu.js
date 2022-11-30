
const menu = require('../repository/menu');
const { v4: uuidv4 } = require('uuid');
const { getLogger } = require ('../core/logging');


const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getLogger();
	this.logger.debug(message, meta);
  };

const getByIdMenuService = async (id) => {
	const item = await menu.getByIdMenu(id);
	return item;
}
const getAllMenuService = async () => {
	const items = await menu.getAllMenu();
	return {
		items,
	};
	
}
const deleteByIdMenuService = async (id) => {
	await menu.deleteByIdMenu(id);
	console.log(id);
	return await getByIdMenuService(id);

};
const createMenuItemService = async (ctx) => {
	const { naam, prijs, type, beschrijving } = ctx.request.body;
	const itemId = uuidv4();
	getLogger().info(`Service: Creating menu item with id ${itemId}, naam ${naam}, prijs ${prijs}, type ${type}, beschrijving ${beschrijving}`);
	await menu.createMenuItem(itemId, naam, prijs,type, beschrijving);
	return getByIdMenuService(itemId);
}
const updateByIdMenuService = async (id, { naam, prijs, type, beschrijving} ) => {
	getLogger().info(`Service: Updating menu item with id ${id}`);
	await menu.updateByIdMenu(id, naam, prijs, type, beschrijving);
	return getByIdMenuService(id);
}




module.exports = {
	getByIdMenuService,
	getAllMenuService,
	deleteByIdMenuService,
	createMenuItemService,
	updateByIdMenuService
};