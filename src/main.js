import Vue from 'vue'
import ElementUI from 'element-ui';

import App from './App.vue'
import './assets/scss/element-variables.scss'

import './registerServiceWorker'
import router from './router'
import store from './store'
import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

/**
 * 解决重复点击菜单异常问题
 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue() //空的vue对象，用来组件间传递事件
  }
}).$mount('#app')
