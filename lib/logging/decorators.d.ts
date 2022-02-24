export declare class StopWatch {
    private startTime?;
    start(): void;
    check(): number;
    stop(): number;
}
export declare function logAsync(level?: number | boolean, benchmark?: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function logSync(level?: number | boolean, benchmark?: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
