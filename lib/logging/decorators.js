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
var general_1 = require("./general");
var errors_1 = require("./errors");
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
            (0, general_1.getLogger)().report("[{0}] - Entering Method {1} with args: {2}", level, name, propertyKey, args.map(function (a) { return a.toString(); }).join(' | '));
            var stopWatch;
            var cb = function (err) {
                var results = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    results[_i - 1] = arguments[_i];
                }
                if (stopWatch)
                    (0, general_1.getLogger)().report("[{0}][BENCHMARK] - Leaving Method {1} after {2}ms", level, name, propertyKey, stopWatch.stop());
                if (err) {
                    (0, general_1.getLogger)().report("[{0}][ERROR] - Leaving Method {1} with error {2}", level, name, propertyKey, err);
                    return callback(err);
                }
                (0, general_1.getLogger)().report("[{0}] - Leaving Method {1} with results: {2}", level, name, propertyKey, results ? results.map(function (a) { return a.toString(); }).join(' | ') : "void");
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
            (0, general_1.getLogger)().report("[{0}] - Entering Method {1} with args: {2}", level, name, propertyKey, args.map(function (a) { return a.toString(); }).join(' | '));
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
                    (0, general_1.getLogger)().report("[{0}][BENCHMARK] - Leaving Method {1} after {2}ms", level, name, propertyKey, stopWatch.stop());
                (0, general_1.getLogger)().report("[{0}][ERROR] - Leaving Method {1} with error {2}", level, name, propertyKey, e);
                throw e;
            }
            if (stopWatch)
                (0, general_1.getLogger)().report("[{0}][BENCHMARK] - Leaving Method {1} after {2}ms", level, name, propertyKey, stopWatch.stop());
            (0, general_1.getLogger)().report("[{0}] - Leaving Method {1} with results: {2}", level, name, propertyKey, result ? result : "void");
            return result;
        };
        descriptor.value = methodWrapper;
    };
}
exports.logSync = logSync;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnaW5nL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW9DO0FBQ3BDLG1DQUF1QztBQUN2Qyx5Q0FBeUQ7QUFRekQ7SUFBQTtJQTRCQSxDQUFDO0lBdEJHLHlCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBS0QseUJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFNRCx3QkFBSSxHQUFKO1FBQ0ksSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTCxnQkFBQztBQUFELENBNUJBLEFBNEJDLElBQUE7QUE1QlksOEJBQVM7QUF3Q3RCLFNBQWdCLFFBQVEsQ0FBQyxLQUE2QyxFQUFFLFNBQW1CO0lBQWxFLHNCQUFBLEVBQUEsUUFBMEIseUJBQWEsQ0FBQyxLQUFLO0lBRWxFLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFDO1FBQ3pDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsS0FBSyxHQUFHLHlCQUFhLENBQUMsS0FBSyxDQUFDO0tBQy9CO0lBRUQsT0FBTyxVQUFVLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO1FBRTdFLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFeEMsSUFBTSxhQUFhLEdBQUc7WUFBb0IsY0FBYztpQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJ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TSxDQUFDLENBQUM7YUFDWDtZQUNELElBQUksU0FBUztnQkFDVCxJQUFBLG1CQUFTLEdBQUUsQ0FBQyxNQUFNLENBQUMsbURBQW1ELEVBQUUsS0FBZSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEksSUFBQSxtQkFBUyxHQUFFLENBQUMsTUFBTSxDQUFDLDhDQUE4QyxFQUFFLEtBQWUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqSSxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUE7UUFFRCxVQUFVLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDLENBQUE7QUFDTCxDQUFDO0FBdkNELDBCQXVDQyIsImZpbGUiOiJsb2dnaW5nL2RlY29yYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldExvZ2dlcn0gZnJvbSBcIi4vZ2VuZXJhbFwiO1xuaW1wb3J0IHtDcml0aWNhbEVycm9yfSBmcm9tIFwiLi9lcnJvcnNcIjtcbmltcG9ydCB7Q2FsbGJhY2ssIEVyciwgTE9HR0VSX0xFVkVMU30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogVXRpbCBjbGFzcyB0byBtZWFzdXJlIHRpbWUgYmV0d2VlbiB0d28gcG9pbnRzIGluIHRpbWU7XG4gKlxuICogQGNsYXNzIFN0b3BXYXRjaFxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFN0b3BXYXRjaHtcbiAgICBwcml2YXRlIHN0YXJ0VGltZT86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgc3RhcnQgdGltZVxuICAgICAqL1xuICAgIHN0YXJ0KCl7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gbm93IGFuZCB0aGUgc3RhcnQgdGltZVxuICAgICAqL1xuICAgIGNoZWNrKCk6IG51bWJlciB7XG4gICAgICAgIGlmICghdGhpcy5zdGFydFRpbWUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3BXYXRjaCBkaWRudCBzdGFydCcpO1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnRUaW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBub3cgYW5kIHRoZSBzdGFydCB0aW1lXG4gICAgICogc3RvcHMgdGhlIFRpbWVXYXRjaFxuICAgICAqL1xuICAgIHN0b3AoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jaGVjaygpO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbi8qKlxuICogQXN5bmMgTWV0aG9kIGRlY29yYXRvciB0byBsb2cgdGhlIGlucHV0IGFuZCBvdXRwdXQgb2YgdGhhdCBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW2xldmVsXSBMb2dnaW5nIExldmVsIGFzIGluIHtAbGluayBMT0dHRVJfTEVWRUxTfSBkZWZhdWx0cyB0byB7QGxpbmsgTE9HR0VSX0xFVkVMUy5ERUJVR31cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2JlbmNobWFya10gZGV0ZXJtaW5lcyBpZiB0aGUgbG9nZ2luZyBpbmNsdWRlcyB0aGUgZHVyYXRpb24gaW4gbXMuIGRlZmF1bHRzIHRvIGZhbHNlXG4gKlxuICogQGRlY29yYXRvciBsb2dBc3luY1xuICpcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2dBc3luYyhsZXZlbDogbnVtYmVyIHwgYm9vbGVhbiA9IExPR0dFUl9MRVZFTFMuREVCVUcsIGJlbmNobWFyaz86IGJvb2xlYW4pIHtcblxuICAgIGlmICghYmVuY2htYXJrICYmIHR5cGVvZiBsZXZlbCA9PT0gJ2Jvb2xlYW4nKXtcbiAgICAgICAgYmVuY2htYXJrID0gbGV2ZWw7XG4gICAgICAgIGxldmVsID0gTE9HR0VSX0xFVkVMUy5ERUJVRztcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcblxuICAgICAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kV3JhcHBlciA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgLi4uYXJnczogYW55W10pe1xuICAgICAgICAgICAgbGV0IGNhbGxiYWNrOiBDYWxsYmFjayA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ3JpdGljYWxFcnJvcihgTWlzc2luZyBDYWxsYmFja2ApO1xuXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5uYW1lICYmIHRoaXMubmFtZSAhPT0gJ0Z1bmN0aW9uJyA/IHRoaXMubmFtZSA6IHRoaXMuY29uc3RydWN0b3IgJiYgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lIHx8IHRoaXM7XG4gICAgICAgICAgICBnZXRMb2dnZXIoKS5yZXBvcnQoYFt7MH1dIC0gRW50ZXJpbmcgTWV0aG9kIHsxfSB3aXRoIGFyZ3M6IHsyfWAsIGxldmVsIGFzIG51bWJlciwgbmFtZSwgcHJvcGVydHlLZXksIGFyZ3MubWFwKGEgPT4gYS50b1N0cmluZygpKS5qb2luKCcgfCAnKSk7XG5cbiAgICAgICAgICAgIGxldCBzdG9wV2F0Y2g6IFN0b3BXYXRjaDtcblxuICAgICAgICAgICAgY29uc3QgY2IgPSAoZXJyOiBFcnIsIC4uLnJlc3VsdHM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3BXYXRjaClcbiAgICAgICAgICAgICAgICAgICAgZ2V0TG9nZ2VyKCkucmVwb3J0KGBbezB9XVtCRU5DSE1BUktdIC0gTGVhdmluZyBNZXRob2QgezF9IGFmdGVyIHsyfW1zYCwgbGV2ZWwgYXMgbnVtYmVyLCBuYW1lLCBwcm9wZXJ0eUtleSwgc3RvcFdhdGNoLnN0b3AoKSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycil7XG4gICAgICAgICAgICAgICAgICAgIGdldExvZ2dlcigpLnJlcG9ydChgW3swfV1bRVJST1JdIC0gTGVhdmluZyBNZXRob2QgezF9IHdpdGggZXJyb3IgezJ9YCwgbGV2ZWwgYXMgbnVtYmVyLCBuYW1lLCBwcm9wZXJ0eUtleSwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZ2V0TG9nZ2VyKCkucmVwb3J0KGBbezB9XSAtIExlYXZpbmcgTWV0aG9kIHsxfSB3aXRoIHJlc3VsdHM6IHsyfWAsIGxldmVsIGFzIG51bWJlciwgbmFtZSwgcHJvcGVydHlLZXksIHJlc3VsdHMgPyByZXN1bHRzLm1hcChhID0+IGEudG9TdHJpbmcoKSkuam9pbignIHwgJykgOiBcInZvaWRcIik7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCAuLi5yZXN1bHRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJlbmNobWFyayl7XG4gICAgICAgICAgICAgICAgc3RvcFdhdGNoID0gbmV3IFN0b3BXYXRjaCgpO1xuICAgICAgICAgICAgICAgIHN0b3BXYXRjaC5zdGFydCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcmlnaW5hbE1ldGhvZC5jYWxsKHRoaXMuX19vcmlnaW5hbE9iamVjdCB8fCB0aGlzLCAuLi5hcmdzLCBjYik7XG4gICAgICAgIH1cblxuICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gbWV0aG9kV3JhcHBlcjtcbiAgICB9XG59XG5cbi8qKlxuICogU3luYyBNZXRob2QgZGVjb3JhdG9yIHRvIGxvZyB0aGUgaW5wdXQgYW5kIG91dHB1dCBvZiB0aGF0IG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGV2ZWxdIExvZ2dpbmcgTGV2ZWwgYXMgaW4ge0BsaW5rIExPR0dFUl9MRVZFTFN9IGRlZmF1bHRzIHRvIHtAbGluayBMT0dHRVJfTEVWRUxTLkRFQlVHfVxuICogQHBhcmFtIHtib29sZWFufSBbYmVuY2htYXJrXSBkZXRlcm1pbmVzIGlmIHRoZSBsb2dnaW5nIGluY2x1ZGVzIHRoZSBkdXJhdGlvbiBpbiBtcy4gZGVmYXVsdHMgdG8gZmFsc2VcbiAqXG4gKiBAZGVjb3JhdG9yIGxvZ1N5bmNcbiAqXG4gKiBAY2F0ZWdvcnkgRGVjb3JhdG9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9nU3luYyhsZXZlbDogbnVtYmVyIHwgYm9vbGVhbiA9IExPR0dFUl9MRVZFTFMuREVCVUcsIGJlbmNobWFyaz86IGJvb2xlYW4pIHtcblxuICAgIGlmICghYmVuY2htYXJrICYmIHR5cGVvZiBsZXZlbCA9PT0gJ2Jvb2xlYW4nKXtcbiAgICAgICAgYmVuY2htYXJrID0gbGV2ZWw7XG4gICAgICAgIGxldmVsID0gTE9HR0VSX0xFVkVMUy5ERUJVRztcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcblxuICAgICAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kV3JhcHBlciA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgLi4uYXJnczogYW55W10pe1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMubmFtZSAmJiB0aGlzLm5hbWUgIT09ICdGdW5jdGlvbicgPyB0aGlzLm5hbWUgOiB0aGlzLmNvbnN0cnVjdG9yICYmIHRoaXMuY29uc3RydWN0b3IubmFtZSB8fCB0aGlzO1xuXG4gICAgICAgICAgICBnZXRMb2dnZXIoKS5yZXBvcnQoYFt7MH1dIC0gRW50ZXJpbmcgTWV0aG9kIHsxfSB3aXRoIGFyZ3M6IHsyfWAsIGxldmVsIGFzIG51bWJlciwgbmFtZSwgcHJvcGVydHlLZXksIGFyZ3MubWFwKGEgPT4gYS50b1N0cmluZygpKS5qb2luKCcgfCAnKSk7XG4gICAgICAgICAgICBsZXQgc3RvcFdhdGNoOiBTdG9wV2F0Y2ggfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoYmVuY2htYXJrKXtcbiAgICAgICAgICAgICAgICBzdG9wV2F0Y2ggPSBuZXcgU3RvcFdhdGNoKCk7XG4gICAgICAgICAgICAgICAgc3RvcFdhdGNoLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb3JpZ2luYWxNZXRob2QuY2FsbCh0aGlzLl9fb3JpZ2luYWxPYmplY3QgfHwgdGhpcywgLi4uYXJncyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3BXYXRjaClcbiAgICAgICAgICAgICAgICAgICAgZ2V0TG9nZ2VyKCkucmVwb3J0KGBbezB9XVtCRU5DSE1BUktdIC0gTGVhdmluZyBNZXRob2QgezF9IGFmdGVyIHsyfW1zYCwgbGV2ZWwgYXMgbnVtYmVyLCBuYW1lLCBwcm9wZXJ0eUtleSwgc3RvcFdhdGNoLnN0b3AoKSk7XG4gICAgICAgICAgICAgICAgZ2V0TG9nZ2VyKCkucmVwb3J0KGBbezB9XVtFUlJPUl0gLSBMZWF2aW5nIE1ldGhvZCB7MX0gd2l0aCBlcnJvciB7Mn1gLCBsZXZlbCBhcyBudW1iZXIsIG5hbWUsIHByb3BlcnR5S2V5LCBlKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0b3BXYXRjaClcbiAgICAgICAgICAgICAgICBnZXRMb2dnZXIoKS5yZXBvcnQoYFt7MH1dW0JFTkNITUFSS10gLSBMZWF2aW5nIE1ldGhvZCB7MX0gYWZ0ZXIgezJ9bXNgLCBsZXZlbCBhcyBudW1iZXIsIG5hbWUsIHByb3BlcnR5S2V5LCBzdG9wV2F0Y2guc3RvcCgpKTtcbiAgICAgICAgICAgIGdldExvZ2dlcigpLnJlcG9ydChgW3swfV0gLSBMZWF2aW5nIE1ldGhvZCB7MX0gd2l0aCByZXN1bHRzOiB7Mn1gLCBsZXZlbCBhcyBudW1iZXIsIG5hbWUsIHByb3BlcnR5S2V5LCByZXN1bHQgPyByZXN1bHQgOiBcInZvaWRcIik7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IG1ldGhvZFdyYXBwZXI7XG4gICAgfVxufVxuIl19
