function getExt(isTs) {
  return isTs ? 'tsx' : 'js'
}

function dirType(type) {
  return type ? 'components' : 'containers'
}

function getTemplate(isFunction, isTs) {
  const functionState = isFunction ? 'function' : 'class'
  return `${__dirname}/templates/component.${getExt(isTs)}.${functionState}.hbs`
}

function getTestTemplate(isTs) {
  return `${__dirname}/templates/test.${getExt(isTs)}.hbs`
}

module.exports = {
  getTemplate,
  dirType,
  getTestTemplate,
  getExt,
}
