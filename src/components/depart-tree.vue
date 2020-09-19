<template>
  <div class="flex-cointer">
    <el-input
      class="search-box"
      v-model="companyKeyword"
      @keyup.enter.native="searchCompany()"
      size="small"
      placeholder="输入关键词"
    ></el-input>
    <el-scrollbar class="scroll-view" style="padding-bottom:40px;">
      <liquor-tree
        ref="tree"
        :data="depList"
        :filter="companyKeyword"
        :options="treeOptions"
        @node:clicked="onTreeDblClick"
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
</template>
<script>
import { shopList } from '@/views/billboard/standard/service';
import { statusValid } from '@/utils/status-valid';
import { treeConvertList } from '@/utils/util';
import LiquorTree from 'liquor-tree';

var globalDepList = [];

var loading;

export default {
  name: 'depList',
  props: {
    adminRole: {
      type: Boolean,
      default: false
    },
    finder: {
      type: Function
    },
    showCheckbox: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      depList: this.selAllDept(), //部门对象,
      keyword: '',
      companyKeyword: '',
      roleLineData: [],
      noBillStatus: false,
      treeModel: null,
      treeOptions: {
        checkbox: this.showCheckbox,
        parentSelect: true,
        propertyNames: {
          text: 'name',
          id: 'id'
        },
        filter: {
          plainList: true
        },
        paddingLeft: 8
      }
    };
  },
  beforeDestroy() {},
  components: {
    LiquorTree
  },
  created() {},
  mounted() {
    console.log(this.showCheckbox);
    this.treeOptions.checkbox = this.showCheckbox;
  },
  filters: {},
  methods: {
    selAllDept() {
      return new Promise(resolve => {
        shopList().then(res => {
          //请求校验
          let { data, status } = res;
          if (statusValid(this, status, data)) {
            let depart = res.data.data;

            const root = null || {
              id: 0,
              parentId: null,
              children: [...res.data.data]
            };
            this.departLine = treeConvertList(root);
            resolve(depart);
          }
        });
      });
    },
    noCheckedStatusChange() {
      // listRole(this);
    },
    onTreeDblClick(node) {
      const { id } = node;
      const chose = this.departLine.find(element => element.id === id);

      this.finder(chose);
    },
    rowClick() {},
    searchCompany() {
      this.$refs.tree.find(`/${this.companyKeyword}/`);
    },
    getCheckedRow() {
      let tree = this.$refs['tree'];
      let codeList = [];
      if (tree && tree.$attrs.value) {

        let checkedList = tree.$attrs.value.checked;
        for (let item of checkedList) {
          const chose = this.departLine.find(element => element.id === item.id);
          if (chose) {
            codeList.push(chose.code);
          }
        }
      }

      return codeList;
    }
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
