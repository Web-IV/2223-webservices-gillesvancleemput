const { tables } = require("../index");
module.exports = {
  up: async (knex) => {
    await knex.schema.table(tables.user, (table) => {
      table.string("rol");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.user);
  },
};
