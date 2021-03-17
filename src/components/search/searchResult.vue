<template>
    <section>
        <table v-if="searchResult.length > 0" class="search-result">
            <tr>
                <th>{{$t('search.person-result.name')}}</th>
                <th>{{$t('search.person-result.locality')}}</th>
                <th>{{$t('search.person-result.email')}}</th>
                <th>{{$t('search.person-result.cellphone')}}</th>
                <th>{{$t('search.person-result.homePhone')}}</th>
                <th>{{$t('search.person-result.address')}}</th>
            </tr>
            <tr v-for="result in searchResult" v-bind:key="result.personId">
                <td>{{result.displayName}} 
                    <div class="profile-image" v-show="result.profileImageUrl"> 
                        <br/><img :src='result.profileImageUrl' />
                    </div>
                </td>
                <td v-bind:data-th="$t('search.person-result.locality')">{{result.localityName}}</td>
                <td v-bind:data-th="$t('search.person-result.email')">{{result.email}}</td>
                <td v-bind:data-th="$t('search.person-result.cellphone')">{{result.cellPhone}}</td>
                <td v-bind:data-th="$t('search.person-result.homePhone')">{{result.homePhone}}</td>
                <td v-bind:data-th="$t('search.person-result.address')">{{result.formattedAddress}}</td>
            </tr>
        </table>

        <p v-else>{{$t('search.results-no-persons-found')}}</p>

        <p v-html="getFilterInfoHtml" />
  </section>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState({
            searchResult: 'searchResult',
            showResults: 'showResults'
        }),
        getFilterInfoHtml(){
            return this.$t('search.filterInfo', {link: "https://user.mysignon.net/profile"});
        },
    }
}
</script>