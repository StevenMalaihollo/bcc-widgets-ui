<template>
  <section class="profile" @click="updateFocus(true)" v-click-outside="() => updateFocus(false)">
    <a class="profile-button">
      <span>{{displayName}} &zwnj;</span>
    </a>
    <section class="profile-list dropdown-list" v-bind:class="{'open' : (this.componentInFocus)}">
      <h6>{{ $t("profile.title") }}</h6>
      <ul>
          <li>
              <a href="https://members.bcc.no/profile/">{{ $t("profile.edit-profile") }}</a>
          </li>
          <li>
              <a href="https://vote.bcc.no/">{{ $t("profile.voting-app") }}</a>
          </li>
          <li>
              <a href="https://auth.bcc.no/?message=signout">{{ $t("profile.sign-out") }}</a>
          </li>
      </ul>
    </section>
  </section>
</template>
<script>
export default {
  data: function() {
    return {
      componentInFocus: false
    };
  },
  props: ['displayName'],
  methods: {
    updateFocus: function(isInFocus) {
      this.componentInFocus = isInFocus;
    }
  },
};
</script>

<style scoped>
    .profile-list::-webkit-scrollbar {
        width: 0
    }
    .profile-list::-webkit-scrollbar-track {
        display: none
    }
    .profile-list {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>