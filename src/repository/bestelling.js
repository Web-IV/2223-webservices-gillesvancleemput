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
const berekenPrijsPerBestelling = async (bestellingId) => {
  const logger = getLogger();
  logger.info(`Calculating price for bestelling with id ${bestellingId}`);
  const knex = getKnex();
  const a = await knex(tables.bestellingItem)
    .where("bestellingId", bestellingId)
    .select("itemId", "aantal");
  return await berekenTotalePrijs(a);
};
const berekenTotalePrijs = async (bestellingItems) => {
  const logger = getLogger();
  logger.info(`Calculating total price for bestelling`);
  const knex = getKnex();
  let totalePrijs = 0;
  for (let i = 0; i < bestellingItems.length; i++) {
    const itemId = bestellingItems[i].itemId;
    const aantal = bestellingItems[i].aantal;
    const prijs = await knex(tables.menu)
      .where("itemId", itemId)
      .select("prijs");
    totalePrijs += prijs[0].prijs * aantal;
  }
  return totalePrijs;
};

module.exports = {
  createBestelling,
  addItemToBestelling,
  getAllBestellingen,
  berekenPrijsPerBestelling,
};
