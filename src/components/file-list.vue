<!-- 附件列表 -->
<template>
  <el-table
    :data="dataTable"
    :header-cell-style="{background:'#FAFAFA'}"
    size="small"
    style="width: 100%;margin-top:0;"
  >
    <el-table-column align="center" type="index" width="55"></el-table-column>
    <el-table-column prop="fileName" align="center" label="文件"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          :href="scope.row.filePath"
          @click="downLoadFile(scope.row)"
        >下载</el-button>
        <el-button type="text" size="small" @click="_removeFile(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>

import { apiConfig } from '@/global/api.config';

export default {
  name: 'fileList',
  props: {
    dataTable: {
      type: Array,
      default: () => []
    },
    removeFile: Function
  },
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {
    downLoadFile(row) {
      const { filePath } = row;
      window.open(apiConfig.QN_URL + filePath);
    },
    _removeFile(index) {
      this.$emit('removeFile', index);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
