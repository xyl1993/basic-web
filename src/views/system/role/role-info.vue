<template>
  <el-form ref="form" :rules="rules" label-width="120px" :model="form">
    <el-form-item label="角色名称" prop="name">
      <el-input size="small" v-model="form.name"></el-input>
    </el-form-item>
    <!-- <el-form-item label="角色类型(n)" prop="roleType">
      <el-select style="width:100%;" disabled v-model="form.roleType" placeholder="请选择">
        <el-option
          v-for="item in roleConstantsArray"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="角色类型(v)" prop="roleType">
      <el-select style="width:100%;" disabled v-model="form.roleType" placeholder="请选择">
        <el-option
          v-for="item in roleConstantsArray"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="跳转链接" prop="webLink">
      <el-input size="small" type="input" v-model="form.webLink"></el-input>
    </el-form-item> -->
    <el-form-item label="角色描述" prop="desc">
      <el-input size="small" type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <!-- <el-form-item label="所属系统" prop="subordinate">
      <el-select
        disabled
        v-model="form.subordinate"
        placeholder="请选择"
        size="small"
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
    <el-form-item>
      <el-button
        style="float:right;"
        size="small"
        type="primary"
        :loading="submiLoading"
        @click="onSubmit"
      >保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import * as service from './index.service';
import { statusValid } from '@/utils/status-valid';

import { roleConstantsArray } from '@/global/base.config';

export default {
  name: 'RoleInfo',
  props: {
    adminRole: {
      type: Boolean,
      default: false
    },
    platformList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      roleList: [],
      form: {},
      roleConstantsArray: roleConstantsArray,
      submiLoading: false,
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        subordinate: [
          { required: true, message: '请选择系统', trigger: 'blur' }
        ],
        // link: [{ required: true, message: '请输入首页链接', trigger: 'blur' }],
        desc: [{ max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }]
      }
    };
  },
  components: {},
  created() {},
  mounted() {
    //接收 depart 组件的点击事件
    this.$root.eventHub.$on('selectRole', role => {
      this.form = Object.assign({}, role);
    });
  },
  filters: {},
  methods: {
    onSubmit() {
      const _this = this;
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.submiLoading = true;

          const callback = res => {
            let { data, status } = res;
            if (statusValid(_this, status, data)) {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.submiLoading = false;
              this.$root.eventHub.$emit('listRole');
            }
          };

          if (this.form.id) {
            delete this.form['createTime'];
            service.updateRole(this.form).then(res => {
              callback(res);
            });
          } else {
            service.createRole(this.form).then(res => {
              callback(res);
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
