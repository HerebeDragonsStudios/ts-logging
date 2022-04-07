export declare const LOGGER_LEVELS: {
    ALL: number;
    DEBUG: number;
    INFO: number;
    WARN: number;
    ERROR: number;
    CRITICAL: number;
};
export declare const LOGGING_MSG: {
    LEVEL_CHANGED: string;
    LOGGER_CHANGED: string;
};
export declare type Err = Error | string | undefined;
export declare type Callback = (err?: Err, ...args: any[]) => void;
export declare type LoggerMessage = Error | string;
export declare const DEFAULT_TIMESTAMP_FORMAT = "dd/MM/yyyy HH:mm:ss:S";
export declare const MONTH_NAMES: string[];
export declare const DAYS_OF_WEEK_NAMES: string[];
