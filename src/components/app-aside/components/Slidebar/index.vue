<template>
  <div v-if="item.children && item.children.length>0" class="menu-wrapper">
    <!-- <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
      <div  @click="$router.push(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.icon" :icon="onlyOneChild.icon||item.icon" :title="child.name" />
        </el-menu-item>
      </div>
    </template>-->
    <el-submenu ref="submenu" :index="item.id+''">
      <template slot="title">
        <item :icon="item.icon" :title="item.name" />
      </template>

      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="item.id+''"
          class="nest-menu"
        />

        <div v-else @click="asideClick(child)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item :icon="child.icon" :title="child.name" />
          </el-menu-item>
        </div>
      </template>
    </el-submenu>
  </div>
  <div v-else>
    <el-menu-item :index="resolvePath(item.path)" @click="asideClick(item)">
      <item :icon="item.icon" :title="item.name" />
    </el-menu-item>
  </div>
</template>
<script>
import path from "path";
import { isExternal } from "@/utils/util";
import Item from "./Item";
// import { asideTree } from "../../global/app-aside.config";
export default {
  name: "SidebarItem",
  components: { Item },
  mixins: [],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      onlyOneChild: null,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    asideClick(child) {
      if (child) {
        const { powerBtnGroup } = child;
        this.$store.commit("editPowerBtn", powerBtnGroup);
        this.$router.push(child.path);
      }
    },
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };

        return true;
      }

      return false;
    },
    handleopen() {},
    handleclose() {},
    handleselect: function () {},
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    isExternalLink(routePath) {
      return isExternal(routePath);
    },
  },
};
</script>