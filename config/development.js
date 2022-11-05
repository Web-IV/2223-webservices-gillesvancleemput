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
      username: 'root',
      password: 'root',
    },
  },
  cors: {
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},
};
