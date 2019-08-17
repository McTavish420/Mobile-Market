<template>
  <div class="d-flex flex-column sticky-footer-wrapper">
            <app-header></app-header>
      <main class="flex-fill">
        <message-component></message-component>
        <div class="container mrgn">
            <div class="row">
              <div class="col-md-12">
                <router-view></router-view>
              </div>
            </div>
        </div>
      </main>
      <footer class="navbar-default navbar-bottom navbar-dark bg-dark fixed-bottom">
        <div class="container-fluid">
              <p class="text-center nav-bar mb-0">Checkout repository at <a href="https://github.com/McTavish420/mobile-market" target="_blank">
                https://github.com/McTavish420/mobile-market
              </a></p>
        </div>
      </footer>

  </div>


</template>

<script>
// import Preloader from './components/preloader.vue'
import {mapActions} from 'vuex'
import Header from './components/Header/Header.vue'
import MessageComponent from './components/common/MessageComponent.vue'
export default {
  components:{// appPreloader: Preloader
    appHeader: Header,
    MessageComponent
  },
  methods: {
    ...mapActions(['getShoppingCart', 'listenToProductList'])
  },
  created(){
    let uid = this.$store.getters.currentUser.uid;
    this.listenToProductList();
    this.getShoppingCart({uid, currentCart: this.$store.getters.cartItemList});
  }
}
</script>

<style media="screen">
* {
    font-family: 'Inconsolata', monospace;
    font-family: 'Josefin Sans', sans-serif;
    font-family: 'Source Sans Pro', sans-serif;
    font-family: 'Raleway';
}

html {
    scroll-behavior: smooth;
}
/*body {
    background-image: url(./assets/images/back.gif);
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    height: 100vh;
}*/
#reset-store-panel {
  position: fixed; bottom: 0px; right: 0px;
}

.mrgn{
  margin-top: 4rem !important;
}

body, .sticky-footer-wrapper {
   min-height:100vh;
}

.flex-fill {
   flex:1 1 auto;
}

 footer {
  height: 40px;
  width: 100%;
  color:  #FDFFFC;
  background-color: #181820;
  padding: 10px 0 10px 0;
  font-size: 85%;
  font-weight: 500;
  letter-spacing: 1px;
}
footer a {
  color: #999;
}
footer a:hover {
  color: #efefef;
}
@media (max-width: 576px) {
  footer {
    height: 50px;
  }
}

</style>
