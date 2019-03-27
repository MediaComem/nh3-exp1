<template>
  <footer class="years">
    <p>{{ round.year.begin }}</p>
    <p
      class="dragYear fadeFrom0"
      :class="{
        'fadeFrom0--active': round.year.selected > 0
      }"
    >
      {{ round.year.selected }}
    </p>
    <p>{{ round.year.end }}</p>
  </footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["round"])
};
</script>

<style lang="postcss">
.years {
  @apply font-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #fff;
  color: #000;
}
.dragYear {
  font-size: 1.8em;
  @apply text-red;
}
</style>
