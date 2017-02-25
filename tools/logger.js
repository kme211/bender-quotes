const chalk = require('chalk');

module.exports.log = (msg) => {
  console.log(chalk.green(msg));
};

module.exports.error = (msg) => {
  console.log(chalk.red(msg));
};