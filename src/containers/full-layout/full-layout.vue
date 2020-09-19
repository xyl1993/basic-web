<template>
  <el-row class="container">
    <!-- head start -->
    <app-header></app-header>
    <!-- head end -->
    <el-col :span="24" class="main">
      <!-- aside start -->
      <app-aside></app-aside>
      <!-- aside end -->
      <section class="content-container el-row">
        <!-- <tags-view /> -->
        <div class="content-wrapper">
          <!-- <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view :key="key" />
            </keep-alive>
          </transition> -->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import AppHeader from '../../components/app-header/app-header';
import AppAside from '../../components/app-aside/app-aside';
// import TagsView from '../../components/tags-view/index';

// import { createWebSocket } from "../../global/websocket.config";
export default {
  name: 'FullLayout',
  components: {
    'app-header': AppHeader,
    'app-aside': AppAside,
    // 'tags-view': TagsView,
  },
  data() {
    return {};
  },
  computed: {
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews;
    // },
    // key() {
    //   return this.$route.path;
    // },
  },
  created() {
    // createWebSocket(this);
  },
};
</script>
<style lang="scss" scoped>
@import './full-layout.scss';
</style>


