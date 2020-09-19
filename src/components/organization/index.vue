<template>
  <div class="antd-cointer" style="padding:0;height:100%;">
    <div class="cointer-box clear">
      <div class="cointer-info-left" :class="retract?'retract':'show'">
        <i class="iconfont icon-shouqijiantou" v-if="!retract" @click="retract=true"></i>
        <i class="iconfont icon-shouqijiantou-zk" v-if="retract" @click="retract=false"></i>
        <div class="full" :class="retract?'hidden':'show'">
          <div class="toolbar">
            <el-form :inline="true" class="demo-form-inline" onsubmit="return false;">
              <el-form-item style="width: 100%;">
                <el-input
                  v-model="companyKeyword"
                  @keyup.enter.native="searchCompany()"
                  size="small"
                  placeholder="输入关键词"
                ></el-input>
              </el-form-item>
              <!-- <el-button style="margin-top:6px;" type="primary" size="mini" @click="companyStatus=true">新增</el-button> -->
            </el-form>
          </div>
          <el-scrollbar class="scroll-view" style="padding-bottom:40px;">
            <liquor-tree
              ref="tree"
              :data="companyList"
              :filter="companyKeyword"
              :options="treeOptions"
              @node:dblclick="onTreeDblClick"
              v-model="treeModel"
            >
              <span class="tree-text" slot-scope="{ node }">
                <template v-if="!node.hasChildren()">
                  <i class="iconfont icon-bumen"></i>
                  {{ node.text }}
                </template>
                <template v-else>
                  <i class="iconfont icon-bumen"></i>
                  {{ node.text }}
                </template>
              </span>
            </liquor-tree>
          </el-scrollbar>
        </div>
      </div>
      <div class="cointer-info-right" :class="retract?'retract':'show'">
        <div class="toolbar el-col el-col-24 top-header">
          <div class="toolbar-tag-list" v-for="(item,index) of searchStatusList" :key="index">
            <div
              class="search-item"
              :class="item.active?'active':''"
              @click="searchTbar(item)"
            >{{item.label}}</div>
          </div>
          <div class="search-box">
            <div style="margin-top: 6px;display: inline-block;margin-right:10px;">
              <el-input
                @keyup.enter.native="search"
                placeholder="搜索部门，姓名"
                :clearable="true"
                @clear="search"
                v-model="userSearchMdel.keyword"
                size="small"
                class="input-with-select"
              >
                <el-button @click="search" slot="append" icon="el-icon-search" size="small"></el-button>
              </el-input>
            </div>
            <!-- <a class="link search-tig" @click="searchBasicStatus=!searchBasicStatus">
              {{searchBasicStatus?'展开搜索':'收起搜索'}} <i :class="searchBasicStatus?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
            </a>-->
          </div>
        </div>
        <div class="my-table">
          <el-table
            :data="dataTable"
            :header-cell-style="{background:'#FAFAFA'}"
            v-loading="listLoading"
            @selection-change="handleSelectionChange"
            :row-key="getRowKeys"
            size="small"
            height="400"
            ref="orgTable"
            style="width: 100%;margin-top:0;"
          >
            <el-table-column
              type="selection"
              :selectable="selectableFunction"
              :reserve-selection="true"
              v-if="multipleSelection"
              width="55"
            ></el-table-column>
            <!-- <el-table-column type="index" style="width:35px">
            </el-table-column>-->
            <el-table-column prop="name" align="center" width="70" label="姓名"></el-table-column>
            <el-table-column prop="code" align="center" width="90" label="编号"></el-table-column>
            <el-table-column prop="mobile" align="center" width="100" label="手机"></el-table-column>
            <el-table-column prop="layerBranchName" align="center" width="90" label="公司"></el-table-column>
            <el-table-column prop="layerDepartName" align="center" min-width="200" label="部门"></el-table-column>
            <el-table-column prop="postName" min-width="100" align="center" label="职位"></el-table-column>
            <el-table-column prop="regularDate" align="center" width="100" label="入职日期"></el-table-column>
            <el-table-column label="操作" align="center" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  :disabled="!externalUse"
                  @click="_chooseOrgUser(scope.row)"
                >选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-div">
            <el-pagination
              @size-change="handleSizeChange"
              background
              :page-sizes="[10, 20, 30, 40]"
              @current-change="handlepageNumChange"
              style="height:31px;"
              :current-page="pageNum"
              :page-size="10"
              :total="total"
              layout="total, sizes, prev, pager, next"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as service from './service';
import { statusValid } from '@/utils/status-valid';
import LiquorTree from 'liquor-tree';
import { treeConvertList } from '@/utils/util';

var loading;

export default {
  name: 'organization',
  props: {
    chooseOrgUser: Function,
    externalUse: {
      //外部调用
      type: Boolean,
      default: false
    },
    multipleSelection: {
      //是否支持多选
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listLoading: true, //列表加载状态
      total: 0, //总页数
      pageSize: 10, //默认一页十条
      pageNum: 1,
      companyKeyword: '',
      searchStatusList: [
        {
          label: '在职',
          value: 1,
          type: 1,
          active: true
        },
        {
          label: '离职',
          value: 0,
          type: 1,
          active: false
        },
        {
          label: '转正',
          value: 1,
          type: 2,
          active: false
        },
        {
          label: '未转正',
          value: 0,
          type: 2,
          active: false
        }
      ],
      treeOptions: {
        parentSelect: true,
        propertyNames: {
          text: 'name',
          id: 'id'
        },
        filter: {
          plainList: true
        },
        paddingLeft: 8
      },
      selStaffMap: [],
      userSearchMdel: {
        keyword: '',
        departId: '',
        isOnDuty: 1
      },
      retract: false, //是否缩起
      dataTable: [], //列表数据
      companyList: this.selAllDept(), //部门对象
      treeModel: null,
      departLine: []
    };
  },
  components: {
    LiquorTree
  },
  created() {},
  mounted() {
    this.organizationUserList();
  },
  filters: {},
  methods: {
    selAllDept() {
      return new Promise(resolve => {
        service.selAllDept({}).then(res => {
          console.log(res);

          let depart = res.data.data;
          const root = null || {
            id: 0,
            parentId: null,
            children: [...res.data.data]
          };
          this.departLine = treeConvertList(root);
          resolve(depart);
        });
      });
    },
    handleSelectionChange(val) {
      this.selStaffMap = val;
    },
    getRowKeys(row) {
      return row.id;
    },
    selectableFunction() {
      return true;
    },
    searchTbar(item) {
      if (item.active) {
        return;
      }
      let searchStatusList = this.searchStatusList;
      for (let i of searchStatusList) {
        if (i.value === item.value && i.type === item.type) {
          i.active = true;
        } else {
          i.active = false;
        }
      }
      let userSearchMdel = this.userSearchMdel;
      let isOnDuty = '';
      let isRegular = '';
      if (item.type === 1) {
        //离职与否
        isOnDuty = item.value === -1 ? null : item.value;
      } else {
        isRegular = item.value === -1 ? null : item.value;
      }
      this.userSearchMdel = { ...userSearchMdel, isOnDuty, isRegular };
      this.pageNum = 1;
      this.organizationUserList();
    },
    organizationUserList() {
      this.listLoading = true;
      const { pageNum, pageSize, userSearchMdel } = this;
      const params = {
        pageNum,
        pageSize,
        ...userSearchMdel
      };
      service.selAllStaff(params).then(res => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = data.data;
          this.total = data.totalItems;
          this.listLoading = false;
        }
      });
    },
    clearSelection() {
      this.selStaffMap = [];
      this.$refs['orgTable'].clearSelection();
    },
    search() {
      this.pageNum = 1;
      this.organizationUserList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.organizationUserList();
    },
    handlepageNumChange(val) {
      this.pageNum = val;
      this.organizationUserList();
    },
    onTreeDblClick(node) {
      const { id } = node;
      const chose = this.departLine.find(element => element.id === id);
      this.userSearchMdel.departId = chose.departId;
      this.pageNum = 1;
      this.organizationUserList();
    },
    searchCompany() {
      this.$refs.tree.find(`/${this.companyKeyword}/`);
    },
    reloadTree() {
      this.findCompany().then(res => {
        this.$refs.tree.setModel(res);
      });
    },
    _chooseOrgUser(row) {
      this.$emit('chooseOrgUser', row);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '#/styles/org-tree.scss';
@import '#/styles/table-filter.scss';
.cointer-box {
  flex-direction: row;
}
.search-box {
  padding-right: 0;
}
.pagination-div{
  height: 31px;
}
.my-table{
  overflow: hidden;
}
</style>
