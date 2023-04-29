const chalk = require("chalk");
const { execute } = require("../client/ready");

module.exports = {
  name: "err",
  execute(err) {
    console.log(chalk.redBright(`[Database Status]:❗ERROR❗\n${err}`)
    );
  },
};
