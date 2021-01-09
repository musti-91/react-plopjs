"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var helper = _interopRequireWildcard(require("../helper"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('Helpers', function () {
  var dir = process.cwd();
  it('should return template path if [function, ts]', function () {
    expect(helper.getTemplate(true, true)).toEqual("".concat(dir, "/src/templates/component.tsx.function.hbs"));
  });
  it('should return template path if [function, js]', function () {
    expect(helper.getTemplate(true, false)).toEqual("".concat(dir, "/src/templates/component.js.function.hbs"));
  });
  it('should return template path if [class, ts]', function () {
    expect(helper.getTemplate(false, true)).toEqual("".concat(dir, "/src/templates/component.tsx.class.hbs"));
  });
  it('should return template path if [class, js]', function () {
    expect(helper.getTemplate(false, false)).toEqual("".concat(dir, "/src/templates/component.js.class.hbs"));
  });
});