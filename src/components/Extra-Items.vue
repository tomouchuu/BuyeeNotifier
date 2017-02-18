<template>
  <article class="buyee-item">
    <a class="link dt w-100 bb b--black-10 pb2 mt2 dim blue tc" v-bind:href="'http://buyee.jp/item/search/query/'+data.searchterm">
      There are more items present on Buyee, click to see more
    </a>
  </article>
</template>

<script>
export default {
  name: 'extra-items',
  props: [
    'data',
  ],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
