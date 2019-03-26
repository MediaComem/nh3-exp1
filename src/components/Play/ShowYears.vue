<template>
  <div class="years">
    <p>{{ play.year.begin }}</p>
    <p
      class="dragYear fadeFrom0"
      :class="{
        'fadeFrom0--active': play.year.selected > 0
      }"
    >
      {{ play.year.selected }}
    </p>
    <p>{{ play.year.end }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["play"])
};
</script>

<style lang="postcss">
.years {
  @apply font-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 1em;
  background: #fff;
  color: #000;
}
.dragYear {
  font-size: 1.8em;
  @apply text-red;
}
</style>
