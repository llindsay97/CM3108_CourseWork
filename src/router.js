import Vue from "vue";
import Router from "vue-router";
import Welcome from "./views/Welcome.vue";
import Home from "./views/Home.vue";
import Events from "./views/Events.vue";
import Staff from "./views/Staff.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/events",
      name: "events",
      component: Events
    },
    {
      path: "/staff",
      name: "staff",
      component: Staff
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
      path: "*",
      redirect: "/"
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
