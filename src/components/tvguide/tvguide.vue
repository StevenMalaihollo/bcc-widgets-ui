<template>
    <section class="bcc-widget-tvguide list-widget">
        <tvguideHeader/>
        <section class="content tvguide">
            <div class="row tvguide row-collapse" id="vue-guide" v-cloak>
                <div class="weekday">
                    <span class="weekday-button left"><button v-if="selected > 0" v-on:click="selected = previousDay(selected)"/></span>
                    <span class="weekday-day">{{scheduleDays[selected].isToday ? $t("weekdays.today") : scheduleDays[selected].name}}</span>
                    <span class="weekday-button right"><button v-if="selected < 6" v-on:click="selected = nextDay(selected)"/></span>
                </div>
                <div class="col-xs-12">
                    <p class="local-time-info">
                        <span class="glyphicon glyphicon-info-sign"></span> {{ $t("tvguide.local-time-info") }} ({{utcOffsetString}})
                    </p>
                    <div role="tabpanel">
                        <ul>
                            <p v-if="!scheduleDays[selected] || scheduleDays[selected].items.length <= 0">
                                {{ $t("tvguide.no-results") }}
                            </p>
                            <template v-else>
                                <li v-for="item in scheduleDays[selected].items"
                                    class="live-guide-item"
                                    :key="item.name">
                                    <div class="live-guide-item-timebox">
                                        <div class="live-guide-item-time">
                                            <p class="time">{{moment.utc(item.start).local().format('HH:mm')}} – {{moment.utc(item.end).local().format('HH:mm')}}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="title">{{item.title}}</p>
                                        <p class="description">{{item.description ? item.description : "\n"}}</p>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <tvguideFooter/>
    </section>
</template>

<script>
    import moment from "moment"
    import _ from "lodash"
    import tvguideHeader from './header.vue'
    import tvguideFooter from './footer.vue'
    import tvGuideApi from "../../utils/api/tvGuideApi";
    import i18n from "../../utils/i18n";

    export default {
        components: {
            tvguideHeader,
            tvguideFooter
        },
        data: function () {
            return {
                moment: moment,
                scheduleItems: [], 
                localized: {
                    dayNames: [
                        i18n.t("weekdays.sunday"), 
                        i18n.t("weekdays.monday"),
                        i18n.t("weekdays.tuesday"),
                        i18n.t("weekdays.wednesday"),
                        i18n.t("weekdays.thursday"),
                        i18n.t("weekdays.friday"),
                        i18n.t("weekdays.saturday")
                ],
                },
                selected: 0
            };
        },
        mounted: async function () {
            this.scheduleItems = await tvGuideApi.scheduledItems();
        },
        computed: {
            /**
             * Map `scheduledItems` into day-objects
             */
            scheduleDays : function () {
                var vm = this;
                var today = moment().day();
                var itemsByDate = _.groupBy(this.scheduleItems, function (n) {
                    return moment.utc(n.start).local().format('YYYY-MM-DD');
                });
                var days = [];
                // Fill the array with the next 7 days
                for (var i = 0; i < 7; i++) {
                    var mDate = moment().add(i, 'day');
                    // Get the items from the itemsByDate above
                    var items = itemsByDate[mDate.format('YYYY-MM-DD')];
                    days.push({
                        name: vm.localized.dayNames[mDate.day()], 
                        isToday: today == mDate.day(),
                        items: items ? items : [],
                    })
                }
                return days;
            },
            utcOffsetString: function () {
                var n = moment().utcOffset() / 60;
                return "UTC" + (n < 0 ? "" : "+") + n;
            }
        },
        methods: {
            previousDay: function (selected) {
                if (selected <= 1) {
                    return 0;
                }
                return selected - 1;
            },
            nextDay: function (selected) {
                if (selected >= 5) {
                    return 6
                }
                return selected + 1;
            }
        },
    }
</script>
