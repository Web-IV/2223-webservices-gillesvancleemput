const { getKnex } = require("../data/index");
const { tables } = require("../data/index");
const { getLogger } = require("../core/logging");
const { v4: uuidv4 } = require("uuid");

const createUser = async (
  name,
  auth0id,
  email,
  straat,
  huisnummer,
  postcode,
  gemeente
) => {
  const logger = getLogger();
  const userId = uuidv4();
  const rol = "user";
  logger.info(`Creating user with id ${userId}`);
  const knex = getKnex();
  const user = await knex(tables.user).insert({
    userId,
    name,
    auth0id,
    email,
    straat,
    huisnummer,
    postcode,
    gemeente,
    rol,
  });
  return userId;
};
const findByAuth0Id = (auth0id) => {
  return getKnex()(tables.user).where("auth0id", auth0id).first();
};
const checkForUser = async (auth0id) => {
  const user = await findByAuth0Id(auth0id);
  if (!user) {
    return false;
  }
  return true;
};
const updateUser = async (email, straat, huisnummer, postcode, gemeente) => {
  await getKnex()(tables.user).where("email", email).update({
    straat,
    huisnummer,
    postcode,
    gemeente,
  });
  return { straat, huisnummer, postcode, gemeente };
};

module.exports = {
  createUser,
  findByAuth0Id,
  checkForUser,
  updateUser,
};
