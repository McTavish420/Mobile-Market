<template>
<v-simple-table fixed-header height="650">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"><h1>#</h1></th>
          <th class="text-left"><h1>Name</h1></th>
          <th class="text-left"><h1>Price</h1></th>
          <th class="text-left"><h1>Category</h1></th>
          <th class="text-left"></th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>৳{{ item.price }}</td>
          <td>{{ item.category }}</td>
          <td>
            <v-btn text class="success accent-4" :to="`/admin/updateproduct/${item._id}/${item.name}`">
              Update
            </v-btn>
          </td>
          <td>
            <v-btn text class="info darken-1" :to="`/product/${item._id}/${item.name}`">
            View
            </v-btn>
          </td>
          <td>
            <v-btn text class="error darken-1" @click="delP(item._id)">
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
</v-simple-table>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  async created () {
    try {
      // console.log(this.$store.dispatch('getAll'))
      this.products = await this.$store.dispatch('getAll')
      // console.log(this.products)
    } catch (error) {
      this.error = error.message
    }
  },
  methods: {
    delP (id) {
      this.$store.dispatch('deleteProduct', id)
    }
  }
}
</script>

<style>
</style>
