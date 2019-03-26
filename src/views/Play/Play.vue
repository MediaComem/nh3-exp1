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

    <DragImg @dragStart="startPlay" @dragEnd="stopPlay">
      <Introduction v-if="this.firstTime" />
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
  components: {
    Chrono,
    Introduction,
    DragImg,
    ShowYears
  },
  computed: mapState(["firstTime", "play"]),
  mounted() {
    vhCheck();
    this.$store.commit("RESET_PLAYSTATE");
    this.$store.commit("INIT_CHRONO");
  },
  methods: {
    startPlay() {
      if (this.firstTime) {
        this.$store.commit("SET_FIRSTTIME", false);
      }
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
