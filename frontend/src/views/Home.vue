<template>
<v-container fluid>
  <v-row>
    <v-col md="2">
      <br />
      <br />
      <v-spacer></v-spacer>
      <v-expansion-panels class="my-2">
        <!-- <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>Product</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/">VIEW ALL</v-btn>
            <br />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>Category</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/">ADD Category</v-btn>
            <br />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>Tags</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/">VIEW ALL</v-btn>
            <br />
          </v-expansion-panel-content>
        </v-expansion-panel> -->
        <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>Checkout</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" :to="{name: 'checkout'}">Go to Cart</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>My Account</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/myaccount">Account Settings</v-btn>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/myorders">My Orders</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col md="10">
      <v-container>
        <v-pagination
      v-model="page"
      :length="onPage.length"
    ></v-pagination>
        <v-row>
          <v-col sm="4" v-for="(product, index) in (onPage[page -1])" :key="index">
            <v-card
             class="mx-auto"
             max-width="400"
            >
    <v-img
      class="white--text align-end"
      height="300px"
      :src="product.imgUrl"
    >
    </v-img>
    <v-card-subtitle class="mb-0"><h3>{{product.name}}</h3></v-card-subtitle>
    <v-card-subtitle class="pb-0">Price: ৳{{product.price}}/=</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{product.category}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        depressed dark
        class="mb-2 blue darken-1"
        text
        :to="`/product/${product._id}/${product.name}`"
      >
        View
      </v-btn>

      <v-btn
        depressed dark
        class="mb-2 success accent-4"
        text
        @click="addToCart(product)"
      >
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
          </v-col>
        </v-row>
      </v-container>
  <!-- <div class="home">
    <div class="row justify-content-center mt-2">
      <div class="col-md-10">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row"
                v-for="(item, index) in products"
                v-bind:key="index">
                <td>{{index + 1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>{{item.stock}}</td>
                <td>{{item.category}}</td>
                <td>
                  <input type="number" v-model="item.quantity" :min="1" :step="1">
                </td>
                <td>
                  <button @click="addToCart(item)">Add to Cart</button>
                </td>
                <td>
                  <router-link :to="`/product/${item._id}/${item.name}`">
                    <button>View</button>
                  </router-link>
                </td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div> -->
      <router-view />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      products: [],
      error: '',
      page: 1,
      onPage: []
    }
  },
  async created () {
    try {
      // console.log(this.$store.dispatch('getAll'))
      this.products = await this.$store.dispatch('getAll')
      this.products.forEach(element => {
        element.quantity = 1
      })
      let m = []
      for (let i = 0; i < this.products.length; i++) {
        if ((i + 1) % 6 === 0 && i !== 0) {
          m.push(this.products[i])
          this.onPage.push(m)
          m = []
        } else {
          m.push(this.products[i])
        }
      }
      this.onPage.push(m)
      // console.log(this.products)
      if (localStorage.getItem('token')) {
        await this.$store.dispatch('unChecked')
      }
    } catch (error) {
      this.error = error.message
    }
  },
  methods: {
    addToCart (data) {
      data.quantity = 1
      this.$store.dispatch('addToCart', data)
    }
  }
}
</script>

<style>
.w-100 {
  width: 100%
}
.v-expansion-panel::before {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.0), 0px 0px 0px 0px rgba(0, 0, 0, 0.0), 0px 0px 0px 0px rgba(0, 0, 0, 0.0) !important;
}
.v-expansion-panel {
  border: 1px solid rgba(75, 75, 75, 0.3) !important
}
</style>
