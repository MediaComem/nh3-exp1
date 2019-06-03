<template>
  <div class="fullBG fullBG--home flex flex-col">
    <aside class="bg-white p-1 px-2 w-32 max-w-full">
      <a :href="$t('page.about.univers.archive.url')" target="_blank" rel="noopener noreferrer">
        <img
          :alt="$t('page.about.univers.archive.title')"
          :src="publicPath + '/img/' + $t('page.about.univers.archive.logo')"
        >
      </a>
    </aside>
    <header class="mt-auto">
      <h1>{{ $t("title") }}</h1>
    </header>
    <main class="flex mt-auto justify-center relative">
      <transition name="fade">
        <router-link
          v-if="!loading && !game.running && !errorLoadingImages"
          to="/round"
          tag="button"
          class="btn btn__primary"
        >{{ $t("navigation.start") }}</router-link>
      </transition>
      <transition name="fade">
        <router-link
          v-if="!loading && game.running && !errorLoadingImages"
          to="/round"
          tag="button"
          class="btn btn__primary"
        >{{ $t("navigation.continue") }}</router-link>
      </transition>
      <p
        v-if="errorLoadingImages"
        class="text-white text-center text-sm"
      >{{ $t('error.noImageServer')}}</p>
    </main>
    <footer :class="{ score: showScoreLink }">
      <router-link to="/about" tag="button" class="btn">{{ $t("page.about.title") }}</router-link>
      <router-link
        to="/game/finish"
        tag="a"
        class="text-white no-underline"
        v-if="showScoreLink"
      >{{ $t("navigation.score") }}</router-link>
      <SelectLang/>
    </footer>
  </div>
</template>

<script>
const SelectLang = () => import("@/components/SelectLang.vue");

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import utilities from "@/mixins/utilities";
import BGImg from "@/mixins/BGImg";

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      errorLoadingImages: false
    };
  },
  mixins: [utilities, BGImg],
  components: {
    SelectLang
  },
  beforeMount() {
    /* --- Load Images --- */

    this.loadImages()
      .then(() => {
        this.errorLoadingImages = false;
        this.startBGImg();
        // Preload thumb
        this.preloadAllThumb({ w: 30, q: 40 });
      })
      .catch(err => {
        this.errorLoadingImages = true;
        console.log("loadImageHome", err);
      });
    /* --- Create User Id --- */
    if (this.user.id === null) {
      this.createUserId();
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
  },
  computed: {
    ...mapState(["imagesSet", "loading", "game", "user"]),
    ...mapGetters(["imagesToDo", "imagesDoneLastGame"]),
    showScoreLink() {
      return this.game.number > 0 && this.imagesDoneLastGame.length > 0;
    }
  },
  methods: {
    ...mapMutations(["SET_GLOBAL_LOADING"]),
    ...mapActions(["createUserId", "loadImages"])
  }
};
</script>

