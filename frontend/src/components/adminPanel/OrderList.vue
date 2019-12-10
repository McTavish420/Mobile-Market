<template>
<v-simple-table fixed-header height="650">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"><h1>#</h1></th>
          <th class="text-left"><h1>Order ID</h1></th>
          <th class="text-left"><h1>Order From</h1></th>
          <th class="text-left"><h1>Bill</h1></th>
          <th class="text-left"><h1>Delivery Address</h1></th>
          <th class="text-left"><h1>Delivery Status</h1></th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orders" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item._id }}</td>
          <td>{{ item.orderFrom.userName }}</td>
          <td>৳{{ item.bill }}</td>
          <td>{{ item.deliveryAddress }}</td>
          <td>{{ item.deliveryStatus }}</td>
          <td>
            <v-btn text class="info darken-1" :to="`/admin/orders/${item._id}`">
            View
            </v-btn>
          </td>
          <td>
            <v-btn text class="error darken-1" @click="deleteOrder(item._id)">
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
  name: 'OrderList',
  data () {
    return {
      orders: null
    }
  },
  async created () {
    this.orders = await this.$store.dispatch('getAllOrders')
    this.orders = this.$store.getters.allOrders
    // console.log(this.orders)
  },
  methods: {
    async deleteOrder (id) {
      await this.$store.dispatch('deleteOrder', id)
      this.$router.go()
    }
  }
}
</script>

<style>
</style>
