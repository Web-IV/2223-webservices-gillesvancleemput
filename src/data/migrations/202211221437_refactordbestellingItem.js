module.exports = {
    up: async (knex) => {
        await knex.schema.table('bestellingItem', (table) => {
            table.dropColumn('bestellingItemId');
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable('bestellingItem');
    },
};