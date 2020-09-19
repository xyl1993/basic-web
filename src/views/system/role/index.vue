<template>
  <div class="antd-cointer">
    <div style="border: 1px solid #eee;" class="role-cointer">
      <el-aside class="aside-flex">
        <div class="aside-header">
          <role-add-dialog :platformList="platformList"></role-add-dialog>
          <el-input
            class="role-search"
            v-model="roleKeyWord"
            clearable
            @clear="searchRole"
            @keyup.enter.native="searchRole"
            placeholder="关键字"
          ></el-input>
          <h3>角色列表</h3>
        </div>
        <div class="aside-cointer">
          <!-- 角色列表组建 -->
          <role-list v-bind:adminRole="adminRole" ref="roleList"></role-list>
        </div>
      </el-aside>
      <el-container>
        <el-main style="padding:0px;overflow: hidden;">
          <div class="aside-header">
            <h3>角色授权</h3>
          </div>
          <el-tabs
            type="border-card"
            style="height: calc(100% - 51px);border-bottom: none;display: flex;flex-direction: column;"
          >
            <el-tab-pane label="角色信息">
              <!-- 角色信息组建 -->
              <role-info :platformList="platformList" :adminRole="adminRole"></role-info>
            </el-tab-pane>
            <el-tab-pane label="角色人员">
              <role-add-people :roleId="roleId"></role-add-people>
              <!-- 角色人员组建 -->
              <role-people></role-people>
            </el-tab-pane>
            <el-tab-pane label="web权限">
              <!-- web权限组建 -->
              <web-promise></web-promise>
            </el-tab-pane>
            <!-- <el-tab-pane label="app权限"> -->
              <!-- web权限组建 -->
              <!-- <app-promise></app-promise> -->
            <!-- </el-tab-pane> -->
          </el-tabs>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import roleAddDialog from './role-add-dialog.vue';
import roleList from './role-list';
import roleInfo from './role-info';
import rolePeople from './role-people';
import webPromise from './web-promise';

import roleAddPeople from './role-add-people';

import { getUserInfo } from '@/utils/auth.js';
import { roleConstantsValue } from '@/global/base.config';

import { getPlatFormList } from './index.service';
import { statusValid } from '@/utils/status-valid';

export default {
  name:'Role',
  data() {
    return {
      roleId: null,
      adminRole: false,
      roleKeyWord: '',
      roleType: '',
      platformList: []
    };
  },
  components: {
    roleAddDialog,
    roleList,
    roleInfo,
    rolePeople,
    webPromise,
    roleAddPeople
  },
  created() {
    this.getPlatFormList();
    const user = JSON.parse(getUserInfo());
    const { roleType } = user;
    if (roleType) {
      this.adminRole = roleType.indexOf(roleConstantsValue.SUPER_ADMIN) != -1;
    }
  },
  
  mounted() {
    this.$root.eventHub.$on('selectRole', role => {
      const { id, roleType } = role;
      this.roleId = id;
      this.roleType = roleType;
    });
  },
  methods: {
    getPlatFormList() {
      getPlatFormList().then(res => {
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.platformList = data.data;
        }
      });
    },
    searchRole() {
      const { roleKeyWord } = this;
      this.$refs['roleList'].search(roleKeyWord);
    }
  }
};
</script>

<style lang="scss" scoped>
.roleNav {
  list-style: none;
}

.roleNav .item {
  height: 40px;
  background: #fff;
  color: #555;
  padding-right: 15px;
  padding-left: 15px;
  border-color: #e7ecee;
  line-height: 40px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.roleNav .item {
  border-top: none;
}

.item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top: 1px solid #ddd;
}

.roleNav .item.active {
  background-color: rgb(238, 241, 246);
}

.roleNav .item.active .el-icon-close {
  display: block !important;
}

.roleNav .item:hover {
  background-color: rgb(238, 241, 246);
}
.aside-flex {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 45% !important;
}
.aside-header {
  padding: 10px;
  border-bottom: 1px solid #d8dce5;
  background: fff;
  color: #333;
  position: relative;
  h3 {
    height: 29px;
    line-height: 29px;
  }
}
.aside-cointer {
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.role-search {
  position: absolute;
  top: 6px;
  right: 83px;
  width: 182px;
}
</style>
<style lang="scss">
.role-cointer {
  flex-direction: row;
  height: 100%;
  display: flex;
  .el-tabs__content {
    overflow-y: auto !important;
  }
}
</style>
