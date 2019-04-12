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
      <h1 class="hidden">{{ $t('accessibility.youPlay')}}</h1>
    </header>

    <DragImg @dragStart="startPlay" @dragEnd="stopPlay">
      <Introduction v-if="user.firstTime"/>
    </DragImg>

    <ShowYears/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import utilities from "@/mixins/utilities";

const Chrono = () => import("@/components/Game/Chrono.vue");
const Introduction = () => import("@/components/Game/Introduction.vue");
const DragImg = () => import("@/components/Game/DragImg.vue");
const ShowYears = () => import("@/components/Game/ShowYears.vue");

export default {
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
        this.RESET_CHRONO();
        this.INIT_CHRONO();
        this.SET_GAME_STATE(true);
        this.SET_SCORE_SUBMITTED(false);
      }

      /* --- New Round --- */

      this.RESET_ROUND();
      this.SET_ROUND_MEDIA(this.imagesToDo[0]);
      this.getStats();
    }
  },
  computed: {
    ...mapState(["game", "round", "user", "replayCount"]),
    ...mapGetters(["imagesToDo"])
  },
  methods: {
    ...mapMutations([
      "RESET_CHRONO",
      "INIT_CHRONO",
      "SET_GAME_STATE",
      "SET_SCORE_SUBMITTED",
      "RESET_ROUND",
      "SET_ROUND_MEDIA",
      "SET_FIRST_TIME",
      "ADD_CHRONO_BONUS",
      "SET_GAME_STATE",
      "SET_NEW_GAME"
    ]),
    ...mapActions(["getStats", "storeRoundDone"]),
    startPlay() {
      this.isFirstTimeEver();
      this.$refs.chrono.start();
    },
    isFirstTimeEver() {
      if (this.user.firstTime) {
        this.SET_FIRST_TIME(false);
      }
    },
    stopPlay() {
      this.$refs.chrono.stop();
      this.storeRoundDone({
        idnh: this.round.media.idnh,
        replayCount: this.replayCount,
        yearSelected: this.round.year.selected,
        gameNumber: this.game.number,
        userId: this.user.id,
        userName: this.user.name
      });
      this.calcBonus();
    },
    yearsDiff() {
      return Math.abs(this.round.media.year - this.round.year.selected);
    },
    calcBonus() {
      /* --- Bonus --- */

      this.ADD_CHRONO_BONUS(this.yearsDiff());

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
      this.SET_GAME_STATE(false);
      this.SET_NEW_GAME(); // Not necessary but don't to develop specific finish state
    },
    timesUp() {
      this.$router.replace({ name: "gametimesup" });
      this.SET_GAME_STATE(false);
      this.SET_NEW_GAME();
    }
  }
};
</script>
