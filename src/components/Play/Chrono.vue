<template>
  <p
    class="chrono fadeFrom0"
    :class="{
      'fadeFrom0--active': !play.chrono.timesUp && play.chrono.currentVal > 0
    }"
  >
    {{ play.chrono.currentVal }}
  </p>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["play"]),
  methods: {
    start() {
      if (!this.play.chrono.started) {
        this.$store.commit("START_CHRONO", true);

        let instance = window.setInterval(() => {
          this.$store.commit("SETINTERVAL_CHRONO");
          this.checkTimesUp();
        }, 1000);

        this.$store.commit("STORE_CHRONO", instance);
      }
    },
    checkTimesUp() {
      if (this.play.chrono.currentVal <= 0) {
        this.$store.commit("TIMESUP", true);
        this.stop();
        this.$emit("timesUp");
      }
    },
    stop() {
      clearInterval(this.play.chrono.instance);
    }
  }
};
</script>

<style lang="postcss">
.chrono {
  @apply text-red;
  font-size: 1.4em;
}
</style>
