import baseApi from "./baseApi.js";
import config from "../../config";
import calendarHelper from "../calendarHelper";
import moment from 'moment'

/**
 * Get events of specific calendars
 * @return {Promise}
 */
async function upcommingEvents() {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/calendar/events/upcomming?calendarIds=" + config.getScriptAttribute('calendars', true) + "&maxDays=" + config.getScriptAttribute('maxdays', false) + "&maxAppointments=" + config.getScriptAttribute('maxappointments', false))
    .then(function (response) {
      return parseEvents(response.data)
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

async function allEvents() {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/calendar/events?calendarIds=" + config.getScriptAttribute('calendars', true))
    .then(function(response) {
      return parseEvents(response.data)
    })
    .catch(function (error) {
      console.log(error);
      return undefined;
    });
}

async function link() {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/calendar/icalUrl")
    .then(response => response.data)
    .catch(function (error) {
      console.log(error);
      return undefined;
    });
}

async function preferences() {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/calendar/preferences")
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}


/**
 * Save feed preferences of user
 * @return {Promise}
 */
async function saveFeedPreferences(feeds, timezone) {
  return await baseApi
    .sendRequest("post", baseApi.baseUri_bcc_no + "/calendar/preferences", {
      Feeds: feeds,
      SelectedTimeZone: timezone
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

function parseEvents(events) {
  events.forEach(event => {
    event.start_date = convertToDate( event.start_date)
    event.end_date = convertToDate( event.end_date)
    event.shownDate = convertToDate( event.shownDate)
    event.localStartDate = convertToDate( event.localStartDate)
    event.localEndDate = convertToDate( event.localEndDate)
  });

  calendarHelper.addFeedIndex(events);

  return events;
}

function convertToDate(date){
  var dateObj = moment.parseZone(date).toObject()

  //new Date(string date) can't be used, since safari handles the input differently than other browsers.
  return new Date(dateObj.years, dateObj.months,dateObj.date, dateObj.hours, dateObj.minutes, dateObj.seconds, dateObj.milliseconds)
}


export default {
  upcommingEvents,
  allEvents,
  preferences,
  link,
  saveFeedPreferences
};