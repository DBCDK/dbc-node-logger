# dbc-node-logger

[![Build Status](https://travis-ci.org/DBCDK/dbc-node-logger.svg?branch=master)](https://travis-ci.org/DBCDK/dbc-node-logger)

**Please beware that this is version 2+ which is completely incompatible with version 1.x which has been branched to the [version-1.x branch](https://github.com/DBCDK/dbc-node-logger/tree/version-1.x)**

Logger module intendted to be used within the DBC A/S organisation but is free for anyone to use.

## Example

Implementatin exmaple:
See implementation in https://github.com/DBCDK/dbc-ufo for an example of usage.

```javascript
import { log } from "dbc-node-logger";

log.log("info", "hello world", { additional: "data" });

// OR

log.info("hello world", { additional: "data" });
log.error("hello world", { additional: "data" });
// ETC...
```

## Environment Varibles

The following environment variables are defined in this module.

- **LOG_LEVEL** - defaults to 'INFO'  
  Defines the severity level spanning from `OFF` (0) to `TRACE` (5). The following levels are available:
  `OFF`, `ERROR`, `WARN` (or `WARNING`), `INFO`, `DEBUG` and `TRACE`

- **PRETTY_LOG** - defaults to `0`  
  If set to `1` (`PRETTY_LOG=1`) the log statements will be formatted with indentation and linebreaks for easier reading. Otherwise each statement will kept as on a single line.

## Usage

### Methods & Parameters

The main log method is `log()`. The `trace()`, `info()`, `warn()`, `error()` and `debug()` methods are just convenience methods that abstracts the `level` parameter away.
The `getExpressLoggers()` delivers an object with express-specific loggers.

#### Parameters

In general if the `level` or `message` parameter is undefined an `Error` will be thrown.
The `data` parameter is optional and will only be logged if not undefined.

#### Methods

`import {log} from 'dbc-node-logger';`  
`log.log(level, message, data = {})`  
**level: string** - The severity of the log message  
**message: string** - The log message  
**data: *** - An object containing additional data that might be convenient to log with the message

`log.trace(message, data = {})`  
See `log()` method

`log.info(message, data = {})`  
See `log()` method

`log.warn(message, data = {})`  
See `log()` method

`log.error(message, data = {})`  
See `log()` method

`log.debug(message, data = {})`  
See `log()` method

## Types

#### TypeScript project

import it as usual and the types apply:

```TypeScript
import { log, setInfo, getCurrentLogLevel, type LogLevel } from "dbc-node-logger";

log.info("started", { port: 3000 });
const level: LogLevel = getCurrentLogLevel();
```

#### JavaScript project

nothing changes at runtime, since require/import still load lib/index.js. Editors like VS Code use the types for autocomplete and hover docs automatically.

```JavaScript
const { log } = require("dbc-node-logger");
log.info("started", { port: 3000 }); // autocomplete + signature hints
```

A JS project can also opt in to real type checking:

- Per file: add // @ts-check at the top.
- Whole project: set "checkJs": true in jsconfig.json/tsconfig.json.

JS projects can use the exported types through JSDoc:

```JavaScript
/** @type {import("dbc-node-logger").LogLevel} */
const level = "info";

/** @param {import("dbc-node-logger").Logger} logger */
function doWork(logger) { logger.debug("working"); }
```
