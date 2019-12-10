<template>
<v-container>
  <v-card
    class="mx-auto"
    max-width="800"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4 mt-3"><h2>Order ID: {{order._id}}</h2></div>
        <v-list-item-title class="headline my-3">Ordered By: {{order.orderFrom.userName}}</v-list-item-title>
        <v-list-item-subtitle>Date: {{order.createdAt}}</v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-2 mt-3"><h2>User Info:</h2></div>
        <v-list-item-title class="my-3">User Name: {{order.orderFrom.userName}}</v-list-item-title>
        <v-list-item-title class="my-3">Email: {{order.orderFrom.userEmail}}</v-list-item-title>
        <v-list-item-title class="my-3">Phone: {{order.orderFrom.userPhone}}</v-list-item-title>
        <v-list-item-title class="my-3">User Address: {{order.orderFrom.userAdress}}</v-list-item-title>
      </v-list-item-content>

    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-2 mt-3"><h2>Products Info:</h2></div>
        <v-list-item-title class="my-3">
          <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"><h3>Name</h3></th>
          <th class="text-left"><h3>Unit Price</h3></th>
          <th class="text-left"><h3>Quantity</h3></th>
          <th class="text-left"><h3>Total Cost</h3></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.products" :key="item.name">
          <td>{{ item.name }}</td>
          <td>৳{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>৳{{ item.price * item.quantity }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td><h3>Total Bill: </h3></td>
          <td>৳{{order.bill}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
        </v-list-item-title>
      </v-list-item-content>

    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-2 mt-3"><h2>Order Info:</h2></div>
        <v-list-item-title class="my-3">Delivery Address: {{order.deliveryAddress}}</v-list-item-title>
        <v-list-item-title class="my-3">Total Bill: {{order.bill}}</v-list-item-title>
        <v-list-item-title class="my-3">Delivery Status: {{order.deliveryStatus}}</v-list-item-title>
      </v-list-item-content>

    </v-list-item>

    <v-card-actions>
      <v-btn text class="success accent-4" v-show="order.deliveryStatus === 'pending'" @click.prevent="dispatch">Dispatch</v-btn>
      <v-btn text class="error darken-1" @click.prevent="deleteOrder(order._id)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      order: null
    }
  },
  async created () {
    let id = this.$route.params.id
    this.order = await this.$store.dispatch('order', id)
  },
  methods: {
    dispatch () {
      this.order.deliveryStatus = 'dispatched'
      this.$store.dispatch('sendOrder', this.order)
      this.$router.replace('/admin')
      this.$router.go()
    },
    async deleteOrder (id) {
      await this.$store.dispatch('deleteOrder', id)
      this.$router.replace('/admin/orders')
    }
  }
}
</script>

<style>
</style>
