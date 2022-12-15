const { tables } = require("../index");
module.exports = {
  up: async (knex) => {
    await knex.schema.table(tables.bestelling, (table) => {
      table.string("auth0Id").notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.bestelling);
  },
};
