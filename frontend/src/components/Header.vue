<template>
  <nav>
    <v-app-bar
      color="cyan"
      dark
      dense
      flat
    >

      <v-toolbar-title class="animeshop">NoteBook Shop</v-toolbar-title>

      <v-spacer></v-spacer>

    <v-toolbar-items class="d-none d-md-block mx-2">
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" link to="/" depressed>
              <v-icon large class="white--text icon">mdi-home</v-icon>
            </v-btn>
        </template>
        <span>Home</span>
        </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items class="d-none d-md-block mx-2">
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" link :to="{name: 'checkout'}" depressed>
              <v-icon large class="white--text icon">
                shopping_cart
            </v-icon>
            </v-btn>
        </template>
        <span>Checkout</span>
        </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items class="d-none d-md-block mx-2" v-if="auth && role">
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" link to="/admin" depressed>
                <v-icon large class="white--text icon">
                supervisor_account
            </v-icon>
              </v-btn>
        </template>
        <span>Admin Panel</span>
        </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items class="d-none d-md-block mx-2" v-if="!auth">
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" link to="/signup" depressed>
                <v-icon large class="white--text icon">
                person_add
            </v-icon>
              </v-btn>
        </template>
        <span>Sign Up</span>
        </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items class="d-none d-md-block mx-2" v-if="!auth">
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" link to="/signin" depressed>
                <v-icon large class="white--text icon">
                person
            </v-icon>
              </v-btn>
        </template>
        <span>Sign In</span>
        </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items class="d-none d-md-block" v-if="auth">
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" link to="/myaccount">
              <v-icon large class="white--text icon">
                settings_applications
            </v-icon>
            </v-btn>
        </template>
        <span>{{userName}}</span>
        </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items class="d-none d-md-block" v-if="auth">
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-icon large v-on="on" @click="logout" class="white--text icon">
                power_settings_new
            </v-icon>
        </template>
        <span>Sign Out</span>
        </v-tooltip>
    </v-toolbar-items>

    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      userName: ''
    }
  },
  created () {
    this.userName = this.$store.getters.getUserName
    // console.log(this.userName)
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    username () {
      return this.$store.getters.isAuthenticated
        ? this.$store.getters.getUserName
        : false
    },
    role () {
      return this.$store.getters.getRole === 'admin'
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Pacifico&display=swap');
.animeshop {
  font-family: 'Pacifico', cursive;
}
.icon {
  padding: 6px;
}
</style>
