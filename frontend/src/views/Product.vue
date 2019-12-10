<template>
<v-container>
  <div class="title text-center my-2"><h1>{{product.name}}</h1></div>
  <v-row align="center" justify="center" class="my-2">
    <v-img
      :src="product.imgUrl"
      :aspect-ratio="6/7"
      max-width="600"
      max-height="800"
      class="grey lighten-2"
    ></v-img>
  </v-row>
  <v-card
    class="mx-auto my-2"
    flat
  >
  <v-card-title class="my-1"><h1>{{product.name}}</h1></v-card-title>
    <v-card-subtitle class="pb-0 my-1"><h2>Price: ৳{{product.price}}/=</h2></v-card-subtitle>

    <v-card-text class="text--primary my-1">
      <div class="my-1"><h3>{{product.details}}</h3></div>

      <div class="my-1"><h3>Category: {{product.category}}</h3></div>
      <div class="my-1">
        <h3>Tags: </h3>
        <v-chip class="my-1 mx-1" v-for="(tag, index) in product.tags" :key="index">{{tag}}</v-chip>
      </div>
      <div class="mt-2"><h3>Quantity: </h3></div>
    <v-col sm="3">
      <v-text-field
        label="Quantity"
        solo
        v-model="quantity"
        type="number"
        :min="1"
        :step="1"
    ></v-text-field>
    </v-col>
    </v-card-text>
    <v-card-actions>
      <v-col sm="2">
        <v-btn depressed dark
       class="mb-2 success accent-4 w-100"
       @click="addToCart(product)"
       >ADD TO CART</v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      quantity: 1
    }
  },
  methods: {
    addToCart (data) {
      this.quantity = parseInt(this.quantity, 10)
      data.quantity = this.quantity
      this.$store.dispatch('addToCart', data)
    }
  },
  async created () {
    let id = this.$route.params.id
    this.product = await this.$store.dispatch('product', id)
  }
}
</script>

<style>
</style>
