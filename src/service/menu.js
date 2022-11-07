
const menu = require('../repository/menu');
const { v4: uuidv4 } = require('uuid');


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
const createMenuItemService = async (naam, prijs ,type, beschrijving) => {
	return await menu.createMenuItem(uuidv4(), naam, prijs,type, beschrijving);
}
const updateByIdMenuService = async (itemId , naam, prijs,type, beschrijving) => {
	return await menu.updateByIdMenu(itemId, naam, prijs,type, beschrijving);
}




module.exports = {
	getByIdMenuService,
	getAllMenuService,
	deleteByIdMenuService,
	createMenuItemService,
	updateByIdMenuService
};