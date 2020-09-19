<template>
  <div class="web-menu-promise">
    <el-tree
      default-expand-all
      :data="webMenuTree"
      show-checkbox
      ref="webTree"
      :default-checked-keys="checkedKeys"
      node-key="id"
      :props="defaultProps"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <div class="btn-group" v-if="data.btnList.length>0">
          <el-checkbox
            :ref="item.id"
            v-model="item.checked"
            :key="index"
            v-for="(item,index) of data.btnList"
          ><font style="font-size:12px;">{{item.name}}</font></el-checkbox>
        </div>
      </span>
    </el-tree>
    <el-button
      type="primary"
      size="small"
      style="margin-top: 20px;float: right;"
      @click="saveWebPerm"
    >保存</el-button>
  </div>
</template>
<script>
import * as service from './index.service';
import { statusValid } from '@/utils/status-valid';
import { treeConvertList } from '@/utils/util';
import { subordinate } from '@/global/base.config';

// const initRolePerm = _this => {
//   let params = {
//     roleId: _this.roleId
//   };
//   service.getRole(params).then(res => {
//     let { data, status } = res;
//     //请求校验
//     if (statusValid(_this, status, data)) {
//       data = data.data;
//       if (data) {
//         var webMenu = data.menuPerm ? data.menuPerm.split(',') : [];
//         let appMenu = data.appMenuPerm ? data.appMenuPerm.split(',') : [];
//         //这边要剔除根节点
//         let webMenuLineData = _this.webMenuLineData;
//         let appMenuLineData = _this.appMenuLineData;

//         //先获取是父节点得id
//         for (let item of webMenuLineData) {
//           if (item.parent) {
//             let index = webMenu.findIndex(c => {
//               return Number(c) == Number(item.id);
//             });
//             if (index != -1) {
//               webMenu.splice(index, 1);
//             }
//           }
//         }
//         for (let item of appMenuLineData) {
//           if (item.parent) {
//             let index = appMenu.findIndex(c => {
//               return Number(c) == Number(item.id);
//             });
//             if (index != -1) {
//               appMenu.splice(index, 1);
//             }
//           }
//         }
//         const webTreeComponents = _this.$refs['webTree'];
//         if (webTreeComponents) {
//           webTreeComponents.setCheckedKeys(webMenu);
//         }
//       }
//     }
//   });
// };

export default {
  name: 'WebPromise',
  props: {},
  data() {
    return {
      webMenuTree: [],
      appMenuLineData: [],
      roleId: '',
      webMenuLineData: [],
      checkedKeys:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  components: {},
  created() {},
  mounted() {
    const self = this;
    this.$root.eventHub.$on('selectRole', role => {
      const { id } = role;
      self.roleId = id;
      this.getWebMenuList();
    });
  },
  filters: {},
  methods: {
    saveWebPerm() {
      //保存web菜单权限
      let chose = this.$refs['webTree'].getCheckedNodes(false, true);
      //存放菜单id
      let roleMenuList = [];
      //存放按钮保存对象
      let sysRoleBtnList = [];
      const { roleId } = this;
      
      for (let i of chose) {
        const { btnList } = i;
        
        if (btnList.length > 0) {
          for (let item of btnList) {
            if (item.checked) {
              sysRoleBtnList.push({
                roleId:roleId,
                menuId: i.id,
                menuBtnId: item.id
              });
            }
          }
        }
        roleMenuList.push(i.id);
      }

     let params = {
        id: this.roleId,
        menuPerm: roleMenuList.join(),
        sysRoleBtnList
      };
      service.updateRoleMenu(params).then(res => {
        let { data, status } = res;
        this.listLoadingUnDis = false;
        //请求校验
        if (statusValid(this, status, data)) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }
      });
    },
    getWebMenuList() {
      const params = {subordinate};
      service.selWebPromiseRoleId(this.roleId,params).then(res => {
        let { data, status } = res;
        //请求校验
        if (statusValid(this, status, data)) {
          const tree = data.data;
          this.webMenuTree = tree;
          const root = null || {
            id: 0,
            parentId: null,
            children: [...tree]
          };
          let webMenuLineData = treeConvertList(root);
          let checkedKeys = [];
          for (let item of webMenuLineData) {
            if (!item.parent && item.checked) {
              checkedKeys.push(item.id);
            }
          }
          this.checkedKeys = checkedKeys;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.web-menu-promise {
  .el-tree-node__content {
    display: block;
    height: auto;
  }
  .btn-group {
    display: flex;
    width: 100%;
    padding-left: 50px;
    div {
      padding-right: 15px;
    }
  }
}
</style>
