import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../router/index'
import OrderService from '../../axios/OrderService'

Vue.use(Vuex)
const token = {
  headers: {
    'x-auth': ''
  }
}

const state = {
  id: null,
  products: [],
  bill: null,
  deliveryAddress: null,
  orderStatus: null,
  allOrder: null
}

const mutations = {
  addToCart (state, item) {
    state.products.push(item)
    let addBill = item.quantity * item.price
    // console.log(addBill)
    state.bill += addBill
    // console.log(state.bill)
    // console.log(state.products)
  },
  addToProducts (state, item) {
    // console.log(item)
    let product = state.products.find((element) => {
      return element._id === item._id
    })
    product.quantity += item.quantity
    // console.log('berfore', state.bill)
    let addBill = item.quantity * item.price
    state.bill += addBill
  },
  changeQuan (state, item) {
    let product = state.products.find((element) => {
      return element._id === item._id
    })
    product.quantity = item.quantity
    let bill = 0
    state.products.forEach(element => {
      bill += element.quantity * element.price
    })
    state.bill = bill
  },
  delProduct (state, item) {
    let product = state.products.find((element) => {
      return element._id === item._id
    })
    let index = state.products.indexOf(product)
    state.products.splice(index, 1)
    let bill = 0
    state.products.forEach(element => {
      bill += element.quantity * element.price
    })
    state.bill = bill
  },
  placeOrder (state) {
    state.orderStatus = 'checked'
  },
  getOrder (state, order) {
    // console.log(order)
    if (order) {
      state.id = order._id
      state.products = order.products
      state.bill = order.bill
      state.deliveryAddress = order.deliveryAddress
      state.orderStatus = order.orderStatus
    } else {
      state.id = null
      state.products = null
      state.bill = null
      state.deliveryAddress = null
      state.orderStatus = null
    }
  },
  resOrder (state, item) {
    state.allOrder = item
  }
}

const actions = {
  addToCart ({ commit, dispatch }, data) {
    let record = state.id
    // console.log(data)
    if (record) {
      let product = state.products.find((item) => {
        return item._id === data._id
      })
      if (product) {
        // console.log('the product exists already')
        let item = {
          _id: data._id,
          name: data.name,
          price: data.price,
          quantity: data.quantity
        }
        commit('addToProducts', item)
        let info = {
          _id: state.id,
          products: state.products,
          bill: state.bill,
          deliveryAddress: state.deliveryAddress
        }
        dispatch('changeCart', info)
        router.go()
      } else {
        // console.log('This product doesnot exist')
        let item = {
          _id: data._id,
          name: data.name,
          price: data.price,
          quantity: data.quantity
        }
        // console.log(item)
        commit('addToCart', item)
        let info = {
          _id: state.id,
          products: state.products,
          bill: state.bill,
          deliveryAddress: state.deliveryAddress
        }
        dispatch('changeCart', info)
        router.go()
      }
    } else {
      // console.log('no order unchecked')
      OrderService.createOrder(data, token).then((res) => {
        // console.log(res)
        return res
      }).catch((er) => {
        // console.log(er)
        return er
      })
      router.go()
    }
  },
  changeQuantity ({ commit, dispatch }, data) {
    commit('changeQuan', data)
    let info = {
      _id: state.id,
      products: state.products,
      bill: state.bill,
      deliveryAddress: state.deliveryAddress
    }
    dispatch('changeCart', info)
  },
  putOrder ({ commit, dispatch }) {
    // console.log('before', state.orderStatus)
    commit('placeOrder')
    // console.log('after', state.orderStatus)
    let info = {
      _id: state.id,
      products: state.products,
      bill: state.bill,
      deliveryAddress: state.deliveryAddress,
      orderStatus: state.orderStatus
    }
    dispatch('changeCart', info)
    router.replace('/')
  },
  removeProduct ({ commit, dispatch }, data) {
    commit('delProduct', data)
    let info = {
      _id: state.id,
      products: state.products,
      bill: state.bill,
      deliveryAddress: state.deliveryAddress
    }
    dispatch('changeCart', info)
  },
  changeCart ({ commit, dispatch }, data) {
    let id = data._id
    OrderService.updateCart(id, data, token).then((res) => {
      if (res) {
        // console.log('Order successfully Placed')
        return res
      }
    }).catch((err) => {
      // console.log(err)
      return err
    })
  },
  unChecked ({ commit, dispatch }) {
    let dataToken = localStorage.getItem('token')
    token.headers['x-auth'] = dataToken
    OrderService.getUnchecked(token).then((res) => {
      // console.log('response', res[0])
      commit('getOrder', res[0])
    }).catch((er) => {
      // console.log(er)
      return er
    })
  },
  getMine ({ commit, dispatch }) {
    let dataToken = localStorage.getItem('token')
    token.headers['x-auth'] = dataToken
    return OrderService.getMyOrders(token).then((res) => {
      return res
    }).catch((er) => {
      // console.log(er)
      return er
    })
  },

  // admin portion
  getAllOrders ({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      await OrderService.getAllOrder().then((res) => {
        commit('resOrder', res)
        resolve(res)
      }).catch((er) => {
        reject(er)
      })
    })
  },
  order ({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      OrderService.getOneOrder(id).then((res) => {
        // console.log(res)
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deleteOrder ({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      OrderService.delOrder(id).then((res) => {
        resolve(res)
      }).catch((er) => {
        reject(er)
      })
    })
  },
  sendOrder ({ commit, dispatch }, item) {
    let id = item._id
    return new Promise(async (resolve, reject) => {
      try {
        await OrderService.updateOrder(id, item).then((res) => {
          resolve(res)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

const getters = {
  checkout (state) {
    return state
  },
  allOrders (state) {
    return state.allOrder
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
