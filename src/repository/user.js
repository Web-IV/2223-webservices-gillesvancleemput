const { getKnex } = require('../data/index');
const { tables } = require('../data/index');
const { getLogger } = require('../core/logging');

const getAll = async () => {
    const logger = getLogger();
    logger.info('Fetching all user');
    const knex = getKnex();
    const user = await knex(tables.user).select();
    return user;
};
const deleteById = async (id) => {
    const logger = getLogger();
    logger.info(`Deleting user with id ${id}`);
    const knex = getKnex();
    const user = await knex(tables.user).where('id', id).del();
    return user;
};
const createUser = async (id, naam, voornaam, email) => {
    const logger = getLogger();
    logger.info(`Creating user with id ${id}`);
    const knex = getKnex();
    const user = await knex(tables.user).insert({ id, naam, voornaam, email });
    return user;
}
const updateByemail = async (naam, voornaam, email) => {
    const logger = getLogger();
    logger.info(`Updating user with email ${email}`);
    const knex = getKnex();
    const user = await knex(tables.user).where('email', email).update({naam, voornaam});
    return user;
   
}
const getByEmail = async (email) => {
    const logger = getLogger();
    logger.info(`Fetching user with email ${email}`);
    const knex = getKnex();
    const user = await knex(tables.user).where('email', email).select();
    return user;
}

   

module.exports = {
    getAll,
    deleteById,
    createUser,
    updateByemail,
    getByEmail,
};