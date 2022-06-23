/**
 * @enum LOGGER_LEVELS
 *
 * @category Constants
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
 * @memberOf logging.logging
 */
export const LOGGING_MSG = {
    LEVEL_CHANGED: "Logger Level changed from {0} to {1}",
    LOGGER_CHANGED: "Logger changed"
}

/**
 * @typedef Err
 * @memberOf logging.logging
 * */
export type Err = Error | string | undefined;
/**
 * @typedef Callback
 * @memberOf logging.logging
 * */
export type Callback = (err?: Err, ...args: any[]) => void;

/**
 * @typedef LoggerMessage
 * @memberOf logging.logging
 */
export type LoggerMessage = (Error & {loggedAt?: number}) | string;

/**
 * @constant DEFAULT_TIMESTAMP_FORMAT
 * @category Constants
 */
export const DEFAULT_TIMESTAMP_FORMAT = "dd/MM/yyyy HH:mm:ss:S";

/**
 * Can be changed for localization purposes
 *
 * @constant MONTH_NAMES
 */
export const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

/**
 * Can be changed for localization purposes
 *
 * @constant DAYS_OF_WEEK_NAMES
 */
export const DAYS_OF_WEEK_NAMES = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
];