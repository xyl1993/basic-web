<template>
  <el-scrollbar class="scroll-view">
    <liquor-tree ref="tree" 
      :data="companyList" 
      :filter="companyKeyword" 
      @node:dblclick="onTreeDblClick" 
      :options="options"  
      v-model="treeModel">
      <span class="tree-text" slot-scope="{ node }">
        <template v-if="!node.hasChildren()" >
          <i v-if="node.data.modelType == 'company'" class="iconfont icon-bumen "></i>
          <i v-if="node.data.modelType == 'room'" class="iconfont icon-80"></i>
          <i v-if="node.data.modelType == 'department'" class="iconfont icon-custom-department"></i>
            {{ node.text }}
          <el-dropdown 
            trigger="click"
            @command="handleCommand" 
            size="small" 
            v-if="treeModel[0] && treeModel[0].data.id === node.data.id 
            && treeModel[0].data.name === node.data.name">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="treeModel[0].data.modelType !== 'room'" :command='{type:"add",node:node}'>新增</el-dropdown-item>
              <el-dropdown-item :command='{type:"edit",node:node}'>修改</el-dropdown-item>
              <el-dropdown-item :command='{type:"delete",node:node}'>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <i v-if="node.data.modelType == 'company'" class="iconfont icon-bumen "></i>
          <i v-if="node.data.modelType == 'room'" class="iconfont icon-80"></i>
          <i v-if="node.data.modelType == 'department'" class="iconfont icon-custom-department"></i>
            {{ node.text }}
          <el-dropdown trigger="click" @command="handleCommand" size="small" v-if="treeModel[0] && treeModel[0].data.id === node.data.id 
            && treeModel[0].data.name === node.data.name" 
            @click="addTreeData(node)">
            <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="treeModel[0].data.modelType !== 'room'" :command='{type:"add",node:node}'>新增</el-dropdown-item>
              <el-dropdown-item :command='{type:"edit",node:node}'>修改</el-dropdown-item>
              <el-dropdown-item :command='{type:"delete",node:node}'>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </span>
    </liquor-tree>
  </el-scrollbar>
</template>
<script>
export default {
  name: 'DeptTree',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    companyKeyword:{
      type:String,
      default:''
    },
    onTreeDblClick:Function,
    options:{
      type:Object,
    },

    loading:{
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    },
    addChild: Function,
    deleteChild: Function,
    editChild: Function,
  },
  computed: {
    // 格式化数据源
  },
  methods: {
    
    _addChild(responseData) {
      this.$emit('addChild',responseData); 
    },
    _deleteChild(responseData) {
      this.$emit('deleteChild',responseData); 
    },
    _editChild(responseData) {
      this.$emit('editChild',responseData); 
    }
  }
};
</script>
