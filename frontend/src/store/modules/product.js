import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../router/index'
import ProductService from '../../axios/ProductService'
// import { stat } from 'fs'

Vue.use(Vuex)

const state = {
  name: null,
  price: null,
  tags: null,
  category: null,
  stock: null,
  details: null,
  discount: null,
  hot: null,
  error: null,
  products: []
}
const mutations = {
  storeProduct (state, data) {
    state.name = data.name
    state.price = data.price
    state.tags = data.tags
    state.category = data.category
    state.details = data.details
    state.discount = data.discount
    state.hot = data.hot
  },
  takeError (state, err) {
    state.error = err
  }
}
const actions = {
  // product section
  getAll ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        ProductService.getAllProduct().then((res) => {
          // console.log(res)
          resolve(res)
        })
      } catch (error) {
        // console.log(error)
        reject(error)
      }
    })
  },
  product ({ commit, dispatch }, id) {
    // console.log(id)
    return new Promise((resolve, reject) => {
      try {
        // console.log(id)
        ProductService.getOneProduct(id).then((res) => {
          // console.log(res)
          resolve(res.data)
        })
      } catch (error) {
        // console.log(error)
        reject(error)
      }
    })
  },
  addProduct ({ commit, dispatch }, data) {
    // console.log('line 70', data)
    ProductService.createProduct(data).then((res) => {
      // console.log(res)
      router.replace('/admin/products')
    }).catch((e) => {
      // console.log(e)
      return e
    })
  },
  changeProduct ({ commit, dispatch }, data) {
    let id = data.id
    let info = data.info
    ProductService.updateProduct(id, info).then((res) => {
      // console.log(res)
      router.replace('/admin/products')
      router.go()
    }).catch((err) => {
      // console.log(err)
      return err
    })
  },
  deleteProduct ({ commit, dispatch }, id) {
    ProductService.delProd(id).then((res) => {
      // console.log(res)
      router.replace('/admin')
    }).catch((er) => {
      // console.log(er)
      return er
    })
  },
  // category section
  getAllCategory ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        ProductService.getCategories().then((res) => {
          // console.log(res)
          resolve(res)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  addCategory ({ commit, dispatch }, data) {
    ProductService.createCategory(data).then((res) => {
      // console.log(res)
      router.replace('/admin/categories')
    }).catch((er) => {
      // console.log(er)
      return er
    })
  },
  changeCategory ({ commit, dispatch }, data) {
    let id = data.id
    let info = data.info
    ProductService.updateCategory(id, info).then((res) => {
      // console.log(res)
      router.replace('/admin/categories')
    }).catch((er) => {
      // console.log(er)
      return er
    })
  },
  category ({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(id)
        ProductService.getOneCategory(id).then((res) => {
          // console.log(res)
          resolve(res)
        })
      } catch (error) {
        // console.log(error)
        reject(error)
      }
    })
  },
  deleteCategory ({ commit, dispatch }, id) {
    ProductService.delCateg(id).then((res) => {
      // console.log(res)
      router.replace('/admin')
    }).catch((er) => {
      // console.log(er)
    })
  },
  // Tag Section
  getAllTag ({ commit, dispatch }) {
    return ProductService.getTags().then((res) => {
      // console.log(res)
      return res
    }).catch((er) => {
      // console.log(er)
      return er
    })
  },
  addTag ({ commit, dispatch }, data) {
    // console.log(data)
    return ProductService.createTag(data).then((res) => {
      // console.log(res)
      router.replace('/admin/tags')
    }).catch((er) => {
      // console.log(er)
      return er
    })
  },
  changeTag ({ commit, dispatch }, data) {
    let id = data.id
    let info = data.info
    ProductService.updateTag(id, info).then((res) => {
      // console.log(res)
      router.replace('/admin/tags')
    }).catch((er) => {
      // console.log(er)
      return er
    })
  },
  tag ({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(id)
        ProductService.getOneTag(id).then((res) => {
          // console.log(res)
          resolve(res)
        })
      } catch (error) {
        // console.log(error)
        reject(error)
      }
    })
  },
  deleteTag ({ commit, dispatch }, id) {
    ProductService.delTag(id).then((res) => {
      // console.log(res)
      router.replace('/admin')
    }).catch((er) => {
      // console.log(er)
      return er
    })
  }
}
const getters = {}

export default {
  state,
  mutations,
  getters,
  actions
}
