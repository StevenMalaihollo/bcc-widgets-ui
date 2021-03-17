<template>
  <div id="bcc-private-ical">
    <input
      type="text"
      :value="link"
      :size="link.length"
      @click="$event.target.select()"
    />

    <button
      v-clipboard:copy="link"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >{{ $t("calendar.ical.copyLinkButtonText") }}</button>


    <transition name="fade">
      <div v-show="showConfirmation">{{ $t("calendar.ical.linkCopiedConfirmation") }}</div>
    </transition>

    <div v-show="showError">{{ $t("calendar.ical.linkCopiedError") }}</div>
  </div>
</template>

<script>
import calendarApi from "../../../utils/api/calendarApi";

import localeHelper from '../../../utils/localeHelper'

import _collection from "lodash/collection";
import _array from "lodash/array";

export default {
  data: function() {
    return {
      link: "",
      showConfirmation: false,
      showError: false,
      timeoutConfirmation: 3500,
    };
  },

  mounted: async function() {
    this.link = await calendarApi.link();
  },

  methods: {
    onCopy: function(e) {
      this.showConfirmation = true;
      var self = this;
      setTimeout(function() {
        self.showConfirmation = false;
      }, this.timeoutConfirmation);
    },
    onError: function(e) {
      this.showError = true;    
    }
  }
};
</script>

<!-- inline style because the widget consists only out of 1 component -->
<style>
#bcc-private-ical {
  line-height: 2em;
  margin: 5px;
}
#bcc-private-ical input {
  background-color: rgb(196, 196, 196);
  border: 2px solid #dcdcdc;
  border-radius: 5px;
  padding: 6px;
  text-align: center;
  width: auto;
  line-height: normal;
  max-width: 100%;
  margin-right: 5px;
}

#bcc-private-ical button{
  padding: 6px;
  background-color: rgb(196, 196, 196);
  text-align: center;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 5px;
  color: rgb(0, 86, 152);
  text-decoration: none;
  line-height: normal;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
