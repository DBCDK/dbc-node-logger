'use strict';

/**
 * @file
 * Custom logger to be used on DBC hosted node applications.
 */

import * as logger from './lib/logger.js';

let expressLoggers = null;
let isInitialized = false;

/**
 *
 */
export default class Logger {
  constructor(config = {}) {
    expressLoggers = logger.configLogger(config);
    isInitialized = true;
  }

  log(level, message, data = null) {
    logger.doLog(level, message, data);
  }

  /**
   * Logs an debug message
   * @param {String} message
   * @param {Object} data
   */
  debug(message, data = null) {
    logger.doLog('debug', message, data);
  }

  /**
   * Logs an info message
   * @param {String} message
   * @param {Object} data
   */
  info(message, data = null) {
    logger.doLog('info', message, data);
  }

  /**
   * Logs a notice message
   * @param {String} message
   * @param {Object} data
   */
  notice(message, data = null) {
    logger.doLog('notice', message, data);
  }

  /**
   * @deprecated Since removal of Syslog the warning level has been deprecated
   * in favor of the warn level
   *
   * @param {String} message
   * @param {Object} data
   */
  warning(message, data = null) {
    logger.doLog('warning', message, data);
  }

  /**
   * Logs an error message
   * @param {String} message
   * @param {Object} data
   */
  error(message, data = null) {
    logger.doLog('error', message, data);
  }

  /**
   * Logs a critical message
   * @param {String} message
   * @param {Object} data
   */
  crit(message, data = null) {
    logger.doLog('crit', message, data);
  }

  /**
   * Logs an alert message
   * @param {String} message
   * @param {Object} data
   */
  alert(message, data = null) {
    logger.doLog('alert', message, data);
  }

  /**
   * Returns loggers to be used as middleware in express.
   *
   * @return {*}
   */
  getExpressLoggers() {
    return expressLoggers;
  }
}

/**
 * Logs a debug message
 * @param {String} message
 * @param {Object} data
 */
export function debug(message, data = null) {
  if (isInitialized) {
    logger.doLog('debug', message, data);
  }
}

/**
 * Logs an info message
 * @param {String} message
 * @param {Object} data
 */
export function info(message, data = null) {
  if (isInitialized) {
    logger.doLog('info', message, data);
  }
}

/**
 * Logs a notice message
 * @param {String} message
 * @param {Object} data
 */
export function notice(message, data = null) {
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
export function warning(message, data = null) {
  if (isInitialized) {
    logger.doLog('warning', message, data);
  }
}

/**
 * Logs an error message
 * @param {String} message
 * @param {Object} data
 */
export function error(message, data = null) {
  if (isInitialized) {
    logger.doLog('error', message, data);
  }
}
