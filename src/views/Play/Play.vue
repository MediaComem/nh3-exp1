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
import { mapState, mapGetters } from "vuex";
import utilities from "@/mixins/utilities";

const Chrono = () => import("@/components/Play/Chrono.vue");
const Introduction = () => import("@/components/Play/Introduction.vue");
const DragImg = () => import("@/components/Play/DragImg.vue");
const ShowYears = () => import("@/components/Play/ShowYears.vue");

export default {
  computed: {
    ...mapState(["firstTime", "play"]),
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
    this.$store.commit("RESET_PLAYSTATE");
    this.$store.commit("INIT_CHRONO");

    // Check if there are still images to do
    if (this.imagesToDo.length == 0) {
      this.$router.push({ name: "finish" });
    }

    // Choose an image
    let randImageId = this.getRandomIntInclusive(0, this.imagesToDo.length);
    let currentImg = this.imagesToDo[randImageId];
    this.$store.commit("SET_CURRENTIMG", currentImg);
  },
  mounted() {
    vhCheck();
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

      this.$router.replace({
        name: "summary",
        params: { id: this.play.currentImg.id }
      });
    },
    timesUp() {
      this.$router.replace({ name: "timesup" });
    }
  }
};
</script>
