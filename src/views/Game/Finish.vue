<template>
  <div class="playUI">
    <header>
      <router-link to="/ranking" tag="button" class="btn--highlighted">
        {{ $t("navigation.ranking") }}
      </router-link>
      <router-link to="/round" tag="button" class="btn--highlighted">{{
        $t("navigation.restart")
      }}</router-link>
    </header>

    <swiper class="wrapperImg">
      <swiper-slide v-for="(el, index) in imagesDoneLastGame" :key="index">
        <a
          :href="'https://www.notrehistoire.ch/medias/' + el.id"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img :src="generateImgUrl(el.image._id)" class="imageFit" />
          <p class="imgRights">{{ el.author }} - {{ el.rights }}</p>
          <p class="imgDesc">
            <time :datetime="el.year">{{ el.year }}</time>
            {{ el.title }}
          </p>
        </a>
      </swiper-slide>
    </swiper>

    <footer class="flex justify-center">
      <h3 class="text-red">
        {{ $t("game.finish.finalScore") }} {{ lastScore }}
      </h3>
    </footer>
  </div>
</template>

<script>
import utilities from "@/mixins/utilities";
import { mapState, mapGetters } from "vuex";

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  computed: {
    ...mapState(["round", "game", "lastScore"]),
    ...mapGetters(["imagesDoneLastGame"])
  },
  mixins: [utilities],
  components: {
    swiper,
    swiperSlide
  },
  beforeMount() {
    if (!this.game.running) {
      this.calcFinalScore();
    }
  },
  methods: {
    calcFinalScore() {
      let yearsDiff = this.imagesDoneLastGame.reduce(
        (acc, img) => acc + Math.abs(parseInt(img.year) - img.yearSelected),
        0
      );
      let score = Math.floor(
        (yearsDiff / (this.imagesDoneLastGame.length * 1.3)) * 10
      );

      this.$store.commit("SET_LAST_GAME_SCORE", score);
    }
  }
};
</script>

<style lang="postcss" scoped>
.playUI header {
  grid-template-columns: 1fr 1fr;
}
.playUI header *:nth-child(2) {
  justify-self: end;
}
.imageFit {
  max-height: 60vh;
}
</style>
