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
const createUserService = async (ctx) => {
	const { naam, voornaam, email } = ctx.request.body;
	const userId = uuidv4();
	getLogger().info(`Service: Creating user with id ${userId}, naam ${naam}, voornaam ${voornaam}, email ${email}`);
	return await user.createUser(userId, naam, voornaam, email);

}
const updateByIdService = async (ctx) => {
	const { email } = ctx.params;
	const { naam, voornaam} = ctx.request.body;
	getLogger().info(`Service: Updating user with email ${email}`);
	return await user.updateByemail(naam, voornaam, email);
}
const getByIdService = async (ctx) => {
	const { id } = ctx.params;
	getLogger().info(`Service: Fetching user with id ${id}`);
	return await user.getById(id);
}



module.exports = {
	getAllusers,
	deleteByIdService,
	createUserService,
	updateByIdService,
	getByIdService,

};