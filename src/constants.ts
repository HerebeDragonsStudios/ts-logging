/**
 * @namespace Constants
 */

/**
 * @enum LOGGER_LEVELS
 *
 * @memberOf Constants
 *
 */
export const LOGGER_LEVELS = {
    ALL: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    CRITICAL: 5
}

/**
 * Default messages
 *
 * constant LOGGING_MSG
 *
 * @memberOf Constants
 */
export const LOGGING_MSG = {
    LEVEL_CHANGED: "Logger Level changed from {0} to {1}",
    LOGGER_CHANGED: "Logger changed"
}

/**
 * @typedef Err
 * @memberOf Constants
 * */
export type Err = Error | string | undefined;
/**
 * @typedef Callback
 * @memberOf Constants
 * */
export type Callback = (err?: Err, ...args: any[]) => void;

/**
 * @typedef Callback
 * @memberOf Constants
 * */
export type GenericCallback<T> = (err?: Err, result?: T, ...args: any[]) => void;

/**
 * @typedef LoggerMessage
 * @memberOf Constants
 */
export type LoggerMessage = Error & {loggedAt?: number} | string;

/**
 * @constant DEFAULT_TIMESTAMP_FORMAT
 * @memberOf Constants
 */
export const DEFAULT_TIMESTAMP_FORMAT = "dd/MM/yyyy HH:mm:ss:S";

/**
 * Can be changed for localization purposes
 *
 * @memberOf Constants
 */
export const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

/**
 * Can be changed for localization purposes
 *
 * @memberOf Constants
 */
export const DAYS_OF_WEEK_NAMES = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
];