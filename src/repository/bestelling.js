const { getKnex } = require('../data/index');
const { tables } = require('../data/index');
const { getLogger } = require('../core/logging');

const createBestelling = async (bestellingId, userId) => {
    const logger = getLogger();
    logger.info(`Creating bestelling with id ${bestellingId}`);
    const knex = getKnex();
    await knex(tables.bestelling).insert({bestellingId, userId});
}
const addItemToBestelling = async (bestellingId, itemId, aantal) => {
    const logger = getLogger();
    logger.info(`Adding item ${itemId} to bestelling with id ${bestellingId}`);
    const knex = getKnex();
    await knex(tables.bestellingItem).insert({bestellingId, itemId, aantal});
}



module.exports = {
    createBestelling,
    addItemToBestelling,
};