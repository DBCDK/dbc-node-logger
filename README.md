# dbc-node-logger

[![David](https://img.shields.io/david/DBCDK/dbc-node-logger.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-logger#info=dependencies)
[![David](https://img.shields.io/david/dev/DBCDK/dbc-node-logger.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-logger#info=devDependencies)

Logger module intendted to be used within the DBC A/S organisation. If, however, anyone find it relevant feel free to use the module.
The module is based on the [Winston module](https://www.npmjs.com/package/winston) which is used for basic logging but it also provides logging for expess using [express-winston](https://www.npmjs.com/package/express-winston) and logging to the New Relic service. 

## example

```
'use strict';
import Logger from 'dbc-node-logger';

const logger = new Logger({app_name: 'My App'});
```
 The app_name field is used when logging to Syslog where the application will appear wth name given in app_name. If no app_name is given my_app will be used as fallback.

## documentation
app_name
handleException - defaults to false see [Handling Uncaught Exceptions with winston](https://www.npmjs.com/package/winston#handling-uncaught-exceptions-with-winston)

### methods


