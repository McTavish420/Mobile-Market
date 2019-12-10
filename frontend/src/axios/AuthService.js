import axios from 'axios'

const url = '/users'

class AuthService {
  // create a new user
  static createUser (text) {
    return axios.post(`${url}/create`, text).then((res) => {
      // console.log(res.data)
      return res
    }).catch((err) => {
      // console.log(err.message)
      return err.message
    })
  }

  // logging in a user
  static userLogin (text) {
    return axios.post(`${url}/login`, text).then((res) => {
      // console.log(res)
      // console.log(res.data)
      return res
    }).catch((err) => {
      // console.log(err.message)
      return err.message
    })
  }

  // logging out a user

  static userLogout (text) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/logout`, text).then((res) => {
        // console.log(res.data)
        resolve(res.data)
      }).catch((err) => {
        // console.log(err)
        reject(err)
      })
    })
  }

  // get a certain user
  static getUser (id) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/${id}`).then((res) => {
        // console.log('line 47', res.data)
        resolve(res.data)
      }).catch((e) => {
        reject(e)
      })
    })
  }

  // get all users
  static getEM () {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${url}`).then((res) => {
          // console.log(res.data)
          resolve(res.data)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  // update a userinfo
  static updateUser (id, info) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.patch(`${url}/${id}`, info)
        // console.log(res)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  // delete a user
  static deleteUser (id) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.delete(`${url}/${id}`)
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default AuthService
