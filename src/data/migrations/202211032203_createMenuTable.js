module.exports = {
    up: async (knex) => {
        await knex.schema.createTable('menu', (table) => {
            table.uuid('itemId').primary();
            table.string('naam').notNullable();
            table.integer('prijs').notNullable();
            table.string('type').notNullable();
            table.string('beschrijving').notNullable();
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable('menu');
    },
};
