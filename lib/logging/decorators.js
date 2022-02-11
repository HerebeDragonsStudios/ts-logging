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
exports.logSync = exports.logAsync = exports.StopWatch = void 0;
var errors_1 = require("../errors");
var logging_1 = require("./logging");
var constants_1 = require("./constants");
var StopWatch = (function () {
    function StopWatch() {
    }
    StopWatch.prototype.start = function () {
        this.startTime = Date.now();
    };
    StopWatch.prototype.check = function () {
        if (!this.startTime)
            throw new Error('StopWatch didnt start');
        return Date.now() - this.startTime;
    };
    StopWatch.prototype.stop = function () {
        var result = this.check();
        this.startTime = undefined;
        return result;
    };
    return StopWatch;
}());
exports.StopWatch = StopWatch;
function logAsync(level, benchmark) {
    if (level === void 0) { level = constants_1.LOGGER_LEVELS.DEBUG; }
    if (!benchmark && typeof level === 'boolean') {
        benchmark = level;
        level = constants_1.LOGGER_LEVELS.DEBUG;
    }
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        var methodWrapper = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var callback = args.pop();
            if (!callback || typeof callback !== 'function')
                throw new errors_1.CriticalError("Missing Callback");
            var name = this.name && this.name !== 'Function' ? this.name : this.constructor && this.constructor.name || this;
            (0, logging_1.getLogger)().report("[{0}] - Entering Method {1} with args: {2}", level, name, propertyKey, args.map(function (a) { return a.toString(); }).join(' | '));
            var stopWatch;
            var cb = function (err) {
                var results = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    results[_i - 1] = arguments[_i];
                }
                if (stopWatch)
                    (0, logging_1.getLogger)().report("[{0}][BENCHMARK] - Leaving Method {1} after {2}ms", level, name, propertyKey, stopWatch.stop());
                if (err) {
                    (0, logging_1.getLogger)().report("[{0}][ERROR] - Leaving Method {1} with error {2}", level, name, propertyKey, err);
                    return callback(err);
                }
                (0, logging_1.getLogger)().report("[{0}] - Leaving Method {1} with results: {2}", level, name, propertyKey, results ? results.map(function (a) { return a.toString(); }).join(' | ') : "void");
                callback.apply(void 0, __spreadArray([undefined], results, false));
            };
            if (benchmark) {
                stopWatch = new StopWatch();
                stopWatch.start();
            }
            originalMethod.call.apply(originalMethod, __spreadArray(__spreadArray([this.__originalObject || this], args, false), [cb], false));
        };
        descriptor.value = methodWrapper;
    };
}
exports.logAsync = logAsync;
function logSync(level, benchmark) {
    if (level === void 0) { level = constants_1.LOGGER_LEVELS.DEBUG; }
    if (!benchmark && typeof level === 'boolean') {
        benchmark = level;
        level = constants_1.LOGGER_LEVELS.DEBUG;
    }
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        var methodWrapper = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var name = this.name && this.name !== 'Function' ? this.name : this.constructor && this.constructor.name || this;
            (0, logging_1.getLogger)().report("[{0}] - Entering Method {1} with args: {2}", level, name, propertyKey, args.map(function (a) { return a.toString(); }).join(' | '));
            var stopWatch = undefined;
            var result;
            if (benchmark) {
                stopWatch = new StopWatch();
                stopWatch.start();
            }
            try {
                result = originalMethod.call.apply(originalMethod, __spreadArray([this.__originalObject || this], args, false));
            }
            catch (e) {
                if (stopWatch)
                    (0, logging_1.getLogger)().report("[{0}][BENCHMARK] - Leaving Method {1} after {2}ms", level, name, propertyKey, stopWatch.stop());
                (0, logging_1.getLogger)().report("[{0}][ERROR] - Leaving Method {1} with error {2}", level, name, propertyKey, e);
                throw e;
            }
            if (stopWatch)
                (0, logging_1.getLogger)().report("[{0}][BENCHMARK] - Leaving Method {1} after {2}ms", level, name, propertyKey, stopWatch.stop());
            (0, logging_1.getLogger)().report("[{0}] - Leaving Method {1} with results: {2}", level, name, propertyKey, result ? result : "void");
            return result;
        };
        descriptor.value = methodWrapper;
    };
}
exports.logSync = logSync;
//# sourceMappingURL=decorators.js.map