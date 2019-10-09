import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("./views/Welcome.vue")
    },
    {
      path: "*",
      redirect: "/welcome"
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch("fetchAccessToken");
  if (to.fullPath === "*") {
    if (!store.state.accessToken) {
      next("/welcome");
    }
  }
  if (to.fullPath === "/welcome") {
    if (store.state.accessToken) {
      next("/");
    }
  }
  next();
});

export default router;
