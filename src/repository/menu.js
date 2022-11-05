const { getKnex } = require('../data/index');
const { tables } = require('../data/index');
const { getLogger } = require('../core/logging');


const getByIdMenu = async (id) => {
    const logger = getLogger();
    logger.info(`Fetching menu with id ${id}`);
    const knex = getKnex();
    const menu = await knex(tables.menu).where('itemId', id).select();
    return menu;
}
const getAllMenu = async () => {
    const logger = getLogger();
    logger.info('Fetching all menu');
    const knex = getKnex();
    const menu = await knex(tables.menu).select();
    return menu;
}
const deleteByIdMenu = async (id) => {
    const logger = getLogger();
    logger.info(`Deleting menu with id ${id}`);
    const knex = getKnex();
    const menu = await knex(tables.menu).where('itemId', id).del();
    return menu;
};
const createMenuItem = async (itemId, naam, prijs, type , beschrijving) => {
    const logger = getLogger();
    logger.info(`Creating menu with id ${itemId}`);
    const knex = getKnex();
    const menu = await knex(tables.menu).insert({ itemId, naam, prijs, type , beschrijving });
    return menu;
}
const updateByIdMenu = async (itemId,naam, prijs, type , beschrijving) => {
    const logger = getLogger();
    logger.info(`Updating menu with id ${naam}`);
    const knex = getKnex();
    const menu = await knex(tables.menu).where('itemId', itemId).update({naam, prijs, type , beschrijving});
    return menu;
}


module.exports = {
    getByIdMenu,
    getAllMenu,
    deleteByIdMenu,
    createMenuItem,
    updateByIdMenu
};