<!-- 部门树 -->
<template>
  <div class="box">
    <div class="scroll-cointer">
      <div class="header">
        <el-button type="primary" @click="dialogFormVisible = true">新增按钮</el-button>
      </div>
      <div class="my-table">
        <el-table
          :data="dataTable"
          :header-cell-style="{background:'#FAFAFA'}"
          v-loading="listLoading"
          size="small"
          height="250"
          style="width: 100%;margin-top:0;margin-bottom: 0px;"
        >
          <el-table-column type="index" width="50" label="#"></el-table-column>
          <el-table-column prop="sort" align="center" label="排序"></el-table-column>
          <el-table-column prop="name" align="center" label="名称"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog width="500px" title="按钮信息" :visible.sync="dialogFormVisible" @close="closeDialog">
      <el-form ref="form" :model="formModel"  :rules="rules" native-type="submit">
        <el-form-item label="按钮名称" prop="name" label-width="120px">
          <el-input v-model="formModel.name" autocomplete="off" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort" label-width="120px">
          <el-input v-model="formModel.sort" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" native-type="submit" @click="submit" :loading="submitStatus">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as service from '../service';
import { statusValid } from '@/utils/status-valid';
import { subordinate } from '@/global/base.config';


export default {
  name: 'MenuField',
  props: {},
  data() {
    return {
      dataTable: [],
      listLoading: false,
      dialogFormVisible: false,
      menuId: '',
      formModel: {
        sort: 1,
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入按钮名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      submitStatus: false
    };
  },
  components: {},
  beforeDestroy() {
    this.$root.eventHub.$off('btnMenuSelect');
  },
  created() {},
  mounted() {
    this.$root.eventHub.$on('btnMenuSelect', menuId => {
      this.menuId = menuId;
      this.findList();
    });
  },
  filters: {},
  methods: {
    closeDialog() {
      this.formModel = {
        
      };
    },
    handleEdit(row) {
      this.formModel = row;
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      const { id } = row;
      this.$confirm('确认删除吗?', '提示', {})
        .then(() => {
          service.delMenuBtn(id).then(res => {
            let { data, status } = res;
            if (statusValid(this, status, data)) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.findList();
            }
          });
        })
        .catch(() => {});
    },
    submit() {
      if (!this.submiLoading) {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.submiLoading = true;
            let { formModel, menuId } = this;
            formModel.subordinate = subordinate;
            formModel.menuId = menuId;
            service.saveMenuBtn(formModel).then(res => {
              let { data, status } = res;
              this.submiLoading = false;
              this.dialogFormVisible = false;
              if (statusValid(this, status, data)) {
                this.findList();
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    findList() {
      const { menuId } = this;
      service.menuBtnList({ menuId }).then(res => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #fff;
}
.scroll-cointer {
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.header {
  padding: 10px;
}
.my-table {
  padding-top: 0;
  flex: 1;
}
</style>
