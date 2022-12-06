const {tables} = require('../index');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.bestellingItem, (table) => {
            table.uuid('bestellingItemId').primary();
            table.uuid('bestellingId').primary();
            table.uuid('itemId').notNullable();
            table.integer('aantal').notNullable();
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable(tables.bestellingItem);
    },
};
