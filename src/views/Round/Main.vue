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
        >{{ $t("navigation.goBack") }}</router-link
      >
      <Chrono ref="chrono" @timesUp="timesUp" />
    </header>

    <DragImg @dragStart="startPlay" @dragEnd="stopPlay">
      <Introduction v-if="this.firstTime" />
    </DragImg>

    <ShowYears />
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
    ...mapState(["firstTime", "game", "round", "user"]),
    ...mapGetters(["imagesToDo"])
  },
  mixins: [utilities],
  components: {
    Chrono,
    Introduction,
    DragImg,
    ShowYears
  },
  beforeMount() {
    /* --- No more images to do --- */

    if (this.imagesToDo.length == 0) {
      this.noMore();
    }

    /* --- New Game --- */
    if (!this.game.running) {
      this.$store.commit("RESET_CHRONO");
      this.$store.commit("INIT_CHRONO");
      this.$store.commit("SET_NEW_GAME");
      this.$store.commit("SET_GAME_STATE", true);
    }

    /* --- New Round --- */

    this.$store.commit("RESET_ROUND");
    // Choose a media
    let randImageId = this.getRandomIntInclusive(0, this.imagesToDo.length);
    let currentImg = this.imagesToDo[randImageId];
    this.$store.commit("SET_ROUND_MEDIA", currentImg);
    // Preload thumb
    this.preloadImg(
      this.generateImgSrc(this.round.media.image._id, { w: 30, q: 40 })
    );
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
      this.storeRoundStat();
      this.calcBonus();
    },
    storeRoundStat() {
      this.$store.dispatch("storeRoundStat", {
        idnh: this.round.media.idnh,
        yearSelected: this.round.year.selected,
        gameNumber: this.game.number,
        userId: this.user.id,
        userName: this.user.name
      });
    },
    yearsDiffCoeff() {
      return Math.round(
        Math.abs(this.round.media.year - this.round.year.selected) /
          this.game.chrono.penaltyCoefficient
      );
    },
    penalty() {
      return this.game.chrono.penalty * this.yearsDiffCoeff();
    },
    calcBonus() {
      /* --- Bonus / Penalty --- */

      if (parseInt(this.round.media.year) === this.round.year.selected) {
        this.$store.commit("ADD_CHRONO_BONUS");
      } else {
        // Penalty
        this.$store.commit("ADD_CHRONO_PENALTY", this.penalty());
      }

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
    noMore() {
      this.$router.push({ name: "gamenomore" });
    },
    timesUp() {
      this.$router.replace({ name: "gametimesup" });
      this.$store.commit("SET_GAME_STATE", false);
    }
  }
};
</script>
