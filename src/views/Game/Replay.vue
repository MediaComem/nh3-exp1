<template>
  <div class="gameUI">
    <header>
      <router-link to="/" tag="button" class="btn--highlighted">
        {{
        $t("navigation.goBack")
        }}
      </router-link>
    </header>

    <main class="wrapperImg wrapperImg--finish">
      <video
        ref="videoBravo"
        class="video-js vjs-big-play-centered"
        preload="auto"
        :data-setup="stringifyVideoSetup"
      >
        <source
          v-for="(source, i) in this.$t('game.replay.video.sources')"
          v-bind:key="i"
          :src="source.src"
          :type="source.type"
        >
      </video>
      <p class="imgRights">
        <a
          :href="'https://www.notrehistoire.ch/medias/' + this.$t('game.replay.video.idnh')"
          target="_blank"
          rel="noopener noreferrer"
        >Radio Television Suisse - Creative Commons BY-NC-ND</a>
      </p>
      <h1 class="text-red p-2">{{ $t("game.replay.title") }}</h1>
      <p
        class="text-red pr-8 pl-8 text-sm"
      >{{ $t("game.replay.description", {imageSetLength: this.imagesSet.length }) }}</p>
      <button
        @click="replay"
        class="btn btn__primary btn__primary--red m-6"
      >{{ $t("game.replay.button") }}</button>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
        aspectRatio: "4:3",
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
    replay() {
      this.$store.commit("SET_NEW_REPLAY");
      this.$store.commit("RESET_GAME");
      this.$router.replace({ name: "round" });
    }
  }
};
</script>

<style lang="postcss">
@import "~video.js/dist/video-js.css";
</style>
