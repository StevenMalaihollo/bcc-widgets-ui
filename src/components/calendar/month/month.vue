<template>
    <!-- see: https://docs.dhtmlx.com/scheduler/scheduler_markup.html -->
    <div id="scheduler_here"
         class="bcc-widget-month dhx_cal_container bcc-widget-event"
         style="width:100%; height:100%;">
        <div class="dhx_cal_navline">
            <div class="dhx_cal_prev_button">&nbsp;</div>
            <div class="dhx_cal_next_button">&nbsp;</div>
            <div class="dhx_cal_today_button"></div>
            <div class="dhx_cal_date"></div>

            <div class="dhx_cal_tab"
                 name="day_tab"></div>
            <div class="dhx_cal_tab"
                 name="week_tab"></div>
            <div class="dhx_cal_tab"
                 name="month_tab"></div>
            <div class="dhx_cal_tab"
                 name="year_tab"></div>
            <div class="dhx_cal_tab"
                 id="agenda_tab"
                 name="agenda_tab"></div>

            <div class="dhx_cal_tab custom settings"
                 name=""
                 @click="setPreferenceModalInFocus(true)"
                 v-show="showSettingsButtons">
                {{ $t("preferences.title") }}
            </div>

            <div class="dhx_cal_tab custom ical"
                 name=""
                 @click="redirectToIcalPage()"
                 v-show="showSettingsButtons">{{ $t("calendar.preferences.add-to-mobile") }}</div>

        </div>
        <div class="dhx_cal_header">
        </div>
        <div class="dhx_cal_data">
        </div>

    </div>
</template>

<script>
    import "../../../libs/dhtmlxscheduler/dhtmlxscheduler";
    import "../../../libs/dhtmlxscheduler/dhtmlxscheduler_expand";
    import "../../../libs/dhtmlxscheduler/dhtmlxscheduler_tooltip";
    import "../../../libs/dhtmlxscheduler/dhtmlxscheduler_active_links";
    import "../../../libs/dhtmlxscheduler/dhtmlxscheduler_agenda_view";
    import "../../../libs/dhtmlxscheduler/dhtmlxscheduler_year_view";
    import "../../../libs/dhtmlxscheduler/dhtmlxscheduler_container_autoresize";

    import localeHelper from "../../../utils/localeHelper"
    import calendarApi from "../../../utils/api/calendarApi"
    import initResponsive from "../../../libs/dhtmlxscheduler/dhtmlxscheduler_responsive";
    import calendarHelper from "../../../utils/calendarHelper";
    import loadjs from "loadjs";
    import config from "../../../config";
    import { mapState, mapMutations, mapGetters } from 'vuex';

    export default {
        mounted: async function () {
            var self = this;
            loadjs([this.resourcePath + '/dhtmlxscheduler_material.css', this.resourcePath + '/dhtmlxscheduler-responsive.css', this.resourcePath + `/locales/locale_${localeHelper.getAppLanguage()}.js`, this.resourcePath + '/dhtmlxscheduler_customizations.css'], async function () {
                self.configureScheduler();

                await self.loadEvents();
            });
        },
        watch: {
            preferenceModalInFocus: async function (val) {
                if (val === false) {
                    await this.loadEvents();
                }
            }
        },
        computed: {
            ...mapState('preferences', {
                preferenceModalInFocus: 'preferenceModalInFocus'
            }),
            ...mapGetters([
                'showSettingsButtons'
            ]),
            resourcePath() {
                return config.keys.basePath + '/assets/calendar/dhtmlxscheduler';
            }
        },
        methods: {
            ...mapMutations('preferences', {
                setPreferenceModalInFocus: 'setPreferenceModalInFocus'
            }),
            redirectToIcalPage() {
                window.location.href = "https://portal.bcc.no/en/kalender/icalendar/"
            },
            configureScheduler() {
                scheduler.init("scheduler_here", null, "month");
                initResponsive(scheduler, false);
                scheduler.config.xml_date = "%Y-%m-%d %H:%i";
                scheduler.config.first_hour = 7;
                scheduler.config.last_hour = 24;
                scheduler.xy.scroll_width = 1;
                scheduler.xy.year_top = 20;
                scheduler.xy.menu_width = 0;
                scheduler.config.multi_day = true;
                scheduler.config.time_step = 0;
                scheduler.config.hour_size_px = 31;
                scheduler.config.readonly = true;
                scheduler.config.drag_resize = true;
                scheduler.config.drag_move = false;
                scheduler.config.drag_create = false;
                scheduler.config.dblclick_create = true;
                scheduler.config.details_on_dblclick = false;
                scheduler.config.agenda_start = new Date();
                scheduler.config.agenda_end = scheduler.date.add(new Date(), 18, "month");
                scheduler.config.container_autoresize = true;
                scheduler.config.month_day_min_height = 120;
                scheduler.xy.nav_height = 130;

                scheduler.attachEvent("onExpand", function () {
                    document.getElementById('scheduler_here').style.zIndex = 10000;
                });

                scheduler.attachEvent("onCollapse", function () {
                    document.getElementById('scheduler_here').style.zIndex = '';
                });

                scheduler.attachEvent("onClick", function () { return false; });

                //css class of event
                scheduler.templates.event_class = function (start, end, event) {
                    return calendarHelper.getFeedClass(event);
                }

                // Name of event (day and week view)
                scheduler.templates.event_text = function (start, end, event) {
                    if (calendarHelper.eventIsCancelled(event))
                        return "<span class=\"cancelled\">" + event.text + "</span>";
                    else
                        return event.text;
                }

                // Date of event (month view)
                scheduler.templates.event_bar_date = function (start, end, event) {
                    return "<b>" + scheduler.templates.event_date(start) + "</b> "
                };

                // Name of event (month view)
                scheduler.templates.event_bar_text = function (start, end, event) {
                    var name = event.text;
                    if (name.length > 15 && !event.all_day)
                        name = name.substring(0, 14) + "...";

                    if (calendarHelper.eventIsCancelled(event))
                        return "<span class=\"cancelled\">" + name + "</span>";
                    else
                        return name;
                }

                // Tooltip
                dhtmlXTooltip.config.timeout_to_display = 0;
                dhtmlXTooltip.config.className = 'dhtmlXTooltip tooltip bcc-widget-event details'
                scheduler.templates.tooltip_date_format = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
                scheduler.templates.tooltip_text = function (start, end, event) {
                    return calendarHelper.getDetailsHtml(event)
                }

                scheduler.attachEvent("onViewChange", function (new_mode, new_date) {
                    // Add class to year tooltips to be able to distinguish which tab is currently being shown.
                    // This allows the "default" tooltip to be selectively hidden when the tab is in year mode
                    var yearToolTips = document.getElementsByClassName('dhx_year_tooltip');
                    if (yearToolTips.length > 0) {
                        for (var i = 0; i < yearToolTips.length; i++) {
                            yearToolTips[i].className = 'dhx_year_tooltip ' + new_mode
                        }
                    }
                });

            },
            async loadEvents() {
                var events = await calendarApi.allEvents();

                scheduler.clearAll();
                scheduler.parse(events, "json");
            }
        }
    }
</script>