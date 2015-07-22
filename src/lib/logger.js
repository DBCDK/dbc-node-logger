'use strict';

import Winston from 'winston';
import expressWinston from 'express-winston';
import {Syslog} from 'winston-syslog'; // eslint-disable-line no-unused-vars

import os from 'os';

const PRODUCTION = (process.env.NODE_ENV === 'production'); // eslint-disable-line no-process-env

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
    throw new Error('Level or message is undefined - both should be defined - i.e. logger.log(\'level\', \'message\');');
  }

  winston.log(level, message, dataToLog);
}

function getTransports(config) {
  return {
    console: new Winston.transports.Console({
      silent: PRODUCTION,
      level: 'debug',
      colorize: true,
      prettyPrint: true,
      handleExceptions: config.handleExceptions || false
    }),

    syslog: new Winston.transports.Syslog({
      silent: !PRODUCTION,
      protocol: 'udp4',
      localhost: os.hostname(),
      app_name: config.appName || 'my_app',
      json: true,
      timestamp: true,
      level: 'emerg',
      handleExceptions: config.handleExceptions || false
    })
  };
}

function expressLoggers(transports) {
  return {
    logger: expressWinston.logger({
      transports: [transports.syslog]
    }),
    errorLogger: expressWinston.errorLogger({
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
export function configLogger(config) {
  const transports = getTransports(config);
  winston = new Winston.Logger({
    transports: [transports.console, transports.syslog],
    exitOnError: false
  });

  winston.setLevels(Winston.config.syslog.levels); // see level at https://github.com/winstonjs/winston-syslog#log-levels
  return expressLoggers(transports);
}
