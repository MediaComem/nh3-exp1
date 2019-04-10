<template>
  <div class="gameUI">
    <header>
      <router-link to="/" tag="button" class="btn--highlighted">
        {{
        $t("navigation.goBack")
        }}
      </router-link>
    </header>

    <main class="wrapperImg wrapperImg--bravo">
      <video
        ref="videoBravo"
        playsinline
        class="video-js vjs-big-play-centered"
        preload="auto"
        :data-setup="stringifyVideoSetup"
      >
        <source
          v-for="(source, i) in $t('game.replay.video.sources')"
          v-bind:key="i"
          :src="source.src"
          :type="source.type"
        >
      </video>
      <p class="imgRights">
        <a
          :href="'https://www.notrehistoire.ch/medias/' + $t('game.replay.video.idnh')"
          target="_blank"
          rel="noopener noreferrer"
        >Radio Television Suisse - Creative Commons BY-NC-ND</a>
      </p>
      <div class="col_landscape">
        <h1 class="bravo__title text-red p-2 text-3xl">{{ $t("game.replay.title") }}</h1>
        <p
          class="bravo__desc text-red pr-8 pl-8 text-sm"
        >{{ $t("game.replay.description", {imageSetLength: this.imagesSet.length }) }}</p>
        <button
          @click="replay"
          class="btn btn__primary btn__primary--red m-6 mb-0 text-sm"
        >{{ $t("game.replay.button") }}</button>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import videojs from "video.js";

export default {
  static() {
    return {
      videoSetup: {
        controls: true,
        controlBar: false,
        loadingSpinner: false,
        bigPlayButton: true,
        textTrackDisplay: false,
        errorDisplay: false,
        textTrackSettings: false,
        autoplay: true,
        fluid: true,
        aspectRatio: this.$t("game.replay.video.aspectRatio"),
        techOrder: ["html5"]
      }
    };
  },
  mounted() {
    videojs(this.$refs.videoBravo).reset();
  },
  computed: {
    ...mapState(["imagesSet"]),
    stringifyVideoSetup() {
      return JSON.stringify(this.videoSetup);
    }
  },
  methods: {
    ...mapMutations(["SET_NEW_REPLAY", "RESET_GAME"]),
    replay() {
      this.SET_NEW_REPLAY();
      this.RESET_GAME();
      this.$router.replace({ name: "round" });
    }
  }
};
</script>

<style lang="postcss">
@import "~video.js/dist/video-js.css";
</style>
