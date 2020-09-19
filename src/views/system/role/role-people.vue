<template>
  <div>
    <el-table
      :data="dataTableDis"
      :header-cell-style="{background:'#FAFAFA'}"
      size="small"
      v-loading="listLoadingDis"
      style="width: 100%"
    >
      <el-table-column type="index" style="width:35px"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" :disabled="roleConstantsValue.SUPER_ADMIN == roleType" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChangeDis"
      :page-size="pageSizeDis"
      :current-page="currentPageDis"
      :total="totalDis"
      layout="total, prev, pager, next"
    ></el-pagination>
  </div>
</template>
<script>
import * as service from './index.service';
import { roleConstantsValue } from '@/global/base.config';

import { statusValid } from '@/utils/status-valid';

const findlistDis = _this => {
  let params = {
    pageNum: _this.currentPageDis,
    pageSize: 10,
    roleId: _this.roleId,
    sign: 1
  };
  service.listUserByRoleId(params).then(res => {
    let { data, status } = res;
    _this.listLoadingDis = false;
    if (statusValid(_this, status, data)) {
      _this.dataTableDis = data.data.list;
      _this.totalDis = data.data.total;
    }
  });
};
export default {
  name: 'RolePeople',
  props: {},
  data() {
    return {
      roleId:'',
      dataTableDis: [],
      listLoadingDis: false,
      roleConstantsValue:roleConstantsValue,
      pageSizeDis: 10,
      roleType:'',
      currentPageDis: 1,
      totalDis: 0
    };
  },
  components: {},
  created() {},
  mounted() {
    //接收 depart 组件的点击事件
    this.$root.eventHub.$on('selectRole', role => {
      const { id,roleType } = role;
      this.roleId = id;
      this.currentPageDis = 1;
      this.roleType = roleType;
      findlistDis(this);
    });
    this.$root.eventHub.$on('searchRole', () => {
      this.currentPageDis = 1;
      findlistDis(this);
    });
  },
  filters: {},
  methods: {
    handleDelete(index, row) {
      var _this = this;
      this.$confirm('确认删除吗?', '提示', {})
        .then(() => {
          let params = {
            userId: row.userId,
            roleId: this.roleId
          };
          service.deleteUserRole(params).then(res => {
            let { data, status } = res;
            if (statusValid(this, status, data)) {
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              findlistDis(_this);
            }
          });
        })
        .catch(() => {});
    },
    handleCurrentChangeDis(val) {
      this.currentPageDis = val;
      findlistDis(this);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
