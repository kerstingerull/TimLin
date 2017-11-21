const Vue = require('vue/dist/vue');

// moment
const moment = require('moment');
require('moment/locale/de');
Vue.use(require('vue-moment'), {moment});

// router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history'
});

// my Page
import Page from './page.vue';
Vue.component('page', Page);

// Vue Object
new Vue({
    router,
    el: '#vue-root'
});
// to load directly the Page component
// https://medium.com/@mahesh.ks/using-sass-scss-in-vue-js-2-d472af0facf9