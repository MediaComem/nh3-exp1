<template>
  <div class="playUI">
    <header>
      <router-link to="/" tag="button" class="btn--highlighted">{{
        $t("navigation.stop")
      }}</router-link>
    </header>

    <div class="flex justify-center">
      <h3 class="text-red">{{ $t("page.play.finish.title") }}</h3>
      <p>{{ $t("page.play.finish.description") }}</p>
    </div>
  </div>
</template>

<script>
import vhCheck from "vh-check";

export default {
  mounted() {
    vhCheck();
  }
};
</script>

<style lang="postcss" scoped>
.playUI {
  justify-content: start;
}
</style>
