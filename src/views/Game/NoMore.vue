<template>
  <div class="gameUI">
    <header>
      <Chrono ref="chrono"/>
      <router-link
        to="/game/finish"
        tag="button"
        class="btn--highlighted"
      >{{ $t("navigation.viewScore") }}</router-link>
    </header>

    <main class="flex justify-center items-center flex-basis-100">
      <h3 class="text-red p-8 text-center">{{ $t("game.noMore") }}</h3>
    </main>

    <ShowYears/>
  </div>
</template>

<script>
import utilities from "@/mixins/utilities";

const ShowYears = () => import("@/components/Game/ShowYears.vue");
const Chrono = () => import("@/components/Game/Chrono.vue");

export default {
  mixins: [utilities],
  components: {
    Chrono,
    ShowYears
  }
};
</script>

<style lang="postcss" scoped>
.gameUI .chrono {
  grid-column: 2;
}
.gameUI header *:nth-child(2) {
  justify-self: end;
}
</style>
