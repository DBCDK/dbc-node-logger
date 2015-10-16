# dbc-node-logger
[![David](https://img.shields.io/david/DBCDK/dbc-node-logger.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-logger#info=dependencies)
[![David](https://img.shields.io/david/dev/DBCDK/dbc-node-logger.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-logger#info=devDependencies)

Logger module intendted to be used within the DBC A/S organisation. If, however, anyone find it relevant feel free to use the module.
The module is based on the [Winston module](https://www.npmjs.com/package/winston) which is used for basic logging but it also provides logging for expess using [express-winston](https://www.npmjs.com/package/express-winston) and logging to the New Relic service. 

## Example
Implementatin exmaple:

```javascript
import Logger from 'dbc-node-logger';

const logger = new Logger({app_name: 'My App'});
logger.log('info', 'hello world', somedata);
```

## Transports
Several different transports are used by the logger:
- Console: Sends the log to the console if the log level is set to `debug`
- File: Logs to the file `log.log` placed in the same directory as the application is started from. This transport is silenced in production.
- Syslog: Logs to the local syslog
- Kafka: If both `KAFKA_TOPIC` and `KAFKA_HOST` is set (see below) the Kafka transport will be initialized and used logging everythinh below the `error` level.

## Environment Varibles
The following environment variables are defined in this module.

- __KAFKA_TOPIC__  
This defines which topic in Kafka the log messages should be associated with 

- __KAFKA_HOST__  
String that defines the Zookeeper connectionstring. Should be defined as `host:port`.  
see [winston-kafka-transport](https://www.npmjs.com/package/winston-kafka-transport)

## Documentation
The Logger can be instantiated with a object defining a few settings. If no object is given the below default values will be used.

If the production flag is set everything goes to Syslog as JSON otherwise it goes to the console prettyprinted. Highest level when logging to console is `error` while on Syslog it is `emerg`.  
 
### Instance parameters
__app_name (string, optional)__  
defaults to my_app  
The app_name field is used when logging to Syslog where the application will appear wth name given in app_name. If no app_name is given my_app will be used as fallback.

__handleException (boolean, optional)__  
defaults to false see [Handling Uncaught Exceptions with winston](https://www.npmjs.com/package/winston#handling-uncaught-exceptions-with-winston)

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

