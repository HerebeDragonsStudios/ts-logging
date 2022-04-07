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
var general_1 = require("./general");
var constants_1 = require("./constants");
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
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, constants_1.LOGGER_LEVELS.ALL, callback], args, false));
}
exports.allCallback = allCallback;
function debugCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, constants_1.LOGGER_LEVELS.DEBUG, callback], args, false));
}
exports.debugCallback = debugCallback;
function infoCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, constants_1.LOGGER_LEVELS.INFO, callback], args, false));
}
exports.infoCallback = infoCallback;
function warningCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, constants_1.LOGGER_LEVELS.WARN, callback], args, false));
}
exports.warningCallback = warningCallback;
function errorCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, constants_1.LOGGER_LEVELS.ERROR, callback], args, false));
}
exports.errorCallback = errorCallback;
function criticalCallback(message, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    loggedCallback.call.apply(loggedCallback, __spreadArray([this, message, constants_1.LOGGER_LEVELS.CRITICAL, callback], args, false));
}
exports.criticalCallback = criticalCallback;
var LoggedError = (function (_super) {
    __extends(LoggedError, _super);
    function LoggedError(error, issuer, level) {
        var _a;
        if (issuer === void 0) { issuer = undefined; }
        if (level === void 0) { level = constants_1.LOGGER_LEVELS.ALL; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var _this = _super.call(this, error instanceof Error ? error.message : error) || this;
        _this.name = LoggedError.constructor.name;
        _this.loggedAt = error instanceof Error && error.name === LoggedError.constructor.name ? error.loggedAt : undefined;
        _this.issuer = issuer;
        if (error.loggedAt === undefined || error.loggedAt < level) {
            (_a = (0, general_1.getLogger)()).report.apply(_a, __spreadArray([_this, level, issuer], args, false));
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
        return _super.apply(this, __spreadArray([error, issuer, constants_1.LOGGER_LEVELS.CRITICAL], args, false)) || this;
    }
    return CriticalError;
}(LoggedError));
exports.CriticalError = CriticalError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnaW5nL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBb0M7QUFDcEMseUNBQW1FO0FBYW5FLFNBQWdCLGNBQWMsQ0FBWSxPQUFzQixFQUFFLEtBQWEsRUFBRSxRQUFrQjtJQUFFLGNBQWM7U0FBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1FBQWQsNkJBQWM7O0lBRS9HLElBQUksT0FBTyxZQUFZLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxLQUFLO1FBQzFILE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLElBQU0sS0FBSyxRQUFvQixXQUFXLFlBQVgsV0FBVyx5QkFBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLEtBQUssR0FBSyxJQUFJLFlBQUMsQ0FBQztJQUMvSCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQU5ELHdDQU1DO0FBWUQsU0FBZ0IsV0FBVyxDQUFZLE9BQXNCLEVBQUUsUUFBa0I7SUFBRSxjQUFjO1NBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztRQUFkLDZCQUFjOztJQUM3RixjQUFjLENBQUMsSUFBSSxPQUFuQixjQUFjLGlCQUFNLElBQUksRUFBRSxPQUFPLEVBQUUseUJBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxHQUFLLElBQUksVUFBRTtBQUM3RSxDQUFDO0FBRkQsa0NBRUM7QUFZRCxTQUFnQixhQUFhLENBQVksT0FBc0IsRUFBRSxRQUFrQjtJQUFFLGNBQWM7U0FBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1FBQWQs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QUF1QjtRQUF2Qix1QkFBQSxFQUFBLGtCQUF1QjtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O2lEQUMvRCxLQUFLLEVBQUUsTUFBTSxFQUFFLHlCQUFhLENBQUMsUUFBUSxHQUFLLElBQUk7SUFDeEQsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FKQSxBQUlDLENBSmtDLFdBQVcsR0FJN0M7QUFKWSxzQ0FBYSIsImZpbGUiOiJsb2dnaW5nL2Vycm9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0TG9nZ2VyfSBmcm9tIFwiLi9nZW5lcmFsXCI7XG5pbXBvcnQge0NhbGxiYWNrLCBMT0dHRVJfTEVWRUxTLCBMb2dnZXJNZXNzYWdlfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbFxuICogQHBhcmFtIHtDYWxsYmFja30gY2FsbGJhY2tcbiAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICpcbiAqIEBmdW5jdGlvbiBsb2dnZWRDYWxsYmFja1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmVycm9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9nZ2VkQ2FsbGJhY2sodGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBsZXZlbDogbnVtYmVyLCBjYWxsYmFjazogQ2FsbGJhY2ssIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IgJiYgbWVzc2FnZS5uYW1lID09PSBMb2dnZWRFcnJvci5jb25zdHJ1Y3Rvci5uYW1lICYmIG1lc3NhZ2UubG9nZ2VkQXQgJiYgbWVzc2FnZS5sb2dnZXRBdCA+PSBsZXZlbClcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpO1xuICAgIGNvbnN0IGVycm9yOiBMb2dnZWRFcnJvciA9IG5ldyBMb2dnZWRFcnJvcihtZXNzYWdlLCB0aGlzICYmIHRoaXMubmFtZSAhPT0gXCJsb2dnZWRDYWxsYmFja1wiID8gdGhpcyA6IHVuZGVmaW5lZCwgbGV2ZWwsIC4uLmFyZ3MpO1xuICAgIGNhbGxiYWNrKGVycm9yKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gKlxuICogQGZ1bmN0aW9uIGFsbENhbGxiYWNrXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMuZXJyb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbGxDYWxsYmFjayh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGNhbGxiYWNrOiBDYWxsYmFjaywgLi4uYXJnczogYW55W10pIHtcbiAgICBsb2dnZWRDYWxsYmFjay5jYWxsKHRoaXMsIG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuQUxMLCBjYWxsYmFjaywgLi4uYXJncyk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHtDYWxsYmFja30gY2FsbGJhY2tcbiAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICpcbiAqIEBmdW5jdGlvbiBkZWJ1Z0NhbGxiYWNrXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMuZXJyb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1Z0NhbGxiYWNrKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgY2FsbGJhY2s6IENhbGxiYWNrLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGxvZ2dlZENhbGxiYWNrLmNhbGwodGhpcywgbWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5ERUJVRywgY2FsbGJhY2ssIC4uLmFyZ3MpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7Q2FsbGJhY2t9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAqXG4gKiBAZnVuY3Rpb24gaW5mb0NhbGxiYWNrXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMuZXJyb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmZvQ2FsbGJhY2sodGhpczogYW55LCBtZXNzYWdlOiBMb2dnZXJNZXNzYWdlLCBjYWxsYmFjazogQ2FsbGJhY2ssIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgbG9nZ2VkQ2FsbGJhY2suY2FsbCh0aGlzLCBtZXNzYWdlLCBMT0dHRVJfTEVWRUxTLklORk8sIGNhbGxiYWNrLCAuLi5hcmdzKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtMb2dnZXJNZXNzYWdlfSBtZXNzYWdlXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdXG4gKlxuICogQGZ1bmN0aW9uIHdhcm5pbmdDYWxsYmFja1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmVycm9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gd2FybmluZ0NhbGxiYWNrKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgY2FsbGJhY2s6IENhbGxiYWNrLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGxvZ2dlZENhbGxiYWNrLmNhbGwodGhpcywgbWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5XQVJOLCBjYWxsYmFjaywgLi4uYXJncyk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHtDYWxsYmFja30gY2FsbGJhY2tcbiAqIEBwYXJhbSB7YW55W119IFthcmdzXVxuICpcbiAqIEBmdW5jdGlvbiBlcnJvckNhbGxiYWNrXG4gKlxuICogQG1lbWJlck9mIGRiLWRlY29yYXRvcnMuZXJyb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckNhbGxiYWNrKHRoaXM6IGFueSwgbWVzc2FnZTogTG9nZ2VyTWVzc2FnZSwgY2FsbGJhY2s6IENhbGxiYWNrLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGxvZ2dlZENhbGxiYWNrLmNhbGwodGhpcywgbWVzc2FnZSwgTE9HR0VSX0xFVkVMUy5FUlJPUiwgY2FsbGJhY2ssIC4uLmFyZ3MpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0xvZ2dlck1lc3NhZ2V9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7Q2FsbGJhY2t9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBbYXJnc11cbiAqXG4gKiBAZnVuY3Rpb24gY3JpdGljYWxDYWxsYmFja1xuICpcbiAqIEBtZW1iZXJPZiBkYi1kZWNvcmF0b3JzLmVycm9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JpdGljYWxDYWxsYmFjayh0aGlzOiBhbnksIG1lc3NhZ2U6IExvZ2dlck1lc3NhZ2UsIGNhbGxiYWNrOiBDYWxsYmFjaywgLi4uYXJnczogYW55W10pIHtcbiAgICBsb2dnZWRDYWxsYmFjay5jYWxsKHRoaXMsIG1lc3NhZ2UsIExPR0dFUl9MRVZFTFMuQ1JJVElDQUwsIGNhbGxiYWNrLCAuLi5hcmdzKTtcbn1cblxuLyoqXG4gKiBXcmFwcGVyIENsYXNzIGZvciBMb2dnZWQgRXJyb3JzXG4gKiBXaWxsIHRyaWdnZXIgYSBjYWxsIHRvIHRoZSBsb2dnZXIgaWYgaXQgaGFzbid0IGJlZW4gbG9nZ2VkIGJlZm9yZSBvbyBpZiBpdCdzIGJlaW5nIGNhbGxlZCBhdCBhIGhpZ2hlciBsZXZlbFxuICpcbiAqIEBwYXJhbSB7TG9nZ2VyTWVzc2FnZX0gZXJyb3JcbiAqIEBwYXJhbSB7YW55fSBbaXNzdWVyXVxuICogQHBhcmFtIHtudW1iZXJ9IGxldmVsIGRlZmF1bHRzIHRvIHtAbGluayBMT0dHRVJfTEVWRUxTLkVSUk9SfVxuICogQHBhcmFtIHthbnlbXX0gW2FyZ3NdIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgYXMgcmVwbGFjZW1lbnRzIHRvIHRoZSBsb2dnZXJcbiAqXG4gKiBAY2xhc3MgTG9nZ2VkRXJyb3JcbiAqIEBleHRlbmRzIEVycm9yXG4gKlxuICovXG5leHBvcnQgY2xhc3MgTG9nZ2VkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGxvZ2dlZFxuICAgICAqL1xuICAgIGxvZ2dlZEF0PzogbnVtYmVyO1xuICAgIGlzc3Vlcj86IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGVycm9yOiBMb2dnZXJNZXNzYWdlLCBpc3N1ZXI6IGFueSA9IHVuZGVmaW5lZCwgbGV2ZWw6IG51bWJlciA9IExPR0dFUl9MRVZFTFMuQUxMLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBzdXBlcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGVycm9yKTtcbiAgICAgICAgdGhpcy5uYW1lID0gTG9nZ2VkRXJyb3IuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmxvZ2dlZEF0ID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5uYW1lID09PSBMb2dnZWRFcnJvci5jb25zdHJ1Y3Rvci5uYW1lID8gZXJyb3IubG9nZ2VkQXQgOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaXNzdWVyID0gaXNzdWVyO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGVycm9yLmxvZ2dlZEF0ID09PSB1bmRlZmluZWQgfHwgZXJyb3IubG9nZ2VkQXQgPCBsZXZlbCkge1xuICAgICAgICAgICAgZ2V0TG9nZ2VyKCkucmVwb3J0KHRoaXMsIGxldmVsLCBpc3N1ZXIsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgdGhpcy5sb2dnZWRBdCA9IGxldmVsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFdyYXBwZXIgQ2xhc3MgZm9yIENyaXRpY2FsIEVycm9yc1xuICpcbiAqIEBjbGFzcyBDcml0aWNhbEVycm9yXG4gKiBAZXh0ZW5kcyBMb2dnZWRFcnJvclxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENyaXRpY2FsRXJyb3IgZXh0ZW5kcyBMb2dnZWRFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZXJyb3I6IExvZ2dlck1lc3NhZ2UsIGlzc3VlcjogYW55ID0gdW5kZWZpbmVkLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBzdXBlcihlcnJvciwgaXNzdWVyLCBMT0dHRVJfTEVWRUxTLkNSSVRJQ0FMLCAuLi5hcmdzKTtcbiAgICB9XG59Il19
