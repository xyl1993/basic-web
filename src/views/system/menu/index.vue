<template>
  <div class="antd-cointer el-tree-table">
    <div class="cointer-box">
      <div class="toolbar el-col el-col-24">
        <el-form :inline="true" class="search-form" style="text-align:right;">
          <el-form-item>
            <el-input size="small" v-model="keyWord" @keyup.enter.native="search" placeholder="请输入关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click.native.prevent="findList()">查询</el-button>
            <el-button type="primary" size="small" @click.native.prevent="addParent()">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <tree-table 
        :data="dataTable" 
        :columns="columns" 
        :loading="listLoading"
        border 
        @addChild="addChild" 
        @deleteChild="deleteChild" 
        @editChild="editChild"/> -->
      <el-table
        :data="dataTable"
        height="450"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="name"
          label="名称"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="图标"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addChild(scope.row)">新增</el-button>
            <el-button type="text" size="small" @click="editChild(scope.row)">编辑</el-button>
            <el-button type="text"  size="small" @click="deleteChild(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog 
        title="目录编辑" 
        :closeOnClickModal="false" 
        v-dialogDrag
        :visible.sync="formStatus" 
        v-on:close="formClose">
        <el-form :model="formModel" :rules="rules" ref="form">
          <el-form-item label="名称" prop="name" label-width="120px">
            <el-input v-model="formModel.name"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon" label-width="120px">
            <el-input v-model="formModel.icon"></el-input>
          </el-form-item>
          <el-form-item label="路径" prop="path" label-width="120px">
            <el-input v-model="formModel.path"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort" label-width="120px">
            <el-input type="number" v-model="formModel.sort"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="formStatus = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleSure()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as service from './index.service';
import { statusValid } from '@/utils/status-valid';

export default {
  name: 'Menu',
  data() {
    return {
      listLoading:false,
      columns: [
        {
          text: '名称',
          value: 'name',
          width: 200
        },
        {
          text: '图标',
          value: 'icon'
        },
        {
          text: '路径',
          value: 'path'
        },
        {
          text: '排序',
          value: 'sort'
        }
      ],
      dataTable: [],
      platformList:[],
      keyWord:'',
      formStatus:false,
      formModel:{
        name:'',
        icon:'',
        path:'',
        sort:'',
        parentId:'',
      },
      rules:{
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
      }
    };
  },
  mounted() {
    this.findList();
  },
  methods:{
    findList(){
      this.listLoading = true;
      const { keyWord } = this;
      const params = {
        keyWord: keyWord
      };
      service.getList(params).then(res => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = data.data;
          this.listLoading = false;
        }
      });
    },
    addChild(rows){
      const { id } = rows;
      this.formModel.parentId = id;
      this.formStatus = true;
    },
    deleteChild(rows){
      this.$confirm('确认删除吗?', '提示', {
      })
      .then(() => {
        let params = rows.id;
        service.deleteMenu(params).then(res => {
          const { data, status } = res;
          if (statusValid(this, status, data)) {
            this.$message({
              message: '删除成功',
              duration: 1000,
              type: 'success'
            });
            this.findList();
          }
        });
      })
      .catch(() => {});
    },
    editChild(rows){
      const {id,name,icon,path,sort} = rows;
      this.formModel = {id,name,icon,path,sort};
      this.formStatus = true;
    },
    formClose(){
      this.formModel = {
        name:'',
        icon:'',
        path:'',
        sort:'',
        parentId:'',
      };
    },
    handleSure(){
      let model = this.formModel;
      model.parentId = model.parentId || 0;
      this.$refs['form'].validate(valid => {
        if (valid) {
          if(model.id){
            //修改
            service.updateMenu(model).then(res => {
              const { data, status } = res;
              if (statusValid(this, status, data)) {
                this.$message({
                  message: '保存成功',
                  duration: 1000,
                  type: 'success'
                });
                this.formStatus = false;
                this.findList();
              }
            });
          }else{
            service.createMenu(model).then(res => {
              const { data, status } = res;
              if (statusValid(this, status, data)) {
                this.$message({
                  message: '保存成功',
                  duration: 1000,
                  type: 'success'
                });
                this.findList();
                this.formStatus = false;
              }
            });
          }
        }
      });
    },
    addParent(){
      //新增根节点
      this.formStatus = true;
    },
  }
};
</script>
<style lang="scss" scoped>
.search-form .el-form-item{
  margin-bottom: 11px;
}
</style>
