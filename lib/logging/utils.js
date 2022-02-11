"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoDigitPad = exports.formatDate = exports.stringFormat = void 0;
var constants_1 = require("./constants");
function stringFormat(string) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return string.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined'
            ? args[number]
            : match;
    });
}
exports.stringFormat = stringFormat;
function formatDate(date, patternStr) {
    if (patternStr === void 0) { patternStr = 'yyyy/MM/dd'; }
    var day = date.getDate(), month = date.getMonth(), year = date.getFullYear(), hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds(), miliseconds = date.getMilliseconds(), h = hour % 12, hh = twoDigitPad(h), HH = twoDigitPad(hour), mm = twoDigitPad(minute), ss = twoDigitPad(second), aaa = hour < 12 ? 'AM' : 'PM', EEEE = constants_1.DAYS_OF_WEEK_NAMES[date.getDay()], EEE = EEEE.substr(0, 3), dd = twoDigitPad(day), M = month + 1, MM = twoDigitPad(M), MMMM = constants_1.MONTH_NAMES[month], MMM = MMMM.substr(0, 3), yyyy = year + "", yy = yyyy.substr(2, 2);
    patternStr = patternStr
        .replace('hh', hh).replace('h', h.toString())
        .replace('HH', HH).replace('H', hour.toString())
        .replace('mm', mm).replace('m', minute.toString())
        .replace('ss', ss).replace('s', second.toString())
        .replace('S', miliseconds.toString())
        .replace('dd', dd).replace('d', day.toString())
        .replace('EEEE', EEEE).replace('EEE', EEE)
        .replace('yyyy', yyyy)
        .replace('yy', yy)
        .replace('aaa', aaa);
    if (patternStr.indexOf('MMM') > -1) {
        patternStr = patternStr
            .replace('MMMM', MMMM)
            .replace('MMM', MMM);
    }
    else {
        patternStr = patternStr
            .replace('MM', MM)
            .replace('M', M.toString());
    }
    return patternStr;
}
exports.formatDate = formatDate;
function twoDigitPad(num) {
    return num < 10 ? "0" + num : num.toString();
}
exports.twoDigitPad = twoDigitPad;
//# sourceMappingURL=utils.js.map