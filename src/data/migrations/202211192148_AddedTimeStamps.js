const {tables} = require('../index');
module.exports = {
    up: async (knex) => {
        await knex.schema.table(tables.bestelling, (table) => {
            table.timestamps(true, true);
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable(tables.bestelling);
    },
};
