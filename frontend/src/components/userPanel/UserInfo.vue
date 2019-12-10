<template>
  <v-container>
    <v-card
    class="mx-auto"
    max-width="800"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline my-3"><h1>User Info:</h1></div>
        <v-list-item-title class="headline my-3">{{user.username}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <hr>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline my-3">User Name: {{user.username}}</v-list-item-title>
        <v-list-item-title class="headline my-3">Email: {{user.email}}</v-list-item-title>
        <v-list-item-title class="headline my-3">Contact No.: {{user.userPhone}}</v-list-item-title>
        <v-list-item-title class="headline my-3">Address: {{user.userAddress}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn text to="/update" v-show="user._id === checkID" class="success accent-4">Update My Information</v-btn>
    </v-card-actions>
  </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      role: '',
      checkID: ''
    }
  },
  async created () {
    if (this.$route.name === 'userinfo') {
      // console.log(this.$route.name)
      let id = this.$route.params.id
      this.user = await this.$store.dispatch('getAUser', id)
      this.checkID = JSON.parse(localStorage.getItem('user'))._id
    } else {
      let id = JSON.parse(localStorage.getItem('user'))._id
      // console.log('line 16', id)
      this.user = await this.$store.dispatch('getAUser', id)
      // console.log(this.user)
      this.role = this.user.role
      this.checkID = JSON.parse(localStorage.getItem('user'))._id
    }
  }
}
</script>

<style>

</style>
