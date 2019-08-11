import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import {routes} from './router'
import {firebaseListener} from './firebaseConfig'
import store from './store/store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(VueRouter)
firebaseListener(authStatusChange)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.use(Vuelidate)

// axios.defaults.baseURL ='https://mobile-market-6d4e2.firebaseio.com'
// axios.defaults.headers.get['Accepts'] = 'application/json';
// const reqInterceptor = axios.interceptors.request.use(config => {
//   console.log('Request interceptors: ', config)
//   return config;
// });
// const resInterceptor = axios.interceptors.response.use(res => {
//   console.log('Response interceptors', res)
//   return res;
// });
//
// axios.interceptors.request.eject(reqInterceptor)
// axios.interceptors.response.eject(resInterceptor)

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App)
})
//.$mount('#app')

function authStatusChange(loggedIn, user) {
  if(store){
    store.commit('AUTH_STATUS_CHANGE')
    if (user) {
      store.dispatch('getShoppingCart', {
        uid: user.uid,
        currentCart: store.getters.cartItemList
      })
    }
  }
}
