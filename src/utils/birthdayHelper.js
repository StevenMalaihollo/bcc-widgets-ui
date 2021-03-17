import localeHelper from "./localeHelper";
import i18n from "./i18n";

function getLocaleDateStringForBirthdayWidget(date) {
  let today = new Date();
  date = new Date(date); // Convert date from a string to a Date object.
  
  if (date.toDateString() === today.toDateString()) {
    return i18n.t("weekdays.today");
  }
  
  // If it's not a leap year, but the birthdate is February 29th, we can't display a weekday.
  else if ( !isLeapYear(today.getFullYear()) && (date.getMonth() === 1) && (date.getDate() === 29) ) {
    return `(${date.toLocaleDateString(localeHelper.getDateLocale(), { day: 'numeric', month: 'long' })})`;
  }
  
  else {
    return date.toLocaleDateString(localeHelper.getDateLocale(), { weekday: 'long', day: 'numeric', month: 'long' });
  }
}

function isLeapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}


export default {
  getLocaleDateStringForBirthdayWidget
}
