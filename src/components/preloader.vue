<template lang="html">
  <div id="preloader" @load="loader">
    <div id="status">&nbsp;</div>
  </div>
</template>

<script>
export default {
  methods:{
    loader: () => {}
  }
}
</script>

<style lang="css" scoped>
#preloader {
    background-color: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
}
#status {
  background-image: url("../assets/3D Yin-yang.gif");
  background-repeat: no-repeat;
  width: 70px;
  height: 70px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -35px;
  margin-left: -35px;
}
</style>
