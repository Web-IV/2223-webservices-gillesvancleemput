const { getLogger } = require("../core/logging");
const userRepo = require("../repository/user");
const { v4: uuidv4 } = require("uuid");
const { ServiceError } = require("../core/serviceError");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const createUserService = async ({
  name,
  auth0id,
  email,
  straat,
  huisnummer,
  postcode,
  gemeente,
}) => {
  debugLog("Creating a new user", {
    name,
  });
  return await userRepo.createUser(
    name,
    auth0id,
    email,
    straat,
    huisnummer,
    postcode,
    gemeente
  );
};

const getByAuth0Id = async (auth0id) => {
  debugLog(`Fetching user with auth0id ${auth0id}`);
  const user = await userRepo.findByAuth0Id(auth0id);

  if (!user) {
    throw ServiceError.notFound(`No user with id ${auth0id} exists`, {
      auth0id,
    });
  }
  return user;
};
const checkForUser = async (auth0id) => {
  return await userRepo.checkForUser(auth0id);
};
const updateUser = async (email, straat, huisnummer, postcode, gemeente) => {
  return await userRepo.updateUser(
    email,
    straat,
    huisnummer,
    postcode,
    gemeente
  );
};

module.exports = {
  createUserService,
  getByAuth0Id,
  checkForUser,
  updateUser,
};
