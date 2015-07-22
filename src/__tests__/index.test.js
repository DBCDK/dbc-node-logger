'use strict';

/**
 * @file
 * Testing the src/index.js file
 */

import {expect, assert} from 'chai';
import Logger from '../index.js';
import sinon from 'sinon';
import * as loggerApi from '../lib/logger.js';

describe('Test Logger class', () => {

  let logger = null;
  const doLogSpy = sinon.spy(loggerApi, 'doLog');

  beforeEach(() => {
    logger = new Logger({app_name: 'test_app'});
  });

  it('Logger can be instatiated without a config object', () => {
    const myLogger = new Logger();
    assert.isObject(myLogger, 'myLogger is an object');
  });

  it('Ensure .log method is defined', () => {
    assert.isDefined(logger.log, '.log method is defined');
  });

  it('Test .log method', () => {
    expect(logger.log).to.throw(Error);
    logger.log('a', 'b');
    assert.isTrue(doLogSpy.called, 'doLog method in lib/logger.js was called');
  });

  it('Ensure .debug method is defined', () => {
    assert.isDefined(logger.debug, '.debug method is defined');
  });

  it('Test .debug method', () => {
    expect(logger.debug).to.throw(Error);
    logger.debug('message');
    assert.isTrue(doLogSpy.called, 'doLog method in lib/logger.js was called');
  });

  it('Ensure .info method is defined', () => {
    assert.isDefined(logger.info, '.info method is defined');
  });

  it('Test .info method', () => {
    expect(logger.info).to.throw(Error);
    logger.info('message');
    assert.isTrue(doLogSpy.called, 'doLog method in lib/logger.js was called');
  });

  it('Ensure .notice method is defined', () => {
    assert.isDefined(logger.notice, '.notice method is defined');
  });

  it('Test .notice method', () => {
    expect(logger.notice).to.throw(Error);
    logger.notice('message');
    assert.isTrue(doLogSpy.called, 'doLog method in lib/logger.js was called');
  });

  it('Ensure .warning method is defined', () => {
    assert.isDefined(logger.warning, '.warning method is defined');
  });

  it('Test .warning method', () => {
    expect(logger.warning).to.throw(Error);
    logger.warning('message');
    assert.isTrue(doLogSpy.called, 'doLog method in lib/logger.js was called');
  });

  it('Ensure .error method is defined', () => {
    assert.isDefined(logger.error, '.error method is defined');
  });

  it('Test .error method', () => {
    expect(logger.error).to.throw(Error);
    logger.error('message');
    assert.isTrue(doLogSpy.called, 'doLog method in lib/logger.js was called');
  });

  it('Ensure .getExpressLoggers method is defined', () => {
    assert.isDefined(logger.getExpressLoggers, '.getExpressLoggers method is defined');
  });

  it('Test .getExpressLogers method', () => {
    const expressLoggers = logger.getExpressLoggers();
    assert.isObject(expressLoggers, 'Got object as expected');

    assert.isFunction(expressLoggers.logger, 'logger is function');
    assert.isFunction(expressLoggers.errorLogger, 'errorLogger is function');
  });
});
