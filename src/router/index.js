import Vue from "vue";
import VueRouter from "vue-router";
import PagesLayout from '../views/pages/routes';

Vue.use(VueRouter);

const FullLayout = () => import("../containers/full-layout/full-layout");
const SimpleLayout = () => import("../containers/simple-layout/simple-layout");
const Home = () => import("../views/home");

const routes = [
  {
    path: "/",
    component: FullLayout,
    redirect: "/login",
    name: "首页",
    children: [
      {
        path: "/home",
        component: Home,
        name: "Home",
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/pages",
    redirect: "/login",
    component: SimpleLayout,
    children: [...PagesLayout],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = router();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
