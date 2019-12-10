<template>
<v-card
  class="mx-auto pa-10 my-10"
  width="600"
  outlined>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="create"
  >
    <p class="display-1 text-center cyan--text">Add New Product</p>
    <v-text-field
      v-model="name"
      prepend-icon="card_giftcard"
      :counter="15"
      :rules="nameRules"
      label="Name of The New Product"
      required
      class="my-5"
    ></v-text-field>
    <v-text-field
      v-model="price"
      prepend-icon="attach_money"
      label="Price"
      type="number"
      required
      class="my-5"
    ></v-text-field>
    <v-text-field
      v-model="image"
      prepend-icon="image"
      label="Image URL"
      required
      class="my-5"
    ></v-text-field>
    <v-select
      v-model="category"
      :items="value"
      prepend-icon="category"
      attach
      label="Category"
      required
      class="my-5"
    ></v-select>
    <v-select
      v-model="tags"
      :items="options"
      prepend-icon="tag_faces"
      attach
      chips
      label="Tags"
      multiple
      required
      class="my-5"
    ></v-select>
    <v-textarea
      label="Details of the product"
      prepend-icon="description"
      v-model="details"
      rows="3"
      required
      class="my-5"
    ></v-textarea>
    <v-text-field
      v-model="discount"
      prepend-icon="money_off"
      label="Discount"
      type="number"
      required
      class="my-5"
    ></v-text-field>
    <v-switch
      v-model="hot"
      :label="`Hot: ${hot.toString()}`"
      required
      class="my-5"
    ></v-switch>

    <v-btn class="cyan" dark depressed type="submit">Add Product</v-btn>
  </v-form>
</v-card>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      price: 0,
      image: '',
      tags: [],
      category: '',
      details: '',
      discount: 0,
      hot: false,
      options: [],
      value: [],
      error: '',
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v.length >= 6 && v.length <= 15) || '6 to 15 Characters'
      ]
    }
  },
  async created () {
    try {
      let category = await this.$store.dispatch('getAllCategory')
      category.forEach(element => {
        this.value.push(element.name)
      })
      let tag = await this.$store.dispatch('getAllTag')
      tag.forEach(element => {
        this.options.push(element.name)
      })
    } catch (error) {
      // console.log(error.message)
      this.error = error
    }
  },
  methods: {
    async create () {
      let product = {
        name: this.name,
        price: this.price,
        imgUrl: this.image,
        tags: this.tags,
        category: this.category,
        details: this.details,
        discount: this.discount,
        hot: this.hot
      }
      // console.log(product)
      await this.$store.dispatch('addProduct', product)
    }
  }
}
</script>

<style>
</style>
