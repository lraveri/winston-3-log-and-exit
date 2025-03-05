const winston = require("winston");

winston.Logger.prototype.logAndExit = function (level, msg, meta = {}, code_or_callback) {

    const transports = this.transports;
    if (!transports || !transports.length === 0) {
        process.exit(code_or_callback || 1);
    }

    const logData = {
        message: msg,
        ...meta,
    };

    let completedTransports = 0;
    const totalTransports = transports.length;
    let hasErrorOccurred = false;

    function checkExitCondition() {
        if (completedTransports === totalTransports && !hasErrorOccurred) {
            if (typeof code_or_callback === 'function') {
                code_or_callback();
            } else {
                process.exit(typeof code_or_callback === 'number' ? code_or_callback : 1);
            }
        }
    }

    transports.forEach((transport) => {
        transport.once('logged', () => {
            completedTransports++;
            checkExitCondition();
        });

        transport.once('warn', (error) => {
            hasErrorOccurred = true;
            process.exit(1);
        });
    });

    this.log(level, logData);
};
