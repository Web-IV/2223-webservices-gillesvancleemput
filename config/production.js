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
    host: "vichogent.be",
    port: 40043,
    name: "182542gv",
  },
  cors: {
    origins: ["https://sinsinfrontend.onrender.com"],
    maxAge: 3 * 60 * 60,
  },
};
