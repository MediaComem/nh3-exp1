<template>
  <div class="playUI">
    <header>
      <router-link to="/" tag="button" class="btn--highlighted">
        {{ $t("navigation.stop") }}
      </router-link>
      <Chrono ref="chrono" />
      <router-link to="/play" tag="button" class="btn--highlighted">
        {{ $t("navigation.nextImage") }}
      </router-link>
    </header>

    <div class="wrapperImg">
      <img :src="getCurrentImgUrl" class="imageFit" />
      <p class="imgRights">
        {{ play.currentImg.author }} - {{ play.currentImg.rights }}
      </p>
      <p class="imgDesc">
        <time :datetime="play.currentImg.year">{{ play.currentImg.year }}</time>
        {{ play.currentImg.title }}
      </p>
    </div>

    <div class="flex justify-center p-12">
      <h3 class="text-red">{{ $t("page.play.timesUp") }}</h3>
    </div>
  </div>
</template>

<script>
import vhCheck from "vh-check";
import utilities from "@/mixins/utilities";
import { mapState, mapGetters } from "vuex";

const Chrono = () => import("@/components/Play/Chrono.vue");

export default {
  computed: {
    ...mapState(["play"]),
    ...mapGetters(["imagesDone"]),
    getCurrentImgUrl() {
      let imgId = this.play.currentImg["image"]["_id"];
      return this.generateImgUrl(imgId);
    }
  },
  mixins: [utilities],
  components: {
    Chrono
  },
  mounted() {
    vhCheck();
  }
};
</script>
