const { addHours, format, intervalToDuration, startOfDay } = require('date-fns');
const { id } = require('date-fns/locale');

const TZ_ID = { locale: id };

/**
 * Format Date
 * @param {string | number | Date} value
 * @returns {string}
 */

function formatDate(value) {
    return format(new Date(value), 'dd-MM-yyyy', TZ_ID);
}

/**
 * Format Date and Time
 * @param {string | number | Date} value
 * @returns {string}
 */

function formatDateTime(value) {
    return format(new Date(value), 'dd-MM-yyyy HH:mm:ss', TZ_ID);
}

/**
 * Convert Date To Excel Number Date
 * @param {string | number | Date} value
 * @returns {number}
 */
function dateToNumber(value) {
    const getDate = new Date(value);
    const localTime = getDate.getTime() - getDate.getTimezoneOffset() * 60 * 1000;
    const converted = 25569.0 + localTime / (1000 * 60 * 60 * 24);
    return converted;
}

/**
 * Convert Excel Number Date To Javascript Date
 * @param {number} value
 * @returns {Date}
 */

function convertDateExcelNumber(value) {
    const getDate = new Date(Math.round(value - 25569.0) * (1000 * 60 * 60 * 24));
    const dateFromUTC = addHours(getDate, 7); // UTC +7
    const result = startOfDay(dateFromUTC);
    return result;
}

/**
 * Convert Date To UTC +7
 * @param {string | number | Date} value
 * @returns {Date}
 */

function convertDateExcel(value) {
    const getDate = new Date(value);
    const dateFromUTC = addHours(getDate, 7); // UTC +7
    const result = startOfDay(dateFromUTC);
    return result;
}

/**
 * Calculate Age
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {number}
 */

function calculateAge(startDate, endDate) {
    const newEndDate = endDate instanceof Date ? endDate : new Date();
    const interval = intervalToDuration({
        start: new Date(startDate),
        end: new Date(newEndDate),
    });
    return interval.years ? interval.years : 0;
}

/**
 * Calculate and Parse Age
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {string}
 */

function calculateParseAge(startDate, endDate) {
    const newEndDate = endDate instanceof Date ? endDate : new Date();
    const interval = intervalToDuration({
        start: new Date(startDate),
        end: new Date(newEndDate),
    });
    const result = `${interval.years} years, ${interval.months} months, ${interval.days} days`;
    return result;
}


module.exports = {
    formatDateTime
}