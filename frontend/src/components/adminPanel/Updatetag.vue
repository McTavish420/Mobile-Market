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
    <p class="display-1 text-center cyan--text">Update Tag</p>
    <v-text-field
      v-model="name"
      prepend-icon="tag_faces"
      :counter="15"
      :rules="nameRules"
      label="Name of The New Tag"
      required
      class="my-5"
    ></v-text-field>

    <v-btn class="success accent-4" dark depressed type="submit">Update</v-btn>
  </v-form>
</v-card>
</template>

<script>
export default {
  name: 'UpdateTag',
  data () {
    return {
      name: '',
      tag: null,
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v.length >= 6 && v.length <= 15) || '6 to 15 Characters'
      ]
    }
  },
  async created () {
    let id = this.$route.params.id
    this.tag = await this.$store.dispatch('tag', id)
    // console.log(this.tag)
    this.name = this.tag.name
    // console.log(this.name)
  },
  methods: {
    async update () {
      let tag = {
        name: this.name
      }
      let data = {
        id: this.$route.params.id,
        info: tag
      }
      // console.log(name)
      await this.$store.dispatch('changeTag', data)
    }
  }
}
</script>

<style>
</style>
