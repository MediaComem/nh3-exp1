<template>
  <div class="gameUI">
    <header>
      <router-link
        to="/"
        tag="button"
        class="btn--highlighted"
        v-if="comeFromPlay"
      >{{ $t("navigation.stop") }}</router-link>
      <router-link to="/" tag="button" v-if="!comeFromPlay">{{ $t("navigation.goBack") }}</router-link>
      <Chrono ref="chrono" v-if="comeFromPlay"/>
      <router-link
        to="/round"
        tag="button"
        class="btn--highlighted"
        v-if="comeFromPlay"
      >{{ $t("navigation.nextImage") }}</router-link>
    </header>

    <main class="wrapperImg wrapperImg--finish">
      <img
        :src="generateImgSrc(round.media.image._id, { w: 30, q: 40 })"
        :srcset="generateImgSrcSet(round.media.image._id, this.dpiRange)"
        class="imageFit lazy"
        :alt="round.media.title"
      >
      <p class="imgRights">{{ round.media.author }} - {{ round.media.rights }}</p>
      <p class="imgDesc">
        <time :datetime="round.media.year">{{ round.media.year }}</time>
        <span>{{ round.media.title }}</span>
      </p>
    </main>

    <aside class="wrapperAside">
      <swiper :options="swiperOption" class="p-4" v-if="comeFromPlay">
        <swiper-slide>
          <round-stats
            :labels="round.stats.countPerPeriod.labels"
            :charData="round.stats.countPerPeriod.data"
          />
          <text-stats
            :yearBegin="round.year.begin"
            :yearSelected="round.year.selected"
            :yearCorrect="round.media.year"
            :stats="round.stats"
            :yearsInterval="round.stats.yearsInterval"
          />
        </swiper-slide>
        <swiper-slide>
          <h3 class="text-center text-red">
            {{ $t("game.summary.timeBonus") }}
            {{ game.chrono.currentBonusPenalty }}s
          </h3>
        </swiper-slide>
      </swiper>
    </aside>

    <ShowYears v-if="comeFromPlay"/>
  </div>
</template>

<script>
import utilities from "@/mixins/utilities";
import { mapState } from "vuex";

import { swiper, swiperSlide } from "vue-awesome-swiper";

const Chrono = () => import("@/components/Game/Chrono.vue");
const RoundStats = () => import("@/components/Game/RoundStats.vue");
const TextStats = () => import("@/components/Game/TextStats.vue");
const ShowYears = () => import("@/components/Game/ShowYears.vue");

export default {
  static() {
    return {
      comeFromPlay: true,
      swiperOption: {
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        }
      }
    };
  },
  computed: {
    ...mapState(["round", "game", "lang", "dpiRange"])
  },
  mixins: [utilities],
  components: {
    Chrono,
    RoundStats,
    TextStats,
    ShowYears,
    swiper,
    swiperSlide
  },
  created() {
    // If the user is not coming from play get the image from the server
    if (this.round.media.image._id === null || this.round.year.selected === 0) {
      this.comeFromPlay = false;
      this.$store.dispatch("getSummaryTempImg", this.$route.params.idnh);
    }
  }
};
</script>

<style lang="postcss" scoped>
.swiper-slide {
  align-self: center;
}
</style>
