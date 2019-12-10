import axios from 'axios'
const urlP = '/products'
const urlT = '/tags'
const urlC = '/categories'

class ProductService {
  // get all products
  static getAllProduct () {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(urlP)
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

  // create a product
  static createProduct (info) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.post(`${urlP}/create`, info)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  // get  a certain product
  static getOneProduct (id) {
    // console.log(id)
    return axios.get(`${urlP}/${id}`).then((res) => {
      // console.log(res)
      return res
    }).catch((err) => {
      // console.log(err)
      return err
    })
  }
  // Update a product
  static updateProduct (id, info) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.patch(`${urlP}/${id}`, info)
        // console.log(res)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // Delete a product
  static delProd (id) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.delete(`${urlP}/${id}`)
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  // get all tags
  static getTags () {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${urlT}`)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // create a tag
  static createTag (info) {
    // console.log(info)
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.post(`${urlT}/create`, info)
        let data = res.data
        // console.log(data)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // update a tag
  static updateTag (id, info) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.patch(`${urlT}/${id}`, info)
        // console.log(res)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // get a certain tag
  static getOneTag (id) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${urlT}/${id}`)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // delete a tag
  static delTag (id) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.delete(`${urlT}/${id}`)
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  // get all categories
  static getCategories () {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${urlC}`)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // create a category
  static createCategory (info) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.post(`${urlC}/create`, info)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // update a category
  static updateCategory (id, info) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.patch(`${urlC}/${id}`, info)
        // console.log(res)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // get a certain category
  static getOneCategory (id) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${urlC}/${id}`)
        let data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  // delete a category
  static delCateg (id) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.delete(`${urlC}/${id}`)
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default ProductService
