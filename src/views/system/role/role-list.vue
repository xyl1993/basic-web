<template>
  <el-table
    :data="roleList"
    class="no-padding"
    :header-cell-style="{background:'#FAFAFA'}"
    size="mini"
    style="width: 100%;margin-top:0;"
    border
    ref="singleTable"
    highlight-current-row
    @row-click="rowClick"
    :default-sort="{prop: 'subordinate', order: 'descending'}"
    @current-change="selectRole"
    height="100%"
  >
    <el-table-column prop="name" label="角色名称" align="center" width="180"></el-table-column>
    <el-table-column prop="subordinate" label="所属系统" sortable align="center" width="100"></el-table-column>
    <el-table-column prop="desc" align="center" label="角色描述"></el-table-column>
    <el-table-column align="center" width="80" v-if="adminRole" label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          :disabled="roleConstantsValue.SUPER_ADMIN == scope.row.roleType"
          @click="deleteRole(scope.row.id,scope.row.name)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import * as service from './index.service';
import { statusValid } from '@/utils/status-valid';
import { roleConstantsValue, subordinate } from '@/global/base.config';
var globalRoleList = [];
const listRole = _this => {
  const params = {
    subordinate: subordinate
  };
  service.allList(params).then(res => {
    //请求校验
    let { data, status } = res;
    if (statusValid(_this, status, data)) {
      _this.roleList = data.data;
      globalRoleList = Object.assign([], data.data);
      // _this.totalRoles = total;
      _this.form = {
        name: '',
        desc: '',
        kind: _this.kind,
        roleId: null
      };
      _this.dataTableUnDis = [];
      _this.dataTableDis = [];
      _this.currentPageDis = 1;
      _this.rolefun = [];
      //默认选中第一个
      if (_this.roleList && _this.roleList.length > 0) {
        _this.$refs.singleTable.setCurrentRow(_this.roleList[0]);
      }
    }
  });
};

export default {
  name: 'RoleList',
  props: {
    adminRole: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleList: [],
      roleConstantsValue: roleConstantsValue
    };
  },
  components: {},
  created() {},
  mounted() {
    listRole(this);
    this.$root.eventHub.$on('listRole', () => {
      listRole(this);
    });
  },
  filters: {},
  methods: {
    rowClick() {},
    selectRole(item) {
      if (item.selected) {
        return;
      }
      for (let _item of this.roleList) {
        _item.selected = false;
      }
      item.selected = true;

      //其他组建更新
      this.$root.eventHub.$emit('selectRole', item);
    },
    deleteRole(roleId, name) {
      var _this = this;

      const ele = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: ele('p', null, [
          ele('span', null, '确认删除 '),
          ele('i', { style: 'color: red' }, name),
          ele('span', null, ' 角色吗?')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            service.deleteRole(roleId).then(res => {
              let { data, status } = res;
              if (statusValid(_this, status, data)) {
                _this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                listRole(_this);
                done();
              }
            });
          } else {
            done();
          }
        }
      });
    },
    search(keyword) {
      this.roleList = globalRoleList.filter(
        item => item.name.indexOf(keyword) != -1
      );
      this.$refs.singleTable.setCurrentRow(this.roleList[0]);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
