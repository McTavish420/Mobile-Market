<template>
<v-container fluid>
  <v-row>
    <v-col md="2">
      <v-expansion-panels class="my-2">
        <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>Product</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/admin/createproduct">ADD PRODUCT</v-btn>
            <br />
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/admin/products">VIEW ALL</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>Category</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/admin/createcategory">ADD Category</v-btn>
            <br />
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/admin/categories">VIEW ALL</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>Tags</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/admin/createtag">ADD Tags</v-btn>
            <br />
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/admin/tags">VIEW ALL</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>Orders</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/admin/orders">View All</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="shadow-0 my-2">
          <v-expansion-panel-header>Users</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn depressed dark class="mb-2 blue darken-1 w-100" to="/admin/users">View All</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col md="10">
      <router-view />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      orderlist: true,
      createproduct: false,
      maketag: false
    }
  },
  methods: {
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
