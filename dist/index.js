'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns null values in case something goes wrong.
var fallback = function fallback() {
  var uname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return (0, _extends3.default)({
    formatted: null,
    branch: null,
    hash: null,
    hashFull: null,
    commits: null
  }, uname != null && uname.length > 0 ? { uname: null } : {});
};

/**
 * Wraps runRepoExec() in a try/catch block in case of errors.
 */
/**
 * RepoInfo - repoinfo <https://bitbucket.org/msikma/callisto-bot>
 * Copyright © 2018, Michiel Sikma
 */

var getRepoInfo = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var uname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var info;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return runRepoExec(uname);

          case 3:
            info = _context.sent;
            return _context.abrupt('return', info);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', fallback(uname));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getRepoInfo() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Retrieves information about the current repository.
 */
var runRepoExec = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var uname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var unameIsArr, unameArr, _ref3, _ref4, branch, hash, hashFull, commits, unameResults;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            unameIsArr = Array.isArray(uname);
            unameArr = unameIsArr ? uname : [uname];
            _context2.next = 4;
            return _promise2.default.all([callExternal('git describe --all | sed s@heads/@@'), callExternal('git rev-parse --short head'), callExternal('git rev-parse head'), callExternal('git rev-list head --count')]);

          case 4:
            _ref3 = _context2.sent;
            _ref4 = (0, _slicedToArray3.default)(_ref3, 4);
            branch = _ref4[0];
            hash = _ref4[1];
            hashFull = _ref4[2];
            commits = _ref4[3];

            if (!uname.length) {
              _context2.next = 16;
              break;
            }

            _context2.next = 13;
            return _promise2.default.all(unameArr.map(function (cmd) {
              return callExternal('uname ' + cmd);
            }));

          case 13:
            _context2.t0 = _context2.sent;
            _context2.next = 17;
            break;

          case 16:
            _context2.t0 = [];

          case 17:
            unameResults = _context2.t0;
            return _context2.abrupt('return', (0, _extends3.default)({
              formatted: branch + '-' + commits,
              branch: branch,
              hash: hash,
              hashFull: hashFull,
              commits: commits
            }, uname.length ? { uname: unameIsArr ? unameResults : unameResults[0] } : {}));

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function runRepoExec() {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Calls an external program and returns the result.
 */
var callExternal = function callExternal(cmd) {
  return new _promise2.default(function (resolve, reject) {
    (0, _child_process.exec)(cmd, function (error) {
      var stdout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var stderr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (error) return reject(stdout.trim(), stderr.trim(), error);else resolve(stdout.trim(), stderr.trim());
    });
  });
};

exports.default = getRepoInfo;