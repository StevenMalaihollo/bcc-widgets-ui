<template>
  <div class="bcc-widget-preferences widget-preferences" v-show="preferenceModalInFocus">
    <div class="modal-background">
      <div class="modal-wrapper">
        <div class="modal-content">
          <modalHeader />
          <div class="scrollable"> 
            <slot name="timezone"/>
            <h4>{{listHeader}}</h4>
            <search />
            <slot name="list" />
            <button class="button" @click="saveChanges"> 
              {{$t('preferences.save-my-preferences')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalHeader from "./header.vue"
import feedCategory from "./feed-category.vue"
import search from "./search.vue"

import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    modalHeader,
    feedCategory,
    search
  },
  props: {
    listHeader: {
      type: String,
      required: true
    },
    saveFunction: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapState('preferences', {
      preferenceModalInFocus: 'preferenceModalInFocus'
    }),
  },
  methods: {
     ...mapMutations('preferences', {
      setPreferenceModalInFocus: 'setPreferenceModalInFocus'
     }),
     async saveChanges () {
      await this.saveFunction();
      this.setPreferenceModalInFocus(false);
    },
  },
}
</script>
