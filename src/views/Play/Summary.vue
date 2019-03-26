<template>
  <div class="playUI">
    <header>
      <router-link to="/" tag="button" class="btn--highlighted">{{
        $t("navigation.stop")
      }}</router-link>
      <Chrono ref="chrono" />
      <router-link to="/" tag="button" class="btn--highlighted">{{
        $t("navigation.nextImage")
      }}</router-link>
    </header>

    <div class="wrapperImg">
      <img src="@/assets/117252.jpg" />
      <p class="imgDesc">
        <time datetime="1909">1909</time> Tilleul de Bonvillars
      </p>
    </div>

    <div class="flex justify-center">
      <h3 class="text-red">Bonus de temps: 0</h3>
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

<style lang="postcss">
.imgDesc {
  @apply font-serif;
  color: #000;
  font-size: 0.8em;
  padding: 1em;
}
.imgDesc time {
  font-weight: bold;
  padding-right: 1em;
}
</style>
