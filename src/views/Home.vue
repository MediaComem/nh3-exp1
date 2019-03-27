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
        <router-link
          v-if="!loading && game.running"
          to="/round"
          tag="button"
          class="btn btn--main"
          >{{ $t("navigation.continue") }}</router-link
        >
      </transition>
      <transition name="fade">
        <div class="absolute pin-b">
          <semipolar-spinner
            v-show="loading"
            :animation-duration="2000"
            :size="65"
            color="#fff"
          />
        </div>
      </transition>
    </div>
    <section class="flex justify-between">
      <router-link to="/about" tag="button" class="btn">{{
        $t("page.about.title")
      }}</router-link>
      <SelectLang />
    </section>
  </div>
</template>

<script>
const SelectLang = () => import("@/components/SelectLang.vue");

import { SemipolarSpinner } from "epic-spinners";
import { mapState, mapGetters } from "vuex";
import utilities from "@/mixins/utilities";
import BGImg from "@/mixins/BGImg";

export default {
  computed: {
    ...mapState(["imagesSet", "loading", "game", "user"]),
    ...mapGetters(["imagesDone", "imagesToDo"])
  },
  mixins: [utilities, BGImg],
  components: {
    SelectLang,
    SemipolarSpinner
  },
  mounted() {
    /* --- Load Images --- */

    this.$store.dispatch("loadImages").then(() => {
      this.$store.commit("SET_GLOBAL_LOADING", false);
      this.startBGImg();
    });

    /* --- Create User Id --- */
    if (this.user.id === null) {
      this.$store.dispatch("createUserId");
    }
  },
  beforeDestroy() {
    this.clearBGImg();
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
