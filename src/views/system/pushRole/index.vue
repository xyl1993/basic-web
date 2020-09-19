<template>
  <!-- 审核员处理页面 -->
  <div class="antd-cointer" id="antdCointer">
    <el-scrollbar class="scroll-view hidden-scroll detail-cointer" style="width:100%">
      <div class="cointer-box">
        <div class="header-title">
          <div class="header-left"></div>
          <div class="header-font">值班任务填写岗位</div>
        </div>
        <div class="check-div">
          <el-button class="button-save" type="primary" size="small" @click="handleSure()">保存</el-button>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checked" @change="handleCheckedChange">
            <el-checkbox
              class="check-line"
              v-for="(item,index) in checkList"
              :label="item.value"
              :key="index"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="header-title">
          <div class="header-left"></div>
          <div class="header-font">广告牌未提交推送目标配置</div>
        </div>
        <div class="check-div">
          <el-button
            class="button-save"
            type="primary"
            size="small"
            @click="pushConfighandleSure()"
          >保存</el-button>
          <el-checkbox
            :indeterminate="isIndeterminatePushConfig"
            v-model="pushConfigCheckAll"
            @change="handlePushConfigCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="pushConfigChecked" @change="handlePushConfigCheckedChange">
            <el-checkbox
              class="check-line"
              v-for="(item,index) in pushCheckList"
              :label="item.postCode"
              :key="index"
            >{{item.postName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="header-title">
          <div class="header-left"></div>
          <div class="header-font">浇头盘点异常推送目标配置</div>
        </div>
        <div class="check-div">
          <el-button
            class="button-save"
            type="primary"
            size="small"
            @click="toppingPushConfighandleSure()"
          >保存</el-button>
          <el-checkbox
            :indeterminate="isIndeterminateToppingPushConfig"
            v-model="toppingPushConfigCheckAll"
            @change="handleToppingPushConfigCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            v-model="toppingPushConfigChecked"
            @change="handleToppingPushConfigCheckedChange"
          >
            <el-checkbox
              class="check-line"
              v-for="(item,index) in toppingPushCheckList"
              :label="item.postCode"
              :key="index"
            >{{item.postName}}</el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="header-title">
          <div class="header-left"></div>
          <div class="header-font">健康证到期提醒推送目标配置</div>
        </div>
        <div class="check-div">
          <el-checkbox-group v-model="healthPushConfig">
            <el-checkbox
              class="check-line"
              v-for="(item,index) in shoperPostCodeList"
              :label="item.postCode"
              :key="index"
            >{{item.postName}}</el-checkbox>
          </el-checkbox-group>
          <div style="text-align:right;">
            <el-button class type="primary" size="small" @click="healthPushConfighandleSure()">保存</el-button>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import * as service from './index.service';
import { statusValid } from '@/utils/status-valid';
import { getShopPost } from '@/utils/common-service';
import { getAllPushPost } from '@/utils/common-service';
import { shoperPostCodeList } from '@/global/base.config';

export default {
  name: 'PushRole',
  data() {
    return {
      checkAll: false,
      pushConfigCheckAll: false,
      toppingPushConfigCheckAll: false,
      checked: [],
      pushConfigChecked: [],
      healthPushConfig: [],
      shoperPostCodeList: shoperPostCodeList,
      toppingPushConfigChecked: [],
      checkList: [],
      pushCheckList: [],
      toppingPushCheckList: [],
      isIndeterminate: true,
      isIndeterminatePushConfig: true,
      isIndeterminateToppingPushConfig: true,
      formModel: {},
      healthPushRoleList: [{}],
    };
  },
  mounted() {
    this.getShopPost().then((res) => {
      this.findList();
    });
    this.getAllPushPost().then((res) => {
      this.findPushList();
      this.findToppingPushList();
      this.findHealthPushList();
    });
  },
  methods: {
    getShopPost() {
      return new Promise((resolve) => {
        getShopPost().then((res) => {
          const { data, status } = res;
          if (statusValid(this, status, data)) {
            let checkList = data.data;
            this.checkList = checkList;
            resolve();
          }
        });
      });
    },
    findList() {
      service.getList({}).then((res) => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          let dataList = data.data;
          for (var i = 0; i < dataList.length; i++) {
            this.checked.push(dataList[i].roleCode);
          }
        }
      });
    },
    getAllPushPost() {
      return new Promise((resolve) => {
        getAllPushPost().then((res) => {
          const { data, status } = res;
          if (statusValid(this, status, data)) {
            let pushCheckList = data.data;
            this.pushCheckList = pushCheckList;
            this.toppingPushCheckList = pushCheckList;
            resolve();
          }
        });
      });
    },

    findPushList() {
      service.getPushConfigList({ type: 'billboard' }).then((res) => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          let dataList = data.data;
          for (var i = 0; i < dataList.length; i++) {
            this.pushConfigChecked.push(dataList[i].postCode);
          }
        }
      });
    },

    findToppingPushList() {
      service.getPushConfigList({ type: 'topping' }).then((res) => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          let dataList = data.data;
          for (var i = 0; i < dataList.length; i++) {
            this.toppingPushConfigChecked.push(dataList[i].postCode);
          }
        }
      });
    },

    handleSure() {
      let checked = this.checked;
      let checkList = this.checkList;
      let params = [];
      for (var i = 0; i < checked.length; i++) {
        for (var j = 0; j < checkList.length; j++) {
          if (checked[i] == checkList[j].value) {
            const pushRole = {
              roleName: checkList[j].name,
              roleCode: checkList[j].value,
              sort: i,
            };
            params.push(pushRole);
          }
        }
      }
      service.insert(params).then((res) => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.$message({
            message: '保存成功',
            duration: 1000,
            type: 'success',
          });
          this.dialogVisible = false;
        }
      });
    },

    pushConfighandleSure() {
      let pushConfigChecked = this.pushConfigChecked;
      let pushCheckList = this.pushCheckList;
      let params = [];
      for (var i = 0; i < pushConfigChecked.length; i++) {
        for (var j = 0; j < pushCheckList.length; j++) {
          if (pushConfigChecked[i] == pushCheckList[j].postCode) {
            const pushConfig = {
              postCode: pushCheckList[j].postCode,
              postName: pushCheckList[j].postName,
              type: 'billboard',
            };
            params.push(pushConfig);
          }
        }
      }
      service.insertPushConfig(params).then((res) => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.$message({
            message: '保存成功',
            duration: 1000,
            type: 'success',
          });
          this.dialogVisible = false;
        }
      });
    },

    toppingPushConfighandleSure() {
      let toppingPushConfigChecked = this.toppingPushConfigChecked;
      let toppingPushCheckList = this.toppingPushCheckList;
      let params = [];
      for (var i = 0; i < toppingPushConfigChecked.length; i++) {
        for (var j = 0; j < toppingPushCheckList.length; j++) {
          if (toppingPushConfigChecked[i] == toppingPushCheckList[j].postCode) {
            const pushConfig = {
              postCode: toppingPushCheckList[j].postCode,
              postName: toppingPushCheckList[j].postName,
              type: 'topping',
            };
            params.push(pushConfig);
          }
        }
      }
      service.insertToppingPushConfig(params).then((res) => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.$message({
            message: '保存成功',
            duration: 1000,
            type: 'success',
          });
          this.dialogVisible = false;
        }
      });
    },

    handleCheckAllChange(val) {
      if (val) {
        for (var i = 0; i < this.checkList.length; i++) {
          this.checked.push(this.checkList[i].value);
        }
      } else {
        this.checked = [];
      }

      this.isIndeterminate = false;
    },

    handlePushConfigCheckAllChange(val) {
      if (val) {
        for (var i = 0; i < this.pushCheckList.length; i++) {
          this.pushConfigChecked.push(this.pushCheckList[i].postCode);
        }
      } else {
        this.pushConfigChecked = [];
      }

      this.isIndeterminatePushConfig = false;
    },

    handleToppingPushConfigCheckAllChange(val) {
      if (val) {
        for (var i = 0; i < this.toppingPushCheckList.length; i++) {
          this.toppingPushConfigChecked.push(
            this.toppingPushCheckList[i].postCode
          );
        }
      } else {
        this.toppingPushConfigChecked = [];
      }

      this.isIndeterminateToppingPushConfig = false;
    },

    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkList.length;
    },

    handlePushConfigCheckedChange(value) {
      let checkedCount = value.length;
      this.pushConfigCheckAll = checkedCount === this.pushCheckList.length;
      this.isIndeterminatePushConfig =
        checkedCount > 0 && checkedCount < this.pushCheckList.length;
    },

    handleToppingPushConfigCheckedChange(value) {
      let checkedCount = value.length;
      this.toppingPushConfigCheckAll =
        checkedCount === this.toppingPushCheckList.length;
      this.isIndeterminateToppingPushConfig =
        checkedCount > 0 && checkedCount < this.toppingPushCheckList.length;
    },
    /**
     * 获取健康证推送配置
     */
    findHealthPushList() {
      service.getPushConfigList({ type: 'healthPush' }).then((res) => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          let dataList = data.data;
          for (var i = 0; i < dataList.length; i++) {
            this.healthPushConfig.push(dataList[i].postCode);
          }
        }
      });
    },
    /**
     * 保存健康证提醒事件
     */
    healthPushConfighandleSure() {
      const { healthPushConfig } = this;
      let actionData = [];
      healthPushConfig.map((item) => {
        let ac = shoperPostCodeList.find((i) => {
          return i.postCode == item;
        });
        actionData.push(ac);
      });

      service.insertHealthPushConfig(actionData).then((res) => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.$message({
            message: '保存成功',
            duration: 1000,
            type: 'success',
          });
        }
      });
    },

    healthPushConfigChange() {},
  },
};
</script>
<style lang="scss" scoped>
.header-title {
  display: inherit;
  height: 50px;
  background: #e9f6ff;
  line-height: 50px;
  border-radius: 6px;
}
.header-font {
  font-size: 18px;
  padding-left: 10px;
  font-weight: 600;
}
.header-left {
  height: 50px;
  background: #49b2ff;
  width: 6px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.check-div {
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  width: 80%;
}
.check-line {
  line-height: 40px;
}
.button-save {
  position: absolute;
  right: -100px;
  top: 35px;
}
</style>
