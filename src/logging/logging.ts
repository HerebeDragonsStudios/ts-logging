import {DEFAULT_TIMESTAMP_FORMAT, LOGGER_LEVELS, LOGGING_MSG} from "./constants";
import {formatDate, stringFormat} from "./utils";

/**
 * @typedef LoggerMessage
 * @memberOf logging.logging
 */
export type LoggerMessage = Error | string;

/**
 * @interface Logger
 * @memberOf logging.logging
 */
export interface Logger {
    /**
     * Reports a message
     * @param {LoggerMessage} message
     * @param {number} level
     * @param {any} [issuer] the Object/process that reports the message
     * @param {any[]} [args]
     *
     * @memberOf Logger
     */
    report(message: LoggerMessage, level: number, issuer: any, ...args: any[]): void;
    /**
     * {@link Logger#report}s a message under {@link LOGGER_LEVELS.ALL}
     * @param {LoggerMessage} message
     * @param {any[]} [args]
     *
     * @memberOf Logger
     */
    all(message: LoggerMessage, ...args: any[]): void;
    /**
     * {@link Logger#report}s a message under {@link LOGGER_LEVELS.INFO}
     * @param {LoggerMessage} message
     * @param {any[]} [args]
     *
     * @memberOf Logger
     */
    info(message: LoggerMessage, ...args: any[]): void;
    /**
     * {@link Logger#report}s a message under {@link LOGGER_LEVELS.DEBUG}
     * @param {LoggerMessage} message
     * @param {any[]} [args]
     *
     * @memberOf Logger
     */
    debug(message: LoggerMessage, ...args: any[]): void;
    /**
     * {@link Logger#report}s a message under {@link LOGGER_LEVELS.WARN}
     * @param {LoggerMessage} message
     * @param {any[]} [args]
     *
     * @memberOf Logger
     */
    warn(message: LoggerMessage, ...args: any[]): void;
    /**
     * {@link Logger#report}s a message under {@link LOGGER_LEVELS.ERROR}
     * @param {LoggerMessage} message
     * @param {any[]} [args]
     *
     * @memberOf Logger
     */
    error(message: LoggerMessage, ...args: any[]): void;
    /**
     * {@link Logger#report}s a message under {@link LOGGER_LEVELS.CRITICAL}
     * @param {LoggerMessage} message
     * @param {any[]} [args]
     *
     * @memberOf Logger
     */
    critical(message: LoggerMessage, ...args: any[]): void;
    /**
     * Defines the Logger level
     *
     * @param {number} level
     * @param {any[]} args
     *
     * @memberOf Logger
     */
    setLevel(level: number, ...args: any[]): void;
}

/**
 * Default Logger Implementation
 *
 * @param {number} defaultLevel defaults to {@link LOGGER_LEVELS.INFO}
 * @param {boolean} useTimestamp defaults to true
 * @param {boolean} logLevel
 * @param {boolean} logStackTrace
 * @param {string} timestampFormat
 *
 * @class LoggerImp
 * @implements Logger
 */
export class LoggerImp implements Logger {
    private level: number;

    private readonly useTimestamp: boolean;
    private readonly logLevel: boolean;
    private readonly timestampFormat: string;
    private readonly logStackTrace: boolean;

    constructor(defaultLevel: number = LOGGER_LEVELS.INFO, useTimestamp = true, logLevel: boolean = true, logStackTrace: boolean = false, timestampFormat = DEFAULT_TIMESTAMP_FORMAT){
        this.level = defaultLevel;
        this.useTimestamp = useTimestamp;
        this.logLevel = logLevel;
        this.logStackTrace = logStackTrace;
        this.timestampFormat = timestampFormat;
    }

    /**
     * Builts the actual logging message
     * @param {LoggerMessage} message
     * @param {number} logLevel if the level is to be logged
     * @param {any} issuer who is logging the message
     * @param {any[]} args
     * @protected
     */
    protected buildMessage(message: LoggerMessage, logLevel: number, issuer: any = undefined, ...args: any[]){
        if (message instanceof Error)
            message = message.message;

        if (this.logLevel)
            message = `[${Object.keys(LOGGER_LEVELS)[logLevel]}] - ${message}`;
        if (issuer)
            message = `[${issuer.toString()}]${message}`;
        if (this.useTimestamp)
            message = `[${formatDate(new Date(), this.timestampFormat)}]${message}`;
        return stringFormat(message, ...args);
    }

    /**
     *
     * @param {LoggerMessage} message
     * @param {number} level defaults to {@link LOGGER_LEVELS.INFO}
     * @param {any} [issuer] the object that is calling the report method
     * @param {any[]} [args] values to replace in the message according to the '{0}' notation
     */
    report(message: LoggerMessage, level: number = LOGGER_LEVELS.INFO, issuer: any = undefined, ...args: any[]) : void {
        if (level < this.level)
            return;

        let reportMethod: Function;
        switch (level){
            case LOGGER_LEVELS.WARN:
                reportMethod = console.warn;
                break;
            case LOGGER_LEVELS.ERROR:
            case LOGGER_LEVELS.CRITICAL:
                reportMethod = console.error;
                break;
            case LOGGER_LEVELS.INFO:
            case LOGGER_LEVELS.DEBUG:
            case LOGGER_LEVELS.ALL:
            default:
                reportMethod = console.log;
                break;
        }

        let finalMessage = this.buildMessage(message, level, issuer, ...args);
        reportMethod(finalMessage);

        if (message instanceof Error && message.stack && this.logStackTrace)
            reportMethod(this.buildMessage(`\n-- StackStrace:\n{0}`, level, issuer, message.stack));
    }

    /**
     * @inheritDoc
     */
    info(message: LoggerMessage, issuer: any = undefined, ...args: any[]): void {
        this.report(message, LOGGER_LEVELS.INFO, issuer, ...args);
    }
    /**
     * @inheritDoc
     */
    all(message: LoggerMessage, issuer: any = undefined, ...args: any[]): void {
        this.report(message, LOGGER_LEVELS.ALL, issuer, ...args);
    }
    /**
     * @inheritDoc
     */
    debug(message: LoggerMessage, issuer: any = undefined, ...args: any[]): void {
        this.report(message, LOGGER_LEVELS.DEBUG, issuer, ...args);
    }
    /**
     * @inheritDoc
     */
    warn(message: LoggerMessage, issuer: any = undefined, ...args: any[]): void {
        this.report(message, LOGGER_LEVELS.WARN, issuer, ...args);
    }
    /**
     * @inheritDoc
     */
    error(message: LoggerMessage, issuer: any = undefined, ...args: any[]): void {
        this.report(message, LOGGER_LEVELS.ERROR, issuer, ...args);
    }
    /**
     * @inheritDoc
     */
    critical(message: LoggerMessage, issuer: any = undefined, ...args: any[]): void {
        this.report(message, LOGGER_LEVELS.CRITICAL, issuer, ...args);
    }
    /**
     * @inheritDoc
     */
    setLevel(level: number): void {
        this.debug(stringFormat(LOGGING_MSG.LEVEL_CHANGED, this.level.toString(), level.toString()));
        this.level = level;
    }
}

let currentLogger: Logger;

/**
 * gets the current Logger
 *
 * @function getLogger
 *
 * @memberOf db-decorators.logging
 */
export function getLogger(){
    if (!currentLogger)
        currentLogger = new LoggerImp();
    return currentLogger;
}

/**
 * Sets the logger
 *
 * @param {Logger} logger
 *
 * @function setLogger
 *
 * @memberOf db-decorators.logging
 */
export function setLogger(logger: Logger){
    currentLogger = logger;
    getLogger().debug(LOGGING_MSG.LOGGER_CHANGED);
}

/**
 * Reports a message to the logger under the level {@link LOGGER_LEVELS.INFO}
 * @param {LoggerMessage} message
 * @param {any[]} args
 *
 * @function info
 *
 * @memberOf db-decorators.logging
 */
export const info = function(this: any, message: LoggerMessage, ...args: any[]) {
    getLogger().info(message, this, ...args);
}
/**
 * Reports a message to the logger under the level {@link LOGGER_LEVELS.ALL}
 * @param {LoggerMessage} message
 * @param {any[]} args
 *
 * @function all
 *
 * @memberOf db-decorators.logging
 */
export const all = function(this: any, message: LoggerMessage, ...args: any[]) {
    getLogger().all(message, this, ...args);
}
/**
 * Reports a message to the logger under the level {@link LOGGER_LEVELS.DEBUG}
 * @param {LoggerMessage} message
 * @param {any[]} args
 *
 * @function debug
 *
 * @memberOf db-decorators.logging
 */
export const debug = function(this: any, message: LoggerMessage, ...args: any[]) {
    getLogger().debug(message, this, ...args);
}
/**
 * Reports a message to the logger under the level {@link LOGGER_LEVELS.WARN}
 * @param {LoggerMessage} message
 * @param {any[]} args
 *
 * @function warn
 *
 * @memberOf db-decorators.logging
 */
export const warn = function(this: any, message: LoggerMessage, ...args: any[]) {
    getLogger().warn(message, this, ...args);
}
/**
 * Reports a message to the logger under the level {@link LOGGER_LEVELS.ERROR}
 * @param {LoggerMessage} message
 * @param {any[]} args
 *
 * @function error
 *
 * @memberOf db-decorators.logging
 */
export const error = function(this: any, message: LoggerMessage, ...args: any[]) {
    getLogger().error(message, this, ...args);
}
/**
 * Reports a message to the logger under the level {@link LOGGER_LEVELS.CRITICAL}
 * @param {LoggerMessage} message
 * @param {any[]} args
 *
 * @function critical
 *
 * @memberOf db-decorators.logging
 */
export const critical = function(this: any, message: LoggerMessage, ...args: any[]) {
    getLogger().critical(message, this, ...args);
}