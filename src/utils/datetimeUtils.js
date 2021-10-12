import moment from 'moment';

export function getMonthName(number, isShortName) {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return isShortName ? shortMonths[number] : months[number];
}

export function getDatesFromWeek(number, year) {
  var strDateRange = moment().day("Monday").year(year || 2020).week(number).format('DD MMMM');
  return strDateRange;
}