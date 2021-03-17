<template>
    <section>
        <div class="container section-title-container">
            <h3 class="section-title section-title-center">
                <b></b>
                <span class="section-title-main">{{grid.title}}</span>
                <div class="configure-feeds" v-if="grid.showPreferencesButton">
                    <button class="button primary" style="background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiBmb2N1c2FibGU9ImZhbHNlIiBkYXRhLXByZWZpeD0iZmFzIiBkYXRhLWljb249ImNvZyIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWNvZyBmYS13LTE2IiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjNDQ2MDg0IiBkPSJNNDg3LjQgMzE1LjdsLTQyLjYtMjQuNmM0LjMtMjMuMiA0LjMtNDcgMC03MC4ybDQyLjYtMjQuNmM0LjktMi44IDcuMS04LjYgNS41LTE0LTExLjEtMzUuNi0zMC02Ny44LTU0LjctOTQuNi0zLjgtNC4xLTEwLTUuMS0xNC44LTIuM0wzODAuOCAxMTBjLTE3LjktMTUuNC0zOC41LTI3LjMtNjAuOC0zNS4xVjI1LjhjMC01LjYtMy45LTEwLjUtOS40LTExLjctMzYuNy04LjItNzQuMy03LjgtMTA5LjIgMC01LjUgMS4yLTkuNCA2LjEtOS40IDExLjdWNzVjLTIyLjIgNy45LTQyLjggMTkuOC02MC44IDM1LjFMODguNyA4NS41Yy00LjktMi44LTExLTEuOS0xNC44IDIuMy0yNC43IDI2LjctNDMuNiA1OC45LTU0LjcgOTQuNi0xLjcgNS40LjYgMTEuMiA1LjUgMTRMNjcuMyAyMjFjLTQuMyAyMy4yLTQuMyA0NyAwIDcwLjJsLTQyLjYgMjQuNmMtNC45IDIuOC03LjEgOC42LTUuNSAxNCAxMS4xIDM1LjYgMzAgNjcuOCA1NC43IDk0LjYgMy44IDQuMSAxMCA1LjEgMTQuOCAyLjNsNDIuNi0yNC42YzE3LjkgMTUuNCAzOC41IDI3LjMgNjAuOCAzNS4xdjQ5LjJjMCA1LjYgMy45IDEwLjUgOS40IDExLjcgMzYuNyA4LjIgNzQuMyA3LjggMTA5LjIgMCA1LjUtMS4yIDkuNC02LjEgOS40LTExLjd2LTQ5LjJjMjIuMi03LjkgNDIuOC0xOS44IDYwLjgtMzUuMWw0Mi42IDI0LjZjNC45IDIuOCAxMSAxLjkgMTQuOC0yLjMgMjQuNy0yNi43IDQzLjYtNTguOSA1NC43LTk0LjYgMS41LTUuNS0uNy0xMS4zLTUuNi0xNC4xek0yNTYgMzM2Yy00NC4xIDAtODAtMzUuOS04MC04MHMzNS45LTgwIDgwLTgwIDgwIDM1LjkgODAgODAtMzUuOSA4MC04MCA4MHoiLz48L3N2Zz4=) no-repeat" @click="setPreferenceModalInFocus(true)"></button>
                </div>
                <b></b>
            </h3>
            <p style="text-align:center">{{grid.subtitle}}</p>
        </div>
        <div class="row large-columns-3 medium-columns-2 small-columns-2 row-small has-shadow row-box-shadow-1 row-box-shadow-2-hover">
            <Card v-for="post in grid.posts" :key="post.id" :post="post" />
        </div>
    </section>
</template>

<script>
import Card from './card.vue';
import { mapMutations } from 'vuex';

export default {
    components: {
        Card
    },
    props: {
        grid: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapMutations('preferences', {
            setPreferenceModalInFocus: 'setPreferenceModalInFocus'
        }),
    }
}
</script>
