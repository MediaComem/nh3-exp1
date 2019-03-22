<template>
  <div class="fullBG flex flex-col justify-between">
    <h1 class="pt-32">Date My Romandie</h1>
    <div class="flex pt-12 justify-center">
      <transition name="fade">
        <router-link
          v-if="!loading"
          to="/play"
          tag="button"
          class="btn btn--main"
          >{{ $t("start") }}</router-link
        >
        <semipolar-spinner
          v-show="loading"
          :animation-duration="2000"
          :size="65"
          color="#fff"
        />
      </transition>
    </div>
    <section class="flex justify-between">
      <router-link to="/about" tag="button" class="btn">
        {{ $t("about") }}
      </router-link>
      <SelectLang />
    </section>
  </div>
</template>

<script>
const SelectLang = () => import("@/components/SelectLang.vue");

import { SemipolarSpinner } from "epic-spinners";

export default {
  data: function() {
    return {
      loading: true,
      entries: {}
    };
  },
  components: {
    SelectLang,
    SemipolarSpinner
  },
  mounted() {
    this.$http.get("/collections/get/exp1_images").then(response => {
      this.entries = response.data;
      this.loading = false;
    });
  }
};
</script>

<style lang="scss">
:root {
  --url: url("../assets/batiment.jpg");
}

.btn--main {
  border: 2px solid #fff;
  padding: 0.5em 1.5em;
  text-transform: uppercase;
}
</style>
