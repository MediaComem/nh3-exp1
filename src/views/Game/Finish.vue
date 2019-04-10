<template>
  <div class="gameUI">
    <header>
      <router-link to="/" tag="button" class="btn--highlighted">
        {{
        $t("navigation.goBack")
        }}
      </router-link>
      <router-link
        v-if="!game.running"
        to="/round"
        tag="button"
        class="btn--highlighted"
      >{{ $t("navigation.restart") }}</router-link>
      <router-link
        v-if="game.running"
        to="/round"
        tag="button"
        class="btn--highlighted"
      >{{ $t("navigation.continue") }}</router-link>
      <h1 class="hidden">{{ $t('navigation.imagesReview')}}</h1>
    </header>

    <main class="wrapperImg">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(el, index) in imagesDoneLastGame.slice().reverse()" :key="index">
          <a
            :href="'https://www.notrehistoire.ch/medias/' + el.idnh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              :src="generateImgSrc(el.image._id)"
              :srcset="generateImgSrcSet(el.image._id, options.dpiRange)"
              class="imageFit"
              :alt="el.title"
            >
            <p class="imgRights">{{ el.author }} - {{ el.rights }}</p>
            <p class="imgDesc">
              <time :datetime="el.year">{{ el.year }}</time>
              <span>{{ el.title }}</span>
            </p>
          </a>
        </swiper-slide>
      </swiper>
    </main>

    <footer>
      <h2 class="text-center text-red text-xl">{{ scoreMsg }} {{ score.last }}</h2>
      <router-link to="/ranking" tag="button" class="btn--highlighted p-1">
        {{
        $t("navigation.ranking")
        }}
      </router-link>
      <button class="share" v-if="checkWebShareAPI" @click="shareApp">
        <img src="@/assets/icons/shareIcon.svg" class="shareIcon">
      </button>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import utilities from "@/mixins/utilities";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  static() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      }
    };
  },
  data() {
    return {
      prevRouteName: null
    };
  },
  computed: {
    ...mapState(["round", "game", "score", "options"]),
    ...mapGetters(["imagesToDo", "imagesDone", "imagesDoneLastGame"]),
    checkWebShareAPI() {
      return navigator.share !== undefined ? true : false;
    },
    scoreMsg() {
      return this.prevRouteName === "gamenomore" ||
        this.prevRouteName === "gametimesup"
        ? this.$t("game.finish.yourScore")
        : this.$t("game.finish.lastScore");
    }
  },
  mixins: [utilities],
  components: {
    swiper,
    swiperSlide
  },
  created() {
    // Redirect if no images have been played
    if (this.imagesDone.length === 0) {
      // For funny-hacker
      if (this.imagesDoneLastGame.length === 0) {
        this.$router.replace({ name: "round" });
      } else {
        this.$router.replace({ name: "home" });
      }
    }
  },
  beforeMount() {
    if (!this.game.running) {
      this.calcFinalScore();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRouteName = from.name;
    });
  },
  beforeRouteLeave(to, from, next) {
    /* --- No more images to do --- */

    if (to.name === "round" && this.imagesToDo.length == 0) {
      next("/game/replay");
    } else {
      next();
    }
  },
  methods: {
    ...mapMutations(["SET_LAST_GAME_SCORE"]),
    shareApp() {
      navigator.share({
        title: document.title,
        text: this.$t("shareSlogan", { myScore: this.score.last }),
        url: window.location.origin
      });
    },
    calcFinalScore() {
      let yearsDiff = this.imagesDoneLastGame.reduce(
        (acc, img) => acc + Math.abs(parseInt(img.year) - img.yearSelected),
        0
      );
      let score = Math.floor(
        this.imagesDoneLastGame.length * 100 - yearsDiff / 2.1
      );

      this.SET_LAST_GAME_SCORE(score);
    }
  }
};
</script>

<style lang="postcss" scoped>
.gameUI header {
  grid-template-columns: 1fr 1fr;
}
.gameUI header *:nth-child(2) {
  justify-self: end;
}
.gameUI footer {
  @apply pb-8;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 1fr;

  & button,
  & h2 {
    grid-column: 2/3;
  }

  & .share {
    grid-column: 3/4;
    grid-row: 1/3;
    justify-self: end;
    align-self: end;
  }
}
.imageFit {
  max-height: 60vh;
}
.shareIcon {
  @apply p-1;
  height: 3rem;
}
</style>
