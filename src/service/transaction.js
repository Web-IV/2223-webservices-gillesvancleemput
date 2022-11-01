const { getLogger } = require('../core/logging');
const { getAll} = require('../repository/transaction');
const {deleteById} = require('../repository/transaction');
const {createUser} = require('../repository/transaction');
const {updateByemail} = require('../repository/transaction');
const {getByEmail} = require('../repository/transaction');
const { v4: uuidv4 } = require('uuid');


const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getLogger();
	this.logger.debug(message, meta);
};

const getAllTransactions = async() => {
	debugLog('Fetching all transactions');
	return await getAll();
};
const deleteByIdService = async (id) => {
	debugLog(`Deleting transaction with id ${id}`);
	return await deleteById(id);
};
const createUserService = async (naam, voornaam, email) => {
	debugLog(`Creating transaction with id ${naam}`);
	return await createUser(uuidv4(), naam, voornaam, email);
}
const updateByIdService = async (naam, voornaam, email) => {
	debugLog(`Updating transaction with id ${naam}`);
	return await updateByemail(naam, voornaam, email);
}
const getByEmailService = async (email) => {
	debugLog(`Fetching transaction with email ${email}`);
	return await getByEmail(email);
}


module.exports = {
	getAllTransactions,
	deleteByIdService,
	createUserService,
	updateByIdService,
	getByEmailService
};