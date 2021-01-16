import { yellow } from 'chalk'
import { findFiles, prettierFormatter } from './formatter'
import { getTemplate, dirType, getTestTemplate, getExt, getContainerTemplate, isReactNative } from './helper'
import { NodePlopAPI, ActionType } from 'plop'
import { prompts, CONTAINER, COMPONENT } from './prompts'

import '@babel/polyfill'
import { existsSync } from 'fs'

const path = require('path')
const camelcase = require('camelcase')

module.exports = function (plop: NodePlopAPI) {
  // helpers
  plop.setHelper('lower', (txt) => txt.toLowerCase());
  plop.setHelper('camelcase', (name)=> camelcase(name, {
    pascalCase: true,
    preserveConsecutiveUppercase: true,
  }))

  plop.setGenerator('component', {
    description: 'default generator',
    prompts: prompts as any,
    // Actions
    actions: ({ type, isTs, isFunction, options, name, containerOptions }): ActionType[] => {
      const dir = dirType(type === COMPONENT)
      const ext = getExt(isTs)
      const outTarget = `${path.join(process.cwd(), 'src')}/${dir}`


      const actions: ActionType[] | any = []
      if (type === CONTAINER) {
        /************ CONTAINERS *************/
        actions.push({
          type: 'add',
          path: `${outTarget}/{{camelcase name}}.${ext}`,
          templateFile: getContainerTemplate(isTs, isFunction),
          data: {
            state: containerOptions.includes('state'),
            redux: containerOptions.includes('redux')
          }
        })
      } else {
        actions.push({
          type: 'add',
          path: `${outTarget}/{{camelcase name}}/index.${ext}`,
          templateFile: getTemplate(isFunction, isTs),
          data: {
            test: isTs && options.includes('test'),
            css: options.includes('css') && !options.includes('scss') && !isReactNative,
          }
        })

        if (options.includes('append')) {
          actions.push({
            // type: 'append',
            type: existsSync(`${outTarget}/index.${isTs ? 'ts' : 'js'}`) ? 'append' : 'add',
            path: `${outTarget}/index.${isTs ? 'ts' : 'js'}`,
            template: `export { default as {{camelcase name}} } from './{{camelcase name}}'`,
            abortOnFail: false,
            unique: true,
            skip: () => type === CONTAINER,
          })
        }

        if (options.includes('test')) {
          actions.push({
            type: 'add',
            path: `${outTarget}/{{camelcase name}}/{{camelcase name}}.spec.${getExt(isTs)}`,
            templateFile: getTestTemplate(isTs),
            skip: () => type === CONTAINER,
          })
        }

        if(!isReactNative) {
          let value = options.includes('css') ? 'css' : 'scss'
          if (value === 'css') {
            actions.push({
              type: 'add',
              path: `${outTarget}/{{camelcase name}}/${name.toLowerCase()}.module.css`,
              templateFile: `${__dirname}/templates/web/style.module.hbs`,
              skip: () => type === CONTAINER && isReactNative,
            })
          } else {
            actions.push({
              type: 'add',
              path: `${outTarget}/{{camelcase name}}/${name.toLowerCase()}.module.scss`,
              templateFile: `${__dirname}/templates/web/style.module.hbs`,
              skip: () => type === CONTAINER && isReactNative,
            })
          }
        }

        if (options.includes('readme')) {
          actions.push({
            type: 'add',
            path: `${outTarget}/{{camelcase name}}/Readme.md`,
            templateFile: `${__dirname}/templates/readme.md.hbs`,
            skip: () => type === CONTAINER,
          })
        }

        if (options.includes('story')) {
          actions.push({
            type: 'add',
            path: `${outTarget}/{{camelcase name}}/{{camelcase name}}.stories.${getExt(isTs)}`,
            templateFile: `${__dirname}/templates/stories.${getExt(isTs)}.hbs`,
            skip: () => type === CONTAINER,
            data: {
              ext: getExt(isTs),
            }
          })
        }
      }
      actions.push(() => {
        const files = findFiles(outTarget)
        for (let file of files) {
          actions.push(async () => await prettierFormatter(file))
        }
        yellow(
          `>>>>>>>>>>>>>>>>>>> ${files.length} Found to format <<<<<<<<<<<<<<<<<<<`
        )
      })
      return actions
    },
  })
}
