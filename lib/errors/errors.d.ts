import { Callback, LoggerMessage } from "../logging";
export declare function loggedCallback(this: any, message: LoggerMessage, level: number, callback: Callback, ...args: any[]): void;
export declare function allCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]): void;
export declare function debugCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]): void;
export declare function infoCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]): void;
export declare function warningCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]): void;
export declare function errorCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]): void;
export declare function criticalCallback(this: any, message: LoggerMessage, callback: Callback, ...args: any[]): void;
export declare class LoggedError extends Error {
    loggedAt?: number;
    issuer?: any;
    constructor(error: LoggerMessage, issuer?: any, level?: number, ...args: any[]);
}
export declare class CriticalError extends LoggedError {
    constructor(error: LoggerMessage, issuer?: any, ...args: any[]);
}
//# sourceMappingURL=errors.d.ts.map