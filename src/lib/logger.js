'use strict';

import Winston from 'winston';
import expressWinston from 'express-winston';
import {Syslog} from 'winston-syslog'; // eslint-disable-line no-unused-vars
// import kafkaTransport from 'winston-kafka-transport'; // eslint-disable-line
import os from 'os';

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
    }),

    new Winston.transports.Syslog({
      silent: false,
      protocol: 'udp4',
      localhost: os.hostname(),
      app_name: appName,
      json: true,
      timestamp: true,
      handleExceptions: true
    })
  ];
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
    logger: expressWinston.logger({
      winstonInstance: winston
    }),
    errorLogger: expressWinston.errorLogger({
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
export function configLogger(config) {
  const transports = getTransports(config);
  winston = new Winston.Logger({
    transports: transports,
    exitOnError: false
  });

  winston.setLevels(Winston.config.syslog.levels); // see level at https://github.com/winstonjs/winston-syslog#log-levels

  if (PRODUCTION) {
    winston.debug('This application is started with the PRODUCTION flag set, meaning that most logging will go to syslog.');
  }
  return expressLoggers();
}
