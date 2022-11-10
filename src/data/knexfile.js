const {DATABASE_USERNAME} = process.env;
const {DATABASE_PASSWORD} = process.env;

module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: 'localhost',
        port: 3306,
        database: 'sinsin',
        user: DATABASE_USERNAME ,
        password: DATABASE_PASSWORD,
      },
    },
  };