import Vue from "vue";
import Router from "vue-router";

const Home = () => import("./views/Home.vue");
const About = () => import("./views/About.vue");
const Play = () => import("./views/Play/Play.vue");
const Summary = () => import("./views/Play/Summary.vue");
const TimesUp = () => import("./views/Play/TimesUp.vue");
const Finish = () => import("./views/Play/Finish.vue");

Vue.use(Router);

export default new Router({
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
      component: About
    },
    {
      path: "/play",
      name: "play",
      component: Play
    },
    {
      path: "/play/:id/summary",
      name: "summary",
      component: Summary
    },
    {
      path: "/play/timesup",
      name: "timesup",
      component: TimesUp,
      beforeEnter: (to, from, next) => {
        from.name != "play" ? next("/") : next();
      }
    },
    {
      path: "/play/finish",
      name: "finish",
      component: Finish,
      beforeEnter: (to, from, next) => {
        from.name != "play" ? next("/") : next();
      }
    }
  ]
});
