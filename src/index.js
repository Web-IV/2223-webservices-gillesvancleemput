const Koa = require('koa');
const { initializeLogger, getLogger } = require('./core/logging');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const transactionService = require('./service/transaction');
const { initializeData } = require('./data');
const installRest = require('./rest');


const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');


async function main() {

initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: { NODE_ENV },
  });

await initializeData();

const router = new Router();
const app = new Koa();
app.use(bodyParser());

const logger = getLogger();

installRest(app);

app.listen(3000);

}
main();