<template>
<v-simple-table fixed-header height="650">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"><h1>#</h1></th>
          <th class="text-left"><h1>Name</h1></th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in categories" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <v-btn text class="success accent-4" :to="`/admin/updatecategory/${item._id}/${item.name}`">
              Update
            </v-btn>
          </td>
          <td>
            <v-btn text class="error darken-1" @click="delC(item._id)">
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
      categories: []
    }
  },
  async created () {
    try {
      // console.log(this.$store.dispatch('getAllCategory'))
      this.categories = await this.$store.dispatch('getAllCategory')
      // console.log(this.categories)
    } catch (error) {
      this.error = error.message
    }
  },
  methods: {
    delC (id) {
      this.$store.dispatch('deleteCategory', id)
    }
  }
}
</script>

<style>
</style>
