import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueMoment from 'vue-moment'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'





Vue.config.productionTip = false
Vue.use(require('vue-moment'));
new Vue({
  router,
  store,
  VueMoment,
  render: h => h(App)
}).$mount('#app')
