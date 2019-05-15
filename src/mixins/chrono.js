import { mapState, mapMutations } from 'vuex';

const chrono = {
  computed: mapState(['game']),
  methods: {
    ...mapMutations([
      'SET_CHRONO_RUNNING',
      'SET_INTERVAL_CHRONO',
      'STORE_CHRONO',
      'TIMESUP'
    ]),
    chronoStart() {
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
        this.chronoStop();
      }
    },
    chronoStop() {
      this.SET_CHRONO_RUNNING(false);
      clearInterval(this.game.chrono.instance);
    }
  }
};

export default chrono;
