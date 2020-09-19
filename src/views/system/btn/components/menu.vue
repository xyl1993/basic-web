<template>
  <div class="scroll-cointer system-field">
    <el-scrollbar class="scroll-view" style="padding-bottom:40px;">
      <el-tree
        :data="dataTable"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :highlight-current="true"
        ref="menuTree"
        node-key="id"
        :default-expand-all="true"
      ></el-tree>
    </el-scrollbar>
  </div>
</template>
<script>
import { getList } from '../../menu/index.service';
import { statusValid } from '@/utils/status-valid';
import { treeConvertList } from '@/utils/util';
import { subordinate } from '@/global/base.config';

export default {
  name: 'MenuBtn',
  props: {},
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dataTable: []
    };
  },
  components: {},
  created() {},
  beforeDestroy() {
    this.$root.eventHub.$off('btnMenuSelect');
  },
  mounted() {
    this.getList();
  },
  filters: {},
  methods: {
    getList() {

      getList({subordinate}).then(res => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = res.data.data;
          const root = null || {
            id: 0,
            parentId: null,
            children: [...res.data.data]
          };
          let dataLine = treeConvertList(root);
          for (let i = 0; i < dataLine.length; i++) {
            if (dataLine[i].parentId != 0) {
              this.$nextTick(() => {
                this.$root.eventHub.$emit('btnMenuSelect', dataLine[i].id);
                this.$refs.menuTree.setCurrentKey(dataLine[i].id);
              });
              return;
            }
          }
        }
      });
    },
    handleNodeClick(node) {
      const { id } = node;
      this.$root.eventHub.$emit('btnMenuSelect', id);
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-header {
  display: flex;
  flex-direction: row;
}
</style>
<style lang="scss">
.system-field {
  height: 100%;
  .el-tree-node:focus > .el-tree-node__content {
    background-color: #edf2ff;
    .el-tree-node__label {
      color: #4a84ff;
    }
  }
  .el-tree-node__content:hover {
    background-color: #edf2ff;
    .el-tree-node__label {
      color: #4a84ff;
    }
  }
}
</style>
