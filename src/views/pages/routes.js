const login = () => import('./login/index');
export default [
  {
    path: '/login',
    component: login,
    name: '登录',
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false
    }
  },
];
