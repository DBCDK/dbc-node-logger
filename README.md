# dbc-node-logger
[![David](https://img.shields.io/david/DBCDK/dbc-node-logger.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-logger#info=dependencies)
[![David](https://img.shields.io/david/dev/DBCDK/dbc-node-logger.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-logger#info=devDependencies)

Logger module intendted to be used within the DBC A/S organisation. If, however, anyone find it relevant feel free to use the module.
The module is based on the [Winston module](https://www.npmjs.com/package/winston) which is used for basic logging but it also provides logging for expess using [express-winston](https://www.npmjs.com/package/express-winston) and logging to the New Relic service. 

## example
Implementatin exmaple:

```
import Logger from 'dbc-node-logger';

const logger = new Logger({app_name: 'My App'});
logger.log('info', 'hello world', somedata);
```

## documentation
The Logger can be instantiated with a object defining a few settings. If no object is given the below default values will be used.

If production flag is set everything goes to Syslog as JSON otherwise it goes to the console prettyprinted. Highest level when logging to console is error while on Syslog it is emerg.  
Main log method. If production flag is set everyhing 
 
### Instance parameters
__app_name (string, optional)__
defaults to my_app
The app_name field is used when logging to Syslog where the application will appear wth name given in app_name. If no app_name is given my_app will be used as fallback.

__handleException (boolean, optional)__
defaults to false see [Handling Uncaught Exceptions with winston](https://www.npmjs.com/package/winston#handling-uncaught-exceptions-with-winston)

### methods

In general if the level or message parameter is undefined an Error will be thrown.
The data is optional and will only be logged if defined.

__log(level, message, data = {})__
_level: string_ The severity of the log message, see [winston-syslog](https://github.com/winstonjs/winston-syslog#log-levels) for more info
_message: string_ The logmessage 
_data:*_ Any kind of data that should be logged with the above message. Any data given will be wrappen in an object with the following format `{data: YOUR_DATA}`.



__info(message, data = {})__

__debug(message, data = {})__

__notice(message, data = {})__

__warning(message, data = {})__

__error(message, data = {})__

__getExpressLoggers()__
Returns an object with to paramters on: logger and errorLogger.
The two loggers are based on [express-winston](https://www.npmjs.com/package/express-winston) and are thought to be used as logger middleware in your express application.
Both loggers will log to Syslog when production flag is set but only the errorLogger logs to console to avoid developers consoles to be flooded.

