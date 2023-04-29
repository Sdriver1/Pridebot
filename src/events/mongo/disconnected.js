const chalk = require("chalk");
const { execute } = require("../client/ready");

module.exports = {
  name: "Disconnected",
  execute() {
    console.log(chalk.red("[Database Status]: Disconnected ❌"));
  },
};
