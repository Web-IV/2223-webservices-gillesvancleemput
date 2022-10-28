const { getKnex } = require('../data/index');
const { tables } = require('../data/index');
const { getLogger } = require('../core/logging');

const getAll = async () => {
    const logger = getLogger();
    logger.info('Fetching all transactions');
    const knex = getKnex();
    const transactions = await knex('user').select();
    return transactions;
};

module.exports = {
    getAll,
};