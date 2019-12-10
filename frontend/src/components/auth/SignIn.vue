<template>
<v-card
  class="mx-auto pa-10 my-10"
  width="600"
  outlined>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <p class="display-1 text-center cyan--text">SIGN IN</p>
    <v-text-field
      v-model="email"
      prepend-icon="mdi-account-circle"
      :rules="emailRules"
      label="E-mail"
      required
      class="my-5"
    ></v-text-field>

    <v-text-field
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      prepend-icon="mdi-lock"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      :rules="passRules"
      label="Password"
      required
      class="my-5"
    ></v-text-field>

    <v-btn class="cyan" dark depressed type="submit">Sign In</v-btn>
  </v-form>
</v-card>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      valid: true,
      showPassword: false,
      email: '',
      password: '',
      error: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        v => !!v || 'Required.',
        v => v.length >= 6 || 'Min 6 characters'
      ]
    }
  },
  computed: {
    isError () {
      return this.$store.getters.isError
    }
  },
  methods: {
    async onSubmit () {
      let formdata = {
        email: this.email,
        password: this.password
      }
      // let data = JSON.stringify(formdata)
      // console.log(data)
      await this.$store.dispatch('login', formdata)
      await this.$store.getters.user
    }
  }
}
</script>

<style scoped>

</style>
