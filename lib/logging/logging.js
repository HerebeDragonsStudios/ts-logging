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
var constants_1 = require("./constants");
var utils_1 = require("./utils");
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
            message = "[".concat(issuer.toString(), "]").concat(message);
        if (this.logLevel)
            message = "[".concat(Object.keys(constants_1.LOGGER_LEVELS)[logLevel], "] - ").concat(message);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFFLElBQUksR0FBSyxJQUFJLFVBQUU7QUFDN0MsQ0FBQyxDQUFBO0FBRlksUUFBQSxJQUFJLFFBRWhCO0FBVU0sSUFBTSxLQUFLLEdBQUcsVUFBb0IsT0FBc0I7O0lBQUUsY0FBYztTQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7UUFBZCw2QkFBYzs7SUFDM0UsQ0FBQSxLQUFBLFNBQVMsRUFBRSxDQUFBLENBQUMsS0FBSywwQkFBQyxPQUFPLEVBQUUsSUFBSSxHQUFLLElBQUksVUFBRTtBQUM5QyxDQUFDLENBQUE7QUFGWSxRQUFBLEtBQUssU0FFakI7QUFVTSxJQUFNLFFBQVEsR0FBRyxVQUFvQixPQUFzQjs7SUFBRSxjQUFjO1NBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztRQUFkLDZCQUFjOztJQUM5RSxDQUFBLEtBQUEsU0FBUyxFQUFFLENBQUEsQ0FBQyxRQUFRLDBCQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUssSUFBSSxVQUFFO0FBQ2pELENBQUMsQ0FBQTtBQUZZLFFBQUEsUUFBUSxZQUVwQiIsImZpbGUiOiJsb2dnaW5nL2xvZ2dpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RFRkFVTFRfVElNRVNUQU1QX0ZPUk1BVCwgTE9HR0VSX0xFVkVMUywgTE9HR0lOR19NU0d9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtmb3JtYXREYXRlLCBzdHJpbmdGb3JtYXR9IGZyb20gXCIuL3V0aWxzXCI7XG5cbi8qKlxuICogQHR5cGVkZWYgTG9nZ2VyTWVzc2FnZVxuICogQG1lbWJlck9mIGxvZ2dpbmcubG9nZ2luZ1xuICovXG5leHBvcnQgdHlwZSBMb2dnZXJNZXNzYWdlID0gRXJyb3IgfCBzdHJpbmc7XG5cbi8qKlxuICogQGludGVyZmFjZSBMb2dnZXJcbiAqIEBtZW1iZXJPZiBsb2dnaW5nLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMb2dnZXIge1xuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgYSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxldmVsXG4gICAgICogQHBhcmFtIHthbnl9IFtpc3N1ZXJdIHRoZSBPYmplY3QvcHJvY2VzcyB0aGF0IHJlcG9ydHMgdGhlIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcbiAgICAgKi9cbiAgICByZXBvcnQobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgbGV2ZWw6IG51bWJlciwgaXNzdWVyOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgTG9nZ2VyI3JlcG9ydH1zIGEgbWVzc2FnZSB1bmRlciB7QGxpbmsgTE9HR0VSX0xFVkVMUy5BTEx9XG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXG4gICAgICovXG4gICAgYWxsKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgTG9nZ2VyI3JlcG9ydH1zIGEgbWVzc2FnZSB1bmRlciB7QGxpbmsgTE9HR0VSX0xFVkVMUy5JTkZPfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIGluZm8obWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBMb2dnZXIjcmVwb3J0fXMgYSBtZXNzYWdlIHVuZGVyIHtAbGluayBMT0dHRVJfTEVWRUxTLkRFQlVHfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIGRlYnVnKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgTG9nZ2VyI3JlcG9ydH1zIGEgbWVzc2FnZSB1bmRlciB7QGxpbmsgTE9HR0VSX0xFVkVMUy5XQVJOfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIHdhcm4obWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBMb2dnZXIjcmVwb3J0fXMgYSBtZXNzYWdlIHVuZGVyIHtAbGluayBMT0dHRVJfTEVWRUxTLkVSUk9SfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIGVycm9yKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgTG9nZ2VyI3JlcG9ydH1zIGEgbWVzc2FnZSB1bmRlciB7QGxpbmsgTE9HR0VSX0xFVkVMUy5DUklUSUNBTH1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcbiAgICAgKi9cbiAgICBjcml0aWNhbChtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgTG9nZ2VyIGxldmVsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGV2ZWxcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXG4gICAgICovXG4gICAgc2V0TGV2ZWwobGV2ZWw6IG51bWJlciwgLi4uYXJnczogYW55W10pOiB2b2lkO1xufVxuXG4vKipcbiAqIERlZmF1bHQgTG9nZ2VyIEltcGxlbWVudGF0aW9uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRlZmF1bHRMZXZlbCBkZWZhdWx0cyB0byB7QGxpbmsgTE9HR0VSX0xFVkVMUy5JTkZPfVxuICogQHBhcmFtIHtib29sZWFufSB1c2VUaW1lc3RhbXAgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHBhcmFtIHtib29sZWFufSBsb2dMZXZlbFxuICogQHBhcmFtIHtib29sZWFufSBsb2dTdGFja1RyYWNlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGltZXN0YW1wRm9ybWF0XG4gKlxuICogQGNsYXNzIExvZ2dlckltcFxuICogQGltcGxlbWVudHMgTG9nZ2VyXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2dnZXJJbXAgaW1wbGVtZW50cyBMb2dnZXIge1xuICAgIHByaXZhdGUgbGV2ZWw6IG51bWJlcjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgdXNlVGltZXN0YW1wOiBib29sZWFuO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nTGV2ZWw6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSByZWFkb25seSB0aW1lc3RhbXBGb3JtYXQ6IHN0cmluZztcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ1N0YWNrVHJhY2U6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0TGV2ZWw6IG51bWJlciA9IExPR0dFUl9MRVZFTFMuSU5GTywgdXNlVGltZXN0YW1wID0gdHJ1ZSwgbG9nTGV2ZWw6IGJvb2xlYW4gPSB0cnVlLCBsb2dTdGFja1RyYWNlOiBib29sZWFuID0gZmFsc2UsIHRpbWVzdGFtcEZvcm1hdCA9IERFRkFVTFRfVElNRVNUQU1QX0ZPUk1BVCl7XG4gICAgICAgIHRoaXMubGV2ZWwgPSBkZWZhdWx0TGV2ZWw7XG4gICAgICAgIHRoaXMudXNlVGltZXN0YW1wID0gdXNlVGltZXN0YW1wO1xuICAgICAgICB0aGlzLmxvZ0xldmVsID0gbG9nTGV2ZWw7XG4gICAgICAgIHRoaXMubG9nU3RhY2tUcmFjZSA9IGxvZ1N0YWNrVHJhY2U7XG4gICAgICAgIHRoaXMudGltZXN0YW1wRm9ybWF0ID0gdGltZXN0YW1wRm9ybWF0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWx0cyB0aGUgYWN0dWFsIGxvZ2dpbmcgbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsb2dMZXZlbCBpZiB0aGUgbGV2ZWwgaXMgdG8gYmUgbG9nZ2VkXG4gICAgICogQHBhcmFtIHthbnl9IGlzc3VlciB3aG8gaXMgbG9nZ2luZyB0aGUgbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTWVzc2FnZShtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBsb2dMZXZlbDogbnVtYmVyLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pe1xuICAgICAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UubWVzc2FnZTtcblxuICAgICAgICBpZiAoaXNzdWVyKVxuICAgICAgICAgICAgbWVzc2FnZSA9IGBbJHtpc3N1ZXIudG9TdHJpbmcoKX1dJHttZXNzYWdlfWA7XG4gICAgICAgIGlmICh0aGlzLmxvZ0xldmVsKVxuICAgICAgICAgICAgbWVzc2FnZSA9IGBbJHtPYmplY3Qua2V5cyhMT0dHRVJfTEVWRUxTKVtsb2dMZXZlbF19XSAtICR7bWVzc2FnZX1gO1xuICAgICAgICBpZiAodGhpcy51c2VUaW1lc3RhbXApXG4gICAgICAgICAgICBtZXNzYWdlID0gYFske2Zvcm1hdERhdGUobmV3IERhdGUoKSwgdGhpcy50aW1lc3RhbXBGb3JtYXQpfV0ke21lc3NhZ2V9YDtcbiAgICAgICAgcmV0dXJuIHN0cmluZ0Zvcm1hdChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbCBkZWZhdWx0cyB0byB7QGxpbmsgTE9HR0VSX0xFVkVMUy5JTkZPfVxuICAgICAqIEBwYXJhbSB7YW55fSBbaXNzdWVyXSB0aGUgb2JqZWN0IHRoYXQgaXMgY2FsbGluZyB0aGUgcmVwb3J0IG1ldGhvZFxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXSB2YWx1ZXMgdG8gcmVwbGFjZSBpbiB0aGUgbWVzc2FnZSBhY2NvcmRpbmcgdG8gdGhlICd7MH0nIG5vdGF0aW9uXG4gICAgICovXG4gICAgcmVwb3J0KG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGxldmVsOiBudW1iZXIgPSBMT0dHRVJfTEVWRUxTLklORk8sIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSkgOiB2b2lkIHtcbiAgICAgICAgaWYgKGxldmVsIDwgdGhpcy5sZXZlbClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgcmVwb3J0TWV0aG9kOiBGdW5jdGlvbjtcbiAgICAgICAgc3dpdGNoIChsZXZlbCl7XG4gICAgICAgICAgICBjYXNlIExPR0dFUl9MRVZFTFMuV0FSTjpcbiAgICAgICAgICAgICAgICByZXBvcnRNZXRob2QgPSBjb25zb2xlLndhcm47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExPR0dFUl9MRVZFTFMuRVJST1I6XG4gICAgICAgICAgICBjYXNlIExPR0dFUl9MRVZFTFMuQ1JJVElDQUw6XG4gICAgICAgICAgICAgICAgcmVwb3J0TWV0aG9kID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTE9HR0VSX0xFVkVMUy5JTkZPOlxuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLkRFQlVHOlxuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLkFMTDpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVwb3J0TWV0aG9kID0gY29uc29sZS5sb2c7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmluYWxNZXNzYWdlID0gdGhpcy5idWlsZE1lc3NhZ2UobWVzc2FnZSwgbGV2ZWwsIGlzc3VlciwgLi4uYXJncyk7XG4gICAgICAgIHJlcG9ydE1ldGhvZChmaW5hbE1lc3NhZ2UpO1xuXG4gICAgICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IgJiYgbWVzc2FnZS5zdGFjayAmJiB0aGlzLmxvZ1N0YWNrVHJhY2UpXG4gICAgICAgICAgICByZXBvcnRNZXRob2QodGhpcy5idWlsZE1lc3NhZ2UoYFxcbi0tIFN0YWNrU3RyYWNlOlxcbnswfWAsIGxldmVsLCBpc3N1ZXIsIG1lc3NhZ2Uuc3RhY2spKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIGluZm8obWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuSU5GTywgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBhbGwobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuQUxMLCBpc3N1ZXIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIGRlYnVnKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlcG9ydChtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLkRFQlVHLCBpc3N1ZXIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIHdhcm4obWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuV0FSTiwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBlcnJvcihtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXBvcnQobWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5FUlJPUiwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBjcml0aWNhbChtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXBvcnQobWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5DUklUSUNBTCwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBzZXRMZXZlbChsZXZlbDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVidWcoc3RyaW5nRm9ybWF0KExPR0dJTkdfTVNHLkxFVkVMX0NIQU5HRUQsIHRoaXMubGV2ZWwudG9TdHJpbmcoKSwgbGV2ZWwudG9TdHJpbmcoKSkpO1xuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgfVxufVxuXG5sZXQgY3VycmVudExvZ2dlcjogTG9nZ2VyO1xuXG4vKipcbiAqIGdldHMgdGhlIGN1cnJlbnQgTG9nZ2VyXG4gKlxuICogQGZ1bmN0aW9uIGdldExvZ2dlclxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2dlcigpe1xuICAgIGlmICghY3VycmVudExvZ2dlcilcbiAgICAgICAgY3VycmVudExvZ2dlciA9IG5ldyBMb2dnZXJJbXAoKTtcbiAgICByZXR1cm4gY3VycmVudExvZ2dlcjtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsb2dnZXJcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gKlxuICogQGZ1bmN0aW9uIHNldExvZ2dlclxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldExvZ2dlcihsb2dnZXI6IExvZ2dlcil7XG4gICAgY3VycmVudExvZ2dlciA9IGxvZ2dlcjtcbiAgICBnZXRMb2dnZXIoKS5kZWJ1ZyhMT0dHSU5HX01TRy5MT0dHRVJfQ0hBTkdFRCk7XG59XG5cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuSU5GT31cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiBpbmZvXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3QgaW5mbyA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS5pbmZvKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufVxuLyoqXG4gKiBSZXBvcnRzIGEgbWVzc2FnZSB0byB0aGUgbG9nZ2VyIHVuZGVyIHRoZSBsZXZlbCB7QGxpbmsgTE9HR0VSX0xFVkVMUy5BTEx9XG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqXG4gKiBAZnVuY3Rpb24gYWxsXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3QgYWxsID0gZnVuY3Rpb24odGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGdldExvZ2dlcigpLmFsbChtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuREVCVUd9XG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqXG4gKiBAZnVuY3Rpb24gZGVidWdcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5sb2dnaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1ZyA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS5kZWJ1ZyhtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuV0FSTn1cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiB3YXJuXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3Qgd2FybiA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS53YXJuKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufVxuLyoqXG4gKiBSZXBvcnRzIGEgbWVzc2FnZSB0byB0aGUgbG9nZ2VyIHVuZGVyIHRoZSBsZXZlbCB7QGxpbmsgTE9HR0VSX0xFVkVMUy5FUlJPUn1cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiBlcnJvclxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGVycm9yID0gZnVuY3Rpb24odGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGdldExvZ2dlcigpLmVycm9yKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufVxuLyoqXG4gKiBSZXBvcnRzIGEgbWVzc2FnZSB0byB0aGUgbG9nZ2VyIHVuZGVyIHRoZSBsZXZlbCB7QGxpbmsgTE9HR0VSX0xFVkVMUy5DUklUSUNBTH1cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiBjcml0aWNhbFxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGNyaXRpY2FsID0gZnVuY3Rpb24odGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGdldExvZ2dlcigpLmNyaXRpY2FsKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufSJdfQ==
