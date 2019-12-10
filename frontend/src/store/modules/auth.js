import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../router/index'
import AuthService from '../../axios/AuthService'
// import { stat } from 'fs'

Vue.use(Vuex)

const token = {
  headers: {
    'x-auth': ''
  }
}

const state = {
  idToken: null,
  username: null,
  error: null,
  user: null,
  role: null
}
const mutations = {
  authUser (state, userData) {
    state.idToken = userData.token
    state.username = userData.username
    state.user = userData
    state.role = userData.user.role
  },
  clearAuthData (state) {
    state.idToken = null
    state.username = null
    state.user = null
    state.role = null
  },
  takeError (state, err) {
    state.error = err
  }
}
const actions = {
  registration ({ commit, dispatch }, data) {
    // console.log(data)
    return new Promise((resolve, reject) => {
      AuthService.createUser(data).then((res) => {
        // console.log(res)
        // console.log(res.data)
        // console.log(JSON.stringify(res.data))
        // console.log(res.headers['x-auth'])
        token.headers['x-auth'] = res.headers['x-auth']
        // console.log(token.headers['x-auth'])
        commit('authUser', {
          token: res.headers['x-auth'],
          username: res.data.username,
          user: res.data
        })
        let user = state.user.user
        // console.log(user)
        localStorage.setItem('token', res.headers['x-auth'])
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('username', res.data.username)
        router.replace('/')
        router.go()
        resolve(res.data)
      }).catch((e) => {
        // console.log(e)
        reject(e)
      })
    })
  },
  login ({ commit, dispatch }, data) {
    // console.log(data)
    return new Promise((resolve, reject) => {
      AuthService.userLogin(data).then((res) => {
        // console.log(res)
        // console.log(res.data)
        // console.log(res.headers['x-auth'])
        token.headers['x-auth'] = res.headers['x-auth']
        // console.log(token.headers['x-auth'])
        commit('authUser', {
          token: res.headers['x-auth'],
          username: res.data.username,
          user: res.data
        })
        let user = state.user.user
        localStorage.setItem('token', res.headers['x-auth'])
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('username', res.data.username)
        router.replace('/')
        router.go()
        resolve(res.data)
      }).catch((e) => {
        // console.log(e)
        commit('takeError', {
          error: e
        })
        reject(e)
      })
    })
  },
  logout ({ commit }) {
    AuthService.userLogout(token).then((res) => {
      // console.log(res)
      commit('clearAuthData')
      token.headers['x-auth'] = ''
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('username')
      router.replace('/signin')
      router.go()
    }).catch((e) => {
      // console.log(e)
      return e
    })
  },
  tryAutoLogin ({ commit }) {
    let dataToken = localStorage.getItem('token')
    if (!dataToken) {
      return
    }
    token.headers['x-auth'] = dataToken
    let dataUser = JSON.parse(localStorage.getItem('user'))
    let dataUsername = localStorage.getItem('username')
    commit('authUser', {
      token: dataToken,
      user: dataUser,
      username: dataUsername
    })
  },
  getAUser ({ commit, dispatch }, data) {
    return AuthService.getUser(data).then((res) => {
      // console.log('line 126', res)
      return res
    }).catch((e) => {
      // console.log(e)
      return e
    })
  },
  changeUser ({ commit, dispatch }, data) {
    // console.log(data)
    let id = data._id
    // console.log(id)
    AuthService.updateUser(id, data).then((res) => {
      // console.log(res)
      router.replace('/admin')
      router.go()
    }).catch((err) => {
      // console.log(err)
      return err
    })
  },
  removeUser ({ commit, dispatch }, id) {
    // console.log(id)
    AuthService.deleteUser(id).then((res) => {
      // console.log(res)
      router.replace('/admin')
      router.go()
    }).catch((er) => {
      // console.log(er)
      return er
    })
  },
  getAllUsers ({ commit, dispatch }) {
    return AuthService.getEM().then((res) => {
      // console.log('line 134', res)
      return res
    }).catch((e) => {
      // console.log(e)
      return e
    })
  }
}
const getters = {
  getUserName (state) {
    // console.log(state.username)
    return state.username
  },
  isAuthenticated (state) {
    return state.idToken != null
  },
  isError (state) {
    return state.error != null
  },
  getUser (state) {
    // console.log(typeof state.user)
    // console.log(state.user)
    return state.user
  },
  getRole (state) {
    return state.role
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
