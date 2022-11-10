const {DATABANK_USERNAME} = process.env;
const {DATABANK_PASSWORD} = process.env;
module.exports = {
  log: {
    level: 'silly',
    disabled: false,
  },
  databank:{
    client: "msql2",
    connection: {
      host: 'localhost',
      port: 3306,
      name: 'sinsin',
      username: DATABANK_USERNAME,
      password: DATABANK_PASSWORD,
    },
  },
  cors: {
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},
};
