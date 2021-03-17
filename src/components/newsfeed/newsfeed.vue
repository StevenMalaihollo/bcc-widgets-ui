<template>
    <div id="bcc-widget-newsfeed bcc-newsfeed">
        <!--<Grid :grid="localGrid" />
        <div class="gap_element" style="padding-top:30px"></div>-->
        <Grid :grid="favoriteGrid" />
        <div class="gap_element" style="padding-top:30px"></div>
        <Grid :grid="worldGrid" />
    </div>
</template>
<script>

import Grid from './grid.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    components: {
        Grid
    },
    mounted: function () {
        this.loadAllNews();
    },
    watch: {
        preferenceModalInFocus: async function (val) {
            if (val === false) {
                await this.loadAllNews();
            }
        }
    },
    computed: {
        ...mapGetters([
            'localGrid',
            'favoriteGrid',
            'worldGrid'
        ]),
        ...mapState('preferences', {
            preferenceModalInFocus: 'preferenceModalInFocus'
        }),
    },
    methods: {
        ...mapActions({
            loadAllNews: 'loadAllNews'
        }),
    }
}
</script>
