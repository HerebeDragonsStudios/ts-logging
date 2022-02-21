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
        if (this.logLevel)
            message = "[".concat(Object.keys(constants_1.LOGGER_LEVELS)[logLevel], "] - ").concat(message);
        if (issuer)
            message = "[".concat(issuer.toString(), "]").concat(message);
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
//# sourceMappingURL=logging.js.map