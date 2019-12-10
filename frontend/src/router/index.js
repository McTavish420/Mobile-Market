import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/store'
import Home from '../views/Home.vue'
import SignIn from '../components/auth/SignIn.vue'
import SignUp from '../components/auth/SignUp.vue'
import Product from '../views/Product.vue'
import Checkout from '../views/Checkout.vue'
import Admin from '../views/Admin.vue'
import CreateProduct from '../components/adminPanel/CreateProduct.vue'
import CreateTag from '../components/adminPanel/CreateTag.vue'
import OrderList from '../components/adminPanel/OrderList.vue'
import AllProducts from '../components/adminPanel/AllProducts.vue'
import AllCategories from '../components/adminPanel/AllCategories.vue'
import AllTags from '../components/adminPanel/AllTags.vue'
import CreateCategory from '../components/adminPanel/CreateCategory.vue'
import UpdateProduct from '../components/adminPanel/UpdateProduct.vue'
import UpdateCategory from '../components/adminPanel/UpdateCategory.vue'
import UpdateTag from '../components/adminPanel/Updatetag.vue'
import Order from '../components/adminPanel/Order.vue'
import UserInfo from '../components/userPanel/UserInfo.vue'
import AllUsers from '../components/adminPanel/AllUsers.vue'
import UpdateUserInfo from '../components/userPanel/UpdateUserInfo.vue'
import MyOrders from '../components/userPanel/MyOrders.vue'
import MyOrder from '../components/userPanel/Order.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/myaccount',
    component: UserInfo
  },
  {
    path: '/update',
    component: UpdateUserInfo
  },
  {
    path: '/myorders',
    component: MyOrders
  },
  {
    path: '/myorder/:id',
    component: MyOrder
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/product/:id/:name',
    component: Product
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    title: 'Checkout',
    beforeEnter: (to, from, next) => {
      let auth = localStorage.getItem('token')
      if (auth) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/admin',
    component: Admin,
    redirect: '/admin/orders',
    beforeEnter: (to, from, next) => {
      let role = JSON.parse(localStorage.getItem('user')).role
      if (role === 'admin') {
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'createproduct',
        component: CreateProduct
      },
      {
        path: 'createtag',
        component: CreateTag
      },
      {
        path: 'orders',
        component: OrderList
      },
      {
        path: 'products',
        component: AllProducts
      },
      {
        path: 'categories',
        component: AllCategories
      },
      {
        path: 'tags',
        component: AllTags
      },
      {
        path: 'createcategory',
        component: CreateCategory
      },
      {
        path: 'updateproduct/:id/:name',
        component: UpdateProduct
      },
      {
        path: 'updatecategory/:id/:name',
        component: UpdateCategory
      },
      {
        path: 'updatetag/:id/:name',
        component: UpdateTag
      },
      {
        path: 'orders/:id',
        component: Order
      },
      {
        path: 'users',
        component: AllUsers
      },
      {
        path: 'userinfo/:id/:name',
        name: 'userinfo',
        component: UserInfo
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
