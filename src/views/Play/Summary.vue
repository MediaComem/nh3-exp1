<template>
  <div class="playUI">
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
        to="/play"
        tag="button"
        class="btn--highlighted"
        v-if="comeFromPlay"
        >{{ $t("navigation.nextImage") }}</router-link
      >
    </header>

    <div class="wrapperImg">
      <a
        :href="'https://www.notrehistoire.ch/medias/' + play.currentImg.id"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="getCurrentImgUrl" class="imageFit" />
        <p class="imgRights">
          {{ play.currentImg.author }} - {{ play.currentImg.rights }}
        </p>
        <p class="imgDesc">
          <time :datetime="play.currentImg.year">
            {{ play.currentImg.year }}
          </time>
          {{ play.currentImg.title }}
        </p>
      </a>
    </div>

    <div class="flex justify-center" v-if="comeFromPlay">
      <h3 class="text-red">{{ $t("page.play.summary.timeBonus") }} 0</h3>
    </div>

    <ShowYears v-if="comeFromPlay" />
  </div>
</template>

<script>
import vhCheck from "vh-check";
import utilities from "@/mixins/utilities";
import { mapState, mapGetters } from "vuex";
import axios from "axios";

const Chrono = () => import("@/components/Play/Chrono.vue");
const ShowYears = () => import("@/components/Play/ShowYears.vue");

export default {
  data: function() {
    return {
      comeFromPlay: true
    };
  },
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
    Chrono,
    ShowYears
  },
  created() {
    // If the user is not coming from play get the image from the server
    if (
      this.play.currentImg["image"]["_id"] === null ||
      this.play.year.selected === 0
    ) {
      this.comeFromPlay = false;
      axios
        .post("/collections/get/exp1_images", {
          filter: { id: this.$route.params.id },
          simple: 1,
          fields: {
            title: 1,
            year: 1,
            author: 1,
            rights: 1,
            image: 1
          },
          lang: "fr"
        })
        .then(res => this.$store.commit("SET_CURRENTIMG", res.data[0]));
    }
  },
  mounted() {
    vhCheck();
  }
};
</script>
