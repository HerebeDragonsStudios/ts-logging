import { Callback, LoggerMessage } from "../logging";
export declare function loggedCallback(this: any, message: LoggerMessage, level: number | Callback, callback: Callback): void;
export declare function allCallback(this: any, message: LoggerMessage, callback: Callback): void;
export declare function debugCallback(this: any, message: LoggerMessage, callback: Callback): void;
export declare function infoCallback(this: any, message: LoggerMessage, callback: Callback): void;
export declare function warningCallback(this: any, message: LoggerMessage, callback: Callback): void;
export declare function errorCallback(this: any, message: LoggerMessage, callback: Callback): void;
export declare function criticalCallback(this: any, message: LoggerMessage, callback: Callback): void;
export declare class LoggedError extends Error {
    logged: boolean;
    constructor(error: LoggerMessage, level?: number);
}
export declare class CriticalError extends LoggedError {
    constructor(error: LoggerMessage);
}
//# sourceMappingURL=errors.d.ts.map