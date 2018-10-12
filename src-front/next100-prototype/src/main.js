import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "@/core/CustomTouchEventDriver";
import VModal from "vue-js-modal";
import { VueHammer } from "vue2-hammer";

Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(VueHammer);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
