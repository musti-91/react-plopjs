"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExt = getExt;
exports.dirType = dirType;
exports.getTemplate = getTemplate;
exports.getTestTemplate = getTestTemplate;
exports.getContainerTemplate = getContainerTemplate;

function getExt(isTs) {
  return isTs ? 'tsx' : 'js';
}

function dirType(type) {
  return type ? 'components' : 'containers';
}

function getTemplate(isFunction, isTs) {
  var functionState = isFunction ? 'function' : 'class';
  return "".concat(__dirname, "/templates/component.").concat(getExt(isTs), ".").concat(functionState, ".hbs");
}

function getTestTemplate(isTs) {
  return "".concat(__dirname, "/templates/test.").concat(getExt(isTs), ".hbs");
}

function getContainerTemplate(isTs) {
  return "".concat(__dirname, "/templates/container.").concat(getExt(isTs), ".hbs");
}