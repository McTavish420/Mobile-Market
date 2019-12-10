<template>
<v-card
  class="mx-auto pa-10 my-10"
  width="600"
  outlined>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="add"
  >
    <p class="display-1 text-center cyan--text">Add New Category</p>
    <v-text-field
      v-model="name"
      prepend-icon="category"
      :counter="15"
      :rules="nameRules"
      label="Name of The New Category"
      required
      class="my-5"
    ></v-text-field>

    <v-btn class="cyan" dark depressed type="submit">Add Category</v-btn>
  </v-form>
</v-card>
</template>

<script>
export default {
  name: 'AddCategory',
  data () {
    return {
      name: '',
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v.length >= 6 && v.length <= 15) || '6 to 15 Characters'
      ]
    }
  },
  methods: {
    async add () {
      let category = {
        name: this.name
      }
      // console.log(name)
      await this.$store.dispatch('addCategory', category)
    }
  }
}
</script>

<style>
</style>
