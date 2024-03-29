const bestelling = require("../repository/bestelling");
const { getLogger } = require("../core/logging");
const { v4: uuidv4 } = require("uuid");

const createBestellingService = async (list, auth0id, userId) => {
  //const list = ctx.request.body.list;
  const bestellingId = uuidv4();
  getLogger().info(`adding all items of bestelling to database`);
  await bestelling.createBestelling(bestellingId, auth0id, userId);
  for (let index = 0; index < list.length; index++) {
    await addItemToBestellingService(
      bestellingId,
      list[index].itemId,
      parseInt(list[index].aantal)
    );
  }
};
const addItemToBestellingService = async (bestellingId, ItemId, aantal) => {
  await bestelling.addItemToBestelling(bestellingId, ItemId, aantal);
};
const getAllBestellingenService = async (auth0id) => {
  const bestellingen = await bestelling.getAllBestellingen(auth0id);
  for (let index = 0; index < bestellingen.length; index++) {
    const bestellingId = bestellingen[index].bestellingId;
    const totalePrijs = await berekenPrijsPerBestelling(bestellingId);
    bestellingen[index].prijs = totalePrijs;
  }
  return bestellingen;
};
const berekenPrijsPerBestelling = async (bestellingId) => {
  const bestellingItems = await bestelling.getBestellingById(bestellingId);
  for (let index = 0; index < bestellingItems.length; index++) {
    const itemId = bestellingItems[index].itemId;
    const prijs = await bestelling.getPrijsByItemId(itemId);
    bestellingItems[index].prijs = prijs[0].prijs;
  }
  let totalePrijs = 0;
  for (let index = 0; index < bestellingItems.length; index++) {
    totalePrijs += bestellingItems[index].prijs * bestellingItems[index].aantal;
  }
  return totalePrijs;
};

module.exports = {
  createBestellingService,
  addItemToBestellingService,
  getAllBestellingenService,
};
