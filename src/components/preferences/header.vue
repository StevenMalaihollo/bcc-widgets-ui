<template>
    <section class="modal-header">
        <span class="close" @click="setPreferenceModalInFocus(false)" />
        <h1> {{$t('preferences.title')}}</h1>
        </section>
</template>

<script>
import { mapMutations} from 'vuex';

export default {
    methods: {
     ...mapMutations('preferences', {
      setPreferenceModalInFocus: 'setPreferenceModalInFocus'
     })
    }
}
</script>
