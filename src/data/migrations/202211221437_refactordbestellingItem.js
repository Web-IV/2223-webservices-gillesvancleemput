const {tables} = require('../index');
module.exports = {
    up: async (knex) => {
        await knex.schema.table(tables.bestellingItem, (table) => {
            table.dropColumn('bestellingItemId');
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable(tables.bestellingItem);
    },
};