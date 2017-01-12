# dbc-node-logger

[![Build Status](https://travis-ci.org/DBCDK/dbc-node-logger.svg?branch=master)](https://travis-ci.org/DBCDK/dbc-node-logger)

Logger module intendted to be used within the DBC A/S organisation but is free for anyone to use.

## Example
Implementatin exmaple:

```javascript
import {log} from 'dbc-node-logger';

log.log('info', 'hello world', {additional: 'data'});

// OR

log.info('hello world', {additional: 'data'});
log.error('hello world', {additional: 'data'});
// ETC...
```

## Environment Varibles
The following environment variables are defined in this module.

- __LOG_LEVEL__ - defaults to 'INFO'   
Defines the severity level spanning from `OFF` (0) to `TRACE` (5). The following levels are available:
`OFF`, `ERROR`, `WARN` (or `WARNING`), `INFO`, `DEBUG`, `TRACE`. 

- __PRETTY_LOG__ - defaults to '0'
If set to `1` (`PRETTY_LOG=1`) the logstatements will be formatted with indentation and linebreaks. Otherwise each statement will kept as a singleliner.

## Documentation
The Logger can be instantiated with a object defining a few settings. If no object is given the below default values will be used.  

### Methods & Parameters

The main log method is `log()`. The `info()`, `debug()`, `notice()`, `warning()` and `error()` methods are just convenience methods that abstracts the `level` parameter away.
The `getExpressLoggers()` delivers an object with express-specific loggers. 

#### Parameters 
In general if the `level` or `message` parameter is undefined an `Error` will be thrown.
The `data` parameter is optional and will only be logged if not undefined.

#### Methods  
`log(level, message, data = {})`  
__level: string__ - The severity of the log message, see [winston-syslog](https://github.com/winstonjs/winston-syslog#log-levels) for more info  
__message: string__ - The logmessage  
__data: *__ - Any kind of data is accepted and will be wrapped in an object with the following format `{data: YOUR_DATA}`.

`info(message, data = {})`  
See `log()` method

`debug(message, data = {})`  
See `log()` method

`notice(message, data = {})`  
See `log()` method

`warning(message, data = {})`  
See `log()` method

`error(message, data = {})`  
See `log()` method

`getExpressLoggers()`  
Returns an object with to paramters on: logger and errorLogger.  
The two loggers are based on [express-winston](https://www.npmjs.com/package/express-winston) and are thought to be used as logger middleware in your express application.  
Both loggers will log to Syslog when production flag is set but only the errorLogger logs to console to avoid developers consoles to be flooded.

