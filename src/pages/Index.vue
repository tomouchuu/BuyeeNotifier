<template>
  <div class="index pa3">
    <header>
      <h1>Buyee (&amp;OptionalTwitter) Notifier</h1>
      <p>Enter your search terms for Buyee/Yahoo Auctions (and optionally a twitter username) to get updates every hour on your search term to make sure you don't miss those critical items!</p>
    </header>
    <form action="/api/watchlist" method="POST" class="form">
      <input type="text" name="searchterm" placeholder="item" />
      <input type="text" name="twitter" placeholder="@twitter" />
      <button type="submit">watch</button>
    </form>
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
