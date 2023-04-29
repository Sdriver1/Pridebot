const chalk = require("chalk");
const { execute } = require("../client/ready");

module.exports = {
  name: "connected",
  execute() {
    console.log(chalk.green("[Database Status]: Connected ✅"));
  },
};
