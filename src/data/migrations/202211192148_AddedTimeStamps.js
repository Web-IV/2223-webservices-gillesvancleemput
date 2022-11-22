module.exports = {
    up: async (knex) => {
        await knex.schema.table('bestelling', (table) => {
            table.timestamps(true, true);
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable('bestelling');
    },
};
