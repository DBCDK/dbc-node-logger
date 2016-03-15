'use strict';

/**
 * @file
 * Custom logger to be used on DBC hosted node applications.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.debug = debug;
exports.info = info;
exports.notice = notice;
exports.warning = warning;
exports.error = error;

var _logger = require('./lib/logger.js');

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var expressLoggers = null;
var isInitialized = false;

/**
 *
 */

var Logger = function () {
  function Logger() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Logger);

    expressLoggers = logger.configLogger(config);
    isInitialized = true;
  }

  _createClass(Logger, [{
    key: 'log',
    value: function log(level, message) {
      var data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      logger.doLog(level, message, data);
    }

    /**
     * Logs an debug message
     * @param {String} message
     * @param {Object} data
     */

  }, {
    key: 'debug',
    value: function debug(message) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('debug', message, data);
    }

    /**
     * Logs an info message
     * @param {String} message
     * @param {Object} data
     */

  }, {
    key: 'info',
    value: function info(message) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('info', message, data);
    }

    /**
     * Logs a notice message
     * @param {String} message
     * @param {Object} data
     */

  }, {
    key: 'notice',
    value: function notice(message) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('notice', message, data);
    }

    /**
     * @deprecated Since removal of Syslog the warning level has been deprecated
     * in favor of the warn level
     *
     * @param {String} message
     * @param {Object} data
     */

  }, {
    key: 'warning',
    value: function warning(message) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('warning', message, data);
    }

    /**
     * Logs an error message
     * @param {String} message
     * @param {Object} data
     */

  }, {
    key: 'error',
    value: function error(message) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('error', message, data);
    }

    /**
     * Logs a critical message
     * @param {String} message
     * @param {Object} data
     */

  }, {
    key: 'crit',
    value: function crit(message) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('crit', message, data);
    }

    /**
     * Logs an alert message
     * @param {String} message
     * @param {Object} data
     */

  }, {
    key: 'alert',
    value: function alert(message) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      logger.doLog('alert', message, data);
    }

    /**
     * Returns loggers to be used as middleware in express.
     *
     * @return {*}
     */

  }, {
    key: 'getExpressLoggers',
    value: function getExpressLoggers() {
      return expressLoggers;
    }
  }]);

  return Logger;
}();

/**
 * Logs a debug message
 * @param {String} message
 * @param {Object} data
 */


exports.default = Logger;
function debug(message) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  if (isInitialized) {
    logger.doLog('debug', message, data);
  }
}

/**
 * Logs an info message
 * @param {String} message
 * @param {Object} data
 */
function info(message) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  if (isInitialized) {
    logger.doLog('info', message, data);
  }
}

/**
 * Logs a notice message
 * @param {String} message
 * @param {Object} data
 */
function notice(message) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  if (isInitialized) {
    logger.doLog('notice', message, data);
  }
}

/**
 * @deprecated Since removal of Syslog the warning level has been deprecated
 * in favor of the warn level
 *
 * @param {String} message
 * @param {Object} data
 */
function warning(message) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  if (isInitialized) {
    logger.doLog('warning', message, data);
  }
}

/**
 * Logs an error message
 * @param {String} message
 * @param {Object} data
 */
function error(message) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  if (isInitialized) {
    logger.doLog('error', message, data);
  }
}