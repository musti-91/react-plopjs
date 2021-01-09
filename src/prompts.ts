import {
  Question,
  CheckboxQuestion,
  ListQuestion,
  ConfirmQuestion,
  InputQuestion,
  ExpandQuestion,
  EditorQuestion,
  RawListQuestion,
  PasswordQuestion,
  NumberQuestion,
  Inquirer,
  Answers,
} from 'inquirer'

type DynamicPromptsFunction = (inquirer: Inquirer) => Promise<Answers>

type PromptQuestion =
  | Question
  | CheckboxQuestion
  | ListQuestion
  | ExpandQuestion
  | ConfirmQuestion
  | EditorQuestion
  | RawListQuestion
  | PasswordQuestion
  | NumberQuestion
  | InputQuestion

export type Prompts = DynamicPromptsFunction | PromptQuestion[]
export const COMPONENT = 'component'
export const CONTAINER = 'container'

export const prompts: Prompts = [
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
    when: ({ type }) => type === COMPONENT,
  },
  {
    name: 'options',
    type: 'checkbox',
    when: ({ type }) => type === COMPONENT,
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
  {
    name: 'containerOptions',
    type: 'checkbox',
    default: ['state'],
    when: ({ type }) => type === CONTAINER,
    choices: [
      {
        name: 'State',
        value: 'state',
        checked: true,
      },
      {
        name: 'Redux State',
        value: 'redux',
      },
    ],
  },
]
