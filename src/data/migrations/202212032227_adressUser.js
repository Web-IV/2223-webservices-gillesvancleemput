const { tables } = require("../index");
module.exports = {
  up: async (knex) => {
    await knex.schema.table(tables.user, (table) => {
      table.string("straat");
      table.string("huisnummer");
      table.string("gemeente");
      table.string("postcode");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.user);
  },
};
