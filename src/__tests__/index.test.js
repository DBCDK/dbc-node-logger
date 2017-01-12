/**
 * @file
 * Testing the src/index.js file
 */

import {assert} from 'chai';
import * as Logger from '../index.js';
import sinon from 'sinon';

describe('Test logger methods', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should throw Error when setInfo is called withut any args', () => {
    assert.throws(Logger.setInfo, Error);
  });

  it('Should throw Error when setInfo is called with array args', () => {
    const func = () => {
      Logger.setInfo([]);
    };

    assert.throws(func, Error);
  });

  it('Should throw Error when setInfo is called with non-object args', () => {
    const func = () => {
      Logger.setInfo('string');
    };

    assert.throws(func, Error);
  });

  it('Should not throw when given an object as argument', () => {
    const func = () => {
      Logger.setInfo({test: 'hest'});
    };

    assert.doesNotThrow(func, Error);
  });

  it('Should set info field when argument is accepted', () => {
    Logger.setInfo({test: 'hest'});
    const spy = sandbox.spy(console, 'log');
    Logger.log.log('info', 'test message');
    assert.isTrue(spy.args.toString().includes('"test":"hest"'), 'Values set in setInfo method is present in log output');
  });

  it('Should log a message on the INFO level', () => {
    const spy = sandbox.spy(console, 'log');

    const logMsg = 'this is a log message ';
    const level = 'INFO';
    Logger.log.log('info', logMsg);
    const args = JSON.parse(spy.args);

    assert.equal(args.msg, logMsg);
    assert.equal(args.level, level);
  });

  it('Should log a message on each of the levels specified', () => {
    const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG', 'TRACE'];

    levels.forEach((level) => {
      const spy = sandbox.spy(console, 'log');
      const logMsg = `this is an ${level} messge`;
      const method = level.toLowerCase();
      Logger.log[method](logMsg);
      let args = null;
      try {
        args = JSON.parse(spy.args);
      }
      catch (e) {
        console.error('Could not parse args', spy.args, level, process.env.LOG_LEVEL); // eslint-disable-line no-console
      }

      assert.equal(args.msg, logMsg);
      assert.equal(args.level, level, `Log statement with ${level} was found`);
      sandbox.restore();
    });
  });
});
