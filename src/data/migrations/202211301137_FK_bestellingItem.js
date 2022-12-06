const {tables} = require('../index');
module.exports = {
    up: async (knex) => {
        await knex.schema.table(tables.bestellingItem, (table) => {
            table.foreign('bestellingId',"fk_bestellingItem_bestelling" ).references(`${tables.bestelling}.bestellingId`).onDelete('CASCADE');
            table.foreign('itemId',"fk_bestellingItem_item" ).references(`${tables.menu}.itemId`).onDelete('CASCADE');
        });
    },
    down: async (knex) => {
        await knex.schema.dropTable(tables.bestellingItem);
    },
};