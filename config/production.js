const { DATABANK_USERNAME } = process.env;
const { DATABANK_PASSWORD } = process.env;
module.exports = {
  port: 9000,
  log: {
    level: "info",
    disabled: false,
  },
  database: {
    client: "mysql2",
    host: "localhost",
    port: 3306,
    name: "sinsin",
  },
  cors: {
    origins: ["https://sinsinfrontend.onrender.com"],
    maxAge: 3 * 60 * 60,
  },
};
