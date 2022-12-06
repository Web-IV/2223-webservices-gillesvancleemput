const {tables} = require('../index');
module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.bestelling, (table) => {
            table.uuid('bestellingId').primary();
            table.uuid('userId').notNullable();
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable(tables.bestelling);
    },
};
