module.exports = {
    up: async (knex) => {
        await knex.schema.createTable('bestelling', (table) => {
            table.uuid('bestellingId').primary();
            table.uuid('userId').notNullable();
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable('bestelling');
    },
};
