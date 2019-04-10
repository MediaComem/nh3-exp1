<template>
  <p class="chrono">{{ game.chrono.currentVal }}</p>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  mounted() {
    this.checkTimesUp();
  },
  computed: mapState(["game"]),
  methods: {
    ...mapMutations([
      "SET_CHRONO_RUNNING",
      "SET_INTERVAL_CHRONO",
      "STORE_CHRONO",
      "TIMESUP"
    ]),
    start() {
      this.SET_CHRONO_RUNNING(true);

      // Remove at init 1 second to hurry up the user
      this.SET_INTERVAL_CHRONO();
      let instance = window.setInterval(() => {
        this.SET_INTERVAL_CHRONO();
        this.checkTimesUp();
      }, 1000);

      this.STORE_CHRONO(instance);
    },
    checkTimesUp() {
      if (this.game.chrono.currentVal <= 0) {
        this.TIMESUP(true);
        this.stop();
        this.$emit("timesUp");
      }
    },
    stop() {
      this.SET_CHRONO_RUNNING(false);
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
