const prettier = require('prettier')
const fs = require('fs')
const glob = require('glob')

module.exports = function formatter(filePath) {
  return prettier
    .getFileInfo(filePath)
    .then(function (res) {
      //__dirname, '../../
      return prettier
        .resolveConfig(`${__dirname}../../`)
        .then(function (options) {
          return {
            ...options,
            parser: res.parser,
            data: fs.readFileSync(filePath, 'utf-8'),
          }
        })
    })
    .then(function (fulfilled) {
      fs.writeFileSync(
        filePath,
        prettier.format(fulfilled.data, fulfilled.options, ''),
        'utf-8'
      )
    })
    .then(function () {
      return `Formatted ${filePath}`
    })
}
