<template>
<v-card
  class="mx-auto pa-10 my-10"
  width="600"
  outlined>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="update"
  >
    <p class="display-1 text-center cyan--text">Update Category</p>
    <v-text-field
      v-model="name"
      prepend-icon="category"
      :counter="15"
      :rules="nameRules"
      label="Name of The New Category"
      required
      class="my-5"
    ></v-text-field>

    <v-btn class="success accent-4" dark depressed type="submit">Update</v-btn>
  </v-form>
</v-card>
</template>

<script>
export default {
  name: 'UpdateCategory',
  data () {
    return {
      name: '',
      category: null,
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v.length >= 6 && v.length <= 15) || '6 to 15 Characters'
      ]
    }
  },
  async created () {
    let id = this.$route.params.id
    this.category = await this.$store.dispatch('category', id)
    this.name = this.category.name
  },
  methods: {
    async update () {
      let category = {
        name: this.name
      }
      let data = {
        id: this.$route.params.id,
        info: category
      }
      // console.log(name)
      await this.$store.dispatch('changeCategory', data)
    }
  }
}
</script>

<style>
</style>
