<template>
  <div class="gameUI">
    <header>
      <router-link
        to="/"
        tag="button"
        class="fadeFrom100"
        :disabled="game.chrono.started ? true : false"
        :class="{
          'fadeFrom100--active': game.chrono.started
        }"
      >{{ $t("navigation.goBack") }}</router-link>
      <Chrono ref="chrono" @timesUp="timesUp"/>
    </header>

    <DragImg @dragStart="startPlay" @dragEnd="stopPlay">
      <Introduction v-if="this.firstTime"/>
    </DragImg>

    <ShowYears/>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import utilities from "@/mixins/utilities";

const Chrono = () => import("@/components/Game/Chrono.vue");
const Introduction = () => import("@/components/Game/Introduction.vue");
const DragImg = () => import("@/components/Game/DragImg.vue");
const ShowYears = () => import("@/components/Game/ShowYears.vue");

export default {
  computed: {
    ...mapState(["firstTime", "game", "round", "user", "replayCount"]),
    ...mapGetters(["imagesToDo"])
  },
  mixins: [utilities],
  components: {
    Chrono,
    Introduction,
    DragImg,
    ShowYears
  },
  created() {
    /* --- No more images to do --- */

    if (this.imagesToDo.length == 0) {
      if (this.game.running) {
        this.noMore();
      } else {
        this.replay();
      }
    } else {
      /* --- New Game --- */
      if (!this.game.running) {
        this.$store.commit("RESET_CHRONO");
        this.$store.commit("INIT_CHRONO");
        this.$store.commit("SET_GAME_STATE", true);
        this.$store.commit("SET_SCORE_SUBMITTED", false);
      }

      /* --- New Round --- */

      this.$store.commit("RESET_ROUND");
      this.$store.commit("SET_ROUND_MEDIA", this.imagesToDo[0]);
      this.$store.dispatch("getStats");
    }
  },
  methods: {
    startPlay() {
      this.isFirstTimeEver();
      this.$refs.chrono.start();
    },
    isFirstTimeEver() {
      if (this.firstTime) {
        this.$store.commit("SET_FIRST_TIME", false);
      }
    },
    stopPlay() {
      this.$refs.chrono.stop();
      this.storeRoundDone();
      this.calcBonus();
    },
    storeRoundDone() {
      this.$store.dispatch("storeRoundDone", {
        idnh: this.round.media.idnh,
        replayCount: this.replayCount,
        yearSelected: this.round.year.selected,
        gameNumber: this.game.number,
        userId: this.user.id,
        userName: this.user.name
      });
    },
    yearsDiff() {
      return Math.abs(this.round.media.year - this.round.year.selected);
    },
    calcBonus() {
      /* --- Bonus --- */

      this.$store.commit("ADD_CHRONO_BONUS", this.yearsDiff());

      /* --- TimesUp / Continue --- */

      if (this.game.chrono.currentVal <= 0) {
        this.timesUp();
      } else {
        this.$router.replace({
          name: "roundsummary",
          params: { idnh: this.round.media.idnh }
        });
      }
    },
    replay() {
      this.$router.push({ name: "gamereplay" });
    },
    noMore() {
      this.$router.replace({ name: "gamenomore" });
      this.$store.commit("SET_GAME_STATE", false);
      this.$store.commit("SET_NEW_GAME"); // Not necessary but don't to develop specific finish state
    },
    timesUp() {
      this.$router.replace({ name: "gametimesup" });
      this.$store.commit("SET_GAME_STATE", false);
      this.$store.commit("SET_NEW_GAME");
    }
  }
};
</script>
