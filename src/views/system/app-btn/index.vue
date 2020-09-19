<!-- app按钮 -->
<template>
  <div class="antd-cointer">
    <div class="cointer-box">
      <div class="flex-fow">
        <div class="toolbar flex-child el-col el-col-24 top-header"></div>
        <div class="action-group flex-child">
          <el-button type="primary" size="small" @click.native.prevent="findList">刷新</el-button>
          <el-button type="success" size="small" @click.native.prevent="add">新增</el-button>
        </div>
      </div>
      <el-table
        :data="dataTable"
        :header-cell-style="{background:'#FAFAFA'}"
        v-loading="listLoading"
        size="small"
        height="250"
        style="width: 100%;margin-top:0;"
      >
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="name" width="100" align="center" label="名称"></el-table-column>
        <el-table-column prop="iconPath" width="300" align="center"  label="图标"></el-table-column>
        <el-table-column prop="dataType"  width="180" align="center"  label="参数类型"></el-table-column>
        <el-table-column prop="showFlag" align="center"  label="是否展示">
          <template slot-scope="scope">
            {{scope.row.showFlag==true?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column prop="dbFlag" align="center" width="180" label="待办是否展示">
          <template slot-scope="scope">
            {{scope.row.dbFlag==true?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column prop="dbFlag" align="center"  label="是否启用">
          <template slot-scope="scope">
            {{scope.row.flag==true?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.flag" size="small" type="text" @click="handleCancel(scope.row.id,false)">禁用</el-button>
            <el-button v-else size="small" type="text" @click="handleCancel(scope.row.id,true)">启用</el-button>
            <el-button size="small" type="text" @click="handleDetele(scope.row.id,true)">删除</el-button>
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
    <el-dialog
      title="新增任务"
      :visible.sync="dialogVisible"
      class="dialog-footer"
      v-dialogDrag
      :close-on-press-escape="true"
      v-on:close="formClose"
      append-to-body
      width="70%"
    >
      <el-form :model="formModel" ref="form" label-width="100px">
        <el-form-item label="名称" prop="name">
           <el-input v-model="formModel.name"></el-input>
        </el-form-item>
        <el-form-item label="图标地址" prop="iconPath">
           <el-input v-model="formModel.iconPath"></el-input>
        </el-form-item>
        <el-form-item label="参数类型" prop="dataType">
           <el-input v-model="formModel.dataType"></el-input>
        </el-form-item>
        <el-form-item label="是否展示" prop="showFlag">
           <el-select v-model="formModel.showFlagName" placeholder="请选择" @change="changeShowFlag">
             <el-option
              v-for="item in selectValue"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="待办是否展示" prop="dbFlag">
           <el-select v-model="formModel.dbFlagName" placeholder="请选择" @change="changeDbFlag">
             <el-option
              v-for="item in selectValue"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
           <el-input type="number" v-model="formModel.sort"></el-input>
        </el-form-item>
        <el-form-item label="定制类型" class="form-item" prop="typeFlag" id="typeFlag">
              <el-radio-group v-model="formModel.typeFlag" @change="changeType">
                <el-radio label="0">月</el-radio>
                <el-radio label="1">周</el-radio>
                <el-radio label="2">每天</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="定制月"
              class="form-item"
              prop="monthNumber"
              v-if="monthShowFlag"
              id="monthNumber"
            >
              <el-checkbox-group v-model="monthList">
                <el-checkbox label="0">每月</el-checkbox>
                <el-checkbox label="1"></el-checkbox>
                <el-checkbox label="2"></el-checkbox>
                <el-checkbox label="3"></el-checkbox>
                <el-checkbox label="4"></el-checkbox>
                <el-checkbox label="5"></el-checkbox>
                <el-checkbox label="6"></el-checkbox>
                <el-checkbox label="7"></el-checkbox>
                <el-checkbox label="8"></el-checkbox>
                <el-checkbox label="9"></el-checkbox>
                <el-checkbox label="10"></el-checkbox>
                <el-checkbox label="11"></el-checkbox>
                <el-checkbox label="12"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="定制周"
              class="form-item"
              prop="weekNumber"
              v-if="weekShowFlag"
              id="weekNumber"
            >
              <el-checkbox-group v-model="weekList">
                <el-checkbox label="0">每天</el-checkbox>
                <el-checkbox label="2">星期一</el-checkbox>
                <el-checkbox label="3">星期二</el-checkbox>
                <el-checkbox label="4">星期三</el-checkbox>
                <el-checkbox label="5">星期四</el-checkbox>
                <el-checkbox label="6">星期五</el-checkbox>
                <el-checkbox label="7">星期六</el-checkbox>
                <el-checkbox label="1">星期天</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="定制日"
              class="form-item"
              prop="dateNumber"
              v-if="monthShowFlag"
              id="dateNumber"
            >
              <el-checkbox-group v-model="dayList">
                <el-checkbox label="0">每天</el-checkbox>
                <el-checkbox label="1"></el-checkbox>
                <el-checkbox label="2"></el-checkbox>
                <el-checkbox label="3"></el-checkbox>
                <el-checkbox label="4"></el-checkbox>
                <el-checkbox label="5"></el-checkbox>
                <el-checkbox label="6"></el-checkbox>
                <el-checkbox label="7"></el-checkbox>
                <el-checkbox label="8"></el-checkbox>
                <el-checkbox label="9"></el-checkbox>
                <el-checkbox label="10"></el-checkbox>
                <el-checkbox label="11"></el-checkbox>
                <el-checkbox label="12"></el-checkbox>
                <el-checkbox label="13"></el-checkbox>
                <el-checkbox label="14"></el-checkbox>
                <el-checkbox label="15"></el-checkbox>
                <el-checkbox label="16"></el-checkbox>
                <el-checkbox label="17"></el-checkbox>
                <el-checkbox label="18"></el-checkbox>
                <el-checkbox label="19"></el-checkbox>
                <el-checkbox label="20"></el-checkbox>
                <el-checkbox label="21"></el-checkbox>
                <el-checkbox label="22"></el-checkbox>
                <el-checkbox label="23"></el-checkbox>
                <el-checkbox label="24"></el-checkbox>
                <el-checkbox label="25"></el-checkbox>
                <el-checkbox label="26"></el-checkbox>
                <el-checkbox label="27"></el-checkbox>
                <el-checkbox label="28"></el-checkbox>
                <el-checkbox label="29"></el-checkbox>
                <el-checkbox label="30"></el-checkbox>
                <el-checkbox label="31"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="handle()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as service from './service';
import { statusValid } from '@/utils/status-valid';
import { apiConfig } from '@/global/api.config';
import { getToken } from '@/utils/auth';
var loading;
const selectValue = [
  {
    value: true,
    label: '是'
  },
  {
    value: false,
    label: '否'
  }
];
export default {
  name:'AppBtn',
  data() {
    return {
      selectValue: selectValue,
      listLoading: false,
      dialogVisible: false,
      showFlag: false,
      total: 0,
      pageNum: 1,
      value1: '',
      tableHeight: null,
      pageSize: 10,
      dataTable: [],
      operationFlag: true,
      formModel: {
        typeFlag : '0',
      },
      searchModel: {},
      params:{},
      monthShowFlag: true,
      weekShowFlag: false,
      monthList: [],
      weekList: [],
      dayList: [],
      selectArr: [],
    };
  },
  components: {},
  created() {},
  mounted() {
    const token = getToken();
    this.myHeaders = {
      token
    };
    this.findList();
  },
  filters: {
  },
  methods: {
    findList() {
      this.listLoading = true;
      const { pageNum, pageSize, searchModel } = this;
      const params = { ...searchModel, pageSize, pageNum };
      service.selTemplateList(params).then(res => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = data.data;
          this.total = data.totalItems;
          this.listLoading = false;
        }
      });
    },
    handle() {
      const { monthList, weekList, dayList, formModel } = this;
      var monthNumber = monthList.join(',');
      var weekNumber = weekList.join(',');
      var dateNumber = dayList.join(',');
      formModel.monthNumber = monthNumber;
      formModel.weekNumber = weekNumber;
      formModel.dateNumber = dateNumber;
      this.formModel = formModel;
      if (this.operationFlag) {
        this.handleSave(formModel);
      } else {
        this.handleUpdate(formModel);
      }
    },
    handleSave(formModel) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          //修改
          service.insert(formModel).then(res => {
            const { data, status } = res;
            if (statusValid(this, status, data)) {
              this.$message({
                message: '保存成功',
                duration: 1000,
                type: 'success'
              });
              this.dialogVisible = false;
              this.findList();
            }
          });
        }
      });
    },
    handleUpdate(formModel) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          service.update(formModel).then(res => {
            const { data, status } = res;
            if (statusValid(this, status, data)) {
              this.$message({
                message: '保存成功',
                duration: 1000,
                type: 'success'
              });
              this.dialogVisible = false;
              this.findList();
            }
          });
        }
      });
    },
    handleCancel(id,flag) {
      const { formModel } = this;
      formModel.id = id;
      formModel.flag = flag;
      this.$confirm('确认修改?', '提示', {})
        .then(() => {
          //删除模板
          service.update(formModel).then(res => {
            const { data, status } = res;
            this.listLoading = false;
            if (statusValid(this, status, data)) {
              this.findList();
            }
          });
        })
        .catch(() => {});
    },
    handleDetele(id){
      this.$confirm('确认删除吗?', '提示', {})
        .then(() => {
          //删除模板
          service.deleteInfo(id).then(res => {
            const { data, status } = res;
            this.listLoading = false;
            if (statusValid(this, status, data)) {
              this.findList();
            }
          });
        })
        .catch(() => {});
    },
    handleDetail(row) {
      this.operationFlag = false;
      const { id, name, showFlag, iconPath , dataType , dbFlag ,sort,flag,monthNumber,dateNumber,weekNumber,typeFlag} = row;
      var showFlagName = showFlag==true?'是':'否';
      var dbFlagName = dbFlag==true?'是':'否';
      var type = typeFlag.toString();
      let formModel = { id, name, showFlag, iconPath , dataType , dbFlag , showFlagName ,
       dbFlagName,sort,flag,monthNumber,dateNumber,weekNumber,typeFlag:type};
      this.formModel = formModel;
      if (typeFlag == 0) {
        this.monthShowFlag = true;
        this.weekShowFlag = false;
      } else if (typeFlag == 1) {
        this.monthShowFlag = false;
        this.weekShowFlag = true;
      } else {
        this.monthShowFlag = false;
        this.weekShowFlag = false;
      }
      this.monthList = monthNumber.split(',');
      this.weekList = weekNumber.split(',');
      this.dayList = dateNumber.split(',');
      this.dialogVisible = true;
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
    formClose() {
      this.$refs['form'].clearValidate();
      this.showFlag = false;
      this.operationFlag = false;
    },
    changeShowFlag(val){
      this.formModel.showFlag = val;
    },
    changeDbFlag(val){
      this.formModel.dbFlag = val;
    },
    add() {
      this.formModel = {
        typeFlag:'0'
      };
      this.operationFlag = true;
      this.dialogVisible = true;
    },
    changeType(val) {
      this.formModel.typeFlag = val;
      if (val == 0) {
        this.monthShowFlag = true;
        this.weekShowFlag = false;
      } else if (val == 1) {
        this.monthShowFlag = false;
        this.weekShowFlag = true;
      } else {
        this.monthShowFlag = false;
        this.weekShowFlag = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '#/styles/table-filter.scss';
.action-group {
  text-align: right;
  padding-top: 4px;
}
.action-view {
  width: 100%;
  text-align: right;
  padding: 20px 0;
}
.flex-fow {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ddd;
  .flex-child {
    flex: 1;
  }
}
.top-header {
  border-bottom: none;
}

.content-header {
  color: #333;
  position: relative;
  padding: 3px 10px 3px 18px;
}

.el-radio-group {
  padding-top: 11px;
}
.el-radio {
  width: 40px;
  padding-bottom: 16px;
}
</style>
