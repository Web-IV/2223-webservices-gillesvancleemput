const { getLogger } = require('../core/logging');
const user = require('../repository/user');
const { v4: uuidv4 } = require('uuid');


const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getLogger();
	this.logger.debug(message, meta);
};

const getAllusers = async() => {
	debugLog("Fetching all blog");
	const items = await user.getAll();
	return {
	  items,
	};
	
};

const deleteByIdService = async (id) => {
	debugLog(`Deleting user with id ${id}`);
	return await user.deleteById(id);
};
const createUserService = async (naam, voornaam, email) => {
	debugLog(`Creating user with id ${naam}`);
	return await user.createUser(uuidv4(), naam, voornaam, email);
}
const updateByIdService = async (naam, voornaam, email) => {
	debugLog(`Updating user with id ${naam}`);
	return await user.updateByemail(naam, voornaam, email);
}
const getByEmailService = async (email) => {
	debugLog(`Fetching user with email ${email}`);
	return await user.getByEmail(email);
}



module.exports = {
	getAllusers,
	deleteByIdService,
	createUserService,
	updateByIdService,
	getByEmailService,

};