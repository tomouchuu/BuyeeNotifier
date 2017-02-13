<template>
  <article class="buyee-item">
    <a class="link dt w-100 bb b--black-10 pb2 mt2 dim blue" v-bind:href="item.link">
      <div class="dtc w4">
        <img v-bind:src="item.image" class="db w-100"/>
      </div>
      <div class="dtc v-top pl2">
        <h1 class="f6 f5-ns fw6 lh-title black mv0">{{ item.title }}</h1>
        <h2 class="f6 fw4 mt2 mb0 black-60">{{ item.remaining }} left</h2>
        <dl class="f6 lh-title mv2">
          <dt class="dib b">Price:</dt>
          <dd class="dib ml0 gray">{{ item.price }}</dd>
        </dl>
        <dl class="f6 lh-title mv2">
          <dt class="dib b">Local Price:</dt>
          <dd class="dib ml0 gray">{{ item.localPrice }}</dd>
        </dl>
        <dl class="f6 lh-title mv2" v-if="item.buyout">
          <dt class="dib b">Buyout Price:</dt>
          <dd class="dib ml0 gray">{{ item.buyout }}</dd>
        </dl>
        <dl class="f6 lh-title mv2" v-if="item.localBuyout">
          <dt class="dib b">Local Buyout Price:</dt>
          <dd class="dib ml0 gray">{{ item.localBuyout }}</dd>
        </dl>
        <dl class="f6 lh-title mv2">
          <dt class="dib b">Number of Bids:</dt>
          <dd class="dib ml0 gray">{{ item.bids }}</dd>
        </dl>
      </div>
    </a>
  </article>
</template>

<script>
export default {
  name: 'buyee-item',
  props: [
    'item',
  ],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
