'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.doLog = doLog;
exports.configLogger = configLogger;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _winstonSyslog = require('winston-syslog');

// eslint-disable-line no-unused-vars

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var PRODUCTION = process.env.NODE_ENV === 'production'; // eslint-disable-line no-process-env

var logger = null;

/**
 * Logs the given parameters
 *
 * @param {string} level A string defining the level the logmessage should be
 * associated with.
 * @param {string} message A string describing the logmessage.
 * @param {*} data The data that should be logged. The given data will, if not
 * null, be wrapped in an object {data: data} to ensure consistent
 * representation in our syslog.
 */

function doLog(level, message) {
  var data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var dataToLog = data ? { data: data } : null;
  logger.log(level, message, dataToLog);
}

function getTransports(config) {
  return {
    console: new _winston2['default'].transports.Console({
      silent: PRODUCTION,
      level: 'debug',
      colorize: true,
      prettyPrint: true,
      handleExceptions: true
    }),

    syslog: new _winston2['default'].transports.Syslog({
      silent: !PRODUCTION,
      protocol: 'udp4',
      localhost: _os2['default'].hostname(),
      app_name: config.appName,
      json: true,
      timestamp: true,
      level: 'emerg',
      handleExceptions: true
    })
  };
}

function expressLoggers(transports) {
  return {
    logger: _expressWinston2['default'].logger({
      transports: [transports.syslog]
    }),
    errorLogger: _expressWinston2['default'].errorLogger({
      transports: [transports.syslog, transports.console],
      exitOnError: false
    })
  };
}

/**
 * Configures the logger and transports to be used.
 * Syslog is disabled if PRODUCTION flag is anything but true.
 *
 * Express specific loggers are also initialized.
 */

function configLogger(config) {
  var transports = getTransports(config);
  logger = new _winston2['default'].Logger({
    transports: [transports.console, transports.syslog],
    exitOnError: false
  });

  logger.setLevels(_winston2['default'].config.syslog.levels); // see level at https://github.com/winstonjs/winston-syslog#log-levels
  return expressLoggers(transports);
}