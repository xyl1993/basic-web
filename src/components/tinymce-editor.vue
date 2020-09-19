
<template>
  <div class="tinymce-editor">
    <div class="pre">* 建议内容采用18号字体</div>
    <div class="pre" style="padding-bottom:10px">* 建议选择字体为[微软雅黑]</div>
    <editor v-model="myValue" :init="init" id="tinymce" :disabled="disabled" @onClick="onClick"></editor>
  </div>
</template>
<script>
import { tinymceConfig,boxImgQuality } from '@/global/base.config';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme.min.js';
import 'tinymce/skins/ui/oxide/skin.min.css';

import Editor from '@tinymce/tinymce-vue';
// import 'tinymce/themes/silver';
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'; // 插入上传图片插件
import 'tinymce/plugins/media'; // 插入视频插件
import 'tinymce/plugins/table'; // 插入表格插件
import 'tinymce/plugins/lists'; // 列表插件
import 'tinymce/plugins/wordcount'; // 字数统计插件

import './plugs/indent2em/index';   //首行缩进
import './plugs/lineheight/index';  //行高

// import 'tinymce/plugins/autoresize';
// import 'tinymce/plugins/quickbars';  //快速工具
import 'tinymce/plugins/fullscreen';

import { upLoadQiNiu } from '@/utils/qiniuUtils';
import { apiConfig } from '@/global/api.config';
// import lrz from 'lrz';

export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table wordcount fullscreen indent2em lineheight'
    },
    height: {
      type: Number,
      default: 300
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo |  formatselect | fontsizeselect fontselect lineheight bold italic forecolor backcolor | indent2em alignleft aligncenter alignright alignjustify | outdent indent | image media table | removeformat | fullscreen'
    }
  },
  data() {
    return {
      init: {},
      myValue: this.value
    };
  },
  created() {
    const that = this;
    this.init = {
      language_url: tinymceConfig.language_url,
      selector: 'textarea', // change this value according to your HTML
      // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
      content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%;font-size:18px;}
            body                      { padding:18px; margin:0;}
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,
      language: 'zh_CN',
      height: this.height,
      plugins: this.plugins,
      toolbar: this.toolbar,
      // quickbars_selection_toolbar: 'bold italic | link h2 h3 blockquote',
      // quickbars_insert_toolbar: 'quickimage quicktable',
      //想要哪一个图标提供本地文件选择功能，参数可为media(媒体)、image(图片)、file(文件)
      file_picker_types: 'media',
      // autoresize_bottom_margin: 50,
      //be used to add custom file picker to those dialogs that have it.
      file_picker_callback: function(cb, value, meta) {
        //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
        if (meta.filetype == 'media') {
          //创建一个隐藏的type=file的文件选择input
          let input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'video/*');
          input.onchange = function() {
            let file = this.files[0]; //只选取第一个文件。如果要选取全部，后面注意做修改
            //显示loading 界面
            const loading = that.$loading({
              lock: true,
              text: '正在上传，请稍等',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            upLoadQiNiu(that, file).then(res => {
              loading.close();
              const { code, data } = res;
              if (code === 200) {
                const filePath = apiConfig.QN_URL + data;
                cb(filePath, { title: file.name });
                return;
              }
            });
          };
          //触发点击
          input.click();
        }
      },
      fontsize_formats: '11px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px 48px',
      branding: false,
      font_formats:
        '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
      menubar: 'file edit insert view format table', //不启用菜单栏 配置为false
      // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
      // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
      images_upload_handler: (blobInfo, success,failure) => {   //，failure
        // const img = 'data:image/jpeg;base64,' + blobInfo.base64();
        // success(img);

        // let file = blobInfo.blob();
        // if(file){
          
        //   lrz(file,{
        //     width:800,
        //     quality:1
        //   })
        //   .then(function (rst) {
        //       // 处理成功会执行
        //       console.log(rst);
        //       const img = rst.base64;
        //       console.log(img);
        //       success(img);
        //   })
        //   .catch(function (err) {
        //       // 处理失败会执行
        //       console.log(err);
        //       failure('上传出错');
        //   })
        //   .always(function () {
        //       // 不管是成功失败，都会执行
        //   });
        // }
        
        
        // failure('上传出错');

        //上传七牛云
        upLoadQiNiu(that, blobInfo.blob()).then(res => {
          const { code, data } = res;
          if (code === 200) {
            const filePath = apiConfig.QN_URL + data + boxImgQuality;
            success(filePath);
            return;
          } else {
            failure('上传出错');
          }
        });
      }
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit('onClick', e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = '';
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit('input', newValue);
    }
  }
};
</script>
<style lang="scss" scoped>
.pre {
  color: #777;
}
</style>
