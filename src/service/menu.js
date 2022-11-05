const { getLogger } = require('../core/logging');
const menu = require('../repository/menu');
const { v4: uuidv4 } = require('uuid');


const getByIdMenuService = async (id) => {
	debugLog(`Fetching menu with id ${id}`);
	return await menu.getByIdMenu(id);
}
const getAllMenuService = async () => {
	debugLog(`Fetching all menu`);
	return await menu.getAllMenu();
}
const deleteByIdMenuService = async (id) => {
	debugLog(`Deleting menuitem with id ${id}`);
	return await menu.deleteByIdMenu(id);
};
const createMenuItemService = async (naam, prijs ,type, beschrijving) => {
	debugLog(`Creating menuitem with id ${naam}`);
	return await menu.createMenuItem(uuidv4(), naam, prijs,type, beschrijving);
}
const updateByIdMenuService = async (itemId,naam, prijs,type, beschrijving) => {
	debugLog(`Updating menuitem with id ${naam}`);
	return await menu.updateByIdMenu(itemId, naam, prijs,type, beschrijving);
}




module.exports = {
	getByIdMenuService,
	getAllMenuService,
	deleteByIdMenuService,
	createMenuItemService,
	updateByIdMenuService
};