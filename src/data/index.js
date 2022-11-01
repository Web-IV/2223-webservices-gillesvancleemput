const config = require('config');
const knexfile = require('./knexfile');
const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';
const {join} = require('path');
const { getLogger } = require('../core/logging');


const knex = require('knex');


let knexInstance;


const getKnexLogger = (logger, level) => (message) => {
	if (message.sql) {
	  logger.log(level, message.sql);
	} else if (message.length && message.forEach) {
	  message.forEach((innerMessage) =>
		logger.log(level, innerMessage.sql ? innerMessage.sql : JSON.stringify(innerMessage)));
	} else {
	  logger.log(level, JSON.stringify(message));
	}
  };


async function initializeData() {
	const logger = getLogger();
	logger.info('Initializing connection to the database');
	
	knexInstance = knex(knexfile.development);


	const knexOptions  = {
		client: knexInstance.client.config.client,
		connection: {
			host: knexfile.development.connection.host,
			port: knexfile.development.connection.port,
			database: knexfile.development.connection.database,
			user: knexfile.development.connection.user,
			password: knexfile.development.connection.password,
		},
		debug : isDevelopment,
		log: {
			warn: getKnexLogger(logger, 'warn'),
			error: getKnexLogger(logger, 'error'),
			deprecate: getKnexLogger(logger, 'warn'),
			debug: getKnexLogger(logger, 'debug'),
		},
		migrations :{
			tableName: 'knex_meta',
			directory: join('src', 'data', 'migrations')
		},
		seeds: {
			directory: join('src', 'data', 'seeds')
		}
	};
	
	knexInstance = knex(knexOptions);

	try {
		await knexInstance.raw('SELECT 1+1 AS result');
		await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${knexfile.development.connection.database}`);
	
		// We need to update the Knex configuration and reconnect to use the created database by default
		// USE ... would not work because a pool of connections is used
		await knexInstance.destroy();
	
		knexOptions.connection.database = knexfile.development.connection.database;
		knexInstance = knex(knexOptions);
		await knexInstance.raw('SELECT 1+1 AS result');
	  } catch (error) {
		logger.error(error.message, { error });
		throw new Error('Could not initialize the data layer');
	}

	let migrationsFailed = true;
  	try {
    await knexInstance.migrate.latest();
    migrationsFailed = false;
  	} catch (error) {
    logger.error('Error while migrating the database', {
      error,
    });
  }
	if (migrationsFailed) {
		try {
		  await knexInstance.migrate.down();
		} catch (error) {
		  logger.error('Error while undoing last migration', {
			error,
		  });
		}
		throw new Error('Migrations failed');
	}


	if (isDevelopment) {
		try {
			await knexInstance.seed.run();
		} catch (error) {
			logger.error('Error while seeding database', {
				error,
			});
		}
	}
	logger.info('Succesfully connected to the database');
	return knexInstance;
}
async function shutdownData() {
	const logger = getLogger();
	logger.info('Shutting down database connection');
	await knexInstance.destroy();
	knexInstance = null
	logger.info('Database connection closed');
  }

function getKnex() {
	if (!knexInstance) throw new Error('Please initialize the data layer before getting the Knex instance');
	return knexInstance;
}
const tables = Object.freeze({
	user: 'user',
});

module.exports = {
	tables,
	getKnex,
	initializeData,
	shutdownData,
};