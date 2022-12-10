const bestelling = require("../repository/bestelling");
const { getLogger } = require("../core/logging");
const { v4: uuidv4 } = require("uuid");

const createBestellingService = async (list, userId) => {
  //const list = ctx.request.body.list;
  const bestellingId = uuidv4();
  getLogger().info(`adding all items of bestelling to database`);
  await bestelling.createBestelling(bestellingId, userId);
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

module.exports = {
  createBestellingService,
};
