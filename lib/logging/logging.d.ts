export declare type LoggerMessage = Error | string;
export interface Logger {
    report(message: LoggerMessage, level: number, issuer: any, ...args: any[]): void;
    all(message: LoggerMessage, ...args: any[]): void;
    info(message: LoggerMessage, ...args: any[]): void;
    debug(message: LoggerMessage, ...args: any[]): void;
    warn(message: LoggerMessage, ...args: any[]): void;
    error(message: LoggerMessage, ...args: any[]): void;
    critical(message: LoggerMessage, ...args: any[]): void;
    setLevel(level: number, ...args: any[]): void;
}
export declare class LoggerImp implements Logger {
    private level;
    private readonly useTimestamp;
    private readonly logLevel;
    private readonly timestampFormat;
    private readonly logStackTrace;
    constructor(defaultLevel?: number, useTimestamp?: boolean, logLevel?: boolean, logStackTrace?: boolean, timestampFormat?: string);
    protected buildMessage(message: LoggerMessage, logLevel: number, issuer?: any, ...args: any[]): string;
    protected getIssuerName(issuer?: any): string | undefined;
    report(message: LoggerMessage, level?: number, issuer?: any, ...args: any[]): void;
    info(message: LoggerMessage, issuer?: any, ...args: any[]): void;
    all(message: LoggerMessage, issuer?: any, ...args: any[]): void;
    debug(message: LoggerMessage, issuer?: any, ...args: any[]): void;
    warn(message: LoggerMessage, issuer?: any, ...args: any[]): void;
    error(message: LoggerMessage, issuer?: any, ...args: any[]): void;
    critical(message: LoggerMessage, issuer?: any, ...args: any[]): void;
    setLevel(level: number): void;
}
export declare function getLogger(): Logger;
export declare function setLogger(logger: Logger): void;
export declare const info: (this: any, message: LoggerMessage, ...args: any[]) => void;
export declare const all: (this: any, message: LoggerMessage, ...args: any[]) => void;
export declare const debug: (this: any, message: LoggerMessage, ...args: any[]) => void;
export declare const warn: (this: any, message: LoggerMessage, ...args: any[]) => void;
export declare const error: (this: any, message: LoggerMessage, ...args: any[]) => void;
export declare const critical: (this: any, message: LoggerMessage, ...args: any[]) => void;
