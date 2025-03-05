# winston-3-log-and-exit

An extension for Winston 3 that ensures all transports flush before the process exits.

## Installation

```sh
npm install winston-3-log-and-exit
```

## Usage

This package extends Winston's loggers by adding the `logAndExit` function, which ensures all transports complete logging before the process exits.

### Basic Example

```javascript
const winston = require("winston");
require("winston-3-log-and-exit");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' }),
    ],
});

process.on("uncaughtException", (err) => {
    logger.logAndExit("error", `Uncaught Exception: ${err.message}`, { // This message will be included in the log files
        name: err.name,
        stack: err.stack
    }, 1);
});

process.on("unhandledRejection", (reason, promise) => {
    logger.logAndExit("error", `Unhandled Promise Rejection: ${reason}`, { // This message will be included in the log files
        stack: reason.stack,
        promise: promise,
    }, 1);
});

setTimeout(() => {
    throw new Error("Test error");
}, 2000);
```

## License

MIT
