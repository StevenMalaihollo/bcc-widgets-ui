<template>
    <section class="bcc-widget-birthday list-widget">
        <birthdayHeader/>
        <section class="content">
            <ul>
                <li
                    v-for="date in dates"
                    :key="date.title"
                >
                    <date :date="date"/>
                </li>
            </ul>
        </section>
    </section>
</template>


<script>
    import birthdayHeader from './header.vue'
    import date from './date.vue'

    import birthdayApi from "../../utils/api/birthdayApi";
    import birthdayHelper from "../../utils/birthdayHelper";

    export default {
        components: {
            birthdayHeader,
            date
        },
        data: function () {
            return {
                dates: []
            };
        },
        mounted: async function () {
            this.dates = await birthdayApi.upcomingDates();
            for (let d of this.dates) {
                d.title = birthdayHelper.getLocaleDateStringForBirthdayWidget(d.title);
            }
        },
    }
</script>