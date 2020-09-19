<template>
  <div>
    <el-button type="success" size="mini" style="float:right;" @click="addRole">新增</el-button>
    <el-dialog
      title="角色新增"
      :closeOnClickModal="false"
      :visible.sync="formStatus"
      v-on:close="formClose"
    >
      <el-form :model="formModel" :rules="rules" ref="formModel">
        <el-form-item label="角色名称" prop="name">
          <el-input size="small" v-model="formModel.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色类型" prop="roleType">
          <el-select style="width:100%;" v-model="formModel.roleType" placeholder="请选择">
            <el-option
              v-for="item in roleConstantsArray"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属系统" prop="subordinate">
          <el-select
            v-model="formModel.subordinate"
            placeholder="请选择"
            size="small"
            disabled=""
            style="width:100%;"
          >
            <el-option
              v-for="item in platformList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="角色描述" prop="desc">
          <el-input size="small" type="textarea" v-model="formModel.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="formStatus=false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleSure()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as service from './index.service';
import { statusValid } from '@/utils/status-valid';

import { roleConstantsArray, subordinate } from '@/global/base.config';

export default {
  name: 'RoleAddDialog',
  props: {
    platformList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formModel: {
        
      },
      formStatus: false,
      roleConstantsArray: roleConstantsArray,
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        subordinate: [
          { required: true, message: '请选择系统', trigger: 'blur' }
        ],
        link: [{ required: true, message: '请输入首页链接', trigger: 'blur' }],
        desc: [{ max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }]
      }
    };
  },
  components: {},
  created() {},
  mounted() {},
  filters: {},
  methods: {
    addRole() {
      this.formModel = {
        subordinate: subordinate
      };
      this.formStatus = true;
    },
    formClose() {
      //关闭角色新增
      this.$refs['formModel'].clearValidate();
      this.formModel = {
        subordinate: subordinate
      };
    },
    handleSure() {
      //角色新增保存
      let _this = this;
      this.$refs['formModel'].validate(valid => {
        if (valid) {
          service.createRole(_this.formModel).then(res => {
            let { data, status } = res;
            if (statusValid(this, status, data)) {
              _this.$message({
                message: '新增成功',
                type: 'success'
              });
              _this.formStatus = false;
              this.$root.eventHub.$emit('listRole');
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
