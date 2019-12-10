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
        <tr v-for="(item, index) in tags" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <v-btn text class="success accent-4" :to="`/admin/updatetag/${item._id}/${item.name}`">
              Update
            </v-btn>
          </td>
          <td>
            <v-btn text class="error darken-1" @click="delT(item._id)">
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
      tags: []
    }
  },
  async created () {
    try {
      // console.log(this.$store.dispatch('getAllTag'))
      this.tags = await this.$store.dispatch('getAllTag')
      // console.log(this.tags)
    } catch (error) {
      this.error = error.message
    }
  },
  methods: {
    delT (id) {
      this.$store.dispatch('deleteTag', id)
    }
  }
}
</script>

<style>
</style>
