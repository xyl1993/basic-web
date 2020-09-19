export default [
  {
    path: 'sysRole',
    name: 'Role',
    component: () => import('./role'),
    meta: {
      title: '人员菜单权限管理',
    }
  },
  {
    path: 'btn',
    name: 'BtnPower',
    component: () => import('./btn'),
    meta: {
      title: '按钮管理'
    }
  },
  {
    path: 'pushRole',
    name: 'PushRole',
    component: () => import('./pushRole'),
    meta: {
      title: '系统配置'
    }
  },
  {
    path: 'base-data',
    name: '基础数据',
    component: () => import('./base-data'),
    meta: {
      title: '基础数据'
    }
  }
  ,
  {
    path: 'app-btn',
    name: 'app按钮控制',
    component: () => import('./app-btn'),
    meta: {
      title: 'app按钮控制'
    }
  }
];
