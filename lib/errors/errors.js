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
    if (message instanceof Error && message.name === LoggedError.constructor.name && message.loggedAt && message.loggetAt >= level)
        return callback(message);
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
        _this.name = LoggedError.constructor.name;
        _this.loggedAt = error instanceof Error && error.name === LoggedError.constructor.name ? error.loggedAt : undefined;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUEsRUFBQSxrQkFBdUI7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztpREFDL0QsS0FBSyxFQUFFLE1BQU0sRUFBRSx1QkFBYSxDQUFDLFFBQVEsR0FBSyxJQUFJO0lBQ3hELENBQUM7SUFDTCxvQkFBQztBQUFELENBSkEsQUFJQyxDQUprQyxXQUFXLEdBSTdDO0FBSlksc0NBQWEiLCJmaWxlIjoiZXJyb3JzL2Vycm9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2FsbGJhY2ssIGdldExvZ2dlciwgTE9HR0VSX0xFVkVMUywgTG9nZ2VyTWVzc2FnZX0gZnJvbSBcIi4uL2xvZ2dpbmdcIjtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbFxuICogQHBhcmFtIHtDYWxsYmFja30gY2FsbGJhY2tcbiAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICpcbiAqIEBmdW5jdGlvbiBsb2dnZWRDYWxsYmFja1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmVycm9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9nZ2VkQ2FsbGJhY2sodGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBsZXZlbDogbnVtYmVyLCBjYWxsYmFjazogQ2FsbGJhY2ssIC4uLmFyZ3M6IGFueVtdKXtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvciAmJiBtZXNzYWdlLm5hbWUgPT09IExvZ2dlZEVycm9yLmNvbnN0cnVjdG9yLm5hbWUgJiYgbWVzc2FnZS5sb2dnZWRBdCAmJiBtZXNzYWdlLmxvZ2dldEF0ID49IGxldmVsKVxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7XG4gICAgY29uc3QgZXJyb3I6IExvZ2dlZEVycm9yID0gbmV3IExvZ2dlZEVycm9yKG1lc3NhZ2UsIHRoaXMgJiYgdGhpcy5uYW1lICE9PSBcImxvZ2dlZENhbGxiYWNrXCIgPyB0aGlzIDogdW5kZWZpbmVkLCBsZXZlbCwgLi4uYXJncyk7XG4gICAgY2FsbGJhY2soZXJyb3IpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7Q2FsbGJhY2t9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAqXG4gKiBAZnVuY3Rpb24gYWxsQ2FsbGJhY2tcbiAqXG4gKiBAbWVtYmVyT2YgZGItZGVjb3JhdG9ycy5lcnJvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFsbENhbGxiYWNrKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgY2FsbGJhY2s6IENhbGxiYWNrLCAuLi5hcmdzOiBhbnlbXSl7XG4gICAgbG9nZ2VkQ2FsbGJhY2suY2FsbCh0aGlzLCBtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLkFMTCwgY2FsbGJhY2ssIC4uLmFyZ3MpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7Q2FsbGJhY2t9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAqXG4gKiBAZnVuY3Rpb24gZGVidWdDYWxsYmFja1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmVycm9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVidWdDYWxsYmFjayh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGNhbGxiYWNrOiBDYWxsYmFjaywgLi4uYXJnczogYW55W10pe1xuICAgIGxvZ2dlZENhbGxiYWNrLmNhbGwodGhpcywgbWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5ERUJVRywgY2FsbGJhY2ssIC4uLmFyZ3MpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7Q2FsbGJhY2t9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAqXG4gKiBAZnVuY3Rpb24gaW5mb0NhbGxiYWNrXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMuZXJyb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmZvQ2FsbGJhY2sodGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBjYWxsYmFjazogQ2FsbGJhY2ssIC4uLmFyZ3M6IGFueVtdKXtcbiAgICBsb2dnZWRDYWxsYmFjay5jYWxsKHRoaXMsIG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuSU5GTywgY2FsbGJhY2ssIC4uLmFyZ3MpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7Q2FsbGJhY2t9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAqXG4gKiBAZnVuY3Rpb24gd2FybmluZ0NhbGxiYWNrXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMuZXJyb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YXJuaW5nQ2FsbGJhY2sodGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBjYWxsYmFjazogQ2FsbGJhY2ssIC4uLmFyZ3M6IGFueVtdKXtcbiAgICBsb2dnZWRDYWxsYmFjay5jYWxsKHRoaXMsIG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuV0FSTiwgY2FsbGJhY2ssIC4uLmFyZ3MpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7Q2FsbGJhY2t9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAqXG4gKiBAZnVuY3Rpb24gZXJyb3JDYWxsYmFja1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmVycm9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JDYWxsYmFjayh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGNhbGxiYWNrOiBDYWxsYmFjaywgLi4uYXJnczogYW55W10pe1xuICAgIGxvZ2dlZENhbGxiYWNrLmNhbGwodGhpcywgbWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5FUlJPUiwgY2FsbGJhY2ssIC4uLmFyZ3MpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7Q2FsbGJhY2t9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAqXG4gKiBAZnVuY3Rpb24gY3JpdGljYWxDYWxsYmFja1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmVycm9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JpdGljYWxDYWxsYmFjayh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGNhbGxiYWNrOiBDYWxsYmFjaywgLi4uYXJnczogYW55W10pe1xuICAgIGxvZ2dlZENhbGxiYWNrLmNhbGwodGhpcywgbWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5DUklUSUNBTCwgY2FsbGJhY2ssIC4uLmFyZ3MpO1xufVxuXG4vKipcbiAqIFdyYXBwZXIgQ2xhc3MgZm9yIExvZ2dlZCBFcnJvcnNcbiAqIFdpbGwgdHJpZ2dlciBhIGNhbGwgdG8gdGhlIGxvZ2dlciBpZiBpdCBoYXNuJ3QgYmVlbiBsb2dnZWQgYmVmb3JlIG9vIGlmIGl0J3MgYmVpbmcgY2FsbGVkIGF0IGEgaGlnaGVyIGxldmVsXG4gKlxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBlcnJvclxuICogQHBhcmFtIHthbnl9IFtpc3N1ZXJdXG4gKiBAcGFyYW0ge251bWJlcn0gbGV2ZWwgZGVmYXVsdHMgdG8ge0BsaW5rIExPR0dFUl9MRVZFTFMuRVJST1J9XG4gKiBAcGFyYW0ge2FueVtdfSBbYXJnc10gYXJndW1lbnRzIHRvIGJlIHBhc3NlZCBhcyByZXBsYWNlbWVudHMgdG8gdGhlIGxvZ2dlclxuICpcbiAqIEBjbGFzcyBMb2dnZWRFcnJvclxuICogQGV4dGVuZHMgRXJyb3JcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2dnZWRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gbG9nZ2VkXG4gICAgICovXG4gICAgbG9nZ2VkQXQ/OiBudW1iZXI7XG4gICAgaXNzdWVyPzogYW55O1xuXG4gICAgY29uc3RydWN0b3IoZXJyb3I6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCBsZXZlbDogbnVtYmVyID0gTE9HR0VSX0xFVkVMUy5BTEwsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHN1cGVyKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IpO1xuICAgICAgICB0aGlzLm5hbWUgPSBMb2dnZWRFcnJvci5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMubG9nZ2VkQXQgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm5hbWUgPT09IExvZ2dlZEVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPyBlcnJvci5sb2dnZWRBdCA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5pc3N1ZXIgPSBpc3N1ZXI7XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZXJyb3IubG9nZ2VkQXQgPT09IHVuZGVmaW5lZCB8fCBlcnJvci5sb2dnZWRBdCA8IGxldmVsKXtcbiAgICAgICAgICAgIGdldExvZ2dlcigpLnJlcG9ydCh0aGlzLCBsZXZlbCwgaXNzdWVyLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VkQXQgPSBsZXZlbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBXcmFwcGVyIENsYXNzIGZvciBDcml0aWNhbCBFcnJvcnNcbiAqXG4gKiBAY2xhc3MgQ3JpdGljYWxFcnJvclxuICogQGV4dGVuZHMgTG9nZ2VkRXJyb3JcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDcml0aWNhbEVycm9yIGV4dGVuZHMgTG9nZ2VkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGVycm9yOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgc3VwZXIoZXJyb3IsIGlzc3VlciwgTE9HR0VSX0xFVkVMUy5DUklUSUNBTCwgLi4uYXJncyk7XG4gICAgfVxufSJdfQ==
