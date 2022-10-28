const { getLogger } = require('../core/logging');
const { getAll} = require('../repository/transaction');

const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getLogger();
	this.logger.debug(message, meta);
};

const getAllTransactions = async() => {
	debugLog('Fetching all transactions');
	return await getAll();
};

module.exports = {
	getAllTransactions,
};