import { existsSync } from 'fs'

const path = require('path')

export function getExt(isTs: boolean): string {
  return isTs ? 'tsx' : 'js'
}

export const isReactNative = existsSync(`${path.join(process.cwd(), 'ios')}`)
const getProjectTemplateDir = isReactNative ? 'app' : 'web'

export function dirType(type: boolean): string {
  return type ? 'components' : 'containers'
}

export function getTemplate(isFunction: boolean, isTs: boolean): string {
  const functionState = isFunction ? 'function' : 'class'
  return `${__dirname}/templates/${getProjectTemplateDir}/component.${getExt(
    isTs
  )}.${functionState}.hbs`
}

export function getTestTemplate(isTs: boolean): string {
  return `${__dirname}/templates/test.${getExt(isTs)}.hbs`
}

export function getContainerTemplate(
  isTs: boolean,
  isFunction: boolean
): string {
  const stateless = isFunction ? 'function' : 'class'
  return `${__dirname}/templates/${getProjectTemplateDir}/container.${getExt(
    isTs
  )}.${stateless}.hbs`
}
