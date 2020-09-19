<template>
  <div class="antd-cointer">
    <div class="cointer-box">
      <div class="toolbar el-col el-col-24">
        <div class="search-form" style="text-align: right;">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom:0;">
              <el-input
                size="small"
                v-model="searchModel.keyword"
                @keyup.enter.native="search"
                :clearable="true"
                @clear="search"
                placeholder="名称"
              ></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom:0;">
              <el-input
                size="small"
                v-model="searchModel.type"
                @keyup.enter.native="search"
                :clearable="true"
                @clear="search"
                placeholder="类型"
              ></el-input>
            </el-form-item>

            <el-form-item style="margin-bottom:0;">
              <el-button type="primary" size="small" @click.native.prevent="search">查询</el-button>
              <el-button type="success" size="small" @click.native.prevent="add">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="my-table">
        <el-table
          :data="dataTable"
          :header-cell-style="{background:'#FAFAFA'}"
          size="small"
          v-loading="loading"
          height="250"
          style="width: 100%"
        >
          <el-table-column prop="code" align="center" label="编号"></el-table-column>
          <el-table-column prop="name" align="center" label="名称"></el-table-column>
          <el-table-column prop="type" align="center" label="类型"></el-table-column>
          <el-table-column prop="remark" align="center" label="备注"></el-table-column>
          <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="handleDetail(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          background
          :page-sizes="[10, 20, 30, 40]"
          @current-change="handleCurrentChange"
          style="height:31px;"
          :page-size="10"
          :total="total"
          :current-page="pageNum"
          layout="total, sizes, prev, pager, next"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="数据录入"
      :visible.sync="orgVisible"
      class="dialog-footer"
      width="600px"
      v-dialogDrag
      :close-on-press-escape="true"
      v-on:close="formClose"
      append-to-body
    >
      <el-form :model="formModel" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="编号" prop="code">
          <el-input v-model="formModel.code" style="width:100%;" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="formModel.name" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="formModel.type" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formModel.remark" style="width:100%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="orgVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="handle()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as service from './service';
import { statusValid } from '@/utils/status-valid';
import { apiConfig } from '@/global/api.config';
var loading;
export default {
  name:'BaseData',
  props: {},
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      showFlag: false,
      orgVisible: false,
      externalUse: true,
      multipleSelection: true,
      submitLoading: false,
      operationFlag: true,
      dataTable: [],
      loading: false,
      departCode: '',
      departType: 2,
      dayList: '0',
      searchModel: {
        keyword: '',
      },
      formModel: {
        titleList: [],
      },
      typeData: [],
      myHeaders: {},
      rules: {
        code: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型', trigger: 'blur' }],
      },
    };
  },
  components: {},
  created() {},
  beforeDestroy() {},
  mounted() {
    this.findList();
  },
  filters: {},
  methods: {
    search() {
      this.pageNum = 1;
      this.findList();
    },
    findList() {
      this.listLoading = true;
      const { pageNum, pageSize, searchModel } = this;
      const params = { ...searchModel, pageNum, pageSize };
      service.selTemplateList(params).then((res) => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = data.data;
          this.total = data.totalItems;
          this.listLoading = false;
        }
      });
    },
    add() {
      this.formModel = {
        titleList: [{}],
      };
      this.operationFlag = true;
      this.orgVisible = true;
    },

    handleDetail(row) {
      this.operationFlag = false;
      const { id, code, name, type, remark } = row;
      let formModel = { id, code, name, type, remark };
      let selArray = [];
      this.formModel = formModel;
      this.orgVisible = true;
    },

    formClose() {
      this.$refs['form'].clearValidate();
      this.formModel = {
        titleList: [],
        timeValue: 1,
        timeType: 0,
      };
      this.timeValue = '星期一';
      this.showFlag = false;
      this.operationFlag = false;
    },
    handle() {
      if (this.formModel.id) {
        this.handleUpdate();
      } else {
        this.handleSave();
      }
    },
    handleSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          service.insert(this.formModel).then((res) => {
            const { data, status } = res;
            if (statusValid(this, status, data)) {
              this.$message({
                message: '保存成功',
                duration: 1000,
                type: 'success',
              });
              this.orgVisible = false;
              this.findList();
            }
          });
        }
      });
    },
    handleUpdate() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          service.update(this.formModel).then((res) => {
            const { data, status } = res;
            if (statusValid(this, status, data)) {
              this.$message({
                message: '保存成功',
                duration: 1000,
                type: 'success',
              });
              this.orgVisible = false;
              this.findList();
            }
          });
        }
      });
    },
    handleDelete(id) {
      this.$confirm('确认删除吗?', '提示', {})
        .then(() => {
          //删除模板
          service.deleteBatch(id).then((res) => {
            const { data, status } = res;
            this.listLoading = false;
            if (statusValid(this, status, data)) {
              this.findList();
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.findList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.findList();
    },
    surechooseVariety() {
      let selArray = this.formModel.titleList;
      const length = selArray.length;
      this.$set(this.formModel.titleList, length, {
        title: '',
      });
    },
    delCf(index) {
      this.formModel.titleList.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.con {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header-box {
  text-align: right;
  padding-bottom: 10px;
  .upload-demo {
    display: inline-block;
  }
}
.img-box {
  padding-top: 15px;
  ::after {
    clear: both;
    content: '';
    display: table;
  }
}
.el-icon-delete {
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  z-index: 99;
  cursor: pointer;
}
.img-con {
  width: 100%;
  height: 100%;
}
</style>
