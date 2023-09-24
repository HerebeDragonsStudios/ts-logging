import {getLogger} from "./general";
import {Callback, LOGGER_LEVELS, LoggerMessage} from "./constants";
import {stringFormat} from "./utils";

/**
 * @namespace Errors
 */


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
        super(error instanceof Error ? error.message : (typeof error === 'string' ? stringFormat(error, ...args) : error) as string);
        this.name = LoggedError.constructor.name;
        this.loggedAt = error instanceof Error && error.name === LoggedError.constructor.name ? (error as LoggedError).loggedAt : undefined;
        this.issuer = issuer;

        // @ts-ignore
        if (error.loggedAt === undefined || error.loggedAt < level) {
            getLogger().report(this as LoggerMessage, level, issuer, ...args);
            this.loggedAt = level;
        }
    }
}

/**
 * Wrapper Class for Critical Errors
 *
 * @class CriticalError
 * @extends LoggedError
 */
export class CriticalError extends LoggedError {
    constructor(error: LoggerMessage, issuer: any = undefined, ...args: any[]) {
        super(error, issuer, LOGGER_LEVELS.CRITICAL, ...args);
    }
}