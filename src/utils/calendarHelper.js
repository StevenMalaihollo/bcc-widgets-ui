import _array from 'lodash/array'
import _collection from 'lodash/collection'
import localeHelper from './localeHelper'
import i18n from './i18n'

function getDetailsHtml(event) {
  return `
    <div class="heading ${getFeedClass(event)}"> ${event.feedName}</div>

    <section class="content"> 
        <h3>${event.text} ${eventIsBroadcasted(event) == true ? " <span class=\"brunstadtv\" />" : ""}</h3>
        <p>
          ${event.location ? event.location + '<br />' : ""}
          ${event.description ? event.description + '<br />':  ""}
        </p>
        <p>${getFormattedEventDate(event)}<br />
          ${getFormattedLocalDate(event) != getFormattedEventDate(event) &&  !event.all_day && !event.multi_day ? '<i>' + getFormattedLocalDate(event) + ' (' + i18n.t('calendar.event.local-time')  +')</i><br />' : ""}
        </p>
    </section>`;
}

function addFeedIndex(events) {
  var feedGroup = _array.uniqBy(events, e => e.feedId);

  var feedIndexArray = _collection.map(feedGroup, function(value, key) {
    return { feedId: value.feedId, index: key };
  });

  events.map(event => {
    event.feedindex = feedIndexArray.find(index => index.feedId == event.feedId).index;
    return event;
  })
}

function eventIsBroadcasted(event) {
  return (event.feedName == "[Beta] Brunstad" || event.feedName == "Brunstad") && event.description.includes("BTV");
}

function getFeedClass(event) {
  return 'feed-' + event.feedindex;
}

function getFormattedEventDate(event) {
  if (event.multi_day) {
    let new_end_date = event.end_date;
    new_end_date.setSeconds(new_end_date.getSeconds() - 1);
    return event.start_date.toLocaleDateString(localeHelper.getDateLocale(), { weekday: 'short', day: 'numeric' }) + " - "
        + new_end_date.toLocaleDateString(localeHelper.getDateLocale(), { weekday: 'short', day: 'numeric', month: 'long' });
  } else if (event.all_day) {
    return event.start_date.toLocaleDateString(localeHelper.getDateLocale(), { weekday: 'long', day: 'numeric', month: 'long' });
  } else {
    return getFormattedDate(event.start_date, event.end_date)
  }
}

function getFormattedLocalDate(event) {
  return getFormattedDate(event.localStartDate, event.localEndDate)
}

function getStartTime(date) {
  return date.toLocaleTimeString(localeHelper.getDateLocale(), { hour: "2-digit", minute: "2-digit" })
}

function getEndTime(date) {
  return date.toLocaleTimeString(localeHelper.getDateLocale(), { hour: "2-digit", minute: "2-digit" });
}

function getFormattedDate(start_date, end_date) {
  if (start_date.toISOString() === end_date.toISOString()) {
    return start_date.toLocaleDateString(localeHelper.getDateLocale(), { weekday: 'long', day: 'numeric', month: 'long' }) + " " + getStartTime(start_date)
  }

  return start_date.toLocaleDateString(localeHelper.getDateLocale(), { weekday: 'long', day: 'numeric', month: 'long' }) + " " + getStartTime(start_date) + " - " + getEndTime(end_date)
}

function eventIsCancelled(event) {
  return event.status === 2;
}


export default {
  getDetailsHtml,
  addFeedIndex,
  getFeedClass,
  getStartTime,
  getEndTime,
  eventIsBroadcasted,
  eventIsCancelled,
  getFormattedDate
}