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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Yzs7SUFDMUUsQ0FBQSxLQUFBLFNBQVMsRUFBRSxDQUFBLENBQUMsSUFBSSwwQkFBQyxPQUFPLEVBQUUsSUFBSSxHQUFLLElBQUksVUFBRTtBQUM3QyxDQUFDLENBQUE7QUFGWSxRQUFBLElBQUksUUFFaEI7QUFVTSxJQUFNLEtBQUssR0FBRyxVQUFvQixPQUFzQjs7SUFBRSxjQUFjO1NBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztRQUFkLDZCQUFjOztJQUMzRSxDQUFBLEtBQUEsU0FBUyxFQUFFLENBQUEsQ0FBQyxLQUFLLDBCQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUssSUFBSSxVQUFFO0FBQzlDLENBQUMsQ0FBQTtBQUZZLFFBQUEsS0FBSyxTQUVqQjtBQVVNLElBQU0sUUFBUSxHQUFHLFVBQW9CLE9BQXNCOztJQUFFLGNBQWM7U0FBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1FBQWQsNkJBQWM7O0lBQzlFLENBQUEsS0FBQSxTQUFTLEVBQUUsQ0FBQSxDQUFDLFFBQVEsMEJBQUMsT0FBTyxFQUFFLElBQUksR0FBSyxJQUFJLFVBQUU7QUFDakQsQ0FBQyxDQUFBO0FBRlksUUFBQSxRQUFRLFlBRXBCIiwiZmlsZSI6ImxvZ2dpbmcvbG9nZ2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7REVGQVVMVF9USU1FU1RBTVBfRk9STUFULCBMT0dHRVJfTEVWRUxTLCBMT0dHSU5HX01TR30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2Zvcm1hdERhdGUsIGdldE9iamVjdE5hbWUsIHN0cmluZ0Zvcm1hdH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBAdHlwZWRlZiBMb2dnZXJNZXNzYWdlXG4gKiBAbWVtYmVyT2YgbG9nZ2luZy5sb2dnaW5nXG4gKi9cbmV4cG9ydCB0eXBlIExvZ2dlck1lc3NhZ2UgPSBFcnJvciB8IHN0cmluZztcblxuLyoqXG4gKiBAaW50ZXJmYWNlIExvZ2dlclxuICogQG1lbWJlck9mIGxvZ2dpbmcubG9nZ2luZ1xuICovXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dlciB7XG4gICAgLyoqXG4gICAgICogUmVwb3J0cyBhIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGV2ZWxcbiAgICAgKiBAcGFyYW0ge2FueX0gW2lzc3Vlcl0gdGhlIE9iamVjdC9wcm9jZXNzIHRoYXQgcmVwb3J0cyB0aGUgbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIHJlcG9ydChtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBsZXZlbDogbnVtYmVyLCBpc3N1ZXI6IGFueSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBMb2dnZXIjcmVwb3J0fXMgYSBtZXNzYWdlIHVuZGVyIHtAbGluayBMT0dHRVJfTEVWRUxTLkFMTH1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcbiAgICAgKi9cbiAgICBhbGwobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBMb2dnZXIjcmVwb3J0fXMgYSBtZXNzYWdlIHVuZGVyIHtAbGluayBMT0dHRVJfTEVWRUxTLklORk99XG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXG4gICAgICovXG4gICAgaW5mbyhtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIExvZ2dlciNyZXBvcnR9cyBhIG1lc3NhZ2UgdW5kZXIge0BsaW5rIExPR0dFUl9MRVZFTFMuREVCVUd9XG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXG4gICAgICovXG4gICAgZGVidWcobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBMb2dnZXIjcmVwb3J0fXMgYSBtZXNzYWdlIHVuZGVyIHtAbGluayBMT0dHRVJfTEVWRUxTLldBUk59XG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXG4gICAgICovXG4gICAgd2FybihtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIExvZ2dlciNyZXBvcnR9cyBhIG1lc3NhZ2UgdW5kZXIge0BsaW5rIExPR0dFUl9MRVZFTFMuRVJST1J9XG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXG4gICAgICovXG4gICAgZXJyb3IobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBMb2dnZXIjcmVwb3J0fXMgYSBtZXNzYWdlIHVuZGVyIHtAbGluayBMT0dHRVJfTEVWRUxTLkNSSVRJQ0FMfVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxuICAgICAqL1xuICAgIGNyaXRpY2FsKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBMb2dnZXIgbGV2ZWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbFxuICAgICAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcbiAgICAgKi9cbiAgICBzZXRMZXZlbChsZXZlbDogbnVtYmVyLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XG59XG5cbi8qKlxuICogRGVmYXVsdCBMb2dnZXIgSW1wbGVtZW50YXRpb25cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGVmYXVsdExldmVsIGRlZmF1bHRzIHRvIHtAbGluayBMT0dHRVJfTEVWRUxTLklORk99XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZVRpbWVzdGFtcCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGxvZ0xldmVsXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGxvZ1N0YWNrVHJhY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lc3RhbXBGb3JtYXRcbiAqXG4gKiBAY2xhc3MgTG9nZ2VySW1wXG4gKiBAaW1wbGVtZW50cyBMb2dnZXJcbiAqL1xuZXhwb3J0IGNsYXNzIExvZ2dlckltcCBpbXBsZW1lbnRzIExvZ2dlciB7XG4gICAgcHJpdmF0ZSBsZXZlbDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSB1c2VUaW1lc3RhbXA6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dMZXZlbDogYm9vbGVhbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRpbWVzdGFtcEZvcm1hdDogc3RyaW5nO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nU3RhY2tUcmFjZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRMZXZlbDogbnVtYmVyID0gTE9HR0VSX0xFVkVMUy5JTkZPLCB1c2VUaW1lc3RhbXAgPSB0cnVlLCBsb2dMZXZlbDogYm9vbGVhbiA9IHRydWUsIGxvZ1N0YWNrVHJhY2U6IGJvb2xlYW4gPSBmYWxzZSwgdGltZXN0YW1wRm9ybWF0ID0gREVGQVVMVF9USU1FU1RBTVBfRk9STUFUKXtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGRlZmF1bHRMZXZlbDtcbiAgICAgICAgdGhpcy51c2VUaW1lc3RhbXAgPSB1c2VUaW1lc3RhbXA7XG4gICAgICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcbiAgICAgICAgdGhpcy5sb2dTdGFja1RyYWNlID0gbG9nU3RhY2tUcmFjZTtcbiAgICAgICAgdGhpcy50aW1lc3RhbXBGb3JtYXQgPSB0aW1lc3RhbXBGb3JtYXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbHRzIHRoZSBhY3R1YWwgbG9nZ2luZyBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxvZ0xldmVsIGlmIHRoZSBsZXZlbCBpcyB0byBiZSBsb2dnZWRcbiAgICAgKiBAcGFyYW0ge2FueX0gaXNzdWVyIHdobyBpcyBsb2dnaW5nIHRoZSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGRNZXNzYWdlKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGxvZ0xldmVsOiBudW1iZXIsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSl7XG4gICAgICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpXG4gICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZS5tZXNzYWdlO1xuXG4gICAgICAgIGlmIChpc3N1ZXIpXG4gICAgICAgICAgICBtZXNzYWdlID0gYFske2dldE9iamVjdE5hbWUoaXNzdWVyKX1dIC0gJHttZXNzYWdlfWA7XG4gICAgICAgIGlmICh0aGlzLmxvZ0xldmVsKVxuICAgICAgICAgICAgbWVzc2FnZSA9IGBbJHtPYmplY3Qua2V5cyhMT0dHRVJfTEVWRUxTKVtsb2dMZXZlbF19XSR7aXNzdWVyID8gJycgOiBcIiAtIFwifSR7bWVzc2FnZX1gO1xuICAgICAgICBpZiAodGhpcy51c2VUaW1lc3RhbXApXG4gICAgICAgICAgICBtZXNzYWdlID0gYFske2Zvcm1hdERhdGUobmV3IERhdGUoKSwgdGhpcy50aW1lc3RhbXBGb3JtYXQpfV0ke21lc3NhZ2V9YDtcbiAgICAgICAgcmV0dXJuIHN0cmluZ0Zvcm1hdChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbCBkZWZhdWx0cyB0byB7QGxpbmsgTE9HR0VSX0xFVkVMUy5JTkZPfVxuICAgICAqIEBwYXJhbSB7YW55fSBbaXNzdWVyXSB0aGUgb2JqZWN0IHRoYXQgaXMgY2FsbGluZyB0aGUgcmVwb3J0IG1ldGhvZFxuICAgICAqIEBwYXJhbSB7YW55W119IFthcmdzXSB2YWx1ZXMgdG8gcmVwbGFjZSBpbiB0aGUgbWVzc2FnZSBhY2NvcmRpbmcgdG8gdGhlICd7MH0nIG5vdGF0aW9uXG4gICAgICovXG4gICAgcmVwb3J0KG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGxldmVsOiBudW1iZXIgPSBMT0dHRVJfTEVWRUxTLklORk8sIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSkgOiB2b2lkIHtcbiAgICAgICAgaWYgKGxldmVsIDwgdGhpcy5sZXZlbClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgcmVwb3J0TWV0aG9kOiBGdW5jdGlvbjtcbiAgICAgICAgc3dpdGNoIChsZXZlbCl7XG4gICAgICAgICAgICBjYXNlIExPR0dFUl9MRVZFTFMuV0FSTjpcbiAgICAgICAgICAgICAgICByZXBvcnRNZXRob2QgPSBjb25zb2xlLndhcm47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExPR0dFUl9MRVZFTFMuRVJST1I6XG4gICAgICAgICAgICBjYXNlIExPR0dFUl9MRVZFTFMuQ1JJVElDQUw6XG4gICAgICAgICAgICAgICAgcmVwb3J0TWV0aG9kID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTE9HR0VSX0xFVkVMUy5JTkZPOlxuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLkRFQlVHOlxuICAgICAgICAgICAgY2FzZSBMT0dHRVJfTEVWRUxTLkFMTDpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVwb3J0TWV0aG9kID0gY29uc29sZS5sb2c7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmluYWxNZXNzYWdlID0gdGhpcy5idWlsZE1lc3NhZ2UobWVzc2FnZSwgbGV2ZWwsIGlzc3VlciwgLi4uYXJncyk7XG4gICAgICAgIHJlcG9ydE1ldGhvZChmaW5hbE1lc3NhZ2UpO1xuXG4gICAgICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IgJiYgbWVzc2FnZS5zdGFjayAmJiB0aGlzLmxvZ1N0YWNrVHJhY2UpXG4gICAgICAgICAgICByZXBvcnRNZXRob2QodGhpcy5idWlsZE1lc3NhZ2UoYFxcbi0tIFN0YWNrU3RyYWNlOlxcbnswfWAsIGxldmVsLCBpc3N1ZXIsIG1lc3NhZ2Uuc3RhY2spKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIGluZm8obWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuSU5GTywgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBhbGwobWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuQUxMLCBpc3N1ZXIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIGRlYnVnKG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlcG9ydChtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLkRFQlVHLCBpc3N1ZXIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIHdhcm4obWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgaXNzdWVyOiBhbnkgPSB1bmRlZmluZWQsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwb3J0KG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuV0FSTiwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBlcnJvcihtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXBvcnQobWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5FUlJPUiwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBjcml0aWNhbChtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXBvcnQobWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5DUklUSUNBTCwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBzZXRMZXZlbChsZXZlbDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVidWcoc3RyaW5nRm9ybWF0KExPR0dJTkdfTVNHLkxFVkVMX0NIQU5HRUQsIHRoaXMubGV2ZWwudG9TdHJpbmcoKSwgbGV2ZWwudG9TdHJpbmcoKSkpO1xuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgfVxufVxuXG5sZXQgY3VycmVudExvZ2dlcjogTG9nZ2VyO1xuXG4vKipcbiAqIGdldHMgdGhlIGN1cnJlbnQgTG9nZ2VyXG4gKlxuICogQGZ1bmN0aW9uIGdldExvZ2dlclxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2dlcigpe1xuICAgIGlmICghY3VycmVudExvZ2dlcilcbiAgICAgICAgY3VycmVudExvZ2dlciA9IG5ldyBMb2dnZXJJbXAoKTtcbiAgICByZXR1cm4gY3VycmVudExvZ2dlcjtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsb2dnZXJcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gKlxuICogQGZ1bmN0aW9uIHNldExvZ2dlclxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldExvZ2dlcihsb2dnZXI6IExvZ2dlcil7XG4gICAgY3VycmVudExvZ2dlciA9IGxvZ2dlcjtcbiAgICBnZXRMb2dnZXIoKS5kZWJ1ZyhMT0dHSU5HX01TRy5MT0dHRVJfQ0hBTkdFRCk7XG59XG5cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuSU5GT31cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiBpbmZvXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3QgaW5mbyA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS5pbmZvKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufVxuLyoqXG4gKiBSZXBvcnRzIGEgbWVzc2FnZSB0byB0aGUgbG9nZ2VyIHVuZGVyIHRoZSBsZXZlbCB7QGxpbmsgTE9HR0VSX0xFVkVMUy5BTEx9XG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqXG4gKiBAZnVuY3Rpb24gYWxsXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3QgYWxsID0gZnVuY3Rpb24odGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGdldExvZ2dlcigpLmFsbChtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuREVCVUd9XG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqXG4gKiBAZnVuY3Rpb24gZGVidWdcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5sb2dnaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1ZyA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS5kZWJ1ZyhtZXNzYWdlLCB0aGlzLCAuLi5hcmdzKTtcbn1cbi8qKlxuICogUmVwb3J0cyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dlciB1bmRlciB0aGUgbGV2ZWwge0BsaW5rIExPR0dFUl9MRVZFTFMuV0FSTn1cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiB3YXJuXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMubG9nZ2luZ1xuICovXG5leHBvcnQgY29uc3Qgd2FybiA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgLi4uYXJnczogYW55W10pIHtcbiAgICBnZXRMb2dnZXIoKS53YXJuKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufVxuLyoqXG4gKiBSZXBvcnRzIGEgbWVzc2FnZSB0byB0aGUgbG9nZ2VyIHVuZGVyIHRoZSBsZXZlbCB7QGxpbmsgTE9HR0VSX0xFVkVMUy5FUlJPUn1cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiBlcnJvclxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGVycm9yID0gZnVuY3Rpb24odGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGdldExvZ2dlcigpLmVycm9yKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufVxuLyoqXG4gKiBSZXBvcnRzIGEgbWVzc2FnZSB0byB0aGUgbG9nZ2VyIHVuZGVyIHRoZSBsZXZlbCB7QGxpbmsgTE9HR0VSX0xFVkVMUy5DUklUSUNBTH1cbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICpcbiAqIEBmdW5jdGlvbiBjcml0aWNhbFxuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmxvZ2dpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGNyaXRpY2FsID0gZnVuY3Rpb24odGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGdldExvZ2dlcigpLmNyaXRpY2FsKG1lc3NhZ2UsIHRoaXMsIC4uLmFyZ3MpO1xufSJdfQ==
