'use strict';

import Winston from 'winston';
import expressWinston from 'express-winston';
import kafkaTransport from 'winston-kafka-transport';

const PRODUCTION = (process.env.NODE_ENV === 'production'); // eslint-disable-line
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || null; // eslint-disable-line
const KAFKA_HOST = process.env.KAFKA_HOST || null; // eslint-disable-line

let winston = null;

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
export function doLog(level, message, data = null) {
  const dataToLog = (data) ? {data: data} : null;
  if (!level || !message) {
    winston.log('error', 'Level or message is undefined - both should be defined - i.e. logger.log(\'info\', \'MESSAGE\');');
  }
  else {
    winston.log(level, message, dataToLog);
  }
}

function getTransports(config) {
  const appName = config.app_name || 'my_app';

  let transports = [
    new Winston.transports.Console({
      silent: false,
      level: 'debug',
      timestamp: true,
      app_name: appName,
      colorize: true,
      prettyPrint: true,
      humanReadableUnhandledException: true,
      handleExceptions: true
    }),

    new Winston.transports.File({
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
    })
  ];

  if (KAFKA_TOPIC && KAFKA_HOST) {
    Winston.transports.Kafka = kafkaTransport;
    const kafka = new Winston.transports.Kafka({
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
    logger: expressWinston.logger({
      winstonInstance: winston
    }),
    errorLogger: expressWinston.errorLogger({
      winstonInstance: winston
    })
  };
}

function getRewriters() {
  let rewriters = [];

  rewriters.push(function filterOutFilebuffers (level, msg, meta) {
    function eachRecursive(obj) {
      for (var k in obj) {
        if (k === 'buffer') {
          obj[k] = 'data buffer';
        }
        else {
          if (!obj.hasOwnProperty(k)) {
            continue;
          }

          if (typeof obj[k] === 'object' && obj[k] !== null) {
            eachRecursive(obj[k]);
          }
        }
      }
    }

    eachRecursive(meta);

    return meta;
  });

  return rewriters;
}

/**
 * Configures the logger and transports to be used.
 * Syslog is disabled if PRODUCTION flag is anything but true.
 *
 * Express specific loggers are also initialized.
 */
export function configLogger(config) {
  const transports = getTransports(config);
  const rewriters = getRewriters();
  winston = new Winston.Logger({
    transports: transports,
    rewriters: rewriters,
    exitOnError: false
  });

  winston.setLevels({emerg: 7, alert: 6, crit: 5, error: 4, warning: 3, notice: 2, info: 1, debug: 0});

  return expressLoggers();
}
