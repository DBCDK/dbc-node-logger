'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * @file
 * Custom logger to be used on DBC hosted node applications.
 */

var _libLoggerJs = require('./lib/logger.js');

var logger = _interopRequireWildcard(_libLoggerJs);

var expressLoggers = null;

var Logger = (function () {
  function Logger(config) {
    _classCallCheck(this, Logger);

    expressLoggers = logger.configLogger(config);
  }

  _createClass(Logger, [{
    key: 'log',
    value: function log(level, messge) {
      var data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      logger.doLog(level, messge, data);
    }
  }, {
    key: 'debug',
    value: function debug(messge) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('debug', messge, data);
    }
  }, {
    key: 'info',
    value: function info(messge) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('info', messge, data);
    }
  }, {
    key: 'notice',
    value: function notice(messge) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('notice', messge, data);
    }
  }, {
    key: 'warning',
    value: function warning(messge) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('warning', messge, data);
    }
  }, {
    key: 'error',
    value: function error(messge) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('error', messge, data);
    }
  }, {
    key: 'getExpressLoggers',
    value: function getExpressLoggers() {
      return expressLoggers;
    }
  }]);

  return Logger;
})();

exports['default'] = Logger;
module.exports = exports['default'];