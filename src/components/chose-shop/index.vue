<template>
  <el-table
    ref="singleTable"
    row-key="id"
    :stripe="false"
    :is-number="false"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    @select-all="handleSelectAllChange"
    @selection-change="handleSelectionChange"
    :data="roleList"
    class="no-padding"
    :header-cell-style="{background:'#FAFAFA'}"
    size="mini"
    style="width: 100%;margin-top:0;"
    border
    highlight-current-row
    :default-sort="{prop: 'subordinate', order: 'descending'}"
    height="100%"
  >
    <el-table-column 
      type="selection"
      width="55"
    ></el-table-column>
    <el-table-column prop="name" label="名称" align="left" width="350"></el-table-column>
    <el-table-column prop="brandType" label="品牌" align="left"></el-table-column>
    <el-table-column prop="shopType" label="类型" align="left"></el-table-column>
    <el-table-column prop="shopStatus" label="状态" align="left"></el-table-column>
  </el-table>
</template>
<script>
import * as service from './service';
import { statusValid } from '@/utils/status-valid';
import { complete } from '../../views/template/duty/service';
var globalRoleList = [];
export default {
  name: 'roleList',
  props: {
    adminRole: {
      type: Boolean,
      default: false,
      isCheckedAll : false
    }
  },
  data() {
    return {
      roleList: [],
      currentShop:[]
    };
  },
  components: {},
  created() {},
  mounted() {
    this.findList();
  },
  filters: {},
  methods: {
    handleSelectionChange(selection) {
      this.ids = selection.map((obj) => obj.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
      this.currentShop = selection;
    },
    handleSelectAllChange(selection) {
      this.toggleAllSelection(selection);
    },
    toggleAllSelection(selectedData) {
      this.isCheckedAll = !this.isCheckedAll;
      if(this.isCheckedAll) {
        selectedData.forEach((subRow) => {
          this.toggleSelection(subRow['children']);
        });
      } else {
        this.$refs['singleTable'].clearSelection();
      }
    },
    toggleSelection(rows) {
      if(!rows.length) {
        return;
      }
      rows.forEach((row) => {
        if(!this.rowHasSelected(row)) {
          this.$refs['singleTable'].toggleRowSelection(row);
        }
        if(row['children']) {
          this.toggleSelection(row['children']);
        }
      });
    },
    rowHasSelected(row) {
      let index = this.ids.indexOf(row.id);
      return ~index;
    },

    findList() {
      service.getDepartRoleList().then(res => {
        //请求校验
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.roleList = data.data;
          
          globalRoleList = Object.assign([], data.data);
          this.rolefun = [];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
