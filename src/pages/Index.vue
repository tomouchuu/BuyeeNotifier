<template>
  <div class="index">
    <h1 class="bg-yellow black b f1 f-headline-ns tc db mt0 mb0 pt3 pb3 pb4-ns">Buyee Notifier <small class="absolute bottom-0 right-0 f6">by tomo@uchuu</small></h1>

    <form action="/api/watchlist" method="POST" class="form tc mw9 center ph3 pt4 pb4 bg-white">
      <div class="cf">
        <div class="fl w-40 pa2">
          <input id="searchterm" name="searchterm" class="input-reset ba b--black pa2 db w-100" type="text" aria-describedby="searchterm" placeholder="searchterm">
        </div>
        <div class="fl w-40 pa2">
          <input id="twitter" name="twitter" class="input-reset ba b--black pa2 db w-100" type="text" aria-describedby="twitter" placeholder="@twitter">
        </div>
        <div class="fl w-20 pa2">
          <input class="pv2 input-reset ba b--black bg-transparent grow pointer w-100" type="submit" value="watch">
        </div>
      </div>
    </form>
    <div class="container">
      <p class="tc">Enter your search terms for Buyee/Yahoo Auctions (and optionally a twitter username) to get updates every hour on your search term to make sure you don't miss those critical items!</p>
    </div>
    <footer class="pv1 ph3 ph6-l mid-gray fixed bottom-0 w-100 bg-white-90">
      <small class="f6 db tc">-<a href="https://tomo.uchuu.io" title="UCHUU"><b>tomo@uchuu</b></a>-</small>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
