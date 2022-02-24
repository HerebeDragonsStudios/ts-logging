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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnaW5nL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXdDO0FBQ3hDLHFDQUFvQztBQUNwQyx5Q0FBeUQ7QUFRekQ7SUFBQTtJQTRCQSxDQUFDO0lBdEJHLHlCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBS0QseUJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFNRCx3QkFBSSxHQUFKO1FBQ0ksSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTCxnQkFBQztBQUFELENBNUJBLEFBNEJDLElBQUE7QUE1QlksOEJBQVM7QUF3Q3RCLFNBQWdCLFFBQVEsQ0FBQyxLQUE2QyxFQUFFLFNBQW1CO0lBQWxFLHNCQUFBLEVBQUEsUUFBMEIseUJBQWEsQ0FBQyxLQUFLO0lBRWxFLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFDO1FBQ3pDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsS0FBSyxHQUFHLHlCQUFhLENBQUMsS0FBSyxDQUFDO0tBQy9CO0lBRUQsT0FBTyxVQUFVLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO1FBRTdFLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFeEMsSUFBTSxhQUFhLEdBQUc7WUFBb0IsY0FBYztpQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJ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TSxDQUFDLENBQUM7YUFDWDtZQUNELElBQUksU0FBUztnQkFDVCxJQUFBLG1CQUFTLEdBQUUsQ0FBQyxNQUFNLENBQUMsbURBQW1ELEVBQUUsS0FBZSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEksSUFBQSxtQkFBUyxHQUFFLENBQUMsTUFBTSxDQUFDLDhDQUE4QyxFQUFFLEtBQWUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqSSxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUE7UUFFRCxVQUFVLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDLENBQUE7QUFDTCxDQUFDO0FBdkNELDBCQXVDQyIsImZpbGUiOiJsb2dnaW5nL2RlY29yYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NyaXRpY2FsRXJyb3J9IGZyb20gXCIuLi9lcnJvcnNcIjtcbmltcG9ydCB7Z2V0TG9nZ2VyfSBmcm9tIFwiLi9sb2dnaW5nXCI7XG5pbXBvcnQge0NhbGxiYWNrLCBFcnIsIExPR0dFUl9MRVZFTFN9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIFV0aWwgY2xhc3MgdG8gbWVhc3VyZSB0aW1lIGJldHdlZW4gdHdvIHBvaW50cyBpbiB0aW1lO1xuICpcbiAqIEBjbGFzcyBTdG9wV2F0Y2hcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBTdG9wV2F0Y2h7XG4gICAgcHJpdmF0ZSBzdGFydFRpbWU/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIHN0YXJ0IHRpbWVcbiAgICAgKi9cbiAgICBzdGFydCgpe1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG5vdyBhbmQgdGhlIHN0YXJ0IHRpbWVcbiAgICAgKi9cbiAgICBjaGVjaygpOiBudW1iZXIge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRUaW1lKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdG9wV2F0Y2ggZGlkbnQgc3RhcnQnKTtcbiAgICAgICAgcmV0dXJuIERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gbm93IGFuZCB0aGUgc3RhcnQgdGltZVxuICAgICAqIHN0b3BzIHRoZSBUaW1lV2F0Y2hcbiAgICAgKi9cbiAgICBzdG9wKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2hlY2soKTtcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEFzeW5jIE1ldGhvZCBkZWNvcmF0b3IgdG8gbG9nIHRoZSBpbnB1dCBhbmQgb3V0cHV0IG9mIHRoYXQgbWV0aG9kXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZXZlbF0gTG9nZ2luZyBMZXZlbCBhcyBpbiB7QGxpbmsgTE9HR0VSX0xFVkVMU30gZGVmYXVsdHMgdG8ge0BsaW5rIExPR0dFUl9MRVZFTFMuREVCVUd9XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtiZW5jaG1hcmtdIGRldGVybWluZXMgaWYgdGhlIGxvZ2dpbmcgaW5jbHVkZXMgdGhlIGR1cmF0aW9uIGluIG1zLiBkZWZhdWx0cyB0byBmYWxzZVxuICpcbiAqIEBkZWNvcmF0b3IgbG9nQXN5bmNcbiAqXG4gKiBAY2F0ZWdvcnkgRGVjb3JhdG9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9nQXN5bmMobGV2ZWw6IG51bWJlciB8IGJvb2xlYW4gPSBMT0dHRVJfTEVWRUxTLkRFQlVHLCBiZW5jaG1hcms/OiBib29sZWFuKSB7XG5cbiAgICBpZiAoIWJlbmNobWFyayAmJiB0eXBlb2YgbGV2ZWwgPT09ICdib29sZWFuJyl7XG4gICAgICAgIGJlbmNobWFyayA9IGxldmVsO1xuICAgICAgICBsZXZlbCA9IExPR0dFUl9MRVZFTFMuREVCVUc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IG1ldGhvZFdyYXBwZXIgPSBmdW5jdGlvbih0aGlzOiBhbnksIC4uLmFyZ3M6IGFueVtdKXtcbiAgICAgICAgICAgIGxldCBjYWxsYmFjazogQ2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKCFjYWxsYmFjayB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IENyaXRpY2FsRXJyb3IoYE1pc3NpbmcgQ2FsbGJhY2tgKTtcblxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMubmFtZSAmJiB0aGlzLm5hbWUgIT09ICdGdW5jdGlvbicgPyB0aGlzLm5hbWUgOiB0aGlzLmNvbnN0cnVjdG9yICYmIHRoaXMuY29uc3RydWN0b3IubmFtZSB8fCB0aGlzO1xuICAgICAgICAgICAgZ2V0TG9nZ2VyKCkucmVwb3J0KGBbezB9XSAtIEVudGVyaW5nIE1ldGhvZCB7MX0gd2l0aCBhcmdzOiB7Mn1gLCBsZXZlbCBhcyBudW1iZXIsIG5hbWUsIHByb3BlcnR5S2V5LCBhcmdzLm1hcChhID0+IGEudG9TdHJpbmcoKSkuam9pbignIHwgJykpO1xuXG4gICAgICAgICAgICBsZXQgc3RvcFdhdGNoOiBTdG9wV2F0Y2g7XG5cbiAgICAgICAgICAgIGNvbnN0IGNiID0gKGVycjogRXJyLCAuLi5yZXN1bHRzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdG9wV2F0Y2gpXG4gICAgICAgICAgICAgICAgICAgIGdldExvZ2dlcigpLnJlcG9ydChgW3swfV1bQkVOQ0hNQVJLXSAtIExlYXZpbmcgTWV0aG9kIHsxfSBhZnRlciB7Mn1tc2AsIGxldmVsIGFzIG51bWJlciwgbmFtZSwgcHJvcGVydHlLZXksIHN0b3BXYXRjaC5zdG9wKCkpO1xuICAgICAgICAgICAgICAgIGlmIChlcnIpe1xuICAgICAgICAgICAgICAgICAgICBnZXRMb2dnZXIoKS5yZXBvcnQoYFt7MH1dW0VSUk9SXSAtIExlYXZpbmcgTWV0aG9kIHsxfSB3aXRoIGVycm9yIHsyfWAsIGxldmVsIGFzIG51bWJlciwgbmFtZSwgcHJvcGVydHlLZXksIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGdldExvZ2dlcigpLnJlcG9ydChgW3swfV0gLSBMZWF2aW5nIE1ldGhvZCB7MX0gd2l0aCByZXN1bHRzOiB7Mn1gLCBsZXZlbCBhcyBudW1iZXIsIG5hbWUsIHByb3BlcnR5S2V5LCByZXN1bHRzID8gcmVzdWx0cy5tYXAoYSA9PiBhLnRvU3RyaW5nKCkpLmpvaW4oJyB8ICcpIDogXCJ2b2lkXCIpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgLi4ucmVzdWx0cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChiZW5jaG1hcmspe1xuICAgICAgICAgICAgICAgIHN0b3BXYXRjaCA9IG5ldyBTdG9wV2F0Y2goKTtcbiAgICAgICAgICAgICAgICBzdG9wV2F0Y2guc3RhcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3JpZ2luYWxNZXRob2QuY2FsbCh0aGlzLl9fb3JpZ2luYWxPYmplY3QgfHwgdGhpcywgLi4uYXJncywgY2IpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IG1ldGhvZFdyYXBwZXI7XG4gICAgfVxufVxuXG4vKipcbiAqIFN5bmMgTWV0aG9kIGRlY29yYXRvciB0byBsb2cgdGhlIGlucHV0IGFuZCBvdXRwdXQgb2YgdGhhdCBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW2xldmVsXSBMb2dnaW5nIExldmVsIGFzIGluIHtAbGluayBMT0dHRVJfTEVWRUxTfSBkZWZhdWx0cyB0byB7QGxpbmsgTE9HR0VSX0xFVkVMUy5ERUJVR31cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2JlbmNobWFya10gZGV0ZXJtaW5lcyBpZiB0aGUgbG9nZ2luZyBpbmNsdWRlcyB0aGUgZHVyYXRpb24gaW4gbXMuIGRlZmF1bHRzIHRvIGZhbHNlXG4gKlxuICogQGRlY29yYXRvciBsb2dTeW5jXG4gKlxuICogQGNhdGVnb3J5IERlY29yYXRvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvZ1N5bmMobGV2ZWw6IG51bWJlciB8IGJvb2xlYW4gPSBMT0dHRVJfTEVWRUxTLkRFQlVHLCBiZW5jaG1hcms/OiBib29sZWFuKSB7XG5cbiAgICBpZiAoIWJlbmNobWFyayAmJiB0eXBlb2YgbGV2ZWwgPT09ICdib29sZWFuJyl7XG4gICAgICAgIGJlbmNobWFyayA9IGxldmVsO1xuICAgICAgICBsZXZlbCA9IExPR0dFUl9MRVZFTFMuREVCVUc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IG1ldGhvZFdyYXBwZXIgPSBmdW5jdGlvbih0aGlzOiBhbnksIC4uLmFyZ3M6IGFueVtdKXtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLm5hbWUgJiYgdGhpcy5uYW1lICE9PSAnRnVuY3Rpb24nID8gdGhpcy5uYW1lIDogdGhpcy5jb25zdHJ1Y3RvciAmJiB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgfHwgdGhpcztcblxuICAgICAgICAgICAgZ2V0TG9nZ2VyKCkucmVwb3J0KGBbezB9XSAtIEVudGVyaW5nIE1ldGhvZCB7MX0gd2l0aCBhcmdzOiB7Mn1gLCBsZXZlbCBhcyBudW1iZXIsIG5hbWUsIHByb3BlcnR5S2V5LCBhcmdzLm1hcChhID0+IGEudG9TdHJpbmcoKSkuam9pbignIHwgJykpO1xuICAgICAgICAgICAgbGV0IHN0b3BXYXRjaDogU3RvcFdhdGNoIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgaWYgKGJlbmNobWFyayl7XG4gICAgICAgICAgICAgICAgc3RvcFdhdGNoID0gbmV3IFN0b3BXYXRjaCgpO1xuICAgICAgICAgICAgICAgIHN0b3BXYXRjaC5zdGFydCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9yaWdpbmFsTWV0aG9kLmNhbGwodGhpcy5fX29yaWdpbmFsT2JqZWN0IHx8IHRoaXMsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdG9wV2F0Y2gpXG4gICAgICAgICAgICAgICAgICAgIGdldExvZ2dlcigpLnJlcG9ydChgW3swfV1bQkVOQ0hNQVJLXSAtIExlYXZpbmcgTWV0aG9kIHsxfSBhZnRlciB7Mn1tc2AsIGxldmVsIGFzIG51bWJlciwgbmFtZSwgcHJvcGVydHlLZXksIHN0b3BXYXRjaC5zdG9wKCkpO1xuICAgICAgICAgICAgICAgIGdldExvZ2dlcigpLnJlcG9ydChgW3swfV1bRVJST1JdIC0gTGVhdmluZyBNZXRob2QgezF9IHdpdGggZXJyb3IgezJ9YCwgbGV2ZWwgYXMgbnVtYmVyLCBuYW1lLCBwcm9wZXJ0eUtleSwgZSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdG9wV2F0Y2gpXG4gICAgICAgICAgICAgICAgZ2V0TG9nZ2VyKCkucmVwb3J0KGBbezB9XVtCRU5DSE1BUktdIC0gTGVhdmluZyBNZXRob2QgezF9IGFmdGVyIHsyfW1zYCwgbGV2ZWwgYXMgbnVtYmVyLCBuYW1lLCBwcm9wZXJ0eUtleSwgc3RvcFdhdGNoLnN0b3AoKSk7XG4gICAgICAgICAgICBnZXRMb2dnZXIoKS5yZXBvcnQoYFt7MH1dIC0gTGVhdmluZyBNZXRob2QgezF9IHdpdGggcmVzdWx0czogezJ9YCwgbGV2ZWwgYXMgbnVtYmVyLCBuYW1lLCBwcm9wZXJ0eUtleSwgcmVzdWx0ID8gcmVzdWx0IDogXCJ2b2lkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBtZXRob2RXcmFwcGVyO1xuICAgIH1cbn1cbiJdfQ==
