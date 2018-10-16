import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "@/core/CustomTouchEventDriver";
import VModal from "vue-js-modal";
import userMixin from "@/mixins/userMixin";
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
import "animate.css";


Vue.config.productionTip = false;
Vue.use(VModal);
Vue.mixin(userMixin);
Vue.mixin(customTouchEventDriver);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
