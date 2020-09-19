<template>
  <div class="app-review">
    <div class="phone-cointer">
      <el-scrollbar class="scroll-view hidden-scroll" style="width:100%;">
       
        <div class></div>
        <div class="app-review-cointer">
          <div class="content" v-html="content"></div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
const moment = require('moment');

export default {
  components: {},
  props: {
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      time: ''
    };
  },
  mounted() {
    this.time = moment(new Date()).format('YYYY-MM-DD');
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.app-header {
  text-align: center;
  font-size: 16px;
  padding: 5px 0;
  background: #fff;
  &::after {
    clear: both;
    content: '';
    display: table;
  }
  .header-list {
    padding: 0 10px;
    font-size: 14px;
    float: left;
  }
  .logo {
    position: relative;
    img {
      width: 28px;
      height: 18px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 16px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #dcdfe6;
    }
  }
}
header {
  margin-bottom: 36px;
  h1 {
    font-size: 1.28rem;
    color: #262626;
    line-height: 1.76rem;
  }
  .time {
    color: #4a4a4a;
    font-size: 12px;
    padding-top: 2px;
    padding-left: 2px;
  }
}
.app-review {
  width: 335px;
  height: 650px;
  background: url('../../assets/images/phone.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: 20px;
  right: 10px;
  padding-right: 11px;
  padding-top: 71px;
  padding-left: 7px;
  padding-bottom: 78px;
  font-size: 18px;
}
.phone-cointer {
  height: 100%;
  width: 100%;
  position: relative;
  background: #fafafc;
}
</style>
<style lang="scss">
.app-review-cointer {
  padding: 18px;
  text-align: justify;
  line-height: 1.6rem;
  color: #262626;
  padding-bottom: 70px;
  img {
    max-width: 100%;
    height: auto;
  }
  video {
    max-width: 100%;
  }
}
</style>