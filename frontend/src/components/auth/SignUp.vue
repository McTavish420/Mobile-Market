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
    <p class="display-1 text-center cyan--text">SIGN UP</p>
    <v-text-field
      v-model="username"
      prepend-icon="mdi-account-circle"
      :counter="20"
      :rules="nameRules"
      label="Username"
      required
      class="my-5"
    ></v-text-field>

    <v-text-field
      v-model="email"
      prepend-icon="email"
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

    <v-text-field
      v-model="phone"
      prepend-icon="phone"
      :counter="11"
      :rules="phoneRules"
      label="Phone Number"
      required
      class="my-5"
    ></v-text-field>

    <v-text-field
      v-model="address"
      prepend-icon="contacts"
      label="Address"
      required
      class="my-5"
    ></v-text-field>

    <v-btn class="cyan" dark depressed type="submit">Sign Up</v-btn>
  </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      showPassword: false,
      password: '',
      username: '',
      phone: '',
      address: '',
      valid: true,
      nameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        v => !!v || 'Required.',
        v => v.length >= 6 || 'Min 6 characters'
      ],
      phoneRules: [
        v => !!v || 'Required.',
        v => v.length >= 11 || 'Min 11 characters'
      ]

    }
  },
  methods: {
    async onSubmit () {
      let formdata = {
        email: this.email,
        password: this.password,
        username: this.username,
        userPhone: this.phone,
        userAddress: this.address
      }
      // let data = JSON.stringify(formdata)
      // console.log(data)
      await this.$store.dispatch('registration', formdata)
      await this.$store.getters.user
    }
  }
}
</script>

<style scoped>

</style>
