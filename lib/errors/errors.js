"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CriticalError = exports.LoggedError = exports.criticalCallback = exports.errorCallback = exports.warningCallback = exports.infoCallback = exports.debugCallback = exports.allCallback = exports.loggedCallback = void 0;
var logging_1 = require("../logging");
function loggedCallback(message, level, callback) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var error = new (LoggedError.bind.apply(LoggedError, __spreadArray([void 0, message, this && this.name !== "loggedCallback" ? this : undefined, level], args, false)))();
    callback(error);
}
exports.loggedCallback = loggedCallback;
function allCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, logging_1.LOGGER_LEVELS.ALL, callback], args, false));
}
exports.allCallback = allCallback;
function debugCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, logging_1.LOGGER_LEVELS.DEBUG, callback], args, false));
}
exports.debugCallback = debugCallback;
function infoCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, logging_1.LOGGER_LEVELS.INFO, callback], args, false));
}
exports.infoCallback = infoCallback;
function warningCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, logging_1.LOGGER_LEVELS.WARN, callback], args, false));
}
exports.warningCallback = warningCallback;
function errorCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, logging_1.LOGGER_LEVELS.ERROR, callback], args, false));
}
exports.errorCallback = errorCallback;
function criticalCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, logging_1.LOGGER_LEVELS.CRITICAL, callback], args, false));
}
exports.criticalCallback = criticalCallback;
var LoggedError = (function (_super) {
    __extends(LoggedError, _super);
    function LoggedError(error, issuer, level) {
        var _a;
        if (issuer === void 0) { issuer = undefined; }
        if (level === void 0) { level = logging_1.LOGGER_LEVELS.ALL; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var _this = _super.call(this, error instanceof Error ? error.message : error) || this;
        _this.name = "LoggedError";
        _this.loggedAt = error instanceof Error && error.name === 'LoggedError' ? error.loggedAt : undefined;
        _this.issuer = issuer;
        if (error.loggedAt === undefined || error.loggedAt < level) {
            (_a = (0, logging_1.getLogger)()).report.apply(_a, __spreadArray([_this, level, issuer], args, false));
            _this.loggedAt = level;
        }
        return _this;
    }
    return LoggedError;
}(Error));
exports.LoggedError = LoggedError;
var CriticalError = (function (_super) {
    __extends(CriticalError, _super);
    function CriticalError(error, issuer) {
        if (issuer === void 0) { issuer = undefined; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([error, issuer, logging_1.LOGGER_LEVELS.CRITICAL], args, false)) || this;
    }
    return CriticalError;
}(LoggedError));
exports.CriticalError = CriticalError;
//# sourceMappingURL=errors.js.map