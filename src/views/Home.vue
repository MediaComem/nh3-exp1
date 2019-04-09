<template>
  <div class="fullBG fullBG--home flex flex-col">
    <h1 class="mt-auto">{{ $t("title") }}</h1>
    <main class="flex mt-auto justify-center relative">
      <transition name="fade">
        <router-link
          v-if="!loading && !game.running"
          to="/round"
          tag="button"
          class="btn btn__primary"
        >{{ $t("navigation.start") }}</router-link>
      </transition>
      <transition name="fade">
        <router-link
          v-if="!loading && game.running"
          to="/round"
          tag="button"
          class="btn btn__primary"
        >{{ $t("navigation.continue") }}</router-link>
      </transition>
    </main>
    <footer class="flex justify-between">
      <router-link to="/about" tag="button" class="btn">{{ $t("page.about.title") }}</router-link>
      <SelectLang/>
    </footer>
  </div>
</template>

<script>
const SelectLang = () => import("@/components/SelectLang.vue");

import { mapState, mapGetters } from "vuex";
import utilities from "@/mixins/utilities";
import BGImg from "@/mixins/BGImg";

export default {
  computed: {
    ...mapState(["imagesSet", "loading", "game", "user", "firstTime"]),
    ...mapGetters(["imagesDone", "imagesToDo"])
  },
  mixins: [utilities, BGImg],
  components: {
    SelectLang
  },
  beforeMount() {
    /* --- Load Images --- */

    this.$store.dispatch("loadImages").then(() => {
      this.$store.commit("SET_GLOBAL_LOADING");
      this.startBGImg();
      // Preload thumb
      this.preloadAllThumb({ w: 30, q: 40 });
    });
    /* --- Create User Id --- */
    if (this.user.id === null) {
      this.$store.dispatch("createUserId");
    }
  },
  beforeDestroy() {
    this.clearBGImg();
  },
  beforeRouteLeave(to, from, next) {
    this.clearBGImg();
    /* --- No more images to do --- */

    if (to.name === "round" && this.imagesToDo.length == 0) {
      next("/game/replay");
    } else {
      next();
    }
  }
};
</script>

