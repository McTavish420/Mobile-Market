import axios from 'axios'
const url = '/order'

class OrderService {
  // get all orders
  static getAllOrder () {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${url}`)
        let data = res.data
        let more = data.map(post => ({
          ...post,
          id: post._id
        }))
        resolve(more)
      } catch (error) {
        reject(error)
      }
    })
  }
  // get unchecked order
  static getUnchecked (text) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${url}/unchecked`, text)
        let data = res.data
        resolve(data)
      } catch (error) {
        // console.log(error.message)
        reject(error)
      }
    })
  }

  // create a order
  static createOrder (info, token) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.post(`${url}/create`, info, token)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  // get  a certain order
  static getOneOrder (id) {
    return axios.get(`${url}/${id}`).then((res) => {
      return res.data
    }).catch((err) => {
      // console.log(err)
      return err
    })
  }
  // Update an order
  static updateOrder (id, info) {
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
  // Update a unchecked order
  static updateCart (id, info, token) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.patch(`${url}/${id}/unchecked`, info, token)
        // console.log(res)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // Delete an order
  static delOrder (id) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.delete(`${url}/${id}`)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  // get all orders of a user
  static getMyOrders (text) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${url}/checked`, text)
        let data = res.data
        let more = data.map(post => ({
          ...post,
          id: post._id
        }))
        resolve(more)
      } catch (error) {
        // console.log(error.message)
        reject(error)
      }
    })
  }
}

export default OrderService
