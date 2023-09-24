
/**
 * @namespace Callbacks
 */

import {Callback, LOGGER_LEVELS, LoggerMessage} from "./constants";
import {getLogger} from "./general";
import {LoggedError} from "./errors";

/**
 *
 * @param {string} message
 * @param {number} level
 * @param {Callback} callback
 * @param {any[]} [args]
 *
 * @function loggedCallback
 *
 * @memberOf Callbacks
 */
export function loggedCallback(this: any, message: LoggerMessage, level: number, callback: Callback, ...args: any[]) {
    if (message instanceof LoggedError && message.loggedAt && message.loggedAt >= level)
        return callback(message);
    if (message instanceof LoggedError){
        if (message.loggedAt !== undefined && message.loggedAt < level){
            getLogger().report(message, level, this && this.name !== "loggedCallback" ? this : undefined, ...args)
            message.loggedAt = level;
        }
        return callback(message);
    }
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
 * @memberOf Callbacks
 */
export function allCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]) {
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
 * @memberOf Callbacks
 */
export function debugCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]) {
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
 * @memberOf Callbacks
 */
export function infoCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]) {
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
 * @memberOf Callbacks
 */
export function warningCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]) {
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
 * @memberOf Callbacks
 */
export function errorCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]) {
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
 * @memberOf Callbacks
 */
export function criticalCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]) {
    loggedCallback.call(this, message, LOGGER_LEVELS.CRITICAL, callback, ...args);
}