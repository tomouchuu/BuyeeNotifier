<template>
  <div class="watchlist">
    <div class="loading absolute top-0 left-0 pa3 dt vh-100 w-100" v-if="loading">
      <div class="v-mid tc dtc">
        <p class="f6 f2-m f-subheadline-l fw6 tc">Loading...</p>
      </div>
    </div>

    <div v-if="data === null" class="empty pa3">
      <h1>Nothing...</h1>
      <p>There is nothing being watched with this key, please go back to the homepage to start watching items</p>
      <a href="/" title="Back to Homepage">Back to Homepage</a>
    </div>

    <div v-if="data" class="content">
      <header class="bg-yellow fixed z-2 w-100">
        <nav class="flex justify-between">
          <div class="flex-grow pa3 flex items-center">
            <p class="black dib mr3"><b>Searching:</b> <a target="_blank" v-bind:href="'http://buyee.jp/item/search/query/'+data.searchterm">{{ data.searchterm }}</a></p>
            <p class="black dib mr3"><b>Notifying:</b> <a target="_blank" v-bind:href="'https://twitter.com/'+data.twitter">@{{ data.twitter }}</a></p>
            <p class="black dib mr3"><b>Next Update:</b> {{ timeTo }}</p>
          </div>
          <div class="pa3 flex items-center">
            <a class="f6 dib black bg-animate bg-red hover-bg-light-red hover-black no-underline pv2 ph4 br-pill ba b--light-red" v-bind:href="'/api/watchlist/delete/'+data._id" title="Delete this watchlist">Delete this watchlist</a>
          </div>
        </nav>
      </header>
      <main>
        <div v-if="data.items" class="watchlist-items">
          <BuyeeItem v-for="item in data.items" v-bind:item="item" :key="item._id"/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import BuyeeItem from './../components/Buyee-Item';

const differenceInMinutes = require('date-fns/difference_in_minutes');
const endOfHour = require('date-fns/end_of_hour');

require('es6-promise').polyfill();
require('isomorphic-fetch');

function getTimeToRefresh() {
  const minsToRefresh = differenceInMinutes(
    endOfHour(new Date()),
    new Date(),
  );
  const timeToRefresh = `~${minsToRefresh}mins`;
  return timeToRefresh;
}

export default {
  name: 'watchlist',
  components: {
    BuyeeItem,
  },
  data() {
    return {
      loading: true,
      data: null,
      timeTo: '',
      items: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.loading = true;
      const self = this;

      this.timeTo = getTimeToRefresh();
      setInterval(() => {
        self.timeTo = getTimeToRefresh();
      }, 60000);

      fetch(`/api/watchlist/${this.$route.params.id}`)
        .then((response, err) => {
          if (response.status >= 400) {
            self.error = err.toString();
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((data) => {
          self.loading = false;
          self.data = data;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  main {
    padding-top: 82px;
  }
</style>
