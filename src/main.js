import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {
  BootstrapVueIcons
} from 'bootstrap-vue'
import firebase from 'firebase'
import store from "./store/store"

import 'vue-thailand-address/dist/vue-thailand-address.css';
import VueThailandAddress from 'vue-thailand-address';

import QrcodeVue from 'qrcode.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueSuggestion from 'vue-suggestion'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
//import './registerServiceWorker'
//
import wb from "./registerServiceWorker";
Vue.prototype.$workbox = wb;
//


// Global registration
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

Vue.use(VueSuggestion)


Vue.use(VueMaterial)

Vue.config.productionTip = false;

Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false;

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueThailandAddress)

new Vue({
  el: '#root',
  data: {
    value: 'https://example.com',
  },
  template: '<qrcode-vue :value="value"></qrcode-vue>',
  components: {
    QrcodeVue,
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

firebase.initializeApp({
  apiKey: "AIzaSyCI-z6mJ6YmJA7ppO4qZOJe-22QNVLFkt4",
  authDomain: "timebank-544c6.firebaseapp.com",
  databaseURL: "https://timebank-544c6.firebaseio.com",
  projectId: "timebank-544c6",
  storageBucket: "timebank-544c6.appspot.com",
  messagingSenderId: "287345269100",
  appId: "1:287345269100:web:06b70e881ad2071453bb49"
})