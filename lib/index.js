"use strict";

var _chalk = require("chalk");

var _formatter = require("./formatter");

var _helper = require("./helper");

var _prompts = require("./prompts");

require("@babel/polyfill");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var path = require('path');

module.exports = function (plop) {
  // helpers
  plop.setHelper('lower', function (txt) {
    return txt.toLowerCase();
  });
  plop.setGenerator('component', {
    description: 'default generator',
    prompts: _prompts.prompts,
    actions: function actions(_ref) {
      var type = _ref.type,
          isTs = _ref.isTs,
          isFunction = _ref.isFunction,
          options = _ref.options,
          name = _ref.name,
          containerOptions = _ref.containerOptions;
      var dir = (0, _helper.dirType)(type === _prompts.COMPONENT);
      var ext = (0, _helper.getExt)(isTs);
      var outTarget = "".concat(path.join(process.cwd(), 'src'), "/").concat(dir);
      var actions = [];

      if (type === _prompts.CONTAINER) {
        /************ CONTAINERS *************/
        actions.push({
          type: 'add',
          path: "".concat(outTarget, "/{{name}}.").concat(ext),
          templateFile: (0, _helper.getContainerTemplate)(isTs),
          data: {
            state: containerOptions.includes('state'),
            redux: containerOptions.includes('redux')
          }
        });
      } else {
        actions.push({
          type: 'add',
          path: "".concat(outTarget, "/{{name}}/index.").concat(ext),
          templateFile: (0, _helper.getTemplate)(isFunction, isTs),
          data: {
            test: isTs && options.includes('test'),
            css: options.includes('css') && !options.includes('scss')
          }
        });

        if (options.includes('append')) {
          actions.push({
            type: 'append',
            path: "".concat(outTarget, "/index.").concat(isTs ? 'ts' : 'js'),
            template: "export { default as {{name}} } from './{{name}}'",
            abortOnFail: false,
            unique: true,
            skip: function skip() {
              return type === _prompts.CONTAINER;
            }
          });
        }

        if (options.includes('test')) {
          actions.push({
            type: 'add',
            path: "".concat(outTarget, "/{{name}}/{{name}}.spec.").concat((0, _helper.getExt)(isTs)),
            templateFile: (0, _helper.getTestTemplate)(isTs),
            skip: function skip() {
              return type === _prompts.CONTAINER;
            }
          });
        }

        var value = options.includes('css') ? 'css' : 'scss';

        if (value === 'css') {
          actions.push({
            type: 'add',
            path: "".concat(outTarget, "/{{name}}/").concat(name.toLowerCase(), ".module.css"),
            templateFile: "".concat(__dirname, "/templates/style.module.hbs"),
            skip: function skip() {
              return type === _prompts.CONTAINER;
            }
          });
        } else {
          actions.push({
            type: 'add',
            path: "".concat(outTarget, "/{{name}}/").concat(name.toLowerCase(), ".module.scss"),
            templateFile: "".concat(__dirname, "/templates/style.module.hbs"),
            skip: function skip() {
              return type === _prompts.CONTAINER;
            }
          });
        }

        if (options.includes('readme')) {
          actions.push({
            type: 'add',
            path: "".concat(outTarget, "/{{name}}/Readme.md"),
            templateFile: "".concat(__dirname, "/templates/readme.md.hbs"),
            skip: function skip() {
              return type === _prompts.CONTAINER;
            }
          });
        }

        if (options.includes('story')) {
          actions.push({
            type: 'add',
            path: "".concat(outTarget, "/{{name}}/{{name}}.stories.").concat((0, _helper.getExt)(isTs)),
            templateFile: "".concat(__dirname, "/templates/stories.").concat((0, _helper.getExt)(isTs), ".hbs"),
            skip: function skip() {
              return type === _prompts.CONTAINER;
            }
          });
        }
      }

      actions.push(function () {
        var files = (0, _formatter.findFiles)(outTarget);

        var _iterator = _createForOfIteratorHelper(files),
            _step;

        try {
          var _loop = function _loop() {
            var file = _step.value;
            actions.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _formatter.prettierFormatter)(file);

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        (0, _chalk.yellow)(">>>>>>>>>>>>>>>>>>> ".concat(files.length, " Found to format <<<<<<<<<<<<<<<<<<<"));
      });
      return actions;
    }
  });
};