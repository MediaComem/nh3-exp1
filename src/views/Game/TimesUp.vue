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

    <main class="wrapperMsgCenter">
      <h1 class="msgCenter">{{ $t("game.timesUp") }}</h1>
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
