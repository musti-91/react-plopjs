const chalk = require('chalk')

const flags = process.argv.splice(2)
exports.handleInputs = function () {
  let choices = []
  flags.forEach((flag) => {
    if (flag === '-cmp' || flag === 'component') {
      console.log(chalk.bgCyan.yellow('COMPONENT'))
      choices.push(flag)
    }
    if (flag === '-cnt' || flag === 'container') {
      console.log(chalk.bgCyan.red('CONTAINER'))
      choices.push(flag)
    }
    if (flag === '-ts') {
      console.log('Has' + chalk.red(flag) + ' file')
    }
    if (flag === '-f') {
      console.log('Asked full file support' + chalk.bold.yellow(flag) + ' file')
    }
  })
  return choices
}
