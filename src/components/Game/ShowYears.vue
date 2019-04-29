<template>
  <footer class="years">
    <p>{{ options.timeline.begin }}</p>
    <p
      class="dragYear fadeFrom0"
      :class="{
        'fadeFrom0--active': round.yearSelected > 0
      }"
    >{{ round.yearSelected }}</p>
    <p>{{ options.timeline.end }}</p>
  </footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["round", "options"])
};
</script>

<style lang="postcss">
.years {
  @apply font-serif font-bold text-grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @apply bg-white;
  & > * {
    z-index: 10;
  }
}
.dragYear {
  @apply text-red;
  font-size: 1.8em;
}
</style>
