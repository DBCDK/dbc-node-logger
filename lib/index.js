'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = undefined;
exports.setInfo = setInfo;
exports.getCurrentLogLevel = getCurrentLogLevel;

var _os = require('os');

const PRETTY_PRINT = process.env.PRETTY_LOG === '1' ? 2 : null; // eslint-disable-line no-process-env
let info = null;
/**
 * Set additional info that should be visible in log messages
 *
 * @param {object} additionalInfo
 */
function setInfo(additionalInfo) {
  if (typeof additionalInfo !== 'object' || Array.isArray(additionalInfo)) {
    throw new Error('Object was expected but got something else');
  }

  info = Object.assign(additionalInfo, {});
}

const log = exports.log = {
  log: doLog,
  info: (msg, args) => doLog('info', msg, args),
  warn: (msg, args) => doLog('warn', msg, args),
  error: (msg, args) => doLog('error', msg, args),
  debug: (msg, args) => doLog('debug', msg, args),
  trace: (msg, args) => doLog('trace', msg, args)
};

/**
 * @returns current log level
 */
function getCurrentLogLevel() {
  return process.env.LOG_LEVEL || 'INFO'; // eslint-disable-line no-process-env
}

/**
 * Convert a log level name to a corresponding numerical value
 *
 * @param logLevel log level to convert
 * @returns numerical log level
 */
function getNumericalLogLevel(logLevel) {
  const logLevels = {
    OFF: 0,
    ERROR: 1,
    WARN: 2,
    WARNING: 2,
    INFO: 3,
    DEBUG: 4,
    TRACE: 5
  };

  return logLevels[logLevel.toUpperCase()];
}

/**
 * Log as JSON to stdout
 *
 * @param {string} level log level
 * @param {string} msg message to log
 * @param {object} args map of additional key/values to log
 */
function doLog(level, msg, args = {}) {
  const currentNumericalLogLevel = getNumericalLogLevel(getCurrentLogLevel());
  const targetNumericalLogLevel = getNumericalLogLevel(level);

  if (currentNumericalLogLevel < targetNumericalLogLevel) {
    return; // level low, do nothing
  }

  const blob = {
    '@timestamp': new Date().toISOString(),
    '@version': 1,
    level: level.toUpperCase(),
    host: (0, _os.hostname)(),
    pid: process.pid,
    env: process.env.NODE_ENV || 'development' // eslint-disable-line no-process-env
  };

  if (info) {
    Object.assign(blob, info);
  }

  if (msg) {
    blob.message = msg;
  }

  console.log(JSON.stringify(Object.assign(blob, args), null, PRETTY_PRINT)); // eslint-disable-line no-console
}
