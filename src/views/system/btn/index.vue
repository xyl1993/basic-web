<template>
  <div class="antd-cointer">
    <div class="org-left">
      <div class="resize-box"></div>
      <menu-componts ref="“menu”"></menu-componts>
    </div>
    <div class="org-right">
      <field-compont class="right-box"></field-compont>
    </div>
  </div>
</template>
<script>
import MenuComponts from './components/menu';
import FieldCompont from './components/field';

export default {
  name: 'BtnPower',
  data() {
    return {
      resizeStatus: true,
      dataTable: [] //系统数组
    };
  },
  components: {
    MenuComponts,
    FieldCompont
  },
  beforeDestroy() {
    this.$root.eventHub.$off('btnMenuSelect');
  },
  created() {},
  mounted() {},
  filters: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import '#/styles/tree-cointer.scss';
.org-left {
  background: #fff;
  padding: 10px;
}
.org-right {
  padding-left: 245px;
}
.org-right .right-box {
  border: none;
}
</style>
