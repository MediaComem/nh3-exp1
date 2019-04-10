<template>
  <div class="wrapperImg" :class="{ 'wrapperImg--timeline': !this.firstTime }">
    <LazyImage
      :placeholder="generateImgSrc(round.media.image._id, { w: 30, q: 40 })"
      :src="generateImgSrc(round.media.image._id, { w: 30, q: 40 })"
      :srcset="generateImgSrcSet(round.media.image._id, this.dpiRange)"
      class="dragImg lazy"
      :alt="round.media.title"
    />
    <div class="wrapperBackgroundImg">
      <LazyImage
        :placeholder="generateImgSrc(round.media.image._id, { w: 30, q: 40 })"
        :src="generateImgSrc(round.media.image._id, { w: 30, q: 40 })"
        :srcset="generateImgSrcSet(round.media.image._id, this.dpiRange)"
        class="backgroundImg lazy"
        :alt="round.media.title"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import utilities from "@/mixins/utilities";
import interact from "interactjs";

const LazyImage = () => import("@/components/Game/LazyImage.vue");

export default {
  data: function() {
    return {
      dragInit: false
    };
  },
  mixins: [utilities],
  components: {
    LazyImage
  },
  mounted() {
    interact(".dragImg").draggable({
      // enable inertial throwing
      inertia: false,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 1, bottom: 0, right: 0 }
      },

      autoScroll: false,

      onstart: this.dragStartListener,
      onmove: this.dragMoveListener,
      onend: this.dragEndListener
    });
  },
  computed: {
    ...mapState(["firstTime", "round", "dpiRange"])
  },
  methods: {
    ...mapMutations(["SET_YEAR_SELECTED"]),
    dragStartListener(event) {
      this.dragImgInit = event.target.getBoundingClientRect();

      if (!this.dragInit) {
        this.$emit("dragStart");
        this.dragInit = true;
      }
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
    dragEndListener() {
      interact(".dragImg").unset();
      this.$emit("dragEnd");
    },
    updateSelectedYear(elBBOX) {
      let yearSelected = this.convertRange(
        this.clamp(elBBOX.x, 0, window.innerWidth - elBBOX.width),
        this.$store.state.round.year.end,
        this.$store.state.round.year.begin,
        window.innerWidth - elBBOX.width,
        0
      );

      this.SET_YEAR_SELECTED(yearSelected);
    }
  }
};
</script>

<style lang="postcss">
.wrapperImg--timeline {
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
  @apply bg-white;
}
.backgroundImg {
  z-index: 2;
  max-width: 100%;
  filter: opacity(0.7);
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
</style>
