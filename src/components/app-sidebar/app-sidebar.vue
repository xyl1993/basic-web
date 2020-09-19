<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in routeMactheds" :key="item.path">
      {{ (item.meta && item.meta.title)?item.meta.title:item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>  
</template>
<script>
export default {
  name:'AppSidebar',
  mounted() {},
  computed:{
    routeMactheds: function () {
      return this.$route.matched.filter(function (item) {
        const { name,meta } = item;
        return (meta && meta.name)?meta.name:item.name;
      });
    }
  }
};
</script>
<style>
.el-breadcrumb__separator {
  margin: 0 6px 0 3px;
  font-weight: 400;
}
</style>

<style lang="scss" scoped>

.breadcrumb-container {
  .title {
    width: 200px;
    float: left;
    color: #475669;
  }
  .breadcrumb-inner {
    float: right;
  }
}
</style>

