<template>
  <div class="fullBG fullBG--home flex flex-col justify-between">
    <h1 class="pt-32">Date My Romandie</h1>
    <div class="flex pt-12 justify-center relative">
      <transition name="fade">
        <router-link
          v-if="!loading"
          :to="{ name: 'play', props: { withIntroduction: true } }"
          tag="button"
          class="btn btn--main"
          >{{ $t("start") }}</router-link
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
      <router-link to="/about" tag="button" class="btn">
        {{ $t("about") }}
      </router-link>
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
  mixins: [utilities, BGImg],
  components: {
    SelectLang,
    SemipolarSpinner
  },
  mounted() {
    // Load images if there is no cache
    if (this.imagesSet.length === 0) {
      this.$store.dispatch("loadImages").then(() => {
        this.$store.commit("SET_GLOBAL_LOADING", false);
        this.startBGImg();
      });
    } else {
      this.startBGImg();
    }
  },
  beforeDestroy() {
    this.clearBGImg();
  },
  computed: {
    ...mapState(["imagesSet", "loading"]),
    ...mapGetters([
      "imagesDone",
      "imagesToDo"
      // ...
    ])
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
