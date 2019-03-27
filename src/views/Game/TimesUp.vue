<template>
  <div class="playUI">
    <header>
      <Chrono ref="chrono" />
      <router-link to="/game/finish" tag="button" class="btn--highlighted">
        {{ $t("navigation.viewScore") }}
      </router-link>
    </header>

    <div class="flex justify-center items-center flex-basis-100">
      <h3 class="text-red">{{ $t("game.timesUp") }}</h3>
    </div>

    <ShowYears />
  </div>
</template>

<script>
import utilities from "@/mixins/utilities";
import { mapState, mapGetters } from "vuex";

const ShowYears = () => import("@/components/Game/ShowYears.vue");
const Chrono = () => import("@/components/Game/Chrono.vue");

export default {
  computed: {
    ...mapState(["round"]),
    ...mapGetters(["imagesDone"]),
    getCurrentImgUrl() {
      let imgId = this.round.image.image._id;
      return this.generateImgUrl(imgId);
    }
  },
  mixins: [utilities],
  components: {
    Chrono,
    ShowYears
  }
};
</script>

<style lang="postcss" scoped>
.playUI .chrono {
  grid-column: 2;
}
.playUI header *:nth-child(2) {
  justify-self: end;
}
</style>
