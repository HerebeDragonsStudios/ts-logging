/**
 * @enum LOGGER_LEVELS
 *
 * @category Constants
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
 * @category Constants
 */
export const LOGGING_MSG = {
    LEVEL_CHANGED: "Logger Level changed from {0} to {1}",
    LOGGER_CHANGED: "Logger changed"
}

/**
 * @typedef Err
 * @category Constants
 * */
export type Err = Error | string | undefined;
/**
 * @typedef Callback
 * @category Constants
 * */
export type Callback = (err?: Err, ...args: any[]) => void;

/**
 * @typedef Callback
 * @category Constants
 * */
export type GenericCallback<T> = (err?: Err, result?: T, ...args: any[]) => void;

/**
 * @typedef LoggerMessage
 * @category Constants
 */
export type LoggerMessage = Error & {loggedAt?: number} | string;

/**
 * @constant DEFAULT_TIMESTAMP_FORMAT
 * @category Constants
 */
export const DEFAULT_TIMESTAMP_FORMAT = "dd/MM/yyyy HH:mm:ss:S";

/**
 * Can be changed for localization purposes
 *
 * @category Constants
 */
export const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

/**
 * Can be changed for localization purposes
 *
 * @category Constants
 */
export const DAYS_OF_WEEK_NAMES = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
];