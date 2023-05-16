import Vue from 'vue'
// import pages from './router/routes/pages'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import router from './router'
import store from './store'
import App from './App.vue'
// import Pusher from 'pusher-js'
// Pusher.logToConsole = true;

// const pusher = new Pusher('2c89bc9e9569378716c0 ',{
//   cluster:'ap2',
//   activity_timeout: 300000,
//   encrypted:true

// });
// Vue.prototype.$pusher = pusher

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

// import Toast from "vue-toastification";
// Import the CSS or use your own!
import Echo from 'laravel-echo'
// import "vue-toastification/dist/index.css";

// Vue.use(Toast)

// Global Components
import './global-components'
// import Tags from './views/pages/mailbox/tags'
// Tags.init("select[multiple]");

// import Vuetify from 'vuetify';

// Vue.use(Vuetify);
// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
// import Echo from "laravel-echo"

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'xxxxxxxxxxxxxxxxxxxx',
//     cluster: 'eu',
//     encrypted: true
// });
// BSV Plugin Registration
import wb from "./registerServiceWorker";

Vue.prototype.$workbox = wb;
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

require('@core/scss/core.scss')

// require('bootstrap/scss/bootstrap.scss')
// require('bootstrap-vue/src/index.scss')

require('@/assets/scss/style.scss')

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
