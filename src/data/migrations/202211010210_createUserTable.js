const {tables} = require('../index');
module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.user, (table) => {
            table.uuid('userId').primary();
            table.string('naam').notNullable();
            table.string('voornaam').notNullable();
            table.string('email').notNullable();
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable(tables.user);
    },
};
