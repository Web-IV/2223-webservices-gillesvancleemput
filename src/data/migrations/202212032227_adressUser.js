const {tables} = require('../index');
module.exports = {
    up: async (knex) => {
        await knex.schema.table(tables.user, (table) => {
            table.string('straat').notNullable();
            table.string('huisnummer').notNullable();
            table.string('gemeente').notNullable();
            table.string('postcode').notNullable();
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable(tables.user);
    },
};