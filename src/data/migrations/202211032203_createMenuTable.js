module.exports = {
    up: async (knex) => {
        await knex.schema.createTable('menu', (table) => {
            table.uuid('itemId').primary();
            table.string('naam');
            table.integer('prijs');
            table.string('type');
            table.string('beschrijving');
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable('menu');
    },
};
