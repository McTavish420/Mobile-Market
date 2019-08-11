<template lang="html">
  <nav class="navbar navbar-expand-sm fixed-top" role="navigation">

      <!-- Brand and toggle get grouped for better mobile display -->
      <router-link to="/" class="navbar-brand mr-auto"><a class="logo">Mobile Market</a></router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTop"
          aria-controls="navbarTop"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleNavbar">
        <i class="fa fa-bars"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarTop" :class="{show: isNavOpen}">
        <ul class="navbar-nav mr-auto">

        </ul>
        <ul class="navbar-nav">
          <router-link to="/login" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
            <a class="nav-link">Sign In</a>
          </router-link>
          <li v-if="isLoggedIn" >
            <a class="nav-link"><img src="https://img.icons8.com/offices/16/000000/active-state.png"> {{ userEmail }} </a>
          </li>
          <li v-if="isLoggedIn" class="btn-pointer nav-item active">
            <a @click="logout" class="nav-link">Logout</a>
          </li>
          <router-link to="/register" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
            <a class="nav-link">Sign Up</a>
          </router-link>
          <li>
            <router-link to="/cart" class="btn btn-success navbar-btn" tag="button">
              Checkout <span class="badge badge-light">{{ numItems }} (৳ {{ cartValue }})</span>
            </router-link>
          </li>
        </ul>
      </div>

    <!-- /.container -->
  </nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data(){
    return {
      isNavOpen: false
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'cartValue', 'currentUser', 'cartItemList']),
    numItems(){
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total;
      }, 0);
    },
    userEmail(){
      return this.isLoggedIn ? this.currentUser.email : '';
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleNavbar(){
      this.isNavOpen = !this.isNavOpen;
    }
  }
}
</script>

<style scoped>
.navbar {
    background-color: #011627;
    opacity: 0.85;
}
.fa-bars{
  background-color: white;
  opacity: 0.7;
}

.navbar a {
    color: #FDFFFC;
}

.navbar li a {
    margin: 3px 5px !important;
    padding: 5px 15px !important;
    border-radius: 3px;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
}

.active a {
    background-color: #FF9F1C;
    color: #011627;
}
</style>
