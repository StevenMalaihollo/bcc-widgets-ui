<template>
    <div class="bcc-widget-event" @mouseover="showDetails = true" @mouseout="showDetails = false">
        <a class="icon" v-bind:class="[{'allday' : (event.all_day || event.multi_day)}, getFeedClass, {'cancelled': eventIsCancelled}]">
      {{formattedSummary}} 
      <span class="brunstadtv" v-show="eventIsBroadcasted()"/>
    </a>
      
        <div class="bcc-widget-event details" v-show="showDetails" v-html="getDetailsHtml()" />   
  </div>
</template>

<script>
import localeHelper from "../../../utils/localeHelper";
import calendarHelper from '../../../utils/calendarHelper';
export default {
  data: function () {
    return {
      showDetails: false
    };
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedSummary () {
      if (this.event.all_day || this.event.multi_day) {
        return this.event.text;
      } else if ( this.event.start_date.toISOString() === this.event.end_date.toISOString()){
        return calendarHelper.getStartTime(this.event.start_date) + " " + this.event.text;
      } else {
        return calendarHelper.getStartTime(this.event.start_date) + " - " + calendarHelper.getEndTime(this.event.end_date) + " " + this.event.text;
      }
      
    },     
    getFeedClass(){
      return calendarHelper.getFeedClass(this.event);
    },
    eventIsCancelled(){
      return calendarHelper.eventIsCancelled(this.event);
    }
  },
  methods: {
    getDetailsHtml(){
        return calendarHelper.getDetailsHtml(this.event);
    },
    eventIsBroadcasted(){
      return calendarHelper.eventIsBroadcasted(this.event);
    },

  }
}
</script>