import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import EditUser from "../views/EditUser.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/editUser",
    name: "EditUser",
    component: EditUser
  }
];

const router = new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE || "",
  routes
});

function hasQueryParams(route) {
  return !!Object.keys(route.query).length;
}

router.beforeEach(async (to, from, next) => {
      if (!hasQueryParams(to) && hasQueryParams(from)) {
        next({ name: to.name, query: from.query });
      } else {
        next();
      }
});

export default router;
