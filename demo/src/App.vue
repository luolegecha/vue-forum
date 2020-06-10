<template>
  <div id="app">
    <!--路由占位符-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  background-image: url("./assets/bg.jpg");
  background-attachment: scroll;
  
}
</style>
