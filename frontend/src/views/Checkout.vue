<template>
<v-container>
  <v-card
    class="mx-auto"
    max-width="800"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-center overline mb-4"><h1>Current Order</h1></div>
        <v-list-item-title class="headline mb-1">Products List</v-list-item-title>
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.products" :key="item.name">
          <td>{{ item.name }}</td>
          <td>৳{{ item.price }}</td>
          <td>
            <v-text-field
              label="Quantity"
              solo
              dense
              flat
              v-model="item.quantity"
              type="number"
              :min="1"
              :step="1"
              @keyup="change(item)"
              @keydown="change(item)" @click="change(item)"
            ></v-text-field>
          </td>
          <td>৳{{ item.price * item.quantity }}</td>
          <td>
            <v-btn text class="error darken-1" @click="remove(item)">
              Delete
            </v-btn>
          </td>
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
        <v-list-item-title class="headline my-2">Bill: ৳{{order.bill}}/=</v-list-item-title>
        <v-list-item-title class="headline my-1">Delivery Address:</v-list-item-title>
        <v-text-field
          v-model="order.deliveryAddress"
          prepend-icon="contacts"
          label="Address"
          required
          class="my-3"
    ></v-text-field>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn text class="success accent-4" @click="placeOrder()">Place Order</v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      order: {
        id: null,
        deliveryAddress: null,
        bill: null,
        products: null
      }
    }
  },
  async created () {
    await this.$store.dispatch('unChecked')
    let item = this.$store.getters.checkout
    this.order = item
  },
  methods: {
    change (data) {
      data.quantity = parseInt(data.quantity, 10)
      this.$store.dispatch('changeQuantity', data)
    },
    remove (data) {
      data.quantity = parseInt(data.quantity, 10)
      this.$store.dispatch('removeProduct', data)
    },
    placeOrder () {
      this.$store.dispatch('putOrder')
    }
  }
}
</script>

<style>
</style>
