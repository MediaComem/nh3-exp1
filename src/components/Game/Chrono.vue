<template>
  <p class="chrono">{{ game.chrono.currentVal }}</p>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["game"]),
  mounted() {
    this.checkTimesUp();
  },
  methods: {
    start() {
      this.$store.commit("SET_CHRONO_RUNNING", true);

      // Remove at init 1 second to hurry up the user
      this.$store.commit("SET_INTERVAL_CHRONO");
      let instance = window.setInterval(() => {
        this.$store.commit("SET_INTERVAL_CHRONO");
        this.checkTimesUp();
      }, 1000);

      this.$store.commit("STORE_CHRONO", instance);
    },
    checkTimesUp() {
      if (this.game.chrono.currentVal <= 0) {
        this.$store.commit("TIMESUP", true);
        this.stop();
        this.$emit("timesUp");
      }
    },
    stop() {
      this.$store.commit("SET_CHRONO_RUNNING", false);
      clearInterval(this.game.chrono.instance);
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
