import Vue from "vue";

import router from "./router";
import store from "./store";

import App from "./App.vue";

import VueScrollAnimator from "./plugins/vue-scroll-animator/VueScrollAnimator";

Vue.config.productionTip = false;

Vue.use(VueScrollAnimator);

new Vue({
    router,
    store,
    render: (hack) => hack(App)

}).$mount("#app");