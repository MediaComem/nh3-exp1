<template>
  <div class="gameUI">
    <header>
      <router-link
        to="/"
        tag="button"
        class="btn--highlighted"
        v-if="comeFromPlay"
        >{{ $t("navigation.stop") }}</router-link
      >
      <router-link to="/" tag="button" v-if="!comeFromPlay">
        {{ $t("navigation.goBack") }}
      </router-link>
      <Chrono ref="chrono" v-if="comeFromPlay" />
      <router-link
        to="/round"
        tag="button"
        class="btn--highlighted"
        v-if="comeFromPlay"
        >{{ $t("navigation.nextImage") }}</router-link
      >
    </header>

    <main class="wrapperImg">
      <a
        :href="'https://www.notrehistoire.ch/medias/' + round.media.image.idnh"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          :src="generateImgUrl(this.round.media.image._id)"
          class="imageFit"
        />
        <p class="imgRights">
          {{ round.media.author }} - {{ round.media.rights }}
        </p>
        <p class="imgDesc">
          <time :datetime="round.media.year">{{ round.media.year }}</time>
          <span>{{ round.media.title }}</span>
        </p>
      </a>
    </main>

    <div class="flex justify-center" v-if="comeFromPlay">
      <h3 class="text-red">
        {{ $t("game.summary.timeBonus") }}
        {{ game.chrono.currentBonusPenalty }}s
      </h3>
    </div>

    <ShowYears v-if="comeFromPlay" />
  </div>
</template>

<script>
import utilities from "@/mixins/utilities";
import { mapState } from "vuex";

const Chrono = () => import("@/components/Game/Chrono.vue");
const ShowYears = () => import("@/components/Game/ShowYears.vue");

export default {
  data: function() {
    return {
      comeFromPlay: true,
      bonus: 0
    };
  },
  computed: {
    ...mapState(["round", "game", "lang"])
  },
  mixins: [utilities],
  components: {
    Chrono,
    ShowYears
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
