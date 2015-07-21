'use strict';

import winston from 'winston';
import expressWinston from 'express-winston';
import {Syslog} from 'winston-syslog'; // eslint-disable-line no-unused-vars

import os from 'os';

const PRODUCTION = (process.env.NODE_ENV === 'production'); // eslint-disable-line no-process-env

let logger = null;

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
  logger.log(level, message, dataToLog);
}

function getTransports(config) {
  return {
    console: new winston.transports.Console({
      silent: PRODUCTION,
      level: 'debug',
      colorize: true,
      prettyPrint: true,
      handleExceptions: true
    }),

    syslog: new winston.transports.Syslog({
      silent: !PRODUCTION,
      protocol: 'udp4',
      localhost: os.hostname(),
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
  logger = new winston.Logger({
    transports: [transports.console, transports.syslog],
    exitOnError: false
  });

  logger.setLevels(winston.config.syslog.levels); // see level at https://github.com/winstonjs/winston-syslog#log-levels
  return expressLoggers(transports);
}
