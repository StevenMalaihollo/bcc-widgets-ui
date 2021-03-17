<template>
  <section class="day-section">
    <h4> {{ day.title}} </h4>
    <ul>
      <li
        v-for="event in day.events"
        :key="event.occurrenceId"
      >
        <event :event="event" />
      </li>
    </ul>

  </section>

</template>

<script>
import event from './event.vue'

export default {
  components: {
    event
  },
  props: {
    day: {
      type: Object,
      required: true
    }
  }
}
</script>

