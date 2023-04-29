const chalk = require("chalk");
const { execute } = require("../client/ready");

module.exports = {
  name: "connecting",
  execute() {
    console.log(chalk.cyan("[Database Status]: Connecting ♾️"));
  },
};
