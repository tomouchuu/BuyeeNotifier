import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pages/Index';
import Watchlist from 'pages/Watchlist';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/:id',
      name: 'Watchlist',
      component: Watchlist,
    },
  ],
});
