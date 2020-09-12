import Vue from 'vue';
import VueMeta from 'vue-meta';
import Vuex from 'vuex';
import api from './src/api/axios';
import store from './src/store/base';
import 'url-search-params-polyfill';
import 'regenerator-runtime/runtime.js';

import router from './src/router';

import Base from './src/views/Base.vue';

Vue.use(Vuex);
Vue.use(VueMeta, { refreshOnceOnNavigation: true });

Vue.prototype.$api = api;

new Vue({
    el: '#base',
    api,
    router,
    store,
    render: h => h(Base)
});
