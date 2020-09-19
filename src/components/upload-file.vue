<!-- 上传七牛云组建 -->
<template>
  <div class="upload-cointer">
    <el-button type="primary">选择文件</el-button>
    <input
      class="file-input"
      type="file"
      style
      :accept="accept"
      :multiple="multiple"
      @change="uploadFile"
      :id="eleId"
    />
  </div>
</template>
<script>
import { upLoadQiNiu } from '@/utils/qiniuUtils';
import { apiConfig } from '@/global/api.config';

var loading;
export default {
  name: 'uploadImg',
  props: {
    upCallback: Function,
    accept: {
      type: String,
      default: '*'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    eleId: {
      type: String,
      default: 'uploadFileElm'
    }
  },
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  filters: {},
  methods: {
    uploadFile() {
      loading = this.$loading({
        lock: true,
        text: '正在上传中，请稍等',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var dom = document.getElementById(this.eleId);
      var files = dom.files;
      if (files.length != 0) {
        for (let file of files) {
          upLoadQiNiu(this, file,false).then(res => {
            const { code, data } = res;
            if (code === 200) {
              const prevImgPath = apiConfig.QN_URL + data;
              this.upCallback(data, file.name, prevImgPath);
            } else {
              this.$message({
                message: '上传文件出错',
                type: 'error'
              });
            }
            dom.value = '';
            loading.close();
          });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-cointer {
  position: relative;
  .file-input {
    position: absolute;
    opacity: 0;
    z-index: 99;
    left: 0;
    top: 0;
    width: 78px;
    height: 30px;
  }
}
</style>