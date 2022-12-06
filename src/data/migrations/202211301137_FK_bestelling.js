const {tables} = require('../index');
module.exports = {
    up: async (knex) => {
        await knex.schema.table(tables.bestelling, (table) => {
            table.foreign('userId',"fk_bestelling_user" ).references(`${tables.user}.userId`).onDelete('CASCADE');
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable(tables.bestelling);
    },
};