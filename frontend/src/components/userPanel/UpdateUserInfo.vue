<template>
  <v-container>
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
    <p class="display-1 text-center cyan--text">SIGN UP</p>
    <v-text-field
      v-model="userinfo.username"
      prepend-icon="mdi-account-circle"
      :counter="20"
      :rules="nameRules"
      label="Username"
      required
      class="my-5"
    ></v-text-field>

    <v-text-field
      v-model="userinfo.userPhone"
      prepend-icon="phone"
      :counter="11"
      :rules="phoneRules"
      label="Phone Number"
      required
      class="my-5"
    ></v-text-field>

    <v-text-field
      v-model="userinfo.userAddress"
      prepend-icon="contacts"
      label="Address"
      required
      class="my-5"
    ></v-text-field>

    <v-btn class="success accent-4" dark depressed type="submit">Update</v-btn>
  </v-form>
  </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      userinfo: {},
      valid: true,
      nameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        v => !!v || 'Required.',
        v => v.length >= 11 || 'Min 11 characters'
      ]
    }
  },
  async created () {
    let id = JSON.parse(localStorage.getItem('user'))._id
    this.userinfo = await this.$store.dispatch('getAUser', id)
    // console.log(this.userinfo)
  },
  methods: {
    update () {
      let user = {
        _id: this.userinfo._id,
        username: this.userinfo.username,
        userPhone: this.userinfo.userPhone,
        userAddress: this.userinfo.userAddress
      }
      this.$store.dispatch('changeUser', user)
    }
  }
}
</script>

<style>
</style>
