const {tables} = require('../index');
module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.menu, (table) => {
            table.uuid('itemId').primary();
            table.string('naam').notNullable();
            table.integer('prijs').notNullable();
            table.string('type').notNullable();
            table.string('beschrijving').notNullable();
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable(tables.menu);
    },
};
