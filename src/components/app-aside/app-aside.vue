<template>
  <el-scrollbar class="scroll-view" wrap-class="scrollbar-wrapper" style="height:100%;z-index:99;">
    <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="collapsed"
        background-color="rgb(0, 20, 42)"
        text-color="#909399"
        active-text-color="#fff"
        :unique-opened="true"
        :collapse-transition="false"
      >
        <sidebar-item
          v-for="route in $store.state.menuStore.menuList"
          :key="route.id"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </aside>
  </el-scrollbar>
</template>
<script>
import SidebarItem from './components/Slidebar';
import { initBtnPower } from '@/global/base.config';

// import { asideTree } from "../../global/app-aside.config";
export default {
  data() {
    return {
    };
  },
  components: { SidebarItem },
  computed: {
    collapsed() {
      return this.$store.state.baseStore.collapsed;
    },
  },
  mounted() {
    this.$store.dispatch('getMenu').then((data) => {
      const currentPath = this.$route.path;
      initBtnPower(this, currentPath);
    });
  },
  methods: {
    handleopen() {},
    handleclose() {},
    handleselect: function () {},
  },
};
</script>
<style lang="scss">
@import '../../assets/scss/theme.scss';
.el-menu--popup {
  .el-menu-item {
    height: 38px;
    line-height: 38px;
  }
}
.el-submenu,
.el-menu-item {
  .iconfont {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    margin-left: 5px;
    color: hsla(0, 0%, 100%, 0.65);
  }
}
.menu-wrapper {
  overflow: hidden;
}
.el-menu-item {
  &:hover,
  &:focus,
  &:active {
    background-color: $menu-background-color !important;
    color: #fff !important;
  }
}
.el-menu-item.is-active {
  background-color: $menu-background-color !important;
}
.el-submenu__title {
  &:hover,
  &:focus,
  &:active {
    background-color: $menu-background-color !important;
    color: #fff !important;
  }
}
.menu-expanded {
  height: 100%;
  z-index: 99;
  .el-menu {
    width: $aside-width;
    height: 100%;
  }
}
.menu-collapsed {
  height: 100%;
  overflow: hidden;
  .el-menu {
    height: 100%;
    overflow: hidden;
  }
}

.el-menu--collapse > .menu-wrapper > .el-menu-item span,
.el-menu--collapse > .menu-wrapper > .el-submenu > .el-submenu__title span,
.el-menu--collapse
  > .menu-wrapper
  > .el-submenu
  > .el-submenu__title
  .el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>