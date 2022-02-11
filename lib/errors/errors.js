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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriticalError = exports.LoggedError = exports.criticalCallback = exports.errorCallback = exports.warningCallback = exports.infoCallback = exports.debugCallback = exports.allCallback = exports.loggedCallback = void 0;
var logging_1 = require("../logging");
function loggedCallback(message, level, callback) {
    if (!callback) {
        callback = level;
        level = logging_1.LOGGER_LEVELS.INFO;
    }
    (0, logging_1.getLogger)().report(message instanceof Error ? message : new LoggedError(message), level, this.name !== "loggedCallback" ? this : undefined);
    callback(message);
}
exports.loggedCallback = loggedCallback;
function allCallback(message, callback) {
    loggedCallback.call(this, message, logging_1.LOGGER_LEVELS.ALL, callback);
}
exports.allCallback = allCallback;
function debugCallback(message, callback) {
    loggedCallback.call(this, message, logging_1.LOGGER_LEVELS.DEBUG, callback);
}
exports.debugCallback = debugCallback;
function infoCallback(message, callback) {
    loggedCallback.call(this, message, logging_1.LOGGER_LEVELS.INFO, callback);
}
exports.infoCallback = infoCallback;
function warningCallback(message, callback) {
    loggedCallback.call(this, message, logging_1.LOGGER_LEVELS.WARN, callback);
}
exports.warningCallback = warningCallback;
function errorCallback(message, callback) {
    loggedCallback.call(this, message, logging_1.LOGGER_LEVELS.ERROR, callback);
}
exports.errorCallback = errorCallback;
function criticalCallback(message, callback) {
    loggedCallback.call(this, message, logging_1.LOGGER_LEVELS.CRITICAL, callback);
}
exports.criticalCallback = criticalCallback;
var LoggedError = (function (_super) {
    __extends(LoggedError, _super);
    function LoggedError(error, level) {
        if (level === void 0) { level = logging_1.LOGGER_LEVELS.ERROR; }
        var _this = _super.call(this, error instanceof Error ? error.message : error) || this;
        _this.logged = false;
        _this.logged = error instanceof LoggedError && error.logged;
        if (!_this.logged)
            (0, logging_1.getLogger)().report(error, level);
        return _this;
    }
    return LoggedError;
}(Error));
exports.LoggedError = LoggedError;
var CriticalError = (function (_super) {
    __extends(CriticalError, _super);
    function CriticalError(error) {
        return _super.call(this, error, logging_1.LOGGER_LEVELS.CRITICAL) || this;
    }
    return CriticalError;
}(LoggedError));
exports.CriticalError = CriticalError;
//# sourceMappingURL=errors.js.map