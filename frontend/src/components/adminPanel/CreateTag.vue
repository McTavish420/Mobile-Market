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
    <p class="display-1 text-center cyan--text">Add New Tag</p>
    <v-text-field
      v-model="name"
      prepend-icon="tag_faces"
      :counter="15"
      :rules="nameRules"
      label="Name of The New Tag"
      required
      class="my-5"
    ></v-text-field>

    <v-btn class="cyan" dark depressed type="submit">Add Tag</v-btn>
  </v-form>
</v-card>
</template>

<script>
export default {
  name: 'AddTag',
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
      let tag = {
        name: this.name
      }
      // console.log(name)
      await this.$store.dispatch('addTag', tag)
    }
  }
}
</script>

<style>
</style>
