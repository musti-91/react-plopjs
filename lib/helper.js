"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExt = getExt;
exports.dirType = dirType;
exports.getTemplate = getTemplate;
exports.getTestTemplate = getTestTemplate;
exports.getContainerTemplate = getContainerTemplate;
exports.isReactNative = void 0;

var _fs = require("fs");

var path = require('path');

function getExt(isTs) {
  return isTs ? 'tsx' : 'js';
}

var isReactNative = (0, _fs.existsSync)("".concat(path.join(process.cwd(), 'ios')));
exports.isReactNative = isReactNative;
var getProjectTemplateDir = isReactNative ? 'app' : 'web';

function dirType(type) {
  return type ? 'components' : 'containers';
}

function getTemplate(isFunction, isTs) {
  var functionState = isFunction ? 'function' : 'class';
  return "".concat(__dirname, "/templates/").concat(getProjectTemplateDir, "/component.").concat(getExt(isTs), ".").concat(functionState, ".hbs");
}

function getTestTemplate(isTs) {
  return "".concat(__dirname, "/templates/test.").concat(getExt(isTs), ".hbs");
}

function getContainerTemplate(isTs, isFunction) {
  var stateless = isFunction ? 'function' : 'class';
  return "".concat(__dirname, "/templates/").concat(getProjectTemplateDir, "/container.").concat(getExt(isTs), ".").concat(stateless, ".hbs");
}