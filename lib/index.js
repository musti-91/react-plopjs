const path = require('path')

const COMPONENT = 'component'
const CONTAINER = 'container'

function dirType(type) {
  return type ? 'components' : 'containers'
}

function getTemplate(isFunction, name) {
  if (isFunction) {
    return `function ${name}(props) {
      return  <div></div>
    }`
  }
  return `class ${name} extends React.Component{
    render() {
      return <div></div>
    }
  }`
}

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
            name: 'Styleguidist file',
            value: 'readme',
          },
          {
            name: 'Append Index[!You need to have index file]',
            value: 'append',
          },
        ],
      },
    ],
    actions: ({ type, isTs, name, isFunction, options }) => {
      const target = dirType(type)
      const ext = isTs ? 'tsx' : 'js'
      const outTarget = `${path.join(process.cwd(), 'src/')}/${target}`

      const actions = []
      actions.push({
        type: 'add',
        path: `${outTarget}/{{name}}/index.${ext}`,
        template: getTemplate(isFunction, name),
      })
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
          path: `${outTarget}/{{name}}/{{name}}.module.css`,
          template: '// test file',
        })
      }

      if (options.includes('css') || options.includes('scss')) {
        let value = options.includes('css') ? 'css' : 'scss'
        actions.push({
          type: 'add',
          path: `${outTarget}/{{name}}/${name}.module.${value}`,
          template: '.wrapper {}',
        })
      }

      // Todo: format file before write it.
      // Todo: check if possible to write to dir/index
      // Todo: create templates
      return actions
    },
  })
}
