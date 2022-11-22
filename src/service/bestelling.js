
const bestelling = require('../repository/bestelling');
const { getLogger } = require ('../core/logging');
const { v4: uuidv4 } = require('uuid');

const createBestellingService = async (ctx) => {
    const userId = ctx.request.body.userId;
    const list = ctx.request.body.list;
    console.log(list);
    getLogger().info(`Creating bestelling for user ${userId}`);
    const bestellingId = uuidv4();
    getLogger().info(`adding all items of bestelling to database`);
    for (let index = 0; index < list.length; index++) {
        console.log(list[index]);
        await addItemToBestellingService(bestellingId, list[index].itemId, list[index].aantal);
    }
    return await bestelling.createBestelling(bestellingId, userId);   
}
const addItemToBestellingService = async (bestellingId, ItemId, aantal) => {
    await bestelling.addItemToBestelling(bestellingId, ItemId, aantal);
}


module.exports = {
    createBestellingService,
};