"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.CONTAINER = exports.COMPONENT = void 0;

var _helper = require("./helper");

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
    value: COMPONENT
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
  when: function when(_ref) {
    var type = _ref.type;
    return type === COMPONENT;
  },
  choices: [{
    name: 'SCSS module',
    value: 'scss',
    disabled: _helper.isReactNative
  }, {
    name: 'CSS module',
    value: 'css',
    disabled: _helper.isReactNative
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
}, {
  name: 'containerOptions',
  type: 'checkbox',
  "default": ['state'],
  when: function when(_ref2) {
    var type = _ref2.type;
    return type === CONTAINER;
  },
  choices: [{
    name: 'State',
    value: 'state',
    checked: true
  }, {
    name: 'Redux State',
    value: 'redux'
  }]
}];
exports.prompts = prompts;