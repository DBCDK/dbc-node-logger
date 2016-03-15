'use strict';

/**
 * @file
 * Testing the src/index.js file
 */

var _chai = require('chai');

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Test Logger class', function () {

  var sandbox = void 0;
  var logger = null;
  var loggerMock = void 0;

  beforeEach(function () {
    sandbox = _sinon2.default.sandbox.create();
    logger = new _index2.default({ app_name: 'test_app' });
    loggerMock = sandbox.mock(logger);
  });

  afterEach(function () {
    logger = null;
    sandbox.restore();
  });

  it('Logger can be instatiated without a config object', function () {
    var myLogger = new _index2.default();
    _chai.assert.isObject(myLogger, 'myLogger is an object');
  });

  it('Ensure .log method is defined', function () {
    _chai.assert.isDefined(logger.log, '.log method is defined');
  });

  it('Test .log method', function () {
    var expect = loggerMock.expects('log');
    logger.log('a', 'b');
    _chai.assert.isTrue(expect.calledOnce);
  });

  it('Ensure .debug method is defined', function () {
    _chai.assert.isDefined(logger.debug, '.debug method is defined');
  });

  it('Test .debug method', function () {
    var expect = loggerMock.expects('debug');
    logger.debug('message');
    _chai.assert.isTrue(expect.calledOnce);
  });

  it('Ensure .info method is defined', function () {
    _chai.assert.isDefined(logger.info, '.info method is defined');
  });

  it('Test .info method', function () {
    var expect = loggerMock.expects('info');
    logger.info('message');
    _chai.assert.isTrue(expect.calledOnce);
  });

  it('Ensure .notice method is defined', function () {
    _chai.assert.isDefined(logger.notice, '.notice method is defined');
  });

  it('Test .notice method', function () {
    var expect = loggerMock.expects('notice');
    logger.notice('message');
    _chai.assert.isTrue(expect.calledOnce);
  });

  it('Ensure .warning method is defined', function () {
    _chai.assert.isDefined(logger.warning, '.warning method is defined');
  });

  it('Test .warning method', function () {
    var expect = loggerMock.expects('warning');
    logger.warning('message');
    _chai.assert.isTrue(expect.calledOnce);
  });

  it('Ensure .error method is defined', function () {
    _chai.assert.isDefined(logger.error, '.error method is defined');
  });

  it('Test .error method', function () {
    var expect = loggerMock.expects('error');
    logger.error('message');
    _chai.assert.isTrue(expect.calledOnce);
  });

  it('Ensure .getExpressLoggers method is defined', function () {
    _chai.assert.isDefined(logger.getExpressLoggers, '.getExpressLoggers method is defined');
  });

  it('Test .getExpressLogers method', function () {
    var expressLoggers = logger.getExpressLoggers();
    _chai.assert.isObject(expressLoggers, 'Got object as expected');

    _chai.assert.isFunction(expressLoggers.logger, 'logger is function');
    _chai.assert.isFunction(expressLoggers.errorLogger, 'errorLogger is function');
  });
});