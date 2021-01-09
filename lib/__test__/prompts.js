"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.CONTAINER = exports.COMPONENT = void 0;

require("inquirer");

var COMPONENT = 'component';
exports.COMPONENT = COMPONENT;
var CONTAINER = 'container';
exports.CONTAINER = CONTAINER;
var prompts = [{
  name: 'name',
  type: 'input',
  message: 'Name of the file?'
}, {
  name: 'isTs',
  type: 'confirm',
  message: 'Use Typescript file? [Y]',
  "default": true
}, {
  name: 'type',
  type: 'list',
  message: 'Type of the file?',
  choices: [{
    name: 'Component',
    value: COMPONENT,
    checked: true
  }, {
    name: 'Container',
    value: CONTAINER
  }]
}, {
  name: 'isFunction',
  type: 'confirm',
  message: 'Function Component? [Y]',
  "default": true
}, {
  name: 'options',
  type: 'checkbox',
  "default": ['scss'],
  choices: [{
    name: 'SCSS module',
    value: 'scss',
    checked: true
  }, {
    name: 'CSS module',
    value: 'css'
  }, {
    name: 'A test file[Enzyme]',
    value: 'test'
  }, {
    name: 'Styleguidist file [React-Styleguidist]',
    value: 'readme'
  }, {
    name: 'Append Index[!You need to have index file]',
    value: 'append'
  }, {
    name: 'Storybook file [React-Storybook]',
    value: 'story'
  }]
}];
exports.prompts = prompts;