<template>
  <div>
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <a href="javascript:0">
          <img v-if="!collapsed" src="../../assets/images/logo.png" alt="">
          <h1 v-if="!collapsed">训练系统</h1>
          <div class="tools" @click.prevent="collapse">
            <i v-if="!collapsed" class="iconfont icon-suoqi"></i>
            <i v-else class="iconfont icon-zhankai"></i>
          </div>
        </a>
      </el-col>
      <el-col style="margin-left: -1px;z-index: 999;background: #fff;" :span="8">
         <app-sidebar></app-sidebar>
      </el-col>
      <el-col :span="6" class="userinfo">
        <!-- <el-dropdown class="extra-dropdown" trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="el-icon-bell"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div class="info-dropdown-table">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="通知(1)" name="first">
                  <div class="ant-list-item notice-icon-notice-list-item">
                    <div class="ant-list-item-meta">
                      <div class="ant-list-item-meta-avatar">
                        <div class="ant-avatar ant-avatar-image">
                          <img src="../../../assets/images/info.png" alt="">
                        </div>
                      </div>
                    </div>
                    <div class="ant-list-item-meta-content">
                      <h4 class="ant-list-item-meta-title">
                        <div class="notice-list-title">
                          你收到了 14 份新周报
                        </div>
                      </h4>
                      <div class="item-meta-description">
                        <div class="notice-list-datetime">1年前</div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="消息" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="代办" name="third">角色管理</el-tab-pane>
              </el-tabs>
            </div>
          </el-dropdown-menu>
        </el-dropdown> -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <img src="../../assets/images/an6.png" />&nbsp;欢迎您:{{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
            <el-dropdown-item divided @click.native="showSetting">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-dialog title="修改密码" :closeOnClickModal="false" :visible.sync="formStatus" v-on:close="formClose">
      <el-form :model="formModel" :rules="rules" ref="passForm">
        <el-form-item label="原密码" label-width="120px" prop="password">
          <el-input style="width:480px;max-width:100%;" type="password" v-model="formModel.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px" prop="newPassword">
          <el-input style="width:480px;max-width:100%;" type="password" v-model="formModel.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120px" prop="surePassword">
          <el-input style="width:480px;max-width:100%;" type="password" v-model="formModel.surePassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel()">取 消</el-button>
        <el-button type="primary" size="small" @click="handleSure()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { updatePassword } from '@/views/system/user/user.service';
import { statusValid } from '@/utils/status-valid';
import { getUserInfo,removeToken,removeUserInfo } from '@/utils/auth';

import AppSidebar from '../app-sidebar/app-sidebar';

export default {
  name: 'AppHeader',
  computed: {
    collapsed() {
      return this.$store.state.baseStore.collapsed;
    }
  },
  components: { AppSidebar },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.formModel.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      sysName: 'ELEMENT',
      formModel: {
        password: '',
        newPassword: '',
        surePassword: ''
      },
      activeName:'first',
      sysUserName: '',
      userRole: '',
      formStatus: false,
      sysUserAvatar: '',
      rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        surePassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    onSubmit() {},
    
    logout: function() {
      var _this = this;
      removeToken();
      removeUserInfo();
      _this.$router.push('/login');
    },
    //折叠导航栏
    collapse: function() {
      this.$store.commit('changeCollapsed');
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        'submenu-hook-' + i
      )[0].style.display = status ? 'block' : 'none';
    },
    showSetting() {
      this.formStatus = true;
    },
    formClose() {
      this.formModel = {
        password: '',
        newPassword: '',
        surePassword: ''
      };
      this.$refs['passForm'].clearValidate();
    },
    handleCancel() {
      this.formStatus = false;
    },
    handleSure() {
      let _this = this;
      this.$refs['passForm'].validate(valid => {
        if (valid) {
          let pdata = {
            password: this.formModel.password,
            newPassword:this.formModel.newPassword
          };
          updatePassword(pdata).then(res => {
            const { data, status } = res;
            if (statusValid(this, status, data)) {
              _this.formStatus = false;
              _this.$message({
                message: '保存成功',
                type: 'success'
              });
            }
          });
        }
      });
    },
    handleClick(){

    }
  },
  mounted() {
    let user = getUserInfo();
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.account || '';
    }
  }
};
</script>
<style scoped lang="scss">
@import "./app-header.scss";
</style>