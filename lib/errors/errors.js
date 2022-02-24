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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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ZXJyb3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYWxsYmFjaywgZ2V0TG9nZ2VyLCBMT0dHRVJfTEVWRUxTLCBMb2dnZXJNZXNzYWdlfSBmcm9tIFwiLi4vbG9nZ2luZ1wiO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICogQHBhcmFtIHtudW1iZXJ9IGxldmVsXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gKlxuICogQGZ1bmN0aW9uIGxvZ2dlZENhbGxiYWNrXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMuZXJyb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2dnZWRDYWxsYmFjayh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGxldmVsOiBudW1iZXIsIGNhbGxiYWNrOiBDYWxsYmFjaywgLi4uYXJnczogYW55W10pe1xuICAgIGNvbnN0IGVycm9yOiBMb2dnZWRFcnJvciA9IG5ldyBMb2dnZWRFcnJvcihtZXNzYWdlLCB0aGlzICYmIHRoaXMubmFtZSAhPT0gXCJsb2dnZWRDYWxsYmFja1wiID8gdGhpcyA6IHVuZGVmaW5lZCwgbGV2ZWwsIC4uLmFyZ3MpO1xuICAgIGNhbGxiYWNrKGVycm9yKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gKlxuICogQGZ1bmN0aW9uIGFsbENhbGxiYWNrXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMuZXJyb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbGxDYWxsYmFjayh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGNhbGxiYWNrOiBDYWxsYmFjaywgLi4uYXJnczogYW55W10pe1xuICAgIGxvZ2dlZENhbGxiYWNrLmNhbGwodGhpcywgbWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5BTEwsIGNhbGxiYWNrLCAuLi5hcmdzKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gKlxuICogQGZ1bmN0aW9uIGRlYnVnQ2FsbGJhY2tcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5lcnJvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnQ2FsbGJhY2sodGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBjYWxsYmFjazogQ2FsbGJhY2ssIC4uLmFyZ3M6IGFueVtdKXtcbiAgICBsb2dnZWRDYWxsYmFjay5jYWxsKHRoaXMsIG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuREVCVUcsIGNhbGxiYWNrLCAuLi5hcmdzKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gKlxuICogQGZ1bmN0aW9uIGluZm9DYWxsYmFja1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmVycm9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW5mb0NhbGxiYWNrKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgY2FsbGJhY2s6IENhbGxiYWNrLCAuLi5hcmdzOiBhbnlbXSl7XG4gICAgbG9nZ2VkQ2FsbGJhY2suY2FsbCh0aGlzLCBtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLklORk8sIGNhbGxiYWNrLCAuLi5hcmdzKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gKlxuICogQGZ1bmN0aW9uIHdhcm5pbmdDYWxsYmFja1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmVycm9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gd2FybmluZ0NhbGxiYWNrKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgY2FsbGJhY2s6IENhbGxiYWNrLCAuLi5hcmdzOiBhbnlbXSl7XG4gICAgbG9nZ2VkQ2FsbGJhY2suY2FsbCh0aGlzLCBtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLldBUk4sIGNhbGxiYWNrLCAuLi5hcmdzKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gKlxuICogQGZ1bmN0aW9uIGVycm9yQ2FsbGJhY2tcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5lcnJvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVycm9yQ2FsbGJhY2sodGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBjYWxsYmFjazogQ2FsbGJhY2ssIC4uLmFyZ3M6IGFueVtdKXtcbiAgICBsb2dnZWRDYWxsYmFjay5jYWxsKHRoaXMsIG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuRVJST1IsIGNhbGxiYWNrLCAuLi5hcmdzKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gKlxuICogQGZ1bmN0aW9uIGNyaXRpY2FsQ2FsbGJhY2tcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5lcnJvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyaXRpY2FsQ2FsbGJhY2sodGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBjYWxsYmFjazogQ2FsbGJhY2ssIC4uLmFyZ3M6IGFueVtdKXtcbiAgICBsb2dnZWRDYWxsYmFjay5jYWxsKHRoaXMsIG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuQ1JJVElDQUwsIGNhbGxiYWNrLCAuLi5hcmdzKTtcbn1cblxuLyoqXG4gKiBXcmFwcGVyIENsYXNzIGZvciBMb2dnZWQgRXJyb3JzXG4gKiBXaWxsIHRyaWdnZXIgYSBjYWxsIHRvIHRoZSBsb2dnZXIgaWYgaXQgaGFzbid0IGJlZW4gbG9nZ2VkIGJlZm9yZSBvbyBpZiBpdCdzIGJlaW5nIGNhbGxlZCBhdCBhIGhpZ2hlciBsZXZlbFxuICpcbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gZXJyb3JcbiAqIEBwYXJhbSB7YW55fSBbaXNzdWVyXVxuICogQHBhcmFtIHtudW1iZXJ9IGxldmVsIGRlZmF1bHRzIHRvIHtAbGluayBMT0dHRVJfTEVWRUxTLkVSUk9SfVxuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgYXMgcmVwbGFjZW1lbnRzIHRvIHRoZSBsb2dnZXJcbiAqXG4gKiBAY2xhc3MgTG9nZ2VkRXJyb3JcbiAqIEBleHRlbmRzIEVycm9yXG4gKlxuICovXG5leHBvcnQgY2xhc3MgTG9nZ2VkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGxvZ2dlZFxuICAgICAqL1xuICAgIGxvZ2dlZEF0PzogbnVtYmVyO1xuICAgIGlzc3Vlcj86IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGVycm9yOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgbGV2ZWw6IG51bWJlciA9IExPR0dFUl9MRVZFTFMuQUxMLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBzdXBlcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGVycm9yKTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJMb2dnZWRFcnJvclwiO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMubG9nZ2VkQXQgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm5hbWUgPT09ICdMb2dnZWRFcnJvcicgPyBlcnJvci5sb2dnZWRBdCA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5pc3N1ZXIgPSBpc3N1ZXI7XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZXJyb3IubG9nZ2VkQXQgPT09IHVuZGVmaW5lZCB8fCBlcnJvci5sb2dnZWRBdCA8IGxldmVsKXtcbiAgICAgICAgICAgIGdldExvZ2dlcigpLnJlcG9ydCh0aGlzLCBsZXZlbCwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VkQXQgPSBsZXZlbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBXcmFwcGVyIENsYXNzIGZvciBDcml0aWNhbCBFcnJvcnNcbiAqXG4gKiBAY2xhc3MgQ3JpdGljYWxFcnJvclxuICogQGV4dGVuZHMgTG9nZ2VkRXJyb3JcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDcml0aWNhbEVycm9yIGV4dGVuZHMgTG9nZ2VkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGVycm9yOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgc3VwZXIoZXJyb3IsIGlzc3VlciwgTE9HR0VSX0xFVkVMUy5DUklUSUNBTCwgLi4uYXJncyk7XG4gICAgfVxufSJdfQ==
