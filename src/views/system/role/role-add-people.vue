<template>
  <div>
    <el-button style="float:right;" size="small" type="primary" @click="showModal">添加人员</el-button>
    <el-dialog
      width="70%"
      title="添加人员"
      :visible.sync="dialogVisible"
      v-on:close="dialogVisibleClose()"
    >
      <el-form :inline="true" @submit.native.prevent class="demo-form-inline" style="float: right;">
        <el-form-item>
          <el-input v-model="keyword" size="small" @keyup.native.enter="search" placeholder="回车搜索"></el-input>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataTableUnDis"
        :header-cell-style="{background:'#FAFAFA'}"
        size="small"
        ref="multipleTable"
        v-loading="listLoadingUnDis"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :reserve-selection="true" align="center" width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column min-width="300" label="部门">
            <template slot-scope="scope">
              <div v-if="scope.row.staff" :title="scope.row.staff.layerDepartName" class="table-white-space">{{scope.row.staff.layerDepartName}}</div>
            </template>
          </el-table-column>
          <el-table-column  label="职位" prop="staff.postName">
          </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChangeUnDis"
        :page-size="pageSizeUnDis"
        :total="totalUnDis"
        @size-change="handleSizeChangeUnDis"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="currentPageUnDis"
        layout="total, sizes, prev, pager, next"
      ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="ok">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as service from './index.service';
import { statusValid } from '@/utils/status-valid';


const findlistUnDis = _this => {

  const { currentPageUnDis,pageSizeUnDis,roleId,keyword } = _this;
  let params = {
    pageNum: currentPageUnDis,
    pageSize: pageSizeUnDis,
    roleId: roleId,
    sign: 2,
    keyword: keyword
  };
  
  service.listUserByRoleId(params).then(res => {
    let { data, status } = res;
    _this.listLoadingUnDis = false;
    //请求校验
    if (statusValid(_this, status, data)) {
      const { list, total } = data.data;
      _this.dataTableUnDis = list;
      _this.totalUnDis = total;
    }
  });
};
export default {
  name: 'RoleAddPeople',
  props: {
    roleId: {
      //是否显示新增按钮
      type: Number,
      default: null
    },
    roleType:{
      //角色类型
      type: String,
      default: null
    }
  },
  data() {
    return {
      keyword: '',
      dialogVisible: false,
      dataTableUnDis: [],
      listLoadingUnDis: false,
      pageSizeUnDis: 10,
      totalUnDis: 0,
      currentPageUnDis: 1
    };
  },
  components: {},
  created() {},
  mounted() {},
  filters: {},
  methods: {
    handleSelectionChange(val) {
      this.selPeopleMap = val;
    },
    getRowKeys(row) {
      return row.userId;
    },
    dialogVisibleClose() {
      //关闭弹框清除集合
      this.selPeopleMap = [];
      this.$refs['multipleTable'].clearSelection();
    },
    search() {
      this.currentPageUnDis = 1;
      this.listLoadingUnDis = true;
      findlistUnDis(this);
    },
    handleCurrentChangeUnDis(val) {
      //翻页时要自动将已选择的勾上
      this.currentPageUnDis = val;
      findlistUnDis(this);
    },
    handleSizeChangeUnDis(val) {
      this.pageSizeUnDis = val;
      this.currentPageUnDis = 1;
      findlistUnDis(this);
    },
    showModal() {
      this.keyword = '';
      this.currentPageUnDis = 1;
      this.listLoadingUnDis = true;
      findlistUnDis(this);
      this.dialogVisible = true;
    },
    ok() {
      let _this = this;
      var ids = [];
      for (let v of this.selPeopleMap) {
        ids.push(v.userId);
      }
      if (ids.length > 0) {
        service
          .createUserRole({
            roleId: _this.roleId,
            ids: ids.join(',')
          })
          .then(res => {
            let { data, status } = res;
            if (statusValid(this, status, data)) {
              data = data.data;
              if (data) {
                _this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                _this.dialogVisible = false;
                
                this.$root.eventHub.$emit('searchRole');
              } else {
                _this.$message({
                  message: '添加失败',
                  type: 'error'
                });
              }
            }
          });
      } else {
        _this.$notify({
          title: '提示',
          message: '请选择人员',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
