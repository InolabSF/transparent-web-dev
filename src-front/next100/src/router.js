import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/meeting-test",
      name: "meeting-test",
      component: () => import("./views/MeetingTest"),
    },
    {
      path: "/test-log",
      name: "test",
      component: () => import("./views/test/TestLog"),
    },
    {
      path: "/test-hold",
      name: "test",
      component: () => import("./views/test/TestHold"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home")
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("./views/Welcome")
    },
    {
      path: "/walls/:wallId/meeting",
      name: "meeting",
      component: () => import("./views/Meeting")
    },
    {
      path: "/walls/:wallId/logs",
      name: "welcome",
      component: () => import("./views/WallLogList"),
      meta: { layout: "mobile" }
    }
  ]
});
