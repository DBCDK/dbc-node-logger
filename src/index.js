'use strict';

/**
 * @file
 * Custom logger to be used on DBC hosted node applications.
 */

import * as logger from './lib/logger.js';

let expressLoggers = null;
let isInitialized = false;

export default class Logger {
  constructor(config = {}) {
    expressLoggers = logger.configLogger(config);
    isInitialized = true;
  }

  log(level, message, data = null) {
    logger.doLog(level, message, data);
  }

  debug(message, data = null) {
    logger.doLog('debug', message, data);
  }

  info(message, data = null) {
    logger.doLog('info', message, data);
  }

  notice(message, data = null) {
    logger.doLog('notice', message, data);
  }

  warning(message, data = null) {
    logger.doLog('warning', message, data);
  }

  error(message, data = null) {
    logger.doLog('error', message, data);
  }

  getExpressLoggers() {
    return expressLoggers;
  }
}

export function debug(message, data = null) {
  if (isInitialized) {
    logger.doLog('debug', message, data);
  }
}

export function info(message, data = null) {
  if (isInitialized) {
    logger.doLog('info', message, data);
  }
}

export function notice(message, data = null) {
  if (isInitialized) {
    logger.doLog('notice', message, data);
  }
}

export function warning(message, data = null) {
  if (isInitialized) {
    logger.doLog('warning', message, data);
  }
}

export function error(message, data = null) {
  if (isInitialized) {
    logger.doLog('error', message, data);
  }
}
