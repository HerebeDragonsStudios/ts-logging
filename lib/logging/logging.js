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
            message = "[".concat(issuer.toString(), "] - ").concat(message);
        else
            message = " - ".concat(message);
        if (this.logLevel)
            message = "[".concat(Object.keys(constants_1.LOGGER_LEVELS)[logLevel], "]").concat(message);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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U0FBUyxFQUFFLENBQUEsQ0FBQyxJQUFJLDBCQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUssSUFBSSxVQUFFO0FBQzdDLENBQUMsQ0FBQTtBQUZZLFFBQUEsSUFBSSxRQUVoQjtBQVVNLElBQU0sS0FBSyxHQUFHLFVBQW9CLE9BQXNCOztJQUFFLGNBQWM7U0FBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1FBQWQsNkJBQWM7O0lBQzNFLENBQUEsS0FBQSxTQUFTLEVBQUUsQ0FBQSxDQUFDLEtBQUssMEJBQUMsT0FBTyxFQUFFLElBQUksR0FBSyxJQUFJLFVBQUU7QUFDOUMsQ0FBQyxDQUFBO0FBRlksUUFBQSxLQUFLLFNBRWpCO0FBVU0sSUFBTSxRQUFRLEdBQUcsVUFBb0IsT0FBc0I7O0lBQUUsY0FBYztTQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7UUFBZCw2QkFBYzs7SUFDOUUsQ0FBQSxLQUFBLFNBQVMsRUFBRSxDQUFBLENBQUMsUUFBUSwwQkFBQyxPQUFPLEVBQUUsSUFBSSxHQUFLLElBQUksVUFBRTtBQUNqRCxDQUFDLENBQUE7QUFGWSxRQUFBLFFBQVEsWUFFcEIiLCJmaWxlIjoibG9nZ2luZy9sb2dnaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtERUZBVUxUX1RJTUVTVEFNUF9GT1JNQVQsIExPR0dFUl9MRVZFTFMsIExPR0dJTkdfTVNHfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7Zm9ybWF0RGF0ZSwgc3RyaW5nRm9ybWF0fSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIEB0eXBlZGVmIExvZ2dlck1lc3NhZ2VcbiAqIEBtZW1iZXJPZiBsb2dnaW5nLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IHR5cGUgTG9nZ2VyTWVzc2FnZSA9IEVycm9yIHwgc3RyaW5nO1xuXG4vKipcbiAqIEBpbnRlcmZhY2UgTG9nZ2VyXG4gKiBAbWVtYmVyT2YgbG9nZ2luZy5sb2dnaW5nXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyIHtcbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIGEgbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbFxuICAgICAqIEBwYXJhbSB7YW55fSBbaXNzdWVyXSB0aGUgT2JqZWN0L3Byb2Nlc3MgdGhhdCByZXBvcnRzIHRoZSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXG4gICAgICovXG4gICAgcmVwb3J0KG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGxldmVsOiBudW1iZXIsIGlzc3VlcjogYW55LCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIExvZ2dlciNyZXBvcnR9cyBhIG1lc3NhZ2UgdW5kZXIge0BsaW5rIExPR0dFUl9MRVZFTFMuQUxMfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIGFsbChtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIExvZ2dlciNyZXBvcnR9cyBhIG1lc3NhZ2UgdW5kZXIge0BsaW5rIExPR0dFUl9MRVZFTFMuSU5GT31cbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcbiAgICAgKi9cbiAgICBpbmZvKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgTG9nZ2VyI3JlcG9ydH1zIGEgbWVzc2FnZSB1bmRlciB7QGxpbmsgTE9HR0VSX0xFVkVMUy5ERUJVR31cbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcbiAgICAgKi9cbiAgICBkZWJ1ZyhtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIExvZ2dlciNyZXBvcnR9cyBhIG1lc3NhZ2UgdW5kZXIge0BsaW5rIExPR0dFUl9MRVZFTFMuV0FSTn1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcbiAgICAgKi9cbiAgICB3YXJuKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgTG9nZ2VyI3JlcG9ydH1zIGEgbWVzc2FnZSB1bmRlciB7QGxpbmsgTE9HR0VSX0xFVkVMUy5FUlJPUn1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcbiAgICAgKi9cbiAgICBlcnJvcihtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIExvZ2dlciNyZXBvcnR9cyBhIG1lc3NhZ2UgdW5kZXIge0BsaW5rIExPR0dFUl9MRVZFTFMuQ1JJVElDQUx9XG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXG4gICAgICovXG4gICAgY3JpdGljYWwobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIExvZ2dlciBsZXZlbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxldmVsXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIHNldExldmVsKGxldmVsOiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcbn1cblxuLyoqXG4gKiBEZWZhdWx0IExvZ2dlciBJbXBsZW1lbnRhdGlvblxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWZhdWx0TGV2ZWwgZGVmYXVsdHMgdG8ge0BsaW5rIExPR0dFUl9MRVZFTFMuSU5GT31cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlVGltZXN0YW1wIGRlZmF1bHRzIHRvIHRydWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9nTGV2ZWxcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9nU3RhY2tUcmFjZVxuICogQHBhcmFtIHtzdHJpbmd9IHRpbWVzdGFtcEZvcm1hdFxuICpcbiAqIEBjbGFzcyBMb2dnZXJJbXBcbiAqIEBpbXBsZW1lbnRzIExvZ2dlclxuICovXG5leHBvcnQgY2xhc3MgTG9nZ2VySW1wIGltcGxlbWVudHMgTG9nZ2VyIHtcbiAgICBwcml2YXRlIGxldmVsOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZVRpbWVzdGFtcDogYm9vbGVhbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ0xldmVsOiBib29sZWFuO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdGltZXN0YW1wRm9ybWF0OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dTdGFja1RyYWNlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdExldmVsOiBudW1iZXIgPSBMT0dHRVJfTEVWRUxTLklORk8sIHVzZVRpbWVzdGFtcCA9IHRydWUsIGxvZ0xldmVsOiBib29sZWFuID0gdHJ1ZSwgbG9nU3RhY2tUcmFjZTogYm9vbGVhbiA9IGZhbHNlLCB0aW1lc3RhbXBGb3JtYXQgPSBERUZBVUxUX1RJTUVTVEFNUF9GT1JNQVQpe1xuICAgICAgICB0aGlzLmxldmVsID0gZGVmYXVsdExldmVsO1xuICAgICAgICB0aGlzLnVzZVRpbWVzdGFtcCA9IHVzZVRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xuICAgICAgICB0aGlzLmxvZ1N0YWNrVHJhY2UgPSBsb2dTdGFja1RyYWNlO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcEZvcm1hdCA9IHRpbWVzdGFtcEZvcm1hdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsdHMgdGhlIGFjdHVhbCBsb2dnaW5nIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbG9nTGV2ZWwgaWYgdGhlIGxldmVsIGlzIHRvIGJlIGxvZ2dlZFxuICAgICAqIEBwYXJhbSB7YW55fSBpc3N1ZXIgd2hvIGlzIGxvZ2dpbmcgdGhlIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE1lc3NhZ2UobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgbG9nTGV2ZWw6IG51bWJlciwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKXtcbiAgICAgICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLm1lc3NhZ2U7XG5cbiAgICAgICAgaWYgKGlzc3VlcilcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgWyR7aXNzdWVyLnRvU3RyaW5nKCl9XSAtICR7bWVzc2FnZX1gO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBtZXNzYWdlID0gYCAtICR7bWVzc2FnZX1gO1xuICAgICAgICBpZiAodGhpcy5sb2dMZXZlbClcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgWyR7T2JqZWN0LmtleXMoTE9HR0VSX0xFVkVMUylbbG9nTGV2ZWxdfV0ke21lc3NhZ2V9YDtcbiAgICAgICAgaWYgKHRoaXMudXNlVGltZXN0YW1wKVxuICAgICAgICAgICAgbWVzc2FnZSA9IGBbJHtmb3JtYXREYXRlKG5ldyBEYXRlKCksIHRoaXMudGltZXN0YW1wRm9ybWF0KX1dJHttZXNzYWdlfWA7XG4gICAgICAgIHJldHVybiBzdHJpbmdGb3JtYXQobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGV2ZWwgZGVmYXVsdHMgdG8ge0BsaW5rIExPR0dFUl9MRVZFTFMuSU5GT31cbiAgICAgKiBAcGFyYW0ge2FueX0gW2lzc3Vlcl0gdGhlIG9iamVjdCB0aGF0IGlzIGNhbGxpbmcgdGhlIHJlcG9ydCBtZXRob2RcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc10gdmFsdWVzIHRvIHJlcGxhY2UgaW4gdGhlIG1lc3NhZ2UgYWNjb3JkaW5nIHRvIHRoZSAnezB9JyBub3RhdGlvblxuICAgICAqL1xuICAgIHJlcG9ydChtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBsZXZlbDogbnVtYmVyID0gTE9HR0VSX0xFVkVMUy5JTkZPLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pIDogdm9pZCB7XG4gICAgICAgIGlmIChsZXZlbCA8IHRoaXMubGV2ZWwpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgbGV0IHJlcG9ydE1ldGhvZDogRnVuY3Rpb247XG4gICAgICAgIHN3aXRjaCAobGV2ZWwpe1xuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLldBUk46XG4gICAgICAgICAgICAgICAgcmVwb3J0TWV0aG9kID0gY29uc29sZS53YXJuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLkVSUk9SOlxuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLkNSSVRJQ0FMOlxuICAgICAgICAgICAgICAgIHJlcG9ydE1ldGhvZCA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExPR0dFUl9MRVZFTFMuSU5GTzpcbiAgICAgICAgICAgIGNhc2UgTE9HR0VSX0xFVkVMUy5ERUJVRzpcbiAgICAgICAgICAgIGNhc2UgTE9HR0VSX0xFVkVMUy5BTEw6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlcG9ydE1ldGhvZCA9IGNvbnNvbGUubG9nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbmFsTWVzc2FnZSA9IHRoaXMuYnVpbGRNZXNzYWdlKG1lc3NhZ2UsIGxldmVsLCBpc3N1ZXIsIC4uLmFyZ3MpO1xuICAgICAgICByZXBvcnRNZXRob2QoZmluYWxNZXNzYWdlKTtcblxuICAgICAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yICYmIG1lc3NhZ2Uuc3RhY2sgJiYgdGhpcy5sb2dTdGFja1RyYWNlKVxuICAgICAgICAgICAgcmVwb3J0TWV0aG9kKHRoaXMuYnVpbGRNZXNzYWdlKGBcXG4tLSBTdGFja1N0cmFjZTpcXG57MH1gLCBsZXZlbCwgaXNzdWVyLCBtZXNzYWdlLnN0YWNrKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBpbmZvKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlcG9ydChtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLklORk8sIGlzc3VlciwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgYWxsKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlcG9ydChtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLkFMTCwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBkZWJ1ZyhtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXBvcnQobWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5ERUJVRywgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICB3YXJuKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlcG9ydChtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLldBUk4sIGlzc3VlciwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgZXJyb3IobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuRVJST1IsIGlzc3VlciwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgY3JpdGljYWwobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuQ1JJVElDQUwsIGlzc3VlciwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgc2V0TGV2ZWwobGV2ZWw6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmRlYnVnKHN0cmluZ0Zvcm1hdChMT0dHSU5HX01TRy5MRVZFTF9DSEFOR0VELCB0aGlzLmxldmVsLnRvU3RyaW5nKCksIGxldmVsLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgIH1cbn1cblxubGV0IGN1cnJlbnRMb2dnZXI6IExvZ2dlcjtcblxuLyoqXG4gKiBnZXRzIHRoZSBjdXJyZW50IExvZ2dlclxuICpcbiAqIEBmdW5jdGlvbiBnZXRMb2dnZXJcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5sb2dnaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dnZXIoKXtcbiAgICBpZiAoIWN1cnJlbnRMb2dnZXIpXG4gICAgICAgIGN1cnJlbnRMb2dnZXIgPSBuZXcgTG9nZ2VySW1wKCk7XG4gICAgcmV0dXJuIGN1cnJlbnRMb2dnZXI7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbG9nZ2VyXG4gKlxuICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICpcbiAqIEBmdW5jdGlvbiBzZXRMb2dnZXJcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5sb2dnaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2dnZXIobG9nZ2VyOiBMb2dnZXIpe1xuICAgIGN1cnJlbnRMb2dnZXIgPSBsb2dnZXI7XG4gICAgZ2V0TG9nZ2VyKCkuZGVidWcoTE9HR0lOR19NU0cuTE9HR0VSX0NIQU5HRUQpO1xufVxuXG4vKipcbiAqIFJlcG9ydHMgYSBtZXNzYWdlIHRvIHRoZSBsb2dnZXIgdW5kZXIgdGhlIGxldmVsIHtAbGluayBMT0dHRVJfTEVWRUxTLklORk99XG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqXG4gKiBAZnVuY3Rpb24gaW5mb1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGluZm8gPSBmdW5jdGlvbih0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgZ2V0TG9nZ2VyKCkuaW5mbyhtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuQUxMfVxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gKlxuICogQGZ1bmN0aW9uIGFsbFxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGFsbCA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS5hbGwobWVzc2FnZSwgdGhpcywgLi4uYXJncyk7XG59XG4vKipcbiAqIFJlcG9ydHMgYSBtZXNzYWdlIHRvIHRoZSBsb2dnZXIgdW5kZXIgdGhlIGxldmVsIHtAbGluayBMT0dHRVJfTEVWRUxTLkRFQlVHfVxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gKlxuICogQGZ1bmN0aW9uIGRlYnVnXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3QgZGVidWcgPSBmdW5jdGlvbih0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgZ2V0TG9nZ2VyKCkuZGVidWcobWVzc2FnZSwgdGhpcywgLi4uYXJncyk7XG59XG4vKipcbiAqIFJlcG9ydHMgYSBtZXNzYWdlIHRvIHRoZSBsb2dnZXIgdW5kZXIgdGhlIGxldmVsIHtAbGluayBMT0dHRVJfTEVWRUxTLldBUk59XG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqXG4gKiBAZnVuY3Rpb24gd2FyblxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IHdhcm4gPSBmdW5jdGlvbih0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgZ2V0TG9nZ2VyKCkud2FybihtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuRVJST1J9XG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqXG4gKiBAZnVuY3Rpb24gZXJyb3JcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5sb2dnaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBlcnJvciA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS5lcnJvcihtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuQ1JJVElDQUx9XG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqXG4gKiBAZnVuY3Rpb24gY3JpdGljYWxcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5sb2dnaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBjcml0aWNhbCA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS5jcml0aWNhbChtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn0iXX0=
