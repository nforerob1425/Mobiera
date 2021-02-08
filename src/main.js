import "babel-polyfill";
import "resize-observer-polyfill";
import "intersection-observer";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import cssVars from "css-vars-ponyfill";
import VueMoment from "vue-moment";
import VueObserveVisibility from "vue-observe-visibility";

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "@/scss/base/index.scss";

cssVars({
  include: 'style,link[rel="stylesheet"]:not([href*="//"])',
  preserveVars: true,
  silent: true,
  onlyLegacy: true,
  watch: true
});

Vue.config.productionTip = false;
Vue.use(VueMoment);
Vue.use(VueObserveVisibility);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
