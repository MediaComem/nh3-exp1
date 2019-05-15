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
      <Chrono/>
      <h1 class="hidden">{{ $t('accessibility.youPlay')}}</h1>
    </header>

    <DragImg @dragStart="startPlayDrag" @dragEnd="stopPlay">
      <Introduction v-if="user.firstTime"/>
    </DragImg>

    <ShowYears/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import utilities from "@/mixins/utilities";
import chrono from "@/mixins/chrono";

const Chrono = () => import("@/components/Game/Chrono.vue");
const Introduction = () => import("@/components/Game/Introduction.vue");
const DragImg = () => import("@/components/Game/DragImg.vue");
const ShowYears = () => import("@/components/Game/ShowYears.vue");

export default {
  mixins: [utilities, chrono],
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
  mounted() {
    /* --- Start automatically Chrono at 2nd image --- */

    if (!this.user.firstTime) {
      this.startPlay();
    }
  },
  beforeDestroy() {
    this.chronoStop();
  },
  computed: {
    ...mapState(["game", "round", "user", "replayCount", "options"]),
    ...mapGetters(["imagesToDo", "imagesDone"])
  },
  watch: {
    "game.chrono.timesUp"(val) {
      if (val) this.timesUp();
    }
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
      "STORE_CHRONO_BONUS",
      "SET_GAME_STATE",
      "SET_NEW_GAME"
    ]),
    ...mapActions(["getStats", "storeRoundDone"]),
    startPlayDrag() {
      if (this.imagesDone.length === 0) {
        this.startPlay();
      }
    },
    startPlay() {
      this.isFirstTimeEver();
      this.chronoStart();
    },
    isFirstTimeEver() {
      if (this.user.firstTime) {
        this.SET_FIRST_TIME(false);
      }
    },
    stopPlay() {
      this.chronoStop();
      this.storeRoundDone({
        idnh: this.round.media.idnh,
        replayCount: this.replayCount,
        yearSelected: this.round.yearSelected,
        gameNumber: this.game.number,
        userId: this.user.id,
        userName: this.user.name
      });
      this.calcBonus();
    },
    yearsDiff() {
      return Math.abs(this.round.media.year - this.round.yearSelected);
    },
    calcBonus() {
      /* --- Bonus --- */
      let bonus = 0;
      if (this.yearsDiff() <= this.options.bonus.rangeMaxYearsDiff) {
        bonus = this.convertRange(
          this.yearsDiff(),
          this.options.bonus.rangeMinValue,
          this.options.bonus.rangeMaxValue,
          this.options.bonus.rangeMinYearsDiff,
          this.options.bonus.rangeMaxYearsDiff
        );
      } else if (this.yearsDiff() === 0) {
        bonus = this.options.bonus.exact;
      }

      this.STORE_CHRONO_BONUS(bonus);

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
