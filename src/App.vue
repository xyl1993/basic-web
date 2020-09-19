<template>
  <div id="app">
    <transition
      name="left"
      mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  mounted() {},
  created() {},
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
@import "./assets/scss/tree.scss";
</style>