<template>
  <div>
    <el-tooltip class="item" effect="dark" content="最多允许排序最近100条数据" placement="left">
      <el-button
        type="primary"
        style="float:right;margin-right:20px;"
        plain
        @click.native.prevent="show"
      >排序</el-button>
    </el-tooltip>
    <el-dialog
      title="拖拽排序"
      width="60%"
      style="height:100%;"
      :visible.sync="dialogVisible"
      class="dialog-footer full-dialog"
    >
      <div class="antd-cointer" style="padding:0;height:100%;">
        <div class="my-table" id="sortTable">
          <el-table
            :data="sortTable"
            row-key="id"
            v-loading="listLoading"
            :header-cell-style="{background:'#FAFAFA'}"
            size="small"
            height="250"
            style="width: 100%;margin-top:0;"
          >
            <el-table-column type="index" width="35"></el-table-column>
            <div v-if="formType=='hflj'">
              <el-table-column prop="name" align="left" label="姓名"></el-table-column>
            </div>
            <div v-else>
              <el-table-column prop="title" align="left" label="标题"></el-table-column>
            </div>
            <el-table-column prop="createTime" width="190" align="center" label="创建日期"></el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="handleLoading" size="mini" @click="_saveSort()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Sortable from 'sortablejs';
import { handleSort } from '../service';
import { statusValid } from '@/utils/status-valid';

export default {
  name: 'sortDialog',
  props: {
    findList: Function,
    findSortList: Function,
    formType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listLoading: false,
      handleLoading: false,
      dialogVisible: false,
      sortTable: []
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    show() {
      const self = this;
      const sortSize = 100;
      this.dialogVisible = true;
      this.listLoading = true;
      this.findSortList(sortSize).then(res => {
        const { data, status } = res;
        this.sortTable = statusValid(this, status, data) ? data.data : [];
        this.listLoading = false;
        setTimeout(() => {
          const table = document.querySelector(
            '#sortTable .el-table__body-wrapper tbody'
          );

          Sortable.create(table, {
            onEnd({ newIndex, oldIndex }) {
              const targetRow = self.sortTable.splice(oldIndex, 1)[0];
              self.sortTable.splice(newIndex, 0, targetRow);
            }
          });
        }, 500);
      });
    },
    _saveSort() {
      const { sortTable } = this;
      this.$confirm('确认这样操作吗?', '提示', {})
        .then(() => {
          this.handleLoading = true;
          let params = [];
          sortTable.map((item, index) => {
            const { id, formType } = item;
            params.push({
              id,
              formType,
              sort: ++index
            });
          });
          handleSort(params).then(res => {
            const { data, status } = res;
            if (statusValid(this, status, data)) {
              this.findList();
            }
            this.hide();
          });
        })
        .catch(() => {});
    },
    hide() {
      this.handleLoading = false;
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
