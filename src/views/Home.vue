<template>
  <div class="fullBG fullBG--home flex flex-col justify-between">
    <h1 class="pt-32">{{ $t("title") }}</h1>
    <div class="flex pt-12 justify-center relative">
      <transition name="fade">
        <router-link
          v-if="!loading && !game.running"
          to="/round"
          tag="button"
          class="btn btn--main"
          >{{ $t("navigation.start") }}</router-link
        >
      </transition>
      <transition name="fade">
        <router-link
          v-if="!loading && game.running"
          to="/round"
          tag="button"
          class="btn btn--main"
          >{{ $t("navigation.continue") }}</router-link
        >
      </transition>
    </div>
    <section class="flex justify-between">
      <router-link to="/about" tag="button" class="btn">
        {{ $t("page.about.title") }}
      </router-link>
      <SelectLang />
    </section>
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
    /* --- iOS: Ask to install --- */
    /* Source: https://www.netguru.com/codestories/few-tips-that-will-make-your-pwa-on-ios-feel-like-native */

    if (this.firstTime) {
      this.showAskToInstallIos();
    }

    /* --- Load Images --- */

    this.$store.dispatch("loadImages").then(() => {
      this.$store.commit("SET_GLOBAL_LOADING");
      this.startBGImg();
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
    next();
  },
  showAskToInstallIos() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.setState({ showInstallMessage: true });
    }
  }
};
</script>

<style lang="postcss">
.btn--main {
  border: 2px solid #fff;
  padding: 0.5em 1.5em;
  text-transform: uppercase;
}
</style>
