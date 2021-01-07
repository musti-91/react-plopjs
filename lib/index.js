const path = require('path')
const { getTemplate, dirType, getTestTemplate, getExt } = require('./helper')

const COMPONENT = 'component'
const CONTAINER = 'container'

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'default generator',
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: 'Name of the file?',
      },
      {
        name: 'isTs',
        type: 'confirm',
        message: 'Use Typescript file? [Y]',
        default: true,
      },
      {
        name: 'type',
        type: 'list',
        message: 'Type of the file?',
        choices: [
          {
            name: 'Component',
            value: COMPONENT,
            checked: true,
          },
          {
            name: 'Container',
            value: CONTAINER,
          },
        ],
      },
      {
        name: 'isFunction',
        type: 'confirm',
        message: 'Function Component? [Y]',
        default: true,
      },
      {
        name: 'options',
        type: 'checkbox',
        default: ['scss'],
        choices: [
          {
            name: 'SCSS module',
            value: 'scss',
            checked: true,
          },
          {
            name: 'CSS module',
            value: 'css',
          },
          {
            name: 'A test file[Enzyme]',
            value: 'test',
          },
          {
            name: 'Styleguidist file [React-Styleguidist]',
            value: 'readme',
          },
          {
            name: 'Append Index[!You need to have index file]',
            value: 'append',
          },
          {
            name: 'Storybook file [React-Storybook]',
            value: 'story',
          },
        ],
      },
    ],
    actions: ({ type, isTs, name, isFunction, options }) => {
      const target = dirType(type)
      const ext = getExt(isTs)
      const outTarget = `${path.join(process.cwd(), 'src/')}/${target}`

      const actions = []
      actions.push({
        type: 'add',
        path: `${outTarget}/{{name}}/index.${ext}`,
        templateFile: getTemplate(isFunction, isTs),
      })

      // Todo: check if possible to write to dir/index
      if (options.includes('append')) {
        actions.push({
          type: 'append',
          path: `${outTarget}/index.${isTs ? 'ts' : 'js'}`,
          template: `export { default as {{name}} } from './{{name}}'`,
          abortOnFail: false,
        })
      }

      if (options.includes('test')) {
        actions.push({
          type: 'add',
          path: `${outTarget}/{{name}}/{{name}}.test.${getExt(isTs)}`,
          templateFile: getTestTemplate(isTs),
        })
      }

      let value = options.includes('css') ? 'css' : 'scss'
      if (value === 'css') {
        actions.push({
          type: 'add',
          // Todo: update name of style
          path: `${outTarget}/{{name}}/{{name}}.module.css`,
          templateFile: `${__dirname}/templates/style.module.hbs`,
        })
      } else {
        actions.push({
          type: 'add',
          // Todo: update name of style
          path: `${outTarget}/{{name}}/{{name}}.module.scss`,
          templateFile: `${__dirname}/templates/style.module.hbs`,
        })
      }

      if (options.includes('readme')) {
        actions.push({
          type: 'add',
          path: `${outTarget}/{{name}}/Readme.md`,
          templateFile: `${__dirname}/templates/readme.md.hbs`,
        })
      }

      if (options.includes('story')) {
        actions.push({
          type: 'add',
          path: `${outTarget}/{{name}}/{{name}}.stories.${getExt(isTs)}`,
          templateFile: `${__dirname}/templates/stories.${getExt(isTs)}.hbs`,
        })
      }

      // Todo: format file before write it.

      return actions
    },
  })
}
