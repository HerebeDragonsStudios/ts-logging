import {Callback, getLogger, LOGGER_LEVELS, LoggerMessage} from "../logging";

/**
 *
 * @param {string} message
 * @param {number} level
 * @param {Callback} callback
 * @param {any[]} [args]
 *
 * @function loggedCallback
 *
 * @memberOf db-decorators.errors
 */
export function loggedCallback(this: any, message: LoggerMessage, level: number, callback: Callback, ...args: any[]){
    // @ts-ignore
    if (message instanceof Error && message.name === LoggedError.constructor.name && message.loggedAt && message.loggetAt >= level)
        return callback(message);
    const error: LoggedError = new LoggedError(message, this && this.name !== "loggedCallback" ? this : undefined, level, ...args);
    callback(error);
}

/**
 *
 * @param {LoggerMessage} message
 * @param {Callback} callback
 * @param {any[]} [args]
 *
 * @function allCallback
 *
 * @memberOf db-decorators.errors
 */
export function allCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]){
    loggedCallback.call(this, message, LOGGER_LEVELS.ALL, callback, ...args);
}

/**
 *
 * @param {LoggerMessage} message
 * @param {Callback} callback
 * @param {any[]} [args]
 *
 * @function debugCallback
 *
 * @memberOf db-decorators.errors
 */
export function debugCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]){
    loggedCallback.call(this, message, LOGGER_LEVELS.DEBUG, callback, ...args);
}

/**
 *
 * @param {LoggerMessage} message
 * @param {Callback} callback
 * @param {any[]} [args]
 *
 * @function infoCallback
 *
 * @memberOf db-decorators.errors
 */
export function infoCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]){
    loggedCallback.call(this, message, LOGGER_LEVELS.INFO, callback, ...args);
}

/**
 *
 * @param {LoggerMessage} message
 * @param {Callback} callback
 * @param {any[]} [args]
 *
 * @function warningCallback
 *
 * @memberOf db-decorators.errors
 */
export function warningCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]){
    loggedCallback.call(this, message, LOGGER_LEVELS.WARN, callback, ...args);
}

/**
 *
 * @param {LoggerMessage} message
 * @param {Callback} callback
 * @param {any[]} [args]
 *
 * @function errorCallback
 *
 * @memberOf db-decorators.errors
 */
export function errorCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]){
    loggedCallback.call(this, message, LOGGER_LEVELS.ERROR, callback, ...args);
}

/**
 *
 * @param {LoggerMessage} message
 * @param {Callback} callback
 * @param {any[]} [args]
 *
 * @function criticalCallback
 *
 * @memberOf db-decorators.errors
 */
export function criticalCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]){
    loggedCallback.call(this, message, LOGGER_LEVELS.CRITICAL, callback, ...args);
}

/**
 * Wrapper Class for Logged Errors
 * Will trigger a call to the logger if it hasn't been logged before oo if it's being called at a higher level
 *
 * @param {LoggerMessage} error
 * @param {any} [issuer]
 * @param {number} level defaults to {@link LOGGER_LEVELS.ERROR}
 * @param {any[]} [args] arguments to be passed as replacements to the logger
 *
 * @class LoggedError
 * @extends Error
 *
 */
export class LoggedError extends Error {
    /**
     * @property {number} logged
     */
    loggedAt?: number;
    issuer?: any;

    constructor(error: LoggerMessage, issuer: any = undefined, level: number = LOGGER_LEVELS.ALL, ...args: any[]) {
        super(error instanceof Error ? error.message : error);
        this.name = LoggedError.constructor.name;
        // @ts-ignore
        this.loggedAt = error instanceof Error && error.name === LoggedError.constructor.name ? error.loggedAt : undefined;
        this.issuer = issuer;

        // @ts-ignore
        if (error.loggedAt === undefined || error.loggedAt < level){
            getLogger().report(this, level, issuer, ...args);
            this.loggedAt = level;
        }
    }
}

/**
 * Wrapper Class for Critical Errors
 *
 * @class CriticalError
 * @extends LoggedError
 *
 */
export class CriticalError extends LoggedError {
    constructor(error: LoggerMessage, issuer: any = undefined, ...args: any[]) {
        super(error, issuer, LOGGER_LEVELS.CRITICAL, ...args);
    }
}