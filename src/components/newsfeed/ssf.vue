<template>
    <div id="bcc-ssfnewsfeed">
        <Grid :grid="ssfGrid" />
    </div>
</template>
<script>

import Grid from './grid.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        Grid
    },
    mounted: function () {
        this.loadSsfNews();
    },
    computed: {
        ...mapGetters([
            'ssfGrid',
        ]),
    },
    methods: {
        ...mapActions({
            loadSsfNews: 'loadSsfNews'
        }),
    }
}
</script>
