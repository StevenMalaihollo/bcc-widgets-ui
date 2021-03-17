<template>
  <div class="feed-category" v-show="feeds && feeds.length > 0">
    <button
      class="accordion"
      v-bind:class="{'active' : (this.isCollapsed)}"
      @click="isCollapsed = !isCollapsed">
      {{title}}
    </button>

    <div class="panel" v-show="isCollapsed">
      <ul>
        <li v-for="feed in visibleFeeds" :key="feed.feedId">
            <input type="checkbox" :id="feed.feedId" v-model="feed.active" @click="feed.changed = true">
            <label :for="feed.feedId">{{feed.name}}</label>        
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    feeds: {
      type: Array,
      required: true
    },

    title: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('preferences', {
      searchQuery: 'searchQuery'
    }),
    visibleFeeds(){
      if(this.searchQuery){
        var feeds = this.feeds.filter(feed => feed.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        this.isCollapsed =  feeds.length > 0;
        return feeds;
      } 

      this.isCollapsed = false;
      return this.feeds;
    }, 

  },
  data: function () {
    return {
      isCollapsed: false
    };
  }
  }
</script>

<style>
</style>
