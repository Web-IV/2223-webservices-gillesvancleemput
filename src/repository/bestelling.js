const { getKnex } = require("../data/index");
const { tables } = require("../data/index");
const { getLogger } = require("../core/logging");
const { get } = require("config");
const { Logger } = require("winston");
const MenuRepo = require("./menu");

const createBestelling = async (bestellingId, auth0Id, userId) => {
  const logger = getLogger();
  logger.info(`Creating bestelling with id ${bestellingId}`);
  const knex = getKnex();
  await knex(tables.bestelling).insert({ bestellingId, auth0Id, userId });
};
const addItemToBestelling = async (bestellingId, itemId, aantal) => {
  const logger = getLogger();
  logger.info(`Adding item ${itemId} to bestelling with id ${bestellingId}`);
  const knex = getKnex();
  await knex(tables.bestellingItem).insert({ bestellingId, itemId, aantal });
};
const getAllBestellingen = async (auth0id) => {
  const logger = getLogger();
  logger.info(`Getting all bestellingen for user with auth0id ${auth0id}`);
  const knex = getKnex();
  const bestellingen = await knex(tables.bestelling)
    .where("auth0Id", auth0id)
    .select();
  return bestellingen;
};
const getBestellingById = async (bestellingId) => {
  const logger = getLogger();
  logger.info(`Getting all items for bestelling with id ${bestellingId}`);
  const knex = getKnex();
  const bestellingItems = await knex(tables.bestellingItem)
    .where("bestellingId", bestellingId)
    .select();
  return bestellingItems;
};
const getPrijsByItemId = async (itemId) => {
  const logger = getLogger();
  logger.info(`Getting prijs for item with id ${itemId}`);
  const knex = getKnex();
  const prijs = await knex(tables.menu).where("itemId", itemId).select("prijs");
  return prijs;
};

module.exports = {
  createBestelling,
  addItemToBestelling,
  getAllBestellingen,
  getBestellingById,
  getPrijsByItemId,
};
