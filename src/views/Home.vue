<template>
  <div>
    <header>
      <button>Arrêter</button>
      <p
        class="chrono"
        :class="{ 'chrono--visible': !chrono.timesUp && chrono.current > 0 }"
      >
        {{ chrono.current }}
      </p>
    </header>
    <div class="wrapperDrag">
      <img src="@/assets/117252.jpg" class="dragImg" />
      <div class="wrapperBackgroundImg">
        <img src="@/assets/117252.jpg" class="backgroundImg" />
      </div>
    </div>
    <div class="years">
      <p>{{ year.begin }}</p>
      <p
        class="dragYear"
        :class="{ 'dragYear--visible': this.year.selected > 0 }"
      >
        {{ year.selected }}
      </p>
      <p>{{ year.end }}</p>
    </div>
  </div>
</template>

<script>
import vhCheck from "vh-check";
import interact from "interactjs";

export default {
  name: "App",
  data: function() {
    return {
      year: {
        begin: 1818,
        end: 2018,
        selected: 0
      },
      chrono: {
        init: 60, //sec
        current: 0, //sec
        timesUp: false,
        started: false
      },
      dragImgInit: {}
    };
  },
  mounted() {
    vhCheck();
    this.chrono.current = this.chrono.init; //init chrono

    interact(".dragImg").draggable({
      // enable inertial throwing
      inertia: false,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },

      autoScroll: false,

      // call this function on every dragmove event
      onstart: this.dragStartListener,
      onmove: this.dragMoveListener,
      onend: this.dragEndListener
      // call this function on every dragend event
    });
  },
  methods: {
    startCountdown() {
      if (!this.chrono.started) {
        this.chrono.started = true;

        window.setInterval(() => {
          this.chrono.current -= 1;
          this.clearCountdown(this);
        }, 1000);
      }
    },
    clearCountdown(chrono) {
      if (this.chrono.current <= 0) {
        clearInterval(chrono);
        this.chrono.timesUp = true;
      }
    },
    dragStartListener(event) {
      this.dragImgInit = event.target.getBoundingClientRect();

      this.startCountdown();
    },
    dragMoveListener(event) {
      var target = event.target,
        x = event.pageX - target.offsetWidth / 2 - this.dragImgInit.x,
        y = event.pageY - target.offsetHeight / 2 - this.dragImgInit.y;

      this.updateSelectedYear(target.getBoundingClientRect());

      // translate the element
      target.style.transition = target.style.transitionTimingFunction = "none";
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px) scale(.3)";
    },
    dragEndListener(event) {
      var target = event.target;

      // translate the element
      target.style.transition =
        "transform 300ms cubic-bezier(0.455, 0.030, 0.515, 0.955)";
      target.style.transitionTimingFunction =
        "cubic-bezier(0.455, 0.030, 0.515, 0.955)";

      target.style.webkitTransform = target.style.transform =
        "translate(0px, 0px) scale(1)";
    },
    updateSelectedYear(elBBOX) {
      // update selectedYear
      this.year.selected = this.convertRange(
        this.clamp(elBBOX.x, 0, window.innerWidth - elBBOX.width),
        this.year.end,
        this.year.begin,
        window.innerWidth - elBBOX.width,
        0
      );
    },
    convertRange(value, xMax, xMin, yMax, yMin) {
      var percent = (value - yMin) / (yMax - yMin);
      return ~~(percent * (xMax - xMin) + xMin);
    },
    clamp(val, min, max) {
      return val > max ? max : val < min ? min : val;
    }
  }
};
</script>

<style>
.wrapperDrag {
  position: relative;
  flex-basis: 100%;
  z-index: 4;
  background-image: repeating-linear-gradient(
    -90deg,
    transparent,
    transparent 35px,
    #ccc 35px,
    #ccc 36px
  );
  background-size: 36px 100%;
}
.wrapperBackgroundImg {
  background: #fff;
}
.backgroundImg {
  z-index: 2;
  max-width: 100%;
  filter: opacity(0.5);
  user-select: none;
  touch-action: none;
}
.dragImg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  max-width: 100%;
  user-select: none;
  touch-action: none;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
}
header {
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}
button {
  background: none;
  border: none;
  padding: 20px;
  justify-self: start;
  font-size: 1em;
}
button,
.chrono,
.dragYear {
  color: red;
}
.chrono,
.dragYear {
  font-size: 1.2em;
}
.years {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px 0 15px;
  background: #fff;
}
.dragYear,
.chrono {
  opacity: 0;
  transition: all 100ms;
}
.dragYear--visible,
.chrono--visible {
  opacity: 1;
}
</style>
