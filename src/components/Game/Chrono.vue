<template>
  <transition name="fade">
    <p class="chrono">{{ game.chrono.currentVal }}</p>
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import chrono from "@/mixins/chrono";

export default {
  mixins: [chrono],
  computed: mapState(["game"])
};
</script>

<style lang="postcss">
.chrono {
  @apply text-red;
  font-size: 1.4em;
}
</style>
