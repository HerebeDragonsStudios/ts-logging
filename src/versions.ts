import {LoggedError} from "./errors";
import {LOGGER_LEVELS} from "./constants";

/**
 * Util class to track lib versions across projects
 */
export class VersionTracker {
    private cache: Record<string, string> = {}

    private constructor() {
    }

    /**
     * submits a new lib and it's version
     *
     * @param {string} name the lib name
     * @param {string} version the lib version
     *
     * @throws {LoggedError} when registering a duplicate
     */
    submitVersion(name: string, version: string): void{
        if (name in this.cache)
            throw new LoggedError("Duplicate reference in cache: {0}", this, LOGGER_LEVELS.ERROR, name);
        this.cache[name] = version;
    }

    /**
     * Returns the current version list
     */
    getVersionList(): Record<string, string>  {
        const result = Object.assign({}, this.cache);
        Object.defineProperty(result, "toString", {
            configurable: false,
            value: () => JSON.stringify(result, undefined as any, 2)
        })
        return result;
    }

    public static Instance: VersionTracker = new VersionTracker();
}