import Vue from "vue";
import Router from "vue-router";

const Home = () => import("./views/Home.vue");
const About = () => import("./views/About.vue");

const Ranking = () => import("./views/Ranking.vue");

const RoundMain = () => import("./views/Round/Main.vue");
const RoundSummary = () => import("./views/Round/Summary.vue");

const GameTimesUp = () => import("./views/Game/TimesUp.vue");
const GameNoMore = () => import("./views/Game/NoMore.vue");
const GameFinish = () => import("./views/Game/Finish.vue");

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
      path: "/round",
      name: "round",
      component: RoundMain
    },
    {
      path: "/round/:id/summary",
      name: "roundsummary",
      component: RoundSummary
    },
    {
      path: "/game/timesup",
      name: "gametimesup",
      component: GameTimesUp
    },
    {
      path: "/game/finish",
      name: "gamefinish",
      component: GameFinish
    },
    {
      path: "/game/nomore",
      name: "gamenomore",
      component: GameNoMore
    },
    {
      path: "/ranking/",
      name: "ranking",
      component: Ranking
    },
    // 404
    { path: "*", component: Home }
  ]
});
