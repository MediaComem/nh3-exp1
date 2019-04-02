<template>
  <img
    :src="placeholder"
    :alt="alt"
    :data-src="src"
    :data-srcset="srcset"
    :data-sizes="sizes"
    :width="width"
    :height="height"
  >
</template>

<script>
import LazyLoad from "vanilla-lazyload";

// Only initialize it one time for the entire application
if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    element_selector: ".lazy"
  });
}

export default {
  props: ["alt", "placeholder", "src", "srcset", "sizes", "width", "height"],
  mounted() {
    document.lazyLoadInstance.update();
  },
  updated() {
    document.lazyLoadInstance.update();
  }
};
</script>

<style lang="postcss" scoped>
/* purgecss start ignore */
img {
  opacity: 0;
  &:not([src]) {
    visibility: hidden;
  }
  &:not(.initial) {
    transition: opacity 1s;
  }
  &.initial,
  &.loaded,
  &.error {
    opacity: 1;
  }
}
/* purgecss end ignore */
</style>


