<template>
  <div class="playUI">
    <header>
      <router-link
        to="/"
        tag="button"
        class="fadeFrom100"
        :disabled="play.chrono.started ? true : false"
        :class="{
          'fadeFrom100--active': play.chrono.started
        }"
        >{{ $t("navigation.goBack") }}</router-link
      >
      <Chrono ref="chrono" @timesUp="timesUp" />
    </header>

    <DragImg
      :withIntroduction="introduction"
      @dragStart="startPlay"
      @dragEnd="stopPlay"
    >
      <Introduction v-if="introduction" />
    </DragImg>

    <ShowYears />
  </div>
</template>

<script>
import vhCheck from "vh-check";
import { mapState } from "vuex";

const Chrono = () => import("@/components/Play/Chrono.vue");
const Introduction = () => import("@/components/Play/Introduction.vue");
const DragImg = () => import("@/components/Play/DragImg.vue");
const ShowYears = () => import("@/components/Play/ShowYears.vue");

export default {
  props: {
    withIntroduction: {
      default: true,
      type: Boolean
    }
  },
  data: function() {
    return {
      introduction: this.withIntroduction
    };
  },
  components: {
    Chrono,
    Introduction,
    DragImg,
    ShowYears
  },
  computed: mapState(["play"]),
  mounted() {
    vhCheck();
    this.$store.commit("RESET_PLAYSTATE");
    this.$store.commit("INIT_CHRONO");
  },
  methods: {
    startPlay() {
      this.introduction = false;
      this.$refs.chrono.start();
    },
    stopPlay() {
      this.$refs.chrono.stop();

      this.$router.push({ name: "summary", params: { id: "123" } });
    },
    timesUp() {}
  }
};
</script>
