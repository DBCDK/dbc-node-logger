const babel = require('babel-core');

module.exports = function(wallaby) {
  return {
    files: [
      'package.json',
      'src/**/*.js',
      '!src/**/*.test.js'
    ],

    tests: [
      'src/**/*.test.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: babel
      })
    },

    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: // @see https://wallabyjs.com/docs/config/runner.html
        'LOG_LEVEL=TRACE;'
      }
    },

    testFramework: 'mocha@2.1.0'
  };
};
