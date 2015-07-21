'use strict';

/**
 * @file
 * Custom logger to be used on DBC hosted node applications.
 */

import * as logger from './lib/logger.js';

let expressLoggers = null;

export default class Logger {
  constructor(config) {
    expressLoggers = logger.configLogger(config);
  }

  log(level, messge, data = null) {
    logger.doLog(level, messge, data);
  }

  debug(messge, data = null) {
    logger.doLog('debug', messge, data);
  }

  info(messge, data = null) {
    logger.doLog('info', messge, data);
  }

  notice(messge, data = null) {
    logger.doLog('notice', messge, data);
  }

  warning(messge, data = null) {
    logger.doLog('warning', messge, data);
  }

  error(messge, data = null) {
    logger.doLog('error', messge, data);
  }

  getExpressLoggers() {
    return expressLoggers;
  }
}
