import Vue from 'vue'
import Store from './components/Store.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import ProductDetails from './components/ProductDetails.vue'
import Register from './components/auth/signup.vue'
import Login from './components/auth/signin.vue'

//Vue.use(Router)
const routes = [
  {path: '/', component: Store, name: 'mainpage'},
  {path: '/product/:id', component: ProductDetails, name: 'product'},
  {path: '/cart', component: ShoppingCart, name: 'shoppingcart'},
  {path: '/register', component: Register, name: 'register', onlyGuest: true},
  {path: '/login', component: Login, name: 'login', onlyGuest: true},
  {path: '*', redirect: '/'}
]
export {
  routes
}

//export default new Router({mode: 'history', routes})
