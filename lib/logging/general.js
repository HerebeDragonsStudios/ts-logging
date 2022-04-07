"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.critical = exports.error = exports.warn = exports.debug = exports.all = exports.info = exports.setLogger = exports.getLogger = exports.LoggerImp = void 0;
var utils_1 = require("./utils");
var constants_1 = require("./constants");
var LoggerImp = (function () {
    function LoggerImp(defaultLevel, useTimestamp, logLevel, logStackTrace, timestampFormat) {
        if (defaultLevel === void 0) { defaultLevel = constants_1.LOGGER_LEVELS.INFO; }
        if (useTimestamp === void 0) { useTimestamp = true; }
        if (logLevel === void 0) { logLevel = true; }
        if (logStackTrace === void 0) { logStackTrace = false; }
        if (timestampFormat === void 0) { timestampFormat = constants_1.DEFAULT_TIMESTAMP_FORMAT; }
        this.level = defaultLevel;
        this.useTimestamp = useTimestamp;
        this.logLevel = logLevel;
        this.logStackTrace = logStackTrace;
        this.timestampFormat = timestampFormat;
    }
    LoggerImp.prototype.buildMessage = function (message, logLevel, issuer) {
        if (issuer === void 0) { issuer = undefined; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (message instanceof Error)
            message = message.message;
        if (issuer)
            message = "[".concat((0, utils_1.getObjectName)(issuer), "] - ").concat(message);
        if (this.logLevel)
            message = "[".concat(Object.keys(constants_1.LOGGER_LEVELS)[logLevel], "]").concat(issuer ? '' : " - ").concat(message);
        if (this.useTimestamp)
            message = "[".concat((0, utils_1.formatDate)(new Date(), this.timestampFormat), "]").concat(message);
        return utils_1.stringFormat.apply(void 0, __spreadArray([message], args, false));
    };
    LoggerImp.prototype.report = function (message, level, issuer) {
        if (level === void 0) { level = constants_1.LOGGER_LEVELS.INFO; }
        if (issuer === void 0) { issuer = undefined; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (level < this.level)
            return;
        var reportMethod;
        switch (level) {
            case constants_1.LOGGER_LEVELS.WARN:
                reportMethod = console.warn;
                break;
            case constants_1.LOGGER_LEVELS.ERROR:
            case constants_1.LOGGER_LEVELS.CRITICAL:
                reportMethod = console.error;
                break;
            case constants_1.LOGGER_LEVELS.INFO:
            case constants_1.LOGGER_LEVELS.DEBUG:
            case constants_1.LOGGER_LEVELS.ALL:
            default:
                reportMethod = console.log;
                break;
        }
        var finalMessage = this.buildMessage.apply(this, __spreadArray([message, level, issuer], args, false));
        reportMethod(finalMessage);
        if (message instanceof Error && message.stack && this.logStackTrace)
            reportMethod(this.buildMessage("\n-- StackStrace:\n{0}", level, issuer, message.stack));
    };
    LoggerImp.prototype.info = function (message, issuer) {
        if (issuer === void 0) { issuer = undefined; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.report.apply(this, __spreadArray([message, constants_1.LOGGER_LEVELS.INFO, issuer], args, false));
    };
    LoggerImp.prototype.all = function (message, issuer) {
        if (issuer === void 0) { issuer = undefined; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.report.apply(this, __spreadArray([message, constants_1.LOGGER_LEVELS.ALL, issuer], args, false));
    };
    LoggerImp.prototype.debug = function (message, issuer) {
        if (issuer === void 0) { issuer = undefined; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.report.apply(this, __spreadArray([message, constants_1.LOGGER_LEVELS.DEBUG, issuer], args, false));
    };
    LoggerImp.prototype.warn = function (message, issuer) {
        if (issuer === void 0) { issuer = undefined; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.report.apply(this, __spreadArray([message, constants_1.LOGGER_LEVELS.WARN, issuer], args, false));
    };
    LoggerImp.prototype.error = function (message, issuer) {
        if (issuer === void 0) { issuer = undefined; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.report.apply(this, __spreadArray([message, constants_1.LOGGER_LEVELS.ERROR, issuer], args, false));
    };
    LoggerImp.prototype.critical = function (message, issuer) {
        if (issuer === void 0) { issuer = undefined; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.report.apply(this, __spreadArray([message, constants_1.LOGGER_LEVELS.CRITICAL, issuer], args, false));
    };
    LoggerImp.prototype.setLevel = function (level) {
        this.debug((0, utils_1.stringFormat)(constants_1.LOGGING_MSG.LEVEL_CHANGED, this.level.toString(), level.toString()));
        this.level = level;
    };
    return LoggerImp;
}());
exports.LoggerImp = LoggerImp;
var currentLogger;
function getLogger() {
    if (!currentLogger)
        currentLogger = new LoggerImp();
    return currentLogger;
}
exports.getLogger = getLogger;
function setLogger(logger) {
    currentLogger = logger;
    getLogger().debug(constants_1.LOGGING_MSG.LOGGER_CHANGED);
}
exports.setLogger = setLogger;
var info = function (message) {
    var _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    (_a = getLogger()).info.apply(_a, __spreadArray([message, this], args, false));
};
exports.info = info;
var all = function (message) {
    var _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    (_a = getLogger()).all.apply(_a, __spreadArray([message, this], args, false));
};
exports.all = all;
var debug = function (message) {
    var _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    (_a = getLogger()).debug.apply(_a, __spreadArray([message, this], args, false));
};
exports.debug = debug;
var warn = function (message) {
    var _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    (_a = getLogger()).warn.apply(_a, __spreadArray([message, this], args, false));
};
exports.warn = warn;
var error = function (message) {
    var _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    (_a = getLogger()).error.apply(_a, __spreadArray([message, this], args, false));
};
exports.error = error;
var critical = function (message) {
    var _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    (_a = getLogger()).critical.apply(_a, __spreadArray([message, this], args, false));
};
exports.critical = critical;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Yzs7SUFDM0UsQ0FBQSxLQUFBLFNBQVMsRUFBRSxDQUFBLENBQUMsSUFBSSwwQkFBQyxPQUFPLEVBQUUsSUFBSSxHQUFLLElBQUksVUFBRTtBQUM3QyxDQUFDLENBQUE7QUFGWSxRQUFBLElBQUksUUFFaEI7QUFVTSxJQUFNLEtBQUssR0FBRyxVQUFxQixPQUFzQjs7SUFBRSxjQUFjO1NBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztRQUFkLDZCQUFjOztJQUM1RSxDQUFBLEtBQUEsU0FBUyxFQUFFLENBQUEsQ0FBQyxLQUFLLDBCQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUssSUFBSSxVQUFFO0FBQzlDLENBQUMsQ0FBQTtBQUZZLFFBQUEsS0FBSyxTQUVqQjtBQVVNLElBQU0sUUFBUSxHQUFHLFVBQXFCLE9BQXNCOztJQUFFLGNBQWM7U0FBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1FBQWQsNkJBQWM7O0lBQy9FLENBQUEsS0FBQSxTQUFTLEVBQUUsQ0FBQSxDQUFDLFFBQVEsMEJBQUMsT0FBTyxFQUFFLElBQUksR0FBSyxJQUFJLFVBQUU7QUFDakQsQ0FBQyxDQUFBO0FBRlksUUFBQSxRQUFRLFlBRXBCIiwiZmlsZSI6ImxvZ2dpbmcvZ2VuZXJhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Zm9ybWF0RGF0ZSwgZ2V0T2JqZWN0TmFtZSwgc3RyaW5nRm9ybWF0fSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHtERUZBVUxUX1RJTUVTVEFNUF9GT1JNQVQsIExPR0dFUl9MRVZFTFMsIExvZ2dlck1lc3NhZ2UsIExPR0dJTkdfTVNHfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAaW50ZXJmYWNlIExvZ2dlclxuICogQG1lbWJlck9mIGxvZ2dpbmcubG9nZ2luZ1xuICovXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dlciB7XG4gICAgLyoqXG4gICAgICogUmVwb3J0cyBhIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGV2ZWxcbiAgICAgKiBAcGFyYW0ge2FueX0gW2lzc3Vlcl0gdGhlIE9iamVjdC9wcm9jZXNzIHRoYXQgcmVwb3J0cyB0aGUgbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIHJlcG9ydChtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBsZXZlbDogbnVtYmVyLCBpc3N1ZXI6IGFueSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICoge0BsaW5rIExvZ2dlciNyZXBvcnR9cyBhIG1lc3NhZ2UgdW5kZXIge0BsaW5rIExPR0dFUl9MRVZFTFMuQUxMfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIGFsbChtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgTG9nZ2VyI3JlcG9ydH1zIGEgbWVzc2FnZSB1bmRlciB7QGxpbmsgTE9HR0VSX0xFVkVMUy5JTkZPfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIGluZm8obWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICoge0BsaW5rIExvZ2dlciNyZXBvcnR9cyBhIG1lc3NhZ2UgdW5kZXIge0BsaW5rIExPR0dFUl9MRVZFTFMuREVCVUd9XG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXG4gICAgICovXG4gICAgZGVidWcobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICoge0BsaW5rIExvZ2dlciNyZXBvcnR9cyBhIG1lc3NhZ2UgdW5kZXIge0BsaW5rIExPR0dFUl9MRVZFTFMuV0FSTn1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcbiAgICAgKi9cbiAgICB3YXJuKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIHtAbGluayBMb2dnZXIjcmVwb3J0fXMgYSBtZXNzYWdlIHVuZGVyIHtAbGluayBMT0dHRVJfTEVWRUxTLkVSUk9SfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIGVycm9yKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIHtAbGluayBMb2dnZXIjcmVwb3J0fXMgYSBtZXNzYWdlIHVuZGVyIHtAbGluayBMT0dHRVJfTEVWRUxTLkNSSVRJQ0FMfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIGNyaXRpY2FsKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIExvZ2dlciBsZXZlbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxldmVsXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIHNldExldmVsKGxldmVsOiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcbn1cblxuLyoqXG4gKiBEZWZhdWx0IExvZ2dlciBJbXBsZW1lbnRhdGlvblxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWZhdWx0TGV2ZWwgZGVmYXVsdHMgdG8ge0BsaW5rIExPR0dFUl9MRVZFTFMuSU5GT31cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlVGltZXN0YW1wIGRlZmF1bHRzIHRvIHRydWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9nTGV2ZWxcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9nU3RhY2tUcmFjZVxuICogQHBhcmFtIHtzdHJpbmd9IHRpbWVzdGFtcEZvcm1hdFxuICpcbiAqIEBjbGFzcyBMb2dnZXJJbXBcbiAqIEBpbXBsZW1lbnRzIExvZ2dlclxuICovXG5leHBvcnQgY2xhc3MgTG9nZ2VySW1wIGltcGxlbWVudHMgTG9nZ2VyIHtcbiAgICBwcml2YXRlIGxldmVsOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZVRpbWVzdGFtcDogYm9vbGVhbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ0xldmVsOiBib29sZWFuO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdGltZXN0YW1wRm9ybWF0OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dTdGFja1RyYWNlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdExldmVsOiBudW1iZXIgPSBMT0dHRVJfTEVWRUxTLklORk8sIHVzZVRpbWVzdGFtcCA9IHRydWUsIGxvZ0xldmVsOiBib29sZWFuID0gdHJ1ZSwgbG9nU3RhY2tUcmFjZTogYm9vbGVhbiA9IGZhbHNlLCB0aW1lc3RhbXBGb3JtYXQgPSBERUZBVUxUX1RJTUVTVEFNUF9GT1JNQVQpIHtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGRlZmF1bHRMZXZlbDtcbiAgICAgICAgdGhpcy51c2VUaW1lc3RhbXAgPSB1c2VUaW1lc3RhbXA7XG4gICAgICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcbiAgICAgICAgdGhpcy5sb2dTdGFja1RyYWNlID0gbG9nU3RhY2tUcmFjZTtcbiAgICAgICAgdGhpcy50aW1lc3RhbXBGb3JtYXQgPSB0aW1lc3RhbXBGb3JtYXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbHRzIHRoZSBhY3R1YWwgbG9nZ2luZyBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxvZ0xldmVsIGlmIHRoZSBsZXZlbCBpcyB0byBiZSBsb2dnZWRcbiAgICAgKiBAcGFyYW0ge2FueX0gaXNzdWVyIHdobyBpcyBsb2dnaW5nIHRoZSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGRNZXNzYWdlKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGxvZ0xldmVsOiBudW1iZXIsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UubWVzc2FnZTtcblxuICAgICAgICBpZiAoaXNzdWVyKVxuICAgICAgICAgICAgbWVzc2FnZSA9IGBbJHtnZXRPYmplY3ROYW1lKGlzc3Vlcil9XSAtICR7bWVzc2FnZX1gO1xuICAgICAgICBpZiAodGhpcy5sb2dMZXZlbClcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgWyR7T2JqZWN0LmtleXMoTE9HR0VSX0xFVkVMUylbbG9nTGV2ZWxdfV0ke2lzc3VlciA/ICcnIDogXCIgLSBcIn0ke21lc3NhZ2V9YDtcbiAgICAgICAgaWYgKHRoaXMudXNlVGltZXN0YW1wKVxuICAgICAgICAgICAgbWVzc2FnZSA9IGBbJHtmb3JtYXREYXRlKG5ldyBEYXRlKCksIHRoaXMudGltZXN0YW1wRm9ybWF0KX1dJHttZXNzYWdlfWA7XG4gICAgICAgIHJldHVybiBzdHJpbmdGb3JtYXQobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGV2ZWwgZGVmYXVsdHMgdG8ge0BsaW5rIExPR0dFUl9MRVZFTFMuSU5GT31cbiAgICAgKiBAcGFyYW0ge2FueX0gW2lzc3Vlcl0gdGhlIG9iamVjdCB0aGF0IGlzIGNhbGxpbmcgdGhlIHJlcG9ydCBtZXRob2RcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc10gdmFsdWVzIHRvIHJlcGxhY2UgaW4gdGhlIG1lc3NhZ2UgYWNjb3JkaW5nIHRvIHRoZSAnezB9JyBub3RhdGlvblxuICAgICAqL1xuICAgIHJlcG9ydChtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBsZXZlbDogbnVtYmVyID0gTE9HR0VSX0xFVkVMUy5JTkZPLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgaWYgKGxldmVsIDwgdGhpcy5sZXZlbClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgcmVwb3J0TWV0aG9kOiBGdW5jdGlvbjtcbiAgICAgICAgc3dpdGNoIChsZXZlbCkge1xuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLldBUk46XG4gICAgICAgICAgICAgICAgcmVwb3J0TWV0aG9kID0gY29uc29sZS53YXJuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLkVSUk9SOlxuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLkNSSVRJQ0FMOlxuICAgICAgICAgICAgICAgIHJlcG9ydE1ldGhvZCA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExPR0dFUl9MRVZFTFMuSU5GTzpcbiAgICAgICAgICAgIGNhc2UgTE9HR0VSX0xFVkVMUy5ERUJVRzpcbiAgICAgICAgICAgIGNhc2UgTE9HR0VSX0xFVkVMUy5BTEw6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlcG9ydE1ldGhvZCA9IGNvbnNvbGUubG9nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbmFsTWVzc2FnZSA9IHRoaXMuYnVpbGRNZXNzYWdlKG1lc3NhZ2UsIGxldmVsLCBpc3N1ZXIsIC4uLmFyZ3MpO1xuICAgICAgICByZXBvcnRNZXRob2QoZmluYWxNZXNzYWdlKTtcblxuICAgICAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yICYmIG1lc3NhZ2Uuc3RhY2sgJiYgdGhpcy5sb2dTdGFja1RyYWNlKVxuICAgICAgICAgICAgcmVwb3J0TWV0aG9kKHRoaXMuYnVpbGRNZXNzYWdlKGBcXG4tLSBTdGFja1N0cmFjZTpcXG57MH1gLCBsZXZlbCwgaXNzdWVyLCBtZXNzYWdlLnN0YWNrKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBpbmZvKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlcG9ydChtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLklORk8sIGlzc3VlciwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBhbGwobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuQUxMLCBpc3N1ZXIsIC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgZGVidWcobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuREVCVUcsIGlzc3VlciwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICB3YXJuKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlcG9ydChtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLldBUk4sIGlzc3VlciwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBlcnJvcihtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXBvcnQobWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5FUlJPUiwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIGNyaXRpY2FsKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlcG9ydChtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLkNSSVRJQ0FMLCBpc3N1ZXIsIC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgc2V0TGV2ZWwobGV2ZWw6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmRlYnVnKHN0cmluZ0Zvcm1hdChMT0dHSU5HX01TRy5MRVZFTF9DSEFOR0VELCB0aGlzLmxldmVsLnRvU3RyaW5nKCksIGxldmVsLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgIH1cbn1cblxubGV0IGN1cnJlbnRMb2dnZXI6IExvZ2dlcjtcblxuLyoqXG4gKiBnZXRzIHRoZSBjdXJyZW50IExvZ2dlclxuICpcbiAqIEBmdW5jdGlvbiBnZXRMb2dnZXJcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5sb2dnaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dnZXIoKSB7XG4gICAgaWYgKCFjdXJyZW50TG9nZ2VyKVxuICAgICAgICBjdXJyZW50TG9nZ2VyID0gbmV3IExvZ2dlckltcCgpO1xuICAgIHJldHVybiBjdXJyZW50TG9nZ2VyO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxvZ2dlclxuICpcbiAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAqXG4gKiBAZnVuY3Rpb24gc2V0TG9nZ2VyXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0TG9nZ2VyKGxvZ2dlcjogTG9nZ2VyKSB7XG4gICAgY3VycmVudExvZ2dlciA9IGxvZ2dlcjtcbiAgICBnZXRMb2dnZXIoKS5kZWJ1ZyhMT0dHSU5HX01TRy5MT0dHRVJfQ0hBTkdFRCk7XG59XG5cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuSU5GT31cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiBpbmZvXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3QgaW5mbyA9IGZ1bmN0aW9uICh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgZ2V0TG9nZ2VyKCkuaW5mbyhtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuQUxMfVxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gKlxuICogQGZ1bmN0aW9uIGFsbFxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGFsbCA9IGZ1bmN0aW9uICh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgZ2V0TG9nZ2VyKCkuYWxsKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufVxuLyoqXG4gKiBSZXBvcnRzIGEgbWVzc2FnZSB0byB0aGUgbG9nZ2VyIHVuZGVyIHRoZSBsZXZlbCB7QGxpbmsgTE9HR0VSX0xFVkVMUy5ERUJVR31cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiBkZWJ1Z1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGRlYnVnID0gZnVuY3Rpb24gKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS5kZWJ1ZyhtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuV0FSTn1cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiB3YXJuXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3Qgd2FybiA9IGZ1bmN0aW9uICh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgZ2V0TG9nZ2VyKCkud2FybihtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuRVJST1J9XG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqXG4gKiBAZnVuY3Rpb24gZXJyb3JcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5sb2dnaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBlcnJvciA9IGZ1bmN0aW9uICh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgZ2V0TG9nZ2VyKCkuZXJyb3IobWVzc2FnZSwgdGhpcywgLi4uYXJncyk7XG59XG4vKipcbiAqIFJlcG9ydHMgYSBtZXNzYWdlIHRvIHRoZSBsb2dnZXIgdW5kZXIgdGhlIGxldmVsIHtAbGluayBMT0dHRVJfTEVWRUxTLkNSSVRJQ0FMfVxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gKlxuICogQGZ1bmN0aW9uIGNyaXRpY2FsXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3QgY3JpdGljYWwgPSBmdW5jdGlvbiAodGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGdldExvZ2dlcigpLmNyaXRpY2FsKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufSJdfQ==
