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
const deleteById = async (id) => {
    const logger = getLogger();
    logger.info(`Deleting transaction with id ${id}`);
    const knex = getKnex();
    const transactions = await knex('user').where('userID', id).del();
    return transactions;
};
const createUser = async (userID, naam, voornaam, email) => {
    const logger = getLogger();
    logger.info(`Creating transaction with id ${userID}`);
    const knex = getKnex();
    const transactions = await knex('user').insert({ userID, naam, voornaam, email });
    return transactions;
}
const updateByemail = async (naam, voornaam, email) => {
    const logger = getLogger();
    logger.info(`Updating transaction with id ${naam}`);
    const knex = getKnex();
    const transactions = await knex('user').where('email', email).update({naam, voornaam});
    return transactions;
}
const getByEmail = async (email) => {
    const logger = getLogger();
    logger.info(`Fetching transaction with email ${email}`);
    const knex = getKnex();
    const transactions = await knex('user').where('email', email).select();
    return transactions;
}
   

module.exports = {
    getAll,
    deleteById,
    createUser,
    updateByemail,
    getByEmail,
};