<template>
  <div>
    <el-tree :data="appMenuTree" show-checkbox ref="appTree" node-key="id" :props="defaultProps"></el-tree>
    <el-button
      type="primary"
      size="small"
      style="margin-top: 20px;float: right;"
      @click="saveAppPerm"
    >保存</el-button>
  </div>
</template>
<script>
import * as service from './index.service';
import { statusValid } from '@/utils/status-valid';
import { treeConvertList } from '@/utils/util';

import { subordinate } from '@/global/base.config';

const initRolePerm = _this => {
  let params = {
    roleId: _this.roleId
  };
  service.getRole(params).then(res => {
    let { data, status } = res;
    //请求校验
    if (statusValid(_this, status, data)) {
      data = data.data;
      if (data) {
        let appMenu = data.appMenuPerm ? data.appMenuPerm.split(',') : [];
        //这边要剔除根节点
        let appMenuLineData = _this.appMenuLineData;
        for (let item of appMenuLineData) {
          if (item.parent) {
            let index = appMenu.findIndex(c => {
              return Number(c) == Number(item.id);
            });
            if (index != -1) {
              appMenu.splice(index, 1);
            }
          }
        }

        const appTreeComponents = _this.$refs['appTree'];
        if (appTreeComponents) {
          appTreeComponents.setCheckedKeys(appMenu);
        }
      }
    }
  });
};

export default {
  name: 'appPromise',
  props: {},
  data() {
    return {
      appMenuTree: [],
      appMenuLineData: [],
      roleId: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  components: {},
  created() {},
  mounted() {
    this.getAppMenuList();
    const self = this;
    this.$root.eventHub.$on('selectRole', role => {
      const { id } = role;
      self.roleId = id;
      initRolePerm(self);
    });
  },
  filters: {},
  methods: {
    saveAppPerm() {
      //保存app菜单权限
      let chose = this.$refs['appTree'].getCheckedNodes(false,true);
      let appPeram = [];
      for(let i of chose){
        appPeram.push(i.id);
      }
      let params = {
        id: this.roleId,
        appMenuPerm: appPeram.join(',')
      };
      service.updateRole(params).then(res => {
        let { data, status } = res;
        //请求校验
        if (statusValid(this, status, data)) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }
      });
    },
    getAppMenuList() {
      const params = {
        subordinate: subordinate
      };
      service.getAppMenuList(params).then(res => {
        let { data, status } = res;
        //请求校验
        if (statusValid(this, status, data)) {
          const tree = data.data;
          this.appMenuTree = tree;
          const root = null || {
            id: 0,
            parentId: null,
            children: [...tree]
          };
          this.appMenuLineData = treeConvertList(root);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
