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

var _winstonKafkaTransport = require('winston-kafka-transport');

var _winstonKafkaTransport2 = _interopRequireDefault(_winstonKafkaTransport);

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
  })];

  if (KAFKA_TOPIC && KAFKA_HOST) {
    _winston2['default'].transports.Kafka = _winstonKafkaTransport2['default'];
    var kafka = new _winston2['default'].transports.Kafka({
      topic: KAFKA_TOPIC,
      level: 'emerg',
      connectionString: KAFKA_HOST
    });

    transports.push(kafka);
  }

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

  winston.setLevels({ emerg: 7, alert: 6, crit: 5, error: 4, warning: 3, notice: 2, info: 1, debug: 0 });

  return expressLoggers();
}