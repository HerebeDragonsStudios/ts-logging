import {LoggedError} from "./errors";
import {LOGGER_LEVELS} from "./constants";

export class VersionTracker {
    private cache: Record<string, string> = {}

    submitVersion(name: string, version: string){
        if (name in this.cache)
            throw new LoggedError("Duplicate reference in cache: {0}", this, LOGGER_LEVELS.ERROR, name);
        this.cache[name] = version;
    }

    getVersionList(){
        const result = Object.assign({}, this.cache);
        Object.defineProperty(result, "toString", {
            configurable: false,
            value: () => JSON.stringify(result, undefined as any, 2)
        })
    }
}

globalThis.versiontracker = new VersionTracker();