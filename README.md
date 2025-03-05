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
const winston = require("winston-3-log-and-exit");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" })
  ]
});

logger.logAndExit("error", "Something went wrong", {}, 1); // Ensures the message is logged before the process exits
process.exit(1);
```

### Handling Uncaught Exceptions and Unhandled Rejections

You can use `logAndExit` to gracefully log and terminate the process on uncaught exceptions and unhandled promise rejections:

```javascript
const winston = require("winston-3-log-and-exit");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" })
  ]
});

// Exception handler
process.on("uncaughtException", (err) => {
  logger.logAndExit("error", `Uncaught Exception: ${err.message}`, {
    name: err.name,
    stack: err.stack,
    code: err.code,
  }, 1);
});

// Unhandled Promise Rejection handler
process.on("unhandledRejection", (reason, promise) => {
  logger.logAndExit("error", `Unhandled Promise Rejection: ${reason}`, {
    stack: reason.stack || "No stack trace",
    promise: promise,
  }, 1);
});
```

## License

MIT