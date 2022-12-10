const { tables } = require("../index");
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.uuid("userId").primary();
      table.string("name");
      table.string("voornaam");
      table.string("email");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.user);
  },
};
