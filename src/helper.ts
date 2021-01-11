export function getExt(isTs: boolean): string {
  return isTs ? 'tsx' : 'js'
}

export function dirType(type: boolean): string {
  return type ? 'components' : 'containers'
}

export function getTemplate(isFunction: boolean, isTs: boolean): string {
  const functionState = isFunction ? 'function' : 'class'
  return `${__dirname}/templates/component.${getExt(isTs)}.${functionState}.hbs`
}

export function getTestTemplate(isTs: boolean): string {
  return `${__dirname}/templates/test.${getExt(isTs)}.hbs`
}

export function getContainerTemplate(isTs: boolean): string {
  return `${__dirname}/templates/container.${getExt(isTs)}.hbs`
}
