module.exports = {
    up: async (knex) => {
        await knex.schema.createTable('user', (table) => {
            table.uuid('id').primary();
            table.string('naam').notNullable();
            table.string('voornaam').notNullable();
            table.string('email').notNullable();
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable('user');
    },
};
