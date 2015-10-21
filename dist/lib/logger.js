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
// import kafkaTransport from 'winston-kafka-transport'; // eslint-disable-line

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var PRODUCTION = process.env.NODE_ENV === 'production'; // eslint-disable-line
var KAFKA_TOPIC = process.env.KAFKA_TOPIC || null; // eslint-disable-line
var KAFKA_HOST = process.env.KAFKA_HOST || null; // eslint-disable-line

var winston = null;

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
  if (!level || !message) {
    winston.log('error', 'Level or message is undefined - both should be defined - i.e. logger.log(\'info\', \'MESSAGE\');');
  } else {
    winston.log(level, message, dataToLog);
  }
}

function getTransports(config) {
  var appName = config.app_name || 'my_app';

  var transports = [new _winston2['default'].transports.Console({
    silent: false,
    level: 'debug',
    timestamp: true,
    app_name: appName,
    colorize: true,
    prettyPrint: true,
    humanReadableUnhandledException: true,
    handleExceptions: true
  }), new _winston2['default'].transports.File({
    filename: './log.log',
    maxFiles: 10,
    maxsize: 300000000,
    level: 'emerg',
    silent: PRODUCTION,
    timestamp: true,
    colorize: true,
    json: false,
    prettyPrint: true,
    tailable: true,
    handleExceptions: true,
    zippedArchive: true
  }), new _winston2['default'].transports.Syslog({
    silent: false,
    protocol: 'udp4',
    localhost: _os2['default'].hostname(),
    app_name: appName,
    json: true,
    timestamp: true,
    handleExceptions: true
  })];
  /*
    if (KAFKA_TOPIC && KAFKA_HOST) {
      Winston.transports.Kafka = kafkaTransport;
      const kafka = new Winston.transports.Kafka({
        topic: KAFKA_TOPIC,
        level: 'error',
        connectionString: KAFKA_HOST
      });
  
      transports.push(kafka);
    }
  */
  return transports;
}

function expressLoggers() {
  return {
    logger: _expressWinston2['default'].logger({
      winstonInstance: winston
    }),
    errorLogger: _expressWinston2['default'].errorLogger({
      winstonInstance: winston
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
  winston = new _winston2['default'].Logger({
    transports: transports,
    exitOnError: false
  });

  winston.setLevels(_winston2['default'].config.syslog.levels); // see level at https://github.com/winstonjs/winston-syslog#log-levels

  if (PRODUCTION) {
    winston.debug('This application is started with the PRODUCTION flag set, meaning that most logging will go to syslog.');
  }
  return expressLoggers();
}