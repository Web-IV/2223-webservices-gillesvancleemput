const {DATABANK_USERNAME} = process.env;
const {DATABANK_PASSWORD} = process.env;
module.exports = {
  log: {
    level: 'silly',
    disabled: false,
  },
  database:{
      client: "mysql2",
      host: 'localhost',
      port: 3306,
      name: 'sinsin',

  },
  cors: {
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},
};
