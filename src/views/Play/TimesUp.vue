<template>
  <div class="playUI">
    <header>
      <router-link to="/" tag="button" class="btn--highlighted">{{
        $t("navigation.stop")
      }}</router-link>
      <Chrono ref="chrono" />
    </header>

    <div class="flex justify-center">
      <h3 class="text-red">Temps écoulé...</h3>
    </div>

    <ShowYears />
  </div>
</template>

<script>
import vhCheck from "vh-check";

const Chrono = () => import("@/components/Play/Chrono.vue");
const ShowYears = () => import("@/components/Play/ShowYears.vue");

export default {
  components: {
    Chrono,
    ShowYears
  },
  mounted() {
    vhCheck();
  }
};
</script>
