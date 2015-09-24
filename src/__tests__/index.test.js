'use strict';

/**
 * @file
 * Testing the src/index.js file
 */

import {assert} from 'chai';
import Logger from '../index.js';
import sinon from 'sinon';

describe('Test Logger class', () => {

  let sandbox;
  let logger = null;
  let loggerMock;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    logger = new Logger({app_name: 'test_app'});
    loggerMock = sandbox.mock(logger);
  });

  afterEach(() => {
    logger = null;
    sandbox.restore();
  });

  it('Logger can be instatiated wxithout a config object', () => {
    const myLogger = new Logger();
    assert.isObject(myLogger, 'myLogger is an object');
  });

  it('Ensure .log method is defined', () => {
    assert.isDefined(logger.log, '.log method is defined');
  });

  it('Test .log method', () => {
    const expect = loggerMock.expects('log');
    logger.log('a', 'b');
    assert.isTrue(expect.calledOnce);
  });

  it('Ensure .debug method is defined', () => {
    assert.isDefined(logger.debug, '.debug method is defined');
  });

  it('Test .debug method', () => {
    const expect = loggerMock.expects('debug');
    logger.debug('message');
    assert.isTrue(expect.calledOnce);
  });

  it('Ensure .info method is defined', () => {
    assert.isDefined(logger.info, '.info method is defined');
  });

  it('Test .info method', () => {
    const expect = loggerMock.expects('info');
    logger.info('message');
    assert.isTrue(expect.calledOnce);
  });

  it('Ensure .notice method is defined', () => {
    assert.isDefined(logger.notice, '.notice method is defined');
  });

  it('Test .notice method', () => {
    const expect = loggerMock.expects('notice');
    logger.notice('message');
    assert.isTrue(expect.calledOnce);
  });

  it('Ensure .warning method is defined', () => {
    assert.isDefined(logger.warning, '.warning method is defined');
  });

  it('Test .warning method', () => {
    const expect = loggerMock.expects('warning');
    logger.warning('message');
    assert.isTrue(expect.calledOnce);
  });

  it('Ensure .error method is defined', () => {
    assert.isDefined(logger.error, '.error method is defined');
  });

  it('Test .error method', () => {
    const expect = loggerMock.expects('error');
    logger.error('message');
    assert.isTrue(expect.calledOnce);
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
