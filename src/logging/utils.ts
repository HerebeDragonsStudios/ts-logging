/**
 * Util function to provide string format functionality similar to C#'s string.format
 *
 * @param {string} string
 * @param {string} args replacements made by order of appearance (replacement0 wil replace {0} and so on)
 * @return {string} formatted string
 *
 * @function stringFormat
 *
 * @memberOf logging.logging
 */
import {DAYS_OF_WEEK_NAMES, MONTH_NAMES} from "./constants";

export function stringFormat(string: string, ...args: string[]){
    return string.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] !== 'undefined'
            ? args[number]
            : match;
    });
}

/**
 * Date Format Handling
 * https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
 *
 * <pre>
 *      Using similar formatting as Moment.js, Class DateTimeFormatter (Java), and Class SimpleDateFormat (Java),
 *      I implemented a comprehensive solution formatDate(date, patternStr) where the code is easy to read and modify.
 *      You can display date, time, AM/PM, etc.
 *
 *      Date and Time Patterns
 *      yy = 2-digit year; yyyy = full year
 *      M = digit month; MM = 2-digit month; MMM = short month name; MMMM = full month name
 *      EEEE = full weekday name; EEE = short weekday name
 *      d = digit day; dd = 2-digit day
 *      h = hours am/pm; hh = 2-digit hours am/pm; H = hours; HH = 2-digit hours
 *      m = minutes; mm = 2-digit minutes; aaa = AM/PM
 *      s = seconds; ss = 2-digit seconds
 *      S = miliseconds
 * </pre>
 *
 * @param {Date} date
 * @param {string} [patternStr] defaults to 'yyyy/MM/dd'
 * @return {string} the formatted date
 *
 * @function formatDate
 *
 * @memberOf logging.logging
 */
export function formatDate(date: Date, patternStr: string = 'yyyy/MM/dd'){
    const day: number = date.getDate(),
        month: number = date.getMonth(),
        year: number = date.getFullYear(),
        hour: number = date.getHours(),
        minute: number = date.getMinutes(),
        second: number = date.getSeconds(),
        miliseconds: number = date.getMilliseconds(),
        h: number = hour % 12,
        hh: string = twoDigitPad(h),
        HH: string = twoDigitPad(hour),
        mm: string = twoDigitPad(minute),
        ss: string = twoDigitPad(second),
        aaa: string = hour < 12 ? 'AM' : 'PM',
        EEEE: string = DAYS_OF_WEEK_NAMES[date.getDay()],
        EEE: string = EEEE.substr(0, 3),
        dd: string = twoDigitPad(day),
        M: number = month + 1,
        MM: string = twoDigitPad(M),
        MMMM: string = MONTH_NAMES[month],
        MMM : string= MMMM.substr(0, 3),
        yyyy: string = year + "",
        yy: string = yyyy.substr(2, 2)
    ;
    // checks to see if month name will be used
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

/**
 *
 * @param {number} num
 *
 * @return {string}
 *
 * @function twoDigitPad
 *
 * @memberOf logging.logging
 */
export function twoDigitPad(num: number): string {
    return num < 10 ? "0" + num : num.toString();
}