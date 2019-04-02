<template>
  <img
    :alt="alt"
    :src="placeholder"
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

