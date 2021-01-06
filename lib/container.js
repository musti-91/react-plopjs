const path = require('path')
const chalk = require('chalk')

module.exports = function (flag) {
  console.log(chalk.bgBlue.green(flag))
  console.log(chalk.bgBlue.green(path.resolve(__dirname)))
}
