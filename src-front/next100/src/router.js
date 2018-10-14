import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/test-index",
      name: "test-index",
      component: () => import("./views/test/TestIndex"),
    },
    {
      path: "/meeting-test",
      name: "meeting-test",
      component: () => import("./views/MeetingTest"),
    },
    {
      path: "/test-log",
      name: "test-log",
      component: () => import("./views/test/TestLog"),
    },
    {
      path: "/test-hold",
      name: "test-hold",
      component: () => import("./views/test/TestHold"),
    },
    {
      path: "/test-pinch",
      name: "test-pinch",
      component: () => import("./views/test/TestPinch"),
    },
    {
      path: "/test-scroll",
      name: "test-scroll",
      component: () => import("./views/test/TestScroll"),
    },
    {
      path: "/test-hit",
      name: "test-hit",
      component: () => import("./views/test/TestHit"),
    },
    {
      path: "/test-transcripts/:wallId",
      name: "test-transcripts",
      component: () => import("./views/test/TestTranscripts"),
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
