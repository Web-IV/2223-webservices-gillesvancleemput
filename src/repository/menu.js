const { getKnex } = require("../data/index");
const { tables } = require("../data/index");
const { getLogger } = require("../core/logging");

const getByIdMenu = async (id) => {
  const logger = getLogger();
  logger.info(`Fetching menu with id ${id}`);
  const knex = getKnex();
  const menu = await knex(tables.menu).where("itemId", id).first();
  return menu;
};
const getAllMenu = async () => {
  const logger = getLogger();
  logger.info("Fetching all menu");
  const knex = getKnex();
  const menu = await knex(tables.menu).select();
  return menu;
};
const deleteByIdMenu = async (id) => {
  const logger = getLogger();
  logger.info(`Deleting menu with id ${id}`);
  const knex = getKnex();
  await knex(tables.menu).where("itemId", id).del();
  console.log(`${id}`);
  return id;
};
const createMenuItem = async (itemId, naam, prijs, type, beschrijving) => {
  const logger = getLogger();
  logger.info(`Creating menu with id ${itemId}`);
  const knex = getKnex();
  const [id] = await knex(tables.menu).insert({
    itemId,
    naam,
    prijs,
    type,
    beschrijving,
  });
  console.log(id);
  return id;
};
const updateByIdMenu = async (itemId, naam, prijs, type, beschrijving) => {
  const logger = getLogger();
  logger.info(`Updating menu with id ${itemId}`);
  const knex = getKnex();
  await knex(tables.menu)
    .where("itemId", itemId)
    .update({ naam, prijs, type, beschrijving });
  return itemId;
};
const getPriceById = async (id) => {
  const logger = getLogger();
  logger.info(`Fetching price with id ${id}`);
  const knex = getKnex();
  const price = await knex(tables.menu).where("itemId", id).first();
  return price;
};

module.exports = {
  getByIdMenu,
  getAllMenu,
  deleteByIdMenu,
  createMenuItem,
  updateByIdMenu,
  getPriceById,
};
