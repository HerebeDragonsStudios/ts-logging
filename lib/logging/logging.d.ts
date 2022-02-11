export declare type LoggerMessage = Error | string;
export interface Logger {
    report(message: LoggerMessage, level: number, ...args: any[]): void;
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
    report(message: LoggerMessage, level?: number, ...args: any[]): void;
    info(message: LoggerMessage, ...args: any[]): void;
    all(message: LoggerMessage, ...args: any[]): void;
    debug(message: LoggerMessage, ...args: any[]): void;
    warn(message: LoggerMessage, ...args: any[]): void;
    error(message: LoggerMessage, ...args: any[]): void;
    critical(message: LoggerMessage, ...args: any[]): void;
    setLevel(level: number): void;
}
export declare function getLogger(): Logger;
export declare function setLogger(logger: Logger): void;
export declare const info: (message: string, ...args: any[]) => void;
export declare const all: (message: string, ...args: any[]) => void;
export declare const debug: (message: string, ...args: any[]) => void;
export declare const warn: (message: string, ...args: any[]) => void;
export declare const error: (message: string, ...args: any[]) => void;
export declare const critical: (message: string, ...args: any[]) => void;
//# sourceMappingURL=logging.d.ts.map